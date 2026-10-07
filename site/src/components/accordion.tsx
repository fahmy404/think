'use client';

import { useId, useState } from 'react';
import type { Faq } from '@/content/types';

export function Accordion({ items }: { items: Faq[] }) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="acc">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div className="acc__item" key={it.question}>
            <h3>
              <button
                className="acc__btn"
                aria-expanded={isOpen}
                aria-controls={`${base}-p${i}`}
                id={`${base}-b${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{it.question}</span>
                <span className="plus" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="acc__panel"
              id={`${base}-p${i}`}
              role="region"
              aria-labelledby={`${base}-b${i}`}
              data-open={isOpen}
            >
              <div>
                <p>{it.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
