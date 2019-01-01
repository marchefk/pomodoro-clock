let getSession = () => {
  let value = eval($("#session_input").val());
  return value;
};

let getBreak = () => {
  let value = eval($('#inputB').val());
  return value;
};

  $("#session_increase").on("click", () => {
    let s1 = getSession();
    $("#session_input").val(s1 + 1);
  });

  $("#session_decrease").on("click", () => {
    let s2 = getSession();
    $("#session_input").val(s2 - 1);
  });

  $("#break_increase").on("click", () => {
    let b1 = getBreak();
    $("#break_input").val(b1 + 1);
  });

  $("#break_decrease").on("click", () => {
    let b2 = getBreak();
    $("#break_input").val(b2 - 1);
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
