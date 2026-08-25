/* ==========================================================================
   NEXPAK SECURITY SOLUTIONS
   PAYFAST VERCEL SERVERLESS FUNCTION
   ==========================================================================

   File:
   /api/payfast.js

   PURPOSE:
   - Receives checkout information from the website
   - Creates the PayFast payment parameters
   - Generates the PayFast MD5 signature server-side
   - Keeps the PayFast passphrase OUT of browser JavaScript

   REQUIRED VERCEL ENVIRONMENT VARIABLES:

   PAYFAST_MERCHANT_ID
   PAYFAST_MERCHANT_KEY
   PAYFAST_PASSPHRASE

   ========================================================================== */


/* ==========================================================================
   1. CONFIGURATION
   ========================================================================== */

const PAYFAST_CONFIG = {

    liveUrl:
        'https://www.payfast.co.za/eng/process',

    sandboxUrl:
        'https://sandbox.payfast.co.za/eng/process',

    returnUrl:
        'https://www.nexpaksolutions.co.za/checkout.html?status=success',

    cancelUrl:
        'https://www.nexpaksolutions.co.za/checkout.html?status=cancelled',

    notifyUrl:
        'https://www.nexpaksolutions.co.za/api/payfast-itn'

};


/* ==========================================================================
   2. MD5 IMPLEMENTATION
   ========================================================================== */

