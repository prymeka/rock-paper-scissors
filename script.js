let score = [0, 0];
const scoreLabel = document.querySelector("#score h2");

// add event listeners to player buttons
const rockButton = document.querySelector(".top-card .rock-btn");
rockButton.addEventListener('click', e => {
    runGame('rock');
});

const paperButton = document.querySelector(".top-card .paper-btn");
paperButton.addEventListener('click', e => {
    runGame('paper');
});

const scissorsButton = document.querySelector(".top-card .scissors-btn");
scissorsButton.addEventListener('click', e => {
    runGame('scissors');
});

// add event listeners to reset buttons
const resetButton = document.querySelector("#reset-btn");
resetButton.addEventListener('click', resetGame);

function runGame(playerSelection) {
    const possibleSelections = ['rock', 'paper', 'scissors'];

    // hide unselected player cards
    const playerCardsToHide = possibleSelections.filter(c => c !== playerSelection);
    playerCardsToHide.forEach(c => {
        document.querySelector(`.top-card .${c}-btn`).style.visibility = 'hidden';
    });

    // game logic

    // select random card for the computer
    const computerSelection = possibleSelections[Math.floor(Math.random()*3)];
    // decide winner
    const playerWon = (
        (playerSelection === 'rock' && computerSelection === 'scissors') 
        || (playerSelection === 'paper' && computerSelection === 'rock') 
        || (playerSelection === 'scissors' && computerSelection === 'paper')
    );
    let textColour;
    if (playerSelection === computerSelection) {
        score[0]++; score[1]++;
        textColour = 'white';
    } else if (playerWon === true) {
        score[0]++;
        textColour = 'green';
    } else {
        score[1]++;
        textColour = 'red';
    }

    // pause to build tension and hide unselected computer cards
    const computerCardsToHide = possibleSelections.filter(c => c !== computerSelection);
    setTimeout(() => {
        computerCardsToHide.forEach(
            c => {document.querySelectorAll(`.bottom-card .${c}-btn`)[0].style.visibility = 'hidden';}
            )
    }, 500);

    // update score label
    setTimeout(() => {
        scoreLabel.textContent = `${score[0]} - ${score[1]}`;
        scoreLabel.style.color = textColour;
    }, 1000);
    
    // clear selections
    setTimeout(() => resetSelections(), 1500)
}

function resetSelections() {
    // change score label colour
    scoreLabel.style.color = 'white';
    // unhide all cards
    const possibleSelections = ['rock', 'paper', 'scissors'];
    possibleSelections.forEach(c => {
        document.querySelector(`.top-card .${c}-btn`).style.visibility = 'visible';
    });
    possibleSelections.forEach(c => {
        document.querySelector(`.bottom-card .${c}-btn`).style.visibility = 'visible';
    });
}

function resetGame() {
    scoreLabel.textContent = "0 - 0";
}
