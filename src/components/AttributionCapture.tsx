'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/tracking';

/** Captura UTMs/click IDs no primeiro load. Sem UI. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
