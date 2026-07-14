import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

/**
 * Autenticação do painel /admin — senha única + cookie httpOnly assinado (HMAC).
 * Sem dependências externas: usa node:crypto.
 *
 * Env (server-only — NUNCA prefixar com NEXT_PUBLIC_):
 *   ADMIN_PASSWORD        senha de acesso ao painel
 *   ADMIN_SESSION_SECRET  segredo aleatório longo p/ assinar o cookie
 */

export const ADMIN_COOKIE = 'sensoria_admin';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias (segundos)

function getSecret(): string | undefined {
  return process.env.ADMIN_SESSION_SECRET;
}

/** Compara a senha informada com ADMIN_PASSWORD de forma timing-safe. */
export function checkPassword(pw?: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !pw) return false;
  const a = Buffer.from(pw);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function sign(payload: string): string {
  const secret = getSecret();
  if (!secret) return '';
  return createHmac('sha256', secret).update(payload).digest('hex');
}

/** Gera o token de sessão "<exp>.<hmac(exp)>" (exp = epoch em segundos). */
export function createSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = String(exp);
  return `${payload}.${sign(payload)}`;
}

/** Valida o token: assinatura correta e não expirado. */
export function verifySessionToken(token?: string): boolean {
  if (!token || !getSecret()) return false;
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(payload);
  if (!expected || sig.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const exp = Number(payload);
  if (!Number.isFinite(exp)) return false;
  return exp > Math.floor(Date.now() / 1000);
}

/** Lê o cookie de sessão do request atual e diz se está autenticado. */
export function isAuthenticated(): boolean {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return verifySessionToken(token);
}
