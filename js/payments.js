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
/* ==========================================================================
   11. SUBMIT PAYFAST PAYMENT FORM
   ========================================================================== */

/*
 * The secure Vercel API will return the PayFast fields required for the
 * transaction. This function creates the POST form and sends the customer
 * to PayFast.
 *
 * We deliberately do NOT generate the PayFast signature in this browser
 * file.
 */

function submitPayFastForm(paymentData) {

    if (!paymentData) {

        throw new Error(
            'No PayFast payment data was received.'
        );
    }

    /*
     * Accept either:
     *
     * {
     *     fields: {...}
     * }
     *
     * or directly:
     *
     * {
     *     merchant_id: "...",
     *     signature: "..."
     * }
     *
     * This makes the frontend tolerant of the server response structure.
     */

    const fields =
        paymentData.fields ||
        paymentData;

    const payfastUrl =
        fields.payfast_url ||
        PAYFAST_CONFIG.urls[
            PAYFAST_CONFIG.mode
        ];

    if (!payfastUrl) {

        throw new Error(
            'PayFast payment URL is missing.'
        );
    }


    /*
     * Remove an existing payment form.
     */

    const existingForm =
        document.getElementById(
            'nexpak-payfast-form'
        );

    if (existingForm) {

        existingForm.remove();
    }


    /*
     * Create PayFast POST form.
     */

    const form =
        document.createElement('form');

    form.id =
        'nexpak-payfast-form';

    form.method =
        'POST';

    form.action =
        payfastUrl;

    form.style.display =
        'none';


    /*
     * Add all server-generated PayFast fields.
     */

    Object.keys(fields).forEach(key => {

        /*
         * payfast_url is used by our frontend and is NOT itself a
         * PayFast form parameter.
         */

        if (key === 'payfast_url') {

            return;
        }

        const value =
            fields[key];

        /*
         * Ignore undefined/null values.
         */

        if (
            value === undefined ||
            value === null
        ) {

            return;
        }

        const input =
            document.createElement('input');

        input.type =
            'hidden';

        input.name =
            key;

        input.value =
            String(value);

        form.appendChild(input);

    });


    /*
     * Make sure the form actually contains the required merchant ID.
     */

    if (
        !form.querySelector(
            'input[name="merchant_id"]'
        )
    ) {

        throw new Error(
            'PayFast merchant information is missing.'
        );
    }


    /*
     * Make sure a signature was supplied by the secure server.
     */

    if (
        !form.querySelector(
            'input[name="signature"]'
        )
    ) {

        throw new Error(
            'PayFast security signature is missing.'
        );
    }


    document.body.appendChild(form);


    /*
     * Give the loading screen a moment to render before redirecting.
     */

    setTimeout(() => {

        form.submit();

    }, 500);
}


/* ==========================================================================
   12. MAIN PAYFAST CHECKOUT FUNCTION
   ========================================================================== */

/*
 * This is the function that checkout.js calls:
 *
 * window.PayFast.checkout(...)
 *
 * Example:
 *
 * window.PayFast.checkout(
 *     total,
 *     cart,
 *     customerEmail,
 *     customerName
 * );
 */

