export type CardState = "hidden" | "revealed" | "matched";

export type GameStatus = "idle" | "playing" | "won";

export type Card = {
  id: string;
  pairId: string;
  label: string;
  state: CardState;
};

export type BestResult = {
  moves: number;
  elapsedSeconds: number;
  completedAt: string;
};

export type GameState = {
  cards: Card[];
  selectedCardIds: string[];
  moves: number;
  matchedCount: number;
  elapsedSeconds: number;
  status: GameStatus;
  inputLocked: boolean;
};

export type GameAction =
  | { type: "START"; cards: Card[] }
  | { type: "FLIP_CARD"; cardId: string }
  | { type: "RESOLVE_MISMATCH" }
  | { type: "TICK" };

