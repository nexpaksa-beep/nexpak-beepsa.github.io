document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const btnCalculate = document.getElementById('btnCalculateDelivery');
    const distanceInput = document.getElementById('distance-km');
    const addressInput = document.getElementById('shippingAddress');
    const deliveryDisplay = document.getElementById('chkDelivery');
    const deliveryStatus = document.getElementById('deliveryStatus');
    const deliveryInfo = document.getElementById('deliveryInfo');

    // CONFIGURATION CONSTANTS (Market-accurate South African local courier model)
    const BASE_BOOKING_FEE = 35.00;     // Covers driver dispatch and first few km
    const BASE_WEIGHT_LIMIT = 2.0;       // Max weight included in the base price (kg)
    const PER_KG_EXCESS_RATE = 4.50;     // Cost per kg over the base limit
    const FUEL_BUFFER_MULTIPLIER = 1.15; // 15% surcharge protection (Fuel, toll gates, VAT buffer)

    // Estimated distance map from Benoni (km) for common areas
    const areaDistanceMap = {
        'benoni': 5,
        'brakpan': 10,
        'boksburg': 12,
        'springs': 15,
        'kempton park': 15,
        'edenvale': 22,
        'germiston': 25,
        'bedfordview': 28,
        'johannesburg': 35,
        'jhb': 35,
        'randburg': 40,
        'sandton': 40,
        'midrand': 45,
        'centurion': 65,
        'pretoria': 75,
        'pta': 75
    };

    /**
     * Helper function to get a dynamic per-km rate based on the distance.
     * Prevents losing profit on long-distance return trips (e.g. Pretoria).
     */
    function getPerKmRate(km) {
        if (km <= 20) {
            return 5.50; // Inner East Rand
        } else if (km <= 50) {
            return 6.50; // JHB Central / Midrand
        } else {
            return 7.50; // Pretoria / Outlying areas
        }
    }

    /**
     * DYNAMIC INTEGRATION: 
     * You need to fetch the actual weight of the checkout cart items from your website.
     * Replace '0' with your actual system logic (e.g., parseFloat(document.getElementById('cartTotalWeight').value) || 0)
     */
    function getCartWeight() {
        // Fallback placeholder: Defaults to 1kg if your system hasn't calculated cart weight yet
        const weightElement = document.getElementById('cart-total-weight'); 
        return weightElement ? parseFloat(weightElement.value) || 1.0 : 1.0;
    }

    if (btnCalculate && deliveryDisplay) {
        btnCalculate.addEventListener('click', () => {
            let km = NaN;

            // 1. Check if a distance was typed manually first
            if (distanceInput && distanceInput.value.trim() !== '') {
                km = parseFloat(distanceInput.value);
            } 
            // 2. If not, try to auto-detect distance from the shipping address text
            else if (addressInput && addressInput.value.trim() !== '') {
                const addressText = addressInput.value.toLowerCase();
                
                // Search for matching city/suburb keywords in the address string
                for (const [area, estKm] of Object.entries(areaDistanceMap)) {
                    if (addressText.includes(area)) {
                        km = estKm;
                        break;
                    }
                }

                // If found via address, populate the distance box automatically so the user sees it
                if (!isNaN(km) && distanceInput) {
                    distanceInput.value = km;
                }
            }

            // Fallback validation if neither method yielded a distance
            if (isNaN(km) || km < 0) {
                alert('Please enter your delivery address above or specify the distance in kilometres from Benoni.');
                return;
            }

            // --- ADVANCED COURIER COST FORMULA ---
            const cartWeight = getCartWeight();
            const perKmRate = getPerKmRate(km);

            // Calculate Distance Cost
            const distanceCost = km * perKmRate;

            // Calculate Weight Surcharge (Only applies if cart exceeds 2kg base threshold)
            let weightCost = 0;
            if (cartWeight > BASE_WEIGHT_LIMIT) {
                const excessWeight = cartWeight - BASE_WEIGHT_LIMIT;
                weightCost = excessWeight * PER_KG_EXCESS_RATE;
            }

            // Add costs up and multiply by the 15% Fuel/Buffer multiplier
            let subtotalFee = BASE_BOOKING_FEE + distanceCost + weightCost;
            let finalFee = subtotalFee * FUEL_BUFFER_MULTIPLIER;

            // Local fallback safety catch
            if (km === 0) {
                finalFee = (BASE_BOOKING_FEE + weightCost) * FUEL_BUFFER_MULTIPLIER; 
            }

            // Update the delivery fee display in your summary card
            deliveryDisplay.textContent = 'R ' + finalFee.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            // Update status text with distance and weight context
            if (deliveryStatus) {
                deliveryStatus.textContent = `${km} km / ${cartWeight.toFixed(1)} kg calculated`;
            }

            // Update info box message
            if (deliveryInfo) {
                deliveryInfo.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #16a34a;"></i> Delivery calculated: ${km} km (${cartWeight.toFixed(1)} kg) from Benoni.`;
            }
        });
    }
});
                
