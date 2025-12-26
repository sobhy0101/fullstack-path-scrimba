/* eslint-disable no-unused-vars */

/**
 * Color Scheme Generator - Main Application
 * Phase 1: Core functionality with enhanced features
 * Phase 2: Firebase Integration & Organization
 * Phase 3: Tabbed Interface & Advanced Tools
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
 * - Tabbed interface with Gradient Generator (Phase 3)
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
import { showSaveGradientModal } from './gradient/save.js';
import { downloadPaletteExport, importFromJSON } from './palette/export.js';
import { initLibrary, loadLibrary, hideLibrary, showLibrary } from './ui/library.js';
import { getPalette } from './firebase/database.js';
import { initProfileModal, updateProfileUI, getSignInButton, getSignOutButton, closeProfileModal } from './ui/profile.js';

// Phase 3 imports
import { initTabManager, getCurrentTab } from './tabs/tabManager.js';
import { initGradientTab, getCurrentGradient, loadGradient, triggerRandomGradient } from './tabs/gradients.js';

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
 * Set a random seed color or generate random gradient based on active tab
 */
function randomizeSeedColor() {
    const activeTab = getCurrentTab();
    
    if (activeTab === 'gradients') {
        // Generate random gradient
        triggerRandomGradient();
    } else {
        // Generate random color palette (original behavior)
        const randomColor = getRandomColor();
        state.seedColor = randomColor;
        elements.colorPicker.value = randomColor;
        elements.seedColorDisplay.textContent = randomColor;
        
        // Auto-generate scheme with random color
        generateColorScheme();
    }
}

// ============================================
// Phase 2: Firebase & Palette Management
// ============================================

/**
 * Helper: Convert hex color to RGBA object for Figma
 */
function hexToRgba(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
        a: 1
    } : { r: 0, g: 0, b: 0, a: 1 };
}

/**
 * Handle authentication state changes
 */

