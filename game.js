// alert("Hello");

let buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
let userClickedPattern = [];
var started = false;
var level = 0;
let isFirstTime = true;

var audio = [
  new Audio("./sounds/blue.mp3"),
  new Audio("./sounds/green.mp3"),
  new Audio("./sounds/red.mp3"),
  new Audio("./sounds/yellow.mp3"),
  new Audio("./sounds/wrong.mp3"),
];

document.addEventListener("keydown", function (event) {
  if (isFirstTime && event.key === "s") {
    isFirstTime = false;
    startGame();
  }

  if (!isFirstTime && event.key === "r") {
    startGame();
  } 
});

function startGame() {
  if (!started) {
    nextSequence();
    started = true;
  }
}

function nextSequence() {
 
  //show level
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level - " + level;

  //choose random color and add to game pattern
  let randonNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randonNumber];
  gamePattern.push(randomChosenColor);
  //play sound and sequence
  playSound(randomChosenColor);
  fadeInOut(document.getElementById(randomChosenColor), 1500);
  console.log(gamePattern);
}

function fadeInOut(colorElement, duration) {
  colorElement.style.opacity = 0;

  var fadeInInterval = setInterval(function () {
    colorElement.style.opacity += 1;
    if (colorElement.style.opacity >= 1) {
      clearInterval(fadeInInterval);
      // Fade out
      var fadeOutInterval = setInterval(function () {
        colorElement.style.opacity -= 1;
        if (colorElement.style.opacity <= 0) {
          clearInterval(fadeOutInterval);
          // Reset opacity for next fadeIn
          colorElement.style.opacity = 1;
        }
      }, duration / 10);
    }
  }, duration / 10);
}

//playsound when button clicked
function playSound(name) {
  switch (name) {
    case "blue":
      audio[0].play();
      break;

    case "green":
      audio[1].play();
      break;

    case "red":
      audio[2].play();
      break;

    case "yellow":
      audio[3].play();
      break;

    case "wrong":
      audio[4].play();
      break;
  }
}

function animatePress(currentColor) {
  var activeButton = document.getElementById(currentColor);
  activeButton.classList.add("pressed");
  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}

document.querySelectorAll(".btn-group .btn").forEach((button) => {
  button.addEventListener("click", function (event) {
    if (!started) {
      return;
    }
    buttonClicked(this.id);
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function buttonClicked(clikedButtonId) {
  // console.log("Button Clicked", clikedButtonId);
  if (!started) {
    return;
  }
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    document.getElementById("level-title").textContent =
      "Game Over, Press r Key to Restart";
    document.body.classList.add("game-over");
    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 300);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
