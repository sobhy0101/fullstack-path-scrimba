// Object Constructor Function
// Create a constructor function called Gamer that takes in a name as an argument
// Each Gamer object should have the following properties:
// - name: set to the name passed in as an argument
// - score: initially set to 0
// Each Gamer object should also have a method called incrementScore that increases the score by 1 each time it's called

// Create three instances of the Gamer object with different names
// Call the incrementScore method on each instance a different number of times
// Finally, log each instance to the console to see their name and score

function Gamer(name){
    this.name = name
    this.score = 0
    this.incrementScore = function(){
        this.score++  
    }
}

const dave = new Gamer('Dave')
const sarah = new Gamer('Sarah')
const kerry = new Gamer('Kerry')
dave.incrementScore()
sarah.incrementScore()
sarah.incrementScore()
kerry.incrementScore()
kerry.incrementScore()
kerry.incrementScore()
console.log(dave)
console.log(sarah)
console.log(kerry)




