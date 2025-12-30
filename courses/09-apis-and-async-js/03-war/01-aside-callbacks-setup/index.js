function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => console.log(data))
}

document.getElementById("new-deck").addEventListener("click", handleClick)

// function callback() {
//     console.log("I finally ran!")
// }

// setTimeout(callback, 2000)

/**
 * Challenge: 
 * 
 * Part 1: Given the array of objects below, create a new array with
 * the `.filter()` array method that contains only the objects where "hasPet" is true
 * 
 * 
 * Part 2: Move the anonymous in-line function to its own, named function
 */

const people = [
    { name: "Jack", hasPet: true },
    { name: "Jill", hasPet: false },
    { name: "Alice", hasPet: true },
    { name: "Bob", hasPet: false },
]

const peopleWithPets = people.filter(function(person) {
    return person.hasPet
})

console.log(peopleWithPets)

/**
 * Extra challenge to practice array.filter:
 * 
 * Using .filter, create a new array of people who are 18 and older
 * (should be Jill, Alice, and Bob)
 */

const people2 = [
    { name: "Jack", age: 17 },
    { name: "Jill", age: 18 },
    { name: "Alice", age: 22 },
    { name: "Bob", age: 19 },
]

const adults = people2.filter(function(person) {
    return person.age >= 18
})

console.log(adults)