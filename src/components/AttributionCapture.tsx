'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureAttribution } from '@/lib/tracking';

/**
 * Captura UTMs/click IDs no primeiro load e a cada troca de página.
 * Reexecutar em cada navegação é idempotente (first-touch) e garante que a
 * atribuição seja capturada mesmo se o usuário entrar por uma página interna
 * e navegar em seguida. Sem UI.
 */
export default function AttributionCapture() {
  const pathname = usePathname();
  useEffect(() => {
    captureAttribution();
  }, [pathname]);
  return null;
}
