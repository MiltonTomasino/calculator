let buttons = document.querySelector(".buttons");
let buttonTypes = ["AC", "+/-", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+","0", ".", "="]
let leftNum = "";
let rightNum = "";
let operator = "";

let display = document.querySelector(".display-content");


for (let i = 0; i < buttonTypes.length; i++) {
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = `${buttonTypes[i]}`;

    btn.addEventListener("click", (e) => { 
        display.textContent = `${btn.textContent}`
    })

    if (btn.textContent === "0") {
        btn.style.flexGrow = 2;
    }

    buttons.insertAdjacentElement("beforeend", btn)
}