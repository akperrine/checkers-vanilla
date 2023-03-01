// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.ts":[function(require,module,exports) {
"use strict";

var table = document.querySelector("#table");
var scoreBox = document.querySelector(".score-box");
var gameOver = false;
var redTurn = true;
var scoreBlack = 0;
var scoreRed = 0;
var selected = NaN;
var board = [[0, 1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 1, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [-1, 0, -1, 0, -1, 0, -1, 0], [0, -1, 0, -1, 0, -1, 0, -1], [-1, 0, -1, 0, -1, 0, -1, 0]];
// only works because checkers never goes to zero box
var mustMove = false;
var selectedSquare = null;
function updateScore() {
  if (scoreBox) {
    return scoreBox.innerHTML = "\n    <span>Black Pieces: ".concat(scoreBlack, "</span>\n    <span>Red Pieces: ").concat(scoreRed, "</span>\n    ");
  }
}
function boardNumberToMatrix(boardNumber) {
  var firstArrayIndex = Math.floor(boardNumber / 8);
  var secondArrayIndex = boardNumber % 8;
  return [firstArrayIndex, secondArrayIndex];
}
function checkArrayValue(checkerId) {
  var coords = boardNumberToMatrix(checkerId);
  return board[coords[0]][coords[1]];
}
// function clickablePiece() {
document.querySelectorAll(".checker").forEach(function (piece) {
  // if (pieceWithChecker) {
  piece.addEventListener("click", function (event) {
    if (event.target) {
      var target = event.target;
      var pieceWithChecker = piece.hasChildNodes();
      // check if square clicked is highlighted
      if (!mustMove) {
        if (event.target.classList.contains("highlight")) {
          var boardNumber = parseInt(piece.id);
          var highlightedCoords = boardNumberToMatrix(boardNumber);
          var selectedCoords = boardNumberToMatrix(selected);
          var rowDifference = highlightedCoords[0] - selectedCoords[0];
          // remove skipped piece
          // check if pieced skipped down
          if (rowDifference === 2) {
            // check if piece moved down and RIGHT
            if (highlightedCoords[1] > selectedCoords[1]) {
              var skippedPieceId = (selected + 9).toString();
              var skippedPieceMatrix = boardNumberToMatrix(selected + 9);
              var skippedSquare = document.getElementById(skippedPieceId);
              if (skippedSquare) {
                board[skippedPieceMatrix[0]][skippedPieceMatrix[1]] = 0;
                skippedSquare.innerHTML = "";
              }
            }
            // check if piece moved down and LEFT
            if (highlightedCoords[1] < selectedCoords[1]) {
              var _skippedPieceId = (selected + 7).toString();
              var _skippedPieceMatrix = boardNumberToMatrix(selected + 7);
              var _skippedSquare = document.getElementById(_skippedPieceId);
              if (_skippedSquare) {
                board[_skippedPieceMatrix[0]][_skippedPieceMatrix[1]] = 0;
                _skippedSquare.innerHTML = "";
              }
            }
          }
          // check if piece moved up
          if (rowDifference === -2) {
            // check if piece moved up and RIGHT
            if (highlightedCoords[1] > selectedCoords[1]) {
              var _skippedPieceId2 = (selected - 7).toString();
              var _skippedPieceMatrix2 = boardNumberToMatrix(selected - 7);
              var _skippedSquare2 = document.getElementById(_skippedPieceId2);
              if (_skippedSquare2) {
                board[_skippedPieceMatrix2[0]][_skippedPieceMatrix2[1]] = 0;
                _skippedSquare2.innerHTML = "";
              }
            }
            // check if piece moved up and LEFT
            if (highlightedCoords[1] < selectedCoords[1]) {
              var _skippedPieceId3 = (selected - 9).toString();
              var _skippedPieceMatrix3 = boardNumberToMatrix(selected - 9);
              var _skippedSquare3 = document.getElementById(_skippedPieceId3);
              if (_skippedSquare3) {
                board[_skippedPieceMatrix3[0]][_skippedPieceMatrix3[1]] = 0;
                _skippedSquare3.innerHTML = "";
              }
            }
          }
          //check if now king
          var selctedCell = document.getElementById(selected.toString());
          var pieceColorNumber = checkArrayValue(selected);
          if (pieceColorNumber === 1 && highlightedCoords[0] === 7 || pieceColorNumber === -1 && highlightedCoords[0] === 0 || (selctedCell === null || selctedCell === void 0 ? void 0 : selctedCell.children[0].classList.contains("king"))) {
            target.innerHTML = "<div class=\"piece king ".concat(pieceColorNumber === 1 ? "red" : "black", "-piece\"></div>");
            console.log(target);
          }
          // update board array to proper values
          board[highlightedCoords[0]][highlightedCoords[1]] = checkArrayValue(selected);
          board[selectedCoords[0]][selectedCoords[1]] = 0;
          //check if still a move left
          document.querySelectorAll(".highlight").forEach(function (square) {
            square.classList.remove("highlight");
          });
          var checkerValue = checkArrayValue(boardNumber);
          if (rowDifference === 2 || rowDifference === -2) {
            console.log('check next move normal');
            checkContinuedMove(highlightedCoords[0], highlightedCoords[1], checkerValue);
          }
          // update selected cell to be empty
          if (selctedCell) {
            selctedCell.innerHTML = "";
          }
          selected = NaN;
          redTurn = !redTurn;
          setCheckerBoard();
        } else if (pieceWithChecker) {
          console.log('standard check move');
          var _boardNumber = parseInt(piece.id);
          var _checkerValue = checkArrayValue(_boardNumber);
          var xCoord = boardNumberToMatrix(_boardNumber)[0];
          var yCoord = boardNumberToMatrix(_boardNumber)[1];
          if (redTurn && _checkerValue === 1) {
            selected = _boardNumber;
            moveChoice(xCoord, yCoord, target, _checkerValue);
          }
          if (!redTurn && _checkerValue === -1) {
            selected = _boardNumber;
            moveChoice(xCoord, yCoord, target, _checkerValue);
          }
        }
      } else {
        if (event.target.classList.contains("highlight")) {
          selected = mustMove;
          if (event.target.classList.contains("highlight")) {
            var _boardNumber2 = parseInt(piece.id);
            var _highlightedCoords = boardNumberToMatrix(_boardNumber2);
            var _selectedCoords = boardNumberToMatrix(selected);
            var _rowDifference = _highlightedCoords[0] - _selectedCoords[0];
            // remove skipped piece
            // check if pieced skipped down
            if (_rowDifference === 2) {
              // check if piece moved down and RIGHT
              if (_highlightedCoords[1] > _selectedCoords[1]) {
                var _skippedPieceId4 = (selected + 9).toString();
                var _skippedPieceMatrix4 = boardNumberToMatrix(selected + 9);
                var _skippedSquare4 = document.getElementById(_skippedPieceId4);
                if (_skippedSquare4) {
                  board[_skippedPieceMatrix4[0]][_skippedPieceMatrix4[1]] = 0;
                  _skippedSquare4.innerHTML = "";
                }
              }
              // check if piece moved down and LEFT
              if (_highlightedCoords[1] < _selectedCoords[1]) {
                var _skippedPieceId5 = (selected + 7).toString();
                var _skippedPieceMatrix5 = boardNumberToMatrix(selected + 7);
                var _skippedSquare5 = document.getElementById(_skippedPieceId5);
                if (_skippedSquare5) {
                  board[_skippedPieceMatrix5[0]][_skippedPieceMatrix5[1]] = 0;
                  _skippedSquare5.innerHTML = "";
                }
              }
            }
            // check if piece moved up
            if (_rowDifference === -2) {
              // check if piece moved up and RIGHT
              if (_highlightedCoords[1] > _selectedCoords[1]) {
                var _skippedPieceId6 = (selected - 7).toString();
                var _skippedPieceMatrix6 = boardNumberToMatrix(selected - 7);
                var _skippedSquare6 = document.getElementById(_skippedPieceId6);
                if (_skippedSquare6) {
                  board[_skippedPieceMatrix6[0]][_skippedPieceMatrix6[1]] = 0;
                  _skippedSquare6.innerHTML = "";
                }
              }
              // check if piece moved up and LEFT
              if (_highlightedCoords[1] < _selectedCoords[1]) {
                var _skippedPieceId7 = (selected - 9).toString();
                var _skippedPieceMatrix7 = boardNumberToMatrix(selected - 9);
                var _skippedSquare7 = document.getElementById(_skippedPieceId7);
                if (_skippedSquare7) {
                  board[_skippedPieceMatrix7[0]][_skippedPieceMatrix7[1]] = 0;
                  _skippedSquare7.innerHTML = "";
                }
              }
            }
            //check if now king
            var _selctedCell = document.getElementById(selected.toString());
            var _pieceColorNumber = checkArrayValue(selected);
            if (_pieceColorNumber === 1 && _highlightedCoords[0] === 7 || _pieceColorNumber === -1 && _highlightedCoords[0] === 0 || (_selctedCell === null || _selctedCell === void 0 ? void 0 : _selctedCell.children[0].classList.contains("king"))) {
              target.innerHTML = "<div class=\"piece king ".concat(_pieceColorNumber === 1 ? "red" : "black", "-piece\"></div>");
            }
            // update board array to proper values
            board[_highlightedCoords[0]][_highlightedCoords[1]] = checkArrayValue(selected);
            board[_selectedCoords[0]][_selectedCoords[1]] = 0;
            //check if still a move left
            document.querySelectorAll(".highlight").forEach(function (square) {
              square.classList.remove("highlight");
            });
            setCheckerBoard();
            var _checkerValue2 = checkArrayValue(_boardNumber2);
            mustMove = false;
            if (_rowDifference === 2 || _rowDifference === -2) {
              console.log('checking if next move');
              checkContinuedMove(_highlightedCoords[0], _highlightedCoords[1], _checkerValue2);
            }
            // update selected cell to be empty
            console.log(selected.toString());
            if (_selctedCell) {
              console.log(_selctedCell);
              _selctedCell.innerHTML = "";
            }
            selected = NaN;
            scoreBlack = 0;
            scoreRed = 0;
          }
        }
      }
    }
  });
  // }
});
// }
function setCheckerBoard() {
  scoreBlack = 0;
  scoreRed = 0;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
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
function arrayCoordinatesToId(y, x) {
  return (y * 8 + x).toString();
}
function setCheckerSquare(indexY, indexX, color) {
  var idNumber = arrayCoordinatesToId(indexY, indexX);
  var currentCell = document.getElementById(idNumber);
  if (currentCell) {
    if (currentCell.children[0]) {
      if (currentCell.children[0].classList.contains("king")) {
        currentCell.innerHTML = "";
        currentCell.innerHTML = "<div class=\"piece king ".concat(color, "-piece\"></div>");
      }
    } else {
      currentCell.innerHTML = "";
      currentCell.innerHTML = "<div class=\"piece ".concat(color, "-piece\"></div>");
    }
  }
}
setCheckerBoard();
function checkColorsTurn(boardNumber, target) {
  var boardCoordinates = boardNumberToMatrix(boardNumber);
  if (redTurn && board[boardCoordinates[0]][boardCoordinates[1]] === 1) {
    selectedSquare = document.getElementById(boardNumber.toString());
    moveChoice(boardCoordinates[0], boardCoordinates[1], target, 1);
  } else if (!redTurn && board[boardCoordinates[0]][boardCoordinates[1]] === -1) {
    selectedSquare = document.getElementById(boardNumber.toString());
    moveChoice(boardCoordinates[0], boardCoordinates[1], target, -1);
  } else {
    return;
  }
}
function moveChoice(yCoord, xCoord, target, colorNumber) {
  document.querySelectorAll(".highlight").forEach(function (square) {
    square.classList.remove("highlight");
  });
  var oppositeColor = colorNumber * -1;
  if (colorNumber === 1 || target.classList.contains("king")) {
    if (board[yCoord + 1]) {
      if (board[yCoord + 1][xCoord - 1] === 0) {
        var id = arrayCoordinatesToId(yCoord + 1, xCoord - 1);
        if (document.getElementById(id)) {
          document.getElementById(id).classList.add("highlight");
        }
      } else if (board[yCoord + 2] && board[yCoord + 1][xCoord - 1] === oppositeColor && board[yCoord + 2][xCoord - 2] === 0) {
        var _id = arrayCoordinatesToId(yCoord + 2, xCoord - 2);
        document.getElementById(_id).classList.add("highlight");
      }
      if (board[yCoord + 1][xCoord + 1] === 0) {
        var _id2 = arrayCoordinatesToId(yCoord + 1, xCoord + 1);
        document.getElementById(_id2).classList.add("highlight");
      } else if (board[yCoord + 2] && board[yCoord + 1][xCoord + 1] === oppositeColor && board[yCoord + 2][xCoord + 2] === 0) {
        var _id3 = arrayCoordinatesToId(yCoord + 2, xCoord + 2);
        document.getElementById(_id3).classList.add("highlight");
      }
    }
  }
  if (colorNumber === -1 || target.classList.contains("king")) {
    if (board[yCoord - 1]) {
      if (board[yCoord - 1][xCoord - 1] === 0) {
        var _id4 = arrayCoordinatesToId(yCoord - 1, xCoord - 1);
        document.getElementById(_id4).classList.add("highlight");
      } else if (board[yCoord - 2] && board[yCoord - 1][xCoord - 1] === oppositeColor && board[yCoord - 2][xCoord - 2] === 0) {
        var _id5 = arrayCoordinatesToId(yCoord - 2, xCoord - 2);
        document.getElementById(_id5).classList.add("highlight");
      }
      if (board[yCoord - 1][xCoord + 1] === 0) {
        var _id6 = arrayCoordinatesToId(yCoord - 1, xCoord + 1);
        document.getElementById(_id6).classList.add("highlight");
      } else if (board[yCoord - 2] && board[yCoord - 1][xCoord + 1] === oppositeColor && board[yCoord - 2][xCoord + 2] === 0) {
        var _id7 = arrayCoordinatesToId(yCoord - 2, xCoord + 2);
        document.getElementById(_id7).classList.add("highlight");
      }
    }
  }
}
function checkContinuedMove(yCoord, xCoord, colorNumber) {
  var oppositeColor = colorNumber * -1;
  //check if piece being moved is a king
  var selectedElement = document.getElementById(selected.toString());
  var pieceisKing = selectedElement.children[0].classList.contains('king');
  var squareId = parseInt(arrayCoordinatesToId(yCoord, xCoord));
  if (colorNumber === 1 || pieceisKing) {
    // check if move to top Left still
    if (board[yCoord + 2] && board[yCoord + 1][xCoord - 1] === oppositeColor && board[yCoord + 2][xCoord - 2] === 0) {
      var id = arrayCoordinatesToId(yCoord + 2, xCoord - 2);
      document.getElementById(id).classList.add("highlight");
      mustMove = squareId;
    }
    // check if move to top Right still
    if (board[yCoord + 2] && board[yCoord + 1][xCoord + 1] === oppositeColor && board[yCoord + 2][xCoord + 2] === 0) {
      var _id8 = arrayCoordinatesToId(yCoord + 2, xCoord + 2);
      document.getElementById(_id8).classList.add("highlight");
      mustMove = squareId;
    }
  }
  if (colorNumber === -1 || pieceisKing) {
    // check if move to bottom Left still
    if (board[yCoord - 2] && board[yCoord - 1][xCoord - 1] === oppositeColor && board[yCoord - 2][xCoord - 2] === 0) {
      var _id9 = arrayCoordinatesToId(yCoord - 2, xCoord - 2);
      document.getElementById(_id9).classList.add("highlight");
      mustMove = squareId;
    }
    // check if move to bottom Left still
    if (board[yCoord - 2] && board[yCoord - 1][xCoord + 1] === oppositeColor && board[yCoord - 2][xCoord + 2] === 0) {
      var _id10 = arrayCoordinatesToId(yCoord - 2, xCoord + 2);
      document.getElementById(_id10).classList.add("highlight");
      mustMove = squareId;
    }
  }
}
},{}],"../../.asdf/installs/nodejs/18.10.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53689" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../.asdf/installs/nodejs/18.10.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map