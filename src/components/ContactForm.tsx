'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { contactSchema, type ContactInput } from '@/lib/contact-schema';
import { useLeadSubmit } from '@/lib/useLeadSubmit';
import { units } from '@/data/units';
import { allExperiences, type Locale } from '@/data/experiences';
import { cn } from '@/lib/utils';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale() as Locale;
  const { status, submit } = useLeadSubmit();

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
    const ok = await submit(data, { origem: 'contato' });
    if (ok) reset();
  };

  const fieldClass =
    'w-full rounded-xl border border-sensoria-fog bg-sensoria-white px-4 py-3 font-sans text-sm text-sensoria-graphite outline-none transition-colors placeholder:text-sensoria-graphite/40 focus:border-sensoria-green';
  const labelClass = 'mb-1.5 block font-sans text-xs uppercase tracking-wide2 text-sensoria-graphite/60';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {/* Honeypot (oculto) */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register('website')}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="nome">
            {t('name')}
          </label>
          <input id="nome" className={cn(fieldClass, errors.nome && 'border-red-400')} {...register('nome')} />
          {errors.nome && <p className="mt-1 text-xs text-red-500">{t('required')}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            {t('email')}
          </label>
          <input id="email" type="email" className={cn(fieldClass, errors.email && 'border-red-400')} {...register('email')} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{t('invalidEmail')}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="telefone">
            {t('phone')}
          </label>
          <input id="telefone" className={fieldClass} {...register('telefone')} />
        </div>
        <div>
          <label className={labelClass} htmlFor="unidade">
            {t('unit')}
          </label>
          <select id="unidade" className={fieldClass} defaultValue="" {...register('unidade')}>
            <option value="">{t('unitPlaceholder')}</option>
            {units.map((u) => (
              <option key={u.slug} value={u.name}>
                {u.name} — {u.city[locale]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="experiencia">
          {t('experience')}
        </label>
        <select id="experiencia" className={fieldClass} defaultValue="" {...register('experiencia')}>
          <option value="">{t('experiencePlaceholder')}</option>
          {allExperiences.map((e) => (
            <option key={e.slug} value={e.name[locale]}>
              {e.name[locale]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="mensagem">
          {t('message')}
        </label>
        <textarea
          id="mensagem"
          rows={5}
          placeholder={t('messagePlaceholder')}
          className={cn(fieldClass, 'resize-none', errors.mensagem && 'border-red-400')}
          {...register('mensagem')}
        />
        {errors.mensagem && <p className="mt-1 text-xs text-red-500">{t('required')}</p>}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'submitting'}
          data-cursor="hover"
          className="inline-flex h-12 items-center justify-center rounded-full bg-sensoria-green px-8 font-sans text-sm font-medium text-sensoria-white transition-colors hover:bg-[#516353] disabled:opacity-60"
        >
          {status === 'submitting' ? t('submitting') : t('submit')}
        </button>

        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm text-sensoria-green"
          >
            <Check className="h-4 w-4" /> {t('success')}
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm text-red-500"
          >
            <AlertCircle className="h-4 w-4" /> {t('error')}
          </motion.p>
        )}
      </div>
    </form>
  );
}
