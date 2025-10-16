let data = [
    {
        player: "Jane",
        score: 52
    }, 
    {
        player: "Mark",
        score: 41
    },
    {
        player: "Mike",
        score: 124
    }
]

// Fetch the button from the DOM, store it in a variable
// Use addEventListener() to listen for button clicks
// Log Jane's score when the button is clicked (via data)
// const button = document.getElementById("my-button")
// button.addEventListener("click", function() {
//     console.log(data[0].score)
// })

const mainButton = document.getElementById("my-button")
mainButton.addEventListener("mouseover", function() {
    console.log(data[0].player, data[0].score)
    console.log(data[1].player, data[1].score)
    console.log(data[2].player, data[2].score)
}
)

mainButton.addEventListener("mouseout", function(){
    console.clear( )
})