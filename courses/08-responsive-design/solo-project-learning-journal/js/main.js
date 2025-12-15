// Blog posts data - Real articles about my Scrimba learning journey
const blogPosts = [
    {
        id: 1,
        title: "My new journey as a bootcamp student",
        date: "December 13, 2025",
        excerpt: "After several months of learning in the Frontend Developer Career Path, I've made the big jump over to the Scrimba Bootcamp to get expert code reviews and meet like-minded peers.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
        link: "article.html"
    },
    {
        id: 2,
        title: "Building My First Responsive Layout - NFT Website",
        date: "December 10, 2025",
        excerpt: "Learning CSS Units, Grid, Media Queries, and Mobile-First design through building a real NFT showcase website. The challenge taught me how to make layouts that adapt seamlessly across devices.",
        image: "https://images.unsplash.com/photo-1664022617645-cf71791942e4?q=80&w=400&h=250&fit=crop",
        link: "../01-responsive-layout/01-nft-responsive-site/"
    },
    {
        id: 3,
        title: "Flexbox vs Grid: When to Use Each",
        date: "December 7, 2025",
        excerpt: "After completing the Products Project, I finally understand when to use Flexbox and when to reach for CSS Grid. Spoiler: you need both!",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
        link: "../02-products-project/"
    },
    {
        id: 4,
        title: "CSS Grid Deep Dive: The SciStream Project",
        date: "December 4, 2025",
        excerpt: "Building a card-based layout taught me advanced Grid techniques like grid-template-areas, spanning, and auto-fit. Kevin Powell's lessons were game-changing here.",
        image: "images/css-grid.jpg?q=80&w=400&h=250&fit=crop",
        link: "../03-css-grid/"
    },
    {
        id: 5,
        title: "From Instagram Clone to Portfolio: My CSS Journey",
        date: "November 29, 2025",
        excerpt: "The Essential CSS course had me build an Instagram UI clone and a personal portfolio. These projects taught me about semantic HTML, hover states, and CSS specificity.",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400&h=250&fit=crop",
        link: "../../06-essenntial-css/solo-projects/instagram-clone/"
    },
    {
        id: 6,
        title: "Making the Web Accessible: Lessons from the Skynet Project",
        date: "November 25, 2025",
        excerpt: "The Accessible Development module opened my eyes to ARIA, semantic HTML, and skip navigation links. Building for everyone isn't optional - it's essential.",
        image: "https://images.unsplash.com/photo-1574887427561-d3d5d58c9273?q=80&w=400&h=250&fit=crop",
        link: "../../05-accessible-development/skynet-project/"
    },
    {
        id: 7,
        title: "JavaScript Fundamentals: From Beginner to Builder",
        date: "November 20, 2025",
        excerpt: "DOM manipulation, event handling, and problem-solving exercises transformed me from someone who barely understood JavaScript to building interactive applications.",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
        link: "../../03-javascript-fundamentals/"
    },
    {
        id: 8,
        title: "Essential JavaScript Projects: Cookie Consent, Meme App & X Clone",
        date: "November 15, 2025",
        excerpt: "Three projects that taught me arrays, objects, constructor functions, and ES6+ features. Plus 20 mini-projects and a solo food ordering app!",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop",
        link: "../../07-essential-javaScript/03-build-an-x-clone/"
    },
    {
        id: 9,
        title: "Git, GitHub, and Professional Development Workflows",
        date: "November 10, 2025",
        excerpt: "Learning branching, pull requests, merge conflicts, and SSH keys. The Tools of the Trade module taught me how real developers collaborate and manage code.",
        image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=250&fit=crop",
        link: "../../04-tools-of-the-trade/"
    },
    {
        id: 10,
        title: "Sobhy's Dinner: Building a Food Ordering App",
        date: "November 5, 2025",
        excerpt: "Solo project combining JavaScript arrays, objects, and DOM manipulation. Built a complete restaurant ordering system with a dynamic menu, cart functionality, and checkout process.",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop",
        link: "../../07-essential-javaScript/solo-project-food-ordering-app/"
    },
    {
        id: 11,
        title: "Unit Converter: Practical JavaScript Problem Solving",
        date: "October 28, 2025",
        excerpt: "My first real JavaScript application! Convert between metric and imperial units for length, volume, and mass. Learned event handling, DOM manipulation, and mathematical operations.",
        image: "https://images.unsplash.com/photo-1637666418115-305af1338928?q=80&w=400&h=250&fit=crop",
        link: "../../03-javascript-fundamentals/practice/exams/solo-project-unit-converter/"
    },
    {
        id: 12,
        title: "Basketball Scoreboard: Interactive Counter App",
        date: "October 25, 2025",
        excerpt: "Built an interactive basketball scoreboard with JavaScript. Features score tracking, increment buttons, and period counter. Great practice for event listeners and state management.",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop",
        link: "../../03-javascript-fundamentals/practice/exams/solo-project-basketball-scoreboard/"
    },
    {
        id: 13,
        title: "Visit Cairo: My First Solo Web Project",
        date: "October 20, 2025",
        excerpt: "My hometown guide using HTML and CSS! This was my first solo project where I showcased beautiful Cairo with semantic HTML, custom styling, and responsive images.",
        image: "images/home-town-cairo.webp?q=80&w=400&h=250&fit=crop",
        link: "../../02-html-css-fundamentals/solo-project-hometown/"
    }
];

