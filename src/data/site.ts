/**
 * Single source of truth for site content.
 *
 * Everything here is intended to be factually true. If you change a claim,
 * change it here — no copy lives in the page templates.
 */

export const site = {
  name: 'Michael Castelein',
  domain: 'michaelcastelein.com',
  headline: 'Three countries. Four homes. One loop, every year.',
  short:
    'Dutch-American. Data and AI consultant. I live in a repeating orbit between China, the Netherlands, and the United States.',
  /** Primary call-to-action. LinkedIn until a booking link exists. */
  contact: 'https://www.linkedin.com/in/michaelcastelein/',
  contactLabel: 'Message me on LinkedIn',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/michaelcastelein/', handle: 'in/michaelcastelein' },
    { label: 'GitHub', href: 'https://github.com/mcastelein', handle: 'mcastelein' },
  ],
};

export type Base = {
  id: string;
  city: string;
  cityLocal?: string;
  country: string;
  countryShort: string;
  flag: string;
  months: number[];
  monthLabel: string;
  lat: number;
  lon: number;
  utc: string;
  role: string;
  headline: string;
  body: string;
  doing: string[];
};

/**
 * Months are assigned uniquely so "where is he now" is always answerable.
 * October is really the seam between the Netherlands and the US — treated as
 * Netherlands here, and called out as a travel month in the copy.
 */
export const bases: Base[] = [
  {
    id: 'chaozhou',
    city: 'Chaozhou',
    cityLocal: '潮州',
    country: 'China',
    countryShort: 'CN',
    flag: '🇨🇳',
    months: [1, 2, 3],
    monthLabel: 'January – March',
    lat: 23.66,
    lon: 116.62,
    utc: 'UTC+8',
    role: 'Family',
    headline: 'The reason the loop exists at all.',
    body:
      "Chaozhou is my wife Lina's hometown — a Teochew-speaking city in eastern Guangdong that almost no foreigner ends up in, and where the language isn't Mandarin and mostly isn't written down. We spend the first three months of every year here. It is the only base where I'm embedded in a family rather than an expat scene, which makes it the hardest and the best of the four.",
    doing: [
      'A year’s worth of family traditions, compressed into one season',
      'Learning Teochew slowly and badly — a language you mostly cannot study from a book',
      'Regular runs up to Shenzhen and Guangzhou to meet people building things',
    ],
  },
  {
    id: 'kunming',
    city: 'Kunming',
    cityLocal: '昆明',
    country: 'China',
    countryShort: 'CN',
    flag: '🇨🇳',
    months: [4, 5, 6, 7],
    monthLabel: 'April – July',
    lat: 25.04,
    lon: 102.72,
    utc: 'UTC+8',
    role: 'Deep work',
    headline: 'Eternal spring, nineteen hundred metres up.',
    body:
      'Kunming is called the spring city because the weather refuses to do anything interesting — high plateau, mild all year, thin clean air. Same country as Chaozhou, and almost nothing about it is the same: different food, different climate, different language, a thousand kilometres west. This is the longest stint and the one where the real building happens.',
    doing: [
      'The heaviest client work and product building of the year',
      'Mandarin at full immersion rather than at a desk',
      'Training at altitude, which is either a real advantage or a good excuse',
    ],
  },
  {
    id: 'netherlands',
    city: 'The Netherlands',
    country: 'Netherlands',
    countryShort: 'NL',
    flag: '🇳🇱',
    months: [8, 9, 10],
    monthLabel: 'August – October',
    lat: 52.13,
    lon: 5.29,
    utc: 'UTC+2',
    role: 'Roots',
    headline: 'The Dutch half, in the good months.',
    body:
      'Half my passport and most of my twenties. I studied here, worked here — BI at HousingAnywhere in Rotterdam, then data engineering at a consultancy — and started the agency here before it stopped needing an address. August through October is the stretch of Dutch weather worth being present for, which is not a coincidence.',
    doing: [
      'Family, friends, and anything the business needs a European presence for',
      'Racket sports on real teams, in a country that takes them seriously',
      'October is the seam: half here, half already in the US',
    ],
  },
  {
    id: 'usa',
    city: 'Atlanta',
    country: 'United States',
    countryShort: 'US',
    flag: '🇺🇸',
    months: [11, 12],
    monthLabel: 'November – December',
    lat: 33.75,
    lon: -84.39,
    utc: 'UTC-5',
    role: 'The other passport',
    headline: 'Closing out the year on the American side.',
    body:
      'The other half of the hyphen, and where the year ends: holidays, family, and the annual reset. Most of what the US means on my résumé happened earlier — a data analytics internship at Southwest and an actuarial co-op at John Hancock in Boston — but these two months are the part that actually repeats.',
    doing: [
      'Holidays, and the people you only see once a year',
      'The end-of-year business reset: numbers, pricing, what to kill, what to start',
    ],
  },
];

