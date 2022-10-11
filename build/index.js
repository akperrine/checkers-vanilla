"use strict";
const table = document.querySelector("#table");
const gameOver = false;
const blackTurn = false;
const redTurn = true;
const scoreBlack = 12;
const scoreRed = 12;
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
function setCheckerBoard() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] === 1) {
                setCheckerSquare(i, j, "red");
            }
            else if (board[i][j] === -1) {
                setCheckerSquare(i, j, "black");
            }
        }
    }
}
function arrayCoordinatesToId(y, x) {
    return (y * 8 + x).toString();
}
function setCheckerSquare(indexY, indexX, color) {
    const idNumber = arrayCoordinatesToId(indexY, indexX);
    const currentCell = document.getElementById(idNumber);
    if (currentCell) {
        currentCell.innerHTML = `<div class="checker ${color}-checker"></div>`;
    }
}
function checkPieceInSquare(event) {
    console.log(event.target);
}
document.querySelectorAll();
setCheckerBoard();
