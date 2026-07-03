// ===== AI EMAIL DRAFTER =====

const config = require('../config');

class EmailDrafter {
  constructor() {
    this.products = require('../../shop-data').products;
    this.templates = this.initializeTemplates();
  }

  /**
   * Initialize email templates
   */
  initializeTemplates() {
    return {
      initial: `Dear {contact_name},

We hope this message finds you well!

I'm reaching out from NeXPak Solutions, your trusted partner for premium packaging and safety solutions in the Johannesburg region.

We specialize in providing high-quality products tailored to businesses like {company}:

🫧 Bubble Wrap - Multiple sizes (312mm to 1250mm) for maximum product protection
🧵 Pallet Wrap - Professional grade (10-25 microns) for secure palletizing
📦 Corrugated Boxes - Custom TVL and SWB configurations
📼 Premium Tapes - Clear, Buff, Filament, and Masking options
👔 PPE Safety Wear - Hard hats, gloves, overalls, boots, and more
💨 Void Fill Solutions - Polyworms in various sizes

Our clients in Benoni, Boksburg, Brakpan, and across Johannesburg trust us for:
✓ Competitive bulk pricing
✓ Fast delivery
✓ Premium quality assurance
✓ Personalized service

Would you be open to a brief 15-minute call to discuss how we can optimize your packaging costs?

Best regards,

NeXPak Solutions Team
info@nexpaksolutions.co.za
Johannesburg, South Africa

P.S. - New customers receive a 10% discount on their first order!`,

      followup_1: `Hi {contact_name},

Following up on our previous message - I wanted to share some specific ways NeXPak Solutions could benefit {company}:

💰 Cost Savings: Our bulk pricing can reduce your packaging expenses by 15-25%
⚡ Efficiency: Direct delivery to your location in {area}
📊 Reliability: 99.2% on-time delivery track record
🤝 Dedicated Support: Personal account manager for your business

Many similar businesses in your area have already switched to us:
• Warehouse operators
• Manufacturing facilities
• E-commerce distributors
• Logistics companies
• Construction firms

Would you like to see our current product catalog and pricing?

Let's connect!

Best regards,
NeXPak Solutions
info@nexpaksolutions.co.za`,

      followup_2: `Hello {contact_name},

⏰ Exclusive Time-Limited Offer for {company}:

🎁 BULK DISCOUNTS - This Week Only:
• Pallet Wrap: Buy 50+ rolls = 20% OFF
• Bubble Wrap: Buy 100+ rolls = 18% OFF
• Mixed Orders: 15% discount on orders over R10,000
• PPE Packages: Free delivery on orders over R5,000

📋 Quick Facts About NeXPak:
✓ 15+ years serving Johannesburg area
✓ ISO certified quality standards
✓ Same-day dispatch available
✓ Free consultation for corporate accounts

Our team is ready to create a customized solution for {company}'s packaging needs.

Reply with your inquiry or call our team directly!

Warm regards,
NeXPak Solutions Team
info@nexpaksolutions.co.za`,

      final: `Dear {contact_name},

🚨 Last Chance - Final Offer for {company}:

This is our final follow-up regarding NeXPak Solutions' premium packaging services.

If budget was a concern, here's what we offer:

💼 Flexible Solutions:
✓ Monthly subscriptions with 25% savings
✓ Starter packages for smaller operations
✓ Volume-based discounts
✓ Extended payment terms for qualified businesses

🎯 Why Choose NeXPak?
• Trusted by 500+ businesses in Johannesburg
• Consistent quality and reliability
• Professional account management
• Same-day turnaround available

We're committed to becoming your go-to packaging partner. Let's set up a brief call to discuss what works best for {company}.

I'll be monitoring for your response.

Best regards,

NeXPak Solutions
info@nexpaksolutions.co.za
Let's Get Started Today!

P.S. - If now isn't the right time, we'll check back in 3 months. We're here when you're ready!`
    };
  }

