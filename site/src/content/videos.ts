export type PortfolioVideo = {
  slug: string;
  client: string;
  title: string;
  src: string;
  poster: string;
};

export const portfolioVideos: PortfolioVideo[] = [
  {
    slug: 'aqua-energy-cfm',
    client: 'CFM',
    title: 'Aqua Energy',
    src: '/videos/aqua-energy-booth.mp4',
    poster: '/videos/posters/aqua-energy.jpg',
  },
  {
    slug: 'egy-stitch-atag',
    client: 'ATAG',
    title: 'EGY Stitch',
    src: '/videos/egystitch-01.mp4',
    poster: '/videos/posters/egystitch-01.jpg',
  },
  {
    slug: 'egy-stitch-02',
    client: 'EGY Stitch',
    title: 'Textile exhibition',
    src: '/videos/egystitch-02.mp4',
    poster: '/videos/posters/egystitch-02.jpg',
  },
  {
    slug: 'egy-stitch-03',
    client: 'EGY Stitch',
    title: 'Textile exhibition',
    src: '/videos/egystitch-03.mp4',
    poster: '/videos/posters/egystitch-03.jpg',
  },
];
