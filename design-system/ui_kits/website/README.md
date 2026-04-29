# Website UI Kit — Dig & Build

A click-thru recreation of the Dig & Build editorial media site. Demonstrates the **calm paper register** for content and the **engi-band** (full-bleed crimson) register for footer / contact CTAs.

## Components

| File | Purpose |
|---|---|
| `Wordmark.jsx` | `DIG & BUILD` Latin display wordmark (paper or inverse) |
| `TopNav.jsx` | Hairline-ruled top navigation |
| `ArticleCard.jsx` | Stack and row layouts; includes `Thumb` placeholder |
| `FeaturedHero.jsx` | Top-page featured slot, side-by-side image + title |
| `CategoryAndArea.jsx` | Inline `CategoryStrip` + `AreaList` (prefecture → area) |
| `ContactBand.jsx` | Full-bleed engi inquiry CTA — the brief's signature |
| `Footer.jsx` | Full-bleed engi footer with wordmark, columns, capsule CTA |
| `ArticleDetail.jsx` | Article detail page (narrow column, generous rhythm) |

## Screens demonstrated in `index.html`

1. Home — Featured + article list + categories + areas
2. Article detail — narrow column, mincho body
3. Category archive — same list layout, filtered
4. Area archive — same list, area-filtered
5. Contact — full-page engi CTA + contact form

Navigate via the top nav, footer, or any card.

## Notes
- All thumbnails are deterministic CSS gradients tinted to the paper palette. Replace with real OGP visuals per article.
- The `engi-band` class on a `<section>` gives full-bleed crimson + paper-noise echo; place CTA bands and the footer inside it.
- Body type is generous on purpose (`line-height: 1.9`, `letter-spacing: 0.03em`) — do not tighten.
