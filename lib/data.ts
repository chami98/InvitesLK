/**
 * Mock wedding invitation data: 10 visual templates + couple records keyed by slug.
 */

export type WeddingTheme = {
  templateId: number;
  name: string;
  colors: {
    background: string;
    foreground: string;
    accent: string;
    muted: string;
    surface?: string;
    border?: string;
  };
  fonts: {
    /** CSS variable name on <html>, e.g. `--font-playfair` */
    headingVar: string;
    bodyVar: string;
  };
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type AgendaItem = {
  /** Display time, e.g. "2:30 PM" */
  time: string;
  title: string;
  description?: string;
  /** Optional room / area (defaults to main venue when omitted in UI). */
  location?: string;
};

export type CoupleInvite = {
  slug: string;
  partnerA: string;
  partnerB: string;
  date: string;
  venue: string;
  templateId: number;
  /** Curated placeholder photos (replace with your own). */
  gallery: GalleryImage[];
  /** Wedding day timeline. */
  agenda: AgendaItem[];
};

/** Stock wedding photography for demos — rotate by offset so each couple feels unique. */
const WEDDING_PHOTOS: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
    alt: "Bride and groom walking together",
    caption: "Walking into forever",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&q=80",
    alt: "Wedding rings and flowers",
    caption: "Details that tell our story",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600&q=80",
    alt: "Couple embracing outdoors",
    caption: "Golden hour, golden hearts",
  },
  {
    src: "https://images.unsplash.com/photo-1606800052052-a08cfe714f87?w=1600&q=80",
    alt: "Wedding reception tables",
    caption: "Where we'll celebrate with you",
  },
  {
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1600&q=80",
    alt: "Bouquet close-up",
    caption: "Blooms for the big day",
  },
  {
    src: "https://images.unsplash.com/photo-1529636799528-921f0e0e1a0d?w=1600&q=80",
    alt: "First dance",
    caption: "Our first dance",
  },
  {
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1600&q=80",
    alt: "Champagne toast",
    caption: "Cheers to love",
  },
  {
    src: "https://images.unsplash.com/photo-1609561216330-c4b0b6f3e0c0?w=1600&q=80",
    alt: "Outdoor ceremony arch",
    caption: "Under open skies",
  },
  {
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&q=80",
    alt: "Wedding party celebration",
    caption: "Surrounded by our people",
  },
  {
    src: "https://images.unsplash.com/photo-1520854221050-0f4caff4492f?w=1600&q=80",
    alt: "Couple holding hands",
    caption: "Hand in hand",
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=80",
    alt: "Couple laughing",
    caption: "Joy, unfiltered",
  },
  {
    src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1600&q=80",
    alt: "Evening reception lights",
    caption: "Lights, love, laughter",
  },
  {
    src: "https://images.unsplash.com/photo-1515934751635-c81c6bc18438?w=1600&q=80",
    alt: "Wedding aisle view",
    caption: "Down the aisle",
  },
  {
    src: "https://images.unsplash.com/photo-1524778059297-7b931381c08f?w=1600&q=80",
    alt: "Bridal bouquet detail",
    caption: "Soft petals & promises",
  },
  {
    src: "https://images.unsplash.com/photo-1530023367847-a683933f4177?w=1600&q=80",
    alt: "Couple sunset silhouette",
    caption: "Sunset with you",
  },
  {
    src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=1600&q=80",
    alt: "Wedding signage",
    caption: "This way to forever",
  },
  {
    src: "https://images.unsplash.com/photo-1594443143921-c7d8e26d867c?w=1600&q=80",
    alt: "Table setting candles",
    caption: "Candlelit dinner",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80",
    alt: "Groom attire detail",
    caption: "Classic & sharp",
  },
  {
    src: "https://images.unsplash.com/photo-1523438885200-e635ba2c175e?w=1600&q=80",
    alt: "Confetti celebration",
    caption: "And they cheered",
  },
  {
    src: "https://images.unsplash.com/photo-1583938909119-ff732a8e9672?w=1600&q=80",
    alt: "Outdoor garden vows",
    caption: "Among the greenery",
  },
];

function pickGallery(offset: number): GalleryImage[] {
  const n = WEDDING_PHOTOS.length;
  return Array.from({ length: 8 }, (_, i) => {
    const p = WEDDING_PHOTOS[(offset + i) % n];
    return { ...p };
  });
}

// ─── Agenda builders ─────────────────────────────────────────────────────────

