# Solo Project - Color Scheme Generator

 In this solo project, you'll create a Color Scheme Generator that allows users to generate color palettes based on a selected base color and scheme type. You'll utilize the Color API to fetch color schemes and display them dynamically on the webpage.

 ![Color Scheme Generator requirements](./images/color-scheme-generator-requirements.png)

## Project Requirements

- **User Interface:**
  - [Figma Layout file](https://www.figma.com/design/Dwr5bRXGdGbiyTrmrXvVb2/Color-Scheme-Generator--Copy-?node-id=0-1&p=f&t=hTJxm3u0BKi7mMOs-0)
  - Create a simple and intuitive UI with an input field for the base color (hex code) and a dropdown menu for selecting the color scheme type (e.g., monochromatic, complementary, triadic, etc.).
  - Include a "Generate" button to fetch and display the color scheme.
  - Display the generated colors as swatches with their corresponding hex codes.

- **Functionality:**
  - [Color API Documentation](https://www.thecolorapi.com/docs#schemes)
  - Use the Fetch API to make requests to the Color API (<https://www.thecolorapi.com/>) to retrieve color schemes based on user input.
  - Handle different scheme types and ensure the correct data is fetched and displayed.
  - Implement error handling for invalid inputs or failed API requests.

- **Styling:**
  - Style the application using CSS to make it visually appealing. Consider using flexbox or grid for layout.
  - Ensure that the color swatches are displayed in a way that highlights their colors effectively.

## Stretch Goals (Optional)

- Allow users to copy hex codes to clipboard by clicking on the color swatches.
- Add a feature to save favorite color schemes locally using localStorage.
- Implement responsiveness so that the application works well on both desktop and mobile devices.

## Getting Started

 1. Set up your project structure with HTML, CSS, and JavaScript files.
 2. Design the UI layout in HTML and style it with CSS.
 3. Write JavaScript code to handle user input, make API requests, and update the DOM with the fetched color schemes.
 4. Test your application thoroughly to ensure all features work as expected.
