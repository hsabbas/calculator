const display = document.getElementById("display");
const buttons = document.getElementsByTagName("button");
let displayValue = '0';
let firstOperand = '0';
let currentOperator = '';
let negative = false;
let decimal = false;

function numberListener(number) {
    if(displayValue == 0){
        displayValue = number;
    } else{
        displayValue += number;
    }

    display.innerText = displayValue;
}

function operatorListener(e){
    firstOperand = operate(currentOperator, parseFloat(firstOperand), parseFloat(displayValue));
    displayValue = '0';
    currentOperator = e.target.value;
    newNumber();
}

function equals(){
    displayValue = operate(currentOperator, parseFloat(firstOperand), parseFloat(displayValue));
    display.innerText = displayValue;
    displayValue = '0';
    currentOperator = '';
    newNumber();
}

function backspace(){
    if(displayValue.slice(-1) === '.') {
        decimal = false;
    }
    displayValue = displayValue.slice(0, -1);
    display.innerText = displayValue;
}

function clear(){
    displayValue = '0';
    firstOperand = '0';
    currentOperator = '';
    display.innerText = displayValue;
    newNumber();
}

function negate(){
    if (displayValue == 0){
        return;
    } else if(!negative){
        displayValue = '-' + displayValue;
        negative = true;
    } else {
        displayValue = displayValue.slice(1);
        negative = false;
    }
    display.innerText = displayValue;
}

function decimalClick(){
    if(!decimal){
        decimal = true;
        displayValue += '.';
        display.innerText = displayValue;
    }
}

function newNumber(){
    negative = false;
    decimal = false;
}

function addListeners(){
    for(let i = 0; i < buttons.length; i++){
        if(buttons[i].classList.contains("number")){
            buttons[i].addEventListener('click', function(){
                numberListener(buttons[i].value);
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