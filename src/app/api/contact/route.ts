import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase';
import { contactSchema } from '@/lib/contact-schema';
import { sendLeadEvent } from '@/lib/meta-capi';
import { sendLeadToKommo } from '@/lib/kommo';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_failed' }, { status: 422 });
  }

  const d = parsed.data;

  // Honeypot preenchido → provável bot. Fingimos sucesso e ignoramos.
  if (d.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const clientIp =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    undefined;
  const userAgent = request.headers.get('user-agent') ?? undefined;
  const eventSourceUrl = request.headers.get('referer') ?? undefined;

  try {
    const supabase = getServerSupabase();
    const { error } = await supabase.from('contact_submissions').insert({
      nome: d.nome,
      email: d.email,
      telefone: d.telefone || null,
      unidade: d.unidade || null,
      experiencia: d.experiencia || null,
      categoria: d.categoria || null,
      mensagem: d.mensagem || null,
      origem: d.origem || 'site',
      utm_source: d.utm_source || null,
      utm_medium: d.utm_medium || null,
      utm_campaign: d.utm_campaign || null,
      utm_content: d.utm_content || null,
      utm_term: d.utm_term || null,
      gclid: d.gclid || null,
      fbclid: d.fbclid || null,
      referrer: d.referrer || null,
      landing_page: d.landing_page || null,
    });

    if (error) {
      console.error('Supabase insert error:', error.message);
      return NextResponse.json({ error: 'db_error' }, { status: 500 });
    }
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }

  // Integrações externas (best-effort, em paralelo). Nenhuma delas quebra o
  // sucesso do lead — ambas tratam erros internamente e nunca lançam.
  //  • Meta Conversions API (dedup com o Pixel via event_id).
  //  • Kommo CRM (cria contato + lead).
  await Promise.allSettled([
    sendLeadEvent({
      eventId: d.event_id || undefined,
      eventSourceUrl,
      email: d.email,
      phone: d.telefone || undefined,
      firstName: d.nome?.split(' ')[0],
      fbp: d.fbp || undefined,
      fbc: d.fbc || undefined,
      fbclid: d.fbclid || undefined,
      clientIp,
      userAgent,
      customData: {
        category: d.categoria || undefined,
        experience: d.experiencia || undefined,
        utm_source: d.utm_source || undefined,
        utm_campaign: d.utm_campaign || undefined,
      },
    }),
    sendLeadToKommo({
      nome: d.nome,
      email: d.email,
      telefone: d.telefone || undefined,
      unidade: d.unidade || undefined,
      experiencia: d.experiencia || undefined,
      categoria: d.categoria || undefined,
      origem: d.origem || undefined,
      utm_source: d.utm_source || undefined,
      utm_medium: d.utm_medium || undefined,
      utm_campaign: d.utm_campaign || undefined,
      utm_content: d.utm_content || undefined,
      utm_term: d.utm_term || undefined,
      gclid: d.gclid || undefined,
      fbclid: d.fbclid || undefined,
      referrer: d.referrer || undefined,
      landing_page: d.landing_page || undefined,
    }),
  ]);

  return NextResponse.json({ ok: true }, { status: 200 });
}
