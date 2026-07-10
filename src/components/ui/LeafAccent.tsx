import { cn } from '@/lib/utils';

/** Ramo/folha decorativo — acento gráfico da marca (linha fina). */
export default function LeafAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      aria-hidden
      className={cn('h-auto w-24 text-current', className)}
    >
      <path
        d="M2 38C20 30 34 20 46 8M46 8c-6 2-12 5-16 10m16-10c-2 5-3 11-2 16M60 20c14-4 30-4 44 2M104 22c-5-2-11-3-16-2m16 2c-4 3-9 5-14 6M60 20c8 0 16 2 22 6"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
