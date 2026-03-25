document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const header = document.querySelector('.header');

    // Toggle Mobile Menu
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Toggle Mobile Accordions
    const mobileAccTriggers = document.querySelectorAll('.mobile-accordion-trigger');
    mobileAccTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const content = trigger.nextElementSibling;
            const icon = trigger.querySelector('.icon');
            
            const isOpen = content.style.display === 'flex';
            
            if (isOpen) {
                content.style.display = 'none';
                icon.innerText = '+';
            } else {
                content.style.display = 'flex';
                icon.innerText = '−';
            }
        });
    });

    // Close mobile menu on link click
    const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Subtle scroll effect for header
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
            return;
        }

        if (currentScroll > lastScroll) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Add smooth reveal for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // Scroll Reveal (Showcase Section)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of element is visible
    });

    revealElements.forEach(el => revealOnScroll.observe(el));

    // Product Slider Functionality
    const slider = document.getElementById('productSlider');
    const nextBtn = document.getElementById('slideNext');

    if (slider && nextBtn) {
        // Next Button Click
        nextBtn.addEventListener('click', () => {
            const scrollAmount = window.innerWidth > 1024 ? 900 : 400; // Scroll roughly 3 cards or 1 on mobile
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Convert Vertical Mouse Wheel to Horizontal Scroll
        slider.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                slider.scrollLeft += e.deltaY;
            }
        });

        // Track scroll position to hide/show buttons if needed (optional)
        // For now, simple next works well.
    }

    // Multi-Row Slider Functionality (Men & Women)
    const menSlider = document.getElementById('menSlider');
    const womenSlider = document.getElementById('womenSlider');
    const multiNextBtn = document.getElementById('slideMultiNext');

    const setupSlider = (sliderEl) => {
        if (!sliderEl) return;
        
        sliderEl.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                sliderEl.scrollLeft += e.deltaY;
            }
        });
    };

    setupSlider(menSlider);
    setupSlider(womenSlider);

    if (multiNextBtn) {
        multiNextBtn.addEventListener('click', () => {
            const scrollAmount = window.innerWidth > 1024 ? 900 : 450;
            [menSlider, womenSlider].forEach(slider => {
                if (slider) {
                    slider.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});
