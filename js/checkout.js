document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const VAT_RATE = 0.15;

    const subtotalEl = document.getElementById('chkSubtotal');
    const deliveryEl = document.getElementById('chkDelivery');
    const deliverySummaryEl = document.getElementById('chkDeliverySummary');
    const vatEl = document.getElementById('chkVat');
    const grandTotalEl = document.getElementById('chkGrandTotal');
    const itemsContainer = document.getElementById('checkoutOrderItems');
    const completeCheckoutBtn = document.getElementById('btnCompleteCheckout');

    const generatedOrderRef = 'NEX-' + Math.floor(100000 + Math.random() * 900000);

    const CART_ITEM_KEYS = ['nexpak_cart_items', 'cart_items', 'cartItems', 'nexpak_cart', 'cart'];
    const CART_TOTAL_KEYS = ['nexpak_cart_total', 'cart_total', 'cartTotal', 'cartSubtotal'];

    function getCartItems() {
        for (const key of CART_ITEM_KEYS) {
            const storedCart = localStorage.getItem(key);
            if (!storedCart) continue;
            try {
                const parsedCart = JSON.parse(storedCart);
                if (Array.isArray(parsedCart)) return parsedCart;
                if (parsedCart && Array.isArray(parsedCart.items)) return parsedCart.items;
            } catch (error) {
                console.warn(`Nexpak Checkout: Unable to parse ${key}`, error);
            }
        }
        return [];
    }

    function getCartSubtotal(items) {
        for (const key of CART_TOTAL_KEYS) {
            const storedTotal = parseFloat(localStorage.getItem(key));
            if (Number.isFinite(storedTotal) && storedTotal > 0) return storedTotal;
        }
        return items.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 1;
            return total + (price * quantity);
        }, 0);
    }

    const cartItems = getCartItems();
    const cartSubtotal = getCartSubtotal(cartItems);

    function formatCurrency(amount) {
        return 'R ' + Number(amount).toLocaleString('en-ZA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function getDeliveryFee() {
        if (window.NexpakDelivery && Number.isFinite(Number(window.NexpakDelivery.fee))) {
            return Number(window.NexpakDelivery.fee);
        }
        const storedFee = parseFloat(localStorage.getItem('nexpak_delivery_fee'));
        if (Number.isFinite(storedFee) && storedFee >= 0) return storedFee;
        return 0;
    }

    function calculateTotals() {
        const deliveryFee = getDeliveryFee();
        const vat = cartSubtotal * VAT_RATE;
        const grandTotal = cartSubtotal + vat + deliveryFee;
        return { subtotal: cartSubtotal, delivery: deliveryFee, vat: vat, grandTotal: grandTotal };
    }

    function updateFinancialSummary() {
        const totals = calculateTotals();
        if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);
        if (deliveryEl) deliveryEl.textContent = formatCurrency(totals.delivery);
        if (deliverySummaryEl) deliverySummaryEl.textContent = formatCurrency(totals.delivery);
        if (vatEl) vatEl.textContent = formatCurrency(totals.vat);
        if (grandTotalEl) grandTotalEl.textContent = formatCurrency(totals.grandTotal);
    }

    function renderCartItems() {
        if (!itemsContainer) return;
        itemsContainer.innerHTML = '';

        if (!cartItems.length) {
            itemsContainer.innerHTML = `<div style="display:flex;justify-content:space-between;font-size:14px;"><span>Your cart is empty</span><span>R 0.00</span></div>`;
            return;
        }

        cartItems.forEach(item => {
            const itemRow = document.createElement('div');
            itemRow.style.cssText = `display:flex;justify-content:space-between;align-items:center;gap:15px;margin-bottom:8px;font-size:14px;`;
            const name = item.name || item.title || 'Security Product';
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 1;
            const lineTotal = price * quantity;

            itemRow.innerHTML = `<span>${escapeHtml(name)}${quantity > 1 ? ` x${quantity}` : ''}</span><span>${formatCurrency(lineTotal)}</span>`;
            itemsContainer.appendChild(itemRow);
        });
    }

    function escapeHtml(value) {
        const div = document.createElement('div');
        div.textContent = String(value);
        return div.innerHTML;
    }

    function getCustomerDetails() {
        return {
            name: document.getElementById('customerName')?.value.trim() || '',
            email: document.getElementById('customerEmail')?.value.trim() || '',
            phone: document.getElementById('customerPhone')?.value.trim() || '',
            address: document.getElementById('shippingAddress')?.value.trim() || ''
        };
    }

    function validateCustomerDetails() {
        const customer = getCustomerDetails();
        if (!customer.name) { alert('Please enter your full name.'); document.getElementById('customerName')?.focus(); return false; }
        if (!customer.email) { alert('Please enter your email address.'); document.getElementById('customerEmail')?.focus(); return false; }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(customer.email)) { alert('Please enter a valid email address.'); document.getElementById('customerEmail')?.focus(); return false; }
        if (!customer.phone) { alert('Please enter your phone number.'); document.getElementById('customerPhone')?.focus(); return false; }
        if (!customer.address) { alert('Please enter your delivery address.'); document.getElementById('shippingAddress')?.focus(); return false; }
        return true;
    }

    function validateDelivery() {
        const deliveryFee = getDeliveryFee();
        if (!Number.isFinite(deliveryFee) || deliveryFee <= 0) {
            alert('Please calculate your delivery charges before completing your order.');
            document.getElementById('btnCalculateDelivery')?.focus();
            return false;
        }
        return true;
    }

    function saveOrderRecord(customer, totals) {
        const order = {
            orderReference: generatedOrderRef,
            date: new Date().toISOString(),
            status: 'Payment Pending (PayFast)',
            paymentMethod: 'PayFast Online',
            customer: { name: customer.name, email: customer.email, phone: customer.phone, shippingAddress: customer.address },
            items: cartItems,
            totals: totals
        };

        let existingOrders = [];
        try {
            const storedOrders = JSON.parse(localStorage.getItem('nexpak_orders') || '[]');
            if (Array.isArray(storedOrders)) existingOrders = storedOrders;
        } catch (error) { console.warn('Could not read existing NexPak orders:', error); }

        existingOrders.unshift(order);
        localStorage.setItem('nexpak_orders', JSON.stringify(existingOrders));
        localStorage.setItem('nexpak_last_order', JSON.stringify(order));
        return order;
    }

    function completeOrder(event) {
        if (event) event.preventDefault();

        if (!cartItems.length) { alert('Your cart is empty. Please add products before checking out.'); return; }
        if (!validateCustomerDetails()) return;
        if (!validateDelivery()) return;

        const customer = getCustomerDetails();
        const totals = calculateTotals();

        // Save order record
        const orderData = saveOrderRecord(customer, totals);

        // Clean local storage
        clearCart();
        clearDeliveryData();

        // Pass execution to PayFast controller
        if (window.NexpakPayment && typeof window.NexpakPayment.processPayfastPayment === 'function') {
            window.NexpakPayment.processPayfastPayment(orderData);
        } else {
            alert('Payment Gateway Error: Unable to communicate with PayFast controller.');
        }
    }

    function clearCart() {
        const keysToRemove = ['nexpak_cart_count', 'nexpak_cart_total', 'nexpak_cart_items', 'cart_items', 'cartItems', 'cart', 'cart_total', 'cartTotal', 'cartSubtotal'];
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }

    function clearDeliveryData() {
        localStorage.removeItem('nexpak_delivery_km');
        localStorage.removeItem('nexpak_delivery_weight');
        localStorage.removeItem('nexpak_delivery_fee');
    }

    if (completeCheckoutBtn) {
        completeCheckoutBtn.addEventListener('click', completeOrder);
    }

    const calculateDeliveryBtn = document.getElementById('btnCalculateDelivery');
    if (calculateDeliveryBtn) {
        calculateDeliveryBtn.addEventListener('click', () => {
            setTimeout(() => { updateFinancialSummary(); }, 50);
        });
    }

    renderCartItems();
    updateFinancialSummary();

    console.log('Nexpak Checkout Controller loaded successfully.');
});
                
