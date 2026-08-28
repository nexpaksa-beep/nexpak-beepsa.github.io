document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // =========================================================================
    // 1. CONFIGURATION & DOM ELEMENTS
    // =========================================================================
    const BASE_BOOKING_FEE = 35.00;     
    const BASE_WEIGHT_LIMIT = 2.0;       
    const PER_KG_EXCESS_RATE = 4.50;     
    const FUEL_BUFFER_MULTIPLIER = 1.15; 

    const areaDistanceMap = {
        'benoni': 5, 'brakpan': 10, 'boksburg': 12, 'springs': 15, 'kempton park': 15,
        'edenvale': 22, 'germiston': 25, 'bedfordview': 28, 'johannesburg': 35, 'jhb': 35,
        'randburg': 40, 'sandton': 40, 'midrand': 45, 'centurion': 65, 'pretoria': 75, 'pta': 75
    };

    // Calculator DOM Elements
    const btnCalculate = document.getElementById('btnCalculateDelivery');
    const distanceInput = document.getElementById('distance-km');
    const addressInput = document.getElementById('shippingAddress');
    const deliveryStatus = document.getElementById('deliveryStatus');
    const deliveryInfo = document.getElementById('deliveryInfo');

    // Financial Summary DOM Elements
    const subtotalEl = document.getElementById('chkSubtotal');
    const deliveryEl = document.getElementById('chkDelivery');
    const vatEl = document.getElementById('chkVat');
    const grandTotalEl = document.getElementById('chkGrandTotal');
    const itemsContainer = document.getElementById('checkoutOrderItems');

    // Global variable tracking current delivery cost state
    let activeDeliveryFee = 0;

    // =========================================================================
    // 2. RETRIEVE DATA & CALCULATE TOTAL CART WEIGHT
    // =========================================================================
    const cartTotal = parseFloat(localStorage.getItem('nexpak_cart_total')) || 0;
    const cartItems = JSON.parse(localStorage.getItem('nexpak_cart_items')) || [];

    /**
     * Loops through all cart items to extract and add up weights.
     * Assumes your products have a .weight (in kg) key. Defaults to 1kg per item if missing.
     */
    function calculateTotalCartWeight() {
        let totalWeight = 0;
        cartItems.forEach(item => {
            // Checks for 'weight' property. If your items don't have it yet, it acts as 1kg.
            const itemWeight = parseFloat(item.weight) || 1.0; 
            const quantity = parseInt(item.quantity) || 1;
            totalWeight += (itemWeight * quantity);
        });
        return totalWeight;
    }

    const cartWeight = calculateTotalCartWeight();
    console.log("Total computed cart weight:", cartWeight, "kg");

    // =========================================================================
    // 3. CORE LOGIC FUNCTIONS
    // =========================================================================
    function getPerKmRate(km) {
        if (km <= 20) return 5.50;
        if (km <= 50) return 6.50;
        return 7.50;
    }

    /**
     * Recalculates and updates the entire financial panel.
     * This avoids stagnant numbers when delivery changes.
     */
    function updateFinancialSummary() {
        const subtotal = cartTotal;
        const vat = subtotal * 0.15; // 15% Standard SA VAT
        const grandTotal = subtotal + vat + activeDeliveryFee;

        if (subtotalEl) {
            subtotalEl.textContent = 'R ' + subtotal.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        if (deliveryEl) {
            deliveryEl.textContent = 'R ' + activeDeliveryFee.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        if (vatEl) {
            vatEl.textContent = 'R ' + vat.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        if (grandTotalEl) {
            grandTotalEl.textContent = 'R ' + grandTotal.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
    }

    // =========================================================================
    // 4. EVENT LISTENERS & INITIALIZATION
    // =========================================================================
    if (btnCalculate) {
        btnCalculate.addEventListener('click', () => {
            let km = NaN;

            // Check manual input
            if (distanceInput && distanceInput.value.trim() !== '') {
                km = parseFloat(distanceInput.value);
            } 
            // Check string matching via address text
            else if (addressInput && addressInput.value.trim() !== '') {
                const addressText = addressInput.value.toLowerCase();
                for (const [area, estKm] of Object.entries(areaDistanceMap)) {
                    if (addressText.includes(area)) {
                        km = estKm;
                        break;
                    }
                }
                if (!isNaN(km) && distanceInput) {
                    distanceInput.value = km;
                }
            }

            if (isNaN(km) || km < 0) {
                alert('Please enter your delivery address above or specify the distance in kilometres from Benoni.');
                return;
            }

            // Execute delivery pricing formula
            const perKmRate = getPerKmRate(km);
            const distanceCost = km * perKmRate;

            let weightCost = 0;
            if (cartWeight > BASE_WEIGHT_LIMIT) {
                weightCost = (cartWeight - BASE_WEIGHT_LIMIT) * PER_KG_EXCESS_RATE;
            }

            let subtotalFee = BASE_BOOKING_FEE + distanceCost + weightCost;
            activeDeliveryFee = subtotalFee * FUEL_BUFFER_MULTIPLIER;

            if (km === 0) {
                activeDeliveryFee = (BASE_BOOKING_FEE + weightCost) * FUEL_BUFFER_MULTIPLIER; 
            }

            // Sync the fresh delivery fee back to the financial elements
            updateFinancialSummary();

            // Handle informational UI text changes
            if (deliveryStatus) {
                deliveryStatus.textContent = `${km} km / ${cartWeight.toFixed(1)} kg calculated`;
            }
            if (deliveryInfo) {
                deliveryInfo.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #16a34a;"></i> Delivery calculated: ${km} km (${cartWeight.toFixed(1)} kg) from Benoni.`;
            }
        });
    }

    // Populate checkout items list on load
    if (itemsContainer) {
        if (cartItems.length > 0) {
            itemsContainer.innerHTML = '';
            cartItems.forEach(item => {
                const itemRow = document.createElement('div');
                itemRow.className = 'summary-row';
                itemRow.innerHTML = `
                    <span>${item.name} ${item.quantity > 1 ? `x${item.quantity}` : ''}</span>
                    <span>R ${(item.price * (item.quantity || 1)).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                `;
                itemsContainer.appendChild(itemRow);
            });
        } else {
            itemsContainer.innerHTML = `
                <div class="summary-row"><span>Your cart is empty</span><span>R 0.00</span></div>
            `;
        }
    }

    // Run initial financial calculation on page load (Delivery starts at R0.00)
    updateFinancialSummary();
});
       
