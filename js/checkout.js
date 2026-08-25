/* ==========================================================================
   Nexpak Security Solutions - Equestrian Checkout
   checkout.js

   Handles:
   - Customer details
   - Equestrian cart
   - Delivery result
   - VAT
   - Complete Payment button
   - PayFast routing
   - Manual EFT fallback

   PayFast processing is handled by:
   js/payfast-integration.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    console.log('Nexpak Equestrian Checkout initialized');

    // ------------------------------------------------------------
    // CHECKOUT STATE
    // ------------------------------------------------------------

    const checkoutState = {
        deliveryFee: 0,
        deliveryCalculated: false,
        paymentMethod: 'payfast'
    };

    // ------------------------------------------------------------
    // DOM ELEMENTS
    // ------------------------------------------------------------

    const completeOrderBtn = document.getElementById('completeOrderBtn');

    const customerNameInput = document.getElementById('CustName');
    const customerEmailInput = document.getElementById('CustEmail');
    const customerPhoneInput = document.getElementById('CustPhone');

    const checkoutModal = document.getElementById('checkoutModal');

    // ------------------------------------------------------------
    // CART HELPERS
    // ------------------------------------------------------------

    function getCurrentCart() {
        // Equestrian cart is maintained by equestrian.js
        if (typeof cart !== 'undefined' && Array.isArray(cart)) {
            return cart;
        }

        // Fallback to localStorage
        try {
            const storedCart = JSON.parse(
                localStorage.getItem('nexpak_cart')
            );

            if (Array.isArray(storedCart)) {
                return storedCart;
            }
        } catch (error) {
            console.error('Could not read stored cart:', error);
        }

        return [];
    }

    function getCartProducts() {
        const currentCart = getCurrentCart();

        if (typeof products === 'undefined') {
            console.error('Product database not available.');
            return [];
        }

        return currentCart.map(item => {

            const product = products.find(
                product => product.id === item.id
            );

            if (!product) return null;

            return {
                id: product.id,
                name: product.name,
                price: Number(product.price) || 0,
                quantity: Number(item.qty) || 1,
                variant: item.variant || '',
                unit: product.unit || ''
            };

        }).filter(Boolean);
    }

    // ------------------------------------------------------------
    // CALCULATE CART TOTAL
    // ------------------------------------------------------------

    function calculateCartSubtotal() {

        const items = getCartProducts();

        let subtotalExVat = 0;

        items.forEach(item => {
            subtotalExVat += item.price * item.quantity;
        });

        return subtotalExVat;
    }

    // ------------------------------------------------------------
    // CALCULATE VAT
    // ------------------------------------------------------------

    function calculateGrandTotal() {

        const subtotalExVat = calculateCartSubtotal();

        const delivery = Number(checkoutState.deliveryFee) || 0;

        const taxableAmount = subtotalExVat + delivery;

        const vat = taxableAmount * 0.15;

        return {
            subtotalExVat,
            delivery,
            vat,
            grandTotal: taxableAmount + vat
        };
    }

    // ------------------------------------------------------------
    // FIND DELIVERY RESULT FROM EQUESTRIAN CALCULATOR
    // ------------------------------------------------------------

    function readDeliveryAmount() {

        const deliveryElement =
            document.getElementById('eq-total-delivery');

        if (!deliveryElement) {
            return 0;
        }

        const text = deliveryElement.textContent || '';

        const numericValue = parseFloat(
            text.replace(/[^\d.]/g, '')
        );

        return Number.isFinite(numericValue)
            ? numericValue
            : 0;
    }

    // ------------------------------------------------------------
    // UPDATE DELIVERY STATE
    // ------------------------------------------------------------

    function updateDeliveryState() {

        const deliveryAmount = readDeliveryAmount();

        if (deliveryAmount > 0) {

            checkoutState.deliveryFee = deliveryAmount;
            checkoutState.deliveryCalculated = true;

            console.log(
                'Equestrian delivery:',
                checkoutState.deliveryFee
            );

            return true;
        }

        checkoutState.deliveryFee = 0;
        checkoutState.deliveryCalculated = false;

        return false;
    }

    // ------------------------------------------------------------
    // VALIDATE CUSTOMER DETAILS
    // ------------------------------------------------------------

    function validateCustomerDetails() {

        if (!customerNameInput) {
            alert('Customer name field could not be found.');
            return false;
        }

        if (!customerEmailInput) {
            alert('Customer email field could not be found.');
            return false;
        }

        if (!customerPhoneInput) {
            alert('Customer phone field could not be found.');
            return false;
        }

        const name = customerNameInput.value.trim();
        const email = customerEmailInput.value.trim();
        const phone = customerPhoneInput.value.trim();

        if (!name) {
            alert('Please enter your full name.');
            customerNameInput.focus();
            return false;
        }

        if (!email) {
            alert('Please enter your email address.');
            customerEmailInput.focus();
            return false;
        }

        if (!email.includes('@')) {
            alert('Please enter a valid email address.');
            customerEmailInput.focus();
            return false;
        }

        if (!phone) {
            alert('Please enter your phone number.');
            customerPhoneInput.focus();
            return false;
        }

        return true;
    }

    // ------------------------------------------------------------
    // GET PAYMENT METHOD
    // ------------------------------------------------------------

    function getPaymentMethod() {

        const selectedRadio =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            );

        if (selectedRadio) {
            return selectedRadio.value;
        }

        return 'payfast';
    }

    // ------------------------------------------------------------
    // CREATE ORDER REFERENCE
    // ------------------------------------------------------------

    function generateOrderReference() {

        if (
            typeof currentOrderNumber !== 'undefined' &&
            currentOrderNumber
        ) {
            return currentOrderNumber;
        }

        return 'NXK-' +
            Math.floor(
                100000 +
                Math.random() * 900000
            );
    }

    // ------------------------------------------------------------
    // COMPLETE PAYMENT
    // ------------------------------------------------------------

    function completePayment() {

        console.log('Complete Payment clicked');

        // --------------------------------------------------------
        // 1. CHECK CART
        // --------------------------------------------------------

        const currentCart = getCurrentCart();

        if (!currentCart.length) {

            alert(
                'Your cart is empty. Please add products before checking out.'
            );

            return;
        }

        // --------------------------------------------------------
        // 2. VALIDATE CUSTOMER
        // --------------------------------------------------------

        if (!validateCustomerDetails()) {
            return;
        }

        // --------------------------------------------------------
        // 3. CHECK DELIVERY
        // --------------------------------------------------------

        updateDeliveryState();

        if (!checkoutState.deliveryCalculated) {

            alert(
                'Please select your delivery region and calculate your delivery cost before completing payment.'
            );

            const deliverySection =
                document.getElementById(
                    'equestrian-delivery-calc'
                );

            if (deliverySection) {
                deliverySection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }

            return;
        }

        // --------------------------------------------------------
        // 4. CALCULATE FINAL TOTAL
        // --------------------------------------------------------

        const totals = calculateGrandTotal();

        if (totals.grandTotal <= 0) {

            alert(
                'Unable to calculate the order total. Please try again.'
            );

            return;
        }

        // --------------------------------------------------------
        // 5. CUSTOMER DETAILS
        // --------------------------------------------------------

        const customerName =
            customerNameInput.value.trim();

        const customerEmail =
            customerEmailInput.value.trim();

        const customerPhone =
            customerPhoneInput.value.trim();

        const orderReference =
            generateOrderReference();

        // --------------------------------------------------------
        // 6. PAYMENT METHOD
        // --------------------------------------------------------

        const paymentMethod =
            getPaymentMethod();

        console.log('--------------------------------');
        console.log('NEXPAK ORDER');
        console.log('Reference:', orderReference);
        console.log('Customer:', customerName);
        console.log('Email:', customerEmail);
        console.log('Phone:', customerPhone);
        console.log('Subtotal:', totals.subtotalExVat);
        console.log('Delivery:', totals.delivery);
        console.log('VAT:', totals.vat);
        console.log('Grand Total:', totals.grandTotal);
        console.log('Payment:', paymentMethod);
        console.log('--------------------------------');

        // --------------------------------------------------------
        // 7. PAYFAST
        // --------------------------------------------------------

        if (paymentMethod === 'payfast') {

            if (
                typeof payWithPayFastCheckout !== 'function'
            ) {

                console.error(
                    'payWithPayFastCheckout() is not available.'
                );

                alert(
                    'The PayFast payment system has not loaded correctly. Please refresh the page and try again.'
                );

                return;
            }

            // Disable button while redirecting
            completeOrderBtn.disabled = true;

            completeOrderBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Connecting to PayFast...';

            // Convert cart into payment items
            const paymentItems =
                getCartProducts().map(item => ({
                    name: item.name +
                        (
                            item.variant
                                ? ' (' + item.variant + ')'
                                : ''
                        ),
                    price: item.price,
                    quantity: item.quantity
                }));

            /*
             * PayFast integration receives:
             *
             * total
             * items
             * customer email
             * customer name
             */

            try {

                payWithPayFastCheckout(
                    totals.grandTotal,
                    paymentItems,
                    customerEmail,
                    customerName
                );

            } catch (error) {

                console.error(
                    'PayFast checkout error:',
                    error
                );

                completeOrderBtn.disabled = false;

                completeOrderBtn.innerHTML =
                    '<i class="fa-solid fa-lock"></i> Complete Payment with PayFast';

                alert(
                    'There was a problem connecting to PayFast. Please try again.'
                );
            }

            return;
        }

        // --------------------------------------------------------
        // 8. MANUAL EFT
        // --------------------------------------------------------

        if (paymentMethod === 'eft') {

            const reference = orderReference;

            localStorage.setItem(
                'nexpak_pending_order',
                JSON.stringify({
                    reference,
                    customerName,
                    customerEmail,
                    customerPhone,
                    subtotalExVat: totals.subtotalExVat,
                    delivery: totals.delivery,
                    vat: totals.vat,
                    total: totals.grandTotal,
                    cart: currentCart,
                    createdAt: new Date().toISOString()
                })
            );

            alert(
                'Order created successfully.\n\n' +
                'Order Reference: ' + reference +
                '\n\n' +
                'Please use this reference when making your EFT payment.'
            );

            return;
        }

        alert(
            'Please select a payment method.'
        );
    }

    // ------------------------------------------------------------
    // BUTTON EVENT
    // ------------------------------------------------------------

    if (completeOrderBtn) {

        completeOrderBtn.addEventListener(
            'click',
            function(event) {

                event.preventDefault();

                completePayment();

            }
        );

        console.log(
            'Complete Payment button connected.'
        );

    } else {

        console.error(
            'ERROR: completeOrderBtn was not found.'
        );
    }

    // ------------------------------------------------------------
    // WATCH DELIVERY CALCULATOR
    // ------------------------------------------------------------

    document.addEventListener(
        'change',
        function(event) {

            if (
                event.target &&
                (
                    event.target.id === 'eq-region-select' ||
                    event.target.id === 'eq-delivery-address'
                )
            ) {

                setTimeout(() => {

                    updateDeliveryState();

                }, 100);

            }

        }
    );

    // ------------------------------------------------------------
    // INITIALIZE
    // ------------------------------------------------------------

    updateDeliveryState();

});
