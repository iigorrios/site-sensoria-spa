import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';
import ExperiencesExplorer from '@/components/ExperiencesExplorer';
import { alternatesFor } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('experiencesTitle'),
    description: t('experiencesDescription'),
    alternates: alternatesFor(locale, '/experiencias'),
  };
}

export default async function ExperiencesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('experiences');

  return (
    <div className="bg-sensoria-white pb-24 pt-32 md:pt-40">
      <div className="container-editorial">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
        <div className="mt-16">
          <ExperiencesExplorer />
        </div>
      </div>
    </div>
  );
}
