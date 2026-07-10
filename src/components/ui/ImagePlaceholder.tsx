'use client';

import Image from 'next/image';
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

/**
 * Renderiza a imagem quando existe; enquanto o arquivo não estiver em /public,
 * mostra um bloco elegante indicando o caminho do arquivo a ser inserido.
 * (O onError garante o fallback visual sem quebrar o layout.)
 * Ver public/ASSETS.md para a lista completa.
 */
export default function ImagePlaceholder(props: ImagePlaceholderProps) {
  const { src, alt, className, fill, width, height, priority, sizes } = props;

  return (
    <div
      className={cn(
        // `isolate` cria um contexto de empilhamento próprio: o z-10 interno da
        // imagem fica contido aqui e NÃO cobre degradês/textos sobrepostos por
        // fora (banners com texto por cima). Ver LP/hero/cards.
        'relative isolate flex items-center justify-center overflow-hidden bg-sensoria-fog',
        className
      )}
    >
      {/* Fallback visível por baixo da imagem */}
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center gap-3 p-4 text-center text-sensoria-green/70">
        <LeafAccent className="w-16 opacity-60" />
        <span className="max-w-[80%] break-all font-sans text-[11px] uppercase tracking-wide2">
          {src}
        </span>
      </div>

      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        priority={priority}
        sizes={sizes}
        className="relative z-10 h-full w-full object-cover"
        // Se o arquivo não existir, esconde a <img> e deixa o fallback aparecer.
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
  );
}
