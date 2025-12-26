/**
 * Tab Manager
 * Phase 3: Handles tab navigation and state
 * 
 * Features:
 * - Tab switching with animations
 * - URL hash navigation (#gradient, #tints, etc.)
 * - Mobile dropdown support
 * - Keyboard navigation
 * - State preservation across tabs
 */

// ============================================
// State
// ============================================

const tabState = {
    currentTab: 'generator',
    availableTabs: ['generator', 'gradients', 'tints-shades', 'color-wheel', 'contrast'],
    disabledTabs: ['tints-shades', 'color-wheel', 'contrast'] // Will be enabled as we build them
};

// ============================================
// Tab Switching Logic
// ============================================

/**
 * Switch to a specific tab
 * @param {string} tabId - ID of the tab to switch to
 */
export function switchTab(tabId) {
    // Validate tab exists
    if (!tabState.availableTabs.includes(tabId)) {
        console.warn(`Tab "${tabId}" does not exist`);
        return;
    }
    
    // Check if tab is disabled
    if (tabState.disabledTabs.includes(tabId)) {
        console.log(`Tab "${tabId}" is not yet available`);
        return;
    }
    
    // Don't switch if already on this tab
    if (tabState.currentTab === tabId) {
        return;
    }
    
    const previousTab = tabState.currentTab;
    tabState.currentTab = tabId;
    
    // Update tab buttons
    updateTabButtons(tabId);
    
    // Update tab content
    updateTabContent(tabId);
    
    // Update URL hash
    updateUrlHash(tabId);
    
    // Update mobile dropdown
    updateMobileDropdown(tabId);
    
    // Fire custom event for other modules to listen to
    window.dispatchEvent(new CustomEvent('tabChanged', {
        detail: { from: previousTab, to: tabId }
    }));
    
    // Log for debugging
    console.log(`Switched from "${previousTab}" to "${tabId}"`);
}

/**
 * Update tab button active states
 * @param {string} activeTabId - ID of the active tab
 */
function updateTabButtons(activeTabId) {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        const tabId = button.dataset.tab;
        const isActive = tabId === activeTabId;
        
        button.classList.toggle('tab-button--active', isActive);
        button.setAttribute('aria-selected', isActive);
    });
}

/**
 * Update tab content visibility
 * @param {string} activeTabId - ID of the active tab
 */
function updateTabContent(activeTabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabContents.forEach(content => {
        const tabId = content.id.replace('-tab', '');
        const isActive = tabId === activeTabId;
        
        if (isActive) {
            content.classList.add('tab-content--active');
            content.removeAttribute('hidden');
        } else {
            content.classList.remove('tab-content--active');
            content.setAttribute('hidden', '');
        }
    });
}

/**
 * Update URL hash without triggering hashchange event
 * @param {string} tabId - ID of the active tab
 */
function updateUrlHash(tabId) {
    // Don't add hash for default generator tab
    if (tabId === 'generator') {
        history.pushState(null, '', window.location.pathname);
    } else {
        history.pushState(null, '', `#${tabId}`);
    }
}

/**
 * Update mobile dropdown selection
 * @param {string} tabId - ID of the active tab
 */
function updateMobileDropdown(tabId) {
    const dropdown = document.querySelector('.tab-dropdown');
    if (dropdown) {
        dropdown.value = tabId;
    }
}

// ============================================
// URL Hash Navigation
// ============================================

/**
 * Parse URL hash and switch to corresponding tab
 */
function handleHashChange() {
    const hash = window.location.hash.slice(1); // Remove '#'
    
    if (hash && tabState.availableTabs.includes(hash)) {
        switchTab(hash);
    } else if (!hash) {
        // No hash = generator tab
        switchTab('generator');
    }
}

// ============================================
// Event Listeners
// ============================================

/**
 * Initialize tab event listeners
 */
export function initTabManager() {
    // Desktop tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const tabId = e.currentTarget.dataset.tab;
            switchTab(tabId);
        });
    });
    
    // Mobile dropdown
    const tabDropdown = document.querySelector('.tab-dropdown');
    if (tabDropdown) {
        tabDropdown.addEventListener('change', (e) => {
            const tabId = e.target.value;
            switchTab(tabId);
        });
    }
    
    // URL hash navigation
    window.addEventListener('hashchange', handleHashChange);
    
    // Handle initial URL hash on page load
    handleHashChange();
    
    // Keyboard shortcuts for tab switching
    document.addEventListener('keydown', (e) => {
        // Alt + 1-5 for tab switching
        if (e.altKey && e.key >= '1' && e.key <= '5') {
            e.preventDefault();
            const tabIndex = parseInt(e.key) - 1;
            const tabId = tabState.availableTabs[tabIndex];
            if (tabId && !tabState.disabledTabs.includes(tabId)) {
                switchTab(tabId);
            }
        }
    });
    
    console.log('✅ Tab Manager initialized');
}

// ============================================
// Public API
// ============================================

/**
 * Get the current active tab
 * @returns {string} Current tab ID
 */
export function getCurrentTab() {
    return tabState.currentTab;
}

/**
 * Enable a tab (useful for enabling tabs as we build them)
 * @param {string} tabId - ID of the tab to enable
 */
export function enableTab(tabId) {
    const index = tabState.disabledTabs.indexOf(tabId);
    if (index > -1) {
        tabState.disabledTabs.splice(index, 1);
        
        // Enable button
        const button = document.querySelector(`[data-tab="${tabId}"]`);
        if (button) {
            button.disabled = false;
        }
        
        // Enable dropdown option
        const option = document.querySelector(`.tab-dropdown option[value="${tabId}"]`);
        if (option) {
            option.disabled = false;
        }
        
        console.log(`✅ Tab "${tabId}" enabled`);
    }
}

/**
 * Disable a tab
 * @param {string} tabId - ID of the tab to disable
 */
export function disableTab(tabId) {
    if (!tabState.disabledTabs.includes(tabId)) {
        tabState.disabledTabs.push(tabId);
        
        // Disable button
        const button = document.querySelector(`[data-tab="${tabId}"]`);
        if (button) {
            button.disabled = true;
        }
        
        // Disable dropdown option
        const option = document.querySelector(`.tab-dropdown option[value="${tabId}"]`);
        if (option) {
            option.disabled = true;
        }
        
        // Switch to generator if disabling current tab
        if (tabState.currentTab === tabId) {
            switchTab('generator');
        }
        
        console.log(`Tab "${tabId}" disabled`);
    }
}

// ============================================
// Export for external use
// ============================================

export default {
    init: initTabManager,
    switchTab,
    getCurrentTab,
    enableTab,
    disableTab
};
