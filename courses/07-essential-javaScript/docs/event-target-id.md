# Event Target ID

The Event Target ID is a unique identifier for the target element of an event in the DOM (Document Object Model). It is used to determine which element triggered the event and can be useful for event delegation and handling.

## How to Access the Event Target ID

In JavaScript, you can access the Event Target ID through the `event` object that is passed to the event handler function. The `event.target` property refers to the element that triggered the event.

### Example

```javascript
document.addEventListener('click', function(event/*or 'e' */) {
  console.log('Event Target ID:', event.target.id);
});
```

In this example, when a click event occurs, the ID of the target element is logged to the console.

## Use Cases

- **Event Delegation**: You can use the Event Target ID to identify which child element triggered the event when using a single event listener on a parent element.
- **Dynamic Content**: When working with dynamically generated content, the Event Target ID can help you determine which element was interacted with.

## Conclusion

The Event Target ID is a powerful tool for managing events in the DOM. By understanding how to access and use it, you can create more efficient and effective event handling in your web applications.
