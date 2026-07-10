import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LeafAccent from '@/components/ui/LeafAccent';
import SocialLinks from '@/components/ui/SocialLinks';
import { siteConfig } from '@/config/site';
import { units } from '@/data/units';

const navItems = [
  { href: '/experiencias', key: 'experiences' },
  { href: '/unidades', key: 'units' },
  { href: '/sobre', key: 'about' },
  { href: '/faq', key: 'faq' },
  { href: '/contato', key: 'contact' },
] as const;

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sensoria-green text-sensoria-white">
      <div className="container-editorial py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo/logo-branco-crop.svg" alt="Sensória Spa" className="h-12 w-auto md:h-14" />
            <p className="mt-2 font-sans text-sm italic text-sensoria-fog">
              {t('footer.tagline')}
            </p>
            <LeafAccent className="mt-6 w-28 text-sensoria-cream/70" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-sensoria-white/70">
              {t('footer.madeWith')}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-sans text-xs uppercase tracking-wide3 text-sensoria-cream">
              {t('footer.nav')}
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-cursor="hover"
                    className="text-sm text-sensoria-white/80 transition-colors hover:text-sensoria-white"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-sans text-xs uppercase tracking-wide3 text-sensoria-cream">
              {t('footer.unitsTitle')}
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {units.map((u) => (
                <li key={u.slug} className="text-sm text-sensoria-white/80">
                  {u.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-sans text-xs uppercase tracking-wide3 text-sensoria-cream">
              {t('footer.followTitle')}
            </h3>
            <SocialLinks className="mt-5 flex-wrap text-sensoria-white/80" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-sensoria-white/60 md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {siteConfig.name}. {t('footer.rights')}
          </span>
          <span>{siteConfig.instagramHandle} · Rio de Janeiro · Niterói</span>
        </div>
      </div>
    </footer>
  );
}
