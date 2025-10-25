import { catsData } from "./data.js"

const emotionRadios = document.getElementById("emotion-radios")

emotionRadios.addEventListener('change', highlightCheckedOption)

function highlightCheckedOption(e){
/*
Challenge:
1. Create an array of all items that have 
   the "radio" class.
2. Iterate over the array and remove the 
   "highlight" class from each one.
*/ 
    const radioItems = document.getElementsByClassName('radio')
    for (let item of radioItems){
        item.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}
 

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
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