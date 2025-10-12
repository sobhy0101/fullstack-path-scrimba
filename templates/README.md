# Shared Template System

This folder contains shared header and footer templates that provide consistent navigation across all sections of the Scrimba Fullstack Path learning repository.

## Files

- **`header.html`** - Shared header with navigation
- **`footer.html`** - Shared footer with links and branding
- **`shared-styles.css`** - CSS styles for header, footer, and common components
- **`template-loader.js`** - JavaScript to dynamically load templates

## How to Use

### For New Pages

1. **Include the required files in your HTML head:**

    ```html
    <head>
        <!-- Load shared styles first -->
        <link rel="stylesheet" href="../templates/shared-styles.css">
        <link rel="stylesheet" href="your-page-styles.css">
        
        <!-- Load template loader -->
        <script src="../templates/template-loader.js"></script>
    </head>
    ```

2. **Add placeholder divs in your HTML body:**

```html
<body>
    <!-- Header will be loaded here -->
    <div id="header-placeholder"></div>
    
    <!-- Your page content here -->
    <main>
        <!-- Page content -->
    </main>
    
    <!-- Footer will be loaded here -->
    <div id="footer-placeholder"></div>
</body>
```

### For Existing Pages

1. **Update the head section** to include shared styles and template loader
2. **Replace existing header/footer** with placeholder divs
3. **Adjust path depth** - The template loader automatically calculates relative paths

## Features

- **Automatic path calculation** - Works from any folder depth
- **Mobile responsive** - Includes mobile menu functionality
- **Fallback navigation** - Shows basic "Back to Home" if templates fail to load
- **Consistent branding** - Same header/footer across all pages

## Navigation Links

The shared header includes:

- **Home** - Links back to main index.html
- **Sections** - Links to course sections overview
- **GitHub** - Links to the repository

## Mobile Support

The template includes a mobile menu that automatically works across all pages using the shared templates.

## Customization

You can customize the templates by editing:

- `header.html` - For navigation changes
- `footer.html` - For footer content changes
- `shared-styles.css` - For styling updates

Changes will automatically apply to all pages using the template system.