/** Sinhala Buddhist Poruwa ceremony — morning rites + evening reception */
function buildPoruwaAgenda(venue: string): AgendaItem[] {
  return [
    {
      time: "9:00 AM",
      title: "Guest arrival & welcome",
      description:
        "Arrive to the sound of traditional Kandyan drumming and a warm reception by both families.",
      location: venue,
    },
    {
      time: "10:15 AM",
      title: "Poruwa ceremony",
      description:
        "The auspicious nekath time — the couple exchange vows on the beautifully decorated Poruwa platform.",
    },
    {
      time: "11:00 AM",
      title: "Oil lamp & kiribath",
      description:
        "Lighting of the traditional oil lamp, binding of fingers with golden thread, and the milk rice ritual.",
    },
    {
      time: "12:00 PM",
      title: "Traditional luncheon",
      description:
        "A sumptuous Sri Lankan feast — rice and curry, kiribath, kavum, kokis, and traditional sweets.",
      location: "Banquet hall",
    },
    {
      time: "6:00 PM",
      title: "Evening reception",
      description:
        "Welcome back for cocktails, speeches, and the couple's grand entrance into the evening.",
      location: venue,
    },
    {
      time: "7:30 PM",
      title: "Dinner & cake cutting",
      description:
        "Sit-down dinner service followed by the ceremonial cake cutting and first dance.",
    },
    {
      time: "9:30 PM",
      title: "Dancing & celebration",
      description: "Live music, dancing, and a night to remember — stay as long as you like.",
    },
  ];
}

/** Grand hotel Sinhala wedding with homecoming */
function buildGrandPoruwaAgenda(venue: string): AgendaItem[] {
  return [
    {
      time: "9:30 AM",
      title: "Guest arrival",
      description:
        "Be welcomed with Kandyan drumming, Ves dancers, and garlands of jasmine and lotus.",
      location: venue,
    },
    {
      time: "10:30 AM",
      title: "Poruwa ceremony",
      description:
        "The sacred Poruwa ceremony at the auspicious time, conducted by the Kapuwa with chanting and ritual.",
    },
    {
      time: "11:15 AM",
      title: "Blessings & kiribath",
      description:
        "Oil lamp lighting, gold thread binding, kiribath cutting, and blessings showered by both families.",
    },
    {
      time: "1:00 PM",
      title: "Grand luncheon",
      description:
        "A lavish Sri Lankan buffet — a culinary journey from the coast to the hill country.",
      location: "Crystal ballroom",
    },
    {
      time: "4:00 PM",
      title: "Homecoming ceremony",
      description:
        "The bride is welcomed into her new home with traditional rituals, candles, and heartfelt blessings.",
    },
    {
      time: "7:00 PM",
      title: "Evening reception",
      description: "Cocktails, toasts, and the couple's first dance to open the grand evening.",
      location: "Grand terrace",
    },
    {
      time: "8:00 PM",
      title: "Dinner & entertainment",
      description: "Gourmet dinner service, live orchestra, and the ceremonial cake cutting.",
    },
    {
      time: "10:00 PM",
      title: "Dancing & celebration",
      description: "Live DJ set — the night is just beginning.",
    },
  ];
}

/** Kandyan hill-country wedding */
function buildKandyanAgenda(venue: string): AgendaItem[] {
  return [
    {
      time: "9:00 AM",
      title: "Arrival at the hills",
      description:
        "Welcome to Kandy — arrive to Kandyan drumming, Ves dancers, and fresh king coconut.",
      location: venue,
    },
    {
      time: "10:00 AM",
      title: "Kandyan Poruwa ceremony",
      description:
        "The couple exchange vows on the Poruwa amid traditional music, chanting, and incense.",
    },
    {
      time: "11:00 AM",
      title: "Oil lamp & kiribath",
      description:
        "Lighting of the oil lamp, gold thread ceremony, and cutting of kiribath — a sweet start.",
    },
    {
      time: "12:30 PM",
      title: "Traditional luncheon",
      description:
        "Authentic Kandyan cuisine — rice and curry, pol sambol, and an array of traditional sweetmeats.",
      location: "Garden pavilion",
    },
    {
      time: "5:30 PM",
      title: "Sunset cocktails",
      description:
        "Watch the sun dip over the misty hills with drinks on the upper terrace.",
      location: "Hilltop terrace",
    },
    {
      time: "7:00 PM",
      title: "Evening reception & dinner",
      description:
        "Candlelit dinner with Kandyan cultural performances and live acoustic music.",
    },
    {
      time: "9:30 PM",
      title: "Celebration & dancing",
      description: "Dance under the stars with the cool hill-country breeze all around you.",
    },
  ];
}

