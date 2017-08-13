/**********************************************************/

var Controller = function(view, model) {
  this.view = view;
  this.model = model;

  this.view.onSubmit = this.onSubmit.bind(this);
  this.view.onReset = this.onReset.bind(this);

  this.view.initEventListeners();
  this.view.displayNumOfTries(this.model.tries);
}

Controller.prototype.onSubmit = function() {
  this.model.decreaseTries();

  if (this.model.hasTries()) {
    var guess = this.view.input.value;

    if (guess == this.model.answer) {
      this.view.showCorrect();
    } else if (guess > this.model.answer) {
      this.view.showTooHigh();
      this.view.displayNumOfTries(this.model.tries);
    } else {
      this.view.showTooLow();
      this.view.displayNumOfTries(this.model.tries);
    }
  } else {
    this.view.showOutOfTries();
  }
}

Controller.prototype.onReset = function() {
  console.log("onReset");
}



/**********************************************************/

var View = function(params) {
  this.initElements(params);

  this.onSubmit = null;
  this.onReset = null;

  this.resetContainer.style.display = 'none';
}

View.prototype.initElements = function(params) {
  this.content =            params.content;
  this.submitButton =       params.submitButton;
  this.input =              params.input;
  this.feedback =           params.feedback;
  this.triesDisplay =       params.triesDisplay;
  this.resetContainer =     params.resetContainer;
  this.resetButton =        params.resetButton;  
}

View.prototype.initEventListeners = function() {
  this.submitButton.addEventListener('click', this.onSubmit);
  this.resetButton.addEventListener('click', this.onReset);
}

View.prototype.displayNumOfTries = function (tries) {
  this.triesDisplay.innerHTML = tries;
}

View.prototype.showCorrect = function() {
  this.feedback.innerHTML = 'That is correct!';
  this.resetContainer.style.display = 'block';
}

View.prototype.showTooHigh = function() {
  this.feedback.innerHTML = 'Too high';
}

View.prototype.showTooLow = function() {
  this.feedback.innerHTML = 'Too low';
}

View.prototype.showOutOfTries = function() {
  this.feedback.innerHTML = 'Sorry, no more tries.';
  this.resetContainer.style.display = 'block';
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

Model.prototype.hasTries = function() {
  return this.tries > 0;
}

/**********************************************************/

var model = new Model({ 
  min: 1, 
  max: 100, 
  tries: 10 
});

console.log(model);

var view = new View({
  content:         document.getElementById('content'),
  submitButton:    document.getElementById('submit-button'),
  input:           document.getElementById('input-guess'),
  feedback:        document.getElementById('feedback'),
  triesDisplay:    document.getElementById('number-of-guesses'),
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