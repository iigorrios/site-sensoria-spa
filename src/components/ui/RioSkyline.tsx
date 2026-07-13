import { cn } from '@/lib/utils';

/**
 * Detalhe decorativo "carioca": skyline do Rio (Pão de Açúcar + Cristo Redentor)
 * ocupando a largura inteira, encostado na borda inferior — logo acima do rodapé.
 *
 * Arquivo: `public/images/decor/icone-rj-crop.svg` (recorte justo do skyline).
 * Linha fina em verde claro, fundo transparente.
 */
export default function RioSkyline({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('w-full bg-sensoria-white', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/decor/icone-rj-crop.svg" alt="" className="block h-auto w-full" />
    </div>
  );
}
