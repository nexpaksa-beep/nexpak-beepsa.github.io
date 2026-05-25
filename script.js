// Google Analytics Event Tracking
function trackEvent(eventName, eventParams) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
    }
}

// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        trackEvent('menu_toggle', { 'menu_state': navMenu.style.display });
    });
}

// Carousel Functionality
let currentCarouselIndex = 0;
const carouselTrack = document.getElementById('carouselTrack');
const carouselDots = document.getElementById('carouselDots');

if (carouselTrack) {
    const items = carouselTrack.querySelectorAll('.carousel-item');
    const itemCount = items.length;
    const itemsPerView = 4;
    const maxIndex = Math.max(0, itemCount - itemsPerView);

    // Create dots
    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToCarousel(i);
        carouselDots.appendChild(dot);
    }

    window.moveCarousel = function(direction) {
        currentCarouselIndex += direction;
        if (currentCarouselIndex > maxIndex) currentCarouselIndex = 0;
        if (currentCarouselIndex < 0) currentCarouselIndex = maxIndex;
        updateCarousel();
        trackEvent('carousel_navigate', { 'direction': direction > 0 ? 'next' : 'prev' });
    };

    window.goToCarousel = function(index) {
        currentCarouselIndex = index;
        updateCarousel();
        trackEvent('carousel_dot_click', { 'index': index });
    };

    function updateCarousel() {
        const itemWidth = 25;
        const scrollAmount = currentCarouselIndex * itemWidth;
        carouselTrack.style.transform = `translateX(-${scrollAmount}%)`;

        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentCarouselIndex);
        });
    }

    setInterval(() => {
        if (currentCarouselIndex < maxIndex) {
            currentCarouselIndex++;
        } else {
            currentCarouselIndex = 0;
        }
        updateCarousel();
    }, 5000);
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        trackEvent('form_submit', { 'form_type': 'contact' });

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            product: document.getElementById('product').value,
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer re_iEC5ef1V_MavtXftPG1wEa2DvCd2hxcHa'
                },
                body: JSON.stringify({
                    from: 'contact@nexpaksolutions.co.za',
                    to: 'nexpaksa@outlook.com',
                    subject: `New Contact Form Submission: ${formData.subject}`,
                    html: `
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${formData.name}</p>
                        <p><strong>Email:</strong> ${formData.email}</p>
                        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
                        <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
                        <p><strong>Subject:</strong> ${formData.subject}</p>
                        <p><strong>Product Interest:</strong> ${formData.product || 'Not specified'}</p>
                        <h3>Message:</h3>
                        <p>${formData.message.replace(/\n/g, '<br>')}</p>
                        <p><em>Submitted on: ${new Date(formData.timestamp).toLocaleString()}</em></p>
                    `
                })
            });

            if (response.ok) {
                const formMessage = document.getElementById('formMessage');
                formMessage.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
                formMessage.classList.add('success');
                formMessage.classList.remove('error');
                contactForm.reset();
                trackEvent('form_success', { 'form_type': 'contact' });

                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.classList.remove('success');
                }, 5000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            const formMessage = document.getElementById('formMessage');
            formMessage.textContent = '✗ Failed to send message. Please try via email or WhatsApp.';
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
            trackEvent('form_error', { 'form_type': 'contact', 'error': error.message });
            console.error('Error:', error);
        }
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            trackEvent('smooth_scroll', { 'target': this.getAttribute('href') });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.carousel-card, .price-category, .badge-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Track button clicks
document.querySelectorAll('.btn, .carousel-link, .view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        trackEvent('button_click', {
            'button_text': btn.textContent,
            'button_url': btn.href
        });
    });
});

// Track product views
document.querySelectorAll('.carousel-link').forEach(link => {
    link.addEventListener('click', () => {
        const productName = link.closest('.carousel-card').querySelector('h3').textContent;
        trackEvent('product_view', { 'product': productName });
    });
});

// Track WhatsApp clicks
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('whatsapp_click', {
            'source': link.closest('section')?.querySelector('h2')?.textContent || 'unknown'
        });
    });
});

// Page load tracking
window.addEventListener('load', () => {
    trackEvent('page_view', {
        'page_title': document.title,
        'page_url': window.location.href
    });
});

// Scroll depth tracking
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0) {
            trackEvent('scroll_depth', { 'scroll_percent': Math.round(maxScroll) });
        }
    }
});

// Form field tracking
if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            trackEvent('form_focus', { 'field': input.name });
        });
    });
}