function md5(string) {

    function safeAdd(x, y) {

        const lsw =
            (x & 0xffff) +
            (y & 0xffff);

        const msw =
            (x >>> 16) +
            (y >>> 16) +
            (lsw >>> 16);

        return (
            (msw << 16) |
            (lsw & 0xffff)
        );

    }


    function rotateLeft(value, shift) {

        return (
            (value << shift) |
            (value >>> (32 - shift))
        );

    }


    function cmn(q, a, b, x, s, t) {

        return safeAdd(
            rotateLeft(
                safeAdd(
                    safeAdd(a, q),
                    safeAdd(x, t)
                ),
                s
            ),
            b
        );

    }


    function ff(a, b, c, d, x, s, t) {

        return cmn(
            (b & c) | ((~b) & d),
            a,
            b,
            x,
            s,
            t
        );

    }


    function gg(a, b, c, d, x, s, t) {

        return cmn(
            (b & d) | (c & (~d)),
            a,
            b,
            x,
            s,
            t
        );

    }


    function hh(a, b, c, d, x, s, t) {

        return cmn(
            b ^ c ^ d,
            a,
            b,
            x,
            s,
            t
        );

    }


    function ii(a, b, c, d, x, s, t) {

        return cmn(
            c ^ (b | (~d)),
            a,
            b,
            x,
            s,
            t
        );

    }


    function md5cycle(state, block) {

        let a = state[0];
        let b = state[1];
        let c = state[2];
        let d = state[3];


        a = ff(a,b,c,d,block[0],7,-680876936);
        d = ff(d,a,b,c,block[1],12,-389564586);
        c = ff(c,d,a,b,block[2],17,606105819);
        b = ff(b,c,d,a,block[3],22,-1044525330);

        a = ff(a,b,c,d,block[4],7,-176418897);
        d = ff(d,a,b,c,block[5],12,1200080426);
        c = ff(c,d,a,b,block[6],17,-1473231341);
        b = ff(b,c,d,a,block[7],22,-45705983);

        a = ff(a,b,c,d,block[8],7,1770035416);
        d = ff(d,a,b,c,block[9],12,-1958414417);
        c = ff(c,d,a,b,block[10],17,-42063);
        b = ff(b,c,d,a,block[11],22,-1990404162);

        a = ff(a,b,c,d,block[12],7,1804603682);
        d = ff(d,a,b,c,block[13],12,-40341101);
        c = ff(c,d,a,b,block[14],17,-1502002290);
        b = ff(b,c,d,a,block[15],22,1236535329);


        a = gg(a,b,c,d,block[1],5,-165796510);
        d = gg(d,a,b,c,block[6],9,-1069501632);
        c = gg(c,d,a,b,block[11],14,643717713);
        b = gg(b,c,d,a,block[0],20,-373897302);

        a = gg(a,b,c,d,block[5],5,-701558691);
        d = gg(d,a,b,c,block[10],9,38016083);
        c = gg(c,d,a,b,block[15],14,-660478335);
        b = gg(b,c,d,a,block[4],20,-405537848);

        a = gg(a,b,c,d,block[9],5,568446438);
        d = gg(d,a,b,c,block[14],9,-1019803690);
        c = gg(c,d,a,b,block[3],14,-187363961);
        b = gg(b,c,d,a,block[8],20,1163531501);

        a = gg(a,b,c,d,block[13],5,-1444681467);
        d = gg(d,a,b,c,block[2],9,-51403784);
        c = gg(c,d,a,b,block[7],14,1735328473);
        b = gg(b,c,d,a,block[12],20,-1926607734);


        a = hh(a,b,c,d,block[5],4,-378558);
        d = hh(d,a,b,c,block[8],11,-2022574463);
        c = hh(c,d,a,b,block[11],16,1839030562);
        b = hh(b,c,d,a,block[14],23,-35309556);

        a = hh(a,b,c,d,block[1],4,-1530992060);
        d = hh(d,a,b,c,block[4],11,1272893353);
        c = hh(c,d,a,b,block[7],16,-155497632);
        b = hh(b,c,d,a,block[10],23,-1094730640);

        a = hh(a,b,c,d,block[13],4,681279174);
        d = hh(d,a,b,c,block[0],11,-358537222);
        c = hh(c,d,a,b,block[3],16,-722521979);
        b = hh(b,c,d,a,block[6],23,76029189);

        a = hh(a,b,c,d,block[9],4,-640364487);
        d = hh(d,a,b,c,block[12],11,-421815835);
        c = hh(c,d,a,b,block[15],16,530742520);
        b = hh(b,c,d,a,block[2],23,-995338651);


        a = ii(a,b,c,d,block[0],6,-198630844);
        d = ii(d,a,b,c,block[7],10,1126891415);
        c = ii(c,d,a,b,block[14],15,-1416354905);
        b = ii(b,c,d,a,block[5],21,-57434055);

        a = ii(a,b,c,d,block[12],6,1700485571);
        d = ii(d,a,b,c,block[3],10,-1894986606);
        c = ii(c,d,a,b,block[10],15,-1051523);
        b = ii(b,c,d,a,block[1],21,-2054922799);

        a = ii(a,b,c,d,block[8],6,1873313359);
        d = ii(d,a,b,c,block[15],10,-30611744);
        c = ii(c,d,a,b,block[6],15,-1560198380);
        b = ii(b,c,d,a,block[13],21,1309151649);

        a = ii(a,b,c,d,block[4],6,-145523070);
        d = ii(d,a,b,c,block[11],10,-1120210379);
        c = ii(c,d,a,b,block[2],15,718787259);
        b = ii(b,c,d,a,block[9],21,-343485551);


        state[0] = safeAdd(state[0], a);
        state[1] = safeAdd(state[1], b);
        state[2] = safeAdd(state[2], c);
        state[3] = safeAdd(state[3], d);

    }


    function md5blk(string) {

        const block = [];

        for (let i = 0; i < 64; i += 4) {

            block[i >> 2] =
                string.charCodeAt(i) |
                (string.charCodeAt(i + 1) << 8) |
                (string.charCodeAt(i + 2) << 16) |
                (string.charCodeAt(i + 3) << 24);

        }

        return block;

    }


    const state = [
        1732584193,
        -271733879,
        -1732584194,
        271733878
    ];


    let message =
        unescape(
            encodeURIComponent(string)
        );


    const originalLength =
        message.length;


    message += '\x80';


    while (
        message.length % 64 !== 56
    ) {

        message += '\x00';

    }


    const bitLength =
        originalLength * 8;


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        message += String.fromCharCode(
            bitLength >>> (8 * i)
        );

    }


    for (
        let offset = 0;
        offset < message.length;
        offset += 64
    ) {

        md5cycle(
            state,
            md5blk(
                message.substring(
                    offset,
                    offset + 64
                )
            )
        );

    }


    const hex =
        '0123456789abcdef';


    let result = '';


    for (
        let i = 0;
        i < state.length;
        i++
    ) {

        const value =
            state[i];

        for (
            let j = 0;
            j < 4;
            j++
        ) {

            const byte =
                (value >>> (j * 8)) & 0xff;

            result +=
                hex.charAt(
                    (byte >>> 4) & 0x0f
                ) +
                hex.charAt(
                    byte & 0x0f
                );

        }

    }


    return result;

}


/* ==========================================================================
   3. PAYFAST PARAMETER ENCODING
   ========================================================================== */

function encodePayFastValue(value) {

    return encodeURIComponent(
        String(value)
    ).replace(
        /%20/g,
        '+'
    );

}


/* ==========================================================================
   4. GENERATE PAYFAST SIGNATURE
   ========================================================================== */

function generatePayFastSignature(
    paymentData,
    passphrase
) {

    const keys =
        Object.keys(paymentData)
            .filter(
                key =>
                    key !== 'signature' &&
                    paymentData[key] !== '' &&
                    paymentData[key] !== null &&
                    typeof paymentData[key] !== 'undefined'
            )
            .sort();


    let parameterString = '';


    keys.forEach(
        key => {

            parameterString +=
                key +
                '=' +
                encodePayFastValue(
                    paymentData[key]
                ) +
                '&';

        }
    );


    parameterString =
        parameterString.replace(
            /&$/,
            ''
        );


    if (passphrase) {

        parameterString +=
            '&passphrase=' +
            encodePayFastValue(
                passphrase
            );

    }


    return md5(
        parameterString
    );

}


