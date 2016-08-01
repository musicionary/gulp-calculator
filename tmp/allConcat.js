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

var Card = require('./../js/card.js').cardModule;

var cardArray = [1,1,2,2,3,3,4,4];
function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
  }
  return cardArray;
}

function Matched(firstCard, otherCard) {
  if (firstCard !== otherCard) {
    $('[name="' + firstCard + '"]').hide();
    $('[name="' + otherCard + '"]').hide();
  }
}

$( document ).ready(function() {
  shuffle(cardArray);

  for(var i=0; i<cardArray.length; i++) {
    $('#card' + i.toString()).attr('name', cardArray[i]);
    $('#card' + i.toString()).append("<img class='card-front' src=./img/" + $('#card' + i.toString()).attr('name') + ".jpg />");
    var myCard = new Card($('#card' + i.toString()).attr('name'));
    console.log(myCard);
  }

  $(".card-div").click(function() {
    var firstCard;
    var otherCard;
    var flipCount = 0;
    if(flipCount < 1) {
      $(this).children().children().show();
      firstCard = $(this).attr('name');
      flipCount += 1;
    } else {
      $(this).children().children().show();
      otherCard = $(this).attr('name');
      flipCount = 0;
    }
    Matched(firstCard, otherCard);
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
