let firstOperand = '';
let secondOperand = '';
let operation = '';

//basic math operators
function add (a, b) {
    return a + b;
};

function sub (a, b) {
    return a - b;
};

function mul (a, b) {
    return a * b;
};

function div (a, b) {
    return a / b;
};

//result of math operators combined with operands
function operate (operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);

        case '-':
            return sub(a, b);

        case '*':
            return mul(a, b);
        
        case '/':
            if (b == 0) {
                return 'not today';
            }
            return div(a, b);
    }
}


