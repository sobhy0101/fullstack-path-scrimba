/**
 * Toast Notification Module
 * Display temporary toast messages to the user
 */

let toastTimeout = null;

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Toast type: 'success', 'error', 'info' (default: 'success')
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
export function showToast(message, type = 'success', duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (!toast || !toastMessage) {
        console.warn('Toast elements not found in DOM');
        return;
    }
    
    // Clear any existing timeout
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }
    
    // Set message
    toastMessage.textContent = message;
    
    // Add type class (for future styling variations)
    toast.className = `toast toast--${type}`;
    
    // Show toast
    requestAnimationFrame(() => {
        toast.classList.add('toast--show');
    });
    
    // Hide after duration
    toastTimeout = setTimeout(() => {
        hideToast();
    }, duration);
}

/**
 * Hide the toast notification
 */
export function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('toast--show');
    }
}
