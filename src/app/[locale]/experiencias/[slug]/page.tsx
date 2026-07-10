import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, Check, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import LeadDialog from '@/components/LeadDialog';
import Reveal from '@/components/motion/Reveal';
import { formatBRL } from '@/lib/utils';
import { allExperiences, getExperienceBySlug, type Locale } from '@/data/experiences';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allExperiences.map((exp) => ({ locale, slug: exp.slug }))
  );
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const exp = getExperienceBySlug(slug);
  if (!exp) return {};
  const l = locale as Locale;
  return {
    title: `${exp.name[l]} · Sensória Spa`,
    description: exp.subtitle[l],
  };
}

export default async function ExperienceDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const exp = getExperienceBySlug(slug);
  if (!exp) notFound();

  const l = locale as Locale;
  const t = await getTranslations('experiences');
  const tc = await getTranslations('common');
  const list = exp.includes?.[l] ?? exp.benefits?.[l] ?? [];
  const listTitle = exp.includes ? tc('includes') : t('benefits');

  return (
    <article className="bg-sensoria-white pb-24 pt-28 md:pt-32">
      {/* Hero da experiência */}
      <div className="relative h-[52vh] min-h-[380px] w-full overflow-hidden md:h-[62vh]">
        <ImagePlaceholder src={exp.image} alt={exp.name[l]} fill priority sizes="100vw" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-sensoria-graphite/70 via-sensoria-graphite/10 to-transparent" />
        <div className="container-editorial absolute inset-x-0 bottom-0 pb-10">
          <span className="font-sans text-xs uppercase tracking-wide3 text-sensoria-cream">
            {exp.category === 'jornada' ? t('tabsJourneys') : t('tabsTherapies')}
          </span>
          <h1 className="mt-2 font-display text-4xl tracking-display text-sensoria-white md:text-6xl">
            {exp.name[l]}
          </h1>
          <p className="mt-2 max-w-xl text-lg italic text-sensoria-fog">{exp.subtitle[l]}</p>
        </div>
      </div>

      <div className="container-editorial mt-12 grid gap-14 md:grid-cols-3">
        {/* Descrição + lista */}
        <div className="md:col-span-2">
          <Link
            href="/experiencias"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 font-sans text-sm uppercase tracking-wide2 text-sensoria-green"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {t('backToExperiences')}
          </Link>

          <Reveal className="mt-8">
            <p className="max-w-2xl text-lg leading-relaxed text-sensoria-graphite/80">
              {exp.description[l]}
            </p>
          </Reveal>

          {list.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl tracking-display text-sensoria-graphite">
                {listTitle}
              </h2>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {list.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sensoria-graphite/80">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-sensoria-green" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Card de preços */}
        <aside className="md:col-span-1">
          <div className="sticky top-28 rounded-2xl border border-sensoria-fog bg-sensoria-fog/30 p-7">
            <h2 className="font-sans text-xs uppercase tracking-wide3 text-sensoria-green">
              {tc('prices')}
            </h2>
            <ul className="mt-5 flex flex-col divide-y divide-sensoria-fog">
              {exp.prices.map((p, i) => (
                <li key={i} className="flex items-center justify-between gap-4 py-3">
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1.5 font-sans text-sm text-sensoria-graphite">
                      {p.duration && <Clock className="h-3.5 w-3.5 text-sensoria-graphite/50" />}
                      {p.label ? p.label[l] : p.duration}
                    </span>
                    {p.label && p.duration && (
                      <span className="font-sans text-xs text-sensoria-graphite/50">{p.duration}</span>
                    )}
                  </div>
                  <div className="text-right">
                    {typeof p.individual === 'number' && (
                      <span className="block font-display text-lg text-sensoria-green">
                        {formatBRL(p.individual)}
                        {!p.label && (
                          <span className="ml-1 font-sans text-[10px] uppercase tracking-wide2 text-sensoria-graphite/50">
                            {tc('individual')}
                          </span>
                        )}
                      </span>
                    )}
                    {typeof p.double === 'number' && (
                      <span className="block font-display text-base text-sensoria-graphite/70">
                        {formatBRL(p.double)}
                        <span className="ml-1 font-sans text-[10px] uppercase tracking-wide2 text-sensoria-graphite/40">
                          {tc('double')}
                        </span>
                      </span>
                    )}
                    {typeof p.value === 'number' && (
                      <span className="block font-display text-lg text-sensoria-green">
                        {formatBRL(p.value)}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <LeadDialog
                label={tc('bookWhatsapp')}
                context={exp.category}
                defaultExperience={exp.name[l]}
                source="experiencia-detalhe"
                variant="green"
                className="w-full justify-center"
              />
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
