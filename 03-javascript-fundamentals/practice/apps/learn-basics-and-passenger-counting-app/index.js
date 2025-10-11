//document.getElementById("count").innerText = 12

// let count = 25;
// console.log(count)
 
// let myAge = 44;
// console.log(myAge)

// let firstBatch = 10;
// let secondBatch = 15;
// let variable2 = firstBatch + secondBatch;

// console.log(variable2)

// 1. Create two variables, myAge and humanDogRatio
// 2. Multiply the two together and store the result in myDogAge 
// 3. Log myDogAge to the console

// let myAge = 44;
// let humanDogRatio = 7;

// let myDogAge = myAge * humanDogRatio;
// console.log(myDogAge);




// Create a variable, bonusPoints. Initialize it as 50. Increase it to 100.
// Decrease it down to 25, and then finally increase it to 70
// Console.log the value after each step

// let bonusPoints = 50
// console.log(bonusPoints)

// bonusPoints = bonusPoints + 50
// console.log(bonusPoints)

// bonusPoints = bonusPoints - 75
// console.log(bonusPoints)

// bonusPoints = bonusPoints + 45
// console.log(bonusPoints)


// The onclick event listener

// function increment() {
// console.log("The button was clicked!");

// }


// Using functions to write less code

// function countDown() {
//     console.log(5);
//     console.log(4);
//     console.log(3);
//     console.log(2);
//     console.log(1);
//     console.log("Go!");
// }

// countDown();

// // Declare a variable lap1 and assign it the value 34
// let lap1 = 34 

// // Declare a variable lap2 and assign it the value 33
// let lap2 = 33

// // Declare a variable lap3 and assign it the value 36
// let lap3 = 36

// // Create a function named logLapTime
// // This function calculates and logs the sum of all lap times
// function logLapTime() {
//     // Add lap1, lap2, and lap3 together, store the result in totalTime
//     let totalTime = lap1 + lap2 + lap3
    
//     // Output the totalTime value to the console
//     console.log(totalTime)
// }

// // Call (execute) the logLapTime function so the code inside it runs
// logLapTime();


// let lapsCompleted = 0

// // Create a function that increments the lapsCompleted variable with one
// // Run it three times

// function increment() {
//     // lapsCompleted = lapsCompleted + 1
//     // // or
//     // lapsCompleted += 1 // shorthand for incrementing by using the += operator
//     // // or
//     lapsCompleted++ // another shorthand for incrementing by using the ++ operator
//     console.log(lapsCompleted)
// }

// increment()
// increment()
// increment()

//////////////////////////////////////////////////////////////////////////////////////////////

// intialize the count as 0
// listen for clicks on the increment button
// increment the count variable when the button is clicked (log it out)
// change the count-el in the HTML to reflect the new count

// let count = 0

// function increment() {
//     count ++ // increment the count variable by 1
//     console.log(count) // log the new count value to the console
//     document.getElementById("count").innerText = count // update the HTML element with the new count
// }

// function save() {
//     // create a variable that contains the count and the string " - "
//     let countStr = count + " | "
    
//     // get the element with id "save-el"
//     let saveEl = document.getElementById("save-el")
    
//     // append the countStr to the saveEl
//     saveEl.textContent += countStr
    
//     // reset the count to 0
//     reset()
// }

// function reset() {
//     count = 0 // reset the count variable to 0
//     console.log(count) // log the reset count value to the console
//     document.getElementById("count").innerText = count // update the HTML element with the reset count
//     document.getElementById("save-el").textContent = "Saved Counts: " // reset the saved counts display
// }


//////////////////////////////////////////////////////////////////////////////

// // First name and last name variables with full name concatenation
// let firstName = "Mike";
// let lastName = "Sobhy";
// let fullName = firstName + " " + lastName; // Concatenate first name and last name with a space in between

// // Log the full name to the console
// console.log(fullName);


/////////////////////////////////////////////////////////////////////////////

// let firstName = "Linda"
// let greeting = "Hi there"

// // Create a function that logs out "Hi there, Linda!" when called

// function greet() {
//     console.log(greeting + ", " + firstName + "!")
// }   

// greet()

/////////////////////////////////////////////////////////////////////////////

// let myPoints = 3

// // Create two functions, add3Points() and remove1Point(), and have them
// // add/remove points to/from the myPoints variable

// function add3Points() {
//     myPoints += 3 // Add 3 points to myPoints
// }

// add3Points()
// add3Points()
// add3Points()

// function remove1Point() {
//     myPoints -= 1 // Remove 1 point from myPoints
// }

// remove1Point()
// remove1Point()


// // Call the functions to that the line below logs out 10
// console.log(myPoints)

/////////////////////////////////////////////////////////////////////////////

// Try to predict what each of the lines will log out
// console.log("2" + 2) // "22" String always takes precedence over number
// console.log(11 + 7) // 18
// console.log(6 + "5") // "65" The double quotes indicate it is a string
// console.log("My points: " + 5 + 9) // "My points: 59" Because the first part is a string, it concatenates the numbers 5 & 9 to it reglecting the addition.
// console.log(2 + 2) //  4
// console.log("11" + "14") // "1114" 


/////////////////////////////////////////////////////////////////////////////

// create the needed script for the passenger counting app

let count = 0
let countEl = document.getElementById("count") // get the count element
let incrementBtn = document.getElementById("increment-btn") // get the increment button element
let saveEl = document.getElementById("save-el") // get the save button element
let resetBtn = document.getElementById("reset-btn") // get the reset button element


function increment() {
    count++ // increment the count variable by 1
    countEl.innerText = count // update the count element text to reflect the new count
}

function save() {
    let countStr = count + " | "
    saveEl.textContent += countStr // append the countStr to the saveEl
}
function reset() {
    count = 0 
    countEl.textContent = 0 // reset the count display to 0
    saveEl.textContent = "Saved Counts: " // reset the saved counts display
}

