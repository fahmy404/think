import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/content/types';
import { Reveal } from './motion';

export function WorkItem({ p, index }: { p: Project; index: number }) {
  const ratios = ['16 / 11', '4 / 5', '4 / 5', '16 / 11'];
  const ratio = ratios[index % 4];
  return (
    <Reveal as="article" className="work">
      <Link href={`/work/${p.slug}`} aria-label={`${p.name}, ${p.client}`}>
        <div className="work__media" style={{ aspectRatio: ratio }}>
          <Image
            src={p.cover.src}
            alt={p.cover.alt}
            width={p.cover.width}
            height={p.cover.height}
            sizes="(min-width: 900px) 60vw, 100vw"
            loading={index < 2 ? 'eager' : 'lazy'}
          />
        </div>
        <div className="work__meta">
          <h3 className="work__name">{p.name}</h3>
          <div className="work__sub label">
            <span>{p.client}</span>
            <span>{p.category}</span>
            <span>{p.year}</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
