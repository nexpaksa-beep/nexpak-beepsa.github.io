/* ==========================================================================
   Nexpak Security Solutions - System UI & Global Interactions (systemui.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 1. Cart Drawer Slide-In / Slide-Out Controls
    // ----------------------------------------------------------------------
    const cartToggleBtns = document.querySelectorAll('.cart-toggle-btn');
    const cartPanel = document.querySelector('.cart-panel');
    const closeCartBtn = document.querySelector('.close-cart-btn');

    cartToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (cartPanel) {
                cartPanel.classList.toggle('active');
            }
        });
    });

    if (closeCartBtn && cartPanel) {
        closeCartBtn.addEventListener('click', () => {
            cartPanel.classList.remove('active');
        });
    }

    // Close cart drawer when clicking outside of it
    document.addEventListener('click', (e) => {
        if (cartPanel && cartPanel.classList.contains('active')) {
            const isClickInsideCart = cartPanel.contains(e.target);
            const isClickToggle = Array.from(cartToggleBtns).some(btn => btn.contains(e.target));
            
            if (!isClickInsideCart && !isClickToggle) {
                cartPanel.classList.remove('active');
            }
        }
    });

    // ----------------------------------------------------------------------
    // 2. Global Toast Notification System
    // ----------------------------------------------------------------------
    /**
     * Triggers a floating success/info toast in the bottom right corner.
     * @param {string} message - The message to display.
     * @param {number} duration - Time in milliseconds before hiding (default: 3000ms).
     */
    window.showNexpakToast = function(message, duration = 3000) {
        let notification = document.querySelector('.cart-notification');
        
        // Dynamically inject the toast container if it doesn't exist on the page yet
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.innerHTML = `
                <i class="fa-solid fa-circle-check" style="color: #ffffff;"></i> 
                <span id="nexpakToastText">${message}</span>
            `;
            document.body.appendChild(notification);
        } else {
            const textSpan = notification.querySelector('#nexpakToastText') || notification.querySelector('span');
            if (textSpan) textSpan.textContent = message;
        }

        // Trigger slide-in animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 50);

        // Hide after duration
        setTimeout(() => {
            notification.classList.remove('show');
        }, duration);
    };

    // ----------------------------------------------------------------------
    // 3. Mobile Navigation Menu Toggle (Optional expansion)
    // ----------------------------------------------------------------------
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.shop-nav-links');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
        });
    }

});

