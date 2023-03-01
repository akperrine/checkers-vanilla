const table = document.querySelector("#table");
const scoreBox = document.querySelector(".score-box");

let gameOver = false;
let redTurn = true;
let scoreBlack = 0;
let scoreRed = 0;
let selected = NaN;
let board = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [-1, 0, -1, 0, -1, 0, -1, 0],
  [0, -1, 0, -1, 0, -1, 0, -1],
  [-1, 0, -1, 0, -1, 0, -1, 0],
];

// only works because checkers never goes to zero box
let mustMove: boolean | number = false;
let selectedSquare: null | HTMLElement = null;

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
}

function checkArrayValue(checkerId: number): number {
  const coords = boardNumberToMatrix(checkerId);
  return board[coords[0]][coords[1]];
}

// function clickablePiece() {
   document.querySelectorAll(".checker").forEach((piece: Element) => {
    // if (pieceWithChecker) {
    piece.addEventListener("click", (event) => {
      if (event.target) {
        const target = event.target as HTMLDivElement;
        const pieceWithChecker = piece.hasChildNodes();
        // check if square clicked is highlighted
        if (!mustMove) {
          if (event.target.classList.contains("highlight")) {
            const boardNumber = parseInt(piece.id);
            const highlightedCoords = boardNumberToMatrix(boardNumber);
            let selectedCoords = boardNumberToMatrix(selected);
            const rowDifference = highlightedCoords[0] - selectedCoords[0];
            
            // remove skipped piece
            // check if pieced skipped down
            if (rowDifference === 2) {
              // check if piece moved down and RIGHT
              if (highlightedCoords[1] > selectedCoords[1]) {
                const skippedPieceId = (selected + 9).toString();
                const skippedPieceMatrix = boardNumberToMatrix(selected + 9);
                const skippedSquare = document.getElementById(skippedPieceId);
                if (skippedSquare) {
                  board[skippedPieceMatrix[0]][skippedPieceMatrix[1]] = 0;
                  skippedSquare.innerHTML = ``;
                }
              }
              // check if piece moved down and LEFT
              if (highlightedCoords[1] < selectedCoords[1]) {
                const skippedPieceId = (selected + 7).toString();
                const skippedPieceMatrix = boardNumberToMatrix(selected + 7);
                const skippedSquare = document.getElementById(skippedPieceId);
                if (skippedSquare) {
                  board[skippedPieceMatrix[0]][skippedPieceMatrix[1]] = 0;
                  skippedSquare.innerHTML = ``;
                }
              }
            }
            // check if piece moved up
            if (rowDifference === -2) {
              // check if piece moved up and RIGHT
              if (highlightedCoords[1] > selectedCoords[1]) {
                const skippedPieceId = (selected - 7).toString();
                const skippedPieceMatrix = boardNumberToMatrix(selected - 7);
                const skippedSquare = document.getElementById(skippedPieceId);
                if (skippedSquare) {
                  board[skippedPieceMatrix[0]][skippedPieceMatrix[1]] = 0;
                  skippedSquare.innerHTML = ``;
                }
              }
              // check if piece moved up and LEFT
              if (highlightedCoords[1] < selectedCoords[1]) {
                const skippedPieceId = (selected - 9).toString();
                const skippedPieceMatrix = boardNumberToMatrix(selected - 9);
                const skippedSquare = document.getElementById(skippedPieceId);
                if (skippedSquare) {
                  board[skippedPieceMatrix[0]][skippedPieceMatrix[1]] = 0;
                  skippedSquare.innerHTML = ``;
                }
              }
            }

            //check if now king
            const selctedCell = document.getElementById(selected.toString());
            const pieceColorNumber = checkArrayValue(selected);
            if (
              (pieceColorNumber === 1 && highlightedCoords[0] === 7) ||
              (pieceColorNumber === -1 && highlightedCoords[0] === 0) ||
              selctedCell?.children[0].classList.contains("king")
            ) {
              target.innerHTML = `<div class="piece king ${
                pieceColorNumber === 1 ? "red" : "black"
              }-piece"></div>`;
              console.log(target);
            }

            // update board array to proper values
            board[highlightedCoords[0]][highlightedCoords[1]] =
              checkArrayValue(selected);
            board[selectedCoords[0]][selectedCoords[1]] = 0;

            

            //check if still a move left
            document.querySelectorAll(".highlight").forEach((square) => {
              square.classList.remove("highlight");
            });

            const checkerValue = checkArrayValue(boardNumber);
            if (rowDifference === 2 || rowDifference === -2) {
              console.log('check next move normal');
              checkContinuedMove(
                highlightedCoords[0],
                highlightedCoords[1],
                checkerValue
              );
            }

            // update selected cell to be empty
            if (selctedCell) {
              selctedCell.innerHTML = ``;
            }

            selected = NaN;
            redTurn = !redTurn;

            setCheckerBoard();
          } else if (pieceWithChecker) {
            console.log('standard check move');
            const boardNumber = parseInt(piece.id);
            const checkerValue = checkArrayValue(boardNumber);
            const xCoord = boardNumberToMatrix(boardNumber)[0];
            const yCoord = boardNumberToMatrix(boardNumber)[1];
            if (redTurn && checkerValue === 1) {
              selected = boardNumber;

              moveChoice(xCoord, yCoord, target, checkerValue);
            }
            if (!redTurn && checkerValue === -1) {
              selected = boardNumber;
              moveChoice(xCoord, yCoord, target, checkerValue);
            }
          }
        } else {
          if (event.target.classList.contains("highlight")) {
            selected = mustMove
            if (event.target.classList.contains("highlight")) {
              const boardNumber = parseInt(piece.id);
              const highlightedCoords = boardNumberToMatrix(boardNumber);
              let selectedCoords = boardNumberToMatrix(selected);
              const rowDifference = highlightedCoords[0] - selectedCoords[0];
              
              // remove skipped piece
              // check if pieced skipped down
              if (rowDifference === 2) {
                // check if piece moved down and RIGHT
                if (highlightedCoords[1] > selectedCoords[1]) {
                  const skippedPieceId = (selected + 9).toString();
                  const skippedPieceMatrix = boardNumberToMatrix(selected + 9);
                  const skippedSquare = document.getElementById(skippedPieceId);
                  if (skippedSquare) {
                    board[skippedPieceMatrix[0]][skippedPieceMatrix[1]] = 0;
                    skippedSquare.innerHTML = ``;
                  }
                }
                // check if piece moved down and LEFT
                if (highlightedCoords[1] < selectedCoords[1]) {
                  const skippedPieceId = (selected + 7).toString();
                  const skippedPieceMatrix = boardNumberToMatrix(selected + 7);
                  const skippedSquare = document.getElementById(skippedPieceId);
                  if (skippedSquare) {
                    board[skippedPieceMatrix[0]][skippedPieceMatrix[1]] = 0;
                    skippedSquare.innerHTML = ``;
                  }
                }
              }
              // check if piece moved up
              if (rowDifference === -2) {
                // check if piece moved up and RIGHT
                if (highlightedCoords[1] > selectedCoords[1]) {
                  const skippedPieceId = (selected - 7).toString();
                  const skippedPieceMatrix = boardNumberToMatrix(selected - 7);
                  const skippedSquare = document.getElementById(skippedPieceId);
                  if (skippedSquare) {
                    board[skippedPieceMatrix[0]][skippedPieceMatrix[1]] = 0;
                    skippedSquare.innerHTML = ``;
                  }
                }
                // check if piece moved up and LEFT
                if (highlightedCoords[1] < selectedCoords[1]) {
                  const skippedPieceId = (selected - 9).toString();
                  const skippedPieceMatrix = boardNumberToMatrix(selected - 9);
                  const skippedSquare = document.getElementById(skippedPieceId);
                  if (skippedSquare) {
                    board[skippedPieceMatrix[0]][skippedPieceMatrix[1]] = 0;
                    skippedSquare.innerHTML = ``;
                  }
                }
              }
  
              //check if now king
              const selctedCell = document.getElementById(selected.toString());
              const pieceColorNumber = checkArrayValue(selected);
              if (
                (pieceColorNumber === 1 && highlightedCoords[0] === 7) ||
                (pieceColorNumber === -1 && highlightedCoords[0] === 0) ||
                selctedCell?.children[0].classList.contains("king")
              ) {
                target.innerHTML = `<div class="piece king ${
                  pieceColorNumber === 1 ? "red" : "black"
                }-piece"></div>`;
              }
  
              // update board array to proper values
              board[highlightedCoords[0]][highlightedCoords[1]] =
                checkArrayValue(selected);
              board[selectedCoords[0]][selectedCoords[1]] = 0;
  
             
              //check if still a move left
              document.querySelectorAll(".highlight").forEach((square) => {
                square.classList.remove("highlight");
              });
              setCheckerBoard()
  
              const checkerValue = checkArrayValue(boardNumber);
              mustMove = false
              if (rowDifference === 2 || rowDifference === -2) {
                console.log('checking if next move');
                checkContinuedMove(
                  highlightedCoords[0],
                  highlightedCoords[1],
                  checkerValue
                );
              }         
              
               // update selected cell to be empty
               console.log(selected.toString());
               if (selctedCell) {
                 console.log(selctedCell);
                 selctedCell.innerHTML = ``;
               }
              selected = NaN;
              scoreBlack = 0;
              scoreRed = 0;
          }
        }
      }

     
    });
    // }
  });
// }

function setCheckerBoard(): void {
  scoreBlack = 0
  scoreRed = 0
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] === 1) {
        setCheckerSquare(i, j, "red");
        scoreRed++;
      } else if (board[i][j] === -1) {
        setCheckerSquare(i, j, "black");
        scoreBlack++;
      }
    }
  }
 
  updateScore();
}


