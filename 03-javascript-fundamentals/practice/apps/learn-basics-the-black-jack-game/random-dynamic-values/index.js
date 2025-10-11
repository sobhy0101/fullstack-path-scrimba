let player1Time = 102
let player2Time = 107

// Use cmd+d or ctrl+d to select the next occurrence of a word
// Use cmd+u or ctrl+u to undo the last selection

// Create a function that returns the fastest
function getFastestRaceTime() {
    if (player1Time < player2Time) {
        return player1Time
    } else if (player2Time < player1Time) {
        return player2Time
    } else {
        return player1Time
    }
}

// let fastestRace = getFastestRaceTime() //

// console.log(fastestRace)

//////////////////////////////////////////////////////////////////
// Challenge:
// Write a function that returns the total race time
// Call/invoke the function and store the returned value in a new variable
// Finally, log the variable out

function getTotalRaceTime() {
    return player1Time + player2Time
}

let totalRaceTime = getTotalRaceTime()

console.log(totalRaceTime)

//////////////////////////////////////////////////////////////////