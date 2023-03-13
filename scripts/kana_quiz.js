'use strict';

// Data

let data = [
  ['あ', 'a'],
  ['い', 'i'],
  ['う', 'u'],
  ['え', 'e'],
  ['お', 'o'],
  ['か', 'ka'],
  ['き', 'ki'],
  ['く', 'ku'],
  ['け', 'ke'],
  ['こ', 'ko'],
  ['さ', 'sa'],
  ['し', 'shi'],
  ['す', 'su'],
  ['せ', 'se'],
  ['そ', 'so'],
  ['た', 'ta'],
  ['ち', 'chi'],
  ['つ', 'tsu'],
  ['て', 'te'],
  ['と', 'to'],
  ['な', 'na'],
  ['に', 'ni'],
  ['ぬ', 'nu'],
  ['ね', 'ne'],
  ['の', 'no'],
  ['は', 'ha'],
  ['ひ', 'hi'],
  ['ふ', 'fu'],
  ['へ', 'he'],
  ['ほ', 'ho'],
  ['ま', 'ma'],
  ['み', 'mi'],
  ['む', 'mu'],
  ['め', 'me'],
  ['も', 'mo'],
  ['や', 'ya'],
  ['ゆ', 'yu'],
  ['よ', 'yo'],
  ['わ', 'wa'],
  ['を', 'wo'],
  ['ん', 'n'],
];
let questions = data;

// Selectors
const question = document.querySelector('.question');
const kana = document.querySelector('.kana');
const score = document.getElementById('score');
const tracker = document.getElementById('tracker');
const myTextbox = document.getElementById('answer');
const inputElement = document.querySelector('input');
const wrong = document.querySelector('.wrong');

// Buttons
const btnSubmit = document.querySelector('.submit');
const btnIncorrect = document.querySelector('.incorrect');
const btnRestart = document.querySelector('.restart');

// Initializations
let incorrectAnswers = [];
let incorrectDisplayAnswers = [];
let questionNum = 0;
let scoreNum = 0;
const answers = [questions[0][1], questions[0][1]];
tracker.textContent = `#${questionNum + 1}/${questions.length}`;

// Functions
function correctAnswer() {
  // Increase Score
  scoreNum++;
  score.textContent = `Score: ${scoreNum}`;

  // Check if quiz is finished
  if (questionNum === questions.length - 1) {
    finishQuiz();
  } else {
    // Next Question
    questionNum++;
    // Update Both Question Numbers
    question.textContent = `Question ${questionNum + 1}:`;
    tracker.textContent = `#${questionNum + 1}/${questions.length}`;
    return updateQuestion(questions[questionNum]);
  }
}

function wrongAnswer() {
  // Update Both Question Numbers
  question.textContent = `Question ${questionNum + 1}:`;
  tracker.textContent = `#${questionNum + 1}/${questions.length}`;

  // Add wrong answer to list
  incorrectAnswers.push(questions[questionNum]);
  incorrectDisplayAnswers.push(questions[questionNum][0]);
  displayIncorrect(incorrectDisplayAnswers);

  // Check if quiz is finished
  if (questionNum === questions.length - 1) {
    finishQuiz();
  } else {
    // Next Question
    questionNum++;
    return updateQuestion(questions[questionNum]);
  }
}

function finishQuiz() {
  if (incorrectAnswers.length === 0) {
    question.textContent = 'You Finished the Quiz, and got everything right!';
  } else {
    question.textContent = 'You Finished the Quiz!';
    console.log(incorrectAnswers);
    console.log(incorrectAnswers.length);

    // Remove hidden class from the Restart and Study Incorrect Buttons
    btnIncorrect.classList.toggle('hidden');
  }
  kana.textContent = '';
  btnRestart.classList.toggle('hidden');
  btnSubmit.classList.toggle('hidden');
}

function updateQuestion(nextQuestion) {
  const question = nextQuestion[0];
  const answer = nextQuestion[1];
  kana.textContent = question;
  return answer;
}

function displayIncorrect(incorrectAnswers) {
  wrong.textContent = `Wrong: ${incorrectAnswers}`;
}

// Event Listeners
btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();

  if (myTextbox.value != '') {
    let submission = myTextbox.value;
    myTextbox.value = '';
    answers[0] = answers[1];

    if (submission === answers[0]) {
      answers[1] = correctAnswer();
    } else {
      answers[1] = wrongAnswer();
    }
  }
});

btnIncorrect.addEventListener('click', function (e) {
  e.preventDefault();
  // Reset QuestionNumber
  questionNum = 0;
  // Make Wrong Answers the Questions
  questions = incorrectAnswers;
  answers[1] = questions[0][1];
  // Reset Number tracker to #1/NumQs
  tracker.textContent = `#${questionNum + 1}/${questions.length}`;
  // Clear Wrong Answers
  displayIncorrect('');
  incorrectAnswers = [];
  incorrectDisplayAnswers = [];
  // Start new Quiz
  question.textContent = `Question ${questionNum + 1}`;
  kana.textContent = questions[0][0];
  // Toggle Buttons
  btnIncorrect.classList.toggle('hidden');
  btnRestart.classList.toggle('hidden');
  btnSubmit.classList.toggle('hidden');
});

// inputElement.addEventListener('keyup', function (e) {
//   e.preventDefault();
//   if (e.key === 'Enter' && myTextbox.value != '') {
//     let submission = myTextbox.value;
//     console.log(myTextbox.value);
//     myTextbox.value = '';

//     if (submission === questions[questionNum][1]) {
//       correctAnswer();
//     } else {
//       wrongAnswer();
//     }
//   }
// });

// myTextbox.addEventListener('input', function () {
//   if (myTextbox.value === questions[questionNum][1]) {
//     myTextbox.value = '';
//     questionNum++;
//     if (questionNum >= questions.length) {
//       question.textContent = 'You Finished the Quiz!';
//       kana.textContent = '';
//       scoreNum++;
//       score.textContent = `Score: ${scoreNum}`;
//     } else {
//       updateQuestion(questions[questionNum]);
//       question.textContent = `Question ${questionNum + 1}:`;
//       tracker.textContent = `#${questionNum + 1}/${questions.length}`;
//       scoreNum++;
//       score.textContent = `Score: ${scoreNum}`;
//     }
//   }
// });

// Want to implement
/*
- Question Shuffle
- List the correct and wrong answers on the bottom -> after finishing the questions those get added back in
- Use external json file to put in the questions instead
*/
