function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var model = {
  answer: getRandomInt(1, 100),
  numberOfGuesses: 10
};

var content = document.getElementById('content');
var submitButton = document.getElementById('submit-button');
var input = document.getElementById('input-guess');
var feedback = document.getElementById('feedback');
var guessDisplay = document.getElementById('number-of-guesses');
var resetContainer = document.getElementById('reset-container');
var resetButton = document.getElementById('reset-button');

var checkGuessEvent = new Event('check guess');

guessDisplay.innerHTML = model.numberOfGuesses;

function checkGuess() {
  model.numberOfGuesses--;

  if (model.numberOfGuesses > 0) {
    if (input.value === model.answer) {
      feedback.innerHTML = 'That is correct!';
    } else if (input.value > model.answer) {
      guessDisplay.innerHTML = model.numberOfGuesses;
      feedback.innerHTML = 'Too high.'
    } else {
      guessDisplay.innerHTML = model.numberOfGuesses;
      feedback.innerHTML = 'Too low.';
    }
  } else {
    guessDisplay.innerHTML = model.numberOfGuesses;
    feedback.innerHTML = 'Sorry, you are out of guesses.';

  }
}

function onSubmit() {
  feedback.innerHTML = '';

  if (input.value === '') {
    feedback.innerHTML = 'Please enter a value.';
  } else {
    content.dispatchEvent(checkGuessEvent); 
  }  
}

content.addEventListener('check guess', checkGuess);

submitButton.addEventListener('click', onSubmit);