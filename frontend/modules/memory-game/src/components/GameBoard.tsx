import type { Card } from "../types";
import { CardButton } from "./CardButton";

type GameBoardProps = {
  cards: Card[];
  inputLocked: boolean;
  onFlip: (card: Card) => void;
};

export function GameBoard({ cards, inputLocked, onFlip }: GameBoardProps) {
  return (
    <div className="memory-board" aria-label="Memory card board">
      {cards.map((card, index) => (
        <CardButton
          key={card.id}
          card={card}
          index={index}
          disabled={inputLocked}
          onFlip={onFlip}
        />
      ))}
    </div>
  );
}

