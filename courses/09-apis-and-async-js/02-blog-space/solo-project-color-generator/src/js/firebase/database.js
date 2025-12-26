/* eslint-disable no-unused-vars */
/**
 * Firebase Database Operations
 * Handle all Realtime Database interactions for palette storage
 */

import { 
    ref, 
    set, 
    get, 
    update, 
    remove, 
    push,
    query,
    orderByChild,
    equalTo
} from 'firebase/database';
import { database } from './config.js';
import { getCurrentUserInfo } from './auth.js';
import { showToast } from '../toast.js';

/**
 * Save a palette to Firebase
 * @param {Object} paletteData - Palette data to save
 * @param {string} paletteData.name - Palette name
 * @param {Array} paletteData.colors - Array of color objects
 * @param {string} paletteData.scheme - Scheme type
 * @param {string} paletteData.seedColor - Seed color hex
 * @param {Array} paletteData.tags - Array of tags (optional)
 * @param {string} paletteData.notes - Notes about palette (optional)
 * @returns {Promise<string>} Palette ID
 */
export async function savePalette(paletteData) {
    const user = getCurrentUserInfo();
    
    if (!user) {
        showToast('Please sign in to save palettes', 'error');
        throw new Error('User not authenticated');
    }
    
    try {
        // Generate new palette ID
        const palettesRef = ref(database, `users/${user.uid}/palettes`);
        const newPaletteRef = push(palettesRef);
        
        // Prepare palette object
        const palette = {
            name: paletteData.name || 'Untitled Palette',
            colors: paletteData.colors || [],
            scheme: paletteData.scheme || 'monochrome',
            seedColor: paletteData.seedColor || '#000000',
            // Convert tags array to comma-separated string for Firebase
            tags: Array.isArray(paletteData.tags) 
                ? paletteData.tags.join(', ') 
                : (paletteData.tags || ''),
            notes: paletteData.notes || '',
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        
        // Save to database
        await set(newPaletteRef, palette);
        
        showToast('Palette saved successfully! 🎨', 'success');
        
        return newPaletteRef.key;
        
    } catch (error) {
        console.error('Error saving palette:', error);
        showToast('Failed to save palette', 'error');
        throw error;
    }
}

/**
 * Get all palettes for current user
 * @returns {Promise<Array>} Array of palette objects with IDs
 */
export async function getAllPalettes() {
    const user = getCurrentUserInfo();
    
    if (!user) {
        return [];
    }
    
    try {
        const palettesRef = ref(database, `users/${user.uid}/palettes`);
        const snapshot = await get(palettesRef);
        
        if (snapshot.exists()) {
            const palettesObj = snapshot.val();
            // Convert object to array with IDs and parse tags back to array
            return Object.keys(palettesObj).map(id => ({
                id,
                ...palettesObj[id],
                // Convert tags string back to array
                tags: typeof palettesObj[id].tags === 'string' && palettesObj[id].tags
                    ? palettesObj[id].tags.split(',').map(tag => tag.trim())
                    : []
            }));
        }
        
        return [];
        
    } catch (error) {
        console.error('Error fetching palettes:', error);
        showToast('Failed to load palettes', 'error');
        return [];
    }
}

/**
 * Get a single palette by ID
 * @param {string} paletteId - Palette ID
 * @returns {Promise<Object|null>} Palette data or null
 */
export async function getPalette(paletteId) {
    const user = getCurrentUserInfo();
    
    if (!user) {
        return null;
    }
    
    try {
        const paletteRef = ref(database, `users/${user.uid}/palettes/${paletteId}`);
        const snapshot = await get(paletteRef);
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            return {
                id: paletteId,
                ...data,
                // Convert tags string back to array
                tags: typeof data.tags === 'string' && data.tags
                    ? data.tags.split(',').map(tag => tag.trim())
                    : []
            };
        }
        
        return null;
        
    } catch (error) {
        console.error('Error fetching palette:', error);
        throw error;
    }
}

