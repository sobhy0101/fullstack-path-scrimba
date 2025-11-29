const ageInput = document.getElementById('age')
const resultDisplay = document.getElementById('result-display')
const checkButton = document.getElementById('btn-check')

//set minimum drinking and driving ages for a jurisdiction 
const minDrinkAge = 21
const minDriveAge = 16

//check button click event listener
checkButton.addEventListener('click', function () {
    let message = ''
    const age = Number(ageInput.value)
    if (age < minDriveAge && age < minDrinkAge) {
        message = `I'm sorry, you cannot drink or drive ⛔`
    } else if (age >= minDrinkAge && age < minDriveAge) {
        message = "You can drink 🍺 but you cannot drive"
    } else if (age >= minDriveAge && age < minDrinkAge) {
        message = "You can drive 🚗 but you cannot drink"
    } else if (age >= minDriveAge && age >= minDrinkAge) {
        message = "You can drink 🍺 and drive 🚗 (not at the same time though!)"
    }
    renderMessage(message)
})

function renderMessage(message) {
    resultDisplay.innerText = message
}

// How to debug console errors:
// 1. Read the error message carefully
// 2. Identify the type of error (SyntaxError, ReferenceError, TypeError, etc.)
// 3. Locate the line number where the error occurred
// 4. Check for common mistakes (typos, missing brackets, incorrect variable names, etc.)
// 5. Use console.log() to trace variable values and program flow
// 6. Test your code after making changes to ensure the error is resolved
// Referance: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Debugging
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors
// Reference: https://www.freecodecamp.org/news/how-to-debug-javascript-in-2020-8f1a6c3b3b6d/
// Reference: https://javascript.info/debugging-chrome
