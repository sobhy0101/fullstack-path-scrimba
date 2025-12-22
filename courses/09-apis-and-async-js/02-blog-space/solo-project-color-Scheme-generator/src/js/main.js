/**
 * Color Scheme Generator - Main Application
 * Phase 1: Core functionality with enhanced features
 * 
 * Features:
 * - Generate color schemes from The Color API
 * - Display in multiple formats (HEX, RGB, HSL)
 * - Copy colors to clipboard
 * - URL sharing
 * - Keyboard shortcuts
 * - Responsive design
 */

import { getColorScheme, parseColorScheme, getRandomColor, isValidHexColor } from './colorAPI.js';
import { formatColorValue, getAllFormats, getTextColor } from './colorUtils.js';
import { copyToClipboard, copyColor } from './clipboard.js';
import { showToast } from './toast.js';
import { generateShareableUrl, parseUrlParams, updateUrl, copyCurrentUrl } from './urlSharing.js';
import { initKeyboardShortcuts, initColorCardNavigation, getFocusedColorCard } from './keyboard.js';

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
    loadingState: document.getElementById('loading-state')
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
    console.log('🎨 Color Scheme Generator - Phase 1');
    console.log('Initializing application...');
    
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
    console.log('Keyboard shortcuts:', {
        'Enter': 'Generate scheme',
        'C': 'Copy focused color',
        'R': 'Random color',
        '1-3': 'Switch format (HEX/RGB/HSL)'
    });
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
