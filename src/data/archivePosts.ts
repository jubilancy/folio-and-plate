import { ArchivePost, ThemeConfig } from '../types/archive';

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  blogTitle: 'Folio & Plate',
  blogDescription:
    'An archival digital cabinet of vintage book covers, copperplate engravings, and modernist printed ephemera.',
  backgroundColor: '#FAFAFA',
  surfaceColor: '#FFFFFF',
  borderColor: '#E5E5E5',
  textColor: '#141414',
  mutedColor: '#666666',
  tag1: 'book-covers',
  tag2: 'illustrations',
  tag3: 'ephemera',
  aboutPageUrl: '/about',
  aboutLinkLabel: 'About',
  showDescription: true,
  showPostDates: true,
  showTagsOnGrid: true,
};

export const ARCHIVE_POSTS: ArchivePost[] = [
  {
    id: 'post-101',
    type: 'photo',
    date: 'Nov 14, 2026',
    photos: [
      {
        id: 'p-101-1',
        src: '/src/assets/images/cover_bauhaus_typography_1794689735715.jpg',
        alt: 'Die Bühne im Bauhaus modernist book cover printed in black and vermilion ink',
      },
    ],
    firstLineCaption: 'Die Bühne im Bauhaus — 1925',
    fullCaption: {
      title: 'Die Bühne im Bauhaus (Bauhausbücher 4)',
      creator: 'Oskar Schlemmer, László Moholy-Nagy & Farkas Molnár',
      publisherOrOrigin: 'Albert Langen Verlag, Munich',
      year: '1925',
      medium: 'Letterpress wrapper on rag paper, 23.2 × 18.0 cm',
      accessionId: 'FP-1925-004',
      notes:
        'Fourth volume of the Bauhausbücher series featuring constructivist geometric blocking in vermilion and carbon black ink.',
    },
    tags: ['book-covers', 'modernism', 'typography'],
  },
  {
    id: 'post-102',
    type: 'photo',
    date: 'Nov 12, 2026',
    photos: [
      {
        id: 'p-102-1',
        src: '/src/assets/images/plate_botanical_fern_1794689736718.jpg',
        alt: 'Osmunda Regalis copperplate botanical engraving showing fern fronds and rhizome',
      },
    ],
    firstLineCaption: 'Osmunda Regalis (Plate XXXII) — 1848',
    fullCaption: {
      title: 'Osmunda Regalis (Royal Fern), Plate XXXII',
      creator: 'Engraved by John Smith, F.L.S.',
      publisherOrOrigin: 'Royal Botanic Gardens Archive, London',
      year: '1848',
      medium: 'Hand-tinted copperplate engraving on laid cotton paper',
      accessionId: 'FP-1848-032',
      notes:
        'Botanical specimen plate illustrating mature pinnae alongside cross-hatched rhizome and rootlet anatomy.',
    },
    tags: ['illustrations', 'botanical', 'engraving'],
  },
  {
    id: 'post-103',
    type: 'photo',
    date: 'Nov 09, 2026',
    photos: [
      {
        id: 'p-103-1',
        src: '/src/assets/images/ephemera_type_specimen_1794689738224.jpg',
        alt: '1934 Swiss foundry type specimen sheet from Schriftgiesserei AG Bern',
      },
    ],
    firstLineCaption: 'Schriftgiesserei AG Bern Specimen No. 12 — 1934',
    fullCaption: {
      title: 'Typenmuster No. 12: Serifenschriften & Grotesk-Schriften',
      creator: 'Schriftgiesserei AG Bern',
      publisherOrOrigin: 'Bern, Switzerland',
      year: '1934',
      medium: 'Broadsheet letterpress specimen on wove stock',
      accessionId: 'FP-1934-012',
      notes:
        'Foundry broadsheet comparing Helvetia-Antiqua, Bodoni Buch, Akzidenz-Grotesk, and Futura-Schriften across point sizes 6pt to 16pt.',
    },
    tags: ['ephemera', 'typography', 'swiss-print'],
  },
  {
    id: 'post-104',
    type: 'photoset',
    date: 'Nov 06, 2026',
    photos: [
      {
        id: 'p-104-1',
        src: '/src/assets/images/plate_celestial_atlas_1794689738919.jpg',
        alt: '1790 Northern Hemisphere celestial star chart engraving',
        plateLabel: 'Plate I — Hemisphaerii Borealis',
      },
      {
        id: 'p-104-2',
        src: '/src/assets/images/plate_architectural_elevation_1794689742241.jpg',
        alt: '1875 Beaux-Arts architectural ink elevation of New Library Rotunda',
        plateLabel: 'Plate II — Bibliotheca Publicae Elevation',
      },
    ],
    firstLineCaption: 'Two Archival Folio Plates: Celestial & Civic Geometry — 1790 / 1875',
    fullCaption: {
      title: 'Folio Study: Celestial Cartography & Civic Rotunda Elevation',
      creator: 'Anonymous Engraver / Beaux-Arts Atelier',
      publisherOrOrigin: 'Public Domain Print Room Holdings',
      year: '1790 & 1875',
      medium: 'Two-plate set: Copperplate star chart & sepia ink wash on drafting linen',
      accessionId: 'FP-SET-019',
      notes:
        'Stacked folio pairing the 1790 Tabula Selenographica et Uranographica with the 1875 West Elevation for a municipal library rotunda.',
    },
    tags: ['illustrations', 'ephemera', 'cartography'],
  },
  {
    id: 'post-105',
    type: 'photo',
    date: 'Nov 02, 2026',
    photos: [
      {
        id: 'p-105-1',
        src: '/src/assets/images/cover_penguin_classic_1794689737191.jpg',
        alt: '1962 Gallimard Collection Soleil edition cover of Albert Camus La Chute',
      },
    ],
    firstLineCaption: 'Albert Camus, La Chute (Collection Soleil) — 1962',
    fullCaption: {
      title: 'La Chute — Roman (Collection Soleil)',
      creator: 'Albert Camus (Typography by Massin)',
      publisherOrOrigin: 'Éditions Gallimard, Paris',
      year: '1962',
      medium: 'Two-tone clothbound wrapper in Prussian blue and ivory',
      accessionId: 'FP-1962-048',
      notes:
        'Mid-century French paperback grid balancing stark bilateral color division with classic roman titling.',
    },
    tags: ['book-covers', 'literature', 'french-press'],
  },
  {
    id: 'post-106',
    type: 'photo',
    date: 'Oct 28, 2026',
    photos: [
      {
        id: 'p-106-1',
        src: '/src/assets/images/ephemera_exhibition_ticket_1794689738908.jpg',
        alt: '1958 Kunsthalle Zurich Skulptur und Malerei exhibition catalog cover',
      },
    ],
    firstLineCaption: 'Kunsthalle Zürich: Skulptur und Malerei — 1958',
    fullCaption: {
      title: 'Kunsthalle Zürich: Skulptur und Malerei (18. Mai – 22. Juni 1958)',
      creator: 'Swiss Constructivist Exhibition Design',
      publisherOrOrigin: 'Kunsthalle Zürich, Switzerland',
      year: '1958',
      medium: 'Offset lithograph catalog cover on matte cardstock',
      accessionId: 'FP-1958-081',
      notes:
        'Asymmetric vertical column composition pairing muted ochre stripe framing with diagonal geometric woodcut forms.',
    },
    tags: ['ephemera', 'book-covers', 'swiss-print'],
  },
  {
    id: 'post-107',
    type: 'photo',
    date: 'Oct 22, 2026',
    photos: [
      {
        id: 'p-107-1',
        src: '/src/assets/images/cover_japanese_woodblock_1794689739085.jpg',
        alt: '1934 Japanese modernist literary book cover on washi paper with indigo mountain woodblock',
      },
    ],
    firstLineCaption: 'Mountain and Moon (山と月) — 1934',
    fullCaption: {
      title: 'Mountain and Moon (山と月), Literary Monograph Series',
      creator: 'Ken Yanagisawa',
      publisherOrOrigin: 'Showa Era Private Press, Tokyo',
      year: '1934',
      medium: 'Indigo woodblock print on handmade mulberry washi paper',
      accessionId: 'FP-1934-094',
      notes:
        'Early Showa literary wrapper uniting textured deckle-like fiber paper with modernist faceted mountain geometry.',
    },
    tags: ['book-covers', 'woodblock', 'literature'],
  },
  {
    id: 'post-108',
    type: 'photo',
    date: 'Oct 16, 2026',
    photos: [
      {
        id: 'p-108-1',
        src: '/src/assets/images/plate_architectural_elevation_1794689742241.jpg',
        alt: '1875 New Library Rotunda West Elevation ink and wash drawing',
      },
    ],
    firstLineCaption: 'New Library Rotunda, West Elevation — 1875',
    fullCaption: {
      title: 'New Library Rotunda: West Elevation (Bibliotheca Publicae)',
      creator: 'Office of Municipal Architects',
      publisherOrOrigin: 'Architectural Archive, November 12, 1875',
      year: '1875',
      medium: 'India ink and sepia wash on cream drafting paper',
      accessionId: 'FP-1875-112',
      notes:
        'Presentation elevation detailing Corinthian portico proportions, pediment sculpture, and 100-foot architectural scale bar.',
    },
    tags: ['illustrations', 'architecture'],
  },
  {
    id: 'post-109',
    type: 'photo',
    date: 'Oct 10, 2026',
    photos: [
      {
        id: 'p-109-1',
        src: '/src/assets/images/plate_celestial_atlas_1794689738919.jpg',
        alt: '1790 Tabula Selenographica et Uranographica star chart engraving',
      },
    ],
    firstLineCaption: 'Tabula Selenographica et Uranographica — 1790',
    fullCaption: {
      title: 'Tabula Selenographica et Uranographica Hemisphaerii Borealis',
      creator: 'Ex Archivo Astronomico',
      publisherOrOrigin: 'Nuremberg Celestial Press',
      year: '1790',
      medium: 'Copperplate engraving on heavy rag stock',
      accessionId: 'FP-1790-007',
      notes:
        'Polar projection chart delineating Draco, Ursa Major, Cygnus, and ecliptic graduations with stellar magnitude key.',
    },
    tags: ['illustrations', 'cartography', 'ephemera'],
  },
];
