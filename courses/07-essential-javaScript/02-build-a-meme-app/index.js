import { catsData } from "./data.js"

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById('get-image-btn')
getImageBtn.addEventListener('click', getMatchingCatsArray)

function getMatchingCatsArray(){
    const checkedRadio = document.querySelector('input[type="radio"]:checked').value
    
    /*
Challenge:
1. Use the .filter() and .includes() methods to get 
   an array of cats which have the selected emotion
   in their emotionTags array. 
2. Store this array in a const and log it out to check
   it's working. Think: what would be a good name for the
   const?
*/  

    const matchingCats = catsData.filter(function(cat){
    return cat.emotionTags.includes(checkedRadio)
})
console.log(matchingCats)
    // const matchingCats = catsData.filter(cat => cat.emotionTags.includes(checkedRadio))
    // console.log(matchingCats)
}


emotionRadios.addEventListener('change', highlightCheckedOption)

function highlightCheckedOption(e){
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