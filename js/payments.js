document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const completeCheckoutBtn = document.getElementById('btnCompleteCheckout');

    if (completeCheckoutBtn) {
        completeCheckoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // 1. Validate customer form fields first
            const customerName = document.getElementById('customerName')?.value.trim();
            const customerEmail = document.getElementById('customerEmail')?.value.trim();
            const customerPhone = document.getElementById('customerPhone')?.value.trim();
            const shippingAddress = document.getElementById('shippingAddress')?.value.trim();
            const paymentMethodInput = document.querySelector('input[name="paymentMethod"]:checked');

            if (!customerName || !customerEmail || !customerPhone || !shippingAddress) {
                alert('Please fill in all required customer and delivery details before proceeding.');
                document.getElementById('customerName')?.focus();
                return;
            }

            const paymentMethod = paymentMethodInput ? paymentMethodInput.value : 'payfast';

            // 2. Handle Instant EFT vs PayFast
            if (paymentMethod === 'eft') {
                alert('Order placed successfully! Please use the Capitec bank details provided on screen to complete your EFT payment using your order number as reference.');
                
                // Clear cart data after successful order creation
                localStorage.removeItem('nexpak_cart_count');
                localStorage.removeItem('nexpak_cart_total');
                localStorage.removeItem('nexpak_cart_items');
                
                // Redirect to a thank you or home page (or reload)
                window.location.href = 'index.html';
                return;
            }

            // 3. PayFast Integration
            // Pull the grand total from your summary display element
            const grandTotalText = document.getElementById('chkGrandTotal')?.textContent || '0';
            const numericTotal = parseFloat(grandTotalText.replace(/[R,\s]/g, '')) || 0;

            if (numericTotal <= 0) {
                alert('Your order total cannot be R0.00. Please add items to your cart.');
                return;
            }

            // Parse names for PayFast requirements
            const nameParts = customerName.split(' ');
            const firstName = nameParts[0] || 'Valued';
            const lastName = nameParts.slice(1).join(' ') || 'Customer';

            // Gather cart items for description
            const cartItems = JSON.parse(localStorage.getItem('nexpak_cart_items')) || [];
            const itemNames = cartItems.map(item => item.name).join(', ') || 'Nexpak Security Order';

            // ==========================================
            // YOUR PAYFAST CREDENTIALS & CONFIGURATION
           // ==========================================
            const payfastMerchantId = '36692313';   // Your PayFast Merchant ID
            const payfastMerchantKey = 'cmvr2h6hmum6e'; // Your PayFast Merchant Key
            
            // Use live PayFast URL (or sandbox.payfast.co.za for testing)
            const payfastUrl = 'https://www.payfast.co.za/eng/process';

            // Build dynamic form to securely submit data to PayFast
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = payfastUrl;

            const paymentData = {
                merchant_id: payfastMerchantId,
                merchant_key: payfastMerchantKey,
                return_url: window.location.origin + '/success.html', // Optional success page link
                cancel_url: window.location.origin + '/checkout.html',
                
                // Customer details
                name_first: firstName,
                name_last: lastName,
                email_address: customerEmail,
                cell_number: customerPhone,

                // Transaction details
                m_payment_id: 'NEX-' + Date.now(),
                amount: numericTotal.toFixed(2),
                item_name: 'Nexpak Order: ' + itemNames
            };

            // Append all fields to the hidden form
            for (const key in paymentData) {
                if (paymentData.hasOwnProperty(key)) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = paymentData[key];
                    form.appendChild(input);
                }
            }

            // Append to body and submit to PayFast
            document.body.appendChild(form);
            form.submit();
        });
    }
});

