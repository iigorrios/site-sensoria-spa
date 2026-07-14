import { getLocale, getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { formatBRL } from '@/lib/utils';
import { adicionais, type Locale } from '@/data/experiences';

/**
 * Seção compacta de serviços adicionais (complementos), reutilizada nas LPs de
 * Terapias e Jornadas. Formato leve (linhas com divisória, sem cards) para não
 * competir visualmente com a grade principal de experiências.
 */
export default async function AddonsSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('experiences');

  return (
    <section className="bg-sensoria-fog/40 py-20 md:py-24">
      <div className="container-editorial">
        <SectionHeading
          eyebrow={t('tabsAddons')}
          title={t('addonsIntro')}
          align="center"
          className="mx-auto"
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-x-10 gap-y-1 sm:grid-cols-2">
          {adicionais.map((a, i) => (
            <Reveal key={a.slug} index={i % 2}>
              <div className="flex items-start justify-between gap-5 border-b border-sensoria-fog py-5">
                <div>
                  <h3 className="font-display text-lg tracking-display text-sensoria-graphite">
                    {a.name[locale]}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-sensoria-graphite/60">
                    {a.description[locale]}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  {a.prices.map((p, idx) => (
                    <div key={idx}>
                      {p.duration && (
                        <span className="block font-sans text-[10px] uppercase tracking-wide2 text-sensoria-graphite/40">
                          {p.duration}
                        </span>
                      )}
                      <span className="font-display text-lg text-sensoria-green">
                        {formatBRL(p.individual ?? p.value ?? 0)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
