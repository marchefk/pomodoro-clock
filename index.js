let getSession = () => {
  let value = parseInt($("#session_input").val());
  return value;
};

let getBreak = () => {
  let value = parseInt($('#break_input').val());
  return value;
};

var changeTime = function() {
  let targetID = this.getAttribute("data-target");
  let valueToChange = parseInt(this.getAttribute("data-value"));
  let targetValue;
  if (targetID === "session_input") {
    targetValue = getSession();
  }
  if (targetID === "break_input") {
    targetValue = getBreak();
  }
  if (targetValue + valueToChange < 0){
    targetValue = 0;
  } else {
    targetValue += valueToChange;
  }
  document.getElementById(targetID).setAttribute("value", targetValue);
}

let changeTimeElems = document.getElementsByClassName('change-time');
let changeTimeElemsArray = Array.from(changeTimeElems);
changeTimeElemsArray.forEach(function(el){
  el.addEventListener("click", changeTime);
});

let inte;
$("#btn_start").on("click", () => {
  if (inte){
    clearInterval(inte);
  }

  let sMin = getSession();
  let bMin = getBreak();
  let isNowSessionTime = true;
  let min = sMin;
  let sec = 0;
  let timeDisplayed = "";

  inte = setInterval(function(){
    if (isNowSessionTime === true){
      $("#display_heading").html('WORK');
    } else {
      $("#display_heading").html('BREAK');
    }

      if (sec > 0){
        sec --;
      } else {
        if (sec === 0 && min > 0){
        min --;
        sec = 59;
        }
      }

      if (sec < 10){
        timeDisplayed = `${min}:0${sec}`;
      } else {
        timeDisplayed = `${min}:${sec}`;
      }

      $("#display_text").html(timeDisplayed);
      if (min === 0 && sec === 0){
        if (isNowSessionTime === true){
        min = bMin;
        sec = 0;
        isNowSessionTime = false;
      } else {
        min = sMin;
        sec = 0;
        isNowSessionTime = true;
      }
    }
  }, 1000);
});

$("#btn_stop").on("click", function(){
  clearInterval(inte);
});
