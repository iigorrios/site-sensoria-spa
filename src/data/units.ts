import type { LocalizedText } from './experiences';

export interface UnitHours {
  /** chave de tradução do rótulo do dia (units.*) */
  labelKey: 'weekdays' | 'saturday' | 'sunday' | 'satHoliday' | 'sunHoliday' | 'holiday';
  /** valor exibido; se null usa a tradução "closed" */
  value: string | null;
}

export interface Unit {
  slug: string;
  name: string;
  city: LocalizedText;
  image: string;
  address: string;
  cep: string;
  /** Link do Google Maps (pesquisa pelo endereço). */
  mapsQuery: string;
  hours: UnitHours[];
}

export const units: Unit[] = [
  {
    slug: 'icarai',
    name: 'Icaraí',
    city: { pt: 'Niterói', en: 'Niterói', es: 'Niterói' },
    image: '/images/units/icarai.jpg',
    address: 'Rua General Pereira da Silva, 184, Icaraí, Niterói/RJ',
    cep: '24220-031',
    mapsQuery: 'Rua General Pereira da Silva, 184, Icaraí, Niterói RJ 24220-031',
    hours: [
      { labelKey: 'weekdays', value: '08:00 – 20:00' },
      { labelKey: 'saturday', value: '08:00 – 18:00' },
      { labelKey: 'sunHoliday', value: '08:00 – 16:00' },
    ],
  },
  {
    slug: 'ipanema',
    name: 'Ipanema',
    city: { pt: 'Rio de Janeiro', en: 'Rio de Janeiro', es: 'Río de Janeiro' },
    image: '/images/units/ipanema.jpg',
    address: 'R. Visc. de Pirajá, 365 B — dentro da Academia BodyTech, Ipanema, Rio de Janeiro/RJ',
    cep: '22410-003',
    mapsQuery: 'BodyTech Visconde de Pirajá 365 Ipanema Rio de Janeiro RJ 22410-003',
    hours: [
      { labelKey: 'weekdays', value: '09:00 – 21:00' },
      { labelKey: 'satHoliday', value: '09:00 – 18:00' },
      { labelKey: 'sunday', value: null },
    ],
  },
  {
    slug: 'leblon',
    name: 'Leblon',
    city: { pt: 'Rio de Janeiro', en: 'Rio de Janeiro', es: 'Río de Janeiro' },
    image: '/images/units/leblon.jpg',
    address: 'R. Gen. Urquiza, 102 — Cobertura, dentro da Academia BodyTech, Leblon, Rio de Janeiro/RJ',
    cep: '22431-040',
    mapsQuery: 'BodyTech General Urquiza 102 Leblon Rio de Janeiro RJ',
    hours: [
      { labelKey: 'weekdays', value: '09:00 – 21:00' },
      { labelKey: 'saturday', value: '09:00 – 18:00' },
      { labelKey: 'sunHoliday', value: '09:00 – 14:00' },
    ],
  },
  {
    slug: 'peninsula',
    name: 'Península',
    city: { pt: 'Barra da Tijuca, Rio de Janeiro', en: 'Barra da Tijuca, Rio de Janeiro', es: 'Barra da Tijuca, Río de Janeiro' },
    image: '/images/units/peninsula.jpg',
    address: 'O2 Corporate & Offices — Av. José Silva de Azevedo Neto, 200, bloco 09, dentro da Academia BodyTech, Barra da Tijuca, Rio de Janeiro/RJ',
    cep: '22775-056',
    mapsQuery: 'O2 Corporate Av. José Silva de Azevedo Neto 200 Barra da Tijuca Rio de Janeiro',
    hours: [
      { labelKey: 'weekdays', value: '08:00 – 20:00' },
      { labelKey: 'saturday', value: '08:00 – 14:00' },
      { labelKey: 'sunHoliday', value: null },
    ],
  },
  {
    slug: 'barra-venit',
    name: 'Barra — Hotel Venit',
    city: { pt: 'Barra da Tijuca, Rio de Janeiro', en: 'Barra da Tijuca, Rio de Janeiro', es: 'Barra da Tijuca, Río de Janeiro' },
    image: '/images/units/venit.jpg',
    address: 'Av. Embaixador Abelardo Bueno, 2710 — Rooftop, Barra da Tijuca, Rio de Janeiro/RJ',
    cep: '22775-040',
    mapsQuery: 'Hotel Venit Av. Embaixador Abelardo Bueno 2710 Barra da Tijuca Rio de Janeiro',
    hours: [
      { labelKey: 'weekdays', value: '09:00 – 21:00' },
      { labelKey: 'satHoliday', value: '09:00 – 21:00' },
      { labelKey: 'sunday', value: '09:00 – 21:00' },
    ],
  },
];
