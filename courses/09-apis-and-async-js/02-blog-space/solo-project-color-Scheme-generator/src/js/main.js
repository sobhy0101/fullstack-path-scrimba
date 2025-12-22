/**
 * Color Scheme Generator - Main Application
 * Phase 1: Core functionality with enhanced features
 * Phase 2: Firebase Integration & Organization
 * 
 * Features:
 * - Generate color schemes from The Color API
 * - Display in multiple formats (HEX, RGB, HSL)
 * - Copy colors to clipboard
 * - URL sharing
 * - Keyboard shortcuts
 * - Responsive design
 * - Firebase Authentication (Google Sign-In)
 * - Save/load palettes to Firebase
 * - Palette library with search/filter
 * - Export capabilities (CSS, JSON, Figma, PNG)
 */

import { getColorScheme, parseColorScheme, getRandomColor, isValidHexColor } from './colorAPI.js';
import { formatColorValue, getAllFormats, getTextColor } from './colorUtils.js';
import { copyToClipboard, copyColor } from './clipboard.js';
import { showToast } from './toast.js';
import { generateShareableUrl, parseUrlParams, updateUrl, copyCurrentUrl } from './urlSharing.js';
import { initKeyboardShortcuts, initColorCardNavigation, getFocusedColorCard } from './keyboard.js';

// Phase 2 imports
import { initAuth, signInWithGoogle, signOutUser, getCurrentUser } from './firebase/auth.js';
import { showSavePaletteModal } from './palette/save.js';
import { exportAsCSSVariables, exportAsJSON, exportAsFigmaFormat, exportAsPNG, importFromJSON } from './palette/export.js';
import { initLibrary, loadLibrary, hideLibrary, showLibrary } from './ui/library.js';
import { getPalette } from './firebase/database.js';

// ============================================
// State Management
// ============================================

const state = {
    currentColors: [],
    currentFormat: 'hex',
    seedColor: '#F55A5A',
    schemeMode: 'monochrome',
    isLoading: false
};

// ============================================
// DOM Elements
// ============================================

const elements = {
    colorPicker: document.getElementById('color-picker'),
    seedColorDisplay: document.getElementById('seed-color-display'),
    schemeMode: document.getElementById('scheme-mode'),
    generateBtn: document.getElementById('generate-btn'),
    colorsContainer: document.getElementById('colors-container'),
    formatButtons: document.querySelectorAll('.format-btn'),
    shareUrlBtn: document.getElementById('share-url-btn'),
    randomBtn: document.getElementById('random-btn'),
    loadingState: document.getElementById('loading-state'),
    // Phase 2 elements
    signInBtn: document.getElementById('sign-in-btn'),
    signOutBtn: document.getElementById('sign-out-btn'),
    userInfo: document.getElementById('user-info'),
    userAvatar: document.getElementById('user-avatar'),
    userName: document.getElementById('user-name'),
    userEmail: document.getElementById('user-email'),
    signInPrompt: document.getElementById('sign-in-prompt'),
    savePaletteBtn: document.getElementById('save-palette-btn'),
    exportBtn: document.getElementById('export-btn'),
    exportMenu: document.getElementById('export-menu')
};

// ============================================
// Color Display Functions
// ============================================

/**
 * Render a single color card
 * @param {Object} color - Color object with hex, rgb, hsl, name
 * @param {number} index - Index for animation delay
 * @returns {HTMLElement} Color card element
 */
