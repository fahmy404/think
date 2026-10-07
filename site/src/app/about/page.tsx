import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/icons';
import { Lines, Reveal } from '@/components/motion';
import { PageHead } from '@/components/page-head';
import { ProcessScroller } from '@/components/process-scroller';
import { process as steps } from '@/content/services';

export const metadata: Metadata = {
  title: 'About',
  description: 'THINK creates branded exhibition stands, conference partitions and event spaces, from concept through installation.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return (
    <>
      <PageHead eyebrow="About THINK" title={['We make', 'space for', 'your brand.']} lede="A creative production partner for brands that meet the real world at events." />

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className="about-grid">
          <div className="a-l"><p className="eyebrow">What we believe</p></div>
          <div className="a-r">
            <h2 className="big-statement">
              <Lines lines={['The right space', 'changes how people', 'meet your brand.']} />
            </h2>
            <Reveal>
              <p className="body" style={{ marginTop: 36 }}>
                THINK creates exhibition stands, conference partitions and branded event environments. We bring spatial design and production together, so the experience feels considered from the first welcome to the last detail.
              </p>
              <p className="body" style={{ marginTop: 18 }}>
                Every project starts with what you need the space to do. Then we shape a clear idea, develop the design and prepare it to work in the venue.
              </p>
              <Link href="/services" className="link" style={{ marginTop: 32 }}>Explore our services <Arrow /></Link>
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
