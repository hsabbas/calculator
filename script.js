const display = document.getElementById("display");
const buttons = document.getElementsByTagName("button");
let displayValue = 0;
let firstOperand = 0;
let currentOperator = '';

function numberListener(number) {
    displayValue = displayValue * 10 + number;
    display.innerText = displayValue;
}

function operatorListener(e){
    firstOperand = operate(currentOperator, firstOperand, displayValue);
    displayValue = 0;
    currentOperator = e.target.value;
}

function equalsListener(){
    displayValue = operate(currentOperator, firstOperand, displayValue);
    display.innerText = displayValue;
    displayValue = 0;
    currentOperator = '';
}

function addListeners(){
    for(let i = 0; i < buttons.length; i++){
        if(buttons[i].classList.contains("number")){
            buttons[i].addEventListener('click', function(){
                console.log(buttons[i].value);
                numberListener(parseInt(buttons[i].value));
            })
        } else if(buttons[i].classList.contains("operator")){
            buttons[i].addEventListener('click', function(e){
                operatorListener(e);
            })
        } else if (buttons[i].classList.contains("equals")){
            buttons[i].addEventListener('click', equalsListener);
        }
    }
}

addListeners();












let add = (number1, number2) => number1 + number2;
let subtract = (number1, number2) => number1 - number2;
let multiply = (number1, number2) => number1 * number2;
let divide = (number1, number2) => number1 / number2;

function operate(operator, number1, number2){
    if(operator === "+") {
        return add(number1, number2);
    } else if (operator === "-") {
        return subtract(number1, number2);
    } else if (operator === "*") {
        return multiply(number1, number2);
    } else if (operator === "/"){
        return divide(number1, number2);
    } else {
        return number2;
    }
}