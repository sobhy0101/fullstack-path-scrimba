# setTimeout() Method

The `setTimeout()` method is a built-in JavaScript function that allows you to execute a piece of code after a specified delay (in milliseconds). It is commonly used for creating delays, scheduling tasks, and managing asynchronous operations.

## Syntax

```javascript
setTimeout(function, delay)
```

- `function`: The function to be executed after the delay.
- `delay`: The time to wait before executing the function, in milliseconds.

## Example

```javascript
console.log('What is the capital of Peru?')

setTimeout(function(){
    console.log('Lima')
}, 3000)

setTimeout(function(){
    console.log('Ready for next question?')
}, 4000)
```

## Challenge

1. Log out the phrase "Modal Opened!" after a 1.5 second delay.

```javascript
setTimeout(function(){
    console.log('Modal Opened!')
}, 1500)

setTimeout(function(){
    console.log("One day, I will be an Awsome developer! 🤲🏻")
},6000)
```

## Practical Use Case

In the context of a web application, you might use `setTimeout()` to display a modal dialog after a certain period of time and changing the background color using inline styles, allowing users to see important information without interrupting their experience.

```javascript
const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')

setTimeout(function(){
    modal.style.display = 'block'
    modal.style.backgroundColor = '#f0f8ff'
    modalCloseBtn.removeAttribute('disabled')
}, 1500)

modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none'
})
