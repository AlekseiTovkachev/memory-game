# Product Requirements Document (PRD)

## 1. Overview

**Project Name:** Memory Pairs

**One-line description:** A local browser pairs game where casual players flip cards, match pairs, and try to improve their best result.

**Problem:** Casual players need a quick, low-friction game that works in the browser without accounts, setup, or network services.

**Target Users:** Casual players on desktop and mobile browsers.

## 2. Core Features

| # | Feature | Description | Priority |
|---|---------|-------------|----------|
| 1 | Play memory pairs | Render a shuffled 4x4 board, allow two-card flips, keep matches visible, and hide mismatches after a short delay. | Must Have |
| 2 | Track progress | Show move count, elapsed time, matched pair count, and game completion state. | Must Have |
| 3 | Restart game | Let the player restart from the current board size at any time. | Must Have |
| 4 | Best result | Persist the best local result for the board size using `localStorage`. | Must Have |
| 5 | Responsive accessible UI | Support keyboard play, semantic buttons, visible focus states, and mobile/desktop layouts. | Must Have |

## 3. User Stories

### Story 1: Play a Game
> As a casual player, I want to flip cards and find matching pairs, so that I can play a complete memory game.

**Acceptance Criteria:**
- [x] A new game starts with paired cards hidden.
- [x] Clicking or keyboard-activating a card reveals it.
- [x] Matching cards stay revealed.
- [x] Mismatched cards hide again after a short delay.
- [x] Input is locked while a mismatch is resolving.

### Story 2: See Progress
> As a casual player, I want to see my moves, time, and matched pairs, so that I understand how well I am doing.

**Acceptance Criteria:**
- [x] Move count increments after each two-card attempt.
- [x] Timer runs while the game is playing.
- [x] Matched pair count updates immediately after a match.
- [x] Win summary appears after all pairs are found.

### Story 3: Improve My Score
> As a casual player, I want my best local result saved, so that I can try to beat it later.

**Acceptance Criteria:**
- [x] Best result is stored locally by board size.
- [x] Lower move count is better.
- [x] If moves are tied, lower elapsed time is better.
- [x] Restarting does not erase the saved best result.

## 4. Out of Scope

- User accounts, authentication, profiles, or cloud saves.
- Backend APIs, database persistence, online leaderboards, multiplayer, or social sharing.
- Custom image themes beyond simple text labels.
- Paid APIs or AI-generated gameplay.

## 5. Success Criteria

- [x] App runs as a React + Vite + TypeScript browser app.
- [x] Core game logic is unit tested outside UI components.
- [x] UI has component coverage for restart, mismatch locking, and win state.
- [x] Playwright verifies the main happy path and keyboard interaction.
- [x] Mobile and desktop screenshots are captured by E2E tests.

## 6. Technical Constraints

- **Must use:** React + Vite + TypeScript.
- **Must not use:** Backend, database, accounts, or paid APIs for MVP.
- **Must run on:** Modern desktop and mobile browsers.
