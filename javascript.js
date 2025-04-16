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
        console.log("We are in number.");
        let res = numberFunction(target.textContent);
        display.textContent = `${res}`;
        
    } else if (target.classList.contains("operand")) {
        console.log("We are in operand.");
        operand(target.textContent);
        
    } else {
        console.log("We are in util.");
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
    console.log(op);
    
    if (operator1 === "") {
        operator1 = op;
        display.textContent = ``;
    } else if (op === "=") {
        resetAfterEqual = true;
        solveProblem();
    } else if (operator1 !== "") {
        isChainedOperator = true;
        
        solveProblem();
        leftNum = answer.toString();
        rightNum ="";
        operator1 = op;
    }
}


function solveProblem() {
    console.log(`leftNum: ${leftNum}, rightNum: ${rightNum}`);

    if (operator1 === "+") {
        answer = parseInt(leftNum) + parseInt(rightNum);   
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