async function payWithPayFastCheckout(
    total,
    items,
    customerEmail,
    customerName
) {

    /*
     * Prevent accidental double-clicks.
     */

    if (PAYFAST_STATE.processing) {

        console.warn(
            'PayFast payment is already being processed.'
        );

        return;
    }


    /*
     * Validate checkout information.
     */

    const validationErrors =
        validatePayFastCheckoutData(
            total,
            items,
            customerEmail,
            customerName
        );


    if (validationErrors.length > 0) {

        alert(
            validationErrors.join('\n')
        );

        return;
    }


    /*
     * Lock payment process.
     */

    PAYFAST_STATE.processing =
        true;


    /*
     * Store current payment details.
     */

    PAYFAST_STATE.currentAmount =
        Number(total);

    PAYFAST_STATE.currentCustomerEmail =
        String(customerEmail).trim();

    PAYFAST_STATE.currentCustomerName =
        String(customerName).trim();


    /*
     * Create order/payment request.
     */

    const paymentRequest =
        buildPayFastRequest(
            total,
            items,
            customerEmail,
            customerName
        );


    PAYFAST_STATE.currentOrderId =
        paymentRequest.orderId;


    /*
     * Store the order reference locally.
     *
     * This allows the success page to retrieve the reference after
     * returning from PayFast.
     */

    try {

        localStorage.setItem(
            'nexpak_pending_order',
            JSON.stringify({

                orderId:
                    paymentRequest.orderId,

                amount:
                    paymentRequest.amount,

                customerName:
                    paymentRequest.customer.name,

                customerEmail:
                    paymentRequest.customer.email,

                createdAt:
                    Date.now()

            })
        );

    } catch (storageError) {

        console.warn(
            'Could not save pending order:',
            storageError
        );
    }


    /*
     * Display loading screen.
     */

    showPaymentLoading();


    try {

        /*
         * Ask our secure Vercel API to create the PayFast transaction.
         */

        const paymentResponse =
            await requestPayFastPayment(
                paymentRequest
            );


        console.log(
            'PayFast payment created:',
            paymentRequest.orderId
        );


        /*
         * Submit the signed payment to PayFast.
         */

        submitPayFastForm(
            paymentResponse
        );

    } catch (error) {

        console.error(
            'PayFast checkout error:',
            error
        );


        PAYFAST_STATE.processing =
            false;


        hidePaymentLoading();


        alert(
            'We could not connect to PayFast.\n\n' +
            (
                error.message ||
                'Please try again.'
            )
        );

    }

}


/* ==========================================================================
   13. RESET PAYMENT STATE
   ========================================================================== */

function resetPayFastState() {

    PAYFAST_STATE.processing =
        false;

    PAYFAST_STATE.currentOrderId =
        null;

    PAYFAST_STATE.currentAmount =
        0;

    PAYFAST_STATE.currentCustomerEmail =
        null;

    PAYFAST_STATE.currentCustomerName =
        null;

}


/* ==========================================================================
   14. CANCELLED PAYMENT
   ========================================================================== */

function handlePayFastCancelled() {

    resetPayFastState();

    hidePaymentLoading();


    /*
     * Keep the customer's cart intact.
     *
     * They may want to try another payment method.
     */

    console.log(
        'PayFast payment cancelled.'
    );


    const pendingOrder =
        getPendingPayFastOrder();


    if (pendingOrder) {

        console.log(
            'Cancelled order:',
            pendingOrder.orderId
        );
    }

}


/* ==========================================================================
   15. RETRIEVE PENDING ORDER
   ========================================================================== */

function getPendingPayFastOrder() {

    try {

        const stored =
            localStorage.getItem(
                'nexpak_pending_order'
            );

        if (!stored) {

            return null;
        }

        return JSON.parse(
            stored
        );

    } catch (error) {

        console.warn(
            'Could not retrieve pending PayFast order:',
            error
        );

        return null;
    }

}


/* ==========================================================================
   16. CLEAR PENDING ORDER
   ========================================================================== */

function clearPendingPayFastOrder() {

    try {

        localStorage.removeItem(
            'nexpak_pending_order'
        );

    } catch (error) {

        console.warn(
            'Could not clear pending order:',
            error
        );
    }

}


/* ==========================================================================
   17. PAYMENT RETURN STATUS
   ========================================================================== */

function getPayFastReturnStatus() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return {

        status:
            params.get('status'),

        paymentId:
            params.get('m_payment_id'),

        transactionId:
            params.get('pf_payment_id'),

        token:
            params.get('token')

    };

}


/* ==========================================================================
   18. HANDLE SUCCESS RETURN
   ========================================================================== */

function handlePayFastSuccess() {

    hidePaymentLoading();


    const pendingOrder =
        getPendingPayFastOrder();


    console.log(
        'PayFast successful return:',
        pendingOrder
    );


    /*
     * IMPORTANT:
     *
     * Returning from PayFast does NOT by itself prove that payment
     * was successfully settled.
     *
     * The server-side PayFast ITN/webhook must verify the transaction.
     */


    if (pendingOrder) {

        showPayFastSuccessMessage(
            pendingOrder
        );

    } else {

        showPayFastSuccessMessage({
            orderId:
                'Pending verification',

            amount:
                0
        });

    }

}


