# Sprint 02 — Task List

> CTO creates tasks. DEV checks them off. QA verifies.

| # | Task | Owner | Status | Acceptance Criteria |
|---|------|-------|--------|---------------------|
| 1 | Define the Sprint 2 gameplay contract for difficulty selection | CTO | [ ] | Supported board sizes, difficulty labels, reset behavior, score behavior, and unsupported states are written down and unambiguous |
| 2 | Fix stale best-result behavior on board-size change | DEV | [ ] | Changing board size reloads the correct saved result immediately and never shows the previous board's score |
| 3 | Harden storage writes against browser failures | DEV | [ ] | Winning does not crash when local storage writes fail, and the UI remains playable |
| 4 | Add difficulty / board-size controls to the game UI | DEV | [ ] | A player can switch between supported board sizes from the interface using clear, accessible controls |
| 5 | Reset game state cleanly when difficulty changes | DEV | [ ] | Switching board size starts a fresh board, clears stale transient state, and preserves only the correct per-size best result |
| 6 | Adapt layout and status UI for all supported board sizes | DEV | [ ] | The board remains usable and readable on desktop and mobile for every supported size |
| 7 | Add unit and component coverage for Sprint 2 state transitions | DEV | [ ] | Tests cover board-size changes, best-result refresh behavior, storage write failure handling, and clean reset behavior |
| 8 | Add E2E coverage for replayability flows | DEV | [ ] | Browser tests verify difficulty switching, replay after win, and continued play when storage is unavailable or failing |
| 9 | QA regression pass for Sprint 1 + Sprint 2 behavior | QA | [ ] | QA confirms core gameplay still works, new difficulty flows are stable, accessibility basics hold, and no new console errors appear |

---

## Status Key

- `[ ]` — Not started
- `[~]` — In progress
- `[x]` — Done
- `[!]` — Blocked

## Notes

### Sprint 2 Notes

- Sprint 2 begins by paying off the two P1 review findings from Sprint 1
- Difficulty should be introduced as a bounded extension of the current architecture, not as a rewrite
- Keep persistence logic behind the storage adapter so UI code does not branch on browser storage edge cases
- Prefer a small, explicit set of supported board sizes over arbitrary free-form sizing

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
