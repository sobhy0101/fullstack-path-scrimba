# Regular Expressions

Regular expressions (regex) are patterns used to match character combinations in strings. In JavaScript, regular expressions are objects that can be created using the `RegExp` constructor or by using regex literals.

## Creating Regular Expressions

1. **Using Regex Literals**: This is the most common way to create a regex. You enclose the pattern in forward slashes.

   ```javascript
   const regex = /pattern/;
   ```

2. **Using the RegExp Constructor**: This method is useful when you need to create a regex dynamically.

   ```javascript
   const regex = new RegExp('pattern');
   ```

## Basic Syntax

- `.`: Matches any single character except newline.
- `*`: Matches 0 or more occurrences of the preceding element.
- `+`: Matches 1 or more occurrences of the preceding element.
- `?`: Matches 0 or 1 occurrence of the preceding element.
- `^`: Matches the beginning of a string.
- `$`: Matches the end of a string.
- `[]`: Matches any one of the enclosed characters.
- `|`: Acts as a logical OR.

## Example

```javascript
const regex = /hello/;
const str = "hello world";
console.log(regex.test(str)); // true
```

## HTML input validation example

```html
<form id="myForm">
  <input type="text" id="name" name="name" required>
  <input type="email" id="email" name="email" required>
  <input type="text" id="countryCode" name="countryCode" pattern="[A-Za-z]{3}" required>  <!-- 3-letter country code pattern -->
  <button type="submit">Submit</button>
</form>
```

## Flags

Regular expressions can have flags that modify their behavior:

- `g`: Global search (find all matches).
- `i`: Case-insensitive search.
- `m`: Multiline search.

## Example with Flags

```javascript
const regex = /hello/i;
const str = "Hello world";
console.log(regex.test(str)); // true
```

## References

- [MDN Web Docs: Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

## Conclusion

Regular expressions are a powerful tool for pattern matching and text manipulation in JavaScript. They can be complex, but understanding the basics will help you use them effectively.
