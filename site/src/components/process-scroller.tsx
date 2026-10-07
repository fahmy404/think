'use client';

import { useEffect, useRef, useState } from 'react';
import type { ProcessStep } from '@/content/types';

/** Scroll storytelling: the step nearest the viewport centre becomes active. */
export function ProcessScroller({ steps }: { steps: ProcessStep[] }) {
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLLIElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLLIElement));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const progress = ((active + 1) / steps.length) * 100;

  return (
    <div className="process">
      <div className="process__sticky">
        <div className="process__aside">
          <p className="eyebrow">Approach</p>
          <p className="lede" style={{ marginTop: 28 }}>
            From first conversation to final delivery.
          </p>
          <div className="process__rail" style={{ '--p': `${progress}%` } as React.CSSProperties} aria-hidden="true">
            <i />
          </div>
          <p className="num" style={{ marginTop: 16 }} aria-live="polite">
            {steps[active].number} / {String(steps.length).padStart(2, '0')}
          </p>
        </div>
        <ol className="process__list">
          {steps.map((s, i) => (
            <li
              key={s.number}
              className="pstep"
              data-active={active === i}
              ref={(el) => {
                refs.current[i] = el;
              }}
            >
              <span className="num">{s.number}</span>
              <h3 className="pstep__title">{s.title}</h3>
              <p className="pstep__body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
