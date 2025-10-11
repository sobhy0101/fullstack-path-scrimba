const welcomeEl = document.getElementById("welcome-el")

// The items between the backticks within a function are called parameters
// Parameters act as placeholders for the values that will be passed to a function when it is invoked
// Parameters are variables that are only accessible within the function
// You can add as many parameters as you want, just remember to separate them with a comma
function greetUser(greeting, name, emoji) {
    // Rewrite the expression using template literals
    welcomeEl.textContent = `${greeting}, ${name} ${emoji}`
}
// The values you pass to a function when you invoke it are called arguments
// Arguments are the actual values that get passed to the function when it is invoked
// You can pass as many arguments as you want, just remember to separate them with a comma
greetUser("Hello", "James", "😀")
greetUser("Welcome back", "James", "🙂")
greetUser("Howdy", "James", "👋")


// Create a function, add(), that adds two numbers together and returns the sum
function add(num1, num2) {
    return num1 + num2
}

console.log( add(3, 4) )  // should log 7
console.log( add(9, 102) )  // should log 111


//////////////////////////// Quiz ////////////////////////////
// What are greeting and name?  // parameters
// What are "Howdy" and "James"? // arguments
// What are num1 and num2? // parameters
// What are 3 and 4? // arguments

// An easy way to remember the difference between parameters and arguments is to think of parameters are inside of the function definition (they are part of the function declaration) and arguments are outside of the function (they are part of the function invocation).

////////////////////////////////////////////////////////////////

// Reference image: https://typealias.com/img/social/guide-parameters-arguments.png
// Or local path: guide-parameters-arguments.png

/////////////////////////// Functions with Arrays and parameters ///////////////////////////

// Create a function, getFirst(arr), that returns the first item in the array
let firstCard = getFirst([10, 2, 5])

function getFirst(arr) {
    return arr[0]
}
// Call it with an array as an argument to verify that it works
console.log(firstCard)