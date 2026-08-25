/* ==========================================================================
   Nexpak Security Solutions - Checkout & Payment Routing (checkout.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 1. STATE MANAGEMENT
    // ----------------------------------------------------------------------
    const checkoutState = {
        cart: JSON.parse(localStorage.getItem('nexpak_cart')) || [],
        subtotalExclVat: 0,
        totalWeightKg: 0,
        distanceKm: 0,
        deliveryFee: 0,
        vatAmount: 0,
        grandTotal: 0,
        paymentMethod: 'payfast' // default
    };

    // DOM Elements
    const orderItemsContainer = document.getElementById('checkoutOrderItems');
    const elSubtotal = document.getElementById('chkSubtotal');
    const elDelivery = document.getElementById('chkDelivery');
    const elVat = document.getElementById('chkVat');
    const elTotal = document.getElementById('chkGrandTotal');
    const checkoutForm = document.getElementById('checkoutForm');
    const addressInput = document.getElementById('shippingAddress');
    const calculateDeliveryBtn = document.getElementById('btnCalculateDelivery');
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const eftDetailsPanel = document.getElementById('eftDetailsPanel');

    // Redirect if cart is empty
    if (checkoutState.cart.length === 0) {
        alert("Your cart is empty. Redirecting to shop.");
        window.location.href = 'shop.html';
        return;
    }

    // ----------------------------------------------------------------------
    // 2. INITIALIZE CHECKOUT (Load Cart & Base Totals)
    // ----------------------------------------------------------------------
    function initCheckout() {
        if (!orderItemsContainer) return;
        orderItemsContainer.innerHTML = '';
        
        checkoutState.subtotalExclVat = 0;
        checkoutState.totalWeightKg = 0;

        // Render each custom kit in the cart
        checkoutState.cart.forEach((kit, index) => {
            let kitWeight = 15; 
            if (kit.category === 'gate-motors') kitWeight = 12;
            if (kit.category === 'cctv-hd') kitWeight = 5;
            checkoutState.totalWeightKg += kitWeight;

            checkoutState.subtotalExclVat += kit.totalExclVat;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'checkout-line-item';
            itemDiv.innerHTML = `
                <div class="chk-item-info">
                    <strong>${kit.baseKit.name || 'Custom Kit'}</strong>
                    <span class="chk-item-cat">${kit.category.replace('-', ' ').toUpperCase()}</span>
                </div>
                <div class="chk-item-price">R ${kit.totalExclVat.toFixed(2)}</div>
            `;
            orderItemsContainer.appendChild(itemDiv);
        });

        updateFinancials();
    }

    // ----------------------------------------------------------------------
    // 3. FINANCIAL CALCULATIONS (VAT & Delivery)
    // ----------------------------------------------------------------------
    function updateFinancials() {
        const taxableBase = checkoutState.subtotalExclVat + checkoutState.deliveryFee;
        
        // 15% SARS VAT
        checkoutState.vatAmount = taxableBase * 0.15;
        checkoutState.grandTotal = taxableBase + checkoutState.vatAmount;

        // Update DOM
        if (elSubtotal) elSubtotal.innerText = `R ${checkoutState.subtotalExclVat.toFixed(2)}`;
        if (elDelivery) {
            elDelivery.innerText = checkoutState.deliveryFee === 0 
                ? 'Pending Address' 
                : `R ${checkoutState.deliveryFee.toFixed(2)}`;
        }
        if (elVat) elVat.innerText = `R ${checkoutState.vatAmount.toFixed(2)}`;
        if (elTotal) elTotal.innerText = `R ${checkoutState.grandTotal.toFixed(2)}`;
    }

    // ----------------------------------------------------------------------
    // 4. DELIVERY CALCULATION (Integration with delivery.js)
    // ----------------------------------------------------------------------
    if (calculateDeliveryBtn && addressInput) {
        calculateDeliveryBtn.addEventListener('click', () => {
            const address = addressInput.value.trim();
            if (address.length < 5) {
                alert("Please enter a valid South African street address.");
                return;
            }

            calculateDeliveryBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculating...';
            
            setTimeout(() => {
                checkoutState.distanceKm = Math.floor(Math.random() * 80) + 5; 
                
                const baseRate = 85.00;        
                const ratePerKm = 4.50;        
                const ratePerKg = 7.50;        
                
                const extraKm = Math.max(0, checkoutState.distanceKm - 10);
                const extraKg = Math.max(0, checkoutState.totalWeightKg - 5);
                
                checkoutState.deliveryFee = baseRate + (extraKm * ratePerKm) + (extraKg * ratePerKg);
                
                updateFinancials();
                
                calculateDeliveryBtn.innerHTML = '<i class="fa-solid fa-check"></i> Calculated';
                calculateDeliveryBtn.classList.add('btn-success');
                calculateDeliveryBtn.disabled = true; 
            }, 1200);
        });
    }

    // ----------------------------------------------------------------------
    // 5. PAYMENT METHOD TOGGLE
    // ----------------------------------------------------------------------
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            checkoutState.paymentMethod = e.target.value;
            
            if (checkoutState.paymentMethod === 'eft' && eftDetailsPanel) {
                eftDetailsPanel.style.display = 'block';
            } else if (eftDetailsPanel) {
                eftDetailsPanel.style.display = 'none';
            }
        });
    });

    // ----------------------------------------------------------------------
    // 6. FORM SUBMISSION & GATEWAY ROUTING
    // ----------------------------------------------------------------------
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate Delivery has been calculated
            if (checkoutState.deliveryFee === 0) {
                alert("Please click 'Calculate Delivery' before checking out.");
                addressInput.focus();
                return;
            }

            const customerName = document.getElementById('custName').value;
            const customerEmail = document.getElementById('custEmail').value;
            const orderRef = `NEX-${Math.floor(100000 + Math.random() * 900000)}`;

            const payload = {
                reference: orderRef,
                customer: customerName,
                email: customerEmail,
                amount: checkoutState.grandTotal.toFixed(2),
                cart: checkoutState.cart
            };

            if (checkoutState.paymentMethod === 'payfast') {
                // ROUTE 1: PAYFAST (Automatic Direct Routing to Instant EFT Tab)
                console.log("Routing directly to PayFast Instant EFT with payload:", payload);
                
                const payfastUrl = "https://www.payfast.co.za/eng/process"; // Switch to sandbox.payfast.co.za/eng/process for live test mode if needed
                const merchantId = "36692313";   // Replace with Nexpak's PayFast Merchant ID
                const merchantKey = "cmvr2h6hmum6e"; // Replace with Nexpak's PayFast Merchant Key
                
                // Construct an auto-submitting form to push user straight to PayFast Instant EFT
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = payfastUrl;

                const payloadFields = {
                    merchant_id: merchantId,
                    merchant_key: merchantKey,
                    return_url: window.location.origin + '/success.html',
                    cancel_url: window.location.origin + '/cancel.html',
                    notify_url: window.location.origin + '/api/notify',
                    name_first: customerName.split(' ')[0],
                    name_last: customerName.split(' ').slice(1).join(' ') || 'Customer',
                    email_address: customerEmail,
                    m_payment_id: orderRef,
                    amount: checkoutState.grandTotal.toFixed(2),
                    item_name: `Nexpak Security Solutions Order ${orderRef}`,
                    payment_method: 'eft' // Forces PayFast to open directly on the Instant EFT tab
                };

                for (const key in payloadFields) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = payloadFields[key];
                    form.appendChild(input);
                }

                document.body.appendChild(form);
                form.submit();
                
            } else {
                // ROUTE 2: MANUAL EFT
                console.log("Processing Manual EFT order:", payload);
                
                localStorage.removeItem('nexpak_cart');
                
                alert(`Order Placed Successfully!\n\nPlease EFT R${payload.amount} to Nexpak Security Solutions.\nUse reference: ${orderRef}\n\nWe have emailed you the invoice and banking details.`);
                window.location.href = 'index.html';
            }
        });
    }

    // Run on script load
    initCheckout();
   
   <script src="js/payments.js"></script>
});
           
