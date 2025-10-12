/**
 * Template Loader - Loads shared header and footer templates
 * This script should be included in all sub-pages to provide consistent navigation
 */

class TemplateLoader {
    constructor() {
        this.basePath = this.getBasePath();
        this.init();
    }

    /**
     * Get the base path to the templates folder
     * This calculates the relative path based on the current page location
     */
    getBasePath() {
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(segment => segment);
        
        // Remove the filename if it exists
        if (pathSegments.length > 0 && pathSegments[pathSegments.length - 1].includes('.')) {
            pathSegments.pop();
        }
        
        // Calculate how many levels deep we are
        const depth = pathSegments.length;
        
        // Create the relative path back to root
        const basePath = depth > 0 ? '../'.repeat(depth) : './';
        
        return basePath;
    }

    /**
     * Initialize the template loader
     */
    async init() {
        try {
            await this.loadTemplates();
            this.initMobileMenu();
        } catch (error) {
            console.warn('Template loader failed:', error);
            this.fallbackNavigation();
        }
    }

    /**
     * Load header and footer templates
     */
    async loadTemplates() {
        const headerPromise = this.loadTemplate('header');
        const footerPromise = this.loadTemplate('footer');
        
        await Promise.all([headerPromise, footerPromise]);
    }

    /**
     * Load a specific template
     */
    async loadTemplate(templateName) {
        try {
            const response = await fetch(`${this.basePath}templates/${templateName}.html`);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${templateName} template`);
            }
            
            const templateHTML = await response.text();
            const targetElement = document.getElementById(`${templateName}-placeholder`);
            
            if (targetElement) {
                targetElement.innerHTML = templateHTML;
                targetElement.removeAttribute('id'); // Remove placeholder id
            } else {
                // If no placeholder exists, inject at the appropriate location
                this.injectTemplate(templateName, templateHTML);
            }
        } catch (error) {
            console.warn(`Failed to load ${templateName} template:`, error);
        }
    }

    /**
     * Inject template at the appropriate location if no placeholder exists
     */
    injectTemplate(templateName, templateHTML) {
        if (templateName === 'header') {
            // Insert header at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', templateHTML);
        } else if (templateName === 'footer') {
            // Insert footer at the end of body
            document.body.insertAdjacentHTML('beforeend', templateHTML);
        }
    }

    /**
     * Initialize mobile menu functionality
     */
    initMobileMenu() {
        // Wait a bit for the DOM to be updated with templates
        setTimeout(() => {
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            
            if (mobileToggle && navLinks) {
                // Check if already initialized
                if (mobileToggle.hasAttribute('data-initialized')) {
                    return;
                }
                
                // Mark as initialized
                mobileToggle.setAttribute('data-initialized', 'true');
                
                // Ensure initial state is correct
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                // Add click event listener
                mobileToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isActive = navLinks.classList.contains('active');
                    
                    if (isActive) {
                        navLinks.classList.remove('active');
                        mobileToggle.classList.remove('active');
                    } else {
                        navLinks.classList.add('active');
                        mobileToggle.classList.add('active');
                    }
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                        navLinks.classList.remove('active');
                        mobileToggle.classList.remove('active');
                        setTimeout(() => {
                            if (!navLinks.classList.contains('active')) {
                                navLinks.style.display = '';
                            }
                        }, 300);
                    }
                });
                
                // Close menu when window is resized to desktop
                window.addEventListener('resize', () => {
                    if (window.innerWidth > 768) {
                        navLinks.classList.remove('active');
                        mobileToggle.classList.remove('active');
                        navLinks.style.display = '';
                    }
                });
            }
        }, 200);
    }

    /**
     * Fallback navigation if templates fail to load
     */
    fallbackNavigation() {
        // Create a simple back to home link if templates fail
        const backLink = document.createElement('div');
        backLink.innerHTML = `
            <div style="background: #8a091a; color: white; padding: 1rem; text-align: center;">
                <a href="${this.basePath}index.html" style="color: white; text-decoration: none; font-weight: bold;">
                    ← Back to Home
                </a>
            </div>
        `;
        document.body.insertBefore(backLink, document.body.firstChild);
    }

    /**
     * Load shared styles
     */
    loadSharedStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${this.basePath}templates/shared-styles.css`;
        document.head.appendChild(link);
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const templateLoader = new TemplateLoader();
    templateLoader.loadSharedStyles();
});

// Also initialize when the page is fully loaded (fallback)
window.addEventListener('load', () => {
    // Double-check mobile menu initialization
    setTimeout(() => {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileToggle && navLinks && !mobileToggle.hasAttribute('data-initialized')) {
            console.log('Reinitializing mobile menu...');
            const templateLoader = new TemplateLoader();
            templateLoader.initMobileMenu();
            mobileToggle.setAttribute('data-initialized', 'true');
        }
    }, 500);
});

// Export for manual initialization if needed
window.TemplateLoader = TemplateLoader;