// Create two boolean variables, likesDocumentaries and likesStartups
// Use an OR statement (||) to call recommendMovie() if either of those variables are true
let likesDocumentaries = false
let likesStartups = true

if (likesDocumentaries === true || likesStartups === true) { // The OR operator (||) checks if at least one condition is true
    recommendMovie()
}

function recommendMovie() {
    console.log("Hey, check out this new film we think you will like!")
}

// learn more about the OR operator (||) here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR