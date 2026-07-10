'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import LeadDialog from '@/components/LeadDialog';

interface HeroVideoProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  scrollLabel: string;
  ctaLabel: string;
}

const wordVariants = {
  hidden: { opacity: 0, y: '0.6em' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.4 + i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

function RevealWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={wordVariants}
            custom={i}
            initial="hidden"
            animate="visible"
          >
            {word}
            {i < text.split(' ').length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function HeroVideo({
  eyebrow,
  title,
  subtitle,
  description,
  scrollLabel,
  ctaLabel,
}: HeroVideoProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-sensoria-green">
      {/* Vídeo de fundo — cai para o poster quando /videos/hero.mp4 ainda não existe */}
      <motion.div style={{ y }} className="absolute inset-0 h-[120%]">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero/hero-poster.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero.webm" type="video/webm" />
        </video>
      </motion.div>

      {/* Overlays de legibilidade */}
      <div className="absolute inset-0 bg-sensoria-graphite/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-sensoria-graphite/60 via-transparent to-sensoria-graphite/30" />

      <motion.div
        style={{ opacity }}
        className="container-editorial relative z-10 flex h-full flex-col justify-end pb-24 pt-32 md:justify-center md:pb-0"
      >
        <div className="max-w-3xl">
          <motion.span
            className="mb-6 block font-sans text-xs uppercase tracking-wide3 text-sensoria-cream"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow}
          </motion.span>

          <h1 className="font-display text-5xl leading-[0.98] tracking-display text-sensoria-white md:text-7xl lg:text-[5.5rem]">
            <RevealWords text={title} className="block" />
            <RevealWords text={subtitle} className="mt-1 block italic text-sensoria-fog" />
          </h1>

          <motion.p
            className="mt-8 max-w-xl text-base leading-relaxed text-sensoria-white/85 md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {description}
          </motion.p>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <LeadDialog label={ctaLabel} source="home-hero" size="lg" variant="primary" />
          </motion.div>
        </div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-sensoria-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <span className="font-sans text-[10px] uppercase tracking-wide3">{scrollLabel}</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
