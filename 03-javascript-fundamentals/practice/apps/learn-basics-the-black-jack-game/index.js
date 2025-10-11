let player = {
    name: "Mike",
    chips: 124
}
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

// let playerName = "Mike"
// let playerChips = 145
// Instead of using two separate variables, we can use an object to represent the player
// Objects are used to store multiple values in a single variable
// Objects have properties and values associated with those properties
// Here, we create an object named player with two properties: name and chips
// Objects are another data type in JavaScript, just like strings and numbers
// Objects are defined with curly braces {}
// Properties are defined as key-value pairs, separated by commas
// We can access the properties of an object using dot notation (objectName.propertyName)

playerEl.textContent = player.name + ": $" + player.chips // Using dot notation to access the properties of the player object
//playerEl.textContent = playerName + ": $" + playerChips // --- IGNORE ---

function getRandomCard() {
    let randomNumer = Math.floor( Math.random()*13 ) + 1
    if (randomNumer > 10) {
        return 10
    } else if (randomNumer === 1) {
        return 11
    } else {
        return randomNumer
    }
}

function startGame() {
    isAlive = true
    // Generate two random numbes
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    // Re-assign the cards and sum variables so that the game can start
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    // Only allow the player to get a new card if she IS alive and does NOT have Blackjack
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}

function resetGame() {
    cards = []
    sum = 0
    hasBlackJack = false
    isAlive = false
    message = ""
    messageEl.textContent = "Want to play a round?"
    sumEl.textContent = "Sum: "
    cardsEl.textContent = "Cards: "
}