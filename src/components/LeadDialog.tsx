'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import MagneticButton from '@/components/ui/MagneticButton';
import LeadForm from '@/components/LeadForm';

interface LeadDialogProps {
  label: string;
  variant?: 'primary' | 'green' | 'outline' | 'outlineLight';
  size?: 'md' | 'lg';
  className?: string;
  /** Passados ao formulário. */
  context?: 'terapia' | 'jornada';
  source: string;
  defaultExperience?: string;
  defaultUnit?: string;
}

/**
 * Botão de conversão: NÃO leva direto ao WhatsApp. Abre um formulário enxuto
 * (captura o lead + atribuição/UTMs + Pixel/CAPI) e só então redireciona para
 * o WhatsApp com a experiência desejada. Substitui os antigos botões diretos.
 */
export default function LeadDialog({
  label,
  variant = 'primary',
  size = 'md',
  className,
  context,
  source,
  defaultExperience,
  defaultUnit,
}: LeadDialogProps) {
  const t = useTranslations('lead');
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  return (
    <>
      <MagneticButton variant={variant} size={size} className={className} onClick={() => setOpen(true)}>
        <MessageCircle className="h-4 w-4" />
        {label}
      </MagneticButton>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className="absolute inset-0 bg-sensoria-graphite/60 backdrop-blur-sm"
                  onClick={() => setOpen(false)}
                />
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-sensoria-white p-6 shadow-2xl md:p-8"
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => setOpen(false)}
                    aria-label={t('close')}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-sensoria-graphite/60 transition-colors hover:bg-sensoria-fog/60 hover:text-sensoria-graphite"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <h3 className="pr-10 font-display text-2xl tracking-display text-sensoria-graphite md:text-3xl">
                    {t('dialogTitle')}
                  </h3>
                  <p className="mt-2 text-sm text-sensoria-graphite/70">{t('dialogText')}</p>

                  <div className="mt-6">
                    <LeadForm
                      context={context}
                      source={source}
                      defaultExperience={defaultExperience}
                      defaultUnit={defaultUnit}
                      redirect
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
