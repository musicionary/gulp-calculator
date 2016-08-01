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
