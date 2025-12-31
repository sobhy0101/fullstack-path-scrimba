// function handleClick() {
//     fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
//         .then(res => res.json())
//         .then(data => console.log(data))
// }

// document.getElementById("new-deck").addEventListener("click", handleClick)

// // function callback() {
// //     console.log("I finally ran!")
// // }

// // setTimeout(callback, 2000)

// // const people = [
// //     { name: "Jack", hasPet: true },
// //     { name: "Jill", hasPet: false },
// //     { name: "Alice", hasPet: true },
// //     { name: "Bob", hasPet: false },
// // ]

// // function gimmeThePets(number) {
// //     return person.hasPet
// // }

// // const peopleWithPets = people.filter(gimmeThePets)
// // console.log(peopleWithPets)

// const people = [
//     { name: "Jack", hasPet: true },
//     { name: "Jill", hasPet: false },
//     { name: "Alice", hasPet: true },
//     { name: "Bob", hasPet: false },
// ]

// function filterArray(array, callback) {
//     const resultingArray = []
//     // Write your filtering logic here
//     for (let item of array) {
//         const shouldBeIncluded = callback(item)
//         if (shouldBeIncluded) {
//             resultingArray.push(item)
//         }
//     }
//     return resultingArray
// }

// /**
//  * Challenge: Use your filter array method!
//  * Given the above `people` array, return a new array with only people where `hasPet` is true
//  * Note: Remember that your callback function will be given the individual item in the array for a parameter
//  */

// const peopleWithPets = filterArray(people, function(person) {
//     return person.hasPet
// })

// console.log(peopleWithPets)

/**
 * Challenge: method chaining!
 * 
 * 1. Select the button in the DOM and add an event listener to it without saving the DOM element as a separate variable. I.e. "chain" the `addEventListener` on after your `getElementById()`(When clicked, log "Clicked" to the console)
 *    - I realize this might feel like busywork, but my intent will make sense soon
 * 
 * 2. Given the array below, chain the `.filter` and `.map` array methods together to turn the array into an array of string email addresses of only the people in the array who voted. Log the array of email addresses to the console
 */

// document.getElementById("new-deck").addEventListener("click", function() {
//     console.log("Clicked!")
// })

// const voters = [
//     {name: "Joe", email: "joe@joe.com", voted: true},
//     {name: "Jane", email: "jane@jane.com", voted: true},
//     {name: "Bo", email: "bo@bo.com", voted: false},
//     {name: "Bane", email: "bane@bane.com", voted: false}
// ]

// Write your code below


// Final result: ["joe@joe.com", "jane@jane.com"]

// Using traditional function syntax
    // const voterEmails = voters
    //     .filter(function(voter) {
    //         return voter.voted
    //     })
    //     .map(function(voter) {
    //         return voter.email
    //     })

// Using arrow function syntax
//     const voterEmails = voters.filter(voter => voter.voted).map(voter => voter.email)

// console.log(voterEmails)

//////////////////////////////////////////////////

// function handleClick() {
//     fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
//         .then(res => res.json())
//         .then(data => console.log(data))
// }

// document.getElementById("new-deck").addEventListener("click", handleClick)

// const promise = fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
// promise.then(res => res.json()).then(data => data)

// console.log(promise)

/**
 * Mini challenge: Figure out what `promise.then()` returns! 
 * Save the result to a variable and log it to the console.
 */
    // .then(data => console.log(data))
/*
- // Promises are in one of 3 states at any given time
    - Pending
    - Fulfilled
    - Rejected
*/

///////////////////////////////////////////////////

/**
 * Time to be curious!
 * 
 * What would happen if you didn't return `res.json()` 
 * from the first .then block?
 * 
 * What would the next .then() callback receive as its 
 * parameter if you returned something totally different??
 */

/**
 * Challenge:
 * 
 * pass the string "World" down to a 3rd .then() block
 * and log it to the console inside the body of this new
 * 3rd .then() block
 */

// fetch("https://apis.scrimba.com/bored/api/activity")
//     .then(function(res) {
//         return "Hello"
//     })
//     .then(function(whatever) {
//         console.log(whatever)
//         return " World"
//     })
//     .then(function(greeting) {
//         console.log(greeting)
//     })


////////////////////////////////////////////////

let deckId

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            console.log(deckId)
        })
        }


document.getElementById("new-deck").addEventListener("click", handleClick)


/**
 * Challenge
 * 
 * Task: Using the saved deckId, draw 2 new cards from the deck
 * 
 * Docs for original Deck of Cards API: https://deckofcardsapi.com/#draw-card
 * BaseUrl you'll use: https://apis.scrimba.com/deckofcards/api/deck/
 * (that will replace the base url of https://deckofcardsapi.com/api/deck/)
 * that you'll see in the deck of cards API docs.
 * 
 * 1. Create a new button that, when clicked, draws 2 cards from the deckId
 * you have saved
 *      Note: you'll need to get a new deck every time you refresh the page,
 *      since you're only saving your deckId in a local variable right now
 * 2. Log those 2 cards to the console
 * 3. Prevent users from drawing cards if they haven't created a new deck yet.
 */

document.getElementById("draw-cards").addEventListener("click", function() {
    if (!deckId) {
        console.log("Please create a new deck first!")
    } else {
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
            .then(res => res.json())
            .then(data => console.log(data.cards))
    }
})