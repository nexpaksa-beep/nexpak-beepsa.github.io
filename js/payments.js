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
                   }

        // Process remaining bytes
        switch (str.length - bytePosition) {
            case 3:
                wordArray |= (str.charCodeAt(bytePosition + 2) & 0xff) << 16;
            case 2:
                wordArray |= (str.charCodeAt(bytePosition + 1) & 0xff) << 8;
            case 1:
                wordArray |= (str.charCodeAt(bytePosition) & 0xff);

                // Padding
                wordArray |= 0x80 << ((str.length - bytePosition) * 8);

                break;
        }

        // Convert to 32-bit words
        wordArray = wordArray >>> 0;

        // Store remaining word
        wordArrayBuffer.push(wordArray);
    }

    // Append length
    wordArrayBuffer.push(str.length * 8);
    wordArrayBuffer.push(0);

    // MD5 initial values
    let a = 0x67452301;
    let b = 0xefcdab89;
    let c = 0x98badcfe;
    let d = 0x10325476;

    // MD5 auxiliary functions
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

    function rotateLeft(value, shift) {
        return (value << shift) | (value >>> (32 - shift));
    }

    function addUnsigned(x, y) {
        return (x + y) >>> 0;
    }

    function FF(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, F(b, c, d));
        a = addUnsigned(a, x);
        a = addUnsigned(a, ac);
        a = rotateLeft(a, s);
        return addUnsigned(a, b);
    }

    function GG(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, G(b, c, d));
        a = addUnsigned(a, x);
        a = addUnsigned(a, ac);
        a = rotateLeft(a, s);
        return addUnsigned(a, b);
    }

    function HH(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, H(b, c, d));
        a = addUnsigned(a, x);
        a = addUnsigned(a, ac);
        a = rotateLeft(a, s);
        return addUnsigned(a, b);
    }

    function II(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, I(b, c, d));
        a = addUnsigned(a, x);
        a = addUnsigned(a, ac);
        a = rotateLeft(a, s);
        return addUnsigned(a, b);
    }

    // Process each 512-bit block
    for (let offset = 0; offset < wordArrayBuffer.length; offset += 16) {
        let oldA = a;
        let oldB = b;
        let oldC = c;
        let oldD = d;

        let x = [];

        for (let i = 0; i < 16; i++) {
            x[i] = wordArrayBuffer[offset + i] || 0;
        }

        // Round 1
        a = FF(a, b, c, d, x[0], 7, 0xd76aa478);
        d = FF(d, a, b, c, x[1], 12, 0xe8c7b756);
        c = FF(c, d, a, b, x[2], 17, 0x242070db);
        b = FF(b, c, d, a, x[3], 22, 0xc1bdceee);

        a = FF(a, b, c, d, x[4], 7, 0xf57c0faf);
        d = FF(d, a, b, c, x[5], 12, 0x4787c62a);
        c = FF(c, d, a, b, x[6], 17, 0xa8304613);
        b = FF(b, c, d, a, x[7], 22, 0xfd469501);

        a = FF(a, b, c, d, x[8], 7, 0x698098d8);
        d = FF(d, a, b, c, x[9], 12, 0x8b44f7af);
        c = FF(c, d, a, b, x[10], 17, 0xffff5bb1);
        b = FF(b, c, d, a, x[11], 22, 0x895cd7be);

        a = FF(a, b, c, d, x[12], 7, 0x6b901122);
        d = FF(d, a, b, c, x[13], 12, 0xfd987193);
        c = FF(c, d, a, b, x[14], 17, 0xa679438e);
        b = FF(b, c, d, a, x[15], 22, 0x49b40821);

        // Round 2
        a = GG(a, b, c, d, x[1], 5, 0xf61e2562);
        d = GG(d, a, b, c, x[6], 9, 0xc040b340);
        c = GG(c, d, a, b, x[11], 14, 0x265e5a51);
        b = GG(b, c, d, a, x[0], 20, 0xe9b6c7aa);

        a = GG(a, b, c, d, x[5], 5, 0xd62f105d);
        d = GG(d, a, b, c, x[10], 9, 0x02441453);
        c = GG(c, d, a, b, x[15], 14, 0xd8a1e681);
        b = GG(b, c, d, a, x[4], 20, 0xe7d3fbc8);

        a = GG(a, b, c, d, x[9], 5, 0x21e1cde6);
        d = GG(d, a, b, c, x[14], 9, 0xc33707d6);
        c = GG(c, d, a, b, x[3], 14, 0xf4d50d87);
        b = GG(b, c, d, a, x[8], 20, 0x455a14ed);

        a = GG(a, b, c, d, x[13], 5, 0xa9e3e905);
        d = GG(d, a, b, c, x[2], 9, 0xfcefa3f8);
        c = GG(c, d, a, b, x[7], 14, 0x676f02d9);
        b = GG(b, c, d, a, x[12], 20, 0x8d2a4c8a);

        // Round 3
        a = HH(a, b, c, d, x[5], 4, 0xfffa3942);
        d = HH(d, a, b, c, x[8], 11, 0x8771f681);
        c = HH(c, d, a, b, x[11], 16, 0x6d9d6122);
        b = HH(b, c, d, a, x[14], 23, 0xfde5380c);

        a = HH(a, b, c, d, x[1], 4, 0xa4beea44);
        d = HH(d, a, b, c, x[4], 11, 0x4bdecfa9);
        c = HH(c, d, a, b, x[7], 16, 0xf6bb4b60);
        b = HH(b, c, d, a, x[10], 23, 0xbebfbc70);

        a = HH(a, b, c, d, x[13], 4, 0x289b7ec6);
        d = HH(d, a, b, c, x[0], 11, 0xeaa127fa);
        c = HH(c, d, a, b, x[3], 16, 0xd4ef3085);
        b = HH(b, c, d, a, x[6], 23, 0x04881d05);

        a = HH(a, b, c, d, x[9], 4, 0xd9d4d039);
        d = HH(d, a, b, c, x[12], 11, 0xe6db99e5);
        c = HH(c, d, a, b, x[15], 16, 0x1fa27cf8);
        b = HH(b, c, d, a, x[2], 23, 0xc4ac5665);

        // Round 4
        a = II(a, b, c, d, x[0], 6, 0xf4292244);
        d = II(d, a, b, c, x[7], 10, 0x432aff97);
        c = II(c, d, a, b, x[14], 15, 0xab9423a7);
        b = II(b, c, d, a, x[5], 21, 0xfc93a039);

        a = II(a, b, c, d, x[12], 6, 0x655b59c3);
        d = II(d, a, b, c, x[3], 10, 0x8f0ccc92);
        c = II(c, d, a, b, x[10], 15, 0xffeff47d);
        b = II(b, c, d, a, x[1], 21, 0x85845dd1);

        a = II(a, b, c, d, x[8], 6, 0x6fa87e4f);
        d = II(d, a, b, c, x[15], 10, 0xfe2ce6e0);
        c = II(c, d, a, b, x[6], 15, 0xa3014314);
        b = II(b, c, d, a, x[13], 21, 0x4e0811a1);

        a = II(a, b, c, d, x[4], 6, 0xf7537e82);
        d = II(d, a, b, c, x[11], 10, 0xbd3af235);
        c = II(c, d, a, b, x[2], 15, 0x2ad7d2bb);
        b = II(b, c, d, a, x[9], 21, 0xeb86d391);

        // Add this block's result to previous state
        a = addUnsigned(a, oldA);
        b = addUnsigned(b, oldB);
        c = addUnsigned(c, oldC);
        d = addUnsigned(d, oldD);
    }

    // Convert to hexadecimal
    function toHex(value) {
        let output = '';

        for (let i = 0; i < 4; i++) {
            const byte = (value >>> (i * 8)) & 0xff;
            output += byte.toString(16).padStart(2, '0');
        }

        return output;
    }

    return (
        toHex(a) +
        toHex(b) +
        toHex(c) +
        toHex(d)
    );
}


