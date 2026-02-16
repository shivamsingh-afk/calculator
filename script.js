let display = document.getElementById('result');
let historyDisplay = document.getElementById('historyDisplay');
let currentInput = '';
let calcHistory = []; // Global history array

function appendToDisplay(value) {
    currentInput += value;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    display.value = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

function calculate() {
    try {
        let expression = currentInput.replace(/×/g, '*');
        let result = eval(expression);
        
        // Save to history
        let calcEntry = currentInput + ' = ' + result;
        calcHistory.push(calcEntry);
        
        // Keep only last 5 calculations
        if (calcHistory.length > 5) {
            calcHistory.shift();
        }
        
        display.value = Math.round(result * 1000) / 1000; // Round to 3 decimals
        currentInput = result.toString();
        
        console.log('History:', calcHistory);
    } catch (error) {
        display.value = 'Error';
        currentInput = '';
        setTimeout(() => {
            display.value = '0';
            currentInput = '';
        }, 1500);
    }
}

function showHistory() {
    if (calcHistory.length === 0) {
        historyDisplay.innerHTML = 'No calculations yet';
    } else {
        let recent = calcHistory.slice(-3).map(item => `<span>${item}</span>`).join('<br>');
        historyDisplay.innerHTML = recent;
        historyDisplay.style.color = '#2ecc71';
        
        setTimeout(() => {
            historyDisplay.style.color = '#bdc3c7';
        }, 2000);
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.' || key === '+') {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});
