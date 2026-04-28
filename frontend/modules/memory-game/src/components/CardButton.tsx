import type { Card } from "../types";

type CardButtonProps = {
  card: Card;
  index: number;
  disabled: boolean;
  onFlip: (card: Card) => void;
};

export function CardButton({ card, index, disabled, onFlip }: CardButtonProps) {
  const isFaceUp = card.state !== "hidden";
  const label = isFaceUp
    ? `${card.label} card ${card.state}`
    : `Hidden card ${index + 1}`;

  return (
    <button
      className="memory-card"
      type="button"
      aria-label={label}
      aria-pressed={isFaceUp}
      data-state={card.state}
      data-testid={`card-${index + 1}`}
      disabled={disabled || card.state !== "hidden"}
      onClick={() => onFlip(card)}
    >
      <span className="memory-card__front" aria-hidden="true">
        {card.label}
      </span>
      <span className="memory-card__back" aria-hidden="true">
        ?
      </span>
    </button>
  );
}

