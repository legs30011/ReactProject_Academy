import { winner_combos } from "../constantes.js";
// Función para revisar si hay un ganador
export const checkWinner = (boardToCheck) => {
    for (const combo of winner_combos ) {
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

export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);//revisa todas las casillas si estan utilizadas y son dif de null
  }
