import { getLocale, getTranslations } from 'next-intl/server';
import { Check } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import ExperienceCard from '@/components/ExperienceCard';
import { formatBRL } from '@/lib/utils';
import { venitJornadas, type Locale } from '@/data/experiences';
import { venitIncludes, materaMeals, materaMenu } from '@/data/venit';

const MENU_GROUPS = ['starters', 'mains', 'desserts'] as const;

export default async function VenitSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('venit');
  const included = venitIncludes[locale];

  return (
    <section className="bg-sensoria-white py-24 md:py-32">
      <div className="container-editorial">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full bg-sensoria-green px-4 py-1.5 font-sans text-xs uppercase tracking-wide2 text-sensoria-white">
            {t('badge')}
          </span>
        </div>
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('text')}
          align="center"
          className="mx-auto mt-6"
        />

        {/* Jornadas exclusivas */}
        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {venitJornadas.map((exp, i) => (
            <ExperienceCard key={exp.slug} exp={exp} index={i} />
          ))}
        </div>

        {/* Inclusões comuns */}
        <div className="mt-16 rounded-3xl border border-sensoria-fog bg-sensoria-fog/30 p-8 md:p-12">
          <h3 className="font-display text-2xl tracking-display text-sensoria-graphite md:text-3xl">
            {t('includedTitle')}
          </h3>
          <div className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 flex-none text-sensoria-green" />
                <span className="text-sm leading-relaxed text-sensoria-graphite/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gastronomia by Matera */}
        <div className="mt-20">
          <SectionHeading
            eyebrow={t('gastronomyEyebrow')}
            title={t('gastronomyTitle')}
            description={t('gastronomyText')}
            align="center"
            className="mx-auto"
          />

          {/* Breakfast / Brunch */}
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {materaMeals.map((meal) => (
              <Reveal key={meal.key} className="flex h-full flex-col rounded-2xl border border-sensoria-fog p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="font-display text-xl tracking-display text-sensoria-graphite">
                    {t(`menu.${meal.key}`)}
                  </h4>
                  <span className="font-display text-lg text-sensoria-green">{formatBRL(meal.price)}</span>
                </div>
                <p className="mt-1 font-sans text-[11px] uppercase tracking-wide2 text-sensoria-graphite/40">
                  {t('menu.perPerson')}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-sensoria-graphite/70">
                  {meal.description[locale]}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Entradas / Principais / Sobremesas */}
          <div className="mx-auto mt-8 grid max-w-5xl gap-x-10 gap-y-12 md:grid-cols-3">
            {MENU_GROUPS.map((group) => (
              <div key={group}>
                <h4 className="border-b border-sensoria-fog pb-3 font-sans text-xs uppercase tracking-wide3 text-sensoria-green">
                  {t(`menu.${group}`)}
                </h4>
                <ul className="mt-5 flex flex-col gap-5">
                  {materaMenu[group].map((dish) => (
                    <li key={dish.name}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-base tracking-display text-sensoria-graphite">
                          {dish.name}
                        </span>
                        <span className="font-sans text-sm text-sensoria-green">{formatBRL(dish.price)}</span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-sensoria-graphite/60">
                        {dish.description[locale]}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
