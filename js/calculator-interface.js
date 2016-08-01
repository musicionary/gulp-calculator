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
