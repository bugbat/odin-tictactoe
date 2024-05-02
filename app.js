// game board
function createGameboard() {
  let gameboard = [['', '', ''], ['', '', ''], ['', '', '',]];

  const getGameboard = () => gameboard;
  const updateGameboard = (marker, row, col) => {
    gameboard[row][col] = marker;
  };

  return {getGameboard, updateGameboard};
}

// player - 1 & 2 based on same object
function createPlayer(name, marker) {
  let score = 0;
  const getName = () => name;
  const getMarker = () => marker;

  const getScore = () => score;
  const addScore = () => ++score;
  return {getName, getMarker, getScore, addScore};
}

// win+tie checking
function checkForWinner(board) {
  b = board.getGameboard();

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
  return console.log('success')
}

// scoreboard - maybe just store in player object - done
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
