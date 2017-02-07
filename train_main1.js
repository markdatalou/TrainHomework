  console.log(" 1 - Starting javasript");
  //    
  // Initialize Firebase
  //
  console.log(" 2 - configuring firebase");
var config = {
    apiKey: "AIzaSyBNXpKkeIpGDJTogsNDWCCFA1rrxaNomCg",
    authDomain: "marktest-2271a.firebaseapp.com",
    databaseURL: "https://marktest-2271a.firebaseio.com",
    storageBucket: "marktest-2271a.appspot.com",
    messagingSenderId: "362558056381"
};
  
console.log(" 5 - initializing firebase DB");
firebase.initializeApp(config);

var database = firebase.database();

//database.ref().on("child_added", function(childSnapshot, prevChildKey)
database.ref().on("child_added", function(childSnapshot) {
var dbInfo = childSnapshot.val();
  console.log("child snapshot value is "  + childSnapshot.val());

});

  //
  // 2. Button for adding Trains
  //

  $("#submit22").on("click", function() {
  console.log(" 10 - Entering Submit event ");

  //
  // Grabs user input
  //

  var name = $("#train-name-input").val().trim();  
  var destination = $("#destination-input").val().trim();
  console.log("DESTINATION IS: " + destination);
  var firstTrainTime = $("#train-time-input").val().trim();
  console.log("FIRST TRAIN TIME IS: " + firstTrainTime);
  var frequency = $("#frequency-input").val().trim();
  console.log("FREQUENCY IS: " + frequency);

  //
  // perform match for Next Arrival time and Minutes Away
  //

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  console.log("FirstTimeConverted = " + firstTimeConverted);

  // Current Time
  var currentTime=moment();
  console.log("CURRENT TIME = " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME:  " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log("tRemainder =" + tRemainder);

  // Minutes Until Train
  var minsTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN= " + minsTillTrain);

  // Next Train
  var nextTrainArrival = moment().add(minsTillTrain, "minutes");
  console.log("ARRIVAL TIME= " + moment(nextTrainArrival).format("hh:mm"));

  

  //
  // Creates local "temporary" object for holding train data
  //

  var trainData = {
    trainName: name,
    trainDest: destination,
    trainTime: firstTrainTime,
    trainFreq: frequency,
    trainMinsAway: minsTillTrain
    //trainArrival: nextTrainArrival

  };

  //
  // Uploads train data to the database
  //
  console.log(" 20 - pushing train data from user to firebase");
  database.ref().push(trainData);

  //
  // Logs everything to console
  //

  console.log("Begin logging train info");
  console.log("logging trainname  " + trainData.trainName);
  console.log("logging traindest  " + trainData.trainDest);
  console.log("logging trainTime  " + trainData.trainTime);
  console.log("Logging trainData  " + trainData.trainFreq);
  console.log("logging trainmins away " + trainData.trainMinsAway);
  console.log("Logging trainArrival  " + trainData.trainArrival);

  //
  // Alert
  //

  alert("Train successfully added");

  //
  // Clears all of the text-boxes
  //

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");
  

  // Prevents moving to new page
  return false;
});

  //
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  //
  console.log(" 30 - Checking for changes to Firebase")
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log("child snapshot value is "  + childSnapshot.val());

  //
  // Store everything into a variable.
  //
  
  var name = childSnapshot.val().trainName;
  var destination = childSnapshot.val().trainDest;
  var firstTrainTime = childSnapshot.val().trainTime;
  var frequency = childSnapshot.val().trainFreq;
  var minsTillTrain = childSnapshot.val().trainMinsAway;
  var nextTrainArrival = childSnapshot.val().trainArrival;


  //
  // Log Train Info
  //
  
  console.log(name);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);
  console.log(minsTillTrain);
  console.log(nextTrainArrival);


  // Add each train's data into the table
  //$("#employee-table > tbody").append("<tr><td>" + Name + "</td><td>" + tDest + "</td><td>" +
  // tTime + "</td><td>" + tFreq + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
  console.log(" 50 - updating html table with new train data");
  $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>"  + frequency + "</td></tr>" + nextTrainArrival + "</td></tr>" + minsTillTrain + "</td></tr>");
});
