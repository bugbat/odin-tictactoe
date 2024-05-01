// game board
function createGameboard() {
  let gameboard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

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
  return {getName, getMarker, getScore, addScore}
}

// win+tie checking
// scoreboard - maybe just store in player object
// game state

// set up game
board = createGameboard();
p = createPlayer('p1', 'x')