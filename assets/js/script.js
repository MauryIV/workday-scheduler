var now = dayjs()
// This is to set the time every second at the top of the screen
function timeTracker() {
  setInterval(function() {
    var now = dayjs();
    $("#timeNow").text(now.format("MMM D, YYYY [at] hh:mm:ss a"))
    // this is to refresh the color function at the top of evey hour
    var min = now.format("mm")
    var sec = now.format("ss")
    if (min == "00" && sec == "00") {
      colorCodeTimeBoxes()
    }
  }, 1000);
}

// JQuerys querySelector
var saveButtons = $(".save-button");
var information = $(".information");

// Each save button will have a different index and save the input with the corresponding index
saveButtons.click(function() {
  var index = saveButtons.index(this);
  var infoKey = information.eq(index).val();
  localStorage.setItem("infoKey" + index, infoKey);
});

// this pulls each localStorage at its corresponding index location
information.each(function(index) {
  var saveClick = localStorage.getItem("infoKey" + index);
  $(this).val(saveClick);
});

function colorCodeTimeBoxes(){
  // this loops through each class"time" and pulls the number, then compares it to the current time.
  $(".time").each(function() {
    var hour = $(this).text();
    var varHour = "9"
  // these if statements are to convert the number to a 24hr format
    if (hour[2] === "a") {
      varHour = (hour[0] + hour[1])
    }
    if (hour[2] === "p") {
      varHour = "12"
    }
    if (hour[1] === "p") {
      varHour = (parseInt(hour[0]) + 12)
    }
    
  // had to set the other information for the planners date, then I compare the two times
  var date = dayjs().set(['year', 'month', 'date'])
  var parsedDate = date.set("h", varHour)
  var space = now.diff(parsedDate, "hour");
  var hasPassed = parsedDate.isBefore(now);
  // depending on if time has passed, hasn't passed, or no difference in hour, the background color will change
  if (hasPassed === false) {
    $(this).parent().find("input").css({
      "background-color": "rgb(0, 128, 0, 0.3)",
      "border": "solid black",
    });
  };
  if ((hasPassed === false) && (space === 0)) {
    $(this).parent().find("input").css({
      "background-color": "rgb(186, 255, 255)",
      "border": "solid black"
    });
  };
  if (hasPassed === true) {
    $(this).parent().find("input").css({
      "background-color": "rgb(255, 0, 0, 0.3)",
      "border": "solid black",
    });
  };
});
}

timeTracker()
colorCodeTimeBoxes()
