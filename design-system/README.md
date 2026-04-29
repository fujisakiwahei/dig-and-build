# Dig & Build — Design System

> 少し赤みのある紙に、静かに組まれた都市の記録
> *A quiet city chronicle, set on slightly-red paper.*

Dig & Build is an editorial web media platform documenting urban development, architecture, and the changing fabric of Japanese cities. It is structured like a paper-bound magazine — generous margins, mincho serif body, paper-toned background — with one expressive register: a deep **engi-iro (エンジ色)** band reserved for the footer and contact/inquiry sections.

The contrast is the point. Articles read calmly. The footer arrests.

---

## 1. Reference & Sources

- **Visual reference:** `https://akita-souzounomori.com/media/` (Akita COI-NEXT ソウゾウの森プロジェクト) — editorial card grid, paper palette, mincho body.
- **Brief:** Provided by the user as the canonical token spec (paper bg `#f5eee6`, ink `#1f1f1f`, accent `#3a3937`, etc.). The brief is treated as source of truth.
- **Engi-iro extension:** Added by us per user request — "問い合わせボタンやフッターボタンに高いデザイン性が欲しい … エンジ色で上品かつモダン". `#6b1f24` chosen as a matte, library-bound deep crimson-brown that pairs with the paper without becoming a department-store red.
- **No codebase or Figma was attached** for this system. If/when one arrives, treat it as the new source of truth and rev components.

---

## 2. Site Structure (informational architecture)

```
/                                Top page
/articles/[slug]/                Article detail
/categories/[slug]/              Category archive
/prefectures/[slug]/             Prefecture archive
/areas/[prefecture]/[area]/      Area archive
/authors/[slug]/                 Author page
/about/                          About this media
/contact/                        Contact / press inquiries
/advertise/                      Ad & tie-up
/privacy-policy/                 Privacy policy
```

**Top page sections, in order**
1. おすすめ記事 — Featured articles
2. 記事一覧 — Article list
3. カテゴリー一覧 — Categories
4. エリア一覧 — Areas
5. フッター — Footer (engi-band)

**Geographic axis** — Prefecture → Area
- 東京都: 日本橋 / 丸の内 / 虎ノ門 / 新宿 / 御茶ノ水
- 大阪府: 梅田 / 中之島 / 難波 / 心斎橋
- 福岡県: 天神 / 博多
- 沖縄県: 那覇

**Editorial axis (categories), independent of geography**
- 再開発 / 歴史 / 都市構造 / 建築 / 商業施設 / 考察

---

## 3. Content Fundamentals

**Voice.** Third-person observational. The writer is a chronicler, not a guide. Sentences end. They do not over-explain. Japanese body copy is the primary register; English appears only as supporting Latin display (wordmark, eyebrow caps).

**Tone.** Calm, observational, slightly removed. Closer to a city-essay anthology than a news site. Never hype-y, never breathless. No exclamation points in body copy. Em-dashes and Japanese full-width punctuation (「」、。) used naturally; do not Westernize JP punctuation.

**Casing.**
- Japanese headlines: sentence-shape, no forced caps, no terminal 。 in titles.
- Latin display: ALL CAPS with generous tracking (`letter-spacing: 0.08em–0.18em`) — only for the wordmark, eyebrows, and section labels like `FEATURED` / `LATEST`.
- UI buttons (sans): sentence case in JP, Title Case in EN.

**Person.** Articles are written in third person. The brand never says "you" or "私たち" in body copy. Calls to action in the engi-band footer/contact may use polite directives — 「お問い合わせはこちら」「取材のご依頼」 — but stay restrained.

**Examples (target register)**
- ✅ "日本橋の再開発は、川の景観を取り戻す試みでもある。"
- ✅ "Featured" / "Latest" / "About this media"
- ❌ "気になる再開発を一気にチェック！" *(too breathless)*
- ❌ "私たちが取材しました" *(too first-person)*

**Emoji.** None. Not in body, not in UI, not in section headers. The brand's iconography is hairline rules and small sans labels.

