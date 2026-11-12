/**
 * Thermomix recipes, served at /thermomix/<slug>/.
 *
 * Cookidoo blocks URL import from this site, so recipes reach the Thermomix
 * through thermomix-recipes/03_scripts/push_to_cookidoo.py, which reads the
 * schema.org Recipe JSON-LD that the page template builds from this data.
 *
 * Rules:
 *   1. Metric, grams first (Cookidoo is grams).
 *   2. Steps use Cookidoo's own notation: "10 sec/speed 4",
 *      "20 sec/reverse/speed 3", "3 min/100°C/speed 1". The page draws these
 *      as machine chips and the push script turns them into guided settings.
 *   3. One bowl action per step, so each step has at most one setting.
 *   4. Same house style as site.ts: no em or en dashes in prose.
 */

export type Ingredient = {
  /** Amount with unit, e.g. "70 g", "1 tsp", "1 pinch". */
  qty: string;
  item: string;
  note?: string;
};

export type Recipe = {
  slug: string;
  name: string;
  /** One line under the title. */
  tagline: string;
  /** Goes into the JSON-LD description and the meta description. */
  description: string;
  /** Minutes. */
  prepMin: number;
  cookMin: number;
  totalMin: number;
  yield: string;
  servings: number;
  /** Oven setting shown in the top row, if the recipe uses one. */
  oven?: string;
  category: string;
  cuisine: string;
  keywords: string[];
  /** Page colors: a deep one for the chips and type, a light one for the ingredient panel. */
  color: { deep: string; light: string };
  ingredients: Ingredient[];
  steps: string[];
  tips: string[];
  /** Where the ratios came from. */
  basedOn: { name: string; url: string; note: string }[];
  /** ISO date, first published. */
  published: string;
};

/** "70 g dark chocolate, in pieces" as one line, for JSON-LD and Cookidoo. */
export const ingredientLine = (i: Ingredient) => `${i.qty} ${i.item}${i.note ? `, ${i.note}` : ''}`;

/** A Thermomix setting in a step, Cookidoo notation. Same pattern as the push script. */
export const SETTING =
  /(\d+)\s*(sec|min)(?:\/(\d+)°C|\/(Varoma))?(?:\/(reverse))?\/speed\s*(soft|\d+(?:\.\d+)?)/;

export type StepPart =
  | { kind: 'text'; text: string }
  | { kind: 'setting'; raw: string; time: string; temp?: string; reverse: boolean; speed: string };

/** Splits a step into plain text and Thermomix settings, so the page can draw the settings. */
export function splitStep(step: string): StepPart[] {
  const parts: StepPart[] = [];
  const re = new RegExp(SETTING.source, 'g');
  let last = 0;
  for (const m of step.matchAll(re)) {
    if (m.index! > last) parts.push({ kind: 'text', text: step.slice(last, m.index) });
    parts.push({
      kind: 'setting',
      raw: m[0],
      time: `${m[1]} ${m[2]}`,
      temp: m[3] ? `${m[3]}°C` : m[4],
      reverse: Boolean(m[5]),
      speed: m[6],
    });
    last = m.index! + m[0].length;
  }
  if (last < step.length) parts.push({ kind: 'text', text: step.slice(last) });
  return parts;
}

export const recipes: Recipe[] = [
  {
    slug: 'chocolate-banana-oatmeal-cookies',
    name: 'Chocolate Banana Oatmeal Cookies',
    tagline: 'Two bananas, a bowl of oats and some dark chocolate. No flour, no butter, no added sugar.',
    description:
      'Soft, chewy banana oat cookies with dark chocolate chunks, made in the Thermomix. Part of the oats is milled into flour so the dough holds together without eggs or butter. 12 cookies.',
    prepMin: 10,
    cookMin: 16,
    totalMin: 36,
    yield: '12 cookies',
    servings: 12,
    oven: '180°C / 350°F',
    category: 'Baking',
    cuisine: 'American',
    keywords: ['banana', 'oats', 'chocolate', 'cookies', 'no added sugar', 'egg free', 'dairy free option'],
    color: { deep: '#4a2c1d', light: '#fff1b8' },
    ingredients: [
      { qty: '70 g', item: 'dark chocolate', note: 'in pieces (or chocolate chips)' },
      { qty: '150 g', item: 'rolled oats' },
      { qty: '250 g', item: 'very ripe bananas', note: 'peeled, in pieces (2 large)' },
      { qty: '1 tsp', item: 'vanilla extract' },
      { qty: '½ tsp', item: 'ground cinnamon' },
      { qty: '1 pinch', item: 'salt' },
    ],
    steps: [
      'Preheat the oven to 180°C (350°F). Line a baking tray with baking paper.',
      'Place 70 g dark chocolate in the mixing bowl and chop 3 sec/speed 7. Transfer to a small bowl and set aside.',
      'Place 50 g rolled oats in the mixing bowl and mill 10 sec/speed 9.',
      'Add 250 g bananas, 1 tsp vanilla extract, ½ tsp cinnamon and 1 pinch salt, then mix 10 sec/speed 4. Scrape down the sides of the mixing bowl with the spatula.',
      'Add the remaining 100 g rolled oats and the chopped chocolate, then mix 20 sec/reverse/speed 3, helping with the spatula.',
      'Leave the dough to rest in the mixing bowl for 10 minutes, so the oats soak up the banana.',
      'Scoop 12 heaped tablespoons of dough onto the baking tray and press each one flat to about 1 cm thick. They do not spread in the oven.',
      'Bake for 14 to 16 minutes (180°C) until the edges are golden. Leave to cool on the tray for 10 minutes before you move them.',
    ],
    tips: [
      'Use bananas with black spots. The browner the banana, the sweeter the cookie.',
      'Using chocolate chips? Skip step 2 and add them in step 5.',
      'For a richer cookie, add 30 g peanut butter with the bananas.',
      'Keeps 3 days in a tin, a week in the fridge. Freezes well.',
    ],
    basedOn: [
      {
        name: 'Downshiftology',
        url: 'https://downshiftology.com/recipes/banana-oatmeal-cookies/',
        note: '4.9 from about 80 votes',
      },
      {
        name: "The Big Man's World",
        url: 'https://thebigmansworld.com/3-ingredient-breakfast-cookies/',
        note: '5.0 from about 1,700 votes',
      },
      {
        name: 'Averie Cooks',
        url: 'https://averiecooks.com/banana-oatmeal-chocolate-chip-cookies',
        note: '4.6 from about 280 votes',
      },
      {
        name: 'Thermomix Recipe Community',
        url: 'https://recipecommunity.com.au/baking-sweet-recipes/banana-oat-cookies-dairy-free-egg-free-nut-free/bqwubz7m-fc8e7-359410-beea0-kjcr02c5',
        note: 'the Thermomix method',
      },
    ],
    published: '2026-11-12',
  },
];
