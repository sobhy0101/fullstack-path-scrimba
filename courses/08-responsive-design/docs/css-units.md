# CSS Units: Absolute, Relative, and Percentage

## Table of Contents

1. [Introduction](#introduction)
2. [Absolute Units](#absolute-units)
3. [Relative Units](#relative-units)
4. [Percentage Units](#percentage-units)
5. [Viewport Units](#viewport-units)
6. [Comparison Table](#comparison-table)
7. [References](#references)
8. [Credits](#credits)

---

## Introduction

CSS units are fundamental to responsive web design. They define measurements for properties like font-size, width, height, margins, and padding. Understanding the difference between absolute and relative units is crucial for creating flexible, responsive layouts that adapt beautifully across all devices.

---

## Absolute Units

### Overview

Absolute units are **fixed and unchanging**. They don't scale based on parent elements or viewport size. They are best used for physical outputs (like print stylesheets) but generally **avoided in responsive web design**.

### Common Absolute Units

#### 1. **Pixels (px)**

**Description:**
The most common absolute unit. One pixel represents a single dot on the screen. It's an absolute unit because the size remains constant regardless of other factors.

**Code Example:**

```css
/* Text styling with pixels */
body {
  font-size: 16px;
  line-height: 24px;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

.button {
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid #333;
}

.container {
  width: 1200px;
  height: 600px;
}
```

**Mini Comparison:**

- **Pros:** Simple to use, predictable, widely supported
- **Cons:** Not responsive, doesn't scale with user preferences or device size

**When to Use:**

- Borders
- Box shadows
- Small fixed-size elements
- Not recommended for: font-size, width, height, padding, margins

---

#### 2. **Points (pt)**

**Description:**
Traditional typography unit used in print media. One point equals 1/72 of an inch. Rarely used in web design.

**Code Example:**

```css
/* Print stylesheet example */
@media print {
  body {
    font-size: 12pt;
    line-height: 14pt;
  }
  
  h1 {
    font-size: 18pt;
  }
}
```

**Mini Comparison:**

- **Pros:** Standard in typography, useful for print
- **Cons:** Not suitable for responsive web design

---

#### 3. **Centimeters (cm), Millimeters (mm), Inches (in)**

**Description:**
Physical measurement units rarely used in web design. 1in = 2.54cm = 25.4mm

**Code Example:**

```css
/* Rarely used in web design */
@media print {
  body {
    margin: 2cm;
  }
  
  .page {
    width: 21cm;  /* A4 width */
    height: 29.7cm; /* A4 height */
  }
}
```

**Mini Comparison:**

- **Pros:** Useful for print stylesheets
- **Cons:** Meaningless for screen displays, not responsive

---

## Relative Units

### Relative Units - Overview

Relative units scale based on other elements or contexts. They are **ideal for responsive design** because they adapt to different screen sizes and user preferences.

### Common Relative Units

#### 1. **Em (em)**

**Description:**
Em is relative to the font-size of the **parent element**. If parent font-size is 16px, 1em = 16px. If parent is 12px, 1em = 12px.

**Code Example:**

```css
/* Em example */
body {
  font-size: 16px;
}

.container {
  font-size: 1.2em; /* 1.2 × 16px = 19.2px */
  padding: 2em;     /* 2 × 19.2px = 38.4px */
  margin-bottom: 1.5em; /* 1.5 × 19.2px = 28.8px */
}

.nested {
  font-size: 1.5em; /* 1.5 × 19.2px = 28.8px (not 24px!) */
  padding: 1em;     /* 1 × 28.8px = 28.8px */
}

h1 {
  font-size: 2em;   /* 2 × 16px = 32px */
}

/* Scaling example */
button {
  font-size: 1em;
  padding: 0.5em 1em;
  border-radius: 0.25em;
}
```

**Mini Comparison:**

- **Pros:** Scalable, relative to parent font-size, great for components
- **Cons:** Can be confusing with nested elements (compounding effect)

**When to Use:**

- Padding and margins on elements with font-size changes
- Creating scalable components
- Font-size adjustments

---

#### 2. **Rem (rem)**

**Description:**
Rem stands for "root em". It's relative to the **root element's (html) font-size**, not the parent. This eliminates the compounding effect of em units.

**Code Example:**

```css
/* Rem example */
html {
  font-size: 16px; /* Base font size */
}

body {
  font-size: 1rem; /* 16px */
}

.container {
  font-size: 1.2rem; /* 1.2 × 16px = 19.2px */
  padding: 2rem;     /* 2 × 16px = 32px (always) */
}

.nested {
  font-size: 1.5rem; /* 1.5 × 16px = 24px (consistent!) */
  padding: 1rem;     /* 1 × 16px = 16px (consistent!) */
}

h1 {
  font-size: 2rem;   /* 2 × 16px = 32px */
  margin-bottom: 1.5rem; /* 1.5 × 16px = 24px */
}

.small-text {
  font-size: 0.875rem; /* 0.875 × 16px = 14px */
}

/* Responsive scaling */
@media (max-width: 768px) {
  html {
    font-size: 14px; /* All rem units scale down proportionally */
  }
}
```

**Mini Comparison:**

- **Pros:** Consistent scaling, no nesting confusion, excellent for responsive design
- **Cons:** Slight compatibility with very old browsers

**When to Use:**

- **Best for:** Font sizes, padding, margins, borders, heights, widths
- Recommended as the primary unit in modern responsive design

---

#### 3. **Ex and Ch**

**Description:**

- **Ex:** Relative to the x-height of the font (height of the letter 'x')
- **Ch:** Relative to the width of the character '0' (zero)

**Code Example:**

```css
/* Ex unit - rarely used */
p {
  line-height: 1.5ex;
}

/* Ch unit - useful for code or monospace text */
code {
  max-width: 80ch; /* Limit to 80 characters per line */
  overflow-x: auto;
  padding: 1ch;
}

pre {
  padding: 1ch 2ch;
}

/* Monospace input */
input[type="password"] {
  letter-spacing: 0.3ch;
}
```

**Mini Comparison:**

- **Pros:** Semantic for specific use cases
- **Cons:** Rarely used, limited browser support for some properties

---

## Percentage Units

### Percentage Units - Overview

Percentage units are **relative to the parent element's size**. They're flexible and essential for creating responsive layouts.

**Code Example:**

```css
/* Percentage example */
.container {
  width: 100%; /* Full width of parent */
  max-width: 1200px;
}

.column {
  width: 50%;  /* Half of parent width */
  float: left;
}

.grid-item {
  width: 33.333%; /* Three columns */
  float: left;
}

/* Responsive grid */
.responsive-grid {
  display: flex;
  flex-wrap: wrap;
}

.responsive-grid > div {
  flex: 1 1 33.333%; /* Flexible columns */
  padding: 20px;
}

/* Font size percentage */
html {
  font-size: 100%; /* Respects user browser preferences */
}

body {
  font-size: 1.125rem; /* 18px on 16px base */
}

.small {
  font-size: 80%; /* 80% of parent font-size */
}

.large {
  font-size: 125%; /* 125% of parent font-size */
}

/* Responsive padding */
.box {
  width: 100%;
  padding: 5%;  /* Padding scales with width */
}
```

**Mini Comparison:**

- **Pros:** Highly responsive, creates flexible layouts, perfect for grids
- **Cons:** Always relative to parent (must understand context), can be confusing with nested elements

**When to Use:**

- Width and height of containers
- Creating responsive grids and layouts
- Responsive padding/margins
- Font-size adjustments relative to parent

---

## Viewport Units

### Viewport Units - Overview

Viewport units are relative to the **viewport (browser window) size**. They're powerful for creating truly responsive designs that adapt to any screen size.

### Common Viewport Units

#### 1. **Viewport Width (vw)**

**Description:**
1vw = 1% of the viewport width. If viewport is 1000px wide, 1vw = 10px.

**Code Example:**

```css
/* Viewport width example */
.hero {
  width: 100vw;     /* Full viewport width */
  height: 100vh;    /* Full viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 5vw;   /* Scales with viewport width */
  margin: 0;
}

.container {
  width: 90vw;      /* 90% of viewport width */
  margin: 0 auto;
}

/* Responsive font sizing */
@media (min-width: 1200px) {
  h1 {
    font-size: 3vw;  /* Smaller on large screens */
  }
}
```

---

#### 2. **Viewport Height (vh)**

**Description:**
1vh = 1% of the viewport height.

**Code Example:**

```css
/* Viewport height example */
.full-screen-section {
  min-height: 100vh;
}

.header {
  height: 50vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.sticky-nav {
  position: sticky;
  top: 0;
  height: 8vh;
}

/* Responsive component */
.card {
  height: 70vh;
  overflow-y: auto;
}
```

---

#### 3. **Viewport Minimum (vmin) and Maximum (vmax)**

**Description:**

- **vmin:** 1vmin = 1% of the smaller viewport dimension (width or height)
- **vmax:** 1vmax = 1% of the larger viewport dimension

**Code Example:**

```css
/* Vmin example - useful for responsive squares */
.square {
  width: 80vmin;
  height: 80vmin; /* Always a square */
}

/* Vmax example - fits in viewport */
.image-container {
  max-width: 80vmax;
  max-height: 80vmax;
}

/* Responsive sizing that respects smallest dimension */
.responsive-text {
  font-size: 4vmin; /* Scales down on smaller screens */
}

/* For both portrait and landscape */
.adaptive-box {
  width: 50vmin;
  height: 50vmin;
}
```

---

## Comparison Table

| Unit | Type | Relative To | Use Case | Responsive | Example |
|------|------|-------------|----------|------------|---------|
| **px** | Absolute | Fixed | Borders, shadows, fixed elements | ❌ No | `border: 1px solid #333` |
| **pt** | Absolute | Fixed (1/72 inch) | Print stylesheets | ❌ No | `@media print { font-size: 12pt }` |
| **cm, mm, in** | Absolute | Fixed (physical) | Print layouts | ❌ No | `@media print { margin: 2cm }` |
| **em** | Relative | Parent font-size | Component padding, nested scaling | ✅ Yes | `padding: 1.5em` |
| **rem** | Relative | Root font-size (html) | Font-size, spacing, sizing | ✅ Yes | `font-size: 1.2rem` |
| **ex** | Relative | Font x-height | Rare, line-height | ✅ Yes | `line-height: 2ex` |
| **ch** | Relative | Char width ('0') | Monospace, code blocks | ✅ Yes | `max-width: 80ch` |
| **%** | Relative | Parent element size | Widths, heights, grids | ✅ Yes | `width: 50%` |
| **vw** | Relative | Viewport width | Full-width sections, hero images | ✅ Yes | `width: 100vw` |
| **vh** | Relative | Viewport height | Full-height sections, fullscreen | ✅ Yes | `height: 100vh` |
| **vmin** | Relative | Smaller viewport dimension | Responsive squares, adaptive sizing | ✅ Yes | `font-size: 4vmin` |
| **vmax** | Relative | Larger viewport dimension | Max scaling, aspect ratio | ✅ Yes | `width: 50vmax` |

---

## Best Practices for Responsive Design

### 1. **Use Rem for Sizing**

```css
html {
  font-size: 16px; /* Default */
}

/* Scales everything proportionally */
@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}

body {
  font-size: 1rem;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}
```

### 2. **Use % for Layout**

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
```

### 3. **Use Viewport Units for Hero Sections**

```css
.hero {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}
```

### 4. **Combine Units with CSS Functions**

```css
/* Modern approach using clamp() */
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
  line-height: 1.2;
}

.container {
  width: min(90%, 1200px);
  margin: 0 auto;
}
```

---

## References

### Official Documentation

- [MDN Web Docs - CSS Units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units)
- [W3C CSS Specifications](https://www.w3.org/Style/CSS/all-properties.en.html)
- [CSS-Tricks: Fun Facts About CSS Relaxed Parsing](https://css-tricks.com/the-lengths-of-css/)

### Related Articles

- [MDN - Fundamental CSS Concepts](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- [Web.dev - Responsive Design Fundamentals](https://web.dev/responsive-web-design-basics/)
- [CSS-Tricks - What's the Deal with Rem?](https://css-tricks.com/rem-global-em-individual/)
- [A Comprehensive Guide to Responsive Images](https://www.smashingmagazine.com/2014/05/responsive-images-done-right-guide-markup/)

### Tools and Resources

- [CSS Unit Converter](https://www.rapidtables.com/convert/length/index.html)
- [Viewport Size Checker](https://www.responsivedesignchecker.com/)
- [Google Fonts (uses rem/em recommendations)](https://fonts.google.com/)

---

## Credits

**Documentation Created By:** GitHub Copilot (Claude Haiku 4.5)  
**Course Context & Learning Path:** Provided by Mike Sobhy (@sobhy0101)  
**Learning Resource:** [Scrimba Fullstack Path](https://scrimba.com/learn/responsive) - Responsive Design Course with instructors Guil Hernandez & Tom Chant

**Date:** December 2025  
**Course:** Responsive Design (Course 08) - Scrimba Fullstack Path

---

*This documentation is part of the comprehensive learning materials for the Scrimba Fullstack Path. Use it as a reference while learning responsive design principles and implementing them in your projects.*
