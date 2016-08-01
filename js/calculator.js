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
