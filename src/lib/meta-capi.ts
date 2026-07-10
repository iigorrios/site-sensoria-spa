import 'server-only';
import { createHash } from 'node:crypto';

/**
 * Meta Conversions API (server-side).
 * Envia o evento "Lead" para o Meta com deduplicação por event_id
 * (o mesmo id disparado pelo Pixel no browser).
 *
 * Env:
 *   NEXT_PUBLIC_META_PIXEL_ID   (id do Pixel; usado no browser e no servidor)
 *   META_CAPI_ACCESS_TOKEN      (token do CAPI — só no servidor)
 *   META_TEST_EVENT_CODE        (opcional — aba "Testar eventos")
 */

const GRAPH_VERSION = 'v19.0';

function sha256(value?: string | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return createHash('sha256').update(normalized).digest('hex');
}

function hashPhone(phone?: string | null): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;
  return createHash('sha256').update(digits).digest('hex');
}

export interface LeadEventInput {
  eventId?: string;
  eventSourceUrl?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  fbp?: string;
  fbc?: string;
  clientIp?: string;
  userAgent?: string;
  fbclid?: string;
  customData?: Record<string, string | undefined>;
}

export async function sendLeadEvent(input: LeadEventInput): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  // Sem credenciais, apenas ignora (não quebra o envio do lead).
  if (!pixelId || !token) return;

  const userData: Record<string, unknown> = {
    em: sha256(input.email),
    ph: hashPhone(input.phone),
    fn: sha256(input.firstName),
    fbp: input.fbp,
    fbc: input.fbc,
    client_ip_address: input.clientIp,
    client_user_agent: input.userAgent,
  };
  // remove chaves vazias
  Object.keys(userData).forEach((k) => userData[k] === undefined && delete userData[k]);

  const customData: Record<string, string> = {};
  if (input.customData) {
    for (const [k, v] of Object.entries(input.customData)) {
      if (v) customData[k] = v;
    }
  }

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        event_source_url: input.eventSourceUrl,
        action_source: 'website',
        user_data: userData,
        custom_data: customData,
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) {
    body.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      const text = await res.text();
      console.error('Meta CAPI error:', res.status, text);
    }
  } catch (err) {
    console.error('Meta CAPI request failed:', err);
  }
}
