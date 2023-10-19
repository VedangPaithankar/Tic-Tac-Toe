const readline = require('readline');
const clear = require('clear');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let currentPlayer = 'X';

function printBoard() {
  clear(); // Clear the terminal
  console.log('  1   2   3');
  for (let i = 0; i < 3; i++) {
    console.log(`${i + 1} ${board[i][0]} | ${board[i][1]} | ${board[i][2]}`);
    if (i < 2) {
      console.log('  ---------');
    }
  }
}

function checkWin(player) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
      return true;
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
      return true;
    }
  }

  // Check diagonals
  if (
    (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
    (board[0][2] === player && board[1][1] === player && board[2][0] === player)
  ) {
    return true;
  }

  return false;
}

function checkTie() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === ' ') {
        return false;
      }
    }
  }
  return true;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function play(row, col) {
    if (row < 0 || row > 2 || col < 0 || col > 2 || board[row][col] !== ' ') {
      console.log('Invalid move. Try again.');
    } 
    else {
      board[row][col] = currentPlayer;
      if (checkWin(currentPlayer)) {
        console.log(`Player ${currentPlayer} wins!`);
        rl.close();
      } else if (checkTie()) {
        console.log('It\'s a tie!');
        rl.close();
      } else {
        switchPlayer();
        printBoard();
        promptPlayer(); // Move this call here
      }
    }
}

function promptPlayer() {
  rl.question(`Player ${currentPlayer}, enter your move (row and column, e.g., 1 2): `, (input) => {
    const [row, col] = input.split(' ').map(Number);
    play(row - 1, col - 1);
  });
}

console.log('Welcome to Tic Tac Toe!');
printBoard();
promptPlayer();
