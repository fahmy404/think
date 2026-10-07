export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
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
  year: string;
  cover: ImageAsset;
  summary?: string;
  challenge?: string;
  approach?: string;
  execution?: string;
  outcome?: string;
  gallery?: ImageAsset[];
};

export type Client = {
  name: string;
  /** Path to the OFFICIAL logo file under /public/clients. Monochrome treatment is applied in CSS. */
  logo?: ImageAsset;
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
