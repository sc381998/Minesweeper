let arr = [];
let noOfBomb = 10;
let dimension = 9;
let score = 0;
let totalScore = 0;
let timerId;
let gameover = false;
let isFlag = false;
let highScore = 0;

const flagEmoji = "🚩";
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
    // cell.setAttribute("onclick", "handleClick(this)");
    cell.addEventListener("mousedown", handleClick);
    if (arr.includes(i + 1)) cell.classList.add("bombPlaced");
    // else cell.classList.add("green");
    gameContainer.appendChild(cell);
  }
};

document.oncontextmenu = function (e) {
  stopEvent(e);
};
function stopEvent(event) {
  if (event.preventDefault !== undefined) event.preventDefault();
  // if (event.stopPropagation !== undefined) event.stopPropagation();
}

const findNoOfBombs = (el) => {
  console.log(arr);
  let id = Number(el.id);
  console.log(typeof id);
  let distance = 0;
  let totalDimesion = dimension * dimension;
  console.log(id + 1);
  for (let i = 0; i < noOfBomb; i++) {
    if (arr[i] === id - 1 && id - 1 > 0 && id - 1 < totalDimesion) distance++;
    if (arr[i] === id + 1 && id + 1 > 0 && id + 1 < totalDimesion) distance++;
    if (arr[i] === id - 8 && id - 8 > 0 && id - 8 < totalDimesion) distance++;
    if (arr[i] === id - 9 && id - 9 > 0 && id - 9 < totalDimesion) distance++;
    if (arr[i] === id - 10 && id - 10 > 0 && id - 10 < totalDimesion)
      distance++;
    if (arr[i] === id + 8 && id + 8 > 0 && id + 8 < totalDimesion) distance++;
    if (arr[i] === id + 9 && id + 9 > 0 && id + 9 < totalDimesion) distance++;
    if (arr[i] === id + 10 && id + 10 > 0 && id + 10 < totalDimesion)
      distance++;
  }
  switch (distance) {
    case 0:
      el.classList.add("lightBlueZero");
      break;
    case 1:
      el.classList.add("blueOne");
      break;
    case 2:
      el.classList.add("yellowTwo");
      break;
    case 3:
      el.classList.add("pinkThree");
      break;
    default:
      el.classList.add("lightBlueZero");
  }
  el.textContent = distance;
};

const handleClick = (event) => {
  if (gameover) return;
  let el = event.target;
  if (el.classList.contains("selected")) return;

  if (event.button === 2) {
    // console.log(el);
    el.textContent = flagEmoji;
    el.classList.add("isFlag");
  } else {
    el.classList.add("selected");
    if (el.classList.contains("isFlag")) el.textContent = "";
    findNoOfBombs(el);
    let flag = false;
    for (let i = 0; i < noOfBomb; i++) {
      if (arr[i].toString() === el.id) {
        let bombBlastSound = new Audio("blast.mp3");
        bombBlastSound.play();
        el.classList.add("red");
        flag = true;
        gameover = true;
        gameOver();
        // document.getElementById("gameContainer").classList.add("abs");
        document.getElementById("totalScore").innerHTML = score;
        highScore = Math.max(score, highScore);
        document.getElementById("highScore").innerHTML = highScore;
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
  }
};

const win = () => {
  document.getElementById("gameOverContainer").classList.remove("hide");
  document.getElementById("gameWinContainer").classList.remove("hide");
  // alert("Congratulations, you WIN");
};

const gameOver = () => {
  let cell = document.getElementsByClassName("gameGrid");
  for (let i = 0; i < dimension * dimension; i++) {
    // cell[i].setAttribute("onclick", "");
    if (cell[i].classList.contains("bombPlaced")) {
      cell[i].classList.add("red");
      cell[i].textContent = bomb;
      cell[i].removeEventListener("click", handleClick);
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
  gameover = false;
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
