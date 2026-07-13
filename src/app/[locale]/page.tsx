import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, ArrowUpRight, Leaf, Sparkles, HandHeart, ShoppingBag } from 'lucide-react';
import { Link } from '@/i18n/routing';
import HeroVideo from '@/components/HeroVideo';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import Parallax from '@/components/motion/Parallax';
import LeadForm from '@/components/LeadForm';
import LeadDialog from '@/components/LeadDialog';
import MagneticButton from '@/components/ui/MagneticButton';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import LeafIcon from '@/components/ui/LeafIcon';
import SkylineBg from '@/components/ui/SkylineBg';
import { siteConfig } from '@/config/site';
import { type Locale } from '@/data/experiences';
import { units } from '@/data/units';

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const th = await getTranslations('hero');
  const tc = await getTranslations('common');
  const l = locale as Locale;

  const paths = [
    {
      href: '/terapias' as const,
      image: '/images/lp/terapias.jpg',
      title: t('therapiesTitle'),
      text: t('therapiesText'),
      cta: t('therapiesCta'),
    },
    {
      href: '/jornadas' as const,
      image: '/images/lp/jornadas.jpg',
      title: t('journeysTitle'),
      text: t('journeysText'),
      cta: t('journeysCta'),
    },
  ];

  return (
    <>
      <HeroVideo
        eyebrow={th('eyebrow')}
        title={th('title')}
        subtitle={th('subtitle')}
        description={th('description')}
        scrollLabel={th('scroll')}
        ctaLabel={tc('bookWhatsapp')}
      />

      {/* Intro */}
      <section className="bg-sensoria-white py-24 md:py-36">
        <div className="container-editorial grid gap-14 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading
              eyebrow={t('introEyebrow')}
              title={t('introTitle')}
              description={t('introText')}
            />
            <Reveal index={3} className="mt-8">
              <Link
                href="/sobre"
                data-cursor="hover"
                className="group inline-flex items-center gap-2 font-sans text-sm uppercase tracking-wide2 text-sensoria-green"
              >
                {tc('seeMore')}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <Parallax offset={40} className="aspect-[4/5] rounded-2xl md:aspect-square">
            <ImagePlaceholder
              src="/images/about/sobre-1.jpg"
              alt="Sensória"
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="h-full w-full"
            />
          </Parallax>
        </div>
      </section>

      {/* Dois caminhos: Terapias e Jornadas */}
      <section className="bg-sensoria-fog/40 py-24 md:py-36">
        <div className="container-editorial">
          <SectionHeading
            eyebrow={t('pathsEyebrow')}
            title={t('pathsTitle')}
            description={t('pathsText')}
            align="center"
            className="mx-auto"
          />

          <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
            {paths.map((p, i) => (
              <Reveal key={p.href} index={i}>
                <Link href={p.href} data-cursor="hover" className="group block">
                  <article className="relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-2xl p-8 md:min-h-[32rem] md:p-10">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      <ImagePlaceholder
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width:768px) 100vw, 50vw"
                        className="h-full w-full"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-sensoria-graphite/85 via-sensoria-graphite/25 to-transparent" />
                    <div className="relative">
                      <h3 className="font-display text-3xl leading-tight tracking-display text-sensoria-white md:text-4xl">
                        {p.title}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-relaxed text-sensoria-white/80 md:text-base">
                        {p.text}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm uppercase tracking-wide2 text-sensoria-cream">
                        {p.cta}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <Link
              href="/experiencias"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 font-sans text-sm uppercase tracking-wide2 text-sensoria-green"
            >
              {tc('allExperiences')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Filosofia natural */}
      <section className="relative overflow-hidden bg-sensoria-green py-24 text-sensoria-white md:py-36">
        <div className="container-editorial grid gap-14 md:grid-cols-2 md:items-center">
          <Parallax offset={40} className="order-2 aspect-[4/5] rounded-2xl md:order-1 md:aspect-square">
            <ImagePlaceholder
              src="/images/about/produtos.jpg"
              alt="Produtos naturais Sensória"
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="h-full w-full"
            />
          </Parallax>
          <div className="order-1 md:order-2">
            <SectionHeading
              eyebrow={t('philosophyEyebrow')}
              title={t('philosophyTitle')}
              description={t('philosophyText')}
              tone="light"
            />
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { icon: Leaf, label: '100% Natural' },
                { icon: HandHeart, label: 'Cruelty-free' },
                { icon: Sparkles, label: 'Vegano' },
              ].map((item, i) => (
                <Reveal key={item.label} index={i} className="flex flex-col items-start gap-2">
                  <item.icon className="h-6 w-6 text-sensoria-cream" />
                  <span className="font-sans text-xs uppercase tracking-wide2 text-sensoria-white/80">
                    {item.label}
                  </span>
                </Reveal>
              ))}
            </div>

            {/* CTA para o e-commerce */}
            <Reveal index={3} className="mt-10 border-t border-white/15 pt-8">
              <p className="max-w-md text-sm leading-relaxed text-sensoria-white/80">
                {t('shopText')}
              </p>
              <MagneticButton
                href={siteConfig.ecommerce}
                external
                variant="primary"
                className="mt-5"
              >
                <ShoppingBag className="h-4 w-4" />
                {t('shopCta')}
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Unidades */}
      <section className="bg-sensoria-white py-24 md:py-36">
        <div className="container-editorial">
          <SectionHeading eyebrow={t('unitsEyebrow')} title={t('unitsTitle')} align="center" className="mx-auto" />
          <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {units.map((u, i) => (
              <Reveal key={u.slug} index={i}>
                <Link href="/unidades" data-cursor="hover" className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      <ImagePlaceholder src={u.image} alt={u.name} fill sizes="(max-width:768px) 100vw, 33vw" className="h-full w-full" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-xl tracking-display text-sensoria-graphite">
                    {u.name}
                  </h3>
                  <p className="text-sm text-sensoria-graphite/60">{u.city[l]}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de lead */}
      <section id="agendar" className="scroll-mt-24 bg-sensoria-white py-24 md:py-32">
        <div className="container-editorial grid gap-12 md:grid-cols-2 md:items-start">
          <SectionHeading
            eyebrow={t('leadEyebrow')}
            title={t('leadTitle')}
            description={t('leadText')}
          />
          <Reveal index={1} className="rounded-2xl border border-sensoria-fog bg-sensoria-white p-6 shadow-sm md:p-8">
            <LeadForm source="home" />
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden bg-sensoria-cream py-24 md:py-32">
        <SkylineBg />
        <div className="container-editorial relative z-10 flex flex-col items-center text-center">
          <LeafIcon tone="green" className="mb-6 w-28 text-sensoria-green" />
          <Reveal>
            <h2 className="max-w-2xl text-balance font-display text-4xl leading-[1.05] tracking-display text-sensoria-graphite md:text-6xl">
              {t('ctaTitle')}
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="mt-5 max-w-md text-base text-sensoria-graphite/70 md:text-lg">
              {t('ctaText')}
            </p>
          </Reveal>
          <Reveal index={2} className="mt-10">
            <LeadDialog label={tc('bookWhatsapp')} source="home-cta" size="lg" variant="green" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
