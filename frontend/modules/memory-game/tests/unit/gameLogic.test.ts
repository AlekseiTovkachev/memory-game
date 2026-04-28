import { describe, expect, it } from "vitest";
import { createCards, createInitialState, gameReducer, shuffleCards } from "../../src";

describe("memory game logic", () => {
  it("creates exactly two cards for each pair", () => {
    const cards = createCards(4, "ordered");
    const counts = cards.reduce<Record<string, number>>((result, card) => {
      result[card.pairId] = (result[card.pairId] ?? 0) + 1;
      return result;
    }, {});

    expect(cards).toHaveLength(8);
    expect(Object.values(counts)).toEqual([2, 2, 2, 2]);
  });

  it("shuffles without losing cards or pairs", () => {
    const cards = createCards(4, "ordered");
    const shuffled = shuffleCards(cards, () => 0.3);

    expect(shuffled).toHaveLength(cards.length);
    expect(shuffled.map((card) => card.id).sort()).toEqual(cards.map((card) => card.id).sort());
  });

  it("matches two cards from the same pair", () => {
    const cards = createCards(2, "ordered");
    const started = gameReducer(createInitialState(), { type: "START", cards });
    const firstFlip = gameReducer(started, { type: "FLIP_CARD", cardId: "pair-1-a" });
    const secondFlip = gameReducer(firstFlip, { type: "FLIP_CARD", cardId: "pair-1-b" });

    expect(secondFlip.moves).toBe(1);
    expect(secondFlip.matchedCount).toBe(2);
    expect(secondFlip.selectedCardIds).toEqual([]);
    expect(secondFlip.cards.filter((card) => card.state === "matched")).toHaveLength(2);
  });

  it("locks mismatched cards until they are resolved", () => {
    const cards = createCards(2, "ordered");
    const started = gameReducer(createInitialState(), { type: "START", cards });
    const firstFlip = gameReducer(started, { type: "FLIP_CARD", cardId: "pair-1-a" });
    const mismatch = gameReducer(firstFlip, { type: "FLIP_CARD", cardId: "pair-2-a" });
    const ignoredWhileLocked = gameReducer(mismatch, { type: "FLIP_CARD", cardId: "pair-1-b" });
    const resolved = gameReducer(mismatch, { type: "RESOLVE_MISMATCH" });

    expect(mismatch.inputLocked).toBe(true);
    expect(ignoredWhileLocked).toEqual(mismatch);
    expect(resolved.inputLocked).toBe(false);
    expect(resolved.selectedCardIds).toEqual([]);
    expect(resolved.cards.filter((card) => card.state === "hidden")).toHaveLength(4);
  });

  it("sets the game to won after the final pair", () => {
    const cards = createCards(1, "ordered");
    const started = gameReducer(createInitialState(), { type: "START", cards });
    const firstFlip = gameReducer(started, { type: "FLIP_CARD", cardId: "pair-1-a" });
    const won = gameReducer(firstFlip, { type: "FLIP_CARD", cardId: "pair-1-b" });

    expect(won.status).toBe("won");
    expect(won.moves).toBe(1);
  });
});

