document.addEventListener('DOMContentLoaded', () => {
    const calcButton = document.querySelector('.calc-result');
    calcButton && calcButton.addEventListener('click', onClickHandler);
    
    const prevResultElem = document.querySelector(".prev-result");
    if (prevResultElem && window.localStorage && window.localStorage.getItem('previousResult')) {
        prevResultElem.innerHTML = window.localStorage.getItem('previousResult');
    }
});

function onClickHandler() {
    const firstNumElem = document.querySelector("#first-number");
    const secondNumElem = document.querySelector("#second-number");
    const operationElem = document.querySelector(".select-operation");
    
    clearAllErrors();
    
    if (firstNumElem && secondNumElem && operationElem) {
        const firstNumber = Number.parseFloat(firstNumElem.value);
        const secondNumber = Number.parseFloat(secondNumElem.value);
        
        if (!Number.isNaN(firstNumber) && !Number.isNaN(secondNumber)) {
            const operation = operationElem.value;
            
            if ((operation === "/" || operation === "%") && secondNumber === 0) {
                showErrorMessage(secondNumElem, 'Деление на ноль невозможно');
                return;
            }
            
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
            
            const resultStr = `${firstNumber} ${operation} ${secondNumber} = ${Number(result).toFixed(6)}`;
            console.log(resultStr);
            setResult(resultStr);
        }
        else {
            if (isNaN(firstNumber) || firstNumElem.value === '') {
                showErrorMessage(firstNumElem, 'Введите первое число');
            }
            if (isNaN(secondNumber) || secondNumElem.value === '') {
                showErrorMessage(secondNumElem, 'Введите второе число');
            }
        }
    }
}

function setResult(result) {
    const prevResultElem = document.querySelector(".prev-result");
    const currResultElem = document.querySelector(".curr-result");
    
    if (prevResultElem && currResultElem) {
        if (currResultElem.innerHTML) {
            prevResultElem.innerHTML = currResultElem.innerHTML;
        }
        currResultElem.innerHTML = result;
        window.localStorage && window.localStorage.setItem('previousResult', result);
    }
}

function showErrorMessage(element, message) {
    element.classList.add('input-error');
    element.setAttribute('title', message);
    console.warn(`Ошибка: ${message}`);
}

function clearAllErrors() {
    document.querySelectorAll('.input-number').forEach(el => {
        el.classList.remove('input-error');
        el.removeAttribute('title');
    });
}