// Create a blog post card HTML
function createPostCard(post) {
    return `
        <article class="post-card">
            <a href="${post.link}" class="post-card__link" target="_blank" rel="noopener noreferrer">
                <img src="${post.image}" 
                     alt="${post.title}" 
                     class="post-card__image"
                     width="400"
                     height="250"
                     loading="lazy">
                <div class="post-card__content">
                    <p class="post-card__date">${post.date}</p>
                    <h3 class="post-card__title">${post.title}</h3>
                    <p class="post-card__excerpt">${post.excerpt}</p>
                </div>
            </a>
        </article>
    `;
}

// Load header template
function loadHeader() {
    const headerHTML = `
        <header class="site-header">
            <div class="site-header__container">
                <a href="index.html" class="site-header__brand">
                    <img src="images/logo.svg" alt="Sobhy Learning Journal logo" class="site-header__logo">
                    <span class="site-header__title">Sobhy Learning Journal</span>
                </a>
                <button class="dark-mode-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
                    <svg class="dark-mode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button>
                <button class="hamburger" aria-label="Toggle navigation menu" aria-expanded="false">
                    <span class="hamburger__line"></span>
                    <span class="hamburger__line"></span>
                    <span class="hamburger__line"></span>
                </button>
                <nav class="site-nav" aria-label="Main navigation">
                    <ul class="site-nav__list">
                        <li class="site-nav__item">
                            <a href="index.html" class="site-nav__link">Home</a>
                        </li>
                        <li class="site-nav__item">
                            <a href="about.html" class="site-nav__link">About Me</a>
                        </li>
                        <li class="site-nav__item">
                            <a href="contact.html" class="site-nav__link">Contact</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    `;
    
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
        // Setup hamburger menu after header is loaded
        setupHamburgerMenu();
        // Setup dark mode toggle
        setupDarkMode();
    }
}

// Load footer template
function loadFooter() {
    const currentYear = new Date().getFullYear();
    const footerHTML = `
        <footer class="site-footer">
            <div class="site-footer__container">
                <p class="site-footer__text">
                    Built with 💙 as part of the Scrimba Fullstack Path.
                </p>
                <p class="site-footer__text">
                    © ${currentYear} <strong>Sobhy Learning Journal</strong>.
                </p>
            </div>
        </footer>
    `;
    
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }
}

// Load recent posts for homepage
function loadHomeRecentPosts() {
    const postsContainer = document.getElementById('home-recent-posts');
    if (!postsContainer) return;
    
    // Show first 6 posts initially
    const visiblePosts = blogPosts.slice(1, 7); // Skip the hero post
    const hiddenPosts = blogPosts.slice(7);
    
    // Add visible posts
    visiblePosts.forEach(post => {
        postsContainer.innerHTML += createPostCard(post);
    });
    
    // Add hidden posts with a class
    hiddenPosts.forEach(post => {
        const postHTML = createPostCard(post);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = postHTML;
        const postCard = tempDiv.firstElementChild;
        postCard.classList.add('post-card--hidden');
        postsContainer.appendChild(postCard);
    });
}

