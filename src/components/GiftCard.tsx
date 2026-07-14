import { getTranslations } from 'next-intl/server';
import { Gift, Clock, MapPin, Truck } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import Parallax from '@/components/motion/Parallax';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import LeadDialog from '@/components/LeadDialog';

const FEATURES = [
  { icon: Gift, key: 'f1' },
  { icon: Clock, key: 'f2' },
  { icon: MapPin, key: 'f3' },
  { icon: Truck, key: 'f4' },
] as const;

/** Seção de Cartão Presente (voucher) — presenteie uma experiência Sensória. */
export default async function GiftCard() {
  const t = await getTranslations('gift');
  const tc = await getTranslations('common');

  return (
    <section className="bg-sensoria-fog/40 py-24 md:py-32">
      <div className="container-editorial grid gap-14 md:grid-cols-2 md:items-center">
        <Parallax offset={40} className="order-2 aspect-[4/3] rounded-2xl md:order-1">
          <ImagePlaceholder
            src="/images/gift/cartao_presente.png"
            alt={t('title')}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="h-full w-full"
          />
        </Parallax>

        <div className="order-1 md:order-2">
          <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('subtitle')} />
          <Reveal index={2}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-sensoria-graphite/70">
              {t('text')}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal key={f.key} index={i} className="flex items-center gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-sensoria-green/10 text-sensoria-green">
                  <f.icon className="h-4 w-4" />
                </span>
                <span className="text-sm leading-snug text-sensoria-graphite/80">{t(f.key)}</span>
              </Reveal>
            ))}
          </div>

          <Reveal index={4} className="mt-9">
            <LeadDialog label={t('cta')} source="cartao-presente" variant="green" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
