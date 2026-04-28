# Memory Game Module

Owns the local browser memory pairs game.

## Responsibilities

- Generate paired cards for a board.
- Manage game state with a pure reducer.
- Render accessible card, board, score, restart, and win UI.
- Persist best results to `localStorage`.

## Public Exports

- `MemoryGame` — complete game feature component.
- `createCards`, `gameReducer`, `createInitialState` — testable game logic.
- `getBestResult`, `saveBestResult` — local persistence helpers.

