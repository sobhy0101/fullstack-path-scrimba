# Overflow

When content overflows its container, you can control what happens with the `overflow` property.

```css
.container {
    overflow: hidden;
}
```

The `overflow` property has several possible values:

- `visible`: The content will overflow the container and be visible outside of it.
- `hidden`: The content will be clipped and not visible outside of the container.
- `scroll`: The container will provide a scrollbar to view the overflowing content.
- `auto`: The browser will decide whether to add a scrollbar based on the content.

You can also control the overflow behavior for horizontal and vertical directions separately using `overflow-x` and `overflow-y`.

```css
.container {
    overflow-x: auto;
    overflow-y: hidden;
}
```

This allows for more granular control over how content is displayed within its container.

## Exercise

In the NFT website project, add classes to the links in both sections and style them in the CSS file. Use common styles for both buttons.

1. In the HTML file, add classes to the links in both sections:
   - For the first section, add classes like `buy-nft-btn` and `more-info-btn`.
   - For the second section, add classes like `about-us-btn` and `contact-btn`.

2. In the CSS file, style the buttons using the classes you just created. Use common styles for both buttons to keep the CSS DRY.
3. Use the `overflow` property if necessary to ensure that the buttons display correctly within their containers.
4. Test your changes to ensure that the buttons look good and function as expected.

```css
/* 
 ⚠️ In this exercise, you'll need to add classes to the links in both sections of the HTML file
    and style them in the CSS file. Use common styles for both buttons
*/
/* 
 ⚠️ In this exercise, you'll need to add classes to the links in both sections of the HTML file
    and style them in the CSS file. Use common styles for both buttons
    to avoid repeating styles where possible.
 ⚠️ Think: what would make good class
    names for these links? 
*/  
/*
 ⚠️ In this exercise, you'll need to add classes to the links in both sections of the HTML file
    and style them in the CSS file. Use common styles for both buttons
    to avoid repeating styles where possible.
    */
```

## Resources

- [MDN Web Docs: overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
- [CSS-Tricks: A Complete Guide to CSS Overflow](https://css-tricks.com/almanac/properties/o/overflow/)
- [W3Schools: CSS overflow Property](https://www.w3schools.com/cssref/pr_pos_overflow.asp)
