import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/icons';
import { WorkItem } from '@/components/ui';
import { PageHead } from '@/components/page-head';
import { projects } from '@/content/projects';
import { services } from '@/content/services';

export const metadata: Metadata = {
  title: 'Spaces',
  description: 'Discover the kinds of branded spaces THINK designs and produces for exhibitions, conferences and events.',
  alternates: { canonical: '/work' },
};

export default function Work() {
  const spaces = services.slice(0, 3);

  return (
    <>
      <PageHead eyebrow={projects.length > 0 ? 'Selected spaces' : 'Spaces'} title={projects.length > 0 ? ['Made for', 'real moments.'] : ['Make your', 'next event', 'feel like you.']} lede="Explore the event spaces THINK designs and brings to life for brands." />
      <section className="section wrap" style={{ paddingTop: 0 }} aria-label={projects.length > 0 ? 'Selected project work' : 'Types of event spaces'}>
        {projects.length > 0 ? (
          <div className="works">
            {projects.map((project, index) => (
              <WorkItem key={project.slug} p={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="spaces-grid">
            {spaces.map((space) => (
              <article className="space-card" key={space.slug}>
                <span className="num">{space.number}</span>
                <h2 className="h2">{space.title}</h2>
                <p className="body">{space.summary}</p>
                <Link href={`/services#${space.slug}`} className="link">Explore the service <Arrow /></Link>
              </article>
            ))}
          </div>
        )}
      </section>
      <section className="section wrap cta" aria-labelledby="spaces-cta" style={{ borderTop: '1px solid var(--line)' }}>
        <p className="eyebrow">Your brief, your space</p>
        <h2 id="spaces-cta" className="cta__title" style={{ marginTop: 36 }}>
          <Link href="/contact" className="cta__link">Bring us your idea <Arrow /></Link>
        </h2>
      </section>
    </>
  );
}
