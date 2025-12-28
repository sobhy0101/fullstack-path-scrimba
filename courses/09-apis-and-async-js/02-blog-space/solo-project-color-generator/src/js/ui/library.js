/* eslint-disable no-unused-vars */
/**
 * Palette Library UI Module
 * Handles displaying, searching, and managing the palette library
 */

import { getAllPalettes, deletePalette, searchPalettes, getAllGradients, deleteGradient } from '../firebase/database.js';
import { showConfirmDialog } from '../ui/modal.js';
import { showToast } from '../toast.js';
import { generateGradientCSS } from '../utils/colorMath.js';

// Library state
let allPalettes = [];
let allGradients = [];
let allItems = []; // Combined palettes and gradients
let filteredItems = [];
let currentSort = 'recent';

/**
 * Initialize the library section
 */
export function initLibrary() {
    const searchInput = document.getElementById('library-search');
    const sortSelect = document.getElementById('library-sort');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
}

/**
 * Load and display all palettes and gradients
 */
export async function loadLibrary() {
    try {
        // Load both palettes and gradients in parallel
        const [palettes, gradients] = await Promise.all([
            getAllPalettes(),
            getAllGradients()
        ]);
        
        allPalettes = palettes;
        allGradients = gradients;
        
        // Tag items with their type and combine
        allItems = [
            ...palettes.map(p => ({ ...p, itemType: 'palette' })),
            ...gradients.map(g => ({ ...g, itemType: 'gradient' }))
        ];
        
        filteredItems = [...allItems];
        sortItems(currentSort);
        renderLibrary();
    } catch (error) {
        console.error('Error loading library:', error);
        showToast('Failed to load library', 'error');
    }
}

/**
 * Render the library grid
 */
function renderLibrary() {
    const libraryGrid = document.getElementById('library-grid');
    const librarySection = document.getElementById('library-section');
    
    if (!libraryGrid || !librarySection) return;
    
    // Show library section
    librarySection.hidden = false;
    
    // Clear existing content
    libraryGrid.innerHTML = '';
    
    // Show empty state if no items
    if (filteredItems.length === 0) {
        const message = allItems.length === 0 
            ? 'No saved items yet' 
            : 'No items match your search';
        
        libraryGrid.innerHTML = `
            <div class="library-empty">
                <svg class="empty-icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8h48v48H8z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.3"/>
                    <path d="M24 32h16M32 24v16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
                </svg>
                <p>${message}</p>
                ${allItems.length === 0 
                    ? '<p class="empty-hint">Generate a palette or gradient and click "Save Palette" to start your library</p>' 
                    : '<p class="empty-hint">Try adjusting your search terms</p>'}
            </div>
        `;
        return;
    }
    
    // Render item cards (both palettes and gradients)
    filteredItems.forEach(item => {
        const card = item.itemType === 'gradient' 
            ? createGradientCard(item) 
            : createPaletteCard(item);
        libraryGrid.appendChild(card);
    });
}

/**
 * Create a palette card element
 */
