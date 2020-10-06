const display = document.getElementById("display");
const buttons = document.getElementsByTagName("button");
let displayValue = '0';
let firstOperand = '0';
let currentOperator = '';
let operandEntered = true;
let negative = false;
let decimal = false;

window.addEventListener('keydown', function(e){
    let keyPressed = e.key;
    if(keyPressed === 'Enter'){
        keyPressed = '=';
    }

    if(isValidInput(keyPressed)){
        document.querySelector(`[value="${keyPressed}"]`).click();
    }
});

function isValidInput(keyPressed){
    let validInputs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '*', '-', '+', '=', 'Backspace', 'Delete', '.'];
    if(validInputs.includes(keyPressed)){
        return true;
    }
    return false;
}

function numberClicked(number) {
    if(displayValue === '0'){
        displayValue = number;
        operandEntered = true;
    } else {
        displayValue += number;
    }
    
    display.innerText = displayValue;
}

function operatorClicked(e){
    if(currentOperator === '' && display.innerText != displayValue){    //After pressing =
        firstOperand = display.innerText;
    } else if(currentOperator === ''){                                  //First operator
        firstOperand = displayValue;
    } else if(!operandEntered) {                                        //Changing current operator
        deselectCurrentOperator();
    } else {                                                            //Operators after first
        deselectCurrentOperator();
        firstOperand = operate(currentOperator, parseFloat(firstOperand), parseFloat(displayValue));
        display.innerText = firstOperand;
    }
    e.target.classList.add("selected");
    setCurrentOperator(e.target.value);
    newNumber();
}

function equals(){
    if(currentOperator != ''){
        display.innerText = operate(currentOperator, parseFloat(firstOperand), parseFloat(displayValue));
        deselectCurrentOperator();
        setCurrentOperator('');
        newNumber();
    }
}

function setCurrentOperator(opValue){
    currentOperator = opValue;
    operandEntered = false;
}

function deselectCurrentOperator(){
    document.querySelector(`[value='${currentOperator}']`).classList.remove("selected");
}

function backspace(){
    if(displayValue.length == 1){
        displayValue = '0';
    } else {
        if (displayValue.slice(-1) === '.') {
            decimal = false;
        }
        displayValue = displayValue.slice(0, -1);
    }
    display.innerText = displayValue;
}

function clear(){
    firstOperand = '0';
    display.innerText = '0';
    if(currentOperator !== ''){
        deselectCurrentOperator();
        setCurrentOperator('');
    }
    newNumber();
    operandEntered = true;
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
    if(displayValue === '0'){
        operandEntered = true;
    }

    if(!decimal){
        decimal = true;
        displayValue += '.';
        display.innerText = displayValue;
    }
}

function newNumber(){
    operandEntered = false;
    displayValue = '0';
    negative = false;
    decimal = false;
}

function addListeners(){
    for(let i = 0; i < buttons.length; i++){
        if(buttons[i].classList.contains("number")){
            buttons[i].addEventListener('click', function(){
                numberClicked(buttons[i].value);
            })
        } else if(buttons[i].classList.contains("operator")){
            buttons[i].addEventListener('click', function(e){
                operatorClicked(e);
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
    }
}