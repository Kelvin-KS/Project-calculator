const displayScreen = document.querySelector(".display");

let firstDigit = "";
let secondDigit = "";
let operator = "";
let currentInput = "";
let result = "";

// Number buttons
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");
const zero = document.querySelector(".zero");
const decimal = document.querySelector(".decimal");

// Operators
const divide = document.querySelector(".divide");
const multiply = document.querySelector(".multiply");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const equalTo = document.querySelector(".equalTo");
const del = document.querySelector(".del");
const backspace = document.querySelector(".backspace");

// ======================================================
// Append numbers with full expression display
// ======================================================
function appendNumber(num) {
  currentInput += num;

  let symbol = getSymbol(operator);

  if (operator !== "") {
    displayScreen.textContent = `${firstDigit} ${symbol} ${currentInput}`;
  } else {
    displayScreen.textContent = currentInput;
  }

  // Scroll long expressions
  displayScreen.scrollLeft = displayScreen.scrollWidth;
}

// Number events
one.addEventListener("click", () => appendNumber("1"));
two.addEventListener("click", () => appendNumber("2"));
three.addEventListener("click", () => appendNumber("3"));
four.addEventListener("click", () => appendNumber("4"));
five.addEventListener("click", () => appendNumber("5"));
six.addEventListener("click", () => appendNumber("6"));
seven.addEventListener("click", () => appendNumber("7"));
eight.addEventListener("click", () => appendNumber("8"));
nine.addEventListener("click", () => appendNumber("9"));
zero.addEventListener("click", () => appendNumber("0"));

decimal.addEventListener("click", () => {
  if (!currentInput.includes(".")) {
    if (currentInput === "") currentInput = "0.";
    else currentInput += ".";

    let symbol = getSymbol(operator);

    if (operator !== "") {
      displayScreen.textContent = `${firstDigit} ${symbol} ${currentInput}`;
    } else {
      displayScreen.textContent = currentInput;
    }

    displayScreen.scrollLeft = displayScreen.scrollWidth;
  }
});

// ======================================================
// Operator buttons
// ======================================================
function operatorPressed(symbol, opName) {
  if (currentInput !== "" && firstDigit !== "" && operator !== "") {
    secondDigit = parseFloat(currentInput);
    if (divideByZero()) return;
    calculate();
    firstDigit = result;
  } else if (currentInput !== "" && firstDigit === "") {
    firstDigit = parseFloat(currentInput);
  }

  operator = opName;
  currentInput = "";

  displayScreen.textContent = `${firstDigit} ${symbol} `;
  displayScreen.scrollLeft = displayScreen.scrollWidth;
}

divide.addEventListener("click", () => operatorPressed("/", "toDivide"));
multiply.addEventListener("click", () => operatorPressed("*", "toMultiply"));
minus.addEventListener("click", () => operatorPressed("-", "toMinus"));
plus.addEventListener("click", () => operatorPressed("+", "toPlus"));

// ======================================================
// Equals button
// ======================================================
equalTo.addEventListener("click", () => {
  if (currentInput === "") return;

  secondDigit = parseFloat(currentInput);

  if (divideByZero()) return;

  let symbol = getSymbol(operator);
  calculate();

  displayScreen.textContent = `${firstDigit} ${symbol} ${secondDigit} = ${result}`;
  displayScreen.scrollLeft = displayScreen.scrollWidth;

  firstDigit = result;
  currentInput = "";
  secondDigit = "";
  operator = "";
});

// ======================================================
// DEL button — clears everything
// ======================================================
del.addEventListener("click", () => {
  firstDigit = "";
  secondDigit = "";
  operator = "";
  currentInput = "";
  result = "";
  displayScreen.textContent = "";
});

// ======================================================
// Backspace (C) — remove last character
// ======================================================
backspace.addEventListener("click", () => {
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);

    let symbol = getSymbol(operator);
    if (operator !== "" && firstDigit !== "") {
      displayScreen.textContent = `${firstDigit} ${symbol} ${currentInput}`;
    } else {
      displayScreen.textContent = currentInput;
    }

    displayScreen.scrollLeft = displayScreen.scrollWidth;
  }
});

// ======================================================
// Calculation functions
// ======================================================
function calculate() {
  switch (operator) {
    case "toDivide":
      result = parseFloat((firstDigit / secondDigit).toFixed(2));
      break;
    case "toMultiply":
      result = parseFloat((firstDigit * secondDigit).toFixed(2));
      break;
    case "toMinus":
      result = parseFloat((firstDigit - secondDigit).toFixed(2));
      break;
    case "toPlus":
      result = parseFloat((Number(firstDigit) + Number(secondDigit)).toFixed(2));
      break;
  }
}

// ======================================================
// Division by zero
// ======================================================
function divideByZero() {
  if (operator === "toDivide" && secondDigit === 0) {
    displayScreen.textContent = "undefined";
    firstDigit = "";
    secondDigit = "";
    operator = "";
    currentInput = "";
    result = "";
    return true;
  }
  return false;
}

// ======================================================
// Helper — return operator symbol
// ======================================================
function getSymbol(operator) {
  return operator === "toPlus"
    ? "+"
    : operator === "toMinus"
    ? "-"
    : operator === "toMultiply"
    ? "*"
    : operator === "toDivide"
    ? "/"
    : "";
}
