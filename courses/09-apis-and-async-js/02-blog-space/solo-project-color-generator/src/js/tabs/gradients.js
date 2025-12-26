/**
 * Gradient Generator Module
 * Phase 3: Tab 2 - Gradient Generation Tool
 * 
 * Features:
 * - Linear and radial gradients
 * - 2-5 color stops with position control
 * - Angle control for linear gradients
 * - Live preview
 * - CSS code generation and copy
 * - Random gradient generation
 * - Save to Firebase (coming soon)
 */

import { 
    generateGradientCSS, 
    generateRandomGradient, 
    generateRandomPleasantColor,
    isValidHex,
    ensureHashPrefix 
} from '../utils/colorMath.js';
import { copyToClipboard } from '../clipboard.js';
import { showToast } from '../toast.js';

// ============================================
// State
// ============================================

const gradientState = {
    type: 'linear', // 'linear' or 'radial'
    angle: 90,
    stops: [
        { id: 1, color: '#FF5733', position: 0 },
        { id: 2, color: '#42B983', position: 100 }
    ],
    nextStopId: 3
};

// ============================================
// DOM Elements
// ============================================

let elements = {};

// ============================================
// Gradient Generation
// ============================================

/**
 * Update gradient preview and CSS code
 */
function updateGradientPreview() {
    const { type, angle, stops } = gradientState;
    
    // Generate CSS
    const cssGradient = generateGradientCSS(type, angle, stops);
    
    // Update preview
    if (elements.gradientPreview) {
        elements.gradientPreview.style.background = cssGradient;
    }
    
    // Update CSS code display
    if (elements.gradientCssCode) {
        elements.gradientCssCode.textContent = `background: ${cssGradient};`;
    }
}

/**
 * Add a new color stop
 */
function addColorStop() {
    // Max 5 stops
    if (gradientState.stops.length >= 5) {
        showToast('Maximum 5 color stops allowed', 'warning');
        return;
    }
    
    // Find a good position for the new stop (middle of largest gap)
    const positions = gradientState.stops.map(s => s.position).sort((a, b) => a - b);
    let maxGap = 0;
    let newPosition = 50;
    
    for (let i = 0; i < positions.length - 1; i++) {
        const gap = positions[i + 1] - positions[i];
        if (gap > maxGap) {
            maxGap = gap;
            newPosition = Math.round((positions[i] + positions[i + 1]) / 2);
        }
    }
    
    // Generate a pleasant random color
    const newColor = generateRandomPleasantColor();
    
    const newStop = {
        id: gradientState.nextStopId++,
        color: newColor,
        position: newPosition
    };
    
    gradientState.stops.push(newStop);
    renderColorStops();
    updateGradientPreview();
}

/**
 * Remove a color stop
 * @param {number} stopId - ID of stop to remove
 */
function removeColorStop(stopId) {
    // Must have at least 2 stops
    if (gradientState.stops.length <= 2) {
        showToast('Minimum 2 color stops required', 'warning');
        return;
    }
    
    gradientState.stops = gradientState.stops.filter(s => s.id !== stopId);
    renderColorStops();
    updateGradientPreview();
}

/**
 * Update a color stop
 * @param {number} stopId - ID of stop to update
 * @param {string} property - Property to update ('color' or 'position')
 * @param {any} value - New value
 */
function updateColorStop(stopId, property, value) {
    const stop = gradientState.stops.find(s => s.id === stopId);
    if (!stop) return;
    
    if (property === 'color') {
        // Validate hex color
        const color = ensureHashPrefix(value);
        if (isValidHex(color)) {
            stop.color = color.toUpperCase();
        }
    } else if (property === 'position') {
        // Clamp position between 0-100
        stop.position = Math.max(0, Math.min(100, parseInt(value) || 0));
    }
    
    renderColorStops();
    updateGradientPreview();
}

/**
 * Generate random gradient
 */
