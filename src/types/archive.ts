export interface ArchivePhoto {
  id: string;
  src: string;
  alt: string;
  plateLabel?: string;
}

export interface ArchivePost {
  id: string;
  type: 'photo' | 'photoset';
  date: string;
  photos: ArchivePhoto[];
  /** First line shown on the main masonry grid card */
  firstLineCaption: string;
  /** Full archival metadata shown inside the lightbox and permalink view */
  fullCaption: {
    title: string;
    creator: string;
    publisherOrOrigin: string;
    year: string;
    medium: string;
    accessionId: string;
    notes: string;
  };
  tags: string[];
  liked?: boolean;
  reblogged?: boolean;
}

export interface ThemeConfig {
  blogTitle: string;
  blogDescription: string;
  backgroundColor: string;
  surfaceColor: string;
  borderColor: string;
  textColor: string;
  mutedColor: string;
  tag1: string;
  tag2: string;
  tag3: string;
  aboutPageUrl: string;
  aboutLinkLabel: string;
  showDescription: boolean;
  showPostDates: boolean;
  showTagsOnGrid: boolean;
}

export type ActiveRoute = 'gallery' | 'about';