function createColorCard(color, index) {
    const card = document.createElement('div');
    card.className = 'color-card fade-in';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Color: ${color.name}. Value: ${formatColorValue(color, state.currentFormat)}. Click to copy.`);
    
    // Determine text color for swatch
    const textColor = getTextColor(color.hex);
    
    // Get all formats for this color
    const formats = getAllFormats(color);
    
    card.innerHTML = `
        <div class="color-card__swatch" style="background-color: ${color.hex};">
            <div class="color-card__copy-indicator" style="color: ${textColor};">
                Copied!
            </div>
        </div>
        <div class="color-card__info">
            <div class="color-card__name">${color.name}</div>
            <div class="color-card__value">${formatColorValue(color, state.currentFormat)}</div>
            <div class="color-card__formats">
                <div class="color-card__format-item">
                    <span class="color-card__format-label">HEX</span>
                    <span class="color-card__format-value">${formats.hex}</span>
                </div>
                <div class="color-card__format-item">
                    <span class="color-card__format-label">RGB</span>
                    <span class="color-card__format-value">${formats.rgb}</span>
                </div>
                <div class="color-card__format-item">
                    <span class="color-card__format-label">HSL</span>
                    <span class="color-card__format-value">${formats.hsl}</span>
                </div>
            </div>
        </div>
    `;
    
    // Add click handler to copy current format
    card.addEventListener('click', () => {
        const value = formatColorValue(color, state.currentFormat);
        const swatch = card.querySelector('.color-card__swatch');
        copyColor(value, swatch, state.currentFormat.toUpperCase());
    });
    
    // Add keyboard support
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
    
    return card;
}

/**
 * Render all color cards to the DOM
 * @param {Array} colors - Array of color objects
 */
function renderColors(colors) {
    if (!colors || colors.length === 0) {
        elements.colorsContainer.innerHTML = `
            <div class="loading-state">
                <p>No colors to display. Click "Get Color Scheme" to generate.</p>
            </div>
        `;
        return;
    }
    
    // Clear container
    elements.colorsContainer.innerHTML = '';
    
    // Create and append color cards
    colors.forEach((color, index) => {
        const card = createColorCard(color, index);
        elements.colorsContainer.appendChild(card);
    });
}

/**
 * Show loading state
 */
function showLoading() {
    state.isLoading = true;
    elements.generateBtn.disabled = true;
    elements.colorsContainer.innerHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p class="loading-text">Generating color scheme...</p>
        </div>
    `;
}

/**
 * Hide loading state
 */
function hideLoading() {
    state.isLoading = false;
    elements.generateBtn.disabled = false;
}

// ============================================
// Format Switching
// ============================================

/**
 * Switch color display format
 * @param {string} format - Format to switch to ('hex', 'rgb', 'hsl')
 */
function switchFormat(format) {
    state.currentFormat = format;
    
    // Update button states
    elements.formatButtons.forEach(btn => {
        if (btn.dataset.format === format) {
            btn.classList.add('format-btn--active');
        } else {
            btn.classList.remove('format-btn--active');
        }
    });
    
    // Re-render colors with new format
    if (state.currentColors.length > 0) {
        renderColors(state.currentColors);
    }
}

// ============================================
// Color Scheme Generation
// ============================================

/**
 * Generate and display color scheme
 */
async function generateColorScheme() {
    if (state.isLoading) return;
    
    try {
        showLoading();
        
        // Get current values
        const seed = state.seedColor;
        const mode = state.schemeMode;
        
        // Validate hex color
        if (!isValidHexColor(seed)) {
            throw new Error('Invalid hex color');
        }
        
        // Fetch color scheme from API
        const schemeData = await getColorScheme(seed, mode, 5);
        
        // Parse response
        const colors = parseColorScheme(schemeData);
        
        // Update state
        state.currentColors = colors;
        
        // Update URL
        updateUrl(seed, mode);
        
        // Render colors
        renderColors(colors);
        
        hideLoading();
        
    } catch (error) {
        console.error('Error generating color scheme:', error);
        showToast('Failed to generate color scheme. Please try again.', 'error');
        
        elements.colorsContainer.innerHTML = `
            <div class="loading-state">
                <p>❌ Error: ${error.message}</p>
                <button class="btn btn--primary" onclick="location.reload()">Retry</button>
            </div>
        `;
        
        hideLoading();
    }
}

/**
 * Set a random seed color
 */
function randomizeSeedColor() {
    const randomColor = getRandomColor();
    state.seedColor = randomColor;
    elements.colorPicker.value = randomColor;
    elements.seedColorDisplay.textContent = randomColor;
    
    // Auto-generate scheme with random color
    generateColorScheme();
}

// ============================================
// Phase 2: Firebase & Palette Management
// ============================================

/**
 * Handle authentication state changes
 */
function handleAuthStateChange(user) {
    if (user && user.isSignedIn) {
        // User is signed in
        console.log('User signed in:', user.displayName);
        
        // Update UI to show user info
        if (elements.signInPrompt) elements.signInPrompt.hidden = true;
        if (elements.userInfo) elements.userInfo.hidden = false;
        if (elements.userAvatar) elements.userAvatar.src = user.photoURL || '';
        if (elements.userName) elements.userName.textContent = user.displayName || user.email;
        if (elements.userEmail) elements.userEmail.textContent = user.email || '';
        
        // Enable save and export buttons
        if (elements.savePaletteBtn) elements.savePaletteBtn.disabled = false;
        if (elements.exportBtn) elements.exportBtn.disabled = false;
        
        // Load user's palette library
        loadLibrary();
    } else {
        // User is signed out
        console.log('User signed out');
        
        // Update UI to show sign-in prompt
        if (elements.signInPrompt) elements.signInPrompt.hidden = false;
        if (elements.userInfo) elements.userInfo.hidden = true;
        
        // Disable save and export buttons
        if (elements.savePaletteBtn) elements.savePaletteBtn.disabled = true;
        if (elements.exportBtn) elements.exportBtn.disabled = true;
        
        // Hide library
        hideLibrary();
    }
}

