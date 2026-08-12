# LEADFLOWAI DESIGN SYSTEM V1

STATUS: IMPLEMENTED FOUNDATION
DATE: 2026-08-12

## Direction
Precision Flow Architecture.

## Core visual grammar
- Precision grid is the structural base.
- Editorial-scale typography carries the commercial hierarchy.
- Light paper and obsidian sections alternate to create rhythm.
- Signal green is an accent, not a full neon theme.
- Blueprint lines and system labels reinforce engineering credibility.
- One signature system-flow visualization carries the motion/technology identity.

## Tokens implemented
`--ink`, `--ink-soft`, `--paper`, `--paper-2`, `--obsidian`, `--obsidian-2`, `--white`, `--signal`, `--blueprint`, grid lines, max width, padding, section spacing and fluid display/heading/body scales.

## Components implemented
- SiteHeader
- SiteFooter
- SectionLabel
- SystemFlow
- primary / ghost buttons
- editorial section patterns
- stage architecture rows
- process list
- quality grid
- proof/public-truth section
- FAQ
- final CTA

## Accessibility
- semantic sections/headings;
- focus-visible styling;
- reduced-motion fallback;
- SVG title/description;
- native `details/summary` FAQ;
- responsive reflow without content loss.

## Performance constraint
No external font request and no third-party animation library in the initial design foundation.
