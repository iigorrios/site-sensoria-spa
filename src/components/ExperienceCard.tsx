'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { formatBRL } from '@/lib/utils';
import { getStartingPrice, type Experience, type Locale } from '@/data/experiences';

export default function ExperienceCard({ exp, index = 0 }: { exp: Experience; index?: number }) {
  const locale = useLocale() as Locale;
  const t = useTranslations('common');
  const durations = exp.prices.map((p) => p.duration).filter(Boolean);
  const startPrice = getStartingPrice(exp);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/experiencias/${exp.slug}`} data-cursor="hover" className="group block">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
          <div className="absolute inset-0 transition-transform duration-700 ease-smooth group-hover:scale-105">
            <ImagePlaceholder src={exp.image} alt={exp.name[locale]} fill sizes="(max-width:768px) 100vw, 33vw" className="h-full w-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-sensoria-graphite/60 via-transparent to-transparent" />
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-sensoria-cream text-sensoria-graphite opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
          {durations.length > 0 && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-sensoria-white/90 px-3 py-1 font-sans text-xs text-sensoria-graphite backdrop-blur">
              <Clock className="h-3 w-3" />
              {durations[0]}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl leading-tight tracking-display text-sensoria-graphite">
              {exp.name[locale]}
            </h3>
            <p className="mt-1 text-sm italic text-sensoria-graphite/60">{exp.subtitle[locale]}</p>
          </div>
        </div>
        <p className="mt-3 font-sans text-sm text-sensoria-green">
          {t('from')} {formatBRL(startPrice)}
        </p>
      </Link>
    </motion.div>
  );
}
