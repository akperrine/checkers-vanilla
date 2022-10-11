const table = document.querySelector("#table");
const gameOver = false;
const blackTurn = false;
const redTurn = true;
const scoreBlack = 12;
const scoreRed = 12;
const board = [
    [
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        1
    ],
    [
        1,
        0,
        1,
        0,
        1,
        0,
        1,
        0
    ],
    [
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        1
    ],
    [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    [
        -1,
        0,
        -1,
        0,
        -1,
        0,
        -1,
        0
    ],
    [
        0,
        -1,
        0,
        -1,
        0,
        -1,
        0,
        -1
    ],
    [
        -1,
        0,
        -1,
        0,
        -1,
        0,
        -1,
        0
    ], 
];
function boardNumberToMatrix(boardNumber) {
    const firstArrayIndex = Math.floor(boardNumber / 8);
    const secondArrayIndex = boardNumber % 8;
    return board[firstArrayIndex][secondArrayIndex];
}
function clickablePiece() {
    return document.querySelectorAll(".checker").forEach((piece)=>{
        if (piece) {
            const pieceWithChecker = piece.closest("td");
            if (pieceWithChecker) piece.addEventListener("click", ()=>{
                const boardNumber = parseInt(pieceWithChecker.id);
                console.log(boardNumber, `firstArrayIndex: ${boardNumberToMatrix(boardNumber)}`);
            });
        }
    });
}
function setCheckerBoard() {
    for(let i = 0; i < 8; i++)for(let j = 0; j < 8; j++){
        if (board[i][j] === 1) setCheckerSquare(i, j, "red");
        else if (board[i][j] === -1) setCheckerSquare(i, j, "black");
    }
    clickablePiece();
}
function arrayCoordinatesToId(y, x) {
    return (y * 8 + x).toString();
}
function setCheckerSquare(indexY, indexX, color) {
    const idNumber = arrayCoordinatesToId(indexY, indexX);
    const currentCell = document.getElementById(idNumber);
    if (currentCell) currentCell.innerHTML = `<div class="checker ${color}-checker"></div>`;
}
// function checkPieceInSquare(event: MouseEvent) {
//   console.log(event.target);
// }
setCheckerBoard();

//# sourceMappingURL=index.377278e2.js.map
