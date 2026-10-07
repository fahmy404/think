import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { PageHead } from '@/components/page-head';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with THINK Agency.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <>
      <PageHead eyebrow="Contact" title={['Start a', 'project']} lede="Tell us about your project. Fields marked with an asterisk are required." />
      <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <div className="contact-grid">
          <div className="c-form"><ContactForm /></div>
          <aside className="c-info info" aria-label="Project information">
            <p className="eyebrow">A good place to start</p>
            <p className="h3" style={{ marginTop: 24 }}>Tell us what you’re planning.</p>
            <p className="body" style={{ marginTop: 16 }}>Share the event date, venue, space or stand size, and what you would like the experience to do. A rough brief is enough to begin the conversation.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
