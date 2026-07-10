import { getTranslations } from 'next-intl/server';
import { Check } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import ExperienceCard from '@/components/ExperienceCard';
import LeadForm from '@/components/LeadForm';
import LeadDialog from '@/components/LeadDialog';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import LeafAccent from '@/components/ui/LeafAccent';
import type { Experience } from '@/data/experiences';

interface LandingPageProps {
  /** Chave do namespace de mensagens em `lp`. */
  ns: 'terapias' | 'jornadas';
  /** Categoria usada no lead + mensagem do WhatsApp. */
  category: 'terapia' | 'jornada';
  /** Identificador de origem do lead. */
  source: string;
  /** Experiências da categoria a exibir nos cards. */
  experiences: Experience[];
  /** Imagem de fundo do hero. */
  heroImage: string;
}

export default async function LandingPage({
  ns,
  category,
  source,
  experiences,
  heroImage,
}: LandingPageProps) {
  const t = await getTranslations(`lp.${ns}`);
  const te = await getTranslations('experiences');
  const tc = await getTranslations('common');

  const audience = Object.values(t.raw('audience') as Record<string, string>);
  const alsoIncluded = Object.values(te.raw('alsoIncludedList') as Record<string, string>);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <ImagePlaceholder
            src={heroImage}
            alt={t('title')}
            fill
            priority
            sizes="100vw"
            className="h-full w-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-sensoria-graphite/90 via-sensoria-graphite/40 to-sensoria-graphite/20" />
        <div className="container-editorial relative w-full pb-20 pt-40 md:pb-28">
          <div className="max-w-2xl">
            <Reveal>
              <span className="font-sans text-xs uppercase tracking-wide3 text-sensoria-cream">
                {t('eyebrow')}
              </span>
            </Reveal>
            <Reveal index={1}>
              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.03] tracking-display text-sensoria-white md:text-6xl">
                {t('title')}
              </h1>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-4 font-display text-xl italic text-sensoria-cream/90 md:text-2xl">
                {t('subtitle')}
              </p>
            </Reveal>
            <Reveal index={3}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-sensoria-white/80 md:text-lg">
                {t('description')}
              </p>
            </Reveal>
            <Reveal index={4} className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#agendar"
                data-cursor="hover"
                className="inline-flex h-12 items-center justify-center rounded-full bg-sensoria-cream px-8 font-sans text-sm font-medium text-sensoria-graphite transition-colors hover:bg-[#f4e9a8]"
              >
                {t('formTitle')}
              </a>
              <LeadDialog
                label={tc('bookWhatsapp')}
                context={category}
                source={source}
                variant="outlineLight"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Público-alvo / dores */}
      <section className="bg-sensoria-white py-24 md:py-32">
        <div className="container-editorial grid gap-14 md:grid-cols-2 md:items-center">
          <SectionHeading eyebrow={t('eyebrow')} title={t('audienceTitle')} />
          <ul className="flex flex-col gap-4">
            {audience.map((item, i) => (
              <Reveal key={item} index={i}>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-sensoria-green/10 text-sensoria-green">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-base leading-relaxed text-sensoria-graphite/80">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Ofertas */}
      <section className="bg-sensoria-fog/40 py-24 md:py-32">
        <div className="container-editorial">
          <SectionHeading
            eyebrow={t('offeringsTitle')}
            title={t('offeringsText')}
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.slug} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Toda experiência inclui */}
      <section className="bg-sensoria-green py-24 text-sensoria-white md:py-32">
        <div className="container-editorial">
          <SectionHeading eyebrow={t('eyebrow')} title={te('alsoIncluded')} tone="light" align="center" className="mx-auto" />
          <div className="mx-auto mt-12 grid max-w-4xl gap-x-8 gap-y-5 sm:grid-cols-2">
            {alsoIncluded.map((item, i) => (
              <Reveal key={item} index={i}>
                <div className="flex items-start gap-3 border-t border-sensoria-white/15 pt-5">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-sensoria-cream" />
                  <span className="text-sm leading-relaxed text-sensoria-white/85">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section id="agendar" className="scroll-mt-24 bg-sensoria-white py-24 md:py-32">
        <div className="container-editorial grid gap-12 md:grid-cols-2 md:items-start">
          <SectionHeading eyebrow={t('eyebrow')} title={t('formTitle')} description={t('formText')} />
          <Reveal index={1} className="rounded-2xl border border-sensoria-fog bg-sensoria-white p-6 shadow-sm md:p-8">
            <LeadForm context={category} source={source} />
          </Reveal>
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className="bg-sensoria-cream py-24 md:py-32">
        <div className="container-editorial flex flex-col items-center text-center">
          <LeafAccent className="mb-6 w-28 text-sensoria-green" />
          <Reveal>
            <h2 className="max-w-2xl text-balance font-display text-4xl leading-[1.05] tracking-display text-sensoria-graphite md:text-6xl">
              {t('ctaTitle')}
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="mt-5 max-w-md text-base text-sensoria-graphite/70 md:text-lg">{t('ctaText')}</p>
          </Reveal>
          <Reveal index={2} className="mt-10">
            <LeadDialog label={tc('bookWhatsapp')} context={category} source={source} size="lg" variant="green" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
