export type Locale = 'pt' | 'en' | 'es';
export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export interface PriceTier {
  /** Ex.: "100 min", "4h" */
  duration: string;
  individual?: number;
  double?: number;
  /** Rótulo customizado quando o preço não é individual/dupla simples. */
  label?: LocalizedText;
  value?: number;
}

export type ExperienceCategory = 'jornada' | 'terapia';

export interface Experience {
  slug: string;
  category: ExperienceCategory;
  image: string;
  name: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  includes?: LocalizedList;
  benefits?: LocalizedList;
  prices: PriceTier[];
  /** Selo de exclusividade (ex.: "Exclusivo Hotel Venit"). */
  exclusive?: LocalizedText;
}

export interface Addon {
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  prices: PriceTier[];
}

/* ------------------------------------------------------------------ */
/* JORNADAS SENSORIAIS                                                 */
/* ------------------------------------------------------------------ */

export const jornadas: Experience[] = [
  {
    slug: 'amazonia',
    category: 'jornada',
    image: '/images/experiences/jornadas/amazonia.jpg',
    name: { pt: 'Amazônia', en: 'Amazônia', es: 'Amazônia' },
    subtitle: {
      pt: 'Natureza viva. Cuidado ancestral.',
      en: 'Living nature. Ancestral care.',
      es: 'Naturaleza viva. Cuidado ancestral.',
    },
    description: {
      pt: 'Inspirada na potência silenciosa da floresta Amazônica, esta jornada restaura o seu equilíbrio natural. Do Grounding Ritual às pindas aromáticas, da massagem facial nutritiva à esfoliação com argilas amazônicas, é um mergulho na força da floresta e um retorno à sua essência — com fórmulas exclusivas e ingredientes 100% naturais.',
      en: 'Inspired by the silent power of the Amazon rainforest, this journey restores your natural balance. From the Grounding Ritual to aromatic poultices, from nourishing facial massage to Amazonian clay exfoliation, it is a dive into the strength of the forest and a return to your essence — with exclusive formulas and 100% natural ingredients.',
      es: 'Inspirada en la potencia silenciosa de la selva Amazónica, esta jornada restaura tu equilibrio natural. Del Grounding Ritual a las pindas aromáticas, del masaje facial nutritivo a la exfoliación con arcillas amazónicas, es una inmersión en la fuerza de la selva y un retorno a tu esencia — con fórmulas exclusivas e ingredientes 100% naturales.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás naturais e café especial', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Massagem facial com creme nutritivo', 'Massagem craniofacial', 'Massagem corporal com pindas aromáticas', 'Esfoliação corporal com argilas e óleos amazônicos'],
      en: ['Premium cotton robe', 'Menu of natural teas and specialty coffee', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Facial massage with nourishing cream', 'Craniofacial massage', 'Body massage with aromatic poultices', 'Body exfoliation with Amazonian clays and oils'],
      es: ['Bata de algodón premium', 'Menú de tés naturales y café especial', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Masaje facial con crema nutritiva', 'Masaje craneofacial', 'Masaje corporal con pindas aromáticas', 'Exfoliación corporal con arcillas y aceites amazónicos'],
    },
    prices: [{ duration: '100 min', individual: 320, double: 640 }],
  },
  {
    slug: 'pedra-da-gavea',
    category: 'jornada',
    image: '/images/experiences/jornadas/pedra-da-gavea.jpg',
    name: { pt: 'Pedra da Gávea', en: 'Pedra da Gávea', es: 'Pedra da Gávea' },
    subtitle: {
      pt: 'Pedras vulcânicas aquecidas para alívio imediato.',
      en: 'Heated volcanic stones for immediate relief.',
      es: 'Piedras volcánicas calientes para alivio inmediato.',
    },
    description: {
      pt: 'Majestosa como a Pedra da Gávea, esta jornada carrega o calor da terra. As pedras vulcânicas de basalto percorrem os músculos desfazendo bloqueios, enquanto pantalas terapêuticas despertam pontos de energia. Um encontro entre calor, silêncio e o renascimento do seu próprio equilíbrio, coroado pelo menu gastronômico Sensória.',
      en: 'Majestic like Pedra da Gávea, this journey carries the warmth of the earth. Volcanic basalt stones glide over the muscles, dissolving blockages, while therapeutic tools awaken energy points. A meeting of warmth, silence and the rebirth of your own balance, crowned by the Sensória gastronomic menu.',
      es: 'Majestuosa como la Pedra da Gávea, esta jornada lleva el calor de la tierra. Las piedras volcánicas de basalto recorren los músculos deshaciendo bloqueos, mientras las pantalas terapéuticas despiertan puntos de energía. Un encuentro entre calor, silencio y el renacimiento de tu propio equilibrio, coronado por el menú gastronómico Sensória.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás e café especial', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Massagem facial com pantalas', 'Massagem corporal com pedras vulcânicas', 'Esfoliação corporal natural', 'Menu Gastronômico Sensória Spa'],
      en: ['Premium cotton robe', 'Menu of teas and specialty coffee', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Facial massage with therapeutic tools', 'Body massage with volcanic stones', 'Natural body exfoliation', 'Sensória Spa gastronomic menu'],
      es: ['Bata de algodón premium', 'Menú de tés y café especial', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Masaje facial con pantalas', 'Masaje corporal con piedras volcánicas', 'Exfoliación corporal natural', 'Menú Gastronómico Sensória Spa'],
    },
    prices: [{ duration: '120 min', individual: 380, double: 680 }],
  },
  {
    slug: 'arpoador',
    category: 'jornada',
    image: '/images/experiences/jornadas/arpoador.jpg',
    name: { pt: 'Arpoador', en: 'Arpoador', es: 'Arpoador' },
    subtitle: {
      pt: 'Aconchego, conexão e leveza ao lado de quem importa.',
      en: 'Warmth, connection and lightness beside those who matter.',
      es: 'Acogida, conexión y ligereza junto a quien importa.',
    },
    description: {
      pt: 'Inspirada na poesia do pôr do sol carioca, a Arpoador é um refúgio íntimo. Do Spa dos Pés à massagem com velas artesanais — que se transformam em óleo morno escorrendo em movimentos envolventes — tudo desacelera. Um momento de acolhimento profundo, com você mesma ou com quem caminha ao seu lado.',
      en: 'Inspired by the poetry of the Rio sunset, Arpoador is an intimate refuge. From the Foot Spa to the massage with artisanal candles — which melt into warm oil flowing in enveloping movements — everything slows down. A moment of deep welcome, alone or with someone by your side.',
      es: 'Inspirada en la poesía del atardecer carioca, Arpoador es un refugio íntimo. Del Spa de Pies al masaje con velas artesanales — que se transforman en aceite tibio en movimientos envolventes — todo se desacelera. Un momento de acogida profunda, contigo misma o con quien camina a tu lado.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás e café especial', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Spa dos pés com esfoliação e hidratação', 'Massagem corporal com velas artesanais'],
      en: ['Premium cotton robe', 'Menu of teas and specialty coffee', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Foot spa with exfoliation and hydration', 'Body massage with artisanal candles'],
      es: ['Bata de algodón premium', 'Menú de tés y café especial', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Spa de pies con exfoliación e hidratación', 'Masaje corporal con velas artesanales'],
    },
    prices: [{ duration: '80 min', individual: 290, double: 580 }],
  },
  {
    slug: 'pao-de-acucar',
    category: 'jornada',
    image: '/images/experiences/jornadas/pao-de-acucar.jpg',
    name: { pt: 'Pão de Açúcar', en: 'Pão de Açúcar', es: 'Pão de Açúcar' },
    subtitle: {
      pt: 'Autoestima em estado de presença.',
      en: 'Self-esteem in a state of presence.',
      es: 'Autoestima en estado de presencia.',
    },
    description: {
      pt: 'Imponente e elegante, esta jornada revela o que há de mais belo em você. Pantalas faciais estimulam a circulação e o brilho da pele, enquanto a massagem modeladora com pantalas corporais esculpe o corpo com toques firmes e fluídos. Presença com forma, beleza com alma — para quem deseja se ver e se sentir radiante.',
      en: 'Imposing and elegant, this journey reveals the most beautiful in you. Facial tools stimulate circulation and skin glow, while the sculpting massage with body tools shapes the body with firm, fluid touches. Presence with form, beauty with soul — for those who want to see and feel radiant.',
      es: 'Imponente y elegante, esta jornada revela lo más bello en ti. Las pantalas faciales estimulan la circulación y el brillo de la piel, mientras el masaje modelador con pantalas corporales esculpe el cuerpo con toques firmes y fluidos. Presencia con forma, belleza con alma — para quien desea verse y sentirse radiante.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás e cafés especiais', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Massagem craniofacial', 'Massagem facial com pantalas', 'Massagem modeladora corporal com pantalas'],
      en: ['Premium cotton robe', 'Menu of teas and specialty coffees', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Craniofacial massage', 'Facial massage with tools', 'Body sculpting massage with tools'],
      es: ['Bata de algodón premium', 'Menú de tés y cafés especiales', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Masaje craneofacial', 'Masaje facial con pantalas', 'Masaje modelador corporal con pantalas'],
    },
    prices: [{ duration: '80 min', individual: 290, double: 580 }],
  },
  {
    slug: 'parque-lage',
    category: 'jornada',
    image: '/images/experiences/jornadas/parque-lage.png',
    name: { pt: 'Parque Lage', en: 'Parque Lage', es: 'Parque Lage' },
    subtitle: {
      pt: 'Elegância natural, pausa consciente e conexão com o essencial.',
      en: 'Natural elegance, conscious pause and connection with the essential.',
      es: 'Elegancia natural, pausa consciente y conexión con lo esencial.',
    },
    description: {
      pt: 'Inspirada nos jardins e no silêncio elegante do Parque Lage, esta jornada convida a desacelerar. A reflexologia nos pés desbloqueia tensões e a massagem relaxante com óleo essencial de lavanda dissolve o cansaço. O ritual se prolonga com uma taça de espumante premiado e mix de nuts — um convite à contemplação e ao autocuidado consciente.',
      en: 'Inspired by the gardens and elegant silence of Parque Lage, this journey invites you to slow down. Foot reflexology releases tension and the relaxing massage with lavender essential oil dissolves fatigue. The ritual extends with a glass of award-winning sparkling wine and a mix of nuts — an invitation to contemplation and conscious self-care.',
      es: 'Inspirada en los jardines y el silencio elegante del Parque Lage, esta jornada invita a desacelerar. La reflexología en los pies desbloquea tensiones y el masaje relajante con aceite esencial de lavanda disuelve el cansancio. El ritual se prolonga con una copa de espumante premiado y mix de nueces — una invitación a la contemplación y al autocuidado consciente.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás e café especial', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Reflexologia nos pés', 'Massagem corporal relaxante com sinergia exclusiva', 'Degustação com espumante premiado e mix de nuts'],
      en: ['Premium cotton robe', 'Menu of teas and specialty coffee', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Foot reflexology', 'Relaxing body massage with exclusive synergy', 'Tasting with award-winning sparkling wine and nuts'],
      es: ['Bata de algodón premium', 'Menú de tés y café especial', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Reflexología en los pies', 'Masaje corporal relajante con sinergia exclusiva', 'Degustación con espumante premiado y mix de nueces'],
    },
    prices: [{ duration: '105 min', individual: 340, double: 660 }],
  },
  {
    slug: 'prainha',
    category: 'jornada',
    image: '/images/experiences/jornadas/prainha.jpg',
    name: { pt: 'Prainha', en: 'Prainha', es: 'Prainha' },
    subtitle: {
      pt: 'Calma, fluidez e o prazer de desacelerar.',
      en: 'Calm, flow and the pleasure of slowing down.',
      es: 'Calma, fluidez y el placer de desacelerar.',
    },
    description: {
      pt: 'Escondida entre montanhas, a Prainha é um santuário de calma. A massagem ultra relaxante devolve fluidez ao movimento, a esfoliação natural desperta a pele e o banho de imersão com ativos botânicos envolve os sentidos em calor e aroma. Ao final, um menu petit e espumante premiado celebram esse gesto de amor por si mesma.',
      en: 'Hidden among the mountains, Prainha is a sanctuary of calm. The ultra-relaxing massage restores fluidity to movement, natural exfoliation awakens the skin and the immersion bath with botanical actives envelops the senses in warmth and aroma. To finish, a petit menu and award-winning sparkling wine celebrate this act of self-love.',
      es: 'Escondida entre montañas, Prainha es un santuario de calma. El masaje ultra relajante devuelve fluidez al movimiento, la exfoliación natural despierta la piel y el baño de inmersión con activos botánicos envuelve los sentidos en calor y aroma. Al final, un menú petit y espumante premiado celebran ese gesto de amor por ti misma.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás e café especial', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Esfoliação corporal natural', 'Banho de imersão revigorante', 'Massagem ultra relaxante', 'Menu petit com espumante premiado'],
      en: ['Premium cotton robe', 'Menu of teas and specialty coffee', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Natural body exfoliation', 'Invigorating immersion bath', 'Ultra-relaxing massage', 'Petit menu with award-winning sparkling wine'],
      es: ['Bata de algodón premium', 'Menú de tés y café especial', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Exfoliación corporal natural', 'Baño de inmersión revitalizante', 'Masaje ultra relajante', 'Menú petit con espumante premiado'],
    },
    prices: [{ duration: '120 min', individual: 480, double: 880 }],
  },
  {
    slug: 'itacoatiara',
    category: 'jornada',
    image: '/images/experiences/jornadas/itacoatiara.jpg',
    name: { pt: 'Itacoatiara', en: 'Itacoatiara', es: 'Itacoatiara' },
    subtitle: {
      pt: 'Jornada de renascimento em águas profundas, silêncio e presença.',
      en: 'A journey of rebirth in deep waters, silence and presence.',
      es: 'Jornada de renacimiento en aguas profundas, silencio y presencia.',
    },
    description: {
      pt: 'A experiência mais exclusiva do Sensória Spa: um mergulho sensorial de quatro horas para restaurar corpo, pele, energia e alma. Esfoliação corporal e facial, massagem craniofacial, spa das mãos e dos pés, um mix de três técnicas de massagem e banho de imersão com ativos botânicos. Reconexão plena — um tempo só seu, profundo e inesquecível.',
      en: "Sensória Spa's most exclusive experience: a four-hour sensory dive to restore body, skin, energy and soul. Body and facial exfoliation, craniofacial massage, hand and foot spa, a mix of three massage techniques and an immersion bath with botanical actives. Full reconnection — time that is only yours, deep and unforgettable.",
      es: 'La experiencia más exclusiva del Sensória Spa: una inmersión sensorial de cuatro horas para restaurar cuerpo, piel, energía y alma. Exfoliación corporal y facial, masaje craneofacial, spa de manos y pies, un mix de tres técnicas de masaje y baño de inmersión con activos botánicos. Reconexión plena — un tiempo solo tuyo, profundo e inolvidable.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás e café especial', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Esfoliação corporal e facial', 'Massagem craniofacial', 'Spa dos Pés ultra hidratante', 'Spa das Mãos restaurador', 'Mix de 3 massagens selecionadas', 'Banho de imersão com ativos naturais', 'Menu petit com espumante premiado'],
      en: ['Premium cotton robe', 'Menu of teas and specialty coffee', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Body and facial exfoliation', 'Craniofacial massage', 'Ultra-hydrating foot spa', 'Restorative hand spa', 'Mix of 3 selected massages', 'Immersion bath with natural actives', 'Petit menu with award-winning sparkling wine'],
      es: ['Bata de algodón premium', 'Menú de tés y café especial', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Exfoliación corporal y facial', 'Masaje craneofacial', 'Spa de Pies ultra hidratante', 'Spa de Manos restaurador', 'Mix de 3 masajes seleccionados', 'Baño de inmersión con activos naturales', 'Menú petit con espumante premiado'],
    },
    prices: [{ duration: '4h', individual: 880, double: 1680 }],
  },
  {
    slug: 'spa-detox',
    category: 'jornada',
    image: '/images/experiences/jornadas/spa-detox.jpg',
    name: { pt: 'Spa Detox', en: 'Spa Detox', es: 'Spa Detox' },
    subtitle: {
      pt: 'Leveza, clareza e um corpo que respira de novo.',
      en: 'Lightness, clarity and a body that breathes again.',
      es: 'Ligereza, claridad y un cuerpo que respira de nuevo.',
    },
    description: {
      pt: 'Um ritual que purifica corpo e mente com profundidade e ingredientes 100% naturais. Do Grounding Ritual com sais de Epsom à argila verde com calor que estimula a drenagem, a massagem detox reduz inchaços e renova a energia. Um reinício necessário, selado por um suco detox funcional — para se sentir leve, clara e inteira novamente.',
      en: 'A ritual that purifies body and mind deeply with 100% natural ingredients. From the Grounding Ritual with Epsom salts to warm green clay that stimulates drainage, the detox massage reduces swelling and renews energy. A necessary reset, sealed with a functional detox juice — to feel light, clear and whole again.',
      es: 'Un ritual que purifica cuerpo y mente con profundidad e ingredientes 100% naturales. Del Grounding Ritual con sales de Epsom a la arcilla verde con calor que estimula el drenaje, el masaje detox reduce hinchazones y renueva la energía. Un reinicio necesario, sellado con un jugo detox funcional — para sentirte ligera, clara y entera de nuevo.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás e cafés especiais', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Reflexologia e esfoliação nos pés', 'Termolipo com argila verde detox', 'Esfoliação natural corporal', 'Massagem corporal detox', 'Suco detox'],
      en: ['Premium cotton robe', 'Menu of teas and specialty coffees', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Foot reflexology and exfoliation', 'Thermolipo with detox green clay', 'Natural body exfoliation', 'Detox body massage', 'Detox juice'],
      es: ['Bata de algodón premium', 'Menú de tés y cafés especiales', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Reflexología y exfoliación en los pies', 'Termolipo con arcilla verde detox', 'Exfoliación natural corporal', 'Masaje corporal detox', 'Jugo detox'],
    },
    prices: [{ duration: '110 min', individual: 380, double: 680 }],
  },
  {
    slug: 'arco-iris',
    category: 'jornada',
    image: '/images/experiences/jornadas/arco-iris.jpg',
    name: { pt: 'Arco-Íris', en: 'Rainbow', es: 'Arcoíris' },
    subtitle: {
      pt: 'Fantasia, aconchego e a magia do cuidado compartilhado.',
      en: 'Fantasy, warmth and the magic of shared care.',
      es: 'Fantasía, acogida y la magia del cuidado compartido.',
    },
    description: {
      pt: 'Criada para crianças de 5 a 13 anos e seus responsáveis, a Arco-Íris transforma o cuidado em memória afetiva. Enquanto o adulto relaxa, os pequenos vivem uma jornada lúdica com massagem com pedras especiais, esfoliação nos pés e máscara de argila mágica. Um delicioso suco, mini chocolates e o mimo Sensória selam esse instante de carinho entre gerações.',
      en: 'Created for children aged 5 to 13 and their guardians, Rainbow turns care into affectionate memory. While the adult relaxes, the little ones live a playful journey with special-stone massage, foot exfoliation and a magic clay mask. A delicious juice, mini chocolates and the Sensória treat seal this moment of tenderness across generations.',
      es: 'Creada para niños de 5 a 13 años y sus responsables, Arcoíris transforma el cuidado en memoria afectiva. Mientras el adulto se relaja, los pequeños viven una jornada lúdica con masaje con piedras especiales, exfoliación en los pies y mascarilla de arcilla mágica. Un delicioso jugo, mini chocolates y el mimo Sensória sellan ese instante de cariño entre generaciones.',
    },
    includes: {
      pt: ['Para os pequenos: ambiente lúdico, roupão fantástico, Grounding Ritual, massagem com pedras, máscara de argila mágica, mini chocolates e suco', 'Para os responsáveis: roupão premium, Grounding Ritual, máscara facial de argila, massagem relaxante, mimo Sensória'],
      en: ['For the little ones: playful space, fantasy robe, Grounding Ritual, stone massage, magic clay mask, mini chocolates and juice', 'For guardians: premium robe, Grounding Ritual, facial clay mask, relaxing massage, Sensória treat'],
      es: ['Para los pequeños: ambiente lúdico, bata fantástica, Grounding Ritual, masaje con piedras, mascarilla de arcilla mágica, mini chocolates y jugo', 'Para los responsables: bata premium, Grounding Ritual, mascarilla facial de arcilla, masaje relajante, mimo Sensória'],
    },
    prices: [
      { duration: '90 min', value: 480, label: { pt: 'Dupla (adulto + criança) com banheira', en: 'Couple (adult + child) with tub', es: 'Pareja (adulto + niño) con bañera' } },
      { duration: '60 min', value: 380, label: { pt: 'Dupla (adulto + criança) sem banheira', en: 'Couple (adult + child) without tub', es: 'Pareja (adulto + niño) sin bañera' } },
    ],
  },
  {
    slug: 'celebrar',
    category: 'jornada',
    image: '/images/experiences/jornadas/celebrar.jpg',
    name: { pt: 'Celebrar', en: 'Celebrate', es: 'Celebrar' },
    subtitle: {
      pt: 'Presença, propósito e o toque de um momento só seu.',
      en: 'Presence, purpose and the touch of a moment that is only yours.',
      es: 'Presencia, propósito y el toque de un momento solo tuyo.',
    },
    description: {
      pt: 'Criada para celebrar você — em aniversários, conquistas ou na beleza de estar presente. Massagem craniofacial, reflexologia podal e massagem relaxante com drenagem dissolvem o cansaço com nossa sinergia exclusiva de óleos essenciais. Como toda celebração merece um brinde, a experiência se estende com um brunch exclusivo Sensória.',
      en: 'Created to celebrate you — on birthdays, achievements or simply the beauty of being present. Craniofacial massage, foot reflexology and a relaxing massage with drainage dissolve fatigue with our exclusive essential-oil synergy. As every celebration deserves a toast, the experience extends with an exclusive Sensória brunch.',
      es: 'Creada para celebrarte — en cumpleaños, logros o en la belleza de estar presente. Masaje craneofacial, reflexología podal y masaje relajante con drenaje disuelven el cansancio con nuestra sinergia exclusiva de aceites esenciales. Como toda celebración merece un brindis, la experiencia se extiende con un brunch exclusivo Sensória.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Grounding Ritual', 'Massagem craniofacial', 'Reflexologia podal', 'Massagem relaxante com drenagem', 'Brunch exclusivo com chás e café especial', 'Mimo exclusivo Sensória'],
      en: ['Premium cotton robe', 'Grounding Ritual', 'Craniofacial massage', 'Foot reflexology', 'Relaxing massage with drainage', 'Exclusive brunch with teas and specialty coffee', 'Exclusive Sensória treat'],
      es: ['Bata de algodón premium', 'Grounding Ritual', 'Masaje craneofacial', 'Reflexología podal', 'Masaje relajante con drenaje', 'Brunch exclusivo con tés y café especial', 'Mimo exclusivo Sensória'],
    },
    prices: [
      { duration: '90 min', value: 598, label: { pt: 'Individual', en: 'Individual', es: 'Individual' } },
      { duration: '90 min', value: 798, label: { pt: 'Dupla (sala individual)', en: 'Couple (single room)', es: 'Pareja (sala individual)' } },
      { duration: '120 min', value: 960, label: { pt: 'Dupla (sala dupla)', en: 'Couple (double room)', es: 'Pareja (sala doble)' } },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* TERAPIAS CORPORAIS                                                  */
/* ------------------------------------------------------------------ */

const PRICES_STD: PriceTier[] = [
  { duration: '30 min', individual: 130 },
  { duration: '50 min', individual: 210 },
  { duration: '90 min', individual: 315 },
];
/** Massagens relaxantes/terapêuticas (Brisa, Flow, Trama, Sopro Restaurador). */
const PRICES_RELAX: PriceTier[] = [
  { duration: '30 min', individual: 140 },
  { duration: '50 min', individual: 238 },
  { duration: '90 min', individual: 420 },
];
/** Detox/premium (Lumina, Pureza, Sal e Ervas). */
const PRICES_PREMIUM: PriceTier[] = [
  { duration: '50 min', individual: 298 },
  { duration: '90 min', individual: 480 },
];

export const terapias: Experience[] = [
  {
    slug: 'brisa',
    category: 'terapia',
    image: '/images/experiences/terapias/brisa.jpg',
    name: { pt: 'Brisa', en: 'Brisa', es: 'Brisa' },
    subtitle: { pt: 'Serenidade e sono renovado.', en: 'Serenity and renewed sleep.', es: 'Serenidad y sueño renovado.' },
    description: {
      pt: 'Como uma brisa em um jardim sereno, movimentos ritmados e precisos acalmam a mente e relaxam os músculos. Uma pausa revigorante que melhora a qualidade do sono e renova as energias.',
      en: 'Like a breeze in a serene garden, rhythmic, precise movements calm the mind and relax the muscles. A revitalizing pause that improves sleep quality and renews your energy.',
      es: 'Como una brisa en un jardín sereno, movimientos rítmicos y precisos calman la mente y relajan los músculos. Una pausa revitalizante que mejora la calidad del sueño y renueva las energías.',
    },
    benefits: {
      pt: ['Reduz o cansaço', 'Relaxa o corpo', 'Reduz a ansiedade', 'Acalma', 'Aumenta a qualidade do sono'],
      en: ['Reduces fatigue', 'Relaxes the body', 'Reduces anxiety', 'Calms', 'Improves sleep quality'],
      es: ['Reduce el cansancio', 'Relaja el cuerpo', 'Reduce la ansiedad', 'Calma', 'Mejora la calidad del sueño'],
    },
    prices: PRICES_RELAX,
  },
  {
    slug: 'flow',
    category: 'terapia',
    image: '/images/experiences/terapias/flow.jpg',
    name: { pt: 'Flow', en: 'Flow', es: 'Flow' },
    subtitle: { pt: 'Drenagem, leveza e circulação.', en: 'Drainage, lightness and circulation.', es: 'Drenaje, ligereza y circulación.' },
    description: {
      pt: 'Uma jornada pelos rios internos do corpo. Manobras suaves desobstruem os canais linfáticos, liberando toxinas e resíduos acumulados, com uma sinergia que nutre a pele e promove leveza duradoura.',
      en: 'A journey through the body’s inner rivers. Gentle maneuvers unblock the lymphatic channels, releasing accumulated toxins, with a synergy that nourishes the skin and brings lasting lightness.',
      es: 'Una jornada por los ríos internos del cuerpo. Maniobras suaves desobstruyen los canales linfáticos, liberando toxinas acumuladas, con una sinergia que nutre la piel y promueve ligereza duradera.',
    },
    benefits: {
      pt: ['Reduz inchaço e retenção de líquidos', 'Melhora a circulação', 'Estimula o sistema imunológico', 'Alivia dores musculares e articulares', 'Melhora a função intestinal'],
      en: ['Reduces swelling and fluid retention', 'Improves circulation', 'Boosts the immune system', 'Relieves muscle and joint pain', 'Improves intestinal function'],
      es: ['Reduce hinchazón y retención de líquidos', 'Mejora la circulación', 'Estimula el sistema inmunológico', 'Alivia dolores musculares y articulares', 'Mejora la función intestinal'],
    },
    prices: PRICES_RELAX,
  },
  {
    slug: 'toque-vulcanico',
    category: 'terapia',
    image: '/images/experiences/terapias/toque-vulcanico.jpg',
    name: { pt: 'Toque Vulcânico', en: 'Volcanic Touch', es: 'Toque Volcánico' },
    subtitle: { pt: 'Pedras quentes que dissolvem tensões.', en: 'Hot stones that dissolve tension.', es: 'Piedras calientes que disuelven tensiones.' },
    description: {
      pt: 'Cada pedra quente de basalto é um raio de sol sobre a pele. Colocadas ao longo dos pontos de energia e combinadas a movimentos suaves, dissolvem os nós musculares e restauram o equilíbrio interno.',
      en: 'Each hot basalt stone is a ray of sun on the skin. Placed along the energy points and combined with gentle movements, they dissolve muscle knots and restore inner balance.',
      es: 'Cada piedra caliente de basalto es un rayo de sol sobre la piel. Colocadas a lo largo de los puntos de energía y combinadas con movimientos suaves, disuelven los nudos musculares y restauran el equilibrio interno.',
    },
    benefits: {
      pt: ['Reduz estresse e ansiedade', 'Alivia a tensão e a rigidez muscular', 'Melhora a circulação', 'Relaxa a musculatura', 'Alivia dores musculares e articulares'],
      en: ['Reduces stress and anxiety', 'Relieves muscle tension and stiffness', 'Improves circulation', 'Relaxes the muscles', 'Relieves muscle and joint pain'],
      es: ['Reduce estrés y ansiedad', 'Alivia la tensión y la rigidez muscular', 'Mejora la circulación', 'Relaja la musculatura', 'Alivia dolores musculares y articulares'],
    },
    prices: [
      { duration: '50 min', individual: 238 },
      { duration: '90 min', individual: 420 },
    ],
  },
  {
    slug: 'lumina',
    category: 'terapia',
    image: '/images/experiences/terapias/lumina.jpg',
    name: { pt: 'Lumina', en: 'Lumina', es: 'Lumina' },
    subtitle: { pt: 'Velas mornas de cera de babaçu.', en: 'Warm babassu wax candles.', es: 'Velas tibias de cera de babasú.' },
    description: {
      pt: 'Em um santuário de tranquilidade, a vela morna escorre sobre o corpo enquanto raios dourados dançam ao seu redor. Uma experiência única feita com cera de babaçu e blend de óleos essenciais e vegetais.',
      en: 'In a sanctuary of tranquility, the warm candle flows over the body while golden light dances around you. A unique experience made with babassu wax and a blend of essential and vegetable oils.',
      es: 'En un santuario de tranquilidad, la vela tibia se desliza sobre el cuerpo mientras rayos dorados danzan a tu alrededor. Una experiencia única hecha con cera de babasú y blend de aceites esenciales y vegetales.',
    },
    benefits: {
      pt: ['Hidrata e suaviza a pele', 'Reduz tensões musculares', 'Estimula a circulação sanguínea', 'Revitaliza o corpo e a mente'],
      en: ['Hydrates and softens the skin', 'Reduces muscle tension', 'Stimulates blood circulation', 'Revitalizes body and mind'],
      es: ['Hidrata y suaviza la piel', 'Reduce tensiones musculares', 'Estimula la circulación sanguínea', 'Revitaliza el cuerpo y la mente'],
    },
    prices: PRICES_PREMIUM,
  },
  {
    slug: 'trama',
    category: 'terapia',
    image: '/images/experiences/terapias/trama.jpg',
    name: { pt: 'Trama', en: 'Trama', es: 'Trama' },
    subtitle: { pt: 'Liberação miofascial profunda.', en: 'Deep myofascial release.', es: 'Liberación miofascial profunda.' },
    description: {
      pt: 'Uma jornada pelas profundezas dos tecidos fasciais. Como arqueólogos do corpo, os terapeutas exploram nódulos e pontos de tensão, liberando as amarras que aprisionam a vitalidade e devolvendo liberdade de movimento.',
      en: 'A journey into the depths of the fascial tissues. Like archaeologists of the body, therapists explore knots and tension points, releasing the bonds that trap vitality and restoring freedom of movement.',
      es: 'Una jornada por las profundidades de los tejidos fasciales. Como arqueólogos del cuerpo, los terapeutas exploran nódulos y puntos de tensión, liberando las ataduras que aprisionan la vitalidad y devolviendo libertad de movimiento.',
    },
    benefits: {
      pt: ['Alívio de dores musculares crônicas e agudas', 'Redução de nódulos e pontos-gatilho', 'Melhora da flexibilidade e mobilidade', 'Estímulo da circulação sanguínea e linfática', 'Restauração do equilíbrio corporal'],
      en: ['Relief from chronic and acute muscle pain', 'Reduction of knots and trigger points', 'Improved flexibility and mobility', 'Stimulates blood and lymphatic circulation', 'Restores body balance'],
      es: ['Alivio de dolores musculares crónicos y agudos', 'Reducción de nódulos y puntos gatillo', 'Mejora de la flexibilidad y movilidad', 'Estímulo de la circulación sanguínea y linfática', 'Restauración del equilibrio corporal'],
    },
    prices: PRICES_RELAX,
  },
  {
    slug: 'sopro-restaurador',
    category: 'terapia',
    image: '/images/experiences/terapias/sopro-restaurador.jpg',
    name: { pt: 'Sopro Restaurador', en: 'Restorative Breath', es: 'Soplo Restaurador' },
    subtitle: { pt: 'Recuperação para corpos atléticos.', en: 'Recovery for athletic bodies.', es: 'Recuperación para cuerpos atléticos.' },
    description: {
      pt: 'Assim como a natureza encontra equilíbrio no fluxo do vento, os corpos atléticos buscam harmonia entre esforço e descanso. Toques firmes permitem que os músculos respirem, liberando tensão e criando espaço para a verdadeira restauração muscular.',
      en: 'Just as nature finds balance in the flow of the wind, athletic bodies seek harmony between effort and rest. Firm touches let the muscles breathe, releasing tension and creating room for true muscle restoration.',
      es: 'Así como la naturaleza encuentra equilibrio en el flujo del viento, los cuerpos atléticos buscan armonía entre esfuerzo y descanso. Toques firmes permiten que los músculos respiren, liberando tensión y creando espacio para la verdadera restauración muscular.',
    },
    benefits: {
      pt: ['Eficaz para atletas com dores ou lesões', 'Reduz inflamações e recupera fibras musculares', 'Melhora a circulação sanguínea', 'Aumenta a flexibilidade e a amplitude de movimento', 'Ajuda na prevenção de lesões'],
      en: ['Effective for athletes with pain or injuries', 'Reduces inflammation and repairs muscle fibers', 'Improves blood circulation', 'Increases flexibility and range of motion', 'Helps prevent injuries'],
      es: ['Eficaz para atletas con dolores o lesiones', 'Reduce inflamaciones y recupera fibras musculares', 'Mejora la circulación sanguínea', 'Aumenta la flexibilidad y amplitud de movimiento', 'Ayuda en la prevención de lesiones'],
    },
    prices: PRICES_RELAX,
  },
  {
    slug: 'pureza',
    category: 'terapia',
    image: '/images/experiences/terapias/pureza.jpg',
    name: { pt: 'Pureza', en: 'Pureza', es: 'Pureza' },
    subtitle: { pt: 'Detox com argiloterapia e manta térmica.', en: 'Detox with clay therapy and thermal blanket.', es: 'Detox con arcilloterapia y manta térmica.' },
    description: {
      pt: 'Uma jornada de renovação em que cada toque é um convite ao rejuvenescimento. Com massagem detox, argiloterapia e manta térmica, o ritual acelera o metabolismo, elimina toxinas e promove profundo relaxamento muscular.',
      en: 'A journey of renewal where every touch is an invitation to rejuvenation. With detox massage, clay therapy and a thermal blanket, the ritual accelerates metabolism, eliminates toxins and brings deep muscle relaxation.',
      es: 'Una jornada de renovación donde cada toque es una invitación al rejuvenecimiento. Con masaje detox, arcilloterapia y manta térmica, el ritual acelera el metabolismo, elimina toxinas y promueve profundo relajamiento muscular.',
    },
    benefits: {
      pt: ['Eliminação de líquidos retidos e toxinas', 'Melhora da saúde vascular e linfática', 'Acelera o metabolismo', 'Melhora a elasticidade da pele', 'Renovação da energia vital'],
      en: ['Elimination of retained fluids and toxins', 'Improves vascular and lymphatic health', 'Accelerates metabolism', 'Improves skin elasticity', 'Renews vital energy'],
      es: ['Eliminación de líquidos retenidos y toxinas', 'Mejora la salud vascular y linfática', 'Acelera el metabolismo', 'Mejora la elasticidad de la piel', 'Renovación de la energía vital'],
    },
    prices: PRICES_PREMIUM,
  },
  {
    slug: 'sal-e-ervas',
    category: 'terapia',
    image: '/images/experiences/terapias/sal-e-ervas.jpg',
    name: { pt: 'Sal e Ervas', en: 'Salt & Herbs', es: 'Sal y Hierbas' },
    subtitle: { pt: 'Pindas chinesas aquecidas com ervas.', en: 'Heated Chinese poultices with herbs.', es: 'Pindas chinas calientes con hierbas.' },
    description: {
      pt: 'Cada toque das pindas chinesas aquecidas é uma sinfonia de cura. Ervas naturais e óleos essenciais envolvem os sentidos, conectando você com a harmonia da tríade corpo, mente e alma.',
      en: 'Each touch of the heated Chinese poultices is a symphony of healing. Natural herbs and essential oils envelop the senses, connecting you to the harmony of body, mind and soul.',
      es: 'Cada toque de las pindas chinas calientes es una sinfonía de cura. Hierbas naturales y aceites esenciales envuelven los sentidos, conectándote con la armonía de la tríada cuerpo, mente y alma.',
    },
    benefits: {
      pt: ['Reduz o cansaço', 'Relaxa o corpo', 'Reduz a ansiedade', 'Acalma', 'Aumenta a qualidade do sono'],
      en: ['Reduces fatigue', 'Relaxes the body', 'Reduces anxiety', 'Calms', 'Improves sleep quality'],
      es: ['Reduce el cansancio', 'Relaja el cuerpo', 'Reduce la ansiedad', 'Calma', 'Mejora la calidad del sueño'],
    },
    prices: PRICES_PREMIUM,
  },
  {
    slug: 'celeridade',
    category: 'terapia',
    image: '/images/experiences/terapias/celeridade.png',
    name: { pt: 'Celeridade', en: 'Celeridade', es: 'Celeridade' },
    subtitle: { pt: 'Massagem turbo com ventosas.', en: 'Turbo massage with cupping.', es: 'Masaje turbo con ventosas.' },
    description: {
      pt: 'Movimentos precisos, enérgicos e o auxílio de ventosas oferecem uma explosão revigorante de vitalidade, redefinindo formas e intensificando a confiança. O estresse se dissipa e a energia se renova.',
      en: 'Precise, energetic movements and the aid of cupping deliver an invigorating burst of vitality, redefining shapes and boosting confidence. Stress dissipates and energy renews.',
      es: 'Movimientos precisos, enérgicos y el auxilio de ventosas ofrecen una explosión revitalizante de vitalidad, redefiniendo formas e intensificando la confianza. El estrés se disipa y la energía se renueva.',
    },
    benefits: {
      pt: ['Estimula a queima de gordura', 'Reduz medidas e trata celulite', 'Acelera o metabolismo', 'Promove bem-estar e vitalidade'],
      en: ['Stimulates fat burning', 'Reduces measurements and treats cellulite', 'Accelerates metabolism', 'Promotes well-being and vitality'],
      es: ['Estimula la quema de grasa', 'Reduce medidas y trata la celulitis', 'Acelera el metabolismo', 'Promueve bienestar y vitalidad'],
    },
    prices: PRICES_STD,
  },
  {
    slug: 'curva',
    category: 'terapia',
    image: '/images/experiences/terapias/curva.jpg',
    name: { pt: 'Curva', en: 'Curva', es: 'Curva' },
    subtitle: { pt: 'Modelagem corporal e amor-próprio.', en: 'Body sculpting and self-love.', es: 'Modelado corporal y amor propio.' },
    description: {
      pt: 'Uma celebração das formas naturais do corpo. Cada toque é uma reverência às curvas que nos tornam únicos, uma onda de amor-próprio que realça a beleza natural e promove equilíbrio interior e exterior.',
      en: 'A celebration of the body’s natural shapes. Each touch honors the curves that make us unique, a wave of self-love that enhances natural beauty and brings inner and outer balance.',
      es: 'Una celebración de las formas naturales del cuerpo. Cada toque es una reverencia a las curvas que nos hacen únicos, una ola de amor propio que realza la belleza natural y promueve equilibrio interior y exterior.',
    },
    benefits: {
      pt: ['Redução de medidas e remodelagem', 'Combate à flacidez e celulite', 'Modelagem da silhueta', 'Redução do inchaço', 'Restauração da firmeza da pele'],
      en: ['Reduces measurements and reshapes', 'Fights sagging and cellulite', 'Sculpts the silhouette', 'Reduces swelling', 'Restores skin firmness'],
      es: ['Reducción de medidas y remodelación', 'Combate la flacidez y celulitis', 'Modela la silueta', 'Reduce la hinchazón', 'Restaura la firmeza de la piel'],
    },
    prices: PRICES_STD,
  },
  {
    slug: 'aura',
    category: 'terapia',
    image: '/images/experiences/terapias/aura.jpg',
    name: { pt: 'Aura', en: 'Aura', es: 'Aura' },
    subtitle: { pt: 'Shiatsu na cadeira, alívio instantâneo.', en: 'Chair shiatsu, instant relief.', es: 'Shiatsu en la silla, alivio instantáneo.' },
    description: {
      pt: 'Uma pílula de alívio instantâneo em meio à agitação urbana. A técnica ancestral do shiatsu, com pressões estratégicas nos meridianos, desbloqueia o fluxo de energia vital e promove profundo relaxamento.',
      en: 'A pill of instant relief amid urban rush. The ancient shiatsu technique, with strategic pressure on the meridians, unblocks the flow of vital energy and brings deep relaxation.',
      es: 'Una píldora de alivio instantáneo en medio de la agitación urbana. La técnica ancestral del shiatsu, con presiones estratégicas en los meridianos, desbloquea el flujo de energía vital y promueve profundo relajamiento.',
    },
    benefits: {
      pt: ['Alívio do estresse e ansiedade', 'Melhora da postura', 'Diminuição de dores musculares', 'Revitalização das energias', 'Relaxamento profundo'],
      en: ['Relieves stress and anxiety', 'Improves posture', 'Reduces muscle pain', 'Revitalizes energy', 'Deep relaxation'],
      es: ['Alivio del estrés y ansiedad', 'Mejora de la postura', 'Disminución de dolores musculares', 'Revitalización de las energías', 'Relajamiento profundo'],
    },
    prices: [
      { duration: '15 min', individual: 74 },
      { duration: '20 min', individual: 85 },
      { duration: '30 min', individual: 130 },
      { duration: '50 min', individual: 210 },
    ],
  },
  {
    slug: 'libelula',
    category: 'terapia',
    image: '/images/experiences/terapias/libelula.jpg',
    name: { pt: 'Libélula', en: 'Dragonfly', es: 'Libélula' },
    subtitle: { pt: 'Pantalas que esculpem e ativam o linfático.', en: 'Tools that sculpt and activate the lymphatic system.', es: 'Pantalas que esculpen y activan el linfático.' },
    description: {
      pt: 'A anatomia das pantalas é como o voo gracioso de uma libélula, esculpindo o corpo com delicadeza e ativando o sistema linfático. Saia do casulo de tensões rumo a uma autoestima renovada.',
      en: 'The tools move like the graceful flight of a dragonfly, sculpting the body gently and activating the lymphatic system. Leave the cocoon of tension toward renewed self-esteem.',
      es: 'La anatomía de las pantalas es como el vuelo grácil de una libélula, esculpiendo el cuerpo con delicadeza y activando el sistema linfático. Sal del capullo de tensiones hacia una autoestima renovada.',
    },
    benefits: {
      pt: ['Modela o corpo', 'Trata a celulite', 'Melhora a flacidez', 'Melhora a circulação', 'Eleva a autoestima'],
      en: ['Sculpts the body', 'Treats cellulite', 'Improves sagging', 'Improves circulation', 'Boosts self-esteem'],
      es: ['Modela el cuerpo', 'Trata la celulitis', 'Mejora la flacidez', 'Mejora la circulación', 'Eleva la autoestima'],
    },
    prices: PRICES_STD,
  },
  {
    slug: 'orla',
    category: 'terapia',
    image: '/images/experiences/terapias/orla.jpg',
    name: { pt: 'Orla', en: 'Orla', es: 'Orla' },
    subtitle: { pt: 'Spa dos pés e reflexologia.', en: 'Foot spa and reflexology.', es: 'Spa de pies y reflexología.' },
    description: {
      pt: 'Como caminhar descalço à beira-mar. Com produtos 100% naturais, uma esfoliação remove as células mortas e a reflexologia podal promove bem-estar em todo o corpo, deixando os pés macios e sedosos.',
      en: 'Like walking barefoot by the sea. With 100% natural products, an exfoliation removes dead cells and foot reflexology promotes whole-body well-being, leaving the feet soft and silky.',
      es: 'Como caminar descalzo a la orilla del mar. Con productos 100% naturales, una exfoliación remueve las células muertas y la reflexología podal promueve bienestar en todo el cuerpo, dejando los pies suaves y sedosos.',
    },
    benefits: {
      pt: ['Hidratação profunda dos pés', 'Remoção suave de células mortas', 'Maciez e sedosidade', 'Estímulo dos pontos de reflexologia'],
      en: ['Deep foot hydration', 'Gentle dead-cell removal', 'Softness and silkiness', 'Stimulation of reflexology points'],
      es: ['Hidratación profunda de los pies', 'Remoción suave de células muertas', 'Suavidad y sedosidad', 'Estímulo de los puntos de reflexología'],
    },
    prices: PRICES_STD,
  },
  {
    slug: 'equilibrio',
    category: 'terapia',
    image: '/images/experiences/terapias/equilibrio.jpg',
    name: { pt: 'Equilíbrio', en: 'Balance', es: 'Equilibrio' },
    subtitle: { pt: 'Reflexologia podal terapêutica.', en: 'Therapeutic foot reflexology.', es: 'Reflexología podal terapéutica.' },
    description: {
      pt: 'Os pés como um mapa para redescobrir o equilíbrio. Pressões aplicadas em pontos específicos, de acordo com a sua individualidade, refletem em regiões e órgãos do corpo, desencadeando benefícios por todo o organismo.',
      en: 'The feet as a map to rediscover balance. Pressure applied to specific points, according to your individuality, reflects on regions and organs of the body, triggering benefits throughout the whole system.',
      es: 'Los pies como un mapa para redescubrir el equilibrio. Presiones aplicadas en puntos específicos, según tu individualidad, se reflejan en regiones y órganos del cuerpo, desencadenando beneficios por todo el organismo.',
    },
    benefits: {
      pt: ['Equilíbrio hormonal', 'Redução de dores de cabeça', 'Aumento da energia e vitalidade', 'Estímulo do sistema imunológico', 'Melhora da qualidade do sono'],
      en: ['Hormonal balance', 'Reduces headaches', 'Increases energy and vitality', 'Boosts the immune system', 'Improves sleep quality'],
      es: ['Equilibrio hormonal', 'Reducción de dolores de cabeza', 'Aumento de la energía y vitalidad', 'Estímulo del sistema inmunológico', 'Mejora de la calidad del sueño'],
    },
    prices: PRICES_STD,
  },
];

/* ------------------------------------------------------------------ */
/* ADICIONAIS                                                          */
/* ------------------------------------------------------------------ */

export const adicionais: Addon[] = [
  {
    slug: 'banho-de-imersao',
    name: { pt: 'Banho de Imersão', en: 'Immersion Bath', es: 'Baño de Inmersión' },
    description: {
      pt: 'Águas revitalizantes com ativos naturais exclusivos Sensória que acalmam corpo e mente.',
      en: 'Revitalizing waters with exclusive Sensória natural actives that soothe body and mind.',
      es: 'Aguas revitalizantes con activos naturales exclusivos Sensória que calman cuerpo y mente.',
    },
    prices: [{ duration: '30 min', individual: 150 }],
  },
  {
    slug: 'cranio-facial',
    name: { pt: 'Crânio Facial', en: 'Craniofacial', es: 'Craneofacial' },
    description: {
      pt: 'O luxo da massagem facial que rejuvenesce a pele e alivia tensões acumuladas.',
      en: 'The luxury of a facial massage that rejuvenates the skin and relieves accumulated tension.',
      es: 'El lujo del masaje facial que rejuvenece la piel y alivia tensiones acumuladas.',
    },
    prices: [{ duration: '15 min', individual: 85 }],
  },
  {
    slug: 'banho-espumante',
    name: { pt: 'Banho de Imersão + Espumante & Nuts', en: 'Immersion Bath + Sparkling Wine & Nuts', es: 'Baño de Inmersión + Espumante & Nueces' },
    description: {
      pt: 'Banho de imersão acompanhado de espumante premiado internacionalmente e mix de nuts.',
      en: 'Immersion bath accompanied by internationally awarded sparkling wine and a mix of nuts.',
      es: 'Baño de inmersión acompañado de espumante premiado internacionalmente y mix de nueces.',
    },
    prices: [{ duration: '30 min', individual: 230 }],
  },
  {
    slug: 'velas-terapeuticas',
    name: { pt: 'Velas Terapêuticas', en: 'Therapeutic Candles', es: 'Velas Terapéuticas' },
    description: {
      pt: 'Velas naturais com óleos essenciais que hidratam a pele e envolvem em aroma relaxante.',
      en: 'Natural candles with essential oils that hydrate the skin and wrap you in a relaxing aroma.',
      es: 'Velas naturales con aceites esenciales que hidratan la piel y envuelven en aroma relajante.',
    },
    prices: [{ duration: '', individual: 60 }],
  },
  {
    slug: 'pindas-chinesas',
    name: { pt: 'Pindas Chinesas', en: 'Chinese Poultices', es: 'Pindas Chinas' },
    description: {
      pt: 'Bolsas artesanais aquecidas com ervas medicinais que aliviam tensões musculares.',
      en: 'Artisanal pouches heated with medicinal herbs that relieve muscle tension.',
      es: 'Bolsas artesanales calientes con hierbas medicinales que alivian tensiones musculares.',
    },
    prices: [{ duration: '', individual: 60 }],
  },
  {
    slug: 'esfoliacao-corporal',
    name: { pt: 'Esfoliação Corporal', en: 'Body Exfoliation', es: 'Exfoliación Corporal' },
    description: {
      pt: 'Remove delicadamente as células mortas, deixando a pele fresca, radiante e revitalizada.',
      en: 'Gently removes dead cells, leaving the skin fresh, radiant and revitalized.',
      es: 'Remueve delicadamente las células muertas, dejando la piel fresca, radiante y revitalizada.',
    },
    prices: [{ duration: '30 min', individual: 130 }],
  },
];

/* ------------------------------------------------------------------ */
/* JORNADAS EXCLUSIVAS — HOTEL VENIT (BARRA)                           */
/* ------------------------------------------------------------------ */

const VENIT_BADGE: LocalizedText = {
  pt: 'Exclusivo Hotel Venit',
  en: 'Hotel Venit exclusive',
  es: 'Exclusivo Hotel Venit',
};

export const venitJornadas: Experience[] = [
  {
    slug: 'five-senses',
    category: 'jornada',
    image: '/images/experiences/venit/five-senses.png',
    exclusive: VENIT_BADGE,
    name: { pt: 'Five Senses', en: 'Five Senses', es: 'Five Senses' },
    subtitle: {
      pt: 'Os cinco sentidos em harmonia.',
      en: 'The five senses in harmony.',
      es: 'Los cinco sentidos en armonía.',
    },
    description: {
      pt: 'Uma introdução completa ao universo Sensória dentro do Hotel Venit. Do welcome drink ao Grounding Ritual com ervas e à massagem relaxante, a jornada culmina em uma experiência gastronômica assinada pelo Matera Restaurant.',
      en: 'A complete introduction to the Sensória universe inside Hotel Venit. From the welcome drink to the Grounding Ritual with herbs and the relaxing massage, the journey culminates in a gastronomic experience by Matera Restaurant.',
      es: 'Una introducción completa al universo Sensória dentro del Hotel Venit. Del welcome drink al Grounding Ritual con hierbas y al masaje relajante, la jornada culmina en una experiencia gastronómica firmada por Matera Restaurant.',
    },
    includes: {
      pt: ['Roupão premium', 'Welcome drink', 'Menu de chás e café especial', 'Grounding Ritual com ervas', 'Massagem relaxante', 'Experiência gastronômica Sensória by Matera Restaurant'],
      en: ['Premium robe', 'Welcome drink', 'Menu of teas and specialty coffee', 'Grounding Ritual with herbs', 'Relaxing massage', 'Sensória gastronomic experience by Matera Restaurant'],
      es: ['Bata premium', 'Welcome drink', 'Menú de tés y café especial', 'Grounding Ritual con hierbas', 'Masaje relajante', 'Experiencia gastronómica Sensória by Matera Restaurant'],
    },
    prices: [{ duration: '90 min', individual: 380 }],
  },
  {
    slug: 'sensorial-journey',
    category: 'jornada',
    image: '/images/experiences/venit/sensorial-journey.png',
    exclusive: VENIT_BADGE,
    name: { pt: 'Sensorial Journey', en: 'Sensorial Journey', es: 'Sensorial Journey' },
    subtitle: {
      pt: 'Uma imersão sensorial a dois ou só sua.',
      en: 'A sensory immersion, together or just yours.',
      es: 'Una inmersión sensorial en pareja o solo tuya.',
    },
    description: {
      pt: 'Uma jornada que aprofunda o cuidado com o corpo e o rosto. Grounding Ritual com sais e ervas, massagem craniofacial com pantalas faciais e massagem relaxante, coroada pela experiência gastronômica by Matera — perfeita para viver a dois.',
      en: 'A journey that deepens care for body and face. Grounding Ritual with salts and herbs, craniofacial massage with facial tools and a relaxing massage, crowned by the Matera gastronomic experience — perfect to share as a couple.',
      es: 'Una jornada que profundiza el cuidado del cuerpo y del rostro. Grounding Ritual con sales y hierbas, masaje craneofacial con pantalas faciales y masaje relajante, coronada por la experiencia gastronómica by Matera — perfecta para vivir en pareja.',
    },
    includes: {
      pt: ['Welcome drink', 'Menu de chás e cafés especiais', 'Grounding Ritual com sais e ervas', 'Massagem craniofacial + pantalas faciais', 'Massagem relaxante', 'Experiência gastronômica Sensória by Matera Restaurant'],
      en: ['Welcome drink', 'Menu of teas and specialty coffees', 'Grounding Ritual with salts and herbs', 'Craniofacial massage + facial tools', 'Relaxing massage', 'Sensória gastronomic experience by Matera Restaurant'],
      es: ['Welcome drink', 'Menú de tés y cafés especiales', 'Grounding Ritual con sales y hierbas', 'Masaje craneofacial + pantalas faciales', 'Masaje relajante', 'Experiencia gastronómica Sensória by Matera Restaurant'],
    },
    prices: [{ duration: '120 min', individual: 490, double: 880 }],
  },
  {
    slug: 'renewal-ritual',
    category: 'jornada',
    image: '/images/experiences/venit/renewal-ritual.png',
    exclusive: VENIT_BADGE,
    name: { pt: 'Renewal Ritual', en: 'Renewal Ritual', es: 'Renewal Ritual' },
    subtitle: {
      pt: 'Renovação profunda de corpo e pele.',
      en: 'Deep renewal of body and skin.',
      es: 'Renovación profunda de cuerpo y piel.',
    },
    description: {
      pt: 'Um ritual de renovação com drenagem e detox. Grounding Ritual com sais e ervas, massagem craniofacial com drenagem facial, massagem relaxante e drenagem corporal e sauna olfativa Detox — finalizado com gastronomia by Matera e espumante premiado na versão em dupla.',
      en: 'A renewal ritual with drainage and detox. Grounding Ritual with salts and herbs, craniofacial massage with facial drainage, relaxing massage and body drainage, and a detox scent sauna — finished with Matera cuisine and award-winning sparkling wine in the couple version.',
      es: 'Un ritual de renovación con drenaje y detox. Grounding Ritual con sales y hierbas, masaje craneofacial con drenaje facial, masaje relajante y drenaje corporal y sauna olfativa Detox — finalizado con gastronomía by Matera y espumante premiado en la versión en pareja.',
    },
    includes: {
      pt: ['Grounding Ritual com sais e ervas', 'Massagem craniofacial + drenagem facial', 'Massagem relaxante e drenagem corporal', 'Sauna olfativa Detox', 'Experiência gastronômica by Matera', 'Espumante premiado (versão Dupla)'],
      en: ['Grounding Ritual with salts and herbs', 'Craniofacial massage + facial drainage', 'Relaxing massage and body drainage', 'Detox scent sauna', 'Matera gastronomic experience', 'Award-winning sparkling wine (Couple version)'],
      es: ['Grounding Ritual con sales y hierbas', 'Masaje craneofacial + drenaje facial', 'Masaje relajante y drenaje corporal', 'Sauna olfativa Detox', 'Experiencia gastronómica by Matera', 'Espumante premiado (versión Pareja)'],
    },
    prices: [{ duration: '150 min', individual: 590, double: 980 }],
  },
  {
    slug: 'body-soul-cleanse',
    category: 'jornada',
    image: '/images/experiences/venit/body-soul-cleanse.png',
    exclusive: VENIT_BADGE,
    name: { pt: 'Body & Soul Cleanse', en: 'Body & Soul Cleanse', es: 'Body & Soul Cleanse' },
    subtitle: {
      pt: 'Purificação completa de corpo e alma.',
      en: 'A complete cleanse of body and soul.',
      es: 'Purificación completa de cuerpo y alma.',
    },
    description: {
      pt: 'A jornada detox mais completa do Hotel Venit. Massagem craniofacial com pantalas e esfoliação facial, reflexologia e esfoliação de pés e mãos, esfoliação Detox corporal com mix de argilas, sauna olfativa Detox com ducha e massagem Detox relaxante — com gastronomia by Matera e espumante premiado na versão em dupla.',
      en: "Hotel Venit's most complete detox journey. Craniofacial massage with tools and facial exfoliation, reflexology and hand and foot exfoliation, body detox exfoliation with a clay mix, detox scent sauna with shower and a relaxing detox massage — with Matera cuisine and award-winning sparkling wine in the couple version.",
      es: 'La jornada detox más completa del Hotel Venit. Masaje craneofacial con pantalas y exfoliación facial, reflexología y exfoliación de pies y manos, exfoliación Detox corporal con mix de arcillas, sauna olfativa Detox con ducha y masaje Detox relajante — con gastronomía by Matera y espumante premiado en la versión en pareja.',
    },
    includes: {
      pt: ['Massagem craniofacial + pantalas faciais + esfoliação facial', 'Reflexologia + esfoliação de pés e mãos', 'Esfoliação Detox corporal com mix de argilas', 'Sauna olfativa Detox + ducha', 'Massagem Detox relaxante', 'Experiência gastronômica by Matera', 'Espumante premiado (versão Dupla)'],
      en: ['Craniofacial massage + facial tools + facial exfoliation', 'Reflexology + hand and foot exfoliation', 'Body detox exfoliation with a clay mix', 'Detox scent sauna + shower', 'Relaxing detox massage', 'Matera gastronomic experience', 'Award-winning sparkling wine (Couple version)'],
      es: ['Masaje craneofacial + pantalas faciales + exfoliación facial', 'Reflexología + exfoliación de pies y manos', 'Exfoliación Detox corporal con mix de arcillas', 'Sauna olfativa Detox + ducha', 'Masaje Detox relajante', 'Experiencia gastronómica by Matera', 'Espumante premiado (versión Pareja)'],
    },
    prices: [{ duration: '180 min', individual: 690, double: 1180 }],
  },
  {
    slug: 'memorial-moments',
    category: 'jornada',
    image: '/images/experiences/venit/memorial-moments.png',
    exclusive: VENIT_BADGE,
    name: { pt: 'Memorial Moments', en: 'Memorial Moments', es: 'Memorial Moments' },
    subtitle: {
      pt: 'Uma diária inesquecível no Hotel Venit Mio.',
      en: 'An unforgettable overnight stay at Hotel Venit Mio.',
      es: 'Una estadía inolvidable en el Hotel Venit Mio.',
    },
    description: {
      pt: 'A experiência mais completa: uma diária no Hotel Venit Mio (check-in 14h / check-out 12h) com breakfast servido na suíte, massagem craniofacial, sauna olfativa relaxante, massagem relaxante, gastronomia by Matera e espumante premiado. Um refúgio de tempo só seu.',
      en: 'The most complete experience: an overnight stay at Hotel Venit Mio (check-in 2pm / check-out 12pm) with breakfast served in the suite, craniofacial massage, relaxing scent sauna, relaxing massage, Matera cuisine and award-winning sparkling wine. A refuge of time just for you.',
      es: 'La experiencia más completa: una estadía en el Hotel Venit Mio (check-in 14h / check-out 12h) con breakfast servido en la suite, masaje craneofacial, sauna olfativa relajante, masaje relajante, gastronomía by Matera y espumante premiado. Un refugio de tiempo solo tuyo.',
    },
    includes: {
      pt: ['Diária no Hotel Venit Mio (check-in 14h / check-out 12h)', 'Breakfast servido na suíte', 'Massagem craniofacial', 'Sauna olfativa relaxante', 'Massagem relaxante', 'Gastronomia by Matera', 'Espumante premiado'],
      en: ['Overnight at Hotel Venit Mio (check-in 2pm / check-out 12pm)', 'Breakfast served in the suite', 'Craniofacial massage', 'Relaxing scent sauna', 'Relaxing massage', 'Matera cuisine', 'Award-winning sparkling wine'],
      es: ['Estadía en el Hotel Venit Mio (check-in 14h / check-out 12h)', 'Breakfast servido en la suite', 'Masaje craneofacial', 'Sauna olfativa relajante', 'Masaje relajante', 'Gastronomía by Matera', 'Espumante premiado'],
    },
    prices: [
      {
        duration: 'Diária',
        value: 1580,
        label: { pt: 'Individual ou Dupla*', en: 'Single or Couple*', es: 'Individual o Pareja*' },
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const allExperiences: Experience[] = [...jornadas, ...venitJornadas, ...terapias];

export function getExperienceBySlug(slug: string): Experience | undefined {
  return allExperiences.find((e) => e.slug === slug);
}

/** Menor preço da experiência (individual ou value), para exibir "a partir de". */
export function getStartingPrice(exp: Experience): number {
  const values = exp.prices
    .map((p) => p.individual ?? p.value)
    .filter((v): v is number => typeof v === 'number');
  return Math.min(...values);
}
