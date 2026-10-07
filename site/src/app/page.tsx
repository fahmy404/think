import Link from 'next/link';
import Image from 'next/image';
import { Arrow } from '@/components/icons';
import { Lines, Reveal } from '@/components/motion';
import { ProcessScroller } from '@/components/process-scroller';
import { WorkItem } from '@/components/ui';
import { clients } from '@/content/clients';
import { projects } from '@/content/projects';
import { process as steps, services } from '@/content/services';
import { site } from '@/content/site';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero__content">
          <p className="eyebrow reveal" data-in="true">Exhibition stands · Conference spaces · Event design</p>
          <h1 id="hero-title" className="display hero__title" style={{ marginTop: 28 }}>
            <Lines
              lines={['Your brand,', 'built into', 'the experience.']}
              delay={500}
            />
          </h1>
          <div className="hero__row">
            <p className="lede reveal" data-in="true" style={{ '--d': '900ms' } as React.CSSProperties}>
              {site.description}
            </p>
            <div className="hero__actions reveal" data-in="true" style={{ '--d': '1100ms' } as React.CSSProperties}>
              <Link href="/contact" className="btn btn--solid">
                Plan your space <Arrow />
              </Link>
              <Link href="/services" className="link">
                Explore services <Arrow />
              </Link>
            </div>
          </div>
        </div>
        <div className="hero__art">
          <picture>
            <source
              media="(max-width: 899px)"
              type="image/avif"
              srcSet="/brand/hero-mobile-1100.avif"
            />
            <source
              media="(max-width: 899px)"
              type="image/webp"
              srcSet="/brand/hero-mobile-1100.webp"
            />
            <source type="image/avif" srcSet="/brand/banner-1440.avif 1440w, /brand/banner-2560.avif 2560w" sizes="100vw" />
            <source type="image/webp" srcSet="/brand/banner-1440.webp 1440w, /brand/banner-2560.webp 2560w" sizes="100vw" />
            {/* Original THINK artwork. Critical LCP image: eager + high priority. */}
            <img
              src="/brand/banner-2560.webp"
              alt="THINK wordmark above a field of illuminated dots"
              width={2560}
              height={366}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="section wrap" aria-labelledby="work-h" style={{ paddingTop: 0 }}>
          <div className="shead">
            <div>
              <p className="eyebrow">Selected spaces</p>
              <h2 id="work-h" className="h2" style={{ marginTop: 28 }}>
                <Lines lines={['Made for', 'real moments']} />
              </h2>
            </div>
            <Link href="/work" className="link">All spaces <Arrow /></Link>
          </div>
          <div className="works">
            {projects.slice(0, 4).map((project, index) => (
              <WorkItem key={project.slug} p={project} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* STATEMENT */}
      <section className="section wrap" aria-labelledby="intro">
        <div className="about-grid">
          <div className="a-l">
            <p className="eyebrow">Who we are</p>
          </div>
          <div className="a-r">
            <h2 id="intro" className="big-statement">
              <Lines lines={['Designed around', 'your brand.', 'Made for the', 'real world.']} />
            </h2>
            <Reveal className="" delay={150}>
              <p className="body" style={{ marginTop: 40 }}>
                We design and deliver exhibition stands, conference partitions and branded event spaces. From the first layout to the final on-site detail, we make every part of the experience feel like your brand.
              </p>
              <Link href="/about" className="link" style={{ marginTop: 36 }}>
                Meet THINK <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHAT A SPACE CAN DO */}
      <section className="section wrap" aria-labelledby="space-h" style={{ paddingTop: 0 }}>
        <div className="space-feature">
          <div className="space-feature__intro">
            <p className="eyebrow">Spaces with purpose</p>
            <h2 id="space-h" className="h2" style={{ marginTop: 28 }}>
              <Lines lines={['Make room', 'for a better', 'conversation.']} />
            </h2>
          </div>
          <div className="space-feature__detail">
            <p className="body">A great event space does more than look the part. It welcomes visitors, makes your story easy to understand and gives your team the right setting to connect.</p>
            <ul className="space-tags" aria-label="Spaces we create">
              <li>Exhibition stands</li>
              <li>Conference partitions</li>
              <li>Branded event spaces</li>
            </ul>
            <Link href="/work" className="link" style={{ marginTop: 32 }}>Discover our spaces <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section wrap" aria-labelledby="serv-h" style={{ paddingTop: 0 }}>
        <div className="shead">
          <div>
            <p className="eyebrow">Capabilities</p>
            <h2 id="serv-h" className="h2" style={{ marginTop: 28 }}>
              <Lines lines={['What we', 'do']} />
            </h2>
          </div>
          <Link href="/services" className="link">All services <Arrow /></Link>
        </div>
        <ul className="slist">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services#${s.slug}`} className="row">
                <span className="num">{s.number}</span>
                <span className="row__title">{s.title}</span>
                <span className="row__desc">{s.summary}</span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* APPROACH */}
      <section className="section wrap" aria-label="Approach" style={{ paddingTop: 0 }}>
        <ProcessScroller steps={steps} />
      </section>

      {clients.length > 0 && (
        <section className="section wrap" aria-labelledby="clients-h" style={{ paddingTop: 0 }}>
          <div className="shead">
            <div>
              <p className="eyebrow">In good company</p>
              <h2 id="clients-h" className="h2" style={{ marginTop: 28 }}>
                <Lines lines={['Brands we’ve', 'worked with']} />
              </h2>
            </div>
            <Link href="/clients" className="link">All clients <Arrow /></Link>
          </div>
          <ul className="cgrid">
            {clients.map((client) => (
              <li key={client.name}>
                {client.logo ? (
                  <Image src={client.logo.src} alt={client.name} width={client.logo.width} height={client.logo.height} sizes="(min-width: 900px) 20vw, 45vw" loading="lazy" />
                ) : (
                  <span className="cname">{client.name}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="section wrap cta" aria-labelledby="cta-h" style={{ borderTop: '1px solid var(--line)' }}>
        <p className="eyebrow">Next</p>
        <h2 id="cta-h" className="cta__title" style={{ marginTop: 36 }}>
          <Link href="/contact" className="cta__link">
            <Lines lines={['Let’s shape', 'your next space.']} />
            <Arrow />
          </Link>
        </h2>
      </section>
    </>
  );
}
