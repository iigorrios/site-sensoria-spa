'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import LeafAccent from './LeafAccent';

/**
 * Ícone decorativo de ramo (folha) em PNG.
 *  - tone="green"  → fundos claros (branco/creme/fog)  → ramo-verde.png
 *  - tone="light"  → fundos escuros (verde/grafite)     → ramo-creme.png
 *
 * Arquivos esperados em `public/images/decor/`. Enquanto não existirem, faz
 * fallback automático para o desenho vetorial atual (nada quebra).
 */
export default function LeafIcon({
  tone = 'green',
  className,
}: {
  tone?: 'green' | 'light';
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Cobre o caso em que a imagem já falhou (404) antes da hidratação — o evento
  // onError não é capturado nesse cenário, então checamos após montar.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <LeafAccent className={className} />;

  const src = tone === 'light' ? '/images/decor/ramo-creme.png' : '/images/decor/ramo-verde.png';
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt=""
      aria-hidden
      onError={() => setFailed(true)}
      className={cn('inline-block h-auto', className)}
    />
  );
}
