# Sprint 02 — Reliability and Replayability

| Field | Value |
|-------|-------|
| **Sprint** | 02 |
| **Goal** | Strengthen Memory Pairs correctness and add replayable difficulty selection without introducing backend scope |
| **Status** | Not Started |
| **Token Budget** | 140k tokens |
| **Token Guardrail** | Stop and re-scope if projected work exceeds 175k tokens |

## Budget Model

Sprint 2 is governed by an AI execution budget rather than calendar dates.

- **Planning + architecture:** up to 20k tokens
- **Implementation:** up to 75k tokens
- **Testing + QA pass:** up to 30k tokens
- **Docs + cleanup:** up to 15k tokens

If the sprint threatens to exceed the token guardrail, reduce scope before adding new work.

---

## Scope

What features / tasks are in this sprint?

1. Fix the Sprint 1 correctness issues identified in review
2. Add user-selectable difficulty / board-size options that work cleanly within the current frontend-only architecture
3. Make best-result persistence and display correct per board size and resilient to storage failures
4. Improve replay flow so changing difficulty or restarting always produces a clean, understandable game state
5. Expand automated coverage around difficulty switching, persistence behavior, and failure handling

## Assumptions

- The product remains a browser-based single-player memory game
- Sprint 2 stays frontend-only and local-first
- Difficulty selection is implemented through board-size variation rather than new game rules
- Best-result persistence remains local to the browser, not synced across devices
- UX improvements should support repeated play, not turn the app into a broader platform

---

## Exit Criteria

- [ ] The two known P1 review issues from Sprint 1 are fixed and covered by tests
- [ ] A player can change difficulty / board size in the UI without stale score data or broken game state
- [ ] Best-result display updates correctly for each supported board size
- [ ] Storage failures degrade gracefully and do not crash the game
- [ ] Automated coverage includes difficulty switching and persistence edge cases
- [ ] No critical regressions in the core play / win / restart loop
- [ ] Total delivery remains within the agreed token budget or is explicitly re-approved

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Difficulty switching may create stale UI or mixed game state | Medium | High | Centralize board-size changes through the hook and explicitly reset derived state |
| Larger boards may stress layout and accessibility on small screens | Medium | Medium | Constrain the supported board sizes and test mobile layouts early |
| Storage error handling may become inconsistent across read/write paths | Medium | High | Keep all persistence logic inside the storage adapter and test failure cases directly |
| Expanding replay options may increase E2E flakiness | Medium | Medium | Use stable selectors and deterministic seeds for targeted browser tests |

## Recommended Architecture for Sprint 2

- **Primary surface:** existing frontend-only app
- **State layer:** extend the memory-game hook to own difficulty selection and board-size resets
- **Persistence layer:** harden the storage adapter to safely read/write best results per board size
- **UI layer:** add a clear difficulty control plus status feedback tied to the active board size
- **Testing:** add unit/component tests for board-size transitions and storage failure cases, plus E2E coverage for difficulty switching

## Out of Scope

- Backend APIs or cloud persistence
- Accounts, profiles, or global leaderboards
- Multiplayer or turn-based modes
- New content systems such as custom card themes or uploaded assets
- Major visual redesign unrelated to replayability or accessibility

---

## Artifacts

- Tasks: `todo/sprint_02_todo.md`
- Report: `reports/sprint_02_report.md`
- Review: `reviews/sprint_02_review.md`
