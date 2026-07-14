import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import LandingPage from '@/components/LandingPage';
import JsonLd from '@/components/JsonLd';
import { itemListSchema, breadcrumbSchema, addonsSchema } from '@/lib/jsonld';
import { alternatesFor, SITE_URL } from '@/lib/seo';
import { terapias, type Locale } from '@/data/experiences';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('terapiasTitle'),
    description: t('terapiasDescription'),
    alternates: alternatesFor(locale, '/terapias'),
  };
}

export default async function TerapiasLandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const l = locale as Locale;
  const tn = await getTranslations('nav');
  const breadcrumb = breadcrumbSchema([
    { name: tn('home'), url: `${SITE_URL}/${l}` },
    { name: tn('terapias'), url: `${SITE_URL}/${l}/terapias` },
  ]);

  return (
    <>
      <JsonLd data={[itemListSchema(terapias, l), breadcrumb, addonsSchema(l)]} />
      <LandingPage
        ns="terapias"
        category="terapia"
        source="lp-terapias"
        experiences={terapias}
        heroImage="/images/lp/terapias.jpg"
      />
    </>
  );
}
