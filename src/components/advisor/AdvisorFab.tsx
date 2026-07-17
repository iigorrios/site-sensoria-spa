'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { trackGtagEvent } from '@/components/GoogleTag';
import AdvisorChat, { STORAGE_KEY } from '@/components/advisor/AdvisorChat';

/** Convite dispensado — não aparece de novo neste navegador. */
const TEASER_KEY = 'sensoria-advisor-teaser';

/** Espera o preloader e o pop-up de som saírem da frente antes de convidar. */
const TEASER_DELAY_MS = 5000;

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
  const [teaser, setTeaser] = useState(false);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Convite: só para quem ainda não dispensou e ainda não abriu o assistente.
  useEffect(() => {
    try {
      if (localStorage.getItem(TEASER_KEY) === 'off') return;
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // Storage indisponível (modo privado): convida assim mesmo.
    }
    const timer = setTimeout(() => setTeaser(true), TEASER_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismissTeaser = useCallback(() => {
    setTeaser(false);
    try {
      localStorage.setItem(TEASER_KEY, 'off');
    } catch {
      // Sem persistência: some nesta navegação e pode voltar na próxima.
    }
  }, []);

  const toggle = () => {
    dismissTeaser();
    setOpen((prev) => {
      if (!prev) trackGtagEvent('advisor_open');
      return !prev;
    });
  };

  return (
    <>
      <AnimatePresence>
        {teaser && !open && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 right-[4.5rem] z-[79] flex max-w-[15rem] items-start gap-1 rounded-2xl rounded-br-sm bg-sensoria-white p-3 shadow-xl md:bottom-8 md:right-[5.5rem] md:max-w-[17rem]"
          >
            <button
              onClick={() => {
                trackGtagEvent('advisor_teaser_click');
                toggle();
              }}
              className="text-left"
            >
              <span className="block font-sans text-sm font-medium leading-snug text-sensoria-graphite">
                {t('teaser.text')}
              </span>
              <span className="mt-1 block font-sans text-xs leading-snug text-sensoria-green">
                {t('teaser.cta')}
              </span>
            </button>
            <button
              onClick={dismissTeaser}
              aria-label={t('teaser.dismiss')}
              className="-mr-1 -mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full text-sensoria-graphite/40 transition-colors hover:bg-sensoria-fog/60 hover:text-sensoria-graphite"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
                  <header className="flex flex-none items-center justify-between border-b border-sensoria-fog px-5 py-4">
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
