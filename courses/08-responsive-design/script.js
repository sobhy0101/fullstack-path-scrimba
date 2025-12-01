/**
 * ==============================================
 * RESPONSIVE DESIGN COURSE - JAVASCRIPT
 * Course 08 - Scrimba Fullstack Path
 * ==============================================
 * 
 * This script handles:
 * - Dynamic project card generation
 * - Interactive hover effects
 * - Project statistics counting
 * - Filtering and sorting functionality
 */

// ==============================================
// PROJECT DATA STRUCTURE
// ==============================================

/**
 * Course projects and challenges data
 * Each project contains:
 * - id: Unique identifier
 * - title: Project name
 * - description: Brief overview
 * - status: 'completed', 'in-progress', or 'locked'
 * - icon: Emoji icon for visual representation
 * - technologies: Array of skills/tools used
 * - projectLink: URL to live demo (if available)
 * - codeLink: URL to source code (if available)
 */
const projects = [
    {
        id: 1,
        title: 'Responsive Design',
        description: 'Build a multi-section webpage that adjusts seamlessly across mobile, tablet, and desktop screens.',
        status: 'in-progress',
        icon: '📱',
        technologies: ['CSS Units', 'CSS Grid', 'Media Queries'],
        projectLink: '01-nft-responsive-site/',
        codeLink: 'https://github.com/sobhy0101/fullstack-path-scrimba/blob/main/courses/08-responsive-design/01-nft-responsive-site/index.css'
    },
    {
        id: 2,
        title: 'Responsive Navigation',
        description: 'Create a navigation menu that transforms from a mobile hamburger menu to a desktop horizontal navigation bar.',
        status: 'locked',
        icon: '🧭',
        technologies: ['Flexbox', 'JavaScript', 'CSS Transitions'],
        projectLink: null,
        codeLink: null
    },
    {
        id: 3,
        title: 'Flexible Card Grid',
        description: 'Design a card-based layout that adapts to different screen sizes using CSS Grid and Flexbox.',
        status: 'locked',
        icon: '📇',
        technologies: ['CSS Grid', 'Flexbox', 'Responsive Images'],
        projectLink: null,
        codeLink: null
    },
    {
        id: 4,
        title: 'Responsive Dashboard',
        description: 'Build a data dashboard with charts and widgets that reorganize for optimal viewing on any device.',
        status: 'locked',
        icon: '📊',
        technologies: ['Grid Layout', 'Media Queries', 'Viewport Units'],
        projectLink: null,
        codeLink: null
    },
    {
        id: 5,
        title: 'Adaptive Landing Page',
        description: 'Create a marketing landing page with hero sections, features, and testimonials that look great everywhere.',
        status: 'locked',
        icon: '🎯',
        technologies: ['Responsive Typography', 'Images', 'Breakpoints'],
        projectLink: null,
        codeLink: null
    },
    {
        id: 6,
        title: 'Gallery with Lightbox',
        description: 'Build a responsive image gallery with a lightbox feature that works seamlessly on mobile and desktop.',
        status: 'locked',
        icon: '🖼️',
        technologies: ['CSS Grid', 'JavaScript', 'Touch Events'],
        projectLink: null,
        codeLink: null
    }
];

// ==============================================
// DOM ELEMENTS
// ==============================================

// Get references to key DOM elements for manipulation
const projectsGrid = document.getElementById('projectsGrid');
const projectCountElement = document.getElementById('projectCount');
const challengeCountElement = document.getElementById('challengeCount');

// ==============================================
// PROJECT CARD GENERATION
// ==============================================

/**
 * Creates a project card HTML element
 * @param {Object} project - Project data object
 * @returns {string} HTML string for the project card
 */
function createProjectCard(project) {
    // Determine button text and styling based on project status
    const primaryButtonText = project.status === 'completed' ? 'View Project' : 
                             project.status === 'in-progress' ? 'Continue' : 
                             'Start Project';
    
    // Check if buttons should be disabled
    const isPrimaryDisabled = project.status === 'locked' || !project.projectLink;
    const isSecondaryDisabled = project.status === 'locked' || !project.codeLink;
    
    // Build technology tags HTML
    const tagsHTML = project.technologies.map(tech => 
        `<span class="project-tag">${tech}</span>`
    ).join('');
    
    // Create the complete card HTML structure
    return `
        <article class="project-card ${project.status}" data-project-id="${project.id}">
            <div class="project-card-header">
                <div class="project-icon">${project.icon}</div>
                <span class="project-status-badge ${project.status}">
                    ${project.status.replace('-', ' ')}
                </span>
            </div>
            
            <h4 class="project-card-title">${project.title}</h4>
            
            <p class="project-card-description">${project.description}</p>
            
            <div class="project-tags">
                ${tagsHTML}
            </div>
            
            <div class="project-card-actions">
                <a href="${project.projectLink || '#'}" 
                   class="btn ${isPrimaryDisabled ? 'btn-disabled' : 'btn-primary'}"
                   ${isPrimaryDisabled ? 'aria-disabled="true"' : ''}
                   ${!isPrimaryDisabled && project.projectLink ? 'target="_blank" rel="noopener"' : ''}>
                    ${primaryButtonText}
                </a>
                <a href="${project.codeLink || '#'}" 
                   class="btn ${isSecondaryDisabled ? 'btn-disabled' : 'btn-secondary'}"
                   ${isSecondaryDisabled ? 'aria-disabled="true"' : ''}
                   ${!isSecondaryDisabled && project.codeLink ? 'target="_blank" rel="noopener"' : ''}>
                    View Code
                </a>
            </div>
        </article>
    `;
}

