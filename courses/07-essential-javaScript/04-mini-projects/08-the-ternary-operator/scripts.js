const exerciseTimeMins = 15

// Traditional if...else statement
// let message = ''

// if (exerciseTimeMins < 30) {
//     message = 'You need to try harder!'
// }
// else {
//     message = 'Doing good!'
// }

// Ternary Operator
// condition ? expressionIfTrue : expressionIfFalse
const message = exerciseTimeMins < 30 ? 'You need to try harder!' : 'Doing good!'

console.log(message)