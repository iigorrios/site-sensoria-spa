import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

/** Códigos hreflang por locale do site. */
const HREFLANG: Record<string, string> = { pt: 'pt-BR', en: 'en', es: 'es' };

/** URL absoluta do site sem barra final. */
export const SITE_URL = siteConfig.url.replace(/\/$/, '');

/** Monta uma URL absoluta para um caminho já com locale (ex.: `/pt/terapias`). */
export function absoluteUrl(path = ''): string {
  return `${SITE_URL}${path}`;
}

/**
 * `alternates` (canonical + hreflang) para o `generateMetadata` de uma página.
 * @param locale locale atual (pt/en/es)
 * @param path caminho sem locale, começando com "/" (ex.: "/terapias") ou "" para a home.
 */
export function alternatesFor(locale: string, path = ''): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const l of siteConfig.locales) {
    languages[HREFLANG[l]] = `/${l}${path}`;
  }
  languages['x-default'] = `/${siteConfig.defaultLocale}${path}`;

  return {
    canonical: `/${locale}${path}`,
    languages,
  };
}
