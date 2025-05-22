import { useState } from 'react'
import './App.css'
import { WinnerModal } from './components/WinnerModal.jsx' 

const turnos= {
  x:'X',
  o:'O'
}

const Square = ({children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  );
  const [turno, setTurno] = useState(turnos.x);
  // null significa que no hay ganador, false significa empate
  const [winner, setWinner] = useState(null);

  const winner_combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  // Función para revisar si hay un ganador
  const checkWinner = (boardToCheck) => {
    for (const combo of winner_combos) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]; // Retorna 'X' o 'O' si hay un ganador
      }
    }
    return null; // No hay ganador
  }

  // Función para revisar si todas las celdas están llenas (empate)
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);//revisa todas las casillas si estan utilizadas y son dif de null
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
      // Si hay un ganador, actualizamos el estado del ganador
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      // Si no hay ganador y el tablero está lleno, es un empate
      setWinner(false); // Usamos 'false' para indicar empate
    }
  }

  //benedicio de react refrezca el tablero al reiniciar el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurno(turnos.x);
    setWinner(null); // Reiniciamos el ganador a null
  }

  return (
    <main className='board'>
      <h1 translate="no">Tic tac toe</h1>
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