function arrayCoordinatesToId(y: number, x: number): string {
  return (y * 8 + x).toString();
}

function setCheckerSquare(indexY: number, indexX: number, color: string): void {
  const idNumber = arrayCoordinatesToId(indexY, indexX);
  const currentCell = document.getElementById(idNumber);
  if (currentCell) {
    if (currentCell.children[0]) {
      if (currentCell.children[0].classList.contains("king")) {
        currentCell.innerHTML = ``;
        currentCell.innerHTML = `<div class="piece king ${color}-piece"></div>`;
      }
    } else {
      currentCell.innerHTML = ``;
      currentCell.innerHTML = `<div class="piece ${color}-piece"></div>`;
    }
  }
}

setCheckerBoard();

function checkColorsTurn(boardNumber: number, target: EventTarget) {
  const boardCoordinates = boardNumberToMatrix(boardNumber);
  if (redTurn && board[boardCoordinates[0]][boardCoordinates[1]] === 1) {
    selectedSquare = document.getElementById(boardNumber.toString());
    moveChoice(boardCoordinates[0], boardCoordinates[1], target, 1);
  } else if (
    !redTurn &&
    board[boardCoordinates[0]][boardCoordinates[1]] === -1
  ) {
    selectedSquare = document.getElementById(boardNumber.toString());
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

  const oppositeColor = colorNumber * -1;
  if (colorNumber === 1 || target.classList.contains("king")) {
    if (board[yCoord + 1]) {
      if (board[yCoord + 1][xCoord - 1] === 0) {
        const id = arrayCoordinatesToId(yCoord + 1, xCoord - 1);
        if (document.getElementById(id)) {
          document.getElementById(id).classList.add("highlight");
        }
      } else if (
        board[yCoord + 2] &&
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
        board[yCoord + 2] &&
        board[yCoord + 1][xCoord + 1] === oppositeColor &&
        board[yCoord + 2][xCoord + 2] === 0
      ) {
        const id = arrayCoordinatesToId(yCoord + 2, xCoord + 2);
        document.getElementById(id).classList.add("highlight");
      }
    }
  }
  if (colorNumber === -1 || target.classList.contains("king")) {
    if (board[yCoord - 1]) {
      if (board[yCoord - 1][xCoord - 1] === 0) {
        const id = arrayCoordinatesToId(yCoord - 1, xCoord - 1);
        document.getElementById(id).classList.add("highlight");
      } else if (
        board[yCoord - 2] &&
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
        board[yCoord - 2] &&
        board[yCoord - 1][xCoord + 1] === oppositeColor &&
        board[yCoord - 2][xCoord + 2] === 0
      ) {
        const id = arrayCoordinatesToId(yCoord - 2, xCoord + 2);
        document.getElementById(id).classList.add("highlight");
      }
    }
  }
}

function checkContinuedMove(
  yCoord: number,
  xCoord: number,
  colorNumber: number
) {
  const oppositeColor = colorNumber * -1;

  //check if piece being moved is a king
  const selectedElement = document.getElementById(selected.toString())
  const pieceisKing = selectedElement.children[0].classList.contains('king')

  const squareId = parseInt(arrayCoordinatesToId(yCoord, xCoord));
  if (colorNumber === 1 || pieceisKing) {
    // check if move to top Left still
    if (
      board[yCoord + 2] &&
      board[yCoord + 1][xCoord - 1] === oppositeColor &&
      board[yCoord + 2][xCoord - 2] === 0
    ) {
      const id = arrayCoordinatesToId(yCoord + 2, xCoord - 2);
      document.getElementById(id).classList.add("highlight");
      mustMove = squareId;
    }
    // check if move to top Right still
    if (
      board[yCoord + 2] &&
      board[yCoord + 1][xCoord + 1] === oppositeColor &&
      board[yCoord + 2][xCoord + 2] === 0
    ) {
      const id = arrayCoordinatesToId(yCoord + 2, xCoord + 2);
      document.getElementById(id).classList.add("highlight");
      mustMove = squareId;
    }
  }

  if (colorNumber === -1 || pieceisKing) {
    // check if move to bottom Left still
    if (
      board[yCoord - 2] &&
      board[yCoord - 1][xCoord - 1] === oppositeColor &&
      board[yCoord - 2][xCoord - 2] === 0
    ) {
      const id = arrayCoordinatesToId(yCoord - 2, xCoord - 2);
      document.getElementById(id).classList.add("highlight");
      mustMove = squareId;

    }
    // check if move to bottom Left still
    if (
      board[yCoord - 2] &&
      board[yCoord - 1][xCoord + 1] === oppositeColor &&
      board[yCoord - 2][xCoord + 2] === 0
    ) {
      const id = arrayCoordinatesToId(yCoord - 2, xCoord + 2);
      document.getElementById(id).classList.add("highlight");
      mustMove = squareId;
    }
  }
}
