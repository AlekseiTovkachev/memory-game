import { formatElapsedTime } from "../gameLogic";
import type { BestResult } from "../types";

type WinSummaryProps = {
  moves: number;
  elapsedSeconds: number;
  bestResult: BestResult | null;
  onRestart: () => void;
};

export function WinSummary({
  moves,
  elapsedSeconds,
  bestResult,
  onRestart,
}: WinSummaryProps) {
  return (
    <section className="win-summary" aria-live="polite" aria-labelledby="win-title">
      <h2 id="win-title">You found every pair.</h2>
      <p>
        Finished in <strong>{moves} moves</strong> and{" "}
        <strong>{formatElapsedTime(elapsedSeconds)}</strong>.
      </p>
      {bestResult ? (
        <p>
          Best score: <strong>{bestResult.moves} moves</strong> in{" "}
          <strong>{formatElapsedTime(bestResult.elapsedSeconds)}</strong>.
        </p>
      ) : null}
      <button className="primary-button" type="button" onClick={onRestart}>
        Play again
      </button>
    </section>
  );
}

