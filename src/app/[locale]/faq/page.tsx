import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';
import FaqAccordion from '@/components/FaqAccordion';
import LeadDialog from '@/components/LeadDialog';
import JsonLd from '@/components/JsonLd';
import { faqSchema } from '@/lib/jsonld';
import { alternatesFor } from '@/lib/seo';

const FAQ_COUNT = 8;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('faqTitle'),
    description: t('faqDescription'),
    alternates: alternatesFor(locale, '/faq'),
  };
}

export default async function FaqPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('faq');
  const tc = await getTranslations('common');
  const qa = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: t(`items.${i}.q`),
    a: t(`items.${i}.a`),
  }));

  return (
    <div className="bg-sensoria-white pb-24 pt-32 md:pt-40">
      <JsonLd data={faqSchema(qa)} />
      <div className="container-editorial max-w-4xl">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
        <div className="mt-14">
          <FaqAccordion />
        </div>
        <div className="mt-14 flex flex-col items-start gap-5 rounded-2xl bg-sensoria-fog/50 p-8 md:flex-row md:items-center md:justify-between">
          <p className="text-lg text-sensoria-graphite/80">{t('description')}</p>
          <LeadDialog label={tc('talkWhatsapp')} source="faq" variant="green" />
        </div>
      </div>
    </div>
  );
}
