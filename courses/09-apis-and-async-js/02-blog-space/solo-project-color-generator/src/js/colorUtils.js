/**
 * Color Utilities
 * Functions for color format conversions and manipulations
 */

/**
 * Convert hex color to RGB
 * @param {string} hex - Hex color code (with or without #)
 * @returns {Object} RGB object with r, g, b properties
 */
export function hexToRgb(hex) {
    const cleanHex = hex.replace('#', '');
    
    // Handle 3-digit hex
    let fullHex = cleanHex;
    if (cleanHex.length === 3) {
        fullHex = cleanHex.split('').map(char => char + char).join('');
    }
    
    const r = parseInt(fullHex.substring(0, 2), 16);
    const g = parseInt(fullHex.substring(2, 4), 16);
    const b = parseInt(fullHex.substring(4, 6), 16);
    
    return { r, g, b };
}

/**
 * Convert RGB to hex
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {string} Hex color code with #
 */
export function rgbToHex(r, g, b) {
    const toHex = (n) => {
        const hex = Math.round(n).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Convert RGB to HSL
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {Object} HSL object with h, s, l properties
 */
export function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

/**
 * Convert hex to HSL
 * @param {string} hex - Hex color code
 * @returns {Object} HSL object with h, s, l properties
 */
export function hexToHsl(hex) {
    const rgb = hexToRgb(hex);
    return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

/**
 * Format color value for display based on format type
 * @param {Object} color - Color object with hex, rgb, hsl properties
 * @param {string} format - Format type: 'hex', 'rgb', 'hsl', or 'cmyk'
 * @returns {string} Formatted color string
 */
export function formatColorValue(color, format) {
    switch (format.toLowerCase()) {
        case 'hex':
            return color.hex;
            
        case 'rgb':
            return color.rgb.value || `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
            
        case 'hsl':
            return color.hsl.value || `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
            
        case 'cmyk':
            return color.cmyk?.value || (color._raw?.cmyk?.value) || 'N/A';
            
        default:
            return color.hex;
    }
}

/**
 * Get all format representations of a color
 * @param {Object} color - Color object
 * @returns {Object} All color formats
 */
export function getAllFormats(color) {
    return {
        hex: color.hex,
        rgb: color.rgb.value || `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
        hsl: color.hsl.value || `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`,
        cmyk: color.cmyk?.value || (color._raw?.cmyk?.value) || 'N/A'
    };
}

/**
 * Calculate relative luminance of a color (for contrast calculations)
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {number} Relative luminance (0-1)
 */
export function getRelativeLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @returns {number} Contrast ratio (1-21)
 */
export function getContrastRatio(color1, color2) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    
    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Determine if text color should be dark or light based on background
 * @param {string} bgColor - Background hex color
 * @returns {string} '#000000' or '#FFFFFF'
 */
export function getTextColor(bgColor) {
    const rgb = hexToRgb(bgColor);
    const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
    
    // If luminance is greater than 0.5, use dark text
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
