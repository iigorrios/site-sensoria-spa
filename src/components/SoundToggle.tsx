'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LeafIcon from '@/components/ui/LeafIcon';

const STORAGE_KEY = 'sensoria-sound';
const VOLUME = 0.35;

/**
 * Áudio ambiente do site.
 * - Na primeira visita, mostra um pop-up perguntando se a pessoa quer ativar o som.
 * - A escolha fica salva no navegador; um botão flutuante permite ligar/desligar depois.
 * Arquivo do áudio: public/audio/ambient.mp3 (ver public/ASSETS.md).
 */
export default function SoundToggle() {
  const t = useTranslations('sound');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  const [askOpen, setAskOpen] = useState(false);

  // Decide se mostra o pop-up (só na primeira visita) — depois do preloader.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'on' || stored === 'off') return;
    const timer = setTimeout(() => setAskOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = VOLUME;
    audio
      .play()
      .then(() => setOn(true))
      .catch(() => setOn(false));
  };

  const enable = () => {
    localStorage.setItem(STORAGE_KEY, 'on');
    setAskOpen(false);
    play();
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'off');
    setAskOpen(false);
    setOn(false);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (on) {
      audio.pause();
      setOn(false);
      localStorage.setItem(STORAGE_KEY, 'off');
    } else {
      localStorage.setItem(STORAGE_KEY, 'on');
      play();
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/audio/ambient.mp3" type="audio/mpeg" />
      </audio>

      {/* Pop-up de consentimento de som (primeira visita) */}
      <AnimatePresence>
        {askOpen && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-sensoria-graphite/40 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="w-full max-w-sm rounded-3xl bg-sensoria-white p-8 text-center shadow-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <LeafIcon tone="green" className="mx-auto mb-5 w-20 text-sensoria-green" />
              <h2 className="font-display text-2xl leading-tight tracking-display text-sensoria-graphite">
                {t('question')}
              </h2>
              <p className="mt-2 text-sm text-sensoria-graphite/60">{t('subtitle')}</p>
              <div className="mt-7 flex flex-col gap-3">
                <button
                  onClick={enable}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-sensoria-green font-sans text-sm font-medium text-sensoria-white transition-colors hover:bg-[#516353]"
                >
                  <Volume2 className="h-4 w-4" />
                  {t('enable')}
                </button>
                <button
                  onClick={decline}
                  className="inline-flex h-11 items-center justify-center font-sans text-sm text-sensoria-graphite/60 transition-colors hover:text-sensoria-graphite"
                >
                  {t('disable')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão flutuante para ligar/desligar depois.
          Fica acima do Consultor Sensorial, que ocupa o canto (ver AdvisorFab). */}
      <button
        onClick={toggle}
        aria-label={on ? t('on') : t('off')}
        aria-pressed={on}
        className="fixed bottom-20 right-5 z-[80] flex h-12 w-12 items-center justify-center rounded-full border border-sensoria-white/30 bg-sensoria-green/85 text-sensoria-white shadow-lg backdrop-blur transition-colors hover:bg-sensoria-green md:bottom-24 md:right-8"
      >
        {on ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </button>
    </>
  );
}
