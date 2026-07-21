document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Premium Sticky Navbar Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu & Accordion Logic
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    const closeMobileMenu = () => {
        navLinks.classList.remove('active');
        if(mobileBtn) mobileBtn.querySelector('i').setAttribute('data-lucide', 'menu');
        document.body.style.overflow = ''; // Restore Body Scroll
        
        // Reset dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('active'));
        document.querySelectorAll('.dropdown-icon').forEach(i => i.style.transform = '');
        lucide.createIcons();
    };

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = navLinks.classList.toggle('active');
            
            // Toggle icon between menu and x
            const icon = mobileBtn.querySelector('i');
            if (isActive) {
                icon.setAttribute('data-lucide', 'x');
                document.body.style.overflow = 'hidden'; // Prevent Body Scroll
            } else {
                icon.setAttribute('data-lucide', 'menu');
                document.body.style.overflow = ''; // Restore Body Scroll
            }
            lucide.createIcons();
        });
    }

    // Accordion functionality for mobile dropdowns
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault(); 
                const parent = toggle.parentElement;
                const menu = parent.querySelector('.dropdown-menu');
                const icon = toggle.querySelector('.dropdown-icon');
                
                // Close others
                document.querySelectorAll('.dropdown-menu').forEach(m => {
                    if (m !== menu) m.classList.remove('active');
                });
                document.querySelectorAll('.dropdown-icon').forEach(i => {
                    if (i !== icon) i.style.transform = 'rotate(0deg)';
                });

                // Toggle current
                menu.classList.toggle('active');
                if (menu.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu after clicking a normal navigation link
    document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });

    // Close mobile menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // 4. Smooth Fade-In Animations on Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // 5. Newsletter Form Submission Handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput.value) {
                const btn = newsletterForm.querySelector('button');
                const originalText = btn.textContent;
                btn.innerHTML = '<i data-lucide="check" style="margin-right: 8px;"></i> Joined';
                btn.style.backgroundColor = 'var(--accent-sage)';
                btn.style.color = '#fff';
                lucide.createIcons();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    emailInput.value = '';
                }, 3000);
            }
        });
    }

    // 6. Quick Add To Cart Interaction
    const addBtns = document.querySelectorAll('.add-to-cart');
    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const originalText = btn.textContent;
            btn.innerHTML = '<i data-lucide="check" style="margin-right: 8px; width: 18px; height: 18px;"></i> Added to Cart';
            btn.style.backgroundColor = 'var(--accent-sage)';
            lucide.createIcons();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
            }, 2000);
        });
    });
    
    // 7. Wishlist Interaction
    const wishlistBtns = document.querySelectorAll('.card-actions .action-btn:first-child');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = btn.querySelector('i');
            
            if(icon.style.fill === 'var(--accent-bronze)') {
                icon.style.fill = 'none';
                icon.style.color = 'var(--text-main)';
            } else {
                icon.style.fill = 'var(--accent-bronze)';
                icon.style.color = 'var(--accent-bronze)';
            }
        });
    });
});
