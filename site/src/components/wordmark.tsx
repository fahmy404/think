import Image from 'next/image';
import Link from 'next/link';

/**
 * The original THINK wordmark, cropped from the supplied artwork (no redraw).
 * mix-blend-mode: screen lets the artwork's black field merge into the page.
 */
export function Wordmark({
  priority = false,
  sizes = '132px',
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
      src="/brand/wordmark-600.webp"
      alt="THINK Agency"
      width={600}
      height={173}
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
