# Build a Cookie Consent Documentation

## Introduction

In this section of the Scrimba Fullstack Path's Essential JavaScript course, I built an interactive cookie consent modal. This project demonstrates fundamental concepts in JavaScript for DOM manipulation, event handling, form processing, and CSS interactions. It serves as a practical example of creating user-facing web components that respond to user actions in real-time.

## Topics Covered

- setTimeout
- element.style
- forms
- formData & .get()
- event.preventDefault
- CSS: row-reverse
- toggling classes
- 'disabled' attribute

### setTimeout

`setTimeout` is a JavaScript function that schedules the execution of a function after a specified delay, measured in milliseconds. It's useful for creating timed effects or delaying actions in user interfaces.

**Example:**

```javascript
setTimeout(function(){
    console.log("This message appears after 2 seconds");
}, 2000);
```

In the cookie consent project, `setTimeout` is used to:

- Display the modal after a 1.5-second delay when the page loads
- Update the loading text after another 1.5 seconds
- Show the final "success" message after 3 seconds total

### element.style

The `element.style` property provides direct access to an HTML element's inline CSS styles. You can read or modify style properties dynamically using JavaScript.

**Example:**

```javascript
const button = document.getElementById('myButton');
button.style.backgroundColor = 'blue';  // Changes background to blue
button.style.display = 'none';          // Hides the element
```

In the project, `modal.style.display = 'inline'` shows the modal, and `modal.style.display = 'none'` hides it when the close button is clicked.

### Forms

HTML forms are used to collect user input. In JavaScript, forms are handled through event listeners, particularly the 'submit' event, to process data before sending it to a server.

**Example:**

```html
<form id="contactForm">
    <input type="text" name="name" placeholder="Your Name">
    <input type="email" name="email" placeholder="Your Email">
    <button type="submit">Submit</button>
</form>
```

The project uses a consent form with fields for full name and email, processed entirely on the client-side for demonstration.

### FormData & .get()

`FormData` is a JavaScript object that makes it easy to construct and send form data. The `.get()` method retrieves the value of a specific form field by its name attribute.

**Example:**

```javascript
const form = document.getElementById('myForm');
form.addEventListener('submit', function(e){
    e.preventDefault();
    const formData = new FormData(form);
    const userName = formData.get('name');
    const userEmail = formData.get('email');
    console.log(`Name: ${userName}, Email: ${userEmail}`);
});
```

In the cookie consent modal, `FormData` captures the user's name and email, which are then used to personalize the final message.

### event.preventDefault()

This method stops the default action of an event from occurring. For form submissions, it prevents the page from reloading or navigating to a new URL.

**Example:**

```javascript
form.addEventListener('submit', function(e){
    e.preventDefault();  // Stops the form from submitting normally
    // Custom handling code here
});
```

Without `e.preventDefault()` in the project, the form would attempt to submit to a server, breaking the modal's flow.

### CSS: row-reverse

`flex-direction: row-reverse` is a CSS Flexbox property that reverses the order of flex items along the main axis, while maintaining the same layout direction.

**Example:**

```css
.container {
    display: flex;
    flex-direction: row-reverse;  /* Items flow from right to left */
}
```

In the project, the `.reverse` class applies `flex-direction: row-reverse` to swap the positions of the "Accept" and "Decline" buttons when hovering over the decline button.

### Toggling Classes

`classList.toggle()` adds a class to an element if it doesn't have it, or removes it if it does. This is useful for creating interactive states.

**Example:**

```javascript
const button = document.getElementById('toggleBtn');
button.addEventListener('click', function(){
    document.body.classList.toggle('dark-mode');  // Toggles dark mode on/off
});
```

The project uses `modalChoiceBtns.classList.toggle('reverse')` to switch the button order on mouse enter over the decline button.

### 'disabled' Attribute

The `disabled` property controls whether an element is enabled or disabled. Disabled elements cannot be interacted with and are often styled differently.

**Example:**

```javascript
const submitBtn = document.getElementById('submitBtn');
submitBtn.disabled = true;   // Disables the button
submitBtn.disabled = false;  // Enables it again
```

In the modal, the close button starts disabled during the "processing" phase and is re-enabled once the fake upload completes.

## Diagrams

![Flowchart showing setTimeout execution: Start -> setTimeout called -> Delay period -> Callback function executes -> End](setTimeout-flowchart.png)

*Alt text: Create a vertical flowchart with boxes for 'JavaScript Execution', 'setTimeout(delay, callback)', 'Time passes (delay ms)', 'Callback Function Runs'. Use arrows to connect them.*

![Diagram of DOM element structure showing element.style property access](dom-element-style-diagram.png)

*Alt text: Draw an HTML element box with properties like id, class, and a style object containing CSS properties. Show an arrow from JavaScript code to the style.display property.*

![Illustration of flex-direction: row vs row-reverse](flex-direction-diagram.png)

*Alt text: Two side-by-side diagrams: Left shows normal row with items 1-2-3 left to right, right shows row-reverse with items 3-2-1 right to left.*

## Conclusion

This section provided hands-on experience with essential JavaScript concepts for building interactive web applications. By creating a cookie consent modal, I learned how to combine DOM manipulation, event handling, form processing, and CSS interactions to create engaging user experiences. These skills form the foundation for more complex frontend development and are crucial for modern web applications that require user input and dynamic content updates.

## External Learning References

- [MDN Web Docs: setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) - Comprehensive guide to setTimeout with examples
- [MDN Web Docs: HTMLElement.style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) - Documentation on inline style manipulation
- [MDN Web Docs: FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) - Guide to working with form data in JavaScript
- [MDN Web Docs: Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) - Explanation of preventing default event behavior
- [CSS Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - In-depth flexbox tutorial including flex-direction
- [MDN Web Docs: Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) - Documentation on classList methods including toggle
- [MDN Web Docs: HTML attribute: disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) - Guide to the disabled attribute and property
