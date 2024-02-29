function player(name, token) {
  this.name = name;
  this.token = token;

  return { name, token };
}

function createBoard() {
  const arrayBoard = [];
  let id = 0;
  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      id++;
      const innerSquare = document.createElement("div");
      innerSquare.id = `child${id}`;
      innerSquare.classList.add("innerSquare");
      row.push(innerSquare);
    }
    arrayBoard.push(row);
  }
  return arrayBoard;
}

function displayBoard(playingBoard) {
  gameSquare = document.getElementById("gameSquare");
  gameSquare.innerHTML = "";
  playingBoard.forEach((element) => {
    element.forEach((element) => {
      gameSquare.appendChild(element);
    });
  });
}

function gameBoardController() {
  const orignialBoard = createBoard();
  let playingBoard = orignialBoard;

  const renderBoard = () => {
    displayBoard(playingBoard);
  };

  const changeSquare = (user, square) => {
    square.innerHTML = user.token;
  };

  return { renderBoard, playingBoard, changeSquare };
}

const gameState = (() => {
  const gameBoard = gameBoardController();
  gameBoard.renderBoard();

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Play Again";

  const whoWon = document.createElement("h2");

  const body = document.querySelector("body");
  const player1 = player("Player One", "x");
  const player2 = player("Player Two", "o");

  const turnDisplay = document.getElementById("turnDisplay");

  const players = [player1, player2];

  let activePlayer = players[0];

  // if active player is players[0] switch to 1 and if its 1 switch to 0
  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const checkForWinner = () => {
    if (
      ("x" === gameBoard.playingBoard[0][0].textContent &&
        "x" === gameBoard.playingBoard[0][1].textContent &&
        "x" === gameBoard.playingBoard[0][2].textContent) ||
      ("o" === gameBoard.playingBoard[0][0].textContent &&
        "o" === gameBoard.playingBoard[0][1].textContent &&
        "o" === gameBoard.playingBoard[0][2].textContent)
    ) {
      return true;
    } else if (
      ("x" === gameBoard.playingBoard[1][0].textContent &&
        "x" === gameBoard.playingBoard[1][1].textContent &&
        "x" === gameBoard.playingBoard[1][2].textContent) ||
      ("o" === gameBoard.playingBoard[1][0].textContent &&
        "o" === gameBoard.playingBoard[1][1].textContent &&
        "o" === gameBoard.playingBoard[1][2].textContent)
    ) {
      return true;
    } else if (
      ("x" === gameBoard.playingBoard[2][0].textContent &&
        "x" === gameBoard.playingBoard[2][1].textContent &&
        "x" === gameBoard.playingBoard[2][2].textContent) ||
      ("o" === gameBoard.playingBoard[2][0].textContent &&
        "o" === gameBoard.playingBoard[2][1].textContent &&
        "o" === gameBoard.playingBoard[2][2].textContent)
    ) {
      return true;
    } else if (
      ("x" === gameBoard.playingBoard[0][0].textContent &&
        "x" === gameBoard.playingBoard[1][1].textContent &&
        "x" === gameBoard.playingBoard[2][2].textContent) ||
      ("o" === gameBoard.playingBoard[0][0].textContent &&
        "o" === gameBoard.playingBoard[1][1].textContent &&
        "o" === gameBoard.playingBoard[2][2].textContent)
    ) {
      return true;
    } else if (
      ("x" === gameBoard.playingBoard[0][2].textContent &&
        "x" === gameBoard.playingBoard[1][1].textContent &&
        "x" === gameBoard.playingBoard[2][0].textContent) ||
      ("o" === gameBoard.playingBoard[0][2].textContent &&
        "o" === gameBoard.playingBoard[1][1].textContent &&
        "o" === gameBoard.playingBoard[2][0].textContent)
    ) {
      return true;
    } else if (
      ("x" === gameBoard.playingBoard[0][0].textContent &&
        "x" === gameBoard.playingBoard[1][0].textContent &&
        "x" === gameBoard.playingBoard[2][0].textContent) ||
      ("o" === gameBoard.playingBoard[0][0].textContent &&
        "o" === gameBoard.playingBoard[1][0].textContent &&
        "o" === gameBoard.playingBoard[2][0].textContent)
    ) {
      return true;
    } else if (
      ("x" === gameBoard.playingBoard[0][1].textContent &&
        "x" === gameBoard.playingBoard[1][1].textContent &&
        "x" === gameBoard.playingBoard[2][1].textContent) ||
      ("o" === gameBoard.playingBoard[0][1].textContent &&
        "o" === gameBoard.playingBoard[1][1].textContent &&
        "o" === gameBoard.playingBoard[2][1].textContent)
    ) {
      return true;
    } else if (
      ("x" === gameBoard.playingBoard[0][2].textContent &&
        "x" === gameBoard.playingBoard[1][2].textContent &&
        "x" === gameBoard.playingBoard[2][2].textContent) ||
      ("o" === gameBoard.playingBoard[0][2].textContent &&
        "o" === gameBoard.playingBoard[1][2].textContent &&
        "o" === gameBoard.playingBoard[2][2].textContent)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const reset = () => {
    gameBoard.playingBoard.forEach((element) => {
      element.forEach((element) => {
        element.textContent = "";
      });
    });
  };

  gameBoard.playingBoard.forEach((element) => {
    element.forEach((element) => {
      element.addEventListener("click", () => {
        if (element.innerHTML === "" && !body.contains(deleteButton)) {
          element.innerHTML = activePlayer.token;
          if (checkForWinner()) {
            body.appendChild(deleteButton);
            whoWon.textContent = `${activePlayer.name} Won!`;
            body.appendChild(whoWon);
          } else {
            if (
              gameBoard.playingBoard[0][0].textContent &&
              gameBoard.playingBoard[0][1].textContent &&
              gameBoard.playingBoard[0][2].textContent &&
              gameBoard.playingBoard[1][0].textContent &&
              gameBoard.playingBoard[1][1].textContent &&
              gameBoard.playingBoard[1][2].textContent &&
              gameBoard.playingBoard[2][0].textContent &&
              gameBoard.playingBoard[2][1].textContent &&
              gameBoard.playingBoard[2][2].textContent
            ) {
              body.appendChild(deleteButton);
              whoWon.textContent = `No Winner!`;
              body.appendChild(whoWon);
            } else {
              switchActivePlayer();
              turnDisplay.innerText = `${activePlayer.name}'s Turn`;
            }
          }
        }
      });
    });
  });

  deleteButton.addEventListener("click", () => {
    reset();
    body.removeChild(deleteButton);
    body.removeChild(whoWon);
  });
})();

// win conditions
// [0][0] [0][1] [0][2] done
// x x x
// 1 1 1
// 1 1 1
// [1][0] [1][1] [1][2] done
// 1 1 1
// x x x
// 1 1 1
// [2][0] [2][1] [2][2] done
// 1 1 1
// 1 1 1
// x x x
// [0][0] [1][1] [2][2] done
// x 1 1
// 1 x 1
// 1 1 x
// [0][2] [1][1] [2][0] done
// 1 1 x
// 1 x 1
// x 1 1
// [0][0] [1][0] [2][0] done
// x 1 1
// x 1 1
// x 1 1
// [0][1] [1][1] [2][1] done
// 1 x 1
// 1 x 1
// 1 x 1
// [0][2] [1][2] [2][2] done
// 1 1 x
// 1 1 x
// 1 1 x
