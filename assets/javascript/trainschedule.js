
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB6vpB2D31_vNIEGYuBOH0W4xYqPzHbYwo",
    authDomain: "train-schedule-assigment.firebaseapp.com",
    databaseURL: "https://train-schedule-assigment.firebaseio.com",
    projectId: "train-schedule-assigment",
    storageBucket: "train-schedule-assigment.appspot.com",
    messagingSenderId: "363022743682"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  // 2. Button for adding new trains
$("#addTrainBtn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs administrator input
    var trainName = $("#trainNameInput").val().trim();
    var trainDest = $("#trainDestinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH/mm").format("X");
    var trainFreq = $("#TrainFrequencyInput").val().trim();
  
    // Creates local "temporary" object for holding new train data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      startingTrain: firstTrain,
      frequency: trainFreq,
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.startingTrain);
    console.log(newTrain.frequency);
  
    alert("New Train Successfully Added");
  
    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#trainDestinationInput").val("");
    $("#firstTrainInput").val("");
    $("#TrainFrequencyInput").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().startingTrain;
    var trainFreq = childSnapshot.val().frequency;
  
    // train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(firstTrain);
    console.log(trainFreq);
     

//    * Code this app to calculate when the next train will arrive; this should be relative to the current time. 
//  * Users from many different machines must be able to view same train times.
//  * Styling and theme are completely up to you. Get Creative!
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      //$("<td>").text(empStartPretty),
      $("<td>").text(firstTrain),
      $("<td>").text(trainFreq),
     // $("<td>").text(empBilled)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case