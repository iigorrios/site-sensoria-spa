'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** deslocamento em px no eixo Y ao longo do scroll (padrão 60) */
  offset?: number;
}

/** Camada com leve parallax vertical conforme o scroll. */
export default function Parallax({ children, className, offset = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
