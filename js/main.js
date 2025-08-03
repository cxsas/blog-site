// Main JavaScript file for Creative Xchange website

// Google Tag Manager tracking
function initializeGTM() {
    // GTM is already loaded via script tag, this is for additional tracking
    if (typeof dataLayer !== 'undefined') {
        dataLayer.push({
            'event': 'page_view',
            'page_title': document.title,
            'page_location': window.location.href
        });
    }
}

// Newsletter signup functionality
function initializeNewsletterSignup() {
    const signupForms = document.querySelectorAll('.newsletter-form');
    
    signupForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Check if CAPTCHA is completed
            const captchaResponse = grecaptcha.getResponse();
            if (!captchaResponse) {
                showMessage('Please complete the CAPTCHA verification.', 'error');
                return;
            }
            
            if (validateEmail(email)) {
                // Track signup event
                if (typeof dataLayer !== 'undefined') {
                    dataLayer.push({
                        'event': 'newsletter_signup',
                        'email': email,
                        'captcha_completed': true
                    });
                }
                
                // Here you would typically send the data to your server
                // For now, we'll just show success message
                showMessage('Thank you for subscribing!', 'success');
                emailInput.value = '';
                
                // Reset CAPTCHA
                grecaptcha.reset();
            } else {
                showMessage('Please enter a valid email address.', 'error');
            }
        });
    });
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message function
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            messageElement.style.backgroundColor = '#16a34a';
            break;
        case 'error':
            messageElement.style.backgroundColor = '#dc2626';
            break;
        default:
            messageElement.style.backgroundColor = '#2563eb';
    }
    
    document.body.appendChild(messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageElement.remove(), 300);
    }, 5000);
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Newsletter card interactions
function initializeNewsletterCards() {
    const cards = document.querySelectorAll('.newsletter-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const newsletterTitle = this.querySelector('h3').textContent;
            
            // Track newsletter click
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push({
                    'event': 'newsletter_click',
                    'newsletter_title': newsletterTitle
                });
            }
        });
    });
}

// Mobile menu toggle
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Analytics tracking for external links
function initializeExternalLinkTracking() {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (typeof dataLayer !== 'undefined') {
                dataLayer.push({
                    'event': 'external_link_click',
                    'link_url': this.href,
                    'link_text': this.textContent.trim()
                });
            }
        });
    });
}

// Performance monitoring
function initializePerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                
                if (typeof dataLayer !== 'undefined') {
                    dataLayer.push({
                        'event': 'performance_metrics',
                        'page_load_time': perfData.loadEventEnd - perfData.loadEventStart,
                        'dom_content_loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart
                    });
                }
            }, 0);
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGTM();
    initializeNewsletterSignup();
    initializeSmoothScrolling();
    initializeLazyLoading();
    initializeNewsletterCards();
    initializeMobileMenu();
    initializeExternalLinkTracking();
    initializePerformanceMonitoring();
    
    console.log('Creative Xchange website initialized successfully');
});

// Handle reCAPTCHA loading
window.onload = function() {
    if (typeof grecaptcha !== 'undefined') {
        grecaptcha.ready(function() {
            console.log('reCAPTCHA loaded successfully');
        });
    }
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-links.active {
        display: flex !important;
    }
    
    .mobile-menu-button.active {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;
document.head.appendChild(style); 