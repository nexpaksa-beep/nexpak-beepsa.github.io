document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const btnCalculate = document.getElementById('btnCalculateDelivery');
    const distanceInput = document.getElementById('distance-km');
    const deliveryDisplay = document.getElementById('chkDelivery');
    const deliveryStatus = document.getElementById('deliveryStatus');
    const deliveryInfo = document.getElementById('deliveryInfo');

    if (btnCalculate && distanceInput && deliveryDisplay) {
        btnCalculate.addEventListener('click', () => {
            const km = parseFloat(distanceInput.value);

            if (isNaN(km) || km < 0) {
                alert('Please enter a valid distance in kilometres from Benoni.');
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
                deliveryStatus.textContent = `${km} km calculated`;
            }

            // Update info box message
            if (deliveryInfo) {
                deliveryInfo.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #16a34a;"></i> Delivery fee calculated successfully for ${km} km.`;
            }
        });
    }
});
