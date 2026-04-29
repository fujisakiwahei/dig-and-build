---
name: dig-and-build-design
description: Use this skill to generate well-branded interfaces and assets for Dig & Build, an editorial Japanese media platform documenting urban development, architecture, and cities. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping or production.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. The CSS tokens live in `colors_and_type.css` — link this file from any HTML you generate so paper background, mincho serif, and engi-band utilities are available.

If working on production code, copy assets and read the rules in `README.md` to become an expert in designing with this brand. Pay particular attention to:

- The **two-register rule**: paper-toned content vs full-bleed engi-band CTA / footer. They do not mix mid-page.
- **System-font-first** body: Hiragino Mincho ProN → Yu Mincho. Only Cormorant Garamond loads from Google Fonts (Latin display only).
- **No emoji, no icon font.** Hairline rules and tracked sans labels are the visual vocabulary.
- **No pure black, no pure white.** Softened ink on warm reddish paper.
- **Generous body rhythm**: `line-height: 1.9`, `letter-spacing: 0.03em`. Do not tighten.

If the user invokes this skill without any other guidance, ask them what they want to build or design (an article page, a landing page, an OGP image, a slide deck about a city, etc), ask a few questions about audience and tone, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