**Numbers / dates.** Half-width digits (`2026.04.29`) for datestamps; full-width Japanese numerals reserved for editorial flourishes inside body copy where rhythm calls for it.

---

## 4. Visual Foundations

### Palette
Two registers — they do not mix mid-page.

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#f5eee6` | page background (warm reddish paper) |
| `--color-bg-soft` | `#f0e7dc` | cards, sub-surfaces |
| `--color-bg-deep` | `#e9dccc` | recessed areas, table stripes |
| `--color-text` | `#1f1f1f` | body ink (softened, not pure black) |
| `--color-accent` | `#3a3937` | headings (slightly lighter than body) |
| `--color-muted` | `#7a736b` | metadata, captions |
| `--color-border` | `#e2d9cf` | hairline rules |
| `--color-engi` | `#6b1f24` | **footer & contact band only** |
| `--color-engi-deep` | `#4f161a` | engi shadow / pressed |
| `--color-engi-soft` | `#7d2a30` | engi hover |
| `--color-engi-ink` | `#f5eee6` | paper text on engi |

**Rule:** never pure white (`#fff`); never pure black (`#000`). The paper has temperature; the ink has softness.

### Type
- **Body / headings:** `Hiragino Mincho ProN` → `Yu Mincho` → 游明朝 → serif. **System-font first** — no webfont download for body. Hiragino on macOS/iOS, Yu Mincho on Windows.
- **UI / eyebrow:** system sans → `Hiragino Kaku Gothic ProN` → `Yu Gothic`. Used sparingly — meta, datestamps, CTA labels.
- **Latin display:** `Cormorant Garamond` (the only webfont we load) for the wordmark and Latin section labels. Wide tracking, no bold weight.
- **Rhythm:** `line-height: 1.9` and `letter-spacing: 0.03em` on body. JP body is generous on purpose — readers should be able to *breathe between glyphs*.
- **Hierarchy:** five steps only — display / h1 / h2 / h3 / body. No stacks of bolds.

### Spacing & layout
- `--content-max: 720px` for article body — hard cap, never wider.
- `--content-wide: 1080px` for card grids.
- **Footer & engi/contact bands intentionally break out** to full viewport width — this is the brief's "横幅を贅沢に使った" moment. The contrast between the narrow column and the full-bleed engi-band is the system's signature.
- Section padding is generous (96–128px vertical on desktop). Information density stays low.

### Background & texture
- A single, near-invisible dot field rendered in CSS:
  `radial-gradient(rgba(0,0,0,0.035) 0.6px, transparent 0.6px)` at `4px 4px`.
- Visible only on close inspection — supplies *air*, not *grain*.
- **No images for paper texture.** Per the user: 紙質感はCSSで表現し、画像を使いすぎない. Performance first.
- Engi-band gets the same dot field at low opacity in paper color — quiet echo, not noise.

### Imagery
- 通常記事は軽量な構成を優先 — list articles use tight, monochrome thumbnails (warm-cool muted, no saturated reds/greens).
- 特集ビジュアル & OGP are crafted by hand — single hero per featured article, never a gallery wall.
- Imagery skews **warm, slightly desaturated**, with film-like tonal compression. No drop shadows on photos. Hairline border (`1px var(--color-border)`) optional, never thick frames.

### Animation
- **Minimal by mandate.** スピード最優先.
- Only fade-ins on scroll for hero/featured (`opacity 0→1, translateY 8px→0, 480ms ease-out`). No parallax. No bouncy springs. No slide-in cards.
- Hover on links: underline color shifts from border-tone to engi (`160ms`).
- Hover on cards: image opacity 1 → 0.92 (no scale, no shadow change).

