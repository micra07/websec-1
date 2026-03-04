document.addEventListener('DOMContentLoaded', () => {
    const calcButton = document.querySelector('.calc-result');
    calcButton && calcButton.addEventListener('click', onClickHandler);
});

function onClickHandler() {
    const firstNumElem = document.querySelector("#first-number");
    const secondNumElem = document.querySelector("#second-number");
    const operationElem = document.querySelector(".select-operation");
    
    if (firstNumElem && secondNumElem && operationElem) {
        const firstNumber = parseFloat(firstNumElem.value);
        const secondNumber = parseFloat(secondNumElem.value);
        const operation = operationElem.value;
        
        let result = 0;
        switch (operation) {
            case "+":
                result = firstNumber + secondNumber;
                break;
            case "-":
                result = firstNumber - secondNumber;
                break;
            case "*":
                result = firstNumber * secondNumber;
                break;
            case "/":
                result = firstNumber / secondNumber;
                break;
            case "%":
                result = firstNumber % secondNumber;
                break;
            case "^":
                result = Math.pow(firstNumber, secondNumber);
                break;
        }
        
        const resultStr = `${firstNumber} ${operation} ${secondNumber} = ${result}`;
        setResult(resultStr);
    }
}

function setResult(result) {
    const currResultElem = document.querySelector(".curr-result");
    if (currResultElem) {
        currResultElem.innerHTML = result;
    }
}
