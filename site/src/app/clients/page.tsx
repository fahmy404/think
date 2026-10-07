import type { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { PageHead } from '@/components/page-head';
import { clients } from '@/content/clients';

export const metadata: Metadata = {
  title: 'Clients',
  description: 'Selected clients of THINK Agency.',
  alternates: { canonical: '/clients' },
};

export default function Clients() {
  if (clients.length === 0) redirect('/about');
  const logos = clients.filter((c) => c.logo);
  return (
    <>
      <PageHead eyebrow="Clients" title={['Selected', 'clients']} />
      <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <ul className="cgrid">
          {clients.map((c) => (
            <li key={c.name}>
              {c.logo ? (
                <Image src={c.logo.src} alt={c.name} width={c.logo.width} height={c.logo.height} sizes="(min-width: 900px) 20vw, 45vw" loading="lazy" />
              ) : (
                <span className="cname">{c.name}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {logos.length >= 6 && (
        <section className="marquee" aria-label="Client logos" style={{ marginBottom: 'var(--section)' }}>
          <div className="marquee__track">
            {[...logos, ...logos].map((c, i) => (
              <div key={i} aria-hidden={i >= logos.length}>
                <Image src={c.logo!.src} alt={i >= logos.length ? '' : c.name} width={c.logo!.width} height={c.logo!.height} loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
