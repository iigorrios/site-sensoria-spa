/**
 * Normaliza um telefone brasileiro para o formato internacional só-dígitos
 * (ex.: "(21) 97147-6446" → "5521971476446"), pronto para links do WhatsApp
 * (wa.me/<numero>) e para o campo PHONE do Kommo.
 *
 * Regras:
 *  - Extrai apenas dígitos.
 *  - Se já vier com DDI 55 (12–13 dígitos começando por 55), mantém.
 *  - Se vier só com DDD + número (10–11 dígitos), prefixa "55".
 *  - Caso contrário (muito curto/estranho), devolve os dígitos como estão.
 *  - Sem dígitos → string vazia.
 */
export function normalizePhoneBR(tel?: string | null): string {
  if (!tel) return '';
  const digits = tel.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('55') && (digits.length === 12 || digits.length === 13)) {
    return digits;
  }
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }
  return digits;
}
