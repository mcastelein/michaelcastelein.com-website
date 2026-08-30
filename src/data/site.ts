/**
 * Single source of truth for site content.
 *
 * Everything here is meant to be factually true. If you change a claim,
 * change it here. No copy lives in the page templates.
 *
 * House style, enforced by hand:
 *   1. No em dashes and no en dashes in prose. Use a comma, a period,
 *      a colon or brackets.
 *   2. Avoid the "X, not Y" and "not just X but Y" contrast pattern. Say the
 *      thing once.
 *   3. Avoid "actually", "genuinely", "truly", "simply", "seamlessly".
 *   4. Short sentences beat clever ones.
 */

/**
 * Links marked `pending` are not rendered anywhere. Fill in the href and
 * handle, delete the flag, and the link switches on.
 */
export type Social = {
  label: string;
  href: string;
  handle: string;
  pending?: boolean;
};

export const site = {
  name: 'Michael Castelein',
  domain: 'michaelcastelein.com',
  short:
    'Dutch-American data and AI consultant. I run analytics and BI projects, train teams to use AI in their day job, and work from four homes across three countries.',
  /** Primary call to action. LinkedIn until a booking link exists. */
  contact: 'https://www.linkedin.com/in/michael-castelein/',
  contactLabel: 'Message me on LinkedIn',
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/michael-castelein/',
      handle: 'in/michael-castelein',
    },
    { label: 'GitHub', href: 'https://github.com/mcastelein', handle: 'mcastelein' },
    { label: 'Instagram', href: 'https://www.instagram.com/ichael11/', handle: '@ichael11' },
    { label: 'YouTube', href: '', handle: '', pending: true },
    { label: 'TikTok', href: '', handle: '', pending: true },
    { label: 'HelloTalk', href: '', handle: '', pending: true },
  ] as Social[],
};

/** Only the links that are ready to show. */
export const liveSocials = (): Social[] => site.socials.filter((s) => !s.pending && s.href);

export const hero = {
  /** Three display lines. The third renders italic in the accent colour. */
  lines: ['Data & AI consultant.', 'Digital nomad.', 'I teach teams to use AI.'],
  lede:
    "I'm Michael, a Dutch-American consultant running ML Ventures. Half the work is data: analytics, BI, and the pipelines underneath. The other half is training teams to use AI inside the work they already do. On the side I build language-learning software and small tools. I do all of it from four homes across three countries.",
};

/** The two things someone would hire me for. */
export const services = [
  {
    id: 'data',
    name: 'Data & analytics',
    status: 'The engine',
    body:
      'Analytics, BI, analytics engineering, data science and ML. This is what the agency has run on for years, with two subcontractors and no office in any of the four countries.',
    includes: [
      'Analytics and BI. Dashboards people open, and numbers that reconcile.',
      'Analytics engineering. Models and pipelines that hold up when the business changes.',
      'Data science and ML where it pays for itself.',
      'Data engineering, since the line between that and analytics keeps blurring.',
    ],
  },
  {
    id: 'ai',
    name: 'AI adoption & training',
    status: 'The newer half',
    body:
      'Most companies have already bought the AI tools. Almost nobody uses them well. I run hands-on workshops with teams to fix that, working in their own files and their own workflow. No slide deck about the future of AI.',
    includes: [
      'Hands-on workshops with a team, using their real work as the material.',
      'Where AI helps in a data or analytics workflow, and where it wastes time.',
      'Prompting and tooling habits that outlast the session.',
      'Follow-up, so it becomes how the team works.',
    ],
  },
];

export const now = {
  updated: 'August 2026',
  base: 'netherlands',
  lines: [
    'Running ML Ventures: data, BI, and analytics engineering, with two subcontractors.',
    'Running AI adoption workshops, teaching teams to use AI on their own work.',
    'Building language-learning tools: spaced-repetition cards, audio drilling, and an adaptive reader that meets you at your level.',
    'In the Netherlands until October, then the US through the end of the year.',
    'Training for a first triathlon, on the way to an Ironman.',
    'Pushing Mandarin from good to fluent, and Teochew from nothing to something.',
  ],
};

/**
 * Projects.
 *
 * `href` is an internal route like /caffeine/ or an external URL.
 * `state` drives the badge colour: live, writeup, building.
 */
