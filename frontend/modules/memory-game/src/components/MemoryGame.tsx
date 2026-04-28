import { useMemo } from "react";
import { useMemoryGame } from "../useMemoryGame";
import { GameBoard } from "./GameBoard";
import { StatusBar } from "./StatusBar";
import { WinSummary } from "./WinSummary";

type MemoryGameProps = {
  pairCount?: number;
  seed?: string;
  resolveDelayMs?: number;
};

export function MemoryGame(props: MemoryGameProps) {
  const urlOptions = useMemo(() => getUrlOptions(), []);
  const pairCount = props.pairCount ?? urlOptions.pairCount ?? 8;
  const seed = props.seed ?? urlOptions.seed;
  const resolveDelayMs = props.resolveDelayMs ?? 650;
  const { state, bestResult, restart, flipCard } = useMemoryGame({
    pairCount,
    seed,
    resolveDelayMs,
  });

  return (
    <section className="game-panel" aria-labelledby="game-title">
      <div className="game-header">
        <div>
          <h2 id="game-title">Find the matching pairs</h2>
          <p>Choose two cards at a time. Matched pairs stay open.</p>
        </div>
        <button className="secondary-button" type="button" onClick={restart}>
          Restart
        </button>
      </div>

      <StatusBar
        moves={state.moves}
        elapsedSeconds={state.elapsedSeconds}
        matchedCount={state.matchedCount}
        totalCards={state.cards.length}
        bestResult={bestResult}
      />

      <GameBoard cards={state.cards} inputLocked={state.inputLocked} onFlip={flipCard} />

      {state.status === "won" ? (
        <WinSummary
          moves={state.moves}
          elapsedSeconds={state.elapsedSeconds}
          bestResult={bestResult}
          onRestart={restart}
        />
      ) : null}
    </section>
  );
}

function getUrlOptions(): { pairCount?: number; seed?: string } {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const pairCount = Number(params.get("pairs"));
  const seed = params.get("seed") ?? undefined;

  return {
    pairCount: Number.isInteger(pairCount) && pairCount > 0 && pairCount <= 8 ? pairCount : undefined,
    seed,
  };
}

