import type { Metadata } from 'next';
import { inter, cormorant } from '@/lib/fonts';
import { siteConfig } from '@/config/site';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `Links · ${siteConfig.name}`,
  description: `${siteConfig.name} — ${siteConfig.tagline}. Agende sua experiência, conheça nossas Terapias e Jornadas Sensoriais.`,
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/images/logo/simbolo.png', type: 'image/png' }],
    apple: '/images/logo/simbolo.png',
  },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
