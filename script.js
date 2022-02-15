var calculator = {
  sum: 0,
  add: function(value) {
    this.sum += value;
  },
  subtract: function(value) {
    this.sum -= value; 
  },
  multiply: function(value) {
    this.sum *= value;
  },
  divide: function(value) {
    this.sum /= value;
  },
  clear: function() {
    this.sum = 0;
  }, 
  equals: function() {
    return this.sum;
  }
}

var screen = document.getElementById("screen");
screen.innerText = calculator.sum;
screen.addEventListener("change", function(){
   // add call
});

var spans = document.getElementsByTagName('span');
var start = true;
var operationKey = false;
var lastEventKey;
var operationType;
var beforeOperatorKey;

for (var i = 0; i < spans.length; i++) {
    var element = spans[i];

    element.onclick = function(){
        // this is to reset everything
        if (this.innerText == "C") {
          calculator.sum = 0;
          screen.innerText = calculator.sum;
          start = true;
          operationKey = false;
        // this is when someone presses an operator key
        }else if(operationKey) {
          if (start) {
            screen.innerText = this.innerText;
          }else{
            screen.innerText += this.innerText;            
          }
          start = false;
          console.log(screen.innerText, operationType, beforeOperatorKey);
          // calculator.sum = parseFloat(beforeOperatorKey);
          if (this.innerText == "=") {
            operationKey = false;
            switch (operationType) {
              case "+":
                calculator.add(parseFloat(screen.innerText));
                screen.innerText = calculator.equals();
                break;
              case "-":
                calculator.subtract(parseFloat(screen.innerText));
                screen.innerText = calculator.equals();
                break;
              case "x":
                calculator.multiply(parseFloat(screen.innerText));
                screen.innerText = calculator.equals();
                break;
              case "/":
                calculator.divide(parseFloat(screen.innerText));
                screen.innerText = calculator.equals();
                break;
              default:
                break;
            }
          }
        }else if(this.innerText == "+" || this.innerText == "-" || this.innerText == "/" || this.innerText == "x" || this.innerText == "=" ) {
          operationKey = true;
          operationType = this.innerText;     
          beforeOperatorKey = screen.innerText;
          start = true;
          calculator.sum = parseFloat( screen.innerText );
        }else if(start){
          start = false;
          screen.innerText = this.innerText;
        }else{
          screen.innerText += this.innerText;          
        }
    };   
}