function createPaletteCard(palette) {
    const card = document.createElement('article');
    card.className = 'palette-card';
    card.dataset.paletteId = palette.id;
    
    // Format date
    const date = new Date(palette.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
    
    // Create color swatches
    const colorsHTML = palette.colors.map(color => 
        `<div class="palette-card__color" style="background-color: ${color.hex};" title="${color.hex}"></div>`
    ).join('');
    
    // Create tags HTML (handle both array and string formats)
    let tagsArray = [];
    if (palette.tags) {
        if (Array.isArray(palette.tags)) {
            tagsArray = palette.tags;
        } else if (typeof palette.tags === 'string') {
            tagsArray = palette.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        }
    }
    
    const tagsHTML = tagsArray.length > 0
        ? tagsArray.map(tag => 
            `<span class="palette-tag">${escapeHTML(tag)}</span>`
        ).join('')
        : '';
    
    // Create notes HTML
    const notesHTML = palette.notes
        ? `<p class="palette-card__notes">${escapeHTML(palette.notes)}</p>`
        : '';
    
    card.innerHTML = `
        <div class="palette-card__colors">
            ${colorsHTML}
        </div>
        <div class="palette-card__info">
            <h3 class="palette-card__name">${escapeHTML(palette.name)}</h3>
            <div class="palette-card__meta">
                <span class="palette-card__date">${formattedDate}</span>
                <span class="palette-card__scheme">${formatSchemeMode(palette.schemeMode)}</span>
            </div>
            ${tagsHTML ? `<div class="palette-card__tags">${tagsHTML}</div>` : ''}
            ${notesHTML}
            <div class="palette-card__actions">
                <button class="palette-card__btn" data-action="load" title="Load this palette">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 1v6m0 0L4 4m3 3l3-3M13 10v2a1 1 0 01-1 1H2a1 1 0 01-1-1v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Load
                </button>
                <button class="palette-card__btn" data-action="edit" title="Edit palette details">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.417 2.333H2.333A1.167 1.167 0 001.167 3.5v9.167A1.167 1.167 0 002.333 13.833h9.167a1.167 1.167 0 001.167-1.166V8.583M11.667 1.167a1.237 1.237 0 011.75 1.75L7 9.333l-2.333.584.583-2.334 6.417-6.416z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Edit
                </button>
                <button class="palette-card__btn palette-card__btn--danger" data-action="delete" title="Delete palette">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.75 3.5h10.5M11.667 3.5v8.167a1.167 1.167 0 01-1.167 1.166H3.5a1.167 1.167 0 01-1.167-1.166V3.5m1.75 0V2.333A1.167 1.167 0 015.25 1.167h3.5a1.167 1.167 0 011.167 1.166V3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Delete
                </button>
                <button class="palette-card__btn" data-action="share" title="Share this palette">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 4.667a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM3.5 8.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM10.5 12.833a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.011 7.928l3.988 2.345M8.989 4.928l-3.978 2.345" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Share
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to action buttons
    const loadBtn = card.querySelector('[data-action="load"]');
    const editBtn = card.querySelector('[data-action="edit"]');
    const deleteBtn = card.querySelector('[data-action="delete"]');
    const shareBtn = card.querySelector('[data-action="share"]');
    
    loadBtn?.addEventListener('click', async (e) => {
        e.stopPropagation();
        // Switch to Solids tab first
        const { switchTab } = await import('../tabs/tabManager.js');
        switchTab('generator');
        handleLoadPalette(palette);
    });
    
    editBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        handleEditPalette(palette);
    });
    
    deleteBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        handleDeletePalette(palette.id, palette.name);
    });
    
    shareBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        handleSharePalette(palette);
    });
    
    return card;
}

/**
 * Create a gradient card element
 */
function createGradientCard(gradient) {
    const card = document.createElement('article');
    card.className = 'palette-card gradient-card';
    card.dataset.gradientId = gradient.id;
    
    // Format date
    const date = new Date(gradient.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
    
    // Generate gradient CSS
    const gradientCSS = gradient.css || generateGradientCSS(gradient.type, gradient.angle, gradient.stops);
    
    // Create tags HTML
    let tagsArray = [];
    if (gradient.tags) {
        if (Array.isArray(gradient.tags)) {
            tagsArray = gradient.tags;
        } else if (typeof gradient.tags === 'string') {
            tagsArray = gradient.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        }
    }
    
    const tagsHTML = tagsArray.length > 0
        ? tagsArray.map(tag => 
            `<span class="palette-tag">${escapeHTML(tag)}</span>`
        ).join('')
        : '';
    
    // Create notes HTML
    const notesHTML = gradient.notes
        ? `<p class="palette-card__notes">${escapeHTML(gradient.notes)}</p>`
        : '';
    
    card.innerHTML = `
        <div class="palette-card__gradient" style="background: ${gradientCSS}">
        </div>
        <div class="palette-card__info">
            <h3 class="palette-card__name">${escapeHTML(gradient.name)}</h3>
            <div class="palette-card__meta">
                <span class="palette-card__date">${formattedDate}</span>
                <span class="palette-card__scheme">${gradient.stops.length} stops</span>
            </div>
            ${tagsHTML ? `<div class="palette-card__tags">${tagsHTML}</div>` : ''}
            ${notesHTML}
            <div class="palette-card__actions">
                <button class="palette-card__btn" data-action="load" title="Load this gradient">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 1v6m0 0L4 4m3 3l3-3M13 10v2a1 1 0 01-1 1H2a1 1 0 01-1-1v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Load
                </button>
                <button class="palette-card__btn" data-action="edit" title="Edit gradient details">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.417 2.333H2.333A1.167 1.167 0 001.167 3.5v9.167A1.167 1.167 0 002.333 13.833h9.167a1.167 1.167 0 001.167-1.166V8.583M11.667 1.167a1.237 1.237 0 011.75 1.75L7 9.333l-2.333.584.583-2.334 6.417-6.416z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Edit
                </button>
                <button class="palette-card__btn palette-card__btn--danger" data-action="delete" title="Delete gradient">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.75 3.5h10.5M11.667 3.5v8.167a1.167 1.167 0 01-1.167 1.166H3.5a1.167 1.167 0 01-1.167-1.166V3.5m1.75 0V2.333A1.167 1.167 0 015.25 1.167h3.5a1.167 1.167 0 011.167 1.166V3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Delete
                </button>
                <button class="palette-card__btn" data-action="share" title="Share this gradient">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 4.667a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM3.5 8.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM10.5 12.833a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.011 7.928l3.988 2.345M8.989 4.928l-3.978 2.345" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Share
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to action buttons
    const loadBtn = card.querySelector('[data-action="load"]');
    const editBtn = card.querySelector('[data-action="edit"]');
    const deleteBtn = card.querySelector('[data-action="delete"]');
    const shareBtn = card.querySelector('[data-action="share"]');
    
    loadBtn?.addEventListener('click', async (e) => {
        e.stopPropagation();
        // Switch to Gradients tab first
        const { switchTab } = await import('../tabs/tabManager.js');
        switchTab('gradients');
        handleLoadGradient(gradient);
    });
    
    editBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        handleEditGradient(gradient);
    });
    
    deleteBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        handleDeleteGradient(gradient.id, gradient.name);
    });
    
    shareBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        handleShareGradient(gradient);
    });
    
    return card;
}

