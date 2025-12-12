# CSS Grid Learning Notes

## What is CSS Grid?

CSS Grid is a powerful layout system for the web that provides comprehensive control over both rows and columns in a layout.

### Key Characteristics

- **Two-dimensional system**: Unlike Flexbox (primarily one-dimensional), CSS Grid handles both rows and columns simultaneously
- **Layout control**: Define the number of rows and columns, their sizes, and gaps between them
- **Item placement**: Control precise placement of items within the grid
- **Overlapping**: Grid items can overlap each other
- **Spanning**: Elements can span multiple rows and columns
- **No margin collapse**: Margins no longer collapse in grid layouts
- **Browser support**: Supported in all modern browsers
- **Flexibility**: More control and flexibility compared to traditional methods like floats and positioning

## Grid Container Setup

To create a grid container, use `display: grid`:

```css
.grid-container {
    display: grid; /* Establishes a grid formatting context. Wouldn't make any visual changes by itself. */
}
```

## Grid Template Columns

The `grid-template-columns` property defines the column structure of your grid.

### Fixed Width Columns

Each value creates a column with that specific width:

```css
.grid-container {
    display: grid;
    grid-template-columns: 5em 10em 20em; /* 3 columns with different widths */
}
```

### Resetting Grid Columns

```css
.grid-container {
    grid-template-columns: none; /* Single column spanning entire container */
}
```

### Multiple Equal Columns (The Manual Way)

```css
.grid-container {
    grid-template-columns: 8em 4em 8em 4em; /* Not flexible, hard to maintain */
}
```

### The Problem with Calculations

This approach is difficult to write, read, and update:

```css
.grid-container {
    /* Don't do this! */
    grid-template-columns: calc((100% - 1.5em) / 4) calc((100% - 1.5em) / 4) calc((100% - 1.5em) / 4) calc((100% - 1.5em) / 4);
}
```

## The `fr` Unit (Fraction)

The `fr` unit represents a **fraction of the available space** in the grid. This is the recommended way to create flexible layouts.

### Equal Columns with `fr`

```css
.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr; /* 4 equal columns */
}
```

Each column takes up 1 fraction of the available space, distributing it equally.

### Mixing `auto` and `fr`

The `auto` keyword makes a column fit its content:

```css
.grid-container {
    display: grid;
    grid-template-columns: auto 1fr 1fr 1fr; 
    /* First column fits content, remaining 3 columns share remaining space equally */
}
```

### More `fr` Examples

```css
/* Unequal distribution */
.grid-container {
    grid-template-columns: 2fr 1fr 1fr; 
    /* First column is 2x wider than the others */
}

/* Mixing fixed and flexible */
.grid-container {
    grid-template-columns: 200px 1fr 2fr; 
    /* Fixed 200px, then 1 part, then 2 parts of remaining space */
}
```

## The `repeat()` Function

The `repeat()` function provides a cleaner, more maintainable way to define multiple columns or rows with the same size pattern. In the next lesson, we won't use the verbose method of defining multiple columns manually because we will be working with 12 or more columns frequently. It will get tedious quickly!

### Basic Syntax

```css
grid-template-columns: repeat(number /* how many times */, size /* what to repeat */);
```

### Equal Columns with `repeat()`

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(8, 1fr); /* 8 equal columns */
}
```

This is much cleaner than:

```css
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; /* Verbose and hard to maintain */
```

### Repeating Fixed Sizes

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 200px); /* 4 columns, each 200px wide */
}
```

### Repeating Mixed Patterns

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr 2fr); /* Pattern repeats: 1fr 2fr 1fr 2fr 1fr 2fr */
    /* This creates 6 columns total: 3 columns of 1fr and 3 columns of 2fr */
}
```

### Using `repeat()` with Rows

```css
.grid-container {
    display: grid;
    grid-template-rows: repeat(4, 100px); /* 4 rows, each 100px tall */
}
```

### Using `repeat()` with multiple dimensions

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 30px) repeat(4, 1fr); /* 4 columns of 30px followed by 4 columns of 1fr */
}

More complex example:
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr) 30px 30px repeat(3, 3fr); /* 3 columns of 1fr, 2 columns of 30px, and 3 columns of 3fr */
}
```

## Grid Gaps

Control spacing between grid items with gap properties.

### Individual Gap Properties

