/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   PayFast Payment Integration
   payments.js
   ==========================================================================

   IMPORTANT:
   - No PayFast passphrase is stored in this browser file.
   - No client-side MD5 signature generation.
   - Live PayFast signing must happen on the secure server/Vercel API.
   - checkout.js calls window.PayFast.checkout(...)
   ========================================================================== */

'use strict';

console.log('Nexpak PayFast Payments initialized');


/* ==========================================================================
   1. PAYFAST CONFIGURATION
   ========================================================================== */

const PAYFAST_CONFIG = {

    mode: 'live',

    /*
     * PayFast payment endpoint.
     *
     * LIVE:
     * https://www.payfast.co.za/eng/process
     *
     * SANDBOX:
     * https://sandbox.payfast.co.za/eng/process
     */
    urls: {
        live: 'https://www.payfast.co.za/eng/process',
        sandbox: 'https://sandbox.payfast.co.za/eng/process'
    },

    /*
     * Your PayFast merchant ID.
     *
     * The merchant credentials themselves should ultimately be
     * controlled by the server-side payment endpoint.
     */
    merchantId: '36692313',

    /*
     * Secure server endpoint.
     *
     * This endpoint is responsible for:
     *
     * 1. Receiving the order
     * 2. Creating the PayFast payment request
     * 3. Generating the secure PayFast signature
     * 4. Returning the payment information
     *
     * We will create this endpoint on Vercel separately.
     */
    paymentApi: '/api/payfast/create-payment',

    /*
     * Return locations.
     */
    returnUrl:
        window.location.origin + '/checkout.html?status=success',

    cancelUrl:
        window.location.origin + '/checkout.html?status=cancelled',

    notifyUrl:
        window.location.origin + '/api/payfast/notify'
};


/* ==========================================================================
   2. PAYMENT STATE
   ========================================================================== */

const PAYFAST_STATE = {

    processing: false,

    currentOrderId: null,

    currentAmount: 0,

    currentCustomerEmail: null,

    currentCustomerName: null
};


/* ==========================================================================
   3. GENERATE ORDER REFERENCE
   ========================================================================== */

function generatePayFastOrderId() {

    const timestamp = Date.now();

    const randomPart =
        Math.random()
            .toString(36)
            .substring(2, 10)
            .toUpperCase();

    return `NXP-${timestamp}-${randomPart}`;
}


/* ==========================================================================
   4. NORMALISE CUSTOMER NAME
   ========================================================================== */

function getCustomerNameParts(customerName) {

    const name =
        String(customerName || '')
            .trim()
            .replace(/\s+/g, ' ');

    if (!name) {

        return {
            firstName: 'Nexpak',
            lastName: 'Customer'
        };
    }

    const parts = name.split(' ');

    const firstName = parts.shift();

    const lastName =
        parts.length > 0
            ? parts.join(' ')
            : 'Customer';

    return {
        firstName,
        lastName
    };
}


/* ==========================================================================
   5. VALIDATE PAYMENT DATA
   ========================================================================== */

function validatePayFastCheckoutData(
    amount,
    items,
    customerEmail,
    customerName
) {

    const errors = [];

    const numericAmount =
        Number(amount);

    if (
        !Number.isFinite(numericAmount) ||
        numericAmount <= 0
    ) {

        errors.push(
            'Invalid payment amount.'
        );
    }

    if (
        !Array.isArray(items) ||
        items.length === 0
    ) {

        errors.push(
            'Your cart is empty.'
        );
    }

    if (
        !customerEmail ||
        !String(customerEmail).includes('@')
    ) {

        errors.push(
            'A valid email address is required.'
        );
    }

    if (
        !customerName ||
        String(customerName).trim().length < 2
    ) {

        errors.push(
            'Customer name is required.'
        );
    }

    return errors;
}


/* ==========================================================================
   6. SHOW PAYMENT LOADING
   ========================================================================== */

function showPaymentLoading() {

    hidePaymentLoading();

    const loading = document.createElement('div');

    loading.id = 'payment-loading';

    loading.innerHTML = `
        <div class="payment-loading-overlay">

            <div class="payment-loading-box">

                <div class="payment-spinner"></div>

                <h2>
                    Secure Payment
                </h2>

                <p>
                    Connecting you to PayFast...
                </p>

                <small>
                    Please wait. Do not close this window.
                </small>

            </div>

        </div>
    `;

    document.body.appendChild(loading);

    addPaymentLoadingStyles();
}


