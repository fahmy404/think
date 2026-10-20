import Image from 'next/image';
import type { Client } from '@/content/types';

type LogoCloudProps = {
  clients: Client[];
  variant?: 'strip' | 'grid';
};

export function LogoCloud({ clients, variant = 'grid' }: LogoCloudProps) {
  return (
    <ul className={`logo-cloud logo-cloud--${variant}`}>
      {clients.map((client, index) => (
        <li
          className="logo-cloud__item"
          data-tone={client.tone}
          key={client.name}
          style={{
            '--logo-index': index,
            '--logo-scale': client.scale ?? 1,
            '--logo-scale-strip': client.scale ? 1.8 : 1,
          } as React.CSSProperties}
        >
          <div className="logo-cloud__mark">
            <Image
              src={client.logo.src}
              alt={client.logo.alt}
              width={client.logo.width}
              height={client.logo.height}
              sizes={variant === 'grid' ? '(min-width: 900px) 20vw, 42vw' : '(min-width: 900px) 14vw, 40vw'}
              loading="lazy"
            />
          </div>
          {variant === 'grid' && <span className="logo-cloud__name">{client.name}</span>}
        </li>
      ))}
    </ul>
  );
}