```css
.grid-container {
    row-gap: .3em;    /* Gap between rows */
    column-gap: .6em; /* Gap between columns */
}
```

### Shorthand Gap Property

```css
.grid-container {
    gap: .3em .6em; /* row-gap column-gap */
}
```

### Equal Gaps

```css
.grid-container {
    gap: .5em; /* Same gap for both rows and columns */
}
```

## PLACING ITEMS ON THE GRID

![3 ways to place items on the grid](../images/placing-items-on-grid.png)

### 3 ways to place items on the grid

1. grid-row/grid-column and the "span" keyword
2. grid-row/grid-column and line numbers
3. grid-template-areas, grid-area

## Grid Column and Row Positioning

Control precise placement of grid items using line numbers. Grid lines are numbered starting from 1 on the left/top and continuing to the right/bottom.

### Grid Column Start and End

The `grid-column` property defines which columns an item spans, using the format `start / end`:

```css
.grid-item {
    grid-column: 1 / 3; /* Start at column line 1, end at column line 3 (spans columns 1-2) */
}
```

### Using `grid-column-start` and `grid-column-end`

```css
.grid-item {
    grid-column-start: 1;  /* Start at column line 1 */
    grid-column-end: 13;   /* End at column line 13 */
}
```

This is equivalent to: `grid-column: 1 / 13;`

### Using Negative Indices

The `-1` index refers to the last grid line, which is useful when you don't know the exact number of columns:

```css
.grid-item {
    grid-column: 1 / -1; /* Spans from first column to the last column */
}
```

### Using `span` with Grid Column

The `span` keyword allows you to specify how many columns to span instead of an end line:

```css
.grid-item {
    grid-column: 3 / span 7; /* Start at column line 3, span 7 columns (covers lines 3-10) */
}
```

### Grid Row Start and End

The same principles apply to rows using `grid-row`:

```css
.grid-item {
    grid-row: 2 / 5; /* Start at row line 2, end at row line 5 (spans rows 2-4) */
}
```

### Complete Positioning Example

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr); /* 12 equal columns */
    grid-template-rows: repeat(5, auto);    /* 5 rows with automatic height */
}
.header {
    grid-column: 1 / -1; /* Spans entire width */
    grid-row: 1 / 2;     /* First row */
}

.nav {
    grid-column: 1 / 3;  /* Columns 1-2 */
    grid-row: 2 / 5;     /* Rows 2-4 */
}

.main {
    grid-column: 3 / span 7; /* Start at column 3, span 7 columns */
    grid-row: 2 / 5;         /* Rows 2-4 */
}

.aside {
    grid-column: 10 / -1; /* Column 10 to the end */
    grid-row: 2 / 5;      /* Rows 2-4 */
}

.footer {
    grid-column: 1 / -1; /* Spans entire width */
    grid-row: 5 / 6;     /* Last row */
}
```

### Key Concepts

- **Grid lines are numbered** starting from 1 on the top/left
- **Start line is inclusive**, end line is exclusive (e.g., `1 / 3` includes lines 1 and 2)
- **Use `-1` for the last line** in any dimension
- **`span` keyword** specifies how many tracks to cover instead of an end line number

## Complete Example

Here's a practical grid setup combining multiple concepts:

```css
.grid-container {
    display: grid;
    grid-template-columns: auto 1fr 1fr 1fr;
    gap: .5em;
    border: 2px solid black;
}

.grid-item {
    background-color: lightgreen;
    padding: .2em;
    text-align: center;
    font-size: 2em;
    color: black;
    border: 1px solid #999;
}
```

## Additional Examples

### Responsive Sidebar Layout

```css
.main-layout {
    display: grid;
    grid-template-columns: 250px 1fr; /* Fixed sidebar, flexible main content */
    gap: 1em;
}
```

### Three-Column Article Layout

```css
.article-grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr; /* Emphasize middle column */
    gap: 2em;
}
```

### Equal Multi-Column Layout

```css
.gallery {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr; /* 5 equal columns */
    gap: 1em;
}
```

## Key Takeaways

- Use `fr` units for flexible, maintainable layouts
- Use `auto` when you want columns to fit their content
- The `gap` property is cleaner than using margins on grid items
- CSS Grid is ideal for two-dimensional layouts
- Combine fixed and flexible units for hybrid layouts
- Grid provides more control than traditional layout methods
