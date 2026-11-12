/**
 * Thermomix recipes, served at /thermomix/<slug>/.
 *
 * Cookidoo blocks URL import from this site, so recipes reach the Thermomix
 * through thermomix-recipes/03_scripts/push_to_cookidoo.py, which reads the
 * schema.org Recipe JSON-LD that the page template builds from this data.
 *
 * Rules:
 *   1. Metric, grams first (Cookidoo is grams).
 *   2. Steps copy Cookidoo's own wording and notation: "10 sec/speed 4",
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

export type Step = {
  /**
   * The step exactly as it goes on the Thermomix, in Cookidoo's own wording
   * ("Place 50 g rolled oats into mixing bowl.", "Mill 10 sec/speed 9.").
   * One action per step: adding ingredients is one step (the scale weighs),
   * running the machine is the next (you turn the dial).
   */
  short: string;
  /** Website only, behind a "More" dropdown: the why and the variations. Never a setting. */
  more?: string;
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
  /** Photo file in src/assets/thermomix/. */
  image?: string;
  /** Page colors: a deep one for the chips and type, a light one for the ingredient panel. */
  color: { deep: string; light: string };
  ingredients: Ingredient[];
  steps: Step[];
  tips: string[];
  /** Where the ratios came from. */
  basedOn: { name: string; url: string; note: string }[];
  /** ISO date, first published. */
  published: string;
};

/** "70 g dark chocolate, in pieces" as one line, for JSON-LD and Cookidoo. */
export const ingredientLine = (i: Ingredient) => `${i.qty} ${i.item}${i.note ? `, ${i.note}` : ''}`;

