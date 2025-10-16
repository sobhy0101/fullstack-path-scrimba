# CSS Specificity

In this lesson, we will learn about CSS specificity and how the browser decides which CSS rule to apply when there are multiple rules that could apply to the same element.

## What is CSS Specificity?

CSS specificity is a set of rules that browsers use to determine which styles are applied to an element. When multiple CSS rules could apply to the same element, the browser uses specificity to decide which rule takes precedence.

## How Specificity Works

Specificity is calculated based on the types of selectors used in a rule. The more specific a selector is, the higher its specificity score. Here are the different types of selectors, ranked from least to most specific:

1. **Type selectors** (e.g., `div`, `p`, `h1`) have the lowest specificity.
2. **Class selectors** (e.g., `.class-name`) have a higher specificity than type selectors.
3. **ID selectors** (e.g., `#id-name`) have an even higher specificity.
4. **Inline styles** (e.g., `style="color: red;"`) have the highest specificity.

## Specificity Hierarchy

When calculating specificity, each type of selector is assigned a score:

- Type selectors: 1 point
- Class selectors: 10 points
- ID selectors: 100 points
- Inline styles: 1000 points

The browser adds up the points for all selectors in a rule to determine its overall specificity score. When two rules have the same specificity score, the one that appears later in the CSS file takes precedence.

## General good practices

- General styles: use type selectors for general styles that apply to many elements, like `p`, `h1`, etc.
- Everything else: use class selectors for most of your styling needs. Classes are reusable and help keep your CSS organized.

Most developers avoid using ID selectors for styling because they are very specific and can make your CSS harder to maintain. Instead, reserve IDs for JavaScript hooks or unique elements that need special handling.

## Example

Consider the following CSS rules:

```css
p {
    color: blue; /* 1 point */
}

.class-name {
    color: green; /* 10 points */
}

#id-name {
    color: red; /* 100 points */
}
```

With the following HTML:

```html
<div class="class-name" id="id-name">Hello World</div>
```

While the highest specificity rule will apply by using inline styles:

```html
<div class="class-name" id="id-name" style="color: yellow;">Hello World</div> <!-- 1000 points -->
```

Which provides the highest specificity with a 1000 points and will force the text yellow even though the ID selector has a higher specificity than the class and type selectors. It is not recommended to use inline styles as it makes your code harder to maintain. Always try to use classes and IDs to style your elements.

In this example, the `<div>` element has both a class and an ID. The specificity scores/points for each rule are as follows:

- `p`: 1 point
- `.class-name`: 10 points
- `#id-name`: 100 points
- Inline style: 1000 points

Since the ID selector has the highest specificity, the text "Hello World" will be red.

## Conclusion

Understanding CSS specificity is crucial for writing effective stylesheets. By knowing how specificity works, you can avoid common pitfalls and ensure that your styles are applied as intended.
