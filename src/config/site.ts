/**
 * Configuração central do site.
 */
export const siteConfig = {
  name: 'Sensória Spa',
  tagline: 'Carioca por Natureza',
  // URL de produção (usada em SEO / sitemap). TODO: ajustar ao domínio final.
  url: 'https://www.sensoriaspa.com.br',

  // WhatsApp central (formato internacional, só dígitos).
  whatsapp: '5521971476446',

  email: 'contato@sensoriaspa.com.br', // TODO: confirmar e-mail oficial
  instagram: 'https://www.instagram.com/sensoriaspa/',
  instagramHandle: '@sensoriaspa',
  facebook: 'https://www.facebook.com/spasensoria',
  youtube: 'https://www.youtube.com/@sensoriasp',
  tiktok: 'https://www.tiktok.com/@sensoriaspa',
  ecommerce: 'https://www.sensoria.com.br/',

  // Meta Pixel (browser). Definido em .env como NEXT_PUBLIC_META_PIXEL_ID.
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '',

  // Google Tag (browser). Um único tag serve GA4 e Google Ads.
  // NEXT_PUBLIC_GOOGLE_TAG_ID  → GT-XXXX (container do Google Tag)
  // NEXT_PUBLIC_GA4_ID         → G-XXXX  (usado nos eventos do GA4)
  // NEXT_PUBLIC_GOOGLE_ADS_ID  → AW-XXXX (conversões web, se um dia usar)
  googleTagId: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ?? '',
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? '',
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? '',

  locales: ['pt', 'en', 'es'] as const,
  defaultLocale: 'pt' as const,
};

export type Locale = (typeof siteConfig.locales)[number];
