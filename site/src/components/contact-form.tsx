'use client';

import { useState } from 'react';
import { services } from '@/content/services';
import { Arrow, AlertIcon, CheckIcon } from './icons';

type Errors = Partial<Record<'name' | 'company' | 'email' | 'phone' | 'details', string>>;
type State = 'idle' | 'loading' | 'success' | 'error';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');

  function validate(d: FormData): Errors {
    const e: Errors = {};
    if (!String(d.get('name') ?? '').trim()) e.name = 'Please enter your name.';
    if (!String(d.get('company') ?? '').trim()) e.company = 'Please enter your company or organization.';
    const email = String(d.get('email') ?? '').trim();
    if (!email) e.email = 'Please enter your email.';
    else if (!emailRe.test(email)) e.email = 'Please enter a valid email address.';
    const phone = String(d.get('phone') ?? '').trim();
    if (phone && !/^[+\d][\d\s().-]{5,}$/.test(phone)) e.phone = 'Please enter a valid phone number.';
    if (String(d.get('details') ?? '').trim().length < 10) e.details = 'Please tell us a little about the project.';
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || 'Something went wrong.');
      setState('success');
      form.reset();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className="status" role="status" data-kind="success">
        <CheckIcon />
        <div>
          <p className="h3" style={{ marginBottom: 12 }}>Inquiry sent</p>
          <p className="body">Thank you. Your inquiry has been received and the team will be in touch.</p>
        </div>
      </div>
    );
  }

  const field = (k: keyof Errors) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `err-${k}` : undefined,
  });

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-describedby="form-status">
      <div className="field" data-invalid={!!errors.name}>
        <label htmlFor="name">Full name *</label>
        <input id="name" name="name" autoComplete="name" {...field('name')} />
        <span className="field__err" id="err-name">{errors.name}</span>
      </div>
      <div className="field" data-invalid={!!errors.company}>
        <label htmlFor="company">Company or organization *</label>
        <input id="company" name="company" autoComplete="organization" {...field('company')} />
        <span className="field__err" id="err-company">{errors.company}</span>
      </div>
      <div className="field" data-invalid={!!errors.email}>
        <label htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" autoComplete="email" {...field('email')} />
        <span className="field__err" id="err-email">{errors.email}</span>
      </div>
      <div className="field" data-invalid={!!errors.phone}>
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" {...field('phone')} />
        <span className="field__err" id="err-phone">{errors.phone}</span>
      </div>
      <div className="field">
        <label htmlFor="service">Service</label>
        <select id="service" name="service" defaultValue="">
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
        <span className="field__err" />
      </div>
      <div className="field">
        <label htmlFor="budget">Budget (optional)</label>
        <input id="budget" name="budget" placeholder="e.g. 25,000 USD" />
        <span className="field__err" />
      </div>
      <div className="field f-full" data-invalid={!!errors.details}>
        <label htmlFor="details">Project details *</label>
        <textarea id="details" name="details" placeholder="Event, venue and city, date, approximate space, audience and goals..." {...field('details')} />
        <span className="field__err" id="err-details">{errors.details}</span>
      </div>

      {/* Honeypot: real users never see or fill this. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="f-full" id="form-status" aria-live="polite">
        {state === 'error' && (
          <div className="status" data-kind="error" role="alert" style={{ marginBottom: 24 }}>
            <AlertIcon />
            <p>{message} Please try again.</p>
          </div>
        )}
        <button className="btn btn--solid" type="submit" disabled={state === 'loading'}>
          {state === 'loading' ? (
            <>
              Sending <span className="spinner" aria-hidden="true" />
            </>
          ) : (
            <>
              Send inquiry <Arrow />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
