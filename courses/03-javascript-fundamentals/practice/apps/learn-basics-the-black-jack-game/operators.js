let hasSolvedChallenge = false
let hasHintsLeft = false

// Create an if statement that checks that both variables are false.
// If so, run the showSolution() function

if (hasSolvedChallenge === false && hasHintsLeft === false) { // The && operator means "and" it works if both conditions are true
    showSolution()
}

function showSolution() {
    console.log("Showing the solution....")
}

// Reference: The AND (&&) Operator
// The AND operator (&&) is used to combine two or more conditions.
// It returns true only if all the conditions are true.
// If any condition is false, the entire expression evaluates to false.
// Example:
// (condition1 && condition2 && condition3)
// true  && true  && true  => true
// Learn more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND