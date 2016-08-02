(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = '3ff186dd27c97ee3d6c3ae983911835b';

},{}],2:[function(require,module,exports){
function Calculator(model) {
  this.model = model;
}

Calculator.prototype.add = function(num1, num2) {
  var sum = num1 + num2;
  return sum;
};

Calculator.prototype.subtract = function(num1, num2) {
  var difference = num1 - num2;
  return difference;
};

Calculator.prototype.multiply = function(num1, num2) {
  var product = num1 * num2;
  return product;
};

Calculator.prototype.divide = function(num1, num2) {
  var quotient = num1 / num2;
  return quotient;
};

exports.calculatorModule = Calculator;

},{}],3:[function(require,module,exports){
function Journal(title, body) {
  this.title = title;
  this.body = body;
}

Journal.prototype.wordCount = function(body) {
  var counter = 0;
  var bodyArray = body.split(' ');
  for(var i=0; i<=bodyArray.length; i++) {
    counter += 1;
  }
  return counter;
};

Journal.prototype.letterCount = function(body) {
  var counterArray = [];
  var consanantCounter = 0;
  var vowelCounter = 0;
  var bodyArray = body.split('');
  for(var i=0; i<bodyArray.length; i++) {
    if (bodyArray[i].toLowerCase().match(/[b-df-hj-np-tv-z]/g)) {
      consanantCounter += 1;
    } else if (bodyArray[i].toLowerCase().match(/[aeiou]/g)) {
      vowelCounter += 1;
    }
  }
  counterArray.push(consanantCounter);
  counterArray.push(vowelCounter);
  return counterArray;
};

Journal.prototype.getTeaser = function(body) {
  var punctuation = /[.!?]/g;
  var bodyArray = body.split(punctuation);
  var teaser = [];
  var firstSentence = bodyArray[0].split(" ");
  if(firstSentence.length < 8) {
    return bodyArray[0];
  } else {
    for(i = 0; i < 8; i++) {
      teaser.push(firstSentence[i]);
    }
    return teaser.join(" ");
  }
};

exports.journalModule = Journal;

},{}],4:[function(require,module,exports){
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

},{"./../.env":1,"./../js/calculator.js":2,"./../js/journal.js":3}]},{},[4]);
