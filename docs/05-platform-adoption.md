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

## Android / Jetpack Compose

[`tokens/tembus.android.kt`](../tokens/tembus.android.kt) is a platform-neutral starter mapping. Product modules should map these values into their existing Material theme or runtime token layer rather than introducing a second color source.

Minimum requirements:

- light and dark `ColorScheme`;
- semantic `Typography` styles;
- 48dp minimum touch target;
- platform focus and accessibility semantics;
- dynamic content descriptions for operational icons.

## Reports and documents

Use [`templates/report-style.json`](../templates/report-style.json) as the baseline for Word/PDF generation. Keep body copy black or dark neutral, use green for structure, and reserve orange for a callout or decision point.

## Presentations

Use [`templates/presentation-theme.json`](../templates/presentation-theme.json) for PPTX generation. Apply the same hierarchy in speaker notes, chart legends, and tables. A slide is not allowed to introduce an unregistered brand color merely because a chart needs another series; use the documented data-visualization extension rules in the corporate guide.

## Data visualization

Use sequential neutral/green scales for magnitude and semantic colors only for status. For categorical series, pair color with labels or patterns. Always provide a text summary for charts used in reports or dashboards.
