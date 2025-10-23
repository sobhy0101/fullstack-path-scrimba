// Get references to DOM elements used in the modal
const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
const consentForm = document.getElementById('consent-form')
const modalText = document.getElementById('modal-text')
const declineBtn = document.getElementById('decline-btn')
const modalChoiceBtns = document.getElementById('modal-choice-btns')


// Set a timeout to show the modal after 1.5 seconds
setTimeout(function(){
    modal.style.display = 'inline'
}, 1500)

// Add event listener to close button to hide the modal
modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none'
})

// Add event listener to decline button on mouse enter to toggle button order
declineBtn.addEventListener('mouseenter', function(){
    modalChoiceBtns.classList.toggle('reverse')
})

// Add event listener to form submit to handle consent
consentForm.addEventListener('submit', function(e){
    // Prevent the default form submission behavior
    e.preventDefault()

    // Create FormData object from the form
    const consentFormData = new FormData(consentForm) 
    // Get the full name from the form data
    const fullName = consentFormData.get('fullName')
    // Get the email from the form data
    const email = consentFormData.get('email')

    // Update modal text to show loading state
    modalText.innerHTML = `
    <div class="modal-inner-loading">
        <img src="images/loading.svg" class="loading">
        <p id="upload-text">Uploading your data to the dark web...</p>
    </div>` 
    
    // After 1.5 seconds, change the upload text
    setTimeout(function(){
        document.getElementById('upload-text').innerText = "Making the sale..."
    }, 1500)

    // After 3 seconds, show the final message and enable close button
      setTimeout(function(){
        document.getElementById('modal-inner').innerHTML = `
        <h2>Thanks <span class="modal-display-name">${fullName}</span>, you sucker! </h2>
        <p>We just sold the rights $${email} to your eternal soul.</p>
        <div class="idiot-gif">
            <img src="images/pirate.gif">
        </div>
    `
        modalCloseBtn.disabled = false
    }, 3000)

    

}) 

// classList.toggle example code - IGNORE
// classList lists all classes on an element
// toggle will switch the class on and off forever when clicked
//
// const sortBtn = document.getElementById('sort-btn')
// const container = document.getElementById('container')
                  
// sortBtn.addEventListener('click', function(){
//     container.classList.toggle('reverse')
// })