// ==========================================
// INITIALIZE PAYFAST ON PAGE LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // Check if this is a PayFast return
    if (
        window.location.search.includes('status=success') ||
        window.location.search.includes('status=cancelled') ||
        window.location.search.includes('status=notify')
    ) {
        if (typeof handlePayFastReturn === 'function') {
            handlePayFastReturn();
        }
    }

    console.log('PayFast payment integration loaded');
});


// ==========================================
// GLOBAL PAYFAST API
// ==========================================

window.PayFast = {
    config: PAYFAST_CONFIG,

    pay: function (amount, itemName, itemDescription, customerEmail, customerName) {
        return initPayFastPayment(
            amount,
            itemName,
            itemDescription,
            customerEmail,
            customerName
        );
    },

    checkout: function (total, items, customerEmail, customerName) {
        return payWithPayFastCheckout(
            total,
            items,
            customerEmail,
            customerName
        );
    }
};

window.PayFast = {
    checkout: payWithPayFastCheckout
};

// ==========================================
// PAYMENT BUTTON HELPER
// ==========================================

function createPayFastButton(options = {}) {

    const {
        text = 'Pay with PayFast',
        amount = 0,
        itemName = 'Nexpak Security Solutions Order',
        itemDescription = 'Security products',
        customerEmail = '',
        customerName = ''
    } = options;

    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'payfast-button';

    button.innerHTML = `
        <span class="payfast-logo">
            <span class="pf-symbol">P</span>
            <span class="pf-text">PayFast</span>
        </span>
        <span class="payfast-button-text">${text}</span>
    `;

    button.addEventListener('click', function () {

        if (!amount || amount <= 0) {
            alert('Invalid payment amount.');
            return;
        }

        if (!customerEmail) {
            alert('Please enter your email address.');
            return;
        }

        if (!customerName) {
            alert('Please enter your name.');
            return;
        }

        initPayFastPayment(
            amount,
            itemName,
            itemDescription,
            customerEmail,
            customerName
        );
    });

    return button;
}


// ==========================================
// PAYFAST BUTTON STYLING
// ==========================================

function addPayFastButtonStyles() {

    if (document.getElementById('payfast-button-styles')) {
        return;
    }

    const style = document.createElement('style');

    style.id = 'payfast-button-styles';

    style.textContent = `
        .payfast-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 14px 22px;
            border: none;
            border-radius: 8px;
            background: #1a5f2a;
            color: #ffffff;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .payfast-button:hover {
            background: #2d8b3f;
            transform: translateY(-1px);
        }

        .payfast-logo {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            background: #ffffff;
            color: #1a5f2a;
            padding: 4px 8px;
            border-radius: 5px;
            font-weight: 800;
        }

        .pf-symbol {
            font-size: 16px;
            font-weight: 900;
        }

        .pf-text {
            font-size: 13px;
            font-weight: 800;
        }

        .payfast-button-text {
            white-space: nowrap;
        }
    `;

    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function () {
    addPayFastButtonStyles();
});
            
