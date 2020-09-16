let arr = [];
let noOfBomb = 10;
let dimension = 9;
let score = 0;
let totalScore = 0;
let timerId;
const bomb = "💣";
const smileEmoji = "😊";
const sadEmoji = "🥴";

const placeBomb = () => {
  for (let i = 0; i < noOfBomb; i++) {
    const val = Math.floor(Math.random() * 80);
    if (arr.includes(val)) i--;
    else arr[i] = val;
  }
};

// console.log(...arr);
const createGrid = () => {
  let gameContainer = document.getElementById("gameContainer");
  for (let i = 0; i < dimension * dimension; i++) {
    let cell = document.createElement("div");
    cell.classList.add("gameGrid");
    cell.id = i + 1;
    cell.setAttribute("onclick", "handleClick(this)");
    if (arr.includes(i + 1)) cell.classList.add("bombPlaced");
    // else cell.classList.add("green");
    gameContainer.appendChild(cell);
  }
};
const handleClick = (el) => {
  if (el.classList.contains("selected")) return;
  el.classList.add("selected");

  let flag = false;
  for (let i = 0; i < noOfBomb; i++) {
    if (arr[i].toString() === el.id) {
      el.classList.add("red");
      flag = true;
      gameOver();
      // document.getElementById("gameContainer").classList.add("abs");
      document.getElementById("totalScore").innerHTML = score;
      // document.getElementById("highScore").innerHTML = highScore;
      document.getElementById("gameOverContainer").classList.remove("hide");
      clearInterval(timerId);
    }
  }
  if (flag === false) {
    score++;
    el.classList.add("green");
  }
  if (score === 71) {
    win();
  }
  document.getElementById("score").innerHTML = ("000" + score).substr(-3);
};
const win = () => {
  alert("you win");
};
const gameOver = () => {
  let cell = document.getElementsByClassName("gameGrid");
  for (let i = 0; i < dimension * dimension; i++) {
    cell[i].setAttribute("onclick", "");
    if (cell[i].classList.contains("bombPlaced")) {
      cell[i].classList.add("red");
      cell[i].textContent = bomb;
    }
  }
  document.getElementById("smileEmoji").textContent = sadEmoji;
  return;
};

const startNewGame = () => {
  arr = [];
  noOfBomb = 10;
  dimension = 9;
  score = 0;
  placeBomb();
  document.getElementById("gameContainer").innerHTML = "";
  document.getElementById("score").innerHTML = ("000" + score).substr(-3);
  document.getElementById("smileEmoji").innerHTML = smileEmoji;
  startTimer();
  createGrid();
  document.getElementById("gameOverContainer").classList.add("hide");
  // document.getElementById("gameContainer").classList.remove("abs");
};

const exit = () => {
  window.location.reload();
};

const startTimer = () => {
  let minute = 0;
  let second = 0;
  timerId = setInterval(() => {
    second++;

    document.getElementById("second").innerHTML = ("00" + second).substr(-2);
    document.getElementById("minute").innerHTML = ("00" + minute).substr(-2);
    if (second === 59) {
      second = 0;
      minute++;
    }
  }, 1000);
};
placeBomb();
createGrid();
startTimer();
