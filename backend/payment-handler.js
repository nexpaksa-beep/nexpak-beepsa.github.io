// ===== NEXPAK PAYMENT PROCESSING API =====
// This is a Node.js/Express backend handler
// Deploy this to a serverless function (AWS Lambda, Vercel, Netlify) or your own server

const stripe = require('stripe')('sk_live_YOUR_STRIPE_SECRET_KEY');
const nodemailer = require('nodemailer');

// Email service configuration
const emailTransporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
        user: 'orders@nexpaksolutions.co.za',
        pass: 'your-app-password' // Use app-specific password, not your main password
    }
});

/**
 * Process Stripe Payment
 * POST /api/process-payment
 */
exports.processPayment = async (req, res) => {
    try {
        const {
            stripeToken,
            amount,
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            postalCode,
            items,
            paymentMethod
        } = req.body;

        // Validate input
        if (!stripeToken || !amount || !email || !items) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Verify minimum amount
        if (amount < 1000) { // R10 minimum
            return res.status(400).json({ error: 'Order amount too small' });
        }

        // Create charge with Stripe
        const charge = await stripe.charges.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'zar',
            source: stripeToken,
            description: `Nexpak Order - ${firstName} ${lastName}`,
            metadata: {
                customerEmail: email,
                phone: phone,
                address: address,
                city: city,
                postalCode: postalCode
            }
        });

        if (charge.status !== 'succeeded') {
            return res.status(400).json({ error: 'Payment failed', charge: charge });
        }

        // Generate order number
        const orderNumber = `ORD-${Date.now()}`;

        // Send confirmation email to customer
        await sendCustomerConfirmationEmail(
            email,
            orderNumber,
            firstName,
            lastName,
            items,
            amount,
            address,
            city
        );

        // Send notification email to admin
        await sendAdminNotificationEmail(
            orderNumber,
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            postalCode,
            items,
            amount,
            charge
        );

        // Save order to database (if you have one)
        // await saveOrderToDatabase({
        //     orderNumber,
        //     customerEmail: email,
        //     ...
        // });

        return res.status(200).json({
            success: true,
            orderNumber: orderNumber,
            transactionId: charge.id,
            message: 'Payment processed successfully'
        });

    } catch (error) {
        console.error('Payment processing error:', error);
        return res.status(500).json({
            error: 'Payment processing failed',
            message: error.message
        });
    }
};

/**
 * Send Confirmation Email to Customer
 */
