# Decision Log

> Document important technical decisions here.
> This helps your future self (and teammates) understand WHY things are the way they are.

---

## Template

Copy this for each new decision:

```markdown
## Decision: [Title]

**Date:** YYYY-MM-DD
**Status:** Proposed / Accepted / Deprecated
**Decided by:** [who]

**Context:**
What is the issue? Why does this decision need to be made?

**Options Considered:**
1. Option A — [pros / cons]
2. Option B — [pros / cons]
3. Option C — [pros / cons]

**Decision:**
We chose Option X.

**Rationale:**
Why this option? What tradeoffs are we accepting?

**Consequences:**
What changes because of this decision?
```

---

## Decisions

## Decision: React + Vite + TypeScript for MVP

**Date:** 2026-04-28
**Status:** Accepted
**Decided by:** CTO

**Context:**
The app needs a lightweight browser UI with responsive interactions and good testability.

**Options Considered:**
1. React + Vite + TypeScript — fast scaffold, typed UI, simple static build.
2. Next.js — useful for server rendering and backend routes, but unnecessary for local-only MVP.
3. Vanilla TypeScript — minimal dependencies, but more manual state/UI organization.

**Decision:**
We chose React + Vite + TypeScript.

**Rationale:**
It fits the current Playwright-based project setup while keeping the app small and easy to deploy.

**Consequences:**
The project uses Vite scripts for development/build and Vitest for unit/component tests.

## Decision: Frontend-Only Local Persistence for v1

**Date:** 2026-04-28
**Status:** Accepted
**Decided by:** CTO

**Context:**
The MVP is a casual single-player memory game with no requirement for accounts or shared leaderboards.

**Options Considered:**
1. Local-only app with `localStorage` — simplest path and works offline.
2. Backend leaderboard — adds API, database, moderation, and deployment complexity.
3. Accounts and saved history — adds authentication and a larger data model.

**Decision:**
We chose a frontend-only app with best results persisted in `localStorage`.

**Rationale:**
The product value is in instant gameplay, not cross-device persistence.

**Consequences:**
No backend module, database, API routes, or secrets are required for v1.

## Decision: Keep Game Logic Outside Components

**Date:** 2026-04-28
**Status:** Accepted
**Decided by:** CTO

**Context:**
Memory-game behavior has several state transitions: flips, matches, mismatches, timer ticks, win state, and restarts.

**Options Considered:**
1. Pure reducer and utilities — easy to unit test and reason about.
2. Component-local state only — faster initially, but harder to test edge cases.
3. External state library — unnecessary for a single self-contained feature.

**Decision:**
We chose pure game logic plus a React hook for side effects.

**Rationale:**
The reducer captures business rules without DOM coupling, while the hook owns timers and persistence.

**Consequences:**
Unit tests target reducer behavior directly; components focus on rendering and accessibility.
