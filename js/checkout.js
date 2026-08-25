/* ==========================================================================
   Nexpak Security Solutions
   Checkout & Payment Routing
   File: js/checkout.js
   ========================================================================== */

console.log('Nexpak Checkout initialized');

document.addEventListener('DOMContentLoaded', function () {

    // ======================================================================
    // 1. CHECKOUT STATE
    // ======================================================================

    const checkoutState = {
        cart: [],
        subtotal: 0,
        deliveryFee: 0,
        vat: 0,
        grandTotal: 0,
        deliveryCalculated: false,
        paymentMethod: 'payfast',
        orderReference: null
    };

    // ======================================================================
    // 2. LOAD CART
    // ======================================================================

    function loadCart() {

        try {
            checkoutState.cart =
                JSON.parse(localStorage.getItem('nexpak_cart')) || [];
        } catch (error) {

            console.error('Could not load Nexpak cart:', error);

            checkoutState.cart = [];
        }

        return checkoutState.cart;
    }

    loadCart();


    // ======================================================================
    // 3. DOM ELEMENTS
    // ======================================================================

    const checkoutModal =
        document.getElementById('checkoutModal');

    const customerName =
        document.getElementById('CustName');

    const customerEmail =
        document.getElementById('CustEmail');

    const customerPhone =
        document.getElementById('CustPhone');

    const generatedOrderNum =
        document.getElementById('generatedOrderNum');

    const completeOrderBtn =
        document.getElementById('completeOrderBtn');

    const deliveryContainer =
        document.getElementById('deliveryContainer');

    const paymentContainer =
        document.getElementById('paymentContainer');


    // ======================================================================
    // 4. GENERATE ORDER REFERENCE
    // ======================================================================

    function generateOrderReference() {

        const timestamp = Date.now();

        const random =
            Math.random()
                .toString(36)
                .substring(2, 8)
                .toUpperCase();

        return `NXP-${timestamp}-${random}`;
    }


    // ======================================================================
    // 5. CALCULATE CART SUBTOTAL
    // ======================================================================

    function calculateSubtotal() {

        let subtotal = 0;

        checkoutState.cart.forEach(function (item) {

            let price = Number(
                item.price ||
                item.total ||
                item.amount ||
                0
            );

            let quantity = Number(
                item.quantity || 1
            );

            subtotal += price * quantity;
        });

        checkoutState.subtotal = subtotal;

        return subtotal;
    }


    // ======================================================================
    // 6. CALCULATE VAT
    // ======================================================================

    function calculateVAT() {

        const taxableAmount =
            checkoutState.subtotal +
            checkoutState.deliveryFee;

        checkoutState.vat =
            taxableAmount * 0.15;

        return checkoutState.vat;
    }


    // ======================================================================
    // 7. CALCULATE GRAND TOTAL
    // ======================================================================

    function calculateGrandTotal() {

        calculateSubtotal();
        calculateVAT();

        checkoutState.grandTotal =
            checkoutState.subtotal +
            checkoutState.deliveryFee +
            checkoutState.vat;

        return checkoutState.grandTotal;
    }


    // ======================================================================
    // 8. GET CART WEIGHT
    // ======================================================================

    function getCartWeight() {

        let totalWeight = 0;

        checkoutState.cart.forEach(function (item) {

            const quantity =
                Number(item.quantity || 1);

            const weight =
                Number(
                    item.weight ||
                    item.weightKg ||
                    0.5
                );

            totalWeight += weight * quantity;
        });

        return totalWeight;
    }


    // ======================================================================
    // 9. DISPLAY CHECKOUT SUMMARY
    // ======================================================================

    function updateCheckoutSummary() {

        calculateGrandTotal();

        const summary =
            document.getElementById('checkoutSummary');

        if (!summary) {
            return;
        }

        summary.innerHTML = `
            <div class="checkout-summary-row">
                <span>Subtotal</span>
                <strong>
                    R${checkoutState.subtotal.toFixed(2)}
                </strong>
            </div>

            <div class="checkout-summary-row">
                <span>Delivery</span>
                <strong>
                    ${
                        checkoutState.deliveryCalculated
                        ? 'R' + checkoutState.deliveryFee.toFixed(2)
                        : 'Pending'
                    }
                </strong>
            </div>

            <div class="checkout-summary-row">
                <span>VAT (15%)</span>
                <strong>
                    R${checkoutState.vat.toFixed(2)}
                </strong>
            </div>

            <div class="checkout-summary-row checkout-grand-total">
                <span>Total</span>
                <strong>
                    R${checkoutState.grandTotal.toFixed(2)}
                </strong>
            </div>
        `;
    }


    // ======================================================================
    // 10. UPDATE GENERATED ORDER NUMBER
    // ======================================================================

    function updateOrderReference() {

        if (!checkoutState.orderReference) {

            checkoutState.orderReference =
                generateOrderReference();
        }

        if (generatedOrderNum) {

            generatedOrderNum.textContent =
                checkoutState.orderReference;
        }
    }


    // ======================================================================
    // 11. CREATE DELIVERY SUMMARY
    // ======================================================================

    function createDeliverySummary() {

        if (!deliveryContainer) {
            return;
        }

        /*
         * Do not destroy an existing delivery calculator.
         * If equestrian-delivery-calculator.js has already created
         * the calculator, leave it alone.
         */

        const existingCalculator =
            document.getElementById('equestrian-delivery-calc');

        if (existingCalculator) {
            return;
        }

        deliveryContainer.innerHTML = `
            <div class="checkout-delivery-box">

                <h3>
                    <i class="fa-solid fa-truck"></i>
                    Delivery
                </h3>

                <p>
                    Please select your delivery area before payment.
                </p>

                <div class="checkout-delivery-options">

                    <button
                        type="button"
                        class="delivery-option"
                        data-fee="200"
                        data-region="gauteng"
                    >
                        Gauteng
                        <strong>From R200</strong>
                    </button>

                    <button
                        type="button"
                        class="delivery-option"
                        data-fee="650"
                        data-region="durban"
                    >
                        Durban
                        <strong>From R650</strong>
                    </button>

                    <button
                        type="button"
                        class="delivery-option"
                        data-fee="800"
                        data-region="capetown"
                    >
                        Cape Town
                        <strong>From R800</strong>
                    </button>

                    <button
                        type="button"
                        class="delivery-option"
                        data-fee="500"
                        data-region="other"
                    >
                        Other Areas
                        <strong>From R500</strong>
                    </button>

                </div>

                <div
                    id="checkoutDeliveryResult"
                    style="display:none;"
                >
                    Delivery:
                    <strong id="checkoutDeliveryAmount">
                        R0.00
                    </strong>
                </div>

            </div>
        `;

        setupDeliveryOptions();
    }


    // ======================================================================
    // 12. DELIVERY OPTION EVENTS
    // ======================================================================

    function setupDeliveryOptions() {

        const buttons =
            document.querySelectorAll('.delivery-option');

        buttons.forEach(function (button) {

            button.addEventListener('click', function () {

                buttons.forEach(function (btn) {
                    btn.classList.remove('selected');
                });

                button.classList.add('selected');

                const fee =
                    Number(button.dataset.fee || 0);

                checkoutState.deliveryFee = fee;

                checkoutState.deliveryCalculated =
                    fee > 0;

                const result =
                    document.getElementById(
                        'checkoutDeliveryResult'
                    );

                const amount =
                    document.getElementById(
                        'checkoutDeliveryAmount'
                    );

                if (result) {
                    result.style.display = 'block';
                }

                if (amount) {
                    amount.textContent =
                        `R${fee.toFixed(2)}`;
                }

                updateCheckoutSummary();

                console.log(
                    'Delivery selected:',
                    fee
                );
            });
        });
    }


    // ======================================================================
    // 13. LISTEN FOR EXTERNAL DELIVERY CALCULATOR
    // ======================================================================

    document.addEventListener(
        'deliveryCalculated',
        function (event) {

            const fee =
                Number(
                    event.detail?.fee || 0
                );

            if (fee <= 0) {
                return;
            }

            checkoutState.deliveryFee = fee;

            checkoutState.deliveryCalculated = true;

            updateCheckoutSummary();
        }
    );


    // ======================================================================
    // 14. PAYMENT METHOD UI
    // ======================================================================

    function createPaymentOptions() {

        if (!paymentContainer) {
            return;
        }

        paymentContainer.innerHTML = `

            <div class="checkout-payment-box">

                <h3>
                    <i class="fa-solid fa-credit-card"></i>
                    Payment Method
                </h3>

                <label class="payment-option selected">

                    <input
                        type="radio"
                        name="checkoutPaymentMethod"
                        value="payfast"
                        checked
                    >

                    <span class="payment-option-content">

                        <span class="payment-option-title">
                            Pay securely with
                        </span>

                        <span class="payfast-brand">
                            <span class="payfast-p">
                                P
                            </span>

                            <span>
                                PayFast
                            </span>
                        </span>

                        <small>
                            Secure online payment
                        </small>

                    </span>

                </label>

                <label class="payment-option">

                    <input
                        type="radio"
                        name="checkoutPaymentMethod"
                        value="eft"
                    >

                    <span class="payment-option-content">

                        <span class="payment-option-title">
                            Manual EFT
                        </span>

                        <small>
                            Receive banking details after placing your order
                        </small>

                    </span>

                </label>

                <div
                    id="eftCheckoutDetails"
                    class="eft-checkout-details"
                    style="display:none;"
                >

                    <strong>
                        Manual EFT
                    </strong>

                    <p>
                        Your order will be held pending
                        payment verification.
                    </p>

                </div>

            </div>
        `;

        setupPaymentOptions();
    }


    // ======================================================================
    // 15. PAYMENT OPTION EVENTS
    // ======================================================================

    function setupPaymentOptions() {

        const radios =
            document.querySelectorAll(
                'input[name="checkoutPaymentMethod"]'
            );

        const eftDetails =
            document.getElementById(
                'eftCheckoutDetails'
            );

        radios.forEach(function (radio) {

            radio.addEventListener(
                'change',
                function () {

                    checkoutState.paymentMethod =
                        radio.value;

                    document
                        .querySelectorAll('.payment-option')
                        .forEach(function (option) {

                            option.classList.remove(
                                'selected'
                            );
                        });

                    const parent =
                        radio.closest(
                            '.payment-option'
                        );

                    if (parent) {
                        parent.classList.add(
                            'selected'
                        );
                    }

                    if (eftDetails) {

                        eftDetails.style.display =
                            radio.value === 'eft'
                            ? 'block'
                            : 'none';
                    }
                }
            );
        });
    }


    // ======================================================================
    // 16. VALIDATE CUSTOMER DETAILS
    // ======================================================================

    function validateCustomerDetails() {

        const name =
            customerName?.value.trim() || '';

        const email =
            customerEmail?.value.trim() || '';

        const phone =
            customerPhone?.value.trim() || '';

        if (!name) {

            alert(
                'Please enter your full name.'
            );

            customerName?.focus();

            return false;
        }

        if (!email) {

            alert(
                'Please enter your email address.'
            );

            customerEmail?.focus();

            return false;
        }

        if (!email.includes('@')) {

            alert(
                'Please enter a valid email address.'
            );

            customerEmail?.focus();

            return false;
        }

        if (!phone) {

            alert(
                'Please enter your phone number.'
            );

            customerPhone?.focus();

            return false;
        }

        return true;
    }


    // ======================================================================
    // 17. CREATE PAYMENT PAYLOAD
    // ======================================================================

    function createPaymentPayload() {

        return {

            orderReference:
                checkoutState.orderReference,

            customer: {
                name:
                    customerName?.value.trim() || '',

                email:
                    customerEmail?.value.trim() || '',

                phone:
                    customerPhone?.value.trim() || ''
            },

            subtotal:
                checkoutState.subtotal.toFixed(2),

            delivery:
                checkoutState.deliveryFee.toFixed(2),

            vat:
                checkoutState.vat.toFixed(2),

            total:
                checkoutState.grandTotal.toFixed(2),

            paymentMethod:
                checkoutState.paymentMethod,

            cart:
                checkoutState.cart,

            createdAt:
                new Date().toISOString()
        };
    }


    // ======================================================================
    // 18. SAVE PENDING ORDER
    // ======================================================================

    function savePendingOrder(payload) {

        try {

            localStorage.setItem(
                'nexpak_pending_order',
                JSON.stringify(payload)
            );

        } catch (error) {

            console.error(
                'Could not save pending order:',
                error
            );
        }
    }


    // ======================================================================
    // 19. PAYFAST PAYMENT
    // ======================================================================

    function processPayFastPayment() {

        if (!window.PayFast) {

            alert(
                'PayFast payment system has not loaded. Please refresh the page and try again.'
            );

            console.error(
                'window.PayFast is unavailable.'
            );

            return;
        }

        if (
            typeof window.PayFast.checkout !==
            'function'
        ) {

            alert(
                'PayFast checkout is unavailable.'
            );

            return;
        }

        const payload =
            createPaymentPayload();

        savePendingOrder(payload);

        console.log(
            'Starting PayFast payment:',
            payload
        );

        /*
         * IMPORTANT:
         * The actual PayFast integration is handled
         * by payments.js.
         *
         * We do NOT duplicate merchant credentials here.
         */

        window.PayFast.checkout(
            checkoutState.grandTotal,
            checkoutState.cart,
                       customerEmail,
            customerName
        );

        } else {
            // ============================================================
            // MANUAL EFT PAYMENT
            // ============================================================

            console.log("Processing Manual EFT order:", payload);

            // Save order details locally so they can be referenced
            // after the customer returns to the website.
            const eftOrder = {
                ...payload,
                paymentMethod: 'eft',
                status: 'payment_pending',
                createdAt: new Date().toISOString()
            };

            localStorage.setItem(
                'nexpak_pending_order',
                JSON.stringify(eftOrder)
            );

            // Remove cart after the order has been created
            localStorage.removeItem('nexpak_cart');

            alert(
                `Order placed successfully!\n\n` +
                `Order Reference: ${orderRef}\n\n` +
                `Amount: R${payload.amount}\n\n` +
                `Please complete the EFT payment using the banking details provided. ` +
                `Use your order reference as the payment reference.`
            );

            window.location.href = 'index.html';
        }
    });

    // ================================================================
    // INITIALIZE CHECKOUT
    // ================================================================

    initCheckout();

    // ================================================================
    // RESTORE PAYMENT METHOD STATE
    // ================================================================

    const selectedPayment = document.querySelector(
        'input[name="paymentMethod"]:checked'
    );

    if (selectedPayment) {
        checkoutState.paymentMethod = selectedPayment.value;

        if (
            checkoutState.paymentMethod === 'eft' &&
            eftDetailsPanel
        ) {
            eftDetailsPanel.style.display = 'block';
        }
    }

    // ================================================================
    // EXPOSE CHECKOUT STATE FOR OTHER MODULES
    // ================================================================

    window.NexpakCheckout = {
        getState: () => checkoutState,

        getCart: () => checkoutState.cart,

        getTotal: () => checkoutState.grandTotal,

        getDeliveryFee: () => checkoutState.deliveryFee,

        getWeight: () => checkoutState.totalWeightKg,

        refresh: () => {
            initCheckout();
        }
    };

});
            
