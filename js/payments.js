document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // =========================================================================
    // PAYFAST CONFIGURATION
    // Insert your approved Payfast credentials below
    // =========================================================================
    const PAYFAST_CONFIG = {
        merchant_id: '36692313',   // Replace with your Live Merchant ID
        merchant_key: 'cmvr2h6hmum6e', // Replace with your Live Merchant Key
        sandboxMode: false,               // Set to true if testing with sandbox.payfast.co.za
        return_url: window.location.origin + '/success.html', // Redirect after successful payment
        cancel_url: window.location.origin + '/checkout.html'  // Redirect if payment cancelled
    };

    // =========================================================================
    // SUBMIT TO PAYFAST
    // =========================================================================
    function processPayfastPayment(orderData) {
        const form = document.getElementById('payfastCheckoutForm');
        if (!form) {
            alert('Payment gateway initialization failed. Form element missing.');
            return;
        }

        // Set endpoint based on mode
        form.action = PAYFAST_CONFIG.sandboxMode 
            ? 'https://sandbox.payfast.co.za/eng/process' 
            : 'https://www.payfast.co.za/eng/process';

        // Populate form fields
        document.getElementById('pf_merchant_id').value = PAYFAST_CONFIG.merchant_id;
        document.getElementById('pf_merchant_key').value = PAYFAST_CONFIG.merchant_key;
        document.getElementById('pf_return_url').value = PAYFAST_CONFIG.return_url;
        document.getElementById('pf_cancel_url').value = PAYFAST_CONFIG.cancel_url;
        
        document.getElementById('pf_m_payment_id').value = orderData.orderReference;
        document.getElementById('pf_amount').value = Number(orderData.totals.grandTotal).toFixed(2);
        document.getElementById('pf_item_name').value = `NexPak Order ${orderData.orderReference}`;
        
        document.getElementById('pf_name_first').value = orderData.customer.name;
        document.getElementById('pf_email').value = orderData.customer.email;
        document.getElementById('pf_cell').value = orderData.customer.phone;

        // Submit the form to redirect to Payfast
        form.submit();
    }

    // Expose function globally for checkout.js
    window.NexpakPayment = {
        processPayfastPayment: processPayfastPayment
    };

    console.log('Nexpak Payment Controller (PayFast) loaded successfully.');
});
