$( document ).ready(function() {
  $("#calculator-form").submit(function(event) {
    event.preventDefault();
    var num1 = parseInt($("#num1").val());
    var num2 = parseInt($("#num2").val());
    var simpleCalculator = new Calculator("Ti-89");
    var output;
    if ($("#operation option:selected").val() == "add") {
      output = simpleCalculator.add(num1, num2);
    }
    $("#solution").append("<li>" + output + "</li>");
  });
});
