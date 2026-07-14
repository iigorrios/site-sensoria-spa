import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { inter, cormorant } from '@/lib/fonts';
import { siteConfig } from '@/config/site';
import { alternatesFor } from '@/lib/seo';
import { organizationSchema } from '@/lib/jsonld';
import JsonLd from '@/components/JsonLd';
import SmoothScroll from '@/components/motion/SmoothScroll';
import Preloader from '@/components/motion/Preloader';
import SoundToggle from '@/components/SoundToggle';
import MetaPixel from '@/components/MetaPixel';
import AttributionCapture from '@/components/AttributionCapture';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(siteConfig.url),
    alternates: alternatesFor(locale, ''),
    title: {
      default: t('homeTitle'),
      template: '%s',
    },
    description: t('homeDescription'),
    icons: {
      icon: [{ url: '/images/logo/simbolo.png', type: 'image/png' }],
      apple: '/images/logo/simbolo.png',
    },
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      type: 'website',
      locale,
      siteName: siteConfig.name,
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as never)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <JsonLd data={organizationSchema()} />
        <NextIntlClientProvider messages={messages}>
          <MetaPixel />
          <AttributionCapture />
          <Preloader />
          <SoundToggle />
          <SmoothScroll>
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
