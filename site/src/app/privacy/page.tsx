import type { Metadata } from 'next';
import { PageHead } from '@/components/page-head';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return (
    <>
      <PageHead eyebrow="Legal" title={['Privacy', 'Policy']} />
      <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <div className="prose">
          <span className="flag">Placeholder</span>
          <h2>Policy text required</h2>
          <p>
            The privacy policy must be supplied and approved by THINK Agency. This page is
            intentionally left without invented policy language.
          </p>
        </div>
      </section>
    </>
  );
}
