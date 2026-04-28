import { beforeEach, describe, expect, it } from "vitest";
import { getBestResult, saveBestResult } from "../../src";

describe("best result storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns null when no result has been stored", () => {
    expect(getBestResult("8-pairs")).toBeNull();
  });

  it("saves the first result", () => {
    const result = saveBestResult("8-pairs", {
      moves: 18,
      elapsedSeconds: 70,
      completedAt: "2026-04-28T00:00:00.000Z",
    });

    expect(result.moves).toBe(18);
    expect(getBestResult("8-pairs")?.elapsedSeconds).toBe(70);
  });

  it("keeps the better result by moves, then time", () => {
    saveBestResult("8-pairs", {
      moves: 18,
      elapsedSeconds: 70,
      completedAt: "2026-04-28T00:00:00.000Z",
    });
    const best = saveBestResult("8-pairs", {
      moves: 20,
      elapsedSeconds: 40,
      completedAt: "2026-04-28T00:01:00.000Z",
    });

    expect(best.moves).toBe(18);
    expect(best.elapsedSeconds).toBe(70);
  });
});

