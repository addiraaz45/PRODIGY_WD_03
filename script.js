const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");
const historyList = document.getElementById("historyList");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      const now = new Date().toLocaleString();
      message.textContent = `${currentPlayer} wins! (${now})`;
      saveWinner(`${currentPlayer} won at ${now}`);
      return;
    }
  }

  if (!board.includes(null)) {
    gameOver = true;
    const now = new Date().toLocaleString();
    message.textContent = `Draw! (${now})`;
    saveWinner(`Draw at ${now}`);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!board[index] && !gameOver) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function saveWinner(result) {
  const li = document.createElement("li");
  li.textContent = result;
  historyList.prepend(li);
}

function restartGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  cells.forEach(cell => cell.textContent = "");
  message.textContent = "";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
