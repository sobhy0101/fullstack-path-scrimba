/**
 * Palette Library UI Module
 * Handles displaying, searching, and managing the palette library
 */

import { getAllPalettes, deletePalette, searchPalettes } from '../firebase/database.js';
import { showConfirmDialog } from '../ui/modal.js';
import { showToast } from '../toast.js';

// Library state
let allPalettes = [];
let filteredPalettes = [];
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
 * Load and display all palettes
 */
export async function loadLibrary() {
    try {
        allPalettes = await getAllPalettes();
        filteredPalettes = [...allPalettes];
        sortPalettes(currentSort);
        renderLibrary();
    } catch (error) {
        console.error('Error loading library:', error);
        showToast('Failed to load palette library', 'error');
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
    
    // Show empty state if no palettes
    if (filteredPalettes.length === 0) {
        const message = allPalettes.length === 0 
            ? 'No saved palettes yet' 
            : 'No palettes match your search';
        
        libraryGrid.innerHTML = `
            <div class="library-empty">
                <svg class="empty-icon" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8h48v48H8z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.3"/>
                    <path d="M24 32h16M32 24v16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
                </svg>
                <p>${message}</p>
                ${allPalettes.length === 0 
                    ? '<p class="empty-hint">Generate a palette and click "Save Palette" to start your library</p>' 
                    : '<p class="empty-hint">Try adjusting your search terms</p>'}
            </div>
        `;
        return;
    }
    
    // Render palette cards
    filteredPalettes.forEach(palette => {
        const card = createPaletteCard(palette);
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
    
    // Create tags HTML
    const tagsHTML = palette.tags && palette.tags.length > 0
        ? palette.tags.map(tag => 
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
            </div>
        </div>
    `;
    
    // Add event listeners to action buttons
    const loadBtn = card.querySelector('[data-action="load"]');
    const editBtn = card.querySelector('[data-action="edit"]');
    const deleteBtn = card.querySelector('[data-action="delete"]');
    
    loadBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
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
    
    return card;
}

/**
 * Handle search input
 */
async function handleSearch(event) {
    const query = event.target.value.trim();
    
    if (query === '') {
        // Reset to all palettes
        filteredPalettes = [...allPalettes];
    } else {
        // Search palettes
        try {
            filteredPalettes = await searchPalettes(query);
        } catch (error) {
            console.error('Error searching palettes:', error);
            filteredPalettes = [];
        }
    }
    
    sortPalettes(currentSort);
    renderLibrary();
}

/**
 * Handle sort selection
 */
function handleSort(event) {
    currentSort = event.target.value;
    sortPalettes(currentSort);
    renderLibrary();
}

/**
 * Sort palettes based on criteria
 */
function sortPalettes(criteria) {
    switch (criteria) {
        case 'recent':
            filteredPalettes.sort((a, b) => b.createdAt - a.createdAt);
            break;
        case 'oldest':
            filteredPalettes.sort((a, b) => a.createdAt - b.createdAt);
            break;
        case 'name':
            filteredPalettes.sort((a, b) => a.name.localeCompare(b.name));
            break;
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
