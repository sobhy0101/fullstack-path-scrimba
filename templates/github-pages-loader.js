/**
 * GitHub Pages Compatible Template System
 * Injects header and footer HTML directly without external file fetching
 */

class GitHubPagesTemplateLoader {
    constructor() {
        this.basePath = this.getBasePath();
        this.init();
    }

    /**
     * Get the base path for navigation links
     */
    getBasePath() {
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(segment => segment);
        
        // Remove filename if it exists
        if (pathSegments.length > 0 && pathSegments[pathSegments.length - 1].includes('.')) {
            pathSegments.pop();
        }
        
        // Calculate depth - for GitHub Pages, we need to account for the repo name
        const depth = pathSegments.length;
        let basePath = '';
        
        // Check if we're on GitHub Pages (has repo name in path)
        if (pathSegments[0] === 'fullstack-path-scrimba') {
            basePath = depth > 1 ? '../'.repeat(depth - 1) : './';
        } else {
            basePath = depth > 0 ? '../'.repeat(depth) : './';
        }
        
        return basePath;
    }

    /**
     * Initialize the template loader
     */
    async init() {
        try {
            this.injectHeader();
            this.injectFooter();
            setTimeout(() => this.initMobileMenu(), 100);
        } catch (error) {
            console.warn('Template loader failed:', error);
            this.fallbackNavigation();
        }
    }

    /**
     * Inject header HTML directly
     */
    injectHeader() {
        const headerHTML = `
            <header class="header">
                <div class="container">
                    <div class="header-content">
                        <h1 class="logo">
                            <a href="${this.basePath}index.html" class="logo-link">
                                <span class="logo-text">Scrimba Fullstack Path</span>
                                <span class="logo-subtitle">Learning Journey</span>
                            </a>
                        </h1>
                        <nav class="nav-links">
                            <a href="${this.basePath}index.html" class="nav-link">
                                <span class="nav-icon">🏠</span> Home
                            </a>
                            <a href="${this.basePath}index.html#course-sections" class="nav-link">
                                <span class="nav-icon">📁</span> Sections
                            </a>
                            <a href="https://github.com/sobhy0101/fullstack-path-scrimba" target="_blank" rel="noopener noreferrer" class="nav-link">
                                <span class="nav-icon">💻</span> GitHub
                            </a>
                        </nav>
                        <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>
        `;

        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerHTML;
        } else {
            // Insert at the beginning of body if no placeholder
            document.body.insertAdjacentHTML('afterbegin', headerHTML);
        }
    }

    /**
     * Inject footer HTML directly
     */
    injectFooter() {
        const footerHTML = `
            <footer class="footer">
                <div class="student-info">
                    <span class="student-name">Mahmoud Sobhy "Mike"</span>
                    <span class="start-date">Started: October 2025</span>
                </div>
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-info">
                            <p>&copy; 2025 Mike Sobhy. Learning journey through the Scrimba Fullstack Path.</p>
                        </div>
                        <div class="footer-links">
                            <a href="https://github.com/sobhy0101" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="https://www.linkedin.com/in/sobhy0101/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://scrimba.com/fullstack-path-c0fullstack" target="_blank" rel="noopener noreferrer">Scrimba</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;

        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = footerHTML;
        } else {
            // Insert at the end of body if no placeholder
            document.body.insertAdjacentHTML('beforeend', footerHTML);
        }
    }

    /**
     * Initialize mobile menu functionality
     */
    initMobileMenu() {
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
                }
            });
            
            // Close menu when window is resized to desktop
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
            });
        }
    }

    /**
     * Fallback navigation if everything fails
     */
    fallbackNavigation() {
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
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GitHubPagesTemplateLoader();
});

// Export for manual initialization if needed
window.GitHubPagesTemplateLoader = GitHubPagesTemplateLoader;