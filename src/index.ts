const table = document.querySelector("#table");
const scoreBox = document.querySelector(".score-box");

const gameOver = false;
const redTurn = false;
const scoreBlack = 12;
const scoreRed = 12;
const board = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [-1, 0, 0, 0, 0, 0, -1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [-1, 0, -1, 0, -1, 0, -1, 0],
  [0, -1, 0, -1, 0, -1, 0, -1],
  [-1, 0, -1, 0, -1, 0, -1, 0],
];
const selectedPiece = null;

function updateScore() {
  if (scoreBox) {
    return (scoreBox.innerHTML = `
    <span>Black Pieces: ${scoreBlack}</span>
    <span>Red Pieces: ${scoreRed}</span>
    `);
  }
}

function boardNumberToMatrix(boardNumber: number): number[] {
  const firstArrayIndex = Math.floor(boardNumber / 8);
  const secondArrayIndex = boardNumber % 8;
  return [firstArrayIndex, secondArrayIndex];
  // return board[firstArrayIndex][secondArrayIndex];
}

function clickablePiece() {
  return document.querySelectorAll(".checker").forEach((piece: Element) => {
    const pieceWithChecker = piece.closest("td");
    if (pieceWithChecker) {
      piece.addEventListener("click", (event) => {
        const boardNumber = parseInt(pieceWithChecker.id);
        if (event.target) {
          const target = event.target;
          return checkColorsTurn(boardNumber, target);
        }
      });
    }
  });
}

function setCheckerBoard(): void {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] === 1) {
        setCheckerSquare(i, j, "red");
      } else if (board[i][j] === -1) {
        setCheckerSquare(i, j, "black");
      }
    }
  }
  clickablePiece();
  updateScore();
}

function arrayCoordinatesToId(y: number, x: number): string {
  return (y * 8 + x).toString();
}

function setCheckerSquare(indexY: number, indexX: number, color: string): void {
  const idNumber = arrayCoordinatesToId(indexY, indexX);
  const currentCell = document.getElementById(idNumber);
  if (currentCell) {
    currentCell.innerHTML = `<div class="checker ${color}-checker"></div>`;
  }
}

setCheckerBoard();

function checkColorsTurn(boardNumber: number, target: EventTarget) {
  const boardCoordinates = boardNumberToMatrix(boardNumber);
  if (redTurn && board[boardCoordinates[0]][boardCoordinates[1]] === 1) {
    moveChoice(boardCoordinates[0], boardCoordinates[1], target, 1);
  } else if (
    !redTurn &&
    board[boardCoordinates[0]][boardCoordinates[1]] === -1
  ) {
    moveChoice(boardCoordinates[0], boardCoordinates[1], target, -1);
  } else {
    return;
  }
}

function moveChoice(
  yCoord: number,
  xCoord: number,
  target: EventTarget,
  colorNumber: number
): void {
  document.querySelectorAll(".highlight").forEach((square) => {
    square.classList.remove("highlight");
  });
  // console.log(board[xCoord], event);
  // const downOneLeft = board[yCoord + 1][xCoord - 1];
  // const downTwoLeft = board[yCoord + 2][xCoord - 1];
  // const downOneRight = board[yCoord + 1][xCoord + 1];
  // const downTwoRight = board[yCoord + 2][xCoord + 1];

  // const UpOneLeft = board[yCoord - 1][xCoord - 1];
  // const upTwoLeft = board[yCoord - 2][xCoord - 1];
  // const upOneRight = board[yCoord - 1][xCoord + 1];
  // const upTwoRight = board[yCoord - 2][xCoord + 1];

  const oppositeColor = colorNumber * -1;

  if (colorNumber === 1 || target.classList.contains("king")) {
    if (board[yCoord + 1][xCoord - 1] === 0) {
      const id = arrayCoordinatesToId(yCoord + 1, xCoord - 1);
      document.getElementById(id).classList.add("highlight");
    } else if (
      board[yCoord + 1][xCoord - 1] === oppositeColor &&
      board[yCoord + 2][xCoord - 2] === 0
    ) {
      const id = arrayCoordinatesToId(yCoord + 2, xCoord - 2);
      document.getElementById(id).classList.add("highlight");
    }

    if (board[yCoord + 1][xCoord + 1] === 0) {
      const id = arrayCoordinatesToId(yCoord + 1, xCoord + 1);
      document.getElementById(id).classList.add("highlight");
    } else if (
      board[yCoord + 1][xCoord + 1] === oppositeColor &&
      board[yCoord + 2][xCoord + 2] === 0
    ) {
      const id = arrayCoordinatesToId(yCoord + 2, xCoord + 2);
      document.getElementById(id).classList.add("highlight");
    }
  }

  if (colorNumber === -1 || target.classList.contains("king")) {
    if (board[yCoord - 1][xCoord - 1] === 0) {
      const id = arrayCoordinatesToId(yCoord - 1, xCoord - 1);
      document.getElementById(id).classList.add("highlight");
    } else if (
      board[yCoord - 1][xCoord - 1] === oppositeColor &&
      board[yCoord - 2][xCoord - 2] === 0
    ) {
      const id = arrayCoordinatesToId(yCoord - 2, xCoord - 2);
      document.getElementById(id).classList.add("highlight");
    }

    if (board[yCoord - 1][xCoord + 1] === 0) {
      const id = arrayCoordinatesToId(yCoord - 1, xCoord + 1);
      document.getElementById(id).classList.add("highlight");
    } else if (
      board[yCoord - 1][xCoord + 1] === oppositeColor &&
      board[yCoord - 2][xCoord + 2] === 0
    ) {
      const id = arrayCoordinatesToId(yCoord - 2, xCoord + 2);
      document.getElementById(id).classList.add("highlight");
    }
  }
}
