import { useState } from 'react'
import './App.css'
import { WinnerModal } from './components/WinnerModal.jsx' 
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { turnos} from './constantes.js'
import { checkWinner,checkEndGame} from './logic/board.js'

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  );
  const [turno, setTurno] = useState(turnos.x);
  // null significa que no hay ganador, false significa empate
  const [winner, setWinner] = useState(null);
//benedicio de react refrezca el tablero al reiniciar el juego
  const resetGame = () => {
      setBoard(Array(9).fill(null));
      setTurno(turnos.x);
      setWinner(null); // Reiniciamos el ganador a null
  }
  const updateBoard = (index) => {
    // No actualizamos esta posición si ya tiene algo o si ya hay un ganador
    if (board[index] || winner) return;

    // Actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turno; // Actualizamos la celda con el turno actual
    setBoard(newBoard);

    // Cambiar el turno
    const newTurn = turno === turnos.x ? turnos.o : turnos.x;
    setTurno(newTurn);
    // Revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti()
      // Si hay un ganador, actualizamos el estado del ganador
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      // Si no hay ganador y el tablero está lleno, es un empate
      setWinner(false); // Usamos 'false' para indicar empate
    }
  }

  return (
    <main className='board'>
      <h1 translate="no">Tres en Raya Boliviano</h1>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turno === turnos.x}>
          {turnos.x}
        </Square>
        <Square isSelected={turno === turnos.o}>
          {turnos.o}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}
export default App
