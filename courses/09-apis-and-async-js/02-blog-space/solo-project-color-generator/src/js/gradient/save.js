/* eslint-disable no-unused-vars */
/**
 * Save Gradient Module
 * Handle saving gradients to Firebase with UI
 */

import { saveGradient, updateGradient } from '../firebase/database.js';
import { isUserSignedIn } from '../firebase/auth.js';
import { showModal, closeModal } from '../ui/modal.js';
import { showToast } from '../toast.js';
import { generateGradientCSS } from '../utils/colorMath.js';

/**
 * Show save gradient modal
 * @param {Object} gradient - Gradient object with type, angle, stops
 * @param {Object} existingGradient - Existing gradient data for editing (optional)
 */
export function showSaveGradientModal(gradient, existingGradient = null) {
    if (!isUserSignedIn()) {
        showToast('Please sign in to save gradients', 'error');
        return;
    }
    
    // Validate gradient
    if (!gradient || !gradient.stops || gradient.stops.length < 2) {
        console.error('Invalid gradient data:', gradient);
        showToast('Invalid gradient data', 'error');
        return;
    }
    
    // If existingGradient is provided, we're editing
    const isEditing = !!existingGradient;
    const gradientData = {
        ...gradient,
        ...(existingGradient || {})
    };
    
    // Generate CSS for preview
    const gradientCSS = generateGradientCSS(gradient.type, gradient.angle, gradient.stops);
    
    const modalContent = `
        <form id="save-gradient-form" class="gradient-form">
            <div class="form-group">
                <label for="gradient-name" class="form-label">Gradient Name *</label>
                <input 
                    type="text" 
                    id="gradient-name" 
                    class="form-input"
                    placeholder="e.g., Sunset Vibes"
                    required
                    autocomplete="off"
                    value="${existingGradient?.name || ''}"
                >
            </div>
            
            <div class="form-group">
                <label for="gradient-tags" class="form-label">Tags</label>
                <input 
                    type="text" 
                    id="gradient-tags" 
                    class="form-input"
                    placeholder="e.g., warm, vibrant, hero (comma-separated)"
                    autocomplete="off"
                    value="${existingGradient?.tags?.join(', ') || ''}"
                >
                <small class="form-hint">Separate tags with commas</small>
            </div>
            
            <div class="form-group">
                <label for="gradient-notes" class="form-label">Notes</label>
                <textarea 
                    id="gradient-notes" 
                    class="form-textarea"
                    rows="3"
                    placeholder="Add notes about this gradient..."
                >${existingGradient?.notes || ''}</textarea>
            </div>
            
            <div class="gradient-preview-modal">
                <div class="gradient-preview-modal__label">Preview:</div>
                <div class="gradient-preview-modal__box" style="background: ${gradientCSS}"></div>
                <div class="gradient-preview-modal__info">
                    <span>${gradient.type === 'linear' ? `${gradient.angle}°` : 'Radial'}</span>
                    <span>${gradient.stops.length} stops</span>
                </div>
            </div>
        </form>
    `;
    
    const modal = showModal({
        title: isEditing ? '✏️ Edit Gradient' : '💾 Save Gradient',
        content: modalContent,
        buttons: [
            {
                text: 'Cancel',
                className: 'btn--secondary'
            },
            {
                text: isEditing ? 'Update Gradient' : 'Save Gradient',
                className: 'btn--primary',
                closeOnClick: false,
                onClick: async () => {
                    const form = document.getElementById('save-gradient-form');
                    
                    if (!form.checkValidity()) {
                        form.reportValidity();
                        return;
                    }
                    
                    const name = document.getElementById('gradient-name').value.trim();
                    const tagsInput = document.getElementById('gradient-tags').value.trim();
                    const notes = document.getElementById('gradient-notes').value.trim();
                    
                    // Parse tags
                    const tags = tagsInput
                        ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag)
                        : [];
                    
                    try {
                        const gradientToSave = {
                            name,
                            tags,
                            notes,
                            type: gradient.type,
                            angle: gradient.angle,
                            stops: gradient.stops,
                            css: gradientCSS
                        };
                        
                        if (isEditing && existingGradient?.id) {
                            // Update existing gradient
                            await updateGradient(existingGradient.id, gradientToSave);
                            showToast(`Gradient "${name}" updated successfully!`, 'success');
                        } else {
                            // Save new gradient
                            await saveGradient(gradientToSave);
                            showToast(`Gradient "${name}" saved successfully!`, 'success');
                        }
                        
                        closeModal(modal);
                        
                        // Dispatch event for library to refresh
                        window.dispatchEvent(new CustomEvent('gradientSaved'));
                        
                    } catch (error) {
                        console.error('Error saving gradient:', error);
                        showToast(`Failed to save gradient: ${error.message}`, 'error');
                    }
                }
            }
        ]
    });
    
    // Focus on name input
    setTimeout(() => {
        const nameInput = document.getElementById('gradient-name');
        if (nameInput) nameInput.focus();
    }, 100);
}
