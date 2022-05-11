let buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;

let started = false;

$(document).on("keydown", function() {
  if (started === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function() {
  userClickedPattern.push(this.id);
  playSound(this.id);
  animatePress(this.id);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentUserIndex) {
  if(userClickedPattern[currentUserIndex] === gamePattern[currentUserIndex]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over! Press Any Key to Restart");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
};

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}

function playSound(name) {
  let audioSrc = "sounds/" + name + ".mp3";
  let audio = new Audio(audioSrc);
  audio.play();
  audio.volume = 0.05;
};

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};
