# Platform adoption

## Web

Import [`tokens/tembus.css`](../tokens/tembus.css) at the application boundary and use semantic variables:

```css
.primary-action {
  background: var(--token-color-primary);
  color: var(--token-color-on-primary);
  border-radius: var(--token-radius-md);
}
```

Do not copy values into component CSS. If a framework has its own theme system, map the semantic variables once at the adapter boundary.

## TypeScript

Use [`tokens/tembus.ts`](../tokens/tembus.ts) for non-CSS consumers, chart configuration, or typed design-system adapters. Keep semantic names stable so consumers do not depend on raw palette names.

## Generated outputs

`tokens/tembus.css`, `tembus.ts`, `tembus.android.kt`, and `tembus.swift` are generated from `tembus.tokens.json`. Never edit them by hand. Run `npm run build` after changing a token; `npm run validate` and CI fail if any output is out of date.

## Android / Jetpack Compose

[`tokens/tembus.android.kt`](../tokens/tembus.android.kt) provides light and dark color objects, spacing, radius, size, `TextStyle` typography, elevation, and motion durations. Product modules should map these values into their existing Material theme rather than introducing a second color source.

Minimum requirements:

- light and dark `ColorScheme`;
- semantic `Typography` styles from `TembusTypography`;
- 48dp minimum touch target;
- platform focus and accessibility semantics;
- dynamic content descriptions for operational icons.

Color names follow the token name in PascalCase (`PrimaryDark`, `Dataviz1`). A few legacy names are kept via `platformMappings.android.nameOverrides` (for example `foreground` is `OnBackground`).

## iOS / SwiftUI

[`tokens/tembus.swift`](../tokens/tembus.swift) exposes `TembusColor` (dynamic light/dark `Color`), `TembusSpacing`, `TembusRadius`, `TembusSize`, `TembusMotion`, and `TembusTypography`. Apply a text style with `.tembusText(TembusTypography.body)`.

```swift
Text("Selesai")
    .tembusText(TembusTypography.label)
    .foregroundStyle(TembusColor.onSuccess)
    .padding(TembusSpacing.sm)
    .background(TembusColor.success)
```

Use the system font and Dynamic Type; the native sizes are the base size at the default text size. The Swift and Kotlin outputs are generated but not compiled in this repository's CI; build them once in the consuming app when adopting.

## Reports and documents

Use [`templates/report-style.json`](../templates/report-style.json) as the baseline for Word/PDF generation. Keep body copy black or dark neutral, use green for structure, and reserve orange for a callout or decision point.

## Presentations

Use [`templates/presentation-theme.json`](../templates/presentation-theme.json) for PPTX generation. Apply the same hierarchy in speaker notes, chart legends, and tables. A slide is not allowed to introduce an unregistered brand color merely because a chart needs another series; use the `dataviz` series in [Data visualization](09-data-visualization.md). Template colors are checked against the token file by `npm run validate`.

## Data visualization

Follow [Data visualization](09-data-visualization.md).
