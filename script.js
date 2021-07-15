var timeSlotID = ["#9","#10","#11","#12","#1","#2","#3","#4","#5"]
var timeSlot = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00"];
var timeDif = ["10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00",  "18:00:00"];
var timeDisplay = document.getElementById('currentDay');

var contents = [];
var localData = JSON.parse(localStorage.getItem("planner-content"));

var currentTime = moment().format('MMMM Do YYYY, HH:mm:ss');
var currentDate = moment().format('MMMM Do YYYY');

// This function creates the time that is displayed on the header
// it creates the and shows the current time and date
function displayDayTime() {
    var currentTime = moment().format('MMM DD, YYYY [at] hh:mm:ss A');
    timeDisplay.textContent = (currentTime);
}

setInterval(displayDayTime, 1000);

// This set of codes basically states that if the localData has some object being stored,
// then the stored data or object in localData is stored in contents variable.
// This step would be skipped if the there isn't anything in local storage
if (localData !== null) {
    contents = localData;
}

// This for loop should loop through the timeslots and change their color based on whether
// they are in the future, past or the present based on the current time
for (var a = 0; a < timeSlotID.length; a++) {
    
    // This variable basically grabn a specific input based on the ID
    // The '#' in the timeSlotID acts as the ID element
    var inputEl = $(timeSlotID[a]);
    var button = inputEl.parent().parent().find("button");

    // The logic behind this if statment is that if the timeSlot (on the current day (stylized as Date + timeslot) is larger 
    // (or in time words comes after) the current date and time, than the "current date + timeSlot" is considered
    // to be in the future (since it comes after relative to the current time)
    // You have to look at the perspective of timeSlot    
    if ((currentDate +  ", " + timeSlot[a]) > currentTime) {

        // This line of code basically adds class, in this case a class that calls upon a CSS to change based on time.
        inputEl.attr("class", "future");

        contents.forEach(function(item) {
            if (timeSlotID[a] === ("#" + (item["input-id"]))) {
                inputEl.val(item["input-value"]);
              }
        });

    // The logic behind this if statement is that a timeslot (on the current day) is less or equal than the current 
    // time but is greater than the date with a one hour difference, then the timeslot is in the present. 
    } else if ((currentDate +  ", " + timeSlot[a]) <= currentTime && (currentDate +  ", " + timeDif[a]) > currentTime) {
        inputEl.attr("class", "present");

        // This line of code basically states that any input area that has a class of present, once the
        // class has been added, it has the attribute disabled added and made disabled so that it can't
        // be used to add a new event.
        $(".present").attr("disabled", "disabled");
        button.attr("disabled", true);

        contents.forEach(function(item) {
        if (timeSlotID[a] === ("#" + item["input-id"])) {
            inputEl.val(item["input-value"]);
            }
        });

    // The logic behind is this if the timeslot on a current day is smaller than that of the current time (Including date and time) then 
    // the time has already come before the current time. In that case the timeslot, by definition, is before the current time and thus is
    // considered in the past
    } else if ((currentDate +  ", " + timeSlot[a]) < currentTime) {
        inputEl.attr("class", "past");

        // This line of code basically states that any input area that has a class of present, once the
        // class has been added, it has the attribute disabled added and made disabled so that it can't
        // be used to add a new event.
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
    var planContent = {
      "input-id": inputId,
      "input-value": inputValue };
    
    if (planContent["input-value"] !== "") {
      contents.push(planContent);
      localStorage.setItem("planner-content", JSON.stringify(contents));
    }
});