'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setStatus('error');
        return;
      }
      // Cookie setado no servidor → recarrega o Server Component (mostra o dashboard).
      router.refresh();
    } catch {
      setStatus('error');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-sensoria-green px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sensoria-green/10 text-sensoria-green">
            <Lock className="h-6 w-6" />
          </span>
          <h1 className="mt-4 font-display text-2xl tracking-display text-sensoria-graphite">
            Painel de Leads
          </h1>
          <p className="mt-1 font-sans text-sm text-sensoria-graphite/60">
            Acesso restrito · Sensória Spa
          </p>
        </div>

        <label
          htmlFor="password"
          className="mb-1.5 block font-sans text-xs uppercase tracking-wide2 text-sensoria-graphite/60"
        >
          Senha
        </label>
        <input
          id="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          className="w-full rounded-xl border border-sensoria-fog bg-sensoria-white px-4 py-3 font-sans text-sm text-sensoria-graphite outline-none transition-colors placeholder:text-sensoria-graphite/40 focus:border-sensoria-green"
          placeholder="••••••••"
        />

        {status === 'error' && (
          <p className="mt-2 flex items-center gap-2 text-sm text-red-500">
            <AlertCircle className="h-4 w-4" /> Senha incorreta.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting' || !password}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-sensoria-green px-8 font-sans text-sm font-medium text-sensoria-white transition-colors hover:bg-[#516353] disabled:opacity-60"
        >
          {status === 'submitting' ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}
