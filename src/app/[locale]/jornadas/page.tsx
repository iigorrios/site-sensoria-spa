import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import LandingPage from '@/components/LandingPage';
import VenitSection from '@/components/VenitSection';
import JsonLd from '@/components/JsonLd';
import { itemListSchema, breadcrumbSchema, addonsSchema } from '@/lib/jsonld';
import { alternatesFor, SITE_URL } from '@/lib/seo';
import { jornadas, venitJornadas, type Locale } from '@/data/experiences';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('jornadasTitle'),
    description: t('jornadasDescription'),
    alternates: alternatesFor(locale, '/jornadas'),
  };
}

export default async function JornadasLandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const l = locale as Locale;
  const tn = await getTranslations('nav');
  const breadcrumb = breadcrumbSchema([
    { name: tn('home'), url: `${SITE_URL}/${l}` },
    { name: tn('jornadas'), url: `${SITE_URL}/${l}/jornadas` },
  ]);

  return (
    <>
      <JsonLd data={[itemListSchema([...jornadas, ...venitJornadas], l), breadcrumb, addonsSchema(l)]} />
      <LandingPage
        ns="jornadas"
        category="jornada"
        source="lp-jornadas"
        experiences={jornadas}
        heroImage="/images/lp/jornadas.png"
        extraSection={<VenitSection />}
      />
    </>
  );
}
