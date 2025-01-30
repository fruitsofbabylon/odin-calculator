// add 2 numbers and an operand variables
let firstOperand = "";
let secondOperand = "";
let operation = "";

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
            if (b == 0) {
                return "not today";
            }
            return div(a, b);
    }
}

//display the content of digit buttons clicked and store their values
const display = document.querySelector(".display");
const digitButtons = document.querySelectorAll(".operand, .decimal");
let currentNumber = "";
let shouldResetDisplay = false;

function updateDisplay(digit) {
    if (shouldResetDisplay) {
        display.textContent = "";
        shouldResetDisplay = false;
    }
    if (currentNumber.length >= 14) {
        return;
    }
    currentNumber += digit;
    display.textContent += digit;
}

digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        updateDisplay(button.textContent);
    });
});

//store the first operand and operator clicked
const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (firstOperand === "") {
            firstOperand = currentNumber;
        } else {
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
        shouldResetDisplay = true;
    });
});

//store the second operand and execute the calculation
const resultButton = document.querySelector(".equals");

resultButton.addEventListener("click", () => {
    secondOperand = currentNumber;
    currentNumber = "";
    display.textContent = parseFloat(
        operate(
            operation,
            parseFloat(firstOperand),
            parseFloat(secondOperand)
        ).toPrecision(14)
    );
});
