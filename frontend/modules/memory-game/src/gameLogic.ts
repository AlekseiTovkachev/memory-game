import type { Card, GameAction, GameState } from "./types";

const CARD_LABELS = ["Sun", "Moon", "Star", "Wave", "Leaf", "Gem", "Bolt", "Key"];

export function createInitialState(): GameState {
  return {
    cards: [],
    selectedCardIds: [],
    moves: 0,
    matchedCount: 0,
    elapsedSeconds: 0,
    status: "idle",
    inputLocked: false,
  };
}

export function createSeededRandom(seed: string): () => number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return () => {
    hash += 0x6d2b79f5;
    let value = hash;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffleCards(cards: Card[], random: () => number = Math.random): Card[] {
  const shuffled = [...cards];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function createCards(pairCount = 8, seed?: string): Card[] {
  const pairs = CARD_LABELS.slice(0, pairCount).flatMap((label, pairIndex) => {
    const pairId = `pair-${pairIndex + 1}`;
    return [
      { id: `${pairId}-a`, pairId, label, state: "hidden" as const },
      { id: `${pairId}-b`, pairId, label, state: "hidden" as const },
    ];
  });

  if (seed === "ordered") {
    return pairs;
  }

  return shuffleCards(pairs, seed ? createSeededRandom(seed) : Math.random);
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START":
      return {
        ...createInitialState(),
        cards: action.cards,
        status: "playing",
      };

    case "FLIP_CARD":
      return flipCard(state, action.cardId);

    case "RESOLVE_MISMATCH":
      return {
        ...state,
        cards: state.cards.map((card) =>
          state.selectedCardIds.includes(card.id) && card.state === "revealed"
            ? { ...card, state: "hidden" }
            : card,
        ),
        selectedCardIds: [],
        inputLocked: false,
      };

    case "TICK":
      if (state.status !== "playing") {
        return state;
      }

      return {
        ...state,
        elapsedSeconds: state.elapsedSeconds + 1,
      };

    default:
      return state;
  }
}

function flipCard(state: GameState, cardId: string): GameState {
  if (state.status !== "playing" || state.inputLocked) {
    return state;
  }

  const target = state.cards.find((card) => card.id === cardId);
  if (!target || target.state !== "hidden" || state.selectedCardIds.includes(cardId)) {
    return state;
  }

  const nextSelectedCardIds = [...state.selectedCardIds, cardId];
  const revealedCards = state.cards.map((card) =>
    card.id === cardId ? { ...card, state: "revealed" as const } : card,
  );

  if (nextSelectedCardIds.length < 2) {
    return {
      ...state,
      cards: revealedCards,
      selectedCardIds: nextSelectedCardIds,
    };
  }

  const [firstId, secondId] = nextSelectedCardIds;
  const firstCard = revealedCards.find((card) => card.id === firstId);
  const secondCard = revealedCards.find((card) => card.id === secondId);
  const nextMoves = state.moves + 1;

  if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
    const matchedCards = revealedCards.map((card) =>
      card.id === firstId || card.id === secondId ? { ...card, state: "matched" as const } : card,
    );
    const nextMatchedCount = state.matchedCount + 2;
    const won = nextMatchedCount === matchedCards.length;

    return {
      ...state,
      cards: matchedCards,
      selectedCardIds: [],
      moves: nextMoves,
      matchedCount: nextMatchedCount,
      status: won ? "won" : "playing",
      inputLocked: false,
    };
  }

  return {
    ...state,
    cards: revealedCards,
    selectedCardIds: nextSelectedCardIds,
    moves: nextMoves,
    inputLocked: true,
  };
}

export function formatElapsedTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

