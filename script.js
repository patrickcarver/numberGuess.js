var content = document.getElementById('content');
var button = document.getElementById('submit-button');
var checkGuessEvent = new Event('check guess');

content.addEventListener('check guess', function() { 
  console.log("check guess");
});

button.addEventListener('click', function() { 
  content.dispatchEvent(checkGuessEvent);  
});