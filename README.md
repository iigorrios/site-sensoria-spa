# Sensória Spa — Site Institucional

Site premium (padrão awwwards, referência [scandinave.com](https://www.scandinave.com/))
para a **Sensória Spa** — spa urbano carioca. Web + mobile, multilíngue (PT/EN/ES),
com hero em vídeo, scroll suave, transições e cursor customizado.

## Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design system da marca)
- **Framer Motion** + **Lenis** (scroll suave) + **GSAP** (efeitos)
- **next-intl** (i18n por rota: `/pt`, `/en`, `/es`)
- **Supabase** (formulário de contato) · **react-hook-form** + **zod**

## Começando

```bash
npm install
cp .env.example .env.local   # preencha com o seu Supabase
npm run dev                  # http://localhost:3000  → redireciona p/ /pt
```

`npm run build` gera a versão de produção; `npm start` roda o build.

## Configuração obrigatória

1. **Dados da marca** — edite `src/config/site.ts`:
   - `whatsapp` (número em formato internacional, só dígitos, ex.: `5521999999999`)
   - `email`, `instagram`, `url` (domínio de produção)

2. **Supabase (formulário de contato)** — projeto seu:
   - Rode o SQL de [`supabase/schema.sql`](./supabase/schema.sql) no SQL Editor.
   - Preencha `.env.local` com `NEXT_PUBLIC_SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`.
   - Os envios são gravados na tabela `contact_submissions` pelo servidor
     (`src/app/api/contact/route.ts`) — a service role key nunca vai para o cliente.

3. **Imagens, vídeo e fontes** — veja [`public/ASSETS.md`](./public/ASSETS.md).
   Cada arquivo tem um caminho fixo; enquanto não existir, aparece um placeholder.
   As Landing Pages usam `public/images/lp/terapias.jpg` e `.../jornadas.jpg`.

4. **Meta Ads (Pixel + Conversions API)** — opcional, mas recomendado para
   campanhas. Preencha no `.env.local`:
   - `NEXT_PUBLIC_META_PIXEL_ID` — ID do Pixel (usado no navegador **e** no servidor).
   - `META_CAPI_ACCESS_TOKEN` — token da Conversions API (**só servidor**).
   - `META_TEST_EVENT_CODE` — opcional, para validar na aba "Testar eventos".

   Com isso, cada envio de formulário dispara o evento **Lead** por dois caminhos —
   Pixel (navegador) e Conversions API (servidor) — compartilhando o mesmo
   `event_id`, o que faz o Meta **deduplicar** e contar uma única conversão.
   Sem as variáveis, o site funciona normalmente e nada é enviado ao Meta.

## Marketing & atribuição

- **Landing Pages**: `/terapias` e `/jornadas` (headline focada no público-alvo,
  ofertas da categoria e formulário enxuto). A Home apresenta só os dois caminhos
  e direciona para elas — o catálogo completo segue em `/experiencias`.
- **Árvore de links** (link-in-bio): [`/links`](http://localhost:3000/links) —
  página standalone (sem cabeçalho/rodapé, fora da i18n) para a bio das redes.
  Cada botão já sai com `?utm_source=linktree&utm_medium=bio`.
- **Captura de UTMs**: `utm_source/medium/campaign/content/term` + `gclid` + `fbclid`
  são capturados no primeiro acesso (first-touch, em `localStorage`) por
  `src/lib/tracking.ts` e enviados em **todos** os formulários (Home, LPs e /contato),
  gravando as colunas correspondentes no Supabase.
- **Colunas novas no banco**: rode novamente o bloco de `ALTER TABLE` em
  [`supabase/schema.sql`](./supabase/schema.sql) (seguro repetir — usa `IF NOT EXISTS`).

## Estrutura

```
src/
  app/[locale]/            rotas localizadas (home, experiencias, unidades, sobre, faq, contato)
  app/api/contact/         endpoint do formulário (Supabase, server-only)
  components/              UI + componentes de marca
  components/motion/       SmoothScroll, Reveal, Parallax, PageTransition, Preloader, CustomCursor
  data/                    experiences.ts (Jornadas/Terapias/Adicionais) + units.ts
  i18n/                    routing, request e messages/{pt,en,es}.json
  lib/                     utils, fonts, supabase, whatsapp, contact-schema
  config/site.ts           dados da marca (WhatsApp, e-mail, redes)
```

## Conteúdo (i18n)
- **Textos de interface**: `src/i18n/messages/*.json`.
- **Experiências (nome, descrição, preços)**: `src/data/experiences.ts` — cada campo
  tem versões `pt` / `en` / `es`. Preços e endereços vieram dos PDFs oficiais.

## Deploy (Vercel)
1. Importe o repositório na Vercel (framework detectado: **Next.js**, sem config extra).
2. Em **Settings → Environment Variables**, adicione as mesmas chaves do `.env.local`:
   `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` e, se for usar o Meta,
   `NEXT_PUBLIC_META_PIXEL_ID` + `META_CAPI_ACCESS_TOKEN` (deixe `META_TEST_EVENT_CODE`
   só em Preview). Marque a service role e o token da CAPI apenas para o ambiente de
   servidor (não são `NEXT_PUBLIC`).
3. Ajuste `siteConfig.url` em `src/config/site.ts` para o domínio final e configure o
   domínio na Vercel. `sitemap.xml` e `robots.txt` são gerados automaticamente e já
   incluem `/terapias`, `/jornadas` e `/links`.
