import type { Metadata } from 'next';
import { PageHead } from '@/components/page-head';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  alternates: { canonical: '/terms' },
};

export default function Terms() {
  return (
    <>
      <PageHead eyebrow="Legal" title={['Terms &', 'Conditions']} />
      <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <div className="prose">
          <span className="flag">Placeholder</span>
          <h2>Terms text required</h2>
          <p>
            The terms and conditions must be supplied and approved by THINK Agency. This page is
            intentionally left without invented legal language.
          </p>
        </div>
      </section>
    </>
  );
}
