# Technical Architecture

## 1. Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Frontend** | React + Vite + TypeScript | Fast local development, typed components, and simple static deployment. |
| **Backend** | None for MVP | The game is local-only and does not need accounts or shared persistence. |
| **Database** | Browser `localStorage` | Stores the best local result by board size without server infrastructure. |
| **AI/LLM** | None for MVP | Gameplay does not require AI features. |
| **Testing** | Vitest, Testing Library, Playwright | Unit/component coverage plus browser verification and screenshots. |
| **Hosting** | Static hosting | Vite build output can deploy anywhere that serves static files. |

## 2. System Architecture

```text
Browser
  |
  v
React App (`src/App.tsx`)
  |
  v
Memory Game Module (`frontend/modules/memory-game`)
  |-- Pure game logic and reducer
  |-- Accessible React components
  |-- Best-score storage adapter
  |
  v
localStorage
```

## 3. Key Components

### GameApp
- **Purpose:** Owns page-level layout, intro copy, and feature composition.
- **Location:** `src/App.tsx`
- **Depends on:** `MemoryGame`.

### Memory Game Module
- **Purpose:** Owns all memory-pairs behavior: card generation, reducer actions, timer, match resolution, UI, and public exports.
- **Location:** `frontend/modules/memory-game`
- **Depends on:** React and browser APIs only.

### Storage Utility
- **Purpose:** Reads/writes best results in `localStorage` and compares candidate scores.
- **Location:** `frontend/modules/memory-game/src/storage.ts`
- **Depends on:** Browser `localStorage`.

## 4. Data Model

```text
Card
  - id: string
  - pairId: string
  - label: string
  - state: hidden | revealed | matched

GameState
  - cards: Card[]
  - selectedCardIds: string[]
  - moves: number
  - matchedCount: number
  - elapsedSeconds: number
  - status: idle | playing | won
  - inputLocked: boolean

BestResult
  - moves: number
  - elapsedSeconds: number
  - completedAt: ISO datetime string
```

## 5. API Endpoints

No backend API endpoints exist in the MVP.

## 6. Folder Structure

```text
src/
  App.tsx
  main.tsx
  styles.css
  test/setup.ts

frontend/modules/memory-game/
  README.md
  src/
    components/
    gameLogic.ts
    storage.ts
    types.ts
    useMemoryGame.ts
    index.ts
  tests/unit/

tests/e2e/
  memory-game.spec.ts
```

## 7. Key Decisions

See `docs/DECISIONS.md` for the full decision log.
