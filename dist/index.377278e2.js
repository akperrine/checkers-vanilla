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
function updateScore() {
    if (scoreBox) return scoreBox.innerHTML = `
    <span>Black Pieces: ${scoreBlack}</span>
    <span>Red Pieces: ${scoreRed}</span>
    `;
}
function boardNumberToMatrix(boardNumber) {
    const firstArrayIndex = Math.floor(boardNumber / 8);
    const secondArrayIndex = boardNumber % 8;
    return board[firstArrayIndex][secondArrayIndex];
}
function clickablePiece() {
    return document.querySelectorAll(".checker").forEach((piece)=>{
        const pieceWithChecker = piece.closest("td");
        if (pieceWithChecker) piece.addEventListener("click", ()=>{
            return parseInt(pieceWithChecker.id);
        });
        return null;
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
    if (currentCell) currentCell.innerHTML = `<div class="checker ${color}-checker"></div>`;
}
setCheckerBoard();

//# sourceMappingURL=index.377278e2.js.map
