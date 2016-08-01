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
