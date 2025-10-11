//Incrementing points for Home and Guest teams (+1, +2, +3)
//Resetting the scoreboard to 0 - 0
//Add comments to explain each line of code

let homeScoreEl = document.getElementById("home-display") // Get the HTML element that displays the home team's score
let guestScoreEl = document.getElementById("guest-display") // Get the HTML element that displays the guest team's score
let homeScore = 0 // Initialize the home team's score to 0
let guestScore = 0 // Initialize the guest team's score to 0

homeScoreEl.textContent = homeScore // Set the initial text content of the home score element to 0
guestScoreEl.textContent = guestScore // Set the initial text content of the guest score element to 0

function homePlusOne() { // Function to add 1 point to the home team's score
    homeScore += 1 // Increment the home team's score by 1
    homeScoreEl.textContent = homeScore // Update the displayed score for the home team
}

function homePlusTwo() { // Function to add 2 points to the home team's score
    homeScore += 2 // Increment the home team's score by 2
    homeScoreEl.textContent = homeScore // Update the displayed score for the home team
}

function homePlusThree() { // Function to add 3 points to the home team's score
    homeScore += 3 // Increment the home team's score by 3
    homeScoreEl.textContent = homeScore // Update the displayed score for the home team
}

function guestPlusOne() { // Function to add 1 point to the guest team's score
    guestScore += 1 // Increment the guest team's score by 1
    guestScoreEl.textContent = guestScore // Update the displayed score for the guest team
}

function guestPlusTwo() { // Function to add 2 points to the guest team's score
    guestScore += 2 // Increment the guest team's score by 2
    guestScoreEl.textContent = guestScore // Update the displayed score for the guest team
}

function guestPlusThree() { // Function to add 3 points to the guest team's score
    guestScore += 3 // Increment the guest team's score by 3
    guestScoreEl.textContent = guestScore // Update the displayed score for the guest team
}

function resetScores() { // Function to reset both teams' scores to 0
    homeScore = 0 // Reset the home team's score to 0
    guestScore = 0 // Reset the guest team's score to 0
    homeScoreEl.textContent = homeScore // Update the displayed score for the home team
    guestScoreEl.textContent = guestScore // Update the displayed score for the guest team
}