async function sendCustomerConfirmationEmail(email, orderNumber, firstName, lastName, items, total, address, city) {
    const itemsList = items.map(item =>
        `<tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">R${(item.quantity * item.price).toFixed(2)}</td>
        </tr>`
    ).join('');

    const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #0f172a; color: white; padding: 20px; text-align: center; }
                .content { background: #f8fafc; padding: 20px; }
                .order-details { background: white; padding: 15px; margin: 20px 0; border-radius: 8px; }
                table { width: 100%; }
                .total-row { font-weight: bold; font-size: 16px; color: #2563eb; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Order Confirmation</h1>
                    <p>Thank you for your purchase!</p>
                </div>
                
                <div class="content">
                    <p>Hi ${firstName},</p>
                    
                    <p>Your order has been confirmed and payment has been received. Here are your order details:</p>
                    
                    <div class="order-details">
                        <h2 style="color: #0f172a; margin-top: 0;">Order #${orderNumber}</h2>
                        <p><strong>Order Date:</strong> ${new Date().toLocaleDateString('en-ZA')}</p>
                        <p><strong>Delivery Address:</strong><br>
                        ${address}<br>
                        ${city}<br>
                        South Africa</p>
                    </div>
                    
                    <h3>Order Items:</h3>
                    <table>
                        <thead style="background: #e2e8f0;">
                            <tr>
                                <th style="text-align: left; padding: 10px;">Product</th>
                                <th style="text-align: center; padding: 10px;">Quantity</th>
                                <th style="text-align: right; padding: 10px;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsList}
                            <tr class="total-row">
                                <td colspan="2" style="padding: 10px; text-align: right;">TOTAL:</td>
                                <td style="padding: 10px; text-align: right;">R${total.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                        <p><strong>What's Next?</strong></p>
                        <ul style="margin: 10px 0;">
                            <li>Your order is being processed</li>
                            <li>You'll receive a shipping notification with tracking info</li>
                            <li>Estimated delivery: 2-5 business days (depending on location)</li>
                            <li>Contact us at info@nexpaksolutions.co.za if you have questions</li>
                        </ul>
                    </div>
                    
                    <p>If you need to contact us, reach out via:</p>
                    <ul>
                        <li>Email: info@nexpaksolutions.co.za</li>
                        <li>WhatsApp: +27 836 308 249</li>
                        <li>Phone: +27 836 308 249</li>
                    </ul>
                    
                    <p>Thank you for choosing Nexpak Solutions!</p>
                </div>
                
                <div class="footer">
                    <p>&copy; 2024-2026 Nexpak Solutions PTY Ltd | All rights reserved</p>
                    <p>Trusted packaging supplier across South Africa</p>
                </div>
            </div>
        </body>
        </html>
    `;

    await emailTransporter.sendMail({
        from: 'orders@nexpaksolutions.co.za',
        to: email,
        subject: `Order Confirmation - #${orderNumber}`,
        html: htmlTemplate
    });
}

/**
 * Send Admin Notification Email
 */
async function sendAdminNotificationEmail(orderNumber, firstName, lastName, email, phone, address, city, postalCode, items, total, charge) {
    const itemsList = items.map(item =>
        `<tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.id}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">R${item.price.toFixed(2)}</td>
        </tr>`
    ).join('');

    const adminHtml = `
        <h2>New Order Received - #${orderNumber}</h2>
        
        <h3>Customer Information:</h3>
        <ul>
            <li><strong>Name:</strong> ${firstName} ${lastName}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Address:</strong> ${address}, ${city}, ${postalCode}</li>
        </ul>
        
        <h3>Order Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <thead style="background: #0f172a; color: white;">
                <tr>
                    <th style="text-align: left; padding: 10px;">SKU</th>
                    <th style="text-align: left; padding: 10px;">Product</th>
                    <th style="text-align: center; padding: 10px;">Qty</th>
                    <th style="text-align: right; padding: 10px;">Unit Price</th>
                </tr>
            </thead>
            <tbody>
                ${itemsList}
            </tbody>
        </table>
        
        <p><strong>Order Total: R${total.toFixed(2)}</strong></p>
        
        <h3>Payment Information:</h3>
        <ul>
            <li><strong>Transaction ID:</strong> ${charge.id}</li>
            <li><strong>Card Last 4:</strong> ${charge.payment_method_details?.card?.last4 || 'N/A'}</li>
            <li><strong>Status:</strong> ${charge.status.toUpperCase()}</li>
        </ul>
        
        <p>Login to your admin panel to process and ship this order.</p>
    `;

    await emailTransporter.sendMail({
        from: 'orders@nexpaksolutions.co.za',
        to: 'orders@nexpaksolutions.co.za',
        subject: `[NEW ORDER] #${orderNumber} - R${total.toFixed(2)}`,
        html: adminHtml
    });
}

/**
 * Process PayPal Payment
 * POST /api/process-paypal
 */
exports.processPayPal = async (req, res) => {
    try {
        const { paypalOrderId, items, email, firstName, lastName } = req.body;

        // Verify PayPal order (you need PayPal SDK integrated)
        // This is a placeholder - implement actual PayPal integration

        const orderNumber = `ORD-${Date.now()}`;

        // Send confirmation emails
        await sendCustomerConfirmationEmail(email, orderNumber, firstName, lastName, items, 0, '', '');

        return res.status(200).json({
            success: true,
            orderNumber: orderNumber,
            message: 'PayPal payment processed'
        });

    } catch (error) {
        console.error('PayPal processing error:', error);
        return res.status(500).json({ error: 'PayPal processing failed' });
    }
};

/**
 * Process EFT Payment
 * POST /api/process-eft
 */
exports.processEFT = async (req, res) => {
    try {
        const { email, firstName, lastName, items, total } = req.body;

        const orderNumber = `ORD-${Date.now()}`;

        // EFT details to send to customer
        const eftDetails = {
            accountHolder: 'Nexpak Solutions PTY Ltd',
            bankName: 'Standard Bank',
            accountNumber: '*** YOUR ACCOUNT ***', // Replace with actual
            branchCode: '*** YOUR BRANCH ***', // Replace with actual
            reference: `${lastName}-${orderNumber}`
        };

        // Send EFT payment instructions
        await sendEFTInstructions(email, firstName, eftDetails, items, total, orderNumber);

        return res.status(200).json({
            success: true,
            orderNumber: orderNumber,
            eftDetails: eftDetails,
            message: 'EFT payment instructions sent'
        });

    } catch (error) {
        console.error('EFT processing error:', error);
        return res.status(500).json({ error: 'EFT processing failed' });
    }
};

/**
 * Send EFT Payment Instructions
 */
async function sendEFTInstructions(email, firstName, eftDetails, items, total, orderNumber) {
    const itemsList = items.map(item =>
        `<tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">R${(item.quantity * item.price).toFixed(2)}</td>
        </tr>`
    ).join('');

    const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #0f172a; color: white; padding: 20px; text-align: center; }
                .eft-box { background: #fee2e2; border: 2px solid #dc2626; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .eft-detail { margin: 10px 0; font-size: 16px; }
                code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Payment Instructions - Bank Transfer (EFT)</h1>
                </div>
                
                <div style="background: #f8fafc; padding: 20px;">
                    <p>Hi ${firstName},</p>
                    
                    <p>Thank you for your order! We're ready to process your purchase once payment is received.</p>
                    
                    <h2>Your Order: #${orderNumber}</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead style="background: #e2e8f0;">
                            <tr>
                                <th style="text-align: left; padding: 10px;">Product</th>
                                <th style="text-align: center; padding: 10px;">Qty</th>
                                <th style="text-align: right; padding: 10px;">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsList}
                            <tr style="font-weight: bold; color: #2563eb;">
                                <td colspan="2" style="padding: 10px; text-align: right;">TOTAL:</td>
                                <td style="padding: 10px; text-align: right;">R${total.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div class="eft-box">
                        <h3 style="margin-top: 0; color: #dc2626;">Bank Transfer Details:</h3>
                        <div class="eft-detail"><strong>Account Holder:</strong> <code>${eftDetails.accountHolder}</code></div>
                        <div class="eft-detail"><strong>Bank:</strong> <code>${eftDetails.bankName}</code></div>
                        <div class="eft-detail"><strong>Account Number:</strong> <code>${eftDetails.accountNumber}</code></div>
                        <div class="eft-detail"><strong>Branch Code:</strong> <code>${eftDetails.branchCode}</code></div>
                        <div class="eft-detail"><strong>Reference:</strong> <code>${eftDetails.reference}</code></div>
                        <div class="eft-detail"><strong>Amount:</strong> <code>R${total.toFixed(2)}</code></div>
                    </div>
                    
                    <p><strong>Please use the reference number when making your transfer so we can match your payment to this order.</strong></p>
                    
                    <p>Once we receive your payment, your order will be shipped immediately.</p>
                    
                    <p>Questions? Contact us:<br>
                    Email: info@nexpaksolutions.co.za<br>
                    WhatsApp: +27 836 308 249</p>
                </div>
            </div>
        </body>
        </html>
    `;

    await emailTransporter.sendMail({
        from: 'orders@nexpaksolutions.co.za',
        to: email,
        subject: `Payment Instructions for Order #${orderNumber}`,
        html: htmlTemplate
    });
}

module.exports = {
    processPayment: exports.processPayment,
    processPayPal: exports.processPayPal,
    processEFT: exports.processEFT
};
