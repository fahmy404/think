import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { projects } from '@/content/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/work', '/services', '/about', '/contact', '/faq'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.7 })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, changeFrequency: 'yearly' as const, priority: 0.6 })),
  ];
}
