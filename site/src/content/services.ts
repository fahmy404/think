import type { Service, ProcessStep } from './types';

export const services: Service[] = [
  {
    number: '01',
    slug: 'exhibition-stands',
    title: 'Exhibition stands',
    summary: 'Custom exhibition stands designed to express your brand, engage visitors and make the most of every square metre.',
    capabilities: ['Concept & 3D design', 'Custom build & finishes', 'Venue delivery & installation'],
  },
  {
    number: '02',
    slug: 'conference-partitions',
    title: 'Conference environments',
    summary: 'Branded partitions and meeting environments that bring structure, comfort and a clear sense of identity to the venue.',
    capabilities: ['Partition & meeting-area design', 'Flexible space planning', 'Branded finishes'],
  },
  {
    number: '03',
    slug: 'event-environments',
    title: 'Event management',
    summary: 'End-to-end event planning and delivery, aligned with your objectives and designed to make every detail feel considered.',
    capabilities: ['Venue & logistics coordination', 'Set-up, registration & event branding', 'Promotion, coverage & post-event evaluation'],
  },
  {
    number: '04',
    slug: 'spatial-design',
    title: 'Spatial design & planning',
    summary: 'We turn the brief, footprint and visitor journey into a coherent spatial concept, down to the details that bring it together.',
    capabilities: ['Space planning', '3D design development', 'Materials & finishes'],
  },
  {
    number: '05',
    slug: 'branding-graphics',
    title: 'Environmental branding & activations',
    summary: 'Extend your identity across the event space with clear graphics, purposeful signage and in-person brand experiences.',
    capabilities: ['Environmental graphics & wayfinding', 'Roadshows & product sampling', 'Branded displays & in-person activations'],
  },
  {
    number: '06',
    slug: 'production-installation',
    title: 'Print, production & installation',
    summary: 'A coordinated route from approved artwork to finished, event-ready spaces and branded materials.',
    capabilities: ['Digital & offset printing', 'Roll-ups, backdrops, signage & display materials', 'On-site build, installation & dismantling'],
  },
  {
    number: '07',
    slug: 'branded-giveaways',
    title: 'Branded merchandise & giveaways',
    summary: 'Useful, on-brand giveaways that help your message travel beyond the event and stay with your audience.',
    capabilities: ['Curated promotional items', 'Custom and tailored products', 'Design, sourcing & production'],
  },
];

export const process: ProcessStep[] = [
  { number: '01', title: 'Align', body: 'We get clear on the brief, audience, venue, timeline and what success should look like.' },
  { number: '02', title: 'Imagine', body: 'We shape a spatial concept and visitor journey that put your objectives and identity at the centre.' },
  { number: '03', title: 'Design', body: 'We develop the selected direction into a detailed, buildable design with materials and finishes.' },
  { number: '04', title: 'Produce', body: 'The approved design moves into coordinated production, ready to come together at the venue.' },
  { number: '05', title: 'Deliver', body: 'The space is installed and finished on site, ready to welcome your audience.' },
];
