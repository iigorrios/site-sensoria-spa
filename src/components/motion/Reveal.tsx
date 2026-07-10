'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** índice para efeito stagger quando usado em sequência */
  index?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
}

/** Elemento que surge (fade + subida) ao entrar na viewport. */
export default function Reveal({ children, className, index = 0, as = 'div' }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
    >
      {children}
    </MotionTag>
  );
}
