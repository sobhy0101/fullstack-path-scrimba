/**
 * Color API Integration
 * Handles all interactions with The Color API (https://www.thecolorapi.com/)
 */

const COLOR_API_BASE_URL = 'https://www.thecolorapi.com';

/**
 * Fetch a color scheme from The Color API
 * @param {string} hexColor - Hex color code without # (e.g., 'F55A5A')
 * @param {string} mode - Scheme mode (e.g., 'monochrome', 'analogic', 'complement')
 * @param {number} count - Number of colors to return (default: 5)
 * @returns {Promise<Object>} Color scheme data from API
 */
export async function getColorScheme(hexColor, mode = 'monochrome', count = 5) {
    // Remove # if present
    const cleanHex = hexColor.replace('#', '');
    
    // Build API URL
    const url = `${COLOR_API_BASE_URL}/scheme?hex=${cleanHex}&mode=${mode}&count=${count}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error fetching color scheme:', error);
        throw new Error(`Failed to fetch color scheme: ${error.message}`);
    }
}

/**
 * Get detailed information about a single color
 * @param {string} hexColor - Hex color code without # (e.g., 'F55A5A')
 * @returns {Promise<Object>} Detailed color information
 */
export async function getColorInfo(hexColor) {
    const cleanHex = hexColor.replace('#', '');
    const url = `${COLOR_API_BASE_URL}/id?hex=${cleanHex}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error fetching color info:', error);
        throw new Error(`Failed to fetch color information: ${error.message}`);
    }
}

/**
 * Parse color scheme API response into a simplified format
 * @param {Object} apiResponse - Response from getColorScheme()
 * @returns {Array<Object>} Array of color objects with simplified properties
 */
export function parseColorScheme(apiResponse) {
    if (!apiResponse || !apiResponse.colors) {
        return [];
    }
    
    return apiResponse.colors.map(color => ({
        // Color values in different formats
        hex: color.hex.value,
        rgb: {
            r: color.rgb.r,
            g: color.rgb.g,
            b: color.rgb.b,
            value: color.rgb.value
        },
        hsl: {
            h: color.hsl.h,
            s: color.hsl.s,
            l: color.hsl.l,
            value: color.hsl.value
        },
        
        // Color name
        name: color.name.value,
        
        // Original data (if needed)
        _raw: color
    }));
}

/**
 * Validate if a string is a valid hex color
 * @param {string} color - Color string to validate
 * @returns {boolean} True if valid hex color
 */
export function isValidHexColor(color) {
    const hexPattern = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexPattern.test(color);
}

/**
 * Get a random hex color
 * @returns {string} Random hex color with # prefix
 */
export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
