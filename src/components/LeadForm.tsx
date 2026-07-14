'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { contactSchema, type ContactInput } from '@/lib/contact-schema';
import { useLeadSubmit } from '@/lib/useLeadSubmit';
import { units } from '@/data/units';
import { jornadas, terapias, allExperiences } from '@/data/experiences';
import { whatsappLink, whatsappMessages } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';
import type { Locale } from '@/data/experiences';

interface LeadFormProps {
  /** Categoria da LP (pré-preenche a origem do lead e a lista de experiências). */
  context?: 'terapia' | 'jornada';
  /** Identificador de origem: 'home' | 'lp-terapias' | 'lp-jornadas' ... */
  source: string;
  /** Tema claro para usar sobre fundo escuro. */
  tone?: 'dark' | 'light';
  /** Nome da experiência a pré-selecionar (ex.: página da experiência). */
  defaultExperience?: string;
  /** Unidade a pré-selecionar (ex.: página de unidades). */
  defaultUnit?: string;
  /** Ao concluir, redireciona para o WhatsApp com a mensagem montada (padrão: true). */
  redirect?: boolean;
  /** Callback após envio bem-sucedido (ex.: fechar modal). */
  onSuccess?: () => void;
}

export default function LeadForm({
  context,
  source,
  tone = 'dark',
  defaultExperience,
  defaultUnit,
  redirect = true,
  onSuccess,
}: LeadFormProps) {
  const t = useTranslations('lead');
  const tcf = useTranslations('contact.form');
  const locale = useLocale() as Locale;
  const { status, submit, setStatus } = useLeadSubmit();
  const light = tone === 'light';

  // Lista de experiências conforme a categoria (ou todas).
  const options =
    context === 'terapia' ? terapias : context === 'jornada' ? jornadas : allExperiences;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      website: '',
      experiencia: defaultExperience ?? '',
      unidade: defaultUnit ?? '',
    },
  });

  const onSubmit = async (data: ContactInput) => {
    const ok = await submit(data, { categoria: context, origem: source });

    // O objetivo do formulário é levar ao WhatsApp já com o lead. Se o
    // salvamento no servidor falhar, seguimos para o WhatsApp mesmo assim —
    // a própria mensagem carrega os dados, então nenhum lead é perdido.
    if (redirect) {
      onSuccess?.();
      const url = whatsappLink(
        whatsappMessages.lead(
          {
            nome: data.nome,
            experiencia: data.experiencia,
            unidade: data.unidade,
            categoria: context,
          },
          locale
        )
      );
      // Pequeno atraso para o usuário ver a confirmação antes do redirecionamento.
      setStatus('redirecting');
      setTimeout(() => {
        window.location.href = url;
      }, 700);
      return;
    }

    // Sem redirect (ex.: seção de lead da home): só limpa em caso de sucesso.
    if (!ok) return;
    onSuccess?.();
    reset();
  };

  const field = cn(
    'w-full rounded-xl border px-4 py-3 font-sans text-sm outline-none transition-colors',
    light
      ? 'border-white/25 bg-white/10 text-white placeholder:text-white/50 focus:border-sensoria-cream'
      : 'border-sensoria-fog bg-sensoria-white text-sensoria-graphite placeholder:text-sensoria-graphite/40 focus:border-sensoria-green'
  );
  const busy = status === 'submitting' || status === 'redirecting';

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

      <div className="grid gap-4 sm:grid-cols-2">
        <select className={field} aria-label={tcf('unit')} {...register('unidade')}>
          <option value="">{tcf('unitPlaceholder')}</option>
          {units.map((u) => (
            <option key={u.slug} value={u.name}>
              {u.name} — {u.city[locale]}
            </option>
          ))}
        </select>
        <select className={field} aria-label={tcf('experience')} {...register('experiencia')}>
          <option value="">{tcf('experiencePlaceholder')}</option>
          {options.map((e) => (
            <option key={e.slug} value={e.name[locale]}>
              {e.name[locale]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={busy}
          data-cursor="hover"
          className={cn(
            'inline-flex h-12 items-center justify-center rounded-full px-8 font-sans text-sm font-medium transition-colors disabled:opacity-60',
            light
              ? 'bg-sensoria-cream text-sensoria-graphite hover:bg-[#f4e9a8]'
              : 'bg-sensoria-green text-sensoria-white hover:bg-[#516353]'
          )}
        >
          {busy ? tcf('submitting') : t('cta')}
        </button>

        {(status === 'success' || status === 'redirecting') && (
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn('flex items-center gap-2 text-sm', light ? 'text-sensoria-cream' : 'text-sensoria-green')}
          >
            <Check className="h-4 w-4" /> {status === 'redirecting' ? t('redirecting') : tcf('success')}
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
