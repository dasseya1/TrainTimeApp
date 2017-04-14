$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCYMvxtxFhkOSXPs38CDJUFV0V7cJvXDU8",
        authDomain: "my-app-105b0.firebaseapp.com",
        databaseURL: "https://my-app-105b0.firebaseio.com",
        projectId: "my-app-105b0",
        storageBucket: "my-app-105b0.appspot.com",
        messagingSenderId: "590439226633"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    // Button for adding trains
    $("#add-train-btn").on("click", function(event) {
        event.preventDefault();

        // Grabs user input
        var trName = $("#train-name-input").val().trim();
        var trDestination = $("#destination-input").val().trim();
        var trTime = moment($("#time-input").val().trim(), "HH:mm").format("X");;
        var trFrequency = $("#frequency-input").val().trim();

        // Creates local "temporary" object for holding employee data
        var newTrain = {
            name: trName,
            destination: trDestination,
            time: trTime,
            frequency: trFrequency
        };

        // Push train data to the database
        database.ref().push(newTrain);

        // Alert
        alert("Train successfully added");

        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");

        // Prevents moving to new page
        return false;
    });

    // Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {

        // Store everything into a variable.
        var trName = childSnapshot.val().name;
        var trDestination = childSnapshot.val().destination;
        var trTime = childSnapshot.val().time;
        var trFrequency = childSnapshot.val().frequency;

        // Difference of Times
        var difTimes = moment().diff(moment.unix(trTime), "minutes");
        var tRemainder = difTimes % trFrequency;
        var tMinutes = trFrequency - tRemainder;

        // To calculate the arrival time, add the tMinutes to the currrent time
        var trArrival = moment().add(tMinutes, "m").format("hh:mm A");


        // Add each train's data into the table
        $("#train-table > tbody").append("<tr><td>" + trName + "</td><td>" + trDestination + "</td><td>" +
            trFrequency + "</td><td>" + trArrival + "</td><td>" + tMinutes + "</td></tr>");
    });
});