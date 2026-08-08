/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CHECKOUT ENGINE
=========================================================
 File: onlinecheckout.js
 Version: 1.0
 Part: 1/8

 PURPOSE:
 - Checkout engine foundation
 - Read cart data
 - Maintain checkout state
 - Customer information state
 - Order validation foundation
 - Prepare checkout flow
 - Compatible with onlinecart.js
=========================================================*/

(function () {
    "use strict";

    /*=====================================================
      CHECKOUT CONFIGURATION
    =====================================================*/

    const CHECKOUT_CONFIG = {
        version: "1.0",

        storageKey: "nexpak_checkout_v1",

        cartStorageKeys: [
            "nexpak_cart_v1",
            "nexpak_cart",
            "online_cart",
            "nexpak_online_cart"
        ],

        currency: "ZAR",

        country: "South Africa",

        minimumOrderValue: 0
    };


    /*=====================================================
      CHECKOUT STATE
    =====================================================*/

    const checkoutState = {
        step: 1,

        customer: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            company: ""
        },

        billing: {
            address1: "",
            address2: "",
            suburb: "",
            city: "",
            province: "",
            postalCode: "",
            country: "South Africa"
        },

        delivery: {
            method: "",
            address1: "",
            address2: "",
            suburb: "",
            city: "",
            province: "",
            postalCode: "",
            instructions: ""
        },

        payment: {
            method: "",
            status: "pending",
            reference: ""
        },

        notes: "",

        cart: [],

        totals: {
            subtotal: 0,
            delivery: 0,
            discount: 0,
            tax: 0,
            total: 0
        },

        order: {
            orderNumber: "",
            createdAt: "",
            status: "draft"
        }
    };


    /*=====================================================
      UTILITY — SAFE NUMBER
    =====================================================*/

    function safeNumber(value) {

        const number = Number(value);

        return Number.isFinite(number) ? number : 0;
    }


    /*=====================================================
      UTILITY — SAFE STORAGE READ
    =====================================================*/

    function readStorage(key) {

        try {

            const data = localStorage.getItem(key);

            if (!data) {
                return null;
            }

            return JSON.parse(data);

        } catch (error) {

            console.warn(
                "[NEXPAK CHECKOUT] Storage read failed:",
                key,
                error
            );

            return null;
        }
    }


    /*=====================================================
      UTILITY — SAFE STORAGE WRITE
    =====================================================*/

    function writeStorage(key, data) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(data)
            );

            return true;

        } catch (error) {

            console.warn(
                "[NEXPAK CHECKOUT] Storage write failed:",
                error
            );

            return false;
        }
    }


    /*=====================================================
      FIND EXISTING CART
    =====================================================*/

    function findCart() {

        for (
            let i = 0;
            i < CHECKOUT_CONFIG.cartStorageKeys.length;
            i++
        ) {

            const key =
                CHECKOUT_CONFIG.cartStorageKeys[i];

            const cart = readStorage(key);

            if (Array.isArray(cart)) {

                return cart;
            }

            /*
             * Some cart engines may store an object
             * containing an items array.
             */

            if (
                cart &&
                Array.isArray(cart.items)
            ) {

                return cart.items;
            }
        }

        return [];
    }


    /*=====================================================
      NORMALISE CART ITEM
    =====================================================*/

    function normaliseCartItem(item) {

        if (!item || typeof item !== "object") {
            return null;
        }

        const quantity = Math.max(
            1,
            safeNumber(
                item.quantity ||
                item.qty ||
                1
            )
        );

        const price = safeNumber(
            item.price ||
            item.salePrice ||
            item.unitPrice ||
            0
        );

        return {

            id:
                item.id ||
                item.productId ||
                item.sku ||
                "",

            sku:
                item.sku ||
                item.id ||
                "",

            name:
                item.name ||
                item.title ||
                "Product",

            price: price,

            quantity: quantity,

            image:
                item.image ||
                item.img ||
                item.thumbnail ||
                "",

            category:
                item.category ||
                "",

            subtotal:
                price * quantity,

            raw: item
        };
    }


    /*=====================================================
      LOAD CART
    =====================================================*/

    function loadCart() {

        const sourceCart = findCart();

        checkoutState.cart = sourceCart
            .map(normaliseCartItem)
            .filter(Boolean);

        calculateTotals();

        return checkoutState.cart;
    }


    /*=====================================================
      CALCULATE CHECKOUT TOTALS
    =====================================================*/

    function calculateTotals() {

        let subtotal = 0;

        checkoutState.cart.forEach(function (item) {

            subtotal += safeNumber(item.subtotal);

        });

        const delivery =
            safeNumber(
                checkoutState.totals.delivery
            );

        const discount =
            safeNumber(
                checkoutState.totals.discount
            );

        const tax =
            safeNumber(
                checkoutState.totals.tax
            );

        const total =
            subtotal +
            delivery +
            tax -
            discount;

        checkoutState.totals.subtotal =
            Math.max(0, subtotal);

        checkoutState.totals.total =
            Math.max(0, total);

        return checkoutState.totals;
    }


    /*=====================================================
      SAVE CHECKOUT STATE
    =====================================================*/

    function saveCheckoutState() {

        return writeStorage(
            CHECKOUT_CONFIG.storageKey,
            checkoutState
        );
    }


    /*=====================================================
      LOAD SAVED CHECKOUT STATE
    =====================================================*/

    function loadCheckoutState() {

        const saved =
            readStorage(
                CHECKOUT_CONFIG.storageKey
            );

        if (
            !saved ||
            typeof saved !== "object"
        ) {

            return checkoutState;
        }


        /*
         * Merge saved customer information
         */

        if (saved.customer) {

            checkoutState.customer =
                Object.assign(
                    {},
                    checkoutState.customer,
                    saved.customer
                );
        }


        /*
         * Merge saved billing information
         */

        if (saved.billing) {

            checkoutState.billing =
                Object.assign(
                    {},
                    checkoutState.billing,
                    saved.billing
                );
        }


        /*
         * Merge saved delivery information
         */

        if (saved.delivery) {

            checkoutState.delivery =
                Object.assign(
                    {},
                    checkoutState.delivery,
                    saved.delivery
                );
        }


        /*
         * Merge saved payment information
         */

        if (saved.payment) {

            checkoutState.payment =
                Object.assign(
                    {},
                    checkoutState.payment,
                    saved.payment
                );
        }


        if (typeof saved.notes === "string") {

            checkoutState.notes =
                saved.notes;
        }


        if (
            Number.isFinite(
                Number(saved.step)
            )
        ) {

            checkoutState.step =
                Number(saved.step);
        }

        return checkoutState;
    }


    /*=====================================================
      GET CART COUNT
    =====================================================*/

    function getCartCount() {

        return checkoutState.cart.reduce(
            function (total, item) {

                return total +
                    safeNumber(item.quantity);

            },
            0
        );
    }


    /*=====================================================
      CHECK CART
    =====================================================*/

    function hasItems() {

        return checkoutState.cart.length > 0;
    }


    /*=====================================================
      CHECKOUT VALIDATION FOUNDATION
    =====================================================*/

    function validateCart() {

        loadCart();

        if (!hasItems()) {

            return {
                valid: false,
                message:
                    "Your cart is empty."
            };
        }


        if (
            checkoutState.totals.total <
            CHECKOUT_CONFIG.minimumOrderValue
        ) {

            return {
                valid: false,
                message:
                    "The order value is below the minimum required."
            };
        }


        return {
            valid: true,
            message: "Cart ready for checkout."
        };
    }


    /*=====================================================
      UPDATE CUSTOMER INFORMATION
    =====================================================*/

    function updateCustomer(data) {

        if (
            !data ||
            typeof data !== "object"
        ) {
            return checkoutState.customer;
        }

        checkoutState.customer =
            Object.assign(
                {},
                checkoutState.customer,
                data
            );

        saveCheckoutState();

        return checkoutState.customer;
    }


    /*=====================================================
      UPDATE BILLING INFORMATION
    =====================================================*/

    function updateBilling(data) {

        if (
            !data ||
            typeof data !== "object"
        ) {
            return checkoutState.billing;
        }

        checkoutState.billing =
            Object.assign(
                {},
                checkoutState.billing,
                data
            );

        saveCheckoutState();

        return checkoutState.billing;
    }


    /*=====================================================
      UPDATE DELIVERY INFORMATION
    =====================================================*/

    function updateDelivery(data) {

        if (
            !data ||
            typeof data !== "object"
        ) {
            return checkoutState.delivery;
        }

        checkoutState.delivery =
            Object.assign(
                {},
                checkoutState.delivery,
                data
            );

        saveCheckoutState();

        return checkoutState.delivery;
    }


    /*=====================================================
      SET PAYMENT METHOD
    =====================================================*/

    function setPaymentMethod(method) {

        checkoutState.payment.method =
            String(method || "");

        checkoutState.payment.status =
            "pending";

        saveCheckoutState();

        return checkoutState.payment;
    }


    /*=====================================================
      SET CHECKOUT STEP
    =====================================================*/

    function setStep(step) {

        const newStep =
            Math.max(
                1,
                safeNumber(step)
            );

        checkoutState.step =
            newStep;

        saveCheckoutState();

        return checkoutState.step;
    }


    /*=====================================================
      GET CHECKOUT STATE
    =====================================================*/

    function getState() {

        return checkoutState;
    }


    /*=====================================================
      INITIALISE CHECKOUT ENGINE
    =====================================================*/

    function init() {

        loadCheckoutState();

        loadCart();

        console.log(
            "%c[NEXPAK CHECKOUT] Part 1/8 loaded",
            "font-weight:bold;"
        );

        console.log(
            "[NEXPAK CHECKOUT] Cart items:",
            getCartCount()
        );

        return checkoutState;
    }


    /*=====================================================
      PUBLIC CHECKOUT API
    =====================================================*/

    window.NEXPAKCheckout = {

        config:
            CHECKOUT_CONFIG,

        state:
            checkoutState,

        init:
            init,

        loadCart:
            loadCart,

        getState:
            getState,

        getCartCount:
            getCartCount,

        hasItems:
            hasItems,

        calculateTotals:
            calculateTotals,

        validateCart:
            validateCart,

        save:
            saveCheckoutState,

        updateCustomer:
            updateCustomer,

        updateBilling:
            updateBilling,

        updateDelivery:
            updateDelivery,

        setPaymentMethod:
            setPaymentMethod,

        setStep:
            setStep
    };


    /*=====================================================
      AUTO INITIALISE
    =====================================================*/

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();
    }

})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CHECKOUT ENGINE
=========================================================
 File: onlinecheckout.js
 Version: 1.0
 Part: 2/8

 PART 2:
 - Customer form handling
 - Field validation
 - Error handling
 - Customer data collection
 - Billing form handling
 - Delivery address preparation
=========================================================*/

(function () {
    "use strict";

    /*=====================================================
      SAFETY CHECK
    =====================================================*/

    if (!window.NEXPAKCheckout) {
        console.error(
            "[NEXPAK CHECKOUT] Part 1 is required before Part 2."
        );
        return;
    }


    /*=====================================================
      SHORTCUTS
    =====================================================*/

    const checkout = window.NEXPAKCheckout;

    const state = checkout.state;


    /*=====================================================
      FIELD SELECTORS
    =====================================================*/

    const FIELD_SELECTORS = {

        firstName: [
            "#firstName",
            "#checkoutFirstName",
            "[name='firstName']",
            "[name='first_name']"
        ],

        lastName: [
            "#lastName",
            "#checkoutLastName",
            "[name='lastName']",
            "[name='last_name']"
        ],

        email: [
            "#email",
            "#checkoutEmail",
            "[name='email']"
        ],

        phone: [
            "#phone",
            "#checkoutPhone",
            "[name='phone']",
            "[name='telephone']"
        ],

        company: [
            "#company",
            "#checkoutCompany",
            "[name='company']",
            "[name='companyName']"
        ],

        address1: [
            "#address1",
            "#checkoutAddress",
            "[name='address1']",
            "[name='address']",
            "[name='street']"
        ],

        address2: [
            "#address2",
            "#checkoutAddress2",
            "[name='address2']"
        ],

        suburb: [
            "#suburb",
            "#checkoutSuburb",
            "[name='suburb']"
        ],

        city: [
            "#city",
            "#checkoutCity",
            "[name='city']"
        ],

        province: [
            "#province",
            "#checkoutProvince",
            "[name='province']"
        ],

        postalCode: [
            "#postalCode",
            "#checkoutPostalCode",
            "[name='postalCode']",
            "[name='postal_code']",
            "[name='postcode']"
        ],

        country: [
            "#country",
            "#checkoutCountry",
            "[name='country']"
        ],

        notes: [
            "#orderNotes",
            "#checkoutNotes",
            "[name='orderNotes']",
            "[name='notes']"
        ]
    };


    /*=====================================================
      UTILITY — FIND FIELD
    =====================================================*/

    function findField(selectors) {

        if (!Array.isArray(selectors)) {
            return null;
        }

        for (let i = 0; i < selectors.length; i++) {

            const element =
                document.querySelector(selectors[i]);

            if (element) {
                return element;
            }
        }

        return null;
    }


    /*=====================================================
      UTILITY — GET FIELD VALUE
    =====================================================*/

    function getFieldValue(name) {

        const field =
            findField(
                FIELD_SELECTORS[name]
            );

        if (!field) {
            return "";
        }

        return String(
            field.value || ""
        ).trim();
    }


    /*=====================================================
      UTILITY — SET FIELD VALUE
    =====================================================*/

    function setFieldValue(name, value) {

        const field =
            findField(
                FIELD_SELECTORS[name]
            );

        if (!field) {
            return false;
        }

        field.value =
            value == null
                ? ""
                : String(value);

        return true;
    }


    /*=====================================================
      EMAIL VALIDATION
    =====================================================*/

    function isValidEmail(email) {

        if (!email) {
            return false;
        }

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);
    }


    /*=====================================================
      SOUTH AFRICAN PHONE VALIDATION
    =====================================================*/

    function isValidPhone(phone) {

        if (!phone) {
            return false;
        }

        const cleaned =
            String(phone)
                .replace(/[\s\-().]/g, "");

        /*
         * Accept:
         * 0821234567
         * +27821234567
         * 27821234567
         */

        return (
            /^0\d{9}$/.test(cleaned) ||
            /^\+27\d{9}$/.test(cleaned) ||
            /^27\d{9}$/.test(cleaned)
        );
    }


    /*=====================================================
      POSTAL CODE VALIDATION
    =====================================================*/

    function isValidPostalCode(code) {

        if (!code) {
            return false;
        }

        return /^\d{4}$/.test(
            String(code).trim()
        );
    }


    /*=====================================================
      REQUIRED FIELD CHECK
    =====================================================*/

    function requiredField(
        value,
        fieldName
    ) {

        if (!value) {

            return {
                valid: false,
                field: fieldName,
                message:
                    fieldName +
                    " is required."
            };
        }

        return {
            valid: true,
            field: fieldName,
            message: ""
        };
    }


    /*=====================================================
      CUSTOMER VALIDATION
    =====================================================*/

    function validateCustomer(data) {

        const errors = [];


        if (!data.firstName) {

            errors.push({
                field: "firstName",
                message:
                    "First name is required."
            });
        }


        if (!data.lastName) {

            errors.push({
                field: "lastName",
                message:
                    "Last name is required."
            });
        }


        if (!data.email) {

            errors.push({
                field: "email",
                message:
                    "Email address is required."
            });

        } else if (
            !isValidEmail(data.email)
        ) {

            errors.push({
                field: "email",
                message:
                    "Please enter a valid email address."
            });
        }


        if (!data.phone) {

            errors.push({
                field: "phone",
                message:
                    "Phone number is required."
            });

        } else if (
            !isValidPhone(data.phone)
        ) {

            errors.push({
                field: "phone",
                message:
                    "Please enter a valid South African phone number."
            });
        }


        return {
            valid:
                errors.length === 0,

            errors:
                errors
        };
    }


    /*=====================================================
      BILLING VALIDATION
    =====================================================*/

    function validateBilling(data) {

        const errors = [];


        if (!data.address1) {

            errors.push({
                field: "address1",
                message:
                    "Street address is required."
            });
        }


        if (!data.suburb) {

            errors.push({
                field: "suburb",
                message:
                    "Suburb is required."
            });
        }


        if (!data.city) {

            errors.push({
                field: "city",
                message:
                    "City is required."
            });
        }


        if (!data.province) {

            errors.push({
                field: "province",
                message:
                    "Province is required."
            });
        }


        if (!data.postalCode) {

            errors.push({
                field: "postalCode",
                message:
                    "Postal code is required."
            });

        } else if (
            !isValidPostalCode(
                data.postalCode
            )
        ) {

            errors.push({
                field: "postalCode",
                message:
                    "Postal code must contain 4 digits."
            });
        }


        return {
            valid:
                errors.length === 0,

            errors:
                errors
        };
    }


    /*=====================================================
      COLLECT CUSTOMER FORM
    =====================================================*/

    function collectCustomerForm() {

        return {

            firstName:
                getFieldValue("firstName"),

            lastName:
                getFieldValue("lastName"),

            email:
                getFieldValue("email"),

            phone:
                getFieldValue("phone"),

            company:
                getFieldValue("company")
        };
    }


    /*=====================================================
      COLLECT BILLING FORM
    =====================================================*/

    function collectBillingForm() {

        return {

            address1:
                getFieldValue("address1"),

            address2:
                getFieldValue("address2"),

            suburb:
                getFieldValue("suburb"),

            city:
                getFieldValue("city"),

            province:
                getFieldValue("province"),

            postalCode:
                getFieldValue("postalCode"),

            country:
                getFieldValue("country") ||
                "South Africa"
        };
    }


    /*=====================================================
      COLLECT ORDER NOTES
    =====================================================*/

    function collectOrderNotes() {

        return getFieldValue("notes");
    }


    /*=====================================================
      APPLY CUSTOMER DATA TO STATE
    =====================================================*/

    function saveCustomerForm() {

        const customer =
            collectCustomerForm();

        const validation =
            validateCustomer(customer);

        if (!validation.valid) {

            return validation;
        }

        checkout.updateCustomer(
            customer
        );

        return {
            valid: true,
            customer: customer,
            errors: []
        };
    }


    /*=====================================================
      APPLY BILLING DATA TO STATE
    =====================================================*/

    function saveBillingForm() {

        const billing =
            collectBillingForm();

        const validation =
            validateBilling(billing);

        if (!validation.valid) {

            return validation;
        }

        checkout.updateBilling(
            billing
        );

        state.delivery =
            Object.assign(
                {},
                state.delivery,
                billing
            );

        state.notes =
            collectOrderNotes();

        checkout.save();

        return {
            valid: true,
            billing: billing,
            errors: []
        };
    }


    /*=====================================================
      CLEAR FIELD ERROR
    =====================================================*/

    function clearFieldError(fieldName) {

        const field =
            findField(
                FIELD_SELECTORS[fieldName]
            );

        if (!field) {
            return;
        }

        field.classList.remove(
            "checkout-error",
            "error",
            "is-invalid"
        );

        field.removeAttribute(
            "aria-invalid"
        );

        const wrapper =
            field.closest(
                ".form-group, .field, .checkout-field"
            );

        if (wrapper) {

            wrapper.classList.remove(
                "checkout-field-error",
                "has-error"
            );
        }
    }


    /*=====================================================
      DISPLAY FIELD ERROR
    =====================================================*/

    function displayFieldError(
        fieldName,
        message
    ) {

        const field =
            findField(
                FIELD_SELECTORS[fieldName]
            );

        if (!field) {
            return;
        }

        field.classList.add(
            "checkout-error",
            "error",
            "is-invalid"
        );

        field.setAttribute(
            "aria-invalid",
            "true"
        );


        const wrapper =
            field.closest(
                ".form-group, .field, .checkout-field"
            );


        if (wrapper) {

            wrapper.classList.add(
                "checkout-field-error",
                "has-error"
            );


            let errorElement =
                wrapper.querySelector(
                    ".checkout-error-message"
                );


            if (!errorElement) {

                errorElement =
                    document.createElement(
                        "small"
                    );

                errorElement.className =
                    "checkout-error-message";

                wrapper.appendChild(
                    errorElement
                );
            }


            errorElement.textContent =
                message;
        }
    }


    /*=====================================================
      DISPLAY VALIDATION ERRORS
    =====================================================*/

    function displayValidationErrors(
        errors
    ) {

        if (!Array.isArray(errors)) {
            return;
        }


        errors.forEach(function (error) {

            if (
                error &&
                error.field
            ) {

                displayFieldError(
                    error.field,
                    error.message
                );
            }
        });
    }


    /*=====================================================
      CLEAR ALL VALIDATION ERRORS
    =====================================================*/

    function clearValidationErrors() {

        Object.keys(
            FIELD_SELECTORS
        ).forEach(function (fieldName) {

            clearFieldError(
                fieldName
            );
        });
    }


    /*=====================================================
      VALIDATE CUSTOMER FORM
    =====================================================*/

    function validateCustomerForm() {

        clearValidationErrors();

        const customer =
            collectCustomerForm();

        const result =
            validateCustomer(
                customer
            );


        if (!result.valid) {

            displayValidationErrors(
                result.errors
            );

            return result;
        }


        return {
            valid: true,
            errors: []
        };
    }


    /*=====================================================
      VALIDATE BILLING FORM
    =====================================================*/

    function validateBillingForm() {

        const billing =
            collectBillingForm();


        const result =
            validateBilling(
                billing
            );


        if (!result.valid) {

            displayValidationErrors(
                result.errors
            );

            return result;
        }


        return {
            valid: true,
            errors: []
        };
    }


    /*=====================================================
      POPULATE FORM FROM SAVED STATE
    =====================================================*/

    function populateCustomerForm() {

        const customer =
            state.customer || {};


        setFieldValue(
            "firstName",
            customer.firstName
        );

        setFieldValue(
            "lastName",
            customer.lastName
        );

        setFieldValue(
            "email",
            customer.email
        );

        setFieldValue(
            "phone",
            customer.phone
        );

        setFieldValue(
            "company",
            customer.company
        );
    }


    /*=====================================================
      POPULATE BILLING FORM
    =====================================================*/

    function populateBillingForm() {

        const billing =
            state.billing || {};


        setFieldValue(
            "address1",
            billing.address1
        );

        setFieldValue(
            "address2",
            billing.address2
        );

        setFieldValue(
            "suburb",
            billing.suburb
        );

        setFieldValue(
            "city",
            billing.city
        );

        setFieldValue(
            "province",
            billing.province
        );

        setFieldValue(
            "postalCode",
            billing.postalCode
        );

        setFieldValue(
            "country",
            billing.country ||
            "South Africa"
        );

        setFieldValue(
            "notes",
            state.notes || ""
        );
    }


    /*=====================================================
      AUTO-SAVE FORM DATA
    =====================================================*/

    function autoSaveForms() {

        const customer =
            collectCustomerForm();

        const billing =
            collectBillingForm();

        const notes =
            collectOrderNotes();


        /*
         * Save even partially completed data.
         * This allows the customer to return
         * to checkout without losing progress.
         */

        state.customer =
            Object.assign(
                {},
                state.customer,
                customer
            );


        state.billing =
            Object.assign(
                {},
                state.billing,
                billing
            );


        state.delivery =
            Object.assign(
                {},
                state.delivery,
                billing
            );


        state.notes =
            notes;


        checkout.save();
    }


    /*=====================================================
      ATTACH AUTO-SAVE LISTENERS
    =====================================================*/

    function attachFormListeners() {

        const fields =
            document.querySelectorAll(
                "input, select, textarea"
            );


        fields.forEach(function (field) {

            field.addEventListener(
                "input",
                function () {

                    autoSaveForms();

                    /*
                     * Remove visual error as soon
                     * as the customer starts correcting
                     * the field.
                     */

                    field.classList.remove(
                        "checkout-error",
                        "error",
                        "is-invalid"
                    );

                    field.removeAttribute(
                        "aria-invalid"
                    );
                }
            );


            field.addEventListener(
                "change",
                function () {

                    autoSaveForms();

                }
            );

        });
    }


    /*=====================================================
      SUBMIT CUSTOMER STEP
    =====================================================*/

    function submitCustomerStep() {

        const result =
            validateCustomerForm();


        if (!result.valid) {

            return result;
        }


        saveCustomerForm();

        checkout.setStep(2);


        return {
            valid: true,
            step: 2,
            customer:
                state.customer
        };
    }


    /*=====================================================
      SUBMIT BILLING STEP
    =====================================================*/

    function submitBillingStep() {

        const result =
            validateBillingForm();


        if (!result.valid) {

            return result;
        }


        saveBillingForm();

        checkout.setStep(3);


        return {
            valid: true,
            step: 3,
            billing:
                state.billing
        };
    }


    /*=====================================================
      PUBLIC API EXTENSION
    =====================================================*/

    checkout.form = {

        fields:
            FIELD_SELECTORS,

        getFieldValue:
            getFieldValue,

        setFieldValue:
            setFieldValue,

        collectCustomer:
            collectCustomerForm,

        collectBilling:
            collectBillingForm,

        collectNotes:
            collectOrderNotes,

        validateCustomer:
            validateCustomer,

        validateBilling:
            validateBilling,

        validateCustomerForm:
            validateCustomerForm,

        validateBillingForm:
            validateBillingForm,

        saveCustomer:
            saveCustomerForm,

        saveBilling:
            saveBillingForm,

        populateCustomer:
            populateCustomerForm,

        populateBilling:
            populateBillingForm,

        clearErrors:
            clearValidationErrors,

        displayErrors:
            displayValidationErrors,

        autoSave:
            autoSaveForms,

        submitCustomer:
            submitCustomerStep,

        submitBilling:
            submitBillingStep
    };


    /*=====================================================
      INITIALISE PART 2
    =====================================================*/

    function initPart2() {

        /*
         * Load existing checkout state.
         */

        checkout.init();


        /*
         * Populate any fields already present
         * on the page.
         */

        populateCustomerForm();

        populateBillingForm();


        /*
         * Enable automatic saving.
         */

        attachFormListeners();


        console.log(
            "%c[NEXPAK CHECKOUT] Part 2/8 loaded",
            "font-weight:bold;"
        );
    }


    /*=====================================================
      START
    =====================================================*/

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initPart2
        );

    } else {

        initPart2();
    }

})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CHECKOUT ENGINE
=========================================================
 File: onlinecheckout.js
 Version: 1.0
 Part: 3/8

 PART 3:
 - Delivery method handling
 - Delivery address handling
 - Delivery option selection
 - Delivery cost integration
 - Checkout step progression
 - Delivery validation
 - Delivery summary
