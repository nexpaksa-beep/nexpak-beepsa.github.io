document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. Retrieve cart data from localStorage
    const cartCount = parseInt(localStorage.getItem('nexpak_cart_count')) || 0;
    const cartTotal = parseFloat(localStorage.getItem('nexpak_cart_total')) || 0;
    const cartItems = JSON.parse(localStorage.getItem('nexpak_cart_items')) || [];

    // Debugging logs (Press F12 in your browser to view)
    console.log("Cart Count:", cartCount);
    console.log("Cart Total:", cartTotal);
    console.log("Cart Items:", cartItems);

    // 2. Target the exact IDs found in your checkout.html source
    const subtotalEl = document.getElementById('chkSubtotal');
    const deliveryEl = document.getElementById('chkDelivery');
    const vatEl = document.getElementById('chkVat');
    const grandTotalEl = document.getElementById('chkGrandTotal');
    const itemsContainer = document.getElementById('checkoutOrderItems');

    // 3. Perform calculations (15% VAT standard for South Africa)
    const subtotal = cartTotal;
    const vat = subtotal * 0.15;
    
    // Check if delivery fee element text already has a value, otherwise default to 0
    let deliveryFee = 0;
    if (deliveryEl && deliveryEl.textContent.includes('R')) {
        const parsedDelivery = parseFloat(deliveryEl.textContent.replace(/[R,\s]/g, ''));
        if (!isNaN(parsedDelivery)) deliveryFee = parsedDelivery;
    }

    const grandTotal = subtotal + vat + deliveryFee;

    // 4. Update the summary display fields matching your HTML IDs
    if (subtotalEl) {
        subtotalEl.textContent = 'R ' + subtotal.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    
    if (vatEl) {
        vatEl.textContent = 'R ' + vat.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    
    if (grandTotalEl) {
        grandTotalEl.textContent = 'R ' + grandTotal.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // 5. Populate the items container list dynamically
    if (itemsContainer) {
        if (cartItems.length > 0) {
            itemsContainer.innerHTML = '';
            cartItems.forEach(item => {
                const itemRow = document.createElement('div');
                itemRow.className = 'summary-row';
                itemRow.innerHTML = `
                    <span>${item.name}</span>
                    <span>R ${item.price.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                `;
                itemsContainer.appendChild(itemRow);
            });
        } else {
            itemsContainer.innerHTML = `
                <div class="summary-row">
                    <span>Your cart is empty</span>
                    <span>R 0.00</span>
                </div>
            `;
        }
    }
});

