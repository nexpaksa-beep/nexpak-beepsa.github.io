document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const btnCalculate = document.getElementById('btnCalculateDelivery');
    const distanceInput = document.getElementById('distance-km');
    const addressInput = document.getElementById('shippingAddress');
    const deliveryDisplay = document.getElementById('chkDelivery');
    const deliveryStatus = document.getElementById('deliveryStatus');
    const deliveryInfo = document.getElementById('deliveryInfo');

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

            // Delivery formula: Base fee (R50) + R8 per km from Benoni
            let fee = 50 + (km * 8);
            if (km === 0) {
                fee = 50; // Local Benoni base fee
            }

            // Update the delivery fee display in your summary card
            deliveryDisplay.textContent = 'R ' + fee.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            // Update status text
            if (deliveryStatus) {
                deliveryStatus.textContent = `${km} km estimated`;
            }

            // Update info box message
            if (deliveryInfo) {
                deliveryInfo.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #16a34a;"></i> Delivery fee calculated successfully (${km} km from Benoni).`;
            }
        });
    }
});
            
