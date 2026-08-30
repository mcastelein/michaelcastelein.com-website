import type { ImageMetadata } from 'astro';

/**
 * Photo resolution.
 *
 * Drop image files into src/assets/photos/<category>/ and they appear on the
 * site automatically, no config, no imports, no list to maintain. Astro
 * optimises them at build time (WebP + responsive widths).
 *
 * The FILENAME BECOMES THE CAPTION, so name files in words rather than
 * IMG_4821.jpg:
 *   night-market-in-chaozhou.jpg  ->  "Night market in Chaozhou"
 */

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

export type Photo = {
  src: ImageMetadata;
  category: string;
  /** Human caption, derived from the filename. */
  caption: string;
  slug: string;
};

const toCaption = (slug: string) => {
  const words = slug
    .replace(/^\d+[-_. ]*/, '') // allow "01-" prefixes for ordering
    .replace(/[-_]+/g, ' ')
    .trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const all: Photo[] = Object.entries(files)
  .map(([path, mod]) => {
    const parts = path.split('/');
    const slug = parts[parts.length - 1].replace(/\.[^.]+$/, '');
    return {
      src: mod.default,
      category: parts[parts.length - 2],
      slug,
      caption: toCaption(slug),
    };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug, undefined, { numeric: true }));

export const photosFor = (category: string): Photo[] =>
  all.filter((p) => p.category === category);

export const photoAt = (category: string, index: number): Photo | undefined =>
  photosFor(category)[index];

export const totalPhotos = (): number => all.length;

/** Categories that have at least one real photo. */
export const stockedCategories = (): string[] => [...new Set(all.map((p) => p.category))];

/**
 * True if any of the given category/index slots resolves to a real file.
 *
 * Photo-holding layouts gate on this: in production an unfilled slot renders
 * nothing, so a grid whose slots are all empty must not render either, or it
 * leaves a hole where a row of pictures should be.
 */
export const hasPhotos = (...slots: Array<[string, number] | string>): boolean =>
  slots.some((s) =>
    typeof s === 'string' ? photosFor(s).length > 0 : Boolean(photoAt(s[0], s[1]))
  );
