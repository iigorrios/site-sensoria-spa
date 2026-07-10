import { ArrowUpRight, ShoppingBag } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { socialItems } from '@/components/ui/SocialLinks';

/** Acrescenta UTMs de link-in-bio para a atribuição fluir nos formulários. */
function withUtm(url: string): string {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=linktree&utm_medium=bio`;
}

const primaryLinks = [
  { label: 'Home do Site', sub: 'Conheça o Sensória Spa', href: withUtm('/pt') },
  { label: 'Terapias Corporais', sub: 'Relaxar, aliviar tensões e recuperar o corpo', href: withUtm('/pt/terapias') },
  { label: 'Jornadas Sensoriais', sub: 'Presentear, celebrar e viver a dois', href: withUtm('/pt/jornadas') },
];

export default function LinksPage() {
  // Agendamento passa pelo formulário do site (preserva o rastreio) antes do WhatsApp.
  const agendarHref = withUtm('/pt#agendar');

  return (
    <main className="flex min-h-screen flex-col items-center bg-sensoria-green px-5 py-14 text-sensoria-white">
      <div className="flex w-full max-w-md flex-col items-center">
        {/* Cabeçalho */}
        <span className="font-display text-4xl tracking-display">Sensória</span>
        <p className="mt-2 font-sans text-xs uppercase tracking-wide3 text-sensoria-cream">
          {siteConfig.tagline}
        </p>

        {/* Links principais */}
        <nav className="mt-10 flex w-full flex-col gap-3.5">
          {primaryLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between rounded-2xl border border-sensoria-white/20 bg-sensoria-white/5 px-6 py-4 backdrop-blur-sm transition-colors hover:bg-sensoria-white/15"
            >
              <span className="flex flex-col">
                <span className="font-display text-xl tracking-display">{item.label}</span>
                <span className="mt-0.5 text-xs text-sensoria-white/70">{item.sub}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 flex-none text-sensoria-cream transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}

          {/* Agendar (passa pelo formulário do site → WhatsApp, preservando o rastreio) */}
          <a
            href={agendarHref}
            className="group flex items-center justify-between rounded-2xl bg-sensoria-cream px-6 py-4 text-sensoria-graphite transition-colors hover:bg-[#f4e9a8]"
          >
            <span className="flex flex-col">
              <span className="font-display text-xl tracking-display">Agendar minha experiência</span>
              <span className="mt-0.5 text-xs text-sensoria-graphite/70">Rápido: preencha e continue no WhatsApp</span>
            </span>
            <ArrowUpRight className="h-5 w-5 flex-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Loja online (e-commerce) — botão dedicado */}
          <a
            href={withUtm(siteConfig.ecommerce)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-sensoria-cream/40 bg-sensoria-cream/10 px-6 py-4 transition-colors hover:bg-sensoria-cream/20"
          >
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-sensoria-cream text-sensoria-graphite">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <span className="flex flex-1 flex-col">
              <span className="font-display text-xl tracking-display">Loja Online</span>
              <span className="mt-0.5 text-xs text-sensoria-white/70">
                Nossos produtos naturais no e-commerce oficial
              </span>
            </span>
            <ArrowUpRight className="h-5 w-5 flex-none text-sensoria-cream transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </nav>

        {/* Redes sociais + loja */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {socialItems.map(({ key, href, label, Icon }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-sensoria-white/25 text-sensoria-white/85 transition-colors hover:bg-sensoria-white/10"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-sensoria-white/50">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </main>
  );
}