export const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** Per-base identity colours. Light-background hex + a brighter dark-mode pair. */
export const baseColors: Record<string, { accent: string; accentDark: string; tint: string }> = {
  chaozhou:    { accent: '#A8322D', accentDark: '#FF6B5E', tint: '#F6E4E2' },
  kunming:     { accent: '#2F7A5E', accentDark: '#5FD3A0', tint: '#DFEEE7' },
  netherlands: { accent: '#2A4E8F', accentDark: '#77ADFF', tint: '#E0E7F5' },
  usa:         { accent: '#A96F22', accentDark: '#F0B354', tint: '#F6EAD5' },
};

export function baseForMonth(month1to12: number): Base {
  return bases.find((b) => b.months.includes(month1to12)) ?? bases[0];
}

export const now = {
  updated: 'August 2026',
  base: 'netherlands',
  lines: [
    'In the Netherlands until October, then the US through the end of the year.',
    'Running ML Ventures — data, BI, and analytics engineering, with two subcontractors.',
    'Building language-learning tools: spaced-repetition cards, audio drilling, and an adaptive reader that meets you at your level.',
    'Training toward a first triathlon, on the way to an Ironman.',
    'Trying to get Mandarin from good to genuinely fluent, and Teochew from nothing to something.',
  ],
};

export const work = {
  intro:
    'ML Ventures is my company. It started as data consultancy and still mostly is — that part pays for the rest.',
  strands: [
    {
      name: 'Data & AI consultancy',
      status: 'The engine',
      body:
        'Analytics, BI, analytics engineering, data science and ML for clients, now expanding into data engineering and AI work. Two subcontractors, and no office in any of the four countries.',
    },
    {
      name: 'Writing & content',
      status: 'Growing',
      body:
        'Travel on Instagram, YouTube Shorts and TikTok. Data, analytics and Claude workflows on LinkedIn. A following on HelloTalk that came from language content rather than anything I planned.',
    },
    {
      name: 'Language-learning software',
      status: 'Building',
      body:
        'The tools I wanted while learning Mandarin and couldn’t find: SRS notecards, audio cards, adaptive readers. Built for my own studying first, which is the only reason they’re any good.',
    },
    {
      name: 'Ecommerce',
      status: 'Lina’s',
      body:
        'Lina runs a Shopify store selling clip-on nails, sourced from China. I help with the parts that are spreadsheets.',
    },
    {
      name: 'China immersion houses',
      status: 'Long game',
      body:
        'The long idea: places in Chaozhou and Kunming where people come to actually live in the language instead of studying it. Years out, not months.',
    },
  ],
};

export const path = [
  { what: 'Mathematics & Aerospace Engineering, BS', where: 'University' },
  { what: 'Data analytics intern', where: 'Southwest Airlines' },
  { what: 'Actuarial co-op', where: 'John Hancock, Boston' },
  { what: 'Econometrics: Quantitative Finance, MS', where: 'University' },
  { what: 'BI analyst', where: 'HousingAnywhere, Rotterdam' },
  { what: 'Data engineer', where: 'Consultancy, Rotterdam' },
  { what: 'Founder', where: 'ML Ventures' },
];

export const languages = [
  { name: 'English', level: 'Native' },
  { name: 'Dutch', level: 'Native' },
  { name: 'Mandarin', level: 'Fluent, still climbing' },
  { name: 'Japanese', level: 'Conversational' },
  { name: 'Teochew', level: 'Beginner' },
];

export const play = [
  {
    name: 'Table tennis',
    body: 'I founded a table tennis association and chaired it. Still the sport I’d pick if I could only keep one.',
  },
  {
    name: 'Badminton',
    body: 'Former chairman of a badminton association, and still the second racket in the bag.',
  },
  {
    name: 'Running & triathlon',
    body: 'Working toward a first triathlon, with an Ironman somewhere further down the list.',
  },
  {
    name: 'Spreadsheets',
    body: 'Not a joke and not ironic. I model things that do not need modelling and I enjoy it.',
  },
];

export const coffee = {
  headline: 'Let’s have coffee',
  body:
    'If any of this overlapped with something you’re doing — nomad logistics, learning Chinese, data and AI work, or you just liked the map — say hello. No agenda needed, and I’m not selling anything.',
  fineprint: 'I answer from whichever timezone I’m in. It changes four times a year.',
};
