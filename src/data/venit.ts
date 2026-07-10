import type { LocalizedText, LocalizedList } from './experiences';

/** Inclusões comuns a todas as Jornadas do Hotel Venit (Barra). */
export const venitIncludes: LocalizedList = {
  pt: [
    'Estacionamento cortesia',
    'Degustação de chás naturais e especiais',
    'Ambiente imunizado com óleos essenciais e sonorizado',
    'Aromaterapia com óleos essenciais Sensória',
    'Musicoterapia com playlist Sensória Spa',
    'Grounding Ritual com reflexologia relaxante',
    'Cremes para massagem exclusivos 100% natural Sensória Spa',
    'Sinergias de óleos essenciais Sensória para cada protocolo',
    'Terapeutas certificadas pelo padrão Sensória Spa',
  ],
  en: [
    'Complimentary parking',
    'Tasting of natural and specialty teas',
    'Space sanitized with essential oils and sound-designed',
    'Aromatherapy with Sensória essential oils',
    'Music therapy with the Sensória Spa playlist',
    'Grounding Ritual with relaxing reflexology',
    'Exclusive 100% natural Sensória Spa massage creams',
    'Sensória essential-oil synergies for each protocol',
    'Therapists certified to the Sensória Spa standard',
  ],
  es: [
    'Estacionamiento cortesía',
    'Degustación de tés naturales y especiales',
    'Ambiente inmunizado con aceites esenciales y sonorizado',
    'Aromaterapia con aceites esenciales Sensória',
    'Musicoterapia con la playlist Sensória Spa',
    'Grounding Ritual con reflexología relajante',
    'Cremas para masaje exclusivas 100% natural Sensória Spa',
    'Sinergias de aceites esenciales Sensória para cada protocolo',
    'Terapeutas certificadas según el estándar Sensória Spa',
  ],
};

export interface Dish {
  /** Nome próprio do prato (não traduzido). */
  name: string;
  description: LocalizedText;
  price: number;
}

/** Refeições completas (breakfast / brunch) — preço por pessoa. */
export const materaMeals: {
  key: 'breakfast' | 'brunch';
  price: number;
  description: LocalizedText;
}[] = [
  {
    key: 'breakfast',
    price: 65,
    description: {
      pt: 'Servido no apartamento, das 7h às 11h: café e leite, suco de laranja, frutas da estação, frios, cesta de pães doces e salgados, manteiga e geleia.',
      en: 'Served in the suite, 7am–11am: coffee and milk, orange juice, seasonal fruit, cold cuts, a basket of sweet and savory breads, butter and jam.',
      es: 'Servido en el apartamento, de 7h a 11h: café con leche, jugo de naranja, frutas de estación, fiambres, cesta de panes dulces y salados, mantequilla y mermelada.',
    },
  },
  {
    key: 'brunch',
    price: 55,
    description: {
      pt: 'Ovos mexidos e bacon, bruschetta recheada, waffle tradicional, mini muffin do dia, croissant, pain au chocolat, tartelete de frutas, suco de laranja ou uva, café, iogurte com frutas e granola, geleias e manteiga.',
      en: 'Scrambled eggs and bacon, filled bruschetta, traditional waffle, muffin of the day, croissant, pain au chocolat, fruit tartlet, orange or grape juice, coffee, yogurt with fruit and granola, jams and butter.',
      es: 'Huevos revueltos y bacon, bruschetta rellena, waffle tradicional, mini muffin del día, croissant, pain au chocolat, tartaleta de frutas, jugo de naranja o uva, café, yogur con frutas y granola, mermeladas y mantequilla.',
    },
  },
];