/**
 * Handle search input
 */
async function handleSearch(event) {
    const query = event.target.value.trim().toLowerCase();
    
    if (query === '') {
        // Reset to all items
        filteredItems = [...allItems];
    } else {
        // Search both palettes and gradients
        filteredItems = allItems.filter(item => {
            const name = item.name?.toLowerCase() || '';
            const notes = item.notes?.toLowerCase() || '';
            const tags = Array.isArray(item.tags) ? item.tags.join(' ').toLowerCase() : (item.tags || '').toLowerCase();
            
            return name.includes(query) || notes.includes(query) || tags.includes(query);
        });
    }
    
    sortItems(currentSort);
    renderLibrary();
}

/**
 * Handle sort selection
 */
function handleSort(event) {
    currentSort = event.target.value;
    sortItems(currentSort);
    renderLibrary();
}

/**
 * Sort items based on criteria
 */
function sortItems(criteria) {
    switch (criteria) {
        case 'recent':
            filteredItems.sort((a, b) => b.createdAt - a.createdAt);
            break;
        case 'oldest':
            filteredItems.sort((a, b) => a.createdAt - b.createdAt);
            break;
        case 'name':
            filteredItems.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            break;
    }
}

/**
 * Handle loading a gradient
 */
function handleLoadGradient(gradient) {
    // Dispatch custom event with gradient data
    const event = new CustomEvent('loadGradient', { 
        detail: gradient 
    });
    document.dispatchEvent(event);
    
    // Switch to gradients tab
    const gradientsTab = document.querySelector('[data-tab="gradients"]');
    if (gradientsTab) {
        gradientsTab.click();
    }
    
    // Scroll to top to see loaded gradient
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    showToast(`Loaded "${gradient.name}"`, 'success');
}

