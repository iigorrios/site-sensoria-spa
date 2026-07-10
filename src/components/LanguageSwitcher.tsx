'use client';

import { useState, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { Globe, Check } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const locales = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
] as const;

export default function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const change = (next: string) => {
    setOpen(false);
    startTransition(() => {
      // usePathname (next-intl) já retorna a rota resolvida sem o prefixo de idioma.
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor="hover"
        aria-label="Language"
        className={cn(
          'flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-xs uppercase tracking-wide2 transition-colors',
          light
            ? 'text-sensoria-white/90 hover:text-sensoria-white'
            : 'text-sensoria-graphite/80 hover:text-sensoria-graphite',
          isPending && 'opacity-60'
        )}
      >
        <Globe className="h-3.5 w-3.5" />
        {locale}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border border-sensoria-fog bg-sensoria-white py-1 shadow-lg">
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => change(l.code)}
                className="flex w-full items-center justify-between px-4 py-2 text-left font-sans text-sm text-sensoria-graphite hover:bg-sensoria-fog/60"
              >
                {l.label}
                {locale === l.code && <Check className="h-3.5 w-3.5 text-sensoria-green" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
