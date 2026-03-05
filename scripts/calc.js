document.addEventListener('DOMContentLoaded', () => {
    const calcButton = document.querySelector('.calc-result');
    calcButton && calcButton.addEventListener('click', onClickHandler);
    
    const prevResultElem = document.querySelector(".prev-result");
    if (prevResultElem) {
        prevResultElem.innerHTML = 'история пуста';
    }
    if (prevResultElem) {
        prevResultElem.addEventListener('click', onHistoryClick);
    }
});

function addHistoryClickHandlers() {
    const prevResultElem = document.querySelector(".prev-result");
    const currResultElem = document.querySelector(".curr-result");

    if (prevResultElem) {
        prevResultElem.addEventListener('click', () => handleHistoryClick(prevResultElem));
    }
    if (currResultElem) {
        currResultElem.addEventListener('click', () => handleHistoryClick(currResultElem));
    }
}

function handleHistoryClick(element) {
    if (!element || !element.innerHTML) return;
    
    const historyItem = element.innerHTML;
    const parsed = parseHistoryItem(historyItem);
    
    if (parsed) {
        const { num1, num2, operation } = parsed;
        
        const firstNumElem = document.querySelector("#first-number");
        const secondNumElem = document.querySelector("#second-number");
        const operationElem = document.querySelector(".select-operation");
        
        if (firstNumElem && secondNumElem && operationElem) {
            firstNumElem.value = num1;
            secondNumElem.value = num2;
            
            const options = operationElem.options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === operation) {
                    operationElem.selectedIndex = i;
                    break;
                }
            }
            
            clearAllErrors();
        }
    }
}

function parseHistoryItem(historyItem) {
    try {
        const equation = historyItem.split('=')[0].trim();
        const parts = equation.split(' ');
        
        if (parts.length >= 3) {
            const num1 = parseFloat(parts[0]);
            const operation = parts[1];
            const num2 = parseFloat(parts[2]);
            
            if (!isNaN(num1) && !isNaN(num2)) {
                return { num1, num2, operation };
            }
        }
    } catch (e) {
        console.warn('Ошибка:', e);
    }
    return null;
}

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
        
        addHistoryClickHandlers();
    }
}

function showErrorMessage(element, message) {
    element.classList.add('error-highlight');
    
    const errorBox = document.getElementById('error-message');
    const errorText = document.querySelector('.error-text');
    
    if (errorBox && errorText) {
        errorText.textContent = message;
        errorBox.classList.add('show');
    }
    
    console.warn(`Ошибка: ${message}`);
}

function clearAllErrors() {
    document.querySelectorAll('.input-number').forEach(el => {
        el.classList.remove('error-highlight');
    });

    const errorBox = document.getElementById('error-message');
    if (errorBox) {
        errorBox.classList.remove('show');
    }
}
