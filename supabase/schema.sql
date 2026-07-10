-- ============================================================
--  Sensória Spa — schema do formulário de contato/agendamento
--  Rode este SQL no SQL Editor do SEU projeto Supabase.
-- ============================================================

create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nome        text not null,
  email       text not null,
  telefone    text,
  unidade     text,          -- unidade de interesse
  experiencia text,          -- experiência/pacote de interesse (opcional)
  mensagem    text not null,
  origem      text default 'site'
);

-- Habilita Row Level Security.
alter table public.contact_submissions enable row level security;

-- IMPORTANTE:
-- O site insere os registros pelo SERVIDOR (Route Handler /api/contact)
-- usando a SERVICE ROLE KEY, que ignora RLS. Portanto NÃO criamos policy
-- de INSERT para o papel `anon` — assim o anon key público não consegue
-- ler nem gravar nada nesta tabela. (Sem policy de SELECT = leitura bloqueada.)

-- (Opcional) Índice para ordenar/consultar por data no painel:
create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

-- ============================================================
--  Colunas de campanha / atribuição (UTMs + click IDs).
--  Rode este bloco também (seguro rodar novamente — usa IF NOT EXISTS).
-- ============================================================
alter table public.contact_submissions add column if not exists categoria     text;
alter table public.contact_submissions add column if not exists utm_source    text;
alter table public.contact_submissions add column if not exists utm_medium    text;
alter table public.contact_submissions add column if not exists utm_campaign  text;
alter table public.contact_submissions add column if not exists utm_content   text;
alter table public.contact_submissions add column if not exists utm_term      text;
alter table public.contact_submissions add column if not exists gclid         text;
alter table public.contact_submissions add column if not exists fbclid        text;
alter table public.contact_submissions add column if not exists referrer      text;
alter table public.contact_submissions add column if not exists landing_page  text;
