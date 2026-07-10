import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapPin, Navigation } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import WhatsAppButton from '@/components/WhatsAppButton';
import { units } from '@/data/units';
import { whatsappMessages } from '@/lib/whatsapp';
import type { Locale } from '@/data/experiences';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('unitsTitle'), description: t('unitsDescription') };
}

export default async function UnitsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('units');
  const tc = await getTranslations('common');
  const l = locale as Locale;

  return (
    <div className="bg-sensoria-white pb-24 pt-32 md:pt-40">
      <div className="container-editorial">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />

        <div className="mt-16 flex flex-col gap-16">
          {units.map((u, i) => (
            <Reveal key={u.slug} index={0}>
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="aspect-[3/2] overflow-hidden rounded-2xl">
                    <ImagePlaceholder
                      src={u.image}
                      alt={u.name}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="h-full w-full"
                    />
                  </div>
                </div>

                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <span className="font-sans text-xs uppercase tracking-wide3 text-sensoria-green">
                    {u.city[l]}
                  </span>
                  <h2 className="mt-2 font-display text-3xl tracking-display text-sensoria-graphite md:text-4xl">
                    {u.name}
                  </h2>

                  <div className="mt-5 flex items-start gap-3 text-sensoria-graphite/75">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sensoria-green" />
                    <p className="text-sm leading-relaxed">
                      {u.address}
                      <br />
                      CEP {u.cep}
                    </p>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-sans text-xs uppercase tracking-wide2 text-sensoria-graphite/50">
                      {t('hours')}
                    </h3>
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {u.hours.map((h, idx) => (
                        <li key={idx} className="flex justify-between gap-6 text-sm text-sensoria-graphite/80">
                          <span>{t(h.labelKey)}</span>
                          <span className="tabular-nums">{h.value ?? t('closed')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(u.mapsQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-sensoria-green px-6 font-sans text-sm text-sensoria-green transition-colors hover:bg-sensoria-green hover:text-sensoria-white"
                    >
                      <Navigation className="h-4 w-4" />
                      {tc('getDirections')}
                    </a>
                    <WhatsAppButton
                      label={tc('bookWhatsapp')}
                      message={whatsappMessages.unit(u.name, l)}
                      variant="green"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
