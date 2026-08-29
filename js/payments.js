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
            
            // DELIVERY GATEKEEPER CHECK: Inspect what is actively showing on the screen element
            const deliveryEl = document.getElementById('chkDelivery');
            const currentDeliveryCostText = deliveryEl ? deliveryEl.textContent.replace(/[^0-9.]/g, '') : '';
            const numericDeliveryValidation = parseFloat(currentDeliveryCostText) || 0;

            // ABSOLUTE PROTECTION: Block checkout if delivery hasn't been handled
            if (!deliveryEl || deliveryEl.textContent.trim() === '' || deliveryEl.textContent.includes('0.00') || numericDeliveryValidation === 0) {
                if (!deliveryEl.textContent.toLowerCase().includes('free')) {
                    alert('Please calculate your delivery charges using your address/distance before completing your order.');
                    document.getElementById('btnCalculateDelivery')?.focus();
                    return;
                }
            }

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
                localStorage.removeItem('nexpak_cart_subtotal');
                localStorage.removeItem('nexpak_cart_items');
                localStorage.removeItem('nexpak_cart_weight');
                
                window.location.href = 'index.html';
                return;
            }

            // =========================================================================
            // 3. SECURE MATHEMATICAL RE-CALCULATION BLOCK (FORCED FLOAT FIX)
            // =========================================================================
            
            // 1. FORCED NUMERIC CASTING: Pull raw numbers and explicitly force them to be numbers, NOT text!
            const rawCartStorage = localStorage.getItem('nexpak_cart_total') || localStorage.getItem('nexpak_cart_subtotal') || '0';
            const subtotalNet = parseFloat(rawCartStorage) || 0;

            if (subtotalNet <= 0) {
                alert('Your order total cannot be R0.00. Please add items to your cart.');
                return;
            }

            // 2. FORCED NUMERIC DELIVERY CLEANING: Strip out non-digits and strictly force it to a number
            let deliveryFee = 0;
            if (deliveryEl) {
                if (!deliveryEl.textContent.toLowerCase().includes('free')) {
                    const globalSanitizedString = deliveryEl.textContent.replace(/[^0-9.]/g, '');
                    deliveryFee = parseFloat(globalSanitizedString) || 0;
                }
            }

            // 3. THE MATHEMATICAL LOCKDOWN
            // Now that all parts are strictly forced into numbers, math works perfectly instead of gluing text together!
            const vatAmount = subtotalNet * 0.15; // 15% Standard SA VAT
            const absoluteGrandTotal = subtotalNet + vatAmount + deliveryFee;

            // Format to a clean string layout for PayFast (e.g., "731.00" or with its VAT)
            const finalPayfastAmount = Number(absoluteGrandTotal).toFixed(2);

            // Log this to your browser console (Press F12) to watch the math happen cleanly!
            console.log("🔒 FIXED PAYFAST MATH LOCK -> Net Subtotal:", subtotalNet, " | VAT:", vatAmount, " | Delivery:", deliveryFee, " | Grand Total Sent:", finalPayfastAmount);

            // =========================================================================
            // CONFIGURATION CONTROLLER (Sandbox Testing Mode Active)
            // =========================================================================
            const payfastMerchantId = '10004002';   // Universal test Merchant ID
            const payfastMerchantKey = 'q1cd2rdny4a53'; // Universal test Merchant Key
            const payfastUrl = 'https://sandbox.payfast.co.za/eng/process'; // FIXED: Pointed form destination back to endpoint
            
            // Parse customer names safely using single index values
            const nameParts = customerName.split(' ');
            const firstName = nameParts[0] || 'Valued'; 
            const lastName = nameParts.slice(1).join(' ') || 'Customer';

            // Gather cart items for description
            const cartItems = JSON.parse(localStorage.getItem('nexpak_cart_items')) || [];
            const itemNames = cartItems.map(item => item.name).join(', ') || 'Security Hardware';
            
            let safeItemDescription = 'Nexpak Order: ' + itemNames;
            if (safeItemDescription.length > 95) {
                safeItemDescription = safeItemDescription.substring(0, 92) + '...';
            }
            
            // Build dynamic form to securely submit data to PayFast
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = payfastUrl;

            const paymentData = {
                merchant_id: payfastMerchantId,
                merchant_key: payfastMerchantKey,
                return_url: window.location.origin + '/success.html', 
                cancel_url: window.location.origin + '/checkout.html', 
                name_first: firstName,
                name_last: lastName,
                email_address: customerEmail,
                cell_number: customerPhone,
                m_payment_id: 'NEX-' + Date.now(),
                amount: finalPayfastAmount, // Clean mathematical format
                item_name: safeItemDescription
            };

            // Append all fields into the form DOM element array
            for (const key in paymentData) {
                if (paymentData.hasOwnProperty(key)) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = paymentData[key];
                    form.appendChild(input);
                }
            }

            // Wipe cart values cleanly right before jumping off-site
            localStorage.removeItem('nexpak_cart_count');
            localStorage.removeItem('nexpak_cart_total');
            localStorage.removeItem('nexpak_cart_subtotal');
            localStorage.removeItem('nexpak_cart_items');
            localStorage.removeItem('nexpak_cart_weight');

            // Append to body and submit to PayFast
            document.body.appendChild(form);
            form.submit();
        });
    }
});
                        