/** The step as the Thermomix shows it, for JSON-LD and Cookidoo. The "more" text stays on the website. */
export const stepText = (s: Step) => s.short;

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
    tagline: 'Two bananas, a bowl of oats and some dark chocolate. No flour. Butter and sugar optional.',
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
    image: 'chocolate-banana-oatmeal-cookies.jpg',
    color: { deep: '#4a2c1d', light: '#fff1b8' },
    ingredients: [
      { qty: '70 g', item: 'dark chocolate', note: 'in pieces (or chocolate chips)' },
      { qty: '50 g', item: 'rolled oats', note: 'milled into flour' },
      { qty: '100 g', item: 'rolled oats', note: 'left whole' },
      { qty: '250 g', item: 'very ripe bananas', note: 'peeled, in pieces (2 large)' },
      { qty: '1 tsp', item: 'vanilla extract' },
      { qty: '½ tsp', item: 'ground cinnamon' },
      { qty: '1 pinch', item: 'salt' },
      { qty: '15 g', item: 'butter', note: 'soft, in pieces (optional)' },
      { qty: '12 g', item: 'brown sugar', note: 'optional' },
      { qty: '1', item: 'egg yolk', note: 'optional' },
    ],
    steps: [
      {
        short: 'Preheat oven to 350°F (180°C). Line a baking sheet with parchment paper.',
        more: 'Bake on the middle rack.',
      },
      {
        short: 'Place 70 g dark chocolate into mixing bowl.',
        more: 'Using chocolate chips? Skip this step and the next one, and add the chips in step 15.',
      },
      {
        short: 'Chop 3 sec/speed 7. Transfer to a bowl and set aside.',
        more: 'You want rough chunks, not powder. No need to wipe the mixing bowl.',
      },
      { short: 'Place 50 g rolled oats into mixing bowl.' },
      {
        short: 'Mill 10 sec/speed 9.',
        more: 'This makes oat flour. It holds the cookies together, since there is no egg or butter.',
      },
      {
        short: 'Add 250 g bananas, in pieces.',
        more: 'Use very ripe bananas with black spots. For a richer cookie, add 30 g peanut butter too.',
      },
      { short: 'Add 1 tsp vanilla extract.' },
      { short: 'Add ½ tsp ground cinnamon.' },
      { short: 'Add 1 pinch salt.' },
      {
        short: 'Add 15 g butter, soft, in pieces (optional).',
        more: 'Butter gives crisper edges and a more cookie-like taste. Skip it for the lighter version.',
      },
      {
        short: 'Add 12 g brown sugar (optional).',
        more: 'A little sugar makes them sweeter and helps them brown. Skip it if your bananas are very ripe.',
      },
      {
        short: 'Add 1 egg yolk (optional).',
        more: 'Only if you want a richer, softer cookie. Use the yolk only. A whole egg makes the dough too wet and cakey.',
      },
      { short: 'Mix 10 sec/speed 4. Scrape down sides of mixing bowl with spatula.' },
      { short: 'Add 100 g rolled oats.' },
      { short: 'Add reserved chopped chocolate.' },
      {
        short: 'Mix 20 sec/reverse/speed 3.',
        more: 'Reverse keeps the oats and the chocolate chunks whole. If the dough sticks, help it with the spatula through the hole in the lid.',
      },
      {
        short: 'Let dough rest 10 minutes.',
        more: 'The oats soak up the banana, so the dough is easier to scoop and the cookies come out chewier.',
      },
      {
        short: 'Form 12 mounds on prepared baking sheet and flatten each to 1 cm (½ inch).',
        more: 'One heaped tablespoon per cookie. Wet fingers stop the dough from sticking. They do not spread in the oven, so the shape you press is the shape you get.',
      },
      {
        short: 'Bake 14 to 16 minutes (350°F) until edges are golden. Let cool 10 minutes on baking sheet.',
        more: 'They are soft when hot and firm up as they cool, so do not move them too early.',
      },
    ],
    tips: [
      'Use bananas with black spots. The browner the banana, the sweeter the cookie.',
      'Keeps 3 days in a tin, a week in the fridge. Freezes well.',
      'Gluten free if you buy oats labeled gluten free.',
      'Skip the three optional add-ons and they have no egg, no butter and no added sugar. Dairy free if your chocolate is.',
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
  {
    slug: 'chocolate-banana-muffins',
    name: 'Chocolate Banana Muffins',
    tagline: 'Built to use up a bunch of bananas. Soft, very banana-y muffins with dark chocolate chunks and peanut butter.',
    description:
      'Banana-heavy muffins with dark chocolate chunks and peanut butter, made in the Thermomix. Uses 4 to 5 very ripe bananas. 12 muffins.',
    prepMin: 15,
    cookMin: 22,
    totalMin: 47,
    yield: '12 muffins',
    servings: 12,
    oven: '180°C / 350°F',
    category: 'Baking',
    cuisine: 'American',
    keywords: ['banana', 'chocolate', 'peanut butter', 'muffins', 'ripe bananas', 'breakfast'],
    image: 'chocolate-banana-muffins.jpg',
    color: { deep: '#5c3410', light: '#ffe6bf' },
    ingredients: [
      { qty: '100 g', item: 'dark chocolate', note: 'in pieces (or chocolate chips)' },
      { qty: '450 g', item: 'very ripe bananas', note: 'peeled, in pieces (4 to 5 bananas)' },
      { qty: '60 g', item: 'butter', note: 'soft, in pieces' },
      { qty: '60 g', item: 'peanut butter' },
      { qty: '100 g', item: 'brown sugar', note: 'or a 1:1 sugar substitute' },
      { qty: '1', item: 'egg' },
      { qty: '1 tsp', item: 'vanilla extract' },
      { qty: '220 g', item: 'all-purpose flour' },
      { qty: '1 tsp', item: 'baking soda' },
      { qty: '½ tsp', item: 'baking powder' },
      { qty: '½ tsp', item: 'salt' },
    ],
    steps: [
      {
        short: 'Preheat oven to 350°F (180°C). Line a 12-cup muffin tin with paper liners.',
        more: 'Bake on the middle rack.',
      },
      {
        short: 'Place 100 g dark chocolate into mixing bowl.',
        more: 'Using chocolate chips? Skip this step and the next one, and add the chips in step 16.',
      },
      {
        short: 'Chop 3 sec/speed 7. Transfer to a bowl and set aside.',
        more: 'You want rough chunks, not powder. No need to wipe the mixing bowl.',
      },
      {
        short: 'Place 450 g bananas into mixing bowl.',
        more: 'The riper the better: black-spotted or fully black bananas give the most banana taste and sweetness. Break them into pieces.',
      },
      { short: 'Add 60 g butter, soft, in pieces.' },
      {
        short: 'Add 60 g peanut butter.',
        more: 'Makes them richer and a bit denser. To skip it, use 75 g butter in step 5 instead.',
      },
      {
        short: 'Add 100 g brown sugar.',
        more: 'Brown sugar keeps them moist and adds a caramel taste. With very black bananas, 70 g is enough. Sugar-free: Lakanto (Golden is closest to brown sugar) at the same amount, or a 1:1 Truvia baking blend. For other Truvia, check the bag for how much replaces sugar. Pure stevia does not work here: no bulk, and the muffins come out dry.',
      },
      { short: 'Add 1 egg.' },
      { short: 'Add 1 tsp vanilla extract.' },
      { short: 'Mix 20 sec/speed 4. Scrape down sides of mixing bowl with spatula.' },
      { short: 'Add 220 g all-purpose flour.' },
      { short: 'Add 1 tsp baking soda.' },
      { short: 'Add ½ tsp baking powder.' },
      { short: 'Add ½ tsp salt.' },
      {
        short: 'Mix 10 sec/reverse/speed 3.',
        more: 'Stop as soon as there is no dry flour left. Mixing longer makes the muffins tough.',
      },
      { short: 'Add reserved chopped chocolate.' },
      {
        short: 'Mix 5 sec/reverse/speed 2.',
        more: 'Just enough to spread the chocolate through the batter. Finish with the spatula if needed.',
      },
      {
        short: 'Divide batter among muffin cups.',
        more: 'Fill each cup about three quarters full. Press a few chocolate pieces on top if you saved some.',
      },
      {
        short: 'Bake 20 to 24 minutes (350°F) until a toothpick comes out clean. Let cool 10 minutes in tin.',
        more: 'A few moist crumbs on the toothpick is fine. Wet batter is not.',
      },
    ],
    tips: [
      'Keeps 3 days in a closed tin, or freeze them and warm one up for 20 seconds in the microwave.',
      'No peanut butter? Use 75 g butter in total.',
      'Want them less sweet? The bananas carry a lot of sugar, so 70 g brown sugar is plenty.',
    ],
    basedOn: [
      {
        name: 'Cup of Yum',
        url: 'https://cupofyum.com/recipes/chocolate-banana-muffins',
        note: '5.0 from 189 reviews',
      },
      {
        name: 'Well Plated',
        url: 'https://www.wellplated.com/chocolate-banana-muffins/',
        note: 'tested over four rounds',
      },
      {
        name: 'Cookidoo, Banana Bread',
        url: 'https://cookidoo.thermomix.com/recipes/recipe/en-US/r91348',
        note: 'the official Thermomix method for banana batter',
      },
    ],
    published: '2026-11-12',
  },
];