/* ==========================================================================
   7. HIDE PAYMENT LOADING
   ========================================================================== */

function hidePaymentLoading() {

    const loading =
        document.getElementById('payment-loading');

    if (loading) {

        loading.remove();
    }
}


/* ==========================================================================
   8. PAYMENT LOADING STYLES
   ========================================================================== */

function addPaymentLoadingStyles() {

    if (
        document.getElementById(
            'nexpak-payment-loading-styles'
        )
    ) {

        return;
    }

    const style =
        document.createElement('style');

    style.id =
        'nexpak-payment-loading-styles';

    style.textContent = `

        .payment-loading-overlay {

            position: fixed;

            inset: 0;

            width: 100%;
            height: 100%;

            background:
                rgba(0, 0, 0, 0.78);

            display: flex;

            align-items: center;

            justify-content: center;

            z-index: 999999;

            padding: 20px;

        }

        .payment-loading-box {

            width: 100%;

            max-width: 420px;

            background: #ffffff;

            border-radius: 18px;

            padding: 40px 30px;

            text-align: center;

            box-shadow:
                0 20px 60px
                rgba(0, 0, 0, 0.3);

        }

        .payment-loading-box h2 {

            margin:
                20px 0 8px;

            color: #123d2a;

        }

        .payment-loading-box p {

            margin: 0 0 10px;

            color: #555;

        }

        .payment-loading-box small {

            color: #888;

        }

        .payment-spinner {

            width: 58px;

            height: 58px;

            margin: 0 auto;

            border:
                4px solid #e5e5e5;

            border-top-color:
                #123d2a;

            border-radius: 50%;

            animation:
                nexpaksPaymentSpin
                0.8s linear infinite;

        }

        @keyframes nexpaksPaymentSpin {

            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }

        }

    `;

    document.head.appendChild(style);
}


/* ==========================================================================
   9. BUILD PAYMENT REQUEST
   ========================================================================== */

function buildPayFastRequest(
    amount,
    items,
    customerEmail,
    customerName
) {

    const nameParts =
        getCustomerNameParts(customerName);

    const orderId =
        generatePayFastOrderId();

    const itemNames =
        items
            .map(item => {

                return item.name ||
                    item.productName ||
                    'Security Product';

            })
            .join(', ');

    const description =
        `${items.length} item(s): ${itemNames}`;

    return {

        orderId,

        amount:
            Number(amount).toFixed(2),

        customer: {

            name:
                String(customerName).trim(),

            firstName:
                nameParts.firstName,

            lastName:
                nameParts.lastName,

            email:
                String(customerEmail).trim()

        },

        items,

        itemName:
            'Nexpak Security Solutions Order',

        itemDescription:
            description,

        returnUrl:
            PAYFAST_CONFIG.returnUrl,

        cancelUrl:
            PAYFAST_CONFIG.cancelUrl,

        notifyUrl:
            PAYFAST_CONFIG.notifyUrl

    };
}


/* ==========================================================================
   10. SEND PAYMENT REQUEST TO SECURE SERVER
   ========================================================================== */

async function requestPayFastPayment(
    paymentRequest
) {

    const response =
        await fetch(
            PAYFAST_CONFIG.paymentApi,
            {

                method: 'POST',

                headers: {

                    'Content-Type':
                        'application/json',

                    'Accept':
                        'application/json'

                },

                body:
                    JSON.stringify(
                        paymentRequest
                    )

            }
        );

    let data;

    try {

        data =
            await response.json();

    } catch (error) {

        throw new Error(
            'The payment server returned an invalid response.'
        );
    }

    if (!response.ok) {

        throw new Error(
            data.message ||
            'Unable to create PayFast payment.'
        );
    }

    if (!data.success) {

        throw new Error(
            data.message ||
            'PayFast payment could not be created.'
        );
    }

    return data;
}


/* ==========================================================================
   END OF PART 1
   ========================================================================== */
