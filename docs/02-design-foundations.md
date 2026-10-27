# Design foundations

The canonical values live in [`tokens/tembus.tokens.json`](../tokens/tembus.tokens.json). Use semantic names in product code; the raw hex values below are a reference, not an invitation to hardcode them.

## Color

### Light theme

| Semantic token | Value | Use |
|---|---|---|
| `background` | `#F7F8F7` | Page background |
| `surface` | `#FFFFFF` | Cards and controls |
| `surface-subtle` | `#EEF3EF` | Quiet sections and tinted containers |
| `foreground` | `#14211A` | Primary text |
| `foreground-secondary` | `#415047` | Supporting text |
| `foreground-muted` | `#5F6B63` | Metadata only when contrast is preserved |
| `primary` | `#006437` | Main brand action and links |
| `primary-dark` | `#003A20` | Brand header and deep surfaces |
| `accent` | `#C2410C` | Orange action/emphasis |
| `success` | `#15803D` | Completed or healthy state |
| `warning` | `#B45309` | Attention required |
| `error` | `#B91C1C` | Failed, destructive, or blocked state |
| `info` | `#1D4ED8` | Neutral information |

### Dark theme

Dark mode uses tonal surfaces rather than a simple inversion:

- `background`: `#0B120E`
- `surface`: `#142019`
- `surface-raised`: `#1B2921`
- `foreground`: `#F4F7F5`
- `foreground-secondary`: `#D0DBD3`
- `primary`: `#34D399`
- `accent`: `#FB923C`

The complete dark semantic set is in the token file. Do not reuse light-theme text colors on dark surfaces without checking contrast.

## Typography

Use a legible humanist sans already available on the target platform. Keep the type scale stable even when the font implementation changes.

| Style | Size / line height | Weight | Use |
|---|---:|---:|---|
| Display | `clamp(2.25rem, 5vw, 3.75rem)` | 700 | Landing hero only |
| Page title | `clamp(1.75rem, 3vw, 2.25rem)` | 700 | Page and dashboard titles |
| Section title | `1.25rem / 1.5` | 700 | Card and section headings |
| Body | `1rem / 1.5` | 400 | Default reading text |
| Body small | `0.875rem / 1.5` | 400 | Supporting text |
| Label | `0.8125rem / 1.25` | 600 | Form and table labels |
| Caption | `0.75rem / 1.5` | 500 | Metadata and helper text |
| Table cell | `0.8125rem / 1.4` | 400–600 | Dense operational data |

Use weight and spacing to create hierarchy; do not make every label uppercase or bold.

## Spacing and layout

Use the 4px base scale:

`4 · 8 · 12 · 16 · 20 · 24 · 32`

Recommended page padding:

- Mobile: `16–20px`.
- Tablet: `24px`.
- Desktop: `32px` minimum, with a content max-width of `1200px`.

Use an 8px or 16px gap for related controls and at least 24px between separate content groups. Do not compress a primary action against a destructive action.

## Shape and elevation

| Token | Value | Use |
|---|---:|---|
| `radius.sm` | `8px` | Compact controls |
| `radius.md` | `12px` | Inputs and standard buttons |
| `radius.lg` | `16px` | Cards and grouped surfaces |
| `radius.pill` | `999px` | Status chips and tags only |

Use borders and tonal surfaces before shadows. `raised` is for cards; `overlay` is for modals, menus, and bottom sheets. Dark mode should prefer surface contrast over a heavy black shadow.

## Motion

- Fast: `150ms` for hover and pressed feedback.
- Standard: `200ms` for state transitions.
- Slow: `300ms` for layout or overlay movement.
- Easing: `cubic-bezier(0.2, 0, 0, 1)`.
- Respect `prefers-reduced-motion` and the platform equivalent by using the reduced token.

Motion must explain a state change. Never animate a critical tracking or payment status in a way that delays comprehension.

## Iconography

Use rounded linear icons with an optical stroke around 1.8–2px. Filled icons are reserved for active navigation, state emphasis, or a compact service illustration. Every meaningful icon button needs an accessible name and a visible focus state.