/**
 * Handle editing a gradient
 */
function handleEditGradient(gradient) {
    // Dispatch custom event to open edit modal
    const event = new CustomEvent('editGradient', { 
        detail: gradient 
    });
    document.dispatchEvent(event);
}

/**
 * Handle deleting a gradient
 */
async function handleDeleteGradient(gradientId, gradientName) {
    const confirmed = await showConfirmDialog(
        'Delete Gradient',
        `Are you sure you want to delete "${gradientName}"? This action cannot be undone.`,
        'Delete',
        'Cancel'
    );
    
    if (!confirmed) return;
    
    try {
        await deleteGradient(gradientId);
        showToast('Gradient deleted successfully', 'success');
        
        // Reload library
        await loadLibrary();
    } catch (error) {
        console.error('Error deleting gradient:', error);
        showToast('Failed to delete gradient', 'error');
    }
}

/**
 * Handle loading a palette
 */
function handleLoadPalette(palette) {
    // Dispatch custom event with palette data
    const event = new CustomEvent('loadPalette', { 
        detail: palette 
    });
    document.dispatchEvent(event);
    
    // Scroll to top to see loaded palette
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    showToast(`Loaded "${palette.name}"`, 'success');
}

/**
 * Handle editing a palette
 */
function handleEditPalette(palette) {
    // Dispatch custom event to open edit modal
    const event = new CustomEvent('editPalette', { 
        detail: palette 
    });
    document.dispatchEvent(event);
}

/**
 * Handle deleting a palette
 */
async function handleDeletePalette(paletteId, paletteName) {
    const confirmed = await showConfirmDialog(
        'Delete Palette',
        `Are you sure you want to delete "${paletteName}"? This action cannot be undone.`,
        'Delete',
        'Cancel'
    );
    
    if (!confirmed) return;
    
    try {
        await deletePalette(paletteId);
        showToast('Palette deleted successfully', 'success');
        
        // Reload library
        await loadLibrary();
    } catch (error) {
        console.error('Error deleting palette:', error);
        showToast('Failed to delete palette', 'error');
    }
}

/**
 * Handle sharing a palette
 */
function handleSharePalette(palette) {
    // Encode palette data in URL
    const colors = palette.colors.map(c => c.hex.replace('#', '')).join(',');
    const shareUrl = `${window.location.origin}${window.location.pathname}#share-palette=${colors}&mode=${palette.schemeMode}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Shareable link copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy link', 'error');
    });
}

/**
 * Handle sharing a gradient
 */
function handleShareGradient(gradient) {
    // Encode gradient data in URL
    const stops = gradient.stops.map(s => `${s.color.replace('#', '')}-${s.position}`).join(',');
    const shareUrl = `${window.location.origin}${window.location.pathname}#share-gradient=${gradient.type}&angle=${gradient.angle || 0}&stops=${stops}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Shareable link copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy link', 'error');
    });
}

/**
 * Format scheme mode for display
 */
function formatSchemeMode(mode) {
    const modeNames = {
        monochrome: 'Monochrome',
        'monochrome-dark': 'Monochrome Dark',
        'monochrome-light': 'Monochrome Light',
        analogic: 'Analogic',
        complement: 'Complement',
        'analogic-complement': 'Analogic Complement',
        triad: 'Triad',
        quad: 'Quad'
    };
    
    return modeNames[mode] || mode;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Hide library section
 */
export function hideLibrary() {
    const librarySection = document.getElementById('library-section');
    if (librarySection) {
        librarySection.hidden = true;
    }
}

/**
 * Show library section
 */
export function showLibrary() {
    const librarySection = document.getElementById('library-section');
    if (librarySection) {
        librarySection.hidden = false;
    }
}
