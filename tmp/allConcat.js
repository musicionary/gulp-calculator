var Calculator = require('./../js/calculator.js').calculatorModule;

$( document ).ready(function() {
  $("#calculator-form").submit(function(event) {
    event.preventDefault();
    var num1 = parseInt($("#num1").val());
    var num2 = parseInt($("#num2").val());
    var simpleCalculator = new Calculator("Ti-89");
    var output;
    if ($("#operation").val() == "add") {
      output = simpleCalculator.add(num1, num2);
    } else if ($("#operation").val() == "subtract") {
      output = simpleCalculator.subtract(num1, num2);
    } else if ($("#operation").val() == "multiply") {
      output = simpleCalculator.multiply(num1, num2);
    } else if ($("#operation").val() == "divide") {
      output = simpleCalculator.divide(num1, num2);
    }
    $("#solution").append("<li>" + output + "</li>");
  });
});

var Journal = require('./../js/journal.js').journalModule;


$(document).ready(function () {
  $("#journal-form").submit(function (event) {
    event.preventDefault();
    title = $("#title").val();
    body = $("#body").val();
    var journal = new Journal(title, body);
    $("#post_entry").append("<h2>" + journal.title + "</h2>" + "<p>" + journal.body + "</p>");
    $("#post_entry").append("<p>Word Count: " + journal.wordCount(journal.body) + "</p>");
    $("#post_entry").append("<p>Consanant Count: " + journal.letterCount(journal.body)[0] + "</p>");
    $("#post_entry").append("<p>Vowel Count: " + journal.letterCount(journal.body)[1] + "</p>");
    $("#post_entry").append("<p>Teaser: " + journal.getTeaser(journal.body) + "</p>");
  });
});

$(document).ready(function () {
  $('#time').text(moment());
});

var apiKey = require('./../.env').apiKey;

var latitude;
var longitude;
navigator.geolocation.getCurrentPosition(function(position){
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
});



$(document).ready(function () {
  $("#weatherLocation").click(function () {
    var city = $("#location").val();
    $("#location").val("");
    $('.showWeather').text("The city you have chosen is " + city + ".");
    //the 'then' method is a javascript promise that functions sort of like a callback function
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function (response) {
      $(".showWeather").text("The humidy in " + city + " is " + response.main.humidity + "%");
    }).fail(function (error) {
      $('.showWeather').text(error.responseJSON.message);
    });
  });


  $("#weatherCoordinates").click(function () {
    $.get('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey)
    .then(function (response) {
      $(".current-location-weather").text("The humidity at longitude/latitude: " + latitude + "/" + longitude + " is " + response.main.humidity + "%");
    })
    .fail(function (error) {
      $('.current-location-weather').text(error.responseJSON.message);
    });
  });
});
