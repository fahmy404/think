export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type VideoAsset = {
  src: string;
  poster: ImageAsset;
};

export type Project = {
  slug: string;
  name: string;
  client: string;
  category:
    | 'Exhibition stands'
    | 'Conference partitions'
    | 'Event environments'
    | 'Spatial design'
    | 'Branding & graphics'
    | 'Production & installation';
  year?: string;
  cover: ImageAsset;
  /** Optional muted looping reel. Keep the poster image as the fast-loading fallback. */
  video?: VideoAsset;
  summary?: string;
  challenge?: string;
  approach?: string;
  execution?: string;
  outcome?: string;
  gallery?: ImageAsset[];
};

export type Client = {
  name: string;
  /** Preserve the logo's original colors and choose a tile that gives it contrast. */
  tone: 'light' | 'dark';
  /** Optional zoom for files that include extra transparent canvas around the mark. */
  scale?: number;
  logo: ImageAsset;
};

export type Service = {
  number: string;
  slug: string;
  title: string;
  summary: string;
  capabilities: string[];
};

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Social = {
  platform: 'instagram' | 'facebook' | 'linkedin' | 'tiktok' | 'youtube';
  label: string;
  href: string;
};
