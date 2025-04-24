
let gameArea = document.getElementById("gameArea");
let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");

let minTimeEl = document.getElementById("minTime");
let maxTimeEl = document.getElementById("maxTime");
let avgTimeEl = document.getElementById("avgTime");
let falseClicks = 0;

let statsPanel = document.getElementById("stats");

let timeoutId;
let clickStart;
let reactionTimes = [];
let tries = 0;
let maxTries = 5;
let gameRunning = false;

function startGame() {
  reactionTimes = [];
  tries = 0;
  falseClicks = 0;
  gameRunning = true;
  statsPanel.classList.add("hidden");
  startBtn.disabled = true;
  stopBtn.disabled = false;
  nextRound();
}

function stopGame() {
  gameRunning = false;
  clearTimeout(timeoutId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  gameArea.style.backgroundColor = "gray";
}

function nextRound() {
  let delay = Math.random() * 2000 + 1000; // 1s – 3s

  timeoutId = setTimeout(() => {
    gameArea.style.backgroundColor = "green";
    clickStart = Date.now();
  }, delay);
}
gameArea.addEventListener("click", () => {
  if (!gameRunning) return;

  if (gameArea.style.backgroundColor === "green") {
    const reactionTime = Date.now() - clickStart;
    reactionTimes.push(reactionTime);
    tries++;

    if (tries < maxTries) {
      gameArea.style.backgroundColor = "gray";
      nextRound();
    } else {
      showStats();
      stopGame();
    }
  } else {
    falseClicks++;
  }
});

function showStats() {
  const min = Math.min(...reactionTimes);
  const max = Math.max(...reactionTimes);
  const avg = Math.round(reactionTimes.reduce((a, b) => a + b) / reactionTimes.length);

  minTimeEl.textContent = min;
  maxTimeEl.textContent = max;
  avgTimeEl.textContent = avg;

  document.getElementById("falseClicks").textContent = falseClicks;
  statsPanel.classList.remove("hidden");
}

startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", stopGame);