function generateRandom() {
    const randomGrad = generateRandomGradient();
    
    gradientState.type = randomGrad.type;
    gradientState.angle = randomGrad.angle;
    gradientState.stops = randomGrad.stops.map((stop, index) => ({
        id: gradientState.nextStopId++,
        ...stop
    }));
    
    // Update UI
    if (elements.gradientType) {
        elements.gradientType.value = gradientState.type;
    }
    if (elements.gradientAngle) {
        elements.gradientAngle.value = gradientState.angle;
    }
    if (elements.gradientAngleValue) {
        elements.gradientAngleValue.textContent = gradientState.angle;
    }
    
    // Show/hide angle control
    updateAngleVisibility();
    
    renderColorStops();
    updateGradientPreview();
    
    showToast('Random gradient generated! 🎨');
}

/**
 * Copy gradient CSS to clipboard
 */
function copyGradientCSS() {
    const { type, angle, stops } = gradientState;
    const cssGradient = generateGradientCSS(type, angle, stops);
    const cssCode = `background: ${cssGradient};`;
    
    copyToClipboard(cssCode);
    showToast('Gradient CSS copied! 📋');
}

// ============================================
// Rendering
// ============================================

/**
 * Render color stops list
 */
function renderColorStops() {
    if (!elements.gradientStopsContainer) return;
    
    // Sort stops by position for display
    const sortedStops = [...gradientState.stops].sort((a, b) => a.position - b.position);
    
    elements.gradientStopsContainer.innerHTML = sortedStops.map(stop => `
        <div class="gradient-stop" data-stop-id="${stop.id}">
            <input 
                type="color" 
                class="stop-color-input" 
                value="${stop.color}"
                data-stop-id="${stop.id}"
                aria-label="Color for stop at ${stop.position}%"
            />
            <input 
                type="text" 
                class="stop-hex-input" 
                value="${stop.color}"
                data-stop-id="${stop.id}"
                aria-label="Hex color code"
            />
            <input 
                type="number" 
                class="stop-position-input" 
                value="${stop.position}"
                min="0"
                max="100"
                data-stop-id="${stop.id}"
                aria-label="Position percentage"
            />
            <button 
                class="stop-remove-btn" 
                data-stop-id="${stop.id}"
                aria-label="Remove color stop"
                type="button"
                ${gradientState.stops.length <= 2 ? 'disabled' : ''}
            >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `).join('');
    
    // Attach event listeners to new stops
    attachStopListeners();
}

/**
 * Attach event listeners to color stop inputs
 */
function attachStopListeners() {
    // Color picker inputs
    const colorInputs = elements.gradientStopsContainer.querySelectorAll('.stop-color-input');
    colorInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const stopId = parseInt(e.target.dataset.stopId);
            updateColorStop(stopId, 'color', e.target.value);
            
            // Update hex input
            const hexInput = e.target.nextElementSibling;
            if (hexInput) {
                hexInput.value = e.target.value.toUpperCase();
            }
        });
    });
    
    // Hex text inputs
    const hexInputs = elements.gradientStopsContainer.querySelectorAll('.stop-hex-input');
    hexInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const stopId = parseInt(e.target.dataset.stopId);
            const color = ensureHashPrefix(e.target.value);
            
            if (isValidHex(color)) {
                updateColorStop(stopId, 'color', color);
                
                // Update color picker
                const colorInput = e.target.previousElementSibling;
                if (colorInput) {
                    colorInput.value = color;
                }
            } else {
                showToast('Invalid hex color format', 'error');
                // Reset to current value
                const stop = gradientState.stops.find(s => s.id === stopId);
                if (stop) {
                    e.target.value = stop.color;
                }
            }
        });
    });
    
    // Position inputs
    const positionInputs = elements.gradientStopsContainer.querySelectorAll('.stop-position-input');
    positionInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const stopId = parseInt(e.target.dataset.stopId);
            updateColorStop(stopId, 'position', e.target.value);
        });
    });
    
    // Remove buttons
    const removeButtons = elements.gradientStopsContainer.querySelectorAll('.stop-remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const stopId = parseInt(e.target.closest('.stop-remove-btn').dataset.stopId);
            removeColorStop(stopId);
        });
    });
}

