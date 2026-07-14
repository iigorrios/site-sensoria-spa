/**
 * Estrutura de uma linha de lead na tabela `contact_submissions` (Supabase).
 * Tipa o retorno do select do painel admin e as props do dashboard.
 */
export interface LeadRow {
  id: string;
  created_at: string;
  nome: string;
  email: string;
  telefone: string | null;
  unidade: string | null;
  experiencia: string | null;
  categoria: string | null;
  mensagem: string | null;
  origem: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
  referrer: string | null;
  landing_page: string | null;
}
