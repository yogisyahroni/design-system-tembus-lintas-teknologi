# Product patterns

## Home and service discovery

The first screen should answer:

1. Where am I?
2. What can I do?
3. Is there an active order?
4. What needs my attention?

Use a clear service grid, one primary promotional surface, and an active-order card when applicable. Do not turn every service into a tiny icon or make a hero banner block the main task.

## Order card

Shared skeleton across customer, courier, merchant, and admin:

```text
[service]  [order ID]                         [status]
title / merchant / route context
------------------------------------------------------
origin / pickup                 destination / drop-off
ETA or timestamp                secondary context
------------------------------------------------------
progress or timeline
[primary action] [optional secondary action]
```

The role changes density and available actions, not the underlying hierarchy.

## Tracking

Tracking combines map, status, ETA, and the next useful action. Required states include loading, stale GPS, courier unavailable, route unavailable, delivered, and failed.

Mobile tracking uses a three-position bottom sheet:

1. Collapsed: status, ETA, courier.
2. Mid: route summary and one action.
3. Expanded: complete order context and support actions.

Use a route line, pickup/drop-off markers, and a recenter control. Never rely on a moving marker alone to communicate progress.

## Payment and checkout

Make amount, payment method, expiry, and result explicit. Show `Estimasi` for estimates. Use the same total hierarchy in customer UI, admin payment records, and corporate reporting.

Payment failure must preserve the order context and provide a clear retry or support path. Do not report success from a client-only visual state; the authoritative transaction state belongs to the backend.

## Promo, voucher, and campaign

Use a short campaign headline, one supporting condition, and one action. Surface eligibility and expiry before the customer commits. Voucher errors should explain whether the code is invalid, expired, already used, or not eligible.

Marketing banners in customer web and mobile share the same semantic content fields: title, image, alt text, campaign period, deep link, audience, and fallback behavior.

## Admin control plane

Admin screens can be dense, but keep a predictable frame:

- scope/context banner;
- page title and one primary action;
- summary metrics only when they inform the next decision;
- filters and search;
- table or card list;
- empty, loading, error, and permission states;
- audit or history affordance for sensitive changes.

Do not use a dashboard tile as a substitute for a detailed record.

## Empty, loading, and error states

Every list, detail, and network-backed surface must define:

- first load;
- refresh/retry;
- no data yet;
- no result after filtering;
- permission denied;
- server or provider failure;
- offline/stale data where relevant.

Each state should tell the user what happened and what to do next.
