/**********************************************************/

class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    let submitFunction = this.onSubmit.bind(this);
    let resetFunction = this.onReset.bind(this);

    this.view.initEventListeners(submitFunction, resetFunction);
    this.view.displayNumOfTries(this.model.tries);
    this.view.showRange(this.model.min, this.model.max);
  }

  onSubmit() {
    this.model.decreaseTries();
    this.view.displayNumOfTries(this.model.tries);
    this.displayResponse();  
  }

  onReset() {
    this.model.reset();
    this.view.reset(this.model.tries);
  }

  displayResponse() {
    if (this.model.hasTries) {
      var guess = this.view.input.value;
      this.displayFeedback(guess);
    } else {
      this.view.showEnd('Sorry, no more tries. The correct answer is ' + this.model.answer);
    }  
  }

  displayFeedback(guess) {
    if (guess == this.model.answer) {
      this.view.showEnd('That is correct!');
    } else {
      let response = this.model.answer < guess ? 'Too high' : 'Too low';
      this.view.showResponse(response);
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

  initElements(params) {
    const allowedElements = [
      'content', 'minLimit', 'maxLimit', 'submitButton', 'input', 
      'feedback', 'triesDisplay', 'resetContainer', 'resetButton'];

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

  displayNumOfTries(tries) {
    this.triesDisplay.innerHTML = tries;
  }

  showResetContainer(value) {
    this.resetContainer.style.display = value ? 'block' : 'none';
  }

  showResponse(text) {
    this.feedback.innerHTML = text;
  }

  showEnd(text) {
    this.showResponse(text);
    this.showResetContainer(true);
  }

  showRange(min, max) {
    this.minLimit.innerHTML = min;
    this.maxLimit.innerHTML = max;
  }

  clearInput() {
    this.input.value = "";
  }

  reset(tries) {
    this.displayNumOfTries(tries);
    this.clearInput();
    this.showResetContainer(false);
    this.showResponse("");
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
  constructor(modelData, viewElements) {
    this.model =      new Model(modelData);    
    this.view =       new View(viewElements);
    this.controller = new Controller(this.view, this.model);
  }
}

/**********************************************************/

let modelData = { 
  min:      1, 
  max:    100, 
  tries:   10 
};

let viewElements = {
  content:         'content',
  minLimit:        'min-limit',
  maxLimit:        'max-limit',    
  submitButton:    'submit-button',
  input:           'input-guess',
  feedback:        'feedback',
  triesDisplay:    'number-of-guesses',
  resetContainer:  'reset-container',
  resetButton:     'reset-button'
};

let app = new NumberGuessApp(modelData, viewElements);
