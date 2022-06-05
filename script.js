// add event listeners to player buttons
const rockButton = document.querySelectorAll(".top-card .rock-btn")[0];
rockButton.addEventListener('click', e => {
    runGame('rock');
});

const paperButton = document.querySelectorAll(".top-card .paper-btn")[0];
paperButton.addEventListener('click', e => {
    runGame('paper');
});

const scissorsButton = document.querySelectorAll(".top-card .scissors-btn")[0];
scissorsButton.addEventListener('click', e => {
    runGame('scissors');
});

function runGame(playerSelection) {
    // select random card for the computer
    const possibleSelections = ['rock', 'paper', 'scissors'];
    const computerSelection = possibleSelections[Math.floor(Math.random()*3)];

    const playerWon = (
        (playerSelection === 'rock' && computerSelection === 'scissors') 
    || (playerSelection === 'paper' && computerSelection === 'rock') 
    || (playerSelection === 'scissors' && computerSelection === 'paper')
    )

    console.log(`Player: ${playerSelection}; Computer: ${computerSelection}.`);

    if (playerSelection === computerSelection) {
        console.log('DRAW');
    } else if (playerWon === true) {
        console.log('WIN');
    } else {
        console.log('LOSE')
    }
}