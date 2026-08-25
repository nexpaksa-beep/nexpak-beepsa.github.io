/* ==========================================================================
   Nexpak Security Solutions
   PayFast Payment Integration
   ========================================================================== */

console.log("Nexpak PayFast payments initialized");

/* ==========================================================================
   1. PAYFAST CONFIGURATION
   ========================================================================== */

const PAYFAST_CONFIG = {

    // "sandbox" for testing
    // "live" for production
    mode: "live",

    // PayFast Merchant ID
    merchantId: "YOUR_MERCHANT_ID",

    // IMPORTANT:
    // Generate a new Merchant Key in PayFast after the previous one was exposed.
    merchantKey: "YOUR_NEW_MERCHANT_KEY",

    // Leave empty if you have NOT enabled a passphrase in PayFast.
    passphrase: "",

    companyName: "Nexpak Security Solutions",
    companyEmail: "info@nexpaksolutions.co.za",

    returnUrl:
        "https://www.nexpaksolutions.co.za/checkout.html?status=success",

    cancelUrl:
        "https://www.nexpaksolutions.co.za/checkout.html?status=cancelled",

    // IMPORTANT:
    // This must point to a real server-side ITN endpoint.
    // Do NOT use checkout.html as the ITN URL.
    notifyUrl:
        "https://www.nexpaksolutions.co.za/api/payfast-itn"
};


/* ==========================================================================
   2. PAYFAST URLS
   ========================================================================== */

const PAYFAST_URLS = {

    sandbox:
        "https://sandbox.payfast.co.za/eng/process",

    live:
        "https://www.payfast.co.za/eng/process"
};


/* ==========================================================================
   3. CREATE PAYMENT
   ========================================================================== */

function initPayFastPayment(
    amount,
    itemName,
    itemDescription,
    customerEmail,
    customerName,
    orderId
) {

    amount = Number(amount);

    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Invalid payment amount.");
        return;
    }

    if (!customerEmail) {
        alert("Please enter your email address.");
        return;
    }

    if (!customerName) {
        alert("Please enter your full name.");
        return;
    }

    const nameParts = customerName.trim().split(/\s+/);

    const firstName = nameParts.shift() || "Customer";
    const lastName = nameParts.join(" ") || "Customer";

    const paymentData = {

        merchant_id:
            PAYFAST_CONFIG.merchantId,

        merchant_key:
            PAYFAST_CONFIG.merchantKey,

        return_url:
            PAYFAST_CONFIG.returnUrl,

        cancel_url:
            PAYFAST_CONFIG.cancelUrl,

        notify_url:
            PAYFAST_CONFIG.notifyUrl,

        name_first:
            firstName,

        name_last:
            lastName,

        email_address:
            customerEmail.trim(),

        amount:
            amount.toFixed(2),

        item_name:
            itemName || "Nexpak Security Solutions Order",

        item_description:
            itemDescription || "Security products",

        m_payment_id:
            orderId || generateOrderId()
    };


    /* ----------------------------------------------------------
       Generate PayFast signature
       ---------------------------------------------------------- */

    paymentData.signature =
        generatePayFastSignature(paymentData);


    /* ----------------------------------------------------------
       Save order information locally
       ---------------------------------------------------------- */

    savePendingPayment({
        orderId: paymentData.m_payment_id,
        amount: paymentData.amount,
        customerName: customerName,
        customerEmail: customerEmail,
        createdAt: new Date().toISOString()
    });


    /* ----------------------------------------------------------
       Redirect to PayFast
       ---------------------------------------------------------- */

    createAndSubmitPayFastForm(paymentData);
}


/* ==========================================================================
   4. PAYFAST SIGNATURE
   ========================================================================== */

function generatePayFastSignature(data) {

    const keys = Object.keys(data)
        .filter(key =>
            key !== "signature" &&
            data[key] !== undefined &&
            data[key] !== null &&
            data[key] !== ""
        )
        .sort();

    let parameterString = "";

    keys.forEach(key => {

        let value = String(data[key]).trim();

        parameterString +=
            key +
            "=" +
            encodeURIComponent(value)
                .replace(/%20/g, "+") +
            "&";
    });


    // Remove final &
    parameterString =
        parameterString.slice(0, -1);


    /* ----------------------------------------------------------
       Add passphrase if configured
       ---------------------------------------------------------- */

    if (
        PAYFAST_CONFIG.passphrase &&
        PAYFAST_CONFIG.passphrase.trim() !== ""
    ) {

        parameterString +=
            "&passphrase=" +
            encodeURIComponent(
                PAYFAST_CONFIG.passphrase.trim()
            );
    }


    console.log(
        "PayFast signature string generated."
    );


    return md5(parameterString);
}


/* ==========================================================================
   5. CREATE PAYFAST FORM
   ========================================================================== */

