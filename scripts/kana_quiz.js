'use strict';

// Booleans
let vowelsBool = false;
let kBool = false;
let sBool = false;
let tBool = false;
let nBool = false;
let hBool = false;
let mBool = false;
let yBool = false;
let rBool = false;
let wBool = false;

// Data

const vowelsArray = [
  ['あ', 'a'],
  ['い', 'i'],
  ['う', 'u'],
  ['え', 'e'],
  ['お', 'o'],
];
const kArray = [
  ['か', 'ka'],
  ['き', 'ki'],
  ['く', 'ku'],
  ['け', 'ke'],
  ['こ', 'ko'],
];
const sArray = [
  ['さ', 'sa'],
  ['し', 'shi'],
  ['す', 'su'],
  ['せ', 'se'],
  ['そ', 'so'],
];
const tArray = [
  ['た', 'ta'],
  ['ち', 'chi'],
  ['つ', 'tsu'],
  ['て', 'te'],
  ['と', 'to'],
];
const nArray = [
  ['な', 'na'],
  ['に', 'ni'],
  ['ぬ', 'nu'],
  ['ね', 'ne'],
  ['の', 'no'],
];
const hArray = [
  ['は', 'ha'],
  ['ひ', 'hi'],
  ['ふ', 'fu'],
  ['へ', 'he'],
  ['ほ', 'ho'],
];
const mArray = [
  ['ま', 'ma'],
  ['み', 'mi'],
  ['む', 'mu'],
  ['め', 'me'],
  ['も', 'mo'],
];
const yArray = [
  ['や', 'ya'],
  ['ゆ', 'yu'],
  ['よ', 'yo'],
];
const rArray = [
  ['ら', 'ra'],
  ['り', 'ri'],
  ['る', 'ru'],
  ['れ', 're'],
  ['ろ', 'ro'],
];
const wArray = [
  ['わ', 'wa'],
  ['を', 'wo'],
  ['ん', 'n'],
];

// let data = [];

let data = [
  // ["あ", "a"],
  // ["い", "i"],
  //   ["う", "u"],
  //   ["え", "e"],
  //   ["お", "o"],
  // ["か", "ka"],
  // ["き", "ki"],
  //   ["く", "ku"],
  //   ["け", "ke"],
  //   ["こ", "ko"],
  // ["さ", "sa"],
  // ["し", "shi"],
  // ["す", "su"],
  // ["せ", "se"],
  // ["そ", "so"],
  // ["た", "ta"],
  // ["ち", "chi"],
  // ["つ", "tsu"],
  // ["て", "te"],
  // ["と", "to"],
  // ["な", "na"],
  // ["に", "ni"],
  // ["ぬ", "nu"],
  // ["ね", "ne"],
  // ["の", "no"],
  // ["は", "ha"],
  // ["ひ", "hi"],
  // ["ふ", "fu"],
  // ["へ", "he"],
  // ["ほ", "ho"],
  // ["ま", "ma"],
  // ["み", "mi"],
  // ["む", "mu"],
  // ["め", "me"],
  // ["も", "mo"],
  //   ["ら","ra"],
  //  ["り","ri"],
  //   ["る","ru"],
  //   ["れ","re"],
  //   ["ろ","ro"],
  // ["や", "ya"],
  // ["ゆ", "yu"],
  // ["よ", "yo"],
  // ["わ", "wa"],
  // ["を", "wo"],
  // ["ん", "n"],
];

let displayData = [];

// Testing Data Initialization
if (vowelsBool) {
  data.push(...vowelsArray);
}

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
const btnVowels = document.querySelector('.vowels');
const btnStart = document.querySelector('.start');
const btnK = document.querySelector('.k');
const btnS = document.querySelector('.s');
const btnT = document.querySelector('.t');
const btnN = document.querySelector('.n');
const btnH = document.querySelector('.h');
const btnM = document.querySelector('.m');
const btnY = document.querySelector('.y');
const btnR = document.querySelector('.r');
const btnW = document.querySelector('.w');

// What to show initially
// Only text saying to select the characters you want
question.textContent = 'Select the characters you want to study';
kana.textContent = '';
wrong.textContent = '';
myTextbox.style.display = 'none';
inputElement.classList.add('.hidden');
btnSubmit.classList.add('.hidden');
btnT.classList.add('.hidden');
score.textContent = '';
tracker.textContent = '';

// Initializations
let questionNum = 0;
let scoreNum = 0;
let incorrectAnswers = [];
let incorrectDisplayAnswers = [];
let questions;
let answers;

// Functions
function wrongDisplay(input) {
  wrong.textContent = input;
}

