// game logic and state object
function createGame() {
  const board = createGameboard();
  const p1 = createPlayer('Player 1', 'X');
  const p2 = createPlayer('Player 2', 'O');

  let active = true;
  const getStatus = () => active;
  const swapStatus = () => {
    if (active) {
      active = false;
    }
    else {
      active = true;;
    }
  };

  let winner = null;
  const getWinner = () => winner;
  const setWinner = (victor) => {
    winner = victor;
  };

  let currentPlayer = p1;

  let ties = 0;
  const getTies = () => ties;
  const addTie = () => ++ties;

  const getCurrentPlayer = () => currentPlayer;
  const swapCurrentPlayer = () => {
    if (currentPlayer === p1) {
      currentPlayer = p2;
    }
    else {
      currentPlayer = p1;
    }
  };

  const resetGame = () => {
    board.resetBoard();
    active = true;
    winner = null;
    currentPlayer = p1;
    resetDomBoard();
    updatePlayerInfo();
    addWinner(winner);
  };

  return { getTies, addTie, getWinner, setWinner, board, p1, p2, getStatus, swapStatus, getCurrentPlayer, swapCurrentPlayer, resetGame };
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
  };

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
  
  if (checkFreeSpace(board, coord) && game.getStatus()) {
    game.board.updateGameboard(playerMarker, coord.row, coord.col); // update board
    cell.textContent = game.getCurrentPlayer().getMarker(); // update dom
  }
  // prompts to start a new game if game is over and user tries to select board
  else if (!game.getStatus()){
    if (confirm("Game over! Start a new round?")) {
      game.resetGame();
    };
    return;
  }
  // do nothing if game is still active and use selects occupied space
  else {
    return;
  }

  if (checkForWinner(board)) {
    if (checkForWinner(board) === 'tie') {
      game.swapStatus();
      game.setWinner('Tie');
      game.addTie();
      addWinner(game.getWinner());
    }
    else {
      game.swapStatus();
      game.setWinner(game.getCurrentPlayer());
      game.getWinner().addScore();
      addWinner(game.getWinner().getName());
    }
  }
  else {
    game.swapCurrentPlayer();
  }
  updatePlayerInfo()
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
function updatePlayerInfo() {
  const info = document.querySelector("#playerinfo");
  while(info.firstChild) { 
    info.removeChild(info.firstChild); 
  }

  const score = document.querySelector("#score");
  while(score.firstChild) { 
    score.removeChild(score.firstChild); 
  }

  const player1 = document.createElement("p");
  player1.textContent = myGame.p1.getName() + ' (' + myGame.p1.getMarker() + ')';
  const player2 = document.createElement("p");
  player2.textContent = myGame.p2.getName() + ' (' + myGame.p2.getMarker() + ')';
  if (myGame.getCurrentPlayer() === myGame.p1) {
    player1.textContent = "➡ " + player1.textContent;
  }
  else {
      player2.textContent = "➡ " + player2.textContent;
    }
  info.append(player1, player2);

  const player1score = document.createElement("p");
  player1score.textContent = 'P1: ' + myGame.p1.getScore() + ' win(s)';
  const player2score = document.createElement("p");
  player2score.textContent = 'P2: ' + myGame.p2.getScore() + ' win(s)';
  const ties = document.createElement("p");
  ties.textContent = 'Ties: ' + myGame.getTies();
  score.append(player1score, player2score, ties);
}

// add a winner to dom
function addWinner(winner) {
  const div = document.querySelector("#winner");

  while(div.firstChild) { 
    div.removeChild(div.firstChild);
  }

  if (winner === null) {
    return;
  }

  const winningPlayer = document.createElement("p");
  winningPlayer.textContent = "Winner: " + winner;
  const restartBtn = document.createElement("button");
  restartBtn.textContent = 'Start a new game';
  restartBtn.addEventListener('click', function() {
    myGame.resetGame()
  });

  div.append(winningPlayer, restartBtn);
}

// initiate game
const myGame = createGame();
initiateDomBoard();
updatePlayerInfo(myGame);