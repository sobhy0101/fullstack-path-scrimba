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
                <div class="site-header__brand">
                    <img src="images/logo.svg" alt="Sobhy Learning Journal logo" class="site-header__logo">
                    <span class="site-header__title">Sobhy Learning Journal</span>
                </div>
                <nav class="site-nav" aria-label="Main navigation">
                    <ul class="site-nav__list">
                        <li class="site-nav__item">
                            <a href="index.html" class="site-nav__link">Home</a>
                        </li>
                        <li class="site-nav__item">
                            <a href="about.html" class="site-nav__link">About Me</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    `;
    
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    }
}

// Load footer template
function loadFooter() {
    const currentYear = new Date().getFullYear();
    const footerHTML = `
        <footer class="site-footer">
            <div class="site-footer__container">
                <p class="site-footer__text">
                    © ${currentYear} Sobhy Learning Journal. Built with 💙 as part of the Scrimba Fullstack Path.
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
});
