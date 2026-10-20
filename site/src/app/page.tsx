import Link from 'next/link';
import Image from 'next/image';
import { Arrow } from '@/components/icons';
import { LogoCloud } from '@/components/logo-cloud';
import { Lines, Reveal } from '@/components/motion';
import { ProcessScroller } from '@/components/process-scroller';
import { ImagesScrollingAnimation } from '@/components/ui/images-scrolling-animation';
import { WaveField } from '@/components/wave-field';
import { VideoShowcase } from '@/components/ui/video-showcase';
import { clients } from '@/content/clients';
import { projects } from '@/content/projects';
import { portfolioVideos } from '@/content/videos';
import { process as steps, services } from '@/content/services';
import { site } from '@/content/site';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero__content">
          <p className="eyebrow reveal" data-in="true">Exhibitions · Conferences · Brand experiences</p>
          <h1 id="hero-title" className="display hero__title" style={{ marginTop: 28 }}>
            <Lines
              lines={['Designed to', 'make your', 'brand matter.']}
              delay={500}
            />
          </h1>
          <div className="hero__row">
            <p className="lede reveal" data-in="true" style={{ '--d': '900ms' } as React.CSSProperties}>
              {site.description}
            </p>
            <div className="hero__actions reveal" data-in="true" style={{ '--d': '1100ms' } as React.CSSProperties}>
              <Link href="/contact" className="btn btn--solid">
                Start a brief <Arrow />
              </Link>
              <Link href="/services" className="link">
                Explore services <Arrow />
              </Link>
            </div>
          </div>
        </div>
        <div className="hero__art">
          <WaveField />
          <Image
            className="hero__wordmark"
            src="/brand/think-agency.png"
            alt="THINK Agency"
            width={1432}
            height={363}
            priority
          />
        </div>
      </section>

      {clients.length > 0 && (
        <section className="client-strip wrap" aria-labelledby="clients-h">
          <div className="client-strip__head">
            <p id="clients-h" className="label">Trusted by leading brands</p>
            <Link href="/clients" className="link">View all clients <Arrow /></Link>
          </div>
          <LogoCloud clients={clients.slice(0, 8)} variant="strip" />
        </section>
      )}

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
          <ImagesScrollingAnimation projects={projects.slice(0, 5)} includeGallery />
          <VideoShowcase videos={portfolioVideos} />
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
              <Lines lines={['Clear ideas.', 'Considered', 'spaces.']} />
            </h2>
            <Reveal className="" delay={150}>
              <p className="body" style={{ marginTop: 40 }}>
                We translate brand objectives into physical spaces. By bringing spatial design, environmental graphics and event delivery together, every interaction feels purposeful and every detail feels considered.
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
              <Lines lines={['Designed for', 'the moments', 'that matter.']} />
            </h2>
          </div>
          <div className="space-feature__detail">
            <p className="body">A great event space does more than look the part. It makes your story clear, welcomes the right conversations and gives your team the setting to connect with purpose.</p>
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
              <Lines lines={['Design.', 'Delivery.', 'Detail.']} />
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

      {/* FINAL CTA */}
      <section className="section wrap cta" aria-labelledby="cta-h" style={{ borderTop: '1px solid var(--line)' }}>
        <p className="eyebrow">Next</p>
        <h2 id="cta-h" className="cta__title" style={{ marginTop: 36 }}>
          <Link href="/contact" className="cta__link">
            <Lines lines={['Bring your next', 'brand experience', 'to life.']} />
            <Arrow />
          </Link>
        </h2>
      </section>
    </>
  );
}
