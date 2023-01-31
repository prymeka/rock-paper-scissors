// game mechanics

let score = [0, 0];
let turn = 0;
let lastThreeWinners = [];
let lastPlayedPlayer = [];
let lastPlayedComputer = [];

const playerRockButton = document.querySelector(".player-card.rock");
const playerPaperButton = document.querySelector(".player-card.paper");
const playerScissorsButton = document.querySelector(".player-card.scissors");

const computerRockButton = document.querySelector(".computer-card.rock");
const computerPaperButton = document.querySelector(".computer-card.paper");
const computerScissorsButton = document.querySelector(".computer-card.scissors");

const playerCards = [playerRockButton, playerPaperButton, playerScissorsButton];
const computerCards = [computerRockButton, computerPaperButton, computerScissorsButton];

const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");

const possibleSelections = ["rock", "paper", "scissors"];

const resetButton = document.getElementById("reset-button");
const modeOption = document.getElementById("mode-options");

// add event listener to reset button
resetButton.addEventListener("click", e => {
  resetGame();
});

// add event listeners to player buttons
playerRockButton.addEventListener("click", e => {
  runGame("rock");
});

playerPaperButton.addEventListener("click", e => {
  runGame("paper");
});

playerScissorsButton.addEventListener("click", e => {
  runGame("scissors");
});

function randomCard() {
  return possibleSelections[Math.floor(Math.random()*3)];
}

function aiCard() {
  let leng = lastPlayedPlayer.length;
  if (turn === 0) {
    // first round is always rock
    console.log("first");
    return "rock";
  } else if (lastPlayedPlayer.length > 1 && lastPlayedPlayer[leng-1] === lastPlayedPlayer[leng-2]) {
    // if the player chooses same move twice, he will play next in sequence in this round
    console.log("rowtwo");
    let idx = (possibleSelections.indexOf(lastPlayedPlayer[leng-1])+2)%3;
    return possibleSelections[idx];
  } else if (lastThreeWinners[lastThreeWinners.length-1] === "player") {
    console.log("lost");
    // after a lost round, play move that was not played in the last ronud
    let lastIdx = possibleSelections.indexOf(lastPlayedComputer[lastPlayedComputer.length-1]);
    let idx = Math.floor(Math.random()*2);
    if ((lastIdx === 0) || (lastIdx === 1 && idx === 1)) {
      idx++;
    }
    return possibleSelections[idx];
  } else {
    // play random move with adjusted probabilities
    console.log("rand");
    let idx;
    let p = Math.random();
    if (p < 0.35) {
      idx = 0;
    } else if (p < 0.8) {
      idx = 1;
    } else {
      idx = 2;
    }
    return possibleSelections[idx];
  }
}

function runGame(playerSelection) {
  // apply selected and not-selected css class to appropriate player cards
  const selectedPlayerCardIndex = possibleSelections.indexOf(playerSelection);
  playerCards.forEach((c, i) => {
    if (i === selectedPlayerCardIndex) {
      c.classList.add("selected");
    } else {
      c.classList.add("not-selected");
      c.classList.remove("transition");
      c.classList.add("no-transition");
    }
  });
    
  // select computer card
  let computerSelection;
  let computerMode = modeOption.value;
  if (computerMode === "random") {
    computerSelection = randomCard();
  } else {
    computerSelection = aiCard();
  }

  // apply selected and not-selected css class to appropriate computer cards
  const selectedComputerCardIndex = possibleSelections.indexOf(computerSelection);

  // pause to build tension
  setTimeout(() => {
    computerCards.forEach((c, i) => {
      if (i === selectedComputerCardIndex) {
        c.classList.add("selected");
      } else {
        c.classList.add("not-selected");
      }
    });
  }, 500);

  // decide winner
  const playerWon = (
    (playerSelection === "rock" && computerSelection === "scissors") 
    || (playerSelection === "paper" && computerSelection === "rock") 
    || (playerSelection === "scissors" && computerSelection === "paper")
  );
  let winner;
  if (playerSelection === computerSelection) {
    score[0]++; score[1]++;
    winner = "none";
  } else if (playerWon === true) {
    score[1]++;
    winner = "player";
  } else {
    score[0]++;
    winner = "computer";
  }

  // update score label
  setTimeout(() => {
    computerScore.textContent = `${score[0]}`;
    playerScore.textContent = `${score[1]}`;
    if (winner === "player") {
      playerScore.style.color = "green";
      computerScore.style.color = "red";
    } else if (winner === "computer") {
      playerScore.style.color = "red";
      computerScore.style.color = "green";
    } else {
      playerScore.style.color = "white";
      computerScore.style.color = "white";
    }
  }, 1000);

  // clear selections
  setTimeout(() => resetSelections(), 1500)

  // update meta variables
  turn++;

  if (lastPlayedComputer.length > 2) {
    lastPlayedComputer.shift();
  }
  lastPlayedComputer.push(computerSelection);


  if (lastPlayedPlayer.length > 2) {
    lastPlayedPlayer.shift();
  }
  lastPlayedPlayer.push(playerSelection);

  if (lastThreeWinners.length > 2) {
    lastThreeWinners.shift();
  }
  lastThreeWinners.push(winner);
}

function resetSelections() {
  // change score labels' colour
  playerScore.style.color = "var(--color-tertiary)";
  computerScore.style.color = "var(--color-tertiary)";
  // unselect all cards
  playerCards.forEach(c => {
    c.classList.remove("selected");
    c.classList.remove("not-selected");
    c.classList.remove("no-transition");
    c.classList.add("transition");
  });
  computerCards.forEach(c => {
    c.classList.remove("selected");
    c.classList.remove("not-selected");
  });
}

function resetGame() {
  playerScore.textContent = "0";
  computerScore.textContent = "0";
  score = [0, 0];
  turn = 0;
  lastPlayedPlayer = [];
  lastPlayedComputer = [];
  lastThreeWinners = [];
}

