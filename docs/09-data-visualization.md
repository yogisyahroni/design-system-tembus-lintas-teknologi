# Data visualization

Charts in reports, decks, and dashboards use the same tokens as the product.

## Series colors

Six categorical colors, `dataviz-1` to `dataviz-6`, exist in both themes and are checked to reach at least 3:1 against `surface` and `surface-subtle`.

| Token | Light | Dark |
|---|---|---|
| `dataviz-1` | `#006437` | `#34D399` |
| `dataviz-2` | `#C2410C` | `#FB923C` |
| `dataviz-3` | `#1D4ED8` | `#60A5FA` |
| `dataviz-4` | `#7E22CE` | `#C084FC` |
| `dataviz-5` | `#0E7490` | `#22D3EE` |
| `dataviz-6` | `#5F6B63` | `#AAB5AE` |

Use them in order. Do not use more than six series in one chart; group the rest into "Lainnya".

## Rules

- Colors alone never distinguish series. Add a direct label, a marker shape, or a line dash pattern.
- Several of these hues have similar lightness, so they are not safe for color-blind readers without the labels or markers above.
- For magnitude, use one hue in a sequential scale (`primary-soft` to `primary`), not the categorical set.
- Status colors (`success`, `warning`, `error`) are for status only, never as a series color. Orange (`accent`) is for the single value that needs a decision.
- Every chart has a title, a text summary, a source, and the period.
- Gridlines use `border`; axis text uses `foreground-secondary`; data labels use `foreground`.
- Deep greens from `palette.forest-*` are for deck cover fields, not chart series.

## Adding a series color

Add `dataviz-7` to both themes, add a protected pair against `surface` (and `surface-subtle`), run `npm run build`, then `npm run validate`.
