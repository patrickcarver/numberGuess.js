/**********************************************************/

var Controller = function(view, model) {
  this.view = view;
  this.model = model;
}

/**********************************************************/

var View = function(params) {
  this.content =            params.content;
  this.submitButton =       params.submitButton;
  this.input =              params.input;
  this.feedback =           params.feedback;
  this.numGuessesDisplay =  params.numGuessesDisplay;
  this.resetContainer =     params.resetContainer;
  this.resetButton =        params.resetButton;
}

/**********************************************************/

var Model = function(params) {
  var min = params.min || 1;
  var max = params.max || 100;
  var tries = params.tries || 10;

  this.answer = this.getRandomInt(min, max);
  this.tries = tries;
}

Model.prototype.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Model.prototype.decreaseTries = function() {
  this.tries -= 1;
}

/**********************************************************/

var model = new Model({ 
  min: 1, 
  max: 100, 
  tries: 10 
});

var view = new View({
  content:         document.getElementById('content'),
  submitButton:    document.getElementById('submit-button'),
  input:           document.getElementById('input-guess'),
  feedback:        document.getElementById('feedback'),
  guessDisplay:    document.getElementById('number-of-guesses'),
  resetContainer:  document.getElementById('reset-container'),
  resetButton:     document.getElementById('reset-button')
});

var controller = new Controller(view, model);



/*


var model = {
  answer: getRandomInt(1, 100),
  numberOfGuesses: 10
};



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

*/