export const materaMenu: {
  starters: Dish[];
  mains: Dish[];
  desserts: Dish[];
} = {
  starters: [
    {
      name: 'Mimosa de Quinoa',
      price: 45,
      description: {
        pt: 'Quinoa com especiarias, camarão grelhado em azeite virgem, mini tomate defumado e alface roxa.',
        en: 'Spiced quinoa, shrimp grilled in virgin olive oil, smoked mini tomato and red lettuce.',
        es: 'Quinoa con especias, camarón grillado en aceite virgen, mini tomate ahumado y lechuga morada.',
      },
    },
    {
      name: "Broche d'Été",
      price: 39,
      description: {
        pt: 'Espetinho de melão e parma sobre redução de frutas vermelhas.',
        en: 'Melon and parma skewer over a red-fruit reduction.',
        es: 'Brocheta de melón y parma sobre reducción de frutos rojos.',
      },
    },
    {
      name: 'Salada Canadence',
      price: 42,
      description: {
        pt: 'Lentilha rosa com mussarela de búfala, tirinhas de tomate seco, especiarias e azeite virgem.',
        en: 'Pink lentils with buffalo mozzarella, sun-dried tomato strips, spices and virgin olive oil.',
        es: 'Lenteja rosa con mozzarella de búfala, tiras de tomate seco, especias y aceite virgen.',
      },
    },
  ],
  mains: [
    {
      name: 'Escalope Fitness',
      price: 58,
      description: {
        pt: 'Fatias finas de miolo de alcatra grelhado sem gordura, biscuit de espinafre e mini cenoura caramelizada.',
        en: 'Thin slices of grilled lean rump steak, spinach biscuit and caramelized baby carrot.',
        es: 'Finas fetas de centro de cuadril grillado sin grasa, biscuit de espinaca y mini zanahoria caramelizada.',
      },
    },
    {
      name: 'Franguinho de Lima',
      price: 56,
      description: {
        pt: 'Tirinhas empanadas em chia sobre leito de shimeji e julienne de legumes com folhas de endívias.',
        en: 'Chia-breaded strips over a bed of shimeji and vegetable julienne with endive leaves.',
        es: 'Tiras empanadas en chía sobre lecho de shimeji y julienne de vegetales con hojas de endivias.',
      },
    },
    {
      name: 'Gurjons de Salmão',
      price: 60,
      description: {
        pt: 'Cubos grelhados em azeite extra virgem, sobre espaguete de arroz e legumes salteados em azeite trufado.',
        en: 'Cubes grilled in extra-virgin olive oil, over rice spaghetti and vegetables sautéed in truffle oil.',
        es: 'Cubos grillados en aceite extra virgen, sobre espagueti de arroz y vegetales salteados en aceite trufado.',
      },
    },
    {
      name: 'Omelete Leggero',
      price: 38,
      description: {
        pt: 'Omelete de claras com shitake, sobre leito de legumes defumados.',
        en: 'Egg-white omelette with shiitake, over a bed of smoked vegetables.',
        es: 'Tortilla de claras con shiitake, sobre lecho de vegetales ahumados.',
      },
    },
  ],
  desserts: [
    {
      name: 'Frutas da Estação Laminadas',
      price: 35,
      description: {
        pt: 'Quatro tipos de frutas laminadas.',
        en: 'Four types of sliced fruit.',
        es: 'Cuatro tipos de frutas laminadas.',
      },
    },
    {
      name: 'Trilogia Personal',
      price: 37,
      description: {
        pt: 'Mini brigadeiro de colher, mini pudim e mini quindim de maracujá.',
        en: 'Mini spoon brigadeiro, mini pudding and mini passion-fruit quindim.',
        es: 'Mini brigadeiro de cuchara, mini pudín y mini quindim de maracuyá.',
      },
    },
    {
      name: 'Creme Brûlée',
      price: 37,
      description: {
        pt: 'Creme de origem francesa com toque de baunilha e crosta caramelizada.',
        en: 'French-style cream with a touch of vanilla and a caramelized crust.',
        es: 'Crema de origen francés con toque de vainilla y costra caramelizada.',
      },
    },
  ],
};