/* ==========================================================================
   5. VALIDATE REQUEST
   ========================================================================== */

function validateRequest(body) {

    if (!body) {

        return {
            valid: false,
            error: 'Request body is required.'
        };

    }


    const amount =
        Number(body.amount);


    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        return {
            valid: false,
            error: 'Invalid payment amount.'
        };

    }


    if (
        !body.email ||
        typeof body.email !== 'string'
    ) {

        return {
            valid: false,
            error: 'Customer email is required.'
        };

    }


    if (
        !body.orderId ||
        typeof body.orderId !== 'string'
    ) {

        return {
            valid: false,
            error: 'Order reference is required.'
        };

    }


    return {
        valid: true
    };

}


/* ==========================================================================
   6. MAIN VERCEL FUNCTION
   ========================================================================== */

export default async function handler(
    request
) {

    /*
     * Only POST requests are allowed.
     */

    if (
        request.method !== 'POST'
    ) {

        return new Response(
            JSON.stringify({
                success: false,
                error: 'Method not allowed.'
            }),
            {
                status: 405,
                headers: {
                    'Content-Type':
                        'application/json'
                }
            }
        );

    }


    try {

        const body =
            await request.json();


        const validation =
            validateRequest(body);


        if (!validation.valid) {

            return new Response(
                JSON.stringify({
                    success: false,
                    error:
                        validation.error
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type':
                            'application/json'
                    }
                }
            );

        }


        /*
         * Read credentials from Vercel.
         */

        const merchantId =
            process.env.PAYFAST_MERCHANT_ID;

        const merchantKey =
            process.env.PAYFAST_MERCHANT_KEY;

        const passphrase =
            process.env.PAYFAST_PASSPHRASE;


        if (
            !merchantId ||
            !merchantKey
        ) {

            console.error(
                'PayFast credentials are missing.'
            );

            return new Response(
                JSON.stringify({
                    success: false,
                    error:
                        'PayFast configuration is incomplete.'
                }),
                {
                    status: 500,
                    headers: {
                        'Content-Type':
                            'application/json'
                    }
                }
            );

        }


        /*
         * Build PayFast payment data.
         */

        const customerName =
            String(
                body.customerName ||
                'Customer'
            ).trim();


        const nameParts =
            customerName.split(/\s+/);


        const firstName =
            nameParts.shift() ||
            'Customer';


        const lastName =
            nameParts.join(' ') ||
            'Customer';


        const paymentData = {

            merchant_id:
                merchantId,

            merchant_key:
                merchantKey,

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
                String(
                    body.email
                ).trim(),

            m_payment_id:
                String(
                    body.orderId
                ).trim(),

            amount:
                Number(
                    body.amount
                ).toFixed(2),

            item_name:
                String(
                    body.itemName ||
                    `Nexpak Security Solutions Order ${body.orderId}`
                ).substring(
                    0,
                    100
                ),

            item_description:
                String(
                    body.itemDescription ||
                    'Nexpak Security Solutions order'
                ).substring(
                    0,
                    255
                )

        };


        /*
         * Optional custom fields.
         */

        if (
            body.phone
        ) {

            paymentData.cell_number =
                String(
                    body.phone
                ).trim();

        }


        /*
         * Generate the signature SERVER-SIDE.
         */

        paymentData.signature =
            generatePayFastSignature(
                paymentData,
                passphrase
            );


        /*
         * Select Live/Sandbox.
         *
         * Default is LIVE.
         */

        const mode =
            body.mode === 'sandbox'
                ? 'sandbox'
                : 'live';


        const payfastUrl =
            mode === 'sandbox'
                ? PAYFAST_CONFIG.sandboxUrl
                : PAYFAST_CONFIG.liveUrl;


        /*
         * Return everything the frontend needs
         * to create the POST form.
         *
         * The passphrase is NEVER returned.
         */

        return new Response(
            JSON.stringify({

                success: true,

                payfastUrl:
                    payfastUrl,

                paymentData:
                    paymentData

            }),
            {
                status: 200,

                headers: {
                    'Content-Type':
                        'application/json',

                    'Cache-Control':
                        'no-store'
                }

            }
        );


    } catch (error) {

        console.error(
            'PayFast API error:',
            error
        );


        return new Response(
            JSON.stringify({

                success: false,

                error:
                    'Unable to create PayFast payment.'

            }),
            {
                status: 500,

                headers: {
                    'Content-Type':
                        'application/json'
                }
            }
        );

    }

}
