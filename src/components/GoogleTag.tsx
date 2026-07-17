'use client';

import Script from 'next/script';
import { siteConfig } from '@/config/site';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Tag (browser) — um único tag serve GA4 e Google Ads.
 * Só é injetado se NEXT_PUBLIC_GOOGLE_TAG_ID existir.
 *
 * O page_view é automático. Os eventos de conversão são disparados no submit
 * dos formulários (ver trackGenerateLead) e no clique do WhatsApp.
 *
 * ATENÇÃO: a conversão do Google Ads é enviada pelo SERVIDOR (Google Ads API,
 * ver src/lib/google-ads.ts). Não configure aqui uma tag de conversão web para
 * a MESMA conversion action — o Google não deduplica e contaria em dobro.
 */
export default function GoogleTag() {
  const id = siteConfig.googleTagId;
  if (!id) return null;

  return (
    <>
      <Script
        id="google-tag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}

/** Envia um evento ao GA4 (no-op se o gtag não estiver carregado). */
export function trackGtagEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, {
    ...(siteConfig.ga4Id ? { send_to: siteConfig.ga4Id } : {}),
    ...params,
  });
}

/** Evento de lead do GA4 (padrão da indústria para geração de leads). */
export function trackGenerateLead(params: {
  categoria?: string;
  experiencia?: string;
  unidade?: string;
  origem?: string;
}): void {
  trackGtagEvent('generate_lead', {
    currency: 'BRL',
    value: 0,
    lead_category: params.categoria,
    lead_experience: params.experiencia,
    lead_unit: params.unidade,
    lead_source: params.origem,
  });
}

/** Clique em qualquer CTA de WhatsApp. */
export function trackWhatsappClick(origem?: string): void {
  trackGtagEvent('click_whatsapp', { lead_source: origem });
}
