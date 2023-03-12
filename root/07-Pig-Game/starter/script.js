'use strict';

// Functions

// Function to Display Player Total Score
const displayTotalScore = function (player, score) {
  document.querySelectorAll('.score')[player - 1].textContent = score;
};

// Function to Display Player Current Score
const displayCurrentScore = function (player, score) {
  if (player == 1) {
    document.getElementById('current--0').textContent = score;
  } else {
    document.getElementById('current--1').textContent = score;
  }
};

// Dice Roll
// THIS ISN'T WORKING YET
const rollDice = function () {
  diceRoll = Number(Math.trunc(Math.random() * 6 + 1));
  return diceRoll;
};

// Buttons
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

// Active Players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Dice
const diceEl = document.querySelector('.dice');

// Variables
let player1TotalScore = 0;
let player2TotalScore = 0;
let player1CurrentScore = 0;
let player2CurrentScore = 0;
let diceRoll;
let playerTurn = 1;

// Initialize
displayTotalScore(1, 0);
displayTotalScore(2, 0);
displayCurrentScore(1, 0);
displayCurrentScore(2, 0);
diceEl.classList.add('hidden');

// Clicks

// Roll Dice
btnRollDice.addEventListener('click', function () {
  // Generate Random Dice Number {1-6}
  if (player1TotalScore < 100 && player2TotalScore < 100) {
    diceEl.classList.remove('hidden');
    diceRoll = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${diceRoll}.png`;

    if (diceRoll === 1) {
      if (playerTurn === 1) {
        player1CurrentScore = 0;
        displayCurrentScore(1, player1CurrentScore);
        playerTurn = 2;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
      } else {
        player2CurrentScore = 0;
        displayCurrentScore(2, player2CurrentScore);
        playerTurn = 1;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
      }
    } else {
      if (playerTurn === 1) {
        player1CurrentScore += diceRoll;
        displayCurrentScore(1, player1CurrentScore);
      } else {
        player2CurrentScore += diceRoll;
        displayCurrentScore(2, player2CurrentScore);
      }
    }
  }
});

// Hold
btnHold.addEventListener('click', function () {
  if (playerTurn === 1 && player1CurrentScore > 0) {
    player1TotalScore += player1CurrentScore;
    displayTotalScore(1, player1TotalScore);
    playerTurn = 2;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    player1CurrentScore = 0;
    displayCurrentScore(1, player1CurrentScore);
    if (player1TotalScore >= 100) {
      document.querySelector('.name--1').textContent = 'Player 1 WINS!🎆';
    }
  } else if (playerTurn === 2 && player2CurrentScore > 0) {
    player2TotalScore += player2CurrentScore;
    displayTotalScore(2, player2TotalScore);
    playerTurn = 1;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    player2CurrentScore = 0;
    displayCurrentScore(2, player2CurrentScore);
    if (player2TotalScore >= 100) {
      document.querySelector('.name--2').textContent = 'Player 2 WINS!🎆';
    }
  }
});

// New Game
btnNewGame.addEventListener('click', function () {
  player1TotalScore = 0;
  player2TotalScore = 0;
  player1CurrentScore = 0;
  player2CurrentScore = 0;
  playerTurn = 1;

  // Initialize
  displayTotalScore(1, 0);
  displayTotalScore(2, 0);
  displayCurrentScore(1, 0);
  displayCurrentScore(2, 0);

  document.querySelectorAll('.name')[0].textContent = 'Player 1';
  document.querySelectorAll('.name')[1].textContent = 'Player 2';
});

// Code

console.log(document.querySelectorAll('.name')[0].textContent);