/**
 * Handle Google sign-in
 */
async function handleSignIn() {
    try {
        await signInWithGoogle();
        showToast('Signed in successfully!', 'success');
    } catch (error) {
        console.error('Error signing in:', error);
        showToast('Failed to sign in. Please try again.', 'error');
    }
}

/**
 * Handle sign-out
 */
async function handleSignOut() {
    try {
        await signOutUser();
        showToast('Signed out successfully', 'success');
    } catch (error) {
        console.error('Error signing out:', error);
        showToast('Failed to sign out', 'error');
    }
}

/**
 * Handle save palette button click
 */
function handleSavePalette() {
    if (state.currentColors.length === 0) {
        showToast('Generate a color scheme first', 'error');
        return;
    }
    
    const user = getCurrentUser();
    if (!user) {
        showToast('Please sign in to save palettes', 'error');
        return;
    }
    
    showSavePaletteModal(state.currentColors, state.schemeMode, state.seedColor);
}

/**
 * Handle export button click (toggle dropdown)
 */
function handleExportClick() {
    if (state.currentColors.length === 0) {
        showToast('Generate a color scheme first', 'error');
        return;
    }
    
    const menu = elements.exportMenu;
    if (!menu) return;
    
    // Toggle menu visibility
    menu.hidden = !menu.hidden;
}

/**
 * Handle export format selection
 */
async function handleExportFormat(format) {
    if (state.currentColors.length === 0) {
        showToast('Generate a color scheme first', 'error');
        return;
    }
    
    // Hide menu
    if (elements.exportMenu) elements.exportMenu.hidden = true;
    
    // Handle import separately
    if (format === 'import') {
        handleImportPalette();
        return;
    }
    
    try {
        const paletteData = {
            colors: state.currentColors,
            schemeMode: state.schemeMode,
            seedColor: state.seedColor
        };
        
        switch (format) {
            case 'css':
                exportAsCSSVariables(paletteData);
                showToast('Exported as CSS variables', 'success');
                break;
            case 'json':
                exportAsJSON(paletteData);
                showToast('Exported as JSON', 'success');
                break;
            case 'figma':
                exportAsFigmaFormat(paletteData);
                showToast('Exported in Figma format', 'success');
                break;
            case 'png':
                await exportAsPNG(paletteData);
                showToast('Exported as PNG image', 'success');
                break;
        }
    } catch (error) {
        console.error('Error exporting palette:', error);
        showToast('Failed to export palette', 'error');
    }
}

/**
 * Handle import palette from JSON
 */
function handleImportPalette() {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            const paletteData = await importFromJSON(file);
            
            // Load the imported palette
            loadPaletteData(paletteData);
            showToast('Palette imported successfully', 'success');
        } catch (error) {
            console.error('Error importing palette:', error);
            showToast('Failed to import palette. Make sure it\'s a valid JSON file.', 'error');
        }
    };
    
    input.click();
}

/**
 * Load palette data into the application
 */
function loadPaletteData(paletteData) {
    // Update state
    if (paletteData.seedColor) {
        state.seedColor = paletteData.seedColor;
        elements.colorPicker.value = paletteData.seedColor;
        elements.seedColorDisplay.textContent = paletteData.seedColor.toUpperCase();
    }
    
    if (paletteData.schemeMode) {
        state.schemeMode = paletteData.schemeMode;
        elements.schemeMode.value = paletteData.schemeMode;
    }
    
    if (paletteData.colors && paletteData.colors.length > 0) {
        state.currentColors = paletteData.colors;
        renderColors(paletteData.colors);
        
        // Update URL
        updateUrl(state.seedColor, state.schemeMode);
    }
}

/**
 * Handle custom event to load a palette from library
 */
function handleLoadPaletteEvent(event) {
    const palette = event.detail;
    loadPaletteData(palette);
}

/**
 * Handle custom event to edit a palette
 */
