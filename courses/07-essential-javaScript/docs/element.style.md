# element.style

The `element.style` property in JavaScript allows you to access and modify the **inline CSS** styles of an HTML element. This property is useful for dynamically changing the appearance of elements on a web page. Since it uses inline styles, any changes made using `element.style` will override styles defined in external, internal, or inherited stylesheets for the specific properties being modified. Use it wisely to avoid conflicts with existing styles.

## Syntax

```javascript
element.style.property = value;
```

- `element`: The HTML element you want to modify. You can obtain a reference (variable) to the element using methods like `getElementById`, `querySelector`, etc.
- `property`: The CSS property you want to change (e.g., `backgroundColor`, `fontSize`).
- `value`: The new value for the CSS property (e.g., `'red'`, `'16px'`).

## Example

```javascript
const modal = document.getElementById('modal');
modal.style.display = 'block';
modal.style.backgroundColor = '#f0f8ff';
```

## Practical Use Case

In the context of a web application, you might use `element.style` to change the appearance of a modal dialog when it is opened, providing visual feedback to the user.

```javascript
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close-btn');

setTimeout(function(){
    modal.style.display = 'block';
    modal.style.backgroundColor = '#f0f8ff';
    modalCloseBtn.removeAttribute('disabled');
}, 1500);

modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none';
});


## Conclusion

The `element.style` property is a powerful tool for dynamically changing the appearance of HTML elements. By understanding its syntax and practical use cases, you can create more interactive and visually appealing web applications. Just remember to use inline styles judiciously to avoid conflicts with existing styles.
