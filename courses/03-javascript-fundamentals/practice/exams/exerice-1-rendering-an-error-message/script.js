// When the user clicks the purchase button, render out
// "Something went wrong, please try again" in the paragraph
// that has the id="error".


function errorMessage() { 
    // Grab the element with id="error" and update its VISIBLE text.
    // innerText only shows what the user actually sees on the screen,
    // and it ignores hidden text or text styled with "display: none".
    // Example: if the element has a class that hides it, innerText will not show that text.
    // This is useful for showing messages that the user should see.
    document.getElementById("error").innerText = "Something went wrong, please try again";

    // Grab the same element again and update ALL of its text content.
    // textContent includes hidden text too, ignores CSS visibility,
    // and is usually faster/more consistent in real-world use.
    // Example: if the element has hidden text, textContent will show that text.
    // This is useful for updating the element's content regardless of visibility.
    document.getElementById("error").textContent = "Something went wrong, please try again";
}