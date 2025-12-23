/**
 * Modal Component
 * Reusable modal dialog for various UI interactions
 */

/**
 * Create and show a modal dialog
 * @param {Object} options - Modal configuration
 * @param {string} options.title - Modal title
 * @param {string} options.content - Modal content (HTML string or text)
 * @param {Array} options.buttons - Array of button configurations
 * @param {Function} options.onClose - Callback when modal closes
 * @returns {HTMLElement} Modal element
 */
export function showModal({ title, content, buttons = [], onClose }) {
    // Remove any existing modals
    closeAllModals();
    
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'modal-title');
    
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // Create modal content
    modal.innerHTML = `
        <div class="modal__header">
            <h2 class="modal__title" id="modal-title">${title}</h2>
            <button class="modal__close" aria-label="Close modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        <div class="modal__body">
            ${content}
        </div>
        <div class="modal__footer">
            <!-- Buttons will be inserted here -->
        </div>
    `;
    
    // Add buttons
    const footer = modal.querySelector('.modal__footer');
    buttons.forEach(btnConfig => {
        const button = document.createElement('button');
        button.className = `btn ${btnConfig.className || 'btn--secondary'}`;
        button.textContent = btnConfig.text;
        button.onclick = () => {
            if (btnConfig.onClick) {
                btnConfig.onClick();
            }
            if (btnConfig.closeOnClick !== false) {
                closeModal(overlay);
            }
        };
        footer.appendChild(button);
    });
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.modal__close');
    closeBtn.onclick = () => closeModal(overlay);
    
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            closeModal(overlay);
        }
    };
    
    // Keyboard support (ESC to close)
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal(overlay);
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Store cleanup function
    overlay.dataset.cleanup = 'true';
    overlay._cleanup = () => {
        document.removeEventListener('keydown', handleEscape);
        if (onClose) onClose();
    };
    
    // Append to body
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Focus first interactive element
    requestAnimationFrame(() => {
        const firstButton = footer.querySelector('button');
        if (firstButton) firstButton.focus();
    });
    
    return overlay;
}

/**
 * Close a specific modal
 * @param {HTMLElement} modalOverlay - Modal overlay element
 */
export function closeModal(modalOverlay) {
    if (!modalOverlay) return;
    
    // Call cleanup function if exists
    if (modalOverlay._cleanup) {
        modalOverlay._cleanup();
    }
    
    // Add closing animation class
    modalOverlay.classList.add('modal-overlay--closing');
    
    // Remove after animation
    setTimeout(() => {
        if (modalOverlay.parentNode) {
            modalOverlay.parentNode.removeChild(modalOverlay);
        }
    }, 200);
}

/**
 * Close all open modals
 */
export function closeAllModals() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => closeModal(modal));
}

/**
 * Create a confirmation dialog with Promise-based response
 * @param {string} title - Dialog title
 * @param {string} message - Confirmation message
 * @param {string} confirmText - Text for confirm button (default: 'Confirm')
 * @param {string} cancelText - Text for cancel button (default: 'Cancel')
 * @returns {Promise<boolean>} Promise that resolves to true if confirmed, false if cancelled
 */
export function showConfirmDialog(title, message, confirmText = 'Confirm', cancelText = 'Cancel') {
    return new Promise((resolve) => {
        const modal = showModal({
            title,
            content: `<p class="modal__message">${message}</p>`,
            buttons: [
                {
                    text: cancelText,
                    className: 'btn--secondary',
                    onClick: () => {
                        resolve(false);
                    }
                },
                {
                    text: confirmText,
                    className: 'btn--primary btn--danger',
                    onClick: () => {
                        resolve(true);
                    }
                }
            ],
            onClose: () => {
                // If modal is closed without clicking a button, treat as cancel
                resolve(false);
            }
        });
    });
}