/** Hindu Tamil Thali ceremony */
function buildHinduAgenda(venue: string): AgendaItem[] {
  return [
    {
      time: "7:30 AM",
      title: "Nalangu ceremony",
      description:
        "A joyful pre-wedding ritual with turmeric, playful songs, and traditions between the two families.",
      location: venue,
    },
    {
      time: "10:00 AM",
      title: "Thali ceremony",
      description:
        "The sacred tying of the Thali (mangalsutra) at the auspicious muhurtham time.",
    },
    {
      time: "11:30 AM",
      title: "Saptapadi — seven steps",
      description:
        "The couple walk seven steps together, each step a sacred vow and shared promise for life.",
    },
    {
      time: "12:30 PM",
      title: "Wedding luncheon",
      description:
        "Traditional banana-leaf lunch — a feast of rice, curries, rasam, and payasam.",
      location: "Dining pavilion",
    },
    {
      time: "6:00 PM",
      title: "Evening reception",
      description:
        "An elegant evening celebration for family, friends, and colleagues.",
      location: venue,
    },
    {
      time: "7:30 PM",
      title: "Dinner & cultural programme",
      description:
        "Dinner service with classical Carnatic music and a Bharatanatyam performance.",
    },
    {
      time: "9:30 PM",
      title: "Dancing & farewell",
      description: "Celebrate into the night — Kollywood hits and timeless classics.",
    },
  ];
}

/** Western evening ceremony */
function buildEveningAgenda(venue: string): AgendaItem[] {
  return [
    {
      time: "3:00 PM",
      title: "Guest arrival",
      description: "Arrive and be seated — welcome drinks and canapés are on us.",
      location: venue,
    },
    {
      time: "3:30 PM",
      title: "Wedding ceremony",
      description: "The ceremony begins — exchange of vows, rings, and the first kiss.",
    },
    {
      time: "4:15 PM",
      title: "Cocktail hour & photos",
      description:
        "Mingle on the terrace while we capture the memories of the day.",
      location: "Terrace garden",
    },
    {
      time: "6:30 PM",
      title: "Reception dinner",
      description:
        "Doors open for the dinner reception — find your name at your table.",
      location: "Grand ballroom",
    },
    {
      time: "8:00 PM",
      title: "Speeches & cake cutting",
      description:
        "Heartfelt words from family and friends, followed by the ceremonial cake.",
    },
    {
      time: "9:00 PM",
      title: "Dancing & celebration",
      description: "The dance floor is yours — celebrate until midnight.",
    },
  ];
}

/** Galle/coastal Sri Lankan wedding */
function buildCoastalAgenda(venue: string): AgendaItem[] {
  return [
    {
      time: "9:00 AM",
      title: "Morning arrival",
      description:
        "Arrive at the coast — sea breeze, frangipani garlands, and a warm welcome awaiting.",
      location: venue,
    },
    {
      time: "10:00 AM",
      title: "Poruwa ceremony",
      description:
        "An intimate Poruwa ceremony overlooking the Indian Ocean at the auspicious time.",
    },
    {
      time: "11:00 AM",
      title: "Blessings & kiribath",
      description:
        "Oil lamp, gold thread, and kiribath ceremony with both families gathered close.",
    },
    {
      time: "12:30 PM",
      title: "Seaside luncheon",
      description:
        "A fresh seafood and Sri Lankan buffet feast with ocean views — a feast for all senses.",
      location: "Beachside pavilion",
    },
    {
      time: "5:00 PM",
      title: "Sunset hour",
      description:
        "Gather on the beach as the sun melts into the horizon — a golden moment to share.",
      location: "Beach terrace",
    },
    {
      time: "7:00 PM",
      title: "Evening reception & dinner",
      description:
        "Candlelit dinner on the terrace with the sound of the ocean and live guitar.",
    },
    {
      time: "9:30 PM",
      title: "Celebration & dancing",
      description: "Dance barefoot on the beach — a night you'll never forget.",
    },
  ];
}

