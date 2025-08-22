/**
 * Header Loader - Loads header component on all pages
 * Manchester.solar - Solar Domain Empire v3.1
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Header loader starting...');
    
    // Create or find header container
    let headerContainer = document.getElementById('header-container');
    if (!headerContainer) {
        headerContainer = document.createElement('div');
        headerContainer.id = 'header-container';
        // Insert at the beginning of body
        document.body.insertBefore(headerContainer, document.body.firstChild);
    }
    
    // Load header content
    fetch('components/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Header not found: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            headerContainer.innerHTML = html;
            
            // Set active navigation link
            setActiveNavLink();
            
            // Initialize mobile menu
            initializeMobileMenu();
            
            console.log('Header loaded successfully');
        })
        .catch(error => {
            console.error('Error loading header:', error);
            
            // Fallback: show basic header
            headerContainer.innerHTML = `
                <header class="site-header">
                    <div class="container">
                        <a href="/" class="logo">
                            <span class="logo-icon">⚡</span>
                            <span class="logo-text">Manchester.solar</span>
                        </a>
                        <nav class="nav">
                            <ul class="nav-list">
                                <li><a href="/" class="nav-link">Home</a></li>
                                <li><a href="/about" class="nav-link">About</a></li>
                                <li><a href="/residential" class="nav-link">Residential</a></li>
                                <li><a href="/commercial" class="nav-link">Commercial</a></li>
                                <li><a href="#quote" class="btn" data-smart-quote="true">Get Quote</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
            `;
            
            setActiveNavLink();
            initializeMobileMenu();
            console.log('Fallback header loaded');
        });
});

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remove all current classes first
    navLinks.forEach(link => {
        link.classList.remove('current');
    });
    
    // Set active link
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Home page
        if (currentPath === '/' && linkPath === '/') {
            link.classList.add('current');
        }
        // Other pages - check if current path contains the link path
        else if (linkPath !== '/' && currentPath.includes(linkPath.replace('/', ''))) {
            link.classList.add('current');
        }
        // Handle files with .html extension
        else if (linkPath !== '/' && currentPath.includes(linkPath.replace('/', '').replace('.html', ''))) {
            link.classList.add('current');
        }
    });
    
    console.log('Active nav link set for:', currentPath);
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const mobileIcon = document.querySelector('.mobile-icon');
    const navList = document.querySelector('.nav-list');
    
    if (mobileIcon && navList) {
        // Remove any existing listeners
        mobileIcon.removeEventListener('click', toggleMobileMenu);
        
        // Add click listener
        mobileIcon.addEventListener('click', toggleMobileMenu);
        
        console.log('Mobile menu initialized');
    }
}

// Mobile menu toggle function
function toggleMobileMenu() {
    const navList = document.querySelector('.nav-list');
    if (navList) {
        navList.classList.toggle('mobile-open');
        console.log('Mobile menu toggled');
    }
}

// Close mobile menu when clicking nav links
document.addEventListener('click', function(event) {
    if (event.target.matches('.nav-link')) {
        const navList = document.querySelector('.nav-list');
        if (navList && navList.classList.contains('mobile-open')) {
            navList.classList.remove('mobile-open');
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const navList = document.querySelector('.nav-list');
    if (navList && window.innerWidth > 768) {
        navList.classList.remove('mobile-open');
    }
});