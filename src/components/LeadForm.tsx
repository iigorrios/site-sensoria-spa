'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { contactSchema, type ContactInput } from '@/lib/contact-schema';
import { useLeadSubmit } from '@/lib/useLeadSubmit';
import { units } from '@/data/units';
import { cn } from '@/lib/utils';
import type { Locale } from '@/data/experiences';

interface LeadFormProps {
  /** Categoria da LP (pré-preenche a origem do lead). */
  context?: 'terapia' | 'jornada';
  /** Identificador de origem: 'home' | 'lp-terapias' | 'lp-jornadas' ... */
  source: string;
  /** Tema claro para usar sobre fundo escuro. */
  tone?: 'dark' | 'light';
}

export default function LeadForm({ context, source, tone = 'dark' }: LeadFormProps) {
  const t = useTranslations('lead');
  const tcf = useTranslations('contact.form');
  const locale = useLocale() as Locale;
  const { status, submit } = useLeadSubmit();
  const light = tone === 'light';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { website: '' },
  });

  const onSubmit = async (data: ContactInput) => {
    const ok = await submit(data, { categoria: context, origem: source });
    if (ok) reset();
  };

  const field = cn(
    'w-full rounded-xl border px-4 py-3 font-sans text-sm outline-none transition-colors',
    light
      ? 'border-white/25 bg-white/10 text-white placeholder:text-white/50 focus:border-sensoria-cream'
      : 'border-sensoria-fog bg-sensoria-white text-sensoria-graphite placeholder:text-sensoria-graphite/40 focus:border-sensoria-green'
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register('website')}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            className={cn(field, errors.nome && 'border-red-400')}
            placeholder={tcf('name')}
            aria-label={tcf('name')}
            {...register('nome')}
          />
          {errors.nome && <p className="mt-1 text-xs text-red-400">{tcf('required')}</p>}
        </div>
        <div>
          <input
            className={cn(field, errors.telefone && 'border-red-400')}
            placeholder={tcf('phone')}
            aria-label={tcf('phone')}
            {...register('telefone', { required: true, minLength: 8 })}
          />
          {errors.telefone && <p className="mt-1 text-xs text-red-400">{tcf('required')}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            type="email"
            className={cn(field, errors.email && 'border-red-400')}
            placeholder={tcf('email')}
            aria-label={tcf('email')}
            {...register('email')}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{tcf('invalidEmail')}</p>}
        </div>
        <select
          className={field}
          defaultValue=""
          aria-label={tcf('unit')}
          {...register('unidade')}
        >
          <option value="">{tcf('unitPlaceholder')}</option>
          {units.map((u) => (
            <option key={u.slug} value={u.name}>
              {u.name} — {u.city[locale]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'submitting'}
          data-cursor="hover"
          className={cn(
            'inline-flex h-12 items-center justify-center rounded-full px-8 font-sans text-sm font-medium transition-colors disabled:opacity-60',
            light
              ? 'bg-sensoria-cream text-sensoria-graphite hover:bg-[#f4e9a8]'
              : 'bg-sensoria-green text-sensoria-white hover:bg-[#516353]'
          )}
        >
          {status === 'submitting' ? tcf('submitting') : t('cta')}
        </button>

        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn('flex items-center gap-2 text-sm', light ? 'text-sensoria-cream' : 'text-sensoria-green')}
          >
            <Check className="h-4 w-4" /> {tcf('success')}
          </motion.p>
        )}
        {status === 'error' && (
          <p className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4" /> {tcf('error')}
          </p>
        )}
      </div>

      <p className={cn('text-xs', light ? 'text-white/60' : 'text-sensoria-graphite/50')}>
        {t('privacy')}
      </p>
    </form>
  );
}
