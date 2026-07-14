import type { Metadata } from 'next';
import { inter, cormorant } from '@/lib/fonts';
import { siteConfig } from '@/config/site';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `Admin · ${siteConfig.name}`,
  // Painel interno — nunca indexar.
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
