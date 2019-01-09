/*jshint esversion: 6*/

let getSession = () => {
  let value = parseInt(document.getElementById('session_input').value);
  return value;
};

let getBreak = () => {
  let value = parseInt(document.getElementById('break_input').value);
  return value;
};

// Function for setting time

var changeTime = function() {
  let targetID = this.getAttribute('data-target');
  let valueToChange = parseInt(this.getAttribute('data-value'));
  let targetValue;
  if (targetID === 'session_input') {
    targetValue = getSession();
  }
  if (targetID === 'break_input') {
    targetValue = getBreak();
  }
  if (targetValue + valueToChange < 0){
    targetValue = 0;
  } else if (targetValue + valueToChange > 99) {
    targetValue = 99;
  } else {
    targetValue += valueToChange;
  }
  document.getElementById(targetID).setAttribute('value', targetValue);
};

let changeTimeElems = document.getElementsByClassName('change-time');
let changeTimeElemsArray = Array.from(changeTimeElems);
changeTimeElemsArray.forEach(function(el){
  el.addEventListener('click', changeTime);
});

// Display the remaining time, update every second.

let inte;
document.getElementById('btn_start').addEventListener('click', () => {
  if (inte) {
    clearInterval(inte);
  }

  let sessionTime = getSession();
  let breakTime = getBreak();
  let isNowSessionTime = true;
  let minutesLeft = sessionTime;
  let secondsLeft = 0;
  let timeDisplayed = "";

  inte = setInterval(function(){
    if (isNowSessionTime){
      document.getElementById('display_heading').innerHTML = 'WORK';
    } else {
      document.getElementById('display_heading').innerHTML = 'BREAK';
    }

      if (secondsLeft > 0){
        secondsLeft -= 1;
      } else {
        if (secondsLeft === 0 && minutesLeft > 0){
        minutesLeft -= 1;
        secondsLeft = 59;
        }
      }

      if (secondsLeft < 10){
        timeDisplayed = `${minutesLeft}:0${secondsLeft}`;
      } else {
        timeDisplayed = `${minutesLeft}:${secondsLeft}`;
      }

      document.getElementById('display_text').innerHTML = timeDisplayed;

      if (minutesLeft === 0 && secondsLeft === 0){
        if (isNowSessionTime === true){
        minutesLeft = breakTime;
        secondsLeft = 0;
        isNowSessionTime = false;
      } else {
        minutesLeft = sessionTime;
        secondsLeft = 0;
        isNowSessionTime = true;
      }
    }
  }, 1000);
});

document.getElementById('button_stop').addEventListener('click', () => {
  clearInterval(inte);
});
