const table = document.querySelector("#table");

const board = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [-1, 0, -1, 0, -1, 0, -1, 0],
  [0, -1, 0, -1, 0, -1, 0, -1],
  [-1, 0, -1, 0, -1, 0, -1, 0],
];

function setCheckerBoard(): void {
  for (let i = 0; i < 8; i++) {
    console.log(i);
    for (let j = 0; j < 8; j++) {
      console.log("j");
      if (board[i][j] === 1) {
        console.log("j is 1");
        setCheckerSquare(i, j, "red");
      } else if (board[i][j] === -1) {
        setCheckerSquare(i, j, "black");
      }
    }
  }
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
