var inputID = ["#9","#10","#11","#12","#1","#2","#3","#4","#5"]
var timeSlot = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00"];
var timeDif = ["10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00",  "18:00:00"];
var timeDisplay = document.getElementById('currentDay');

var contents = [];
var localData = JSON.parse(localStorage.getItem("planner-content"));

// This function creates the time that is displayed on the header
// it creates the and shows the current time and date
function displayDayTime() {
    var currentTime = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplay.textContent = (currentTime);
}

setInterval(displayDayTime, 1000);

// This set of codes basically states that if the localData has some object being stored,
// then the stored data or object in localData is stored in contents variable.
if (localData !== null) {
    contents = localData;
}

// This for loop should loop through the timeslots and change their color based on whether
// they are in  the future, past or the present based on the current time
for (var a = 0; a < inputID.length; a++) {
    
    var inputEl = $(inputID[a]);
    var button = inputEl.parent().parent().find("button");
    
    if ((moment().format('MMMM Do YYYY, HH:mm:ss')) < (moment().format('MMMM Do YYYY') +  ", " + timeSlot[a])) {
        inputEl.attr("class", "future");

        contents.forEach(function(item) {
            if (inputID[a] === ("#" + (item["input-id"]))) {
                inputEl.val(item["input-value"]);
              }
        });

    } else if (((moment().format('MMMM Do YYYY, HH:mm:ss')) >= (moment().format('MMMM Do YYYY') +  ", " + timeSlot[a])) && ((moment().format('MMMM Do YYYY, HH:mm:ss')) < (moment().format('MMMM Do YYYY') +  ", " + timeDif[a]))) {
        inputEl.attr("class", "present");

        $(".present").attr("disabled", "disabled");
        button.attr("disabled", true);

        contents.forEach(function(item) {
        if (inputID[a] === ("#" + item["input-id"])) {
            inputEl.val(item["input-value"]);
            }
        });

    } else if ((moment().format('MMMM Do YYYY, HH:mm:ss')) > (moment().format('MMMM Do YYYY') +  ", " + timeSlot[a])) {
        inputEl.attr("class", "past");

        $(".past").attr("disabled", "disabled");
        button.attr("disabled", true);
    }

}

// This function should save what text in local storage when the save button is clicked.
$("button").on("click", function() {
    event.preventDefault();
    var container = $(this).parent().parent();  
    var inputValue = container.find("input").val();
    var inputId = container.find("input").attr("id");
    var textObj = {
      "input-id": inputId,
      "input-value": inputValue };
    
    if (textObj["input-value"] !== "") {
      contents.push(textObj);
      localStorage.setItem("planner-content", JSON.stringify(contents));
    }
});