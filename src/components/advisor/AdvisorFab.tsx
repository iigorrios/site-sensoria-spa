'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { trackGtagEvent } from '@/components/GoogleTag';
import AdvisorChat from '@/components/advisor/AdvisorChat';

/**
 * Consultor Sensorial — botão flutuante que abre um assistente de escolha.
 *
 * É uma árvore de decisão determinística (ver src/lib/advisor.ts): nenhuma IA,
 * nenhuma chamada de rede, custo zero por interação. O "chat" é encenação de
 * interface; todas as respostas são botões.
 *
 * A captura do lead reaproveita o LeadDialog, então o assistente alimenta
 * Supabase, Kommo, Meta CAPI e Google Ads com origem='assistente'.
 */
export default function AdvisorFab() {
  const t = useTranslations('advisor');
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const toggle = () => {
    setOpen((prev) => {
      if (!prev) trackGtagEvent('advisor_open');
      return !prev;
    });
  };

  return (
    <>
      <button
        onClick={toggle}
        aria-label={t('fab')}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-[80] flex h-12 w-12 items-center justify-center rounded-full border border-sensoria-white/30 bg-sensoria-green/85 text-sensoria-white shadow-lg backdrop-blur transition-colors hover:bg-sensoria-green md:bottom-8 md:right-8"
      >
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                {/* Fundo só no mobile, onde o painel ocupa a tela inteira. */}
                <motion.div
                  className="fixed inset-0 z-[85] bg-sensoria-graphite/40 backdrop-blur-sm md:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={close}
                />

                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={t('title')}
                  className="fixed inset-x-0 bottom-0 top-0 z-[90] flex flex-col bg-sensoria-white shadow-2xl md:inset-auto md:bottom-24 md:right-8 md:top-auto md:h-[min(34rem,calc(100vh-9rem))] md:w-[22rem] md:rounded-3xl"
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <header className="flex items-center justify-between border-b border-sensoria-fog px-5 py-4">
                    <h3 className="font-display text-xl tracking-display text-sensoria-graphite">
                      {t('title')}
                    </h3>
                    <button
                      onClick={close}
                      aria-label={t('close')}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-sensoria-graphite/60 transition-colors hover:bg-sensoria-fog/60 hover:text-sensoria-graphite"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </header>

                  <AdvisorChat onClose={close} />
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
