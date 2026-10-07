import type { Project } from './types';

/**
 * REAL PROJECTS ONLY. The array is intentionally empty until the company supplies
 * projects. The home page and Spaces gallery populate automatically from this list.
 *
 * Example entry (do not enable with invented data):
 * {
 *   slug: 'project-slug',
 *   name: 'Project Name',
 *   client: 'Client Name',
 *   category: 'Exhibition stands',
  *   year: '2025',
  *   cover: { src: '/projects/project-slug/cover.jpg', alt: '...', width: 2400, height: 1600 },
 * }
 */
export const projects: Project[] = [];
