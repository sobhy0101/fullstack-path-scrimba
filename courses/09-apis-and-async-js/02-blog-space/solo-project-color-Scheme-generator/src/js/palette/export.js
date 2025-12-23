/**
 * Palette Export Module
 * Export color palettes in various formats
 */

import { copyToClipboard } from '../clipboard.js';
import { showToast } from '../toast.js';

/**
 * Export palette as CSS variables
 * @param {Array} colors - Array of color objects
 * @param {string} paletteName - Name of the palette
 * @returns {string} CSS variables string
 */
export function exportAsCSSVariables(colors, paletteName = 'Palette') {
    const cssVars = `:root {\n  /* ${paletteName} */\n`;
    
    const colorVars = colors.map((color, index) => {
        const varName = `--color-${index + 1}`;
        return `  ${varName}: ${color.hex};`;
    }).join('\n');
    
    return cssVars + colorVars + '\n}';
}

/**
 * Export palette as JSON
 * @param {Object} palette - Palette object with all data
 * @returns {string} JSON string
 */
export function exportAsJSON(palette) {
    const exportData = {
        name: palette.name || 'Untitled Palette',
        scheme: palette.scheme,
        seedColor: palette.seedColor,
        colors: palette.colors.map(color => ({
            name: color.name,
            hex: color.hex,
            rgb: color.rgb,
            hsl: color.hsl
        })),
        tags: palette.tags || [],
        notes: palette.notes || '',
        exportedAt: new Date().toISOString()
    };
    
    return JSON.stringify(exportData, null, 2);
}

/**
 * Export palette in Figma-compatible format (Native Variables)
 * @param {Array} colors - Array of color objects
 * @param {string} paletteName - Name of the palette
 * @returns {string} Figma Variables JSON format
 */
export function exportAsFigmaFormat(colors, paletteName = 'Palette') {
    // Figma Variables format requires specific structure
    const modeId = 'mode-1'; // Default mode ID
    const collectionId = 'collection-1';
    
    const variables = {};
    
    colors.forEach((color, index) => {
        const varId = `var-${index + 1}`;
        const varName = color.name || `Color ${index + 1}`;
        
        variables[varId] = {
            name: varName,
            type: 'COLOR',
            valuesByMode: {
                [modeId]: {
                    r: color.rgb.r / 255,
                    g: color.rgb.g / 255,
                    b: color.rgb.b / 255,
                    a: 1
                }
            }
        };
    });
    
    const figmaData = {
        collections: {
            [collectionId]: {
                name: paletteName,
                modes: {
                    [modeId]: {
                        name: 'Default'
                    }
                },
                variables: variables
            }
        }
    };
    
    return JSON.stringify(figmaData, null, 2);
}

/**
 * Export palette as PNG image
 * @param {Array} colors - Array of color objects
 * @param {string} paletteName - Name of the palette
 * @returns {Promise<Blob>} PNG image as Blob
 */
export async function exportAsPNG(colors, paletteName = 'Palette') {
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const swatchWidth = 200;
    const swatchHeight = 300;
    const padding = 20;
    const headerHeight = 80;
    
    canvas.width = (swatchWidth * colors.length) + (padding * (colors.length + 1));
    canvas.height = swatchHeight + headerHeight + (padding * 2);
    
    // Fill background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw title
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(paletteName, canvas.width / 2, padding + 35);
    
    // Draw color swatches
    colors.forEach((color, index) => {
        const x = padding + (index * (swatchWidth + padding));
        const y = headerHeight + padding;
        
        // Draw color swatch
        ctx.fillStyle = color.hex;
        ctx.fillRect(x, y, swatchWidth, swatchHeight - 100);
        
        // Draw color info box
        ctx.fillStyle = '#F9FAFB';
        ctx.fillRect(x, y + swatchHeight - 100, swatchWidth, 100);
        
        // Draw color name
        ctx.fillStyle = '#374151';
        ctx.font = '14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(
            color.name.length > 20 ? color.name.substring(0, 17) + '...' : color.name, 
            x + swatchWidth / 2, 
            y + swatchHeight - 70
        );
        
        // Draw hex value
        ctx.fillStyle = '#1F2937';
        ctx.font = 'bold 16px Monaco, monospace';
        ctx.fillText(color.hex, x + swatchWidth / 2, y + swatchHeight - 45);
        
        // Draw RGB value
        ctx.fillStyle = '#6B7280';
        ctx.font = '12px Monaco, monospace';
        ctx.fillText(color.rgb.value, x + swatchWidth / 2, y + swatchHeight - 25);
    });
    
    // Convert canvas to Blob
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, 'image/png');
    });
}

