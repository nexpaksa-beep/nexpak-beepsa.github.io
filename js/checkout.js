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
