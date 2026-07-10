'use client';

import { useState } from 'react';
import { getAttribution, getMetaCookies, newEventId } from '@/lib/tracking';
import { trackLead } from '@/components/MetaPixel';
import type { ContactInput } from '@/lib/contact-schema';

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'redirecting' | 'error';

/**
 * Envia um lead: injeta atribuição (UTMs + cookies do Meta), gera event_id,
 * dispara o Pixel (Lead) e faz POST /api/contact (que também dispara o CAPI).
 * Reutilizado pelo LeadForm (enxuto) e pelo ContactForm (completo).
 */
export function useLeadSubmit() {
  const [status, setStatus] = useState<SubmitStatus>('idle');

  async function submit(
    data: Partial<ContactInput>,
    extra?: { categoria?: string; experiencia?: string; origem?: string }
  ): Promise<boolean> {
    setStatus('submitting');
    const attribution = getAttribution();
    const { fbp, fbc } = getMetaCookies();
    const event_id = newEventId();

    const payload: Partial<ContactInput> = {
      ...data,
      ...attribution,
      ...extra,
      fbp,
      fbc,
      event_id,
    };

    // Pixel (browser) — mesmo event_id do CAPI (dedup).
    trackLead(event_id);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('request_failed');
      setStatus('success');
      return true;
    } catch {
      setStatus('error');
      return false;
    }
  }

  return { status, submit, setStatus };
}