function createAndSubmitPayFastForm(data) {

    const existingForm =
        document.getElementById("payfast-form");

    if (existingForm) {
        existingForm.remove();
    }


    const form =
        document.createElement("form");

    form.id =
        "payfast-form";

    form.method =
        "POST";

    form.action =
        PAYFAST_URLS[PAYFAST_CONFIG.mode];

    form.style.display =
        "none";


    Object.keys(data).forEach(key => {

        const input =
            document.createElement("input");

        input.type =
            "hidden";

        input.name =
            key;

        input.value =
            data[key];

        form.appendChild(input);
    });


    document.body.appendChild(form);

    showPaymentLoading();


    setTimeout(() => {

        form.submit();

    }, 700);
}


/* ==========================================================================
   6. GENERATE ORDER NUMBER
   ========================================================================== */

function generateOrderId() {

    return (
        "NXP-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase()
    );
}


/* ==========================================================================
   7. SAVE PENDING PAYMENT
   ========================================================================== */

function savePendingPayment(order) {

    try {

        localStorage.setItem(
            "nexpak_pending_payment",
            JSON.stringify(order)
        );

    } catch (error) {

        console.error(
            "Could not save pending payment:",
            error
        );
    }
}


/* ==========================================================================
   8. GET PENDING PAYMENT
   ========================================================================== */

function getPendingPayment() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "nexpak_pending_payment"
            )
        );

    } catch (error) {

        return null;
    }
}


/* ==========================================================================
   9. PAYMENT LOADING SCREEN
   ========================================================================== */

function showPaymentLoading() {

    hidePaymentLoading();


    const loadingHTML = `

        <div id="payment-loading"
             style="
                position:fixed;
                inset:0;
                background:rgba(0,0,0,.82);
                display:flex;
                align-items:center;
                justify-content:center;
                z-index:999999;
                padding:20px;
             ">

            <div style="
                background:#fff;
                width:100%;
                max-width:420px;
                padding:35px 25px;
                border-radius:16px;
                text-align:center;
                box-shadow:0 20px 60px rgba(0,0,0,.3);
             ">

                <div style="
                    width:58px;
                    height:58px;
                    margin:0 auto 20px;
                    border:4px solid #e8e8e8;
                    border-top-color:#1a5f2a;
                    border-radius:50%;
                    animation:nexpakPaySpin 1s linear infinite;
                 "></div>

                <h2 style="
                    margin:0 0 10px;
                    color:#1a5f2a;
                    font-size:22px;
                 ">
                    Redirecting to PayFast
                </h2>

                <p style="
                    margin:0;
                    color:#666;
                    line-height:1.5;
                 ">
                    Your secure payment session is being prepared.
                </p>

                <p style="
                    margin-top:15px;
                    font-size:12px;
                    color:#999;
                 ">
                    Please do not close this window.
                </p>

            </div>

        </div>

        <style>
            @keyframes nexpakPaySpin {
                from {
                    transform:rotate(0deg);
                }

                to {
                    transform:rotate(360deg);
                }
            }
        </style>
    `;


    document.body.insertAdjacentHTML(
        "beforeend",
        loadingHTML
    );
}


/* ==========================================================================
   10. HIDE LOADING
   ========================================================================== */

function hidePaymentLoading() {

    const loading =
        document.getElementById(
            "payment-loading"
        );

    if (loading) {
        loading.remove();
    }
}


/* ==========================================================================
   11. HANDLE RETURN FROM PAYFAST
   ========================================================================== */

function handlePayFastReturn() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const status =
        params.get("status");


    if (status === "success") {

        showPaymentSuccess();

    }

    else if (status === "cancelled") {

        showPaymentCancelled();

    }
}


/* ==========================================================================
   12. PAYMENT SUCCESS
   ========================================================================== */

function showPaymentSuccess() {

    hidePaymentLoading();


    const pendingPayment =
        getPendingPayment();


    const orderId =
        pendingPayment?.orderId ||
        "NXP-PENDING";


    const successHTML = `

        <div id="payment-success"
             style="
                position:fixed;
                inset:0;
                background:linear-gradient(
                    135deg,
                    #123d2a,
                    #1a5f2a
                );
                display:flex;
                align-items:center;
                justify-content:center;
                z-index:999999;
                padding:20px;
             ">

            <div style="
                background:white;
                max-width:460px;
                width:100%;
                padding:40px 30px;
                border-radius:18px;
                text-align:center;
             ">

                <div style="
                    width:76px;
                    height:76px;
                    margin:0 auto 20px;
                    background:#1a5f2a;
                    border-radius:50%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                 ">

                    <span style="
                        color:white;
                        font-size:42px;
                        font-weight:bold;
                     ">
                        ✓
                    </span>

                </div>


                <h2 style="
                    color:#1a5f2a;
                    margin-bottom:10px;
                 ">
                    Payment Received
                </h2>


                <p style="
                    color:#666;
                    line-height:1.6;
                 ">
                    Thank you for your order.
                    Your PayFast payment has been submitted
                    successfully.
                </p>


                <div style="
                    background:#f6f8f7;
                    padding:15px;
                    border-radius:10px;
                    margin:20px 0;
                 ">

                    <small style="
                        color:#888;
                     ">
                        Order Reference
                    </small>

                    <strong style="
                        display:block;
                        margin-top:5px;
                        color:#123d2a;
                        font-size:18px;
                     ">
                        ${escapeHtml(orderId)}
                    </strong>

                </div>


                <p style="
                    font-size:13px;
                    color:#888;
                 ">
                    Your order will be processed after
                    PayFast payment verification.
                </p>


                <button
                    onclick="window.location.href='index.html'"
                    style="
                        margin-top:20px;
                        background:#1a5f2a;
                        color:white;
                        border:0;
                        padding:13px 25px;
                        border-radius:8px;
                        font-weight:600;
                        cursor:pointer;
                    "
                >
                    Return to Nexpak
                </button>

            </div>

        </div>
    `;


    document.body.insertAdjacentHTML(
        "beforeend",
        successHTML
    );


    /*
       Do NOT automatically delete the cart here.
       The server-side PayFast ITN should verify the payment first.
    */
}


