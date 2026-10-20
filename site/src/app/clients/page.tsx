import type { Metadata } from 'next';
import { PageHead } from '@/components/page-head';
import { LogoCloud } from '@/components/logo-cloud';
import { clients } from '@/content/clients';

export const metadata: Metadata = {
  title: 'Trusted brand partners',
  description: 'Meet the organizations that trust THINK to design and deliver branded event environments and spatial experiences.',
  alternates: { canonical: '/clients' },
};

export default function Clients() {
  return (
    <>
      <PageHead
        eyebrow="Our partnerships"
        title={['Trusted brand', 'partners.']}
        lede="Organizations trust THINK to bring their brands to life through considered design and reliable delivery."
      />
      <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <LogoCloud clients={clients} variant="grid" />
      </section>
    </>
  );
}
