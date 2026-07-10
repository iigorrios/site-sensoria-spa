'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/terapias', key: 'terapias' },
  { href: '/jornadas', key: 'jornadas' },
  { href: '/clubes', key: 'clubes' },
  { href: '/experiencias', key: 'experiences' },
  { href: '/unidades', key: 'units' },
  { href: '/sobre', key: 'about' },
  { href: '/faq', key: 'faq' },
  { href: '/contato', key: 'contact' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // No topo da home o header é transparente sobre o hero; após rolar, fica sólido.
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const solid = scrolled || !isHome;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-smooth',
        solid
          ? 'border-b border-sensoria-fog/70 bg-sensoria-white/90 backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <div className="container-editorial flex h-16 items-center justify-between md:h-20">
        <Link href="/" data-cursor="hover" aria-label="Sensória Spa — início" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={solid ? '/images/logo/logo-verde-crop.svg' : '/images/logo/logo-branco-crop.svg'}
            alt="Sensória Spa"
            className="h-8 w-auto md:h-10"
          />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="hover"
                className={cn(
                  'relative font-sans text-sm tracking-wide transition-colors',
                  solid ? 'text-sensoria-graphite/80 hover:text-sensoria-green' : 'text-sensoria-white/90 hover:text-sensoria-white',
                  active && (solid ? 'text-sensoria-green' : 'text-sensoria-white')
                )}
              >
                {t(item.key)}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-current" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <LanguageSwitcher light={!solid} />
          </div>
          <button
            className={cn(
              'lg:hidden',
              solid ? 'text-sensoria-graphite' : 'text-sensoria-white'
            )}
            onClick={() => setMenuOpen(true)}
            aria-label={t('menu')}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-sensoria-green px-6 py-6 lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo/logo-branco-crop.svg" alt="Sensória Spa" className="h-8 w-auto" />
              <button onClick={() => setMenuOpen(false)} aria-label={t('close')} className="text-sensoria-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-6">
              <Link href="/" className="font-display text-3xl text-sensoria-white">
                {t('home')}
              </Link>
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link href={item.href} className="font-display text-3xl text-sensoria-white">
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto">
              <LanguageSwitcher light />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