// Load recent posts for article and about pages
function loadRecentPosts(containerId) {
    const postsContainer = document.getElementById(containerId);
    if (!postsContainer) return;
    
    // Show 3 most recent posts (excluding the current article if on article page)
    const recentPosts = blogPosts.slice(1, 4);
    
    recentPosts.forEach(post => {
        postsContainer.innerHTML += createPostCard(post);
    });
}

// View More button functionality
function setupViewMore() {
    const viewMoreBtn = document.getElementById('view-more-btn');
    if (!viewMoreBtn) return;
    
    viewMoreBtn.addEventListener('click', function() {
        const hiddenPosts = document.querySelectorAll('.post-card--hidden');
        
        if (hiddenPosts.length > 0) {
            // Show hidden posts with a smooth transition
            hiddenPosts.forEach(post => {
                post.classList.remove('post-card--hidden');
                post.classList.add('post-card--visible');
            });
            
            // Hide the button after showing all posts
            viewMoreBtn.style.display = 'none';
        }
    });
}

// Hamburger menu toggle - learned mobile nav from Kevin Powell!
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.site-nav');
    
    if (!hamburger || !nav) return;
    
    hamburger.addEventListener('click', () => {
        // Toggle active classes
        const isOpen = hamburger.classList.toggle('hamburger--active');
        nav.classList.toggle('site-nav--active');
        
        // Update aria-expanded for screen readers
        hamburger.setAttribute('aria-expanded', isOpen);
        
        // Prevent scrolling when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.site-nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('hamburger--active');
            nav.classList.remove('site-nav--active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('type', 'button');
            document.body.style.overflow = '';
        });
    });
}

// Dark mode toggle with localStorage persistence
function setupDarkMode() {
    const toggle = document.querySelector('.dark-mode-toggle');
    const icon = document.querySelector('.dark-mode-icon');
    
    if (!toggle || !icon) return;
    
    // Function to update GitHub icon based on theme
    function updateGitHubIcon(isDark) {
        const githubIcon = document.querySelector('.link-card img[alt="GitHub Logo Icon"]');
        if (githubIcon) {
            githubIcon.src = isDark ? 'images/github-mark-white.svg' : 'images/github-mark.svg';
        }
    }
    
    // Check for saved preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        // Sun icon for dark mode
        icon.innerHTML = '<path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="var(--color-text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
        updateGitHubIcon(true);
    }
    
    // Toggle dark mode on click
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        const isDark = document.body.classList.contains('dark-mode');
        
        if (isDark) {
            // Sun icon (for dark mode)
            icon.innerHTML = '<path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="var(--color-text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
        } else {
            // Moon icon (for light mode)
            icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        }
        
        // Update GitHub icon
        updateGitHubIcon(isDark);
        
        // Save preference to localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Smooth scroll animations - fade in elements as they come into view
function setupScrollAnimations() {
    // Add scroll-fade class to elements we want to animate
    const postCards = document.querySelectorAll('.post-card');
    const sections = document.querySelectorAll('.quick-links, .connect-with-me, .article, .about-hero, .about-content');
    
    // Combine all elements to animate
    const elementsToAnimate = [...postCards, ...sections];
    
    // Add the scroll-fade class
    elementsToAnimate.forEach(el => {
        if (!el.classList.contains('scroll-fade')) {
            el.classList.add('scroll-fade');
        }
    });
    
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load header and footer on all pages
    loadHeader();
    loadFooter();
    
    // Load posts based on which page we're on
    if (document.getElementById('home-recent-posts')) {
        loadHomeRecentPosts();
        setupViewMore();
    }
    
    if (document.getElementById('article-recent-posts')) {
        loadRecentPosts('article-recent-posts');
    }
    
    if (document.getElementById('about-recent-posts')) {
        loadRecentPosts('about-recent-posts');
    }
    
    // Setup scroll animations after a brief delay to let content load
    setTimeout(() => {
        setupScrollAnimations();
    }, 100);
});
