"use strict";
const table = document.querySelector("#table");
const scoreBox = document.querySelector(".score-box");
let gameOver = false;
let redTurn = true;
let scoreBlack = 12;
let scoreRed = 12;
let board = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, -1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0],
];
let selectedSquare = null;
function updateScore() {
    if (scoreBox) {
        return (scoreBox.innerHTML = `
    <span>Black Pieces: ${scoreBlack}</span>
    <span>Red Pieces: ${scoreRed}</span>
    `);
    }
}
function boardNumberToMatrix(boardNumber) {
    const firstArrayIndex = Math.floor(boardNumber / 8);
    const secondArrayIndex = boardNumber % 8;
    return [firstArrayIndex, secondArrayIndex];
}
function clickablePiece() {
    return document.querySelectorAll(".checker").forEach((piece) => {
        const pieceWithChecker = piece.closest("td");
        if (pieceWithChecker) {
            piece.addEventListener("click", (event) => {
                const boardNumber = parseInt(pieceWithChecker.id);
                if (event.target) {
                    const target = event.target;
                    const data = [
                        checkColorsTurn(boardNumber, target),
                        makeMove(boardNumber, target),
                    ];
                    return data;
                }
            });
        }
    });
}
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
    clickablePiece();
    updateScore();
}
function arrayCoordinatesToId(y, x) {
    return (y * 8 + x).toString();
}
function setCheckerSquare(indexY, indexX, color) {
    const idNumber = arrayCoordinatesToId(indexY, indexX);
    const currentCell = document.getElementById(idNumber);
    if (currentCell) {
        currentCell.innerHTML = `<div class="piece ${color}-piece"></div>`;
    }
}
setCheckerBoard();
function checkColorsTurn(boardNumber, target) {
    const boardCoordinates = boardNumberToMatrix(boardNumber);
    if (redTurn && board[boardCoordinates[0]][boardCoordinates[1]] === 1) {
        selectedSquare = document.getElementById(boardNumber.toString());
        moveChoice(boardCoordinates[0], boardCoordinates[1], target, 1);
    }
    else if (!redTurn &&
        board[boardCoordinates[0]][boardCoordinates[1]] === -1) {
        selectedSquare = document.getElementById(boardNumber.toString());
        moveChoice(boardCoordinates[0], boardCoordinates[1], target, -1);
    }
    else {
        return;
    }
}
function moveChoice(yCoord, xCoord, target, colorNumber) {
    document.querySelectorAll(".highlight").forEach((square) => {
        square.classList.remove("highlight");
    });
    const oppositeColor = colorNumber * -1;
    console.log(selectedSquare);
    if (colorNumber === 1 || target.classList.contains("king")) {
        if (board[yCoord + 1][xCoord - 1] === 0) {
            const id = arrayCoordinatesToId(yCoord + 1, xCoord - 1);
            if (document.getElementById(id)) {
                document.getElementById(id).classList.add("highlight");
            }
        }
        else if (board[yCoord + 1][xCoord - 1] === oppositeColor &&
            board[yCoord + 2][xCoord - 2] === 0) {
            const id = arrayCoordinatesToId(yCoord + 2, xCoord - 2);
            document.getElementById(id).classList.add("highlight");
        }
        if (board[yCoord + 1][xCoord + 1] === 0) {
            const id = arrayCoordinatesToId(yCoord + 1, xCoord + 1);
            document.getElementById(id).classList.add("highlight");
        }
        else if (board[yCoord + 1][xCoord + 1] === oppositeColor &&
            board[yCoord + 2][xCoord + 2] === 0) {
            const id = arrayCoordinatesToId(yCoord + 2, xCoord + 2);
            document.getElementById(id).classList.add("highlight");
        }
    }
    if (colorNumber === -1 || target.classList.contains("king")) {
        if (board[yCoord - 1][xCoord - 1] === 0) {
            const id = arrayCoordinatesToId(yCoord - 1, xCoord - 1);
            document.getElementById(id).classList.add("highlight");
        }
        else if (board[yCoord - 1][xCoord - 1] === oppositeColor &&
            board[yCoord - 2][xCoord - 2] === 0) {
            const id = arrayCoordinatesToId(yCoord - 2, xCoord - 2);
            document.getElementById(id).classList.add("highlight");
        }
        if (board[yCoord - 1][xCoord + 1] === 0) {
            const id = arrayCoordinatesToId(yCoord - 1, xCoord + 1);
            document.getElementById(id).classList.add("highlight");
        }
        else if (board[yCoord - 1][xCoord + 1] === oppositeColor &&
            board[yCoord - 2][xCoord + 2] === 0) {
            const id = arrayCoordinatesToId(yCoord - 2, xCoord + 2);
            document.getElementById(id).classList.add("highlight");
        }
    }
}
function makeMove(boardNumber, target) {
    if (target.classList.contains("highlight")) {
        const checkerDivPointer = selectedSquare === null || selectedSquare === void 0 ? void 0 : selectedSquare.innerHTML;
        document.getElementById(boardNumber).innerHTML = checkerDivPointer;
        document.querySelectorAll(".highlight").forEach((square) => {
            square.classList.remove("highlight");
        });
    }
}
