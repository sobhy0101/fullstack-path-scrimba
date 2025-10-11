// Array containing all possible characters for password generation
const characters = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", // Uppercase letters
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", // Lowercase letters
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", // Numbers
    "~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/" // Symbols
];


// Default password length
let passwordLength = 15
// Reference to first password display element
let passwordOneEl = document.getElementById("password-one")
// Reference to second password display element
let passwordTwoEl = document.getElementById("password-two")
// Reference to the generate button
let generateButton = document.getElementById("generate-button")

// Event listener for the generate button
generateButton.addEventListener("click", function() {
    // Clear previous passwords
    passwordOneEl.textContent = ""
    passwordTwoEl.textContent = ""

    // Get password length from input
    passwordLength = document.getElementById("length").value
    // Check if uppercase letters should be included
    let includeUppercase = document.getElementById("includeUppercase").checked
    // Check if numbers should be included
    let includeNumbers = document.getElementById("includeNumbers").checked
    // Check if symbols should be included
    let includeSymbols = document.getElementById("includeSymbols").checked

    // Generate first password
    let passwordOne = generatePassword(includeUppercase, includeNumbers, includeSymbols)
    // Generate second password
    let passwordTwo = generatePassword(includeUppercase, includeNumbers, includeSymbols)
    // Display first password
    passwordOneEl.textContent = passwordOne
    // Display second password
    passwordTwoEl.textContent = passwordTwo
})
// Function to generate a random password
function generatePassword(includeUppercase, includeNumbers, includeSymbols) {
    // Initialize password string
    let password = ""
    // Array to hold allowed characters
    let availableCharacters = []

    // Always include lowercase letters
    availableCharacters = availableCharacters.concat(characters.slice(26, 52))

    // Add uppercase letters if selected
    if (includeUppercase) {
        availableCharacters = availableCharacters.concat(characters.slice(0, 26))
    }
    // Add numbers if selected
    if (includeNumbers) {
        availableCharacters = availableCharacters.concat(characters.slice(52, 62))
    }
    // Add symbols if selected
    if (includeSymbols) {
        availableCharacters = availableCharacters.concat(characters.slice(62))
    }
    // Build password by randomly picking from available characters
    for (let i = 0; i < passwordLength; i++) {
        password += availableCharacters[Math.floor(Math.random() * availableCharacters.length)]
    }
    // Return the generated password
    return password
}

// Event listener to copy first password to clipboard when clicked
passwordOneEl.addEventListener("click", function() {
    // Copy password text to clipboard
    navigator.clipboard.writeText(passwordOneEl.textContent)
    // Show notification to user
    document.getElementById("copy-notification").textContent = "Password 1 copied to clipboard!"
})

// Event listener to copy second password to clipboard when clicked
passwordTwoEl.addEventListener("click", function() {
    // Copy password text to clipboard
    navigator.clipboard.writeText(passwordTwoEl.textContent)
    // Show notification to user
    document.getElementById("copy-notification").textContent = "Password 2 copied to clipboard!"
})