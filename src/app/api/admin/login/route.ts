import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  checkPassword,
  createSessionToken,
} from '@/lib/admin-auth';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const password =
    body && typeof body === 'object' && 'password' in body
      ? String((body as { password: unknown }).password ?? '')
      : '';

  if (!checkPassword(password)) {
    // Pequeno atraso para desestimular brute-force.
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: 'invalid_password' }, { status: 401 });
  }

  cookies().set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