/** Minimal modern Sri Lankan wedding */
function buildModernAgenda(venue: string): AgendaItem[] {
  return [
    {
      time: "3:30 PM",
      title: "Guest arrival",
      description: "Arrive to a welcome cocktail and soft acoustic background music.",
      location: venue,
    },
    {
      time: "4:00 PM",
      title: "Ceremony",
      description:
        "A contemporary ceremony blending modern vows with a touch of traditional Sri Lankan ritual.",
    },
    {
      time: "4:45 PM",
      title: "Cocktail hour",
      description: "Light bites, photography, and catching up with loved ones.",
      location: "Lounge terrace",
    },
    {
      time: "6:30 PM",
      title: "Reception dinner",
      description:
        "An intimate sit-down dinner — modern Sri Lankan cuisine with a global twist.",
      location: "Private dining room",
    },
    {
      time: "8:00 PM",
      title: "Cake & speeches",
      description: "A short programme of toasts, the ceremonial cake, and the first dance.",
    },
    {
      time: "9:00 PM",
      title: "Dancing",
      description: "The rest of the evening is yours — dance, laugh, and celebrate.",
    },
  ];
}

// ─── Templates ───────────────────────────────────────────────────────────────

export const WEDDING_TEMPLATES: Record<number, WeddingTheme> = {
  1: {
    templateId: 1,
    name: "Classic",
    colors: {
      background: "#faf8f5",
      foreground: "#1c1917",
      accent: "#b8860b",
      muted: "#78716c",
      surface: "#fffefb",
      border: "#d4af37",
    },
    fonts: { headingVar: "--font-playfair", bodyVar: "--font-lora" },
  },
  2: {
    templateId: 2,
    name: "Modern",
    colors: {
      background: "#fafafa",
      foreground: "#0a0a0a",
      accent: "#404040",
      muted: "#737373",
      surface: "#ffffff",
      border: "#e5e5e5",
    },
    fonts: { headingVar: "--font-inter", bodyVar: "--font-inter" },
  },
  3: {
    templateId: 3,
    name: "Floral",
    colors: {
      background: "#fdf2f8",
      foreground: "#831843",
      accent: "#be185d",
      muted: "#9d174d",
      surface: "#fff1f2",
      border: "#fbcfe8",
    },
    fonts: { headingVar: "--font-great-vibes", bodyVar: "--font-cormorant" },
  },
  4: {
    templateId: 4,
    name: "Art Deco",
    colors: {
      background: "#0c0a09",
      foreground: "#fafaf9",
      accent: "#d4af37",
      muted: "#a8a29e",
      surface: "#1c1917",
      border: "#d4af37",
    },
    fonts: { headingVar: "--font-cinzel", bodyVar: "--font-jost" },
  },
  5: {
    templateId: 5,
    name: "Rustic",
    colors: {
      background: "#f5f0e6",
      foreground: "#422006",
      accent: "#92400e",
      muted: "#78350f",
      surface: "#fef3c7",
      border: "#a16207",
    },
    fonts: { headingVar: "--font-libre-baskerville", bodyVar: "--font-caveat" },
  },
  6: {
    templateId: 6,
    name: "Ocean",
    colors: {
      background: "#f0f9ff",
      foreground: "#0c4a6e",
      accent: "#0284c7",
      muted: "#0369a1",
      surface: "#e0f2fe",
      border: "#7dd3fc",
    },
    fonts: { headingVar: "--font-outfit", bodyVar: "--font-dm-sans" },
  },
  7: {
    templateId: 7,
    name: "Sunset",
    colors: {
      background: "#fff7ed",
      foreground: "#431407",
      accent: "#ea580c",
      muted: "#9a3412",
      surface: "#ffedd5",
      border: "#fdba74",
    },
    fonts: { headingVar: "--font-fraunces", bodyVar: "--font-nunito" },
  },
  8: {
    templateId: 8,
    name: "Royal",
    colors: {
      background: "#1e1b4b",
      foreground: "#e0e7ff",
      accent: "#c4b5fd",
      muted: "#a5b4fc",
      surface: "#312e81",
      border: "#818cf8",
    },
    fonts: { headingVar: "--font-cormorant", bodyVar: "--font-italiana" },
  },
  9: {
    templateId: 9,
    name: "Minimal Luxe",
    colors: {
      background: "#fafafa",
      foreground: "#171717",
      accent: "#525252",
      muted: "#737373",
      surface: "#ffffff",
      border: "#d4d4d4",
    },
    fonts: { headingVar: "--font-syne", bodyVar: "--font-dm-sans" },
  },
  10: {
    templateId: 10,
    name: "Garden",
    colors: {
      background: "#f0fdf4",
      foreground: "#14532d",
      accent: "#15803d",
      muted: "#166534",
      surface: "#dcfce7",
      border: "#86efac",
    },
    fonts: { headingVar: "--font-lora", bodyVar: "--font-parisienne" },
  },
};

