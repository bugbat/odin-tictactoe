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
  // check diagonals for winner
  if (board[0][0] === board[1][1] === board[2][2] && board[1][1] !== '') {
    return board[0][0];
  }
  else if (board[0][2] === board[1][1] === board[2][0] && board[1][1] !== '') {
    return board[0][2];
  }

  // check rows and cols for winner
  for (i = 0; i < board.length; i++) {
    if (board[i].every(mark => mark === board[i][0]) && board[i][0] !== '') {
      return board[i][0];
    }
    else if (board[i][0] === board[i][1] === board[i][2] && board[i][0] !== '') {
      return board[i][0];
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
  // if given no coordinate, checks it the board is full
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
    if (board[coord_dict.row][coord_dict.col] !== '') {
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

// game state
function createGame() {
  const board = createGameboard();
  const p1 = createPlayer('p1', 'X');
  const p2 = createPlayer('p2', 'O');

  let active = true;
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

  return { board, p1, p2, active, getCurrentPlayer, swapCurrentPlayer }
}

// 1 'turn' of the game
function gameRound(game, input) {
  board = game.getGameboard();
  move = convertInput(input);
  if (checkFreeSpace(board, move)) {

  }
}

// set up dom variables

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

// initiate game
const myGame = createGame()

updatePlayerInfo(myGame)