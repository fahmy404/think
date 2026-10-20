import type { Social } from './types';

/**
 * CENTRAL SITE CONFIG. Edit here; nothing is hard-coded in components.
 * Every value marked TODO is a placeholder and is displayed as such on the site
 * until a real value is supplied.
 */
export const site = {
  name: 'THINK AGENCY',
  shortName: 'THINK',
  /** TODO: set the real production domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  description:
    'Founded in 2015, THINK designs and delivers exhibition stands, conference environments and branded event spaces—from first concept through on-site installation.',
  positioning: 'Spaces that move brands forward.',
  locale: 'en',
} as const;

export const contact: { email: string; phone: string; address: string } = {
  /** TODO: supply official contact details. Leave empty to show an editable placeholder. */
  email: '',
  phone: '',
  address: '',
};

/** ONLY add platforms with official URLs. Empty array hides all social icons. */
export const socials: Social[] = [
  // { platform: 'instagram', label: 'Instagram', href: 'https://...' },
];

export const nav = [
  { label: 'Spaces', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerNav = [
  ...nav,
  { label: 'FAQ', href: '/faq' },
] as const;

export const legal = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
] as const;
