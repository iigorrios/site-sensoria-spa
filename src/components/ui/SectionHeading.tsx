import { cn } from '@/lib/utils';
import Reveal from '@/components/motion/Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  tone?: 'dark' | 'light';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  tone = 'dark',
}: SectionHeadingProps) {
  const isLight = tone === 'light';
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              'font-sans text-xs uppercase tracking-wide3',
              isLight ? 'text-sensoria-cream' : 'text-sensoria-green'
            )}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal index={1}>
        <h2
          className={cn(
            'max-w-3xl text-balance font-display text-3xl leading-[1.05] tracking-display md:text-5xl',
            isLight ? 'text-sensoria-white' : 'text-sensoria-graphite'
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal index={2}>
          <p
            className={cn(
              'max-w-xl text-base leading-relaxed md:text-lg',
              align === 'center' && 'mx-auto',
              isLight ? 'text-sensoria-fog' : 'text-sensoria-graphite/70'
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
