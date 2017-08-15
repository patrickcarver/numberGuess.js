/**********************************************************/

class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    let submitFunction = this.onSubmit.bind(this);
    let resetFunction = this.onReset.bind(this);

    this.view.initEventListeners(submitFunction, resetFunction);
    this.view.displayNumOfTries(this.model.tries);
  }

  onSubmit() {
    this.model.decreaseTries();
    this.view.displayNumOfTries(this.model.tries);

    if (this.model.hasTries) {
      var guess = this.view.input.value;

      if (guess == this.model.answer) {
        this.view.showEnd('That is correct!');
      } else {
        let response = this.model.answer ? 'Too high' : 'Too low';
        this.view.showResponse(response);
      }
    } else {
      this.view.showEnd('Sorry, no more tries. The correct answer is ' + this.model.answer);
    }    
  }

  onReset() {
    this.model.reset();
    this.view.displayNumOfTries(this.model.tries);
    this.view.clearInput();
    this.view.showResetContainer(false);
    this.view.showResponse("");
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
    this.content =            params.content;
    this.submitButton =       params.submitButton;
    this.input =              params.input;
    this.feedback =           params.feedback;
    this.triesDisplay =       params.triesDisplay;
    this.resetContainer =     params.resetContainer;
    this.resetButton =        params.resetButton;      
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

  clearInput() {
    this.input.value = "";
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

let model = new Model({ 
  min: 1, 
  max: 100, 
  tries: 10 
});

let view = new View({
  content:         document.getElementById('content'),
  submitButton:    document.getElementById('submit-button'),
  input:           document.getElementById('input-guess'),
  feedback:        document.getElementById('feedback'),
  triesDisplay:    document.getElementById('number-of-guesses'),
  resetContainer:  document.getElementById('reset-container'),
  resetButton:     document.getElementById('reset-button')
});

let controller = new Controller(view, model);
