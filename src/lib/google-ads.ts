import 'server-only';
import { createHash } from 'node:crypto';
import { normalizePhoneBR } from '@/lib/phone';

/**
 * Google Ads — envio de conversão pelo SERVIDOR (ConversionUploadService).
 *
 * Combina duas técnicas numa única chamada:
 *  • Offline Conversion Import — usa o `gclid` (quando o lead veio de um clique
 *    no Google Ads; nós já o capturamos e persistimos, ver src/lib/tracking.ts).
 *  • Enhanced Conversions for Leads — usa e-mail/telefone com hash SHA-256, que
 *    permite o Google casar a conversão mesmo sem gclid.
 * O Google usa o que conseguir casar.
 *
 * Best-effort: sem credenciais é no-op e NUNCA lança (não quebra o lead).
 *
 * IMPORTANTE: não configure uma tag de conversão WEB para a mesma conversion
 * action — o Google não deduplica como o Meta e contaria em dobro.
 *
 * Env (server-only — NUNCA prefixar com NEXT_PUBLIC_):
 *   GOOGLE_ADS_DEVELOPER_TOKEN     token de desenvolvedor (MCC → API Center)
 *   GOOGLE_ADS_CLIENT_ID           OAuth2 client id
 *   GOOGLE_ADS_CLIENT_SECRET       OAuth2 client secret
 *   GOOGLE_ADS_REFRESH_TOKEN       OAuth2 refresh token
 *   GOOGLE_ADS_CUSTOMER_ID         id da conta Ads (só dígitos)
 *   GOOGLE_ADS_LOGIN_CUSTOMER_ID   (opcional) id da MCC
 *   GOOGLE_ADS_CONVERSION_ACTION_ID  id da conversion action do tipo "Importar"
 *   GOOGLE_ADS_API_VERSION         (opcional) padrão v21
 *   GOOGLE_ADS_TIMEZONE_OFFSET     (opcional) fuso da CONTA Ads, padrão -03:00
 */

const TOKEN_URL = 'https://oauth2.googleapis.com/token';

export interface GoogleAdsConversionInput {
  gclid?: string;
  email?: string;
  phone?: string;
  /** Momento da conversão. Padrão: agora. */
  when?: Date;
  /** Valor da conversão (padrão 0 — lead sem valor monetário definido). */
  value?: number;
}

function onlyDigits(value?: string): string {
  return (value ?? '').replace(/\D/g, '');
}

/** SHA-256 em hex, conforme exigido pelo Google para dados do usuário. */
function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

/**
 * Normaliza o e-mail conforme a especificação do Google: remove espaços e
 * aplica minúsculas; para gmail/googlemail, remove os pontos do usuário.
 */
function normalizeEmail(email: string): string {
  const clean = email.trim().toLowerCase();
  const at = clean.lastIndexOf('@');
  if (at < 0) return clean;
  const user = clean.slice(0, at);
  const domain = clean.slice(at + 1);
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    return `${user.replace(/\./g, '')}@${domain}`;
  }
  return clean;
}

/**
 * Formata a data no padrão exigido: "yyyy-MM-dd HH:mm:ss+|-HH:mm", no fuso
 * horário DA CONTA do Google Ads (não do servidor).
 */
function formatConversionDateTime(date: Date, offset: string): string {
  const sign = offset.trim().startsWith('-') ? -1 : 1;
  const [oh, om] = offset.trim().slice(1).split(':').map(Number);
  const shifted = new Date(date.getTime() + sign * ((oh || 0) * 60 + (om || 0)) * 60000);
  const p = (n: number) => String(n).padStart(2, '0');
  return (
    `${shifted.getUTCFullYear()}-${p(shifted.getUTCMonth() + 1)}-${p(shifted.getUTCDate())} ` +
    `${p(shifted.getUTCHours())}:${p(shifted.getUTCMinutes())}:${p(shifted.getUTCSeconds())}${offset.trim()}`
  );
}

