import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';
import { allExperiences } from '@/data/experiences';

const staticPaths = ['', '/terapias', '/jornadas', '/experiencias', '/unidades', '/sobre', '/faq', '/contato'];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.7,
      });
    }
    for (const exp of allExperiences) {
      entries.push({
        url: `${base}/${locale}/experiencias/${exp.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
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
