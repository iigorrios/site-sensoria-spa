import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';
import { allExperiences } from '@/data/experiences';

const staticPaths = ['', '/terapias', '/jornadas', '/clubes', '/experiencias', '/unidades', '/sobre', '/faq', '/contato'];

const base = siteConfig.url.replace(/\/$/, '');
const HREFLANG: Record<string, string> = { pt: 'pt-BR', en: 'en', es: 'es' };

/** Mapa hreflang -> URL para um caminho sem locale (ex.: "/terapias"). */
function languages(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of routing.locales) langs[HREFLANG[l]] = `${base}/${l}${path}`;
  langs['x-default'] = `${base}/${routing.defaultLocale}${path}`;
  return langs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.7,
        alternates: { languages: languages(path) },
      });
    }
    for (const exp of allExperiences) {
      const path = `/experiencias/${exp.slug}`;
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: { languages: languages(path) },
      });
    }
  }

  // Árvore de links (standalone, fora da i18n).
  entries.push({
    url: `${base}/links`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  });

  return entries;
}
