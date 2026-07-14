'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, LogOut, Search, AlertCircle } from 'lucide-react';
import { normalizePhoneBR } from '@/lib/phone';
import type { LeadRow } from '@/types/lead';

interface Props {
  leads: LeadRow[];
  loadError?: string | null;
}

const dateFmt = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
}

/** Link do WhatsApp para chamar o lead, com saudação pré-preenchida. */
function waHref(lead: LeadRow): string | null {
  const num = normalizePhoneBR(lead.telefone);
  if (!num) return null;
  const first = lead.nome?.split(' ')[0] ?? '';
  const interesse = lead.experiencia ? ` sobre "${lead.experiencia}"` : '';
  const msg = `Olá${first ? ` ${first}` : ''}! Aqui é do Sensória Spa. Recebemos seu contato${interesse} e gostaríamos de ajudar a agendar sua experiência. 🌿`;
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

/** Junta os campos de atribuição não vazios em pares legíveis. */
function attributionPairs(lead: LeadRow): [string, string][] {
  const fields: [string, string | null][] = [
    ['origem', lead.origem],
    ['utm_source', lead.utm_source],
    ['utm_medium', lead.utm_medium],
    ['utm_campaign', lead.utm_campaign],
    ['utm_content', lead.utm_content],
    ['utm_term', lead.utm_term],
    ['gclid', lead.gclid],
    ['fbclid', lead.fbclid],
    ['referrer', lead.referrer],
    ['landing_page', lead.landing_page],
  ];
  return fields.filter(([, v]) => v && v.trim()) as [string, string][];
}

export default function AdminDashboard({ leads, loadError }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) => {
      const haystack = [
        l.nome,
        l.email,
        l.telefone,
        l.unidade,
        l.experiencia,
        l.categoria,
        l.utm_source,
        l.utm_campaign,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [leads, query]);

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <main className="min-h-screen bg-sensoria-fog/40 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Cabeçalho */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl tracking-display text-sensoria-graphite">
              Leads do site
            </h1>
            <p className="mt-1 font-sans text-sm text-sensoria-graphite/60">
              {leads.length} {leads.length === 1 ? 'lead' : 'leads'}
              {query && ` · ${filtered.length} no filtro`}
            </p>
          </div>
          <button
            onClick={logout}
            disabled={loggingOut}
            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-full border border-sensoria-fog bg-white px-5 font-sans text-sm font-medium text-sensoria-graphite transition-colors hover:bg-sensoria-fog disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>

        {/* Busca */}
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-sensoria-fog bg-white px-4">
          <Search className="h-4 w-4 flex-none text-sensoria-graphite/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome, e-mail, telefone, unidade, campanha…"
            className="h-11 w-full bg-transparent font-sans text-sm text-sensoria-graphite outline-none placeholder:text-sensoria-graphite/40"
          />
        </div>

        {loadError && (
          <p className="mt-6 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 flex-none" /> Erro ao carregar: {loadError}
          </p>
        )}

        {!loadError && filtered.length === 0 && (
          <p className="mt-10 text-center font-sans text-sm text-sensoria-graphite/50">
            {leads.length === 0 ? 'Nenhum lead cadastrado ainda.' : 'Nenhum lead corresponde à busca.'}
          </p>
        )}

        {/* Lista (cards) */}
        <div className="mt-6 grid gap-4">
          {filtered.map((lead) => {
            const href = waHref(lead);
            const attrs = attributionPairs(lead);
            return (
              <article
                key={lead.id}
                className="rounded-2xl border border-sensoria-fog bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-xl tracking-display text-sensoria-graphite">
                        {lead.nome}
                      </h2>
                      {lead.categoria && (
                        <span className="rounded-full bg-sensoria-green/10 px-2.5 py-0.5 font-sans text-xs font-medium text-sensoria-green">
                          {lead.categoria}
                        </span>
                      )}
                      <span className="font-sans text-xs text-sensoria-graphite/50">
                        {formatDate(lead.created_at)}
                      </span>
                    </div>

                    <dl className="mt-3 grid gap-x-6 gap-y-1.5 font-sans text-sm text-sensoria-graphite/80 sm:grid-cols-2">
                      <Field label="E-mail" value={lead.email} copyable />
                      <Field label="Telefone" value={lead.telefone} copyable />
                      <Field label="Unidade" value={lead.unidade} />
                      <Field label="Experiência" value={lead.experiencia} />
                    </dl>

                    {lead.mensagem && (
                      <p className="mt-3 rounded-xl bg-sensoria-fog/50 px-4 py-3 font-sans text-sm text-sensoria-graphite/80">
                        {lead.mensagem}
                      </p>
                    )}

                    {attrs.length > 0 && (
                      <details className="mt-3">
                        <summary className="cursor-pointer font-sans text-xs uppercase tracking-wide2 text-sensoria-graphite/50 hover:text-sensoria-green">
                          Atribuição ({attrs.length})
                        </summary>
                        <dl className="mt-2 grid gap-x-6 gap-y-1 font-sans text-xs text-sensoria-graphite/70 sm:grid-cols-2">
                          {attrs.map(([k, v]) => (
                            <div key={k} className="flex gap-1.5 break-all">
                              <dt className="font-medium text-sensoria-graphite/50">{k}:</dt>
                              <dd>{v}</dd>
                            </div>
                          ))}
                        </dl>
                      </details>
                    )}
                  </div>

                  {/* Ação: WhatsApp */}
                  <div className="flex-none">
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 font-sans text-sm font-medium text-white transition-opacity hover:opacity-90"
                      >
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </a>
                    ) : (
                      <span className="inline-flex h-11 items-center justify-center rounded-full border border-sensoria-fog px-5 font-sans text-xs text-sensoria-graphite/40">
                        Sem telefone
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  copyable,
}: {
  label: string;
  value: string | null;
  copyable?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="flex gap-1.5">
      <dt className="font-medium text-sensoria-graphite/50">{label}:</dt>
      <dd className="min-w-0 break-words">
        {copyable ? (
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(value)}
            title="Copiar"
            className="text-left hover:text-sensoria-green"
          >
            {value}
          </button>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
