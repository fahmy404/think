import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Arrow } from '@/components/icons';
import { Lines, Reveal } from '@/components/motion';
import { WorkItem } from '@/components/ui';
import { projects } from '@/content/projects';

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary ?? `${p.name} for ${p.client}.`,
    alternates: { canonical: `/work/${p.slug}` },
  };
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 2);

  const blocks: [string, string | undefined][] = [
    ['Challenge', p.challenge],
    ['Approach', p.approach],
    ['Execution', p.execution],
    ['Outcome', p.outcome],
  ];

  return (
    <>
      <header className="wrap phead">
        <p className="eyebrow">{p.category}</p>
        <h1 className="h1"><Lines lines={[p.name]} /></h1>
        <dl className="work__sub label" style={{ marginTop: 40, gap: 40 }}>
          <div><dt>Client</dt><dd style={{ color: 'var(--paper)', marginTop: 8 }}>{p.client}</dd></div>
          <div><dt>Type</dt><dd style={{ color: 'var(--paper)', marginTop: 8 }}>{p.category}</dd></div>
          {p.year && <div><dt>Year</dt><dd style={{ color: 'var(--paper)', marginTop: 8 }}>{p.year}</dd></div>}
        </dl>
        {p.summary && <p className="lede" style={{ marginTop: 32 }}>{p.summary}</p>}
      </header>

      <div className="wrap case-cover">
        <Image src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} sizes="100vw" priority style={{ width: '100%', height: 'auto' }} />
      </div>

      <section className="wrap section">
        {blocks.filter(([, v]) => v).map(([k, v]) => (
          <Reveal key={k} className="sdetail">
            <div className="sd-num"><span className="label">{k}</span></div>
            <div className="sd-main"><p className="lede" style={{ maxWidth: '40ch' }}>{v}</p></div>
          </Reveal>
        ))}
        {p.gallery && p.gallery.length > 0 && (
          <div className="case-gallery" aria-label={`${p.client} project gallery`}>
            {p.gallery.map((g) => (
              <Reveal key={g.src} className="case-gallery__item">
                <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(max-width: 700px) 92vw, 45vw" loading="lazy" />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
          <p className="eyebrow" style={{ marginBottom: 48 }}>Related projects</p>
          <div className="works">
            {related.map((r, i) => <WorkItem key={r.slug} p={r} index={i} />)}
          </div>
        </section>
      )}

      <div className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <Link href="/work" className="link">All work <Arrow /></Link>
      </div>
    </>
  );
}
