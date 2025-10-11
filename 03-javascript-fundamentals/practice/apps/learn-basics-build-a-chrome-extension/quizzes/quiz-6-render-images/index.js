// Create a function that renders the three team images
// Use a for loop, template strings (``), plus equals (+=)
// .innerHTML to solve the challenge.


const imgs = [
    "images/hip1.jpg",
    "images/hip2.jpg",
    "images/hip3.jpg"
]

let imageContainer = document.getElementById("container")
// This function runs the renderImages function three times, once for each image in the imgs array
// Too much dom manipulation is bad for performance.
// There is a better way to do this:
function renderImages() {
    let images = "";
    for (let i = 0; i < imgs.length; i++){
        images += 
        `
        <img alt="Team Member" class="team-img" src=${imgs[i]}>
        `
    }
    imageContainer.innerHTML = images;
}

renderImages()