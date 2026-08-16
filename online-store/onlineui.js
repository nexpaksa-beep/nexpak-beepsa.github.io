/* =========================================================
   NEXPAK ONLINE STORE
   onlineui.js
   PART 1 — UI ENGINE FOUNDATION
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       1. UI ENGINE STATE
       ===================================================== */

    const NEXPAK_ONLINE_UI = {

        version: "1.0.0",

        initialised: false,

        currentView: "store",

        activeKitId: null,

        activeCategory: "all",

        activeModal: null,

        isCartOpen: false,

        isCheckoutOpen: false,

        selectors: {

            store: "#onlineStore",

            kits: "#onlineKits",

            categories: "#onlineCategories",

            search: "#onlineSearch",

            sort: "#onlineSort",

            cart: "#onlineCart",

            cartCount: "#onlineCartCount",

            cartTotal: "#onlineCartTotal",

            modal: "#onlineModal",

            modalContent: "#onlineModalContent",

            notification: "#onlineNotification",

            loading: "#onlineLoading"

        }

    };


    /* =====================================================
       2. DOM HELPER
       ===================================================== */

    function getElement(selector) {

        if (!selector) {
            return null;
        }

        try {

            return document.querySelector(selector);

        } catch (error) {

            console.warn(
                "NEXPAK Online UI: Invalid selector:",
                selector
            );

            return null;
        }
    }


    /* =====================================================
       3. DOM COLLECTION HELPER
       ===================================================== */

    function getElements(selector) {

        if (!selector) {
            return [];
        }

        try {

            return Array.from(
                document.querySelectorAll(selector)
            );

        } catch (error) {

            console.warn(
                "NEXPAK Online UI: Invalid selector:",
                selector
            );

            return [];
        }
    }


    /* =====================================================
       4. SAFE HTML ESCAPE
       ===================================================== */

    function escapeHTML(value) {

        if (value === null || value === undefined) {
            return "";
        }

        const temporaryElement =
            document.createElement("div");

        temporaryElement.textContent =
            String(value);

        return temporaryElement.innerHTML;
    }


    /* =====================================================
       5. SAFE TEXT SETTER
       ===================================================== */

    function setText(element, value) {

        if (!element) {
            return;
        }

        element.textContent =
            value === null || value === undefined
                ? ""
                : String(value);
    }


    /* =====================================================
       6. SAFE HTML SETTER
       ===================================================== */

    function setHTML(element, html) {

        if (!element) {
            return;
        }

        element.innerHTML =
            html === null || html === undefined
                ? ""
                : String(html);
    }


    /* =====================================================
       7. SHOW ELEMENT
       ===================================================== */

    function showElement(element) {

        if (!element) {
            return;
        }

        element.hidden = false;

        element.style.removeProperty(
            "display"
        );

        element.classList.remove(
            "is-hidden"
        );

    }


    /* =====================================================
       8. HIDE ELEMENT
       ===================================================== */

    function hideElement(element) {

        if (!element) {
            return;
        }

        element.hidden = true;

        element.classList.add(
            "is-hidden"
        );

    }


    /* =====================================================
       9. TOGGLE ELEMENT
       ===================================================== */

    function toggleElement(element, force) {

        if (!element) {
            return;
        }

        if (typeof force === "boolean") {

            if (force) {
                showElement(element);
            } else {
                hideElement(element);
            }

            return;
        }

        if (element.hidden) {
            showElement(element);
        } else {
            hideElement(element);
        }

    }


    /* =====================================================
       10. UI LOGGER
       ===================================================== */

    function uiLog(message, data) {

        if (data !== undefined) {

            console.log(
                "NEXPAK Online UI:",
                message,
                data
            );

        } else {

            console.log(
                "NEXPAK Online UI:",
                message
            );

        }

    }


    /* =====================================================
       11. UI WARNING
       ===================================================== */

    function uiWarn(message, data) {

        if (data !== undefined) {

            console.warn(
                "NEXPAK Online UI:",
                message,
                data
            );

        } else {

            console.warn(
                "NEXPAK Online UI:",
                message
            );

        }

    }


    /* =====================================================
       12. UI ERROR
       ===================================================== */

    function uiError(message, error) {

        if (error) {

            console.error(
                "NEXPAK Online UI:",
                message,
                error
            );

        } else {

            console.error(
                "NEXPAK Online UI:",
                message
            );

        }

    }


    /* =====================================================
       13. PUBLIC UI STATE ACCESS
       ===================================================== */

    function getUIState() {

        return {
            version: NEXPAK_ONLINE_UI.version,
            initialised: NEXPAK_ONLINE_UI.initialised,
            currentView: NEXPAK_ONLINE_UI.currentView,
            activeKitId: NEXPAK_ONLINE_UI.activeKitId,
            activeCategory: NEXPAK_ONLINE_UI.activeCategory,
            activeModal: NEXPAK_ONLINE_UI.activeModal,
            isCartOpen: NEXPAK_ONLINE_UI.isCartOpen,
            isCheckoutOpen: NEXPAK_ONLINE_UI.isCheckoutOpen
        };

    }


    /* =====================================================
       14. PUBLIC ELEMENT ACCESS
       ===================================================== */

    function getUIElement(name) {

        if (
            !name ||
            !NEXPAK_ONLINE_UI.selectors[name]
        ) {
            return null;
        }

        return getElement(
            NEXPAK_ONLINE_UI.selectors[name]
        );

    }


    /* =====================================================
       15. UI ENGINE STATUS
       ===================================================== */

    function getUIStatus() {

        return {

            available: true,

            version:
                NEXPAK_ONLINE_UI.version,

            initialised:
                NEXPAK_ONLINE_UI.initialised,

            currentView:
                NEXPAK_ONLINE_UI.currentView

        };

    }


    /* =====================================================
       16. INTERNAL EXPORT OBJECT
       ===================================================== */

    const UI_API = {

        getState: getUIState,

        getStatus: getUIStatus,

        getElement: getUIElement,

        getElements: getElements,

        escapeHTML: escapeHTML,

        setText: setText,

        setHTML: setHTML,

        show: showElement,

        hide: hideElement,

        toggle: toggleElement,

        log: uiLog,

        warn: uiWarn,

        error: uiError

    };


    /* =====================================================
       17. PUBLIC API
       ===================================================== */

    window.NEXPAK_ONLINE_UI = UI_API;


    /* =====================================================
       18. PART 1 READY
       ===================================================== */

    uiLog(
        "UI foundation loaded."
    );


    /* =====================================================
       END OF PART 1
       ===================================================== */

     /* =====================================================
       19. STORE SHELL HELPERS
       ===================================================== */

    function getStoreContainer() {

        return getUIElement("store");

    }


    /* =====================================================
       20. KIT CONTAINER
       ===================================================== */

    function getKitContainer() {

        return getUIElement("kits");

    }


    /* =====================================================
       21. CATEGORY CONTAINER
       ===================================================== */

    function getCategoryContainer() {

        return getUIElement("categories");

    }


    /* =====================================================
       22. SHOW STORE
       ===================================================== */

    function showStore() {

        const store =
            getStoreContainer();

        if (store) {
            showElement(store);
        }

        NEXPAK_ONLINE_UI.currentView =
            "store";

        uiLog(
            "Store view displayed."
        );

    }


    /* =====================================================
       23. HIDE STORE
       ===================================================== */

    function hideStore() {

        const store =
            getStoreContainer();

        if (store) {
            hideElement(store);
        }

    }


    /* =====================================================
       24. SHOW LOADING STATE
       ===================================================== */

    function showLoading(message) {

        const loading =
            getUIElement("loading");

        if (!loading) {
            return;
        }

        const loadingMessage =
            message ||
            "Loading kits...";

        setText(
            loading,
            loadingMessage
        );

        showElement(loading);

    }


    /* =====================================================
       25. HIDE LOADING STATE
       ===================================================== */

    function hideLoading() {

        const loading =
            getUIElement("loading");

        if (!loading) {
            return;
        }

        hideElement(loading);

    }


    /* =====================================================
       26. SHOW KIT AREA
       ===================================================== */

    function showKitArea() {

        const container =
            getKitContainer();

        if (!container) {
            return;
        }

        showElement(container);

    }


    /* =====================================================
       27. HIDE KIT AREA
       ===================================================== */

    function hideKitArea() {

        const container =
            getKitContainer();

        if (!container) {
            return;
        }

        hideElement(container);

    }


    /* =====================================================
       28. CLEAR KIT AREA
       ===================================================== */

    function clearKitArea() {

        const container =
            getKitContainer();

        if (!container) {
            return;
        }

        setHTML(
            container,
            ""
        );

    }


    /* =====================================================
       29. CLEAR CATEGORY AREA
       ===================================================== */

    function clearCategoryArea() {

        const container =
            getCategoryContainer();

        if (!container) {
            return;
        }

        setHTML(
            container,
            ""
        );

    }


    /* =====================================================
       30. STORE EMPTY STATE
       ===================================================== */

    function showEmptyState(
        message
    ) {

        const container =
            getKitContainer();

        if (!container) {
            return;
        }

        const text =
            message ||
            "No kits are available.";

        setHTML(
            container,
            `
                <div class="online-empty-state">
                    <div class="online-empty-state-icon">
                        🛒
                    </div>

                    <h3>
                        No Kits Found
                    </h3>

                    <p>
                        ${escapeHTML(text)}
                    </p>
                </div>
            `
        );

        showElement(container);

    }


    /* =====================================================
       31. STORE ERROR STATE
       ===================================================== */

    function showStoreError(
        message
    ) {

        const container =
            getKitContainer();

        if (!container) {
            return;
        }

        const text =
            message ||
            "Unable to load the online store.";

        setHTML(
            container,
            `
                <div class="online-error-state">
                    <div class="online-error-state-icon">
                        ⚠️
                    </div>

                    <h3>
                        Store Temporarily Unavailable
                    </h3>

                    <p>
                        ${escapeHTML(text)}
                    </p>

                    <button
                        type="button"
                        class="online-retry-button"
                        data-online-action="retry-store"
                    >
                        Try Again
                    </button>
                </div>
            `
        );

        showElement(container);

        uiError(
            "Store error state displayed.",
            text
        );

    }


    /* =====================================================
       32. RESET STORE VIEW
       ===================================================== */

    function resetStoreView() {

        NEXPAK_ONLINE_UI.currentView =
            "store";

        NEXPAK_ONLINE_UI.activeKitId =
            null;

        NEXPAK_ONLINE_UI.activeModal =
            null;

        hideLoading();

        showStore();

    }


    /* =====================================================
       33. UI INITIALISATION STATE
       ===================================================== */

    function markUIInitialised() {

        NEXPAK_ONLINE_UI.initialised =
            true;

        uiLog(
            "UI engine marked as initialised."
        );

    }


    /* =====================================================
       34. UI INITIALISATION CHECK
       ===================================================== */

    function isUIInitialised() {

        return (
            NEXPAK_ONLINE_UI.initialised ===
            true
        );

    }


    /* =====================================================
       35. PART 2 API EXTENSION
       ===================================================== */

    UI_API.showStore =
        showStore;

    UI_API.hideStore =
        hideStore;

    UI_API.showLoading =
        showLoading;

    UI_API.hideLoading =
        hideLoading;

    UI_API.showKitArea =
        showKitArea;

    UI_API.hideKitArea =
        hideKitArea;

    UI_API.clearKitArea =
        clearKitArea;

    UI_API.clearCategoryArea =
        clearCategoryArea;

    UI_API.showEmptyState =
        showEmptyState;

    UI_API.showStoreError =
        showStoreError;

    UI_API.resetStoreView =
        resetStoreView;

    UI_API.markInitialised =
        markUIInitialised;

    UI_API.isInitialised =
        isUIInitialised;


    /* =====================================================
       36. PART 2 STATUS
       ===================================================== */

    uiLog(
        "Part 2 loaded — store shell ready."
    );


    /* =====================================================
       END OF PART 2
       ===================================================== */

     /* =====================================================
       37. KIT DATA NORMALISATION
       ===================================================== */

    function normaliseKitForUI(kit) {

        if (!kit || typeof kit !== "object") {
            return null;
        }

        const normalisedKit = Object.assign(
            {},
            kit
        );

        normalisedKit.id =
            kit.id ||
            kit.kitId ||
            kit.code ||
            "";

        normalisedKit.name =
            kit.name ||
            kit.kitName ||
            kit.title ||
            "NEXPAK Security Kit";

        normalisedKit.description =
            kit.description ||
            kit.shortDescription ||
            "";

        normalisedKit.category =
            kit.category ||
            kit.categoryId ||
            "general";

        normalisedKit.image =
            kit.image ||
            kit.imageUrl ||
            "";

        normalisedKit.price =
            Number(
                kit.price ??
                kit.priceExVat ??
                kit.exVatPrice ??
                0
            );

        normalisedKit.weight =
            Number(
                kit.weight ??
                kit.kitWeight ??
                0
            );

        normalisedKit.options =
            Array.isArray(kit.options)
                ? kit.options
                : [];

        normalisedKit.components =
            Array.isArray(kit.components)
                ? kit.components
                : [];

        return normalisedKit;

    }


    /* =====================================================
       38. FORMAT CURRENCY
       ===================================================== */

    function formatCurrency(value) {

        const amount =
            Number(value);

        const safeAmount =
            Number.isFinite(amount)
                ? amount
                : 0;

        return (
            "R " +
            safeAmount.toLocaleString(
                "en-ZA",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            )
        );

    }


    /* =====================================================
       39. CALCULATE VAT
       ===================================================== */

    function calculateKitVAT(priceExVat) {

        const price =
            Number(priceExVat);

        const safePrice =
            Number.isFinite(price)
                ? price
                : 0;

        const vatRate =
            Number(
                window.NEXPAK_VAT ??
                window.NEXPAK_ONLINE_VAT ??
                0.15
            );

        const safeVatRate =
            Number.isFinite(vatRate)
                ? vatRate
                : 0.15;

        return (
            safePrice *
            safeVatRate
        );

    }


    /* =====================================================
       40. CALCULATE KIT TOTAL
       ===================================================== */

    function calculateKitTotal(priceExVat) {

        const price =
            Number(priceExVat);

        const safePrice =
            Number.isFinite(price)
                ? price
                : 0;

        return (
            safePrice +
            calculateKitVAT(
                safePrice
            )
        );

    }


    /* =====================================================
       41. GET KIT IMAGE MARKUP
       ===================================================== */

    function getKitImageMarkup(kit) {

        if (!kit.image) {

            return `
                <div
                    class="online-kit-image-placeholder"
                    aria-label="Kit image unavailable"
                >
                    <span>
                        NEXPAK
                    </span>
                </div>
            `;

        }

        return `
            <img
                class="online-kit-image"
                src="${escapeHTML(kit.image)}"
                alt="${escapeHTML(kit.name)}"
                loading="lazy"
            >
        `;

    }


    /* =====================================================
       42. GET KIT DESCRIPTION
       ===================================================== */

    function getKitDescription(kit) {

        if (kit.description) {

            return escapeHTML(
                kit.description
            );

        }

        if (
            Array.isArray(
                kit.components
            ) &&
            kit.components.length
        ) {

            return (
                kit.components.length +
                " components included"
            );

        }

        return (
            "Complete NEXPAK security kit."
        );

    }


    /* =====================================================
       43. GET KIT OPTION SUMMARY
       ===================================================== */

    function getKitOptionSummary(kit) {

        if (
            !Array.isArray(
                kit.options
            ) ||
            !kit.options.length
        ) {
            return "";
        }

        return `
            <div class="online-kit-options-summary">
                <span class="online-kit-options-label">
                    Options available
                </span>
            </div>
        `;

    }


    /* =====================================================
       44. GET KIT PRICE MARKUP
       ===================================================== */

    function getKitPriceMarkup(kit) {

        const priceExVat =
            Number(kit.price) || 0;

        const vat =
            calculateKitVAT(
                priceExVat
            );

        const total =
            calculateKitTotal(
                priceExVat
            );

        return `
            <div class="online-kit-pricing">

                <div class="online-price-row">
                    <span>
                        Kit Price EX VAT
                    </span>

                    <strong>
                        ${formatCurrency(priceExVat)}
                    </strong>
                </div>

                <div class="online-price-row">
                    <span>
                        VAT @ 15%
                    </span>

                    <strong>
                        ${formatCurrency(vat)}
                    </strong>
                </div>

                <div class="online-price-row online-price-total">
                    <span>
                        Total Incl VAT
                    </span>

                    <strong>
                        ${formatCurrency(total)}
                    </strong>
                </div>

            </div>
        `;

    }


    /* =====================================================
       45. RENDER SINGLE KIT CARD
       ===================================================== */

    function renderKitCard(kit) {

        const normalisedKit =
            normaliseKitForUI(
                kit
            );

        if (!normalisedKit) {
            return "";
        }

        const kitId =
            escapeHTML(
                normalisedKit.id
            );

        return `
            <article
                class="online-kit-card"
                data-kit-id="${kitId}"
            >

                <div class="online-kit-card-image">

                    ${getKitImageMarkup(
                        normalisedKit
                    )}

                </div>


                <div class="online-kit-card-content">

                    <div class="online-kit-category">

                        ${escapeHTML(
                            normalisedKit.category
                        )}

                    </div>


                    <h3 class="online-kit-title">

                        ${escapeHTML(
                            normalisedKit.name
                        )}

                    </h3>


                    <p class="online-kit-description">

                        ${getKitDescription(
                            normalisedKit
                        )}

                    </p>


                    ${getKitOptionSummary(
                        normalisedKit
                    )}


                    ${getKitPriceMarkup(
                        normalisedKit
                    )}


                    <div class="online-kit-actions">

                        <button
                            type="button"
                            class="online-kit-view-button"
                            data-online-action="view-kit"
                            data-kit-id="${kitId}"
                        >
                            View More
                        </button>


                        <button
                            type="button"
                            class="online-kit-cart-button"
                            data-online-action="add-kit"
                            data-kit-id="${kitId}"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>

            </article>
        `;

    }


    /* =====================================================
       46. RENDER KIT COLLECTION
       ===================================================== */

    function renderKitCollection(kits) {

        const container =
            getKitContainer();

        if (!container) {

            uiWarn(
                "Kit container not found."
            );

            return;

        }

        if (!Array.isArray(kits)) {

            showStoreError(
                "Kit data is unavailable."
            );

            return;

        }

        if (!kits.length) {

            showEmptyState(
                "There are currently no kits matching your selection."
            );

            return;

        }

        const cards =
            kits
                .map(
                    renderKitCard
                )
                .join("");

        setHTML(
            container,
            cards
        );

        showKitArea();

    }


    /* =====================================================
       47. KIT COLLECTION COUNT
       ===================================================== */

    function getRenderedKitCount() {

        const container =
            getKitContainer();

        if (!container) {
            return 0;
        }

        return container.querySelectorAll(
            ".online-kit-card"
        ).length;

    }


    /* =====================================================
       48. KIT CARD LOOKUP
       ===================================================== */

    function getRenderedKitCard(
        kitId
    ) {

        const container =
            getKitContainer();

        if (
            !container ||
            !kitId
        ) {
            return null;
        }

        const cards =
            container.querySelectorAll(
                ".online-kit-card"
            );

        return Array.from(cards)
            .find(
                function (card) {

                    return (
                        String(
                            card.dataset.kitId
                        ) ===
                        String(kitId)
                    );

                }
            ) || null;

    }


    /* =====================================================
       49. PART 3 API EXTENSION
       ===================================================== */

    UI_API.formatCurrency =
        formatCurrency;

    UI_API.calculateKitVAT =
        calculateKitVAT;

    UI_API.calculateKitTotal =
        calculateKitTotal;

    UI_API.normaliseKit =
        normaliseKitForUI;

    UI_API.renderKitCard =
        renderKitCard;

    UI_API.renderKits =
        renderKitCollection;

    UI_API.getRenderedKitCount =
        getRenderedKitCount;

    UI_API.getRenderedKitCard =
        getRenderedKitCard;


    /* =====================================================
       50. PART 3 STATUS
       ===================================================== */

    uiLog(
        "Part 3 loaded — kit card rendering ready."
    );


    /* =====================================================
       END OF PART 3
       ===================================================== */

     /* =====================================================
       51. CREATE MODAL ELEMENT
       ===================================================== */

    function createModalElement() {

        let modal =
            getUIElement("modal");

        if (modal) {
            return modal;
        }

        modal =
            document.createElement("div");

        modal.id =
            "onlineModal";

        modal.className =
            "online-modal";

        modal.hidden =
            true;

        modal.innerHTML = `
            <div
                class="online-modal-backdrop"
                data-online-action="close-modal"
            ></div>

            <div
                class="online-modal-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="onlineModalTitle"
            >

                <button
                    type="button"
                    class="online-modal-close"
                    data-online-action="close-modal"
                    aria-label="Close"
                >
                    ×
                </button>

                <div
                    id="onlineModalContent"
                    class="online-modal-content"
                ></div>

            </div>
        `;

        document.body.appendChild(
            modal
        );

        return modal;

    }


    /* =====================================================
       52. GET MODAL CONTENT
       ===================================================== */

    function getModalContent() {

        const modal =
            createModalElement();

        if (!modal) {
            return null;
        }

        return modal.querySelector(
            "#onlineModalContent"
        );

    }


    /* =====================================================
       53. GET KIT COMPONENTS
       ===================================================== */

    function getKitComponentsMarkup(
        kit
    ) {

        if (
            !Array.isArray(
                kit.components
            ) ||
            !kit.components.length
        ) {

            return `
                <div class="online-kit-components-empty">
                    Kit component breakdown
                    will be provided.
                </div>
            `;

        }

        const rows =
            kit.components
                .map(
                    function (component) {

                        if (
                            !component ||
                            typeof component !==
                            "object"
                        ) {
                            return "";
                        }

                        const name =
                            component.name ||
                            component.productName ||
                            component.title ||
                            "Component";

                        const quantity =
                            component.quantity ??
                            component.qty ??
                            1;

                        return `
                            <div
                                class="online-kit-component-row"
                            >

                                <span>
                                    ${escapeHTML(
                                        name
                                    )}
                                </span>

                                <strong>
                                    ${escapeHTML(
                                        quantity
                                    )}
                                </strong>

                            </div>
                        `;

                    }
                )
                .join("");

        return `
            <div class="online-kit-components">

                <h4>
                    Kit Includes
                </h4>

                <div class="online-kit-component-list">
                    ${rows}
                </div>

            </div>
        `;

    }


    /* =====================================================
       54. GET KIT OPTIONS MARKUP
       ===================================================== */

    function getKitOptionsMarkup(
        kit
    ) {

        if (
            !Array.isArray(
                kit.options
            ) ||
            !kit.options.length
        ) {
            return "";
        }

        const optionGroups =
            kit.options
                .map(
                    function (option, index) {

                        if (
                            !option ||
                            typeof option !==
                            "object"
                        ) {
                            return "";
                        }

                        const optionId =
                            option.id ||
                            option.name ||
                            "option-" +
                            (index + 1);

                        const optionName =
                            option.name ||
                            option.label ||
                            "Kit Option";

                        const values =
                            Array.isArray(
                                option.values
                            )
                                ? option.values
                                : Array.isArray(
                                    option.options
                                )
                                    ? option.options
                                    : [];

                        if (!values.length) {
                            return "";
                        }

                        const valueMarkup =
                            values
                                .map(
                                    function (
                                        value,
                                        valueIndex
                                    ) {

                                        const valueId =
                                            typeof value ===
                                            "object"
                                                ? (
                                                    value.id ||
                                                    value.value ||
                                                    value.name ||
                                                    valueIndex
                                                )
                                                : value;

                                        const valueLabel =
                                            typeof value ===
                                            "object"
                                                ? (
                                                    value.label ||
                                                    value.name ||
                                                    value.value ||
                                                    valueId
                                                )
                                                : value;

                                        return `
                                            <label
                                                class="online-option-value"
                                            >

                                                <input
                                                    type="radio"
                                                    name="online-option-${escapeHTML(
                                                        optionId
                                                    )}"
                                                    value="${escapeHTML(
                                                        valueId
                                                    )}"
                                                    data-option-id="${escapeHTML(
                                                        optionId
                                                    )}"
                                                >

                                                <span>
                                                    ${escapeHTML(
                                                        valueLabel
                                                    )}
                                                </span>

                                            </label>
                                        `;

                                    }
                                )
                                .join("");

                        return `
                            <fieldset
                                class="online-kit-option-group"
                                data-option-group="${escapeHTML(
                                    optionId
                                )}"
                            >

                                <legend>
                                    ${escapeHTML(
                                        optionName
                                    )}
                                </legend>

                                <div
                                    class="online-option-values"
                                >
                                    ${valueMarkup}
                                </div>

                            </fieldset>
                        `;

                    }
                )
                .join("");

        if (!optionGroups.trim()) {
            return "";
        }

        return `
            <div class="online-kit-options">

                <h4>
                    Kit Options
                </h4>

                ${optionGroups}

            </div>
        `;

    }


    /* =====================================================
       55. KIT MODAL CONTENT
       ===================================================== */

    function buildKitModalContent(
        kit
    ) {

        const normalisedKit =
            normaliseKitForUI(
                kit
            );

        if (!normalisedKit) {
            return "";
        }

        const priceExVat =
            normalisedKit.price;

        const vat =
            calculateKitVAT(
                priceExVat
            );

        const total =
            calculateKitTotal(
                priceExVat
            );

        const kitId =
            escapeHTML(
                normalisedKit.id
            );

        return `
            <div
                class="online-kit-detail"
                data-kit-id="${kitId}"
            >

                <div class="online-kit-detail-header">

                    <div class="online-kit-detail-image">

                        ${getKitImageMarkup(
                            normalisedKit
                        )}

                    </div>

                    <div class="online-kit-detail-heading">

                        <span class="online-kit-category">
                            ${escapeHTML(
                                normalisedKit.category
                            )}
                        </span>

                        <h2
                            id="onlineModalTitle"
                        >
                            ${escapeHTML(
                                normalisedKit.name
                            )}
                        </h2>

                        <p>
                            ${getKitDescription(
                                normalisedKit
                            )}
                        </p>

                    </div>

                </div>


                ${getKitComponentsMarkup(
                    normalisedKit
                )}


                ${getKitOptionsMarkup(
                    normalisedKit
                )}


                <div class="online-kit-detail-pricing">

                    <div class="online-price-row">

                        <span>
                            Kit Price EX VAT
                        </span>

                        <strong>
                            ${formatCurrency(
                                priceExVat
                            )}
                        </strong>

                    </div>

                    <div class="online-price-row">

                        <span>
                            VAT @ 15%
                        </span>

                        <strong>
                            ${formatCurrency(
                                vat
                            )}
                        </strong>

                    </div>

                    <div
                        class="online-price-row online-price-total"
                    >

                        <span>
                            Total Incl VAT
                        </span>

                        <strong>
                            ${formatCurrency(
                                total
                            )}
                        </strong>

                    </div>

                </div>


                <div class="online-kit-detail-actions">

                    <button
                        type="button"
                        class="online-kit-cart-button"
                        data-online-action="add-kit"
                        data-kit-id="${kitId}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

    }


    /* =====================================================
       56. OPEN KIT DETAILS
       ===================================================== */

    function openKitDetails(
        kit
    ) {

        const modal =
            createModalElement();

        const content =
            getModalContent();

        if (!modal || !content) {

            uiWarn(
                "Unable to create kit details modal."
            );

            return false;

        }

        const html =
            buildKitModalContent(
                kit
            );

        if (!html) {

            uiWarn(
                "Unable to build kit details."
            );

            return false;

        }

        setHTML(
            content,
            html
        );

        NEXPAK_ONLINE_UI.activeKitId =
            kit.id ||
            kit.kitId ||
            null;

        NEXPAK_ONLINE_UI.activeModal =
            "kit-details";

        showElement(
            modal
        );

        document.body.classList.add(
            "online-modal-open"
        );

        return true;

    }


    /* =====================================================
       57. CLOSE MODAL
       ===================================================== */

    function closeModal() {

        const modal =
            getUIElement("modal");

        if (modal) {
            hideElement(modal);
        }

        NEXPAK_ONLINE_UI.activeModal =
            null;

        NEXPAK_ONLINE_UI.activeKitId =
            null;

        document.body.classList.remove(
            "online-modal-open"
        );

    }


    /* =====================================================
       58. GET SELECTED KIT OPTIONS
       ===================================================== */

    function getSelectedKitOptions(
        container
    ) {

        if (!container) {
            return {};
        }

        const selections = {};

        const inputs =
            container.querySelectorAll(
                "input[data-option-id]:checked"
            );

        inputs.forEach(
            function (input) {

                selections[
                    input.dataset.optionId
                ] =
                    input.value;

            }
        );

        return selections;

    }


    /* =====================================================
       59. VALIDATE KIT OPTIONS
       ===================================================== */

    function validateKitOptions(
        container
    ) {

        if (!container) {
            return {
                valid: true,
                missing: []
            };
        }

        const groups =
            container.querySelectorAll(
                ".online-kit-option-group"
            );

        const missing = [];

        groups.forEach(
            function (group) {

                const checked =
                    group.querySelector(
                        "input:checked"
                    );

                if (!checked) {

                    const legend =
                        group.querySelector(
                            "legend"
                        );

                    missing.push(
                        legend
                            ? legend.textContent.trim()
                            : "Kit option"
                    );

                }

            }
        );

        return {

            valid:
                missing.length === 0,

            missing:
                missing

        };

    }


    /* =====================================================
       60. PART 4 API EXTENSION
       ===================================================== */

    UI_API.createModal =
        createModalElement;

    UI_API.openKitDetails =
        openKitDetails;

    UI_API.closeModal =
        closeModal;

    UI_API.getSelectedKitOptions =
        getSelectedKitOptions;

    UI_API.validateKitOptions =
        validateKitOptions;


    /* =====================================================
       61. PART 4 STATUS
       ===================================================== */

    uiLog(
        "Part 4 loaded — kit details and options UI ready."
    );


    /* =====================================================
       END OF PART 4
       ===================================================== */

     /* =====================================================
       62. NORMALISE QUANTITY
       ===================================================== */

    function normaliseQuantity(value) {

        const quantity =
            parseInt(
                value,
                10
            );

        if (
            !Number.isFinite(quantity) ||
            quantity < 1
        ) {
            return 1;
        }

        return quantity;

    }


    /* =====================================================
       63. QUANTITY INPUT MARKUP
       ===================================================== */

    function getQuantityMarkup(
        quantity,
        kitId
    ) {

        const safeQuantity =
            normaliseQuantity(
                quantity
            );

        const safeKitId =
            escapeHTML(
                kitId || ""
            );

        return `
            <div
                class="online-quantity-control"
                data-kit-id="${safeKitId}"
            >

                <button
                    type="button"
                    class="online-quantity-button online-quantity-minus"
                    data-online-action="quantity-minus"
                    data-kit-id="${safeKitId}"
                    aria-label="Decrease quantity"
                >
                    −
                </button>


                <input
                    type="number"
                    class="online-quantity-input"
                    value="${safeQuantity}"
                    min="1"
                    step="1"
                    inputmode="numeric"
                    data-online-action="quantity-input"
                    data-kit-id="${safeKitId}"
                    aria-label="Kit quantity"
                >


                <button
                    type="button"
                    class="online-quantity-button online-quantity-plus"
                    data-online-action="quantity-plus"
                    data-kit-id="${safeKitId}"
                    aria-label="Increase quantity"
                >
                    +
                </button>

            </div>
        `;

    }


    /* =====================================================
       64. SET QUANTITY INPUT
       ===================================================== */

    function setQuantityInput(
        kitId,
        quantity
    ) {

        if (!kitId) {
            return;
        }

        const inputs =
            document.querySelectorAll(
                `.online-quantity-input[data-kit-id="${CSS.escape(
                    String(kitId)
                )}"]`
            );

        const safeQuantity =
            normaliseQuantity(
                quantity
            );

        inputs.forEach(
            function (input) {

                input.value =
                    safeQuantity;

            }
        );

    }


    /* =====================================================
       65. GET QUANTITY INPUT
       ===================================================== */

    function getQuantityInput(
        kitId
    ) {

        if (!kitId) {
            return 1;
        }

        const input =
            document.querySelector(
                `.online-quantity-input[data-kit-id="${CSS.escape(
                    String(kitId)
                )}"]`
            );

        if (!input) {
            return 1;
        }

        return normaliseQuantity(
            input.value
        );

    }


    /* =====================================================
       66. UPDATE QUANTITY INPUT
       ===================================================== */

    function updateQuantityInput(
        input,
        quantity
    ) {

        if (!input) {
            return;
        }

        const safeQuantity =
            normaliseQuantity(
                quantity
            );

        input.value =
            safeQuantity;

    }


    /* =====================================================
       67. CART CONTAINER
       ===================================================== */

    function getCartContainer() {

        return getUIElement(
            "cart"
        );

    }


    /* =====================================================
       68. CART COUNT ELEMENT
       ===================================================== */

    function getCartCountElement() {

        return getUIElement(
            "cartCount"
        );

    }


    /* =====================================================
       69. CART TOTAL ELEMENT
       ===================================================== */

    function getCartTotalElement() {

        return getUIElement(
            "cartTotal"
        );

    }


    /* =====================================================
       70. GET CART ENGINE
       ===================================================== */

    function getCartEngine() {

        if (
            window.NEXPAK_ONLINE_CART
        ) {
            return window.NEXPAK_ONLINE_CART;
        }

        if (
            window.NEXPAK_ONLINE_STORE &&
            window.NEXPAK_ONLINE_STORE.cart
        ) {
            return window.NEXPAK_ONLINE_STORE.cart;
        }

        return null;

    }


    /* =====================================================
       71. GET CART ITEMS SAFELY
       ===================================================== */

    function getCartItems() {

        const cart =
            getCartEngine();

        if (!cart) {
            return [];
        }

        try {

            if (
                typeof cart.getItems ===
                "function"
            ) {

                const items =
                    cart.getItems();

                return Array.isArray(
                    items
                )
                    ? items
                    : [];

            }

            if (
                Array.isArray(
                    cart.items
                )
            ) {

                return cart.items;

            }

        } catch (error) {

            uiWarn(
                "Unable to read cart items.",
                error
            );

        }

        return [];

    }


    /* =====================================================
       72. GET CART ITEM QUANTITY
       ===================================================== */

    function getCartItemQuantity(
        item
    ) {

        if (
            !item ||
            typeof item !== "object"
        ) {
            return 0;
        }

        return normaliseQuantity(
            item.quantity ??
            item.qty ??
            1
        );

    }


    /* =====================================================
       73. GET CART ITEM NAME
       ===================================================== */

    function getCartItemName(
        item
    ) {

        if (
            !item ||
            typeof item !== "object"
        ) {
            return "Security Kit";
        }

        return (
            item.name ||
            item.kitName ||
            item.title ||
            "Security Kit"
        );

    }


    /* =====================================================
       74. GET CART ITEM PRICE
       ===================================================== */

    function getCartItemPrice(
        item
    ) {

        if (
            !item ||
            typeof item !== "object"
        ) {
            return 0;
        }

        const price =
            Number(
                item.price ??
                item.priceExVat ??
                item.exVatPrice ??
                0
            );

        return Number.isFinite(
            price
        )
            ? price
            : 0;

    }


    /* =====================================================
       75. CALCULATE CART DISPLAY TOTAL
       ===================================================== */

    function calculateCartDisplayTotal(
        items
    ) {

        if (!Array.isArray(items)) {
            return 0;
        }

        return items.reduce(
            function (
                total,
                item
            ) {

                const price =
                    getCartItemPrice(
                        item
                    );

                const quantity =
                    getCartItemQuantity(
                        item
                    );

                return (
                    total +
                    (
                        price *
                        quantity
                    )
                );

            },
            0
        );

    }


    /* =====================================================
       76. CALCULATE CART ITEM COUNT
       ===================================================== */

    function calculateCartItemCount(
        items
    ) {

        if (!Array.isArray(items)) {
            return 0;
        }

        return items.reduce(
            function (
                count,
                item
            ) {

                return (
                    count +
                    getCartItemQuantity(
                        item
                    )
                );

            },
            0
        );

    }


    /* =====================================================
       77. UPDATE CART COUNT DISPLAY
       ===================================================== */

    function updateCartCount(
        count
    ) {

        const element =
            getCartCountElement();

        if (!element) {
            return;
        }

        const safeCount =
            Number.isFinite(
                Number(count)
            )
                ? Number(count)
                : 0;

        setText(
            element,
            safeCount
        );

        element.setAttribute(
            "data-cart-count",
            String(
                safeCount
            )
        );

    }


    /* =====================================================
       78. UPDATE CART TOTAL DISPLAY
       ===================================================== */

    function updateCartTotal(
        total
    ) {

        const element =
            getCartTotalElement();

        if (!element) {
            return;
        }

        const safeTotal =
            Number.isFinite(
                Number(total)
            )
                ? Number(total)
                : 0;

        setText(
            element,
            formatCurrency(
                safeTotal
            )
        );

    }


    /* =====================================================
       79. REFRESH CART INDICATORS
       ===================================================== */

    function refreshCartIndicators() {

        const items =
            getCartItems();

        const count =
            calculateCartItemCount(
                items
            );

        const total =
            calculateCartDisplayTotal(
                items
            );

        updateCartCount(
            count
        );

        updateCartTotal(
            total
        );

        return {
            count: count,
            total: total
        };

    }


    /* =====================================================
       80. PART 5 API EXTENSION
       ===================================================== */

    UI_API.normaliseQuantity =
        normaliseQuantity;

    UI_API.getQuantityMarkup =
        getQuantityMarkup;

    UI_API.setQuantityInput =
        setQuantityInput;

    UI_API.getQuantityInput =
        getQuantityInput;

    UI_API.updateQuantityInput =
        updateQuantityInput;

    UI_API.getCartItems =
        getCartItems;

    UI_API.calculateCartItemCount =
        calculateCartItemCount;

    UI_API.calculateCartDisplayTotal =
        calculateCartDisplayTotal;

    UI_API.updateCartCount =
        updateCartCount;

    UI_API.updateCartTotal =
        updateCartTotal;

    UI_API.refreshCartIndicators =
        refreshCartIndicators;


    /* =====================================================
       81. PART 5 STATUS
       ===================================================== */

    uiLog(
        "Part 5 loaded — quantity and cart UI foundation ready."
    );


    /* =====================================================
       END OF PART 5
       ===================================================== */

     /* =====================================================
       82. CREATE CART PANEL
       ===================================================== */

    function createCartPanel() {

        let cart =
            getCartContainer();

        if (cart) {
            return cart;
        }

        cart =
            document.createElement("aside");

        cart.id =
            "onlineCart";

        cart.className =
            "online-cart-panel";

        cart.hidden =
            true;

        cart.setAttribute(
            "aria-label",
            "Shopping cart"
        );

        cart.innerHTML = `
            <div class="online-cart-header">

                <div>
                    <h2>
                        Your Cart
                    </h2>

                    <span
                        id="onlineCartCount"
                        class="online-cart-count"
                    >
                        0
                    </span>
                </div>

                <button
                    type="button"
                    class="online-cart-close"
                    data-online-action="close-cart"
                    aria-label="Close cart"
                >
                    ×
                </button>

            </div>


            <div
                class="online-cart-items"
                id="onlineCartItems"
            ></div>


            <div class="online-cart-footer">

                <div class="online-cart-total-row">

                    <span>
                        Cart Total
                    </span>

                    <strong
                        id="onlineCartTotal"
                    >
                        R 0.00
                    </strong>

                </div>


                <button
                    type="button"
                    class="online-checkout-button"
                    data-online-action="checkout"
                >
                    Proceed to Checkout
                </button>

            </div>
        `;

        document.body.appendChild(
            cart
        );

        return cart;

    }


    /* =====================================================
       83. GET CART ITEMS CONTAINER
       ===================================================== */

    function getCartItemsContainer() {

        const cart =
            createCartPanel();

        if (!cart) {
            return null;
        }

        return cart.querySelector(
            "#onlineCartItems"
        );

    }


    /* =====================================================
       84. GET CART ITEM ID
       ===================================================== */

    function getCartItemId(
        item
    ) {

        if (
            !item ||
            typeof item !== "object"
        ) {
            return "";
        }

        return (
            item.id ||
            item.kitId ||
            item.productId ||
            item.code ||
            ""
        );

    }


    /* =====================================================
       85. GET CART ITEM IMAGE
       ===================================================== */

    function getCartItemImage(
        item
    ) {

        if (
            !item ||
            typeof item !== "object"
        ) {
            return "";
        }

        return (
            item.image ||
            item.imageUrl ||
            ""
        );

    }


    /* =====================================================
       86. GET CART ITEM OPTIONS
       ===================================================== */

    function getCartItemOptions(
        item
    ) {

        if (
            !item ||
            typeof item !== "object"
        ) {
            return "";
        }

        const options =
            item.options;

        if (
            !options ||
            typeof options !== "object"
        ) {
            return "";
        }

        const entries =
            Object.entries(
                options
            );

        if (!entries.length) {
            return "";
        }

        return `
            <div class="online-cart-item-options">

                ${entries
                    .map(
                        function (
                            entry
                        ) {

                            return `
                                <span>
                                    ${escapeHTML(
                                        entry[0]
                                    )}:
                                    ${escapeHTML(
                                        entry[1]
                                    )}
                                </span>
                            `;

                        }
                    )
                    .join("")}

            </div>
        `;

    }


    /* =====================================================
       87. GET CART ITEM IMAGE MARKUP
       ===================================================== */

    function getCartItemImageMarkup(
        item
    ) {

        const image =
            getCartItemImage(
                item
            );

        const name =
            getCartItemName(
                item
            );

        if (!image) {

            return `
                <div
                    class="online-cart-item-placeholder"
                    aria-label="Kit image unavailable"
                >
                    NEXPAK
                </div>
            `;

        }

        return `
            <img
                src="${escapeHTML(
                    image
                )}"
                alt="${escapeHTML(
                    name
                )}"
                class="online-cart-item-image"
                loading="lazy"
            >
        `;

    }


    /* =====================================================
       88. RENDER CART ITEM
       ===================================================== */

    function renderCartItem(
        item
    ) {

        if (
            !item ||
            typeof item !== "object"
        ) {
            return "";
        }

        const itemId =
            getCartItemId(
                item
            );

        const name =
            getCartItemName(
                item
            );

        const quantity =
            getCartItemQuantity(
                item
            );

        const price =
            getCartItemPrice(
                item
            );

        const lineTotal =
            price *
            quantity;

        return `
            <div
                class="online-cart-item"
                data-cart-item-id="${escapeHTML(
                    itemId
                )}"
            >

                <div class="online-cart-item-image-wrap">

                    ${getCartItemImageMarkup(
                        item
                    )}

                </div>


                <div class="online-cart-item-details">

                    <h3>
                        ${escapeHTML(
                            name
                        )}
                    </h3>


                    ${getCartItemOptions(
                        item
                    )}


                    <div
                        class="online-cart-item-price"
                    >
                        ${formatCurrency(
                            price
                        )}
                        each
                    </div>


                    <div
                        class="online-cart-item-controls"
                    >

                        <button
                            type="button"
                            data-online-action="cart-quantity-minus"
                            data-cart-item-id="${escapeHTML(
                                itemId
                            )}"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>


                        <span
                            class="online-cart-item-quantity"
                        >
                            ${quantity}
                        </span>


                        <button
                            type="button"
                            data-online-action="cart-quantity-plus"
                            data-cart-item-id="${escapeHTML(
                                itemId
                            )}"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>


                        <button
                            type="button"
                            class="online-cart-remove"
                            data-online-action="remove-cart-item"
                            data-cart-item-id="${escapeHTML(
                                itemId
                            )}"
                        >
                            Remove
                        </button>

                    </div>


                    <div
                        class="online-cart-item-line-total"
                    >
                        ${formatCurrency(
                            lineTotal
                        )}
                    </div>

                </div>

            </div>
        `;

    }


    /* =====================================================
       89. RENDER CART
       ===================================================== */

    function renderCart() {

        const container =
            getCartItemsContainer();

        if (!container) {

            uiWarn(
                "Cart items container unavailable."
            );

            return;

        }

        const items =
            getCartItems();

        if (!items.length) {

            setHTML(
                container,
                `
                    <div class="online-cart-empty">

                        <div
                            class="online-cart-empty-icon"
                        >
                            🛒
                        </div>

                        <h3>
                            Your cart is empty
                        </h3>

                        <p>
                            Add a security kit
                            to continue.
                        </p>

                        <button
                            type="button"
                            class="online-continue-shopping"
                            data-online-action="close-cart"
                        >
                            Continue Shopping
                        </button>

                    </div>
                `
            );

            refreshCartIndicators();

            return;

        }

        const markup =
            items
                .map(
                    renderCartItem
                )
                .join("");

        setHTML(
            container,
            markup
        );

        refreshCartIndicators();

    }


    /* =====================================================
       90. OPEN CART
       ===================================================== */

    function openCart() {

        const cart =
            createCartPanel();

        if (!cart) {
            return false;
        }

        renderCart();

        showElement(
            cart
        );

        NEXPAK_ONLINE_UI.isCartOpen =
            true;

        document.body.classList.add(
            "online-cart-open"
        );

        return true;

    }


    /* =====================================================
       91. CLOSE CART
       ===================================================== */

    function closeCart() {

        const cart =
            getUIElement(
                "cart"
            );

        if (cart) {
            hideElement(
                cart
            );
        }

        NEXPAK_ONLINE_UI.isCartOpen =
            false;

        document.body.classList.remove(
            "online-cart-open"
        );

    }


    /* =====================================================
       92. TOGGLE CART
       ===================================================== */

    function toggleCart() {

        if (
            NEXPAK_ONLINE_UI.isCartOpen
        ) {

            closeCart();

        } else {

            openCart();

        }

    }


    /* =====================================================
       93. REFRESH CART UI
       ===================================================== */

    function refreshCartUI() {

        if (
            NEXPAK_ONLINE_UI.isCartOpen
        ) {

            renderCart();

        } else {

            refreshCartIndicators();

        }

    }


    /* =====================================================
       94. PART 6 API EXTENSION
       ===================================================== */

    UI_API.createCart =
        createCartPanel;

    UI_API.renderCartItem =
        renderCartItem;

    UI_API.renderCart =
        renderCart;

    UI_API.openCart =
        openCart;

    UI_API.closeCart =
        closeCart;

    UI_API.toggleCart =
        toggleCart;

    UI_API.refreshCartUI =
        refreshCartUI;


    /* =====================================================
       95. PART 6 STATUS
       ===================================================== */

    uiLog(
        "Part 6 loaded — cart UI ready."
    );


    /* =====================================================
       END OF PART 6
       ===================================================== */
    /* =====================================================
       96. GET DELIVERY ENGINE
       ===================================================== */

    function getDeliveryEngine() {

        if (
            window.NEXPAK_ONLINE_DELIVERY
        ) {
            return window.NEXPAK_ONLINE_DELIVERY;
        }

        if (
            window.NEXPAK_ONLINE_STORE &&
            window.NEXPAK_ONLINE_STORE.delivery
        ) {
            return window.NEXPAK_ONLINE_STORE.delivery;
        }

        return null;

    }


    /* =====================================================
       97. GET CHECKOUT ENGINE
       ===================================================== */

    function getCheckoutEngine() {

        if (
            window.NEXPAK_ONLINE_CHECKOUT
        ) {
            return window.NEXPAK_ONLINE_CHECKOUT;
        }

        if (
            window.NEXPAK_ONLINE_STORE &&
            window.NEXPAK_ONLINE_STORE.checkout
        ) {
            return window.NEXPAK_ONLINE_STORE.checkout;
        }

        return null;

    }


    /* =====================================================
       98. GET DELIVERY SUMMARY
       ===================================================== */

    function getDeliverySummary() {

        const delivery =
            getDeliveryEngine();

        if (!delivery) {
            return null;
        }

        try {

            if (
                typeof delivery.getSummary ===
                "function"
            ) {

                return delivery.getSummary();

            }

            if (
                typeof delivery.getDeliverySummary ===
                "function"
            ) {

                return delivery.getDeliverySummary();

            }

            if (
                delivery.summary &&
                typeof delivery.summary ===
                "object"
            ) {

                return delivery.summary;

            }

        } catch (error) {

            uiWarn(
                "Unable to read delivery summary.",
                error
            );

        }

        return null;

    }


    /* =====================================================
       99. NORMALISE DELIVERY VALUE
       ===================================================== */

    function getDeliveryValue(
        summary,
        keys,
        fallback
    ) {

        if (
            !summary ||
            typeof summary !== "object"
        ) {
            return fallback;
        }

        for (
            let index = 0;
            index < keys.length;
            index++
        ) {

            const key =
                keys[index];

            if (
                summary[key] !==
                undefined &&
                summary[key] !==
                null
            ) {

                return summary[key];

            }

        }

        return fallback;

    }


    /* =====================================================
       100. RENDER DELIVERY SUMMARY
       ===================================================== */

    function renderDeliverySummary(
        container
    ) {

        if (!container) {
            return;
        }

        const summary =
            getDeliverySummary();

        if (!summary) {

            setHTML(
                container,
                `
                    <div
                        class="online-delivery-summary"
                    >

                        <h3>
                            Delivery
                        </h3>

                        <p>
                            Delivery will be
                            calculated during checkout.
                        </p>

                    </div>
                `
            );

            return;

        }

        const distance =
            getDeliveryValue(
                summary,
                [
                    "distance",
                    "distanceKm",
                    "km"
                ],
                0
            );

        const weight =
            getDeliveryValue(
                summary,
                [
                    "weight",
                    "weightKg",
                    "cartWeight"
                ],
                0
            );

        const fee =
            getDeliveryValue(
                summary,
                [
                    "fee",
                    "deliveryFee",
                    "total"
                ],
                0
            );

        setHTML(
            container,
            `
                <div
                    class="online-delivery-summary"
                >

                    <h3>
                        Delivery
                    </h3>

                    <div
                        class="online-delivery-row"
                    >
                        <span>
                            Distance
                        </span>

                        <strong>
                            ${escapeHTML(
                                distance
                            )} km
                        </strong>
                    </div>


                    <div
                        class="online-delivery-row"
                    >
                        <span>
                            Cart Weight
                        </span>

                        <strong>
                            ${escapeHTML(
                                weight
                            )} kg
                        </strong>
                    </div>


                    <div
                        class="online-delivery-row online-delivery-total"
                    >
                        <span>
                            Delivery Fee
                        </span>

                        <strong>
                            ${formatCurrency(
                                fee
                            )}
                        </strong>
                    </div>

                </div>
            `
        );

    }


    /* =====================================================
       101. CREATE NOTIFICATION AREA
       ===================================================== */

    function createNotificationElement() {

        let notification =
            getUIElement(
                "notification"
            );

        if (notification) {
            return notification;
        }

        notification =
            document.createElement(
                "div"
            );

        notification.id =
            "onlineNotification";

        notification.className =
            "online-notification";

        notification.hidden =
            true;

        notification.setAttribute(
            "role",
            "status"
        );

        document.body.appendChild(
            notification
        );

        return notification;

    }


    /* =====================================================
       102. SHOW NOTIFICATION
       ===================================================== */

    function showNotification(
        message,
        type
    ) {

        const notification =
            createNotificationElement();

        if (!notification) {
            return;
        }

        const notificationType =
            type ||
            "info";

        notification.className =
            "online-notification " +
            "online-notification-" +
            notificationType;

        setText(
            notification,
            message ||
            ""
        );

        showElement(
            notification
        );

        window.clearTimeout(
            notification._hideTimer
        );

        notification._hideTimer =
            window.setTimeout(
                function () {

                    hideElement(
                        notification
                    );

                },
                3500
            );

    }


    /* =====================================================
       103. CHECKOUT AVAILABILITY
       ===================================================== */

    function isCheckoutAvailable() {

        const checkout =
            getCheckoutEngine();

        if (!checkout) {
            return false;
        }

        if (
            typeof checkout.isAvailable ===
            "function"
        ) {

            try {

                return Boolean(
                    checkout.isAvailable()
                );

            } catch (error) {

                uiWarn(
                    "Checkout availability check failed.",
                    error
                );

            }

        }

        return true;

    }


    /* =====================================================
       104. HANDOFF TO CHECKOUT
       ===================================================== */

    function proceedToCheckout() {

        if (
            !isCheckoutAvailable()
        ) {

            showNotification(
                "Checkout is temporarily unavailable.",
                "error"
            );

            return false;

        }

        closeCart();

        const checkout =
            getCheckoutEngine();

        try {

            if (
                typeof checkout.openCheckout ===
                "function"
            ) {

                checkout.openCheckout();

                return true;

            }

            if (
                typeof checkout.startCheckout ===
                "function"
            ) {

                checkout.startCheckout();

                return true;

            }

            if (
                typeof checkout.showCheckout ===
                "function"
            ) {

                checkout.showCheckout();

                return true;

            }

        } catch (error) {

            uiError(
                "Checkout handoff failed.",
                error
            );

            showNotification(
                "Unable to open checkout.",
                "error"
            );

            return false;

        }

        showNotification(
            "Checkout is not ready yet.",
            "error"
        );

        return false;

    }


    /* =====================================================
       105. DELIVERY REFRESH
       ===================================================== */

    function refreshDeliveryUI() {

        const delivery =
            getDeliveryEngine();

        if (!delivery) {

            uiWarn(
                "Delivery engine unavailable."
            );

            return false;

        }

        try {

            if (
                typeof delivery.refreshDelivery ===
                "function"
            ) {

                delivery.refreshDelivery();

            } else if (
                typeof delivery.refresh ===
                "function"
            ) {

                delivery.refresh();

            }

            const summary =
                document.querySelector(
                    ".online-delivery-summary-container"
                );

            if (summary) {
                renderDeliverySummary(
                    summary
                );
            }

            return true;

        } catch (error) {

            uiError(
                "Delivery UI refresh failed.",
                error
            );

            return false;

        }

    }


    /* =====================================================
       106. CART UPDATE NOTIFICATION
       ===================================================== */

    function notifyCartUpdated(
        message
    ) {

        refreshCartUI();

        showNotification(
            message ||
            "Cart updated.",
            "success"
        );

    }


    /* =====================================================
       107. ADD TO CART NOTIFICATION
       ===================================================== */

    function notifyKitAdded(
        kitName
    ) {

        showNotification(
            (
                kitName ||
                "Kit"
            ) +
            " added to cart.",
            "success"
        );

        refreshCartUI();

    }


    /* =====================================================
       108. PART 7 API EXTENSION
       ===================================================== */

    UI_API.getDeliverySummary =
        getDeliverySummary;

    UI_API.renderDeliverySummary =
        renderDeliverySummary;

    UI_API.refreshDeliveryUI =
        refreshDeliveryUI;

    UI_API.showNotification =
        showNotification;

    UI_API.notifyCartUpdated =
        notifyCartUpdated;

    UI_API.notifyKitAdded =
        notifyKitAdded;

    UI_API.isCheckoutAvailable =
        isCheckoutAvailable;

    UI_API.proceedToCheckout =
        proceedToCheckout;


    /* =====================================================
       109. PART 7 STATUS
       ===================================================== */

    uiLog(
        "Part 7 loaded — delivery and checkout UI ready."
    );


    /* =====================================================
       END OF PART 7
       ===================================================== */

       /* =====================================================
       110. FIND KIT FROM STORE DATA
       ===================================================== */

    function findKitById(
        kitId
    ) {

        if (!kitId) {
            return null;
        }

        let kits = [];

        try {

            if (
                window.NEXPAK_ONLINE_STORE &&
                typeof window.NEXPAK_ONLINE_STORE
                    .getKits === "function"
            ) {

                kits =
                    window.NEXPAK_ONLINE_STORE
                        .getKits();

            } else if (
                Array.isArray(
                    window.NEXPAK_ONLINE_KITS
                )
            ) {

                kits =
                    window.NEXPAK_ONLINE_KITS;

            } else if (
                window.NEXPAK_ONLINE_STORE &&
                Array.isArray(
                    window.NEXPAK_ONLINE_STORE.kits
                )
            ) {

                kits =
                    window.NEXPAK_ONLINE_STORE.kits;

            }

        } catch (error) {

            uiWarn(
                "Unable to access kit database.",
                error
            );

        }

        if (!Array.isArray(kits)) {
            return null;
        }

        return (
            kits.find(
                function (kit) {

                    const id =
                        kit &&
                        (
                            kit.id ||
                            kit.kitId ||
                            kit.code
                        );

                    return (
                        String(id) ===
                        String(kitId)
                    );

                }
            ) || null
        );

    }


    /* =====================================================
       111. GET CART ACTION ENGINE
       ===================================================== */

    function getStoreCartAPI() {

        if (
            window.NEXPAK_ONLINE_STORE &&
            typeof window.NEXPAK_ONLINE_STORE
                .addToCart === "function"
        ) {

            return window.NEXPAK_ONLINE_STORE;

        }

        if (
            window.NEXPAK_ONLINE_CART
        ) {

            return window.NEXPAK_ONLINE_CART;

        }

        return null;

    }


    /* =====================================================
       112. ADD KIT TO EXISTING CART ENGINE
       ===================================================== */

    function addKitToCart(
        kitId,
        quantity,
        options
    ) {

        const kit =
            findKitById(
                kitId
            );

        if (!kit) {

            showNotification(
                "Unable to find the selected kit.",
                "error"
            );

            return false;

        }

        const cartAPI =
            getStoreCartAPI();

        if (!cartAPI) {

            showNotification(
                "Cart is temporarily unavailable.",
                "error"
            );

            return false;

        }

        const safeQuantity =
            normaliseQuantity(
                quantity
            );

        const selectedOptions =
            options ||
            {};

        try {

            if (
                typeof cartAPI.addToCart ===
                "function"
            ) {

                cartAPI.addToCart(
                    kit,
                    safeQuantity,
                    selectedOptions
                );

            } else if (
                typeof cartAPI.addItem ===
                "function"
            ) {

                cartAPI.addItem(
                    kit,
                    safeQuantity,
                    selectedOptions
                );

            } else {

                showNotification(
                    "Cart function is unavailable.",
                    "error"
                );

                return false;

            }

            refreshCartUI();

            notifyKitAdded(
                getCartItemName(
                    kit
                )
            );

            return true;

        } catch (error) {

            uiError(
                "Unable to add kit to cart.",
                error
            );

            showNotification(
                "Unable to add kit to cart.",
                "error"
            );

            return false;

        }

    }


    /* =====================================================
       113. HANDLE ADD KIT ACTION
       ===================================================== */

    function handleAddKit(
        kitId,
        sourceElement
    ) {

        const quantity =
            sourceElement &&
            sourceElement
                .closest(
                    ".online-kit-card, .online-kit-detail"
                )
                ? getQuantityInput(
                    kitId
                )
                : 1;

        let options = {};

        const parent =
            sourceElement
                ? sourceElement.closest(
                    ".online-kit-detail"
                )
                : null;

        if (parent) {

            const validation =
                validateKitOptions(
                    parent
                );

            if (!validation.valid) {

                showNotification(
                    "Please select: " +
                    validation.missing.join(
                        ", "
                    ),
                    "error"
                );

                return false;

            }

            options =
                getSelectedKitOptions(
                    parent
                );

        }

        return addKitToCart(
            kitId,
            quantity,
            options
        );

    }


    /* =====================================================
       114. HANDLE VIEW KIT
       ===================================================== */

    function handleViewKit(
        kitId
    ) {

        const kit =
            findKitById(
                kitId
            );

        if (!kit) {

            showNotification(
                "Unable to open kit details.",
                "error"
            );

            return false;

        }

        return openKitDetails(
            kit
        );

    }


    /* =====================================================
       115. CART QUANTITY CHANGE
       ===================================================== */

    function updateCartItemQuantity(
        itemId,
        quantity
    ) {

        const cart =
            getStoreCartAPI();

        if (!cart) {
            return false;
        }

        const safeQuantity =
            normaliseQuantity(
                quantity
            );

        try {

            if (
                typeof cart.updateQuantity ===
                "function"
            ) {

                cart.updateQuantity(
                    itemId,
                    safeQuantity
                );

            } else if (
                typeof cart.updateCartItem ===
                "function"
            ) {

                cart.updateCartItem(
                    itemId,
                    safeQuantity
                );

            } else if (
                typeof cart.updateItem ===
                "function"
            ) {

                cart.updateItem(
                    itemId,
                    safeQuantity
                );

            } else {

                return false;

            }

            refreshCartUI();

            return true;

        } catch (error) {

            uiError(
                "Unable to update cart quantity.",
                error
            );

            return false;

        }

    }


    /* =====================================================
       116. REMOVE CART ITEM
       ===================================================== */

    function removeCartItem(
        itemId
    ) {

        const cart =
            getStoreCartAPI();

        if (!cart) {
            return false;
        }

        try {

            if (
                typeof cart.removeFromCart ===
                "function"
            ) {

                cart.removeFromCart(
                    itemId
                );

            } else if (
                typeof cart.removeItem ===
                "function"
            ) {

                cart.removeItem(
                    itemId
                );

            } else {

                return false;

            }

            refreshCartUI();

            showNotification(
                "Kit removed from cart.",
                "success"
            );

            return true;

        } catch (error) {

            uiError(
                "Unable to remove cart item.",
                error
            );

            return false;

        }

    }


    /* =====================================================
       117. EVENT ACTION HANDLER
       ===================================================== */

    function handleUIAction(
        element
    ) {

        if (!element) {
            return;
        }

        const action =
            element.dataset.onlineAction;

        if (!action) {
            return;
        }

        const kitId =
            element.dataset.kitId;

        const itemId =
            element.dataset.cartItemId;


        switch (action) {

            case "view-kit":

                handleViewKit(
                    kitId
                );

                break;


            case "add-kit":

                handleAddKit(
                    kitId,
                    element
                );

                break;


            case "close-modal":

                closeModal();

                break;


            case "close-cart":

                closeCart();

                break;


            case "checkout":

                proceedToCheckout();

                break;


            case "quantity-minus": {

                const current =
                    getQuantityInput(
                        kitId
                    );

                setQuantityInput(
                    kitId,
                    Math.max(
                        1,
                        current - 1
                    )
                );

                break;
            }


            case "quantity-plus": {

                const current =
                    getQuantityInput(
                        kitId
                    );

                setQuantityInput(
                    kitId,
                    current + 1
                );

                break;
            }


            case "cart-quantity-minus": {

                const items =
                    getCartItems();

                const item =
                    items.find(
                        function (cartItem) {

                            return (
                                String(
                                    getCartItemId(
                                        cartItem
                                    )
                                ) ===
                                String(itemId)
                            );

                        }
                    );

                if (item) {

                    updateCartItemQuantity(
                        itemId,
                        Math.max(
                            1,
                            getCartItemQuantity(
                                item
                            ) - 1
                        )
                    );

                }

                break;
            }


            case "cart-quantity-plus": {

                const items =
                    getCartItems();

                const item =
                    items.find(
                        function (cartItem) {

                            return (
                                String(
                                    getCartItemId(
                                        cartItem
                                    )
                                ) ===
                                String(itemId)
                            );

                        }
                    );

                if (item) {

                    updateCartItemQuantity(
                        itemId,
                        getCartItemQuantity(
                            item
                        ) + 1
                    );

                }

                break;
            }


            case "remove-cart-item":

                removeCartItem(
                    itemId
                );

                break;


            case "retry-store":

                if (
                    typeof window
                        .initialiseNexpakOnlineStore ===
                    "function"
                ) {

                    window
                        .initialiseNexpakOnlineStore();

                }

                break;


            default:

                break;

        }

    }


    /* =====================================================
       118. GLOBAL CLICK HANDLER
       ===================================================== */

    function handleDocumentClick(
        event
    ) {

        const actionElement =
            event.target.closest(
                "[data-online-action]"
            );

        if (!actionElement) {
            return;
        }

        handleUIAction(
            actionElement
        );

    }


    /* =====================================================
       119. QUANTITY INPUT HANDLER
       ===================================================== */

    function handleQuantityInput(
        event
    ) {

        const input =
            event.target.closest(
                ".online-quantity-input"
            );

        if (!input) {
            return;
        }

        const quantity =
            normaliseQuantity(
                input.value
            );

        input.value =
            quantity;

    }


    /* =====================================================
       120. ESCAPE KEY HANDLER
       ===================================================== */

    function handleEscapeKey(
        event
    ) {

        if (
            event.key !==
            "Escape"
        ) {
            return;
        }

        if (
            NEXPAK_ONLINE_UI.activeModal
        ) {

            closeModal();

            return;

        }

        if (
            NEXPAK_ONLINE_UI.isCartOpen
        ) {

            closeCart();

        }

    }


    /* =====================================================
       121. BIND UI EVENTS
       ===================================================== */

    function bindUIEvents() {

        if (
            NEXPAK_ONLINE_UI.eventsBound
        ) {
            return;
        }

        document.addEventListener(
            "click",
            handleDocumentClick
        );

        document.addEventListener(
            "input",
            handleQuantityInput
        );

        document.addEventListener(
            "keydown",
            handleEscapeKey
        );

        NEXPAK_ONLINE_UI.eventsBound =
            true;

        uiLog(
            "UI events bound."
        );

    }


    /* =====================================================
       122. UNBIND UI EVENTS
       ===================================================== */

    function unbindUIEvents() {

        if (
            !NEXPAK_ONLINE_UI.eventsBound
        ) {
            return;
        }

        document.removeEventListener(
            "click",
            handleDocumentClick
        );

        document.removeEventListener(
            "input",
            handleQuantityInput
        );

        document.removeEventListener(
            "keydown",
            handleEscapeKey
        );

        NEXPAK_ONLINE_UI.eventsBound =
            false;

    }


    /* =====================================================
       123. UI ENGINE INITIALISATION
       ===================================================== */

    function initialiseNexpakOnlineUI() {

        if (
            NEXPAK_ONLINE_UI.initialised
        ) {

            uiLog(
                "UI engine already initialised."
            );

            return UI_API;

        }

        try {

            bindUIEvents();

            refreshCartIndicators();

            NEXPAK_ONLINE_UI.initialised =
                true;

            uiLog(
                "NEXPAK Online UI initialised."
            );

            return UI_API;

        } catch (error) {

            uiError(
                "UI initialisation failed.",
                error
            );

            return UI_API;

        }

    }


    /* =====================================================
       124. UI ENGINE DESTROY
       ===================================================== */

    function destroyNexpakOnlineUI() {

        unbindUIEvents();

        closeModal();

        closeCart();

        NEXPAK_ONLINE_UI.initialised =
            false;

        uiLog(
            "NEXPAK Online UI destroyed."
        );

    }


    /* =====================================================
       125. PART 8 API EXTENSION
       ===================================================== */

    UI_API.findKitById =
        findKitById;

    UI_API.addKitToCart =
        addKitToCart;

    UI_API.handleAddKit =
        handleAddKit;

    UI_API.handleViewKit =
        handleViewKit;

    UI_API.updateCartItemQuantity =
        updateCartItemQuantity;

    UI_API.removeCartItem =
        removeCartItem;

    UI_API.bindEvents =
        bindUIEvents;

    UI_API.unbindEvents =
        unbindUIEvents;

    UI_API.initialise =
        initialiseNexpakOnlineUI;

    UI_API.destroy =
        destroyNexpakOnlineUI;


    /* =====================================================
       126. PUBLIC INITIALISATION FUNCTION
       ===================================================== */

    window.initialiseNexpakOnlineUI =
        initialiseNexpakOnlineUI;


    /* =====================================================
       127. DOM READY STARTUP
       ===================================================== */

    function startOnlineUI() {

        initialiseNexpakOnlineUI();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startOnlineUI,
            {
                once: true
            }
        );

    } else {

        startOnlineUI();

    }


    /* =====================================================
       128. FINAL UI ENGINE STATUS
       ===================================================== */

    uiLog(
        "NEXPAK Online UI engine loaded successfully."
    );


    /* =====================================================
       END OF onlineui.js
       ===================================================== */

})();
 
