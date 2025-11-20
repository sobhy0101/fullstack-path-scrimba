# Refactor Mini Projects List to Grid Cards

## Goal Description
Transform the simple list of mini-projects into a visually appealing grid of cards. Each card will contain the project title, a brief description, highlights, and a "View Project" call-to-action button. The cards will have hover effects for a premium feel.

## Proposed Changes

### HTML
**[MODIFY] `index.html`**
- Replace the `<ul>` list with a `<div class="project-grid">`.
- Convert each `<li>` into a `<article class="project-card">`.
- Add content to each card:
    - Title (`<h3>`)
    - Description (`<p>`)
    - Highlights list (`<ul>`)
    - CTA Button (`<a class="btn">`)

### CSS
**[MODIFY] `styles.css`**
- Implement Grid Layout for `.project-grid`.
- Style `.project-card` with padding, border-radius, and shadow.
- Add hover effects (transform and shadow) to cards.
- Style typography (headings, paragraphs, lists).
- Create a `.btn` class for the CTA button with hover states.
- Improve overall page aesthetics (background, spacing).

## Verification Plan

### Automated Tests
- Use `browser_subagent` to open the page and verify the layout.
- Check if hover effects work (visual inspection via screenshot/recording).
- Verify links are correct and clickable.

### Manual Verification
- Check responsiveness (cards should wrap on smaller screens).