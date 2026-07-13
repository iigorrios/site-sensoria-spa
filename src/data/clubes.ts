import type { LocalizedText } from './experiences';

export interface Club {
  slug: 'clube-30' | 'clube-45' | 'clube-50' | 'clube-60';
  name: string;
  /** Duração da sessão, em minutos. */
  minutes: number;
  tagline: LocalizedText;
  /** Sessões que você paga. */
  investSessions: number;
  /** Sessões de bônus. */
  bonusSessions: number;
  /** Total de sessões (invest + bônus). */
  totalSessions: number;
  /** Valor à vista total. */
  price: number;
  /** Valor por sessão. */
  perSession: number;
  /** Opções de parcelamento (texto). */
  installments: string;
  /** Bônus exclusivo no PIX. */
  pixBonus: LocalizedText;
  featured?: boolean;
  accent: string;
}

export const clubs: Club[] = [
  {
    slug: 'clube-30',
    name: 'Clube 30',
    minutes: 30,
    tagline: {
      pt: 'Seu clube de bem-estar',
      en: 'Your wellness club',
      es: 'Tu club de bienestar',
    },
    investSessions: 5,
    bonusSessions: 2,
    totalSessions: 7,
    price: 700,
    perSession: 100,
    installments: '2x R$ 350 ou 3x R$ 298',
    pixBonus: {
      pt: '+ 02 experiências Aura 10 min',
      en: '+ 02 Aura 10-min experiences',
      es: '+ 02 experiencias Aura 10 min',
    },
    accent: '#C9A227',
  },
  {
    slug: 'clube-45',
    name: 'Clube 45',
    minutes: 45,
    tagline: {
      pt: 'Cuidamos da sua saúde',
      en: 'We care for your health',
      es: 'Cuidamos de tu salud',
    },
    investSessions: 6,
    bonusSessions: 2,
    totalSessions: 8,
    price: 1260,
    perSession: 157.5,
    installments: 'em até 5x',
    pixBonus: {
      pt: '+ 45 min de cortesia',
      en: '+ 45 complimentary min',
      es: '+ 45 min de cortesía',
    },
    accent: '#A6705A',
  },
  {
    slug: 'clube-50',
    name: 'Clube 50',
    minutes: 50,
    tagline: {
      pt: 'Seu refúgio de bem-estar',
      en: 'Your wellness refuge',
      es: 'Tu refugio de bienestar',
    },
    investSessions: 7,
    bonusSessions: 3,
    totalSessions: 10,
    price: 1666,
    perSession: 166,
    installments: '3x R$ 555 ou 7x R$ 266',
    pixBonus: {
      pt: '+ 01 sessão de 45 min',
      en: '+ 01 45-min session',
      es: '+ 01 sesión de 45 min',
    },
    accent: '#8A8F98',
  },
  {
    slug: 'clube-60',
    name: 'Clube 60',
    minutes: 60,
    featured: true,
    tagline: {
      pt: 'O cuidado que transforma',
      en: 'The care that transforms',
      es: 'El cuidado que transforma',
    },
    investSessions: 11,
    bonusSessions: 9,
    totalSessions: 20,
    price: 3080,
    perSession: 154,
    installments: '10x R$ 340 ou 5x R$ 616',
    pixBonus: {
      pt: '+ 02 sessões de 60 min',
      en: '+ 02 60-min sessions',
      es: '+ 02 sesiones de 60 min',
    },
    accent: '#2E9E82',
  },
];

/** Oferta de entrada — cashback em vouchers. */
export const giftback = {
  invest: 280,
  benefits: 200,
  vouchers: 2,
  voucherValue: 100,
  minutes: 60,
  netPrice: 213,
  validityDays: 60,
  description: {
    pt: 'Ao investir R$ 280 em uma experiência de 60 min, você recebe R$ 200 em benefícios: 02 vouchers de R$ 100 para as próximas experiências.',
    en: 'Invest R$ 280 in a 60-min experience and get R$ 200 in benefits: 02 vouchers of R$ 100 for your next experiences.',
    es: 'Al invertir R$ 280 en una experiencia de 60 min, recibes R$ 200 en beneficios: 02 vouchers de R$ 100 para las próximas experiencias.',
  } as LocalizedText,
};
