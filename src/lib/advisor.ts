import { allExperiences, getStartingPrice, type Experience, type PriceTier } from '@/data/experiences';
import {
  experienceGoals,
  MAX_RESULTS,
  TIME_BUCKETS,
  WEIGHTS,
  type AdvisorAnswers,
  type Reason,
  type TimeBucket,
} from '@/data/advisor';

export interface Recommendation {
  exp: Experience;
  /** Por que esta experiência foi sugerida (vira o texto do card). */
  reason: Reason;
}

/** Uma diária não tem duração em minutos; vale como "dia inteiro". */
const DAY_MINUTES = 24 * 60;

/**
 * Converte a duração do catálogo em minutos. Os formatos usados hoje são
 * "30 min", "4h" e "Diária"; qualquer outro rótulo cai no dia inteiro, que é o
 * único caso em que ele aparece.
 */
export function parseMinutes(duration: string): number | null {
  const d = duration.trim();
  if (!d) return null; // adicionais sem duração

  const hours = d.match(/^(\d+)\s*h$/i);
  if (hours) return Number(hours[1]) * 60;

  const minutes = d.match(/^(\d+)\s*min$/i);
  if (minutes) return Number(minutes[1]);

  return DAY_MINUTES;
}

function fitsBucket(exp: Experience, bucket: TimeBucket): boolean {
  const { min, max } = TIME_BUCKETS[bucket];
  return exp.prices.some((p) => {
    const m = parseMinutes(p.duration);
    return m !== null && m >= min && m <= max;
  });
}

const COUPLE_LABEL = /dupla|couple|pareja/i;

/** Atende dupla? Deduzido do preço — não depende de tag manual. */
function supportsCouple(exp: Experience): boolean {
  return exp.prices.some(
    (p: PriceTier) =>
      typeof p.double === 'number' ||
      (p.label ? COUPLE_LABEL.test(`${p.label.pt} ${p.label.en} ${p.label.es}`) : false)
  );
}

/**
 * Pontua todas as experiências e devolve as melhores. Função pura e
 * determinística: as mesmas respostas sempre produzem o mesmo resultado.
 */
export function recommend(answers: AdvisorAnswers): Recommendation[] {
  const { paraQuem, objetivo, tempo } = answers;

  // Sem tempo informado (ou no fluxo de presente, que pula a pergunta), tudo
  // entra. Com tempo, filtramos — mas voltamos atrás se sobrar pouca coisa,
  // para o assistente nunca terminar de mãos vazias.
  let pool = allExperiences;
  if (tempo) {
    const fitting = allExperiences.filter((e) => fitsBucket(e, tempo));
    if (fitting.length >= MAX_RESULTS) pool = fitting;
  }

  const scored = pool.map((exp) => {
    const goals = experienceGoals[exp.slug] ?? [];
    let score = 0;
    let reason: Reason | null = null;

    if (objetivo && goals.includes(objetivo)) {
      score += WEIGHTS.goal;
      reason = objetivo;
    }

    if (paraQuem === 'presentear' && exp.category === 'jornada') {
      score += WEIGHTS.audience;
      reason ??= 'presentear';
    }

    if (paraQuem === 'casal' && supportsCouple(exp)) {
      score += WEIGHTS.audience;
      reason ??= 'casal';
    }

    if (tempo && fitsBucket(exp, tempo)) {
      score += WEIGHTS.time;
    }

    return { exp, score, reason };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || getStartingPrice(a.exp) - getStartingPrice(b.exp))
    .slice(0, MAX_RESULTS)
    .map(({ exp, reason }) => ({ exp, reason: reason ?? 'relaxar' }));
}

/**
 * Duração exibida no card. Quando a experiência tem várias opções, mostra a
 * faixa ("30–90 min") em vez da menor: quem pediu "entre 1h e 2h" estranharia
 * um card escrito "30 min", mesmo que essa opção também exista.
 */
export function durationLabel(exp: Experience): string {
  const tiers = exp.prices
    .map((p) => ({ label: p.duration, minutes: parseMinutes(p.duration) }))
    .filter((p): p is { label: string; minutes: number } => p.minutes !== null);

  if (!tiers.length) return '';

  const shortest = tiers.reduce((a, b) => (b.minutes < a.minutes ? b : a));
  const longest = tiers.reduce((a, b) => (b.minutes > a.minutes ? b : a));
  if (shortest.minutes === longest.minutes) return shortest.label;

  // "30 min" + "90 min" → "30–90 min". Formatos diferentes (ex.: "90 min" e
  // "4h") não têm unidade comum, então ficam lado a lado.
  const unit = /^\d+\s*min$/i;
  if (unit.test(shortest.label) && unit.test(longest.label)) {
    return `${shortest.minutes}–${longest.minutes} min`;
  }
  return `${shortest.label} – ${longest.label}`;
}
