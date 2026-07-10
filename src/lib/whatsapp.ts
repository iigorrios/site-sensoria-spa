import { siteConfig } from '@/config/site';

/**
 * Monta um link do WhatsApp com mensagem pré-preenchida.
 * TODO (usuário): configurar siteConfig.whatsapp com o número real.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  general: {
    pt: 'Olá! Gostaria de agendar uma experiência no Sensória Spa.',
    en: 'Hello! I would like to book an experience at Sensória Spa.',
    es: '¡Hola! Me gustaría reservar una experiencia en Sensória Spa.',
  },
  experience: (name: string, locale: string) => {
    const map: Record<string, string> = {
      pt: `Olá! Tenho interesse na experiência "${name}" do Sensória Spa.`,
      en: `Hello! I'm interested in the "${name}" experience at Sensória Spa.`,
      es: `¡Hola! Me interesa la experiencia "${name}" del Sensória Spa.`,
    };
    return map[locale] ?? map.pt;
  },
  unit: (name: string, locale: string) => {
    const map: Record<string, string> = {
      pt: `Olá! Gostaria de agendar na unidade ${name} do Sensória Spa.`,
      en: `Hello! I'd like to book at the ${name} location of Sensória Spa.`,
      es: `¡Hola! Me gustaría reservar en la sede ${name} del Sensória Spa.`,
    };
    return map[locale] ?? map.pt;
  },
  /**
   * Mensagem montada a partir do formulário de captação (redireciona para o
   * WhatsApp já com nome, experiência/categoria e unidade de interesse).
   */
  lead: (
    data: { nome?: string; experiencia?: string; unidade?: string; categoria?: string },
    locale: string
  ) => {
    const intro: Record<string, string> = {
      pt: 'Olá! Acabei de preencher o formulário no site do Sensória Spa.',
      en: 'Hello! I just filled out the form on the Sensória Spa website.',
      es: '¡Hola! Acabo de completar el formulario en el sitio de Sensória Spa.',
    };
    const nameLine: Record<string, (n: string) => string> = {
      pt: (n) => `Meu nome é ${n}.`,
      en: (n) => `My name is ${n}.`,
      es: (n) => `Mi nombre es ${n}.`,
    };
    const interestLabel: Record<string, string> = {
      pt: 'Tenho interesse em',
      en: "I'm interested in",
      es: 'Me interesa',
    };
    const categoryName: Record<'terapia' | 'jornada', Record<string, string>> = {
      terapia: { pt: 'uma Terapia Corporal', en: 'a Body Therapy', es: 'una Terapia Corporal' },
      jornada: { pt: 'uma Jornada Sensorial', en: 'a Sensory Journey', es: 'una Jornada Sensorial' },
    };
    const unitLabel: Record<string, string> = {
      pt: 'Unidade de preferência:',
      en: 'Preferred location:',
      es: 'Sede de preferencia:',
    };

    const lc = (m: Record<string, string>) => m[locale] ?? m.pt;
    const lines: string[] = [lc(intro)];
    if (data.nome) lines.push((nameLine[locale] ?? nameLine.pt)(data.nome));

    const interest = data.experiencia
      ? `"${data.experiencia}"`
      : data.categoria === 'terapia' || data.categoria === 'jornada'
        ? lc(categoryName[data.categoria])
        : '';
    if (interest) lines.push(`${lc(interestLabel)} ${interest}.`);
    if (data.unidade) lines.push(`${lc(unitLabel)} ${data.unidade}.`);

    return lines.join('\n');
  },
  category: (category: 'terapia' | 'jornada', locale: string) => {
    const map: Record<'terapia' | 'jornada', Record<string, string>> = {
      terapia: {
        pt: 'Olá! Gostaria de agendar uma Terapia Corporal no Sensória Spa.',
        en: 'Hello! I would like to book a Body Therapy at Sensória Spa.',
        es: '¡Hola! Me gustaría reservar una Terapia Corporal en Sensória Spa.',
      },
      jornada: {
        pt: 'Olá! Gostaria de reservar uma Jornada Sensorial no Sensória Spa.',
        en: 'Hello! I would like to reserve a Sensory Journey at Sensória Spa.',
        es: '¡Hola! Me gustaría reservar una Jornada Sensorial en Sensória Spa.',
      },
    };
    return map[category][locale] ?? map[category].pt;
  },
};
