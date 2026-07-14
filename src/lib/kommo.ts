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
 *   KOMMO_TAG            (opcional) tag aplicada ao lead (padrão: "Site")
 */

export interface KommoLeadInput {
  nome: string;
  email?: string;
  telefone?: string;
  unidade?: string;
  experiencia?: string;
  categoria?: string;
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

export async function sendLeadToKommo(lead: KommoLeadInput): Promise<void> {
  const baseUrl = process.env.KOMMO_BASE_URL?.replace(/\/+$/, '');
  const token = process.env.KOMMO_ACCESS_TOKEN;
  // Sem credenciais → no-op (não quebra o envio do lead).
  if (!baseUrl || !token) return;

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const leadName = lead.experiencia || lead.categoria || 'Novo lead';

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

  const leadBody: Record<string, unknown> = {
    name: `Site — ${leadName}`,
    price: 0,
    _embedded: {
      tags: [{ name: process.env.KOMMO_TAG || 'Site' }],
      contacts: [
        {
          name: lead.nome,
          ...(contactFields.length ? { custom_fields_values: contactFields } : {}),
        },
      ],
    },
  };
  if (process.env.KOMMO_PIPELINE_ID) {
    leadBody.pipeline_id = Number(process.env.KOMMO_PIPELINE_ID);
  }
  if (process.env.KOMMO_STATUS_ID) {
    leadBody.status_id = Number(process.env.KOMMO_STATUS_ID);
  }

  try {
    // 1) Cria lead + contato de uma vez.
    const res = await fetch(`${baseUrl}/api/v4/leads/complex`, {
      method: 'POST',
      headers,
      body: JSON.stringify([leadBody]),
    });

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
