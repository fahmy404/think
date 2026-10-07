import type { Metadata } from 'next';
import { Accordion } from '@/components/accordion';
import { PageHead } from '@/components/page-head';
import { faqs } from '@/content/faqs';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about working with THINK Agency.',
  alternates: { canonical: '/faq' },
};

export default function Faq() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
  return (
    <>
      <PageHead eyebrow="FAQ" title={['Questions']} lede={`Answers about working with ${site.name}.`} />
      <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <Accordion items={faqs} />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
