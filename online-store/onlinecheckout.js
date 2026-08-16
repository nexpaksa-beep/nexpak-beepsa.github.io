/* =========================================================
   NEXPAK ONLINE STORE — CHECKOUT ENGINE
   onlinecheckout.js
   PART 1 — CHECKOUT CORE + ORDER STATE
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       1. CHECKOUT CONFIGURATION
       ===================================================== */

    const NEXPAK_CHECKOUT_STORAGE_KEY =
        "NEXPAK_ONLINE_CHECKOUT";


    const NEXPAK_ORDER_PREFIX =
        "NEX";


    const NEXPAK_CHECKOUT_VERSION =
        1;


    /* =====================================================
       2. CHECKOUT STATE
       ===================================================== */

    let nexpakOnlineCheckout = {

        version:
            NEXPAK_CHECKOUT_VERSION,

        orderReference:
            "",

        customer:
            {

                name: "",

                email: "",

                phone: ""

            },

        delivery:
            {

                address: "",

                suburb: "",

                city: "",

                province: "",

                postalCode: "",

                distanceKm: 0,

                fee: 0

            },

        payment:
            {

                method: "",

                status: "pending"

            },

        cart:
            [],

        totals:
            {

                subtotalExVat: 0,

                vatRate: 0.15,

                vatAmount: 0,

                totalInclVat: 0,

                deliveryFee: 0,

                grandTotal: 0

            },

        createdAt:
            "",

        updatedAt:
            ""

    };


    /* =====================================================
       3. SAFE STRING
       ===================================================== */

    function safeCheckoutString(
        value,
        fallback = ""
    ) {

        if (
            value === null ||
            value === undefined
        ) {

            return fallback;

        }


        return String(value).trim();

    }


    /* =====================================================
       4. SAFE NUMBER
       ===================================================== */

    function safeCheckoutNumber(
        value,
        fallback = 0
    ) {

        const number =
            Number(value);


        return Number.isFinite(number)
            ? number
            : fallback;

    }


    /* =====================================================
       5. CREATE ORDER REFERENCE
       ===================================================== */

    function createNexpakOnlineOrderReference() {

        const now =
            new Date();


        const year =
            now.getFullYear();


        const month =
            String(
                now.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const day =
            String(
                now.getDate()
            ).padStart(
                2,
                "0"
            );


        const randomNumber =
            Math.floor(
                1000 +
                Math.random() * 9000
            );


        return (

            NEXPAK_ORDER_PREFIX +

            "-" +

            year +

            month +

            day +

            "-" +

            randomNumber

        );

    }


    /* =====================================================
       6. GET CART ENGINE
       ===================================================== */

    function getNexpakOnlineCheckoutCart() {

        if (
            window.NEXPAK_ONLINE_CART &&
            typeof
            window.NEXPAK_ONLINE_CART.get ===
            "function"
        ) {

            return (
                window
                    .NEXPAK_ONLINE_CART
                    .get()
            );

        }


        return [];

    }


    /* =====================================================
       7. CHECK CART
       ===================================================== */

    function validateNexpakOnlineCheckoutCart() {

        const cart =
            getNexpakOnlineCheckoutCart();


        if (
            !Array.isArray(cart) ||
            cart.length === 0
        ) {

            return {

                valid: false,

                message:
                    "Your cart is empty."

            };

        }


        return {

            valid: true,

            message:
                "Cart is ready for checkout."

        };

    }


    /* =====================================================
       8. COPY CART INTO CHECKOUT
       ===================================================== */

    function copyNexpakOnlineCartToCheckout() {

        const cart =
            getNexpakOnlineCheckoutCart();


        try {

            nexpakOnlineCheckout.cart =
                JSON.parse(
                    JSON.stringify(
                        cart
                    )
                );

        } catch (error) {

            console.error(
                "NEXPAK Checkout: Could not copy cart.",
                error
            );


            nexpakOnlineCheckout.cart =
                [];

        }


        return nexpakOnlineCheckout.cart;

    }


    /* =====================================================
       9. CALCULATE CHECKOUT TOTALS
       ===================================================== */

    function calculateNexpakOnlineCheckoutTotals() {

        if (
            window.NEXPAK_ONLINE_CART &&
            typeof
            window.NEXPAK_ONLINE_CART.getTotals ===
            "function"
        ) {

            const deliveryFee =
                safeCheckoutNumber(
                    nexpakOnlineCheckout
                        .delivery
                        .fee,
                    0
                );


            const totals =
                window
                    .NEXPAK_ONLINE_CART
                    .getTotals(
                        deliveryFee
                    );


            nexpakOnlineCheckout.totals = {

                subtotalExVat:
                    safeCheckoutNumber(
                        totals.subtotalExVat,
                        0
                    ),

                vatRate:
                    safeCheckoutNumber(
                        totals.vatRate,
                        0.15
                    ),

                vatAmount:
                    safeCheckoutNumber(
                        totals.vatAmount,
                        0
                    ),

                totalInclVat:
                    safeCheckoutNumber(
                        totals.totalInclVat,
                        0
                    ),

                deliveryFee:
                    safeCheckoutNumber(
                        totals.deliveryFee,
                        0
                    ),

                grandTotal:
                    safeCheckoutNumber(
                        totals.grandTotal,
                        0
                    )

            };


            return nexpakOnlineCheckout.totals;

        }


        return nexpakOnlineCheckout.totals;

    }


    /* =====================================================
       10. SAVE CHECKOUT STATE
       ===================================================== */

    function saveNexpakOnlineCheckout() {

        try {

            nexpakOnlineCheckout.updatedAt =
                new Date().toISOString();


            localStorage.setItem(

                NEXPAK_CHECKOUT_STORAGE_KEY,

                JSON.stringify(
                    nexpakOnlineCheckout
                )

            );


            return true;

        } catch (error) {

            console.error(
                "NEXPAK Checkout: Failed to save checkout.",
                error
            );


            return false;

        }

    }


    /* =====================================================
       11. LOAD CHECKOUT STATE
       ===================================================== */

    function loadNexpakOnlineCheckout() {

        try {

            const stored =
                localStorage.getItem(
                    NEXPAK_CHECKOUT_STORAGE_KEY
                );


            if (!stored) {

                return nexpakOnlineCheckout;

            }


            const parsed =
                JSON.parse(
                    stored
                );


            if (
                parsed &&
                typeof parsed ===
                "object"
            ) {

                nexpakOnlineCheckout = {

                    ...nexpakOnlineCheckout,

                    ...parsed,

                    customer: {

                        ...nexpakOnlineCheckout.customer,

                        ...(parsed.customer || {})

                    },

                    delivery: {

                        ...nexpakOnlineCheckout.delivery,

                        ...(parsed.delivery || {})

                    },

                    payment: {

                        ...nexpakOnlineCheckout.payment,

                        ...(parsed.payment || {})

                    },

                    totals: {

                        ...nexpakOnlineCheckout.totals,

                        ...(parsed.totals || {})

                    }

                };

            }


            return nexpakOnlineCheckout;

        } catch (error) {

            console.error(
                "NEXPAK Checkout: Failed to load checkout.",
                error
            );


            return nexpakOnlineCheckout;

        }

    }


    /* =====================================================
       12. START CHECKOUT
       ===================================================== */

    function startNexpakOnlineCheckout() {

        const validation =
            validateNexpakOnlineCheckoutCart();


        if (
            !validation.valid
        ) {

            return {

                success: false,

                message:
                    validation.message

            };

        }


        /*
         * Generate a fresh order reference.
         */

        nexpakOnlineCheckout.orderReference =
            createNexpakOnlineOrderReference();


        /*
         * Copy current cart.
         */

        copyNexpakOnlineCartToCheckout();


        /*
         * Calculate current totals.
         */

        calculateNexpakOnlineCheckoutTotals();


        /*
         * Timestamp.
         */

        nexpakOnlineCheckout.createdAt =
            new Date().toISOString();


        nexpakOnlineCheckout.updatedAt =
            nexpakOnlineCheckout.createdAt;


        /*
         * Payment remains pending until
         * the customer selects a method.
         */

        nexpakOnlineCheckout.payment = {

            method: "",

            status: "pending"

        };


        saveNexpakOnlineCheckout();


        return {

            success: true,

            orderReference:
                nexpakOnlineCheckout
                    .orderReference,

            cart:
                nexpakOnlineCheckout.cart,

            totals:
                nexpakOnlineCheckout.totals

        };

    }


    /* =====================================================
       13. GET CHECKOUT STATE
       ===================================================== */

    function getNexpakOnlineCheckoutState() {

        return nexpakOnlineCheckout;

    }


    /* =====================================================
       14. EXTEND PUBLIC CHECKOUT API
       ===================================================== */

    window.NEXPAK_ONLINE_CHECKOUT = {

        version:
            NEXPAK_CHECKOUT_VERSION,

        start:
            startNexpakOnlineCheckout,

        get:
            getNexpakOnlineCheckoutState,

        save:
            saveNexpakOnlineCheckout,

        load:
            loadNexpakOnlineCheckout,

        validateCart:
            validateNexpakOnlineCheckoutCart,

        getCart:
            getNexpakOnlineCheckoutCart,

        getTotals:
            calculateNexpakOnlineCheckoutTotals,

        createOrderReference:
            createNexpakOnlineOrderReference

    };


    /* =====================================================
       15. INITIAL CHECKOUT LOAD
       ===================================================== */

    loadNexpakOnlineCheckout();


    console.log(
        "NEXPAK Online Store: Checkout engine loaded."
    );


    /* =====================================================
       PART 1 END
       ===================================================== */

 /* =========================================================
   NEXPAK ONLINE STORE — CHECKOUT ENGINE
   PART 2 — CUSTOMER + DELIVERY DETAILS
   ========================================================= */


/* =====================================================
   16. UPDATE CUSTOMER DETAILS
   ===================================================== */

function updateNexpakOnlineCheckoutCustomer(
    details = {}
) {

    if (
        !details ||
        typeof details !== "object"
    ) {

        return {

            success: false,

            message:
                "Invalid customer details."

        };

    }


    nexpakOnlineCheckout.customer = {

        ...nexpakOnlineCheckout.customer,

        name:
            safeCheckoutString(
                details.name,
                nexpakOnlineCheckout.customer.name
            ),

        email:
            safeCheckoutString(
                details.email,
                nexpakOnlineCheckout.customer.email
            ),

        phone:
            safeCheckoutString(
                details.phone,
                nexpakOnlineCheckout.customer.phone
            )

    };


    saveNexpakOnlineCheckout();


    return {

        success: true,

        customer:
            nexpakOnlineCheckout.customer

    };

}


/* =====================================================
   17. UPDATE DELIVERY DETAILS
   ===================================================== */

function updateNexpakOnlineCheckoutDelivery(
    details = {}
) {

    if (
        !details ||
        typeof details !== "object"
    ) {

        return {

            success: false,

            message:
                "Invalid delivery details."

        };

    }


    nexpakOnlineCheckout.delivery = {

        ...nexpakOnlineCheckout.delivery,

        address:
            safeCheckoutString(
                details.address,
                nexpakOnlineCheckout.delivery.address
            ),

        suburb:
            safeCheckoutString(
                details.suburb,
                nexpakOnlineCheckout.delivery.suburb
            ),

        city:
            safeCheckoutString(
                details.city,
                nexpakOnlineCheckout.delivery.city
            ),

        province:
            safeCheckoutString(
                details.province,
                nexpakOnlineCheckout.delivery.province
            ),

        postalCode:
            safeCheckoutString(
                details.postalCode,
                nexpakOnlineCheckout.delivery.postalCode
            ),

        distanceKm:
            Math.max(
                0,
                safeCheckoutNumber(
                    details.distanceKm,
                    nexpakOnlineCheckout
                        .delivery
                        .distanceKm
                )
            ),

        fee:
            Math.max(
                0,
                safeCheckoutNumber(
                    details.fee,
                    nexpakOnlineCheckout
                        .delivery
                        .fee
                )
            )

    };


    calculateNexpakOnlineCheckoutTotals();


    saveNexpakOnlineCheckout();


    return {

        success: true,

        delivery:
            nexpakOnlineCheckout.delivery,

        totals:
            nexpakOnlineCheckout.totals

    };

}


/* =====================================================
   18. GET CUSTOMER DETAILS
   ===================================================== */

function getNexpakOnlineCheckoutCustomer() {

    return {

        ...nexpakOnlineCheckout.customer

    };

}


/* =====================================================
   19. GET DELIVERY DETAILS
   ===================================================== */

function getNexpakOnlineCheckoutDelivery() {

    return {

        ...nexpakOnlineCheckout.delivery

    };

}


/* =====================================================
   20. VALIDATE CUSTOMER NAME
   ===================================================== */

function validateNexpakOnlineCheckoutName(
    name
) {

    const value =
        safeCheckoutString(
            name
        );


    if (!value) {

        return {

            valid: false,

            message:
                "Please enter your full name."

        };

    }


    if (
        value.length < 2
    ) {

        return {

            valid: false,

            message:
                "Please enter a valid name."

        };

    }


    return {

        valid: true,

        message: ""

    };

}


/* =====================================================
   21. VALIDATE EMAIL
   ===================================================== */

function validateNexpakOnlineCheckoutEmail(
    email
) {

    const value =
        safeCheckoutString(
            email
        );


    if (!value) {

        return {

            valid: false,

            message:
                "Please enter your email address."

        };

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        !emailPattern.test(
            value
        )
    ) {

        return {

            valid: false,

            message:
                "Please enter a valid email address."

        };

    }


    return {

        valid: true,

        message: ""

    };

}


/* =====================================================
   22. VALIDATE PHONE
   ===================================================== */

function validateNexpakOnlineCheckoutPhone(
    phone
) {

    const value =
        safeCheckoutString(
            phone
        );


    if (!value) {

        return {

            valid: false,

            message:
                "Please enter your phone number."

        };

    }


    const digits =
        value.replace(
            /\D/g,
            ""
        );


    if (
        digits.length < 9
    ) {

        return {

            valid: false,

            message:
                "Please enter a valid phone number."

        };

    }


    return {

        valid: true,

        message: ""

    };

}


/* =====================================================
   23. VALIDATE DELIVERY ADDRESS
   ===================================================== */

function validateNexpakOnlineCheckoutAddress(
    details
) {

    const data =
        details || {};


    const address =
        safeCheckoutString(
            data.address
        );


    const city =
        safeCheckoutString(
            data.city
        );


    const province =
        safeCheckoutString(
            data.province
        );


    const postalCode =
        safeCheckoutString(
            data.postalCode
        );


    if (!address) {

        return {

            valid: false,

            message:
                "Please enter your delivery address."

        };

    }


    if (!city) {

        return {

            valid: false,

            message:
                "Please enter your city."

        };

    }


    if (!province) {

        return {

            valid: false,

            message:
                "Please select your province."

        };

    }


    if (!postalCode) {

        return {

            valid: false,

            message:
                "Please enter your postal code."

        };

    }


    return {

        valid: true,

        message: ""

    };

}


/* =====================================================
   24. VALIDATE COMPLETE CUSTOMER INFORMATION
   ===================================================== */

function validateNexpakOnlineCheckoutCustomer() {

    const customer =
        nexpakOnlineCheckout.customer;


    const nameResult =
        validateNexpakOnlineCheckoutName(
            customer.name
        );


    if (
        !nameResult.valid
    ) {

        return nameResult;

    }


    const emailResult =
        validateNexpakOnlineCheckoutEmail(
            customer.email
        );


    if (
        !emailResult.valid
    ) {

        return emailResult;

    }


    const phoneResult =
        validateNexpakOnlineCheckoutPhone(
            customer.phone
        );


    if (
        !phoneResult.valid
    ) {

        return phoneResult;

    }


    return {

        valid: true,

        message: ""

    };

}


/* =====================================================
   25. VALIDATE COMPLETE DELIVERY INFORMATION
   ===================================================== */

function validateNexpakOnlineCheckoutDeliveryDetails() {

    return validateNexpakOnlineCheckoutAddress(

        nexpakOnlineCheckout.delivery

    );

}


/* =====================================================
   26. VALIDATE COMPLETE CHECKOUT
   ===================================================== */

function validateNexpakOnlineCheckout() {

    const cartResult =
        validateNexpakOnlineCheckoutCart();


    if (
        !cartResult.valid
    ) {

        return cartResult;

    }


    const customerResult =
        validateNexpakOnlineCheckoutCustomer();


    if (
        !customerResult.valid
    ) {

        return customerResult;

    }


    const deliveryResult =
        validateNexpakOnlineCheckoutDeliveryDetails();


    if (
        !deliveryResult.valid
    ) {

        return deliveryResult;

    }


    return {

        valid: true,

        message:
            "Checkout information is valid."

    };

}


/* =====================================================
   27. CLEAR CUSTOMER DETAILS
   ===================================================== */

function clearNexpakOnlineCheckoutCustomer() {

    nexpakOnlineCheckout.customer = {

        name: "",

        email: "",

        phone: ""

    };


    saveNexpakOnlineCheckout();


    return true;

}


/* =====================================================
   28. CLEAR DELIVERY DETAILS
   ===================================================== */

function clearNexpakOnlineCheckoutDelivery() {

    nexpakOnlineCheckout.delivery = {

        address: "",

        suburb: "",

        city: "",

        province: "",

        postalCode: "",

        distanceKm: 0,

        fee: 0

    };


    calculateNexpakOnlineCheckoutTotals();


    saveNexpakOnlineCheckout();


    return true;

}


/* =====================================================
   29. EXTEND PUBLIC CHECKOUT API
   ===================================================== */

if (
    window.NEXPAK_ONLINE_CHECKOUT
) {

    window.NEXPAK_ONLINE_CHECKOUT.updateCustomer =
        updateNexpakOnlineCheckoutCustomer;


    window.NEXPAK_ONLINE_CHECKOUT.updateDelivery =
        updateNexpakOnlineCheckoutDelivery;


    window.NEXPAK_ONLINE_CHECKOUT.getCustomer =
        getNexpakOnlineCheckoutCustomer;


    window.NEXPAK_ONLINE_CHECKOUT.getDelivery =
        getNexpakOnlineCheckoutDelivery;


    window.NEXPAK_ONLINE_CHECKOUT.validateCustomer =
        validateNexpakOnlineCheckoutCustomer;


    window.NEXPAK_ONLINE_CHECKOUT.validateDelivery =
        validateNexpakOnlineCheckoutDeliveryDetails;


    window.NEXPAK_ONLINE_CHECKOUT.validate =
        validateNexpakOnlineCheckout;


    window.NEXPAK_ONLINE_CHECKOUT.clearCustomer =
        clearNexpakOnlineCheckoutCustomer;


    window.NEXPAK_ONLINE_CHECKOUT.clearDelivery =
        clearNexpakOnlineCheckoutDelivery;

}


/* =====================================================
   PART 2 END
   ========================================================= */

 /* =========================================================
   NEXPAK ONLINE STORE — CHECKOUT ENGINE
   PART 3 — CHECKOUT FORM BINDING
   ========================================================= */


/* =====================================================
   30. FIND CHECKOUT FORM
   ===================================================== */

function findNexpakOnlineCheckoutForm() {

    const selectors = [

        "#onlineCheckoutForm",

        "#checkoutForm",

        ".online-checkout-form",

        "[data-online-checkout-form]",

        "form[data-checkout-form]"

    ];


    for (
        let i = 0;
        i < selectors.length;
        i++
    ) {

        const form =
            document.querySelector(
                selectors[i]
            );


        if (form) {

            return form;

        }

    }


    return null;

}


/* =====================================================
   31. GET FORM FIELD
   ===================================================== */

function getNexpakOnlineCheckoutField(
    form,
    names
) {

    if (!form) {

        return null;

    }


    if (!Array.isArray(names)) {

        names = [names];

    }


    for (
        let i = 0;
        i < names.length;
        i++
    ) {

        const name =
            names[i];


        const field =
            form.querySelector(
                `[name="${name}"]`
            );


        if (field) {

            return field;

        }


        const idField =
            form.querySelector(
                `#${name}`
            );


        if (idField) {

            return idField;

        }


        const dataField =
            form.querySelector(
                `[data-checkout-field="${name}"]`
            );


        if (dataField) {

            return dataField;

        }

    }


    return null;

}


/* =====================================================
   32. READ CHECKOUT FORM
   ===================================================== */

function readNexpakOnlineCheckoutForm(
    form = null
) {

    if (!form) {

        form =
            findNexpakOnlineCheckoutForm();

    }


    if (!form) {

        return {

            success: false,

            message:
                "Checkout form not found."

        };

    }


    const nameField =
        getNexpakOnlineCheckoutField(
            form,
            [
                "name",
                "fullName",
                "customerName"
            ]
        );


    const emailField =
        getNexpakOnlineCheckoutField(
            form,
            [
                "email",
                "customerEmail"
            ]
        );


    const phoneField =
        getNexpakOnlineCheckoutField(
            form,
            [
                "phone",
                "telephone",
                "mobile",
                "customerPhone"
            ]
        );


    const addressField =
        getNexpakOnlineCheckoutField(
            form,
            [
                "address",
                "streetAddress",
                "deliveryAddress"
            ]
        );


    const suburbField =
        getNexpakOnlineCheckoutField(
            form,
            [
                "suburb",
                "deliverySuburb"
            ]
        );


    const cityField =
        getNexpakOnlineCheckoutField(
            form,
            [
                "city",
                "town",
                "deliveryCity"
            ]
        );


    const provinceField =
        getNexpakOnlineCheckoutField(
            form,
            [
                "province",
                "state",
                "deliveryProvince"
            ]
        );


    const postalCodeField =
        getNexpakOnlineCheckoutField(
            form,
            [
                "postalCode",
                "postcode",
                "zip",
                "deliveryPostalCode"
            ]
        );


    const customer = {

        name:
            nameField
                ? nameField.value
                : "",

        email:
            emailField
                ? emailField.value
                : "",

        phone:
            phoneField
                ? phoneField.value
                : ""

    };


    const delivery = {

        address:
            addressField
                ? addressField.value
                : "",

        suburb:
            suburbField
                ? suburbField.value
                : "",

        city:
            cityField
                ? cityField.value
                : "",

        province:
            provinceField
                ? provinceField.value
                : "",

        postalCode:
            postalCodeField
                ? postalCodeField.value
                : ""

    };


    return {

        success: true,

        customer: customer,

        delivery: delivery

    };

}


/* =====================================================
   33. SAVE CHECKOUT FORM
   ===================================================== */

function saveNexpakOnlineCheckoutForm(
    form = null
) {

    const result =
        readNexpakOnlineCheckoutForm(
            form
        );


    if (
        !result.success
    ) {

        return result;

    }


    updateNexpakOnlineCheckoutCustomer(
        result.customer
    );


    updateNexpakOnlineCheckoutDelivery(
        result.delivery
    );


    return {

        success: true,

        customer:
            nexpakOnlineCheckout.customer,

        delivery:
            nexpakOnlineCheckout.delivery

    };

}


/* =====================================================
   34. SET FIELD ERROR
   ===================================================== */

function setNexpakOnlineCheckoutFieldError(
    field,
    message
) {

    if (!field) {

        return;

    }


    field.classList.add(
        "is-invalid"
    );


    field.setAttribute(
        "aria-invalid",
        "true"
    );


    let errorElement =
        field.parentElement
            ? field.parentElement.querySelector(
                ".checkout-field-error"
            )
            : null;


    if (!errorElement) {

        errorElement =
            document.createElement(
                "div"
            );


        errorElement.className =
            "checkout-field-error";


        errorElement.setAttribute(
            "role",
            "alert"
        );


        if (
            field.parentElement
        ) {

            field.parentElement.appendChild(
                errorElement
            );

        }

    }


    errorElement.textContent =
        message || "";

}


/* =====================================================
   35. CLEAR FIELD ERROR
   ===================================================== */

function clearNexpakOnlineCheckoutFieldError(
    field
) {

    if (!field) {

        return;

    }


    field.classList.remove(
        "is-invalid"
    );


    field.removeAttribute(
        "aria-invalid"
    );


    const errorElement =
        field.parentElement
            ? field.parentElement.querySelector(
                ".checkout-field-error"
            )
            : null;


    if (errorElement) {

        errorElement.textContent =
            "";

    }

}


/* =====================================================
   36. VALIDATE CHECKOUT FORM
   ===================================================== */

function validateNexpakOnlineCheckoutForm(
    form = null
) {

    if (!form) {

        form =
            findNexpakOnlineCheckoutForm();

    }


    if (!form) {

        return {

            valid: false,

            message:
                "Checkout form not found."

        };

    }


    const data =
        readNexpakOnlineCheckoutForm(
            form
        );


    if (
        !data.success
    ) {

        return {

            valid: false,

            message:
                data.message

        };

    }


    /*
     * Clear old errors first.
     */

    form
        .querySelectorAll(
            ".is-invalid"
        )
        .forEach(

            field => {

                clearNexpakOnlineCheckoutFieldError(
                    field
                );

            }

        );


    /*
     * Customer name.
     */

    const nameResult =
        validateNexpakOnlineCheckoutName(
            data.customer.name
        );


    if (
        !nameResult.valid
    ) {

        const field =
            getNexpakOnlineCheckoutField(
                form,
                [
                    "name",
                    "fullName",
                    "customerName"
                ]
            );


        setNexpakOnlineCheckoutFieldError(
            field,
            nameResult.message
        );


        return nameResult;

    }


    /*
     * Email.
     */

    const emailResult =
        validateNexpakOnlineCheckoutEmail(
            data.customer.email
        );


    if (
        !emailResult.valid
    ) {

        const field =
            getNexpakOnlineCheckoutField(
                form,
                [
                    "email",
                    "customerEmail"
                ]
            );


        setNexpakOnlineCheckoutFieldError(
            field,
            emailResult.message
        );


        return emailResult;

    }


    /*
     * Phone.
     */

    const phoneResult =
        validateNexpakOnlineCheckoutPhone(
            data.customer.phone
        );


    if (
        !phoneResult.valid
    ) {

        const field =
            getNexpakOnlineCheckoutField(
                form,
                [
                    "phone",
                    "telephone",
                    "mobile",
                    "customerPhone"
                ]
            );


        setNexpakOnlineCheckoutFieldError(
            field,
            phoneResult.message
        );


        return phoneResult;

    }


    /*
     * Delivery address.
     */

    const addressResult =
        validateNexpakOnlineCheckoutAddress(
            data.delivery
        );


    if (
        !addressResult.valid
    ) {

        const field =
            getNexpakOnlineCheckoutField(
                form,
                [
                    "address",
                    "streetAddress",
                    "deliveryAddress"
                ]
            );


        setNexpakOnlineCheckoutFieldError(
            field,
            addressResult.message
        );


        return addressResult;

    }


    return {

        valid: true,

        message:
            "Checkout form is valid."

    };

}


/* =====================================================
   37. CHECKOUT SUBMIT HANDLER
   ===================================================== */

function handleNexpakOnlineCheckoutSubmit(
    event
) {

    const form =
        event.target;


    if (!form) {

        return;

    }


    /*
     * Only handle the Online Store
     * checkout form.
     */

    const recognisedForm =
        (
            form.matches &&
            (
                form.matches(
                    "#onlineCheckoutForm"
                ) ||

                form.matches(
                    "#checkoutForm"
                ) ||

                form.matches(
                    ".online-checkout-form"
                ) ||

                form.matches(
                    "[data-online-checkout-form]"
                ) ||

                form.matches(
                    "form[data-checkout-form]"
                )
            )
        );


    if (!recognisedForm) {

        return;

    }


    event.preventDefault();


    const validation =
        validateNexpakOnlineCheckoutForm(
            form
        );


    if (
        !validation.valid
    ) {

        return;

    }


    const saved =
        saveNexpakOnlineCheckoutForm(
            form
        );


    if (
        !saved.success
    ) {

        console.error(
            "NEXPAK Checkout: Could not save form.",
            saved
        );


        return;

    }


    /*
     * Do not process payment here.
     *
     * Part 4+ will handle payment-method
     * selection and the final checkout flow.
     */

    document.dispatchEvent(

        new CustomEvent(
            "nexpak:checkout-form-valid",
            {

                detail: {

                    checkout:
                        getNexpakOnlineCheckoutState()

                }

            }

        )

    );

}


/* =====================================================
   38. BIND CHECKOUT FORM
   ===================================================== */

function bindNexpakOnlineCheckoutForm() {

    document.removeEventListener(
        "submit",
        handleNexpakOnlineCheckoutSubmit
    );


    document.addEventListener(
        "submit",
        handleNexpakOnlineCheckoutSubmit
    );


    return true;

}


/* =====================================================
   39. AUTO-SAVE FORM FIELDS
   ===================================================== */

function bindNexpakOnlineCheckoutAutoSave() {

    const form =
        findNexpakOnlineCheckoutForm();


    if (!form) {

        return false;

    }


    if (
        form.dataset
            .nexpakCheckoutAutosave ===
        "true"
    ) {

        return true;

    }


    form.addEventListener(

        "input",

        function () {

            const data =
                readNexpakOnlineCheckoutForm(
                    form
                );


            if (
                !data.success
            ) {

                return;

            }


            updateNexpakOnlineCheckoutCustomer(
                data.customer
            );


            updateNexpakOnlineCheckoutDelivery(
                data.delivery
            );

        }

    );


    form.dataset
        .nexpakCheckoutAutosave =
        "true";


    return true;

}


/* =====================================================
   40. INITIALISE CHECKOUT FORM
   ===================================================== */

function initialiseNexpakOnlineCheckoutForm() {

    bindNexpakOnlineCheckoutForm();


    bindNexpakOnlineCheckoutAutoSave();


    return true;

}


/* =====================================================
   41. EXTEND PUBLIC CHECKOUT API
   ===================================================== */

if (
    window.NEXPAK_ONLINE_CHECKOUT
) {

    window.NEXPAK_ONLINE_CHECKOUT.findForm =
        findNexpakOnlineCheckoutForm;


    window.NEXPAK_ONLINE_CHECKOUT.readForm =
        readNexpakOnlineCheckoutForm;


    window.NEXPAK_ONLINE_CHECKOUT.saveForm =
        saveNexpakOnlineCheckoutForm;


    window.NEXPAK_ONLINE_CHECKOUT.validateForm =
        validateNexpakOnlineCheckoutForm;


    window.NEXPAK_ONLINE_CHECKOUT.bindForm =
        bindNexpakOnlineCheckoutForm;


    window.NEXPAK_ONLINE_CHECKOUT.initialiseForm =
        initialiseNexpakOnlineCheckoutForm;

}


/* =====================================================
   PART 3 END
   ========================================================= */

 /* =========================================================
   NEXPAK ONLINE STORE — CHECKOUT ENGINE
   PART 4 — ORDER SUMMARY + PAYMENT METHOD
   ========================================================= */


/* =====================================================
   42. PAYMENT METHODS
   ===================================================== */

const NEXPAK_ONLINE_PAYMENT_METHODS = {

    EFT: {

        id: "eft",

        name: "Instant EFT / Bank Transfer",

        available: true,

        status: "available"

    },

    PAYFAST: {

        id: "payfast",

        name: "PayFast",

        available: false,

        status: "coming-soon"

    }

};


/* =====================================================
   43. SELECT PAYMENT METHOD
   ===================================================== */

function selectNexpakOnlinePaymentMethod(
    method
) {

    const selected =
        safeCheckoutString(
            method
        ).toLowerCase();


    if (
        selected === "eft" ||
        selected === "instant-eft" ||
        selected === "bank-transfer"
    ) {

        nexpakOnlineCheckout.payment = {

            method: "eft",

            status: "pending"

        };


        saveNexpakOnlineCheckout();


        return {

            success: true,

            method: "eft",

            status: "pending"

        };

    }


    if (
        selected === "payfast"
    ) {

        /*
         * PayFast is deliberately NOT processed
         * until the NEXPAK PayFast account is ready.
         */

        nexpakOnlineCheckout.payment = {

            method: "payfast",

            status: "coming-soon"

        };


        saveNexpakOnlineCheckout();


        return {

            success: false,

            method: "payfast",

            status: "coming-soon",

            message:
                "PayFast payment is not available yet. Please use Instant EFT."

        };

    }


    return {

        success: false,

        method: "",

        status: "invalid",

        message:
            "Please select a valid payment method."

    };

}


/* =====================================================
   44. GET SELECTED PAYMENT METHOD
   ===================================================== */

function getNexpakOnlinePaymentMethod() {

    return {

        ...nexpakOnlineCheckout.payment

    };

}


/* =====================================================
   45. GET ORDER SUMMARY
   ===================================================== */

function getNexpakOnlineCheckoutSummary() {

    calculateNexpakOnlineCheckoutTotals();


    return {

        orderReference:
            nexpakOnlineCheckout.orderReference,

        items:
            nexpakOnlineCheckout.cart,

        customer:
            {
                ...nexpakOnlineCheckout.customer
            },

        delivery:
            {
                ...nexpakOnlineCheckout.delivery
            },

        payment:
            {
                ...nexpakOnlineCheckout.payment
            },

        totals:
            {
                ...nexpakOnlineCheckout.totals
            },

        createdAt:
            nexpakOnlineCheckout.createdAt

    };

}


/* =====================================================
   46. FORMAT CHECKOUT MONEY
   ===================================================== */

function formatNexpakOnlineCheckoutMoney(
    value
) {

    const amount =
        safeCheckoutNumber(
            value,
            0
        );


    return (

        "R " +

        amount.toLocaleString(
            "en-ZA",
            {

                minimumFractionDigits: 2,

                maximumFractionDigits: 2

            }

        )

    );

}


/* =====================================================
   47. FIND ORDER SUMMARY CONTAINER
   ===================================================== */

function findNexpakOnlineCheckoutSummaryContainer() {

    const selectors = [

        "#onlineCheckoutSummary",

        "#checkoutSummary",

        ".online-checkout-summary",

        "[data-online-checkout-summary]"

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


        if (element) {

            return element;

        }

    }


    return null;

}


/* =====================================================
   48. RENDER ORDER SUMMARY
   ===================================================== */

function renderNexpakOnlineCheckoutSummary(
    container = null
) {

    if (!container) {

        container =
            findNexpakOnlineCheckoutSummaryContainer();

    }


    if (!container) {

        return false;

    }


    const summary =
        getNexpakOnlineCheckoutSummary();


    let itemsHtml = "";


    if (
        !Array.isArray(
            summary.items
        ) ||
        !summary.items.length
    ) {

        itemsHtml =

            '<div class="online-checkout-empty">' +

                'Your cart is empty.' +

            '</div>';

    }

    else {

        summary.items.forEach(

            item => {

                const quantity =
                    Math.max(
                        1,
                        safeCheckoutNumber(
                            item.quantity,
                            1
                        )
                    );


                const unitPrice =
                    Math.max(
                        0,
                        safeCheckoutNumber(
                            item.priceExVat,
                            0
                        )
                    );


                const lineTotal =
                    unitPrice *
                    quantity;


                itemsHtml +=

                    '<div class="online-checkout-item">' +

                        '<div class="online-checkout-item-name">' +

                            escapeNexpakOnlineCheckoutHtml(
                                item.name ||
                                "Security Kit"
                            ) +

                        '</div>' +

                        '<div class="online-checkout-item-quantity">' +

                            'Qty: ' +

                            quantity +

                        '</div>' +

                        '<div class="online-checkout-item-price">' +

                            formatNexpakOnlineCheckoutMoney(
                                lineTotal
                            ) +

                        '</div>' +

                    '</div>';

            }

        );

    }


    container.innerHTML =

        '<div class="online-checkout-summary-header">' +

            '<h3>Order Summary</h3>' +

            (
                summary.orderReference

                    ?

                '<span class="online-checkout-order-reference">' +

                    'Order: ' +

                    escapeNexpakOnlineCheckoutHtml(
                        summary.orderReference
                    ) +

                '</span>'

                    :

                ''

            ) +

        '</div>' +


        '<div class="online-checkout-items">' +

            itemsHtml +

        '</div>' +


        '<div class="online-checkout-totals">' +

            '<div class="online-checkout-total-row">' +

                '<span>Subtotal EX VAT</span>' +

                '<strong>' +

                    formatNexpakOnlineCheckoutMoney(
                        summary.totals.subtotalExVat
                    ) +

                '</strong>' +

            '</div>' +


            '<div class="online-checkout-total-row">' +

                '<span>VAT @ 15%</span>' +

                '<strong>' +

                    formatNexpakOnlineCheckoutMoney(
                        summary.totals.vatAmount
                    ) +

                '</strong>' +

            '</div>' +


            '<div class="online-checkout-total-row">' +

                '<span>Delivery</span>' +

                '<strong>' +

                    formatNexpakOnlineCheckoutMoney(
                        summary.totals.deliveryFee
                    ) +

                '</strong>' +

            '</div>' +


            '<div class="online-checkout-total-row online-checkout-grand-total">' +

                '<span>Total</span>' +

                '<strong>' +

                    formatNexpakOnlineCheckoutMoney(
                        summary.totals.grandTotal
                    ) +

                '</strong>' +

            '</div>' +

        '</div>';



    return true;

}


/* =====================================================
   49. ESCAPE CHECKOUT HTML
   ===================================================== */

function escapeNexpakOnlineCheckoutHtml(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   50. FIND PAYMENT CONTAINER
   ===================================================== */

function findNexpakOnlinePaymentContainer() {

    const selectors = [

        "#onlinePaymentMethods",

        "#paymentMethods",

        ".online-payment-methods",

        ".checkout-payment-methods",

        "[data-online-payment-methods]"

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


        if (element) {

            return element;

        }

    }


    return null;

}


/* =====================================================
   51. RENDER PAYMENT METHODS
   ===================================================== */

function renderNexpakOnlinePaymentMethods(
    container = null
) {

    if (!container) {

        container =
            findNexpakOnlinePaymentContainer();

    }


    if (!container) {

        return false;

    }


    const selected =
        nexpakOnlineCheckout
            .payment
            .method;


    container.innerHTML =

        '<div class="online-payment-method">' +

            '<label class="online-payment-option">' +

                '<input ' +

                    'type="radio" ' +

                    'name="onlinePaymentMethod" ' +

                    'value="eft" ' +

                    'data-payment-method="eft" ' +

                    (
                        selected === "eft"
                            ? "checked"
                            : ""
                    ) +

                '>' +

                '<span class="online-payment-option-content">' +

                    '<strong>' +

                        'Instant EFT / Bank Transfer' +

                    '</strong>' +

                    '<small>' +

                        'Pay directly into the NEXPAK bank account.' +

                    '</small>' +

                '</span>' +

            '</label>' +

        '</div>' +


        '<div class="online-payment-method online-payment-disabled">' +

            '<label class="online-payment-option">' +

                '<input ' +

                    'type="radio" ' +

                    'name="onlinePaymentMethod" ' +

                    'value="payfast" ' +

                    'data-payment-method="payfast" ' +

                'disabled' +

                '>' +

                '<span class="online-payment-option-content">' +

                    '<strong>' +

                        'PayFast' +

                    '</strong>' +

                    '<small>' +

                        'Coming soon — PayFast account setup pending.' +

                    '</small>' +

                '</span>' +

            '</label>' +

        '</div>';


    return true;

}


/* =====================================================
   52. PAYMENT METHOD CHANGE HANDLER
   ===================================================== */

function handleNexpakOnlinePaymentMethodChange(
    event
) {

    const target =
        event.target;


    if (!target) {

        return;

    }


    if (
        target.getAttribute(
            "data-payment-method"
        ) === null
    ) {

        return;

    }


    const method =
        target.value;


    const result =
        selectNexpakOnlinePaymentMethod(
            method
        );


    if (
        !result.success
    ) {

        console.warn(
            "NEXPAK Checkout:",
            result.message
        );


        return;

    }


    document.dispatchEvent(

        new CustomEvent(
            "nexpak:payment-method-changed",
            {

                detail: {

                    method:
                        result.method,

                    status:
                        result.status

                }

            }

        )

    );

}


/* =====================================================
   53. BIND PAYMENT METHODS
   ===================================================== */

function bindNexpakOnlinePaymentMethods() {

    document.removeEventListener(
        "change",
        handleNexpakOnlinePaymentMethodChange
    );


    document.addEventListener(
        "change",
        handleNexpakOnlinePaymentMethodChange
    );


    return true;

}


/* =====================================================
   54. RENDER COMPLETE CHECKOUT SUMMARY
   ===================================================== */

function renderNexpakOnlineCheckoutOverview() {

    renderNexpakOnlineCheckoutSummary();


    renderNexpakOnlinePaymentMethods();


    return true;

}


/* =====================================================
   55. EXTEND PUBLIC CHECKOUT API
   ===================================================== */

if (
    window.NEXPAK_ONLINE_CHECKOUT
) {

    window.NEXPAK_ONLINE_CHECKOUT.paymentMethods =
        NEXPAK_ONLINE_PAYMENT_METHODS;


    window.NEXPAK_ONLINE_CHECKOUT.selectPayment =
        selectNexpakOnlinePaymentMethod;


    window.NEXPAK_ONLINE_CHECKOUT.getPayment =
        getNexpakOnlinePaymentMethod;


    window.NEXPAK_ONLINE_CHECKOUT.getSummary =
        getNexpakOnlineCheckoutSummary;


    window.NEXPAK_ONLINE_CHECKOUT.renderSummary =
        renderNexpakOnlineCheckoutSummary;


    window.NEXPAK_ONLINE_CHECKOUT.renderPayment =
        renderNexpakOnlinePaymentMethods;


    window.NEXPAK_ONLINE_CHECKOUT.renderOverview =
        renderNexpakOnlineCheckoutOverview;


    window.NEXPAK_ONLINE_CHECKOUT.bindPayment =
        bindNexpakOnlinePaymentMethods;

}


/* =====================================================
   PART 4 END
   ========================================================= */

 /* =========================================================
   NEXPAK ONLINE STORE — CHECKOUT ENGINE
   PART 5 — INSTANT EFT + PAYMENT SUBMISSION
   ========================================================= */


/* =====================================================
   56. INSTANT EFT CONFIGURATION
   ===================================================== */

const NEXPAK_ONLINE_EFT_CONFIG = {

    available: true,

    accountName:
        "TO BE CONFIGURED",

    bankName:
        "TO BE CONFIGURED",

    accountNumber:
        "TO BE CONFIGURED",

    branchCode:
        "TO BE CONFIGURED",

    accountType:
        "TO BE CONFIGURED",

    instructions:
        "Use your NEXPAK order number as the payment reference."

};


/* =====================================================
   57. GET EFT CONFIGURATION
   ===================================================== */

function getNexpakOnlineEftConfiguration() {

    return {

        ...NEXPAK_ONLINE_EFT_CONFIG

    };

}


/* =====================================================
   58. FIND EFT CONTAINER
   ===================================================== */

function findNexpakOnlineEftContainer() {

    const selectors = [

        "#onlineEftDetails",

        "#eftDetails",

        ".online-eft-details",

        ".checkout-eft-details",

        "[data-online-eft-details]"

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


        if (element) {

            return element;

        }

    }


    return null;

}


/* =====================================================
   59. RENDER EFT DETAILS
   ===================================================== */

function renderNexpakOnlineEftDetails(
    container = null
) {

    if (!container) {

        container =
            findNexpakOnlineEftContainer();

    }


    if (!container) {

        return false;

    }


    const reference =
        nexpakOnlineCheckout
            .orderReference ||
        "YOUR ORDER NUMBER";


    const config =
        NEXPAK_ONLINE_EFT_CONFIG;


    container.innerHTML =

        '<div class="online-eft-panel">' +

            '<div class="online-eft-header">' +

                '<h3>Instant EFT / Bank Transfer</h3>' +

                '<p>' +

                    'Please use the order number below as your payment reference.' +

                '</p>' +

            '</div>' +


            '<div class="online-eft-order-reference">' +

                '<span>Payment Reference</span>' +

                '<strong>' +

                    escapeNexpakOnlineCheckoutHtml(
                        reference
                    ) +

                '</strong>' +

            '</div>' +


            '<div class="online-eft-bank-details">' +

                '<div class="online-eft-detail-row">' +

                    '<span>Account Name</span>' +

                    '<strong>' +

                        escapeNexpakOnlineCheckoutHtml(
                            config.accountName
                        ) +

                    '</strong>' +

                '</div>' +


                '<div class="online-eft-detail-row">' +

                    '<span>Bank</span>' +

                    '<strong>' +

                        escapeNexpakOnlineCheckoutHtml(
                            config.bankName
                        ) +

                    '</strong>' +

                '</div>' +


                '<div class="online-eft-detail-row">' +

                    '<span>Account Number</span>' +

                    '<strong>' +

                        escapeNexpakOnlineCheckoutHtml(
                            config.accountNumber
                        ) +

                    '</strong>' +

                '</div>' +


                '<div class="online-eft-detail-row">' +

                    '<span>Branch Code</span>' +

                    '<strong>' +

                        escapeNexpakOnlineCheckoutHtml(
                            config.branchCode
                        ) +

                    '</strong>' +

                '</div>' +


                '<div class="online-eft-detail-row">' +

                    '<span>Account Type</span>' +

                    '<strong>' +

                        escapeNexpakOnlineCheckoutHtml(
                            config.accountType
                        ) +

                    '</strong>' +

                '</div>' +

            '</div>' +


            '<div class="online-eft-instructions">' +

                escapeNexpakOnlineCheckoutHtml(
                    config.instructions
                ) +

            '</div>' +


            '<label class="online-eft-confirmation">' +

                '<input ' +

                    'type="checkbox" ' +

                    'id="eftPaymentConfirmation" ' +

                    'data-eft-payment-confirmation' +

                '>' +

                '<span>' +

                    'I have made the EFT payment using the reference above.' +

                '</span>' +

            '</label>' +


            '<button ' +

                'type="button" ' +

                'class="online-eft-submit-button" ' +

                'data-submit-eft-payment' +

            '>' +

                'I've Made Payment' +

            '</button>' +

        '</div>';


    return true;

}


/* =====================================================
   60. CHECK EFT SELECTION
   ===================================================== */

function isNexpakOnlineEftSelected() {

    return (

        nexpakOnlineCheckout
            .payment
            .method ===
        "eft"

    );

}


/* =====================================================
   61. VALIDATE EFT SUBMISSION
   ===================================================== */

function validateNexpakOnlineEftSubmission() {

    if (
        !isNexpakOnlineEftSelected()
    ) {

        return {

            valid: false,

            message:
                "Please select Instant EFT first."

        };

    }


    if (
        !nexpakOnlineCheckout.orderReference
    ) {

        return {

            valid: false,

            message:
                "Your order reference has not been created yet."

        };

    }


    const confirmation =
        document.querySelector(
            "#eftPaymentConfirmation"
        );


    if (
        confirmation &&
        !confirmation.checked
    ) {

        return {

            valid: false,

            message:
                "Please confirm that you have made the EFT payment."

        };

    }


    return {

        valid: true,

        message:
            "EFT payment submission is ready."

    };

}


/* =====================================================
   62. MARK EFT AS SUBMITTED
   ===================================================== */

function submitNexpakOnlineEftPayment() {

    const validation =
        validateNexpakOnlineEftSubmission();


    if (
        !validation.valid
    ) {

        return {

            success: false,

            message:
                validation.message

        };

    }


    /*
     * IMPORTANT:
     *
     * This does NOT mark the order as PAID.
     *
     * The payment still requires manual
     * verification against the bank account.
     */

    nexpakOnlineCheckout.payment = {

        method: "eft",

        status: "submitted",

        submittedAt:
            new Date().toISOString()

    };


    saveNexpakOnlineCheckout();


    document.dispatchEvent(

        new CustomEvent(
            "nexpak:eft-payment-submitted",
            {

                detail: {

                    orderReference:
                        nexpakOnlineCheckout
                            .orderReference,

                    status:
                        "submitted",

                    checkout:
                        getNexpakOnlineCheckoutState()

                }

            }

        )

    );


    return {

        success: true,

        orderReference:
            nexpakOnlineCheckout
                .orderReference,

        status:
            "submitted"

    };

}


/* =====================================================
   63. EFT SUBMISSION BUTTON HANDLER
   ===================================================== */

function handleNexpakOnlineEftSubmit(
    event
) {

    const button =
        event.target.closest(
            "[data-submit-eft-payment]"
        );


    if (!button) {

        return;

    }


    event.preventDefault();


    const result =
        submitNexpakOnlineEftPayment();


    if (
        !result.success
    ) {

        console.warn(
            "NEXPAK Checkout:",
            result.message
        );


        return;

    }


    /*
     * The order is now waiting for
     * payment verification.
     */

    showNexpakOnlineEftSubmissionMessage(
        result.orderReference
    );

}


/* =====================================================
   64. SHOW EFT SUBMISSION MESSAGE
   ===================================================== */

function showNexpakOnlineEftSubmissionMessage(
    orderReference
) {

    const selectors = [

        "#onlineEftMessage",

        "#eftPaymentMessage",

        ".online-eft-message",

        "[data-online-eft-message]"

    ];


    let element = null;


    for (
        let i = 0;
        i < selectors.length;
        i++
    ) {

        element =
            document.querySelector(
                selectors[i]
            );


        if (element) {

            break;

        }

    }


    if (!element) {

        element =
            document.createElement(
                "div"
            );


        element.className =
            "online-eft-message";


        const container =
            findNexpakOnlineEftContainer();


        if (container) {

            container.appendChild(
                element
            );

        }

    }


    if (!element) {

        return;

    }


    element.innerHTML =

        '<strong>' +

            'Payment submitted for verification.' +

        '</strong>' +

        '<p>' +

            'Your order reference is ' +

            '<strong>' +

                escapeNexpakOnlineCheckoutHtml(
                    orderReference
                ) +

            '</strong>.' +

        '</p>' +

        '<p>' +

            'Your order will remain payment-pending until the EFT is verified.' +

        '</p>';


    element.classList.add(
        "is-visible"
    );

}


/* =====================================================
   65. BIND EFT SUBMISSION
   ===================================================== */

function bindNexpakOnlineEftSubmission() {

    document.removeEventListener(
        "click",
        handleNexpakOnlineEftSubmit
    );


    document.addEventListener(
        "click",
        handleNexpakOnlineEftSubmit
    );


    return true;

}


/* =====================================================
   66. PAYMENT METHOD DISPLAY HANDLER
   ===================================================== */

function handleNexpakOnlinePaymentDisplay() {

    const eftContainer =
        findNexpakOnlineEftContainer();


    if (!eftContainer) {

        return;

    }


    if (
        isNexpakOnlineEftSelected()
    ) {

        renderNexpakOnlineEftDetails(
            eftContainer
        );

    }

    else {

        eftContainer.innerHTML =
            "";

    }

}


/* =====================================================
   67. BIND PAYMENT DISPLAY EVENT
   ===================================================== */

function bindNexpakOnlinePaymentDisplay() {

    document.addEventListener(

        "nexpak:payment-method-changed",

        function () {

            handleNexpakOnlinePaymentDisplay();

        }

    );


    return true;

}


/* =====================================================
   68. EXTEND PUBLIC CHECKOUT API
   ===================================================== */

if (
    window.NEXPAK_ONLINE_CHECKOUT
) {

    window.NEXPAK_ONLINE_CHECKOUT.eft =
        NEXPAK_ONLINE_EFT_CONFIG;


    window.NEXPAK_ONLINE_CHECKOUT.getEft =
        getNexpakOnlineEftConfiguration;


    window.NEXPAK_ONLINE_CHECKOUT.renderEft =
        renderNexpakOnlineEftDetails;


    window.NEXPAK_ONLINE_CHECKOUT.validateEft =
        validateNexpakOnlineEftSubmission;


    window.NEXPAK_ONLINE_CHECKOUT.submitEft =
        submitNexpakOnlineEftPayment;


    window.NEXPAK_ONLINE_CHECKOUT.bindEft =
        bindNexpakOnlineEftSubmission;

}


/* =====================================================
   69. INITIALISE EFT HANDLERS
   ===================================================== */

bindNexpakOnlineEftSubmission();


bindNexpakOnlinePaymentDisplay();


/* =====================================================
   PART 5 END
   ========================================================= */

 /* =========================================================
   NEXPAK ONLINE STORE — CHECKOUT ENGINE
   PART 6 — ORDER CREATION + FINAL SUBMISSION
   ========================================================= */


/* =====================================================
   70. ORDER STORAGE KEY
   ===================================================== */

const NEXPAK_ONLINE_ORDERS_STORAGE_KEY =
    "NEXPAK_ONLINE_ORDERS";


/* =====================================================
   71. LOAD SAVED ORDERS
   ===================================================== */

function loadNexpakOnlineOrders() {

    try {

        const saved =
            localStorage.getItem(
                NEXPAK_ONLINE_ORDERS_STORAGE_KEY
            );


        if (!saved) {

            return [];

        }


        const orders =
            JSON.parse(
                saved
            );


        if (
            !Array.isArray(
                orders
            )
        ) {

            return [];

        }


        return orders;

    }

    catch (error) {

        console.error(
            "NEXPAK Online Store: Could not load orders.",
            error
        );


        return [];

    }

}


/* =====================================================
   72. SAVE ORDERS
   ===================================================== */

function saveNexpakOnlineOrders(
    orders
) {

    try {

        localStorage.setItem(

            NEXPAK_ONLINE_ORDERS_STORAGE_KEY,

            JSON.stringify(
                orders
            )

        );


        return true;

    }

    catch (error) {

        console.error(
            "NEXPAK Online Store: Could not save orders.",
            error
        );


        return false;

    }

}


/* =====================================================
   73. GENERATE ORDER NUMBER
   ===================================================== */

function generateNexpakOnlineOrderNumber() {

    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            now.getDate()
        ).padStart(
            2,
            "0"
        );


    const randomPart =
        Math.random()
            .toString(36)
            .substring(
                2,
                6
            )
            .toUpperCase();


    return (

        "NEX-" +

        year +

        month +

        day +

        "-" +

        randomPart

    );

}


/* =====================================================
   74. ENSURE ORDER REFERENCE
   ===================================================== */

function ensureNexpakOnlineOrderReference() {

    if (
        !nexpakOnlineCheckout.orderReference
    ) {

        nexpakOnlineCheckout.orderReference =
            generateNexpakOnlineOrderNumber();


        saveNexpakOnlineCheckout();

    }


    return nexpakOnlineCheckout
        .orderReference;

}


/* =====================================================
   75. CREATE ORDER ITEMS
   ===================================================== */

function createNexpakOnlineOrderItems() {

    if (
        !Array.isArray(
            nexpakOnlineCheckout.cart
        )
    ) {

        return [];

    }


    return nexpakOnlineCheckout.cart.map(

        item => {

            return {

                kitId:
                    item.kitId ||
                    item.id ||
                    "",

                name:
                    item.name ||
                    "Security Kit",

                quantity:
                    Math.max(
                        1,
                        safeCheckoutNumber(
                            item.quantity,
                            1
                        )
                    ),

                priceExVat:
                    Math.max(
                        0,
                        safeCheckoutNumber(
                            item.priceExVat,
                            0
                        )
                    ),

                weight:
                    Math.max(
                        0,
                        safeCheckoutNumber(
                            item.weight,
                            0
                        )
                    ),

                options:
                    item.options
                        ? JSON.parse(
                            JSON.stringify(
                                item.options
                            )
                        )
                        : {}

            };

        }

    );

}


/* =====================================================
   76. CREATE ORDER OBJECT
   ===================================================== */

function createNexpakOnlineOrder() {

    const validation =
        validateNexpakOnlineCheckout();


    if (
        !validation.valid
    ) {

        return {

            success: false,

            message:
                validation.message

        };

    }


    ensureNexpakOnlineOrderReference();


    calculateNexpakOnlineCheckoutTotals();


    const order = {

        orderReference:
            nexpakOnlineCheckout
                .orderReference,

        status:
            "payment_pending",

        paymentStatus:
            "awaiting_verification",

        paymentMethod:
            nexpakOnlineCheckout
                .payment
                .method ||
            "eft",

        createdAt:
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString(),


        customer: {

            ...nexpakOnlineCheckout.customer

        },


        delivery: {

            ...nexpakOnlineCheckout.delivery

        },


        items:
            createNexpakOnlineOrderItems(),


        totals: {

            ...nexpakOnlineCheckout.totals

        }

    };


    return {

        success: true,

        order: order

    };

}


/* =====================================================
   77. STORE ORDER
   ===================================================== */

function storeNexpakOnlineOrder(
    order
) {

    if (
        !order ||
        !order.orderReference
    ) {

        return {

            success: false,

            message:
                "Invalid order."

        };

    }


    const orders =
        loadNexpakOnlineOrders();


    /*
     * Prevent duplicate order references.
     */

    const existingIndex =
        orders.findIndex(

            existingOrder =>

                existingOrder.orderReference ===
                order.orderReference

        );


    if (
        existingIndex >= 0
    ) {

        orders[
            existingIndex
        ] = order;

    }

    else {

        orders.push(
            order
        );

    }


    const saved =
        saveNexpakOnlineOrders(
            orders
        );


    if (!saved) {

        return {

            success: false,

            message:
                "Could not save the order."

        };

    }


    return {

        success: true,

        order: order

    };

}


/* =====================================================
   78. FINALISE ONLINE ORDER
   ===================================================== */

function finaliseNexpakOnlineOrder() {

    /*
     * First validate the checkout.
     */

    const validation =
        validateNexpakOnlineCheckout();


    if (
        !validation.valid
    ) {

        return {

            success: false,

            stage: "validation",

            message:
                validation.message

        };

    }


    /*
     * Ensure EFT is selected.
     */

    if (
        !isNexpakOnlineEftSelected()
    ) {

        return {

            success: false,

            stage: "payment",

            message:
                "Please select Instant EFT."

        };

    }


    /*
     * Create order.
     */

    const created =
        createNexpakOnlineOrder();


    if (
        !created.success
    ) {

        return created;

    }


    /*
     * Store order.
     */

    const stored =
        storeNexpakOnlineOrder(
            created.order
        );


    if (
        !stored.success
    ) {

        return {

            success: false,

            stage: "storage",

            message:
                stored.message

        };

    }


    nexpakOnlineCheckout.order =
        created.order;


    nexpakOnlineCheckout.orderStatus =
        "payment_pending";


    saveNexpakOnlineCheckout();


    return {

        success: true,

        order:
            created.order,

        orderReference:
            created.order.orderReference,

        status:
            "payment_pending"

    };

}


/* =====================================================
   79. FIND ORDER BY REFERENCE
   ===================================================== */

function findNexpakOnlineOrder(
    orderReference
) {

    const reference =
        safeCheckoutString(
            orderReference
        );


    if (!reference) {

        return null;

    }


    const orders =
        loadNexpakOnlineOrders();


    return (

        orders.find(

            order =>

                order.orderReference ===
                reference

        ) ||

        null

    );

}


/* =====================================================
   80. UPDATE ORDER STATUS
   ===================================================== */

function updateNexpakOnlineOrderStatus(
    orderReference,
    status,
    paymentStatus = null
) {

    const order =
        findNexpakOnlineOrder(
            orderReference
        );


    if (!order) {

        return {

            success: false,

            message:
                "Order not found."

        };

    }


    order.status =
        status;


    order.updatedAt =
        new Date().toISOString();


    if (
        paymentStatus
    ) {

        order.paymentStatus =
            paymentStatus;

    }


    const orders =
        loadNexpakOnlineOrders();


    const index =
        orders.findIndex(

            item =>

                item.orderReference ===
                orderReference

        );


    if (
        index < 0
    ) {

        return {

            success: false,

            message:
                "Could not locate order."

        };

    }


    orders[index] =
        order;


    saveNexpakOnlineOrders(
        orders
    );


    return {

        success: true,

        order: order

    };

}


/* =====================================================
   81. CONFIRM EFT PAYMENT SUBMISSION
   ===================================================== */

function confirmNexpakOnlineEftSubmission() {

    const reference =
        ensureNexpakOnlineOrderReference();


    /*
     * The order must first be created.
     */

    let order =
        findNexpakOnlineOrder(
            reference
        );


    if (!order) {

        const finalised =
            finaliseNexpakOnlineOrder();


        if (
            !finalised.success
        ) {

            return finalised;

        }


        order =
            finalised.order;

    }


    /*
     * Payment remains UNVERIFIED.
     */

    const updated =
        updateNexpakOnlineOrderStatus(

            reference,

            "payment_pending",

            "awaiting_verification"

        );


    if (
        !updated.success
    ) {

        return updated;

    }


    nexpakOnlineCheckout.payment = {

        method: "eft",

        status: "submitted",

        submittedAt:
            new Date().toISOString()

    };


    nexpakOnlineCheckout.orderStatus =
        "payment_pending";


    saveNexpakOnlineCheckout();


    document.dispatchEvent(

        new CustomEvent(
            "nexpak:order-submitted",
            {

                detail: {

                    order:
                        updated.order,

                    status:
                        "payment_pending"

                }

            }

        )

    );


    return {

        success: true,

        order:
            updated.order,

        orderReference:
            reference,

        status:
            "payment_pending"

    };

}


/* =====================================================
   82. CLEAR CHECKOUT AFTER ORDER
   ===================================================== */

function clearNexpakOnlineCheckoutAfterOrder() {

    /*
     * Keep the order reference and customer details
     * available for the confirmation screen.
     *
     * The cart itself should only be cleared after
     * successful order submission.
     */

    nexpakOnlineCheckout.cart = [];


    if (
        typeof saveNexpakOnlineCheckout ===
        "function"
    ) {

        saveNexpakOnlineCheckout();

    }


    /*
     * Also attempt to clear the Online Store cart
     * if onlinecart.js exposes its API.
     */

    try {

        if (
            window.NEXPAK_ONLINE_CART &&
            typeof
            window.NEXPAK_ONLINE_CART.clearCart ===
            "function"
        ) {

            window.NEXPAK_ONLINE_CART.clearCart();

        }

    }

    catch (error) {

        console.warn(
            "NEXPAK Checkout: Cart could not be cleared through cart API.",
            error
        );

    }


    return true;

}


/* =====================================================
   83. GET ORDER STATUS LABEL
   ===================================================== */

function getNexpakOnlineOrderStatusLabel(
    status
) {

    const labels = {

        payment_pending:
            "Payment Pending",

        awaiting_verification:
            "Awaiting Payment Verification",

        paid:
            "Payment Confirmed",

        processing:
            "Order Processing",

        dispatched:
            "Order Dispatched",

        completed:
            "Order Completed",

        cancelled:
            "Order Cancelled"

    };


    return (

        labels[
            status
        ] ||

        "Order Received"

    );

}


/* =====================================================
   84. GET CURRENT ORDER
   ===================================================== */

function getNexpakOnlineCurrentOrder() {

    if (
        nexpakOnlineCheckout.order
    ) {

        return {

            ...nexpakOnlineCheckout.order

        };

    }


    if (
        nexpakOnlineCheckout.orderReference
    ) {

        return findNexpakOnlineOrder(

            nexpakOnlineCheckout
                .orderReference

        );

    }


    return null;

}


/* =====================================================
   85. EXTEND PUBLIC CHECKOUT API
   ===================================================== */

if (
    window.NEXPAK_ONLINE_CHECKOUT
) {

    window.NEXPAK_ONLINE_CHECKOUT.createOrder =
        createNexpakOnlineOrder;


    window.NEXPAK_ONLINE_CHECKOUT.finaliseOrder =
        finaliseNexpakOnlineOrder;


    window.NEXPAK_ONLINE_CHECKOUT.submitOrder =
        confirmNexpakOnlineEftSubmission;


    window.NEXPAK_ONLINE_CHECKOUT.findOrder =
        findNexpakOnlineOrder;


    window.NEXPAK_ONLINE_CHECKOUT.updateOrderStatus =
        updateNexpakOnlineOrderStatus;


    window.NEXPAK_ONLINE_CHECKOUT.getCurrentOrder =
        getNexpakOnlineCurrentOrder;


    window.NEXPAK_ONLINE_CHECKOUT.getStatusLabel =
        getNexpakOnlineOrderStatusLabel;


    window.NEXPAK_ONLINE_CHECKOUT.clearAfterOrder =
        clearNexpakOnlineCheckoutAfterOrder;

}


/* =====================================================
   PART 6 END
   ========================================================= */

 /* =========================================================
   NEXPAK ONLINE STORE — CHECKOUT ENGINE
   PART 7 — ORDER CONFIRMATION + RECEIPT DATA
   ========================================================= */


/* =====================================================
   86. FIND CONFIRMATION CONTAINER
   ===================================================== */

function findNexpakOnlineConfirmationContainer() {

    const selectors = [

        "#onlineOrderConfirmation",

        "#orderConfirmation",

        ".online-order-confirmation",

        ".checkout-confirmation",

        "[data-online-order-confirmation]"

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


        if (element) {

            return element;

        }

    }


    return null;

}


/* =====================================================
   87. BUILD CONFIRMATION DATA
   ===================================================== */

function getNexpakOnlineConfirmationData() {

    const order =
        getNexpakOnlineCurrentOrder();


    if (!order) {

        return {

            success: false,

            message:
                "No current order was found."

        };

    }


    return {

        success: true,

        orderReference:
            order.orderReference,

        status:
            order.status,

        statusLabel:
            getNexpakOnlineOrderStatusLabel(
                order.status
            ),

        paymentStatus:
            order.paymentStatus,

        paymentMethod:
            order.paymentMethod,

        customer:
            {
                ...order.customer
            },

        delivery:
            {
                ...order.delivery
            },

        items:
            Array.isArray(
                order.items
            )
                ? order.items
                : [],

        totals:
            {
                ...order.totals
            },

        createdAt:
            order.createdAt

    };

}


/* =====================================================
   88. FORMAT CONFIRMATION DATE
   ===================================================== */

function formatNexpakOnlineConfirmationDate(
    dateValue
) {

    if (!dateValue) {

        return "";

    }


    const date =
        new Date(
            dateValue
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return date.toLocaleString(

        "en-ZA",

        {

            dateStyle: "medium",

            timeStyle: "short"

        }

    );

}


/* =====================================================
   89. RENDER ORDER CONFIRMATION
   ===================================================== */

function renderNexpakOnlineOrderConfirmation(
    container = null
) {

    if (!container) {

        container =
            findNexpakOnlineConfirmationContainer();

    }


    if (!container) {

        return false;

    }


    const data =
        getNexpakOnlineConfirmationData();


    if (
        !data.success
    ) {

        container.innerHTML =

            '<div class="online-confirmation-error">' +

                '<h2>Order Confirmation</h2>' +

                '<p>' +

                    escapeNexpakOnlineCheckoutHtml(
                        data.message
                    ) +

                '</p>' +

            '</div>';


        return false;

    }


    let itemsHtml = "";


    data.items.forEach(

        item => {

            const quantity =
                Math.max(
                    1,
                    safeCheckoutNumber(
                        item.quantity,
                        1
                    )
                );


            itemsHtml +=

                '<div class="online-confirmation-item">' +

                    '<div>' +

                        '<strong>' +

                            escapeNexpakOnlineCheckoutHtml(
                                item.name ||
                                "Security Kit"
                            ) +

                        '</strong>' +

                        '<span>' +

                            'Qty: ' +

                            quantity +

                        '</span>' +

                    '</div>' +

                '</div>';

        }

    );


    container.innerHTML =

        '<div class="online-order-confirmation-card">' +

            '<div class="online-confirmation-success">' +

                '<div class="online-confirmation-icon">' +

                    '✓' +

                '</div>' +

                '<h2>Order Received</h2>' +

                '<p>' +

                    'Thank you. Your NEXPAK order has been received.' +

                '</p>' +

            '</div>' +


            '<div class="online-confirmation-reference">' +

                '<span>Order Number</span>' +

                '<strong>' +

                    escapeNexpakOnlineCheckoutHtml(
                        data.orderReference
                    ) +

                '</strong>' +

            '</div>' +


            '<div class="online-confirmation-payment-status">' +

                '<strong>' +

                    escapeNexpakOnlineCheckoutHtml(
                        data.statusLabel
                    ) +

                '</strong>' +

                '<p>' +

                    'Your EFT payment is awaiting verification.' +

                '</p>' +

            '</div>' +


            '<div class="online-confirmation-section">' +

                '<h3>Order Items</h3>' +

                '<div class="online-confirmation-items">' +

                    itemsHtml +

                '</div>' +

            '</div>' +


            '<div class="online-confirmation-section">' +

                '<h3>Order Total</h3>' +

                '<div class="online-confirmation-total-row">' +

                    '<span>Subtotal EX VAT</span>' +

                    '<strong>' +

                        formatNexpakOnlineCheckoutMoney(
                            data.totals.subtotalExVat
                        ) +

                    '</strong>' +

                '</div>' +


                '<div class="online-confirmation-total-row">' +

                    '<span>VAT @ 15%</span>' +

                    '<strong>' +

                        formatNexpakOnlineCheckoutMoney(
                            data.totals.vatAmount
                        ) +

                    '</strong>' +

                '</div>' +


                '<div class="online-confirmation-total-row">' +

                    '<span>Delivery</span>' +

                    '<strong>' +

                        formatNexpakOnlineCheckoutMoney(
                            data.totals.deliveryFee
                        ) +

                    '</strong>' +

                '</div>' +


                '<div class="online-confirmation-total-row online-confirmation-grand-total">' +

                    '<span>Total</span>' +

                    '<strong>' +

                        formatNexpakOnlineCheckoutMoney(
                            data.totals.grandTotal
                        ) +

                    '</strong>' +

                '</div>' +

            '</div>' +


            '<div class="online-confirmation-section">' +

                '<h3>Payment</h3>' +

                '<p>' +

                    'Method: ' +

                    '<strong>Instant EFT / Bank Transfer</strong>' +

                '</p>' +

                '<p>' +

                    'Payment status: ' +

                    '<strong>Awaiting Verification</strong>' +

                '</p>' +

            '</div>' +


            '<div class="online-confirmation-date">' +

                'Order placed: ' +

                escapeNexpakOnlineCheckoutHtml(

                    formatNexpakOnlineConfirmationDate(
                        data.createdAt
                    )

                ) +

            '</div>' +

        '</div>';


    return true;

}


/* =====================================================
   90. SHOW CONFIRMATION
   ===================================================== */

function showNexpakOnlineOrderConfirmation() {

    const container =
        findNexpakOnlineConfirmationContainer();


    if (!container) {

        return false;

    }


    container.hidden =
        false;


    container.style.display =
        "";


    return renderNexpakOnlineOrderConfirmation(
        container
    );

}


/* =====================================================
   91. HIDE CONFIRMATION
   ===================================================== */

function hideNexpakOnlineOrderConfirmation() {

    const container =
        findNexpakOnlineConfirmationContainer();


    if (!container) {

        return false;

    }


    container.hidden =
        true;


    return true;

}


/* =====================================================
   92. GET RECEIPT DATA
   ===================================================== */

function getNexpakOnlineReceiptData() {

    const data =
        getNexpakOnlineConfirmationData();


    if (
        !data.success
    ) {

        return data;

    }


    return {

        company: {

            name:
                "NEXPAK Security Solutions"

        },


        order: {

            number:
                data.orderReference,

            date:
                data.createdAt,

            status:
                data.status,

            paymentStatus:
                data.paymentStatus,

            paymentMethod:
                data.paymentMethod

        },


        customer:
            {
                ...data.customer
            },


        delivery:
            {
                ...data.delivery
            },


        items:
            data.items.map(

                item => ({

                    kitId:
                        item.kitId,

                    name:
                        item.name,

                    quantity:
                        item.quantity,

                    options:
                        item.options || {}

                })

            ),


        totals: {

            subtotalExVat:
                safeCheckoutNumber(
                    data.totals.subtotalExVat,
                    0
                ),

            vatAmount:
                safeCheckoutNumber(
                    data.totals.vatAmount,
                    0
                ),

            deliveryFee:
                safeCheckoutNumber(
                    data.totals.deliveryFee,
                    0
                ),

            grandTotal:
                safeCheckoutNumber(
                    data.totals.grandTotal,
                    0
                )

        }

    };

}


/* =====================================================
   93. PRINT ORDER CONFIRMATION
   ===================================================== */

function printNexpakOnlineOrderConfirmation() {

    const container =
        findNexpakOnlineConfirmationContainer();


    if (!container) {

        return false;

    }


    const printWindow =
        window.open(
            "",
            "_blank",
            "width=900,height=700"
        );


    if (!printWindow) {

        console.warn(
            "NEXPAK Checkout: Pop-up blocked."
        );


        return false;

    }


    printWindow.document.write(

        '<!DOCTYPE html>' +

        '<html>' +

        '<head>' +

            '<title>NEXPAK Order Confirmation</title>' +

            '<meta charset="UTF-8">' +

            '<style>' +

                'body{' +

                    'font-family:Arial,sans-serif;' +

                    'padding:30px;' +

                    'color:#222;' +

                '}' +

                'h1,h2,h3{' +

                    'margin-top:0;' +

                '}' +

                '.online-confirmation-item{' +

                    'padding:10px 0;' +

                    'border-bottom:1px solid #ddd;' +

                '}' +

                '.online-confirmation-total-row{' +

                    'display:flex;' +

                    'justify-content:space-between;' +

                    'padding:7px 0;' +

                '}' +

                '.online-confirmation-grand-total{' +

                    'font-size:20px;' +

                    'font-weight:bold;' +

                    'border-top:2px solid #222;' +

                    'margin-top:10px;' +

                    'padding-top:12px;' +

                '}' +

            '</style>' +

        '</head>' +

        '<body>' +

            container.innerHTML +

        '</body>' +

        '</html>'

    );


    printWindow.document.close();


    printWindow.focus();


    printWindow.print();


    return true;

}


/* =====================================================
   94. HANDLE ORDER SUBMITTED EVENT
   ===================================================== */

function handleNexpakOnlineOrderSubmitted(
    event
) {

    if (
        !event ||
        !event.detail
    ) {

        return;

    }


    const order =
        event.detail.order;


    if (!order) {

        return;

    }


    /*
     * The cart can now be cleared because
     * the order has been stored locally.
     */

    clearNexpakOnlineCheckoutAfterOrder();


    showNexpakOnlineOrderConfirmation();

}


/* =====================================================
   95. BIND ORDER CONFIRMATION
   ===================================================== */

function bindNexpakOnlineOrderConfirmation() {

    document.removeEventListener(
        "nexpak:order-submitted",
        handleNexpakOnlineOrderSubmitted
    );


    document.addEventListener(
        "nexpak:order-submitted",
        handleNexpakOnlineOrderSubmitted
    );


    return true;

}


/* =====================================================
   96. EXTEND PUBLIC CHECKOUT API
   ===================================================== */

if (
    window.NEXPAK_ONLINE_CHECKOUT
) {

    window.NEXPAK_ONLINE_CHECKOUT.getConfirmation =
        getNexpakOnlineConfirmationData;


    window.NEXPAK_ONLINE_CHECKOUT.renderConfirmation =
        renderNexpakOnlineOrderConfirmation;


    window.NEXPAK_ONLINE_CHECKOUT.showConfirmation =
        showNexpakOnlineOrderConfirmation;


    window.NEXPAK_ONLINE_CHECKOUT.hideConfirmation =
        hideNexpakOnlineOrderConfirmation;


    window.NEXPAK_ONLINE_CHECKOUT.getReceipt =
        getNexpakOnlineReceiptData;


    window.NEXPAK_ONLINE_CHECKOUT.printConfirmation =
        printNexpakOnlineOrderConfirmation;

}


/* =====================================================
   97. INITIALISE CONFIRMATION HANDLER
   ===================================================== */

bindNexpakOnlineOrderConfirmation();


/* =====================================================
   PART 7 END
   ========================================================= */

 /* =========================================================
   NEXPAK ONLINE STORE — CHECKOUT ENGINE
   PART 8 — FINAL INTEGRATION + INITIALISATION
   ========================================================= */


/* =====================================================
   98. CHECKOUT INITIALISATION
   ===================================================== */

function initialiseNexpakOnlineCheckout() {

    console.log(
        "NEXPAK Online Checkout: Initialising..."
    );


    /*
     * Make sure checkout state exists.
     */

    if (
        typeof loadNexpakOnlineCheckout ===
        "function"
    ) {

        loadNexpakOnlineCheckout();

    }


    /*
     * Make sure an order reference exists
     * when checkout reaches the order stage.
     */

    if (
        typeof ensureNexpakOnlineOrderReference ===
        "function"
    ) {

        ensureNexpakOnlineOrderReference();

    }


    /*
     * Bind payment handlers.
     */

    if (
        typeof bindNexpakOnlinePaymentMethods ===
        "function"
    ) {

        bindNexpakOnlinePaymentMethods();

    }


    if (
        typeof bindNexpakOnlineEftSubmission ===
        "function"
    ) {

        bindNexpakOnlineEftSubmission();

    }


    /*
     * Bind order confirmation.
     */

    if (
        typeof bindNexpakOnlineOrderConfirmation ===
        "function"
    ) {

        bindNexpakOnlineOrderConfirmation();

    }


    /*
     * Render checkout overview if the
     * required containers exist.
     */

    if (
        typeof renderNexpakOnlineCheckoutOverview ===
        "function"
    ) {

        renderNexpakOnlineCheckoutOverview();

    }


    /*
     * Render EFT information if EFT
     * is already selected.
     */

    if (
        typeof handleNexpakOnlinePaymentDisplay ===
        "function"
    ) {

        handleNexpakOnlinePaymentDisplay();

    }


    console.log(
        "NEXPAK Online Checkout: Ready."
    );


    return true;

}


/* =====================================================
   99. CHECKOUT PAGE DETECTION
   ===================================================== */

function isNexpakOnlineCheckoutPage() {

    const checkoutPage =
        document.querySelector(
            "[data-online-checkout-page]"
        );


    if (checkoutPage) {

        return true;

    }


    const path =
        window.location.pathname
            .toLowerCase();


    return (

        path.includes(
            "onlinecheckout"
        ) ||

        path.includes(
            "online-checkout"
        ) ||

        path.endsWith(
            "/checkout.html"
        )

    );

}


/* =====================================================
   100. REFRESH CHECKOUT DISPLAY
   ===================================================== */

function refreshNexpakOnlineCheckoutDisplay() {

    if (
        typeof renderNexpakOnlineCheckoutSummary ===
        "function"
    ) {

        renderNexpakOnlineCheckoutSummary();

    }


    if (
        typeof renderNexpakOnlinePaymentMethods ===
        "function"
    ) {

        renderNexpakOnlinePaymentMethods();

    }


    if (
        typeof handleNexpakOnlinePaymentDisplay ===
        "function"
    ) {

        handleNexpakOnlinePaymentDisplay();

    }


    return true;

}


/* =====================================================
   101. CHECKOUT CART SYNC
   ===================================================== */

function syncNexpakOnlineCheckoutWithCart() {

    try {

        /*
         * Prefer the Online Cart public API.
         */

        if (

            window.NEXPAK_ONLINE_CART &&

            typeof
            window.NEXPAK_ONLINE_CART.getCart ===
            "function"

        ) {

            const cart =
                window.NEXPAK_ONLINE_CART.getCart();


            if (
                Array.isArray(
                    cart
                )
            ) {

                nexpakOnlineCheckout.cart =
                    cart.map(

                        item => ({

                            ...item,

                            quantity:
                                Math.max(
                                    1,
                                    safeCheckoutNumber(
                                        item.quantity,
                                        1
                                    )
                                )

                        })

                    );


                saveNexpakOnlineCheckout();

            }

        }

    }

    catch (error) {

        console.warn(
            "NEXPAK Checkout: Cart synchronisation failed.",
            error
        );

    }


    return true;

}


/* =====================================================
   102. CART UPDATED HANDLER
   ===================================================== */

function handleNexpakOnlineCartUpdated() {

    syncNexpakOnlineCheckoutWithCart();


    refreshNexpakOnlineCheckoutDisplay();

}


/* =====================================================
   103. BIND CART SYNCHRONISATION
   ===================================================== */

function bindNexpakOnlineCartSynchronisation() {

    document.removeEventListener(
        "nexpak:cart-updated",
        handleNexpakOnlineCartUpdated
    );


    document.addEventListener(
        "nexpak:cart-updated",
        handleNexpakOnlineCartUpdated
    );


    return true;

}


/* =====================================================
   104. CHECKOUT SUBMIT HANDLER
   ===================================================== */

function handleNexpakOnlineCheckoutSubmit(
    event
) {

    const submitButton =
        event.target.closest(
            "[data-online-checkout-submit]"
        );


    if (!submitButton) {

        return;

    }


    event.preventDefault();


    /*
     * Sync cart before creating order.
     */

    syncNexpakOnlineCheckoutWithCart();


    /*
     * Final validation.
     */

    const validation =
        validateNexpakOnlineCheckout();


    if (
        !validation.valid
    ) {

        console.warn(
            "NEXPAK Checkout:",
            validation.message
        );


        return;

    }


    /*
     * EFT must be selected.
     */

    if (
        !isNexpakOnlineEftSelected()
    ) {

        console.warn(
            "NEXPAK Checkout: Instant EFT must be selected."
        );


        return;

    }


    /*
     * Submit the EFT order.
     */

    const result =
        confirmNexpakOnlineEftSubmission();


    if (
        !result.success
    ) {

        console.warn(
            "NEXPAK Checkout:",
            result.message
        );


        return;

    }


    console.log(
        "NEXPAK Checkout: Order submitted.",
        result.orderReference
    );

}


/* =====================================================
   105. BIND CHECKOUT SUBMISSION
   ===================================================== */

function bindNexpakOnlineCheckoutSubmission() {

    document.removeEventListener(
        "click",
        handleNexpakOnlineCheckoutSubmit
    );


    document.addEventListener(
        "click",
        handleNexpakOnlineCheckoutSubmit
    );


    return true;

}


/* =====================================================
   106. CHECKOUT RESET
   ===================================================== */

function resetNexpakOnlineCheckout() {

    nexpakOnlineCheckout.customer = {

        firstName: "",

        lastName: "",

        company: "",

        email: "",

        phone: ""

    };


    nexpakOnlineCheckout.delivery = {

        address1: "",

        address2: "",

        suburb: "",

        city: "",

        province: "",

        postalCode: "",

        distanceKm: 0,

        fee: 0

    };


    nexpakOnlineCheckout.payment = {

        method: "eft",

        status: "pending"

    };


    nexpakOnlineCheckout.totals = {

        subtotalExVat: 0,

        vatAmount: 0,

        deliveryFee: 0,

        grandTotal: 0

    };


    nexpakOnlineCheckout.order = null;


    nexpakOnlineCheckout.orderStatus =
        "draft";


    nexpakOnlineCheckout.orderReference =
        "";


    saveNexpakOnlineCheckout();


    return true;

}


/* =====================================================
   107. GET FINAL CHECKOUT STATE
   ===================================================== */

function getNexpakOnlineFinalCheckoutState() {

    return {

        cart:
            Array.isArray(
                nexpakOnlineCheckout.cart
            )

                ?

            JSON.parse(
                JSON.stringify(
                    nexpakOnlineCheckout.cart
                )
            )

                :

            [],


        customer:
            {
                ...nexpakOnlineCheckout.customer
            },


        delivery:
            {
                ...nexpakOnlineCheckout.delivery
            },


        payment:
            {
                ...nexpakOnlineCheckout.payment
            },


        totals:
            {
                ...nexpakOnlineCheckout.totals
            },


        orderReference:
            nexpakOnlineCheckout
                .orderReference,


        orderStatus:
            nexpakOnlineCheckout
                .orderStatus

    };

}


/* =====================================================
   108. PUBLIC CHECKOUT API
   ===================================================== */

window.NEXPAK_ONLINE_CHECKOUT = {

    version:
        "1.0.0",


    /*
     * State
     */

    getState:
        getNexpakOnlineFinalCheckoutState,


    reset:
        resetNexpakOnlineCheckout,


    refresh:
        refreshNexpakOnlineCheckoutDisplay,


    /*
     * Payment
     */

    paymentMethods:
        NEXPAK_ONLINE_PAYMENT_METHODS,


    selectPayment:
        selectNexpakOnlinePaymentMethod,


    getPayment:
        getNexpakOnlinePaymentMethod,


    /*
     * EFT
     */

    eft:
        NEXPAK_ONLINE_EFT_CONFIG,


    getEft:
        getNexpakOnlineEftConfiguration,


    submitEft:
        confirmNexpakOnlineEftSubmission,


    /*
     * Orders
     */

    createOrder:
        createNexpakOnlineOrder,


    finaliseOrder:
        finaliseNexpakOnlineOrder,


    findOrder:
        findNexpakOnlineOrder,


    updateOrderStatus:
        updateNexpakOnlineOrderStatus,


    getCurrentOrder:
        getNexpakOnlineCurrentOrder,


    /*
     * Confirmation
     */

    getConfirmation:
        getNexpakOnlineConfirmationData,


    renderConfirmation:
        renderNexpakOnlineOrderConfirmation,


    showConfirmation:
        showNexpakOnlineOrderConfirmation,


    printConfirmation:
        printNexpakOnlineOrderConfirmation,


    /*
     * Initialisation
     */

    initialise:
        initialiseNexpakOnlineCheckout

};


/* =====================================================
   109. BIND GLOBAL CHECKOUT EVENTS
   ===================================================== */

bindNexpakOnlineCartSynchronisation();


bindNexpakOnlineCheckoutSubmission();


/* =====================================================
   110. DOM READY INITIALISATION
   ===================================================== */

function startNexpakOnlineCheckout() {

    if (
        !isNexpakOnlineCheckoutPage()
    ) {

        return;

    }


    initialiseNexpakOnlineCheckout();

}


/* =====================================================
   111. START CHECKOUT
   ===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(

        "DOMContentLoaded",

        startNexpakOnlineCheckout,

        {
            once: true
        }

    );

}

else {

    startNexpakOnlineCheckout();

}


/* =====================================================
   112. FINAL ENGINE STATUS
   ===================================================== */

console.log(
    "NEXPAK Online Checkout Engine: Loaded."
);


/* =====================================================
   ONLINECHECKOUT.JS — PART 8 END
   ========================================================= */

 })();
