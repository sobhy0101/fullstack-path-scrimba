/**
 * Color Math Utilities
 * Phase 3: Advanced color calculations for gradients, tints, shades, and tones
 * 
 * Functions for:
 * - Gradient generation
 * - Tint/shade/tone calculations
 * - Color interpolation
 * - Random color generation
 */

import { hexToRgb, rgbToHex, rgbToHsl } from '../colorUtils.js';

// ============================================
// Gradient Utilities
// ============================================

/**
 * Generate CSS gradient string
 * @param {string} type - 'linear' or 'radial'
 * @param {number} angle - Angle in degrees (for linear)
 * @param {Array} stops - Array of {color, position} objects
 * @returns {string} CSS gradient string
 */
export function generateGradientCSS(type, angle, stops) {
    // Sort stops by position
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    
    // Build color stops string
    const stopsString = sortedStops
        .map(stop => `${stop.color} ${stop.position}%`)
        .join(', ');
    
    if (type === 'linear') {
        return `linear-gradient(${angle}deg, ${stopsString})`;
    } else if (type === 'radial') {
        return `radial-gradient(circle, ${stopsString})`;
    }
    
    return '';
}

/**
 * Generate random gradient with 2-5 color stops
 * @returns {Object} Gradient configuration
 */
export function generateRandomGradient() {
    const stopCount = Math.floor(Math.random() * 4) + 2; // 2-5 stops
    const stops = [];
    
    for (let i = 0; i < stopCount; i++) {
        const position = Math.round((i / (stopCount - 1)) * 100);
        const color = generateRandomHexColor();
        stops.push({ color, position });
    }
    
    const angle = Math.floor(Math.random() * 361);
    const type = Math.random() > 0.5 ? 'linear' : 'radial';
    
    return { type, angle, stops };
}

/**
 * Interpolate between two colors
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @param {number} ratio - Interpolation ratio (0-1)
 * @returns {string} Interpolated hex color
 */
export function interpolateColors(color1, color2, ratio) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    
    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * ratio);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * ratio);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * ratio);
    
    return rgbToHex(r, g, b);
}

// ============================================
// Tint, Shade, and Tone Utilities
// ============================================

/**
 * Generate tints by mixing with white
 * @param {string} baseColor - Hex color
 * @param {number} steps - Number of tints to generate
 * @returns {Array} Array of tint hex colors
 */
export function generateTints(baseColor, steps = 10) {
    const tints = [];
    const rgb = hexToRgb(baseColor);
    
    for (let i = 0; i < steps; i++) {
        const ratio = i / (steps - 1); // 0 to 1
        const r = Math.round(rgb.r + (255 - rgb.r) * ratio);
        const g = Math.round(rgb.g + (255 - rgb.g) * ratio);
        const b = Math.round(rgb.b + (255 - rgb.b) * ratio);
        
        tints.push(rgbToHex(r, g, b));
    }
    
    return tints;
}

/**
 * Generate shades by mixing with black
 * @param {string} baseColor - Hex color
 * @param {number} steps - Number of shades to generate
 * @returns {Array} Array of shade hex colors
 */
export function generateShades(baseColor, steps = 10) {
    const shades = [];
    const rgb = hexToRgb(baseColor);
    
    for (let i = 0; i < steps; i++) {
        const ratio = i / (steps - 1); // 0 to 1
        const r = Math.round(rgb.r * (1 - ratio));
        const g = Math.round(rgb.g * (1 - ratio));
        const b = Math.round(rgb.b * (1 - ratio));
        
        shades.push(rgbToHex(r, g, b));
    }
    
    return shades;
}

/**
 * Generate tones by mixing with gray (50% gray)
 * @param {string} baseColor - Hex color
 * @param {number} steps - Number of tones to generate
 * @returns {Array} Array of tone hex colors
 */
export function generateTones(baseColor, steps = 10) {
    const tones = [];
    const rgb = hexToRgb(baseColor);
    const gray = 128; // Middle gray
    
    for (let i = 0; i < steps; i++) {
        const ratio = i / (steps - 1); // 0 to 1
        const r = Math.round(rgb.r + (gray - rgb.r) * ratio);
        const g = Math.round(rgb.g + (gray - rgb.g) * ratio);
        const b = Math.round(rgb.b + (gray - rgb.b) * ratio);
        
        tones.push(rgbToHex(r, g, b));
    }
    
    return tones;
}

/**
 * Generate Tailwind-style color scale (50-900)
 * @param {string} baseColor - Hex color (becomes 500)
 * @returns {Object} Color scale object with keys 50-900
 */
export function generateTailwindScale(baseColor) {
    const scale = {};
    const tints = generateTints(baseColor, 6).reverse(); // 50-400
    const shades = generateShades(baseColor, 5); // 600-900
    
    // Map to Tailwind naming
    scale[50] = tints[0];
    scale[100] = tints[1];
    scale[200] = tints[2];
    scale[300] = tints[3];
    scale[400] = tints[4];
    scale[500] = baseColor; // Base color
    scale[600] = shades[1];
    scale[700] = shades[2];
    scale[800] = shades[3];
    scale[900] = shades[4];
    
    return scale;
}

// ============================================
// Random Color Generation
// ============================================

/**
 * Generate random hex color
 * @returns {string} Random hex color
 */
export function generateRandomHexColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return rgbToHex(r, g, b);
}

/**
 * Generate random pleasant color (avoiding too dark/light/gray)
 * @returns {string} Random pleasant hex color
 */
export function generateRandomPleasantColor() {
    // Generate in HSL space for better control
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 30) + 60; // 60-90% saturation
    const l = Math.floor(Math.random() * 30) + 40; // 40-70% lightness
    
    return hslToHex(h, s, l);
}

/**
 * Convert HSL to Hex
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {string} Hex color
 */
export function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) {
        r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
        r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
        r = c; g = 0; b = x;
    }
    
    const rVal = Math.round((r + m) * 255);
    const gVal = Math.round((g + m) * 255);
    const bVal = Math.round((b + m) * 255);
    
    return rgbToHex(rVal, gVal, bVal);
}

// ============================================
// Color Validation
// ============================================

/**
 * Validate hex color format
 * @param {string} hex - Hex color to validate
 * @returns {boolean} True if valid hex color
 */
export function isValidHex(hex) {
    return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}

/**
 * Ensure hex color has # prefix
 * @param {string} hex - Hex color
 * @returns {string} Hex color with # prefix
 */
export function ensureHashPrefix(hex) {
    return hex.startsWith('#') ? hex : `#${hex}`;
}

// ============================================
// Exports
// ============================================

export default {
    generateGradientCSS,
    generateRandomGradient,
    interpolateColors,
    generateTints,
    generateShades,
    generateTones,
    generateTailwindScale,
    generateRandomHexColor,
    generateRandomPleasantColor,
    hslToHex,
    isValidHex,
    ensureHashPrefix
};
