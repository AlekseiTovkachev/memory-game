import { useEffect, useMemo, useReducer, useState } from "react";
import { createCards, createInitialState, gameReducer } from "./gameLogic";
import { getBestResult, saveBestResult } from "./storage";
import type { BestResult, Card } from "./types";

type UseMemoryGameOptions = {
  pairCount?: number;
  seed?: string;
  resolveDelayMs?: number;
};

export function useMemoryGame({
  pairCount = 8,
  seed,
  resolveDelayMs = 650,
}: UseMemoryGameOptions = {}) {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);
  const boardKey = useMemo(() => `${pairCount}-pairs`, [pairCount]);
  const [bestResult, setBestResult] = useState<BestResult | null>(() => getBestResult(boardKey));

  useEffect(() => {
    dispatch({ type: "START", cards: createCards(pairCount, seed) });
  }, [pairCount, seed]);

  useEffect(() => {
    if (!state.inputLocked) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      dispatch({ type: "RESOLVE_MISMATCH" });
    }, resolveDelayMs);

    return () => window.clearTimeout(timeout);
  }, [resolveDelayMs, state.inputLocked, state.selectedCardIds]);

  useEffect(() => {
    if (state.status !== "playing") {
      return undefined;
    }

    const interval = window.setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [state.status]);

  useEffect(() => {
    if (state.status !== "won") {
      return;
    }

    const nextBest = saveBestResult(boardKey, {
      moves: state.moves,
      elapsedSeconds: state.elapsedSeconds,
      completedAt: new Date().toISOString(),
    });

    setBestResult(nextBest);
  }, [boardKey, state.elapsedSeconds, state.moves, state.status]);

  function restart() {
    dispatch({ type: "START", cards: createCards(pairCount, seed) });
  }

  function flipCard(card: Card) {
    dispatch({ type: "FLIP_CARD", cardId: card.id });
  }

  return {
    state,
    bestResult,
    restart,
    flipCard,
  };
}

