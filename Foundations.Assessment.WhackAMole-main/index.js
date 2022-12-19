const holes = document.querySelectorAll(".hole");
const scoreNumber = document.querySelector("#score-number");
const startButton = document.querySelector("#start-button");
const gameMessage = document.querySelector("#game-message");
const scoreBoard = document.querySelector("#score-board");
const cursor = document.querySelector("#cursor");
const audio = new Audio("images/TrollTollnew.m4a");
const clip = new Audio("images/money.mp3");
const payTheToll = document.querySelector("#welcome-page");
const highScoreBox = document.querySelector("#high-score-box");
payTheToll.classList.remove("hidden");
let lastHole;
let timeUp = false;
let score = 0;
let scores = [];
audio.volume = 0.5;

// I added this code to make the image follow the cursor. it is translating the x and y axis to the pointer
window.addEventListener("mousemove", e => {
    cursor.style.top = e.pageY + "px"
    cursor.style.left = e.pageX + "px"
})

// This function is just the math for the random time that we will use
function randomTime(min, max) {
  return Math.max(500, Math.round(Math.random() * (max - min) + min));
}

// Here is the function to make the troll pop up in random holes
function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}


function peep() {
  const time = randomTime(200, 900);
  const hole = randomHole(holes);
  hole.classList.add("mole");
  setTimeout(() => {
    hole.classList.remove("mole");
    if (!timeUp) peep();
  }, time);
}

// Here is the function that starts the game, sets your score to 0, and gets rid of the elements that need to be gone when a new game starts
function startGame() {
  scoreNumber.textContent = 0;
  timeUp = false;
  score = 0;
  startButton.style.display = "none";
  gameMessage.textContent = "";
  highScoreBox.classList.add("hidden");
  peep();
  setTimeout(() => {
    timeUp = true;
    gameMessage.textContent = "Pretty fast! You paid " + score + " troll tolls!";
    scores.push(score); 
    scores.sort((a, b) => b - a);
    if (scores.length > 10) {
      scores.pop(scores.length - 1);
      scoreBoard.innerHTML = "";  
      scores.forEach(score => scoreBoard.innerHTML += `<li>${score}</li>`);
      highScoreBox.classList.remove("hidden");
      startButton.style.display = "";
    } else {
      scoreBoard.innerHTML = "";  
      scores.forEach(score => scoreBoard.innerHTML += `<li>${score}</li>`);
      highScoreBox.classList.remove("hidden");
      startButton.style.display = "";
    }
  }, 30000);
}
// It is doing a lot of things. It will sort the array in order and then pop the lowest number from th array- this was one of the hardest parts of this assignment for me. Figuring out how to stop the scores from going off the page. I chose to display 10 scores and delete the lowest score.

  startButton.addEventListener("click", function() {
    // play the audio file when the start button is clicked
    audio.play();
    payTheToll.classList.add("hidden");
  });
// I originally had the game set for a minute, but it was very long, especially in testing, so I changed it to 30 seconds
// We have a functional scoreboard as well! It will push the score to an arr, then sort them and display them

// Here is the function that will check to see if the hole contains the troll and then add to your score if clicked, it will also now play an audio cue to know that you got the point.
  function bonk(e) {
    if (!e.isTrusted) return;
    if (this.classList.contains("mole")) {
      score++;
      clip.play();
      this.classList.remove("mole");
      scoreNumber.textContent = score;
    }
  }
//   This is one of the ones I had to learn about. for each hole,we add an event listener to check for the click, when that happens, we run the bonk function
holes.forEach(hole => hole.addEventListener("click", bonk));
startButton.addEventListener("click", startGame);
// The game start button

// I applied the troll facade to the game after getting it working with simple background colors, I didn't want to start renaming things (mole - troll) for fear I would break something, but it is easy to understand which element is being called still.