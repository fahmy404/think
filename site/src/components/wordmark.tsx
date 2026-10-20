import Image from 'next/image';
import Link from 'next/link';

export function Wordmark({
  priority = false,
  sizes = '126px',
  className = '',
  home = true,
}: {
  priority?: boolean;
  sizes?: string;
  className?: string;
  home?: boolean;
}) {
  const img = (
    <Image
      src="/brand/think-agency.png"
      alt="THINK Agency"
      width={1432}
      height={363}
      sizes={sizes}
      priority={priority}
    />
  );
  return home ? (
    <Link href="/" className={className} aria-label="THINK Agency, home">
      {img}
    </Link>
  ) : (
    <span className={className}>{img}</span>
  );
}
