// Blog posts data - these will be used across all pages
const blogPosts = [
    {
        id: 1,
        title: "My new journey as a bootcamp student",
        date: "December 13, 2025",
        excerpt: "After several months of learning in the Frontend Developer Career Path, I've made the big jump over to the Scrimba Bootcamp.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
        link: "article.html"
    },
    {
        id: 2,
        title: "Mastering CSS Grid Layouts",
        date: "December 10, 2025",
        excerpt: "CSS Grid has completely changed how I think about layout. Here's what I learned from Kevin Powell's Grid masterclass.",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 3,
        title: "Why Flexbox Still Matters",
        date: "December 7, 2025",
        excerpt: "Even with CSS Grid, Flexbox remains essential for component-level layouts. Here's when to use each.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 4,
        title: "Mobile-First Design: A Game Changer",
        date: "December 4, 2025",
        excerpt: "Starting with mobile layouts first has made my responsive designs so much cleaner and easier to maintain.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 5,
        title: "The Power of CSS Custom Properties",
        date: "November 29, 2025",
        excerpt: "CSS variables have transformed my workflow. Here's how I use them to create consistent, maintainable designs.",
        image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 6,
        title: "Responsive Images Done Right",
        date: "November 25, 2025",
        excerpt: "Learning about srcset, sizes, and picture elements helped me optimize images for all screen sizes.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 7,
        title: "Understanding Viewport Units",
        date: "November 20, 2025",
        excerpt: "vh, vw, vmin, and vmax units opened up new possibilities for responsive typography and spacing.",
        image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 8,
        title: "Web Accessibility Essentials",
        date: "November 15, 2025",
        excerpt: "Building accessible websites isn't just the right thing to do - it makes better products for everyone.",
        image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop",
        link: "#"
    },
    {
        id: 9,
        title: "Advanced CSS Grid Techniques",
        date: "November 10, 2025",
        excerpt: "Moving beyond basic grids: named grid areas, implicit grids, and auto-fit vs auto-fill.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
        link: "#"
    }
];

// Create a blog post card HTML
function createPostCard(post) {
    return `
        <article class="post-card">
            <a href="${post.link}" class="post-card__link">
                <img src="${post.image}" 
                     alt="${post.title}" 
                     class="post-card__image">
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
