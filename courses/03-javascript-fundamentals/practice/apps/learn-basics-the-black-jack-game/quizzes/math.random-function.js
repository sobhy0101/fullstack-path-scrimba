// Math.random() gives a random number between 0 (inclusive) and 1 (exclusive)
// Math.floor() rounds down to the nearest whole number
// Multiplying Math.random() by 6 gives a range from 0 (inclusive) to 6 (exclusive)
// Adding 1 shifts the range to be from 1 (inclusive) to 7 (exclusive), which is effectively 1 to 6 (inclusive)

function rollDice() {
    let randomNumber = Math.floor( Math.random() * 6 ) + 1
    return randomNumber
}
console.log(rollDice())

// Create a function, getRandomCard(), that returns a random number between 1 and 13

function getRandomCard() {
    let randomCard = Math.floor( Math.random() * 13 ) + 1
    return randomCard
}
console.log(getRandomCard())