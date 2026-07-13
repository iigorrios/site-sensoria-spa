import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Check } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import LeadDialog from '@/components/LeadDialog';
import LeafIcon from '@/components/ui/LeafIcon';
import { cn, formatBRL } from '@/lib/utils';
import { clubs, clubBenefits } from '@/data/clubes';
import type { Locale } from '@/data/experiences';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('clubesTitle'), description: t('clubesDescription') };
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
  const benefits = clubBenefits[l];

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

      {/* Benefícios gerais */}
      <section className="py-24 md:py-32">
        <div className="container-editorial">
          <SectionHeading eyebrow={t('eyebrow')} title={t('benefitsTitle')} align="center" className="mx-auto" />
          <div className="mx-auto mt-14 grid max-w-4xl gap-x-8 gap-y-5 sm:grid-cols-2">
            {benefits.map((item, i) => (
              <Reveal key={item} index={i % 4}>
                <div className="flex items-start gap-3 border-t border-sensoria-fog pt-5">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-sensoria-green" />
                  <span className="text-sm leading-relaxed text-sensoria-graphite/80">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="bg-sensoria-fog/40 py-24 md:py-32">
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
                    club.featured ? 'border-sensoria-green shadow-lg ring-1 ring-sensoria-green/20' : 'border-sensoria-fog'
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: club.accent }} />
                      <h3 className="font-display text-2xl tracking-display text-sensoria-graphite">
                        {club.name}
                      </h3>
                    </div>
                    {club.featured && (
                      <span className="rounded-full bg-sensoria-green px-2.5 py-1 font-sans text-[10px] uppercase tracking-wide2 text-sensoria-white">
                        {t('mostComplete')}
                      </span>
                    )}
                  </div>

                  <div className="mt-5">
                    <span className="font-display text-3xl text-sensoria-green">{formatBRL(club.priceAtSight)}</span>
                    <span className="ml-1 font-sans text-xs text-sensoria-graphite/50">{t('atSight')}</span>
                    <p className="mt-1 font-sans text-sm text-sensoria-graphite/60">
                      {t('installments')}: {club.installments}
                    </p>
                  </div>

                  <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-sensoria-fog pt-6">
                    {[club.sessions[l], club.courtesy[l], club.vouchers[l], club.bonus[l]].map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-sensoria-green" />
                        <span className="text-sm leading-relaxed text-sensoria-graphite/80">{line}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-sensoria-green" />
                      <span className="text-sm leading-relaxed text-sensoria-graphite/80">
                        {t('validity')}: {club.validityDays} {t('days')}
                      </span>
                    </li>
                  </ul>

                  <div className="mt-6 rounded-xl bg-sensoria-cream/50 px-4 py-3 text-center">
                    <span className="font-sans text-[11px] uppercase tracking-wide2 text-sensoria-graphite/50">
                      {t('returnValue')}
                    </span>
                    <p className="font-display text-xl text-sensoria-green">{formatBRL(club.returnValue)}</p>
                  </div>

                  <div className="mt-5">
                    <LeadDialog
                      label={tc('bookWhatsapp')}
                      source="clubes"
                      defaultExperience={`Clube ${club.name}`}
                      variant={club.featured ? 'green' : 'outline'}
                      className="w-full justify-center"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-sensoria-graphite/50">
            {t('note')}
          </p>
        </div>
      </section>

      {/* Comparativo */}
      <section className="py-24 md:py-32">
        <div className="container-editorial max-w-3xl">
          <SectionHeading title={t('comparisonTitle')} align="center" className="mx-auto" />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-sensoria-fog">
                  <th className="py-4 font-sans text-xs uppercase tracking-wide2 text-sensoria-graphite/50">
                    {t('comparisonCol1')}
                  </th>
                  <th className="py-4 text-right font-sans text-xs uppercase tracking-wide2 text-sensoria-graphite/50">
                    {t('comparisonCol2')}
                  </th>
                  <th className="py-4 text-right font-sans text-xs uppercase tracking-wide2 text-sensoria-graphite/50">
                    {t('comparisonCol3')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {clubs.map((club) => (
                  <tr key={club.slug} className="border-b border-sensoria-fog/70">
                    <td className="flex items-center gap-2.5 py-4 font-display text-lg tracking-display text-sensoria-graphite">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: club.accent }} />
                      {club.name}
                    </td>
                    <td className="py-4 text-right font-sans text-sm text-sensoria-graphite/80">
                      {formatBRL(club.priceAtSight)}
                    </td>
                    <td className="py-4 text-right font-sans text-sm font-medium text-sensoria-green">
                      {formatBRL(club.returnValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sensoria-cream py-24 md:py-32">
        <div className="container-editorial flex flex-col items-center text-center">
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
