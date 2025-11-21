# JavaScript Array Reduce Method

## Overview

The `.reduce()` method is a powerful array method in JavaScript used to "reduce" an array of values down to a single value. It executes a "reducer" callback function on each element of the array, passing in the return value from the calculation on the preceding element.

Think of it like a snowball rolling down a hill: it starts small (initial value) and gathers more snow (values from the array) as it rolls, eventually becoming one giant snowball (the final result).

## Understanding the Parameters

A common point of confusion is naming the parameters in the callback function. The `.reduce()` callback always expects arguments in a specific order, regardless of what data is inside your array objects.

Syntax:

```javascript
array.reduce((accumulator, currentItem) => {
    // logic
}, initialValue);
```

1. **Accumulator (`total`)**:
    * This is the "running total" or storage bucket.
    * It holds the accumulated result of the previous iterations.
    * It starts equal to the `initialValue` you provide (e.g., `0`).

2. **Current Item (`currentStudent`)**:
    * This represents the **entire element** currently being processed in the array.
    * If your array contains objects, this parameter **is the object itself**.
    * You cannot pass property names (like `name` or `grade`) directly as parameters here. Instead, you access them *on* this parameter (e.g., `currentStudent.grade`).

## Code Examples

### 1. Basic Sum of Numbers

Calculating the sum of a simple array of numbers.

```javascript
const numbers = [10, 20, 30, 40];

const sum = numbers.reduce((total, currentNumber) => {
    return total + currentNumber;
}, 0);

console.log(sum); // Output: 100
```

### 2. Summing Properties in an Array of Objects

This example mirrors the student grades scenario. We want to sum up the `grade` property for all students.

```javascript
const studentsArr = [
    { name: 'Mike', grade: 75 },
    { name: 'Emma', grade: 83 },
    { name: 'Seth', grade: 66 }
];

const totalGrades = studentsArr.reduce((total, currentStudent) => {
    // 'total' is the accumulator (starts at 0)
    // 'currentStudent' is the whole object { name: '...', grade: ... }
    return total + currentStudent.grade;
}, 0);

console.log(totalGrades); // Output: 224
```

**Key Takeaway**: We use `currentStudent.grade` because `currentStudent` is the variable holding the object. The `.reduce()` method doesn't know about the specific properties inside your objects until you access them.

## References

* [MDN Web Docs: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) - The most comprehensive documentation.
* [W3Schools: JavaScript Array reduce()](https://www.w3schools.com/jsref/jsref_reduce.asp) - Simple examples and definitions.
* [JavaScript.info: Array methods](https://javascript.info/array-methods#reduce-reduceright) - Detailed tutorial on array methods including reduce.