function handleEditPaletteEvent(event) {
    const palette = event.detail;
    showSavePaletteModal(palette.colors, palette.schemeMode, palette.seedColor, palette);
}

// ============================================
// Event Handlers
// ============================================

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    // Color picker change
    elements.colorPicker.addEventListener('input', (e) => {
        state.seedColor = e.target.value;
        elements.seedColorDisplay.textContent = e.target.value.toUpperCase();
    });
    
    // Scheme mode change
    elements.schemeMode.addEventListener('change', (e) => {
        state.schemeMode = e.target.value;
    });
    
    // Generate button click
    elements.generateBtn.addEventListener('click', generateColorScheme);
    
    // Format button clicks
    elements.formatButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchFormat(btn.dataset.format);
        });
    });
    
    // Share URL button
    elements.shareUrlBtn.addEventListener('click', async () => {
        await copyCurrentUrl(copyToClipboard);
    });
    
    // Random button
    elements.randomBtn.addEventListener('click', randomizeSeedColor);
    
    // Phase 2: Authentication event listeners
    if (elements.signInBtn) {
        elements.signInBtn.addEventListener('click', handleSignIn);
    }
    
    if (elements.signOutBtn) {
        elements.signOutBtn.addEventListener('click', handleSignOut);
    }
    
    // Phase 2: Save palette button
    if (elements.savePaletteBtn) {
        elements.savePaletteBtn.addEventListener('click', handleSavePalette);
    }
    
    // Phase 2: Export button and menu
    if (elements.exportBtn) {
        elements.exportBtn.addEventListener('click', handleExportClick);
    }
    
    if (elements.exportMenu) {
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!elements.exportBtn?.contains(e.target) && !elements.exportMenu?.contains(e.target)) {
                elements.exportMenu.hidden = true;
            }
        });
        
        // Handle export format selection
        const exportItems = elements.exportMenu.querySelectorAll('.dropdown-item');
        exportItems.forEach(item => {
            item.addEventListener('click', () => {
                const format = item.dataset.exportFormat;
                handleExportFormat(format);
            });
        });
    }
    
    // Phase 2: Custom events for palette library
    document.addEventListener('loadPalette', handleLoadPaletteEvent);
    document.addEventListener('editPalette', handleEditPaletteEvent);
    
    // Phase 2: Listen for successful palette save to reload library
    document.addEventListener('paletteSaved', () => {
        loadLibrary();
    });
    
    // Keyboard shortcuts
    initKeyboardShortcuts({
        onGenerate: generateColorScheme,
        onCopy: () => {
            const focusedCard = getFocusedColorCard();
            if (focusedCard) {
                focusedCard.click();
            } else if (state.currentColors.length > 0) {
                // Copy first color if none focused
                const firstColor = state.currentColors[0];
                const value = formatColorValue(firstColor, state.currentFormat);
                copyColor(value, null, state.currentFormat.toUpperCase());
            }
        },
        onRandom: randomizeSeedColor,
        onFormatSwitch: switchFormat
    });
    
    // Color card navigation
    initColorCardNavigation();
}

// ============================================
// Initialization
// ============================================

/**
 * Initialize the application
 */
async function init() {
    console.log('🎨 Color Scheme Generator - Phase 2');
    console.log('Initializing application...');
    
    // Phase 2: Initialize Firebase Authentication
    initAuth(handleAuthStateChange);
    
    // Phase 2: Initialize library UI
    initLibrary();
    
    // Check for URL parameters
    const urlParams = parseUrlParams();
    if (urlParams) {
        console.log('Loading scheme from URL params:', urlParams);
        state.seedColor = urlParams.seed;
        state.schemeMode = urlParams.scheme;
        
        // Update UI
        elements.colorPicker.value = urlParams.seed;
        elements.seedColorDisplay.textContent = urlParams.seed.toUpperCase();
        elements.schemeMode.value = urlParams.scheme;
        
        // Auto-generate scheme
        await generateColorScheme();
    }
    
    // Initialize event listeners
    initEventListeners();
    
    console.log('✅ Application initialized successfully!');
    console.log('Features:', {
        'Phase 1': 'Color schemes, formats, clipboard, URL sharing, keyboard shortcuts',
        'Phase 2': 'Firebase auth, save/load palettes, export (CSS/JSON/Figma/PNG)',
        'Keyboard shortcuts': {
            'Enter': 'Generate scheme',
            'C': 'Copy focused color',
            'R': 'Random color',
            '1-3': 'Switch format (HEX/RGB/HSL)'
        }
    });
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
