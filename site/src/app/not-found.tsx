import Link from 'next/link';
import { Arrow } from '@/components/icons';
import { PageHead } from '@/components/page-head';

export default function NotFound() {
  return (
    <>
      <PageHead eyebrow="404" title={['Page not', 'found']} />
      <div className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <Link href="/" className="link">Back to home <Arrow /></Link>
      </div>
    </>
  );
}
