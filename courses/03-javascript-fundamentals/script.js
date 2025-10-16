// Modern JavaScript for enhanced interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Dynamically set copyright year in footer
    const yearSpan = document.getElementById('copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scroll behavior for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
            this.classList.toggle('active');
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe project cards and sections for animation
    const animateElements = document.querySelectorAll('.project-card, .hero, .about-section');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width || '0%';
                entry.target.parentElement.parentElement.classList.add('animate-progress');
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => progressObserver.observe(bar));

    // Add loading states to project links
    const projectLinks = document.querySelectorAll('.project-card a');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a subtle loading indicator
            const overlay = this.querySelector('.project-overlay');
            if (overlay) {
                const demo = overlay.querySelector('.project-demo');
                if (demo) {
                    demo.textContent = 'Loading...';
                }
            }
        });
    });

    // Dynamic greeting based on time of day
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const hour = new Date().getHours();
        let greeting = 'Welcome to';
        
        if (hour < 12) {
            greeting = 'Good morning! Welcome to';
        } else if (hour < 17) {
            greeting = 'Good afternoon! Welcome to';
        } else {
            greeting = 'Good evening! Welcome to';
        }
        
        heroTitle.textContent = greeting + ' My JavaScript Learning Journey!';
    }

    // Add keyboard navigation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const link = card.querySelector('a');
        if (link) {
            link.setAttribute('tabindex', '0');
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    });

    // Add hover effects for better UX
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Simple typing effect for hero description (optional enhancement)
    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc && window.innerWidth > 768) { // Only on larger screens
        const text = heroDesc.textContent;
        heroDesc.textContent = '';
        heroDesc.style.borderRight = '2px solid #f7df1e';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroDesc.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            } else {
                setTimeout(() => {
                    heroDesc.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect after a brief delay
        setTimeout(typeWriter, 1000);
    }
});
