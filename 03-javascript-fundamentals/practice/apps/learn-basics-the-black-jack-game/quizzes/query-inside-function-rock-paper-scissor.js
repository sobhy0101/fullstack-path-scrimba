// let hands = ["rock", "paper", "scissor"]

// // Create a function that returns a random item from the array


// function randomHand() {
//      return hands [Math.floor(Math.random() * hands.length)];
//       }
      
// console.log(randomHand())

// The optimal answer from the course instructor:

let hands = ["rock", "paper", "scissor"]

// Create a function that returns a random item from the array

function getHand() {
    let randomIndex = Math.floor( Math.random() * 3)
    return hands[randomIndex]
}

console.log( getHand() )