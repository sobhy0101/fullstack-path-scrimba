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
            tags: paletteData.tags || [],
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
            // Convert object to array with IDs
            return Object.keys(palettesObj).map(id => ({
                id,
                ...palettesObj[id]
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
            return {
                id: paletteId,
                ...snapshot.val()
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
        
        // Add updatedAt timestamp
        const updateData = {
            ...updates,
            updatedAt: Date.now()
        };
        
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
