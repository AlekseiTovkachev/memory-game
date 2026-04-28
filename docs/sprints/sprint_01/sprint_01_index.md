# Sprint 01 — Playable Memory Game MVP

| Field | Value |
|-------|-------|
| **Sprint** | 01 |
| **Goal** | Deliver a playable, testable single-player memory game in the browser |
| **Status** | Not Started |
| **Token Budget** | 120k tokens |
| **Token Guardrail** | Stop and re-scope if projected work exceeds 150k tokens |

## Budget Model

Sprint 1 is governed by an AI execution budget rather than calendar dates.

- **Planning + architecture:** up to 20k tokens
- **Implementation:** up to 65k tokens
- **Testing + QA pass:** up to 25k tokens
- **Docs + cleanup:** up to 10k tokens

If the sprint threatens to exceed the token guardrail, reduce scope before adding new work.

---

## Scope

What features / tasks are in this sprint?

1. Define the MVP game loop and UI states for a browser-based memory game
2. Implement the frontend game board, card interactions, match logic, and restart flow
3. Add player feedback such as move count, matched pairs, and win state
4. Add focused automated coverage for game logic and a basic E2E happy path
5. Document assumptions and defer non-MVP features to later sprints

## Assumptions

- This project is a browser-based `memory-game`
- Sprint 1 targets a **single-player** experience only
- We will optimize for a frontend-first delivery with little or no backend dependency
- Visual polish matters, but gameplay correctness and testability matter more
- Features such as accounts, leaderboards, persistence, multiplayer, and AI opponents are out of scope for this sprint

---

## Exit Criteria

- [ ] All tasks completed and tested
- [ ] No critical bugs
- [ ] Code reviewed
- [ ] Demo-ready
- [ ] A user can start a game, reveal cards, match pairs, finish the board, and restart without refreshing
- [ ] Total delivery remains within the agreed token budget or is explicitly re-approved

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| PRD is still a placeholder, so product expectations may shift | High | High | Treat this sprint as MVP discovery, document assumptions clearly, and keep the scope narrow |
| UI work could consume time without improving core gameplay | Medium | Medium | Prioritize rules, states, and accessibility before visual refinement |
| Game state logic may become tangled if implemented directly in components | Medium | High | Keep game rules isolated in a testable module or hook |
| E2E tests may be flaky if selectors and loading states are vague | Medium | Medium | Define stable selectors and test a small number of critical flows |

## Recommended Architecture for Sprint 1

- **Primary surface:** frontend-only playable app
- **Core module:** isolated game-state logic for deck creation, card flips, match resolution, and win detection
- **UI layer:** board, card, scoreboard/status, and restart control
- **Testing:** unit tests for rules and state transitions, E2E for the happy path

## Out of Scope

- User accounts or authentication
- Saved progress or persistence across sessions
- Online leaderboard or analytics pipeline
- Multiplayer or turn-sharing
- AI-generated content beyond any course requirement not yet defined
- Complex animations that materially slow implementation

---

## Artifacts

- Tasks: `todo/sprint_01_todo.md`
- Report: `reports/sprint_01_report.md`
- Review: `reviews/sprint_01_review.md`
