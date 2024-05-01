// game board
function createGameboard () {
  let gameboard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  const getGameboard = () => gameboard;
  const updateGameboard = (marker, row, col) => {
    gameboard[row][col] = marker
  };

  return {getGameboard, updateGameboard};
}

// player - 1 & 2 based on same object
// win+tie checking
// scoreboard - maybe just store in player object
// game state

// set up game
board = createGameboard()
