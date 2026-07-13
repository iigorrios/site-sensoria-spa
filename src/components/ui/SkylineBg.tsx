/**
 * Skyline do Rio (icone-rj.png) como fundo, ancorado na base da seção e ocupando
 * a largura inteira. O conteúdo da seção deve ficar em `relative z-10` para
 * sobrepor a imagem. Usar em uma section `relative overflow-hidden`.
 */
export default function SkylineBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/decor/icone-rj.png" alt="" className="block h-auto w-full" />
    </div>
  );
}
