import { catsData } from "./data.js"

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById('get-image-btn')

getImageBtn.addEventListener('click', getMatchingCatsArray)

function getMatchingCatsArray(){
/*
Challenge:
1. Add code to getMatchingCatsArray so 
   that the two existing lines of code 
   only run if an emotion has been selected.
*/
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        console.log(selectedEmotion)
    } else {
        console.log('Please select an emotion')
    }
}

emotionRadios.addEventListener('change', highlightCheckedOption)

function highlightCheckedOption(e) {
    const radioItems = document.getElementsByClassName('radio')
    for (let item of radioItems) {
        item.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}


function getEmotionsArray(cats) {
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats) {
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions) {
        radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion.charAt(0).toUpperCase() + emotion.slice(1)}</label>
                <input type="radio" id="${emotion}" name="emotion" value="${emotion}">
            </div>
        `
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)