=========================================================*/

(function () {

    "use strict";


    /*=====================================================
      SAFETY CHECK
    =====================================================*/

    if (!window.NEXPAKCheckout) {

        console.error(
            "[NEXPAK CHECKOUT] Part 1 is required before Part 3."
        );

        return;
    }


    /*=====================================================
      SHORTCUTS
    =====================================================*/

    const checkout =
        window.NEXPAKCheckout;

    const state =
        checkout.state;


    /*=====================================================
      DEFAULT DELIVERY METHODS
    =====================================================*/

    const DEFAULT_DELIVERY_METHODS = [

        {
            id: "standard",
            name: "Standard Delivery",
            description:
                "Standard delivery to your address.",
            price: 0,
            available: true
        },

        {
            id: "express",
            name: "Express Delivery",
            description:
                "Faster delivery where available.",
            price: 0,
            available: true
        },

        {
            id: "collection",
            name: "Customer Collection",
            description:
                "Collect your order from NEXPAK.",
            price: 0,
            available: true
        }

    ];


    /*=====================================================
      DELIVERY CONFIGURATION
    =====================================================*/

    const DELIVERY_CONFIG = {

        defaultMethod:
            "standard",

        methods:
            DEFAULT_DELIVERY_METHODS,

        requireAddress:
            true,

        collectionRequiresAddress:
            false,

        deliveryEngine:
            "onlinedelivery.js"
    };


    /*=====================================================
      DELIVERY SELECTORS
    =====================================================*/

    const DELIVERY_SELECTORS = {

        method: [
            "#deliveryMethod",
            "#shippingMethod",
            "[name='deliveryMethod']",
            "[name='shippingMethod']"
        ],

        address1: [
            "#deliveryAddress1",
            "#shippingAddress1",
            "[name='deliveryAddress1']",
            "[name='shippingAddress1']"
        ],

        address2: [
            "#deliveryAddress2",
            "#shippingAddress2",
            "[name='deliveryAddress2']",
            "[name='shippingAddress2']"
        ],

        suburb: [
            "#deliverySuburb",
            "#shippingSuburb",
            "[name='deliverySuburb']",
            "[name='shippingSuburb']"
        ],

        city: [
            "#deliveryCity",
            "#shippingCity",
            "[name='deliveryCity']",
            "[name='shippingCity']"
        ],

        province: [
            "#deliveryProvince",
            "#shippingProvince",
            "[name='deliveryProvince']"
        ],

        postalCode: [
            "#deliveryPostalCode",
            "#shippingPostalCode",
            "[name='deliveryPostalCode']",
            "[name='shippingPostalCode']"
        ],

        instructions: [
            "#deliveryInstructions",
            "#shippingInstructions",
            "[name='deliveryInstructions']",
            "[name='shippingInstructions']"
        ]
    };


    /*=====================================================
      UTILITY — SAFE NUMBER
    =====================================================*/

    function safeNumber(value) {

        const number =
            Number(value);

        return Number.isFinite(number)
            ? number
            : 0;
    }


    /*=====================================================
      FIND FIELD
    =====================================================*/

    function findField(selectors) {

        if (!Array.isArray(selectors)) {
            return null;
        }

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


    /*=====================================================
      GET FIELD VALUE
    =====================================================*/

    function getFieldValue(name) {

        const field =
            findField(
                DELIVERY_SELECTORS[name]
            );

        if (!field) {
            return "";
        }

        return String(
            field.value || ""
        ).trim();
    }


    /*=====================================================
      SET FIELD VALUE
    =====================================================*/

    function setFieldValue(
        name,
        value
    ) {

        const field =
            findField(
                DELIVERY_SELECTORS[name]
            );

        if (!field) {
            return false;
        }

        field.value =
            value == null
                ? ""
                : String(value);

        return true;
    }


    /*=====================================================
      FIND DELIVERY METHOD
    =====================================================*/

    function getDeliveryMethod(
        methodId
    ) {

        const methods =
            getDeliveryMethods();

        return methods.find(
            function (method) {

                return String(method.id) ===
                    String(methodId);

            }
        ) || null;
    }


    /*=====================================================
      GET DELIVERY METHODS
    =====================================================*/

    function getDeliveryMethods() {

        /*
         * Future onlinedelivery.js can provide
         * its own delivery methods.
         */

        if (
            window.NEXPAKDelivery &&
            typeof
            window.NEXPAKDelivery
                .getMethods ===
                "function"
        ) {

            try {

                const methods =
                    window.NEXPAKDelivery
                        .getMethods();

                if (
                    Array.isArray(methods) &&
                    methods.length
                ) {

                    return methods;
                }

            } catch (error) {

                console.warn(
                    "[NEXPAK CHECKOUT] Delivery engine unavailable:",
                    error
                );
            }
        }


        return DELIVERY_CONFIG.methods;
    }


    /*=====================================================
      SET DELIVERY METHOD
    =====================================================*/

    function setDeliveryMethod(
        methodId
    ) {

        const method =
            getDeliveryMethod(
                methodId
            );


        if (!method) {

            return {

                valid: false,

                message:
                    "The selected delivery method is unavailable."
            };
        }


        if (method.available === false) {

            return {

                valid: false,

                message:
                    "The selected delivery method is currently unavailable."
            };
        }


        state.delivery.method =
            method.id;


        /*
         * If the future delivery engine exists,
         * allow it to calculate the actual cost.
         */

        let deliveryCost =
            safeNumber(method.price);


        if (
            window.NEXPAKDelivery &&
            typeof
            window.NEXPAKDelivery
                .calculateCost ===
                "function"
        ) {

            try {

                const result =
                    window.NEXPAKDelivery
                        .calculateCost(
                            state.cart,
                            state.delivery
                        );


                if (
                    result &&
                    Number.isFinite(
                        Number(result.cost)
                    )
                ) {

                    deliveryCost =
                        Number(result.cost);
                }

            } catch (error) {

                console.warn(
                    "[NEXPAK CHECKOUT] Delivery cost calculation deferred.",
                    error
                );
            }
        }


        state.totals.delivery =
            Math.max(
                0,
                deliveryCost
            );


        checkout.calculateTotals();

        checkout.save();


        updateDeliveryMethodUI(
            method.id
        );


        return {

            valid: true,

            method: method,

            cost:
                state.totals.delivery,

            total:
                state.totals.total
        };
    }


    /*=====================================================
      COLLECT DELIVERY ADDRESS
    =====================================================*/

    function collectDeliveryAddress() {

        return {

            address1:
                getFieldValue("address1"),

            address2:
                getFieldValue("address2"),

            suburb:
                getFieldValue("suburb"),

            city:
                getFieldValue("city"),

            province:
                getFieldValue("province"),

            postalCode:
                getFieldValue("postalCode"),

            instructions:
                getFieldValue("instructions")
        };
    }


    /*=====================================================
      SAVE DELIVERY ADDRESS
    =====================================================*/

    function saveDeliveryAddress() {

        const address =
            collectDeliveryAddress();


        state.delivery =
            Object.assign(
                {},
                state.delivery,
                address
            );


        /*
         * Keep billing and delivery separate.
         * This prevents changing delivery information
         * from accidentally overwriting billing data.
         */

        checkout.save();


        return state.delivery;
    }


    /*=====================================================
      COPY BILLING TO DELIVERY
    =====================================================*/

    function copyBillingToDelivery() {

        const billing =
            state.billing || {};


        state.delivery.address1 =
            billing.address1 || "";

        state.delivery.address2 =
            billing.address2 || "";

        state.delivery.suburb =
            billing.suburb || "";

        state.delivery.city =
            billing.city || "";

        state.delivery.province =
            billing.province || "";

        state.delivery.postalCode =
            billing.postalCode || "";


        populateDeliveryForm();

        checkout.save();


        return state.delivery;
    }


    /*=====================================================
      VALIDATE DELIVERY ADDRESS
    =====================================================*/

    function validateDeliveryAddress() {

        const method =
            getDeliveryMethod(
                state.delivery.method
            );


        /*
         * Collection does not require
         * a delivery address.
         */

        if (
            method &&
            method.id === "collection" &&
            !DELIVERY_CONFIG.collectionRequiresAddress
        ) {

            return {

                valid: true,

                errors: []
            };
        }


        const address =
            collectDeliveryAddress();

        const errors = [];


        if (!address.address1) {

            errors.push({

                field: "address1",

                message:
                    "Delivery address is required."
            });
        }


        if (!address.suburb) {

            errors.push({

                field: "suburb",

                message:
                    "Delivery suburb is required."
            });
        }


        if (!address.city) {

            errors.push({

                field: "city",

                message:
                    "Delivery city is required."
            });
        }


        if (!address.province) {

            errors.push({

                field: "province",

                message:
                    "Delivery province is required."
            });
        }


        if (!address.postalCode) {

            errors.push({

                field: "postalCode",

                message:
                    "Delivery postal code is required."
            });

        } else if (
            !/^\d{4}$/.test(
                address.postalCode
            )
        ) {

            errors.push({

                field: "postalCode",

                message:
                    "Postal code must contain 4 digits."
            });
        }


        return {

            valid:
                errors.length === 0,

            errors:
                errors
        };
    }


    /*=====================================================
      VALIDATE DELIVERY STEP
    =====================================================*/

    function validateDelivery() {

        const errors = [];


        if (!state.delivery.method) {

            errors.push({

                field: "method",

                message:
                    "Please select a delivery method."
            });
        }


        const addressResult =
            validateDeliveryAddress();


        if (!addressResult.valid) {

            addressResult.errors.forEach(
                function (error) {

                    errors.push(error);

                }
            );
        }


        return {

            valid:
                errors.length === 0,

            errors:
                errors
        };
    }


    /*=====================================================
      POPULATE DELIVERY FORM
    =====================================================*/

    function populateDeliveryForm() {

        const delivery =
            state.delivery || {};


        setFieldValue(
            "address1",
            delivery.address1
        );

        setFieldValue(
            "address2",
            delivery.address2
        );

        setFieldValue(
            "suburb",
            delivery.suburb
        );

        setFieldValue(
            "city",
            delivery.city
        );

        setFieldValue(
            "province",
            delivery.province
        );

        setFieldValue(
            "postalCode",
            delivery.postalCode
        );

        setFieldValue(
            "instructions",
            delivery.instructions
        );


        if (delivery.method) {

            setFieldValue(
                "method",
                delivery.method
            );

            updateDeliveryMethodUI(
                delivery.method
            );
        }
    }


    /*=====================================================
      UPDATE DELIVERY METHOD UI
    =====================================================*/

    function updateDeliveryMethodUI(
        methodId
    ) {

        const method =
            getDeliveryMethod(
                methodId
            );


        if (!method) {
            return;
        }


        /*
         * Radio buttons
         */

        document
            .querySelectorAll(
                "input[type='radio'][name='deliveryMethod'], " +
                "input[type='radio'][name='shippingMethod']"
            )
            .forEach(
                function (radio) {

                    radio.checked =
                        String(
                            radio.value
                        ) ===
                        String(methodId);

                }
            );


        /*
         * Select element
         */

        const select =
            findField(
                DELIVERY_SELECTORS.method
            );


        if (select) {

            select.value =
                methodId;
        }


        /*
         * Update delivery price elements.
         */

        document
            .querySelectorAll(
                "[data-delivery-price]"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        formatCurrency(
                            state.totals.delivery
                        );

                }
            );


        /*
         * Update delivery name elements.
         */

        document
            .querySelectorAll(
                "[data-delivery-method]"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        method.name;

                }
            );
    }


    /*=====================================================
      FORMAT CURRENCY
    =====================================================*/

    function formatCurrency(
        amount
    ) {

        const value =
            safeNumber(amount);


        try {

            return new Intl.NumberFormat(
                "en-ZA",
                {
                    style: "currency",
                    currency: "ZAR"
                }
            ).format(value);

        } catch (error) {

            return "R " +
                value.toFixed(2);
        }
    }


    /*=====================================================
      UPDATE TOTAL DISPLAY
    =====================================================*/

    function updateTotalDisplay() {

        checkout.calculateTotals();


        document
            .querySelectorAll(
                "[data-checkout-subtotal]"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        formatCurrency(
                            state.totals.subtotal
                        );

                }
            );


        document
            .querySelectorAll(
                "[data-checkout-delivery]"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        formatCurrency(
                            state.totals.delivery
                        );

                }
            );


        document
            .querySelectorAll(
                "[data-checkout-discount]"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        formatCurrency(
                            state.totals.discount
                        );

                }
            );


        document
            .querySelectorAll(
                "[data-checkout-tax]"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        formatCurrency(
                            state.totals.tax
                        );

                }
            );


        document
            .querySelectorAll(
                "[data-checkout-total]"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        formatCurrency(
                            state.totals.total
                        );

                }
            );
    }


    /*=====================================================
      DELIVERY METHOD LIST RENDERING
    =====================================================*/

    function renderDeliveryMethods(
        container
    ) {

        if (!container) {
            return;
        }


        const methods =
            getDeliveryMethods();


        container.innerHTML = "";


        methods.forEach(
            function (method) {

                if (
                    method.available === false
                ) {
                    return;
                }


                const wrapper =
                    document.createElement(
                        "label"
                    );


                wrapper.className =
                    "checkout-delivery-option";


                const radio =
                    document.createElement(
                        "input"
                    );


                radio.type =
                    "radio";

                radio.name =
                    "deliveryMethod";

                radio.value =
                    method.id;

                radio.checked =
                    state.delivery.method ===
                    method.id;


                const content =
                    document.createElement(
                        "span"
                    );


                content.className =
                    "checkout-delivery-option-content";


                const title =
                    document.createElement(
                        "strong"
                    );


                title.textContent =
                    method.name;


                const description =
                    document.createElement(
                        "small"
                    );


                description.textContent =
                    method.description || "";


                const price =
                    document.createElement(
                        "span"
                    );


                price.className =
                    "checkout-delivery-price";


                price.textContent =
                    formatCurrency(
                        method.price
                    );


                content.appendChild(
                    title
                );

                content.appendChild(
                    description
                );

                content.appendChild(
                    price
                );


                wrapper.appendChild(
                    radio
                );

                wrapper.appendChild(
                    content
                );


                radio.addEventListener(
                    "change",
                    function () {

                        setDeliveryMethod(
                            radio.value
                        );

                        updateTotalDisplay();

                    }
                );


                container.appendChild(
                    wrapper
                );
            }
        );
    }


    /*=====================================================
      HANDLE DELIVERY METHOD CHANGE
    =====================================================*/

    function attachDeliveryMethodListeners() {

        document
            .querySelectorAll(
                "input[type='radio'][name='deliveryMethod'], " +
                "input[type='radio'][name='shippingMethod']"
            )
            .forEach(
                function (radio) {

                    radio.addEventListener(
                        "change",
                        function () {

                            setDeliveryMethod(
                                radio.value
                            );

                            updateTotalDisplay();

                        }
                    );
                }
            );


        const select =
            findField(
                DELIVERY_SELECTORS.method
            );


        if (select) {

            select.addEventListener(
                "change",
                function () {

                    setDeliveryMethod(
                        select.value
                    );

                    updateTotalDisplay();

                }
            );
        }
    }


    /*=====================================================
      DELIVERY STEP SUBMISSION
    =====================================================*/

    function submitDeliveryStep() {

        const validation =
            validateDelivery();


        if (!validation.valid) {

            return validation;
        }


        saveDeliveryAddress();

        checkout.calculateTotals();

        checkout.setStep(4);


        updateTotalDisplay();


        return {

            valid: true,

            step: 4,

            delivery:
                state.delivery,

            totals:
                state.totals
        };
    }


    /*=====================================================
      GET DELIVERY SUMMARY
    =====================================================*/

    function getDeliverySummary() {

        const method =
            getDeliveryMethod(
                state.delivery.method
            );


        return {

            method:
                method
                    ? method.name
                    : "Not selected",

            address:
                state.delivery.address1 || "",

            suburb:
                state.delivery.suburb || "",

            city:
                state.delivery.city || "",

            province:
                state.delivery.province || "",

            postalCode:
                state.delivery.postalCode || "",

            instructions:
                state.delivery.instructions || "",

            cost:
                state.totals.delivery,

            formattedCost:
                formatCurrency(
                    state.totals.delivery
                )
        };
    }


    /*=====================================================
      GET CHECKOUT PROGRESS
    =====================================================*/

    function getProgress() {

        const totalSteps = 5;

        const currentStep =
            Math.min(
                totalSteps,
                Math.max(
                    1,
                    safeNumber(
                        state.step
                    )
                )
            );


        return {

            current:
                currentStep,

            total:
                totalSteps,

            percentage:
                Math.round(
                    (
                        currentStep /
                        totalSteps
                    ) * 100
                )
        };
    }


    /*=====================================================
      EXTEND CHECKOUT API
    =====================================================*/

    checkout.delivery = {

        config:
            DELIVERY_CONFIG,

        selectors:
            DELIVERY_SELECTORS,

        getMethods:
            getDeliveryMethods,

        getMethod:
            getDeliveryMethod,

        setMethod:
            setDeliveryMethod,

        collectAddress:
            collectDeliveryAddress,

        saveAddress:
            saveDeliveryAddress,

        copyBilling:
            copyBillingToDelivery,

        validateAddress:
            validateDeliveryAddress,

        validate:
            validateDelivery,

        populate:
            populateDeliveryForm,

        renderMethods:
            renderDeliveryMethods,

        updateTotals:
            updateTotalDisplay,

        getSummary:
            getDeliverySummary,

        getProgress:
            getProgress,

        submit:
            submitDeliveryStep
    };


    /*=====================================================
      INITIALISE PART 3
    =====================================================*/

    function initPart3() {

        checkout.init();


        /*
         * Set default delivery method when none exists.
         */

        if (
            !state.delivery.method
        ) {

            const defaultMethod =
                getDeliveryMethod(
                    DELIVERY_CONFIG.defaultMethod
                );


            if (defaultMethod) {

                state.delivery.method =
                    defaultMethod.id;
            }
        }


        populateDeliveryForm();


        attachDeliveryMethodListeners();


        /*
         * Render dynamic delivery options when
         * a dedicated container exists.
         */

        const container =
            document.querySelector(
                "[data-delivery-methods]"
            );


        if (container) {

            renderDeliveryMethods(
                container
            );
        }


        updateTotalDisplay();


        console.log(
            "%c[NEXPAK CHECKOUT] Part 3/8 loaded",
            "font-weight:bold;"
        );
    }


    /*=====================================================
      START
    =====================================================*/

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initPart3
        );

    } else {

        initPart3();
    }

})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CHECKOUT ENGINE
=========================================================
 File: onlinecheckout.js
 Version: 1.0
 Part: 4/8

 PART 4:
 - Payment method selection
 - Payment validation
 - Order review
 - Order summary
 - Customer summary
 - Delivery summary
 - Final checkout validation
 - Pre-order validation
