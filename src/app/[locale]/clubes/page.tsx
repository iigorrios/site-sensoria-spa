import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Check, Clock, Gift } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import LeadDialog from '@/components/LeadDialog';
import LeafIcon from '@/components/ui/LeafIcon';
import SkylineBg from '@/components/ui/SkylineBg';
import { cn, formatBRL } from '@/lib/utils';
import { alternatesFor } from '@/lib/seo';
import { clubs, giftback } from '@/data/clubes';
import type { Locale } from '@/data/experiences';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('clubesTitle'),
    description: t('clubesDescription'),
    alternates: alternatesFor(locale, '/clubes'),
  };
}

export default async function ClubesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const l = (await getLocale()) as Locale;
  const t = await getTranslations('clubes');
  const tc = await getTranslations('common');

  return (
    <div className="bg-sensoria-white">
      {/* Hero */}
      <section className="bg-sensoria-green pb-20 pt-36 text-sensoria-white md:pb-28 md:pt-44">
        <div className="container-editorial max-w-3xl">
          <Reveal>
            <span className="font-sans text-xs uppercase tracking-wide3 text-sensoria-cream">
              {t('eyebrow')}
            </span>
          </Reveal>
          <Reveal index={1}>
            <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] tracking-display md:text-6xl">
              {t('title')}
            </h1>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-sensoria-white/80 md:text-lg">
              {t('subtitle')}
            </p>
          </Reveal>
          <Reveal index={3} className="mt-9">
            <LeadDialog label={tc('bookWhatsapp')} source="clubes-hero" size="lg" variant="primary" />
          </Reveal>
        </div>
      </section>

      {/* Giftback — oferta de entrada */}
      <section className="py-20 md:py-24">
        <div className="container-editorial">
          <Reveal className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-sensoria-fog bg-sensoria-fog/30">
            <div className="grid items-center gap-8 p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-sensoria-green/10 px-3 py-1 font-sans text-xs uppercase tracking-wide2 text-sensoria-green">
                  <Gift className="h-3.5 w-3.5" />
                  {t('giftbackEyebrow')}
                </span>
                <h2 className="mt-4 font-display text-3xl tracking-display text-sensoria-graphite">
                  {t('giftbackTitle')}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-sensoria-graphite/75">
                  {giftback.description[l]}
                </p>
                <p className="mt-4 font-display text-xl text-sensoria-green">
                  {t('giftbackHighlight', { min: giftback.minutes, price: formatBRL(giftback.netPrice) })}
                </p>
                <p className="mt-3 font-sans text-xs uppercase tracking-wide2 text-sensoria-graphite/50">
                  {t('giftbackNote', { days: giftback.validityDays })}
                </p>
              </div>
              <div className="flex flex-col items-center rounded-2xl bg-sensoria-green px-6 py-8 text-center text-sensoria-white">
                <Gift className="mb-3 h-7 w-7 text-sensoria-cream" />
                <span className="font-display text-5xl tracking-display">
                  {formatBRL(giftback.benefits)}
                </span>
                <span className="mt-1 font-sans text-xs uppercase tracking-wide2 text-sensoria-cream">
                  {giftback.vouchers}× {formatBRL(giftback.voucherValue)}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Planos */}
      <section className="bg-sensoria-fog/40 py-20 md:py-28">
        <div className="container-editorial">
          <SectionHeading
            eyebrow={t('plansTitle')}
            title={t('plansText')}
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {clubs.map((club, i) => (
              <Reveal key={club.slug} index={i % 4}>
                <div
                  className={cn(
                    'flex h-full flex-col rounded-3xl border bg-sensoria-white p-7',
                    club.featured
                      ? 'border-sensoria-green shadow-lg ring-1 ring-sensoria-green/20'
                      : 'border-sensoria-fog'
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-wide2 text-sensoria-graphite/50">
                      <Clock className="h-3.5 w-3.5" style={{ color: club.accent }} />
                      {t('sessionOf', { min: club.minutes })}
                    </span>
                    {club.featured && (
                      <span className="rounded-full bg-sensoria-green px-2.5 py-1 font-sans text-[10px] uppercase tracking-wide2 text-sensoria-white">
                        {t('bestValue')}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-display text-2xl tracking-display text-sensoria-graphite">
                    {club.name}
                  </h3>
                  <p className="mt-1 text-sm italic text-sensoria-graphite/60">{club.tagline[l]}</p>

                  <div className="mt-5">
                    <span className="font-display text-3xl text-sensoria-green">{formatBRL(club.price)}</span>
                    <span className="ml-1 font-sans text-xs text-sensoria-graphite/50">{t('atSight')}</span>
                    <p className="mt-1 font-sans text-sm text-sensoria-graphite/60">
                      {club.totalSessions} {t('sessions')} · {formatBRL(club.perSession)} {t('perSession')}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-1 flex-col gap-3 border-t border-sensoria-fog pt-6">
                    <p className="flex items-start gap-2.5 text-sm leading-relaxed text-sensoria-graphite/80">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-sensoria-green" />
                      {t('investLine', { invest: club.investSessions, bonus: club.bonusSessions })}
                    </p>
                    <p className="flex items-start gap-2.5 text-sm leading-relaxed text-sensoria-graphite/80">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-sensoria-green" />
                      {t('installments', { plan: club.installments })}
                    </p>
                  </div>

                  <div className="mt-6 rounded-xl bg-sensoria-cream/50 px-4 py-3 text-center">
                    <span className="font-sans text-[11px] uppercase tracking-wide2 text-sensoria-graphite/50">
                      {t('pixBonus')}
                    </span>
                    <p className="font-display text-lg text-sensoria-green">{club.pixBonus[l]}</p>
                  </div>

                  <div className="mt-5">
                    <LeadDialog
                      label={tc('bookWhatsapp')}
                      source="clubes"
                      defaultExperience={club.name}
                      variant={club.featured ? 'green' : 'outline'}
                      className="w-full justify-center"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-sensoria-cream py-24 md:py-32">
        <SkylineBg />
        <div className="container-editorial relative z-10 flex flex-col items-center text-center">
          <LeafIcon tone="green" className="mb-6 w-28 text-sensoria-green" />
          <Reveal>
            <h2 className="max-w-2xl text-balance font-display text-4xl leading-[1.05] tracking-display text-sensoria-graphite md:text-5xl">
              {t('ctaTitle')}
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="mt-5 max-w-md text-base text-sensoria-graphite/70 md:text-lg">{t('ctaText')}</p>
          </Reveal>
          <Reveal index={2} className="mt-10">
            <LeadDialog label={tc('bookWhatsapp')} source="clubes-cta" size="lg" variant="green" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
