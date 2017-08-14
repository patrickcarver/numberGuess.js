/**********************************************************/

var Controller = function(view, model) {
  this.view = view;
  this.model = model;

  submitFunction = this.onSubmit.bind(this);
  resetFunction = this.onReset.bind(this);

  this.view.initEventListeners(submitFunction, resetFunction);
  this.view.displayNumOfTries(this.model.tries);
}

Controller.prototype.onSubmit = function() {
  this.model.decreaseTries();

  if (this.model.hasTries()) {
    var guess = this.view.input.value;

    if (guess == this.model.answer) {
      this.view.showCorrect();
    } else {
      if (guess > this.model.answer) {
        this.view.showTooHigh();
      } else {
        this.view.showTooLow();
      }

      this.view.displayNumOfTries(this.model.tries);
    }
  } else {
    this.view.showOutOfTries();
  }
}

Controller.prototype.onReset = function() {
  this.model.resetTries();
  this.view.displayNumOfTries(this.model.tries);
  this.view.clearInput();
}

/**********************************************************/

var View = function(params) {
  this.initElements(params);

  this.onSubmit = null;
  this.onReset = null;

  this.showResetContainer(false);
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

View.prototype.initEventListeners = function(submitFunction, resetFunction) {
  this.onSubmit = submitFunction;
  this.onReset = resetFunction;

  this.submitButton.addEventListener('click', this.onSubmit);
  this.resetButton.addEventListener('click', this.onReset);
}

View.prototype.displayNumOfTries = function(tries) {
  this.triesDisplay.innerHTML = tries;
}

View.prototype.showResetContainer = function(value) {
  this.resetContainer.style.display = value ? 'block' : 'none';
}

View.prototype.showTooHigh = function() {
  this.feedback.innerHTML = 'Too high';
}

View.prototype.showTooLow = function() {
  this.feedback.innerHTML = 'Too low';
}

View.prototype.showCorrect = function() {
  this.feedback.innerHTML = 'That is correct!';
  this.showResetContainer(true);
}

View.prototype.showOutOfTries = function() {
  this.feedback.innerHTML = 'Sorry, no more tries.';
  this.showResetContainer(true);
}

View.prototype.clearInput = function() {
  this.input.value = "";
}

/**********************************************************/

var Model = function(params) {
  var min = params.min || 1;
  var max = params.max || 100;
  var tries = params.tries || 10;

  this.answer = this.getRandomInt(min, max);
  this.tries = tries;
  this.maxTries = tries;
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

Model.prototype.resetTries = function() {
  this.tries = this.maxTries;
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
  triesDisplay:    document.getElementById('number-of-guesses'),
  resetContainer:  document.getElementById('reset-container'),
  resetButton:     document.getElementById('reset-button')
});

var controller = new Controller(view, model);
