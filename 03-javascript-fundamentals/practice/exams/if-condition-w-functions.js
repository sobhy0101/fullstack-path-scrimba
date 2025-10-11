//If-Condition Practice Quiz #1

// Task:
// Write a function called isFaceCard(card) that takes a number (card) between 1 and 13 (representing a playing card).

// If the card is 11, 12, or 13, return "Face card".

// If the card is 1, return "Ace".

// For all other numbers (2–10), return "Number card".

// Example:
// console.log(isFaceCard(1))    // Output: "Ace"
// console.log(isFaceCard(7))    // Output: "Number card"
// console.log(isFaceCard(12))   // Output: "Face card"

// function isFaceCard(card) {
//     if (card === 11 || card === 12 || card === 13) {
//         return "Face card"
//     } else if (card === 1) {
//         return "Ace"
//     } else {
//         return "Number card"
//     }
// }
// console.log(isFaceCard(1))    // Output: "Ace"
// console.log(isFaceCard(7))    // Output: "Number card"
// console.log(isFaceCard(12))   // Output: "Face card"

// function isFaceCard(card) {
//     if (card === 11 || card === 12 || card === 13) {
//         return "Face Card"
//     } else if (card === 1) {
//         return "Ace Card"
//     } else {
//         return "Numbered Card"
//     }
// }
// console.log(isFaceCard(13))

///////////////////////////////////////////////////////////////////////////////////////////////////////

// If-Condition Practice Quiz #2
//
// Task:
// Write a function called cardValue(card) that takes a number (card) between 1 and 13 (inclusive):
// If the card is 1, return 11 (Ace counts as 11 points).
// If the card is 11, 12, or 13, return 10 (face cards count as 10 points).
// For all other numbers (2–10), return the number itself.

// let card = Math.floor( Math.random()*13 ) + 1

// function cardValue(card) {
//     if (card === 11 || card === 12 || card === 13) {
//         return 10
//     } else if (card === 1) {
//         return 11
//     } else {
//         return card
//     }
// }

// console.log(cardValue(1))    // Output: 11
// console.log(cardValue(4))    // Output: 4
// console.log(cardValue(12))   // Output: 10

///////////////////////////////////////////////////////////////////////////////////////////

// Write a function called describeTemperature(temp) that takes a temperature in Celsius (temp):
// If temp is 30 or above, return "Hot".
// If temp is between 15 and 29 (inclusive), return "Warm".
// If temp is between 0 and 14 (inclusive), return "Cold".
// If temp is below 0, return "Freezing".

function describeTemperature(temp) {
    if (temp >= 30) {
        return "Hot";
    } else if (temp >= 15 && temp <= 29) {
        return "Warm";
    } else if (temp >= 0 && temp <= 14){
        return "Cold";
    } else {
        return "Freezing";
    }
}

console.log(describeTemperature(35))  // Output: "Hot"
console.log(describeTemperature(20))  // Output: "Warm"
console.log(describeTemperature(8))   // Output: "Cold"
console.log(describeTemperature(-5))  // Output: "Freezing"