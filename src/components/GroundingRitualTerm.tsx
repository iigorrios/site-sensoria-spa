'use client';

import { Fragment, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Sparkles, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

const TERM = 'Grounding Ritual';

/**
 * Envolve um texto e transforma cada ocorrência de "Grounding Ritual" em um
 * termo clicável que abre um pop-up explicando o ritual. Se o texto não contém
 * o termo, renderiza o texto inalterado.
 */
export default function GroundingText({
  children,
  tone = 'dark',
}: {
  children: string;
  /** 'light' para uso sobre fundos escuros (verde/grafite). */
  tone?: 'dark' | 'light';
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('grounding');

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!children.includes(TERM)) return <>{children}</>;

  const parts = children.split(TERM);
  const points = Object.values(t.raw('points') as Record<string, string>);

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t('aria')}
              className={
                tone === 'light'
                  ? 'font-medium text-sensoria-cream underline decoration-sensoria-cream/50 decoration-dotted underline-offset-2 transition-colors hover:decoration-sensoria-cream'
                  : 'font-medium text-sensoria-green underline decoration-sensoria-green/40 decoration-dotted underline-offset-2 transition-colors hover:decoration-sensoria-green'
              }
            >
              {TERM}
            </button>
          )}
        </Fragment>
      ))}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[120] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="absolute inset-0 bg-sensoria-graphite/60 backdrop-blur-sm"
                  onClick={() => setOpen(false)}
                />
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-lg rounded-3xl bg-sensoria-white p-8 shadow-xl md:p-10"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t('close')}
                    className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-sensoria-graphite/50 transition-colors hover:bg-sensoria-fog/60 hover:text-sensoria-graphite"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <span className="inline-flex items-center gap-2 rounded-full bg-sensoria-green/10 px-3 py-1 font-sans text-xs uppercase tracking-wide2 text-sensoria-green">
                    <Sparkles className="h-3.5 w-3.5" />
                    {t('subtitle')}
                  </span>
                  <h2 className="mt-4 font-display text-3xl tracking-display text-sensoria-graphite">
                    {t('title')}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-sensoria-graphite/75">
                    {t('intro')}
                  </p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-sensoria-green" />
                        <span className="text-sm leading-relaxed text-sensoria-graphite/80">{p}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 border-t border-sensoria-fog pt-5 font-sans text-xs uppercase tracking-wide2 text-sensoria-graphite/50">
                    {t('duration')}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
