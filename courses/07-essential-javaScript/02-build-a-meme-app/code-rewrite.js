// Import data and utility functions for the meme app
import { catsData } from "./data.js";
import { capitalizeFirstLetter } from "./utils.js";

// Get DOM elements for interaction
const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')

// Add event listeners to handle user interactions
emotionRadios.addEventListener( 'change', highlightCheckedOption )
getImageBtn.addEventListener( 'click', getMatchingCatsArray )

// Function to highlight the selected emotion radio button
function highlightCheckedOption(event) {
    // Get all radio elements and remove highlight class from them
    const radios = document.getElementsByClassName('radio')
        for (let radio of radios) {
            radio.classList.remove('highlight')
        }
        // Add highlight class to the parent of the checked radio
        document.getElementById(event.target.id).parentElement.classList.add('highlight')
}

// Function to get an array of cats matching the selected emotion and GIF preference
function getMatchingCatsArray() {
    // Check if a radio button is selected
    if (document.querySelector('input[type="radio"]:checked')) {
        // Get the value of the selected emotion
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        // Check if GIFs only is selected
        const isGif = gifsOnlyOption.checked
        // Filter catsData to find matching cats
        const matchingCatsArray = catsData.filter(function (cat) {
            if (isGif) {
                // For GIFs, check if emotion matches and it's a GIF
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                // Otherwise, just check if emotion matches
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        // Return the filtered array
        console.log(matchingCatsArray)
        return matchingCatsArray
    }
}

// Function to extract unique emotions from the cats data
function getEmotionsArray(cats) {
    // Initialize an empty array for emotions
    const emotionsArray = []
    // Loop through each cat
    for (let cat of cats) {
        // Loop through each emotion tag of the cat
        for (let emotion of cat.emotionTags) {
            // If emotion not already in array, add it
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    // Return the array of unique emotions
    console.log(emotionsArray)
    return emotionsArray
}

// Function to render radio buttons for each emotion
function renderEmotionsRadios(cats) {
    // Initialize a string for radio items HTML
    let radioItems = ``
    // Get unique emotions
    const emotions = getEmotionsArray(cats)
    // Loop through each emotion to build HTML
    for (let emotion of emotions) {
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${capitalizeFirstLetter(emotion)}</label>
            <input
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="emotions"/>
            </div>
        `
    }
    // Set the innerHTML of emotionRadios to the generated radio items
    emotionRadios.innerHTML = radioItems
}

// Call the function to render radios on page load
renderEmotionsRadios(catsData)
// Log the cats data for debugging
console.log(catsData)