/** Cache do access token (por instância; o token dura ~1h). */
let tokenCache: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string | undefined> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) return tokenCache.token;

  const client_id = process.env.GOOGLE_ADS_CLIENT_ID;
  const client_secret = process.env.GOOGLE_ADS_CLIENT_SECRET;
  const refresh_token = process.env.GOOGLE_ADS_REFRESH_TOKEN;
  if (!client_id || !client_secret || !refresh_token) return undefined;

  try {
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id,
        client_secret,
        refresh_token,
        grant_type: 'refresh_token',
      }),
    });
    if (!res.ok) {
      console.error('Google Ads OAuth error:', res.status, await res.text());
      return undefined;
    }
    const data = (await res.json()) as { access_token?: string; expires_in?: number };
    if (!data.access_token) return undefined;
    // Renova 60s antes de expirar.
    tokenCache = {
      token: data.access_token,
      expiresAt: Date.now() + ((data.expires_in ?? 3600) - 60) * 1000,
    };
    return tokenCache.token;
  } catch (err) {
    console.error('Google Ads OAuth request failed:', err);
    return undefined;
  }
}

export async function sendConversionToGoogleAds(
  input: GoogleAdsConversionInput
): Promise<void> {
  const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const customerId = onlyDigits(process.env.GOOGLE_ADS_CUSTOMER_ID);
  const conversionActionId = onlyDigits(process.env.GOOGLE_ADS_CONVERSION_ACTION_ID);
  // Sem credenciais → no-op (não quebra o envio do lead).
  if (!devToken || !customerId || !conversionActionId) return;

  // O Google exige gclid OU dados do usuário. Sem nenhum, não há o que casar.
  const gclid = input.gclid?.trim();
  const email = input.email?.trim();
  const phoneDigits = normalizePhoneBR(input.phone);
  if (!gclid && !email && !phoneDigits) return;

  const accessToken = await getAccessToken();
  if (!accessToken) return;

  const userIdentifiers: Record<string, unknown>[] = [];
  if (email) {
    userIdentifiers.push({
      hashedEmail: sha256(normalizeEmail(email)),
      userIdentifierSource: 'FIRST_PARTY',
    });
  }
  if (phoneDigits) {
    // E.164 (+55...) antes do hash, conforme a especificação.
    userIdentifiers.push({
      hashedPhoneNumber: sha256(`+${phoneDigits}`),
      userIdentifierSource: 'FIRST_PARTY',
    });
  }

  const conversion: Record<string, unknown> = {
    conversionAction: `customers/${customerId}/conversionActions/${conversionActionId}`,
    conversionDateTime: formatConversionDateTime(
      input.when ?? new Date(),
      process.env.GOOGLE_ADS_TIMEZONE_OFFSET || '-03:00'
    ),
    conversionValue: input.value ?? 0,
    currencyCode: 'BRL',
  };
  if (gclid) conversion.gclid = gclid;
  if (userIdentifiers.length) conversion.userIdentifiers = userIdentifiers;

  const version = process.env.GOOGLE_ADS_API_VERSION || 'v21';
  const url = `https://googleads.googleapis.com/${version}/customers/${customerId}:uploadClickConversions`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    'developer-token': devToken,
    'Content-Type': 'application/json',
  };
  const loginCustomerId = onlyDigits(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID);
  if (loginCustomerId) headers['login-customer-id'] = loginCustomerId;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        conversions: [conversion],
        // Não derruba o lote inteiro por causa de uma conversão inválida.
        partialFailure: true,
      }),
    });

    if (!res.ok) {
      console.error('Google Ads upload error:', res.status, await res.text());
      return;
    }

    // Com partialFailure, erros por item vêm em 200 — é preciso inspecionar.
    const data = (await res.json()) as {
      partialFailureError?: { message?: string };
    };
    if (data.partialFailureError) {
      console.error('Google Ads partial failure:', data.partialFailureError.message);
    }
  } catch (err) {
    console.error('Google Ads request failed:', err);
  }
}
