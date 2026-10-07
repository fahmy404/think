'use client';

import { useEffect, useRef, type ReactNode, type ElementType } from 'react';

/** Marks itself data-in="true" once scrolled into view. Drives .reveal and .lines. */
export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  once = true,
  id,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  once?: boolean;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.in = 'true';
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.in = 'true';
          if (once) io.disconnect();
        } else if (!once) el.dataset.in = 'false';
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${className}`}
      style={{ '--d': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Line-by-line headline reveal. Pass each visual line as an array item. */
export function Lines({
  lines,
  as: Tag = 'span',
  className = '',
  delay = 0,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.in = 'true';
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.in = 'true';
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`lines ${className}`}
      style={{ '--d': `${delay}ms` } as React.CSSProperties}
    >
      {lines.map((l, i) => (
        <span className="line" key={i} style={{ '--i': i } as React.CSSProperties}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
