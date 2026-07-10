'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import ExperienceCard from '@/components/ExperienceCard';
import { formatBRL, cn } from '@/lib/utils';
import { jornadas, terapias, adicionais, type Locale } from '@/data/experiences';

type Tab = 'journeys' | 'therapies' | 'addons';

export default function ExperiencesExplorer() {
  const t = useTranslations('experiences');
  const tc = useTranslations('common');
  const locale = useLocale() as Locale;
  const [tab, setTab] = useState<Tab>('journeys');

  const tabs: { key: Tab; label: string; intro: string }[] = [
    { key: 'journeys', label: t('tabsJourneys'), intro: t('journeysIntro') },
    { key: 'therapies', label: t('tabsTherapies'), intro: t('therapiesIntro') },
    { key: 'addons', label: t('tabsAddons'), intro: t('addonsIntro') },
  ];
  const active = tabs.find((x) => x.key === tab)!;

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-sensoria-fog">
        {tabs.map((x) => (
          <button
            key={x.key}
            onClick={() => setTab(x.key)}
            data-cursor="hover"
            className={cn(
              'relative px-5 py-3 font-sans text-sm tracking-wide transition-colors',
              tab === x.key ? 'text-sensoria-green' : 'text-sensoria-graphite/50 hover:text-sensoria-graphite'
            )}
          >
            {x.label}
            {tab === x.key && (
              <motion.span
                layoutId="tab-underline"
                className="absolute -bottom-px left-0 h-0.5 w-full bg-sensoria-green"
              />
            )}
          </button>
        ))}
      </div>

      <p className="mt-6 max-w-xl text-sensoria-graphite/70">{active.intro}</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          {tab === 'journeys' && (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {jornadas.map((exp, i) => (
                <ExperienceCard key={exp.slug} exp={exp} index={i} />
              ))}
            </div>
          )}

          {tab === 'therapies' && (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {terapias.map((exp, i) => (
                <ExperienceCard key={exp.slug} exp={exp} index={i} />
              ))}
            </div>
          )}

          {tab === 'addons' && (
            <div className="grid gap-6 md:grid-cols-2">
              {adicionais.map((a, i) => (
                <motion.div
                  key={a.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="flex items-start justify-between gap-6 rounded-2xl border border-sensoria-fog bg-sensoria-white p-6"
                >
                  <div>
                    <h3 className="font-display text-xl tracking-display text-sensoria-graphite">
                      {a.name[locale]}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-sensoria-graphite/70">
                      {a.description[locale]}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    {a.prices.map((p, idx) => (
                      <div key={idx}>
                        {p.duration && (
                          <span className="block font-sans text-xs uppercase tracking-wide2 text-sensoria-graphite/50">
                            {p.duration}
                          </span>
                        )}
                        <span className="font-display text-xl text-sensoria-green">
                          {formatBRL(p.individual ?? p.value ?? 0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* nota comum: o que toda experiência inclui */}
      {tab !== 'addons' && (
        <div className="mt-16 rounded-2xl bg-sensoria-fog/50 p-8 md:p-10">
          <h3 className="font-display text-2xl tracking-display text-sensoria-graphite">
            {t('alsoIncluded')}
          </h3>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-sensoria-graphite/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sensoria-green" />
                {t(`alsoIncludedList.${i}`)}
              </li>
            ))}
          </ul>
          <p className="sr-only">{tc('prices')}</p>
        </div>
      )}
    </div>
  );
}
