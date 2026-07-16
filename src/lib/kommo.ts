import 'server-only';
import { normalizePhoneBR } from '@/lib/phone';

/**
 * Integração com o Kommo CRM (API v4) — cria contato + lead a cada envio do
 * formulário do site. Best-effort: se as credenciais faltarem ou a API falhar,
 * NUNCA lança (não quebra o fluxo do lead), apenas loga.
 *
 * Env (server-only — NUNCA prefixar com NEXT_PUBLIC_):
 *   KOMMO_BASE_URL       https://SEUSUBDOMINIO.kommo.com
 *   KOMMO_ACCESS_TOKEN   token de longa duração da integração privada
 *   KOMMO_PIPELINE_ID    (opcional) id do funil
 *   KOMMO_STATUS_ID      (opcional) id do estágio
 *   KOMMO_TAG            (opcional) tag base aplicada ao lead (padrão: "Site")
 */

/**
 * IDs dos campos personalizados do LEAD nesta conta Kommo.
 * (Conferir em: Configurações → Campos personalizados → Leads.)
 */
const FIELD = {
  unidade: 1119057,
  experiencia: 1119059,
  mensagem: 1104610,
  // Campos nativos de rastreamento do Kommo ("Informação rastreada").
  utm_source: 194452,
  utm_medium: 194448,
  utm_campaign: 194450,
  utm_content: 194446,
  utm_term: 194454,
  gclid: 194462,
} as const;

/**
 * Cores válidas para tags de lead no Kommo (paleta fixa da API, sem "#").
 * Ref.: https://developers.kommo.com/reference/tag-colors
 * Separadas em dois conjuntos para diferenciar visualmente unidade x experiência.
 */
const UNIT_COLORS = [
  '86C0FC',
  'AABDFF',
  '8699DA',
  '90CDB0',
  'C6F4DE',
  '247BA0',
  '10599D',
  '0C7C59',
];
const EXPERIENCE_COLORS = [
  'FFCE5A',
  'FFE193',
  'FF8F92',
  'FFC8C8',
  'D1A4DC',
  'F2DDF7',
  'A9A5D7',
  'D8D5FF',
  'C7DB8C',
  'DDEBB5',
  '9D2B32',
  '832161',
];

/** Escolhe uma cor de forma determinística pelo nome (mesma tag = mesma cor). */
function pickColor(name: string, palette: string[]): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return palette[hash % palette.length];
}

export interface KommoLeadInput {
  nome: string;
  email?: string;
  telefone?: string;
  unidade?: string;
  experiencia?: string;
  categoria?: string;
  mensagem?: string;
  origem?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landing_page?: string;
}

