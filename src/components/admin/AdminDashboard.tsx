'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MessageCircle,
  LogOut,
  Search,
  AlertCircle,
  Users,
  CalendarDays,
  CalendarClock,
  Phone,
  X,
  Download,
} from 'lucide-react';
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
const dayLabelFmt = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' });

/** Presets do filtro de período. value = nº de dias (''=todo o período). */
const PERIOD_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'Todo o período' },
  { value: '1', label: 'Hoje' },
  { value: '7', label: 'Últimos 7 dias' },
  { value: '14', label: 'Últimos 14 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: '90', label: 'Últimos 90 dias' },
];

/** Início do dia (00:00) N dias atrás (N=0 → hoje). */
function startOfDayAgo(days: number): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - days);
  return d;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
}

/** Chave de dia local "AAAA-MM-DD" a partir de um ISO (para agrupar por data). */
function dayKey(iso: string | Date): string {
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  if (Number.isNaN(d.getTime())) return '';
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Valores distintos, sem vazios, ordenados (para popular os selects). */
function distinct(values: (string | null)[]): string[] {
  const set = new Set<string>();
  for (const v of values) {
    const t = v?.trim();
    if (t) set.add(t);
  }
  return [...set].sort((a, b) => a.localeCompare(b, 'pt-BR'));
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

/** Colunas exportadas no CSV (ordem e cabeçalho). */
const CSV_COLUMNS: { key: keyof LeadRow; header: string }[] = [
  { key: 'created_at', header: 'Data' },
  { key: 'nome', header: 'Nome' },
  { key: 'email', header: 'E-mail' },
  { key: 'telefone', header: 'Telefone' },
  { key: 'unidade', header: 'Unidade' },
  { key: 'experiencia', header: 'Experiência' },
  { key: 'categoria', header: 'Categoria' },
  { key: 'mensagem', header: 'Mensagem' },
  { key: 'origem', header: 'Origem' },
  { key: 'utm_source', header: 'utm_source' },
  { key: 'utm_medium', header: 'utm_medium' },
  { key: 'utm_campaign', header: 'utm_campaign' },
  { key: 'utm_content', header: 'utm_content' },
  { key: 'utm_term', header: 'utm_term' },
  { key: 'gclid', header: 'gclid' },
  { key: 'fbclid', header: 'fbclid' },
  { key: 'referrer', header: 'referrer' },
  { key: 'landing_page', header: 'landing_page' },
];

/** Escapa um valor para CSV (aspas duplas + escape de aspas internas). */
function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

/** Gera e baixa um CSV (delimitador ";" + BOM UTF-8, amigável ao Excel pt-BR). */
function downloadCsv(rows: LeadRow[]): void {
  const header = CSV_COLUMNS.map((c) => csvCell(c.header)).join(';');
  const body = rows
    .map((row) =>
      CSV_COLUMNS.map((c) => {
        const raw = row[c.key];
        // Data em formato legível; demais campos como texto (ou vazio).
        const val =
          c.key === 'created_at' && raw ? formatDate(String(raw)) : raw == null ? '' : String(raw);
        return csvCell(val);
      }).join(';')
    )
    .join('\r\n');
  const csv = '﻿' + header + '\r\n' + body;

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads-sensoria-${dayKey(new Date())}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
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
  const [unidade, setUnidade] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [period, setPeriod] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  // Opções dos selects — a partir de TODOS os leads (não some ao filtrar).
  const unidadeOptions = useMemo(() => distinct(leads.map((l) => l.unidade)), [leads]);
  const experienciaOptions = useMemo(
    () => distinct(leads.map((l) => l.experiencia)),
    [leads]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const periodDays = period ? Number(period) : 0;
    const cutoff = periodDays > 0 ? startOfDayAgo(periodDays - 1).getTime() : 0;
    return leads.filter((l) => {
      if (unidade && l.unidade !== unidade) return false;
      if (experiencia && l.experiencia !== experiencia) return false;
      if (cutoff) {
        const t = new Date(l.created_at).getTime();
        if (Number.isNaN(t) || t < cutoff) return false;
      }
      if (!q) return true;
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
  }, [leads, query, unidade, experiencia, period]);

  const hasFilters = !!(query || unidade || experiencia || period);

  // Métricas (refletem o conjunto filtrado).
  const stats = useMemo(() => {
    const now = new Date();
    const byDay = new Map<string, number>();
    const bySource = new Map<string, number>();
    let withPhone = 0;

    for (const l of filtered) {
      const k = dayKey(l.created_at);
      if (k) byDay.set(k, (byDay.get(k) ?? 0) + 1);
      if (normalizePhoneBR(l.telefone)) withPhone++;
      const src = l.utm_source?.trim() || 'Direto / Orgânico';
      bySource.set(src, (bySource.get(src) ?? 0) + 1);
    }

    // Série diária — acompanha o período (limitada a 31 barras para legibilidade).
    const chartDays = period ? Math.min(Number(period), 31) : 14;
    const days: { key: string; label: string; count: number }[] = [];
    for (let i = chartDays - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = dayKey(d);
      days.push({ key, label: dayLabelFmt.format(d), count: byDay.get(key) ?? 0 });
    }
    const maxDay = Math.max(1, ...days.map((d) => d.count));
    const showDayLabels = chartDays <= 16;
    const today = days[days.length - 1]?.count ?? 0;
    const last7 = days.slice(-7).reduce((s, d) => s + d.count, 0);

    const sources = [...bySource.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    const maxSource = Math.max(1, ...sources.map((s) => s.count));

    return {
      total: filtered.length,
      today,
      last7,
      withPhone,
      days,
      maxDay,
      showDayLabels,
      sources,
      maxSource,
    };
  }, [filtered, period]);

  async function logout() {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  }

  function clearFilters() {
    setQuery('');
    setUnidade('');
    setExperiencia('');
    setPeriod('');
  }

  const selectClass =
    'h-11 w-full rounded-xl border border-sensoria-fog bg-white px-3 font-sans text-sm text-sensoria-graphite outline-none transition-colors focus:border-sensoria-green';

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
              {leads.length} {leads.length === 1 ? 'lead' : 'leads'} no total
              {hasFilters && ` · ${filtered.length} no filtro`}
            </p>
          </div>
          <div className="flex items-center gap-2 self-start">
            <button
              onClick={() => downloadCsv(filtered)}
              disabled={filtered.length === 0}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-sensoria-green px-5 font-sans text-sm font-medium text-white transition-colors hover:bg-[#516353] disabled:opacity-50"
            >
              <Download className="h-4 w-4" /> Exportar CSV
            </button>
            <button
              onClick={logout}
              disabled={loggingOut}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-sensoria-fog bg-white px-5 font-sans text-sm font-medium text-sensoria-graphite transition-colors hover:bg-sensoria-fog disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" /> Sair
            </button>
          </div>
        </div>

        {loadError && (
          <p className="mt-6 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 flex-none" /> Erro ao carregar: {loadError}
          </p>
        )}

        {/* KPIs */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Kpi icon={<Users className="h-5 w-5" />} label="Leads (filtro)" value={stats.total} />
          <Kpi icon={<CalendarDays className="h-5 w-5" />} label="Hoje" value={stats.today} />
          <Kpi icon={<CalendarClock className="h-5 w-5" />} label="Últimos 7 dias" value={stats.last7} />
          <Kpi icon={<Phone className="h-5 w-5" />} label="Com telefone" value={stats.withPhone} />
        </div>

        {/* Gráficos */}
        <div className="mt-4 grid gap-4 lg:grid-cols-5">
          {/* Leads por dia (14 dias) */}
          <section className="rounded-2xl border border-sensoria-fog bg-white p-5 lg:col-span-3">
            <h2 className="font-sans text-xs uppercase tracking-wide2 text-sensoria-graphite/50">
              Leads por dia · {stats.days.length} dias
            </h2>
            <div className="mt-5 flex h-36 items-stretch gap-1.5">
              {stats.days.map((d) => (
                <div
                  key={d.key}
                  className="group flex flex-1 flex-col items-center gap-1"
                  title={`${d.label}: ${d.count} lead(s)`}
                >
                  {/* Pista da barra: flex-1 dá altura definida, contra a qual o
                      height:% da barra resolve. O rótulo fica FORA da pista para
                      não comer a altura disponível. */}
                  <div className="flex w-full flex-1 flex-col items-center justify-end">
                    <span className="font-sans text-[10px] font-medium text-sensoria-graphite/50 opacity-0 transition-opacity group-hover:opacity-100">
                      {d.count}
                    </span>
                    <div
                      className="w-full rounded-t bg-sensoria-green/80 transition-colors group-hover:bg-sensoria-green"
                      style={{ height: `${Math.max(d.count ? 6 : 2, (d.count / stats.maxDay) * 100)}%` }}
                    />
                  </div>
                  {stats.showDayLabels && (
                    <span className="font-sans text-[9px] text-sensoria-graphite/40">{d.label}</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Fontes */}
          <section className="rounded-2xl border border-sensoria-fog bg-white p-5 lg:col-span-2">
            <h2 className="font-sans text-xs uppercase tracking-wide2 text-sensoria-graphite/50">
              Fontes (utm_source)
            </h2>
            {stats.sources.length === 0 ? (
              <p className="mt-4 font-sans text-sm text-sensoria-graphite/40">Sem dados.</p>
            ) : (
              <ul className="mt-4 flex flex-col gap-2.5">
                {stats.sources.slice(0, 8).map((s) => (
                  <li key={s.name}>
                    <div className="flex items-center justify-between font-sans text-xs text-sensoria-graphite/70">
                      <span className="truncate pr-2">{s.name}</span>
                      <span className="flex-none font-medium text-sensoria-graphite">{s.count}</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-sensoria-fog">
                      <div
                        className="h-full rounded-full bg-sensoria-green"
                        style={{ width: `${(s.count / stats.maxSource) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Filtros */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto_auto]">
          <div className="flex items-center gap-2 rounded-xl border border-sensoria-fog bg-white px-4">
            <Search className="h-4 w-4 flex-none text-sensoria-graphite/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome, e-mail, telefone, campanha…"
              className="h-11 w-full bg-transparent font-sans text-sm text-sensoria-graphite outline-none placeholder:text-sensoria-graphite/40"
            />
          </div>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className={selectClass}
            aria-label="Filtrar por período"
          >
            {PERIOD_OPTIONS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          <select
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
            className={selectClass}
            aria-label="Filtrar por unidade"
          >
            <option value="">Todas as unidades</option>
            {unidadeOptions.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <select
            value={experiencia}
            onChange={(e) => setExperiencia(e.target.value)}
            className={selectClass}
            aria-label="Filtrar por experiência"
          >
            <option value="">Todas as experiências</option>
            {experienciaOptions.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-sensoria-fog bg-white px-4 font-sans text-sm text-sensoria-graphite/70 transition-colors hover:bg-sensoria-fog"
            >
              <X className="h-4 w-4" /> Limpar
            </button>
          )}
        </div>

        {!loadError && filtered.length === 0 && (
          <p className="mt-10 text-center font-sans text-sm text-sensoria-graphite/50">
            {leads.length === 0
              ? 'Nenhum lead cadastrado ainda.'
              : 'Nenhum lead corresponde aos filtros.'}
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

function Kpi({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-sensoria-fog bg-white p-5">
      <div className="flex items-center gap-2 text-sensoria-green">
        {icon}
        <span className="font-sans text-xs uppercase tracking-wide2 text-sensoria-graphite/50">
          {label}
        </span>
      </div>
      <p className="mt-2 font-display text-3xl tracking-display text-sensoria-graphite">{value}</p>
    </div>
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
