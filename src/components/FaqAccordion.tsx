'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const ITEM_COUNT = 7;

export default function FaqAccordion() {
  const t = useTranslations('faq');
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-sensoria-fog border-y border-sensoria-fog">
      {Array.from({ length: ITEM_COUNT }).map((_, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              data-cursor="hover"
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-xl tracking-display text-sensoria-graphite md:text-2xl">
                {t(`items.${i}.q`)}
              </span>
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sensoria-green text-sensoria-green transition-transform duration-300',
                  isOpen && 'rotate-45 bg-sensoria-green text-sensoria-white'
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-base leading-relaxed text-sensoria-graphite/75">
                    {t(`items.${i}.a`)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
