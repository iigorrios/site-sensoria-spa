'use client';

import Script from 'next/script';
import { siteConfig } from '@/config/site';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Meta Pixel (browser). Só é injetado se NEXT_PUBLIC_META_PIXEL_ID existir.
 * Dispara PageView automaticamente. O evento Lead é disparado no submit dos
 * formulários (ver trackLead), com o mesmo event_id enviado pelo CAPI.
 */
export default function MetaPixel() {
  const id = siteConfig.metaPixelId;
  if (!id) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${id}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}

/** Dispara o evento Lead no Pixel com event_id para deduplicação com o CAPI. */
export function trackLead(eventId: string): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {}, { eventID: eventId });
  }
}