/* ==========================================================================
   13. PAYMENT CANCELLED
   ========================================================================== */

function showPaymentCancelled() {

    hidePaymentLoading();


    alert(
        "Your PayFast payment was cancelled.\n\n" +
        "Your cart has been kept so you can try again."
    );
}


/* ==========================================================================
   14. CHECKOUT HELPER
   ========================================================================== */

function payWithPayFastCheckout(
    total,
    items,
    customerEmail,
    customerName,
    orderId
) {

    const itemNames =
        Array.isArray(items)
            ? items.map(item => item.name).join(", ")
            : "Security products";


    const itemDescription =
        Array.isArray(items)
            ? `${items.length} item(s): ${itemNames}`
            : "Nexpak Security Solutions order";


    initPayFastPayment(
        total,
        "Nexpak Security Solutions Order",
        itemDescription,
        customerEmail,
        customerName,
        orderId
    );
}


/* ==========================================================================
   15. BASIC HTML ESCAPING
   ========================================================================== */

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ==========================================================================
   16. REAL MD5 IMPLEMENTATION
   ========================================================================== */

function md5(string) {

    function rotateLeft(value, shift) {

        return (
            (value << shift) |
            (value >>> (32 - shift))
        );
    }


    function addUnsigned(a, b) {

        const a4 = a & 0x40000000;
        const b4 = b & 0x40000000;

        const a8 = a & 0x80000000;
        const b8 = b & 0x80000000;

        const result =
            (a & 0x3fffffff) +
            (b & 0x3fffffff);

        if (a4 & b4) {

            return (
                result ^
                0x80000000 ^
                a8 ^
                b8
            );

        }

        if (a4 | b4) {

            if (result & 0x40000000) {

                return (
                    result ^
                    0xc0000000 ^
                    a8 ^
                    b8
                );

            } else {

                return (
                    result ^
                    0x40000000 ^
                    a8 ^
                    b8
                );
            }
        }

        return result ^ a8 ^ b8;
    }


    function F(x, y, z) {
        return (x & y) | (~x & z);
    }

    function G(x, y, z) {
        return (x & z) | (y & ~z);
    }

    function H(x, y, z) {
        return x ^ y ^ z;
    }

    function I(x, y, z) {
        return y ^ (x | ~z);
    }


    function FF(a,b,c,d,x,s,ac) {

        a = addUnsigned(
            a,
            addUnsigned(
                addUnsigned(
                    F(b,c,d),
                    x
                ),
                ac
            )
        );

        return addUnsigned(
            rotateLeft(a,s),
            b
        );
    }


    function GG(a,b,c,d,x,s,ac) {

        a = addUnsigned(
            a,
            addUnsigned(
                addUnsigned(
                    G(b,c,d),
                    x
                ),
                ac
            )
        );

        return addUnsigned(
            rotateLeft(a,s),
            b
        );
    }


    function HH(a,b,c,d,x,s,ac) {

        a = addUnsigned(
            a,
            addUnsigned(
                addUnsigned(
                    H(b,c,d),
                    x
                ),
                ac
            )
        );

        return addUnsigned(
            rotateLeft(a,s),
            b
        );
    }


    function II(a,b,c,d,x,s,ac) {

        a = addUnsigned(
            a,
            addUnsigned(
                addUnsigned(
                    I(b,c,d),
                    x
                ),
                ac
            )
        );

        return addUnsigned(
            rotateLeft(a,s),
            b
        );
    }


    function convertToWordArray(str) {

        const messageLength = str.length;

        const numberOfWords =
            (((messageLength + 8) >>> 6) + 1) * 16;

        const wordArray =
            new Array(numberOfWords - 1);

        let bytePosition = 0;
        let wordCount = 0;

        while (bytePosition < messageLength) {

            wordArray[wordCount] =
                (str.charCodeAt(bytePosition) & 0xff) |
                ((str.charCodeAt(bytePosition + 1) & 0xff) << 8) |
                ((str.charCodeAt(bytePosition + 2) & 0xff) << 16) |
                ((str.charCodeAt(bytePosition + 3) & 0xff) << 24);

            bytePosition += 4;
            
