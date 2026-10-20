import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v: unknown, max = 4000) => String(v ?? '').trim().slice(0, max);
const maxBodyBytes = 16 * 1024;

async function readJson(req: Request): Promise<unknown> {
  const declaredLength = Number(req.headers.get('content-length') || 0);
  if (declaredLength > maxBodyBytes) throw new RangeError('too large');
  if (!req.body) throw new SyntaxError('empty body');

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBodyBytes) {
      await reader.cancel();
      throw new RangeError('too large');
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

function isAllowedWebhook(value: string, isSheets: boolean) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) return false;
    if (isSheets && (url.hostname !== 'script.google.com' || !url.pathname.startsWith('/macros/s/'))) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Delivery is configured via environment variables, never hard-coded:
 *   GOOGLE_SHEETS_WEBHOOK_URL / GOOGLE_SHEETS_WEBHOOK_TOKEN - secured Apps Script endpoint
 *   CONTACT_WEBHOOK_URL - generic fallback (e.g. Formspree, Make, Zapier, internal endpoint)
 * Until one is set the endpoint responds honestly that delivery is not configured,
 * so the form never pretends to send something that goes nowhere.
 */
export async function POST(req: Request) {
  let parsed: unknown;
  try {
    parsed = await readJson(req);
  } catch (error) {
    if (error instanceof RangeError) {
      return NextResponse.json({ error: 'Request is too large.' }, { status: 413 });
    }
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
  const body = parsed as Record<string, unknown>;

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

  if (!data.name || !data.company || !emailRe.test(data.email) || data.details.length < 10) {
    return NextResponse.json({ error: 'Please check the highlighted fields.' }, { status: 422 });
  }

  const sheetsHook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const sheetsToken = process.env.GOOGLE_SHEETS_WEBHOOK_TOKEN;
  const hook = sheetsHook || process.env.CONTACT_WEBHOOK_URL;
  if (!hook) {
    return NextResponse.json(
      { error: 'Inquiries are not yet connected to an inbox.' },
      { status: 503 },
    );
  }
  if (sheetsHook && !sheetsToken) {
    return NextResponse.json(
      { error: 'Google Sheets delivery is not fully configured.' },
      { status: 503 },
    );
  }
  if (!isAllowedWebhook(hook, Boolean(sheetsHook))) {
    return NextResponse.json({ error: 'Contact delivery is misconfigured.' }, { status: 503 });
  }

  try {
    const r = await fetch(hook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...data,
        source: 'think-agency-website',
        ...(sheetsHook ? { token: sheetsToken } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!r.ok) throw new Error('upstream');
    if (sheetsHook) {
      const result = await r.json().catch(() => null) as { ok?: boolean } | null;
      if (!result?.ok) throw new Error('sheets rejected the inquiry');
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'We could not send your inquiry.' }, { status: 502 });
  }
}