// Shuffles input Array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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

    // Remove hidden class from the Restart and Study Incorrect Buttons
    btnIncorrect.classList.remove('hidden');
  }
  kana.textContent = '';
  btnRestart.classList.remove('hidden');
  btnSubmit.classList.add('hidden');
  btnSubmit.disabled = true;
  myTextbox.style.display = 'none';
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
  console.log(kana.textContent);

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

// Add event listener for keyup event
const input = document.querySelector('input');
input.addEventListener('keyup', function (event) {
  // Check if the key pressed is 'Enter'
  if (event.key === 'Enter') {
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
  }
});

btnIncorrect.addEventListener('click', function (e) {
  e.preventDefault();
  // Reset QuestionNumber
  questionNum = 0;
  // Make Wrong Answers the Questions
  questions = shuffleArray(incorrectAnswers);
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
  btnIncorrect.classList.add('hidden');
  btnRestart.classList.add('hidden');
  btnSubmit.classList.remove('hidden');
  btnSubmit.disabled = false;
  myTextbox.style.display = 'block';
});

btnRestart.addEventListener('click', function (e) {
  e.preventDefault();
  // Re-initialize
  questions = shuffleArray(data);
  incorrectAnswers = [];
  incorrectDisplayAnswers = [];
  questionNum = 0;
  scoreNum = 0;
  answers = [questions[0][1], questions[0][1]];
  tracker.textContent = `#${questionNum + 1}/${questions.length}`;
  kana.textContent = questions[0][0];
  question.textContent = `Question ${questionNum + 1}`;
  score.textContent = `Score: ${scoreNum}`;
  displayIncorrect(incorrectDisplayAnswers);
  // Toggle Buttons
  console.log(btnIncorrect.classList);
  btnIncorrect.classList.add('hidden');
  btnRestart.classList.add('hidden');
  btnSubmit.classList.remove('hidden');
  btnSubmit.disabled = false;
  myTextbox.style.display = 'block';
});

btnStart.addEventListener('click', function (e) {
  e.preventDefault();
  // Start the Data Flow
  questions = shuffleArray(data);
  answers = [questions[0][1], questions[0][1]];
  console.log(answers);

  // Change the Displays
  tracker.textContent = `#${questionNum + 1}/${questions.length}`;
  question.textContent = `Question ${questionNum + 1}`;
  kana.textContent = questions[0][0];

  // Toggle the buttons
  inputElement.classList.remove('hidden');
  btnStart.classList.add('hidden');
  btnVowels.classList.add('hidden');
  btnK.classList.add('hidden');
  btnS.classList.add('hidden');
  btnT.classList.add('hidden');
  btnN.classList.add('hidden');
  btnH.classList.add('hidden');
  btnM.classList.add('hidden');
  btnY.classList.add('hidden');
  btnR.classList.add('hidden');
  btnW.classList.add('hidden');

  // Show textbox and submit button
  myTextbox.style.display = 'block';
  btnSubmit.classList.remove('hidden');
  wrong.textContent = 'Wrong: ';

  // Disable Button
  btnStart.disabled = true;
});

// function displaySelectedCharacters(data, array) {
//   if (array) {
//     // data.push(...vowelsArray);
//     for (let i = 0; i < array.length; i++) {
//       data.push(array[i][0]);
//     }
//   } else {
//     for (let i = 0; i < array.length; i++) {
//       data = data.filter((element) => element !== array[i][0]);
//     }
//     wrongDisplay(`Selected: ${data}`);
//     return data
//   }
// }

btnVowels.addEventListener('click', function (e) {
  e.preventDefault();
  btnVowels.classList.toggle('clicked');
  vowelsBool = !vowelsBool;
  if (vowelsBool) {
    data.push(...vowelsArray);
    for (let i = 0; i < vowelsArray.length; i++) {
      displayData.push(vowelsArray[i][0]);
    }
  } else {
    for (let i = 0; i < vowelsArray.length; i++) {
      data = data.filter(element => element !== vowelsArray[i]);
      displayData = displayData.filter(
        element => element !== vowelsArray[i][0]
      );
    }
  }
  wrongDisplay(`Selected: ${displayData}`);
});

btnK.addEventListener('click', function (e) {
  e.preventDefault();
  btnK.classList.toggle('clicked');
  kBool = !kBool;
  if (kBool) {
    data.push(...kArray);
    for (let i = 0; i < kArray.length; i++) {
      displayData.push(kArray[i][0]);
    }
  } else {
    for (let i = 0; i < kArray.length; i++) {
      data = data.filter(element => element !== kArray[i]);
      displayData = displayData.filter(element => element !== kArray[i][0]);
    }
  }
  wrongDisplay(`Selected: ${displayData}`);
});

