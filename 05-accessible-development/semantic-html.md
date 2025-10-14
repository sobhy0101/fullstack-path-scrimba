# Semantic HTML

Semantic HTML refers to the use of HTML markup that conveys meaning about the content contained within the elements. This approach enhances accessibility, improves SEO, and makes the code more maintainable. By using semantic elements, developers can create a more meaningful structure for their web pages.

If a disabled user is navigating a page with a screen reader, semantic HTML helps the screen reader understand the structure and purpose of different sections of the page. For example, using `<nav>` for navigation links or `<main>` for the main content area allows assistive technologies to provide a better user experience, instead of just reading out a series of `<div>` elements with no context.

It is not only enhancing accessibility, benefits SEO, or overall code quality, but caring about your fellow humans is the most important reason. A friend of mine who is blind use to stuggle with poorly structured websites, and it made a significant difference when sites adopted semantic HTML. Nowadays, he only visits sites that follow good accessibility practices.

To grasp how screenreaders interpret semantic HTML, you can use the [UCSF Screen Reader Demo for Digital Accessibility](https://youtu.be/dEbl5jvLKGQ) video, which provides a simulation of how screen readers navigate through web content by a visually impaired user. He demonstrates how semantic HTML elements like headings, lists, and landmarks help in understanding the structure and content of a webpage in coparison to non-semantic HTML.

## Benefits of Semantic HTML

1. **Accessibility**: Screen readers and assistive technologies can better understand the content, making it easier for users with disabilities to navigate and interact with the page.
2. **SEO**: Search engines can more easily index and rank pages that use semantic markup, potentially improving visibility in search results.
3. **Maintainability**: Semantic HTML provides a clear structure, making it easier for developers to read and maintain the code over time.

## Examples of Semantic Elements

- `<nav>`: Defines a set of navigation links.
- `<header>`: Represents the introductory content or a set of navigational links.
- `<main>`: Represents the main content of the document.
- `<article>`: Encapsulates a self-contained piece of content that could be distributed independently.
- `<section>`: Represents a thematic grouping of content, typically with a heading.
- `<aside>`: Contains content that is tangentially related to the content around it, such as sidebars or callouts.
- `<h1>` to `<h6>`: Define headings of different levels, providing a clear hierarchy of content. Try to avoid skipping heading levels (e.g., jumping from `<h1>` to `<h3>`) or going back up (e.g., `<h3>` to `<h2>`).
- `<footer>`: Defines the footer for a section or page, often containing copyright information or links.

## Conclusion

Incorporating semantic HTML into web development practices is essential for creating accessible, SEO-friendly, and maintainable websites. By using the appropriate semantic elements, developers can ensure that their content is well-structured and easily understood by both users and search engines.
