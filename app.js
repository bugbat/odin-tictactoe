// game board
function createGameboard() {
  //let gameboard = [['', '', ''], ['', '', ''], ['', '', '']]; //empty
  let gameboard = [['o', 'x', 'o'], ['x', 'o', 'x'], ['x', 'o', 'x']]; // tie
  //let gameboard = [['x', 'x', 'x'], ['x', 'x', 'o'], ['o', 'x', 'x']]; // x
  //let gameboard = [['o', 'o', 'o'], ['x', 'x', 'o'], ['o', 'x', 'x']]; // o

  const getGameboard = () => gameboard;
  const updateGameboard = (marker, row, col) => {
    gameboard[row][col] = marker;
  };

  return { getGameboard, updateGameboard };
}

// player - 1 & 2 based on same object
function createPlayer(name, marker) {
  let score = 0;
  const getName = () => name;
  const getMarker = () => marker;

  const getScore = () => score;
  const addScore = () => ++score;
  return { getName, getMarker, getScore, addScore };
}

// win+tie checking
function checkForWinner(board) {
  const b = board.getGameboard();

  // check diagonals for winner
  if (b[0][0] === b[1][1] === b[2][2] && b[1][1] !== '') {
    return b[0][0];
  }
  else if (b[0][2] === b[1][1] === b[2][0] && b[1][1] !== '') {
    return b[0][2];
  }

  // check rows and cols for winner
  for (i = 0; i < b.length; i++) {
    if (b[i].every(mark => mark === b[i][0]) && b[i][0] !== '') {
      return b[i][0];
    }
    else if (b[i][0] === b[i][1] === b[i][2] && b[i][0] !== '') {
      return b[i][0];
    }
  }
  // if no winner, check for tie
  if (checkFreeSpace(board) === false) {
    return 'tie';
  }
  // if no win and no tie, go to next round
  return false;
}

// check if board full
function checkFreeSpace(board, coord = null) {
  const b = board.getGameboard();
  if (coord === null) {
    let fullBoard = []
    for (i = 0; i < b.length; i++) {
      fullBoard.push(...b[i]);
      }
    if (!fullBoard.includes('')) {
      return false;
    }
  }
  else if (coord !== null) {
    const yx = coord.split('');
    const y = Number(yx[0]);
    const x = Number(yx[1]);
    if (b[y][x] !== '') {
      return false;
    }
  }
  return true;
}

// game state
function gameState(p1, p2, board) {
  let gameActive = true;
  let playerTurn = 'p1';
}

// prompt for move and place marker
function getMove() {

}

// set up game
const myBoard = createGameboard();
const p1 = createPlayer('p1', 'X');
const p2 = createPlayer('p2', 'O');