/** Monta o texto da nota de atribuição (só campos preenchidos). */
function buildNote(lead: KommoLeadInput): string {
  const rows: [string, string | undefined][] = [
    ['Unidade', lead.unidade],
    ['Experiência', lead.experiencia],
    ['Categoria', lead.categoria],
    ['Origem', lead.origem],
    ['utm_source', lead.utm_source],
    ['utm_medium', lead.utm_medium],
    ['utm_campaign', lead.utm_campaign],
    ['utm_content', lead.utm_content],
    ['utm_term', lead.utm_term],
    ['gclid', lead.gclid],
    ['fbclid', lead.fbclid],
    ['Referrer', lead.referrer],
    ['Landing page', lead.landing_page],
  ];
  const lines = rows
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`);
  return ['Lead recebido pelo site.', ...lines].join('\n');
}

/** Campos personalizados do lead (só os preenchidos). */
function buildCustomFields(lead: KommoLeadInput): Record<string, unknown>[] {
  const pairs: [number, string | undefined][] = [
    [FIELD.unidade, lead.unidade],
    [FIELD.experiencia, lead.experiencia],
    [FIELD.mensagem, lead.mensagem],
    [FIELD.utm_source, lead.utm_source],
    [FIELD.utm_medium, lead.utm_medium],
    [FIELD.utm_campaign, lead.utm_campaign],
    [FIELD.utm_content, lead.utm_content],
    [FIELD.utm_term, lead.utm_term],
    [FIELD.gclid, lead.gclid],
  ];
  return pairs
    .filter(([, v]) => v && v.trim())
    .map(([field_id, value]) => ({ field_id, values: [{ value }] }));
}

/**
 * Garante que as tags existam já com a cor desejada. É best-effort e idempotente:
 * se a tag já existir, o Kommo recusa a criação e nós ignoramos (ela mantém a
 * cor atual). Feito ANTES de criar o lead — assim, ao anexar a tag por nome, ela
 * já existe colorida. Cada tag vai numa requisição isolada para que uma
 * duplicada não impeça a criação das demais.
 */
async function ensureTags(
  baseUrl: string,
  headers: Record<string, string>,
  tags: { name: string; color?: string }[]
): Promise<void> {
  const withColor = tags.filter((t) => t.color);
  if (withColor.length === 0) return;
  await Promise.allSettled(
    withColor.map((t) =>
      fetch(`${baseUrl}/api/v4/leads/tags`, {
        method: 'POST',
        headers,
        body: JSON.stringify([{ name: t.name, color: t.color }]),
      }).catch(() => undefined)
    )
  );
}

export async function sendLeadToKommo(lead: KommoLeadInput): Promise<void> {
  const baseUrl = process.env.KOMMO_BASE_URL?.replace(/\/+$/, '');
  const token = process.env.KOMMO_ACCESS_TOKEN;
  // Sem credenciais → no-op (não quebra o envio do lead).
  if (!baseUrl || !token) return;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // Nome do lead = primeiro nome do contato.
  const firstName = lead.nome?.trim().split(/\s+/)[0] || 'Novo lead';

  // Tags: base (Site) + unidade + experiência, cada uma com cor determinística.
  const tags: { name: string; color?: string }[] = [
    { name: process.env.KOMMO_TAG || 'Site' },
  ];
  const unidade = lead.unidade?.trim();
  const experiencia = lead.experiencia?.trim();
  if (unidade) tags.push({ name: unidade, color: pickColor(unidade, UNIT_COLORS) });
  if (experiencia) {
    tags.push({ name: experiencia, color: pickColor(experiencia, EXPERIENCE_COLORS) });
  }

  // Campos de contato: telefone e e-mail via field_code (dispensa IDs de campo).
  const contactFields: Record<string, unknown>[] = [];
  const phone = normalizePhoneBR(lead.telefone);
  if (phone) {
    contactFields.push({
      field_code: 'PHONE',
      values: [{ enum_code: 'WORK', value: phone }],
    });
  }
  if (lead.email) {
    contactFields.push({
      field_code: 'EMAIL',
      values: [{ enum_code: 'WORK', value: lead.email }],
    });
  }

  const embedded = {
    tags: tags.map((t) => ({ name: t.name })),
    contacts: [
      {
        name: lead.nome,
        ...(contactFields.length ? { custom_fields_values: contactFields } : {}),
      },
    ],
  };

  const baseLead: Record<string, unknown> = {
    name: firstName,
    price: 0,
    _embedded: embedded,
  };
  if (process.env.KOMMO_PIPELINE_ID) {
    baseLead.pipeline_id = Number(process.env.KOMMO_PIPELINE_ID);
  }
  if (process.env.KOMMO_STATUS_ID) {
    baseLead.status_id = Number(process.env.KOMMO_STATUS_ID);
  }

  const customFields = buildCustomFields(lead);
  const fullLead = customFields.length
    ? { ...baseLead, custom_fields_values: customFields }
    : baseLead;

  async function createLead(body: Record<string, unknown>): Promise<Response> {
    return fetch(`${baseUrl}/api/v4/leads/complex`, {
      method: 'POST',
      headers,
      body: JSON.stringify([body]),
    });
  }

  try {
    // Cria as tags coloridas antes de anexá-las ao lead.
    await ensureTags(baseUrl, headers, tags);

    // 1) Cria lead + contato de uma vez.
    let res = await createLead(fullLead);

    // Se algum campo personalizado for recusado (ex.: tipo incompatível), tenta
    // de novo SEM os campos — melhor um lead sem os extras do que lead nenhum.
    if (!res.ok && customFields.length) {
      const text = await res.text();
      console.error('Kommo complex error (com campos):', res.status, text);
      res = await createLead(baseLead);
    }

    if (!res.ok) {
      const text = await res.text();
      console.error('Kommo complex error:', res.status, text);
      return;
    }

    // A resposta é um array; extrai o id do lead criado.
    let leadId: number | undefined;
    try {
      const data = (await res.json()) as Array<{ id?: number }>;
      leadId = Array.isArray(data) ? data[0]?.id : undefined;
    } catch {
      /* resposta sem corpo JSON — segue sem a nota */
    }

    // 2) Nota com a atribuição (best-effort — não bloqueia o sucesso).
    if (leadId) {
      try {
        const noteRes = await fetch(`${baseUrl}/api/v4/leads/${leadId}/notes`, {
          method: 'POST',
          headers,
          body: JSON.stringify([
            { note_type: 'common', params: { text: buildNote(lead) } },
          ]),
        });
        if (!noteRes.ok) {
          console.error('Kommo note error:', noteRes.status, await noteRes.text());
        }
      } catch (err) {
        console.error('Kommo note request failed:', err);
      }
    }
  } catch (err) {
    console.error('Kommo request failed:', err);
  }
}
