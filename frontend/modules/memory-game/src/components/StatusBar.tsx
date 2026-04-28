import { formatElapsedTime } from "../gameLogic";
import type { BestResult } from "../types";

type StatusBarProps = {
  moves: number;
  elapsedSeconds: number;
  matchedCount: number;
  totalCards: number;
  bestResult: BestResult | null;
};

export function StatusBar({
  moves,
  elapsedSeconds,
  matchedCount,
  totalCards,
  bestResult,
}: StatusBarProps) {
  return (
    <dl className="status-bar" aria-label="Game stats">
      <div>
        <dt>Moves</dt>
        <dd>{moves}</dd>
      </div>
      <div>
        <dt>Time</dt>
        <dd>{formatElapsedTime(elapsedSeconds)}</dd>
      </div>
      <div>
        <dt>Pairs</dt>
        <dd>
          {matchedCount / 2}/{totalCards / 2}
        </dd>
      </div>
      <div>
        <dt>Best</dt>
        <dd>
          {bestResult
            ? `${bestResult.moves} moves, ${formatElapsedTime(bestResult.elapsedSeconds)}`
            : "None yet"}
        </dd>
      </div>
    </dl>
  );
}

