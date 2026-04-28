# Sprint 01 — Task List

> CTO creates tasks. DEV checks them off. QA verifies.

| # | Task | Owner | Status | Acceptance Criteria |
|---|------|-------|--------|---------------------|
| 1 | Define Sprint 1 gameplay contract and UX states | CTO | [ ] | Rules for board size, matching behavior, restart flow, win condition, and visible game states are written down and unambiguous |
| 2 | Scaffold the frontend memory game module | DEV | [ ] | A dedicated frontend module exists for the game, wired into the app entry point, with clear ownership of components and game state |
| 3 | Implement deterministic game setup and shuffle behavior | DEV | [ ] | A new game generates paired cards, shuffles them predictably in tests, and renders a complete starting board |
| 4 | Implement player interaction flow | DEV | [ ] | A user can flip cards, only valid flips are accepted, two revealed cards resolve correctly as match or mismatch, and invalid rapid interactions are prevented |
| 5 | Implement game progress and win states | DEV | [ ] | The UI shows move count, matched progress, and a clear victory state when all pairs are found |
| 6 | Implement restart and replay flow | DEV | [ ] | A completed or in-progress game can be restarted cleanly without stale state or page refresh |
| 7 | Add unit tests for core game rules | DEV | [ ] | Tests cover deck generation, matching logic, mismatch reset behavior, win detection, and any helper logic with meaningful branching |
| 8 | Add E2E coverage for the primary user journey | DEV | [ ] | An end-to-end test verifies page load, successful gameplay interactions, and restart behavior on the running app |
| 9 | QA verification and regression pass | QA | [ ] | QA confirms happy path, edge cases, accessibility basics, and absence of console errors on supported viewport sizes |

---

## Status Key

- `[ ]` — Not started
- `[~]` — In progress
- `[x]` — Done
- `[!]` — Blocked

## Notes

### Sprint 1 Notes

- This sprint is intentionally frontend-first to reduce architectural drag
- If a backend becomes necessary, it must be justified by a concrete Sprint 1 requirement
- Use stable selectors for E2E from the start
- Prefer extracting gameplay rules into testable logic rather than burying them in UI components

### Proposed Execution Order

1. Task 1
2. Task 2
3. Task 3
4. Task 4
5. Task 5
6. Task 6
7. Task 7
8. Task 8
9. Task 9
