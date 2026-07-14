'use client';

/**
 * Captação de atribuição (UTMs + click IDs) no navegador.
 * Guarda em localStorage no modelo "first-touch" (mantém a primeira origem),
 * mas sempre atualiza os click IDs (gclid/fbclid) mais recentes.
 */

const STORAGE_KEY = 'sensoria_attribution';

export const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];

export type Attribution = Partial<Record<AttributionKey, string>> & {
  referrer?: string;
  landing_page?: string;
};

/**
 * Placeholder ValueTrack do Google Ads não substituído (ex.: "{campaignid}",
 * "{creative}", "{keyword}", "{gclid}"). Nesses casos o anúncio veio com o
 * template literal — não devemos registrar isso como se fosse a origem real.
 */
function isPlaceholder(value?: string): boolean {
  return !!value && /[{}]/.test(value);
}

/** Remove valores que são placeholders ValueTrack não resolvidos. */
function sanitize(attr: Attribution): Attribution {
  const clean = { ...attr } as Record<string, string | undefined>;
  for (const k of Object.keys(clean)) {
    if (isPlaceholder(clean[k])) delete clean[k];
  }
  return clean as Attribution;
}

/** Lê os parâmetros da URL atual e persiste (first-touch). Chamar no load. */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const stored = getAttribution();

  const next: Attribution = { ...stored };
  let changed = false;

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)?.trim();
    // Ignora vazios e placeholders ValueTrack não substituídos ({campaignid}…).
    if (!value || isPlaceholder(value)) continue;
    // UTMs: first-touch (não sobrescreve). Click IDs: sempre o mais recente.
    const isClickId = key === 'gclid' || key === 'fbclid';
    if (isClickId || !next[key]) {
      if (next[key] !== value) {
        next[key] = value;
        changed = true;
      }
    }
  }

  if (!next.landing_page) {
    next.landing_page = window.location.pathname + window.location.search;
    changed = true;
  }
  if (!next.referrer && document.referrer) {
    next.referrer = document.referrer;
    changed = true;
  }

  if (changed) {
    const serialized = JSON.stringify(next);
    try {
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch {
      /* ignore */
    }
    // Espelha em cookie (90 dias) — resiliência caso o localStorage seja limpo
    // e disponibiliza a atribuição também no servidor, se necessário.
    try {
      document.cookie = `${STORAGE_KEY}=${encodeURIComponent(serialized)}; path=/; max-age=${60 * 60 * 24 * 90}; SameSite=Lax`;
    } catch {
      /* ignore */
    }
  }
}

export function getAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return sanitize(JSON.parse(raw) as Attribution);
  } catch {
    /* ignore */
  }
  // Fallback: cookie (caso o localStorage tenha sido limpo entre páginas).
  try {
    const cookie = readCookie(STORAGE_KEY);
    if (cookie) return sanitize(JSON.parse(cookie) as Attribution);
  } catch {
    /* ignore */
  }
  return {};
}

/** Lê um cookie pelo nome. */
function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[2]) : undefined;
}

/**
 * Cookies do Meta para o CAPI: _fbp e _fbc.
 * Se houver fbclid na URL mas o Pixel ainda não criou o _fbc, monta um.
 */
export function getMetaCookies(): { fbp?: string; fbc?: string } {
  const fbp = readCookie('_fbp');
  let fbc = readCookie('_fbc');
  if (!fbc && typeof window !== 'undefined') {
    const fbclid = new URLSearchParams(window.location.search).get('fbclid');
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
  }
  return { fbp, fbc };
}

/** ID único para deduplicar o evento entre Pixel (browser) e CAPI (servidor). */
export function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
