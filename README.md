# TEMBUS Design System

The shared visual language for TEMBUS products, operations tools, corporate reports, and presentations.

> **Brand promise:** Lebih Dekat, Lebih Cepat

This repository is the portable source of truth for the TEMBUS design language. It is intentionally platform-neutral: product teams can consume the same semantic tokens in web, Android, documentation, and corporate communication without inventing a new shade, radius, or spacing value for every screen.

## Start here

1. Read [Brand foundations](docs/01-brand-foundations.md) before creating a logo lockup, campaign, or presentation.
2. Use [Design foundations](docs/02-design-foundations.md) for color, type, spacing, shape, motion, and accessibility.
3. Use [Components](docs/03-components.md) and [Patterns](docs/04-patterns.md) before creating a new UI pattern.
4. Use [Corporate communication](docs/06-corporate-communication.md) for PPT, reports, charts, and executive documents.
5. Run `npm run validate` before committing token changes.

## Repository map

```text
tokens/
  tembus.tokens.json     Canonical semantic tokens and WCAG protected pairs
  tembus.css             Web CSS variables and utility primitives
  tembus.ts              TypeScript token exports
  tembus.android.kt      Jetpack Compose starter mapping
docs/
  01-brand-foundations.md
  02-design-foundations.md
  03-components.md
  04-patterns.md
  05-platform-adoption.md
  06-corporate-communication.md
  07-accessibility.md
  08-governance.md
assets/brand/             Approved working logo assets
templates/
  presentation-theme.json
  report-style.json
scripts/validate-tokens.mjs
```

## Source-of-truth rule

`tokens/tembus.tokens.json` owns semantic values. The CSS, TypeScript, and Android files are platform outputs and must stay aligned with it. If a product needs a new value, add a semantic token first, document its purpose, and update the platform outputs in the same change.

Do not hardcode a new hex value in an application to solve a one-off visual issue. Prefer an existing semantic token; if it is genuinely missing, propose the token in this repository.

## Product DNA

- **Foundation:** dark forest green and calm neutral surfaces.
- **Action:** orange is reserved for high-priority actions and emphasis.
- **Information:** operational states must be readable at a glance and never rely on color alone.
- **Density:** customer experiences are calm and spacious; courier, merchant, and admin tools can be denser while preserving touch targets and hierarchy.
- **Tone:** fast, trustworthy, clear, and operational—not decorative for its own sake.

## Supported surfaces

The system is designed for Customer, Courier, Merchant, Admin, landing pages, payment and tracking flows, internal reports, and executive presentations. Role-specific density may change; the brand grammar must not.

## Contribution checklist

- [ ] The change uses semantic tokens.
- [ ] Light and dark behavior is defined where applicable.
- [ ] Keyboard, focus, screen-reader, and touch behavior are documented.
- [ ] Empty, loading, error, and disabled states are covered.
- [ ] Corporate/reporting implications are considered if the pattern is reused outside an app.
- [ ] `npm run validate` passes.

## License and ownership

The repository is intended for TEMBUS internal and product use. Confirm the organization’s final asset and font licensing before distributing a public package or embedding third-party artwork.
