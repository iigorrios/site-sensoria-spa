import { cn } from '@/lib/utils';

/**
 * Detalhe decorativo "carioca": skyline do Rio (Pão de Açúcar + Cristo Redentor)
 * encostado na borda inferior, logo acima do rodapé.
 *
 * Arquivo esperado: `public/images/decor/icone-rj.svg` (linha fina, verde claro).
 * Enquanto o arquivo não existir, aparece apenas uma faixa branca discreta —
 * nada quebra.
 */
export default function RioSkyline({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('w-full bg-sensoria-white', className)}>
      <div className="mx-auto h-16 w-full max-w-5xl bg-[url('/images/decor/icone-rj.svg')] bg-[length:auto_100%] bg-bottom bg-no-repeat md:h-24" />
    </div>
  );
}
