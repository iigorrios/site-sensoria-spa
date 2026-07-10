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