/**
 * Download a file
 * @param {Blob|string} data - File data
 * @param {string} filename - File name
 * @param {string} mimeType - MIME type
 */
export function downloadFile(data, filename, mimeType = 'text/plain') {
    const blob = data instanceof Blob 
        ? data 
        : new Blob([data], { type: mimeType });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Copy palette export to clipboard
 * @param {string} format - Export format ('css', 'json', 'figma')
 * @param {Object} paletteData - Palette data
 */
export async function copyPaletteExport(format, paletteData) {
    let exportText;
    
    switch (format) {
        case 'css':
            exportText = exportAsCSSVariables(paletteData.colors, paletteData.name);
            break;
        case 'json':
            exportText = exportAsJSON(paletteData);
            break;
        case 'figma':
            exportText = exportAsFigmaFormat(paletteData.colors, paletteData.name);
            break;
        default:
            throw new Error('Invalid export format');
    }
    
    await copyToClipboard(exportText, `${format.toUpperCase()} copied to clipboard!`);
}

/**
 * Download palette export
 * @param {string} format - Export format ('css', 'json', 'figma', 'png')
 * @param {Object} paletteData - Palette data
 */
export async function downloadPaletteExport(format, paletteData) {
    const safeName = (paletteData.name || 'palette').replace(/[^a-z0-9]/gi, '-').toLowerCase();
    
    switch (format) {
        case 'css': {
            const css = exportAsCSSVariables(paletteData.colors, paletteData.name);
            downloadFile(css, `${safeName}.css`, 'text/css');
            showToast('CSS file downloaded!', 'success');
            break;
        }
        case 'json': {
            const json = exportAsJSON(paletteData);
            downloadFile(json, `${safeName}.json`, 'application/json');
            showToast('JSON file downloaded!', 'success');
            break;
        }
        case 'figma': {
            const figma = exportAsFigmaFormat(paletteData.colors, paletteData.name);
            downloadFile(figma, `${safeName}-figma.json`, 'application/json');
            showToast('Figma JSON downloaded!', 'success');
            break;
        }
        case 'png': {
            const pngBlob = await exportAsPNG(paletteData.colors, paletteData.name);
            downloadFile(pngBlob, `${safeName}.png`, 'image/png');
            showToast('PNG image downloaded!', 'success');
            break;
        }
        default:
            throw new Error('Invalid export format');
    }
}

/**
 * Import palette from JSON
 * @param {string} jsonString - JSON string to import
 * @returns {Object} Parsed palette data
 */
export function importFromJSON(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        
        // Validate required fields
        if (!data.colors || !Array.isArray(data.colors)) {
            throw new Error('Invalid palette format: missing colors array');
        }
        
        return {
            name: data.name || 'Imported Palette',
            scheme: data.scheme || 'monochrome',
            seedColor: data.seedColor || data.colors[0]?.hex || '#000000',
            colors: data.colors,
            tags: data.tags || [],
            notes: data.notes || 'Imported palette'
        };
        
    } catch (error) {
        console.error('Error importing palette:', error);
        showToast('Invalid JSON format', 'error');
        throw error;
    }
}
