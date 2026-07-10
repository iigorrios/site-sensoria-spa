import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import LandingPage from '@/components/LandingPage';
import { terapias } from '@/data/experiences';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('terapiasTitle'), description: t('terapiasDescription') };
}

export default function TerapiasLandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <LandingPage
      ns="terapias"
      category="terapia"
      source="lp-terapias"
      experiences={terapias}
      heroImage="/images/lp/terapias.jpg"
      locale={locale}
    />
  );
}
