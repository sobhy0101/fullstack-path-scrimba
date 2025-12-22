/**
 * Clipboard Utilities
 * Handle copying text to clipboard with user feedback
 */

import { showToast } from './toast.js';

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @param {string} successMessage - Message to show on success
 * @returns {Promise<boolean>} True if copy was successful
 */
export async function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
    try {
        // Modern clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            showToast(successMessage);
            return true;
        }
        
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            showToast(successMessage);
            return true;
        } else {
            throw new Error('Copy command failed');
        }
        
    } catch (error) {
        // Silently ignore browser extension listener errors
        if (!error.message.includes('message channel closed')) {
            console.error('Failed to copy to clipboard:', error);
        }
        // Still show success toast if text was copied despite the error
        if (error.message.includes('message channel closed')) {
            showToast(successMessage);
            return true;
        }
        showToast('Failed to copy. Please try again.', 'error');
        return false;
    }
}

/**
 * Copy color value to clipboard with visual feedback on element
 * @param {string} colorValue - Color value to copy
 * @param {HTMLElement} element - Element to show visual feedback on
 * @param {string} format - Color format being copied
 * @returns {Promise<boolean>} True if copy was successful
 */
export async function copyColor(colorValue, element = null, format = 'HEX') {
    const message = `Copied ${format}: ${colorValue}`;
    const success = await copyToClipboard(colorValue, message);
    
    if (success && element) {
        // Add visual feedback class
        element.classList.add('color-card__swatch--copied');
        
        // Remove class after animation
        setTimeout(() => {
            element.classList.remove('color-card__swatch--copied');
        }, 600);
    }
    
    return success;
}