// ─── Couples ─────────────────────────────────────────────────────────────────

export const MOCK_COUPLES: CoupleInvite[] = [
  {
    slug: "supun-thilini",
    partnerA: "Supun",
    partnerB: "Thilini",
    date: "Saturday, June 14, 2026",
    venue: "Galadari Hotel, Colombo",
    templateId: 1,
    gallery: pickGallery(0),
    agenda: buildPoruwaAgenda("Galadari Hotel, Colombo"),
  },
  {
    slug: "kasun-dilrukshi",
    partnerA: "Kasun",
    partnerB: "Dilrukshi",
    date: "Saturday, August 8, 2026",
    venue: "Cinnamon Grand, Colombo",
    templateId: 2,
    gallery: pickGallery(2),
    agenda: buildModernAgenda("Cinnamon Grand, Colombo"),
  },
  {
    slug: "nayomi-shevan",
    partnerA: "Nayomi",
    partnerB: "Shevan",
    date: "Sunday, September 20, 2026",
    venue: "Hotel Janro, Dompe",
    templateId: 3,
    gallery: pickGallery(4),
    agenda: buildPoruwaAgenda("Hotel Janro, Dompe"),
  },
  {
    slug: "nuwan-sachini",
    partnerA: "Nuwan",
    partnerB: "Sachini",
    date: "Saturday, October 10, 2026",
    venue: "Earl's Regency, Kandy",
    templateId: 4,
    gallery: pickGallery(1),
    agenda: buildKandyanAgenda("Earl's Regency, Kandy"),
  },
  {
    slug: "ishara-chamara",
    partnerA: "Ishara",
    partnerB: "Chamara",
    date: "Sunday, May 3, 2026",
    venue: "Heritance Kandalama, Dambulla",
    templateId: 5,
    gallery: pickGallery(5),
    agenda: buildKandyanAgenda("Heritance Kandalama, Dambulla"),
  },
  {
    slug: "dinesh-priyanka",
    partnerA: "Dinesh",
    partnerB: "Priyanka",
    date: "Saturday, July 18, 2026",
    venue: "Jetwing Lighthouse, Galle",
    templateId: 6,
    gallery: pickGallery(3),
    agenda: buildCoastalAgenda("Jetwing Lighthouse, Galle"),
  },
  {
    slug: "roshan-hansika",
    partnerA: "Roshan",
    partnerB: "Hansika",
    date: "Friday, November 6, 2026",
    venue: "Mount Lavinia Hotel, Colombo",
    templateId: 7,
    gallery: pickGallery(6),
    agenda: buildPoruwaAgenda("Mount Lavinia Hotel, Colombo"),
  },
  {
    slug: "asela-manasha",
    partnerA: "Asela",
    partnerB: "Manasha",
    date: "Saturday, December 19, 2026",
    venue: "Shangri-La, Colombo",
    templateId: 8,
    gallery: pickGallery(7),
    agenda: buildGrandPoruwaAgenda("Shangri-La, Colombo"),
  },
  {
    slug: "tharaka-sandali",
    partnerA: "Tharaka",
    partnerB: "Sandali",
    date: "Sunday, April 12, 2026",
    venue: "Waters Edge, Battaramulla",
    templateId: 9,
    gallery: pickGallery(8),
    agenda: buildEveningAgenda("Waters Edge, Battaramulla"),
  },
  {
    slug: "pasan-hiruni",
    partnerA: "Pasan",
    partnerB: "Hiruni",
    date: "Saturday, February 28, 2026",
    venue: "Amaya Hills, Kandy",
    templateId: 10,
    gallery: pickGallery(9),
    agenda: buildKandyanAgenda("Amaya Hills, Kandy"),
  },
];

const slugMap = new Map(MOCK_COUPLES.map((c) => [c.slug, c]));

export function getCoupleBySlug(slug: string): CoupleInvite | undefined {
  return slugMap.get(slug);
}

export function getThemeForTemplateId(id: number): WeddingTheme | undefined {
  return WEDDING_TEMPLATES[id];
}

/** Safely decode invitee name from query (handles %20, +, unicode). */
export function decodeInviteParam(raw: string | string[] | undefined): string {
  if (raw === undefined) return "Guest";
  const first = Array.isArray(raw) ? raw[0] : raw;
  if (!first || first.trim() === "") return "Guest";
  try {
    return decodeURIComponent(first.replace(/\+/g, " "));
  } catch {
    return first.replace(/\+/g, " ");
  }
}
