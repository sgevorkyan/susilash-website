# Susi Lash — Luxury Lash Artist Website

A premium, editorial-style brand website for internationally recognized lash artist Susi Manukyan.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (subtle scroll animations)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

Optimized for [Vercel](https://vercel.com). Connect your repository and deploy — no additional configuration required.

```bash
npm run build
npm start
```

## Localization

The site supports four languages via [next-intl](https://next-intl.dev):

| Locale | Language   | URL prefix |
|--------|------------|------------|
| `en`   | English    | `/en`      |
| `hy`   | Armenian   | `/hy`      |
| `de`   | German     | `/de`      |
| `ru`   | Russian    | `/ru`      |

Visiting `/` redirects to `/en` (default locale).

### Translation files

All user-facing copy lives in `messages/`:

- `messages/en.json` — English (source)
- `messages/hy.json` — Armenian
- `messages/de.json` — German
- `messages/ru.json` — Russian

Edit these files to update copy. Non-translatable brand data (email, Instagram, image URLs) remains in `src/lib/constants.ts` and `src/lib/data.ts`.

### Language switcher

The navigation includes an EN | HY | DE | RU switcher that preserves the current page when changing language.

## Customization

Update brand content in:

- `src/lib/constants.ts` — site name, contact info (non-translatable)
- `src/lib/data.ts` — portfolio images (non-translatable)
- `messages/*.json` — all translatable copy

Replace Unsplash placeholder images with your own photography for production.

## SEO

- Structured data (JSON-LD) for BeautySalon schema
- Open Graph and Twitter card metadata
- Auto-generated `sitemap.xml` and `robots.txt`
- Keyword-optimized for "lash artist", "luxury lash extensions", "Susi Lash"
