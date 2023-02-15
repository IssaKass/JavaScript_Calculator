let toggleTheme = document.getElementById("toggleTheme");

toggleTheme.onchange = function () {
  this.checked
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark");
};

let screen = document.querySelector(".calculator .screen");
let keys = document.querySelectorAll(".calculator .keys button");
const operators = ["+", "-", "x", "÷", "^"];
let decimalAdded = false;

keys.forEach((key) => {
  key.addEventListener("click", function () {
    let buttonValue = this.innerHTML;
    let input = screen.innerHTML;

    // clear button
    if (buttonValue === "C") {
      screen.innerHTML = "";
      decimalAdded = false;
    }
    // numbers
    else if (!isNaN(parseInt(buttonValue))) {
      screen.innerHTML += buttonValue;
    }
    // decimal
    else if (buttonValue === ".") {
      if (!decimalAdded) {
        // if screen is empty, add 0 before decimal dot
        if (input.length === 0) {
          screen.innerHTML += "0";
        }
        screen.innerHTML += buttonValue;
        decimalAdded = true;
      }
    }
    // operator
    else if (operators.indexOf(buttonValue) !== -1) {
      let lastChar = input[input.length - 1];
      console.log(lastChar);

      // only add operator if input is not empty
      if (input != "" && operators.indexOf(lastChar) === -1) {
        screen.innerHTML += buttonValue;
      }
      // allow minus operator if the string is empty
      else if (input === "" && buttonValue === "-") {
        screen.innerHTML += buttonValue;
      }
      // replace the last operator with newly pressed operator
      if (operators.indexOf(lastChar) !== -1 && input.length > 1) {
        screen.innerHTML = input.replace(/.$/, buttonValue);
      }
    }
    // eval
    else if (buttonValue === "=") {
      let equation = input;
      var lastChar = input[input.length - 1];

      equation = equation
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/\^/g, "**");

      if (operators.indexOf(lastChar) !== -1 || lastChar === ".") {
        equation = equation.replace(/.$/, "");
      }

      if (equation) {
        screen.innerHTML = eval(equation);
        decimalAdded = false;
      }
    }
  });
});
