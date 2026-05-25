const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

class EmailService {
    constructor() {
        this.transporter = null;
        this.initializeTransport();
    }
    
    initializeTransport() {
        const service = process.env.EMAIL_SERVICE;
        
        if (service === 'sendgrid') {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        } else if (service === 'gmail') {
            this.transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
        } else {
            // Custom SMTP
            this.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            });
        }
    }
    
    async sendEmail(options) {
        try {
            if (process.env.EMAIL_SERVICE === 'sendgrid') {
                return await this.sendViaSetGrid(options);
            } else {
                return await this.transporter.sendMail(options);
            }
        } catch (error) {
            console.error('Email send error:', error);
            throw error;
        }
    }
    
    async sendViaSetGrid(options) {
        const msg = {
            to: options.to,
            from: process.env.EMAIL_USER,
            subject: options.subject,
            html: options.html,
            text: options.text
        };
        
        return await sgMail.send(msg);
    }
    
    async sendWelcomeEmail({ to, name, company }) {
        const welcomeHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 2rem; text-align: center; border-radius: 8px 8px 0 0;">
                    <h1>Welcome to Nexpak Solutions!</h1>
                </div>
                
                <div style="padding: 2rem; background-color: #f9fafb; border-radius: 0 0 8px 8px;">
                    <p>Hi ${name},</p>
                    
                    <p>Thank you for subscribing to our email list! You're now part of the Nexpak Solutions community.</p>
                    
                    <p>Here's what you can expect:</p>
                    <ul style="color: #333;">
                        <li>📧 Weekly newsletters with industry insights</li>
                        <li>💰 Exclusive discounts and special offers</li>
                        <li>🚀 First access to new products</li>
                        <li>📰 Latest packaging news and trends</li>
                    </ul>
                    
                    <h3 style="color: #2563eb;">Automated Campaigns You'll Receive:</h3>
                    <ul style="color: #555;">
                        <li><strong>Monday Deals:</strong> Exclusive weekly discounts</li>
                        <li><strong>Wednesday Updates:</strong> New product announcements</li>
                        <li><strong>Friday Flash Sales:</strong> End-of-week clearance offers</li>
                    </ul>
                    
                    <p style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #ddd;">
                        <strong>Quick Links:</strong><br>
                        <a href="https://nexpaksa-beep.github.io/pricelist.html" style="color: #2563eb; text-decoration: none;">View Price List</a> | 
                        <a href="https://nexpaksa-beep.github.io/products.html" style="color: #2563eb; text-decoration: none;">Browse Products</a> |
                        <a href="https://nexpaksa-beep.github.io/contact.html" style="color: #2563eb; text-decoration: none;">Contact Us</a>
                    </p>
                    
                    <p style="color: #888; font-size: 0.9em; margin-top: 2rem;">
                        Questions? Reply to this email or contact us at <a href="mailto:nexpaksa@outlook.com">nexpaksa@outlook.com</a>
                    </p>
                    
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 2rem 0;">
                    
                    <p style="color: #666; font-size: 0.85em; text-align: center;">
                        Nexpak Solutions PTY Ltd | South Africa<br>
                        <a href="https://nexpaksa-beep.github.io" style="color: #2563eb; text-decoration: none;">Visit our website</a>
                    </p>
                </div>
            </div>
        `;
        
        return await this.sendEmail({
            to,
            subject: `Welcome to Nexpak Solutions, ${name}!`,
            html: welcomeHtml,
            text: `Welcome to Nexpak Solutions! You're now subscribed to our email list.`
        });
    }
    
    async sendCampaignEmail({ to, subject, html, campaignId }) {
        return await this.sendEmail({
            to,
            subject,
            html,
            headers: {
                'X-Campaign-ID': campaignId
            }
        });
    }
    
    async sendBulkCampaign({ recipients, subject, html, campaignId }) {
        const results = [];
        
        for (const recipient of recipients) {
            try {
                const result = await this.sendCampaignEmail({
                    to: recipient.email,
                    subject,
                    html: html.replace('{name}', recipient.name || 'valued customer'),
                    campaignId
                });
                results.push({
                    email: recipient.email,
                    success: true,
                    messageId: result.messageId || result.id
                });
            } catch (error) {
                results.push({
                    email: recipient.email,
                    success: false,
                    error: error.message
                });
            }
        }
        
        return results;
    }
}

module.exports = new EmailService();