  /**
   * Draft personalized email based on lead data
   */
  async draftEmail(lead, sequenceNumber) {
    try {
      const emailConfig = config.emailCampaign.emails.find(e => e.sequence === sequenceNumber);
      
      if (!emailConfig) {
        throw new Error(`No email configuration for sequence ${sequenceNumber}`);
      }

      // Get template based on email type
      let template = this.templates[emailConfig.type === 'initial' ? 'initial' : `followup_${sequenceNumber - 2}`];
      if (emailConfig.type === 'final') {
        template = this.templates.final;
      }

      // AI-personalization based on lead data
      let emailBody = await this.personalizeEmail(template, lead, sequenceNumber);
      let subject = await this.personalizeSubject(emailConfig.subject, lead);

      return {
        to: lead.email,
        toName: lead.contact_name || 'Business Owner',
        subject: subject,
        body: emailBody,
        htmlBody: this.convertToHtml(emailBody),
        sequence: sequenceNumber,
        type: emailConfig.type,
        lead: lead
      };
    } catch (error) {
      console.error('[EmailDrafter] Error drafting email:', error.message);
      throw error;
    }
  }

  /**
   * Personalize email with lead-specific information
   */
  async personalizeEmail(template, lead, sequenceNumber) {
    let email = template;

    // Replace basic placeholders
    email = email.replace(/{contact_name}/g, lead.contact_name || 'there');
    email = email.replace(/{company}/g, lead.company || 'your business');
    email = email.replace(/{area}/g, lead.area || 'Johannesburg');

    // Add product recommendations based on business type
    if (lead.industry_keywords) {
      email = this.addProductRecommendations(email, lead.industry_keywords);
    }

    // Add industry-specific benefits
    email = this.addIndustrySpecificBenefits(email, lead.business_type);

    return email;
  }

  /**
   * Personalize subject line
   */
  async personalizeSubject(subject, lead) {
    subject = subject.replace(/{company}/g, lead.company || 'Your Business');
    subject = subject.replace(/{area}/g, lead.area || 'Johannesburg');
    
    return subject;
  }

  /**
   * Add product recommendations based on keywords
   */
  addProductRecommendations(email, keywords) {
    const productRecommendations = [];

    // Match keywords to products
    if (keywords.includes('pallet') || keywords.includes('warehouse')) {
      productRecommendations.push('🫧 Pallet Wrap (450mm x 400m)');
      productRecommendations.push('🧵 Bubble Wrap (multiple sizes)');
    }

    if (keywords.includes('shipping') || keywords.includes('e-commerce')) {
      productRecommendations.push('📦 Corrugated Boxes (TVL & SWB)');
      productRecommendations.push('🫧 Bubble Wrap');
    }

    if (keywords.includes('safety') || keywords.includes('ppe') || keywords.includes('construction')) {
      productRecommendations.push('👔 PPE Safety Wear');
      productRecommendations.push('🪖 Hard Hats & Safety Equipment');
    }

    if (keywords.includes('tape') || keywords.includes('adhesive')) {
      productRecommendations.push('📼 Specialized Tapes (Clear, Buff, Filament)');
    }

    if (productRecommendations.length > 0) {
      const recommendationText = `\n🎯 Recommended for your business:\n${productRecommendations.join('\n')}`;
      email = email.replace('Our clients', recommendationText + '\n\nOur clients');
    }

    return email;
  }

  /**
   * Add industry-specific benefits
   */
  addIndustrySpecificBenefits(email, businessType) {
    const industryBenefits = {
      'warehouse': 'Bulk storage and volume discounts available',
      'manufacturing': 'Custom specifications and technical support',
      'logistics': 'Fast turnaround and reliable delivery',
      'construction': 'Durable safety equipment and bulk PPE',
      'retail': 'Professional packaging for customer presentation',
      'ecommerce': 'Cost-effective shipping materials and void fill',
      'distribution': 'Volume pricing and dedicated account management'
    };

    const benefit = industryBenefits[businessType?.toLowerCase()] || null;
    if (benefit) {
      email = email.replace('Best regards', `✨ Special Benefit: ${benefit}\n\nBest regards`);
    }

    return email;
  }

  /**
   * Convert plain text email to HTML
   */
  convertToHtml(plainText) {
    let html = plainText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .split('\n')
      .map(line => `<p>${line}</p>`)
      .join('');

    // Style list items
    html = html.replace(/✓|✔|•|◾|🔹/g, '<li>');
    html = html.replace(/<li>/g, '<li style="margin-left: 20px;">');

    // Add CSS wrapper
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            p { margin: 10px 0; }
            li { list-style-type: none; margin: 8px 0; }
            strong { font-weight: bold; }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `;
  }
}

module.exports = EmailDrafter;