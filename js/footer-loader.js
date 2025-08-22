/**
 * Solar Domain Empire - Footer Loader v1.0
 * Dynamic footer loading system for Manchester.solar and network sites
 * Part of Find Solar UK Network
 * STRICT NO INLINE CSS POLICY - External CSS only
 */

document.addEventListener('DOMContentLoaded', function() {
    loadFooter();
});

function loadFooter() {
    // Generate dynamic dates
    const currentYear = new Date().getFullYear();
    const currentDate = new Date().toLocaleDateString('en-GB', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Get city name from body data attribute or default to Manchester
    const cityName = document.body.getAttribute('data-city') || 'manchester';
    const cityCapitalized = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    
    const footerHTML = `
        <footer class="footer">
            <div class="container">
                <!-- Newsletter Signup -->
                <div class="newsletter-section">
                    <div class="newsletter-content">
                        <h3>Stay Updated with ${cityCapitalized} Solar News</h3>
                        <p>Monthly updates on grants, policies, and local solar insights for all ${cityCapitalized} property types. No spam, just valuable information to help you make informed decisions.</p>
                    </div>
                    <form class="newsletter-form" action="/newsletter-signup" method="post">
                        <div class="newsletter-input-group">
                            <input type="email" name="email" placeholder="Enter your email address" required class="newsletter-input">
                            <button type="submit" class="newsletter-btn">Stay Updated</button>
                        </div>
                        <p class="newsletter-disclaimer">✓ Monthly updates only • Unsubscribe anytime • We never sell your data</p>
                    </form>
                </div>
                
                <div class="footer-content">
                    <!-- Column 1: Brand + Network -->
                    <div class="footer-section">
                        <h3>${cityCapitalized}.solar</h3>
                        <p class="footer-network">Part of <strong><a href="https://www.findsolar.solar" target="_blank">Find Solar Network</a></strong></p>
                        <p class="footer-description">Ethical solar connections for ${cityCapitalized} - education-centered approach with quality MCS certified specialists who focus on your needs, not quotas.</p>
                        <p class="footer-guarantee"><strong>No spam guarantee:</strong> Single professional contact only - no lead farming, no multiple calls. Quality specialists from our exclusive ${cityCapitalized} network.</p>
                        <div class="footer-contact">
                            <a href="mailto:quotes@${cityName}.solar">quotes@${cityName}.solar</a>
                        </div>
                    </div>
                    
                    <!-- Column 2: Services & Areas -->
                    <div class="footer-section">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="/residential-solar">Residential Solar (All Property Types)</a></li>
                            <li><a href="/commercial">Commercial Solar</a></li>
                            <li><a href="/planning-permission">Planning Permission Guide</a></li>
                            <li><a href="/${cityName}-weather">Weather Performance</a></li>
                            <li><a href="/battery-storage">Battery Storage</a></li>
                            <li><a href="/ev-charger-installation">EV Chargers</a></li>
                            <li><a href="/heritage-properties">Heritage Property Specialists</a></li>
                            <li><a href="/case-studies">Case Studies</a></li>
                        </ul>
                        
                        <h4>Service Areas</h4>
                        <ul class="footer-areas">
                            ${getServiceAreas(cityName)}
                        </ul>
                    </div>
                    
                    <!-- Column 3: Trust + Social -->
                    <div class="footer-section">
                        <h4>Quality Standards</h4>
                        <p>All partners verified:</p>
                        <ul>
                            <li><strong>MCS certified</strong> (Microgeneration Certification)</li>
                            <li><strong>RECC membership</strong> (Consumer Protection)</li>
                            <li><strong>NICEIC/NAPIT</strong> electrical certification</li>
                            <li><strong>All property type experience</strong></li>
                            <li><strong>Local ${cityCapitalized} presence</strong></li>
                            <li><strong>Education-first approach</strong></li>
                        </ul>
                        <div class="footer-verify">
                            <a href="https://mcscertified.com/" target="_blank">Verify MCS Standards →</a>
                        </div>
                        
                        <h4>${cityCapitalized} Solar Intelligence</h4>
                        <ul class="footer-intelligence">
                            <li>✓ Built on local weather data & performance analytics</li>
                            <li>✓ ${cityCapitalized} property type research database</li>
                            <li>✓ Local planning permission success tracking</li>
                            <li>✓ Regional installer performance metrics</li>
                        </ul>
                        
                        <h4>Follow Find Solar UK</h4>
                        <div class="footer-social">
                            <a href="https://linkedin.com/company/findsolar" target="_blank" class="social-link">LinkedIn</a>
                            <a href="https://twitter.com/findsolaruk" target="_blank" class="social-link">Twitter</a>
                            <a href="https://youtube.com/@findsolaruk" target="_blank" class="social-link">YouTube</a>
                        </div>
                    </div>
                </div>
                
                <!-- Footer Bottom -->
                <div class="footer-bottom">
                    <p>&copy; ${currentYear} <strong>${cityCapitalized}.solar</strong>. Part of Find Solar UK Network. All rights reserved.</p>
                    <div class="footer-links">
                        <a href="/privacy-policy">Privacy Policy</a>
                        <a href="/terms-of-service">Terms of Service</a>
                        <a href="/cookie-policy">Cookie Policy</a>
                        <a href="/installer-standards">Installer Standards</a>
                        <a href="/sitemap">Sitemap</a>
                    </div>
                    <div class="footer-credit">
                        <p>Website design, build and maintenance by <a href="https://www.digitwebdesign.co.uk" target="_blank">www.digitwebdesign.co.uk</a></p>
                    </div>
                    <div class="footer-version">
                        <p>Last updated: ${currentDate} | Solar Empire v1.0</p>
                    </div>
                </div>
            </div>
        </footer>
    `;
    
    // Insert footer into container
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
        
        // Initialize newsletter form functionality
        initializeNewsletterForm();
        
        console.log('Footer loaded successfully for', cityCapitalized);
    } else {
        console.warn('Footer container not found');
    }
}

