var content = document.getElementById('content');

var checkGuessEvent = new Event('check guess');

content.addEventListener('check guess', function() { 

});

var button = document.getElementById('submit-button');

button.addEventListener('click', function() { 
  content.dispatchEvent(checkGuessEvent);  
});