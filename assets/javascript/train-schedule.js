//********** FUNCTIONS

//this is what we are re-creating with js
/* <tr>
    <th scope="col" class="colName">C Line</th>
    <td scope="col" class="colDestination">Union Station</td>
    <td scope="col" class="colFrequency">30</td>
    <td scope="col" class="colNxtArrival">05:12</td>
    <td scope="col" class="colMinAway">18</td>
</tr> */

function addTrain(sv) {
    //we need to dynamically generate the table rows from the firebase database and add to our index page...
    var newRow = $("<tr>").append(
        $("<th>").attr({"scope":"col", "class": "colName"}).text(sv.name),
        $("<td>").attr({"scope":"col", "class": "colDestination"}).text(sv.destination),
        $("<td>").attr({"scope":"col", "class": "colFrequency"}).text(sv.frequency),
        $("<td>").attr({"scope":"col", "class": "colNxtArrival"}).text(),
        $("<td>").attr({"scope":"col", "class": "colMinAway"}).text()
    )
    
    $("#train-content").append(newRow);
};


//******* Firebase

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDppiSRkOIEjks8nCfAb1Sihrf-jjvyhmE",
    authDomain: "train-schedule-8ab48.firebaseapp.com",
    databaseURL: "https://train-schedule-8ab48.firebaseio.com",
    projectId: "train-schedule-8ab48",
    storageBucket: "",
    messagingSenderId: "1009081483106"
  };
  firebase.initializeApp(config);

var database = firebase.database();
console.log(database);

//Initial Values 
var name = "";
var destination = "";
var startTime = "";
var frequency = 0;

$("#add-train").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    startTime = moment($("#start-input").val().trim(),"HHmm").format("x");
    frequency = $("#frequency-input").val().trim();

    // Code for handling the push
    database.ref().push({
        name: name,
        destination: destination,
        startTime: startTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

});

database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() 
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.startTime);
    console.log(sv.frequency);

    // Change the HTML to reflect
    addTrain(sv); 

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});