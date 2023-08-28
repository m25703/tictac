import React, { useState, useEffect } from 'react';
import './Ttt.css'

const Ttt = () => {
  const [state, setState] = useState({
    a: ["", "", ""],
    b: ["", "", ""],
    c: ["", "", ""],
    x: 0,
    aa: 0,
    k: "Turn of X.",
  });
  const [gameOver, setGameOver] = useState(false);

  const clrscr = () => {
    setState({
      a: ["", "", ""],
      b: ["", "", ""],
      c: ["", "", ""],
      x: 0,
      k: "Turn of X.",
    });
    setGameOver(false);
  };

  const wnchck = () => {
    if (state.x === 9) {
      setState(prevState => ({
        ...prevState,
        k: "It's a draw. Clear board to play again.",
      }));
      return;
    }

    const winConditions = [
      [state.a[0], state.a[1], state.a[2]],
      [state.b[0], state.b[1], state.b[2]],
      [state.c[0], state.c[1], state.c[2]],
      [state.a[0], state.b[0], state.c[0]],
      [state.a[1], state.b[1], state.c[1]],
      [state.a[2], state.b[2], state.c[2]],
      [state.a[0], state.b[1], state.c[2]],
      [state.c[0], state.b[1], state.a[2]],
    ];

    for (const condition of winConditions) {
      if (condition.every(cell => cell === "X")) {
        setState(prevState => ({
          ...prevState,
          aa: 1,
          k: "X won. Clear board to play again.",
        }));
        setGameOver(true); // Set gameOver to true
        return;
      }
      if (condition.every(cell => cell === "O")) {
        setState(prevState => ({
          ...prevState,
          aa: 1,
          k: "O won. Clear board to play again.",
        }));
        setGameOver(true); // Set gameOver to true
        return;
      }
    }
  };

  useEffect(() => { wnchck(); }, [state]);

  const handleClick = (row, col) => {
    if (!gameOver && state[row][col] === "") {
      const newValue = state.x % 2 === 0 ? "X" : "O";
      setState(prevState => {
        const updatedRow = [...prevState[row]];
        updatedRow[col] = newValue;
    
        const updatedState = {
          ...prevState,
          [row]: updatedRow,
          x: prevState.x + 1,
          k: `Turn of ${newValue === "X" ? "O" : "X"}.`,
        };
    
        return updatedState;
      }, () => {
        wnchck();
      });
    } else if (gameOver) {
      // Display a message indicating the game is over
      setState(prevState => ({
        ...prevState,
        k: "Game is over. Clear board to play again.",
      }));
    } else {
      // Display a message indicating an invalid move
      const currentPlayer = state.x % 2 === 0 ? "X" : "O";
      const errorMessage = `Wrong move. Turn of ${currentPlayer} again.`;
      setState(prevState => ({ ...prevState, k: errorMessage }));
    }
  };
  

 return (
  <div className="container">
    <div className="gameContainer">
      <table className="table">
        <tbody>
          {["a", "b", "c"].map(row => (
            <tr key={row}>
              {[0, 1, 2].map(col => (
                <td
                key={col}
                id={`t${row}${col}`}
                className={`cell`}
              >
                <button
                  id={`a${row}${col}`}
                  className="cellButton"
                  onClick={() => handleClick(row, col)}
                >
                  {state[row][col] === "X" ? "X" : (state[row][col] === "O" ? "O" : "")}
                </button>
              </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="textDiv">
      <h2 className="statusText">{state.k}</h2>
    </div>
    <div className="clearButton">
      <button className="clearButtonInput" onClick={clrscr}>
        Clear Board
      </button>
    </div>
  </div>
);
}

export default Ttt;