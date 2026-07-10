import type { LocalizedText, LocalizedList } from './experiences';

/** Benefícios comuns a todos os clubes. */
export const clubBenefits: LocalizedList = {
  pt: [
    'Vouchers transferíveis — compartilhe com amigos e parentes',
    'Agende quando quiser, inclusive no mesmo dia',
    '01 reagendamento gratuito por voucher',
    'Vouchers cumulativos (sem troco no uso)',
    '15% de desconto em produtos e serviços',
    'Sorteio mensal com produtos Sensória',
    'Acesso antecipado a lançamentos',
    'Validade estendida (de 100 a 180 dias)',
  ],
  en: [
    'Transferable vouchers — share with friends and family',
    'Book whenever you want, even same-day',
    '1 free reschedule per voucher',
    'Cumulative vouchers (no change given)',
    '15% off products and services',
    'Monthly giveaway with Sensória products',
    'Early access to new releases',
    'Extended validity (100 to 180 days)',
  ],
  es: [
    'Vouchers transferibles — comparte con amigos y familiares',
    'Reserva cuando quieras, incluso el mismo día',
    '1 reprogramación gratuita por voucher',
    'Vouchers acumulables (sin cambio)',
    '15% de descuento en productos y servicios',
    'Sorteo mensual con productos Sensória',
    'Acceso anticipado a lanzamientos',
    'Validez extendida (de 100 a 180 días)',
  ],
};

export interface Club {
  slug: 'gold' | 'safira' | 'platinum' | 'diamond';
  name: string;
  /** Cor de acento (bolinha/realce). */
  accent: string;
  featured?: boolean;
  sessions: LocalizedText;
  courtesy: LocalizedText;
  vouchers: LocalizedText;
  validityDays: number;
  priceAtSight: number;
  installments: string;
  bonus: LocalizedText;
  /** Retorno em vantagens (cortesias + vouchers), em R$. */
  returnValue: number;
}

export const clubs: Club[] = [
  {
    slug: 'gold',
    name: 'Gold',
    accent: '#C9A227',
    sessions: { pt: '06 sessões · 50 min', en: '06 sessions · 50 min', es: '06 sesiones · 50 min' },
    courtesy: {
      pt: '+ 01 sessão cortesia de 50 min',
      en: '+ 01 complimentary 50-min session',
      es: '+ 01 sesión cortesía de 50 min',
    },
    vouchers: {
      pt: '+ 03 vouchers de R$ 110 (produtos/serviços)',
      en: '+ 03 vouchers of R$ 110 (products/services)',
      es: '+ 03 vouchers de R$ 110 (productos/servicios)',
    },
    validityDays: 100,
    priceAtSight: 1260,
    installments: '3x R$ 420',
    bonus: {
      pt: '+ 01 experiência Aura 20 min cortesia',
      en: '+ 01 complimentary 20-min Aura experience',
      es: '+ 01 experiencia Aura 20 min cortesía',
    },
    returnValue: 540,
  },
  {
    slug: 'safira',
    name: 'Safira',
    accent: '#3B6FB0',
    sessions: { pt: '10 sessões · 50 min', en: '10 sessions · 50 min', es: '10 sesiones · 50 min' },
    courtesy: {
      pt: '+ 02 sessões cortesia de 50 min',
      en: '+ 02 complimentary 50-min sessions',
      es: '+ 02 sesiones cortesía de 50 min',
    },
    vouchers: {
      pt: '+ 05 vouchers de R$ 110 (produtos/serviços)',
      en: '+ 05 vouchers of R$ 110 (products/services)',
      es: '+ 05 vouchers de R$ 110 (productos/servicios)',
    },
    validityDays: 150,
    priceAtSight: 2100,
    installments: '5x R$ 420',
    bonus: {
      pt: '+ 01 experiência Aura 20 min cortesia',
      en: '+ 01 complimentary 20-min Aura experience',
      es: '+ 01 experiencia Aura 20 min cortesía',
    },
    returnValue: 970,
  },
  {
    slug: 'platinum',
    name: 'Platinum',
    accent: '#8A8F98',
    sessions: { pt: '07 sessões · 60 min', en: '07 sessions · 60 min', es: '07 sesiones · 60 min' },
    courtesy: {
      pt: '+ 02 sessões cortesia de 60 min',
      en: '+ 02 complimentary 60-min sessions',
      es: '+ 02 sesiones cortesía de 60 min',
    },
    vouchers: {
      pt: '+ 06 vouchers de R$ 110 (produtos/serviços)',
      en: '+ 06 vouchers of R$ 110 (products/services)',
      es: '+ 06 vouchers de R$ 110 (productos/servicios)',
    },
    validityDays: 150,
    priceAtSight: 1820,
    installments: '5x R$ 364',
    bonus: {
      pt: '+ 02 experiências Aura 20 min cortesia',
      en: '+ 02 complimentary 20-min Aura experiences',
      es: '+ 02 experiencias Aura 20 min cortesía',
    },
    returnValue: 1180,
  },
  {
    slug: 'diamond',
    name: 'Diamond',
    accent: '#2E9E82',
    featured: true,
    sessions: { pt: '12 sessões · 60 min', en: '12 sessions · 60 min', es: '12 sesiones · 60 min' },
    courtesy: {
      pt: '+ 04 sessões cortesia de 60 min',
      en: '+ 04 complimentary 60-min sessions',
      es: '+ 04 sesiones cortesía de 60 min',
    },
    vouchers: {
      pt: '+ 07 vouchers de R$ 110 (produtos/serviços)',
      en: '+ 07 vouchers of R$ 110 (products/services)',
      es: '+ 07 vouchers de R$ 110 (productos/servicios)',
    },
    validityDays: 180,
    priceAtSight: 3120,
    installments: '6x R$ 520',
    bonus: {
      pt: '+ 03 experiências Aura 20 min cortesia',
      en: '+ 03 complimentary 20-min Aura experiences',
      es: '+ 03 experiencias Aura 20 min cortesía',
    },
    returnValue: 1810,
  },
];
