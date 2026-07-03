# NeXPak Solutions - AI Lead Generation System

## Overview

An intelligent B2B lead generation and automated email campaign system designed specifically for NeXPak Solutions. This system automatically:

- Generates 200 qualified leads daily from target areas
- Scrapes business websites for contact information
- Eliminates duplicate emails with intelligent deduplication
- Drafts personalized 4-email campaigns
- Sends emails with 25-second delays to avoid blocking
- Schedules sending for 8 AM Monday-Friday
- Tracks open rates, clicks, and responses

## Features

### 🎯 Intelligent Lead Generation
- AI-powered web scraping targeting packaging and PPE businesses
- Geographic focus: Benoni, Boksburg, Brakpan, Kempton Park, Jetpark, Germiston, and all Johannesburg areas
- Multiple search sources:
  - Google search results
  - Business directories (LocalSA, Superpages, 2FindLocal, Yellow Pages)
  - Social media (LinkedIn company pages)
  - Website email extraction

### 📧 Smart Email Campaigns
- **Email 1**: Initial introduction email (Hour 0)
- **Email 2**: First follow-up (48 hours later)
- **Email 3**: Exclusive offer email (96 hours)
- **Email 4**: Final opportunity email (144 hours)

### 🤖 AI Personalization
- Individualized subject lines
- Company-specific recommendations
- Industry-specific benefits
- Product suggestions based on business type

### ⏱️ Smart Scheduling
- Respects 25-second delay between emails
- Sends only Monday-Friday, 8 AM start time
- Timezone: Africa/Johannesburg
- Queue monitoring every 5 minutes

### 📊 Analytics & Tracking
- Email open rate tracking
- Click tracking
- Response logging
- Daily statistics
- Campaign performance metrics

## Installation

### Requirements
- Node.js >= 14.0.0
- npm >= 6.0.0
- SQLite3

### Setup

```bash
# 1. Navigate to lead-gen directory
cd lead-gen

# 2. Install dependencies
npm install

# 3. Create .env file from example
cp .env.example .env

# 4. Update .env with your configuration
# Add SendGrid API key or SMTP credentials
# Update sender email to info@nexpaksolutions.co.za

# 5. Initialize database
npm run database-init

# 6. Start the system
npm start
```

## Configuration

### Email Provider Setup

#### Option A: SendGrid (Recommended)
1. Create SendGrid account at https://sendgrid.com
2. Generate API key
3. Add to `.env`: `EMAIL_API_KEY=your_key`