=========================================================*/

(function () {

    "use strict";


    /*=====================================================
      SAFETY CHECK
    =====================================================*/

    if (!window.NEXPAKCheckout) {

        console.error(
            "[NEXPAK CHECKOUT] Part 1 is required before Part 4."
        );

        return;
    }


    /*=====================================================
      SHORTCUTS
    =====================================================*/

    const checkout =
        window.NEXPAKCheckout;

    const state =
        checkout.state;


    /*=====================================================
      PAYMENT METHODS
    =====================================================*/

    const DEFAULT_PAYMENT_METHODS = [

        {
            id: "eft",
            name: "EFT / Bank Transfer",
            description:
                "Pay by electronic funds transfer.",
            available: true
        },

        {
            id: "card",
            name: "Credit / Debit Card",
            description:
                "Secure card payment.",
            available: true
        },

        {
            id: "payfast",
            name: "PayFast",
            description:
                "Pay securely using PayFast.",
            available: true
        },

        {
            id: "yoco",
            name: "Yoco",
            description:
                "Secure online payment through Yoco.",
            available: true
        },

        {
            id: "paypal",
            name: "PayPal",
            description:
                "Pay using your PayPal account.",
            available: true
        },

        {
            id: "quote",
            name: "Request Invoice / Quote",
            description:
                "Submit the order for NEXPAK confirmation.",
            available: true
        }

    ];


    /*=====================================================
      PAYMENT CONFIGURATION
    =====================================================*/

    const PAYMENT_CONFIG = {

        defaultMethod:
            "eft",

        methods:
            DEFAULT_PAYMENT_METHODS,

        requirePaymentMethod:
            true,

        integrationEngine:
            "onlineintegration.js"
    };


    /*=====================================================
      PAYMENT SELECTORS
    =====================================================*/

    const PAYMENT_SELECTORS = {

        method: [
            "#paymentMethod",
            "#checkoutPaymentMethod",
            "[name='paymentMethod']",
            "[name='payment']"
        ],

        reference: [
            "#paymentReference",
            "#checkoutPaymentReference",
            "[name='paymentReference']"
        ],

        notes: [
            "#orderNotes",
            "#checkoutNotes",
            "[name='orderNotes']",
            "[name='notes']"
        ]
    };


    /*=====================================================
      FIND FIELD
    =====================================================*/

    function findField(selectors) {

        if (!Array.isArray(selectors)) {
            return null;
        }


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


    /*=====================================================
      GET FIELD VALUE
    =====================================================*/

    function getFieldValue(name) {

        const field =
            findField(
                PAYMENT_SELECTORS[name]
            );


        if (!field) {
            return "";
        }


        return String(
            field.value || ""
        ).trim();
    }


    /*=====================================================
      SET FIELD VALUE
    =====================================================*/

    function setFieldValue(
        name,
        value
    ) {

        const field =
            findField(
                PAYMENT_SELECTORS[name]
            );


        if (!field) {
            return false;
        }


        field.value =
            value == null
                ? ""
                : String(value);


        return true;
    }


    /*=====================================================
      GET PAYMENT METHODS
    =====================================================*/

    function getPaymentMethods() {

        /*
         * Future integration engine can provide
         * its own payment methods.
         */

        if (
            window.NEXPAKIntegration &&
            typeof
            window.NEXPAKIntegration
                .getPaymentMethods ===
                "function"
        ) {

            try {

                const methods =
                    window.NEXPAKIntegration
                        .getPaymentMethods();


                if (
                    Array.isArray(methods) &&
                    methods.length
                ) {

                    return methods;
                }

            } catch (error) {

                console.warn(
                    "[NEXPAK CHECKOUT] Payment integration unavailable:",
                    error
                );
            }
        }


        return PAYMENT_CONFIG.methods;
    }


    /*=====================================================
      GET PAYMENT METHOD
    =====================================================*/

    function getPaymentMethod(
        methodId
    ) {

        const methods =
            getPaymentMethods();


        return methods.find(
            function (method) {

                return String(method.id) ===
                    String(methodId);

            }
        ) || null;
    }


    /*=====================================================
      SET PAYMENT METHOD
    =====================================================*/

    function setPaymentMethod(
        methodId
    ) {

        const method =
            getPaymentMethod(
                methodId
            );


        if (!method) {

            return {

                valid: false,

                message:
                    "The selected payment method is unavailable."
            };
        }


        if (
            method.available === false
        ) {

            return {

                valid: false,

                message:
                    "The selected payment method is currently unavailable."
            };
        }


        state.payment.method =
            method.id;


        state.payment.status =
            "pending";


        /*
         * Allow future integration engine
         * to react to the selected method.
         */

        if (
            window.NEXPAKIntegration &&
            typeof
            window.NEXPAKIntegration
                .onPaymentMethodSelected ===
                "function"
        ) {

            try {

                window.NEXPAKIntegration
                    .onPaymentMethodSelected(
                        method
                    );

            } catch (error) {

                console.warn(
                    "[NEXPAK CHECKOUT] Payment integration callback failed:",
                    error
                );
            }
        }


        checkout.save();


        updatePaymentMethodUI(
            method.id
        );


        return {

            valid: true,

            method: method,

            status:
                state.payment.status
        };
    }


    /*=====================================================
      VALIDATE PAYMENT
    =====================================================*/

    function validatePayment() {

        const errors = [];


        if (
            !PAYMENT_CONFIG.requirePaymentMethod
        ) {

            return {

                valid: true,

                errors: []
            };
        }


        if (
            !state.payment.method
        ) {

            errors.push({

                field: "method",

                message:
                    "Please select a payment method."
            });


            return {

                valid: false,

                errors: errors
            };
        }


        const method =
            getPaymentMethod(
                state.payment.method
            );


        if (!method) {

            errors.push({

                field: "method",

                message:
                    "The selected payment method is invalid."
            });

        } else if (
            method.available === false
        ) {

            errors.push({

                field: "method",

                message:
                    "The selected payment method is currently unavailable."
            });
        }


        return {

            valid:
                errors.length === 0,

            errors:
                errors
        };
    }


    /*=====================================================
      COLLECT PAYMENT FORM
    =====================================================*/

    function collectPaymentForm() {

        return {

            method:
                getFieldValue("method"),

            reference:
                getFieldValue("reference")
        };
    }


    /*=====================================================
      SAVE PAYMENT FORM
    =====================================================*/

    function savePaymentForm() {

        const payment =
            collectPaymentForm();


        if (payment.method) {

            setPaymentMethod(
                payment.method
            );
        }


        if (payment.reference) {

            state.payment.reference =
                payment.reference;
        }


        state.notes =
            getFieldValue("notes");


        checkout.save();


        return state.payment;
    }


    /*=====================================================
      UPDATE PAYMENT UI
    =====================================================*/

    function updatePaymentMethodUI(
        methodId
    ) {

        /*
         * Radio buttons
         */

        document
            .querySelectorAll(
                "input[type='radio'][name='paymentMethod'], " +
                "input[type='radio'][name='payment']"
            )
            .forEach(
                function (radio) {

                    radio.checked =
                        String(
                            radio.value
                        ) ===
                        String(methodId);

                }
            );


        /*
         * Select element
         */

        const select =
            findField(
                PAYMENT_SELECTORS.method
            );


        if (select) {

            select.value =
                methodId;
        }


        /*
         * Update selected payment labels.
         */

        const method =
            getPaymentMethod(
                methodId
            );


        if (!method) {
            return;
        }


        document
            .querySelectorAll(
                "[data-payment-method]"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        method.name;

                }
            );
    }


    /*=====================================================
      RENDER PAYMENT METHODS
    =====================================================*/

    function renderPaymentMethods(
        container
    ) {

        if (!container) {
            return;
        }


        const methods =
            getPaymentMethods();


        container.innerHTML = "";


        methods.forEach(
            function (method) {

                if (
                    method.available === false
                ) {
                    return;
                }


                const wrapper =
                    document.createElement(
                        "label"
                    );


                wrapper.className =
                    "checkout-payment-option";


                const radio =
                    document.createElement(
                        "input"
                    );


                radio.type =
                    "radio";

                radio.name =
                    "paymentMethod";

                radio.value =
                    method.id;

                radio.checked =
                    state.payment.method ===
                    method.id;


                const content =
                    document.createElement(
                        "span"
                    );


                content.className =
                    "checkout-payment-option-content";


                const title =
                    document.createElement(
                        "strong"
                    );


                title.textContent =
                    method.name;


                const description =
                    document.createElement(
                        "small"
                    );


                description.textContent =
                    method.description || "";


                content.appendChild(
                    title
                );

                content.appendChild(
                    description
                );


                wrapper.appendChild(
                    radio
                );

                wrapper.appendChild(
                    content
                );


                radio.addEventListener(
                    "change",
                    function () {

                        setPaymentMethod(
                            radio.value
                        );

                    }
                );


                container.appendChild(
                    wrapper
                );
            }
        );
    }


    /*=====================================================
      ATTACH PAYMENT LISTENERS
    =====================================================*/

    function attachPaymentListeners() {

        document
            .querySelectorAll(
                "input[type='radio'][name='paymentMethod'], " +
                "input[type='radio'][name='payment']"
            )
            .forEach(
                function (radio) {

                    radio.addEventListener(
                        "change",
                        function () {

                            setPaymentMethod(
                                radio.value
                            );

                        }
                    );
                }
            );


        const select =
            findField(
                PAYMENT_SELECTORS.method
            );


        if (select) {

            select.addEventListener(
                "change",
                function () {

                    setPaymentMethod(
                        select.value
                    );

                }
            );
        }
    }


    /*=====================================================
      ORDER NUMBER GENERATOR
    =====================================================*/

    function generateOrderNumber() {

        const now =
            new Date();


        const year =
            now.getFullYear();


        const month =
            String(
                now.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                now.getDate()
            ).padStart(2, "0");


        const random =
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        return (
            "NEX-" +
            year +
            month +
            day +
            "-" +
            random
        );
    }


    /*=====================================================
      CREATE DRAFT ORDER NUMBER
    =====================================================*/

    function createDraftOrder() {

        if (
            !state.order.orderNumber
        ) {

            state.order.orderNumber =
                generateOrderNumber();
        }


        if (
            !state.order.createdAt
        ) {

            state.order.createdAt =
                new Date().toISOString();
        }


        state.order.status =
            "draft";


        checkout.save();


        return state.order;
    }


    /*=====================================================
      CUSTOMER SUMMARY
    =====================================================*/

    function getCustomerSummary() {

        const customer =
            state.customer || {};


        return {

            name:
                (
                    customer.firstName +
                    " " +
                    customer.lastName
                ).trim(),

            firstName:
                customer.firstName || "",

            lastName:
                customer.lastName || "",

            email:
                customer.email || "",

            phone:
                customer.phone || "",

            company:
                customer.company || ""
        };
    }


    /*=====================================================
      BILLING SUMMARY
    =====================================================*/

    function getBillingSummary() {

        const billing =
            state.billing || {};


        return {

            address1:
                billing.address1 || "",

            address2:
                billing.address2 || "",

            suburb:
                billing.suburb || "",

            city:
                billing.city || "",

            province:
                billing.province || "",

            postalCode:
                billing.postalCode || "",

            country:
                billing.country ||
                "South Africa"
        };
    }


    /*=====================================================
      DELIVERY SUMMARY
    =====================================================*/

    function getDeliverySummary() {

        if (
            checkout.delivery &&
            typeof
            checkout.delivery.getSummary ===
            "function"
        ) {

            return checkout.delivery
                .getSummary();
        }


        const method =
            getDeliveryMethodFallback();


        return {

            method:
                method,

            address1:
                state.delivery.address1 || "",

            address2:
                state.delivery.address2 || "",

            suburb:
                state.delivery.suburb || "",

            city:
                state.delivery.city || "",

            province:
                state.delivery.province || "",

            postalCode:
                state.delivery.postalCode || "",

            instructions:
                state.delivery.instructions || "",

            cost:
                state.totals.delivery || 0
        };
    }


    /*=====================================================
      DELIVERY FALLBACK
    =====================================================*/

    function getDeliveryMethodFallback() {

        if (
            !state.delivery.method
        ) {

            return "Not selected";
        }


        return state.delivery.method;
    }


    /*=====================================================
      PAYMENT SUMMARY
    =====================================================*/

    function getPaymentSummary() {

        const method =
            getPaymentMethod(
                state.payment.method
            );


        return {

            method:
                method
                    ? method.name
                    : "Not selected",

            methodId:
                state.payment.method || "",

            status:
                state.payment.status ||
                "pending",

            reference:
                state.payment.reference || ""
        };
    }


    /*=====================================================
      CART SUMMARY
    =====================================================*/

    function getCartSummary() {

        checkout.loadCart();


        return state.cart.map(
            function (item) {

                return {

                    id:
                        item.id,

                    sku:
                        item.sku,

                    name:
                        item.name,

                    price:
                        item.price,

                    quantity:
                        item.quantity,

                    subtotal:
                        item.subtotal,

                    image:
                        item.image,

                    category:
                        item.category
                };
            }
        );
    }


    /*=====================================================
      TOTALS SUMMARY
    =====================================================*/

    function getTotalsSummary() {

        checkout.calculateTotals();


        return {

            subtotal:
                state.totals.subtotal,

            delivery:
                state.totals.delivery,

            discount:
                state.totals.discount,

            tax:
                state.totals.tax,

            total:
                state.totals.total
        };
    }


    /*=====================================================
      COMPLETE ORDER REVIEW
    =====================================================*/

    function getOrderReview() {

        checkout.loadCart();


        return {

            order:
                state.order,

            customer:
                getCustomerSummary(),

            billing:
                getBillingSummary(),

            delivery:
                getDeliverySummary(),

            payment:
                getPaymentSummary(),

            items:
                getCartSummary(),

            totals:
                getTotalsSummary(),

            notes:
                state.notes || ""
        };
    }


    /*=====================================================
      VALIDATE ORDER REVIEW
    =====================================================*/

    function validateOrderReview() {

        const errors = [];


        /*
         * Cart
         */

        const cartResult =
            checkout.validateCart();


        if (
            !cartResult.valid
        ) {

            errors.push({

                section: "cart",

                message:
                    cartResult.message
            });
        }


        /*
         * Customer
         */

        if (
            checkout.form &&
            typeof
            checkout.form.validateCustomer ===
            "function"
        ) {

            const customer =
                checkout.form
                    .collectCustomer();


            const result =
                checkout.form
                    .validateCustomer(
                        customer
                    );


            if (!result.valid) {

                result.errors.forEach(
                    function (error) {

                        errors.push({

                            section:
                                "customer",

                            field:
                                error.field,

                            message:
                                error.message
                        });

                    }
                );
            }
        }


        /*
         * Billing
         */

        if (
            checkout.form &&
            typeof
            checkout.form.validateBilling ===
            "function"
        ) {

            const billing =
                checkout.form
                    .collectBilling();


            const result =
                checkout.form
                    .validateBilling(
                        billing
                    );


            if (!result.valid) {

                result.errors.forEach(
                    function (error) {

                        errors.push({

                            section:
                                "billing",

                            field:
                                error.field,

                            message:
                                error.message
                        });

                    }
                );
            }
        }


        /*
         * Delivery
         */

        if (
            checkout.delivery &&
            typeof
            checkout.delivery.validate ===
            "function"
        ) {

            const result =
                checkout.delivery
                    .validate();


            if (!result.valid) {

                result.errors.forEach(
                    function (error) {

                        errors.push({

                            section:
                                "delivery",

                            field:
                                error.field,

                            message:
                                error.message
                        });

                    }
                );
            }
        }


        /*
         * Payment
         */

        const paymentResult =
            validatePayment();


        if (
            !paymentResult.valid
        ) {

            paymentResult.errors.forEach(
                function (error) {

                    errors.push({

                        section:
                            "payment",

                        field:
                            error.field,

                        message:
                            error.message
                    });

                }
            );
        }


        return {

            valid:
                errors.length === 0,

            errors:
                errors
        };
    }


    /*=====================================================
      PREPARE ORDER FOR SUBMISSION
    =====================================================*/

    function prepareOrder() {

        const validation =
            validateOrderReview();


        if (!validation.valid) {

            return {

                valid: false,

                errors:
                    validation.errors
            };
        }


        createDraftOrder();


        const review =
            getOrderReview();


        state.order.status =
            "ready";


        checkout.save();


        return {

            valid: true,

            order:
                review
        };
    }


    /*=====================================================
      PAYMENT STEP SUBMISSION
    =====================================================*/

    function submitPaymentStep() {

        savePaymentForm();


        const validation =
            validatePayment();


        if (!validation.valid) {

            return validation;
        }


        checkout.setStep(5);


        const review =
            getOrderReview();


        return {

            valid: true,

            step: 5,

            review:
                review
        };
    }


    /*=====================================================
      FORMAT CURRENCY
    =====================================================*/

    function formatCurrency(
        amount
    ) {

        const value =
            Number(amount) || 0;


        try {

            return new Intl.NumberFormat(
                "en-ZA",
                {
                    style: "currency",
                    currency: "ZAR"
                }
            ).format(value);

        } catch (error) {

            return (
                "R " +
                value.toFixed(2)
            );
        }
    }


    /*=====================================================
      RENDER ORDER REVIEW
    =====================================================*/

    function renderOrderReview(
        container
    ) {

        if (!container) {
            return;
        }


        const review =
            getOrderReview();


        container.innerHTML = "";


        /*
         * Customer section
         */

        const customerSection =
            document.createElement(
                "section"
            );


        customerSection.className =
            "checkout-review-section";


        customerSection.innerHTML =
            `
            <h3>Customer</h3>

            <p>
                <strong>${escapeHTML(
                    review.customer.name
                )}</strong>
            </p>

            <p>
                ${escapeHTML(
                    review.customer.email
                )}
            </p>

            <p>
                ${escapeHTML(
                    review.customer.phone
                )}
            </p>

            ${
                review.customer.company
                    ? `
                        <p>
                            ${escapeHTML(
                                review.customer.company
                            )}
                        </p>
                      `
                    : ""
            }
            `;


        container.appendChild(
            customerSection
        );


        /*
         * Delivery section
         */

        const deliverySection =
            document.createElement(
                "section"
            );


        deliverySection.className =
            "checkout-review-section";


        deliverySection.innerHTML =
            `
            <h3>Delivery</h3>

            <p>
                <strong>
                    ${escapeHTML(
                        review.delivery.method ||
                        "Not selected"
                    )}
                </strong>
            </p>

            <p>
                ${escapeHTML(
                    review.delivery.address1 ||
                    ""
                )}
            </p>

            <p>
                ${escapeHTML(
                    review.delivery.suburb ||
                    ""
                )}
            </p>

            <p>
                ${escapeHTML(
                    review.delivery.city ||
                    ""
                )}
                ${
                    review.delivery.province
                        ? ", " +
                          escapeHTML(
                              review.delivery.province
                          )
                        : ""
                }
            </p>

            <p>
                ${escapeHTML(
                    review.delivery.postalCode ||
                    ""
                )}
            </p>
            `;


        container.appendChild(
            deliverySection
        );


        /*
         * Payment section
         */

        const paymentSection =
            document.createElement(
                "section"
            );


        paymentSection.className =
            "checkout-review-section";


        paymentSection.innerHTML =
            `
            <h3>Payment</h3>

            <p>
                ${escapeHTML(
                    review.payment.method
                )}
            </p>
            `;


        container.appendChild(
            paymentSection
        );


        /*
         * Totals section
         */

        const totalsSection =
            document.createElement(
                "section"
            );


        totalsSection.className =
            "checkout-review-section checkout-review-totals";


        totalsSection.innerHTML =
            `
            <h3>Order Total</h3>

            <p>
                Subtotal:
                <strong>
                    ${formatCurrency(
                        review.totals.subtotal
                    )}
                </strong>
            </p>

            <p>
                Delivery:
                <strong>
                    ${formatCurrency(
                        review.totals.delivery
                    )}
                </strong>
            </p>

            <p>
                Discount:
                <strong>
                    ${formatCurrency(
                        review.totals.discount
                    )}
                </strong>
            </p>

            <p>
                Tax:
                <strong>
                    ${formatCurrency(
                        review.totals.tax
                    )}
                </strong>
            </p>

            <p class="checkout-final-total">
                Total:
                <strong>
                    ${formatCurrency(
                        review.totals.total
                    )}
                </strong>
            </p>
            `;


        container.appendChild(
            totalsSection
        );
    }


    /*=====================================================
      ESCAPE HTML
    =====================================================*/

    function escapeHTML(
        value
    ) {

        return String(
            value == null
                ? ""
                : value
        )
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


    /*=====================================================
      FINAL CHECKOUT VALIDATION
    =====================================================*/

    function validateBeforeOrder() {

        const result =
            validateOrderReview();


        if (!result.valid) {

            console.warn(
                "[NEXPAK CHECKOUT] Order validation failed:",
                result.errors
            );

            return result;
        }


        return {

            valid: true,

            message:
                "Order is ready for submission."
        };
    }


    /*=====================================================
      EXTEND CHECKOUT API
    =====================================================*/

    checkout.payment = {

        config:
            PAYMENT_CONFIG,

        selectors:
            PAYMENT_SELECTORS,

        getMethods:
            getPaymentMethods,

        getMethod:
            getPaymentMethod,

        setMethod:
            setPaymentMethod,

        collect:
            collectPaymentForm,

        save:
            savePaymentForm,

        validate:
            validatePayment,

        render:
            renderPaymentMethods,

        submit:
            submitPaymentStep
    };


    checkout.review = {

        get:
            getOrderReview,

        validate:
            validateOrderReview,

        prepare:
            prepareOrder,

        validateBeforeOrder:
            validateBeforeOrder,

        render:
            renderOrderReview,

        customer:
            getCustomerSummary,

        billing:
            getBillingSummary,

        delivery:
            getDeliverySummary,

        payment:
            getPaymentSummary,

        cart:
            getCartSummary,

        totals:
            getTotalsSummary
    };


    /*=====================================================
      INITIALISE PART 4
    =====================================================*/

    function initPart4() {

        checkout.init();


        /*
         * Default payment method.
         */

        if (
            !state.payment.method
        ) {

            const defaultMethod =
                getPaymentMethod(
                    PAYMENT_CONFIG.defaultMethod
                );


            if (defaultMethod) {

                state.payment.method =
                    defaultMethod.id;
            }
        }


        updatePaymentMethodUI(
            state.payment.method
        );


        attachPaymentListeners();


        /*
         * Render dynamic payment options
         * when the checkout page provides
         * a dedicated container.
         */

        const container =
            document.querySelector(
                "[data-payment-methods]"
            );


        if (container) {

            renderPaymentMethods(
                container
            );
        }


        console.log(
            "%c[NEXPAK CHECKOUT] Part 4/8 loaded",
            "font-weight:bold;"
        );
    }


    /*=====================================================
      START
    =====================================================*/

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initPart4
        );

    } else {

        initPart4();
    }

})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CHECKOUT ENGINE
=========================================================
 File: onlinecheckout.js
 Version: 1.0
 Part: 5/8

 PART 5:
 - Order payload generation
 - Order item normalization
 - Customer payload
 - Billing payload
 - Delivery payload
 - Payment payload
 - Order metadata
 - Order submission preparation
 - Confirmation data
 - Checkout event hooks
