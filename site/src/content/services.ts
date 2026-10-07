import type { Service, ProcessStep } from './types';

export const services: Service[] = [
  {
    number: '01',
    slug: 'exhibition-stands',
    title: 'Exhibition stands',
    summary: 'Custom-designed exhibition spaces that make your brand easy to notice, explore and remember.',
    capabilities: ['Stand concepts & space planning', 'Custom fabrication', 'On-site installation'],
  },
  {
    number: '02',
    slug: 'conference-partitions',
    title: 'Conference partitions',
    summary: 'Branded partitions and modular environments that give every conversation a place to happen.',
    capabilities: ['Partition design', 'Modular layouts', 'Branded surfaces'],
  },
  {
    number: '03',
    slug: 'event-environments',
    title: 'Event environments',
    summary: 'A considered setting for launches, conferences and corporate events, shaped around your audience.',
    capabilities: ['Guest & audience flow', 'Stage and feature areas', 'Event branding'],
  },
  {
    number: '04',
    slug: 'spatial-design',
    title: 'Spatial design',
    summary: 'From the first floor plan to the final finish, each detail works together as one clear experience.',
    capabilities: ['Space planning', '3D design development', 'Materials and finishes'],
  },
  {
    number: '05',
    slug: 'branding-graphics',
    title: 'Branding & graphics',
    summary: 'Make your identity feel at home in the space, from large-scale graphics to the smallest sign.',
    capabilities: ['Environmental graphics', 'Signage & wayfinding', 'Display details'],
  },
  {
    number: '06',
    slug: 'production-installation',
    title: 'Production & installation',
    summary: 'A single, coordinated path from approved design through build, event setup and dismantling.',
    capabilities: ['Production coordination', 'On-site build & setup', 'Event breakdown'],
  },
];

export const process: ProcessStep[] = [
  { number: '01', title: 'Brief', body: 'We start with your brand, the event, your space and what you want visitors to take away.' },
  { number: '02', title: 'Concept', body: 'We shape the layout and visual direction around your goals, footprint and audience.' },
  { number: '03', title: 'Design', body: 'The selected concept becomes a considered design with clear materials, details and dimensions.' },
  { number: '04', title: 'Build', body: 'Components and graphics are prepared to bring the approved design into the real space.' },
  { number: '05', title: 'Install', body: 'The space is assembled and finished on site, ready for the doors to open.' },
];
