l/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   Checkout & Payment Routing
   checkout.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    'use strict';

       /*
     * checkout.js must only execute on the checkout page.
     * Shop, equestrian and other pages must not run checkout logic.
     */

    const isCheckoutPage =
        document.getElementById('checkoutForm') ||
        document.getElementById('checkoutOrderItems');

    if (!isCheckoutPage) {
        return;
    }

    /* ==========================================================================
       1. CHECKOUT STATE
       ========================================================================== */

    const checkoutState = {

        cart: JSON.parse(
            localStorage.getItem('nexpak_cart')
        ) || [],

        subtotalExclVat: 0,

        totalWeightKg: 0,

        distanceKm: 0,

        deliveryFee: 0,

        vatAmount: 0,

        grandTotal: 0,

        paymentMethod: 'payfast',

        deliveryCalculated: false,

        customer: {
            name: '',
            email: '',
            phone: '',
            address: ''
        },

        orderReference: ''

    };


    /* ==========================================================================
       2. VAT
       ========================================================================== */

    const VAT_RATE = 0.15;


    /* ==========================================================================
       3. DOM ELEMENTS
       ========================================================================== */

    const orderItemsContainer =
        document.getElementById('checkoutOrderItems');

    const elSubtotal =
        document.getElementById('chkSubtotal');

    const elDelivery =
        document.getElementById('chkDelivery');

    const elVat =
        document.getElementById('chkVat');

    const elTotal =
        document.getElementById('chkGrandTotal');

    const checkoutForm =
        document.getElementById('checkoutForm');

    const addressInput =
        document.getElementById('shippingAddress');

    const calculateDeliveryBtn =
        document.getElementById('btnCalculateDelivery');

    const paymentRadios =
        document.querySelectorAll(
            'input[name="paymentMethod"]'
        );

    const eftDetailsPanel =
        document.getElementById('eftDetailsPanel');


    /* ==========================================================================
       4. CART VALIDATION
       ========================================================================== */

    if (!Array.isArray(checkoutState.cart) ||
        checkoutState.cart.length === 0) {

        alert(
            'Your cart is empty. Redirecting to the shop.'
        );

        window.location.href = 'shop.html';

        return;
    }


    /* ==========================================================================
       5. UTILITY FUNCTIONS
       ========================================================================== */

    function money(value) {

        return `R ${Number(value || 0).toFixed(2)}`;

    }


    function generateOrderReference() {

        return (
            'NEX-' +
            Date.now() +
            '-' +
            Math.random()
                .toString(36)
                .substring(2, 7)
                .toUpperCase()
        );

    }


    /* ==========================================================================
       6. DETERMINE PRODUCT / KIT WEIGHT
       ========================================================================== */

    function getItemWeight(item) {

        /*
         * First try explicit weight stored on the product.
         */

        if (item && Number(item.weight) > 0) {

            return Number(item.weight);

        }


        /*
         * Try common nested product structures.
         */

        if (
            item &&
            item.product &&
            Number(item.product.weight) > 0
        ) {

            return Number(item.product.weight);

        }


        /*
         * Category fallback.
         *
         * These are only fallbacks for products that do not
         * contain an explicit weight.
         */

        const category =
            String(item?.category || '')
                .toLowerCase();


        if (category === 'gate-motors') {

            return 12;

        }


        if (category === 'cctv-hd') {

            return 5;

        }


        if (category === 'cctv-ip') {

            return 5;

        }


        if (category === 'electric-fencing') {

            return 8;

        }


        if (category === 'roboguard') {

            return 10;

        }


        if (category === 'ids-alarm') {

            return 4;

        }


        if (category === 'ajax-security') {

            return 4;

        }


        if (category === 'stafix-agri') {

            return 6;

        }


        /*
         * Generic fallback.
         */

        return 1;

    }


    /* ==========================================================================
       7. CALCULATE TOTAL CART WEIGHT
       ========================================================================== */

    function calculateCartWeight() {

        let totalWeight = 0;


        checkoutState.cart.forEach(item => {

            const quantity =
                Number(item.quantity) > 0
                    ? Number(item.quantity)
                    : 1;


            const itemWeight =
                getItemWeight(item);


            totalWeight +=
                itemWeight * quantity;

        });


        checkoutState.totalWeightKg =
            Number(totalWeight.toFixed(2));


        return checkoutState.totalWeightKg;

    }


    /* ==========================================================================
       8. RENDER CART ITEMS
       ========================================================================== */

    function renderCheckoutItems() {

        if (!orderItemsContainer) {

            return;

        }


        orderItemsContainer.innerHTML = '';


        checkoutState.subtotalExclVat = 0;


        checkoutState.cart.forEach((item, index) => {

            const quantity =
                Number(item.quantity) > 0
                    ? Number(item.quantity)
                    : 1;


            /*
             * Support both totalExclVat and price-based
             * cart structures.
             */

            let itemTotal = 0;


            if (Number(item.totalExclVat) > 0) {

                itemTotal =
                    Number(item.totalExclVat);

            } else if (Number(item.price) > 0) {

                itemTotal =
                    Number(item.price) * quantity;

            } else if (Number(item.total) > 0) {

                itemTotal =
                    Number(item.total);

            }


            checkoutState.subtotalExclVat +=
                itemTotal;


            const itemName =
                item?.baseKit?.name ||
                item?.name ||
                item?.product?.name ||
                'Security System';


            const category =
                String(
                    item?.category ||
                    'security'
                )
                .replace(/-/g, ' ')
                .toUpperCase();


            const itemDiv =
                document.createElement('div');


            itemDiv.className =
                'checkout-line-item';


            itemDiv.innerHTML = `

                <div class="chk-item-info">

                    <strong>
                        ${escapeHtml(itemName)}
                    </strong>

                    <span class="chk-item-cat">
                        ${escapeHtml(category)}
                    </span>

                    <span class="chk-item-qty">
                        Qty: ${quantity}
                    </span>

                </div>

                <div class="chk-item-price">
                    ${money(itemTotal)}
                </div>

            `;


            orderItemsContainer.appendChild(
                itemDiv
            );

        });


        checkoutState.subtotalExclVat =
            Number(
                checkoutState.subtotalExclVat.toFixed(2)
            );


        calculateCartWeight();

        updateFinancials();

    }


    /* ==========================================================================
       9. HTML ESCAPE
       ========================================================================== */

    function escapeHtml(value) {

        return String(value ?? '')

            .replace(/&/g, '&amp;')

            .replace(/</g, '&lt;')

            .replace(/>/g, '&gt;')

            .replace(/"/g, '&quot;')

            .replace(/'/g, '&#039;');

    }


    /* ==========================================================================
       10. INITIAL FINANCIAL CALCULATION
       ========================================================================== */

    function updateFinancials() {

        const taxableAmount =
            checkoutState.subtotalExclVat +
            checkoutState.deliveryFee;


        checkoutState.vatAmount =
            Number(
                (taxableAmount * VAT_RATE)
                    .toFixed(2)
            );


        checkoutState.grandTotal =
            Number(
                (
                    taxableAmount +
                    checkoutState.vatAmount
                ).toFixed(2)
            );


        if (elSubtotal) {

            elSubtotal.textContent =
                money(
                    checkoutState.subtotalExclVat
                );

        }


        if (elDelivery) {

            if (
                checkoutState.deliveryCalculated
            ) {

                elDelivery.textContent =
                    money(
                        checkoutState.deliveryFee
                    );

            } else {

                elDelivery.textContent =
                    'Pending';

            }

        }


        if (elVat) {

            elVat.textContent =
                money(
                    checkoutState.vatAmount
                );

        }


        if (elTotal) {

            elTotal.textContent =
                money(
                    checkoutState.grandTotal
                );

        }


        /*
         * Keep the calculated values available to
         * other checkout/payment modules.
         */

        window.NEXPAK_CHECKOUT = checkoutState;

    }


    /* ==========================================================================
       11. EXPOSE CHECKOUT STATE
       ========================================================================== */

    window.NEXPAK_CHECKOUT =
        checkoutState;


    /*
     * Continue with PART 2.
     */

    console.log(
        'Nexpak checkout initialized.',
        checkoutState
    );

});

    /* ==========================================================================
       12. DELIVERY CALCULATOR INTEGRATION
       ========================================================================== */

    /*
     * IMPORTANT:
     *
     * Delivery is NOT calculated here.
     *
     * The shared delivery-calculator.js handles:
     *
     *   - Address calculation
     *   - Distance calculation
     *   - Regional delivery
     *   - Weight calculation
     *
     * This checkout file only receives the result.
     */


    function getDeliveryCalculatorResult() {

        /*
         * First check the global delivery state created by
         * delivery-calculator.js.
         */

        if (
            window.NEXPAK_DELIVERY &&
            Number(
                window.NEXPAK_DELIVERY.total
            ) >= 0
        ) {

            return window.NEXPAK_DELIVERY;

        }


        /*
         * Compatibility fallback.
         *
         * Some versions of delivery-calculator.js may expose
         * the value under a different name.
         */

        if (
            window.deliveryState &&
            Number(
                window.deliveryState.total
            ) >= 0
        ) {

            return window.deliveryState;

        }


        return null;

    }


    /* ==========================================================================
       13. APPLY DELIVERY RESULT
       ========================================================================== */

    function applyDeliveryResult(
        deliveryData
    ) {

        if (!deliveryData) {

            console.warn(
                'No delivery calculation available.'
            );

            return false;

        }


        const deliveryTotal =
            Number(
                deliveryData.total ??
                deliveryData.deliveryFee ??
                deliveryData.amount ??
                0
            );


        if (
            !Number.isFinite(deliveryTotal) ||
            deliveryTotal < 0
        ) {

            console.warn(
                'Invalid delivery amount:',
                deliveryData
            );

            return false;

        }


        checkoutState.deliveryFee =
            Number(
                deliveryTotal.toFixed(2)
            );


        checkoutState.distanceKm =
            Number(
                deliveryData.distanceKm ??
                deliveryData.distance ??
                0
            );


        checkoutState.deliveryCalculated =
            true;


        updateFinancials();


        /*
         * Tell other modules that checkout has received
         * the delivery amount.
         */

        document.dispatchEvent(
            new CustomEvent(
                'nexpakDeliveryApplied',
                {
                    detail: {
                        fee:
                            checkoutState.deliveryFee,

                        distanceKm:
                            checkoutState.distanceKm,

                        weightKg:
                            checkoutState.totalWeightKg,

                        grandTotal:
                            checkoutState.grandTotal
                    }
                }
            )
        );


        console.log(
            'Delivery applied to checkout:',
            checkoutState.deliveryFee
        );


        return true;

    }


    /* ==========================================================================
       14. LISTEN FOR DELIVERY CALCULATOR EVENTS
       ========================================================================== */

    /*
     * The shared delivery calculator should dispatch:
     *
     *   nexpakDeliveryCalculated
     *
     * when the customer has selected a region or calculated
     * an address.
     */

    document.addEventListener(
        'nexpakDeliveryCalculated',
        event => {

            const data =
                event.detail || {};


            console.log(
                'Delivery calculator result received:',
                data
            );


            applyDeliveryResult(data);

        }
    );


    /*
     * Additional compatibility event.
     */

    document.addEventListener(
        'deliveryCalculated',
        event => {

            const data =
                event.detail || {};


            applyDeliveryResult(data);

        }
    );


    /* ==========================================================================
       15. WATCH DELIVERY DOM
       ========================================================================== */

    /*
     * This provides an additional safety mechanism for older versions
     * of delivery-calculator.js.
     *
     * If the calculator updates #total-delivery-display,
     * checkout can detect the amount.
     */

    function readDeliveryFromDOM() {

        const deliveryElement =
            document.getElementById(
                'total-delivery-display'
            );


        if (!deliveryElement) {

            return null;

        }


        const raw =
            deliveryElement.textContent
                .replace(/[^\d.,-]/g, '')
                .replace(/,/g, '');


        const amount =
            parseFloat(raw);


        if (
            !Number.isFinite(amount) ||
            amount < 0
        ) {

            return null;

        }


        /*
         * R0.00 means the calculator has probably not
         * been calculated yet.
         */

        if (amount === 0) {

            return null;

        }


        return {

            total: amount,

            distanceKm:
                Number(
                    document.getElementById(
                        'distance-km'
                    )?.value
                ) || 0

        };

    }


    /* ==========================================================================
       16. DELIVERY RESULT OBSERVER
       ========================================================================== */

    function observeDeliveryResults() {

        const resultElement =
            document.getElementById(
                'delivery-result'
            );


        if (!resultElement) {

            return;

        }


        const observer =
            new MutationObserver(() => {

                const deliveryData =
                    readDeliveryFromDOM();


                if (deliveryData) {

                    applyDeliveryResult(
                        deliveryData
                    );

                }

            });


        observer.observe(
            resultElement,
            {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: true
            }
        );

    }


    observeDeliveryResults();


    /* ==========================================================================
       17. DELIVERY BUTTON COMPATIBILITY
       ========================================================================== */

    /*
     * We deliberately DO NOT calculate a random distance.
     *
     * The old checkout.js contained code such as:
     *
     *     Math.random()
     *
     * That has been completely removed.
     *
     * Delivery must always come from the real calculator.
     */


    if (
        calculateDeliveryBtn &&
        addressInput
    ) {

        calculateDeliveryBtn.addEventListener(
            'click',
            () => {

                const address =
                    addressInput.value.trim();


                if (address.length < 5) {

                    alert(
                        'Please enter your complete delivery address.'
                    );

                    return;

                }


                /*
                 * If the shared calculator exists,
                 * trigger it.
                 */

                if (
                    typeof window.calculateDeliveryByAddress ===
                    'function'
                ) {

                    calculateDeliveryBtn.disabled =
                        true;


                    const originalText =
                        calculateDeliveryBtn.innerHTML;


                    calculateDeliveryBtn.innerHTML =
                        '<i class="fa-solid fa-spinner fa-spin"></i> Calculating...';


                    /*
                     * Allow the shared calculator to perform
                     * the actual API request.
                     */

                    Promise.resolve(
                        window.calculateDeliveryByAddress()
                    )
                    .finally(() => {

                        setTimeout(() => {

                            calculateDeliveryBtn.disabled =
                                false;

                            calculateDeliveryBtn.innerHTML =
                                originalText;

                        }, 500);

                    });


                } else {

                    alert(
                        'The delivery calculator is not loaded. Please refresh the page and try again.'
                    );

                    console.error(
                        'delivery-calculator.js is missing or loaded after checkout.js'
                    );

                }

            }
        );

    }


    /* ==========================================================================
       18. MANUAL DELIVERY SYNC
       ========================================================================== */

    /*
     * Some pages use the regional selector directly.
     *
     * When it changes, wait briefly for the shared calculator
     * to update its result, then synchronise checkout.
     */

    const regionSelector =
        document.getElementById(
            'delivery-region'
        );


    if (regionSelector) {

        regionSelector.addEventListener(
            'change',
            () => {

                setTimeout(() => {

                    const deliveryData =
                        getDeliveryCalculatorResult();


                    if (deliveryData) {

                        applyDeliveryResult(
                            deliveryData
                        );

                    } else {

                        const domResult =
                            readDeliveryFromDOM();


                        if (domResult) {

                            applyDeliveryResult(
                                domResult
                            );

                        }

                    }

                }, 100);

            }
        );

    }


    /* ==========================================================================
       19. ADDRESS CHANGE RESET
       ========================================================================== */

    if (addressInput) {

        addressInput.addEventListener(
            'input',
            () => {

                /*
                 * Changing the address invalidates the previous
                 * delivery quote.
                 */

                checkoutState.deliveryCalculated =
                    false;


                checkoutState.deliveryFee =
                    0;


                checkoutState.distanceKm =
                    0;


                updateFinancials();

            }
        );

    }


    /* ==========================================================================
       20. DELIVERY STATUS HELPER
       ========================================================================== */

    function isDeliveryReady() {

        return (
            checkoutState.deliveryCalculated === true &&
            Number(
                checkoutState.deliveryFee
            ) >= 0
        );

    }


    window.nexpakDeliveryReady =
        isDeliveryReady;


    /* ==========================================================================
       21. CUSTOMER DETAILS
       ========================================================================== */

    function getCustomerDetails() {

        const nameInput =
            document.getElementById(
                'custName'
            );


        const emailInput =
            document.getElementById(
                'custEmail'
            );


        const phoneInput =
            document.getElementById(
                'custPhone'
            );


        const shippingInput =
            document.getElementById(
                'shippingAddress'
            );


        /*
         * Some of your pages use capitalised IDs.
         * Support both versions.
         */

        const name =
            nameInput?.value?.trim() ||
            document.getElementById(
                'CustName'
            )?.value?.trim() ||
            '';


        const email =
            emailInput?.value?.trim() ||
            document.getElementById(
                'CustEmail'
            )?.value?.trim() ||
            '';


        const phone =
            phoneInput?.value?.trim() ||
            document.getElementById(
                'CustPhone'
            )?.value?.trim() ||
            '';


        const address =
            shippingInput?.value?.trim() ||
            document.getElementById(
                'delivery-address'
            )?.value?.trim() ||
            '';


        return {

            name,

            email,

            phone,

            address

        };

    }


    /* ==========================================================================
       22. CUSTOMER VALIDATION
       ========================================================================== */

    function validateCustomer() {

        const customer =
            getCustomerDetails();


        if (!customer.name) {

            alert(
                'Please enter your full name.'
            );

            return false;

        }


        if (!customer.email) {

            alert(
                'Please enter your email address.'
            );

            return false;

        }


        /*
         * Basic email validation.
         */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(
                customer.email
            )
        ) {

            alert(
                'Please enter a valid email address.'
            );

            return false;

        }


        if (!customer.phone) {

            alert(
                'Please enter your phone number.'
            );

            return false;

        }


        checkoutState.customer =
            customer;


        return true;

    }


    /* ==========================================================================
       23. PAYMENT METHOD
       ========================================================================== */

    paymentRadios.forEach(
        radio => {

            radio.addEventListener(
                'change',
                event => {

                    checkoutState.paymentMethod =
                        event.target.value;


                    if (
                        checkoutState.paymentMethod ===
                        'eft'
                    ) {

                        if (eftDetailsPanel) {

                            eftDetailsPanel.style.display =
                                'block';

                        }

                    } else {

                        if (eftDetailsPanel) {

                            eftDetailsPanel.style.display =
                                'none';

                        }

                    }


                    document.dispatchEvent(
                        new CustomEvent(
                            'nexpakPaymentMethodChanged',
                            {
                                detail: {
                                    method:
                                        checkoutState.paymentMethod
                                }
                            }
                        )
                    );

                }
            );

        }
    );


    /* ==========================================================================
       24. INITIAL PAYMENT METHOD
       ========================================================================== */

    const selectedPayment =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    if (selectedPayment) {

        checkoutState.paymentMethod =
            selectedPayment.value;

    }


    if (
        checkoutState.paymentMethod === 'eft' &&
        eftDetailsPanel
    ) {

        eftDetailsPanel.style.display =
            'block';

    }


    /* ==========================================================================
       END OF PART 2
       ========================================================================== */

    /* ==========================================================================
       25. ORDER PAYLOAD
       ========================================================================== */

    function buildOrderPayload() {

        const customer =
            checkoutState.customer;


        if (!checkoutState.orderReference) {

            checkoutState.orderReference =
                generateOrderReference();

        }


        const payload = {

            reference:
                checkoutState.orderReference,

            customer: {

                name:
                    customer.name,

                email:
                    customer.email,

                phone:
                    customer.phone,

                address:
                    customer.address

            },

            amount:
                Number(
                    checkoutState.grandTotal
                ).toFixed(2),

            subtotal:
                Number(
                    checkoutState.subtotalExclVat
                ).toFixed(2),

            delivery:
                Number(
                    checkoutState.deliveryFee
                ).toFixed(2),

            vat:
                Number(
                    checkoutState.vatAmount
                ).toFixed(2),

            weight:
                Number(
                    checkoutState.totalWeightKg
                ).toFixed(2),

            distance:
                Number(
                    checkoutState.distanceKm
                ).toFixed(2),

            paymentMethod:
                checkoutState.paymentMethod,

            cart:
                checkoutState.cart,

            createdAt:
                new Date().toISOString()

        };


        return payload;

    }


    /* ==========================================================================
       26. SAVE PENDING ORDER
       ========================================================================== */

    function savePendingOrder(payload) {

        try {

            const pendingOrders =
                JSON.parse(
                    localStorage.getItem(
                        'nexpak_pending_orders'
                    )
                ) || [];


            pendingOrders.push(
                payload
            );


            /*
             * Keep the browser storage manageable.
             *
             * Only retain the latest 20 pending orders.
             */

            const limitedOrders =
                pendingOrders.slice(-20);


            localStorage.setItem(
                'nexpak_pending_orders',
                JSON.stringify(
                    limitedOrders
                )
            );


            localStorage.setItem(
                'nexpak_current_order',
                JSON.stringify(
                    payload
                )
            );


            console.log(
                'Pending order saved:',
                payload.reference
            );


            return true;

        } catch (error) {

            console.error(
                'Could not save pending order:',
                error
            );


            return false;

        }

    }


    /* ==========================================================================
       27. PAYFAST ROUTING
       ========================================================================== */

    function processPayFastPayment(
        payload
    ) {

        console.log(
            'Starting PayFast payment:',
            payload.reference
        );


        /*
         * IMPORTANT:
         *
         * payments.js owns the PayFast credentials and
         * PayFast configuration.
         *
         * We therefore DO NOT put:
         *
         * merchant_id
         * merchant_key
         * passphrase
         *
         * inside checkout.js.
         *
         * This prevents multiple PayFast configurations
         * from fighting each other.
         */


        /*
         * Preferred integration:
         *
         * payments.js exposes:
         *
         * window.PayFast.checkout(...)
         */

        if (
            window.PayFast &&
            typeof window.PayFast.checkout ===
            'function'
        ) {

            try {

                window.PayFast.checkout(

                    checkoutState.grandTotal,

                    checkoutState.cart,

                    payload.customer.email,

                    payload.customer.name

                );


                return true;

            } catch (error) {

                console.error(
                    'PayFast checkout error:',
                    error
                );


                alert(
                    'We could not start the PayFast payment. Please try again.'
                );


                return false;

            }

        }


        /*
         * Compatibility with the older function name
         * used in payments.js.
         */

        if (
            typeof window.payWithPayFastCheckout ===
            'function'
        ) {

            try {

                window.payWithPayFastCheckout(

                    checkoutState.grandTotal,

                    checkoutState.cart,

                    payload.customer.email,

                    payload.customer.name

                );


                return true;

            } catch (error) {

                console.error(
                    'PayFast payment error:',
                    error
                );


                alert(
                    'We could not start the PayFast payment. Please try again.'
                );


                return false;

            }

        }


        /*
         * Another compatibility option.
         */

        if (
            typeof window.initPayFastPayment ===
            'function'
        ) {

            try {

                const itemNames =
                    checkoutState.cart
                        .map(
                            item =>
                                item.name ||
                                item.baseKit?.name ||
                                item.product?.name ||
                                'Security Product'
                        )
                        .join(', ');


                const description =
                    `${checkoutState.cart.length} item(s): ${itemNames}`;


                window.initPayFastPayment(

                    checkoutState.grandTotal,

                    'Nexpak Security Solutions Order',

                    description,

                    payload.customer.email,

                    payload.customer.name

                );


                return true;

            } catch (error) {

                console.error(
                    'PayFast initialization error:',
                    error
                );


                alert(
                    'We could not start the PayFast payment. Please try again.'
                );


                return false;

            }

        }


        /*
         * No PayFast integration was found.
         */

        console.error(
            'PayFast integration not found. Make sure payments.js is loaded before checkout.js.'
        );


        alert(
            'PayFast is currently unavailable. Please refresh the page and try again.'
        );


        return false;

    }


    /* ==========================================================================
       28. MANUAL EFT PROCESSING
       ========================================================================== */

    function processManualEFT(
        payload
    ) {

        console.log(
            'Processing manual EFT order:',
            payload.reference
        );


        /*
         * Save order BEFORE clearing the cart.
         */

        savePendingOrder(
            payload
        );


        /*
         * Store payment status.
         */

        localStorage.setItem(
            'nexpak_payment_status',
            'pending_eft'
        );


        /*
         * Store the reference separately so the
         * confirmation page can retrieve it.
         */

        localStorage.setItem(
            'nexpak_order_reference',
            payload.reference
        );


        /*
         * Do NOT immediately delete the cart before
         * the order has been stored.
         */

        localStorage.removeItem(
            'nexpak_cart'
        );


        /*
         * Dispatch event for any email/invoice module.
         */

        document.dispatchEvent(
            new CustomEvent(
                'nexpakEFTOrderCreated',
                {
                    detail: payload
                }
            )
        );


        /*
         * If an EFT confirmation page exists,
         * use it.
         */

        if (
            document.body.dataset.eftConfirmationUrl
        ) {

            window.location.href =
                document.body.dataset.eftConfirmationUrl;

            return true;

        }


        /*
         * Otherwise use the normal success page.
         */

        window.location.href =
            'success.html?payment=eft&reference=' +
            encodeURIComponent(
                payload.reference
            );


        return true;

    }


    /* ==========================================================================
       29. PAYMENT BUTTON STATE
       ========================================================================== */

    function setCheckoutButtonLoading(
        loading
    ) {

        const button =
            document.getElementById(
                'completeOrderBtn'
            );


        if (!button) {

            return;

        }


        if (loading) {

            button.dataset.originalText =
                button.innerHTML;


            button.disabled =
                true;


            button.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Processing Payment...
            `;


        } else {

            button.disabled =
                false;


            if (
                button.dataset.originalText
            ) {

                button.innerHTML =
                    button.dataset.originalText;

            }

        }

    }


    /* ==========================================================================
       30. PAYMENT METHOD DETECTION
       ========================================================================== */

    function getSelectedPaymentMethod() {

        const selected =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            );


        if (selected) {

            return selected.value;

        }


        /*
         * Default to PayFast.
         */

        return 'payfast';

    }


    /* ==========================================================================
       31. CHECKOUT VALIDATION
       ========================================================================== */

    function validateCheckout() {

        /*
         * Customer validation.
         */

        if (
            !validateCustomer()
        ) {

            return false;

        }


        /*
         * Delivery must be calculated.
         */

        if (
            !checkoutState.deliveryCalculated
        ) {

            /*
             * Try one final read from the shared calculator.
             */

            const deliveryData =
                getDeliveryCalculatorResult();


            if (deliveryData) {

                applyDeliveryResult(
                    deliveryData
                );

            } else {

                const domDelivery =
                    readDeliveryFromDOM();


                if (domDelivery) {

                    applyDeliveryResult(
                        domDelivery
                    );

                }

            }

        }


        if (
            !checkoutState.deliveryCalculated
        ) {

            alert(
                'Please calculate your delivery cost before checking out.'
            );


            const deliveryInput =
                document.getElementById(
                    'delivery-address'
                );


            if (deliveryInput) {

                deliveryInput.focus();

            }


            return false;

        }


        /*
         * Make sure the cart still contains products.
         */

        if (
            !Array.isArray(
                checkoutState.cart
            ) ||
            checkoutState.cart.length === 0
        ) {

            alert(
                'Your cart is empty.'
            );


            return false;

        }


        /*
         * Make sure the final amount is valid.
         */

        if (
            !Number.isFinite(
                checkoutState.grandTotal
            ) ||
            checkoutState.grandTotal <= 0
        ) {

            alert(
                'The order total is invalid. Please refresh the page and try again.'
            );


            return false;

        }


        return true;

    }


    /* ==========================================================================
       32. MAIN CHECKOUT PROCESS
       ========================================================================== */

    function processCheckout() {

        /*
         * Prevent double-clicks.
         */

        if (
            checkoutForm?.dataset.processing ===
            'true'
        ) {

            return;

        }


        if (checkoutForm) {

            checkoutForm.dataset.processing =
                'true';

        }


        /*
         * Validate everything.
         */

        if (
            !validateCheckout()
        ) {

            if (checkoutForm) {

                checkoutForm.dataset.processing =
                    'false';

            }


            return;

        }


        /*
         * Get payment method.
         */

        checkoutState.paymentMethod =
            getSelectedPaymentMethod();


        /*
         * Generate the order payload.
         */

        const payload =
            buildOrderPayload();


        /*
         * Save before redirecting to PayFast.
         */

        savePendingOrder(
            payload
        );


        /*
         * Save the order reference.
         */

        localStorage.setItem(
            'nexpak_order_reference',
            payload.reference
        );


        localStorage.setItem(
            'nexpak_payment_status',
            'awaiting_payment'
        );


        console.log(
            'Checkout payload:',
            payload
        );


        setCheckoutButtonLoading(
            true
        );


        /* ======================================================================
           PAYFAST
           ====================================================================== */

        if (
            checkoutState.paymentMethod ===
            'payfast'
        ) {

            const started =
                processPayFastPayment(
                    payload
                );


            if (!started) {

                setCheckoutButtonLoading(
                    false
                );


                if (checkoutForm) {

                    checkoutForm.dataset.processing =
                        'false';

                }

            }


            return;

        }


        /* ======================================================================
           MANUAL EFT
           ====================================================================== */

        if (
            checkoutState.paymentMethod ===
            'eft'
        ) {

            processManualEFT(
                payload
            );


            return;

        }


        /*
         * Unknown payment method.
         */

        alert(
            'Please select a valid payment method.'
        );


        setCheckoutButtonLoading(
            false
        );


        if (checkoutForm) {

            checkoutForm.dataset.processing =
                'false';

        }

    }


    /* ==========================================================================
       33. FORM SUBMISSION
       ========================================================================== */

    if (checkoutForm) {

        checkoutForm.addEventListener(
            'submit',
            event => {

                event.preventDefault();

                processCheckout();

            }
        );

    }


    /* ==========================================================================
       34. STANDALONE CHECKOUT BUTTON
       ========================================================================== */

    const completeOrderBtn =
        document.getElementById(
            'completeOrderBtn'
        );


    if (
        completeOrderBtn &&
        !checkoutForm
    ) {

        completeOrderBtn.addEventListener(
            'click',
            event => {

                event.preventDefault();

                processCheckout();

            }
        );

    }


    /* ==========================================================================
       END OF PART 3
       ========================================================================== */
/* ==========================================================================
   Nexpak Security Solutions
   DELIVERY CALCULATOR
   PART 4 — FINAL SECTION
   ========================================================================== */


/* ==========================================================================
   13. DELIVERY RESULT DISPLAY
   ========================================================================== */

function displayDeliveryResult(baseFee, distanceFee, weightFee, total) {

    const baseEl =
        document.getElementById('base-fee-display');

    const distanceEl =
        document.getElementById('distance-fee-display');

    const weightEl =
        document.getElementById('weight-fee-display');

    const totalEl =
        document.getElementById('total-delivery-display');

    const resultEl =
        document.getElementById('delivery-result');

    if (baseEl) {
        baseEl.textContent =
            formatCurrency(baseFee);
    }

    if (distanceEl) {
        distanceEl.textContent =
            formatCurrency(distanceFee);
    }

    if (weightEl) {
        weightEl.textContent =
            formatCurrency(weightFee);
    }

    if (totalEl) {
        totalEl.textContent =
            formatCurrency(total);
    }

    if (resultEl) {
        resultEl.style.display =
            'block';
    }

    /*
     * Also expose the calculated delivery amount
     * globally so checkout.js / configurator.js
     * can use the exact same value.
     */

    window.NexpakDelivery = window.NexpakDelivery || {};

    window.NexpakDelivery.deliveryFee =
        Number(total) || 0;

    window.NexpakDelivery.baseFee =
        Number(baseFee) || 0;

    window.NexpakDelivery.distanceFee =
        Number(distanceFee) || 0;

    window.NexpakDelivery.weightFee =
        Number(weightFee) || 0;

    /*
     * Notify other modules that delivery
     * has been calculated.
     */

    document.dispatchEvent(
        new CustomEvent('nexpakDeliveryCalculated', {
            detail: {
                baseFee: Number(baseFee) || 0,
                distanceFee: Number(distanceFee) || 0,
                weightFee: Number(weightFee) || 0,
                total: Number(total) || 0
            }
        })
    );
}


/* ==========================================================================
   14. CURRENCY FORMATTER
   ========================================================================== */

function formatCurrency(amount) {

    const value =
        Number(amount) || 0;

    return 'R' +
        value.toFixed(2);
}


/* ==========================================================================
   15. DELIVERY FEE ACCESS
   ========================================================================== */

function getDeliveryFee() {

    if (
        window.NexpakDelivery &&
        typeof window.NexpakDelivery.deliveryFee === 'number'
    ) {

        return window.NexpakDelivery.deliveryFee;

    }

    return 0;
}


/* ==========================================================================
   16. DELIVERY CALCULATION STATE
   ========================================================================== */

function getDeliveryState() {

    const state =
        window.NexpakDelivery || {};

    return {

        deliveryFee:
            Number(state.deliveryFee) || 0,

        baseFee:
            Number(state.baseFee) || 0,

        distanceFee:
            Number(state.distanceFee) || 0,

        weightFee:
            Number(state.weightFee) || 0,

        distanceKm:
            Number(state.distanceKm) || 0,

        weightKg:
            Number(state.weightKg) || 0,

        method:
            state.method || null,

        address:
            state.address || '',

        region:
            state.region || ''

    };
}


/* ==========================================================================
   17. SAVE DELIVERY STATE
   ========================================================================== */

function saveDeliveryState(data) {

    window.NexpakDelivery =
        window.NexpakDelivery || {};

    if (
        typeof data.deliveryFee !== 'undefined'
    ) {

        window.NexpakDelivery.deliveryFee =
            Number(data.deliveryFee) || 0;

    }

    if (
        typeof data.baseFee !== 'undefined'
    ) {

        window.NexpakDelivery.baseFee =
            Number(data.baseFee) || 0;

    }

    if (
        typeof data.distanceFee !== 'undefined'
    ) {

        window.NexpakDelivery.distanceFee =
            Number(data.distanceFee) || 0;

    }

    if (
        typeof data.weightFee !== 'undefined'
    ) {

        window.NexpakDelivery.weightFee =
            Number(data.weightFee) || 0;

    }

    if (
        typeof data.distanceKm !== 'undefined'
    ) {

        window.NexpakDelivery.distanceKm =
            Number(data.distanceKm) || 0;

    }

    if (
        typeof data.weightKg !== 'undefined'
    ) {

        window.NexpakDelivery.weightKg =
            Number(data.weightKg) || 0;

    }

    if (
        typeof data.method !== 'undefined'
    ) {

        window.NexpakDelivery.method =
            data.method;

    }

    if (
        typeof data.address !== 'undefined'
    ) {

        window.NexpakDelivery.address =
            data.address;

    }

    if (
        typeof data.region !== 'undefined'
    ) {

        window.NexpakDelivery.region =
            data.region;

    }
}


/* ==========================================================================
   18. CONFIGURATOR INTEGRATION
   ========================================================================== */

function getConfiguratorWeight() {

    /*
     * First try the global configurator weight.
     */

    if (
        window.NexpakConfigurator &&
        typeof window.NexpakConfigurator.totalWeight === 'number'
    ) {

        return Number(
            window.NexpakConfigurator.totalWeight
        );

    }


    /*
     * Try common configurator properties.
     */

    if (
        window.configurator &&
        typeof window.configurator.totalWeight === 'number'
    ) {

        return Number(
            window.configurator.totalWeight
        );

    }


    /*
     * Try DOM-based weight values.
     */

    const selectors = [
        '#totalWeight',
        '#total-weight',
        '#systemWeight',
        '#system-weight',
        '.total-weight',
        '.system-weight',
        '[data-total-weight]'
    ];

    for (
        let i = 0;
        i < selectors.length;
        i++
    ) {

        const element =
            document.querySelector(
                selectors[i]
            );

        if (!element) {
            continue;
        }

        const value =
            parseFloat(
                element.textContent ||
                element.value ||
                element.dataset.totalWeight ||
                '0'
            );

        if (!isNaN(value) && value > 0) {
            return value;
        }

    }

    return 0;
}


/* ==========================================================================
   19. CONFIGURATOR DELIVERY CALCULATION
   ========================================================================== */

function calculateConfiguratorDelivery() {

    const weight =
        getConfiguratorWeight();

    const distanceInput =
        document.getElementById(
            'distance-km'
        );

    const distance =
        distanceInput
            ? parseFloat(distanceInput.value) || 0
            : 0;

    const baseFee =
        Number(
            DELIVERY_CONFIG.baseFee
        ) || 0;

    const perKm =
        Number(
            DELIVERY_CONFIG.perKm
        ) || 0;

    const perKg =
        Number(
            DELIVERY_CONFIG.perKg
        ) || 0;

    const distanceFee =
        distance * perKm;

    const weightFee =
        weight * perKg;

    const total =
        baseFee +
        distanceFee +
        weightFee;


    saveDeliveryState({

        deliveryFee: total,

        baseFee: baseFee,

        distanceFee: distanceFee,

        weightFee: weightFee,

        distanceKm: distance,

        weightKg: weight,

        method: 'configurator'

    });


    displayDeliveryResult(
        baseFee,
        distanceFee,
        weightFee,
        total
    );


    return total;
}


/* ==========================================================================
   20. CART / CONFIGURATOR CHANGE LISTENER
   ========================================================================== */

document.addEventListener(
    'cartUpdated',
    function () {

        updateDeliveryWeightDisplay();

    }
);


document.addEventListener(
    'configuratorUpdated',
    function () {

        updateDeliveryWeightDisplay();

    }
);


document.addEventListener(
    'systemUpdated',
    function () {

        updateDeliveryWeightDisplay();

    }
);


/* ==========================================================================
   21. UPDATE WEIGHT DISPLAY
   ========================================================================== */

function updateDeliveryWeightDisplay() {

    const weight =
        getCartWeight();

    const configuratorWeight =
        getConfiguratorWeight();

    const finalWeight =
        configuratorWeight > 0
            ? configuratorWeight
            : weight;


    const weightElements = [
        '#cart-weight',
        '#totalWeight',
        '#total-weight',
        '#systemWeight',
        '#system-weight',
        '.cart-total-weight',
        '.total-weight',
        '.system-weight'
    ];


    weightElements.forEach(
        function (selector) {

            const element =
                document.querySelector(
                    selector
                );

            if (!element) {
                return;
            }

            /*
             * Do not overwrite inputs.
             */

            if (
                element.tagName === 'INPUT'
            ) {
                return;
            }

            element.textContent =
                finalWeight.toFixed(2) +
                ' kg';

        }
    );


    const eqWeight =
        document.getElementById(
            'eq-cart-weight'
        );

    if (eqWeight) {

        eqWeight.textContent =
            finalWeight.toFixed(2);

    }


    saveDeliveryState({

        weightKg: finalWeight

    });
}


/* ==========================================================================
   22. PUBLIC API
   ========================================================================== */

window.NexpakDeliveryCalculator = {

    calculateByAddress:
        calculateDeliveryByAddress,

    calculateManual:
        calculateDeliveryManual,

    calculateRegion:
        calculateDeliveryRegion,

    calculateConfigurator:
        calculateConfiguratorDelivery,

    getCartWeight:
        getCartWeight,

    getConfiguratorWeight:
        getConfiguratorWeight,

    getDeliveryFee:
        getDeliveryFee,

    getState:
        getDeliveryState,

    saveState:
        saveDeliveryState,

    updateWeight:
        updateDeliveryWeightDisplay

};


/* ==========================================================================
   23. BACKWARD COMPATIBILITY
   ========================================================================== */

window.getNexpakDeliveryFee =
    getDeliveryFee;


window.getNexpakDeliveryState =
    getDeliveryState;


/* ==========================================================================
   24. INITIALIZATION
   ========================================================================== */

function initializeNexpakDelivery() {

    /*
     * Prevent duplicate initialization.
     */

    if (
        window.NexpakDelivery &&
        window.NexpakDelivery.initialized
    ) {

        updateDeliveryWeightDisplay();

        return;

    }


    window.NexpakDelivery =
        window.NexpakDelivery || {};

    window.NexpakDelivery.initialized =
        true;


    /*
     * Initialize calculator UI.
     */

    initDeliveryCalculator();


    /*
     * Update current cart/configurator
     * weight.
     */

    setTimeout(
        function () {

            updateDeliveryWeightDisplay();

        },
        100
    );


    console.log(
        'Nexpak Delivery Calculator initialized'
    );

}


/* ==========================================================================
   25. DOM READY
   ========================================================================== */

if (
    document.readyState === 'loading'
) {

    document.addEventListener(
        'DOMContentLoaded',
        initializeNexpakDelivery
    );

} else {

    initializeNexpakDelivery();

}




/* ==========================================================================
   END OF NEXPAK DELIVERY CALCULATOR
   ========================================================================== */