btnS.addEventListener('click', function (e) {
  e.preventDefault();
  btnS.classList.toggle('clicked');
  sBool = !sBool;
  if (sBool) {
    data.push(...sArray);
    for (let i = 0; i < sArray.length; i++) {
      displayData.push(sArray[i][0]);
    }
  } else {
    for (let i = 0; i < sArray.length; i++) {
      data = data.filter(element => element !== sArray[i]);
      displayData = displayData.filter(element => element !== sArray[i][0]);
    }
  }
  wrongDisplay(`Selected: ${displayData}`);
});

btnT.addEventListener('click', function (e) {
  e.preventDefault();
  btnT.classList.toggle('clicked');
  tBool = !tBool;
  if (tBool) {
    data.push(...tArray);
    for (let i = 0; i < tArray.length; i++) {
      displayData.push(tArray[i][0]);
    }
  } else {
    for (let i = 0; i < tArray.length; i++) {
      data = data.filter(element => element !== tArray[i]);
      displayData = displayData.filter(element => element !== tArray[i][0]);
    }
  }
  wrongDisplay(`Selected: ${displayData}`);
});

btnN.addEventListener('click', function (e) {
  e.preventDefault();
  btnN.classList.toggle('clicked');
  nBool = !nBool;
  if (nBool) {
    data.push(...nArray);
    for (let i = 0; i < nArray.length; i++) {
      displayData.push(nArray[i][0]);
    }
  } else {
    for (let i = 0; i < nArray.length; i++) {
      data = data.filter(element => element !== nArray[i]);
      displayData = displayData.filter(element => element !== nArray[i][0]);
    }
  }
  wrongDisplay(`Selected: ${displayData}`);
});

btnH.addEventListener('click', function (e) {
  e.preventDefault();
  btnH.classList.toggle('clicked');
  hBool = !hBool;
  if (hBool) {
    data.push(...hArray);
    for (let i = 0; i < hArray.length; i++) {
      displayData.push(hArray[i][0]);
    }
  } else {
    for (let i = 0; i < hArray.length; i++) {
      data = data.filter(element => element !== hArray[i]);
      displayData = displayData.filter(element => element !== hArray[i][0]);
    }
  }
  wrongDisplay(`Selected: ${displayData}`);
});

btnM.addEventListener('click', function (e) {
  e.preventDefault();
  btnM.classList.toggle('clicked');
  mBool = !mBool;
  if (mBool) {
    data.push(...mArray);
    for (let i = 0; i < mArray.length; i++) {
      displayData.push(mArray[i][0]);
    }
  } else {
    for (let i = 0; i < mArray.length; i++) {
      data = data.filter(element => element !== mArray[i]);
      displayData = displayData.filter(element => element !== mArray[i][0]);
    }
  }
  wrongDisplay(`Selected: ${displayData}`);
});

btnY.addEventListener('click', function (e) {
  e.preventDefault();
  btnY.classList.toggle('clicked');
  yBool = !yBool;
  if (yBool) {
    data.push(...yArray);
    for (let i = 0; i < yArray.length; i++) {
      displayData.push(yArray[i][0]);
    }
  } else {
    for (let i = 0; i < yArray.length; i++) {
      data = data.filter(element => element !== yArray[i]);
      displayData = displayData.filter(element => element !== yArray[i][0]);
    }
  }
  wrongDisplay(`Selected: ${displayData}`);
});

btnR.addEventListener('click', function (e) {
  e.preventDefault();
  btnR.classList.toggle('clicked');
  rBool = !rBool;
  if (rBool) {
    data.push(...rArray);
    for (let i = 0; i < rArray.length; i++) {
      displayData.push(rArray[i][0]);
    }
  } else {
    for (let i = 0; i < rArray.length; i++) {
      data = data.filter(element => element !== rArray[i]);
      displayData = displayData.filter(element => element !== rArray[i][0]);
    }
  }
  wrongDisplay(`Selected: ${displayData}`);
});

btnW.addEventListener('click', function (e) {
  e.preventDefault();
  btnW.classList.toggle('clicked');
  wBool = !wBool;
  if (wBool) {
    data.push(...wArray);
    for (let i = 0; i < wArray.length; i++) {
      displayData.push(wArray[i][0]);
    }
  } else {
    for (let i = 0; i < wArray.length; i++) {
      data = data.filter(element => element !== wArray[i]);
      displayData = displayData.filter(element => element !== wArray[i][0]);
    }
  }
  wrongDisplay(`Selected: ${displayData}`);
});

// inputElement.addEventListener("keyup", function (e) {
//   e.preventDefault();
//   console.log(kana.textContent);

//   if (myTextbox.value != "") {
//     let submission = myTextbox.value;
//     myTextbox.value = "";
//     answers[0] = answers[1];

//     if (submission === answers[0]) {
//       answers[1] = correctAnswer();
//     } else {
//       answers[1] = wrongAnswer();
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
- Enter Button
*/
