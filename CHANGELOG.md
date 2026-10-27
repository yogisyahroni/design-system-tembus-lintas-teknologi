# Changelog

## 0.2.0 — 2026-10-28

- Added a generator (`npm run build`) so CSS, TypeScript, Kotlin, and a new SwiftUI output all come from `tembus.tokens.json`. Kotlin now covers every color token plus typography, elevation, and motion; the old name mapping to a different repository was removed.
- Added iOS output (`tokens/tembus.swift`).
- Typography is tokenized: font families, weights, line heights, and native sizes.
- Added `dataviz-1..6` categorical chart colors for both themes, each with a protected 3:1 pair, plus `docs/09-data-visualization.md`.
- Added `on-primary-dark` and `on-accent-light`, and protected pairs for them. Fixes unprotected text pairs that measured 3.56:1 (light) and 3.07:1 (dark).
- Added dark-theme elevation tokens.
- Registered the deep-green palette (`palette.forest-*`) and the brand orange `palette.orange-bright` (`#FF6A00`), so the presentation template keeps its orange identity and stays token-checked.
- Validator now also checks light/dark parity, `on-*` and `dataviz-*` pair coverage, template colors against the token file, and that generated files are in sync (40 protected pairs).
- Added GitHub Actions CI and `gallery/index.html`.

## 0.1.0 — 2026-10-27

- Added the canonical TEMBUS semantic token file for light and dark themes.
- Added CSS, TypeScript, and Jetpack Compose token outputs.
- Added brand, component, pattern, accessibility, platform, and governance documentation.
- Added presentation and report style templates.
- Added portable logo assets sourced from the current TEMBUS product repository.
