let duration = 1000;
let boxesContainer = document.querySelector(".boxes");
let scoreElement = document.querySelector(".score span");
let triesElement = document.querySelector(".tries span");
let gameOverMessage = document.querySelector(".game-over");
let congratulationsMessage = document.querySelector(".congratulations");
let retryButtons = document.querySelectorAll(".retry");

let boxes = Array.from(boxesContainer.children);
let orderRange = [...Array(boxes.length).keys()];

let maxTries = 8;
let score = 0;
let tries = 0;

shuffle(orderRange);

boxes.forEach((box, index) => {
  box.style.order = orderRange[index];
  box.addEventListener("click", function () {
    flipBox(box);
  });
});

retryButtons.forEach((button) => {
  button.addEventListener("click", resetGame);
});

function shuffle(array) {
  let current = array.length,
    temp,
    randomIndex;
  while (current > 0) {
    randomIndex = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function flipBox(selectedBox) {
  if (tries < maxTries) {
    selectedBox.classList.add(`flipped`);
    let flippedBoxes = boxes.filter((flippedBox) =>
      flippedBox.classList.contains("flipped")
    );
    if (flippedBoxes.length === 2) {
      stopClicking();
      ifMatched(flippedBoxes[0], flippedBoxes[1]);
    }
  }
}

function stopClicking() {
  boxesContainer.classList.add("no-click");
  setTimeout(() => {
    boxesContainer.classList.remove("no-click");
  }, duration);
}

function ifMatched(firstBox, secBox) {
  if (firstBox.dataset.r === secBox.dataset.r) {
    firstBox.classList.remove("flipped");
    secBox.classList.remove("flipped");
    firstBox.classList.add("matched");
    secBox.classList.add("matched");
    score += 10;
    scoreElement.textContent = score;
    checkWinCondition();
  } else {
    tries++;
    triesElement.textContent = tries;
    setTimeout(() => {
      firstBox.classList.remove("flipped");
      secBox.classList.remove("flipped");
    }, duration);
    if (tries >= maxTries) {
      showGameOver();
    }
  }
}

function checkWinCondition() {
  const matchedBoxes = boxes.filter((box) => box.classList.contains("matched"));
  if (matchedBoxes.length === boxes.length) {
    showCongratulations(score);
  }
}

function isGameCompleted() {
  return boxes.every((box) => box.classList.contains("matched"));
}

function showCongratulations() {
  congratulationsMessage.classList.remove("hidden");
}

function showGameOver() {
  gameOverMessage.classList.remove("hidden");
  boxesContainer.classList.add("no-click");
}

function resetGame() {
  // Hide game over and congratulations messages
  gameOverMessage.classList.add("hidden");
  congratulationsMessage.classList.add("hidden");

  // Reset score and tries
  score = 0;
  tries = 0;
  scoreElement.textContent = score;
  triesElement.textContent = tries;

  // Remove all matched classes and flip classes
  boxes.forEach((box) => {
    box.classList.remove("matched", "flipped");
  });

  // Shuffle boxes again
  shuffle(orderRange);
  boxes.forEach((box, index) => {
    box.style.order = orderRange[index];
  });

  // Allow clicking again
  boxesContainer.classList.remove("no-click");
}
