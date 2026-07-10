import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import LandingPage from '@/components/LandingPage';
import { jornadas } from '@/data/experiences';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('jornadasTitle'), description: t('jornadasDescription') };
}

export default function JornadasLandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <LandingPage
      ns="jornadas"
      category="jornada"
      source="lp-jornadas"
      experiences={jornadas}
      heroImage="/images/lp/jornadas.jpg"
      locale={locale}
    />
  );
}
