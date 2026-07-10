import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

/* Ícones de marca em SVG inline (lucide não inclui mais ícones de marca). */
const IconInstagram = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={p.className} aria-hidden>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
  </svg>
);
const IconFacebook = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M13.5 21v-7h2.4l.4-2.9h-2.8V9.2c0-.85.24-1.43 1.46-1.43H16.8V5.16c-.27-.03-1.2-.11-2.28-.11-2.26 0-3.8 1.38-3.8 3.9v2.15H8.3V14h2.42v7h2.78z" />
  </svg>
);
const IconYoutube = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={p.className} aria-hidden>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M10.5 9.2v5.6l4.8-2.8-4.8-2.8z" fill="currentColor" />
  </svg>
);
const IconTiktok = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M16.5 3c.3 2.1 1.5 3.4 3.5 3.6v2.5c-1.2.1-2.3-.2-3.5-.9v5.6c0 3.4-2.6 5.7-5.7 5.2-2.6-.4-4.3-2.6-4-5.2.3-2.5 2.6-4.2 5.1-3.8v2.6c-.4-.1-.8-.2-1.2-.1-1 .1-1.7.9-1.6 1.9.1 1 1 1.7 2 1.6.9-.1 1.6-.9 1.6-1.9V3h3.3z" />
  </svg>
);
const IconStore = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={p.className} aria-hidden>
    <path d="M4 9h16l-1 11H5L4 9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M8.5 9V7a3.5 3.5 0 017 0v2" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const socialItems = [
  { key: 'instagram', href: siteConfig.instagram, label: 'Instagram', Icon: IconInstagram },
  { key: 'facebook', href: siteConfig.facebook, label: 'Facebook', Icon: IconFacebook },
  { key: 'youtube', href: siteConfig.youtube, label: 'YouTube', Icon: IconYoutube },
  { key: 'tiktok', href: siteConfig.tiktok, label: 'TikTok', Icon: IconTiktok },
  { key: 'ecommerce', href: siteConfig.ecommerce, label: 'Loja', Icon: IconStore },
] as const;

export default function SocialLinks({
  className,
  itemClassName,
}: {
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {socialItems.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          data-cursor="hover"
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full border border-current/30 transition-colors hover:bg-current/10',
            itemClassName
          )}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
