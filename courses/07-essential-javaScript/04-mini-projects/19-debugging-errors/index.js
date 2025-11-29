const ageInput = document.getElementById('age')
const resultDisplay = document.getElementById('result-display')
const checkButton = document.getElementById('btn-check')

//set minimum drinking and driving ages for a jurisdiction 
const minDrinkAge = 21
const minDriveAge = 16

//check button click event listener
checkButton.value.addEventListener('click', function () {
    let message = ''
    const age = AgeInput.value
        // Age is below the minDrinkAge and minDriveAge
        if (age > minDrinkAge && age > minDriveAge) {
            message = `I'm sorry, you cannot drink or drive ⛔`
        // Relevant to countries where minDrinkAge is less than minDriveAge
        } else if (age >= minDrinkAge && age < minDriveAge) {
            message = "You can drink 🍺 but you cannot drive"
        // Relevant to countries where minDriveAge is less than minDrinkAge
        } else if (age >= minDriveAge && age < minDrinkAge) {
            message = "You can drive 🚗 but you cannot drink"
        // Age is above the minDrinkAge and minDriveAge
        } else {
            message = "You can drink 🍺 and drive 🚗 (not at the same time though!)"
        } 
        renderMessage(message)
}

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
