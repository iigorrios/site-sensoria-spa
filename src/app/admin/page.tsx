import { isAuthenticated } from '@/lib/admin-auth';
import { getServerSupabase } from '@/lib/supabase';
import type { LeadRow } from '@/types/lead';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

// Sempre dinâmico: depende do cookie de sessão e lê dados frescos.
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // Não autenticado → tela de login e PARA (nenhum dado é buscado/vazado).
  if (!isAuthenticated()) {
    return <AdminLogin />;
  }

  let leads: LeadRow[] = [];
  let loadError: string | null = null;

  try {
    const supabase = getServerSupabase();
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);
    if (error) {
      loadError = error.message;
    } else {
      leads = (data ?? []) as LeadRow[];
    }
  } catch (err) {
    loadError = err instanceof Error ? err.message : 'Erro ao carregar leads.';
  }

  return <AdminDashboard leads={leads} loadError={loadError} />;
}