/* ==========================================================================
   19. SUCCESS MESSAGE
   ========================================================================== */

function showPayFastSuccessMessage(
    order
) {

    /*
     * Don't create a second success screen if checkout.js already
     * created one.
     */

    if (
        document.getElementById(
            'payfast-success-message'
        )
    ) {

        return;
    }


    const overlay =
        document.createElement('div');

    overlay.id =
        'payfast-success-message';

    overlay.innerHTML = `

        <div class="payfast-success-overlay">

            <div class="payfast-success-box">

                <div class="payfast-success-icon">

                    <i class="fa-solid fa-check"></i>

                </div>

                <h2>
                    Payment Received
                </h2>

                <p>
                    Thank you for your order.
                </p>

                <div class="payfast-order-reference">

                    <span>
                        Order Reference
                    </span>

                    <strong>
                        ${
                            escapePayFastHtml(
                                order.orderId ||
                                'Pending verification'
                            )
                        }
                    </strong>

                </div>

                <p class="payfast-success-note">

                    Your payment is being verified.
                    We will process your order once
                    PayFast confirms the transaction.

                </p>

                <button
                    type="button"
                    onclick="window.location.href='index.html'"
                    class="payfast-success-button"
                >
                    Return to Nexpak
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(
        overlay
    );

    addPayFastSuccessStyles();

}


/* ==========================================================================
   20. ESCAPE HTML
   ========================================================================== */

function escapePayFastHtml(value) {

    return String(value || '')
        .replace(
            /&/g,
            '&amp;'
        )
        .replace(
            /</g,
            '&lt;'
        )
        .replace(
            />/g,
            '&gt;'
        )
        .replace(
            /"/g,
            '&quot;'
        )
        .replace(
            /'/g,
            '&#039;'
        );

}


/* ==========================================================================
   21. SUCCESS SCREEN STYLES
   ========================================================================== */

function addPayFastSuccessStyles() {

    if (
        document.getElementById(
            'nexpak-payfast-success-styles'
        )
    ) {

        return;
    }


    const style =
        document.createElement('style');

    style.id =
        'nexpak-payfast-success-styles';


    style.textContent = `

        .payfast-success-overlay {

            position: fixed;

            inset: 0;

            z-index: 999999;

            background:
                rgba(0, 0, 0, 0.78);

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 20px;

        }

        .payfast-success-box {

            width: 100%;

            max-width: 460px;

            background: #ffffff;

            border-radius: 20px;

            padding: 40px 30px;

            text-align: center;

            box-shadow:
                0 20px 60px
                rgba(0, 0, 0, 0.3);

        }

        .payfast-success-icon {

            width: 76px;

            height: 76px;

            margin:
                0 auto 20px;

            border-radius: 50%;

            background:
                #123d2a;

            color: #ffffff;

            display: flex;

            align-items: center;

            justify-content: center;

            font-size: 34px;

        }

        .payfast-success-box h2 {

            color: #123d2a;

            margin:
                0 0 10px;

        }

        .payfast-success-box p {

            color: #555;

        }

        .payfast-order-reference {

            background:
                #f5f7f6;

            border-radius: 10px;

            padding: 15px;

            margin:
                20px 0;

        }

        .payfast-order-reference span {

            display: block;

            color: #777;

            font-size: 12px;

            margin-bottom: 5px;

        }

        .payfast-order-reference strong {

            color: #123d2a;

            font-size: 18px;

        }

        .payfast-success-note {

            font-size: 13px;

            line-height: 1.5;

        }

        .payfast-success-button {

            margin-top: 15px;

            padding:
                13px 25px;

            border: none;

            border-radius: 8px;

            background:
                #123d2a;

            color: #ffffff;

            font-weight: 600;

            cursor: pointer;

        }

    `;


    document.head.appendChild(
        style
    );

}


/* ==========================================================================
   END OF PART 2
   ========================================================================== */