=========================================================*/

(function () {

    "use strict";


    /*=====================================================
      SAFETY CHECK
    =====================================================*/

    if (!window.NEXPAKCheckout) {

        console.error(
            "[NEXPAK CHECKOUT] Checkout engine is required."
        );

        return;
    }


    /*=====================================================
      SHORTCUTS
    =====================================================*/

    const checkout =
        window.NEXPAKCheckout;

    const state =
        checkout.state;


    /*=====================================================
      ORDER CONFIGURATION
    =====================================================*/

    const ORDER_CONFIG = {

        version:
            "1.0",

        country:
            "South Africa",

        currency:
            "ZAR",

        orderPrefix:
            "NEX",

        defaultStatus:
            "pending",

        defaultPaymentStatus:
            "pending",

        source:
            "NEXPAK Online Store",

        platform:
            "web"
    };


    /*=====================================================
      ORDER STATUS
    =====================================================*/

    const ORDER_STATUS = {

        DRAFT:
            "draft",

        READY:
            "ready",

        PENDING:
            "pending",

        PROCESSING:
            "processing",

        PAID:
            "paid",

        CONFIRMED:
            "confirmed",

        COMPLETED:
            "completed",

        CANCELLED:
            "cancelled",

        FAILED:
            "failed"
    };


    /*=====================================================
      UTILITY — SAFE NUMBER
    =====================================================*/

    function safeNumber(value) {

        const number =
            Number(value);

        return Number.isFinite(number)
            ? number
            : 0;
    }


    /*=====================================================
      UTILITY — SAFE STRING
    =====================================================*/

    function safeString(value) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";
        }

        return String(value).trim();
    }


    /*=====================================================
      GENERATE ORDER NUMBER
    =====================================================*/

    function generateOrderNumber() {

        const now =
            new Date();


        const year =
            now.getFullYear();


        const month =
            String(
                now.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                now.getDate()
            ).padStart(2, "0");


        const hours =
            String(
                now.getHours()
            ).padStart(2, "0");


        const minutes =
            String(
                now.getMinutes()
            ).padStart(2, "0");


        const random =
            Math.floor(
                1000 +
                Math.random() * 9000
            );


        return (
            ORDER_CONFIG.orderPrefix +
            "-" +
            year +
            month +
            day +
            "-" +
            hours +
            minutes +
            "-" +
            random
        );
    }


    /*=====================================================
      ENSURE ORDER IDENTIFIER
    =====================================================*/

    function ensureOrderIdentifier() {

        if (
            !state.order.orderNumber
        ) {

            state.order.orderNumber =
                generateOrderNumber();
        }


        if (
            !state.order.createdAt
        ) {

            state.order.createdAt =
                new Date().toISOString();
        }


        return state.order;
    }


    /*=====================================================
      NORMALISE ORDER ITEM
    =====================================================*/

    function normalizeOrderItem(
        item,
        index
    ) {

        if (
            !item ||
            typeof item !== "object"
        ) {

            return null;
        }


        const quantity =
            Math.max(
                1,
                safeNumber(
                    item.quantity ||
                    item.qty ||
                    1
                )
            );


        const price =
            safeNumber(
                item.price ||
                item.unitPrice ||
                item.salePrice ||
                0
            );


        return {

            lineNumber:
                index + 1,

            productId:
                safeString(
                    item.id ||
                    item.productId
                ),

            sku:
                safeString(
                    item.sku ||
                    item.id
                ),

            name:
                safeString(
                    item.name ||
                    item.title ||
                    "Product"
                ),

            category:
                safeString(
                    item.category
                ),

            quantity:
                quantity,

            unitPrice:
                price,

            lineTotal:
                price * quantity,

            image:
                safeString(
                    item.image
                ),

            /*
             * Preserve product options/configuration
             * when available.
             */

            options:
                item.options ||
                item.variant ||
                item.configuration ||
                null
        };
    }


    /*=====================================================
      BUILD ORDER ITEMS
    =====================================================*/

    function buildOrderItems() {

        checkout.loadCart();


        return state.cart
            .map(
                normalizeOrderItem
            )
            .filter(
                function (item) {

                    return item !== null;
                }
            );
    }


    /*=====================================================
      BUILD CUSTOMER PAYLOAD
    =====================================================*/

    function buildCustomerPayload() {

        const customer =
            state.customer || {};


        return {

            firstName:
                safeString(
                    customer.firstName
                ),

            lastName:
                safeString(
                    customer.lastName
                ),

            fullName:
                (
                    safeString(
                        customer.firstName
                    ) +
                    " " +
                    safeString(
                        customer.lastName
                    )
                ).trim(),

            email:
                safeString(
                    customer.email
                ),

            phone:
                safeString(
                    customer.phone
                ),

            company:
                safeString(
                    customer.company
                )
        };
    }


    /*=====================================================
      BUILD BILLING PAYLOAD
    =====================================================*/

    function buildBillingPayload() {

        const billing =
            state.billing || {};


        return {

            address1:
                safeString(
                    billing.address1
                ),

            address2:
                safeString(
                    billing.address2
                ),

            suburb:
                safeString(
                    billing.suburb
                ),

            city:
                safeString(
                    billing.city
                ),

            province:
                safeString(
                    billing.province
                ),

            postalCode:
                safeString(
                    billing.postalCode
                ),

            country:
                safeString(
                    billing.country
                ) ||
                ORDER_CONFIG.country
        };
    }


    /*=====================================================
      BUILD DELIVERY PAYLOAD
    =====================================================*/

    function buildDeliveryPayload() {

        const delivery =
            state.delivery || {};


        let method =
            delivery.method || "";


        let methodName =
            "";


        /*
         * Get friendly delivery name
         * from the delivery engine where available.
         */

        if (
            checkout.delivery &&
            typeof
            checkout.delivery.getMethod ===
            "function"
        ) {

            const methodObject =
                checkout.delivery
                    .getMethod(
                        method
                    );


            if (methodObject) {

                methodName =
                    safeString(
                        methodObject.name
                    );
            }
        }


        return {

            method:
                safeString(
                    method
                ),

            methodName:
                methodName,

            address1:
                safeString(
                    delivery.address1
                ),

            address2:
                safeString(
                    delivery.address2
                ),

            suburb:
                safeString(
                    delivery.suburb
                ),

            city:
                safeString(
                    delivery.city
                ),

            province:
                safeString(
                    delivery.province
                ),

            postalCode:
                safeString(
                    delivery.postalCode
                ),

            country:
                ORDER_CONFIG.country,

            instructions:
                safeString(
                    delivery.instructions
                ),

            cost:
                safeNumber(
                    state.totals.delivery
                )
        };
    }


    /*=====================================================
      BUILD PAYMENT PAYLOAD
    =====================================================*/

    function buildPaymentPayload() {

        const payment =
            state.payment || {};


        let methodName =
            "";


        if (
            checkout.payment &&
            typeof
            checkout.payment.getMethod ===
            "function"
        ) {

            const method =
                checkout.payment
                    .getMethod(
                        payment.method
                    );


            if (method) {

                methodName =
                    safeString(
                        method.name
                    );
            }
        }


        return {

            method:
                safeString(
                    payment.method
                ),

            methodName:
                methodName,

            status:
                safeString(
                    payment.status
                ) ||
                ORDER_CONFIG.defaultPaymentStatus,

            reference:
                safeString(
                    payment.reference
                )
        };
    }


    /*=====================================================
      BUILD TOTALS PAYLOAD
    =====================================================*/

    function buildTotalsPayload() {

        checkout.calculateTotals();


        return {

            subtotal:
                safeNumber(
                    state.totals.subtotal
                ),

            delivery:
                safeNumber(
                    state.totals.delivery
                ),

            discount:
                safeNumber(
                    state.totals.discount
                ),

            tax:
                safeNumber(
                    state.totals.tax
                ),

            total:
                safeNumber(
                    state.totals.total
                ),

            currency:
                ORDER_CONFIG.currency
        };
    }


    /*=====================================================
      BUILD ORDER METADATA
    =====================================================*/

    function buildOrderMetadata() {

        return {

            source:
                ORDER_CONFIG.source,

            platform:
                ORDER_CONFIG.platform,

            checkoutVersion:
                ORDER_CONFIG.version,

            createdAt:
                state.order.createdAt ||
                new Date().toISOString(),

            userAgent:
                safeString(
                    navigator.userAgent
                ),

            language:
                safeString(
                    navigator.language
                ),

            timezone:
                safeString(
                    Intl.DateTimeFormat()
                        .resolvedOptions()
                        .timeZone
                )
        };
    }


    /*=====================================================
      BUILD ORDER PAYLOAD
    =====================================================*/

    function buildOrderPayload() {

        ensureOrderIdentifier();

        checkout.loadCart();

        checkout.calculateTotals();


        const items =
            buildOrderItems();


        const payload = {

            orderNumber:
                state.order.orderNumber,

            status:
                state.order.status ||
                ORDER_STATUS.DRAFT,

            customer:
                buildCustomerPayload(),

            billing:
                buildBillingPayload(),

            delivery:
                buildDeliveryPayload(),

            payment:
                buildPaymentPayload(),

            items:
                items,

            totals:
                buildTotalsPayload(),

            notes:
                safeString(
                    state.notes
                ),

            metadata:
                buildOrderMetadata()
        };


        return payload;
    }


    /*=====================================================
      VALIDATE ORDER PAYLOAD
    =====================================================*/

    function validateOrderPayload(
        payload
    ) {

        const errors = [];


        if (
            !payload ||
            typeof payload !== "object"
        ) {

            return {

                valid: false,

                errors: [
                    "Order payload is invalid."
                ]
            };
        }


        if (
            !payload.orderNumber
        ) {

            errors.push(
                "Order number is missing."
            );
        }


        if (
            !payload.customer.firstName
        ) {

            errors.push(
                "Customer first name is missing."
            );
        }


        if (
            !payload.customer.lastName
        ) {

            errors.push(
                "Customer last name is missing."
            );
        }


        if (
            !payload.customer.email
        ) {

            errors.push(
                "Customer email is missing."
            );
        }


        if (
            !Array.isArray(
                payload.items
            ) ||
            payload.items.length === 0
        ) {

            errors.push(
                "Order contains no products."
            );
        }


        if (
            payload.totals.total <= 0
        ) {

            errors.push(
                "Order total must be greater than zero."
            );
        }


        if (
            !payload.payment.method
        ) {

            errors.push(
                "Payment method is missing."
            );
        }


        return {

            valid:
                errors.length === 0,

            errors:
                errors
        };
    }


    /*=====================================================
      PREPARE ORDER
    =====================================================*/

    function prepareOrderSubmission() {

        /*
         * Run the complete checkout validation
         * before creating the final payload.
         */

        if (
            checkout.review &&
            typeof
            checkout.review.validateBeforeOrder ===
            "function"
        ) {

            const validation =
                checkout.review
                    .validateBeforeOrder();


            if (
                !validation.valid
            ) {

                return {

                    valid: false,

                    errors:
                        validation.errors || []
                };
            }
        }


        ensureOrderIdentifier();


        const payload =
            buildOrderPayload();


        const validation =
            validateOrderPayload(
                payload
            );


        if (!validation.valid) {

            return {

                valid: false,

                errors:
                    validation.errors
            };
        }


        /*
         * Mark order as ready.
         */

        state.order.status =
            ORDER_STATUS.READY;


        checkout.save();


        return {

            valid: true,

            order:
                payload
        };
    }


    /*=====================================================
      LOCK ORDER FOR SUBMISSION
    =====================================================*/

    function lockOrder() {

        state.order.status =
            ORDER_STATUS.PROCESSING;


        state.order.lockedAt =
            new Date().toISOString();


        checkout.save();


        return state.order;
    }


    /*=====================================================
      UNLOCK ORDER AFTER FAILURE
    =====================================================*/

    function unlockOrder() {

        if (
            state.order.status ===
            ORDER_STATUS.PROCESSING
        ) {

            state.order.status =
                ORDER_STATUS.READY;
        }


        checkout.save();


        return state.order;
    }


    /*=====================================================
      SET ORDER STATUS
    =====================================================*/

    function setOrderStatus(
        status
    ) {

        const allowed = [

            ORDER_STATUS.DRAFT,

            ORDER_STATUS.READY,

            ORDER_STATUS.PENDING,

            ORDER_STATUS.PROCESSING,

            ORDER_STATUS.PAID,

            ORDER_STATUS.CONFIRMED,

            ORDER_STATUS.COMPLETED,

            ORDER_STATUS.CANCELLED,

            ORDER_STATUS.FAILED

        ];


        if (
            allowed.indexOf(status) === -1
        ) {

            return {

                valid: false,

                message:
                    "Invalid order status."
            };
        }


        state.order.status =
            status;


        checkout.save();


        return {

            valid: true,

            status:
                status
        };
    }


    /*=====================================================
      BUILD CONFIRMATION DATA
    =====================================================*/

    function buildConfirmationData(
        response
    ) {

        const payload =
            buildOrderPayload();


        return {

            orderNumber:
                payload.orderNumber,

            status:
                state.order.status,

            customer:
                payload.customer,

            items:
                payload.items,

            totals:
                payload.totals,

            payment:
                payload.payment,

            delivery:
                payload.delivery,

            response:
                response || null,

            confirmedAt:
                new Date().toISOString()
        };
    }


    /*=====================================================
      SAVE CONFIRMATION DATA
    =====================================================*/

    function saveConfirmationData(
        response
    ) {

        const confirmation =
            buildConfirmationData(
                response
            );


        try {

            localStorage.setItem(
                "nexpak_order_confirmation",
                JSON.stringify(
                    confirmation
                )
            );

        } catch (error) {

            console.warn(
                "[NEXPAK CHECKOUT] Could not save confirmation:",
                error
            );
        }


        return confirmation;
    }


    /*=====================================================
      CHECK ORDER LOCK
    =====================================================*/

    function isOrderLocked() {

        return (
            state.order.status ===
            ORDER_STATUS.PROCESSING
        );
    }


    /*=====================================================
      PREVENT DUPLICATE SUBMISSION
    =====================================================*/

    function canSubmitOrder() {

        if (
            isOrderLocked()
        ) {

            return {

                valid: false,

                message:
                    "This order is already being processed."
            };
        }


        if (
            state.order.status ===
            ORDER_STATUS.CONFIRMED
        ) {

            return {

                valid: false,

                message:
                    "This order has already been confirmed."
            };
        }


        if (
            state.order.status ===
            ORDER_STATUS.COMPLETED
        ) {

            return {

                valid: false,

                message:
                    "This order has already been completed."
            };
        }


        return {

            valid: true,

            message:
                "Order can be submitted."
        };
    }


    /*=====================================================
      CHECKOUT EVENT SYSTEM
    =====================================================*/

    const checkoutEvents = {};


    function on(
        eventName,
        callback
    ) {

        if (
            typeof callback !==
            "function"
        ) {

            return;
        }


        if (
            !checkoutEvents[eventName]
        ) {

            checkoutEvents[eventName] =
                [];
        }


        checkoutEvents[eventName]
            .push(callback);
    }


    function emit(
        eventName,
        data
    ) {

        const listeners =
            checkoutEvents[eventName];


        if (
            !Array.isArray(listeners)
        ) {

            return;
        }


        listeners.forEach(
            function (callback) {

                try {

                    callback(data);

                } catch (error) {

                    console.error(
                        "[NEXPAK CHECKOUT] Event error:",
                        eventName,
                        error
                    );
                }

            }
        );
    }


    /*=====================================================
      SUBMISSION START EVENT
    =====================================================*/

    function beginOrderSubmission() {

        const permission =
            canSubmitOrder();


        if (!permission.valid) {

            return permission;
        }


        const prepared =
            prepareOrderSubmission();


        if (!prepared.valid) {

            return prepared;
        }


        lockOrder();


        emit(
            "order:submitting",
            prepared.order
        );


        return {

            valid: true,

            order:
                prepared.order
        };
    }


    /*=====================================================
      ORDER SUCCESS
    =====================================================*/

    function completeOrder(
        response
    ) {

        state.order.status =
            ORDER_STATUS.CONFIRMED;


        state.order.confirmedAt =
            new Date().toISOString();


        state.payment.status =
            "paid";


        checkout.save();


        const confirmation =
            saveConfirmationData(
                response
            );


        emit(
            "order:confirmed",
            confirmation
        );


        return confirmation;
    }


    /*=====================================================
      ORDER FAILURE
    =====================================================*/

    function failOrder(
        error
    ) {

        state.order.status =
            ORDER_STATUS.FAILED;


        state.order.failedAt =
            new Date().toISOString();


        state.order.error =
            safeString(
                error &&
                (
                    error.message ||
                    error
                )
            );


        checkout.save();


        emit(
            "order:failed",
            {

                orderNumber:
                    state.order.orderNumber,

                error:
                    state.order.error
            }
        );


        return {

            valid: false,

            orderNumber:
                state.order.orderNumber,

            error:
                state.order.error
        };
    }


    /*=====================================================
      CANCEL ORDER
    =====================================================*/

    function cancelOrder(
        reason
    ) {

        state.order.status =
            ORDER_STATUS.CANCELLED;


        state.order.cancelledAt =
            new Date().toISOString();


        state.order.cancelReason =
            safeString(
                reason
            );


        checkout.save();


        emit(
            "order:cancelled",
            {

                orderNumber:
                    state.order.orderNumber,

                reason:
                    state.order.cancelReason
            }
        );


        return state.order;
    }


    /*=====================================================
      EXTEND CHECKOUT API
    =====================================================*/

    checkout.order = {

        config:
            ORDER_CONFIG,

        status:
            ORDER_STATUS,

        generateNumber:
            generateOrderNumber,

        ensureIdentifier:
            ensureOrderIdentifier,

        buildItems:
            buildOrderItems,

        buildCustomer:
            buildCustomerPayload,

        buildBilling:
            buildBillingPayload,

        buildDelivery:
            buildDeliveryPayload,

        buildPayment:
            buildPaymentPayload,

        buildTotals:
            buildTotalsPayload,

        buildMetadata:
            buildOrderMetadata,

        build:
            buildOrderPayload,

        validate:
            validateOrderPayload,

        prepare:
            prepareOrderSubmission,

        lock:
            lockOrder,

        unlock:
            unlockOrder,

        setStatus:
            setOrderStatus,

        canSubmit:
            canSubmitOrder,

        begin:
            beginOrderSubmission,

        complete:
            completeOrder,

        fail:
            failOrder,

        cancel:
            cancelOrder,

        confirmation:
            buildConfirmationData,

        saveConfirmation:
            saveConfirmationData,

        isLocked:
            isOrderLocked,

        on:
            on,

        emit:
            emit
    };


    /*=====================================================
      INITIALISE PART 5
    =====================================================*/

    function initPart5() {

        checkout.init();


        ensureOrderIdentifier();


        /*
         * Do not automatically lock or submit
         * an order during page initialization.
         */

        if (
            state.order.status ===
            ORDER_STATUS.PROCESSING
        ) {

            console.warn(
                "[NEXPAK CHECKOUT] Previous checkout was interrupted while processing."
            );

            /*
             * Return it to READY so the customer
             * can safely attempt checkout again.
             */

            state.order.status =
                ORDER_STATUS.READY;

            checkout.save();
        }


        console.log(
            "%c[NEXPAK CHECKOUT] Part 5/8 loaded",
            "font-weight:bold;"
        );
    }


    /*=====================================================
      START
    =====================================================*/

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initPart5
        );

    } else {

        initPart5();
    }

})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CHECKOUT ENGINE
=========================================================
 File: onlinecheckout.js
 Version: 1.0
 Part: 6/8

 PART 6:
 - Checkout controller
 - Step navigation
 - Next / Back buttons
 - Checkout form handling
 - Review screen
 - Confirmation screen
 - Checkout UI state
 - Button state management
 - Checkout event handling
