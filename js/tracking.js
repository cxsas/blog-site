// Centralized tracking configuration for Creative Xchange website

// Google Tag Manager Configuration
const GTM_CONFIG = {
    containerId: 'GTM-WTTBS5WL',
    dataLayer: 'dataLayer'
};

// Initialize Google Tag Manager
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',GTM_CONFIG.containerId);

// Custom event tracking functions
const Tracking = {
    // Track page views
    trackPageView: function(pageTitle, pageLocation) {
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'page_view',
                'page_title': pageTitle || document.title,
                'page_location': pageLocation || window.location.href,
                'timestamp': new Date().toISOString()
            });
        }
    },

    // Track newsletter interactions
    trackNewsletterView: function(newsletterTitle, newsletterMonth) {
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'newsletter_view',
                'newsletter_title': newsletterTitle,
                'newsletter_month': newsletterMonth,
                'timestamp': new Date().toISOString()
            });
        }
    },

    // Track newsletter signups
    trackNewsletterSignup: function(email, source) {
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'newsletter_signup',
                'email_domain': email.split('@')[1],
                'signup_source': source || 'website',
                'timestamp': new Date().toISOString()
            });
        }
    },

    // Track external link clicks
    trackExternalLink: function(linkUrl, linkText, linkType) {
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'external_link_click',
                'link_url': linkUrl,
                'link_text': linkText,
                'link_type': linkType || 'general',
                'timestamp': new Date().toISOString()
            });
        }
    },

    // Track venue interactions
    trackVenueInteraction: function(venueName, venueLocation, interactionType) {
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'venue_interaction',
                'venue_name': venueName,
                'venue_location': venueLocation,
                'interaction_type': interactionType,
                'timestamp': new Date().toISOString()
            });
        }
    },

    // Track artist interactions
    trackArtistInteraction: function(artistName, artistGenre, interactionType) {
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'artist_interaction',
                'artist_name': artistName,
                'artist_genre': artistGenre,
                'interaction_type': interactionType,
                'timestamp': new Date().toISOString()
            });
        }
    },

    // Track form submissions
    trackFormSubmission: function(formName, formType) {
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'form_submission',
                'form_name': formName,
                'form_type': formType,
                'timestamp': new Date().toISOString()
            });
        }
    },

    // Track performance metrics
    trackPerformance: function(metrics) {
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'performance_metrics',
                'metrics': metrics,
                'timestamp': new Date().toISOString()
            });
        }
    },

    // Track user engagement
    trackEngagement: function(action, element, value) {
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'user_engagement',
                'action': action,
                'element': element,
                'value': value,
                'timestamp': new Date().toISOString()
            });
        }
    }
};

// Enhanced tracking for newsletter pages
function initializeNewsletterTracking() {
    // Track newsletter view on load
    const newsletterTitle = document.querySelector('.newsletter-header h1')?.textContent;
    const newsletterDate = document.querySelector('.newsletter-header .date')?.textContent;
    
    if (newsletterTitle) {
        Tracking.trackNewsletterView(newsletterTitle, newsletterDate);
    }

    // Track venue card interactions
    const venueCards = document.querySelectorAll('.venue-logo-card');
    venueCards.forEach(card => {
        card.addEventListener('click', function() {
            const venueName = this.querySelector('.venue-name')?.textContent;
            const venueLocation = this.querySelector('.venue-location')?.textContent;
            Tracking.trackVenueInteraction(venueName, venueLocation, 'card_click');
        });
    });

    // Track artist card interactions
    const artistCards = document.querySelectorAll('.card');
    artistCards.forEach(card => {
        card.addEventListener('click', function() {
            const artistName = this.querySelector('h3')?.textContent;
            const artistGenre = this.querySelector('.badge')?.textContent;
            Tracking.trackArtistInteraction(artistName, artistGenre, 'card_click');
        });
    });

    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonClass = this.className;
            Tracking.trackEngagement('cta_click', buttonClass, buttonText);
        });
    });
}

// Enhanced tracking for homepage
function initializeHomepageTracking() {
    // Track newsletter card clicks
    const newsletterCards = document.querySelectorAll('.newsletter-card');
    newsletterCards.forEach(card => {
        card.addEventListener('click', function() {
            const newsletterTitle = this.querySelector('h3')?.textContent;
            Tracking.trackNewsletterInteraction(newsletterTitle, 'card_click');
        });
    });

    // Track navigation clicks
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkText = this.textContent.trim();
            Tracking.trackEngagement('navigation_click', 'nav_link', linkText);
        });
    });
}

// Performance monitoring
function initializePerformanceTracking() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const metrics = {
                    page_load_time: perfData.loadEventEnd - perfData.loadEventStart,
                    dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    first_paint: performance.getEntriesByType('paint')[0]?.startTime || 0,
                    first_contentful_paint: performance.getEntriesByType('paint')[1]?.startTime || 0
                };
                
                Tracking.trackPerformance(metrics);
            }, 0);
        });
    }
}

// Initialize tracking based on page type
document.addEventListener('DOMContentLoaded', function() {
    // Track initial page view
    Tracking.trackPageView();

    // Initialize performance tracking
    initializePerformanceTracking();

    // Initialize page-specific tracking
    if (document.querySelector('.newsletter-header')) {
        initializeNewsletterTracking();
    } else if (document.querySelector('.newsletter-grid')) {
        initializeHomepageTracking();
    }

    console.log('Tracking initialized successfully');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Tracking, GTM_CONFIG };
} 