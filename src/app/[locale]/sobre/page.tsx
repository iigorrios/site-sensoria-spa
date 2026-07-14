import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import Parallax from '@/components/motion/Parallax';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import LeafIcon from '@/components/ui/LeafIcon';
import { alternatesFor } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    alternates: alternatesFor(locale, '/sobre'),
  };
}

const valueKeys = ['faith', 'ethics', 'work', 'responsibility', 'team'] as const;
const productKeys = ['respire', 'amazonia', 'aromacologia', 'skincare', 'tastes'] as const;

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <div className="bg-sensoria-white">
      {/* Intro */}
      <section className="pb-20 pt-32 md:pt-40">
        <div className="container-editorial grid gap-14 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
            <Reveal index={2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-sensoria-graphite/75">
                {t('intro')}
              </p>
            </Reveal>
          </div>
          <Parallax offset={40} className="aspect-[4/5] rounded-2xl">
            <ImagePlaceholder src="/images/about/sobre-2.jpg" alt="Sensória" fill sizes="(max-width:768px) 100vw, 50vw" className="h-full w-full" />
          </Parallax>
        </div>
      </section>

      {/* Compromisso */}
      <section className="bg-sensoria-green py-24 text-sensoria-white md:py-32">
        <div className="container-editorial max-w-4xl">
          <LeafIcon tone="light" className="mb-6 w-28 text-sensoria-cream/70" />
          <SectionHeading title={t('commitmentTitle')} tone="light" />
          <Reveal index={2}>
            <p className="mt-6 text-lg leading-relaxed text-sensoria-white/85">{t('commitmentText')}</p>
          </Reveal>
          <Reveal index={3}>
            <p className="mt-4 text-lg leading-relaxed text-sensoria-white/85">{t('commitmentText2')}</p>
          </Reveal>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 md:py-32">
        <div className="container-editorial">
          <SectionHeading title={t('valuesTitle')} align="center" className="mx-auto" />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {valueKeys.map((k, i) => (
              <Reveal key={k} index={i}>
                <div className="h-full rounded-2xl border border-sensoria-fog p-7">
                  <span className="font-display text-5xl text-sensoria-mist">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-xl tracking-display text-sensoria-graphite">
                    {t(`values.${k}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sensoria-graphite/70">
                    {t(`values.${k}.text`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experiência sensorial */}
      <section className="bg-sensoria-fog/40 py-24 md:py-32">
        <div className="container-editorial grid gap-14 md:grid-cols-2 md:items-center">
          <Parallax offset={40} className="aspect-[4/3] rounded-2xl">
            <ImagePlaceholder src="/images/gallery/ambiente.jpg" alt="Ambiente Sensória" fill sizes="(max-width:768px) 100vw, 50vw" className="h-full w-full" />
          </Parallax>
          <div>
            <SectionHeading title={t('sensorialTitle')} description={t('sensorialText')} />
          </div>
        </div>
      </section>

      {/* Linhas de produto */}
      <section className="py-24 md:py-32">
        <div className="container-editorial">
          <SectionHeading eyebrow="Sensória Works" title={t('productsTitle')} description={t('productsText')} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productKeys.map((k, i) => (
              <Reveal key={k} index={i}>
                <div className="flex h-full flex-col gap-2 rounded-2xl bg-sensoria-fog/40 p-7">
                  <LeafIcon tone="green" className="w-16 text-sensoria-green" />
                  <h3 className="mt-2 font-display text-xl tracking-display text-sensoria-graphite">
                    {t(`productLines.${k}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-sensoria-graphite/70">
                    {t(`productLines.${k}.text`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
