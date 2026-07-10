import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';
import FaqAccordion from '@/components/FaqAccordion';
import WhatsAppButton from '@/components/WhatsAppButton';
import { whatsappMessages } from '@/lib/whatsapp';
import type { Locale } from '@/data/experiences';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('faqTitle'), description: t('faqDescription') };
}

export default async function FaqPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('faq');
  const tc = await getTranslations('common');
  const l = locale as Locale;

  return (
    <div className="bg-sensoria-white pb-24 pt-32 md:pt-40">
      <div className="container-editorial max-w-4xl">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
        <div className="mt-14">
          <FaqAccordion />
        </div>
        <div className="mt-14 flex flex-col items-start gap-5 rounded-2xl bg-sensoria-fog/50 p-8 md:flex-row md:items-center md:justify-between">
          <p className="text-lg text-sensoria-graphite/80">{t('description')}</p>
          <WhatsAppButton label={tc('talkWhatsapp')} message={whatsappMessages.general[l]} variant="green" />
        </div>
      </div>
    </div>
  );
}
