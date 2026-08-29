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
            const deliveryText = deliveryEl ? deliveryEl.textContent.trim().toLowerCase() : '';

            // ABSOLUTE PROTECTION: Block checkout if delivery hasn't been actively resolved
            if (!deliveryEl || deliveryText === '' || deliveryText === 'r 0.00' || deliveryText === 'r 0') {
                if (!deliveryText.includes('free')) {
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
                localStorage.clear(); 
                window.location.href = '/index.html';
                return;
            }

            // =========================================================================
            // 3. SECURE MATHEMATICAL RE-CALCULATION BLOCK (FORCED FLOAT FIX)
            // =========================================================================
            
            // Pull raw numeric values straight out of your browser local cache states
            const rawCartStorage = localStorage.getItem('nexpak_cart_total') || localStorage.getItem('nexpak_cart_subtotal') || '0';
            const subtotalNet = parseFloat(rawCartStorage) || 0;

            if (subtotalNet <= 0) {
                alert('Your order total cannot be R0.00. Please add items to your cart.');
                return;
            }

            // Clean the delivery display text using a strict regex that isolates numbers and periods
            let deliveryFee = 0;
            if (deliveryEl) {
                if (!deliveryText.includes('free')) {
                    const globalSanitizedString = deliveryEl.textContent.replace(/[^0-9.]/g, '');
                    deliveryFee = parseFloat(globalSanitizedString) || 0;
                }
            }

            // Execute the single-VAT ledger equation matching your checkout summary display logic
            const vatAmount = subtotalNet * 0.15; // 15% Standard SA VAT
            const absoluteGrandTotal = subtotalNet + vatAmount + deliveryFee;

            // Format to a clean string layout for PayFast payload ingestion (e.g., "731.00")
            const finalPayfastAmount = Number(absoluteGrandTotal).toFixed(2);

            console.log("🔒 PURE PAYFAST PAYLOAD LOCK -> Net:", subtotalNet, " | VAT:", vatAmount, " | Delivery:", deliveryFee, " | Sent total:", finalPayfastAmount);

            // =========================================================================
            // 4. CONFIGURATION CONTROLLER & FORM SUBMISSION
            // =========================================================================
            
            // --- MODE A: TESTING MODE (Active Now) ---
            const payfastMerchantId = '10004002';   // Universal test Merchant ID
            const payfastMerchantKey = 'q1cd2rdny4a53'; // Universal test Merchant Key
            const payfastUrl = 'https://sandbox.payfast.co.za/eng/process'; // FIXED: Strict sandbox processing link
            
            /* 
            // --- MODE B: LIVE PRODUCTION MODE (Uncomment this block and comment out Mode A to go live) ---
            const payfastMerchantId = 'YOUR_LIVE_ID';   
            const payfastMerchantKey = 'YOUR_LIVE_KEY'; 
            const payfastUrl = 'https://www.payfast.co.za/eng/process'; 
            */
            
            // FIXED TRIPLE-CHECK: Parse names safely into explicit strings to avoid array object errors
            const nameParts = customerName.split(' ');
            const firstName = nameParts[0] ? nameParts[0] : 'Valued'; 
            const lastName = nameParts.slice(1).join(' ') ? nameParts.slice(1).join(' ') : 'Customer';

            // Gather cart items for description log mapping
            const cartItems = JSON.parse(localStorage.getItem('nexpak_cart_items')) || [];
            const itemNames = cartItems.map(item => item.name).join(', ') || 'Security Hardware';
            
            let safeItemDescription = 'Nexpak Order: ' + itemNames;
            if (safeItemDescription.length > 95) {
                safeItemDescription = safeItemDescription.substring(0, 92) + '...';
            }
            
            // Build dynamic hidden form element to securely dispatch fields straight to PayFast
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
                amount: finalPayfastAmount, // Fully standardized clean decimal string
                item_name: safeItemDescription
            };

            // Map keys into form parameters safely
            for (const key in paymentData) {
                if (paymentData.hasOwnProperty(key)) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = paymentData[key];
                    form.appendChild(input);
                }
            }

            // Wipe local storage cart metrics completely to restore clean checkout state upon return route
            localStorage.removeItem('nexpak_cart_count');
            localStorage.removeItem('nexpak_cart_total');
            localStorage.removeItem('nexpak_cart_subtotal');
            localStorage.removeItem('nexpak_cart_items');
            localStorage.removeItem('nexpak_cart_weight');

            // Inject structural form data and push execution off-site to gateway
            document.body.appendChild(form);
            form.submit();
        });
    }
});
                