export type Project = {
  slug: string;
  name: string;
  tagline: string;
  body: string;
  state: 'live' | 'writeup' | 'building';
  stateLabel: string;
  /**
   * Where the block points, in this order: a page on this site, then the live
   * product, then the repo. All three can be absent, and the block then renders
   * as plain text so nothing dead is clickable.
   */
  href?: string;
  /** The actual website for this project, off this site. */
  site?: string;
  /** Only set this for a PUBLIC repo. A private one 404s for every visitor. */
  repo?: string;
  tags: string[];
};

/** Where a project block should point. */
export const projectHref = (p: Project): string | undefined =>
  p.href ?? p.site ?? p.repo;

/**
 * Hand-ordered, most interesting first. The home page shows the first three,
 * so keep something clickable at the top.
 */
export const projects: Project[] = [
  {
    slug: 'ieltsboost',
    name: 'IELTSBoost',
    tagline: 'Practise a real IELTS exam, get a band score back in seconds.',
    body:
      'An IELTS prep service covering all four sections: listening, reading, writing and speaking. You answer real questions from past exams, an AI examiner marks the answer and explains the band score, and a dashboard tracks where you are improving and where you are stuck. Next.js, with Claude doing the marking.',
    state: 'live',
    stateLabel: 'Live product',
    site: 'https://ielts-boost.vercel.app',
    repo: 'https://github.com/mcastelein/ielts-boost',
    tags: ['IELTS', 'AI feedback', 'Next.js'],
  },
  {
    slug: 'caffeine',
    name: 'Caffeine Lab',
    tagline: 'Drag coffees onto a day and watch what your blood does.',
    body:
      'A sandbox for understanding caffeine. Drop drinks on a timeline and the curve, the bedtime number and every panel below redraw live. It runs a one-compartment pharmacokinetic model with first-order absorption, so a dose peaks about 45 minutes in and then halves on your own clearance rate. One HTML file, no server, works offline.',
    state: 'live',
    stateLabel: 'Live, try it',
    href: '/caffeine/',
    tags: ['Health', 'Data viz', 'Single file'],
  },
  {
    slug: 'lantern',
    name: 'Lantern',
    tagline: 'One Mandarin app instead of the seven I was juggling.',
    body:
      'A Mandarin learning app built around a spaced-repetition engine. Everything else hangs off that same vocabulary and progress model: an AI reader that generates passages at your level, listening drills, mock HSK exams, character decomposition, and a tutor you can talk to. Next.js and Supabase, with an FSRS scheduler at the centre.',
    state: 'building',
    stateLabel: 'Building',
    tags: ['Mandarin', 'SRS', 'Next.js'],
  },
  {
    slug: 'transcribe',
    name: 'Live Transcription',
    tagline: 'Talk, and see your words half a second later. Nothing leaves the machine.',
    body:
      'A local speech-to-text and translation tool that streams into a browser page. Settled text is black, the working draft is grey and rewrites itself as more words arrive, and a second column translates each line between English and Chinese. Whisper and Qwen both run on your own GPU, so no audio is uploaded anywhere.',
    state: 'writeup',
    stateLabel: 'Runs locally',
    href: '/transcribe/',
    tags: ['Speech', 'Local AI', 'Python'],
  },
  {
    slug: 'anthology',
    name: 'Anthology',
    tagline: 'A present that is a whole website about the person.',
    body:
      'You answer a questionnaire about someone, and it becomes a personal site built from slide templates: a Wrapped-style year in review, fake Yelp reviews of them, a Wikipedia page, a bingo card of their habits, messages from everyone who knows them. Birthdays first, now weddings, retirements, graduations and trips.',
    state: 'live',
    stateLabel: 'Selling',
    site: 'https://anthology.gift',
    tags: ['Product', 'Gifting', 'Templates'],
  },
  {
    slug: 'website',
    name: 'This website',
    tagline: 'Astro, a hand-rolled WebGL globe, and no CMS.',
    body:
      'Built in Astro and deployed to GitHub Pages. The globe is Three.js with the real travel route drawn as arcs. All the copy lives in one TypeScript file so nothing drifts out of sync.',
    state: 'live',
    stateLabel: 'Open source',
    repo: 'https://github.com/mcastelein/michaelcastelein.com-website',
    tags: ['Astro', 'Three.js', 'Open source'],
  },
];

