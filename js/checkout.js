/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   Checkout & Payment Routing
   checkout.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    'use strict';

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
