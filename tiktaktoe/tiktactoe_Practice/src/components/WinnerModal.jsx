import { Square } from "./Square.jsx";
/**
 * Componente que muestra un modal con el resultado del juego.
 * Si `winner` es `null`, no se muestra nada.
 * Si `winner` es `false`, se muestra un mensaje de empate.
 * Si `winner` es `"X"` o `"O"`, se muestra un mensaje con el ganador.
 * El modal siempre tiene un bot n para reiniciar el juego.
 */
export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  const winnerText = winner === false ? "Empate" : "Ganó:";

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        <header className="win">{winner && <Square>{winner}</Square>}</header>

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
