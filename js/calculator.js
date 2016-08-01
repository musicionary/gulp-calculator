function Calculator(model) {
  this.model = model;
}

Calculator.prototype.add = function(num1, num2) {
  var sum = num1 + num2;
  return sum;
};
