/**
 * Dados do Consultor Sensorial — o assistente que sugere experiências.
 *
 * É uma árvore de decisão determinística: nenhuma IA, nenhuma chamada de rede.
 * Para calibrar as recomendações, edite `experienceGoals` abaixo — é a única
 * fonte da verdade do assistente.
 */

/** O que a pessoa busca (pergunta "objetivo"). */
export type Goal = 'dor' | 'relaxar' | 'mente' | 'pele' | 'energia' | 'celebrar';

/** Para quem é (pergunta "paraQuem"). */
export type Audience = 'mim' | 'presentear' | 'casal';

/** Faixa de tempo disponível (pergunta "tempo"). */
export type TimeBucket = 'curto' | 'medio' | 'longo';

/** Motivo exibido no card de resultado. */
export type Reason = Goal | 'presentear' | 'casal';

export interface AdvisorAnswers {
  paraQuem?: Audience;
  objetivo?: Goal;
  tempo?: TimeBucket;
  /** Nome da unidade (não pontua; só pré-preenche o formulário). */
  unidade?: string;
}

/** Limites das faixas de tempo, em minutos. Derivados do catálogo real:
 *  terapias vão de 15 a 90 min; jornadas, de 60 min à diária. */
export const TIME_BUCKETS: Record<TimeBucket, { min: number; max: number }> = {
  curto: { min: 0, max: 60 },
  medio: { min: 61, max: 120 },
  longo: { min: 121, max: Infinity },
};

/**
 * Objetivos que cada experiência atende, derivados do subtitle/description/
 * benefits de `experiences.ts`.
 *
 * `presentear` e `casal` NÃO entram aqui: são deduzidos dos dados que já
 * existem (categoria e preço de dupla), então não têm como ficar dessincronizados.
 */
export const experienceGoals: Record<string, Goal[]> = {
  // --- Jornadas ---
  amazonia: ['relaxar', 'pele'],
  'pedra-da-gavea': ['dor', 'relaxar'],
  arpoador: ['relaxar', 'celebrar'],
  'pao-de-acucar': ['pele', 'energia'],
  'parque-lage': ['relaxar', 'mente', 'celebrar'],
  prainha: ['relaxar', 'mente'],
  corcovado: ['relaxar', 'celebrar'],
  'floresta-da-tijuca': ['mente', 'pele'],
  'arco-iris': ['celebrar'],
  celebrar: ['celebrar', 'relaxar'],

  // --- Jornadas exclusivas Hotel Venit ---
  'five-senses': ['relaxar', 'celebrar'],
  'sensorial-journey': ['relaxar', 'celebrar'],
  'renewal-ritual': ['pele', 'relaxar'],
  'body-soul-cleanse': ['pele', 'relaxar'],
  'memorial-moments': ['celebrar', 'relaxar'],

  // --- Terapias ---
  brisa: ['relaxar', 'mente'],
  flow: ['dor', 'pele'],
  'toque-vulcanico': ['dor', 'relaxar', 'mente'],
  lumina: ['relaxar', 'pele'],
  trama: ['dor'],
  'sopro-restaurador': ['dor', 'energia'],
  pureza: ['pele', 'relaxar'],
  'sal-e-ervas': ['relaxar', 'mente'],
  celeridade: ['energia', 'pele'],
  curva: ['pele'],
  aura: ['mente', 'dor'],
  libelula: ['pele', 'energia'],
  orla: ['relaxar', 'pele'],
  equilibrio: ['mente', 'energia'],
};

/** Ordem das opções em cada pergunta. Os textos vivem no i18n (namespace `advisor`). */
export const AUDIENCE_OPTIONS: Audience[] = ['mim', 'presentear', 'casal'];
export const GOAL_OPTIONS: Goal[] = ['dor', 'relaxar', 'mente', 'pele', 'energia', 'celebrar'];
export const TIME_OPTIONS: TimeBucket[] = ['curto', 'medio', 'longo'];

/** Pesos da pontuação. O objetivo domina; tempo só desempata. */
export const WEIGHTS = { goal: 3, audience: 2, time: 1 } as const;

/** Quantas experiências o resultado exibe. */
export const MAX_RESULTS = 3;
