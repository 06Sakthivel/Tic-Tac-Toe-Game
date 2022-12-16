const cells = Array.from(document.querySelectorAll(".cell"));
const statusText = document.getElementById("status");
const result = document.getElementById("result");
const resetBtn = document.getElementById("reset");
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
currentPlayer = "X";
let running = false;

const initializeGame = () => {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  running = true;
  resetBtn.addEventListener("click", reset);
};

initializeGame();

function cellClicked() {
  let cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !running) {
    return;
  }

  update(this, cellIndex);
  checkWinner();
}

function update(cell, index) {
  options[index] = `${currentPlayer}`;
  cell.textContent = `${currentPlayer}`;
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    let conditions = winningConditions[i];
    let A = options[conditions[0]];
    let B = options[conditions[1]];
    let C = options[conditions[2]];
    if (A == "" || B == "" || C == "") {
      continue;
    }

    if (A == B && B == C) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} 's win!!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!!`;
    running = false;
  } else {
    changePlayer();
  }
}

const playerX = document.querySelector(".x");
const playerO = document.querySelector(".o");

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  if (currentPlayer == "X") {
    playerX.classList.add("active");
    playerO.classList.remove("active");
  } else {
    playerX.classList.remove("active");
    playerO.classList.add("active");
  }
}

function reset() {
  options = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
  currentPlayer = "X";
  statusText.textContent = "";
  playerX.classList.add("active");
  playerO.classList.remove("active");
}
