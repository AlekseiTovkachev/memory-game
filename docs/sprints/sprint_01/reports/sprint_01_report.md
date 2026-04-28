# Sprint 01 — Report

| Field | Value |
|-------|-------|
| **Sprint** | 01 |
| **Status** | Complete with follow-up fixes identified |
| **Tasks completed** | 9 / 9 |

---

## What was delivered

- A playable browser-based Memory Pairs MVP built with React, Vite, and TypeScript
- A dedicated frontend memory game module with isolated game logic, typed state, and reusable UI components
- Deterministic board generation support for testing via URL parameters such as `?pairs=2&seed=ordered`
- Core gameplay flow: flip cards, resolve matches and mismatches, lock input during mismatch resolution, detect win state, and restart without page refresh
- Player progress UI showing moves, elapsed time, matched pairs, and a win summary
- Local best-score persistence using `localStorage`
- Unit coverage for game logic, storage helpers, and core UI behavior
- Playwright coverage for the primary happy path, keyboard interaction, and screenshot capture
- Updated project documentation including PRD, architecture, README, and module-level documentation

## What wasn't delivered (and why)

- A fully clean sprint closeout with zero follow-up defects was **not** achieved. Post-implementation review identified two correctness issues that should be fixed in the next pass:
- The best-score panel can show stale data if board size changes after initial mount
- The app can throw on victory in environments where `localStorage.setItem(...)` is blocked
- No backend, accounts, cloud save, leaderboard, multiplayer mode, or advanced theming was delivered because these were intentionally out of scope for Sprint 1

## Bugs found

- **P1:** Best-score panel goes stale when board size changes because saved results are not reloaded when `pairCount` changes
- **P1:** Winning can crash when `localStorage` writes are blocked because storage writes are not guarded with `try/catch`
- **Environment limitation during review:** Playwright could not be re-run inside the sandboxed review environment because the local web server could not bind to `127.0.0.1:3000`; unit tests and production build did pass locally during review

## Key decisions made

- Keep Sprint 1 frontend-only and local-first; no backend or shared persistence for the MVP
- Isolate gameplay rules in a reducer and helper module instead of embedding them directly in UI components
- Store best results per board size in browser `localStorage`
- Use deterministic seed support to make gameplay tests and E2E scenarios reproducible
- Prioritize accessibility basics and keyboard play in the MVP rather than treating them as later polish

## Lessons learned

- The narrow MVP scope was the right call; it produced a complete playable game without backend drag
- Isolating rules from presentation made unit testing straightforward and kept the module readable
- Documentation quality matters at sprint closeout; leaving the report as a template made the sprint look less complete than the implementation actually was
- Storage adapters should fail closed on both reads and writes, especially in browser-only apps
- Review after implementation still adds real value even when tests are green, because state-transition and browser-environment bugs can slip through
