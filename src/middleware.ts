import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Aplica a todas as rotas, exceto API, /links (árvore de links standalone,
  // fora da i18n), estáticos e arquivos com extensão.
  matcher: ['/((?!api|links|_next|_vercel|.*\\..*).*)'],
};
