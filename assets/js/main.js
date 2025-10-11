// Van Houten Solutions - Jekyll Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.navbar-toggle');
    const navMenu = document.querySelector('.navbar-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up (mobile)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .portfolio-item');
    animateElements.forEach(el => observer.observe(el));
    
    // CTA button tracking (Instagram link clicks)
    const ctaButtons = document.querySelectorAll('a[href*="instagram.com"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track Instagram CTA clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'CTA',
                    event_label: 'Instagram Contact',
                    value: 1
                });
            }
            
            console.log('Instagram CTA clicked');
        });
    });
    
    // Form validation (if contact forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                console.log('Form validation failed');
            }
        });
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Portfolio hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
    
    // Service card hover tracking
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'hover', {
                    event_category: 'Service Card',
                    event_label: `Service ${index + 1}`,
                    value: 1
                });
            }
        });
    });

    // ================================
    // Templates Carousel (branche-voorbeelden)
    // ================================
    const carousels = document.querySelectorAll('[data-carousel]');
    carousels.forEach((carousel) => {
        const track = carousel.querySelector('.carousel-track');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-nav.prev');
        const nextBtn = carousel.querySelector('.carousel-nav.next');
        let index = 0;
        let timer = null;
        const autoplay = carousel.getAttribute('data-autoplay') === 'true';
        const interval = parseInt(carousel.getAttribute('data-interval') || '5000', 10);

        function itemWidth() {
            const item = items[0];
            if (!item) return 0;
            const width = item.getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(track).gap || '0');
            return width + gap;
        }

        function update() {
            const w = itemWidth();
            track.style.transform = `translateX(${-index * w}px)`;
        }

        function next() {
            const maxIndex = Math.max(0, items.length - 1);
            index = (index >= maxIndex) ? 0 : index + 1;
            update();
        }

        function prev() {
            const maxIndex = Math.max(0, items.length - 1);
            index = (index <= 0) ? maxIndex : index - 1;
            update();
        }

        function startAutoplay() {
            if (!autoplay) return;
            stopAutoplay();
            timer = setInterval(next, interval);
        }

        function stopAutoplay() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        prevBtn?.addEventListener('click', () => { prev(); startAutoplay(); });
        nextBtn?.addEventListener('click', () => { next(); startAutoplay(); });
        window.addEventListener('resize', update);
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        update();
        startAutoplay();
    });
    
});

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// External link handling
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('target') === '_blank') {
        // Track external link clicks
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'External Link',
                event_label: e.target.href,
                value: 1
            });
        }
    }
});

// ================================
// Contact Form Enhancement
// ================================

// Enhanced form validation and UX
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form[name="contact"]');
    
    if (contactForm) {
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
        
        formInputs.forEach(input => {
            // Validation on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear error on input
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                }
            });
        });
        
        // Email specific validation
        const emailInput = contactForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailPattern.test(this.value)) {
                    this.classList.add('error');
                    showFieldError(this, 'Voer een geldig e-mailadres in');
                } else if (this.value) {
                    this.classList.remove('error');
                    removeFieldError(this);
                }
            });
        }
        
        // Phone number formatting (optional field)
        const phoneInput = contactForm.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                // Remove non-numeric characters except + and spaces
                let value = this.value.replace(/[^\d\s+]/g, '');
                this.value = value;
            });
        }
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Validate all required fields
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            // Check privacy consent
            const privacyCheckbox = contactForm.querySelector('input[name="privacy-consent"]');
            if (privacyCheckbox && !privacyCheckbox.checked) {
                isValid = false;
                showFieldError(privacyCheckbox.closest('.form-group'), 'Je moet akkoord gaan met het privacybeleid');
            }
            
            if (!isValid) {
                e.preventDefault();
                
                // Scroll to first error
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                return false;
            }
            
            // Track form submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'submit', {
                    event_category: 'Contact Form',
                    event_label: 'Form Submitted',
                    value: 1
                });
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Bezig met versturen...';
            }
        });
        
        // Helper function to validate individual field
        function validateField(field) {
            if (!field.required && !field.value) {
                return true; // Optional empty field is valid
            }
            
            if (field.required && !field.value.trim()) {
                field.classList.add('error');
                showFieldError(field, 'Dit veld is verplicht');
                return false;
            }
            
            if (field.type === 'email' && field.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(field.value)) {
                    field.classList.add('error');
                    showFieldError(field, 'Voer een geldig e-mailadres in');
                    return false;
                }
            }
            
            field.classList.remove('error');
            removeFieldError(field);
            return true;
        }
        
        // Helper function to show field error
        function showFieldError(field, message) {
            removeFieldError(field); // Remove existing error first
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.color = 'var(--error)';
            errorDiv.style.fontSize = '0.875rem';
            errorDiv.style.marginTop = '0.25rem';
            errorDiv.textContent = message;
            
            const formGroup = field.closest('.form-group');
            if (formGroup) {
                formGroup.appendChild(errorDiv);
            }
        }
        
        // Helper function to remove field error
        function removeFieldError(field) {
            const formGroup = field.closest('.form-group');
            if (formGroup) {
                const existingError = formGroup.querySelector('.field-error');
                if (existingError) {
                    existingError.remove();
                }
            }
        }
    }
});