=========================================================*/

(function () {

    "use strict";


    /*=====================================================
      SAFETY CHECK
    =====================================================*/

    if (!window.NEXPAKCheckout) {

        console.error(
            "[NEXPAK CHECKOUT] Checkout engine is required."
        );

        return;
    }


    /*=====================================================
      SHORTCUTS
    =====================================================*/

    const checkout =
        window.NEXPAKCheckout;

    const state =
        checkout.state;


    /*=====================================================
      CONTROLLER CONFIGURATION
    =====================================================*/

    const CONTROLLER_CONFIG = {

        firstStep:
            1,

        customerStep:
            1,

        billingStep:
            2,

        deliveryStep:
            3,

        paymentStep:
            4,

        reviewStep:
            5,

        totalSteps:
            5
    };


    /*=====================================================
      CHECKOUT SELECTORS
    =====================================================*/

    const UI_SELECTORS = {

        checkout:
            "[data-checkout]",

        step:
            "[data-checkout-step]",

        stepContent:
            "[data-checkout-content]",

        next:
            "[data-checkout-next]",

        back:
            "[data-checkout-back]",

        submit:
            "[data-checkout-submit]",

        review:
            "[data-checkout-review]",

        confirmation:
            "[data-checkout-confirmation]",

        error:
            "[data-checkout-error]",

        loading:
            "[data-checkout-loading]",

        progress:
            "[data-checkout-progress]"
    };


    /*=====================================================
      INTERNAL CONTROLLER STATE
    =====================================================*/

    const controllerState = {

        initialized:
            false,

        submitting:
            false,

        confirmed:
            false,

        errors:
            [],

        lastStep:
            null
    };


    /*=====================================================
      SAFE NUMBER
    =====================================================*/

    function safeNumber(value) {

        const number =
            Number(value);

        return Number.isFinite(number)
            ? number
            : 0;
    }


    /*=====================================================
      GET CURRENT STEP
    =====================================================*/

    function getCurrentStep() {

        return Math.max(
            CONTROLLER_CONFIG.firstStep,
            Math.min(
                CONTROLLER_CONFIG.totalSteps,
                safeNumber(
                    state.step
                )
            )
        );
    }


    /*=====================================================
      SET CURRENT STEP
    =====================================================*/

    function setCurrentStep(
        step
    ) {

        const target =
            Math.max(
                CONTROLLER_CONFIG.firstStep,
                Math.min(
                    CONTROLLER_CONFIG.totalSteps,
                    safeNumber(step)
                )
            );


        controllerState.lastStep =
            getCurrentStep();


        state.step =
            target;


        checkout.save();


        renderStep();


        return target;
    }


    /*=====================================================
      STEP VALIDATION
    =====================================================*/

    function validateStep(
        step
    ) {

        switch (Number(step)) {

            case CONTROLLER_CONFIG.customerStep:

                if (
                    checkout.form &&
                    typeof
                    checkout.form
                        .validateCustomerForm ===
                    "function"
                ) {

                    return checkout.form
                        .validateCustomerForm();
                }

                return {
                    valid: true,
                    errors: []
                };


            case CONTROLLER_CONFIG.billingStep:

                if (
                    checkout.form &&
                    typeof
                    checkout.form
                        .validateBillingForm ===
                    "function"
                ) {

                    return checkout.form
                        .validateBillingForm();
                }

                return {
                    valid: true,
                    errors: []
                };


            case CONTROLLER_CONFIG.deliveryStep:

                if (
                    checkout.delivery &&
                    typeof
                    checkout.delivery
                        .validate ===
                    "function"
                ) {

                    return checkout.delivery
                        .validate();
                }

                return {
                    valid: true,
                    errors: []
                };


            case CONTROLLER_CONFIG.paymentStep:

                if (
                    checkout.payment &&
                    typeof
                    checkout.payment
                        .validate ===
                    "function"
                ) {

                    return checkout.payment
                        .validate();
                }

                return {
                    valid: true,
                    errors: []
                };


            case CONTROLLER_CONFIG.reviewStep:

                if (
                    checkout.review &&
                    typeof
                    checkout.review
                        .validate ===
                    "function"
                ) {

                    return checkout.review
                        .validate();
                }

                return {
                    valid: true,
                    errors: []
                };


            default:

                return {
                    valid: false,
                    errors: [
                        {
                            message:
                                "Invalid checkout step."
                        }
                    ]
                };
        }
    }


    /*=====================================================
      SAVE CURRENT STEP DATA
    =====================================================*/

    function saveCurrentStep() {

        const step =
            getCurrentStep();


        try {

            switch (step) {

                case CONTROLLER_CONFIG.customerStep:

                    if (
                        checkout.form &&
                        typeof
                        checkout.form
                            .saveCustomer ===
                        "function"
                    ) {

                        checkout.form
                            .saveCustomer();
                    }

                    break;


                case CONTROLLER_CONFIG.billingStep:

                    if (
                        checkout.form &&
                        typeof
                        checkout.form
                            .saveBilling ===
                        "function"
                    ) {

                        checkout.form
                            .saveBilling();
                    }

                    break;


                case CONTROLLER_CONFIG.deliveryStep:

                    if (
                        checkout.delivery &&
                        typeof
                        checkout.delivery
                            .saveAddress ===
                        "function"
                    ) {

                        checkout.delivery
                            .saveAddress();
                    }

                    break;


                case CONTROLLER_CONFIG.paymentStep:

                    if (
                        checkout.payment &&
                        typeof
                        checkout.payment
                            .save ===
                        "function"
                    ) {

                        checkout.payment
                            .save();
                    }

                    break;
            }

        } catch (error) {

            console.warn(
                "[NEXPAK CHECKOUT] Could not save current step:",
                error
            );
        }


        checkout.save();
    }


    /*=====================================================
      GO TO NEXT STEP
    =====================================================*/

    function nextStep() {

        const current =
            getCurrentStep();


        const validation =
            validateStep(
                current
            );


        if (
            !validation.valid
        ) {

            controllerState.errors =
                validation.errors || [];


            displayErrors(
                controllerState.errors
            );


            return {

                valid: false,

                step:
                    current,

                errors:
                    controllerState.errors
            };
        }


        saveCurrentStep();


        /*
         * Step-specific submission hooks.
         */

        let result = {
            valid: true
        };


        if (
            current ===
            CONTROLLER_CONFIG.customerStep &&
            checkout.form &&
            typeof
            checkout.form.submitCustomer ===
            "function"
        ) {

            result =
                checkout.form
                    .submitCustomer();
        }


        if (
            current ===
            CONTROLLER_CONFIG.billingStep &&
            checkout.form &&
            typeof
            checkout.form.submitBilling ===
            "function"
        ) {

            result =
                checkout.form
                    .submitBilling();
        }


        if (
            current ===
            CONTROLLER_CONFIG.deliveryStep &&
            checkout.delivery &&
            typeof
            checkout.delivery.submit ===
            "function"
        ) {

            result =
                checkout.delivery
                    .submit();
        }


        if (
            current ===
            CONTROLLER_CONFIG.paymentStep &&
            checkout.payment &&
            typeof
            checkout.payment.submit ===
            "function"
        ) {

            result =
                checkout.payment
                    .submit();
        }


        if (
            !result.valid
        ) {

            controllerState.errors =
                result.errors || [];


            displayErrors(
                controllerState.errors
            );


            return result;
        }


        const next =
            Math.min(
                CONTROLLER_CONFIG.totalSteps,
                current + 1
            );


        setCurrentStep(
            next
        );


        clearErrors();


        return {

            valid: true,

            previousStep:
                current,

            step:
                next
        };
    }


    /*=====================================================
      GO TO PREVIOUS STEP
    =====================================================*/

    function previousStep() {

        const current =
            getCurrentStep();


        if (
            current <=
            CONTROLLER_CONFIG.firstStep
        ) {

            return {

                valid: false,

                step:
                    current,

                message:
                    "Already at the first checkout step."
            };
        }


        saveCurrentStep();


        const previous =
            current - 1;


        setCurrentStep(
            previous
        );


        clearErrors();


        return {

            valid: true,

            previousStep:
                current,

            step:
                previous
        };
    }


    /*=====================================================
      GO DIRECTLY TO STEP
    =====================================================*/

    function goToStep(
        targetStep
    ) {

        const target =
            safeNumber(
                targetStep
            );


        const current =
            getCurrentStep();


        /*
         * Never allow a customer to jump
         * forward over incomplete steps.
         */

        if (
            target >
            current
        ) {

            for (
                let step = current;
                step < target;
                step++
            ) {

                const validation =
                    validateStep(
                        step
                    );


                if (
                    !validation.valid
                ) {

                    displayErrors(
                        validation.errors || []
                    );


                    return {

                        valid: false,

                        step:
                            step,

                        errors:
                            validation.errors
                    };
                }
            }
        }


        setCurrentStep(
            target
        );


        return {

            valid: true,

            step:
                target
        };
    }


    /*=====================================================
      RENDER STEP
    =====================================================*/

    function renderStep() {

        const current =
            getCurrentStep();


        /*
         * Step containers.
         */

        document
            .querySelectorAll(
                UI_SELECTORS.step
            )
            .forEach(
                function (element) {

                    const elementStep =
                        safeNumber(
                            element.dataset
                                .checkoutStep
                        );


                    const active =
                        elementStep ===
                        current;


                    element.hidden =
                        !active;


                    element.classList.toggle(
                        "active",
                        active
                    );


                    element.classList.toggle(
                        "is-active",
                        active
                    );
                }
            );


        /*
         * Step content containers.
         */

        document
            .querySelectorAll(
                UI_SELECTORS.stepContent
            )
            .forEach(
                function (element) {

                    const elementStep =
                        safeNumber(
                            element.dataset
                                .checkoutContent
                        );


                    element.hidden =
                        elementStep !==
                        current;
                }
            );


        updateProgress();


        updateNavigation();


        /*
         * Refresh review whenever the
         * review step becomes active.
         */

        if (
            current ===
            CONTROLLER_CONFIG.reviewStep
        ) {

            renderReview();
        }
    }


    /*=====================================================
      UPDATE PROGRESS
    =====================================================*/

    function updateProgress() {

        const current =
            getCurrentStep();


        const percentage =
            Math.round(
                (
                    current /
                    CONTROLLER_CONFIG.totalSteps
                ) * 100
            );


        document
            .querySelectorAll(
                UI_SELECTORS.progress
            )
            .forEach(
                function (element) {

                    element.style.width =
                        percentage + "%";


                    element.setAttribute(
                        "aria-valuenow",
                        String(
                            percentage
                        )
                    );


                    element.textContent =
                        percentage + "%";
                }
            );


        document
            .querySelectorAll(
                "[data-checkout-current-step]"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        String(
                            current
                        );
                }
            );


        document
            .querySelectorAll(
                "[data-checkout-total-steps]"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        String(
                            CONTROLLER_CONFIG
                                .totalSteps
                        );
                }
            );
    }


    /*=====================================================
      UPDATE NAVIGATION
    =====================================================*/

    function updateNavigation() {

        const current =
            getCurrentStep();


        document
            .querySelectorAll(
                UI_SELECTORS.back
            )
            .forEach(
                function (button) {

                    button.disabled =
                        current <=
                        CONTROLLER_CONFIG.firstStep;
                }
            );


        document
            .querySelectorAll(
                UI_SELECTORS.next
            )
            .forEach(
                function (button) {

                    const isReview =
                        current ===
                        CONTROLLER_CONFIG.reviewStep;


                    button.hidden =
                        isReview;


                    button.disabled =
                        controllerState.submitting;
                }
            );


        document
            .querySelectorAll(
                UI_SELECTORS.submit
            )
            .forEach(
                function (button) {

                    const isReview =
                        current ===
                        CONTROLLER_CONFIG.reviewStep;


                    button.hidden =
                        !isReview;


                    button.disabled =
                        controllerState.submitting;
                }
            );
    }


    /*=====================================================
      DISPLAY ERRORS
    =====================================================*/

    function displayErrors(
        errors
    ) {

        if (
            !Array.isArray(errors)
        ) {
            return;
        }


        const messages =
            errors.map(
                function (error) {

                    if (
                        typeof error ===
                        "string"
                    ) {

                        return error;
                    }


                    return error.message ||
                        "Please check your information.";
                }
            );


        const uniqueMessages =
            Array.from(
                new Set(
                    messages
                )
            );


        document
            .querySelectorAll(
                UI_SELECTORS.error
            )
            .forEach(
                function (element) {

                    element.innerHTML = "";


                    uniqueMessages.forEach(
                        function (message) {

                            const item =
                                document.createElement(
                                    "div"
                                );


                            item.className =
                                "checkout-error-item";


                            item.textContent =
                                message;


                            element.appendChild(
                                item
                            );
                        }
                    );


                    element.hidden =
                        uniqueMessages.length === 0;
                }
            );


        /*
         * Scroll to the first error container.
         */

        if (
            uniqueMessages.length
        ) {

            const errorElement =
                document.querySelector(
                    UI_SELECTORS.error
                );


            if (errorElement) {

                try {

                    errorElement.scrollIntoView(
                        {
                            behavior:
                                "smooth",

                            block:
                                "center"
                        }
                    );

                } catch (error) {

                    errorElement.scrollIntoView();
                }
            }
        }
    }


    /*=====================================================
      CLEAR ERRORS
    =====================================================*/

    function clearErrors() {

        controllerState.errors =
            [];


        document
            .querySelectorAll(
                UI_SELECTORS.error
            )
            .forEach(
                function (element) {

                    element.innerHTML =
                        "";

                    element.hidden =
                        true;
                }
            );
    }


    /*=====================================================
      RENDER REVIEW
    =====================================================*/

    function renderReview() {

        const container =
            document.querySelector(
                UI_SELECTORS.review
            );


        if (
            !container
        ) {
            return;
        }


        if (
            checkout.review &&
            typeof
            checkout.review.render ===
            "function"
        ) {

            checkout.review.render(
                container
            );

            return;
        }


        container.textContent =
            "Order review unavailable.";
    }


    /*=====================================================
      SUBMIT ORDER
    =====================================================*/

    function submitOrder() {

        if (
            controllerState.submitting
        ) {

            return {

                valid: false,

                message:
                    "Order submission is already in progress."
            };
        }


        controllerState.submitting =
            true;


        updateNavigation();

        showLoading(
            true
        );


        try {

            /*
             * Validate entire order.
             */

            const validation =
                checkout.order &&
                typeof
                checkout.order.begin ===
                "function"
                    ? checkout.order.begin()
                    : {
                        valid: false,
                        errors: [
                            "Order engine unavailable."
                        ]
                    };


            if (
                !validation.valid
            ) {

                controllerState.submitting =
                    false;


                showLoading(
                    false
                );


                displayErrors(
                    validation.errors || []
                );


                updateNavigation();


                return validation;
            }


            /*
             * Real payment/order processing is
             * intentionally delegated to the future
             * integration engine.
             */

            if (
                window.NEXPAKIntegration &&
                typeof
                window.NEXPAKIntegration
                    .submitOrder ===
                "function"
            ) {

                const result =
                    window.NEXPAKIntegration
                        .submitOrder(
                            validation.order
                        );


                /*
                 * Support synchronous results.
                 */

                if (
                    result &&
                    typeof
                    result.then ===
                    "function"
                ) {

                    result
                        .then(
                            handleSubmissionSuccess
                        )
                        .catch(
                            handleSubmissionFailure
                        );


                    return {

                        valid: true,

                        pending: true
                    };
                }


                handleSubmissionSuccess(
                    result
                );


                return {

                    valid: true,

                    result:
                        result
                };
            }


            /*
             * Integration engine does not exist yet.
             * Keep the order ready instead of pretending
             * payment succeeded.
             */

            checkout.order.unlock();


            controllerState.submitting =
                false;


            showLoading(
                false
            );


            updateNavigation();


            return {

                valid: false,

                pending: false,

                integrationRequired:
                    true,

                message:
                    "Order is ready, but payment integration has not been connected yet."
            };

        } catch (error) {

            handleSubmissionFailure(
                error
            );


            return {

                valid: false,

                error:
                    error
            };
        }
    }


    /*=====================================================
      SUBMISSION SUCCESS
    =====================================================*/

    function handleSubmissionSuccess(
        response
    ) {

        controllerState.submitting =
            false;


        showLoading(
            false
        );


        controllerState.confirmed =
            true;


        if (
            checkout.order &&
            typeof
            checkout.order.complete ===
            "function"
        ) {

            checkout.order.complete(
                response
            );
        }


        renderConfirmation(
            response
        );


        emitControllerEvent(
            "confirmed",
            response
        );


        updateNavigation();
    }


    /*=====================================================
      SUBMISSION FAILURE
    =====================================================*/

    function handleSubmissionFailure(
        error
    ) {

        controllerState.submitting =
            false;


        showLoading(
            false
        );


        if (
            checkout.order &&
            typeof
            checkout.order.fail ===
            "function"
        ) {

            checkout.order.fail(
                error
            );
        }


        displayErrors(
            [
                {
                    message:
                        error &&
                        (
                            error.message ||
                            error
                        )
                        ||
                        "Order submission failed. Please try again."
                }
            ]
        );


        emitControllerEvent(
            "failed",
            error
        );


        updateNavigation();
    }


    /*=====================================================
      SHOW LOADING
    =====================================================*/

    function showLoading(
        show
    ) {

        document
            .querySelectorAll(
                UI_SELECTORS.loading
            )
            .forEach(
                function (element) {

                    element.hidden =
                        !show;
                }
            );


        document
            .querySelectorAll(
                UI_SELECTORS.submit
            )
            .forEach(
                function (button) {

                    button.disabled =
                        show;

                }
            );
    }


    /*=====================================================
      RENDER CONFIRMATION
    =====================================================*/

    function renderConfirmation(
        response
    ) {

        const container =
            document.querySelector(
                UI_SELECTORS.confirmation
            );


        if (
            !container
        ) {
            return;
        }


        let confirmation = null;


        if (
            checkout.order &&
            typeof
            checkout.order.confirmation ===
            "function"
        ) {

            confirmation =
                checkout.order.confirmation(
                    response
                );
        }


        if (
            !confirmation
        ) {

            confirmation = {

                orderNumber:
                    state.order.orderNumber,

                status:
                    state.order.status,

                total:
                    state.totals.total
            };
        }


        container.hidden =
            false;


        container.innerHTML =
            "";


        const heading =
            document.createElement(
                "h2"
            );


        heading.textContent =
            "Order Confirmed";


        const orderNumber =
            document.createElement(
                "p"
            );


        orderNumber.textContent =
            "Order Number: " +
            (
                confirmation.orderNumber ||
                state.order.orderNumber
            );


        const status =
            document.createElement(
                "p"
            );


        status.textContent =
            "Status: " +
            (
                confirmation.status ||
                "Confirmed"
            );


        container.appendChild(
            heading
        );


        container.appendChild(
            orderNumber
        );


        container.appendChild(
            status
        );


        /*
         * Hide checkout form after confirmation.
         */

        document
            .querySelectorAll(
                UI_SELECTORS.checkout
            )
            .forEach(
                function (element) {

                    element.classList.add(
                        "checkout-complete"
                    );
                }
            );
    }


    /*=====================================================
      ATTACH NAVIGATION EVENTS
    =====================================================*/

    function attachNavigationListeners() {

        document
            .querySelectorAll(
                UI_SELECTORS.next
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();

                            nextStep();

                        }
                    );
                }
            );


        document
            .querySelectorAll(
                UI_SELECTORS.back
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();

                            previousStep();

                        }
                    );
                }
            );


        document
            .querySelectorAll(
                UI_SELECTORS.submit
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();

                            submitOrder();

                        }
                    );
                }
            );
    }


    /*=====================================================
      ATTACH CHECKOUT FORM EVENTS
    =====================================================*/

    function attachFormListeners() {

        document
            .querySelectorAll(
                "form[data-checkout-form]"
            )
            .forEach(
                function (form) {

                    form.addEventListener(
                        "submit",
                        function (event) {

                            event.preventDefault();


                            const current =
                                getCurrentStep();


                            if (
                                current <
                                CONTROLLER_CONFIG
                                    .reviewStep
                            ) {

                                nextStep();

                            } else {

                                submitOrder();
                            }

                        }
                    );
                }
            );
    }


    /*=====================================================
      ATTACH STEP CLICK EVENTS
    =====================================================*/

    function attachStepListeners() {

        document
            .querySelectorAll(
                "[data-checkout-go-step]"
            )
            .forEach(
                function (element) {

                    element.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();


                            const target =
                                safeNumber(
                                    element.dataset
                                        .checkoutGoStep
                                );


                            goToStep(
                                target
                            );

                        }
                    );
                }
            );
    }


    /*=====================================================
      CONTROLLER EVENTS
    =====================================================*/

    const controllerEvents = {};


    function onControllerEvent(
        eventName,
        callback
    ) {

        if (
            typeof callback !==
            "function"
        ) {
            return;
        }


        if (
            !controllerEvents[eventName]
        ) {

            controllerEvents[eventName] =
                [];
        }


        controllerEvents[eventName]
            .push(callback);
    }


    function emitControllerEvent(
        eventName,
        data
    ) {

        const listeners =
            controllerEvents[eventName];


        if (
            !Array.isArray(
                listeners
            )
        ) {
            return;
        }


        listeners.forEach(
            function (callback) {

                try {

                    callback(data);

                } catch (error) {

                    console.error(
                        "[NEXPAK CHECKOUT] Controller event error:",
                        error
                    );
                }

            }
        );
    }


    /*=====================================================
      RESET CHECKOUT
    =====================================================*/

    function resetCheckout() {

        state.step =
            CONTROLLER_CONFIG.firstStep;


        state.payment.method =
            "";


        state.payment.status =
            "pending";


        state.payment.reference =
            "";


        state.order = {

            orderNumber:
                "",

            createdAt:
                "",

            status:
                "draft"
        };


        controllerState.submitting =
            false;


        controllerState.confirmed =
            false;


        controllerState.errors =
            [];


        checkout.save();


        clearErrors();


        setCurrentStep(
            CONTROLLER_CONFIG.firstStep
        );


        emitControllerEvent(
            "reset",
            state
        );


        return state;
    }


    /*=====================================================
      EXTEND CHECKOUT API
    =====================================================*/

    checkout.controller = {

        config:
            CONTROLLER_CONFIG,

        state:
            controllerState,

        selectors:
            UI_SELECTORS,

        getStep:
            getCurrentStep,

        setStep:
            setCurrentStep,

        validateStep:
            validateStep,

        saveStep:
            saveCurrentStep,

        next:
            nextStep,

        back:
            previousStep,

        goTo:
            goToStep,

        render:
            renderStep,

        review:
            renderReview,

        submit:
            submitOrder,

        confirmation:
            renderConfirmation,

        loading:
            showLoading,

        clearErrors:
            clearErrors,

        displayErrors:
            displayErrors,

        reset:
            resetCheckout,

        on:
            onControllerEvent,

        emit:
            emitControllerEvent
    };


    /*=====================================================
      INITIALISE PART 6
    =====================================================*/

    function initPart6() {

        checkout.init();


        /*
         * Attach checkout controls.
         */

        attachNavigationListeners();

        attachFormListeners();

        attachStepListeners();


        /*
         * Render current checkout step.
         */

        renderStep();


        controllerState.initialized =
            true;


        console.log(
            "%c[NEXPAK CHECKOUT] Part 6/8 loaded",
            "font-weight:bold;"
        );
    }


    /*=====================================================
      START
    =====================================================*/

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initPart6
        );

    } else {

        initPart6();
    }

})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CHECKOUT ENGINE
=========================================================
 File: onlinecheckout.js
 Version: 1.0
 Part: 7/8

 PART 7:
 - Review engine
 - Checkout data binding
 - Customer summary
 - Billing summary
 - Delivery summary
 - Payment summary
 - Product summary
 - Totals summary
 - Edit checkout sections
 - Dynamic review refresh
 - Currency formatting
