/**
 * Manchester.solar Smart Quote Routing System
 * Gold Standard v3.1 Compliant
 * No localStorage usage - session-based only
 * 
 * Features:
 * - Automatic property type detection
 * - Smart form routing (residential vs commercial)
 * - Property chooser modal for ambiguous cases
 * - GA4 event tracking
 * - No-JS fallback support
 * - GDPR compliant data handling
 */

window.ManchesterQuoteRouter = (function() {
    'use strict';
    
    // Configuration
    const config = {
        selectors: {
            quoteButtons: '[data-smart-quote="true"]',
            modal: '#quote-modal',
            modalContent: '.modal-content',
            modalClose: '.modal-close',
            propertyCards: '.property-card',
            residentialForm: '#residential-quote-form',
            commercialForm: '#commercial-quote-form'
        },
        routes: {
            residential: '/residential#quote-form',
            commercial: '/commercial#quote-form',
            home: '/#quote-chooser'
        },
        analytics: {
            enabled: typeof gtag !== 'undefined',
            events: {
                modalOpen: 'quote_modal_open',
                propertySelect: 'property_type_select',
                formRoute: 'quote_form_route',
                modalClose: 'quote_modal_close'
            }
        }
    };
    
    // State management (session-based, no localStorage)
    let currentPage = null;
    let modalState = {
        isOpen: false,
        openedFrom: null
    };
    
    // Initialize the routing system
    function init() {
        detectCurrentPage();
        bindEventListeners();
        handleDirectLinks();
        setupKeyboardNavigation();
        
        console.log('Manchester Quote Router initialized for:', currentPage);
    }
    
    // Detect current page type
    function detectCurrentPage() {
        const path = window.location.pathname.toLowerCase();
        const hash = window.location.hash;
        
        if (path.includes('residential') || path.includes('home')) {
            currentPage = 'residential';
        } else if (path.includes('commercial') || path.includes('business')) {
            currentPage = 'commercial';
        } else {
            currentPage = 'neutral'; // Homepage or other pages
        }
        
        // Handle direct navigation to quote forms
        if (hash === '#quote-form') {
            setTimeout(() => {
                scrollToQuoteForm();
            }, 100);
        }
    }
    
    // Bind all event listeners
    function bindEventListeners() {
        // Quote button clicks
        document.addEventListener('click', handleQuoteButtonClick);
        
        // Modal close events
        document.addEventListener('click', handleModalClose);
        document.addEventListener('keydown', handleEscapeKey);
        
        // Property card selection
        document.addEventListener('click', handlePropertyCardClick);
        
        // Form submissions
        document.addEventListener('submit', handleFormSubmission);
        
        // Browser back/forward
        window.addEventListener('popstate', handlePopState);
    }
    
    // Handle quote button clicks with smart routing
    function handleQuoteButtonClick(event) {
        const button = event.target.closest(config.selectors.quoteButtons);
        if (!button) return;
        
        event.preventDefault();
        
        modalState.openedFrom = button;
        
        // Smart routing logic
        if (currentPage === 'neutral') {
            // Show property chooser modal
            showPropertyChooser();
        } else if (currentPage === 'residential') {
            // Direct to residential form
            selectPropertyType('residential', event);
        } else if (currentPage === 'commercial') {
            // Direct to commercial form
            selectPropertyType('commercial', event);
        } else {
            // Fallback - show chooser
            showPropertyChooser();
        }
    }
    
    // Show property chooser modal
    function showPropertyChooser() {
        const modal = document.querySelector(config.selectors.modal);
        if (!modal) {
            console.warn('Quote modal not found - falling back to direct navigation');
            fallbackToDirectNavigation();
            return;
        }
        
        modal.classList.add('active');
        modalState.isOpen = true;
        
        // Focus management
        setTimeout(() => {
            const firstCard = modal.querySelector(config.selectors.propertyCards);
            if (firstCard) {
                firstCard.focus();
            }
        }, 100);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Track modal open
        trackEvent(config.analytics.events.modalOpen, {
            source_page: currentPage,
            timestamp: Date.now()
        });
    }
    
    // Close property chooser modal
    function closePropertyChooser() {
        const modal = document.querySelector(config.selectors.modal);
        if (!modal) return;
        
        modal.classList.remove('active');
        modalState.isOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Return focus to trigger element if possible
        if (modalState.openedFrom) {
            modalState.openedFrom.focus();
        }
        
        // Track modal close
        trackEvent(config.analytics.events.modalClose, {
            source_page: currentPage,
            interaction_type: 'manual_close'
        });
    }
    
    // Handle property type selection
    function selectPropertyType(propertyType, event) {
        if (event) {
            event.preventDefault();
        }
        
        // Track selection
        trackEvent(config.analytics.events.propertySelect, {
            property_type: propertyType,
            source_page: currentPage,
            selection_method: 'modal_click'
        });
        
        // Close modal if open
        if (modalState.isOpen) {
            closePropertyChooser();
        }
        
        // Navigate to appropriate page
        const targetUrl = propertyType === 'residential' 
            ? config.routes.residential 
            : config.routes.commercial;
            
        // Use smooth navigation
        if (window.location.pathname.includes(propertyType)) {
            // Already on correct page, just scroll to form
            setTimeout(scrollToQuoteForm, 300);
        } else {
            // Navigate to different page
            window.location.href = targetUrl;
        }
    }
    
    // Scroll to quote form with smooth animation
    function scrollToQuoteForm() {
        const formSelector = currentPage === 'commercial' 
            ? config.selectors.commercialForm 
            : config.selectors.residentialForm;
            
        const form = document.querySelector(formSelector) || document.querySelector('#quote-form');
        
        if (form) {
            const headerOffset = 80; // Account for fixed header
            const elementPosition = form.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Focus first form field for accessibility
            setTimeout(() => {
                const firstInput = form.querySelector('input:not([type="hidden"]), select');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 600);
        } else {
            console.warn('Quote form not found on current page');
        }
    }
    
    // Handle modal close clicks
    function handleModalClose(event) {
        const modal = document.querySelector(config.selectors.modal);
        if (!modal || !modalState.isOpen) return;
        
        // Click on modal close button
        if (event.target.matches(config.selectors.modalClose)) {
            closePropertyChooser();
            return;
        }
        
        // Click outside modal content
        if (event.target === modal) {
            closePropertyChooser();
            return;
        }
    }
    
    // Handle property card clicks
    function handlePropertyCardClick(event) {
        const card = event.target.closest(config.selectors.propertyCards);
        if (!card) return;
        
        const propertyType = card.getAttribute('data-type');
        if (propertyType) {
            selectPropertyType(propertyType, event);
        }
    }
    
    // Handle escape key to close modal
    function handleEscapeKey(event) {
        if (event.key === 'Escape' && modalState.isOpen) {
            closePropertyChooser();
        }
    }
    
    // Handle form submissions with enhanced tracking
    function handleFormSubmission(event) {
        const form = event.target;
        if (!form.matches(config.selectors.residentialForm + ', ' + config.selectors.commercialForm)) {
            return;
        }
        
        // Get form data for analytics
        const formData = new FormData(form);
        const formType = form.id.includes('residential') ? 'residential' : 'commercial';
        
        // Track form submission
        trackEvent('lead_form_submit', {
            form_type: formType,
            page_location: window.location.href,
            property_type: formData.get('property_type') || 'not_specified',
            monthly_bill: formData.get('monthly_bill') || 'not_specified',
            timeline: formData.get('timeline') || 'not_specified'
        });
        
        // Enhanced form validation could go here
        console.log('Form submitted:', formType);
    }
    
    // Handle browser navigation
    function handlePopState(event) {
        detectCurrentPage();
        
        // Close modal if open during navigation
        if (modalState.isOpen) {
            closePropertyChooser();
        }
    }
    
    // Handle direct links to quote forms
    function handleDirectLinks() {
        // If someone lands directly on a quote form URL
        if (window.location.hash === '#quote-form') {
            setTimeout(scrollToQuoteForm, 500);
        }
    }
    
    // Setup keyboard navigation for accessibility
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', function(event) {
            if (!modalState.isOpen) return;
            
            const modal = document.querySelector(config.selectors.modal);
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            // Tab key navigation
            if (event.key === 'Tab') {
                if (event.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
        });
    }
    
    // Fallback navigation for when JS fails
    function fallbackToDirectNavigation() {
        // Fallback to simple navigation
        if (currentPage === 'neutral') {
            window.location.href = '/residential#quote-form';
        }
    }
    
    // Show unified form (future feature)
    function showUnifiedForm() {
        // This could be implemented for complex routing scenarios
        console.log('Unified form not yet implemented');
        // For now, default to residential
        selectPropertyType('residential');
    }
    
    // Analytics tracking helper
    function trackEvent(eventName, parameters = {}) {
        if (!config.analytics.enabled) return;
        
        try {
            gtag('event', eventName, {
                ...parameters,
                page_location: window.location.href,
                page_title: document.title,
                timestamp: Date.now()
            });
        } catch (error) {
            console.warn('Analytics tracking failed:', error);
        }
    }
    
    // Public API
    return {
        init: init,
        showPropertyChooser: showPropertyChooser,
        closePropertyChooser: closePropertyChooser,
        selectPropertyType: selectPropertyType,
        showUnifiedForm: showUnifiedForm,
        scrollToQuoteForm: scrollToQuoteForm,
        getCurrentPage: () => currentPage,
        getModalState: () => modalState
    };
})();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    ManchesterQuoteRouter.init();
});

// Handle page visibility changes (for analytics)
document.addEventListener('visibilitychange', function() {
    if (document.hidden && ManchesterQuoteRouter.getModalState().isOpen) {
        // User switched tabs/minimized with modal open
        if (typeof gtag !== 'undefined') {
            gtag('event', 'modal_visibility_change', {
                state: 'hidden',
                page_location: window.location.href
            });
        }
    }
});

// Error handling for the quote router
window.addEventListener('error', function(event) {
    if (event.error && event.error.message.includes('ManchesterQuoteRouter')) {
        console.error('Quote Router Error:', event.error);
        
        // Fallback to direct navigation
        const quoteButtons = document.querySelectorAll('[data-smart-quote="true"]');
        quoteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = '/residential#quote-form';
            });
        });
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ManchesterQuoteRouter;
}