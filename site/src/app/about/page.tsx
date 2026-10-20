import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/icons';
import { Lines, Reveal } from '@/components/motion';
import { PageHead } from '@/components/page-head';
import { ProcessScroller } from '@/components/process-scroller';
import { process as steps } from '@/content/services';

export const metadata: Metadata = {
  title: 'About',
  description: 'Founded in 2015, THINK designs and delivers exhibition stands, conference environments and branded event spaces for leading companies.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return (
    <>
      <PageHead eyebrow="About THINK" title={['Space for', 'ambitious', 'brands.']} lede="An experiential design and production partner for organizations that need their brand to show up with clarity and distinction." />

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="about-grid">
          <div className="a-l"><p className="eyebrow">Our story</p></div>
          <div className="a-r">
            <h2 className="big-statement">
              <Lines lines={['Built on ideas.', 'Made for', 'lasting impact.']} />
            </h2>
            <Reveal>
              <p className="body" style={{ marginTop: 36 }}>
                Founded in 2015, THINK is a design and production company creating distinctive spaces for exhibitions, conferences and corporate events. Our creative and production teams work together to turn each brief into a well-designed environment, built around the client, the venue and the audience.
              </p>
              <p className="body" style={{ marginTop: 18 }}>
                From the first concept and 3D design to fabrication, installation and event-day delivery, we bring every detail together under one roof. Our work includes custom exhibition stands, conference partitions, branded environments and event production for organizations across industries.
              </p>
              <Link href="/services" className="link" style={{ marginTop: 32 }}>Explore our services <Arrow /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }} aria-label="Our vision and mission">
        <div className="about-grid">
          <div className="a-l"><p className="eyebrow">Our vision</p></div>
          <div className="a-r">
            <h2 className="big-statement"><Lines lines={['Global thinking.', 'Rooted in', 'local character.']} /></h2>
            <Reveal>
              <p className="body" style={{ marginTop: 28 }}>
                To serve brands across industries with a world-class perspective shaped by the creativity, energy and culture of Egypt.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="about-grid" style={{ marginTop: 'var(--section)' }}>
          <div className="a-l"><p className="eyebrow">Our mission</p></div>
          <div className="a-r">
            <h2 className="big-statement"><Lines lines={['Make every', 'brand stand', 'out.']} /></h2>
            <Reveal>
              <p className="body" style={{ marginTop: 28 }}>
                We turn each client brief into a thoughtful, buildable design, then coordinate production and on-site delivery with care. Every decision—from space planning and materials to installation—is guided by the purpose of the event and the experience it should create.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }} aria-label="How we work">
        <ProcessScroller steps={steps} />
      </section>

      <section className="section wrap cta" aria-labelledby="about-cta" style={{ borderTop: '1px solid var(--line)' }}>
        <p className="eyebrow">Have an event in mind?</p>
        <h2 id="about-cta" className="cta__title" style={{ marginTop: 36 }}>
          <Link href="/contact" className="cta__link"><Lines lines={['Let’s talk', 'about your space.']} /><Arrow /></Link>
        </h2>
      </section>
    </>
  );
}
