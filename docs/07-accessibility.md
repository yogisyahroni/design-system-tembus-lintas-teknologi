# Accessibility contract

Accessibility is part of the component contract, not a final visual polish step.

## Required baseline

- Normal text meets WCAG AA contrast of at least 4.5:1.
- Large text meets at least 3:1.
- Essential control boundaries and focus indicators meet at least 3:1.
- Interactive targets are at least 48px/48dp where the platform allows.
- Focus is visible and never removed without an equivalent indicator.
- Every icon-only action has an accessible name.
- Status is conveyed with text or shape in addition to color.
- Reduced motion is respected.
- Layout survives zoom, large text, and narrow widths.

## Focus behavior

Use `:focus-visible` on web and the native focus semantics on mobile. Focus must not be hidden behind a sticky header, modal, drawer, or bottom sheet. After closing an overlay, return focus to the invoking control.

## Content and images

- Decorative images use empty alt text or the platform equivalent.
- Informative campaign images use concise alt text describing the meaningful action or offer.
- Do not put essential terms only inside an image.
- Charts include a text summary and source/period metadata.

## Verification

Run automated contrast and semantics checks where available, then verify representative screens with keyboard navigation, screen reader, mobile text scaling, and reduced-motion settings. A green automated result does not replace task-flow verification.

The token file records protected foreground/background pairs. `npm run validate` checks their syntax and contrast ratios.
