'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import LeadDialog from '@/components/LeadDialog';
import { getStartingPrice, type Locale } from '@/data/experiences';
import { durationLabel, type Recommendation } from '@/lib/advisor';

interface AdvisorResultCardProps {
  rec: Recommendation;
  /** Unidade escolhida no assistente, para pré-preencher o formulário. */
  unidade?: string;
  /** Fecha o painel quando a pessoa navega para a página da experiência. */
  onNavigate?: () => void;
}

export default function AdvisorResultCard({ rec, unidade, onNavigate }: AdvisorResultCardProps) {
  const t = useTranslations('advisor');
  const locale = useLocale() as Locale;
  const { exp, reason } = rec;

  const duration = durationLabel(exp);
  const price = getStartingPrice(exp);

  return (
    <article className="overflow-hidden rounded-2xl border border-sensoria-fog bg-sensoria-white">
      <div className="relative aspect-[16/9]">
        <ImagePlaceholder src={exp.image} alt={exp.name[locale]} fill sizes="360px" className="h-full w-full" />
      </div>

      <div className="p-4">
        <h4 className="font-display text-xl leading-tight tracking-display text-sensoria-graphite">
          {exp.name[locale]}
        </h4>

        <p className="mt-1 text-xs text-sensoria-graphite/50">
          {[
            duration,
            price ? `${t('result.from')} R$ ${price}` : null,
            exp.exclusive?.[locale],
          ]
            .filter(Boolean)
            .join(' · ')}
        </p>

        <p className="mt-3 text-sm leading-snug text-sensoria-graphite/70">{t(`reasons.${reason}`)}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <LeadDialog
            label={t('want')}
            source="assistente"
            context={exp.category}
            defaultExperience={exp.name[locale]}
            defaultUnit={unidade}
            variant="green"
          />
          <Link
            href={`/experiencias/${exp.slug}`}
            onClick={onNavigate}
            className="inline-flex items-center gap-1 rounded-full px-3 py-2 font-sans text-sm text-sensoria-graphite/60 transition-colors hover:text-sensoria-graphite"
          >
            {t('see')}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
