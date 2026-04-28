import type { BestResult } from "./types";

const STORAGE_PREFIX = "memory-pairs-best";

export function getBestResult(boardKey: string): BestResult | null {
  if (!hasStorage()) {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(getStorageKey(boardKey));
    return stored ? (JSON.parse(stored) as BestResult) : null;
  } catch {
    return null;
  }
}

export function saveBestResult(boardKey: string, result: BestResult): BestResult {
  const current = getBestResult(boardKey);
  const best = isBetterResult(result, current) ? result : current;

  if (best && hasStorage()) {
    window.localStorage.setItem(getStorageKey(boardKey), JSON.stringify(best));
  }

  return best ?? result;
}

export function isBetterResult(candidate: BestResult, current: BestResult | null): boolean {
  if (!current) {
    return true;
  }

  if (candidate.moves !== current.moves) {
    return candidate.moves < current.moves;
  }

  return candidate.elapsedSeconds < current.elapsedSeconds;
}

function getStorageKey(boardKey: string): string {
  return `${STORAGE_PREFIX}:${boardKey}`;
}

function hasStorage(): boolean {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

