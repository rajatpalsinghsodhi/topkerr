export type LocationSlug = "kerr" | "preserve" | "bronte";

export type ShopLocation = {
  slug: LocationSlug;
  name: string;
  neighborhoodLabel: string;
  addressLine1: string;
  addressLine2: string;
  phone?: string;
  hours: { label: string; value: string }[];
  bookingUrl: string;
  googleMapsQuery: string;
  parkingNote?: string;
};

export type SocialEmbed = {
  provider: "instagram" | "tiktok";
  url: string;
  label: string;
};

export type SocialVideo = {
  src: string; // public/ path (e.g. /social/clip-1.mp4)
  poster?: string; // public/ path (optional)
  label: string;
};

export type Testimonial = {
  name: string;
  sourceLabel: string;
  sourceUrl: string;
  quote: string;
};

export type Barber = {
  id: string;
  name: string;
  title: string;
  locationSlug: LocationSlug;
  bio?: string;
};

export const brand = {
  name: "Top Tier",
  tagline: "Fades & Kicks",
  /** 512×171 PNG — use in header, footer, OG */
  logo: {
    src: "/brand/toptier-logo.png",
    alt: "Top Tier Fades & Kicks",
    width: 512,
    height: 171,
  } as const,
  city: "Oakville",
  province: "ON",
  hero: {
    headline: "Clean fades. Sharp details. Oakville.",
    subhead:
      "Precision cuts, beard work, and a premium shop vibe. Choose your location and book in seconds.",
  },
  socials: {
    instagram: "https://www.instagram.com/toptiercompany/",
    tiktok: "https://www.tiktok.com/@toptiercompany",
  },
};

export const locations: ShopLocation[] = [
  {
    slug: "kerr",
    name: "Kerr",
    neighborhoodLabel: "Kerr Village",
    addressLine1: "143 Kerr St",
    addressLine2: "Oakville, ON L6K 3A6",
    phone: "+1 (905) 338-2260",
    hours: [
      { label: "Mon–Sat", value: "10:00 AM – 8:00 PM" },
      { label: "Sun", value: "10:00 AM – 6:00 PM" },
    ],
    bookingUrl: "https://toptiercompany.ca/shops/",
    googleMapsQuery: "143 Kerr St, Oakville, ON L6K 3A6",
    parkingNote: "Street parking nearby.",
  },
  {
    slug: "preserve",
    name: "Preserve",
    neighborhoodLabel: "The Preserve",
    addressLine1: "3046 Preserve Dr",
    addressLine2: "Oakville, ON L6M 4L9",
    phone: "+1 (905) 257-0051",
    hours: [
      { label: "Mon–Sat", value: "10:00 AM – 8:00 PM" },
      { label: "Sun", value: "10:00 AM – 6:00 PM" },
    ],
    bookingUrl: "https://toptiercompany.ca/shops/",
    googleMapsQuery: "3046 Preserve Dr, Oakville, ON L6M 4L9",
    parkingNote: "Plaza parking available.",
  },
  {
    slug: "bronte",
    name: "Bronte",
    neighborhoodLabel: "Bronte",
    addressLine1: "2354 Lakeshore Rd W",
    addressLine2: "Oakville, ON",
    hours: [
      { label: "Mon–Sat", value: "10:00 AM – 8:00 PM" },
      { label: "Sun", value: "10:00 AM – 6:00 PM" },
    ],
    bookingUrl: "https://toptiercompany.ca/shops/",
    googleMapsQuery: "2354 Lakeshore Rd W, Oakville, ON",
    parkingNote: "Nearby parking varies by day/time.",
  },
];

export const barbers: Barber[] = [
  {
    id: "leo-kerr",
    name: "Leo",
    title: "Master Barber",
    locationSlug: "kerr",
    bio: "Known for textured cuts and patience with all clients, including kids.",
  },
  {
    id: "luigi-kerr",
    name: "Luigi",
    title: "Senior Barber",
    locationSlug: "kerr",
    bio: "Precision fades and beard work. Makes every client feel at home.",
  },
  {
    id: "marco-preserve",
    name: "Marco",
    title: "Master Barber",
    locationSlug: "preserve",
    bio: "Clean tapers and crisp line-ups. Fast without cutting corners.",
  },
  {
    id: "dani-preserve",
    name: "Dani",
    title: "Barber",
    locationSlug: "preserve",
    bio: "Modern cuts with a sharp attention to detail.",
  },
  {
    id: "jay-bronte",
    name: "Jay",
    title: "Master Barber",
    locationSlug: "bronte",
    bio: "Expert fades and beard sculpts. Consistent every time.",
  },
  {
    id: "mike-bronte",
    name: "Mike",
    title: "Barber",
    locationSlug: "bronte",
    bio: "Clean work and great energy in the chair.",
  },
];

export const services = [
  {
    title: "Haircut",
    description: "Classic or modern cut with clean finish and styling.",
  },
  {
    title: "Fade / Taper",
    description: "Skin fades to soft tapers—balanced, blended, and sharp.",
  },
  { title: "Beard Trim", description: "Shape, line-up, and detail work." },
  { title: "Line-up", description: "Crisp edges for hairline and beard." },
  { title: "Kids / Teens", description: "Patient, clean work—no rush jobs." },
  {
    title: "Cut + Beard",
    description: "The full refresh—haircut plus beard shape and finish.",
  },
] as const;

export const socialEmbeds: SocialEmbed[] = [
  {
    provider: "instagram",
    url: "https://www.instagram.com/reel/C_fwjSMMKa5/",
    label: "Booking reminder reel",
  },
  {
    provider: "instagram",
    url: "https://www.instagram.com/reel/C74kQsIpml8/",
    label: "Kids cuts reminder reel",
  },
  {
    provider: "tiktok",
    url: "https://www.tiktok.com/@toptiercompany/video/7473912720371305783",
    label: "Buzzcut video",
  },
];

// For autoplay + click-to-unmute (no social UI / redirects), self-host clips in /public/social
export const socialVideos: SocialVideo[] = [
  {
    src: "/social/clip-1.mp4",
    label: "Clip 1",
  },
  {
    src: "/social/clip-2.mp4",
    label: "Clip 2",
  },
  {
    src: "/social/clip-3.mp4",
    label: "Clip 3",
  },
];

// Excerpts mirrored publicly on Birdeye (Google reviews). Keep quotes exact.
export const testimonials: Testimonial[] = [
  {
    name: "Leo is absolutely incredible!",
    sourceLabel: "Google review (via Birdeye)",
    sourceUrl: "https://reviews.birdeye.com/top-tier-company-169938715772093",
    quote:
      "He cut both of my sons’ textured hair (ages 4 and 2), and I honestly couldn’t be more impressed. They were both really nervous going in, but Leo was so patient, calm, and kind that he completely put them at ease.",
  },
  {
    name: "I absolutely had to for Luigi.",
    sourceLabel: "Google review (via Birdeye)",
    sourceUrl: "https://reviews.birdeye.com/top-tier-company-169938715772093",
    quote:
      "From the moment you sit in his chair, you realize he’s not just a barber, he’s a genuinely great human being. Luigi takes the time to talk with you, connect with you, and make you feel welcome like you’ve known him for years.",
  },
  {
    name: "Long overdue review for Top Tier Kerr.",
    sourceLabel: "Google review (via Birdeye)",
    sourceUrl: "https://reviews.birdeye.com/top-tier-company-169938715772093",
    quote:
      "Leo is hands down one of the most compassionate, patient, and kind-hearted business owners I have ever met. Our son has significant sensory sensitivities and an extreme fear of haircuts.",
  },
];

