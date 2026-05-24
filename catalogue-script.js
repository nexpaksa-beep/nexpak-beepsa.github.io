// ===========================
// NEXPAK CATALOGUE SCRIPT
// Flip Book Functionality
// ===========================

let currentPage = 1;
const totalPages = 7; // Including cover and back cover

// Initialize catalogue
document.addEventListener('DOMContentLoaded', function() {
    updatePageIndicator();
    setupTouchControls();
    setupKeyboardControls();
});

// Navigate to next page
function nextPage() {
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
}

// Navigate to previous page
function previousPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

// Show specific page
function showPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    // Hide all pages
    const pages = document.querySelectorAll('.flip-page');
    pages.forEach(page => {
        page.classList.remove('active', 'next', 'prev');
        page.style.display = 'none';
    });

    // Show current page
    const currentPageElement = document.querySelector(`[data-page="${pageNumber}"]`);
    if (currentPageElement) {
        currentPageElement.classList.add('active');
        currentPageElement.style.display = 'flex';
    }

    // Update page number
    currentPage = pageNumber;
    updatePageIndicator();
    updateButtonStates();
}

// Scroll to specific page (for navigation buttons on pages)
function scrollToPage(pageNumber) {
    showPage(pageNumber);
}

// Update page indicator display
function updatePageIndicator() {
    const currentDisplay = document.getElementById('current-page');
    const totalDisplay = document.getElementById('total-pages');
    
    if (currentDisplay && totalDisplay) {
        currentDisplay.textContent = currentPage;
        totalDisplay.textContent = totalPages;
    }
}

// Update button states (disable at boundaries)
function updateButtonStates() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
}

// Contact about product
function contactAbout(productName) {
    const message = `Hello! I'm interested in your ${productName} products. Could you please provide more information?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/27836308249?text=${encodedMessage}`, '_blank');
}

// Setup keyboard controls
function setupKeyboardControls() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            nextPage();
        } else if (event.key === 'ArrowLeft') {
            previousPage();
        }
    });
}

// Setup touch/swipe controls for mobile
function setupTouchControls() {
    const flipBook = document.getElementById('flipBook');
    let startX = 0;
    let endX = 0;

    flipBook.addEventListener('touchstart', function(e) {
        startX = e.changedTouches[0].screenX;
    }, false);

    flipBook.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const threshold = 50; // Minimum distance to trigger swipe
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swiped left - next page
                nextPage();
            } else {
                // Swiped right - previous page
                previousPage();
            }
        }
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
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
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize the first page on load
window.addEventListener('load', function() {
    showPage(1);
});
