'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-sans text-sm font-medium tracking-wide transition-colors duration-300 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sensoria-green focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        // Creme Natural — cor de ação
        primary: 'bg-sensoria-cream text-sensoria-graphite hover:bg-[#f4e9a8]',
        green: 'bg-sensoria-green text-sensoria-white hover:bg-[#516353]',
        outline: 'border border-current bg-transparent text-current hover:bg-current/5',
        outlineLight:
          'border border-sensoria-white/50 bg-transparent text-sensoria-white hover:bg-white/10',
      },
      size: {
        md: 'h-11 px-6',
        lg: 'h-14 px-8 text-[15px]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

type BaseProps = VariantProps<typeof button> & {
  className?: string;
  children: React.ReactNode;
};

type AsLink = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: never;
};
type AsButton = BaseProps & {
  href?: undefined;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

/** Botão/CTA da marca. (Antes tinha efeito magnético — removido a pedido.) */
export default function MagneticButton(props: AsLink | AsButton) {
  const { variant, size, className, children } = props;
  const classes = cn(button({ variant, size }), className);

  if ('href' in props && props.href) {
    return (
      <a
        href={props.href}
        className={classes}
        target={props.external ? '_blank' : undefined}
        rel={props.external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={(props as AsButton).type ?? 'button'}
      onClick={(props as AsButton).onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
