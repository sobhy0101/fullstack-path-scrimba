// Arrays - ordered lists of items

// In JavaScript, an array is a special variable that can hold more than one value at a time.
// Arrays are useful for storing lists of data, such as numbers, strings, or even other arrays.

// You create an array using square brackets [] and separate items with commas.

let featuredPosts = [ // Create an array that lists your i.e. recent posts, projects, articles or similar
    "Check out my Netflix clone",
    "Here's the code for my project",
    "I've just relaunched my portfolio"
]

// Each item in the array is called an element.
// Elements can be accessed using their index (position in the array).
// Arrays are zero-indexed: the first item has index 0, the second item has index 1, and so on.

// Example: Accessing the first post
// console.log(featuredPosts[0]); // Output: "Check out my Netflix clone"

// You can store any type of data in an array, including strings, numbers, booleans, or even other arrays.

// Create an array that lists your i.e. experience, education, licenses, skills or similar
// The items of the array should be strings

let myExperience = [
    "CTO at Auto Machina Trading",
    "CTO at Cars Buyer Inc.",
    "Freelance Web and Graphic Deisgner"
]

// Make the following appear in the console:
// CTO at Cars Buyer Inc.
// Freelance Web and Graphic Deisgner
// CTO at Auto Machina Trading
// console.log(myExperience[1]);
// console.log(myExperience[2]);
// console.log(myExperience[0]);

// console.log(myExperience.length); // Output: 3 | The length property returns the number of elements in the array.
// The length is 3 because there are three strings in the array.
// Length is not zero-indexed.

// Arrays can also hold numbers and boolean values
// let sampleArray = [42, true, "hello"];

// You can add, remove, or change elements in an array using various array methods.
// For example:
// featuredPosts.push("New blog post"); // Adds a new item to the end
// featuredPosts.pop(); // Removes the last item

// Arrays are a fundamental part of JavaScript and are used in many programs to manage lists of data.

// Challenge:
// // Array - ordered list of items - coposite / complex data type

// 1. Create an array that describes yourself. Use the three primitive data types you've learned
// 2. It should contain your name (string), your age (number), and whether you like pizza (boolean)
// let aboutMe = [
//     "Mike", // string
//     44,     // number
//     true    // boolean
// ]

////////////////////////////////////////////////////////////

let cards = [7, 4]
cards.push(6)
//console.log(cards)

// Push the newMessage to the messages array, and then log out the array

let messages = [
    "Hey, how's it going?",        
    "I'm great, thank you! How about you?",
    "All good. Been working on my portfolio lately."
]

let newMessage = "Same here!"

messages.push(newMessage)
console.log(messages)

messages.pop() // removes the last item in the array.
console.log(messages)