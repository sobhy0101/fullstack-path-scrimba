const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
const modalSubmitBtn = document.getElementById('modal-submit-btn')
const consentForm = document.getElementById('consentForm')

setTimeout(function(){
    modal.style.display = 'block' // The .style property allows us to access and modify the inline CSS styles of an element. 
    // Test
    // modal.style.backgroundColor = '#f0f8ff' // So style is like calling the CSS property directly, then we add the specific property we want to change. In this case, we are changed the background color property to this shade of white.
    modalCloseBtn.removeAttribute('disabled') // This line removes the disabled attribute from the modalCloseBtn element, enabling the button to be clickable after the modal appears.
}, 1500)

consentForm.addEventListener('submit', function(event){
    event.preventDefault()
})

modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none' // When the close button is clicked, this line sets the display style of the modal element to 'none', effectively hiding it from view.
})

// modalSubmitBtn.addEventListener('click', function(event){
//     modal.style.display = 'none' // Hide the modal
// })