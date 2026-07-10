import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function NotFound() {
  const t = await getTranslations('nav');
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-sensoria-white px-6 text-center">
      <span className="font-display text-7xl tracking-display text-sensoria-green">404</span>
      <p className="max-w-sm text-sensoria-graphite/70">
        Página não encontrada / Page not found / Página no encontrada.
      </p>
      <Link
        href="/"
        className="inline-flex h-11 items-center rounded-full bg-sensoria-green px-6 font-sans text-sm text-sensoria-white"
      >
        {t('home')}
      </Link>
    </div>
  );
}
