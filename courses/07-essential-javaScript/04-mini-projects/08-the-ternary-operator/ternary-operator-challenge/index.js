const playerGuess = 8
const correctAnswer = 6

/*
Challenge #2
1. Now improve the functionality of this code by 
   letting the player know if their guess was too high, 
   too low, or exactly right.
*/

const message = playerGuess === correctAnswer ? 'Exactly right!' : playerGuess > correctAnswer ? 'Too high!' : 'Too low!'

console.log(message)