function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var model = {
  answer: getRandomInt(1, 100),
  numberOfGuesses: 10
};

var content = document.getElementById('content');
var button = document.getElementById('submit-button');
var input = document.getElementById('input-guess');
var feedback = document.getElementById('feedback');

var checkGuessEvent = new Event('check guess');

function checkGuess() {
  
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

button.addEventListener('click', onSubmit);