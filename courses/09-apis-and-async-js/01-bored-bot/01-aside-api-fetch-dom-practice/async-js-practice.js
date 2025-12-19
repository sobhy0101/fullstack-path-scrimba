console.log("The first console log")

fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => console.log(data))

console.log("The second console log")

for (let i = 0; i < 100; i++) {
    console.log("I'm inside the for loop")
}