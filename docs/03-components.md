# Components

This page defines the minimum contract for shared components. Open [`gallery/index.html`](../gallery/index.html) in a browser to see the core components and their states in light and dark. Teams may implement the components in their native framework, but the semantic behavior and states must remain equivalent.

## Button

Use for an action that changes state, submits, navigates, or confirms.

| Variant | Use |
|---|---|
| Primary | One main action in a region |
| Secondary | A supporting action with lower emphasis |
| Tertiary | Low-emphasis navigation or inline action |
| Destructive | Delete, cancel, revoke, or irreversible action |
| Icon-only | Compact action with an accessible label |

Required states: default, hover, pressed, focus-visible, disabled, loading, and success/error feedback where relevant.

Rules:

- Keep a minimum touch target of `48px`.
- A loading button keeps its width and announces progress.
- Do not use orange for destructive actions.
- Do not place two competing primary buttons in the same region.

## Field and form group

An input consists of a visible label, control, optional helper text, and an error or success message. Placeholder text is not a label.

Required states: default, hover, focus-visible, filled, disabled, read-only, invalid, and loading.

Accessibility:

- The label is programmatically associated with the control.
- Errors are associated with `aria-describedby` or the native platform equivalent.
- Never communicate validity through color alone.
- Preserve entered values when a request fails.

## Status chip

Use a short, stable label for an order or operational state. Pair color with text and an optional icon.

Recommended semantic mapping:

| State family | Examples |
|---|---|
| Success | Selesai, Aktif, Terverifikasi |
| Progress | Diproses, Dalam Perjalanan, Mencari Kurir |
| Attention | Menunggu Pembayaran, Perlu Tindakan |
| Error | Gagal, Dibatalkan, Kedaluwarsa |
| Neutral | Draft, Belum Dimulai |

Do not show a chip without a meaningful label. Avoid a chip for every piece of metadata.

## Card

Cards group related content; they are not a substitute for page structure. Use one clear title, one content hierarchy, and an explicit action when interactive.

Variants: standard, interactive, selected, warning, error, dark, and empty.

Interactive cards need keyboard focus, a visible focus ring, and a clear pressed/selected state. If only one element is actionable, use a normal link or button inside the card instead of making the entire card clickable.

## App bar and navigation

Use the brand app bar for customer and marketing surfaces, a back/title bar for task flows, and a dense operational header for admin. Navigation labels must remain visible for the active destination.

Keep primary navigation to 4–5 destinations on mobile. Desktop sidebars may contain more destinations, but group them by user goal rather than backend service names.

## Modal, drawer, and bottom sheet

- Use a modal for a focused decision or short form.
- Use a drawer for contextual navigation or filters.
- Use a bottom sheet for tracking context and mobile actions.
- Trap focus in a modal, close on Escape where supported, restore focus to the invoking control, and provide a labelled heading.

Do not hide a critical payment error behind a dismiss-only overlay.

## Table and data display

Tables are for comparison and operations. Provide a mobile alternative when horizontal scrolling would hide essential context. Use stable column labels, row actions with accessible names, empty/loading/error states, and a clear sort/filter cue.

## Component documentation minimum

Every new shared component must document:

1. When to use and when not to use.
2. Variants, sizes, and all interactive states.
3. Token dependencies.
4. Keyboard and screen-reader behavior.
5. Empty, loading, error, and responsive behavior.