/**
 * Renders all project cards to the DOM
 * Clears existing content and inserts new cards
 */
function renderProjects() {
    // Clear existing content
    projectsGrid.innerHTML = '';
    
    // Generate and insert all project cards
    const projectsHTML = projects.map(project => createProjectCard(project)).join('');
    projectsGrid.innerHTML = projectsHTML;
    
    // Update statistics after rendering
    updateStatistics();
}

// ==============================================
// STATISTICS CALCULATION
// ==============================================

/**
 * Updates the project statistics displayed in the hero section
 * Counts total projects and challenges based on status
 */
function updateStatistics() {
    // Total number of projects
    const totalProjects = projects.length;
    
    // Count in-progress and completed items as active challenges
    const activeChallenges = projects.filter(p => 
        p.status === 'in-progress' || p.status === 'completed'
    ).length;
    
    // Animate the numbers (optional: you can add counting animation here)
    if (projectCountElement) {
        projectCountElement.textContent = totalProjects;
    }
    
    if (challengeCountElement) {
        challengeCountElement.textContent = activeChallenges;
    }
}

// ==============================================
// INTERACTIVE ENHANCEMENTS
// ==============================================

/**
 * Adds enhanced hover effects and interactions
 * Called after DOM is loaded and cards are rendered
 */
function addInteractiveEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add subtle tilt effect on mouse move (desktop only)
        card.addEventListener('mousemove', (e) => {
            // Only apply on devices that support hover (desktop)
            if (window.matchMedia('(hover: hover)').matches) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                // Apply subtle 3D transform
                card.style.transform = `
                    translateY(-8px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                `;
            }
        });
        
        // Reset transform on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
        
        // Prevent disabled buttons from triggering actions
        card.querySelectorAll('.btn-disabled').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });
    });
}

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

/**
 * Filters projects by status
 * @param {string} status - Status to filter by ('all', 'completed', 'in-progress', 'locked')
 */
function filterProjects(status) {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        if (status === 'all' || card.classList.contains(status)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Adds a new project to the projects array and re-renders
 * Useful for adding projects as you complete them
 * @param {Object} newProject - New project object
 */
function addProject(newProject) {
    // Add the new project to the array
    projects.push(newProject);
    
    // Re-render the projects grid
    renderProjects();
    
    // Re-add interactive effects
    addInteractiveEffects();
    
    console.log('Project added successfully:', newProject.title);
}

/**
 * Updates a project's status
 * @param {number} projectId - ID of the project to update
 * @param {string} newStatus - New status value
 */
function updateProjectStatus(projectId, newStatus) {
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        project.status = newStatus;
        renderProjects();
        addInteractiveEffects();
        console.log(`Project ${projectId} updated to status: ${newStatus}`);
    }
}

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Initialize the page when DOM is fully loaded
 * This is the main entry point for the script
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Responsive Design Course Page Initialized');
    
    // Render all project cards
    renderProjects();
    
    // Add interactive effects to cards
    addInteractiveEffects();
    
    // Log initialization complete
    console.log(`✅ Loaded ${projects.length} projects`);
});

// ==============================================
// RESPONSIVE UTILITIES
// ==============================================

/**
 * Detects current breakpoint
 * Useful for conditional JavaScript based on screen size
 * @returns {string} Current breakpoint ('mobile', 'tablet', 'desktop')
 */
function getCurrentBreakpoint() {
    const width = window.innerWidth;
    
    if (width < 480) return 'mobile';
    if (width < 768) return 'tablet';
    return 'desktop';
}

/**
 * Handles responsive behavior changes
 * Called on window resize
 */
let resizeTimer;
window.addEventListener('resize', () => {
    // Debounce resize events to improve performance
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const breakpoint = getCurrentBreakpoint();
        console.log(`Current breakpoint: ${breakpoint}`);
        
        // Add any breakpoint-specific logic here
    }, 250);
});

// ==============================================
// EXPORT FUNCTIONS (for external use if needed)
// ==============================================

// Make key functions available globally for console access
window.courseUtils = {
    addProject,
    updateProjectStatus,
    filterProjects,
    getCurrentBreakpoint
};

console.log('💡 Tip: Access utility functions via window.courseUtils');