function handleAuthStateChange(user) {
    // Update profile modal UI
    updateProfileUI(user);
    
    if (user && user.isSignedIn) {
        // User is signed in
        console.log('User signed in:', user.displayName);
        
        // Enable save and export buttons
        if (elements.savePaletteBtn) elements.savePaletteBtn.disabled = false;
        if (elements.exportBtn) elements.exportBtn.disabled = false;
        
        // Load user's palette library
        loadLibrary();
    } else {
        // User is signed out
        console.log('User signed out');
        
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
 */    closeProfileModal();
    
async function handleSignOut() {
    try {
        await signOutUser();
        closeProfileModal();
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
    const user = getCurrentUser();
    if (!user) {
        showToast('Please sign in to save palettes', 'error');
        return;
    }
    
    // Check which tab is active
    const activeTab = getCurrentTab();
    
    if (activeTab === 'gradients') {
        // Save gradient
        const gradient = getCurrentGradient();
        if (!gradient || !gradient.stops || gradient.stops.length < 2) {
            showToast('Create a gradient first', 'error');
            return;
        }
        showSaveGradientModal(gradient);
    } else {
        // Save color palette (generator tab)
        if (state.currentColors.length === 0) {
            showToast('Generate a color scheme first', 'error');
            return;
        }
        showSavePaletteModal(state.currentColors, state.schemeMode, state.seedColor);
    }
}

/**
 * Handle export button click (toggle dropdown)
 */
function handleExportClick() {
    const activeTab = getCurrentTab();
    
    if (activeTab === 'gradients') {
        const gradient = getCurrentGradient();
        if (!gradient || !gradient.stops || gradient.stops.length < 2) {
            showToast('Create a gradient first', 'error');
            return;
        }
    } else {
        if (state.currentColors.length === 0) {
            showToast('Generate a color scheme first', 'error');
            return;
        }
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
    const activeTab = getCurrentTab();
    
    // Hide menu
    if (elements.exportMenu) elements.exportMenu.hidden = true;
    
    // Handle import separately
    if (format === 'import') {
        handleImportPalette();
        return;
    }
    
    if (activeTab === 'gradients') {
        // Export gradient
        const gradient = getCurrentGradient();
        if (!gradient || !gradient.stops || gradient.stops.length < 2) {
            showToast('Create a gradient first', 'error');
            return;
        }
        
        try {
            const gradientData = {
                name: 'Gradient',
                type: gradient.type,
                angle: gradient.angle,
                stops: gradient.stops,
                tags: [],
                notes: ''
            };
            
            if (format === 'css') {
                // Export CSS file
                const { generateGradientCSS } = await import('./utils/colorMath.js');
                const css = generateGradientCSS(gradient.type, gradient.angle, gradient.stops);
                const cssContent = `:root {\n  --gradient: ${css};\n}\n\n.gradient {\n  background: var(--gradient);\n}`;
                const blob = new Blob([cssContent], { type: 'text/css' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'gradient.css';
                a.click();
                URL.revokeObjectURL(url);
                showToast('Gradient exported as CSS', 'success');
            } else if (format === 'json') {
                // Export JSON
                const json = JSON.stringify(gradientData, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'gradient.json';
                a.click();
                URL.revokeObjectURL(url);
                showToast('Gradient exported as JSON', 'success');
            } else if (format === 'png') {
                // Export PNG
                const { generateGradientCSS } = await import('./utils/colorMath.js');
                const css = generateGradientCSS(gradient.type, gradient.angle, gradient.stops);
                
                // Create canvas
                const canvas = document.createElement('canvas');
                canvas.width = 1200;
                canvas.height = 600;
                const ctx = canvas.getContext('2d');
                
                // Create gradient
                let canvasGradient;
                if (gradient.type === 'linear') {
                    const angleRad = (gradient.angle - 90) * Math.PI / 180;
                    const x1 = canvas.width / 2 - Math.cos(angleRad) * canvas.width / 2;
                    const y1 = canvas.height / 2 - Math.sin(angleRad) * canvas.height / 2;
                    const x2 = canvas.width / 2 + Math.cos(angleRad) * canvas.width / 2;
                    const y2 = canvas.height / 2 + Math.sin(angleRad) * canvas.height / 2;
                    canvasGradient = ctx.createLinearGradient(x1, y1, x2, y2);
                } else {
                    canvasGradient = ctx.createRadialGradient(
                        canvas.width / 2, canvas.height / 2, 0,
                        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
                    );
                }
                
                // Add color stops
                gradient.stops.forEach(stop => {
                    canvasGradient.addColorStop(stop.position / 100, stop.color);
                });
                
                // Fill canvas
                ctx.fillStyle = canvasGradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Download
                canvas.toBlob(blob => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'gradient.png';
                    a.click();
                    URL.revokeObjectURL(url);
                    showToast('Gradient exported as PNG', 'success');
                });
            } else if (format === 'figma') {
                // Figma format (JSON compatible with Figma)
                const figmaGradient = {
                    name: gradientData.name,
                    type: gradient.type === 'linear' ? 'GRADIENT_LINEAR' : 'GRADIENT_RADIAL',
                    gradientStops: gradient.stops.map(stop => ({
                        position: stop.position / 100,
                        color: hexToRgba(stop.color)
                    }))
                };
                
                const json = JSON.stringify({ gradients: [figmaGradient] }, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'gradient-figma.json';
                a.click();
                URL.revokeObjectURL(url);
                showToast('Gradient exported for Figma', 'success');
            } else {
                showToast('This export format is not yet supported for gradients', 'info');
            }
        } catch (error) {
            console.error('Error exporting gradient:', error);
            showToast('Failed to export gradient', 'error');
        }
    } else {
        // Export color palette (existing functionality)
        if (state.currentColors.length === 0) {
            showToast('Generate a color scheme first', 'error');
            return;
        }
        
        try {
            const paletteData = {
                name: 'Color Palette',
                colors: state.currentColors,
                scheme: state.schemeMode,
                seedColor: state.seedColor,
                tags: [],
                notes: ''
            };
            
            // Use the downloadPaletteExport wrapper function
            await downloadPaletteExport(format, paletteData);
            
        } catch (error) {
            console.error('Error exporting palette:', error);
            showToast('Failed to export palette', 'error');
        }
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
            // Read file as text
            const text = await file.text();
            
            // Parse JSON
            const result = importFromJSON(text);
            
            if (result.type === 'gradient') {
                // Load gradient
                loadGradient(result.data);
                
                // Switch to gradients tab
                const gradientsTab = document.querySelector('[data-tab="gradients"]');
                if (gradientsTab) {
                    gradientsTab.click();
                }
                
                showToast('Gradient imported successfully', 'success');
            } else if (result.type === 'palette') {
                // Load palette
                loadPaletteData(result.data);
                showToast('Palette imported successfully', 'success');
            }
        } catch (error) {
            console.error('Error importing:', error);
            showToast('Failed to import. Make sure it\'s a valid JSON file.', 'error');
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
    
    if (paletteData.scheme || paletteData.schemeMode) {
        state.schemeMode = paletteData.scheme || paletteData.schemeMode;
        elements.schemeMode.value = state.schemeMode;
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

/**
 * Handle custom event to load a gradient from library
 */
function handleLoadGradientEvent(event) {
    const gradient = event.detail;
    loadGradient(gradient);
}

/**
 * Handle custom event to edit a gradient
 */
function handleEditGradientEvent(event) {
    const gradient = event.detail;
    showSaveGradientModal(gradient, gradient);
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
    
    // Phase 3: Custom events for gradient library
    document.addEventListener('loadGradient', handleLoadGradientEvent);
    document.addEventListener('editGradient', handleEditGradientEvent);
    
    // Phase 2: Listen for successful palette save to reload library
    document.addEventListener('paletteSaved', () => {
        loadLibrary();
    });
    
    // Phase 3: Listen for successful gradient save to reload library
    window.addEventListener('gradientSaved', () => {
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
    console.log('🎨 Color Scheme Generator - Phase 3');
    console.log('Initializing application...');
    
    // Phase 2: Initialize profile modal
    initProfileModal();
    
    // Phase 2: Wire up auth buttons from profile modal
    const signInBtn = getSignInButton();
    const signOutBtn = getSignOutButton();
    if (signInBtn) signInBtn.addEventListener('click', handleSignIn);
    if (signOutBtn) signOutBtn.addEventListener('click', handleSignOut);
    
    // Phase 2: Initialize Firebase Authentication
    initAuth(handleAuthStateChange);
    
    // Phase 2: Initialize library UI
    initLibrary();
    
    // Phase 3: Initialize tab manager
    initTabManager();
    
    // Phase 3: Initialize gradient tab
    initGradientTab();
    
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
        'Phase 1': 'Color schemes, formats (HEX/RGB/HSL/CMYK), clipboard, URL sharing, keyboard shortcuts',
        'Phase 2': 'Firebase auth, save/load palettes, export (CSS/JSON/Figma/PNG)',
        'Phase 3': 'Tabbed interface with Gradient Generator',
        'Keyboard shortcuts': {
            'Enter': 'Generate scheme',
            'C': 'Copy focused color',
            'R': 'Random color',
            '1-4': 'Switch format (HEX/RGB/HSL/CMYK)',
            'Alt+1-5': 'Switch tabs'
        }
    });
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