/**
 * Update an existing palette
 * @param {string} paletteId - Palette ID to update
 * @param {Object} updates - Fields to update
 * @returns {Promise<void>}
 */
export async function updatePalette(paletteId, updates) {
    const user = getCurrentUserInfo();
    
    if (!user) {
        showToast('Please sign in to update palettes', 'error');
        throw new Error('User not authenticated');
    }
    
    try {
        const paletteRef = ref(database, `users/${user.uid}/palettes/${paletteId}`);
        
        // Add updatedAt timestamp and convert tags if present
        const updateData = {
            ...updates,
            updatedAt: Date.now()
        };
        
        // Convert tags array to string if present
        if (updates.tags && Array.isArray(updates.tags)) {
            updateData.tags = updates.tags.join(', ');
        }
        
        await update(paletteRef, updateData);
        
        showToast('Palette updated successfully!', 'success');
        
    } catch (error) {
        console.error('Error updating palette:', error);
        showToast('Failed to update palette', 'error');
        throw error;
    }
}

/**
 * Delete a palette
 * @param {string} paletteId - Palette ID to delete
 * @returns {Promise<void>}
 */
export async function deletePalette(paletteId) {
    const user = getCurrentUserInfo();
    
    if (!user) {
        showToast('Please sign in to delete palettes', 'error');
        throw new Error('User not authenticated');
    }
    
    try {
        const paletteRef = ref(database, `users/${user.uid}/palettes/${paletteId}`);
        await remove(paletteRef);
        
        showToast('Palette deleted', 'success');
        
    } catch (error) {
        console.error('Error deleting palette:', error);
        showToast('Failed to delete palette', 'error');
        throw error;
    }
}

/**
 * Search palettes by name or tags
 * @param {string} searchTerm - Term to search for
 * @returns {Promise<Array>} Array of matching palettes
 */
export async function searchPalettes(searchTerm) {
    const allPalettes = await getAllPalettes();
    
    if (!searchTerm || searchTerm.trim() === '') {
        // Return all palettes as array
        return Object.entries(allPalettes).map(([id, data]) => ({
            id,
            ...data
        }));
    }
    
    const term = searchTerm.toLowerCase();
    
    // Filter palettes by name, tags, or notes
    const matches = Object.entries(allPalettes)
        .filter(([id, palette]) => {
            const nameMatch = palette.name.toLowerCase().includes(term);
            const tagsMatch = palette.tags?.some(tag => tag.toLowerCase().includes(term));
            const notesMatch = palette.notes?.toLowerCase().includes(term);
            
            return nameMatch || tagsMatch || notesMatch;
        })
        .map(([id, data]) => ({
            id,
            ...data
        }));
    
    return matches;
}

/**
 * Get palettes count for current user
 * @returns {Promise<number>} Number of palettes
 */
export async function getPalettesCount() {
    const palettes = await getAllPalettes();
    return Object.keys(palettes).length;
}

// ============================================
// Gradient Operations (Phase 3)
// ============================================

/**
 * Save a gradient to Firebase
 * @param {Object} gradientData - Gradient data to save
 * @param {string} gradientData.name - Gradient name
 * @param {string} gradientData.type - 'linear' or 'radial'
 * @param {number} gradientData.angle - Angle in degrees
 * @param {Array} gradientData.stops - Array of color stops
 * @param {Array} gradientData.tags - Array of tags (optional)
 * @param {string} gradientData.notes - Notes about gradient (optional)
 * @returns {Promise<string>} Gradient ID
 */
