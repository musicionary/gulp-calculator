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
