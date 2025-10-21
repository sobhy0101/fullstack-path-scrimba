// console.log('What is the capital of Peru?')

// // setTimeout(function(){}, delay) // <- syntax for setTimeout
// setTimeout(function(){ // An empty funcation like this is called anonymous function
//     console.log('Lima')
// }, 3000) // JS uses milliseconds for time, so 3000ms = 3s

// setTimeout(function(){
//     console.log('Ready for next question?')
// }, 4000)

// /////////////////// Challenge ///////////////////
// // Challenge:
// // 1. Log out the phrase "Modal Opened!" 
// //    after a 1.5 second delay.

// setTimeout(function(){
//     console.log('Modal Opened!')
// }, 1500)

// setTimeout(function(){
//     console.log("One day, I will be an Awsome developer! 🤲🏻")
// },6000)

const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')

setTimeout(function(){
    modal.style.display = 'block' // The .style property allows us to access and modify the inline CSS styles of an element. 
    // Test
    modal.style.backgroundColor = '#f0f8ff' // So style is like calling the CSS property directly, then we add the specific property we want to change. In this case, we are changed the background color property to this shade of white.
    modalCloseBtn.removeAttribute('disabled') // This line removes the disabled attribute from the modalCloseBtn element, enabling the button to be clickable after the modal appears.
}, 1500)

modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none' // When the close button is clicked, this line sets the display style of the modal element to 'none', effectively hiding it from view.
})