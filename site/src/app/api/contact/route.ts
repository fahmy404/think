import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max = 4000) => String(v ?? '').trim().slice(0, max);

/**
 * Delivery is configured via environment variables, never hard-coded:
 *   CONTACT_WEBHOOK_URL  - receives the inquiry as JSON (e.g. Formspree, Make, Zapier, internal endpoint)
 * Until one is set the endpoint responds honestly that delivery is not configured,
 * so the form never pretends to send something that goes nowhere.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const data = {
    name: clean(body.name, 200),
    company: clean(body.company, 200),
    email: clean(body.email, 200),
    phone: clean(body.phone, 60),
    service: clean(body.service, 120),
    budget: clean(body.budget, 120),
    details: clean(body.details),
  };

  if (!data.name || !emailRe.test(data.email) || data.details.length < 10) {
    return NextResponse.json({ error: 'Please check the highlighted fields.' }, { status: 422 });
  }

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) {
    return NextResponse.json(
      { error: 'Inquiries are not yet connected to an inbox.' },
      { status: 503 },
    );
  }

  try {
    const r = await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...data, source: 'think-agency-website' }),
    });
    if (!r.ok) throw new Error('upstream');
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'We could not send your inquiry.' }, { status: 502 });
  }
}