export async function saveGradient(gradientData) {
    const user = getCurrentUserInfo();
    
    if (!user) {
        showToast('Please sign in to save gradients', 'error');
        throw new Error('User not authenticated');
    }
    
    try {
        // Generate new gradient ID
        const gradientsRef = ref(database, `users/${user.uid}/gradients`);
        const newGradientRef = push(gradientsRef);
        
        // Prepare gradient object
        const gradient = {
            name: gradientData.name || 'Untitled Gradient',
            type: gradientData.type || 'linear',
            angle: gradientData.angle || 90,
            stops: gradientData.stops || [],
            // Convert tags array to comma-separated string for Firebase
            tags: Array.isArray(gradientData.tags) 
                ? gradientData.tags.join(', ') 
                : (gradientData.tags || ''),
            notes: gradientData.notes || '',
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        
        // Save to database
        await set(newGradientRef, gradient);
        
        showToast('Gradient saved successfully! 🌈', 'success');
        
        return newGradientRef.key;
        
    } catch (error) {
        console.error('Error saving gradient:', error);
        showToast('Failed to save gradient', 'error');
        throw error;
    }
}

/**
 * Get all gradients for current user
 * @returns {Promise<Array>} Array of gradient objects with IDs
 */
export async function getAllGradients() {
    const user = getCurrentUserInfo();
    
    if (!user) {
        return [];
    }
    
    try {
        const gradientsRef = ref(database, `users/${user.uid}/gradients`);
        const snapshot = await get(gradientsRef);
        
        if (snapshot.exists()) {
            const gradientsObj = snapshot.val();
            // Convert object to array with IDs and parse tags back to array
            return Object.keys(gradientsObj).map(id => ({
                id,
                ...gradientsObj[id],
                // Convert tags string back to array
                tags: typeof gradientsObj[id].tags === 'string' && gradientsObj[id].tags
                    ? gradientsObj[id].tags.split(',').map(tag => tag.trim())
                    : []
            }));
        }
        
        return [];
        
    } catch (error) {
        console.error('Error fetching gradients:', error);
        showToast('Failed to load gradients', 'error');
        return [];
    }
}

/**
 * Get a single gradient by ID
 * @param {string} gradientId - Gradient ID
 * @returns {Promise<Object|null>} Gradient data or null
 */
export async function getGradient(gradientId) {
    const user = getCurrentUserInfo();
    
    if (!user) {
        return null;
    }
    
    try {
        const gradientRef = ref(database, `users/${user.uid}/gradients/${gradientId}`);
        const snapshot = await get(gradientRef);
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            return {
                id: gradientId,
                ...data,
                // Convert tags string back to array
                tags: typeof data.tags === 'string' && data.tags
                    ? data.tags.split(',').map(tag => tag.trim())
                    : []
            };
        }
        
        return null;
        
    } catch (error) {
        console.error('Error fetching gradient:', error);
        throw error;
    }
}

/**
 * Update an existing gradient
 * @param {string} gradientId - Gradient ID to update
 * @param {Object} updates - Fields to update
 * @returns {Promise<void>}
 */
export async function updateGradient(gradientId, updates) {
    const user = getCurrentUserInfo();
    
    if (!user) {
        showToast('Please sign in to update gradients', 'error');
        throw new Error('User not authenticated');
    }
    
    try {
        const gradientRef = ref(database, `users/${user.uid}/gradients/${gradientId}`);
        
        // Add updatedAt timestamp and convert tags if present
        const updateData = {
            ...updates,
            updatedAt: Date.now()
        };
        
        // Convert tags array to string if present
        if (updates.tags && Array.isArray(updates.tags)) {
            updateData.tags = updates.tags.join(', ');
        }
        
        await update(gradientRef, updateData);
        
        showToast('Gradient updated successfully!', 'success');
        
    } catch (error) {
        console.error('Error updating gradient:', error);
        showToast('Failed to update gradient', 'error');
        throw error;
    }
}

/**
 * Delete a gradient
 * @param {string} gradientId - Gradient ID to delete
 * @returns {Promise<void>}
 */
export async function deleteGradient(gradientId) {
    const user = getCurrentUserInfo();
    
    if (!user) {
        showToast('Please sign in to delete gradients', 'error');
        throw new Error('User not authenticated');
    }
    
    try {
        const gradientRef = ref(database, `users/${user.uid}/gradients/${gradientId}`);
        await remove(gradientRef);
        
        showToast('Gradient deleted', 'success');
        
    } catch (error) {
        console.error('Error deleting gradient:', error);
        showToast('Failed to delete gradient', 'error');
        throw error;
    }
}

