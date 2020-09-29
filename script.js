const display = document.getElementById("display");
const buttons = document.getElementsByTagName("button");
let displayValue = 0;
let firstOperand = 0;
let currentOperator = '';
let negative = false;
let decimal = false;
let decimalPlace = 1;

function numberListener(number) {
    if(decimal){
        displayValue += number * decimalPlace;
        decimalPlace *= 0.1;
    } else {
        displayValue = displayValue * 10 + number;
    }

    display.innerText = displayValue;
}

function operatorListener(e){
    firstOperand = operate(currentOperator, firstOperand, displayValue);
    displayValue = 0;
    currentOperator = e.target.value;
    newNumber();
}

function equals(){
    displayValue = operate(currentOperator, firstOperand, displayValue);
    display.innerText = displayValue;
    displayValue = 0;
    currentOperator = '';
    newNumber();
}

function backspace(){
    if(decimal) {
        decimalPlace *= 10;
        displayValue -= displayValue % (decimalPlace);
    } else {
        displayValue = (displayValue - displayValue % 10) / 10;
    }
    display.innerText = displayValue;
}

function clear(){
    displayValue = 0;
    firstOperand = 0;
    currentOperator = '';
    display.innerText = displayValue;
    newNumber();
}

function negate(){
    displayValue = 0 - displayValue;
    display.innerText = displayValue;
}

function decimalClick(){
    if(decimalPlace === 1) {
        decimal = true;
        decimalPlace = 0.1;
    } else if (decimalPlace === 0.1){
        newNumber();
    }
}

function newNumber(){
    negative = false;
    decimal = false;
    decimalPlace = 1;
}

function addListeners(){
    for(let i = 0; i < buttons.length; i++){
        if(buttons[i].classList.contains("number")){
            buttons[i].addEventListener('click', function(){
                numberListener(parseInt(buttons[i].value));
            })
        } else if(buttons[i].classList.contains("operator")){
            buttons[i].addEventListener('click', function(e){
                operatorListener(e);
            })
        } else if (buttons[i].classList.contains("equals")){
            buttons[i].addEventListener('click', equals);
        } else if (buttons[i].classList.contains("backspace")) {
            buttons[i].addEventListener('click', backspace);
        } else if(buttons[i].classList.contains("clear")) {
            buttons[i].addEventListener('click', clear);
        } else if(buttons[i].classList.contains("negate")) {
            buttons[i].addEventListener('click', negate);
        } else if(buttons[i].classList.contains("decimal")) {
            buttons[i].addEventListener('click', decimalClick);
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
        if(number2 === 0) {
            clear();
            return "No.";
        } else {
            return divide(number1, number2);
        }
    } else {
        return number2;
    }
}