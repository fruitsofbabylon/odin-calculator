const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".operand, .decimal");
const operatorButtons = document.querySelectorAll(".operator");
const resultButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const percentageButton = document.querySelector(".percent");
const backspaceButton = document.querySelector(".backspace");
const allButtons = document.querySelectorAll("button");

//basic math operators
function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mul(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}

//result of math operators combined with operands
function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);

        case "-":
            return sub(a, b);

        case "*":
            return mul(a, b);

        case "/":
            return div(a, b);
    }
}

//display the content of digit buttons clicked and store their values
let currentNumber = 0;
let shouldResetDisplay = false;
let lastBtnClickedOperator = false;
let decimalUsed = false;

function updateDisplay(digit) {
    if (shouldResetDisplay) {
        display.textContent = "";
        shouldResetDisplay = false;
    }
    if (display.textContent === "0" && digit !== ".") {
        display.textContent = "";
        currentNumber = "";
    } 
    if (currentNumber === "" && digit === ".") {
      currentNumber = "0"; 
      display.textContent = "0";
    }
    if (currentNumber.length >= 14) {
        return;
    }
    currentNumber += digit;
    display.textContent += digit;
}

digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent === "." && decimalUsed) {
            return;
        } else if (button.textContent === ".") {
            decimalUsed = true;
        }
        updateDisplay(button.textContent);
        lastBtnClickedOperator = false;
    });
});

//store the first operand and operator clicked
let firstOperand = "";
let operation = "";
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (firstOperand === "") {
            firstOperand = currentNumber;
        } else if (lastBtnClickedOperator === true) {
            operation = button.textContent;
            changeButtonColor(button); 
            return;
        } else if (currentNumber === "") {
            firstOperand = display.textContent;
            secondOperand = "";
        } else if (handleDivisionByZero()) return;
        else {
            firstOperand = parseFloat(
                operate(
                    operation,
                    parseFloat(firstOperand),
                    parseFloat(currentNumber)
                ).toPrecision(14)
            );
            display.textContent = firstOperand;
        }
        currentNumber = "";
        operation = button.textContent;
        changeButtonColor(button);
        shouldResetDisplay = true;
        lastBtnClickedOperator = true;
        decimalUsed = false;
    });
});

//store the second operand and execute the calculation
let secondOperand = "";

resultButton.addEventListener("click", () => {
    if (firstOperand === "" || currentNumber === "") {
        return;
    } else if (handleDivisionByZero()) return;
    secondOperand = currentNumber;
    currentNumber = "";
    display.textContent = parseFloat(
        operate(
            operation,
            parseFloat(firstOperand),
            parseFloat(secondOperand)
        ).toPrecision(14)
    );
    shouldResetDisplay = true;
    lastBtnClickedOperator = false;
    decimalUsed = false;
    changeButtonColor(resultButton); 
});

//clear the display and reset the variables
clearButton.addEventListener("click", () => {
    currentNumber = 0;
    firstOperand = "";
    secondOperand = "";
    operation = "";
    display.textContent = 0;
    shouldResetDisplay = false;
    lastBtnClickedOperator = false;
    decimalUsed = false;
    lastClickedButton = null;
    allButtons.forEach(button => {
      button.style.backgroundColor = "";
    });
});

//add division by zero case
function handleDivisionByZero() {
    if (operation === "/" && currentNumber === "0") {
        display.textContent = "Nah mate";
        return true;
    }
    return false;
}

//convert number into percentage btn
percentageButton.addEventListener("click", () => {
    if (currentNumber === 0) {
        return;
    } else {
        currentNumber = parseFloat(currentNumber) / 100;
        display.textContent = currentNumber;
    }
});

//backspace btn
backspaceButton.addEventListener("click", () => {
    if (currentNumber === 0 || currentNumber === "") {
        return;
    }
    currentNumber = currentNumber.slice(0, -1);
    display.textContent = currentNumber;
});

//keyboard support
document.addEventListener("keydown", (e) => {
    let key = e.key;
    const allowedKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "+",
        "-",
        "*",
        "/",
        ".",
        "=",
        "%",
        "Enter",
        "Backspace",
        "Escape",
    ];

    if (allowedKeys.includes(key)) {
        switch (key) {
            case "Enter":
            case "=":
                resultButton.click();
                break;
            case "Escape":
                clearButton.click();
                break;
            case "Backspace":
                e.preventDefault();
                backspaceButton.click();
                break;
            case "%":
                percentageButton.click();
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                operatorButtons.forEach((button) => {
                    if (button.textContent === key) {
                        button.click();
                    }
                });
                break;
            default:
                digitButtons.forEach((button) => {
                    if (button.textContent === key) {
                        button.click();
                    }
                });
                break;
        }
    }
});

//change the color of the buttons when clicked 
let lastClickedButton = null;

function changeButtonColor(button) {
    if (lastClickedButton) {
        lastClickedButton.style.backgroundColor = "";
    }
    button.style.backgroundColor = "#d47ef2";
    lastClickedButton = button;
}