#### Option B: Gmail SMTP
1. Enable "Less secure app access" or use App Password
2. Add to `.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

### Key Configuration Files

- `config.js` - Main system configuration
- `.env` - Environment variables (secrets)
- `package.json` - Dependencies

## System Architecture

```
lead-gen/
├── main.js                 # Main orchestrator
├── config.js              # System configuration
├── package.json           # Dependencies
├── .env.example           # Environment template
├── services/
│   ├── lead-scraper.js   # Web scraping engine
│   ├── email-drafter.js  # AI email personalization
│   └── email-sender.js   # Email delivery & scheduling
├── db/
│   ├── database.js       # SQLite management
│   └── leads.db          # Lead database (created on first run)
└── README.md             # This file
```

## Database Schema

### leads table
```sql
id, company, contact_name, email (UNIQUE), phone, website, 
area, business_type, industry_keywords, source, scraped_at, 
added_to_campaign, campaign_started_at, last_contact_at, status
```

### email_queue table
```sql
id, lead_id, to_email, to_name, subject, body, html_body,
sequence, email_type, send_time, status, sent_at, opened,
opened_at, clicked, clicked_at, bounced, created_at
```

### responses table
```sql
id, lead_id, email_id, response_type, response_text, received_at
```

### daily_stats table
```sql
date, leads_generated, emails_sent, emails_opened,
emails_clicked, responses_received
```

## Usage

### Start the System
```bash
npm start
```

### Run in Development
```bash
npm run dev
```

### Manual Lead Scraping
```bash
npm run scrape
```

### Manual Email Sending
```bash
npm run send-emails
```

## Email Templates

The system uses 4 intelligent email templates:

1. **Initial Email**: Introduces NeXPak and products
2. **Followup 1**: Highlights cost savings and benefits
3. **Followup 2**: Exclusive time-limited offer
4. **Final Email**: Last chance with flexible solutions

All emails are personalized with:
- Contact name
- Company name
- Area/location
- Industry-specific recommendations
- Product suggestions based on business type

## Target Areas

The system focuses on these Johannesburg region areas:
- Benoni
- Boksburg
- Brakpan
- Kempton Park
- Jetpark
- Germiston
- Johannesburg (greater area)
- Alberton
- Springs
- Daveyton
- Nigel
- Edenvale
- Birchleigh
- Terawatt

## Search Keywords

Scrapers search for businesses using keywords:
- pallet wrap
- bubble wrap
- packaging
- protective wrap
- shipping supplies
- warehouse
- logistics
- safety equipment
- PPE
- safety wear
- corrugated boxes
- pallet strapping
- tape
- packaging materials

## Troubleshooting

### "Database connection failed"
- Ensure SQLite3 is installed: `npm install sqlite3`
- Check write permissions in `db/` directory

### "Email sending failed"
- Verify API key or SMTP credentials in `.env`
- Check email rate limits (SendGrid: 100 emails/day on free tier)
- Ensure 25-second delays are respected

### "No leads found"
- Check internet connection
- Verify keywords and areas in `config.js`
- Review scraper timeout settings
- Check for blocking (may need proxy)

### "Emails not sending at 8 AM"
- Verify timezone is set correctly: `Africa/Johannesburg`
- Check system time on server
- Review cron job logs

## Performance Tips

1. **Use SendGrid** instead of SMTP for better deliverability
2. **Start with 50 leads/day** and scale up gradually
3. **Monitor email bounce rates** - adjust sendgrid filtering
4. **Use proxy rotation** if scraping too aggressively
5. **Run on a dedicated server** for 24/7 operation

## Security Considerations

- **Never commit `.env` file** to version control
- **Use environment variables** for all secrets
- **Rotate API keys** monthly
- **Monitor for abuse** - unexpected spike in bounces
- **Respect CAN-SPAM** - include unsubscribe option
- **Use HTTPS** if running via web interface

## Monitoring & Analytics

View system statistics:
```javascript
const { EmailSender } = require('./services/email-sender');
const sender = new EmailSender();
const stats = await sender.getStatistics();
console.log(stats);
```

Expected stats:
- Total emails sent
- Open rate (typical: 15-25%)
- Click rate (typical: 2-5%)
- Response rate (typical: 0.5-2%)

## Support & Maintenance

### Daily Maintenance Checklist
- [ ] Check system logs for errors
- [ ] Verify 200 leads were generated
- [ ] Confirm emails sent at 8 AM
- [ ] Monitor bounce rates
- [ ] Review campaign responses

### Weekly Maintenance
- [ ] Back up database
- [ ] Review email performance
- [ ] Update blacklist of non-responsive leads
- [ ] Adjust targeting if needed

### Monthly Maintenance
- [ ] Rotate API keys
- [ ] Review and optimize email templates
- [ ] Analyze top-performing campaigns
- [ ] Update product database from shop-data.js

## Legal Compliance

- Complies with CAN-SPAM Act
- Includes unsubscribe options
- Respects bounce notifications
- Data stored securely locally
- Privacy-first approach

## Future Enhancements

- [ ] AI response analysis for hot leads
- [ ] Dynamic pricing based on lead value
- [ ] SMS follow-ups
- [ ] WhatsApp integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] CRM integration
- [ ] Sentiment analysis

## Contact

**NeXPak Solutions**
Email: info@nexpaksolutions.co.za
Location: Johannesburg, South Africa

---

**Last Updated**: 2026-07-03
**Version**: 1.0.0