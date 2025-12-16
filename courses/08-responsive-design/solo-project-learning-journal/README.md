# Solo Project - Learning Journal Website or Blog

## Overview

You are going to build a wonderfully designed learning journal website or blog. This site has three pages that you'll need to build from scratch using HTML and CSS.

First, we have the homepage, which would look like this on small and larger screens. The homepage features a top article or post and a list of recent posts below. Then we have a page displaying the full article along with its related image, and below the article, a list of recent posts, and finally, there's an about me page displaying your image, greeting, and bio, which will be below that is a list of recent posts.

You can view the designs for each page on small and larger screens here:

## Design Files

- Figma File: [Learning Journal Blog Designs](https://www.figma.com/design/yqvEW2TqqqKXfUF5boidu3/Learning-Journal-Blog--Copy-?node-id=0-1&m=dev&t=Fzb27clv1piiCEz9-1)

**Desktop Designs:**

- [Homepage Design](https://www.figma.com/design/yqvEW2TqqqKXfUF5boidu3/Learning-Journal-Blog--Copy-?node-id=1-6&t=Fzb27clv1piiCEz9-4)
- [Post Page Design](https://www.figma.com/design/yqvEW2TqqqKXfUF5boidu3/Learning-Journal-Blog--Copy-?node-id=1-53&t=Fzb27clv1piiCEz9-4)
- [About Me Page Design](https://www.figma.com/design/yqvEW2TqqqKXfUF5boidu3/Learning-Journal-Blog--Copy-?node-id=1-90&t=Fzb27clv1piiCEz9-4)

**Mobile Designs:**

- [Homepage Design](https://www.figma.com/design/yqvEW2TqqqKXfUF5boidu3/Learning-Journal-Blog--Copy-?node-id=1-142&t=Fzb27clv1piiCEz9-4)
- [Post Page Design](https://www.figma.com/design/yqvEW2TqqqKXfUF5boidu3/Learning-Journal-Blog--Copy-?node-id=1-175&t=Fzb27clv1piiCEz9-4)
- [About Me Page Design](https://www.figma.com/design/yqvEW2TqqqKXfUF5boidu3/Learning-Journal-Blog--Copy-?node-id=1-210&t=Fzb27clv1piiCEz9-4)

**Notice** Each page has a header displaying the site logo 'images/logo.svg' and name 'Sobhy Learning Journal', and a small navigation with home and about me links to start. Each page also has a footer at the very bottom.

## Basic Requirements

- Build each page from "scratch"
- Make all pages responsive
- Separate header and footer for all pages
- Use relative units for font sizes, margins, paddings, and other measurements (em, rem, %, vh, vw)
- Use mobile-first design
- Use media queries to adjust the layout for larger screens
- Use CSS Grid for layout and positioning
- Use Flexbox for articles and posts
- Use Google Fonts for typography (Roboto and Merriweather)
- Include the viewport meta tag
- Use semantic HTML elements
- Use external CSS file 'css/style.css' for styling
- Use comments in your HTML, CSS, and minimal JavaScript code to explain your structure and styling choices
- Reset default browser styles using a CSS reset
- Use consistent naming conventions for classes and IDs (BEM methodology is recommended)
- Optimize images for web use
- Include Open Graph and Twitter meta tags for social media sharing
- Include a favicon 'images/favicon.svg'
- Use alt attributes for images
- Ensure good color contrast for readability
- Validate your HTML and CSS code

## Stretch Goals

- Make it your own!
- Add custom images (Customize the images and content to be all about your learning experiences.)
- Make the content about your learning experiences
- Add more pages (contact information, links to your portfolio, resume, and other materials that will help you in your job search)
- Display other recent posts after clicking "View More" (a bit of JavaScript to hide all but six of your recent posts on the homepage, then displaying the other posts when the user clicks the view more link.)
- Responsive navigation displaying a “hamburger menu" on smaller screens
- Add animations and transitions
- Use CSS variables for colors, fonts, spaces and other design elements

## Getting Started

This project is part of the Scrimba Fullstack Path course and uses Vite for development, which is configured at the parent repository level.

```powershell
# Clone the repository
git clone https://github.com/sobhy0101/fullstack-path-scrimba.git
cd fullstack-path-scrimba

# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```

Then navigate to the solo project directory in your browser:
`http://localhost:5173/courses/08-responsive-design/solo-project-learning-journal/`

## File Structure

```text
solo-project-learning-journal/
├── index.html              # Homepage with hero post and recent posts grid
├── about.html              # About Me page with profile and bio
├── article.html            # Individual blog post page
├── css/
│   └── style.css           # Main stylesheet with mobile-first responsive design
├── js/
│   └── main.js             # JavaScript for View More and navigation features
├── images/
│   ├── logo.svg            # Site logo
│   ├── favicon.svg         # Browser favicon
│   ├── my-profile-photo.webp  # Profile image for About page
│   └── blog-*.jpg          # Blog post placeholder images
├── design/
│   ├── svg/                # 6 design reference SVGs exported from Figma
│   └── png/                # 6 design reference PNGs exported from Figma
├── .copilot-instructions.md  # AI assistant context file
└── README.md               # This file
```

## Technologies Used

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern styling with Grid, Flexbox, and custom properties
- **JavaScript**: Vanilla JS for interactive features
- **Google Fonts**: Roboto (body text) and Merriweather (headings)
- **Vite**: Fast development server and build tool
- **BEM Methodology**: Consistent CSS naming convention

## Features

- 📱 **Fully Responsive**: Mobile-first design that looks great on all devices
- ♿ **Accessible**: Semantic HTML, proper alt text, and ARIA labels
- 🎨 **Modern Design**: Clean layout following Figma design specifications
- ⚡ **Fast Loading**: Optimized images and minimal dependencies
- 🔗 **Social Sharing**: Open Graph and Twitter card meta tags
- 🎯 **Interactive**: View More functionality and smooth navigation

## Learning Objectives

This project demonstrates proficiency in:

- Mobile-first responsive web design
- CSS Grid and Flexbox layouts
- Semantic HTML5 elements
- Accessibility best practices
- Modern CSS techniques (custom properties, relative units)
- JavaScript DOM manipulation
- Version control with Git/GitHub

## Credits

- **Course**: [Scrimba Fullstack Developer Path](https://scrimba.com/fullstack-path-c0fullstack)
- **Module**: Responsive Design
- **Design**: Provided by Scrimba
- **Developer**: Mahmoud 'Mike' Sobhy
