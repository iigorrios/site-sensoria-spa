import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from '@/components/ContactForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { siteConfig } from '@/config/site';
import { units } from '@/data/units';
import { whatsappMessages } from '@/lib/whatsapp';
import type { Locale } from '@/data/experiences';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('contactTitle'), description: t('contactDescription') };
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const tc = await getTranslations('common');
  const tu = await getTranslations('units');
  const l = locale as Locale;

  return (
    <div className="bg-sensoria-white pb-24 pt-32 md:pt-40">
      <div className="container-editorial">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

        <div className="mt-16 grid gap-14 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <aside className="lg:col-span-2">
            <div className="rounded-2xl bg-sensoria-green p-8 text-sensoria-white">
              <MessageCircle className="h-6 w-6 text-sensoria-cream" />
              <h3 className="mt-4 font-display text-2xl tracking-display">WhatsApp</h3>
              <p className="mt-2 text-sm text-sensoria-white/80">{t('description')}</p>
              <div className="mt-6">
                <WhatsAppButton label={tc('talkWhatsapp')} message={whatsappMessages.general[l]} variant="primary" />
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm">
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sensoria-white/85 hover:text-sensoria-white">
                  <Mail className="h-4 w-4" /> {siteConfig.email}
                </a>
                <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sensoria-white/85 hover:text-sensoria-white">
                  <Instagram className="h-4 w-4" /> {siteConfig.instagramHandle}
                </a>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-sensoria-fog p-8">
              <h3 className="font-sans text-xs uppercase tracking-wide3 text-sensoria-green">
                {tu('title')}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {units.map((u) => (
                  <li key={u.slug} className="text-sm text-sensoria-graphite/80">
                    <span className="font-medium text-sensoria-graphite">{u.name}</span>
                    <span className="text-sensoria-graphite/50"> · {u.city[l]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