// City-specific service areas
function getServiceAreas(cityName) {
    const serviceAreas = {
        manchester: `
            <li><strong>All Manchester Postcodes (M1–M99)</strong></li>
            <li><a href="/didsbury-solar">Didsbury, Chorlton & South Manchester</a></li>
            <li><a href="/sale-altrincham-solar">Sale, Altrincham & Trafford</a></li>
            <li><a href="/stockport-solar">Stockport, Wilmslow & East</a></li>
            <li><a href="/bolton-bury-solar">Bolton, Bury & North Manchester</a></li>
            <li><a href="/oldham-rochdale-solar">Oldham, Rochdale & Tameside</a></li>
            <li><a href="/wigan-leigh-solar">Wigan, Leigh & West Manchester</a></li>
        `,
        leeds: `
            <li><strong>All Leeds Postcodes (LS1–LS29)</strong></li>
            <li><a href="/headingley-solar">Headingley & North Leeds</a></li>
            <li><a href="/horsforth-solar">Horsforth, Guiseley & West Leeds</a></li>
            <li><a href="/roundhay-solar">Roundhay, Chapel Allerton & East Leeds</a></li>
            <li><a href="/morley-solar">Morley, Pudsey & South Leeds</a></li>
        `,
        birmingham: `
            <li><strong>All Birmingham Postcodes (B1–B99)</strong></li>
            <li><a href="/edgbaston-solar">Edgbaston & South Birmingham</a></li>
            <li><a href="/sutton-coldfield-solar">Sutton Coldfield & North Birmingham</a></li>
            <li><a href="/solihull-solar">Solihull & East Birmingham</a></li>
            <li><a href="/kings-heath-solar">Kings Heath & Central Birmingham</a></li>
        `
    };
    
    return serviceAreas[cityName] || serviceAreas.manchester;
}

// Newsletter form functionality
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[name="email"]').value;
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Newsletter signup (replace with actual endpoint)
            console.log('Newsletter signup:', email);
            alert('Thank you for subscribing! We\'ll send you monthly solar updates.');
            this.reset();
        });
    }
}

// Export for use in other scripts if needed
window.SolarFooter = {
    load: loadFooter,
    initNewsletter: initializeNewsletterForm
};