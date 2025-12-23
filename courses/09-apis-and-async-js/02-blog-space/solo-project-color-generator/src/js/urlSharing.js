/**
 * URL Sharing Module
 * Handle saving and loading color schemes via URL parameters
 */

/**
 * Generate shareable URL with current color scheme
 * @param {string} seedColor - Seed color hex value
 * @param {string} scheme - Scheme mode
 * @param {Array} colors - Array of color objects (optional)
 * @returns {string} Full URL with parameters
 */
// eslint-disable-next-line no-unused-vars
export function generateShareableUrl(seedColor, scheme, colors = null) {
    const url = new URL(window.location.href);
    
    // Clear existing color scheme params
    url.searchParams.delete('seed');
    url.searchParams.delete('scheme');
    
    // Add new params
    const cleanSeed = seedColor.replace('#', '');
    url.searchParams.set('seed', cleanSeed);
    url.searchParams.set('scheme', scheme);
    
    return url.toString();
}

/**
 * Parse URL parameters and extract color scheme data
 * @returns {Object|null} Object with seed and scheme, or null if no params
 */
export function parseUrlParams() {
    const url = new URL(window.location.href);
    const seed = url.searchParams.get('seed');
    const scheme = url.searchParams.get('scheme');
    
    if (!seed || !scheme) {
        return null;
    }
    
    return {
        seed: seed.startsWith('#') ? seed : `#${seed}`,
        scheme: scheme
    };
}

/**
 * Update URL without reloading the page
 * @param {string} seedColor - Seed color hex value
 * @param {string} scheme - Scheme mode
 */
export function updateUrl(seedColor, scheme) {
    const url = generateShareableUrl(seedColor, scheme);
    
    // Use history API to update URL without reload
    window.history.pushState({ seed: seedColor, scheme }, '', url);
}

/**
 * Copy current URL to clipboard
 * @param {Function} copyFunction - Copy function to use
 * @returns {Promise<boolean>} True if successful
 */
export async function copyCurrentUrl(copyFunction) {
    const url = window.location.href;
    return await copyFunction(url, 'URL copied! Share with others 🎨');
}

/**
 * Check if URL has color scheme parameters
 * @returns {boolean} True if URL has scheme params
 */
export function hasUrlParams() {
    const params = parseUrlParams();
    return params !== null;
}