=========================================================*/

(function () {

    "use strict";


    /*=====================================================
      SAFETY CHECK
    =====================================================*/

    if (!window.NEXPAKCheckout) {

        console.error(
            "[NEXPAK CHECKOUT] Checkout engine is required."
        );

        return;
    }


    /*=====================================================
      SHORTCUTS
    =====================================================*/

    const checkout =
        window.NEXPAKCheckout;

    const state =
        checkout.state;


    /*=====================================================
      REVIEW CONFIGURATION
    =====================================================*/

    const REVIEW_CONFIG = {

        currency:
            "ZAR",

        locale:
            "en-ZA",

        emptyValue:
            "Not provided"
    };


    /*=====================================================
      SAFE STRING
    =====================================================*/

    function safeString(value) {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {

            return REVIEW_CONFIG.emptyValue;
        }


        return String(value).trim() ||
            REVIEW_CONFIG.emptyValue;
    }


    /*=====================================================
      SAFE NUMBER
    =====================================================*/

    function safeNumber(value) {

        const number =
            Number(value);


        return Number.isFinite(number)
            ? number
            : 0;
    }


    /*=====================================================
      CURRENCY FORMATTER
    =====================================================*/

    function formatCurrency(
        amount
    ) {

        const value =
            safeNumber(amount);


        try {

            return new Intl.NumberFormat(
                REVIEW_CONFIG.locale,
                {

                    style:
                        "currency",

                    currency:
                        REVIEW_CONFIG.currency,

                    minimumFractionDigits:
                        2,

                    maximumFractionDigits:
                        2
                }
            ).format(value);

        } catch (error) {

            return "R " +
                value.toFixed(2);
        }
    }


    /*=====================================================
      GET CUSTOMER
    =====================================================*/

    function getCustomer() {

        return state.customer || {};
    }


    /*=====================================================
      GET BILLING
    =====================================================*/

    function getBilling() {

        return state.billing || {};
    }


    /*=====================================================
      GET DELIVERY
    =====================================================*/

    function getDelivery() {

        return state.delivery || {};
    }


    /*=====================================================
      GET PAYMENT
    =====================================================*/

    function getPayment() {

        return state.payment || {};
    }


    /*=====================================================
      BUILD FULL NAME
    =====================================================*/

    function getCustomerName() {

        const customer =
            getCustomer();


        const first =
            String(
                customer.firstName || ""
            ).trim();


        const last =
            String(
                customer.lastName || ""
            ).trim();


        return (
            first +
            " " +
            last
        ).trim() ||
        REVIEW_CONFIG.emptyValue;
    }


    /*=====================================================
      BUILD ADDRESS
    =====================================================*/

    function buildAddress(
        address
    ) {

        if (
            !address
        ) {

            return REVIEW_CONFIG.emptyValue;
        }


        const lines = [

            address.address1,

            address.address2,

            address.suburb,

            address.city,

            address.province,

            address.postalCode,

            address.country

        ];


        return lines
            .map(
                function (line) {

                    return String(
                        line || ""
                    ).trim();

                }
            )
            .filter(
                function (line) {

                    return line.length > 0;
                }
            )
            .join(", ") ||
            REVIEW_CONFIG.emptyValue;
    }


    /*=====================================================
      CUSTOMER REVIEW DATA
    =====================================================*/

    function buildCustomerReview() {

        const customer =
            getCustomer();


        return {

            name:
                getCustomerName(),

            firstName:
                safeString(
                    customer.firstName
                ),

            lastName:
                safeString(
                    customer.lastName
                ),

            email:
                safeString(
                    customer.email
                ),

            phone:
                safeString(
                    customer.phone
                ),

            company:
                safeString(
                    customer.company
                )
        };
    }


    /*=====================================================
      BILLING REVIEW DATA
    =====================================================*/

    function buildBillingReview() {

        const billing =
            getBilling();


        return {

            address:
                buildAddress(
                    billing
                ),

            city:
                safeString(
                    billing.city
                ),

            province:
                safeString(
                    billing.province
                ),

            postalCode:
                safeString(
                    billing.postalCode
                ),

            country:
                safeString(
                    billing.country
                )
        };
    }


    /*=====================================================
      DELIVERY REVIEW DATA
    =====================================================*/

    function buildDeliveryReview() {

        const delivery =
            getDelivery();


        return {

            method:
                safeString(
                    delivery.method
                ),

            methodName:
                safeString(
                    delivery.methodName ||
                    delivery.name
                ),

            address:
                buildAddress(
                    delivery
                ),

            city:
                safeString(
                    delivery.city
                ),

            province:
                safeString(
                    delivery.province
                ),

            postalCode:
                safeString(
                    delivery.postalCode
                ),

            instructions:
                safeString(
                    delivery.instructions
                ),

            cost:
                safeNumber(
                    delivery.cost
                )
        };
    }


    /*=====================================================
      PAYMENT REVIEW DATA
    =====================================================*/

    function buildPaymentReview() {

        const payment =
            getPayment();


        return {

            method:
                safeString(
                    payment.method
                ),

            methodName:
                safeString(
                    payment.methodName ||
                    payment.name
                ),

            status:
                safeString(
                    payment.status
                ),

            reference:
                safeString(
                    payment.reference
                )
        };
    }


    /*=====================================================
      PRODUCT REVIEW DATA
    =====================================================*/

    function buildProductReview() {

        const cart =
            Array.isArray(
                state.cart
            )
                ? state.cart
                : [];


        return cart.map(
            function (item, index) {

                const quantity =
                    Math.max(
                        1,
                        safeNumber(
                            item.quantity ||
                            item.qty ||
                            1
                        )
                    );


                const price =
                    safeNumber(
                        item.price ||
                        item.unitPrice ||
                        item.salePrice ||
                        0
                    );


                return {

                    index:
                        index,

                    id:
                        safeString(
                            item.id ||
                            item.productId
                        ),

                    sku:
                        safeString(
                            item.sku ||
                            item.id
                        ),

                    name:
                        safeString(
                            item.name ||
                            item.title ||
                            "Product"
                        ),

                    image:
                        safeString(
                            item.image
                        ),

                    quantity:
                        quantity,

                    unitPrice:
                        price,

                    total:
                        price * quantity,

                    options:
                        item.options ||
                        item.variant ||
                        item.configuration ||
                        null
                };
            }
        );
    }


    /*=====================================================
      TOTALS REVIEW DATA
    =====================================================*/

    function buildTotalsReview() {

        if (
            typeof checkout.calculateTotals ===
            "function"
        ) {

            checkout.calculateTotals();
        }


        const totals =
            state.totals || {};


        return {

            subtotal:
                safeNumber(
                    totals.subtotal
                ),

            delivery:
                safeNumber(
                    totals.delivery
                ),

            discount:
                safeNumber(
                    totals.discount
                ),

            tax:
                safeNumber(
                    totals.tax
                ),

            total:
                safeNumber(
                    totals.total
                ),

            formattedSubtotal:
                formatCurrency(
                    totals.subtotal
                ),

            formattedDelivery:
                formatCurrency(
                    totals.delivery
                ),

            formattedDiscount:
                formatCurrency(
                    totals.discount
                ),

            formattedTax:
                formatCurrency(
                    totals.tax
                ),

            formattedTotal:
                formatCurrency(
                    totals.total
                )
        };
    }


    /*=====================================================
      BUILD COMPLETE REVIEW MODEL
    =====================================================*/

    function buildReviewModel() {

        return {

            orderNumber:
                safeString(
                    state.order &&
                    state.order.orderNumber
                ),

            status:
                safeString(
                    state.order &&
                    state.order.status
                ),

            customer:
                buildCustomerReview(),

            billing:
                buildBillingReview(),

            delivery:
                buildDeliveryReview(),

            payment:
                buildPaymentReview(),

            products:
                buildProductReview(),

            totals:
                buildTotalsReview(),

            notes:
                safeString(
                    state.notes
                )
        };
    }


    /*=====================================================
      SET ELEMENT TEXT
    =====================================================*/

    function setText(
        element,
        value
    ) {

        if (
            !element
        ) {
            return;
        }


        element.textContent =
            value === undefined ||
            value === null ||
            value === ""
                ? REVIEW_CONFIG.emptyValue
                : String(value);
    }


    /*=====================================================
      BIND DATA ATTRIBUTE
    =====================================================*/

    function bindReviewElement(
        element,
        model
    ) {

        const path =
            element.dataset.checkoutBind;


        if (
            !path
        ) {
            return;
        }


        const parts =
            path.split(".");


        let value =
            model;


        parts.forEach(
            function (part) {

                if (
                    value !== null &&
                    value !== undefined
                ) {

                    value =
                        value[part];
                }

            }
        );


        setText(
            element,
            value
        );
    }


    /*=====================================================
      BIND ALL REVIEW DATA
    =====================================================*/

    function bindReviewData(
        container,
        model
    ) {

        if (
            !container
        ) {
            return;
        }


        container
            .querySelectorAll(
                "[data-checkout-bind]"
            )
            .forEach(
                function (element) {

                    bindReviewElement(
                        element,
                        model
                    );
                }
            );
    }


    /*=====================================================
      RENDER PRODUCT ROW
    =====================================================*/

    function renderProductRow(
        item
    ) {

        const row =
            document.createElement(
                "div"
            );


        row.className =
            "checkout-review-product";


        row.dataset.productId =
            item.id;


        /*
         * Product image.
         */

        if (
            item.image &&
            item.image !==
            REVIEW_CONFIG.emptyValue
        ) {

            const image =
                document.createElement(
                    "img"
                );


            image.src =
                item.image;


            image.alt =
                item.name;


            image.loading =
                "lazy";


            image.className =
                "checkout-review-product-image";


            row.appendChild(
                image
            );
        }


        const details =
            document.createElement(
                "div"
            );


        details.className =
            "checkout-review-product-details";


        const name =
            document.createElement(
                "div"
            );


        name.className =
            "checkout-review-product-name";


        name.textContent =
            item.name;


        details.appendChild(
            name
        );


        /*
         * SKU.
         */

        if (
            item.sku &&
            item.sku !==
            REVIEW_CONFIG.emptyValue
        ) {

            const sku =
                document.createElement(
                    "div"
                );


            sku.className =
                "checkout-review-product-sku";


            sku.textContent =
                "SKU: " +
                item.sku;


            details.appendChild(
                sku
            );
        }


        /*
         * Quantity.
         */

        const quantity =
            document.createElement(
                "div"
            );


        quantity.className =
            "checkout-review-product-quantity";


        quantity.textContent =
            "Qty: " +
            item.quantity;


        details.appendChild(
            quantity
        );


        /*
         * Options.
         */

        if (
            item.options
        ) {

            const options =
                document.createElement(
                    "div"
                );


            options.className =
                "checkout-review-product-options";


            if (
                typeof item.options ===
                "object"
            ) {

                options.textContent =
                    Object.entries(
                        item.options
                    )
                    .map(
                        function (entry) {

                            return (
                                entry[0] +
                                ": " +
                                entry[1]
                            );

                        }
                    )
                    .join(" • ");

            } else {

                options.textContent =
                    String(
                        item.options
                    );
            }


            details.appendChild(
                options
            );
        }


        row.appendChild(
            details
        );


        /*
         * Price.
         */

        const price =
            document.createElement(
                "div"
            );


        price.className =
            "checkout-review-product-price";


        price.textContent =
            formatCurrency(
                item.total
            );


        row.appendChild(
            price
        );


        return row;
    }


    /*=====================================================
      RENDER PRODUCTS
    =====================================================*/

    function renderProducts(
        container,
        products
    ) {

        if (
            !container
        ) {
            return;
        }


        container.innerHTML =
            "";


        if (
            !products.length
        ) {

            const empty =
                document.createElement(
                    "div"
                );


            empty.className =
                "checkout-review-empty";


            empty.textContent =
                "Your cart is empty.";


            container.appendChild(
                empty
            );


            return;
        }


        products.forEach(
            function (product) {

                container.appendChild(
                    renderProductRow(
                        product
                    )
                );
            }
        );
    }


    /*=====================================================
      RENDER TOTALS
    =====================================================*/

    function renderTotals(
        container,
        totals
    ) {

        if (
            !container
        ) {
            return;
        }


        const mappings = {

            subtotal:
                totals.formattedSubtotal,

            delivery:
                totals.formattedDelivery,

            discount:
                totals.formattedDiscount,

            tax:
                totals.formattedTax,

            total:
                totals.formattedTotal
        };


        Object.keys(
            mappings
        ).forEach(
            function (key) {

                container
                    .querySelectorAll(
                        "[data-checkout-total='" +
                        key +
                        "']"
                    )
                    .forEach(
                        function (element) {

                            setText(
                                element,
                                mappings[key]
                            );
                        }
                    );
            }
        );
    }


    /*=====================================================
      RENDER REVIEW
    =====================================================*/

    function renderReview(
        container
    ) {

        const target =
            container ||
            document.querySelector(
                "[data-checkout-review]"
            );


        if (
            !target
        ) {

            return {

                valid: false,

                message:
                    "Review container not found."
            };
        }


        const model =
            buildReviewModel();


        /*
         * Bind normal data attributes.
         */

        bindReviewData(
            target,
            model
        );


        /*
         * Render products.
         */

        renderProducts(

            target.querySelector(
                "[data-checkout-products]"
            ),

            model.products
        );


        /*
         * Render totals.
         */

        renderTotals(

            target,

            model.totals
        );


        /*
         * Render order number.
         */

        target
            .querySelectorAll(
                "[data-checkout-order-number]"
            )
            .forEach(
                function (element) {

                    setText(
                        element,
                        model.orderNumber
                    );
                }
            );


        /*
         * Customer name.
         */

        target
            .querySelectorAll(
                "[data-checkout-customer-name]"
            )
            .forEach(
                function (element) {

                    setText(
                        element,
                        model.customer.name
                    );
                }
            );


        /*
         * Customer email.
         */

        target
            .querySelectorAll(
                "[data-checkout-customer-email]"
            )
            .forEach(
                function (element) {

                    setText(
                        element,
                        model.customer.email
                    );
                }
            );


        /*
         * Customer phone.
         */

        target
            .querySelectorAll(
                "[data-checkout-customer-phone]"
            )
            .forEach(
                function (element) {

                    setText(
                        element,
                        model.customer.phone
                    );
                }
            );


        /*
         * Billing address.
         */

        target
            .querySelectorAll(
                "[data-checkout-billing-address]"
            )
            .forEach(
                function (element) {

                    setText(
                        element,
                        model.billing.address
                    );
                }
            );


        /*
         * Delivery address.
         */

        target
            .querySelectorAll(
                "[data-checkout-delivery-address]"
            )
            .forEach(
                function (element) {

                    setText(
                        element,
                        model.delivery.address
                    );
                }
            );


        /*
         * Delivery method.
         */

        target
            .querySelectorAll(
                "[data-checkout-delivery-method]"
            )
            .forEach(
                function (element) {

                    setText(
                        element,
                        model.delivery.methodName
                    );
                }
            );


        /*
         * Payment method.
         */

        target
            .querySelectorAll(
                "[data-checkout-payment-method]"
            )
            .forEach(
                function (element) {

                    setText(
                        element,
                        model.payment.methodName
                    );
                }
            );


        /*
         * Notes.
         */

        target
            .querySelectorAll(
                "[data-checkout-notes]"
            )
            .forEach(
                function (element) {

                    setText(
                        element,
                        model.notes
                    );
                }
            );


        return {

            valid: true,

            model:
                model
        };
    }


    /*=====================================================
      REVIEW VALIDATION
    =====================================================*/

    function validateReview() {

        const errors = [];


        const model =
            buildReviewModel();


        if (
            !model.products.length
        ) {

            errors.push(
                "Your cart is empty."
            );
        }


        if (
            !model.customer.email ||
            model.customer.email ===
            REVIEW_CONFIG.emptyValue
        ) {

            errors.push(
                "Customer email is required."
            );
        }


        if (
            !model.payment.method ||
            model.payment.method ===
            REVIEW_CONFIG.emptyValue
        ) {

            errors.push(
                "Please select a payment method."
            );
        }


        if (
            model.totals.total <= 0
        ) {

            errors.push(
                "The order total must be greater than zero."
            );
        }


        return {

            valid:
                errors.length === 0,

            errors:
                errors,

            model:
                model
        };
    }


    /*=====================================================
      REFRESH REVIEW
    =====================================================*/

    function refreshReview() {

        const container =
            document.querySelector(
                "[data-checkout-review]"
            );


        return renderReview(
            container
        );
    }


    /*=====================================================
      EDIT SECTION
    =====================================================*/

    function editSection(
        section
    ) {

        const sectionMap = {

            customer:
                1,

            billing:
                2,

            delivery:
                3,

            payment:
                4,

            review:
                5
        };


        const target =
            sectionMap[
                String(section)
                    .toLowerCase()
            ];


        if (
            !target
        ) {

            return {

                valid: false,

                message:
                    "Unknown checkout section."
            };
        }


        if (
            checkout.controller &&
            typeof
            checkout.controller.goTo ===
            "function"
        ) {

            return checkout.controller
                .goTo(
                    target
                );
        }


        return {

            valid: false,

            message:
                "Checkout controller unavailable."
        };
    }


    /*=====================================================
      ATTACH EDIT BUTTONS
    =====================================================*/

    function attachEditListeners() {

        document
            .querySelectorAll(
                "[data-checkout-edit]"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();


                            editSection(
                                button.dataset
                                    .checkoutEdit
                            );

                        }
                    );
                }
            );
    }


    /*=====================================================
      REVIEW EVENTS
    =====================================================*/

    function attachReviewEvents() {

        document.addEventListener(
            "nexpak:checkout:updated",
            function () {

                refreshReview();

            }
        );


        document.addEventListener(
            "nexpak:cart:updated",
            function () {

                refreshReview();

            }
        );
    }


    /*=====================================================
      EXPOSE REVIEW ENGINE
    =====================================================*/

    checkout.review = {

        config:
            REVIEW_CONFIG,

        formatCurrency:
            formatCurrency,

        customer:
            buildCustomerReview,

        billing:
            buildBillingReview,

        delivery:
            buildDeliveryReview,

        payment:
            buildPaymentReview,

        products:
            buildProductReview,

        totals:
            buildTotalsReview,

        model:
            buildReviewModel,

        bind:
            bindReviewData,

        renderProducts:
            renderProducts,

        renderTotals:
            renderTotals,

        render:
            renderReview,

        refresh:
            refreshReview,

        validate:
            validateReview,

        edit:
            editSection
    };


    /*=====================================================
      INITIALISE PART 7
    =====================================================*/

    function initPart7() {

        checkout.init();


        attachEditListeners();


        attachReviewEvents();


        /*
         * Render the review if the page already
         * contains a review section.
         */

        const reviewContainer =
            document.querySelector(
                "[data-checkout-review]"
            );


        if (
            reviewContainer
        ) {

            renderReview(
                reviewContainer
            );
        }


        console.log(
            "%c[NEXPAK CHECKOUT] Part 7/8 loaded",
            "font-weight:bold;"
        );
    }


    /*=====================================================
      START
    =====================================================*/

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initPart7
        );

    } else {

        initPart7();
    }

})();

