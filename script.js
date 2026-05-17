// ===========================
// NEXPAK SOLUTIONS JAVASCRIPT
// Interactive Features & Form Handling
// ===========================

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.style.display = 'none';
    });
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!data.name || !data.email || !data.phone || !data.subject || !data.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Validate email
        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Send email via FormSubmit service (free service)
            const response = await fetch('https://formspree.io/f/meozvejl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    company: data.company,
                    subject: data.subject,
                    product: data.product,
                    message: data.message,
                    _replyto: data.email,
                })
            });

            if (response.ok) {
                showNotification('Message sent successfully! We will contact you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            
            // Fallback: Show email client or copy email
            showNotification(`Message preparation error. Please email us directly at nexpaksa@outlook.com with your details.`, 'warning');
            
            // Alternative: Use mailto
            const mailtoLink = `mailto:nexpaksa@outlook.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
                `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company}\nProduct Inquiry: ${data.product}\n\nMessage:\n${data.message}`
            )}`;
            window.location.href = mailtoLink;
        } finally {
            // Restore button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    const styles = {
        position: 'fixed',
        top: '80px',
        right: '20px',
        padding: '20px 30px',
        borderRadius: '5px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '10000',
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        animation: 'slideInRight 0.3s ease-out'
    };

    if (type === 'success') {
        notification.style.backgroundColor = '#27ae60';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    } else if (type === 'warning') {
        notification.style.backgroundColor = '#f39c12';
    } else {
        notification.style.backgroundColor = '#3498db';
    }

    Object.assign(notification.style, styles);
    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards and other elements
document.querySelectorAll('.product-card, .benefit, .detail-item').forEach(el => {
    observer.observe(el);
});

// WhatsApp integration - Open WhatsApp with pre-filled message
document.querySelectorAll('[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const message = `Hello Nexpak Solutions, I'm interested in your packaging and PPE products. Can you please provide more information?`;
        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = '27836308249';
        this.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu) {
        navMenu.style.display = 'none';
    }
});

// Check if form should use FormSubmit or alternative method
// This ensures the form works with email submission
document.addEventListener('DOMContentLoaded', function() {
    console.log('Nexpak Solutions website loaded successfully');
    
    // Verify all external resources loaded
    const images = document.querySelectorAll('img');
    console.log(`${images.length} images loaded`);
});

// Product filtering (optional enhancement)
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
}

// Copy email to clipboard (utility function)
function copyEmail() {
    const email = 'nexpaksa@outlook.com';
    navigator.clipboard.writeText(email).then(() => {
        showNotification('Email copied to clipboard!', 'success');
    });
}

// Export functions for global use
window.filterProducts = filterProducts;
window.copyEmail = copyEmail;
window.showNotification = showNotification;

console.log('Nexpak Solutions - Interactive features initialized');