### Hover & press states
- **Links:** underline color shifts to `--color-engi`. Color of text does not change.
- **Cards:** image dims to `opacity: 0.92`; title underline appears in border-tone.
- **Engi CTA:** background `--color-engi` → `--color-engi-soft` on hover; `--color-engi-deep` + inset shadow on press; transform untouched (no shrink — paper doesn't compress).
- **Sans buttons (rare):** opacity `1 → 0.7` on hover.

### Borders, shadows, radii
- **Borders are hairlines.** `1px solid var(--color-border)` is the only border in the paper register. On engi: `1px solid var(--color-engi-rule)` (8% paper-on-engi).
- **Shadows are mostly absent.** Cards are flat. The engi-band CTA is the one place a shadow lives — `0 24px 48px -24px rgba(31,15,15,0.55)` — to lift it off the engi field.
- **Radii.** Default `0` — paper has no radius. The single exception is the **engi capsule CTA** (`border-radius: 999px`) — fully round, deliberate, the loudest mark on the page.

### Transparency & blur
- No backdrop-blur. No glassmorphism.
- Transparency is reserved for engi-on-engi text (`rgba(245,238,230, 0.62)` for secondary) and engi rules (`0.18`). The paper register stays opaque.

### Layout rules
- Top nav is a thin sans bar; not sticky on article pages (let the article breathe).
- Footer is engi, full-bleed, ≥ 320px tall, with the wordmark in Latin display and CTAs as round capsules.
- Contact/inquiry: when a contact CTA appears mid-page (e.g. before the footer of `/contact/`), it is a full-bleed engi band — the brief's "横幅を贅沢に使ったエンジ色で上品かつモダン".

---

## 5. Iconography

The brand uses **almost no icons**. The visual vocabulary is:
- Hairline horizontal rules (`<hr>` at `1px`).
- Section eyebrows in tracked sans caps.
- A single Latin arrow glyph `→` (full-width) for "read more" / "view all".
- Datestamps in dotted half-width: `2026.04.29`.

**No icon font is used.** No emoji. No Heroicons / Lucide / FontAwesome.

When an icon is genuinely needed (the engi-band CTA arrow, the close button on a menu), draw it inline as a stroked SVG using `stroke="currentColor"`, `stroke-width="1"`, and a `24×24` viewbox. Stroke caps `square`, joins `miter` — the line should feel like it was drawn with a fine fude pen, not a marker.

> *If a future codebase ships with its own icon set, replace these inline SVGs with that set verbatim. Do not blend systems.*

Logo: a Latin wordmark `DIG & BUILD` in `Cormorant Garamond`, set in `--color-accent` on paper or `--color-engi-ink` on engi. No mark. No favicon yet — flagged as TODO.

---

## 6. Index — files in this system

```
README.md                    ← you are here
SKILL.md                     ← Agent Skills entrypoint
colors_and_type.css          ← all design tokens (CSS vars + base styles)

preview/                     ← Design System cards (registered for the DS tab)
  type-*.html                ← typography specimens
  color-*.html               ← palette swatches
  spacing-*.html             ← scale, radius, shadow tokens
  components-*.html          ← buttons, cards, footer band, contact band
  brand-*.html               ← wordmark, paper texture detail

ui_kits/
  website/
    README.md                ← per-kit notes
    index.html               ← interactive walkthrough of the site
    Wordmark.jsx
    TopNav.jsx
    ArticleCard.jsx
    FeaturedHero.jsx
    CategoryStrip.jsx
    AreaList.jsx
    ContactBand.jsx          ← the engi-band CTA section
    Footer.jsx               ← the full-bleed engi footer
```

---

## 7. Caveats / open items

- **No real codebase or Figma was attached.** All component recreations are derived from the brief + the akita-souzounomori reference. When real source arrives, treat it as canon and rev.
- **Fonts:** Body uses **system fonts only** (Hiragino Mincho ProN → Yu Mincho fallback) — no Noto download. Only `Cormorant Garamond` loads from Google Fonts for Latin display. If the brand later commits to a licensed mincho (Shippori, A1, Tsukushi), swap and ask for files.
- **No logo file** was provided — the wordmark is set in type for now.
- **Imagery:** the kit uses muted placeholder gradients. Real OGP and featured visuals must be commissioned per the "要所要所のグラフィックは自作する" rule.
