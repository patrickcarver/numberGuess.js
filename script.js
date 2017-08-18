class Validator {
  constructor(limits) {
    this._messages = [];
    this.limits = limits;
  }

  get messages() { return this._messages; }

  addMessage(message) {
    this._messages.push(message); 
  }

  call(value) {
    this._messages = [];

    var input = parseInt(value, 10);

    return this.isNotBlank(value) && 
           this.isInteger(input) && 
           this.isInLimits(input);
  }

  isNotBlank(value) {
    if (value === "") {
      this.addMessage("Input cannot be blank");
      return false
    }
    
    return true;
  }

  isInteger(value) {
    if (!Number.isInteger(value)) {
      this.addMessage("Input needs to be an integer");
      return false;
    }

    return true;
  }

  isInLimits(value) {
    if (value > this.limits.max || value < this.limits.min) {
      this.addMessage("Input should be inside limits");
      return false;
    }

    return true;
  }

}

/**********************************************************/

class Controller {
  constructor(view, model, feedbackData) {
    this.view = view;
    this.model = model;
    this.validator = new Validator({min: this.model.min, max: this.model.max});

    const viewModel = {
      submitFunction: this.onSubmit.bind(this),
      resetFunction:  this.onReset.bind(this),
      tries:          this.model.tries,
      min:            this.model.min,
      max:            this.model.max,
      answer:         this.model.answer,
      feedbackData:   feedbackData
    };

    view.setViewModel(viewModel);
  }

  onSubmit() {
    if (this.validator.call(this.view.inputValue)) {
      this.view.clearValidationErrors();
      this.model.decreaseTries();
      this.view.showNumOfTries(this.model.tries);
      this.displayResponse();  
    } else {
      this.view.showValidationErrors(this.validator.messages);
    }
  }

  onReset() {
    this.model.reset();
    this.view.reset(this.model.tries);
  }

  displayResponse() {
    if (this.model.hasTries) {
      const guess = this.view.inputValue;
      this.displayFeedback(guess);
    } else {
      this.view.showOutOfTries();
    }  
  }

  displayFeedback(guess) {
    if (guess == this.model.answer) {
      this.view.showCorrect();
    } else {
      const isHigh = this.model.answer < guess;
      this.view.showResponse(isHigh);
    }
  }
}

/**********************************************************/


class View {
  constructor(params) {
    this.initElements(params);

    this.onSubmit = null;
    this.onReset = null;

    this.showResetContainer(false);
  }

  get inputValue() { return this.input.value; }
  set inputValue(value) { this.input.value = value; }

  showValidationErrors(messages) {
    this.clearValidationErrors();

    messages.forEach(message => {
      var element = document.createElement("li");
      element.innerHTML = message;
      this.validatorErrorList.appendChild(element);
    });
  }

  clearValidationErrors() {
    while(this.validatorErrorList.firstChild) {
      this.validatorErrorList.removeChild(this.validatorErrorList.firstChild);
    }
  }

  setViewModel(viewModel) {
    this.initEventListeners(viewModel.submitFunction, viewModel.resetFunction);
    this.showNumOfTries(viewModel.tries);
    this.showRange(viewModel.min, viewModel.max);
    this.feedbackData = viewModel.feedbackData;
    this.feedbackData.answer = viewModel.answer;
  }

  initElements(params) {
    const allowedElements = [
      'content', 'minLimit', 'maxLimit', 'submitButton', 'input', 
      'feedback', 'triesDisplay', 'resetContainer', 'resetButton', 'validatorErrorList'];

    allowedElements.forEach(element => {
      this[element] = document.getElementById(params[element]); 
    });
  }

  initEventListeners(submitFunction, resetFunction) {
    this.onSubmit = submitFunction;
    this.onReset = resetFunction;

    this.submitButton.addEventListener('click', this.onSubmit);
    this.resetButton.addEventListener('click', this.onReset);    
  }

  enableSubmitButton(isEnabled) {
    this.submitButton.disabled = !isEnabled;
  }

  showResponse(isHigh) {
    const text = isHigh ? this.feedbackData.tooHigh : this.feedbackData.tooLow;
    this.setFeedbackText(text);
  }

  showNumOfTries(tries) {
    this.triesDisplay.innerHTML = tries;
  }

  showResetContainer(value) {
    this.resetContainer.style.display = value ? 'block' : 'none';
  }

  showCorrect() {
    this.showEnd(this.feedbackData.correct);
  }

  showOutOfTries() {
    this.showEnd(this.feedbackData.outOfTries + this.feedbackData.answer);
  }

  setFeedbackText(text) {
    this.feedback.innerHTML = text;
  }

  showEnd(text) {
    this.setFeedbackText(text);
    this.enableSubmitButton(false);
    this.showResetContainer(true);
  }

  showRange(min, max) {
    this.minLimit.innerHTML = min;
    this.maxLimit.innerHTML = max;
  }

  reset(tries) {
    this.showNumOfTries(tries);
    this.inputValue = "";
    this.showResetContainer(false);
    this.setFeedbackText("");
    this.enableSubmitButton(true);
  }
}

/**********************************************************/

class Model {
  constructor(params) {
    this.min = params.min || 1;
    this.max = params.max || 100;
    this.tries = params.tries || 10;
    this.maxTries = this.tries;  

    this.setAnswer();
  }

  get hasTries() {
    return this.tries > 0;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }

  decreaseTries() {
    this.tries -= 1;
  }

  resetTries() {
    this.tries = this.maxTries;
  }

  setAnswer() {
    this.answer = this.getRandomInt();
  }

  reset() {
    this.resetTries();
    this.setAnswer();
  }
}

/**********************************************************/

class NumberGuessApp {
  constructor(modelData, viewElements, feedbackData) {
    this.model =      new Model(modelData);    
    this.view =       new View(viewElements);
    this.controller = new Controller(this.view, this.model, feedbackData);
  }
}

/**********************************************************/

let modelData = { 
  min:      1, 
  max:    100, 
  tries:   10 
};

let viewElements = {
  content:            'content',
  minLimit:           'min-limit',
  maxLimit:           'max-limit',    
  submitButton:       'submit-button',
  input:              'input-guess',
  feedback:           'feedback',
  triesDisplay:       'number-of-guesses',
  resetContainer:     'reset-container',
  resetButton:        'reset-button',
  validatorErrorList: 'validator-error-list'
};

let feedbackData = {
  tooLow:     'Too low',
  tooHigh:    'Too high',
  correct:    'That is correct',
  outOfTries: 'Sorry, no more tries. The correct answer is '
};

let app = new NumberGuessApp(modelData, viewElements, feedbackData);
