/**
 * Keyboard Shortcuts Module
 * Handle keyboard interactions for improved UX
 */

/**
 * Initialize keyboard shortcuts
 * @param {Object} handlers - Object containing handler functions
 */
export function initKeyboardShortcuts(handlers) {
    const {
        onGenerate,
        onCopy,
        onRandom,
        onFormatSwitch
    } = handlers;
    
    document.addEventListener('keydown', (event) => {
        // Don't trigger if user is typing in an input
        const isTyping = event.target.matches('input, textarea, select');
        
        // Enter - Generate color scheme
        if (event.key === 'Enter' && !isTyping) {
            event.preventDefault();
            onGenerate?.();
        }
        
        // C - Copy focused color
        if (event.key.toLowerCase() === 'c' && !isTyping && !event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            onCopy?.();
        }
        
        // R - Random color
        if (event.key.toLowerCase() === 'r' && !isTyping) {
            event.preventDefault();
            onRandom?.();
        }
        
        // 1, 2, 3 - Switch formats (HEX, RGB, HSL)
        if (['1', '2', '3'].includes(event.key) && !isTyping) {
            event.preventDefault();
            const formats = ['hex', 'rgb', 'hsl'];
            const index = parseInt(event.key) - 1;
            onFormatSwitch?.(formats[index]);
        }
    });
}

/**
 * Get the currently focused color card
 * @returns {HTMLElement|null} Focused color card element or null
 */
export function getFocusedColorCard() {
    const activeElement = document.activeElement;
    
    if (activeElement && activeElement.classList.contains('color-card')) {
        return activeElement;
    }
    
    return null;
}

/**
 * Focus on a specific color card
 * @param {number} index - Index of color card to focus (0-based)
 */
export function focusColorCard(index) {
    const cards = document.querySelectorAll('.color-card');
    if (cards[index]) {
        cards[index].focus();
    }
}

/**
 * Setup navigation between color cards with arrow keys
 */
export function initColorCardNavigation() {
    document.addEventListener('keydown', (event) => {
        const focusedCard = getFocusedColorCard();
        if (!focusedCard) return;
        
        const cards = Array.from(document.querySelectorAll('.color-card'));
        const currentIndex = cards.indexOf(focusedCard);
        
        let newIndex = currentIndex;
        
        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                event.preventDefault();
                newIndex = (currentIndex + 1) % cards.length;
                break;
                
            case 'ArrowLeft':
            case 'ArrowUp':
                event.preventDefault();
                newIndex = (currentIndex - 1 + cards.length) % cards.length;
                break;
                
            case 'Home':
                event.preventDefault();
                newIndex = 0;
                break;
                
            case 'End':
                event.preventDefault();
                newIndex = cards.length - 1;
                break;
        }
        
        if (newIndex !== currentIndex) {
            focusColorCard(newIndex);
        }
    });
}
