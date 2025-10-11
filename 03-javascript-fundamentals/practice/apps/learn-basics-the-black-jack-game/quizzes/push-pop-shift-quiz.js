let largeCountries = ["Tuvalu","India","USA","Indonesia","Monaco"]

// You need to help me fixup the largeCountries array so that 
// China and Pakistan are added back into their respective places

// Use push() & pop() and their counterparts unshift() & shift()
// Google how to use unshift() and shift()

// My solution:
// let removeTuvalu = largeCountries.shift()
// let removeMonaco = largeCountries.pop()
// let firstChina = largeCountries.unshift("China")
// let addPakistan = largeCountries.push("Pakistan")
// console.log(largeCountries)

// Optimal solution:
largeCountries.shift();
largeCountries.pop();
largeCountries.unshift("China");
largeCountries.push("Pakistan");
console.log(largeCountries);