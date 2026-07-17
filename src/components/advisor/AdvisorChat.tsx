'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { trackGtagEvent } from '@/components/GoogleTag';
import LeadDialog from '@/components/LeadDialog';
import { units } from '@/data/units';
import {
  AUDIENCE_OPTIONS,
  GOAL_OPTIONS,
  TIME_OPTIONS,
  type AdvisorAnswers,
} from '@/data/advisor';
import { recommend } from '@/lib/advisor';
import AdvisorResultCard from '@/components/advisor/AdvisorResultCard';

const STORAGE_KEY = 'sensoria-advisor';

type StepId = 'paraQuem' | 'objetivo' | 'tempo' | 'unidade';

/** Quem vai presentear não escolhe a duração — quem recebe é que vai viver. */
function stepsFor(answers: AdvisorAnswers): StepId[] {
  return answers.paraQuem === 'presentear'
    ? ['paraQuem', 'objetivo', 'unidade']
    : ['paraQuem', 'objetivo', 'tempo', 'unidade'];
}

/** Valores possíveis de cada pergunta. A unidade guarda o nome da unidade
 *  (ou '' para "ainda não sei"); as demais guardam a própria chave do i18n. */
function valuesFor(step: StepId): string[] {
  if (step === 'unidade') return [...units.map((u) => u.name), ''];
  if (step === 'paraQuem') return AUDIENCE_OPTIONS;
  if (step === 'objetivo') return GOAL_OPTIONS;
  return TIME_OPTIONS;
}

interface AdvisorChatProps {
  /** Fecha o painel (usado ao navegar para a página de uma experiência). */
  onClose: () => void;
}

export default function AdvisorChat({ onClose }: AdvisorChatProps) {
  const t = useTranslations('advisor');
  const [answers, setAnswers] = useState<AdvisorAnswers>({});
  const [restored, setRestored] = useState(false);

  // Retoma o progresso ao navegar entre páginas (some ao fechar a aba).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers(JSON.parse(raw) as AdvisorAnswers);
    } catch {
      // sessionStorage indisponível (modo privado): segue sem retomar.
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // Sem persistência: o assistente continua funcionando na sessão atual.
    }
  }, [answers, restored]);

  const steps = stepsFor(answers);
  const answered = steps.filter((s) => answers[s] !== undefined);
  const current = steps.find((s) => answers[s] === undefined);
  const done = current === undefined;

  const results = useMemo(() => (done ? recommend(answers) : []), [done, answers]);

  useEffect(() => {
    if (!done) return;
    trackGtagEvent('advisor_result', { slugs: results.map((r) => r.exp.slug).join(',') });
  }, [done, results]);

  const answer = useCallback((step: StepId, value: string) => {
    setAnswers((prev) => {
      // O cast é seguro: os valores saem sempre de valuesFor(step), que espelha
      // os tipos de AdvisorAnswers.
      const next = { ...prev, [step]: value } as AdvisorAnswers;
      // Trocar para "presentear" tira a pergunta de tempo do fluxo; uma resposta
      // antiga ficaria filtrando o resultado sem estar mais visível.
      if (step === 'paraQuem' && value === 'presentear') delete next.tempo;
      return next;
    });
    trackGtagEvent('advisor_step', { step, value });
  }, []);

  const back = useCallback(() => {
    const last = answered[answered.length - 1];
    if (!last) return;
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[last];
      return next;
    });
  }, [answered]);

  const restart = useCallback(() => setAnswers({}), []);

  /** Rótulo exibido de um valor. A unidade guarda o nome próprio (não traduzido);
   *  as demais perguntas guardam a chave do i18n. */
  const labelFor = (step: StepId, value: string): string => {
    if (step === 'unidade') return value === '' ? t('options.unidade.any') : value;
    return t(`options.${step}.${value}`);
  };

  // Evita um flash do passo 1 antes de o sessionStorage ser lido.
  if (!restored) return null;

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        <Bubble>{t('intro')}</Bubble>

        {answered.map((step) => (
          <div key={step} className="space-y-2">
            <Bubble>{t(`questions.${step}`)}</Bubble>
            <div className="flex justify-end">
              <span className="max-w-[80%] rounded-2xl rounded-br-sm bg-sensoria-green px-4 py-2 text-sm text-sensoria-white">
                {labelFor(step, answers[step] as string)}
              </span>
            </div>
          </div>
        ))}

        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              <Bubble>{t(`questions.${current}`)}</Bubble>
              <div className="flex flex-wrap gap-2">
                {valuesFor(current).map((value) => (
                  <button
                    key={`${current}-${value}`}
                    onClick={() => answer(current, value)}
                    className="rounded-full border border-sensoria-green/40 px-4 py-2 text-left font-sans text-sm text-sensoria-green transition-colors hover:bg-sensoria-green hover:text-sensoria-white"
                  >
                    {labelFor(current, value)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            <Bubble>{results.length ? t('result.title') : t('result.empty')}</Bubble>

            {results.length > 0 && (
              <>
                <p className="text-xs text-sensoria-graphite/50">{t('result.subtitle')}</p>
                {results.map((rec) => (
                  <AdvisorResultCard
                    key={rec.exp.slug}
                    rec={rec}
                    unidade={answers.unidade || undefined}
                    onNavigate={onClose}
                  />
                ))}
              </>
            )}

            {results.length === 0 && (
              <LeadDialog label={t('want')} source="assistente-sem-resultado" variant="green" />
            )}

            {answers.paraQuem === 'presentear' && (
              <div className="rounded-2xl bg-sensoria-fog/60 p-4">
                <h4 className="font-display text-lg tracking-display text-sensoria-graphite">
                  {t('gift.title')}
                </h4>
                <p className="mt-1 text-sm leading-snug text-sensoria-graphite/70">
                  {t('gift.text')}
                </p>
                <div className="mt-3">
                  <LeadDialog
                    label={t('gift.cta')}
                    source="assistente-presente"
                    variant="outline"
                    className="text-sensoria-green"
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-sensoria-fog px-5 py-3">
        <button
          onClick={back}
          disabled={!answered.length}
          className="inline-flex items-center gap-1 font-sans text-xs text-sensoria-graphite/60 transition-colors hover:text-sensoria-graphite disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          {t('back')}
        </button>

        <span className="font-sans text-xs text-sensoria-graphite/40">
          {done ? '' : t('step', { current: answered.length + 1, total: steps.length })}
        </span>

        <button
          onClick={restart}
          disabled={!answered.length}
          className="inline-flex items-center gap-1 font-sans text-xs text-sensoria-graphite/60 transition-colors hover:text-sensoria-graphite disabled:opacity-40"
        >
          <RotateCcw className="h-3 w-3" />
          {t('restart')}
        </button>
      </div>
    </div>
  );
}

/** Bolha do assistente (lado esquerdo). */
function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-sensoria-fog/70 px-4 py-2.5 text-sm leading-snug text-sensoria-graphite">
        {children}
      </p>
    </div>
  );
}