/** Everything that isn't billable client work. */
export const ventures = {
  intro:
    'ML Ventures is my company. The consulting pays for the rest, and the rest is why the consulting stays interesting.',
  strands: [
    {
      name: 'Writing & content',
      status: 'Growing',
      body:
        'Data, analytics and AI workflows on LinkedIn. Travel on Instagram, YouTube Shorts and TikTok. A following on HelloTalk that grew out of language content I never planned to make.',
    },
    {
      name: 'Language-learning software',
      status: 'Building',
      body:
        'The tools I wanted while learning Mandarin and could not find: SRS notecards, audio cards, adaptive readers. Built for my own studying first, which is why they are any good.',
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
        'The long idea: places in Chaozhou and Kunming where people come and live in the language rather than study it. Years away, not months.',
    },
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
 * October is the seam between the Netherlands and the US. It counts as
 * Netherlands here, and the copy says so.
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
    monthLabel: 'January to March',
    lat: 23.66,
    lon: 116.62,
    utc: 'UTC+8',
    role: 'Family',
    headline: 'The reason the loop exists at all.',
    body:
      "Chaozhou is my wife Lina's hometown, a Teochew-speaking city in eastern Guangdong that almost no foreigner ends up in. The language there is not Mandarin and mostly is not written down. We spend the first three months of every year here.",
    doing: [
      'A year of family traditions, compressed into one season',
      'Learning Teochew slowly and badly, since you cannot study it from a book',
      'Regular trips up to Shenzhen and Guangzhou to meet people building things',
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
    monthLabel: 'April to July',
    lat: 25.04,
    lon: 102.72,
    utc: 'UTC+8',
    role: 'Deep work',
    headline: 'Eternal spring, nineteen hundred metres up.',
    body:
      'Kunming is called the spring city because the weather refuses to do anything interesting. High plateau, mild all year, thin clean air. This is the longest stint and the one where most of the building happens.',
    doing: [
      'The heaviest client work and product building of the year',
      'Mandarin at full immersion instead of at a desk',
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
    monthLabel: 'August to October',
    lat: 52.13,
    lon: 5.29,
    utc: 'UTC+2',
    role: 'Roots',
    headline: 'The Dutch half, in the good months.',
    body:
      'Half my passport and most of my twenties. I studied here and worked here: BI at HousingAnywhere in Rotterdam, then data engineering at a consultancy. I started the agency here, before it stopped needing an address.',
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
    monthLabel: 'November to December',
    lat: 33.75,
    lon: -84.39,
    utc: 'UTC-5',
    role: 'The other passport',
    headline: 'Closing out the year on the American side.',
    body:
      'The other half of the hyphen, and where the year ends: holidays, family, and the annual reset. Most of what the US means on my CV happened earlier, an internship at Southwest and an actuarial co-op at John Hancock in Boston. These two months are the part that repeats.',
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

/** Per-base identity colours. Light-background hex plus a brighter dark-mode pair. */
export const baseColors: Record<string, { accent: string; accentDark: string; tint: string }> = {
  chaozhou:    { accent: '#A8322D', accentDark: '#FF6B5E', tint: '#F6E4E2' },
  kunming:     { accent: '#2F7A5E', accentDark: '#5FD3A0', tint: '#DFEEE7' },
  netherlands: { accent: '#2A4E8F', accentDark: '#77ADFF', tint: '#E0E7F5' },
  usa:         { accent: '#A96F22', accentDark: '#F0B354', tint: '#F6EAD5' },
};

export function baseForMonth(month1to12: number): Base {
  return bases.find((b) => b.months.includes(month1to12)) ?? bases[0];
}

export const path = [
  { what: 'Mathematics & Aerospace Engineering, BS', where: 'University' },
  { what: 'Data analytics intern', where: 'Southwest Airlines' },
  { what: 'Actuarial co-op', where: 'John Hancock, Boston' },
  { what: 'Econometrics: Quantitative Finance, MS', where: 'University' },
  { what: 'BI analyst', where: 'HousingAnywhere, Rotterdam' },
  { what: 'Data engineer', where: 'Consultancy, Rotterdam' },
  { what: 'Founder', where: 'ML Ventures' },
  { what: 'AI & Data Science Lead', where: 'Centered Care' },
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
    body: 'I founded a table tennis association and chaired it. Still the sport I would keep if I could only keep one.',
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
    body: 'I model things that do not need modelling and I enjoy it. This is a sincere entry.',
  },
];

export const coffee = {
  headline: 'Let’s have coffee',
  body:
    'If any of this overlaps with something you are doing, a data problem, getting AI to land in your team, learning Chinese, or you just liked the map, say hello.',
  fineprint: 'I answer from whichever timezone I am in. It changes four times a year.',
};
