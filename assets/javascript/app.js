var animals = ["penguins", "otters", "hedgehogs", "llamas", "elephants"]

$(document).ready(function(){
  
  animals.forEach(function(element) {
    
    var animalButton = $("<button>").addClass("btn btn-primary animal-button").attr("id", "btn-" + element).val(element).text(element);
    $("#animal-buttons").append(animalButton);

  });

  console.log("loop is done");

});

$("#submit-button").on("click", function(event) {
  event.preventDefault();

  var newAnimal = $("#animalInput").val();

  if(newAnimal === "" || animals.indexOf(newAnimal) !== -1) {
    
    $("#animalInput").val("");

    return;
  }
  
  else {
     
    var newAnimalButton = $("<button>").addClass("btn btn-primary animal-button").attr("id", "btn-" + newAnimal).val(newAnimal).text(newAnimal);
    $("#animal-buttons").append(newAnimalButton);
    
    $("#animalInput").val("");
  }

});

$(document).on("click", ".animal-button", function() {
 
  $("#animalsHere").empty(); 

  var animal = $(this).val().split(" ").join("+");
  var giphyAPIKey = "dc6zaTOxFJmzC";
  var resultsLimit = 20;

  queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyAPIKey + "&q=" + animal + "&limit=" + resultsLimit;

  $.ajax({
    url : queryURL,
    method : "GET"
  }).done(function(response) {
    console.log(response);

    console.log(typeof(response));
    console.log(typeof(response.data));

    response.data.forEach(function(element) {
      
      var div = $("<div>");

      div.addClass("animal-div");

      var p = $("<p>");
 
      var img = $("<img>");
 
      var rating = element.rating;
 
      p.text("Rating : " + rating);
 
      img.attr("src", element.images.fixed_height_still.url);
      img.attr("data-still", element.images.fixed_height_still.url);
      img.attr("data-animate", element.images.fixed_height.url);
      img.attr("data-state", "still");
 
      img.addClass("gif");
 
      div.append(p, img);
 
      $("#animalsHere").append(div);
    })
  });
});

$(document).on("click", ".gif", function() {
 
  var state = $(this).attr("data-state");
  console.log("I am in the gif click event :" + state);

  if(state === "still") {
    $(this).attr("data-state", "animate");
    $(this).attr("src", $(this).attr("data-animate"));  
  } else {
    $(this).attr("data-state", "still");
    $(this).attr("src", $(this).attr("data-still")); 
  }
});
