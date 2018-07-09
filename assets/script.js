var name;
var destination;
var firstTrain;
var frequency;
var nextTrain;
var nextTrain;
var nextTrainFormatted;
var minutesAway;
var firstTimeConverted;
var currentTime;
var diffTime;
var tRemainder;
var minutesTillTrain;

var config = {
    apiKey: "AIzaSyBJ8z_vaBD7FzuiiRT-e2ZqgSca0yaf9sA",
    authDomain: "train-schedule-449e7.firebaseapp.com",
    databaseURL: "https://train-schedule-449e7.firebaseio.com",
    projectId: "train-schedule-449e7",
    storageBucket: "train-schedule-449e7.appspot.com",
    messagingSenderId: "407595765203"
  };
  firebase.initializeApp(config);
var database = firebase.database();  


$("#submit-button").on("click", function(){
    //prevent page from refreshing after submit 
    event.preventDefault();    
    //capture user input
    name = $("#inputTrainName").val().trim();
    destination = $("#inputDestination").val().trim();
    firstTrain = $("#inputFirstTrain").val(); 
    frequency = $("#inputFrequency").val().trim() ;
    firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          tRemainder = diffTime % frequency;
          minutesTillTrain = frequency - tRemainder;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainFormatted = moment(nextTrain).format("hh:mm");

   // function totalBilled(){
   //var result= Math.floor(monthrate*monthsworked);
   //console.log(result);        
    //}
   // totalBilled();    
    $('#tableOne').append('<tr><td>'+name+'</td><td>'+destination+'</td><td>'+firstTrain+'</td><td>'+frequency+'</td><td>'+minutesTillTrain+'</td>')
   
    //add to database on click//
    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        minutesTillTrain: minutesTillTrain,
      })   
})

//listening to server, not the click//      
database.ref().on("child_added", function(childSnapshot){
console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().firstTrain);
        console.log(childSnapshot.val().frequency);
        console.log(childSnapshot.val().minutesTillTrain)
    })