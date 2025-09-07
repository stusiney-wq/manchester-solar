/**
 * Footer Loader - Loads footer1.html component on all pages
 * Manchester.solar - Solar Domain Empire v3.1
 * Simple loader that matches header-loader.js pattern
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Footer loader starting...');
    
    // Create or find footer container
    let footerContainer = document.getElementById('footer-container');
    if (!footerContainer) {
        footerContainer = document.createElement('div');
        footerContainer.id = 'footer-container';
        // Insert at the end of body
        document.body.appendChild(footerContainer);
    }
    
    // Load footer content
    fetch('components/footer1.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Footer not found: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            footerContainer.innerHTML = html;
            console.log('Footer1.html loaded successfully');
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            
            // Simple fallback footer
            footerContainer.innerHTML = `
                <footer class="section footer-section">
                    <div class="container">
                        <div style="text-align: center; padding: var(--space-8) 0; color: var(--neutral-600);">
                            <p>&copy; 2025 Manchester.solar - Premium Solar Installation Network</p>
                            <p style="margin-top: var(--space-2);">
                                <a href="/privacy-policy" style="margin: 0 var(--space-2);">Privacy</a>
                                <a href="/terms" style="margin: 0 var(--space-2);">Terms</a>
                                <a href="/contact" style="margin: 0 var(--space-2);">Contact</a>
                            </p>
                        </div>
                    </div>
                </footer>
            `;
            console.log('Fallback footer loaded');
        });
});