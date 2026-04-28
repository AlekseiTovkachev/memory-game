import { MemoryGame } from "../frontend/modules/memory-game/src";

export function App() {
  return (
    <main className="app-shell" aria-labelledby="app-title">
      <section className="intro" aria-describedby="app-description">
        <p className="eyebrow">Local browser game</p>
        <h1 id="app-title">Memory Pairs</h1>
        <p id="app-description">
          Flip two cards, find every matching pair, and try to beat your best
          time with fewer moves.
        </p>
      </section>

      <MemoryGame />
    </main>
  );
}
