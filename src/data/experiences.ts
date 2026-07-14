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
      pt: 'Existe um silêncio específico dentro da floresta amazônica — presença de tudo, um cuidado antigo que a vida urbana foi cobrindo aos poucos. Esta jornada, um verdadeiro spa day, leva você até lá sem sair do Rio: pindas aromáticas aquecidas com ervas medicinais deslizam pelo corpo desfazendo tensões, a sinergia de óleos essenciais amazônicos expande o ambiente e a esfoliação com argilas da Amazônia renova a pele. Você entra carregando a semana e sai carregando apenas você.',
      en: 'There is a specific silence inside the Amazon rainforest — the presence of everything, an ancient care that urban life slowly covered over. This journey, a true spa day, takes you there without leaving Rio: warm aromatic poultices with medicinal herbs glide over the body dissolving tension, a synergy of Amazonian essential oils fills the room and exfoliation with Amazonian clays renews the skin. You come in carrying the week and leave carrying only yourself.',
      es: 'Existe un silencio específico dentro de la selva amazónica — la presencia de todo, un cuidado antiguo que la vida urbana fue cubriendo poco a poco. Esta jornada, un verdadero spa day, te lleva allí sin salir de Río: pindas aromáticas calientes con hierbas medicinales se deslizan por el cuerpo deshaciendo tensiones, la sinergia de aceites esenciales amazónicos expande el ambiente y la exfoliación con arcillas de la Amazonía renueva la piel. Entras cargando la semana y sales cargando solo a ti.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás naturais e café especial', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Massagem facial com creme nutritivo', 'Massagem craniofacial', 'Massagem corporal com pindas aromáticas', 'Esfoliação corporal com argilas e óleos amazônicos'],
      en: ['Premium cotton robe', 'Menu of natural teas and specialty coffee', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Facial massage with nourishing cream', 'Craniofacial massage', 'Body massage with aromatic poultices', 'Body exfoliation with Amazonian clays and oils'],
      es: ['Bata de algodón premium', 'Menú de tés naturales y café especial', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Masaje facial con crema nutritiva', 'Masaje craneofacial', 'Masaje corporal con pindas aromáticas', 'Exfoliación corporal con arcillas y aceites amazónicos'],
    },
    prices: [{ duration: '120 min', individual: 348, double: 678 }],
  },
  {
    slug: 'pedra-da-gavea',
    category: 'jornada',
    image: '/images/experiences/jornadas/pedra-da-gavea.jpg',
    name: { pt: 'Pedra da Gávea', en: 'Pedra da Gávea', es: 'Pedra da Gávea' },
    subtitle: {
      pt: 'Força da terra. Calor que transforma.',
      en: 'Strength of the earth. Heat that transforms.',
      es: 'Fuerza de la tierra. Calor que transforma.',
    },
    description: {
      pt: 'A Pedra da Gávea não convida — ela impõe. As pedras vulcânicas de basalto desta jornada carregam essa mesma energia: aquecidas no ponto exato, chegam com um calor que não queima, abraça, percorrendo os músculos em movimentos profundos que desfazem bloqueios e despertam a circulação. As pantalas terapêuticas completam com toques que ativam pontos de energia, enquanto a esfoliação natural devolve luminosidade à pele. Ao final, o menu gastronômico Sensória prolonga esse estado — porque algumas experiências merecem não ter pressa de acabar.',
      en: 'Pedra da Gávea does not invite — it commands. The volcanic basalt stones of this journey carry that same energy: heated to the exact point, they arrive with a warmth that does not burn, it embraces, gliding over the muscles in deep movements that dissolve blockages and awaken circulation. The therapeutic tools complete it with touches that activate energy points, while natural exfoliation returns luminosity to the skin. To finish, the Sensória gastronomic menu prolongs this state — because some experiences deserve not to be rushed.',
      es: 'La Pedra da Gávea no invita — se impone. Las piedras volcánicas de basalto de esta jornada llevan esa misma energía: calentadas en el punto exacto, llegan con un calor que no quema, abraza, recorriendo los músculos en movimientos profundos que deshacen bloqueos y despiertan la circulación. Las pantalas terapéuticas completan con toques que activan puntos de energía, mientras la exfoliación natural devuelve luminosidad a la piel. Al final, el menú gastronómico Sensória prolonga ese estado — porque algunas experiencias merecen no tener prisa por terminar.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás e café especial', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Massagem facial com pantalas', 'Massagem corporal com pedras vulcânicas', 'Esfoliação corporal natural', 'Menu Gastronômico Sensória Spa'],
      en: ['Premium cotton robe', 'Menu of teas and specialty coffee', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Facial massage with therapeutic tools', 'Body massage with volcanic stones', 'Natural body exfoliation', 'Sensória Spa gastronomic menu'],
      es: ['Bata de algodón premium', 'Menú de tés y café especial', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Masaje facial con pantalas', 'Masaje corporal con piedras volcánicas', 'Exfoliación corporal natural', 'Menú Gastronómico Sensória Spa'],
    },
    prices: [{ duration: '120 min', individual: 428, double: 788 }],
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
      pt: 'Tem um momento no fim do dia no Arpoador em que o sol parece parar. Esta jornada foi criada para ser esse momento — para você, ou para vocês dois. Começa pelos pés, com a esfoliação e a hidratação do Spa dos Pés, e segue com as velas artesanais Sensória, que se transformam em óleo morno em movimentos contínuos e sem pressa. Noventa minutos em que o mundo lá fora pode esperar.',
      en: 'There is a moment at the end of the day in Arpoador when the sun seems to stop. This journey was created to be that moment — for you, or for the two of you. It begins at the feet, with the exfoliation and hydration of the Foot Spa, and continues with the artisanal Sensória candles that melt into warm oil in continuous, unhurried movements. Ninety minutes in which the world outside can wait.',
      es: 'Hay un momento al final del día en Arpoador en que el sol parece detenerse. Esta jornada fue creada para ser ese momento — para ti, o para los dos. Comienza por los pies, con la exfoliación y la hidratación del Spa de Pies, y sigue con las velas artesanales Sensória, que se transforman en aceite tibio en movimientos continuos y sin prisa. Noventa minutos en que el mundo afuera puede esperar.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás e café especial', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Spa dos pés com esfoliação e hidratação', 'Massagem corporal com velas artesanais'],
      en: ['Premium cotton robe', 'Menu of teas and specialty coffee', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Foot spa with exfoliation and hydration', 'Body massage with artisanal candles'],
      es: ['Bata de algodón premium', 'Menú de tés y café especial', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Spa de pies con exfoliación e hidratación', 'Masaje corporal con velas artesanales'],
    },
    prices: [{ duration: '90 min', individual: 298, double: 598 }],
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
      pt: 'Quem já subiu o Pão de Açúcar sabe: não é só a vista, é o que a vista faz com você. Esta jornada provoca exatamente isso, sem sair do lugar. As pantalas faciais estimulam, tonificam e iluminam a pele; a massagem craniofacial libera o que a semana comprimiu nas têmporas e na nuca; e as pantalas corporais moldam e ativam cada curva do corpo. Você não está sendo transformada — está sendo revelada.',
      en: 'Anyone who has climbed Sugarloaf knows: it is not just the view, it is what the view does to you. This journey provokes exactly that, without leaving the spot. Facial tools stimulate, tone and brighten the skin; the craniofacial massage releases what the week compressed in the temples and neck; and the body tools shape and activate every curve. You are not being transformed — you are being revealed.',
      es: 'Quien ya subió el Pan de Azúcar lo sabe: no es solo la vista, es lo que la vista hace contigo. Esta jornada provoca exactamente eso, sin salir del lugar. Las pantalas faciales estimulan, tonifican e iluminan la piel; el masaje craneofacial libera lo que la semana comprimió en las sienes y la nuca; y las pantalas corporales moldean y activan cada curva. No estás siendo transformada — estás siendo revelada.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás e cafés especiais', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Massagem craniofacial', 'Massagem facial com pantalas', 'Massagem modeladora corporal com pantalas'],
      en: ['Premium cotton robe', 'Menu of teas and specialty coffees', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Craniofacial massage', 'Facial massage with tools', 'Body sculpting massage with tools'],
      es: ['Bata de algodón premium', 'Menú de tés y cafés especiales', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Masaje craneofacial', 'Masaje facial con pantalas', 'Masaje modelador corporal con pantalas'],
    },
    prices: [{ duration: '90 min', individual: 290, double: 580 }],
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
      pt: 'O Parque Lage tem um dom: no meio do Rio que nunca para, ele simplesmente para. Esta jornada carrega o mesmo dom. A reflexologia nos pés desbloqueia pontos de energia acumulados em silêncio e a massagem relaxante com sinergia de lavanda dissolve o cansaço do dia, da semana, do mês. Ao final, uma taça de espumante premiado e um mix de nuts selecionados — não como encerramento, mas como celebração de você ter escolhido estar aqui.',
      en: 'Parque Lage has a gift: in the middle of a Rio that never stops, it simply stops. This journey carries the same gift. Foot reflexology unblocks energy points accumulated in silence and the relaxing massage with a lavender synergy dissolves the fatigue of the day, the week, the month. To finish, a glass of award-winning sparkling wine and a mix of selected nuts — not as an ending, but as a celebration of your choosing to be here.',
      es: 'El Parque Lage tiene un don: en medio del Río que nunca para, él simplemente para. Esta jornada lleva el mismo don. La reflexología en los pies desbloquea puntos de energía acumulados en silencio y el masaje relajante con sinergia de lavanda disuelve el cansancio del día, de la semana, del mes. Al final, una copa de espumante premiado y un mix de nueces seleccionadas — no como cierre, sino como celebración de haber elegido estar aquí.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás e café especial', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Reflexologia nos pés', 'Massagem corporal relaxante com sinergia exclusiva', 'Degustação com espumante premiado e mix de nuts'],
      en: ['Premium cotton robe', 'Menu of teas and specialty coffee', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Foot reflexology', 'Relaxing body massage with exclusive synergy', 'Tasting with award-winning sparkling wine and nuts'],
      es: ['Bata de algodón premium', 'Menú de tés y café especial', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Reflexología en los pies', 'Masaje corporal relajante con sinergia exclusiva', 'Degustación con espumante premiado y mix de nueces'],
    },
    prices: [{ duration: '105 min', individual: 398, double: 798 }],
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
      pt: 'A Prainha não é para todo mundo — e é isso que a torna especial. Esta jornada provoca aquela rendição de quem chega exatamente onde precisava estar, sem estrada nem espera. A massagem ultra relaxante conduz o corpo a um estado de fluidez raro, a esfoliação natural desperta a pele e o banho de imersão com óleos essenciais e ativos botânicos envolve cada centímetro em calor e aroma. Ao final, um menu petit e espumante premiado — a confirmação de que cuidar de você nunca deveria ser o último item da lista.',
      en: 'Prainha is not for everyone — and that is exactly what makes it special. This journey brings that surrender of arriving exactly where you needed to be, with no road and no waiting. The ultra-relaxing massage leads the body to a rare state of flow, natural exfoliation awakens the skin and the immersion bath with essential oils and botanical actives wraps every inch in warmth and aroma. To finish, a petit menu and award-winning sparkling wine — the confirmation that caring for yourself should never be the last item on the list.',
      es: 'Prainha no es para todo el mundo — y eso es exactamente lo que la hace especial. Esta jornada provoca esa rendición de quien llega exactamente donde necesitaba estar, sin carretera ni espera. El masaje ultra relajante conduce el cuerpo a un estado de fluidez raro, la exfoliación natural despierta la piel y el baño de inmersión con aceites esenciales y activos botánicos envuelve cada centímetro en calor y aroma. Al final, un menú petit y espumante premiado — la confirmación de que cuidarte nunca debería ser el último ítem de la lista.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás e café especial', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Esfoliação corporal natural', 'Banho de imersão revigorante', 'Massagem ultra relaxante', 'Menu petit com espumante premiado'],
      en: ['Premium cotton robe', 'Menu of teas and specialty coffee', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Natural body exfoliation', 'Invigorating immersion bath', 'Ultra-relaxing massage', 'Petit menu with award-winning sparkling wine'],
      es: ['Bata de algodón premium', 'Menú de tés y café especial', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Exfoliación corporal natural', 'Baño de inmersión revitalizante', 'Masaje ultra relajante', 'Menú petit con espumante premiado'],
    },
    prices: [{ duration: '120 min', individual: 498, double: 988 }],
  },
  {
    slug: 'corcovado',
    category: 'jornada',
    image: '/images/experiences/jornadas/corcovado.jpg',
    name: { pt: 'Corcovado', en: 'Corcovado', es: 'Corcovado' },
    subtitle: {
      pt: 'A jornada de quem escolhe chegar ao topo de si mesma.',
      en: 'The journey of those who choose to reach the top of themselves.',
      es: 'La jornada de quien elige llegar a la cima de sí misma.',
    },
    description: {
      pt: 'A jornada mais alta do Sensória Spa — quatro horas inteiras e transformadoras. O Grounding Ritual inicia a subida; a esfoliação corporal e facial e a massagem craniofacial removem o que você não precisa mais carregar; mãos e pés recebem tratamentos restauradores; um mix de três técnicas de massagem percorre o corpo e o banho de imersão completa a ascensão. Ao final, uma taça de espumante premiado e o Menu Gastronômico Sensória — entrada, prato principal e sobremesa com ingredientes naturais e brasileiros. Quem chega ao topo do Corcovado não desce a mesma pessoa. Esta jornada, também não.',
      en: "Sensória Spa's highest journey — four full, transformative hours. The Grounding Ritual begins the climb; body and facial exfoliation and the craniofacial massage remove what you no longer need to carry; hands and feet receive restorative treatments; a mix of three massage techniques travels the body and the immersion bath completes the ascent. To finish, a glass of award-winning sparkling wine and the Sensória Gastronomic Menu — starter, main course and dessert with natural, Brazilian ingredients. Those who reach the top of Corcovado do not come down the same person. Neither does this journey.",
      es: 'La jornada más alta del Sensória Spa — cuatro horas enteras y transformadoras. El Grounding Ritual inicia la subida; la exfoliación corporal y facial y el masaje craneofacial retiran lo que ya no necesitas cargar; manos y pies reciben tratamientos restauradores; un mix de tres técnicas de masaje recorre el cuerpo y el baño de inmersión completa la ascensión. Al final, una copa de espumante premiado y el Menú Gastronómico Sensória — entrada, plato principal y postre con ingredientes naturales y brasileños. Quien llega a la cima del Corcovado no baja la misma persona. Esta jornada, tampoco.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás e café especial', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Esfoliação corporal e facial', 'Massagem craniofacial', 'Spa dos Pés ultra hidratante', 'Spa das Mãos restaurador', 'Mix de 3 massagens selecionadas', 'Banho de imersão com ativos naturais', 'Menu petit com espumante premiado'],
      en: ['Premium cotton robe', 'Menu of teas and specialty coffee', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Body and facial exfoliation', 'Craniofacial massage', 'Ultra-hydrating foot spa', 'Restorative hand spa', 'Mix of 3 selected massages', 'Immersion bath with natural actives', 'Petit menu with award-winning sparkling wine'],
      es: ['Bata de algodón premium', 'Menú de tés y café especial', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Exfoliación corporal y facial', 'Masaje craneofacial', 'Spa de Pies ultra hidratante', 'Spa de Manos restaurador', 'Mix de 3 masajes seleccionados', 'Baño de inmersión con activos naturales', 'Menú petit con espumante premiado'],
    },
    prices: [{ duration: '4h', individual: 898, double: 1580 }],
  },
  {
    slug: 'floresta-da-tijuca',
    category: 'jornada',
    image: '/images/experiences/jornadas/floresta-da-tijuca.jpg',
    name: { pt: 'Floresta da Tijuca', en: 'Floresta da Tijuca', es: 'Floresta da Tijuca' },
    subtitle: {
      pt: 'O ritual de quem escolhe respirar fundo dentro da própria cidade.',
      en: 'The ritual of those who choose to breathe deeply within their own city.',
      es: 'El ritual de quien elige respirar hondo dentro de su propia ciudad.',
    },
    description: {
      pt: 'A maior floresta urbana do planeta fica a minutos de você — e esta jornada detox traz ela até a sua pele. O Grounding Ritual com sais de Epsom inicia a soltura, camada por camada; a esfoliação e a reflexologia nos pés reativam a circulação; a argila verde aquecida envolve, estimula e drena; e a massagem detox com óleos essenciais vai fundo nos músculos e no fluxo. A esfoliação corporal renova o que estava opaco e um suco funcional encerra o ritual. Você entra carregando o Rio e sai carregando apenas você.',
      en: 'The largest urban forest on the planet is minutes away from you — and this detox journey brings it to your skin. The Grounding Ritual with Epsom salts begins the release, layer by layer; exfoliation and foot reflexology reactivate circulation; the warm green clay envelops, stimulates and drains; and the detox massage with essential oils goes deep into the muscles and the flow. Body exfoliation renews what had gone dull and a functional juice closes the ritual. You come in carrying Rio and leave carrying only yourself.',
      es: 'La mayor floresta urbana del planeta está a minutos de ti — y esta jornada detox la trae hasta tu piel. El Grounding Ritual con sales de Epsom inicia la soltura, capa por capa; la exfoliación y la reflexología en los pies reactivan la circulación; la arcilla verde caliente envuelve, estimula y drena; y el masaje detox con aceites esenciales va hondo en los músculos y el flujo. La exfoliación corporal renueva lo que estaba opaco y un jugo funcional cierra el ritual. Entras cargando Río y sales cargando solo a ti.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Menu de chás e cafés especiais', 'Ambiente aromatizado e sonorizado', 'Grounding Ritual', 'Reflexologia e esfoliação nos pés', 'Termolipo com argila verde detox', 'Esfoliação natural corporal', 'Massagem corporal detox', 'Suco detox'],
      en: ['Premium cotton robe', 'Menu of teas and specialty coffees', 'Aromatized and sound-designed space', 'Grounding Ritual', 'Foot reflexology and exfoliation', 'Thermolipo with detox green clay', 'Natural body exfoliation', 'Detox body massage', 'Detox juice'],
      es: ['Bata de algodón premium', 'Menú de tés y cafés especiales', 'Ambiente aromatizado y sonorizado', 'Grounding Ritual', 'Reflexología y exfoliación en los pies', 'Termolipo con arcilla verde detox', 'Exfoliación natural corporal', 'Masaje corporal detox', 'Jugo detox'],
    },
    prices: [{ duration: '120 min', individual: 398, double: 698 }],
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
      pt: 'Existe uma idade em que o mundo ainda é mágico — e existe alguém pequeno na sua vida que ainda a vive. Esta jornada foi criada para o momento em que esses dois mundos se encontram. Enquanto você mergulha no seu ritual de cuidado — Grounding Ritual, máscara facial de argila e massagem relaxante —, os pequenos embarcam numa aventura lúdica: massagem com pedras que parecem saídas de um conto, máscara mágica de argila branca e esfoliação nos pés. No final, mini chocolates, suco e o mimo Sensória. Porque o melhor cuidado é aquele que a gente divide com quem faz a vida ter graça.',
      en: 'There is an age when the world is still magical — and there is someone small in your life who still lives it. This journey was created for the moment when these two worlds meet. While you dive into your own care ritual — Grounding Ritual, facial clay mask and relaxing massage —, the little ones set off on a playful adventure: massage with stones that seem straight out of a storybook, a magic white-clay mask and foot exfoliation. In the end, mini chocolates, juice and the Sensória treat. Because the best care is the one we share with those who make life delightful.',
      es: 'Existe una edad en que el mundo todavía es mágico — y existe alguien pequeño en tu vida que aún la vive. Esta jornada fue creada para el momento en que esos dos mundos se encuentran. Mientras te sumerges en tu propio ritual de cuidado — Grounding Ritual, mascarilla facial de arcilla y masaje relajante —, los pequeños embarcan en una aventura lúdica: masaje con piedras que parecen salidas de un cuento, mascarilla mágica de arcilla blanca y exfoliación en los pies. Al final, mini chocolates, jugo y el mimo Sensória. Porque el mejor cuidado es el que compartimos con quien hace que la vida tenga gracia.',
    },
    includes: {
      pt: ['Para os pequenos: ambiente lúdico, roupão fantástico, Grounding Ritual, massagem com pedras, máscara de argila mágica, mini chocolates e suco', 'Para os responsáveis: roupão premium, Grounding Ritual, máscara facial de argila, massagem relaxante, mimo Sensória'],
      en: ['For the little ones: playful space, fantasy robe, Grounding Ritual, stone massage, magic clay mask, mini chocolates and juice', 'For guardians: premium robe, Grounding Ritual, facial clay mask, relaxing massage, Sensória treat'],
      es: ['Para los pequeños: ambiente lúdico, bata fantástica, Grounding Ritual, masaje con piedras, mascarilla de arcilla mágica, mini chocolates y jugo', 'Para los responsables: bata premium, Grounding Ritual, mascarilla facial de arcilla, masaje relajante, mimo Sensória'],
    },
    prices: [
      { duration: '60 min', value: 398, label: { pt: 'Dupla s/ banho', en: 'Couple without bath', es: 'Pareja sin baño' } },
      { duration: '90 min', value: 498, label: { pt: 'Dupla c/ banho', en: 'Couple with bath', es: 'Pareja con baño' } },
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
      pt: 'Tem uma pergunta que pouquíssimas pessoas param para fazer: o que eu vou fazer por mim hoje? Esta jornada existe para responder a ela. Começa com o Grounding Ritual e a presença voltando para dentro; a massagem craniofacial libera as tensões invisíveis; a reflexologia podal reequilibra o organismo; e a massagem relaxante com drenagem dissolve o cansaço e devolve leveza. Ao final, o brunch exclusivo Sensória e um mimo especial. Há diferença entre comemorar e celebrar — e você não precisa de um motivo especial para estar aqui. Você já é o motivo.',
      en: 'There is a question very few people stop to ask: what am I going to do for myself today? This journey exists to answer it. It begins with the Grounding Ritual and presence returning inward; the craniofacial massage releases invisible tension; foot reflexology rebalances the body; and the relaxing massage with drainage dissolves fatigue and restores lightness. To finish, the exclusive Sensória brunch and a special treat. There is a difference between commemorating and celebrating — and you do not need a special reason to be here. You are already the reason.',
      es: 'Hay una pregunta que muy pocas personas se detienen a hacer: ¿qué voy a hacer por mí hoy? Esta jornada existe para responderla. Comienza con el Grounding Ritual y la presencia volviendo hacia adentro; el masaje craneofacial libera las tensiones invisibles; la reflexología podal reequilibra el organismo; y el masaje relajante con drenaje disuelve el cansancio y devuelve ligereza. Al final, el brunch exclusivo Sensória y un mimo especial. Hay diferencia entre conmemorar y celebrar — y no necesitas un motivo especial para estar aquí. Tú ya eres el motivo.',
    },
    includes: {
      pt: ['Roupão em algodão premium', 'Grounding Ritual', 'Massagem craniofacial', 'Reflexologia podal', 'Massagem relaxante com drenagem', 'Brunch exclusivo com chás e café especial', 'Mimo exclusivo Sensória'],
      en: ['Premium cotton robe', 'Grounding Ritual', 'Craniofacial massage', 'Foot reflexology', 'Relaxing massage with drainage', 'Exclusive brunch with teas and specialty coffee', 'Exclusive Sensória treat'],
      es: ['Bata de algodón premium', 'Grounding Ritual', 'Masaje craneofacial', 'Reflexología podal', 'Masaje relajante con drenaje', 'Brunch exclusivo con tés y café especial', 'Mimo exclusivo Sensória'],
    },
    prices: [
      { duration: '90 min', value: 498, label: { pt: 'Individual', en: 'Individual', es: 'Individual' } },
      { duration: '90 min', value: 798, label: { pt: 'Dupla (sala individual)', en: 'Couple (single room)', es: 'Pareja (sala individual)' } },
      { duration: '120 min', value: 868, label: { pt: 'Dupla (sala dupla)', en: 'Couple (double room)', es: 'Pareja (sala doble)' } },
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
      pt: 'Como uma brisa em um jardim sereno, movimentos ritmados e precisos acalmam a mente e relaxam os músculos. Uma pausa revigorante que melhora a qualidade do sono e renova as energias. A Brisa é a nossa massagem relaxante.',
      en: 'Like a breeze in a serene garden, rhythmic, precise movements calm the mind and relax the muscles. A revitalizing pause that improves sleep quality and renews your energy. Brisa is our signature relaxing massage.',
      es: 'Como una brisa en un jardín sereno, movimientos rítmicos y precisos calman la mente y relajan los músculos. Una pausa revitalizante que mejora la calidad del sueño y renueva las energías. Brisa es nuestro masaje relajante.',
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
      pt: 'Uma jornada pelos rios internos do corpo. Manobras suaves desobstruem os canais linfáticos, liberando toxinas e resíduos acumulados, com uma sinergia que nutre a pele e promove leveza duradoura. A Flow é a nossa drenagem linfática.',
      en: 'A journey through the body’s inner rivers. Gentle maneuvers unblock the lymphatic channels, releasing accumulated toxins, with a synergy that nourishes the skin and brings lasting lightness. Flow is our lymphatic drainage massage.',
      es: 'Una jornada por los ríos internos del cuerpo. Maniobras suaves desobstruyen los canales linfáticos, liberando toxinas acumuladas, con una sinergia que nutre la piel y promueve ligereza duradera. Flow es nuestro drenaje linfático.',
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
      pt: 'Cada pedra quente de basalto é um raio de sol sobre a pele. Colocadas ao longo dos pontos de energia e combinadas a movimentos suaves, dissolvem os nós musculares e restauram o equilíbrio interno. O Toque Vulcânico é a nossa massagem com pedras quentes.',
      en: 'Each hot basalt stone is a ray of sun on the skin. Placed along the energy points and combined with gentle movements, they dissolve muscle knots and restore inner balance. Volcanic Touch is our hot stone massage.',
      es: 'Cada piedra caliente de basalto es un rayo de sol sobre la piel. Colocadas a lo largo de los puntos de energía y combinadas con movimientos suaves, disuelven los nudos musculares y restauran el equilibrio interno. El Toque Volcánico es nuestro masaje con piedras calientes.',
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
      pt: 'Em um santuário de tranquilidade, a vela morna escorre sobre o corpo enquanto raios dourados dançam ao seu redor. Uma experiência única feita com cera de babaçu e blend de óleos essenciais e vegetais. A Lumina é a nossa massagem com velas.',
      en: 'In a sanctuary of tranquility, the warm candle flows over the body while golden light dances around you. A unique experience made with babassu wax and a blend of essential and vegetable oils. Lumina is our candle massage.',
      es: 'En un santuario de tranquilidad, la vela tibia se desliza sobre el cuerpo mientras rayos dorados danzan a tu alrededor. Una experiencia única hecha con cera de babasú y blend de aceites esenciales y vegetales. Lumina es nuestro masaje con velas.',
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
      pt: 'Uma jornada pelas profundezas dos tecidos fasciais. Como arqueólogos do corpo, os terapeutas exploram nódulos e pontos de tensão, liberando as amarras que aprisionam a vitalidade e devolvendo liberdade de movimento. A Trama é a nossa liberação miofascial.',
      en: 'A journey into the depths of the fascial tissues. Like archaeologists of the body, therapists explore knots and tension points, releasing the bonds that trap vitality and restoring freedom of movement. Trama is our myofascial release.',
      es: 'Una jornada por las profundidades de los tejidos fasciales. Como arqueólogos del cuerpo, los terapeutas exploran nódulos y puntos de tensión, liberando las ataduras que aprisionan la vitalidad y devolviendo libertad de movimiento. Trama es nuestra liberación miofascial.',
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
      pt: 'Assim como a natureza encontra equilíbrio no fluxo do vento, os corpos atléticos buscam harmonia entre esforço e descanso. Toques firmes permitem que os músculos respirem, liberando tensão e criando espaço para a verdadeira restauração muscular. O Sopro Restaurador é a nossa massagem desportiva (deep tissue).',
      en: 'Just as nature finds balance in the flow of the wind, athletic bodies seek harmony between effort and rest. Firm touches let the muscles breathe, releasing tension and creating room for true muscle restoration. Restorative Breath is our sports (deep tissue) massage.',
      es: 'Así como la naturaleza encuentra equilibrio en el flujo del viento, los cuerpos atléticos buscan armonía entre esfuerzo y descanso. Toques firmes permiten que los músculos respiren, liberando tensión y creando espacio para la verdadera restauración muscular. El Soplo Restaurador es nuestro masaje deportivo (deep tissue).',
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
      pt: 'Uma celebração das formas naturais do corpo. Cada toque é uma reverência às curvas que nos tornam únicos, uma onda de amor-próprio que realça a beleza natural e promove equilíbrio interior e exterior. A Curva é a nossa massagem modeladora.',
      en: 'A celebration of the body’s natural shapes. Each touch honors the curves that make us unique, a wave of self-love that enhances natural beauty and brings inner and outer balance. Curva is our sculpting massage.',
      es: 'Una celebración de las formas naturales del cuerpo. Cada toque es una reverencia a las curvas que nos hacen únicos, una ola de amor propio que realza la belleza natural y promueve equilibrio interior y exterior. Curva es nuestro masaje modelador.',
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
      pt: 'Como caminhar descalço à beira-mar. Com produtos naturais, uma esfoliação remove as células mortas e a reflexologia podal promove bem-estar em todo o corpo, deixando os pés macios e sedosos.',
      en: 'Like walking barefoot by the sea. With natural products, an exfoliation removes dead cells and foot reflexology promotes whole-body well-being, leaving the feet soft and silky.',
      es: 'Como caminar descalzo a la orilla del mar. Con productos naturales, una exfoliación remueve las células muertas y la reflexología podal promueve bienestar en todo el cuerpo, dejando los pies suaves y sedosos.',
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
