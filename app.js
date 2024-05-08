// game logic and state object
function createGame() {
  const board = createGameboard();
  const p1 = createPlayer('p1', 'X');
  const p2 = createPlayer('p2', 'O');

  let active = true;
  let winner = null;

  let currentPlayer = p1;
  const getCurrentPlayer = () => currentPlayer;
  const swapCurrentPlayer = () => {
    if (currentPlayer === p1) {
      currentPlayer = p2;
    }
    else {
      currentPlayer = p1;
    }
  }

  const resetGame = () => {
    board.resetBoard();
    active = true;
    winner = null;
    currentPlayer = p1;
    resetDomBoard();
    updatePlayerInfo(myGame);
  }

  return { board, p1, p2, active, winner, getCurrentPlayer, swapCurrentPlayer, resetGame }
}

// game board
function createGameboard() {
  let gameboard = [['', '', ''], ['', '', ''], ['', '', '']]; //empty
  //let gameboard = [['o', 'x', 'o'], ['x', 'o', 'x'], ['x', 'o', 'x']]; // tie
  //let gameboard = [['x', 'x', 'x'], ['x', 'x', 'o'], ['o', 'x', 'x']]; // x row
  //let gameboard = [['o', 'o', 'x'], ['x', 'o', 'x'], ['o', 'x', 'x']]; // x column

  const getGameboard = () => gameboard;
  const updateGameboard = (marker, row, col) => {
    gameboard[row][col] = marker;
  };
  const resetBoard = () => {
    gameboard = [['', '', ''], ['', '', ''], ['', '', '']];
  }

  return { getGameboard, updateGameboard, resetBoard };
}

// player - 1 & 2 based on same object
function createPlayer(name, marker) {
  let score = 0;
  const getName = () => name;
  const changeName = (newName) => {
    name = newName;
  }

  const getMarker = () => marker;

  const getScore = () => score;
  const addScore = () => ++score;
  return { getName, changeName, getMarker, getScore, addScore };
}

// win+tie checking
function checkForWinner(board) {
  // check diagonals for winner
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] !== '') {
    return board[0][0];
  }
  else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[1][1] !== '') {
    return board[0][2];
  }

  // check rows and cols for winner
  for (let i = 0; i < board.length; i++) {
    if (board[i].every(mark => mark === board[i][0]) && board[i][0] !== '') {
      return board[i][0];
    }
    // cols
    else if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
      return board[0][i];
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
  // if given no coordinate, checks if the board is full
  if (coord === null) {
    let fullBoard = []
    for (i = 0; i < board.length; i++) {
      fullBoard.push(...board[i]);
      }
    if (!fullBoard.includes('')) {
      return false;
    }
  }
  // if given coordinate, checks that specific space
  else if (coord !== null) {
    if (board[coord.row][coord.col] !== '') {
      return false;
    }
  }
  return true;
}

// convert coordinate input to array to place marker on board
function convertInput(input) {
  const row_col = input.split('');
  const coord_dict = {
    row: Number(row_col[0]),
    col: Number(row_col[1])
  };
  return coord_dict;
}

// 1 'turn' of the game
function gameRound(game, cell) {
  const playerMarker = game.getCurrentPlayer().getMarker();
  const board = game.board.getGameboard();
  const coord = convertInput(cell.getAttribute('data-coord'));
  
  console.log('game turn initiated');

  if (checkFreeSpace(board, coord) && game.active) {
    game.board.updateGameboard(playerMarker, coord.row, coord.col); // update board
    cell.textContent = myGame.getCurrentPlayer().getMarker(); // update dom
  }
  else {
    console.log('invalid')
    return false;
  }
  
  if (checkForWinner(board)) {
    if (checkForWinner(board) === 'tie') {
      game.active = false;
      game.winner = 'Tie'
      addWinner(game.winner);
    }
    else {
      game.active = false;
      game.winner = game.getCurrentPlayer();
      game.winner.addScore();
      addWinner(game.winner.getName());
    }
  }
  else {
    game.swapCurrentPlayer();
    updatePlayerInfo(game);
  }
}

// dom related functions
function initiateDomBoard() {
  const gameboard_div = document.querySelectorAll('button.cell');
  gameboard_div.forEach(cell => {
    cell.addEventListener('click', function() {
      gameRound(myGame, cell);
    });
  });
}

function resetDomBoard() {
  const gameboard_div = document.querySelectorAll('button.cell');
  gameboard_div.forEach(cell => {
    cell.textContent = '';
  });
}

// updates player info panel with game elements
function updatePlayerInfo(game) {
  const div = document.querySelector("#playerinfo");
  while(div.firstChild) { 
    div.removeChild(div.firstChild); 
  }

  const p1 = document.createElement("p");
  p1.textContent = "Player 1: " + game.p1.getName();
  const p2 = document.createElement("p");
  p2.textContent = "Player 2: " + game.p2.getName();

  const turn = document.createElement("p");
  turn.textContent = game.getCurrentPlayer().getName();


  div.append(p1, p2, turn);
}

// add a winner to dom
function addWinner(winner) {
  const div = document.querySelector("#score");

  while(div.firstChild) { 
    div.removeChild(div.firstChild); 
  }

  const winningPlayer = document.createElement("p");
  winningPlayer.textContent = winner;

  div.append(winningPlayer);
}

// initiate game
const myGame = createGame();
initiateDomBoard();
updatePlayerInfo(myGame);