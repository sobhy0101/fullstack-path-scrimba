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
        title: 'Responsive Layout',
        description: 'Build a multi-section webpage that adjusts seamlessly across mobile, tablet, and desktop screens.',
        status: 'completed',
        icon: '📱',
        technologies: ['CSS Units', 'CSS Grid', 'Media Queries', 'Flexbox', 'Responsive Images', 'Viewport Meta Tag', 'Mobile-First Design', 'Fluid Typography', 'Line Height', 'Chrome DevTools', 'Flex Grid'],
        projectLink: '01-responsive-layout/01-nft-responsive-site/',
        codeLink: 'https://github.com/sobhy0101/fullstack-path-scrimba/blob/main/courses/08-responsive-design/01-responsive-layout/01-nft-responsive-site/index.css',
        asideLink: '01-responsive-layout/aside-flexbox-image-grid/',

    },
    {
        id: 2,
        title: 'Products Project',
        description: 'Create a responsive product showcase page with filtering and sorting features using Flexbox and CSS transitions.',
        status: 'completed',
        icon: '🧭',
        technologies: ['Flexbox', 'JavaScript', 'CSS Transitions'],
        projectLink: '02-products-project/',
        codeLink: 'https://github.com/sobhy0101/fullstack-path-scrimba/blob/main/courses/08-responsive-design/02-products-project/styles.css'
    },
    {
        id: 3,
        title: 'CSS Grid - SciStream Project',
        description: 'Design a card-based layout that adapts to different screen sizes using CSS Grid and Flexbox.',
        status: 'in-progress',
        icon: '📇',
        technologies: ['CSS Grid', 'Flexbox', 'Responsive Images'],
        projectLink: '03-css-grid/',
        codeLink: 'https://github.com/sobhy0101/fullstack-path-scrimba/blob/main/courses/08-responsive-design/03-css-grid/index.css',
        asideLink: '03-css-grid/01-aside-grid-columns-gap/',
        asideLink2: '03-css-grid/02-aside-grid-spanning/'
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
                             project.status === 'in-progress' ? 'View Project' : 
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
                <a href="${project.asideLink || '#'}" 
                   class="btn ${isPrimaryDisabled ? 'btn-disabled' : 'btn-primary'}"
                   ${isPrimaryDisabled ? 'aria-disabled="true"' : ''}
                   ${!isPrimaryDisabled && project.asideLink ? 'target="_blank" rel="noopener"' : ''}>
                    Aside
                </a>
                <a href="${project.asideLink2 || '#'}" 
                   class="btn ${isPrimaryDisabled ? 'btn-disabled' : 'btn-primary'}"
                   ${isPrimaryDisabled ? 'aria-disabled="true"' : ''}
                   ${!isPrimaryDisabled && project.asideLink2 ? 'target="_blank" rel="noopener"' : ''}>
                    Aside 2
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
// LEARNING RESOURCES
// ==============================================

/**
 * Learning resources organized by category
 * Each technology has multiple curated learning sources
 * Sources are color-coded: mdn, w3schools, css-tricks, web-dev, etc.
 */
const learningResources = [
    {
        category: 'CSS Units & Layout',
        technologies: [
            {
                title: 'CSS Units (em, rem, %, vw, vh)',
                description: 'Relative and absolute units for responsive, scalable designs',
                sources: [
                    {
                        name: 'MDN',
                        url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units',
                        type: 'mdn'
                    },
                    {
                        name: 'W3Schools',
                        url: 'https://www.w3schools.com/css/css_units.asp',
                        type: 'w3schools'
                    },
                    {
                        name: 'CSS-Tricks',
                        url: 'https://css-tricks.com/the-lengths-of-css/',
                        type: 'css-tricks'
                    }
                ]
            },
            {
                title: 'Media Queries',
                description: 'Applying styles based on device characteristics and screen size',
                sources: [
                    {
                        name: 'MDN',
                        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using',
                        type: 'mdn'
                    },
                    {
                        name: 'W3Schools',
                        url: 'https://www.w3schools.com/css/css3_mediaqueries.asp',
                        type: 'w3schools'
                    },
                    {
                        name: 'CSS-Tricks',
                        url: 'https://css-tricks.com/a-complete-guide-to-css-media-queries/',
                        type: 'css-tricks'
                    }
                ]
            },
            {
                title: 'CSS Flexbox',
                description: 'One-dimensional layout for flexible, responsive containers',
                sources: [
                    {
                        name: 'MDN',
                        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout',
                        type: 'mdn'
                    },
                    {
                        name: 'CSS-Tricks',
                        url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
                        type: 'css-tricks'
                    },
                    {
                        name: 'Web.dev',
                        url: 'https://web.dev/learn/css/flexbox/',
                        type: 'web-dev'
                    }
                ]
            },
            {
                title: 'CSS Grid',
                description: 'Two-dimensional layout system for complex responsive designs',
                sources: [
                    {
                        name: 'MDN',
                        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout',
                        type: 'mdn'
                    },
                    {
                        name: 'CSS-Tricks',
                        url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
                        type: 'css-tricks'
                    },
                    {
                        name: 'Web.dev',
                        url: 'https://web.dev/learn/css/grid/',
                        type: 'web-dev'
                    },
                    {
                        name: 'Notes',
                        url: '../08-responsive-design/docs/css-grid-notes.md',
                        type: 'other'
                    }
                ]
            }
        ]
    },
    {
        category: 'Responsive Design Principles',
        technologies: [
            {
                title: 'Mobile-First Design',
                description: 'Building from mobile up for better performance and UX',
                sources: [
                    {
                        name: 'Web.dev',
                        url: 'https://web.dev/responsive-web-design-basics/#mobile-first-responsive-design',
                        type: 'web-dev'
                    },
                    {
                        name: 'MDN',
                        url: 'https://developer.mozilla.org/en-US/docs/Glossary/Mobile_First',
                        type: 'mdn'
                    },
                    {
                        name: 'CSS-Tricks',
                        url: 'https://css-tricks.com/mobile-first-css-is-it-time-for-a-rethink/',
                        type: 'css-tricks'
                    }
                ]
            },
            {
                title: 'Viewport Meta Tag',
                description: 'Controlling how browsers render and scale responsive pages',
                sources: [
                    {
                        name: 'MDN',
                        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag',
                        type: 'mdn'
                    },
                    {
                        name: 'W3Schools',
                        url: 'https://www.w3schools.com/css/css_rwd_viewport.asp',
                        type: 'w3schools'
                    },
                    {
                        name: 'Web.dev',
                        url: 'https://web.dev/responsive-web-design-basics/#set-the-viewport',
                        type: 'web-dev'
                    }
                ]
            },
            {
                title: 'Responsive Design Patterns',
                description: 'Common layouts and patterns for responsive websites',
                sources: [
                    {
                        name: 'Web.dev',
                        url: 'https://web.dev/responsive-web-design-basics/#responsive-design-patterns',
                        type: 'web-dev'
                    },
                    {
                        name: 'CSS-Tricks',
                        url: 'https://css-tricks.com/the-many-ways-to-change-things-on-scroll/',
                        type: 'css-tricks'
                    },
                    {
                        name: 'MDN',
                        url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout',
                        type: 'mdn'
                    }
                ]
            }
        ]
    },
    {
        category: 'Typography & Content',
        technologies: [
            {
                title: 'Fluid Typography',
                description: 'Text that scales smoothly between breakpoints without jumps',
                sources: [
                    {
                        name: 'CSS-Tricks',
                        url: 'https://css-tricks.com/snippets/css/fluid-typography/',
                        type: 'css-tricks'
                    },
                    {
                        name: 'Smashing Magazine',
                        url: 'https://www.smashingmagazine.com/2016/05/fluid-typography/',
                        type: 'other'
                    }
                ]
            },
            {
                title: 'Line Height',
                description: 'Spacing between text lines for readability and visual hierarchy',
                sources: [
                    {
                        name: 'MDN',
                        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/line-height',
                        type: 'mdn'
                    },
                    {
                        name: 'CSS-Tricks',
                        url: 'https://css-tricks.com/almanac/properties/l/line-height/',
                        type: 'css-tricks'
                    },
                    {
                        name: 'Web.dev',
                        url: 'https://web.dev/learn/design/typography#line_height',
                        type: 'web-dev'
                    }
                ]
            },
            {
                title: 'Responsive Typography',
                description: 'Font sizing strategies that adapt to different screen sizes',
                sources: [
                    {
                        name: 'Web.dev',
                        url: 'https://web.dev/learn/css/typography/',
                        type: 'web-dev'
                    },
                    {
                        name: 'CSS-Tricks',
                        url: 'https://css-tricks.com/books/fundamental-css-tactics/chapters/3-typography/',
                        type: 'css-tricks'
                    },
                    {
                        name: 'MDN',
                        url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals',
                        type: 'mdn'
                    }
                ]
            },
            {
                title: 'Form Elements Styling',
                description: 'Making form inputs and buttons responsive and user-friendly',
                sources: [
                    {
                        name: 'Web.dev',
                        url: 'https://web.dev/learn/forms/styling/',
                        type: 'web-dev'
                    },
                    {
                        name: 'Programiz',
                        url: 'https://www.programiz.com/css/form-styling',
                        type: 'other'
                    },
                    {
                        name: 'MDN',
                        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Styling_web_forms',
                        type: 'mdn'
                    }
                ]
            }
        ]
    },
    {
        category: 'Testing & Tools',
        technologies: [
            {
                title: 'Chrome DevTools',
                description: 'Browser tools for testing responsive designs and debugging',
                sources: [
                    {
                        name: 'Google Developers',
                        url: 'https://developer.chrome.com/docs/devtools/',
                        type: 'other'
                    },
                    {
                        name: 'Web.dev',
                        url: 'https://web.dev/responsive-web-design-basics/#device-mode',
                        type: 'web-dev'
                    },
                    {
                        name: 'MDN',
                        url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools',
                        type: 'mdn'
                    }
                ]
            },
            {
                title: 'Responsive Testing Platforms',
                description: 'Tools for testing across multiple devices and browsers',
                sources: [
                    {
                        name: 'BrowserStack',
                        url: 'https://www.browserstack.com/',
                        type: 'other'
                    },
                    {
                        name: 'Responsively App',
                        url: 'https://responsively.app/',
                        type: 'other'
                    },
                    {
                        name: 'LambdaTest',
                        url: 'https://www.lambdatest.com/',
                        type: 'other'
                    }
                ]
            },
            {
                title: 'Can I Use (Browser Support)',
                description: 'Check browser compatibility for CSS features and properties',
                sources: [
                    {
                        name: 'Can I Use',
                        url: 'https://caniuse.com/',
                        type: 'other'
                    },
                    {
                        name: 'MDN Browser Compat',
                        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS#browser_compatibility',
                        type: 'mdn'
                    }
                ]
            }
        ]
    }
];

/**
 * Renders learning resources section
 * Dynamically generates HTML for organized resource categories with badge buttons
 */
function renderLearningResources() {
    const resourcesContainer = document.getElementById('learningResourcesGrid');
    
    if (!resourcesContainer) return;
    
    const resourcesHTML = learningResources.map(category => `
        <div class="resource-category">
            <h4 class="resource-category-title">${category.category}</h4>
            <div class="resource-items">
                ${category.technologies.map(tech => `
                    <div class="resource-item">
                        <h5 class="resource-tech-title">${tech.title}</h5>
                        <p class="resource-tech-description">${tech.description}</p>
                        <div class="resource-badges">
                            ${tech.sources.map(source => `
                                <a href="${source.url}" 
                                   target="_blank" 
                                   rel="noopener" 
                                   class="resource-badge resource-badge-${source.type}"
                                   title="Learn more on ${source.name}">
                                    ${source.name}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    resourcesContainer.innerHTML = resourcesHTML;
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
    
    // Render learning resources
    renderLearningResources();
    
    // Log initialization complete
    console.log(`✅ Loaded ${projects.length} projects`);
    console.log(`📚 Loaded ${learningResources.length} resource categories`);
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