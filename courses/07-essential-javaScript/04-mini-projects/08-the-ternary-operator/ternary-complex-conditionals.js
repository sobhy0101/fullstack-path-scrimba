const exerciseTimeMins = 10

// Traditional if...else statement - complex conditionals
    // let message = ''

    // if (exerciseTimeMins < 30) {
    //     message = 'You need to try harder!'
    // }
    // else if(exerciseTimeMins < 60) {
    //     message = 'Doing good!'
    // }
    // else {
    //     message = 'Excellent!'
    // } 

// Ternary Operator - complex conditionals
// Syntax:
//  condition ? expressionIfTrue : expressionIfFalse : condition2 ? expressionIfTrue2 : expressionIfFalse2

    // const message = exerciseTimeMins < 30 ? 'You need to try harder!' : exerciseTimeMins < 60 ? 'Doing good!' : 'Excellent!'
    
    // You can also format it like this for better readability:
    const message = exerciseTimeMins < 30 ? 'You need to try harder!'
    : exerciseTimeMins < 60 ? 'Doing good!'
    : 'Excellent!'
    
    console.log(message)