/*=========================================================
 NEXPAK SECURITY SOLUTIONS
 ONLINE STORE — CHECKOUT ENGINE
=========================================================
 File: onlinecheckout.js
 Version: 1.0
 Part: 8/8

 PART 8:
 - Persistence recovery
 - Cart synchronization
 - Checkout guards
 - State normalization
 - Final validation
 - Event system
 - Public API consolidation
 - Cleanup helpers
 - Final initialization
=========================================================*/

(function () {

    "use strict";


    /*=====================================================
      SAFETY CHECK
    =====================================================*/

    if (!window.NEXPAKCheckout) {

        console.error(
            "[NEXPAK CHECKOUT] Checkout engine not found."
        );

        return;
    }


    /*=====================================================
      SHORTCUTS
    =====================================================*/

    const checkout =
        window.NEXPAKCheckout;

    const state =
        checkout.state;


    /*=====================================================
      PART 8 CONFIG
    =====================================================*/

    const FINAL_CONFIG = {

        storageKey:
            "nexpak_checkout_state",

        version:
            "1.0",

        maxAge:
            86400000,

        currency:
            "ZAR",

        defaultStep:
            1,

        totalSteps:
            5
    };


    /*=====================================================
      INTERNAL STATE
    =====================================================*/

    const finalState = {

        initialized:
            false,

        restored:
            false,

        dirty:
            false,

        syncing:
            false,

        validationErrors:
            [],

        listeners:
            {}
    };


    /*=====================================================
      SAFE NUMBER
    =====================================================*/

    function safeNumber(value) {

        const number =
            Number(value);


        return Number.isFinite(number)
            ? number
            : 0;
    }


    /*=====================================================
      SAFE OBJECT
    =====================================================*/

    function safeObject(value) {

        return (
            value &&
            typeof value === "object" &&
            !Array.isArray(value)
        )
            ? value
            : {};
    }


    /*=====================================================
      SAFE ARRAY
    =====================================================*/

    function safeArray(value) {

        return Array.isArray(value)
            ? value
            : [];
    }


    /*=====================================================
      NORMALIZE STEP
    =====================================================*/

    function normalizeStep(
        step
    ) {

        return Math.max(
            FINAL_CONFIG.defaultStep,
            Math.min(
                FINAL_CONFIG.totalSteps,
                safeNumber(step) || 1
            )
        );
    }


    /*=====================================================
      NORMALIZE CART
    =====================================================*/

    function normalizeCart() {

        const cart =
            safeArray(
                state.cart
            );


        state.cart =
            cart.map(
                function (item) {

                    const product =
                        safeObject(item);


                    const quantity =
                        Math.max(
                            1,
                            safeNumber(
                                product.quantity ||
                                product.qty ||
                                1
                            )
                        );


                    return {

                        ...product,

                        quantity:
                            quantity,

                        qty:
                            quantity,

                        price:
                            safeNumber(
                                product.price ||
                                product.unitPrice ||
                                product.salePrice ||
                                0
                            )
                    };

                }
            );
    }


    /*=====================================================
      NORMALIZE CUSTOMER
    =====================================================*/

    function normalizeCustomer() {

        state.customer =
            safeObject(
                state.customer
            );


        state.customer.firstName =
            String(
                state.customer.firstName ||
                ""
            ).trim();


        state.customer.lastName =
            String(
                state.customer.lastName ||
                ""
            ).trim();


        state.customer.email =
            String(
                state.customer.email ||
                ""
            ).trim();


        state.customer.phone =
            String(
                state.customer.phone ||
                ""
            ).trim();


        state.customer.company =
            String(
                state.customer.company ||
                ""
            ).trim();
    }


    /*=====================================================
      NORMALIZE BILLING
    =====================================================*/

    function normalizeBilling() {

        state.billing =
            safeObject(
                state.billing
            );


        const fields = [

            "address1",
            "address2",
            "suburb",
            "city",
            "province",
            "postalCode",
            "country"

        ];


        fields.forEach(
            function (field) {

                state.billing[field] =
                    String(
                        state.billing[field] ||
                        ""
                    ).trim();

            }
        );
    }


    /*=====================================================
      NORMALIZE DELIVERY
    =====================================================*/

    function normalizeDelivery() {

        state.delivery =
            safeObject(
                state.delivery
            );


        state.delivery.method =
            String(
                state.delivery.method ||
                ""
            ).trim();


        state.delivery.methodName =
            String(
                state.delivery.methodName ||
                ""
            ).trim();


        state.delivery.cost =
            Math.max(
                0,
                safeNumber(
                    state.delivery.cost
                )
            );
    }


    /*=====================================================
      NORMALIZE PAYMENT
    =====================================================*/

    function normalizePayment() {

        state.payment =
            safeObject(
                state.payment
            );


        state.payment.method =
            String(
                state.payment.method ||
                ""
            ).trim();


        state.payment.status =
            String(
                state.payment.status ||
                "pending"
            ).trim();


        state.payment.reference =
            String(
                state.payment.reference ||
                ""
            ).trim();
    }


    /*=====================================================
      NORMALIZE TOTALS
    =====================================================*/

    function normalizeTotals() {

        state.totals =
            safeObject(
                state.totals
            );


        const fields = [

            "subtotal",
            "delivery",
            "discount",
            "tax",
            "total"

        ];


        fields.forEach(
            function (field) {

                state.totals[field] =
                    Math.max(
                        0,
                        safeNumber(
                            state.totals[field]
                        )
                    );
            }
        );
    }


    /*=====================================================
      NORMALIZE ORDER
    =====================================================*/

    function normalizeOrder() {

        state.order =
            safeObject(
                state.order
            );


        state.order.orderNumber =
            String(
                state.order.orderNumber ||
                ""
            ).trim();


        state.order.status =
            String(
                state.order.status ||
                "draft"
            ).trim();


        state.order.createdAt =
            String(
                state.order.createdAt ||
                ""
            ).trim();
    }


    /*=====================================================
      NORMALIZE ENTIRE CHECKOUT
    =====================================================*/

    function normalizeState() {

        state.step =
            normalizeStep(
                state.step
            );


        normalizeCart();

        normalizeCustomer();

        normalizeBilling();

        normalizeDelivery();

        normalizePayment();

        normalizeTotals();

        normalizeOrder();


        if (
            typeof state.notes !==
            "string"
        ) {

            state.notes =
                "";
        }


        return state;
    }


    /*=====================================================
      MARK DIRTY
    =====================================================*/

    function markDirty() {

        finalState.dirty =
            true;


        emit(
            "dirty",
            state
        );
    }


    /*=====================================================
      MARK CLEAN
    =====================================================*/

    function markClean() {

        finalState.dirty =
            false;


        emit(
            "clean",
            state
        );
    }


    /*=====================================================
      PERSIST CHECKOUT
    =====================================================*/

    function persistCheckout() {

        normalizeState();


        try {

            if (
                typeof checkout.save ===
                "function"
            ) {

                checkout.save();

            } else {

                const payload = {

                    version:
                        FINAL_CONFIG.version,

                    timestamp:
                        Date.now(),

                    state:
                        JSON.parse(
                            JSON.stringify(
                                state
                            )
                        )
                };


                localStorage.setItem(
                    FINAL_CONFIG.storageKey,
                    JSON.stringify(
                        payload
                    )
                );
            }


            markClean();


            return true;

        } catch (error) {

            console.warn(
                "[NEXPAK CHECKOUT] Persistence failed:",
                error
            );


            return false;
        }
    }


    /*=====================================================
      RESTORE CHECKOUT
    =====================================================*/

    function restoreCheckout() {

        try {

            if (
                typeof checkout.load ===
                "function"
            ) {

                checkout.load();

                normalizeState();


                finalState.restored =
                    true;


                emit(
                    "restored",
                    state
                );


                return true;
            }


            const raw =
                localStorage.getItem(
                    FINAL_CONFIG.storageKey
                );


            if (
                !raw
            ) {

                return false;
            }


            const saved =
                JSON.parse(
                    raw
                );


            if (
                !saved ||
                !saved.state
            ) {

                return false;
            }


            /*
             * Ignore very old checkout sessions.
             */

            if (
                saved.timestamp &&
                Date.now() -
                saved.timestamp >
                FINAL_CONFIG.maxAge
            ) {

                localStorage.removeItem(
                    FINAL_CONFIG.storageKey
                );


                return false;
            }


            Object.assign(
                state,
                saved.state
            );


            normalizeState();


            finalState.restored =
                true;


            emit(
                "restored",
                state
            );


            return true;

        } catch (error) {

            console.warn(
                "[NEXPAK CHECKOUT] Could not restore checkout:",
                error
            );


            return false;
        }
    }


    /*=====================================================
      SYNC CART
    =====================================================*/

    function syncCart() {

        if (
            finalState.syncing
        ) {
            return;
        }


        finalState.syncing =
            true;


        try {

            /*
             * Prefer the live cart engine.
             */

            if (
                window.NEXPAKCart
            ) {

                const cartEngine =
                    window.NEXPAKCart;


                if (
                    typeof
                    cartEngine.getCart ===
                    "function"
                ) {

                    state.cart =
                        safeArray(
                            cartEngine.getCart()
                        );
                }

                else if (
                    typeof
                    cartEngine.getItems ===
                    "function"
                ) {

                    state.cart =
                        safeArray(
                            cartEngine.getItems()
                        );
                }
            }


            normalizeCart();


            if (
                typeof checkout.calculateTotals ===
                "function"
            ) {

                checkout.calculateTotals();
            }


            markDirty();


            emit(
                "cartSynced",
                state.cart
            );


        } catch (error) {

            console.warn(
                "[NEXPAK CHECKOUT] Cart sync failed:",
                error
            );

        } finally {

            finalState.syncing =
                false;
        }
    }


    /*=====================================================
      CHECK CART AVAILABILITY
    =====================================================*/

    function hasItems() {

        normalizeCart();


        return (
            state.cart.length >
            0
        );
    }


    /*=====================================================
      CHECKOUT GUARD
    =====================================================*/

    function checkoutGuard() {

        const errors = [];


        normalizeState();


        if (
            !hasItems()
        ) {

            errors.push(
                "Your cart is empty."
            );
        }


        if (
            state.order.status ===
            "completed"
        ) {

            errors.push(
                "This order has already been completed."
            );
        }


        finalState.validationErrors =
            errors;


        return {

            valid:
                errors.length === 0,

            errors:
                errors
        };
    }


    /*=====================================================
      FULL CHECKOUT VALIDATION
    =====================================================*/

    function validateCheckout() {

        const errors = [];


        const guard =
            checkoutGuard();


        if (
            !guard.valid
        ) {

            errors.push(
                ...guard.errors
            );
        }


        /*
         * Customer validation.
         */

        if (
            checkout.form &&
            typeof
            checkout.form
                .validateCustomerForm ===
            "function"
        ) {

            const result =
                checkout.form
                    .validateCustomerForm();


            if (
                result &&
                !result.valid
            ) {

                errors.push(
                    ...(result.errors || [])
                );
            }
        }


        /*
         * Billing validation.
         */

        if (
            checkout.form &&
            typeof
            checkout.form
                .validateBillingForm ===
            "function"
        ) {

            const result =
                checkout.form
                    .validateBillingForm();


            if (
                result &&
                !result.valid
            ) {

                errors.push(
                    ...(result.errors || [])
                );
            }
        }


        /*
         * Delivery validation.
         */

        if (
            checkout.delivery &&
            typeof
            checkout.delivery.validate ===
            "function"
        ) {

            const result =
                checkout.delivery
                    .validate();


            if (
                result &&
                !result.valid
            ) {

                errors.push(
                    ...(result.errors || [])
                );
            }
        }


        /*
         * Payment validation.
         */

        if (
            checkout.payment &&
            typeof
            checkout.payment.validate ===
            "function"
        ) {

            const result =
                checkout.payment
                    .validate();


            if (
                result &&
                !result.valid
            ) {

                errors.push(
                    ...(result.errors || [])
                );
            }
        }


        /*
         * Remove duplicate errors.
         */

        const uniqueErrors =
            Array.from(
                new Set(
                    errors.map(
                        function (error) {

                            return typeof error ===
                                "string"
                                ? error
                                : (
                                    error.message ||
                                    "Checkout validation error."
                                );

                        }
                    )
                )
            );


        finalState.validationErrors =
            uniqueErrors;


        return {

            valid:
                uniqueErrors.length === 0,

            errors:
                uniqueErrors,

            state:
                state
        };
    }


    /*=====================================================
      GENERATE ORDER NUMBER
    =====================================================*/

    function generateOrderNumber() {

        const timestamp =
            Date.now()
                .toString()
                .slice(-8);


        const random =
            Math.floor(
                100 +
                Math.random() *
                900
            );


        return (
            "NEX-" +
            timestamp +
            "-" +
            random
        );
    }


    /*=====================================================
      PREPARE ORDER
    =====================================================*/

    function prepareOrder() {

        normalizeState();


        const validation =
            validateCheckout();


        if (
            !validation.valid
        ) {

            return validation;
        }


        if (
            !state.order.orderNumber
        ) {

            state.order.orderNumber =
                generateOrderNumber();
        }


        if (
            !state.order.createdAt
        ) {

            state.order.createdAt =
                new Date()
                    .toISOString();
        }


        state.order.status =
            "ready";


        state.order.currency =
            FINAL_CONFIG.currency;


        if (
            typeof checkout.calculateTotals ===
            "function"
        ) {

            checkout.calculateTotals();
        }


        persistCheckout();


        emit(
            "orderPrepared",
            state
        );


        return {

            valid:
                true,

            order:
                state
        };
    }


    /*=====================================================
      EVENT REGISTRATION
    =====================================================*/

    function on(
        eventName,
        callback
    ) {

        if (
            typeof callback !==
            "function"
        ) {
            return;
        }


        if (
            !finalState.listeners[eventName]
        ) {

            finalState.listeners[eventName] =
                [];
        }


        finalState.listeners[eventName]
            .push(
                callback
            );
    }


    /*=====================================================
      EVENT EMITTER
    =====================================================*/

    function emit(
        eventName,
        data
    ) {

        const listeners =
            finalState.listeners[
                eventName
            ];


        if (
            !Array.isArray(
                listeners
            )
        ) {
            return;
        }


        listeners.forEach(
            function (callback) {

                try {

                    callback(
                        data
                    );

                } catch (error) {

                    console.error(
                        "[NEXPAK CHECKOUT] Event error:",
                        error
                    );
                }
            }
        );
    }


    /*=====================================================
      CART EVENT LISTENERS
    =====================================================*/

    function attachCartEvents() {

        document.addEventListener(
            "nexpak:cart:updated",
            function () {

                syncCart();


                if (
                    checkout.review &&
                    typeof
                    checkout.review.refresh ===
                    "function"
                ) {

                    checkout.review.refresh();
                }
            }
        );


        document.addEventListener(
            "cartUpdated",
            function () {

                syncCart();

            }
        );
    }


    /*=====================================================
      CHECKOUT STATE EVENTS
    =====================================================*/

    function attachStateEvents() {

        document.addEventListener(
            "input",
            function (event) {

                if (
                    event.target.closest(
                        "[data-checkout]"
                    )
                ) {

                    markDirty();
                }
            }
        );


        document.addEventListener(
            "change",
            function (event) {

                if (
                    event.target.closest(
                        "[data-checkout]"
                    )
                ) {

                    markDirty();
                }
            }
        );
    }


    /*=====================================================
      BEFORE PAGE LEAVE
    =====================================================*/

    function attachPersistenceGuard() {

        window.addEventListener(
            "beforeunload",
            function () {

                if (
                    finalState.dirty
                ) {

                    persistCheckout();
                }
            }
        );
    }


    /*=====================================================
      CLEAR CHECKOUT STORAGE
    =====================================================*/

    function clearStorage() {

        try {

            if (
                typeof checkout.clear ===
                "function"
            ) {

                checkout.clear();

            }


            localStorage.removeItem(
                FINAL_CONFIG.storageKey
            );


            return true;

        } catch (error) {

            console.warn(
                "[NEXPAK CHECKOUT] Storage cleanup failed:",
                error
            );


            return false;
        }
    }


    /*=====================================================
      RESET EVERYTHING
    =====================================================*/

    function resetAll() {

        if (
            checkout.controller &&
            typeof checkout.controller.reset ===
            "function"
        ) {

            checkout.controller.reset();

        } else {

            state.step =
                FINAL_CONFIG.defaultStep;

            state.cart =
                [];

            state.customer =
                {};

            state.billing =
                {};

            state.delivery =
                {};

            state.payment =
                {};

            state.totals =
                {};

            state.order =
                {

                    orderNumber:
                        "",

                    status:
                        "draft",

                    createdAt:
                        ""
                };
        }


        clearStorage();


        finalState.dirty =
            false;


        finalState.restored =
            false;


        finalState.validationErrors =
            [];


        emit(
            "reset",
            state
        );


        return state;
    }


    /*=====================================================
      PUBLIC CHECKOUT STATUS
    =====================================================*/

    function getStatus() {

        return {

            initialized:
                finalState.initialized,

            restored:
                finalState.restored,

            dirty:
                finalState.dirty,

            syncing:
                finalState.syncing,

            step:
                normalizeStep(
                    state.step
                ),

            hasItems:
                hasItems(),

            orderStatus:
                state.order &&
                state.order.status,

            paymentStatus:
                state.payment &&
                state.payment.status,

            total:
                state.totals &&
                safeNumber(
                    state.totals.total
                )
        };
    }


    /*=====================================================
      FINAL PUBLIC API
    =====================================================*/

    checkout.final = {

        config:
            FINAL_CONFIG,

        state:
            finalState,

        normalize:
            normalizeState,

        save:
            persistCheckout,

        restore:
            restoreCheckout,

        syncCart:
            syncCart,

        guard:
            checkoutGuard,

        validate:
            validateCheckout,

        prepareOrder:
            prepareOrder,

        generateOrderNumber:
            generateOrderNumber,

        hasItems:
            hasItems,

        status:
            getStatus,

        dirty:
            markDirty,

        clean:
            markClean,

        clearStorage:
            clearStorage,

        reset:
            resetAll,

        on:
            on,

        emit:
            emit
    };


    /*=====================================================
      COMPLETE CHECKOUT API
    =====================================================*/

    checkout.api = {

        /*
         * State
         */

        state:
            state,

        status:
            getStatus,


        /*
         * Navigation
         */

        next:
            checkout.controller &&
            checkout.controller.next,

        back:
            checkout.controller &&
            checkout.controller.back,

        goTo:
            checkout.controller &&
            checkout.controller.goTo,


        /*
         * Review
         */

        review:
            checkout.review &&
            checkout.review.render,

        refreshReview:
            checkout.review &&
            checkout.review.refresh,


        /*
         * Validation
         */

        validate:
            validateCheckout,

        guard:
            checkoutGuard,


        /*
         * Order
         */

        prepareOrder:
            prepareOrder,

        submit:
            checkout.controller &&
            checkout.controller.submit,


        /*
         * Persistence
         */

        save:
            persistCheckout,

        restore:
            restoreCheckout,


        /*
         * Cart
         */

        syncCart:
            syncCart,


        /*
         * Reset
         */

        reset:
            resetAll,


        /*
         * Events
         */

        on:
            on,

        emit:
            emit
    };


    /*=====================================================
      FINAL INITIALIZATION
    =====================================================*/

    function initializeFinalLayer() {

        /*
         * Initialize the base checkout engine.
         */

        if (
            typeof checkout.init ===
            "function"
        ) {

            checkout.init();
        }


        /*
         * Restore saved checkout.
         */

        restoreCheckout();


        /*
         * Normalize restored/current data.
         */

        normalizeState();


        /*
         * Synchronize live cart.
         */

        syncCart();


        /*
         * Attach listeners.
         */

        attachCartEvents();

        attachStateEvents();

        attachPersistenceGuard();


        /*
         * Calculate totals.
         */

        if (
            typeof checkout.calculateTotals ===
            "function"
        ) {

            checkout.calculateTotals();
        }


        /*
         * Refresh review UI.
         */

        if (
            checkout.review &&
            typeof checkout.review.refresh ===
            "function"
        ) {

            checkout.review.refresh();
        }


        /*
         * Render checkout navigation.
         */

        if (
            checkout.controller &&
            typeof checkout.controller.render ===
            "function"
        ) {

            checkout.controller.render();
        }


        /*
         * Persist normalized state.
         */

        persistCheckout();


        finalState.initialized =
            true;


        emit(
            "initialized",
            getStatus()
        );


        console.log(
            "%c[NEXPAK CHECKOUT] Part 8/8 loaded — CHECKOUT ENGINE COMPLETE",
            "font-weight:bold;"
        );
    }


    /*=====================================================
      START
    =====================================================*/

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeFinalLayer
        );

    } else {

        initializeFinalLayer();
    }

})();