/**
 * Update angle control visibility based on gradient type
 */
function updateAngleVisibility() {
    const angleGroup = document.getElementById('gradient-angle-group');
    if (angleGroup) {
        angleGroup.style.display = gradientState.type === 'linear' ? 'block' : 'none';
    }
}

// ============================================
// Event Listeners
// ============================================

/**
 * Setup all event listeners for gradient tab
 */
function setupEventListeners() {
    // Gradient type selector
    if (elements.gradientType) {
        elements.gradientType.addEventListener('change', (e) => {
            gradientState.type = e.target.value;
            updateAngleVisibility();
            updateGradientPreview();
        });
    }
    
    // Gradient angle slider
    if (elements.gradientAngle) {
        elements.gradientAngle.addEventListener('input', (e) => {
            gradientState.angle = parseInt(e.target.value);
            if (elements.gradientAngleValue) {
                elements.gradientAngleValue.textContent = gradientState.angle;
            }
            updateGradientPreview();
        });
    }
    
    // Add stop button
    if (elements.addStopBtn) {
        elements.addStopBtn.addEventListener('click', addColorStop);
    }
    
    // Copy CSS code button
    if (elements.copyCssCode) {
        elements.copyCssCode.addEventListener('click', copyGradientCSS);
    }
}

// ============================================
// Initialization
// ============================================

/**
 * Initialize gradient generator tab
 * @returns {Function} Cleanup function
 */
export function initGradientTab() {
    // Get DOM elements
    elements = {
        gradientType: document.getElementById('gradient-type'),
        gradientAngle: document.getElementById('gradient-angle'),
        gradientAngleValue: document.getElementById('gradient-angle-value'),
        gradientStopsContainer: document.getElementById('gradient-stops-container'),
        addStopBtn: document.getElementById('add-stop-btn'),
        gradientPreview: document.getElementById('gradient-preview'),
        gradientCssCode: document.getElementById('gradient-css-code'),
        copyCssCode: document.getElementById('copy-css-code')
    };
    
    // Setup event listeners
    setupEventListeners();
    
    // Initial render
    renderColorStops();
    updateGradientPreview();
    updateAngleVisibility();
    
    console.log('✅ Gradient Generator initialized');
    
    // Return cleanup function (if needed)
    return () => {
        console.log('Gradient Generator cleaned up');
    };
}

// ============================================
// Public API
// ============================================

/**
 * Get current gradient state (for saving to Firebase)
 * @returns {Object} Current gradient configuration
 */
export function getCurrentGradient() {
    return {
        type: gradientState.type,
        angle: gradientState.angle,
        stops: gradientState.stops.map(s => ({ ...s })) // Deep copy
    };
}

/**
 * Load a gradient configuration
 * @param {Object} gradient - Gradient configuration to load
 */
export function loadGradient(gradient) {
    if (!gradient) return;
    
    gradientState.type = gradient.type || 'linear';
    gradientState.angle = gradient.angle || 90;
    gradientState.stops = gradient.stops || gradientState.stops;
    
    // Update UI
    if (elements.gradientType) {
        elements.gradientType.value = gradientState.type;
    }
    if (elements.gradientAngle) {
        elements.gradientAngle.value = gradientState.angle;
    }
    if (elements.gradientAngleValue) {
        elements.gradientAngleValue.textContent = gradientState.angle;
    }
    
    updateAngleVisibility();
    renderColorStops();
    updateGradientPreview();
    
    console.log('Gradient loaded:', gradient);
}

/**
 * Generate and apply a random gradient (exported for global random button)
 */
export function triggerRandomGradient() {
    generateRandom();
}

export default {
    init: initGradientTab,
    getCurrentGradient,
    loadGradient,
    triggerRandomGradient
};
