import { z } from 'zod';

const optStr = (max: number) => z.string().max(max).optional().or(z.literal(''));

export const contactSchema = z.object({
  // Campos do formulário
  nome: z.string().min(2).max(120),
  email: z.string().email().max(160),
  telefone: optStr(40),
  unidade: optStr(80),
  experiencia: optStr(120),
  categoria: optStr(20), // 'terapia' | 'jornada' | ''
  mensagem: optStr(2000), // opcional (LPs não exigem)

  // Atribuição / campanha
  utm_source: optStr(200),
  utm_medium: optStr(200),
  utm_campaign: optStr(200),
  utm_content: optStr(200),
  utm_term: optStr(200),
  gclid: optStr(300),
  fbclid: optStr(300),
  referrer: optStr(500),
  landing_page: optStr(500),
  origem: optStr(60),

  // Meta / deduplicação
  fbp: optStr(200),
  fbc: optStr(300),
  event_id: optStr(120),

  // Honeypot anti-spam: precisa vir vazio.
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
