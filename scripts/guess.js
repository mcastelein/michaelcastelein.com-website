'use strict';

/*

console.log(document.querySelector('.message').textContent);

// DOM manipulation
// DOM stands for Document Object Model

document.querySelector('.message').textContent = 'Correct Number!';

console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 20;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);


*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = Number(document.querySelector('.score').textContent);
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const displayNumber = function (message) {
  document.querySelector('.number').textContent = message;
};
const displayScore = function (message) {
  document.querySelector('.score').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    displayMessage('No Number!');
  } else if (guess === secretNumber) {
    displayMessage('Correct Number!');

    document.querySelector('body').style.backgroundColor = '#60b347';

    displayNumber(secretNumber);

    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guess > secretNumber
          ? '👇 The Secret Number is lower!'
          : '👆 The Secret Number is higher!'
      );
      score--;
      displayScore(score);
    } else {
      displayScore(0);
      displayMessage('YOU LOSE!');

      // Change Background Color to Red
      document.querySelector('body').style.backgroundColor = '#FF0000';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  // Secret Number regenerates
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // Score Resets & Displays
  score = 20;
  displayScore(score);

  // Test if it responds when clicked
  displayMessage('Starting Over');

  // Reset Background Color
  document.querySelector('body').style.backgroundColor = '#222';

  // Reset Width
  document.querySelector('.number').style.width = '15rem';

  // Hide Number Again
  displayNumber('?');
});
