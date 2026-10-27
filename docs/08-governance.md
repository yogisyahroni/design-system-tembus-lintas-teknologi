# Governance

## Ownership

The design system is jointly owned by Product Design and Engineering. Product teams own implementation adapters; the design-system repository owns semantic naming, shared behavior, and migration guidance.

## Adding a token

1. Confirm an existing token cannot express the need.
2. Name the token by semantic purpose, not visual color (`error`, not `red`).
3. Define light and dark behavior or document why the token is theme-specific.
4. Add a WCAG protected pair when the token is used for text, controls, or focus.
5. Edit `tembus.tokens.json` only, then run `npm run build` to regenerate CSS, TypeScript, Kotlin, and Swift.
6. Run `npm run validate` and record a changelog entry. Every `on-*` token and every `dataviz-*` token must have a protected pair.

## Adding a component or pattern

Document the problem, existing patterns considered, variants, states, responsive behavior, accessibility behavior, and migration path. A component is not shared merely because it appears in two screens; it is shared when its behavior is stable and documented.

## Versioning

- Patch: clarifications or non-breaking documentation fixes.
- Minor: new token/component/pattern that does not change existing meaning.
- Major: semantic rename, removed token, behavior change, or visual change that requires consumer migration.

## Review checklist

- Is the change needed across more than one surface?
- Does it preserve brand hierarchy and semantic meaning?
- Are light, dark, responsive, and error states handled?
- Does it meet accessibility requirements?
- Are existing consumers and migration steps known?
- Does the change improve consistency rather than add another exception?
