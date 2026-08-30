# Photos: drop files here

Put images into the folder that matches, and they show up on the site. No
imports, no config, no list to update. Astro converts them to WebP and
generates responsive sizes at build time.

## The one rule: name the file like a caption

The filename becomes the visible caption and the alt text.

```
night-market-in-chaozhou.jpg      ->  "Night market in Chaozhou"
lina-and-me-at-her-parents.jpg    ->  "Lina and me at her parents"
kunming-from-the-apartment.jpg    ->  "Kunming from the apartment"
IMG_4821.jpg                      ->  "IMG 4821"   <- don't do this
```

Prefix with numbers to control order. The number is stripped from the caption:

```
01-first-photo-shown.jpg   ->  "First photo shown"
02-second.jpg              ->  "Second"
```

## What each folder wants

| Folder | How many | Looking for |
|---|---|---|
| `chaozhou/` | 4 to 6 | Street life, family food and traditions, the Shenzhen/Guangzhou trips |
| `kunming/` | 4 to 6 | The plateau, the city, where you actually work |
| `netherlands/` | 3 to 5 | Water, bikes, Dutch summer, Rotterdam |
| `usa/` | 3 to 4 | Wherever you spend November and December |
| `me/` (slot 0 is the hero portrait) | 3 to 4 | One good portrait, plus candids that aren't posed |
| `play/` | 2 to 4 | Table tennis, badminton, running |

Landscape and portrait both work. The layouts use a mix on purpose.

## Formats

JPG, PNG, WebP and AVIF work directly.

**HEIC does not.** Astro's image pipeline can't read it. If your files come
straight off an iPhone, convert first:

```bash
# from this folder, with ImageMagick installed
magick mogrify -format jpg -quality 90 *.HEIC
```

Or tell Claude and it'll convert a folder for you.

## A note on what goes public

Everything in here ends up on a public, Google-indexed page. Photos of other
people (Lina, her family, friends) are worth a moment's thought before they
go in, especially family members who may not expect to be findable online.

## Nothing here yet?

That's fine. Every layout renders a dashed placeholder telling you which folder
and what subject it wants, so you can see the finished design and fill it in
later.
