/**
 * Thermomix recipes, served at /thermomix/<slug>/.
 *
 * Each page exists so Cookidoo can import it: Cookidoo > Created Recipes >
 * green button > Import recipe > paste the page URL. The importer reads the
 * schema.org Recipe JSON-LD that the page template builds from this data, so
 * every field here ends up in Cookidoo.
 *
 * Rules that keep the import clean:
 *   1. One ingredient per line, quantity first, metric (Cookidoo is grams).
 *   2. Steps use Cookidoo's own notation: "10 sec/speed 4",
 *      "20 sec/reverse/speed 3", "3 min/100°C/speed 1". The importer tries to
 *      turn those strings into Thermomix settings.
 *   3. One bowl action per step, so each step gets at most one setting.
 *   4. Same house style as site.ts: no em or en dashes in prose.
 */

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
  category: string;
  cuisine: string;
  keywords: string[];
  ingredients: string[];
  steps: string[];
  tips: string[];
  /** Where the ratios came from, shown at the bottom of the page. */
  basedOn: { name: string; url: string; note: string }[];
  /** ISO date, first published. */
  published: string;
};

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
    category: 'Baking',
    cuisine: 'American',
    keywords: ['banana', 'oats', 'chocolate', 'cookies', 'no added sugar', 'egg free', 'dairy free option'],
    ingredients: [
      '70 g dark chocolate, in pieces (or chocolate chips)',
      '150 g rolled oats',
      '250 g very ripe bananas, peeled, in pieces (2 large)',
      '1 tsp vanilla extract',
      '½ tsp ground cinnamon',
      '1 pinch salt',
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
      'The browner the banana, the sweeter the cookie. Black-spotted bananas are what you want.',
      'If you use chocolate chips, skip step 2 and add them in step 5.',
      'For a richer cookie, add 30 g peanut butter with the bananas in step 4.',
      'They keep 3 days in a closed tin, or a week in the fridge. They freeze well.',
      'Gluten free if you use oats labeled gluten free.',
    ],
    basedOn: [
      {
        name: 'Downshiftology, banana oatmeal cookies',
        url: 'https://downshiftology.com/recipes/banana-oatmeal-cookies/',
        note: 'Rated 4.9 from about 80 votes. The three ingredient base: banana, oats, chocolate.',
      },
      {
        name: 'The Big Man\'s World, 3 ingredient breakfast cookies',
        url: 'https://thebigmansworld.com/3-ingredient-breakfast-cookies/',
        note: 'Rated 5.0 from about 1,700 votes. Same base, no eggs and no sugar.',
      },
      {
        name: 'Averie Cooks, chocolate chip banana oatmeal cookies',
        url: 'https://averiecooks.com/banana-oatmeal-chocolate-chip-cookies',
        note: 'Rated 4.6 from about 280 votes. Source of the cinnamon, vanilla and salt.',
      },
      {
        name: 'Thermomix Recipe Community, banana oat cookies',
        url: 'https://recipecommunity.com.au/baking-sweet-recipes/banana-oat-cookies-dairy-free-egg-free-nut-free/bqwubz7m-fc8e7-359410-beea0-kjcr02c5',
        note: 'The Thermomix pattern: mash on speed 4 to 5, fold oats in on reverse.',
      },
    ],
    published: '2026-11-12',
  },
];
