/* ============================================ */
/* MANCHESTER.SOLAR - COMPLETE SCRIPTS */
/* Gold Standard v3.1 - All JavaScript Functionality */
/* ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNewsletter();
    initializeSmoothScrolling();
    initializeAnimations();
    initializePlanningTabs();
    initializeAudienceToggle();
});

/* ============================================ */
/* NEWSLETTER FUNCTIONALITY */
/* ============================================ */
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[name="email"]').value;
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            console.log('Newsletter signup:', email);
            alert('Thank you for subscribing! We\'ll send you monthly Manchester solar updates.');
            this.reset();
        });
    }
}

/* ============================================ */
/* SMOOTH SCROLLING */
/* ============================================ */
function initializeSmoothScrolling() {
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
}

/* ============================================ */
/* SCROLL ANIMATIONS */
/* ============================================ */
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.bar-fill');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = targetWidth;
                        bar.classList.add('animate');
                    }, index * 150);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const seasonalChart = document.querySelector('.seasonal-chart');
    if (seasonalChart) {
        observer.observe(seasonalChart);
    }
}

/* ============================================ */
/* PLANNING PERMISSION TABS */
/* ============================================ */
function switchPlanningTab(tabType, clickedTab) {
    // Remove active class from all tabs
    document.querySelectorAll('.planning-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
    });
    
    // Add active class to clicked tab
    clickedTab.classList.add('active');
    clickedTab.setAttribute('aria-selected', 'true');
    
    // Hide all planning content
    document.querySelectorAll('.planning-content').forEach(content => {
        content.classList.remove('active');
        content.setAttribute('aria-hidden', 'true');
    });
    
    // Show selected planning content
    const targetContent = document.getElementById(tabType + '-planning');
    if (targetContent) {
        targetContent.classList.add('active');
        targetContent.setAttribute('aria-hidden', 'false');
    }
    
    // Focus management
    clickedTab.focus();
    
    // Optional: Track analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'tab_switch', {
            'event_category': 'planning_guide',
            'event_label': tabType,
            'value': 1
        });
    }
}

function initializePlanningTabs() {
    const tabs = document.querySelectorAll('.planning-tab');
    const contents = document.querySelectorAll('.planning-content');
    
    if (tabs.length === 0) return; // Exit if no planning tabs on page
    
    // Set initial ARIA attributes
    tabs.forEach((tab, index) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });
    
    contents.forEach((content, index) => {
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    });
    
    // Add keyboard navigation
    tabs.forEach(tab => {
        tab.addEventListener('keydown', function(e) {
            const currentIndex = Array.from(tabs).indexOf(this);
            let targetIndex;
            
            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    targetIndex = currentIndex + 1;
                    if (targetIndex >= tabs.length) targetIndex = 0;
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    targetIndex = currentIndex - 1;
                    if (targetIndex < 0) targetIndex = tabs.length - 1;
                    break;
                case 'Home':
                    e.preventDefault();
                    targetIndex = 0;
                    break;
                case 'End':
                    e.preventDefault();
                    targetIndex = tabs.length - 1;
                    break;
                default:
                    return;
            }
            
            // Switch to target tab
            const targetTab = tabs[targetIndex];
            const tabType = targetTab.onclick.toString().match(/'(\w+)'/)[1];
            switchPlanningTab(tabType, targetTab);
        });
    });
}

/* ============================================ */
/* AUDIENCE TOGGLE FUNCTIONALITY */
/* ============================================ */
function initializeAudienceToggle() {
    const toggleInputs = document.querySelectorAll('input[name="audience"]');
    const audienceContents = document.querySelectorAll('.audience-content');
    
    if (toggleInputs.length === 0) return; // Exit if no audience toggle on page
    
    // Add change event listeners to radio inputs
    toggleInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                switchAudienceContent(this.value);
            }
        });
    });
    
    // Also handle label clicks for better UX
    const switchLabels = document.querySelectorAll('.switch-option');
    switchLabels.forEach(label => {
        label.addEventListener('click', function() {
            const targetAudience = this.getAttribute('data-audience');
            switchAudienceContent(targetAudience);
        });
    });
    
    // Initialize with default state (homeowner)
    switchAudienceContent('homeowner');
}

function switchAudienceContent(audienceType) {
    // Hide all audience content
    const allContent = document.querySelectorAll('.audience-content');
    allContent.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected audience content
    const targetContent = document.getElementById(audienceType + '-content');
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Update radio button state
    const targetRadio = document.getElementById(audienceType + '-switch');
    if (targetRadio) {
        targetRadio.checked = true;
    }
    
    // Optional: Track analytics event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'audience_toggle', {
            'event_category': 'user_interaction',
            'event_label': audienceType,
            'value': 1
        });
    }
    
    // Optional: Store user preference
    try {
        localStorage.setItem('preferred_audience', audienceType);
    } catch (e) {
        // Ignore localStorage errors (some browsers block it)
    }
}

/* ============================================ */
/* UTILITY FUNCTIONS */
/* ============================================ */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}