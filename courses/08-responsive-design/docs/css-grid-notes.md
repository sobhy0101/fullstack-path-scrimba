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
    display: grid;
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
