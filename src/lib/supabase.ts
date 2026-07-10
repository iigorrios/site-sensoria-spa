import 'server-only';
import { createClient } from '@supabase/supabase-js';

/**
 * Cliente Supabase para uso EXCLUSIVO no servidor (Route Handlers / Server Actions).
 * Usa a service role key, que nunca é exposta ao navegador.
 *
 * Variáveis (.env.local):
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...
 */
export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      'Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local'
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
