import { siteConfig } from '@/config/site';
import { SITE_URL } from '@/lib/seo';
import { adicionais, getStartingPrice, type Experience, type Locale } from '@/data/experiences';
import { units, type Unit } from '@/data/units';

const ORG_ID = `${SITE_URL}/#organization`;
const PHONE = `+${siteConfig.whatsapp}`;
const SAME_AS = [
  siteConfig.instagram,
  siteConfig.facebook,
  siteConfig.youtube,
  siteConfig.tiktok,
  siteConfig.ecommerce,
];
const AREA_SERVED = [
  { '@type': 'City', name: 'Rio de Janeiro' },
  { '@type': 'City', name: 'Niterói' },
];

/** DaySpa da marca (nó global, referenciável por @id). */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DaySpa',
    '@id': ORG_ID,
    name: siteConfig.name,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/simbolo.png`,
    image: `${SITE_URL}/images/logo/simbolo.png`,
    telephone: PHONE,
    email: siteConfig.email,
    priceRange: 'R$$',
    slogan: siteConfig.tagline,
    areaServed: AREA_SERVED,
    sameAs: SAME_AS,
  };
}

/** Converte o campo `hours` da unidade em openingHoursSpecification[]. */
function openingHours(unit: Unit) {
  const dayMap: Record<string, string[]> = {
    weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    saturday: ['Saturday'],
    sunday: ['Sunday'],
    satHoliday: ['Saturday'],
    sunHoliday: ['Sunday'],
    holiday: [],
  };
  const specs: object[] = [];
  for (const h of unit.hours) {
    const days = dayMap[h.labelKey] ?? [];
    if (!h.value || days.length === 0) continue;
    const [opens, closes] = h.value.split(/[–-]/).map((s) => s.trim());
    if (!opens || !closes) continue;
    specs.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens, closes });
  }
  return specs;
}

/** Um DaySpa por unidade física (SEO local). */
export function unitsSchema() {
  return units.map((u) => ({
    '@context': 'https://schema.org',
    '@type': 'DaySpa',
    name: `${siteConfig.name} — ${u.name}`,
    parentOrganization: { '@type': 'Organization', name: siteConfig.name, '@id': ORG_ID },
    url: `${SITE_URL}/pt/unidades`,
    image: `${SITE_URL}${u.image}`,
    telephone: PHONE,
    priceRange: 'R$$',
    hasMap: u.mapsUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: u.address,
      postalCode: u.cep,
      addressLocality: u.city.pt,
      addressRegion: 'RJ',
      addressCountry: 'BR',
    },
    areaServed: AREA_SERVED,
    openingHoursSpecification: openingHours(u),
  }));
}

/** Service (tratamento/jornada) com Offer de preço "a partir de". */
export function serviceSchema(exp: Experience, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: exp.name[locale],
    serviceType: exp.category === 'jornada' ? 'Sensory journey / spa day' : 'Massage / body therapy',
    description: exp.description[locale],
    image: `${SITE_URL}${exp.image}`,
    url: `${SITE_URL}/${locale}/experiencias/${exp.slug}`,
    provider: { '@type': 'DaySpa', name: siteConfig.name, '@id': ORG_ID },
    areaServed: AREA_SERVED,
    offers: {
      '@type': 'Offer',
      price: getStartingPrice(exp),
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/${locale}/experiencias/${exp.slug}`,
    },
  };
}

/** ItemList das experiências de uma categoria (para as LPs). */
export function itemListSchema(list: Experience[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: list.map((exp, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: exp.name[locale],
      url: `${SITE_URL}/${locale}/experiencias/${exp.slug}`,
    })),
  };
}

/** BreadcrumbList a partir de pares nome/URL (URLs absolutas). */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** OfferCatalog dos serviços adicionais (complementos), com preços. */
export function addonsSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Serviços adicionais · Sensória Spa',
    itemListElement: adicionais.map((a) => ({
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: a.prices[0]?.individual ?? a.prices[0]?.value ?? 0,
      itemOffered: {
        '@type': 'Service',
        name: a.name[locale],
        description: a.description[locale],
        provider: { '@type': 'DaySpa', name: siteConfig.name, '@id': ORG_ID },
      },
    })),
  };
}

/** FAQPage a partir de pares pergunta/resposta. */
export function faqSchema(qa: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
