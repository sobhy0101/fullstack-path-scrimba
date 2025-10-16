let fruit = ["🍎", "🍊", "🍎", "🍎", "🍊"]
let appleShelf = document.getElementById("apple-shelf")
let orangeShelf = document.getElementById("orange-shelf")

// Create a function that puts the apples onto the appleShelf
// and the oranges onto the orangeShelf. Use a for loop,
// a conditional statement, and the textContent property.



// function arrangeFruits() {
// for (let i = 0; i < fruit.length; i++){
//     appleShelf.textContent = fruit[0] + fruit[2] + fruit[3]
//     orangeShelf.textContent = fruit[1] + fruit[4];
// }}

function arrangeFruits() {
    for (let i = 0; i < fruit.length; i++) {
        if (fruit[i] === "🍎") {
            appleShelf.textContent += "🍎"
        } else if (fruit[i] === "🍊") { // Use else if incase there is another fruit type on the shelf. For this case, we only have apples and oranges, so we can only use the else condition.
            orangeShelf.textContent += "🍊"
        }
    }
}

arrangeFruits()