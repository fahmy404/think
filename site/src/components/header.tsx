'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/content/site';
import { Wordmark } from './wordmark';
import { Arrow } from './icons';

export function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setSolid(y > 40);
        setHidden(y > last && y > 400);
        last = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => {
      window.removeEventListener('keydown', esc);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="header" data-solid={solid || open} data-hidden={hidden && !open}>
        <div className="wrap header__in">
          <Wordmark priority className="brand" />
          <nav className="nav" aria-label="Primary">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={pathname.startsWith(n.href) ? 'page' : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="btn btn--sm header__cta">
            Start a project <Arrow />
          </Link>
          <button
            className="burger"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="menu" className="menu" data-open={open} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile">
          {nav.map((n, i) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} style={{ '--i': i } as React.CSSProperties}>
              {n.label}
              <small>0{i + 1}</small>
            </Link>
          ))}
        </nav>
        <div className="menu__foot">
          <Link href="/contact" className="btn btn--solid" onClick={() => setOpen(false)}>
            Start a project <Arrow />
          </Link>
          <Link href="/faq" className="label">
            FAQ
          </Link>
        </div>
      </div>
    </>
  );
}
