#!/usr/bin/env python3
"""
Setup and Configuration Guide for Nexpak Marketing Automation

This file contains instructions for setting up social media API tokens
and configuring automated daily marketing posts.
"""

SETUP_INSTRUCTIONS = """
╔══════════════════════════════════════════════════════════════════════════════╗
║           NEXPAK MARKETING AUTOMATION - SETUP GUIDE                          ║
║              Facebook, Instagram, TikTok Daily Marketing                     ║
╚══════════════════════════════════════════════════════════════════════════════╝

## STEP 1: FACEBOOK SETUP

1. Go to Facebook Business Manager: https://business.facebook.com
2. Create a Facebook Page for Nexpak Security Solutions (if not exists)
3. Create an App:
   - Navigate to Developers > My Apps > Create App
   - Choose "Business" as app type
   - Name: "Nexpak Security Marketing"
4. Generate Page Access Token:
   - Settings > Basic > Copy App ID and App Secret
   - Go to Tools > Graph API Explorer
   - Select your Page and generate Long-Lived Access Token (60 days)
   - Copy token to marketing.py: facebook_token = "YOUR_TOKEN"
5. Get your Page ID from page settings

## STEP 2: INSTAGRAM SETUP

1. Connect Instagram Business Account to Facebook Page:
   - Facebook Business Manager > Instagram Accounts
   - Link your Instagram Business Account
2. Use same Facebook token for Instagram posts
3. Ensure Instagram Business Account is connected to Facebook Page

## STEP 3: TIKTOK SETUP

1. Go to TikTok Business Center: https://business.tiktok.com
2. Create or connect TikTok Business Account
3. Apply for TikTok for Business API:
   - Dashboard > API > Apply for Access
   - Choose "Content Posting" permissions
4. Wait for approval (typically 2-3 business days)
5. Once approved:
   - Navigate to Developers section
   - Generate OAuth Access Token
   - Copy to marketing.py: tiktok_access_token = "YOUR_TOKEN"

## STEP 4: INSTALLATION & SETUP

1. Install required Python packages:
   ```bash
   pip install requests
   ```

2. Update marketing.py with your tokens:
   ```python
   self.facebook_token = "YOUR_FACEBOOK_PAGE_TOKEN"
   self.instagram_token = "YOUR_INSTAGRAM_BUSINESS_ACCOUNT_TOKEN"
   self.tiktok_access_token = "YOUR_TIKTOK_ACCESS_TOKEN"
   self.page_id = "YOUR_FACEBOOK_PAGE_ID"
   ```

3. Test the script:
   ```bash
   python marketing.py
   ```

## STEP 5: SCHEDULE DAILY EXECUTION

### On Windows (using Task Scheduler):
1. Open Task Scheduler
2. Create New Task > General
3. Trigger: Daily at 9:00 AM
4. Action: Start program
   - Program: python.exe
   - Arguments: C:\\path\\to\\marketing.py

### On Linux/Mac (using cron):
1. Open terminal
2. Edit crontab: crontab -e
3. Add line for daily execution:
   ```
   0 9 * * * cd /path/to/nexpak && python3 marketing.py
   ```

### On Cloud (GitHub Actions):
1. Create .github/workflows/marketing.yml
2. Schedule workflow to run daily
3. Add secrets for API tokens

## CONTENT STRATEGY

📱 POSTING SCHEDULE:
- Morning (9:00 AM): Product spotlight
- Afternoon (1:00 PM): Security tip
- Evening (6:00 PM): Engagement post

📊 CONTENT MIX:
- 40% Product Posts (CCTV, Fencing, Alarm, etc.)
- 30% Security Tips (Best practices, statistics)
- 20% Engagement (Polls, questions, contests)
- 10% Promotions (Special offers, discounts)

🎯 ENGAGEMENT BEST PRACTICES:
- Respond to comments within 2 hours
- Use 5-7 relevant hashtags per post
- Post consistently (3x daily minimum)
- Create video content for TikTok (15-60 sec)
- Share customer testimonials
- Include call-to-action in posts

## HASHTAG STRATEGY FOR SOUTH AFRICA

#CCTV #Security #SouthAfrica #SA #SecuritySolutions
#ElectricFencing #AlarmSystems #GateAutomation #SmartHome
#PropertyProtection #JohannesburgSecurity #CapeTownSecurity
#DurbanSecurity #SecurityTips #ProfessionalSecurity

## MONITORING & ANALYTICS

1. Facebook Analytics:
   - Business Suite > Pages > Insights
   - Track post reach, engagement, clicks

2. Instagram Insights:
   - Business profile > Insights
   - Monitor saves, shares, DM inquiries

3. TikTok Analytics:
   - Creator Center > Analytics
   - Track views, engagement, follower growth

## TROUBLESHOOTING

❌ "Access Token Expired"
→ Generate new token on Facebook Business Manager
→ Update in marketing.py
→ Restart script

❌ "Page ID not found"
→ Verify Page ID from Page Settings
→ Ensure App has permission to manage page

❌ "Instagram posting fails"
→ Ensure Instagram Account is Business Account
→ Verify connection to Facebook Page
→ Check token permissions

## ADVANCED: CONTENT CALENDAR EXPORT

The script generates a 30-day content calendar:

```bash
python marketing.py
cat marketing_calendar.json
```

Import into Google Calendar or your planning tool for visibility.

## MONTHLY REVIEW

Every month:
1. Review analytics across all platforms
2. Identify top-performing content types
3. Adjust content strategy accordingly
4. Plan promotional campaigns
5. Generate new product images/videos
6. Create customer testimonial content

## SECURITY BEST PRACTICES

⚠️ IMPORTANT: PROTECT YOUR API TOKENS
- Never commit tokens to GitHub
- Use environment variables:
  
  ```bash
  export FACEBOOK_TOKEN="your_token"
  export INSTAGRAM_TOKEN="your_token"
  export TIKTOK_TOKEN="your_token"
  ```

- Update marketing.py to read from environment:
  
  ```python
  import os
  self.facebook_token = os.getenv('FACEBOOK_TOKEN')
  ```

## SUPPORT & RESOURCES

- Facebook Graph API Docs: https://developers.facebook.com/docs
- Instagram Graph API: https://developers.facebook.com/docs/instagram-api
- TikTok Business API: https://open.tiktokapis.com
- Schedule cron jobs: https://crontab.guru

═══════════════════════════════════════════════════════════════════════════════

Questions? Contact info@nexpaksecurity.co.za

Last Updated: 2026-08-04
Version: 1.0
"""

if __name__ == "__main__":
    print(SETUP_INSTRUCTIONS)
