/* eslint-disable no-unused-vars */
/**
 * Save Palette Module
 * Handle saving palettes to Firebase with UI
 */

import { savePalette, updatePalette } from '../firebase/database.js';
import { isUserSignedIn } from '../firebase/auth.js';
import { showModal, closeModal } from '../ui/modal.js';
import { showToast } from '../toast.js';

/**
 * Show save palette modal
 * @param {Array} colors - Array of color objects
 * @param {string} schemeMode - Current scheme mode
 * @param {string} seedColor - Current seed color
 * @param {Object} existingPalette - Existing palette data for editing (optional)
 */
export function showSavePaletteModal(colors = [], schemeMode = 'monochrome', seedColor = '#000000', existingPalette = null) {
    if (!isUserSignedIn()) {
        showToast('Please sign in to save palettes', 'error');
        return;
    }
    
    // Ensure colors is an array
    if (!Array.isArray(colors)) {
        console.error('Colors parameter must be an array, got:', typeof colors);
        showToast('Invalid color data', 'error');
        return;
    }
    
    // If existingPalette is provided, we're editing
    const isEditing = !!existingPalette;
    const paletteData = {
        colors,
        schemeMode,
        seedColor,
        ...(existingPalette || {})
    };
    
    const modalContent = `
        <form id="save-palette-form" class="palette-form">
            <div class="form-group">
                <label for="palette-name" class="form-label">Palette Name *</label>
                <input 
                    type="text" 
                    id="palette-name" 
                    class="form-input"
                    placeholder="e.g., Ocean Breeze"
                    required
                    autocomplete="off"
                    value="${existingPalette?.name || ''}"
                >
            </div>
            
            <div class="form-group">
                <label for="palette-tags" class="form-label">Tags</label>
                <input 
                    type="text" 
                    id="palette-tags" 
                    class="form-input"
                    placeholder="e.g., blue, nature, calm (comma-separated)"
                    autocomplete="off"
                    value="${existingPalette?.tags?.join(', ') || ''}"
                >
                <small class="form-hint">Separate tags with commas</small>
            </div>
            
            <div class="form-group">
                <label for="palette-notes" class="form-label">Notes</label>
                <textarea 
                    id="palette-notes" 
                    class="form-textarea"
                    rows="3"
                    placeholder="Add notes about this palette..."
                >${existingPalette?.notes || ''}</textarea>
            </div>
            
            <div class="palette-preview">
                <div class="palette-preview__label">Colors:</div>
                <div class="palette-preview__colors">
                    ${colors.map(color => `
                        <div class="palette-preview__swatch" style="background-color: ${color.hex}" title="${color.name}"></div>
                    `).join('')}
                </div>
            </div>
        </form>
    `;
    
    const modal = showModal({
        title: isEditing ? '✏️ Edit Palette' : '💾 Save Palette',
        content: modalContent,
        buttons: [
            {
                text: 'Cancel',
                className: 'btn--secondary'
            },
            {
                text: isEditing ? 'Update Palette' : 'Save Palette',
                className: 'btn--primary',
                closeOnClick: false,
                onClick: async () => {
                    const form = document.getElementById('save-palette-form');
                    
                    if (!form.checkValidity()) {
                        form.reportValidity();
                        return;
                    }
                    
                    const name = document.getElementById('palette-name').value.trim();
                    const tagsInput = document.getElementById('palette-tags').value.trim();
                    const notes = document.getElementById('palette-notes').value.trim();
                    
                    // Parse tags
                    const tags = tagsInput 
                        ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
                        : [];
                    
                    try {
                        const paletteToSave = {
                            name,
                            colors,
                            scheme: schemeMode,
                            seedColor,
                            tags,
                            notes
                        };
                        
                        if (isEditing && existingPalette.id) {
                            // Update existing palette
                            await updatePalette(existingPalette.id, paletteToSave);
                        } else {
                            // Save new palette
                            await savePalette(paletteToSave);
                        }
                        
                        closeModal(modal);
                        
                        // Dispatch event to reload library
                        document.dispatchEvent(new CustomEvent('paletteSaved'));
                        
                    } catch (error) {
                        console.error('Failed to save palette:', error);
                    }
                }
            }
        ]
    });
    
    // Focus on name input
    setTimeout(() => {
        const nameInput = document.getElementById('palette-name');
        if (nameInput) nameInput.focus();
    }, 100);
}
