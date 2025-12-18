/**
Challenge:

1. Fetch a random image from the Dog API again 
(https://dog.ceo/api/breeds/image/random)

2. Access the DOM and insert the URL you got from the
API as an image `src` property (probably easiest if 
you create the image completely here in the JS and add 
it as the innerHTML of another element on the DOM)
*/

// fetch('https://dog.ceo/api/breeds/image/random')
//   .then(response => response.json())
//   .then(data => {
//     const imgUrl = data.message;
//     const dogImageElement = document.getElementById('dog-image');
//     dogImageElement.innerHTML = `<img src="${imgUrl}" alt="Random Dog Image" />`;
//   });

fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json()) 
    // response is the HTTP response object. 
    // .json() parses it and returns a Promise that resolves to the data
    
    .then(data => { 
    // data is the resolved parsed JSON object from the previous Promise
        console.log(data)
        document.getElementById("dog-image").innerHTML = `
            <img src="${data.message}" alt="Random Dog Image" width="300"/>
        `
    })


/**
Challenge: 

1. Fetch a random activity from the Bored API
url: https://apis.scrimba.com/bored/api/activity

2. Display the text of the activity in the browser
*/

fetch('https://apis.scrimba.com/bored/api/activity')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    document.getElementById('breed-ideas').innerText = data.activity
  })