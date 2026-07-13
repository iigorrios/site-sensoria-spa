'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import LeafAccent from './LeafAccent';

interface ImagePlaceholderProps {
  /** Caminho esperado em /public (ex.: /images/units/icarai.jpg). */
  src: string;
  alt: string;
  className?: string;
  /** true para preencher o container (precisa de pai relative com altura). */
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

/** Alterna a extensão do arquivo (.jpg <-> .png). */
function swapExt(src: string): string | null {
  if (/\.png$/i.test(src)) return src.replace(/\.png$/i, '.jpg');
  if (/\.jpe?g$/i.test(src)) return src.replace(/\.jpe?g$/i, '.png');
  return null;
}

/**
 * Renderiza a imagem quando existe. Se o arquivo não estiver na extensão
 * informada, tenta automaticamente a outra (.jpg <-> .png). Se ainda assim não
 * existir, mostra um bloco elegante indicando o caminho esperado.
 * Ver public/ASSETS.md para a lista completa.
 */
export default function ImagePlaceholder(props: ImagePlaceholderProps) {
  const { src: initialSrc, alt, className, fill, width, height, priority, sizes } = props;

  const [src, setSrc] = useState(initialSrc);
  const [failed, setFailed] = useState(false);
  const triedAlt = useRef(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFail = () => {
    const other = swapExt(src);
    if (!triedAlt.current && other) {
      triedAlt.current = true;
      setSrc(other);
    } else {
      setFailed(true);
    }
  };

  // Captura falhas que acontecem antes da hidratação (o onError não dispara
  // nesse caso). Reexecuta a cada troca de src.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) handleFail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <div
      className={cn(
        // `isolate` cria um contexto de empilhamento próprio: o z-10 interno da
        // imagem fica contido aqui e NÃO cobre degradês/textos sobrepostos.
        'relative isolate flex items-center justify-center overflow-hidden bg-sensoria-fog',
        className
      )}
    >
      {/* Fallback visível por baixo da imagem */}
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center gap-3 p-4 text-center text-sensoria-green/70">
        <LeafAccent className="w-16 opacity-60" />
        <span className="max-w-[80%] break-all font-sans text-[11px] uppercase tracking-wide2">
          {initialSrc}
        </span>
      </div>

      {!failed && (
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          fill={fill}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          priority={priority}
          sizes={sizes}
          className="relative z-10 h-full w-full object-cover"
          onError={handleFail}
        />
      )}
    </div>
  );
}
