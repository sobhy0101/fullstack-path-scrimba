# For...of Loops

The `for...of` loop is a modern way to iterate over iterable objects such as arrays, strings, maps, and sets. It provides a simpler and more readable syntax compared to traditional loops like `for` or `while`.

## Syntax

```javascript
for (const element of iterable) {
    // Code to execute for each element
}
```

## Example

```javascript
const fruits = ['apple', 'banana', 'cherry'];

for (const fruit of fruits) {
    console.log(fruit); // Outputs: apple, banana, cherry
}
```

## Array of Objects Example

```javascript
const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 }
];

for (const user of users) {
    console.log(`${user.name} is ${user.age} years old.`);
}
```

**To achieve the same with a for loop:**

```javascript
for (let i = 0; i < users.length; i++) {
    const user = users[i];
    console.log(`${user.name} is ${user.age} years old.`);
}
```

**Using for...of loop to iterate over nested arrays:**

```javascript
const nestedArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (const innerArray of nestedArray) {
    for (const num of innerArray) {
        console.log(num);
    }
}
```

## Key Differences from For Loops

1. **Simplicity**: The `for...of` loop eliminates the need for a counter variable and makes the code cleaner.
2. **Direct Access**: It directly accesses the values of the iterable, rather than the indices.
3. **Works with Any Iterable**: It can be used with any iterable object, not just arrays.

## When to Use

- When you need to iterate over the values of an iterable without needing the index.
- When working with complex data structures like maps or sets.
- When you want cleaner and more readable code.

## References

- [MDN Web Docs: for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
- [W3Schools: for...of](https://www.w3schools.com/js/js_loop_forof.asp)
- [JavaScript Tutorial: for...of](https://www.javascripttutorial.net/javascript-for-of/)

## Conclusion

The `for...of` loop is a powerful tool for iterating over iterable objects in JavaScript. Its simplicity and readability make it a preferred choice in many situations. By understanding its syntax and use cases, you can write more efficient and maintainable code.
