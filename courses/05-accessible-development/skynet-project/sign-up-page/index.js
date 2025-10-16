function sendMessage() {
    // Get the button element
    const button = document.getElementById('submitButton');
    
    // Replace the button with a paragraph
    button.outerHTML = '<p id="submitMessage" class="submit-message" aria-live="polite">Message sent! ✅</p>';
    
    // Get the home link element and add focus to it
    document.getElementById('backHome').focus();
}