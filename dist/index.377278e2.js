const table = document.querySelector("#table");
const scoreBox = document.querySelector(".score-box");
const gameOver = false;
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
        -1,
        0,
        0,
        0,
        0,
        0,
        -1,
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
function updateScore() {
    if (scoreBox) return scoreBox.innerHTML = `
    <span>Black Pieces: ${scoreBlack}</span>
    <span>Red Pieces: ${scoreRed}</span>
    `;
}
function boardNumberToMatrix(boardNumber) {
    const firstArrayIndex = Math.floor(boardNumber / 8);
    const secondArrayIndex = boardNumber % 8;
    return [
        firstArrayIndex,
        secondArrayIndex
    ];
// return board[firstArrayIndex][secondArrayIndex];
}
function clickablePiece() {
    return document.querySelectorAll(".checker").forEach((piece)=>{
        const pieceWithChecker = piece.closest("td");
        if (pieceWithChecker) piece.addEventListener("click", (event)=>{
            const boardNumber = parseInt(pieceWithChecker.id);
            if (event.target) {
                const target = event.target;
                return checkColorsTurn(boardNumber, target);
            }
        });
    });
}
function setCheckerBoard() {
    for(let i = 0; i < 8; i++)for(let j = 0; j < 8; j++){
        if (board[i][j] === 1) setCheckerSquare(i, j, "red");
        else if (board[i][j] === -1) setCheckerSquare(i, j, "black");
    }
    clickablePiece();
    updateScore();
}
function arrayCoordinatesToId(y, x) {
    return (y * 8 + x).toString();
}
function setCheckerSquare(indexY, indexX, color) {
    const idNumber = arrayCoordinatesToId(indexY, indexX);
    const currentCell = document.getElementById(idNumber);
    if (currentCell) currentCell.innerHTML = `<div class="checker ${color}-checker king"></div>`;
}
setCheckerBoard();
function checkColorsTurn(boardNumber, target) {
    const boardCoordinates = boardNumberToMatrix(boardNumber);
    if (redTurn && board[boardCoordinates[0]][boardCoordinates[1]] === 1) moveChoice(boardCoordinates[0], boardCoordinates[1], target, 1);
    else if (!redTurn && board[boardCoordinates[0]][boardCoordinates[1]] === -1) moveChoice(boardCoordinates[0], boardCoordinates[1], target, -1);
    else return;
}
function moveChoice(yCoord, xCoord, target, colorNumber) {
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
    if (target.classList.contains("king")) console.log("king");
// if (downOneLeft === 0 && colorNumber === 1) {
//   console.log("hi");
//   console.log(target.classList.contains("king"));
//   // document.getElementById()
// }
}

//# sourceMappingURL=index.377278e2.js.map
