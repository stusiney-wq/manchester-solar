// Manchester.solar - Fixed Scroll & Animation JavaScript
// Fixes all scroll-related issues while preserving conversion features
// Last Updated: September 2025

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // 1. FAQ ACCORDION - FIXED
  // ========================================
  
  const faqButtons = document.querySelectorAll('.faq-question');
  const faqAnswers = document.querySelectorAll('.faq-answer');

  function closeAllFAQs() {
    faqButtons.forEach(button => {
      button.setAttribute('aria-expanded', 'false');
      button.querySelector('.faq-icon').textContent = '+';
    });
    faqAnswers.forEach(answer => {
      answer.hidden = true;
      answer.classList.remove('show');
    });
  }

  faqButtons.forEach(button => {
    button.addEventListener('click', function() {
      const answer = document.getElementById(this.getAttribute('aria-controls'));
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQs first
      closeAllFAQs();
      
      // Toggle current FAQ
      if (!isExpanded) {
        this.setAttribute('aria-expanded', 'true');
        this.querySelector('.faq-icon').textContent = '−';
        answer.hidden = false;
        answer.classList.add('show');
      }
      
      // Analytics tracking if available
      if (typeof gtag !== 'undefined' && !isExpanded) {
        gtag('event', 'faq_toggle', {
          'question_text': this.textContent.trim(),
          'page_location': window.location.href
        });
      }
    });
  });

  // Handle direct FAQ linking (e.g., #faq-3)
  if (location.hash && location.hash.startsWith('#faq-')) {
    const targetAnswer = document.querySelector(location.hash);
    const targetButton = targetAnswer ? 
      document.querySelector(`[aria-controls="${targetAnswer.id}"]`) : null;
    
    if (targetButton && targetAnswer) {
      setTimeout(() => {
        closeAllFAQs();
        targetButton.setAttribute('aria-expanded', 'true');
        targetButton.querySelector('.faq-icon').textContent = '−';
        targetAnswer.hidden = false;
        targetAnswer.classList.add('show');
        targetAnswer.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }

  // ========================================
  // 2. SMOOTH SCROLL - FIXED
  // ========================================
  
  // Handle all anchor links
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (href === '#' || href === '') return;
    
    e.preventDefault();
    
    const target = document.querySelector(href);
    if (!target) return;
    
    const headerOffset = 80; // Account for any fixed headers
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Focus management for accessibility
    setTimeout(() => {
      if (href.includes('form') || href.includes('quote')) {
        const firstInput = target.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus();
      }
    }, 500);
  });

  // ========================================
  // 3. FLOATING CTA - FIXED
  // ========================================
  
  const floatingCTA = document.getElementById('floating-cta');
  const heroSection = document.querySelector('.hero-section');
  
  if (floatingCTA && heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Hero is visible - hide floating CTA
          floatingCTA.classList.remove('visible');
        } else {
          // Hero is not visible - show floating CTA
          floatingCTA.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    observer.observe(heroSection);
  }

  // ========================================
  // 4. SCROLL ANIMATIONS - FIXED
  // ========================================
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Don't unobserve to allow re-triggering if needed
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animatable elements
    const animatableSelectors = [
      '.stat-card',
      '.benefit-card', 
      '.resource-card',
      '.help-card',
      '.trust-guarantee',
      '.trust-credentials',
      '.faq-item',
      '.connect-cards .card',
      '.section-header',
      '.form-container'
    ];

    animatableSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((element, index) => {
        // Add staggered delay
        element.style.transitionDelay = `${index * 0.1}s`;
        animationObserver.observe(element);
      });
    });
  }

  // ========================================
  // 5. 2-STEP FORM - FIXED
  // ========================================
  
  let currentStep = 1;
  const totalSteps = 2;
  
  window.nextStep = function() {
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    if (!currentStepElement) return;
    
    const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.focus();
        return;
      }
    });
    
    if (isValid && currentStep < totalSteps) {
      // Hide current step
      currentStepElement.classList.remove('active');
      
      // Show next step
      currentStep++;
      const nextStepElement = document.getElementById(`step-${currentStep}`);
      if (nextStepElement) {
        nextStepElement.classList.add('active');
      }
      
      // Update step indicator
      updateStepIndicator();
      
      // Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_step_complete', {
          'step_number': currentStep - 1,
          'page_location': window.location.href
        });
      }
    }
  };
  
  window.prevStep = function() {
    if (currentStep > 1) {
      // Hide current step
      const currentStepElement = document.getElementById(`step-${currentStep}`);
      if (currentStepElement) {
        currentStepElement.classList.remove('active');
      }
      
      // Show previous step
      currentStep--;
      const prevStepElement = document.getElementById(`step-${currentStep}`);
      if (prevStepElement) {
        prevStepElement.classList.add('active');
      }
      
      // Update step indicator
      updateStepIndicator();
    }
  };
  
  function updateStepIndicator() {
    const dots = document.querySelectorAll('.step-dot');
    dots.forEach((dot, index) => {
      if (index + 1 <= currentStep) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // ========================================
  // 6. FORM SUBMISSION - FIXED
  // ========================================
  
  const twoStepForm = document.getElementById('two-step-form');
  if (twoStepForm) {
    twoStepForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Show loading state
      const submitBtn = this.querySelector('.btn-next');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Connecting...';
        submitBtn.disabled = true;
        
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submission', {
            'form_type': 'two_step_quick_form',
            'property_type': data.property_type,
            'page_location': window.location.href
          });
        }
        
        // Simulate form submission (replace with real endpoint)
        setTimeout(() => {
          submitBtn.textContent = '✓ Request Sent!';
          submitBtn.style.background = '#22c55e';
          
          setTimeout(() => {
            // Replace with your thank you page
            window.location.href = '/thank-you';
          }, 1500);
          
        }, 2000);
      }
    });
  }

  // ========================================
  // 7. GENERAL FORM TRACKING - FIXED
  // ========================================
  
  // Track all form interactions
  document.addEventListener('focus', function(e) {
    if (e.target.matches('input[type="email"]') && typeof gtag !== 'undefined') {
      gtag('event', 'email_field_focus', {
        'form_location': e.target.closest('form')?.id || 'unknown',
        'page_location': window.location.href
      });
    }
    
    if (e.target.matches('input[type="tel"]') && typeof gtag !== 'undefined') {
      gtag('event', 'phone_field_focus', {
        'form_location': e.target.closest('form')?.id || 'unknown',
        'page_location': window.location.href
      });
    }
  }, true);

  // ========================================
  // 8. HASH CHANGE HANDLING - FIXED
  // ========================================
  
  window.addEventListener('hashchange', function() {
    const target = document.querySelector(location.hash);
    if (target) {
      // Handle FAQ links
      if (target.classList.contains('faq-answer')) {
        const button = document.querySelector(`[aria-controls="${target.id}"]`);
        if (button) {
          button.click();
        }
      }
      
      // Smooth scroll to target
      setTimeout(() => {
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  });

  // ========================================
  // 9. ENTRANCE ANIMATIONS - FIXED
  // ========================================
  
  // Hero entrance animation
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image');
  
  if (heroContent && heroImage && !prefersReducedMotion) {
    setTimeout(() => {
      heroContent.classList.add('hero-entrance');
      heroImage.classList.add('hero-entrance');
    }, 200);
  }

  // ========================================
  // 10. ACCESSIBILITY IMPROVEMENTS
  // ========================================
  
  // Trap focus in modals
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      // Close any open modals
      const openModal = document.querySelector('.modal.active');
      if (openModal) {
        openModal.classList.remove('active');
      }
    }
  });

  // Skip link functionality
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.focus();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

});