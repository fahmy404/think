import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/icons';
import { Reveal } from '@/components/motion';
import { PageHead } from '@/components/page-head';
import { services } from '@/content/services';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Exhibition stands, conference environments, event management and production for leading companies.',
  alternates: { canonical: '/services' },
};

export default function Services() {
  return (
    <>
      <PageHead eyebrow="Capabilities" title={['From bold', 'concepts to', 'event-ready.']} lede="Design, production and event capabilities to take your brief from the first spatial idea to the finished environment on site." />
      <div className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        {services.map((s) => (
            <Reveal as="section" key={s.slug} id={s.slug} className="sdetail">
              <div className="sd-num"><span className="num">{s.number}</span></div>
              <div className="sd-main">
                <h2 className="h2">{s.title}</h2>
                <p className="body" style={{ marginTop: 28 }}>{s.summary}</p>
                <Link href="/contact" className="link" style={{ marginTop: 32 }}>
                  Discuss this service <Arrow />
                </Link>
              </div>
              <div className="sd-side">
                <p className="label" style={{ marginBottom: 12 }}>Capabilities</p>
                <ul>
                  {s.capabilities.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
        ))}
      </div>
    </>
  );
}
