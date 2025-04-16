let buttons = document.querySelector(".buttons");
let buttonTypes = ["AC", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+","0", ".", "="]
let operandList = ["+", "-", "/", "*", "="];
let leftNum = "";
let rightNum = "";
let operator1 = "";
let isChainedOperator = false;
let resetAfterEqual = false;
let answer = "";

let display = document.querySelector(".display-content");


for (let i = 0; i < buttonTypes.length; i++) {
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = `${buttonTypes[i]}`;

    // assign appropriate class to button according to its content
    if (!isNaN(parseInt(btn.textContent))) {
        btn.classList.add("number");
    } else if (operandList.includes(btn.textContent)) {
        btn.classList.add("operand");
    } else {
        btn.classList.add("util")
    }

    if (btn.textContent === "0") {
        btn.style.flexGrow = 2;
    }

    buttons.insertAdjacentElement("beforeend", btn)
}

let container = document.querySelector(".calculator-container");

// ctegorize each button press by there class
container.addEventListener("click", (e) => {
    let target = e.target;

    if (target.classList.contains("number")) {
        let res = numberFunction(target.textContent);
        display.textContent = `${res}`;
        
    } else if (target.classList.contains("operand")) {
        operand(target.textContent);
        
    } else {
        utilsFunction(target.textContent);
    }


});

// increase the number depending on whether the operation
// doesn't exist yet, or it's chaining.
function numberFunction(num) {
    if (resetAfterEqual) {
        clearInputs();
        resetAfterEqual = false;
    }

    if (operator1 === "" && !isChainedOperator) {
        return leftNum += num;
    } else if (operator1 !== "" && !isChainedOperator) {
        return rightNum += num;
    } else {
        return rightNum += num;
    }
}

function operand(op) {    
    if (operator1 === "") {
        operator1 = op;
        display.textContent = ``;
    } else if (op === "=") {
        resetAfterEqual = true;
        solveProblem();
    } else if (resetAfterEqual && answer !== "") {
        // user can continue operations after = is inputted
        leftNum = answer.toString();
        operator1 = op;
        rightNum = "";
        resetAfterEqual = false;
        isChainedOperator = false;
        display.textContent = ``;
        return;
    }
     else if (operator1 !== "") {
        // start the chain of operations
        isChainedOperator = true;
        solveProblem();
        leftNum = answer.toString();
        rightNum ="";
        operator1 = op;
    }
}


function solveProblem() {

    num1 = parseInt(leftNum);
    num2 = parseInt(rightNum);

    switch (operator1) {
        case "+":
            answer = num1 + num2;
            break;
        case "-":
            answer = num1 - num2;
            break;
        case "*":
            answer = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                answer = "LMAOOOOOOO you cant do that 😂🫵";
            } else {
                answer = num1 / num2;
            }
    }

    display.textContent = `${answer}`;
}

function clearInputs() {
    leftNum = "";
    rightNum = "";
    operator1 = "";
    isChainedOperator = false;
    answer = "";
    display.textContent = ``;
}

function utilsFunction(util) {
    if (util === "AC") {
        clearInputs();
        return;
    }
}