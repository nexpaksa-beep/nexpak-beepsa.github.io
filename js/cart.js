/* ==========================================================================
   Nexpak Security Solutions - Storefront Interactions (cart.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --------------------------------------------------------------------------
       1. Cart Drawer Toggle
       -------------------------------------------------------------------------- */
    const cartPanel = document.querySelector('.cart-panel');
    const cartToggleBtn = document.querySelector('.cart-toggle-btn');
    const closeCartBtn = document.querySelector('.close-cart-btn');

    if (cartToggleBtn && cartPanel) {
        cartToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cartPanel.classList.add('active');
        });
    }

    if (closeCartBtn && cartPanel) {
        closeCartBtn.addEventListener('click', () => {
            cartPanel.classList.remove('active');
        });
    }

    // Close cart when clicking outside of the panel
    document.addEventListener('click', (e) => {
        if (cartPanel && cartPanel.classList.contains('active')) {
            // Check if the click was outside the cart panel and not on the toggle button
            if (!cartPanel.contains(e.target) && !cartToggleBtn.contains(e.target)) {
                cartPanel.classList.remove('active');
            }
        }
    });

    /* --------------------------------------------------------------------------
       2. Add to Cart & Notification Toast
       -------------------------------------------------------------------------- */
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const cartNotification = document.querySelector('.cart-notification');

    if (addToCartBtn && cartNotification) {
        addToCartBtn.addEventListener('click', () => {
            // Show the notification toast
            cartNotification.classList.add('show');
            
            // Automatically hide it after 3 seconds
            setTimeout(() => {
                cartNotification.classList.remove('show');
            }, 3000);

            // Optional: Automatically open the cart drawer when an item is added
            // cartPanel.classList.add('active'); 
        });
    }

    /* --------------------------------------------------------------------------
       3. Product Image Gallery (Thumbnails)
       -------------------------------------------------------------------------- */
    const mainImage = document.querySelector('.product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-strip img');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Swap the main image source with the clicked thumbnail's source
                mainImage.src = this.src;
                
                // Re-initialize zoom if the lens is active
                setupZoom(); 
            });
        });
    }

    /* --------------------------------------------------------------------------
       4. Image Magnifier Zoom
       -------------------------------------------------------------------------- */
    function setupZoom() {
        const img = document.querySelector('.product-image');
        if (!img) return;

        // Remove existing lens if present (useful when swapping images)
        let existingLens = document.querySelector('.img-zoom-lens');
        if (existingLens) {
            existingLens.remove();
        }

        // Create lens element
        const lens = document.createElement('div');
        lens.setAttribute('class', 'img-zoom-lens');
        
        // Insert lens
        img.parentElement.insertBefore(lens, img);

        // Calculate the ratio between the lens and the main image
        const cx = lens.offsetWidth / img.width;
        const cy = lens.offsetHeight / img.height;

        // Set background properties for the lens
        // Using the same source as the main image (or use a higher-res version if available)
        lens.style.backgroundImage = `url('${img.src}')`;
        // We multiply the width and height by 2.5 to simulate the "zoom" level
        lens.style.backgroundSize = (img.width * 2.5) + "px " + (img.height * 2.5) + "px";

        // Hide lens by default
        lens.style.display = 'none';

        // Event listeners for mouse movement
        lens.addEventListener('mousemove', moveLens);
        img.addEventListener('mousemove', moveLens);
        
        // Touch support for mobile
        lens.addEventListener('touchmove', moveLens);
        img.addEventListener('touchmove', moveLens);

        // Show/Hide lens on hover
        img.addEventListener('mouseenter', () => lens.style.display = 'block');
        img.addEventListener('mouseleave', () => lens.style.display = 'none');

        function moveLens(e) {
            let pos, x, y;
            
            // Prevent default actions that could interfere with tracking
            e.preventDefault();
            
            // Get cursor's x and y positions
            pos = getCursorPos(e);
            x = pos.x - (lens.offsetWidth / 2);
            y = pos.y - (lens.offsetHeight / 2);
            
            // Prevent the lens from being positioned outside the image
            if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
            if (x < 0) { x = 0; }
            if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
            if (y < 0) { y = 0; }
            
            // Set the position of the lens
            lens.style.left = x + "px";
            lens.style.top = y + "px";
            
            // Move the background image of the lens to match the cursor
            // Notice the negative values to move the background opposite to the cursor
            lens.style.backgroundPosition = "-" + (x * 2.5) + "px -" + (y * 2.5) + "px";
        }

        function getCursorPos(e) {
            let a, x = 0, y = 0;
            e = e || window.event;
            
            // Get the x and y positions of the image
            a = img.getBoundingClientRect();
            
            // Calculate the cursor's x and y coordinates, relative to the image
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            
            // Consider any page scrolling
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            
            return {x : x, y : y};
        }
    }

    // Initialize zoom on page load
    // Adding a slight delay ensures the image has a width/height calculated
    setTimeout(setupZoom, 100);
});
                                      
