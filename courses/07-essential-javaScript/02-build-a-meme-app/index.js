import { catsData } from "./data.js"

const emotionRadios = document.getElementById("emotion-radios")

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            emotionsArray.push(emotion)
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){

/*
Challenge:
1. Swap out `<p>${emotion}</p>` for HTML
   that will render a radio input for each
   emotion. Remember to use "type", "id", 
   "value", and "name" properties on each radio.
   ("id" and "value" can both be set to the
   "emotion").
2. Remember to give each radio a label.
   (What property does a label need?)
3. Enclose each individual radio input in this div:

*/ 

        radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input type="radio" id="${emotion}" name="emotion" value="${emotion}">
            </div>
        `
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)