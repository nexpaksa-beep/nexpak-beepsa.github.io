// ===== AI-POWERED LEAD SCRAPER =====

const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const Database = require('../db/database');
const config = require('../config');
const EmailDrafter = require('./email-drafter');

class LeadScraper {
  constructor() {
    this.db = new Database();
    this.emailDrafter = new EmailDrafter();
    this.scrapedLeads = [];
    this.processedEmails = new Set();
  }

  /**
   * Main function to generate 200 daily leads
   */
  async generateDailyLeads() {
    console.log(`[${new Date().toISOString()}] Starting daily lead generation...`);
    
    try {
      const existingEmails = await this.db.getAllEmails();
      this.processedEmails = new Set(existingEmails);

      let leadCount = 0;
      const maxRetries = 3;

      for (const area of config.targetAreas) {
        if (leadCount >= config.leadGeneration.dailyLeadTarget) break;

        for (const keyword of config.leadGeneration.keywords) {
          if (leadCount >= config.leadGeneration.dailyLeadTarget) break;

          const searchQuery = `${keyword} ${area} South Africa`;
          console.log(`[Scraper] Searching: ${searchQuery}`);

          const leads = await this.scrapeLeads(searchQuery, maxRetries);
          const newLeads = await this.filterDuplicates(leads);
          
          for (const lead of newLeads) {
            if (leadCount >= config.leadGeneration.dailyLeadTarget) break;
            
            const saved = await this.db.saveLead(lead);
            if (saved) {
              this.scrapedLeads.push(lead);
              this.processedEmails.add(lead.email);
              leadCount++;
              console.log(`[Scraper] Lead ${leadCount}: ${lead.company} (${lead.email})`);
            }
          }
        }
      }

      console.log(`[${new Date().toISOString()}] Lead generation complete. Total leads: ${leadCount}`);
      return this.scrapedLeads;
    } catch (error) {
      console.error('[LeadScraper] Error:', error.message);
      throw error;
    }
  }

  /**
   * Scrape leads from Google search results
   */
  async scrapeLeads(query, retries = 3) {
    const leads = [];
    
    try {
      // Using multiple search strategies
      const googleLeads = await this.searchGoogle(query);
      const businessDirectoryLeads = await this.searchBusinessDirectories(query);
      const socialMediaLeads = await this.searchSocialMedia(query);

      const allLeads = [...googleLeads, ...businessDirectoryLeads, ...socialMediaLeads];

      for (const lead of allLeads) {
        if (lead.email && this.validateEmail(lead.email)) {
          leads.push(lead);
        }
      }

      return leads;
    } catch (error) {
      if (retries > 0) {
        console.log(`[Scraper] Retrying... (${retries} attempts left)`);
        await this.delay(2000);
        return this.scrapeLeads(query, retries - 1);
      }
      console.error(`[Scraper] Failed to scrape: ${query}`);
      return [];
    }
  }

  /**
   * Search Google for business websites
   */
  async searchGoogle(query) {
    const leads = [];
    
    try {
      // Using SerpAPI or similar service for reliable Google results
      const response = await axios.get('https://www.google.com/search', {
        params: {
          q: query,
          num: 10
        },
        headers: {
          'User-Agent': config.scraper.userAgent
        },
        timeout: config.scraper.timeout
      });

      const $ = cheerio.load(response.data);
      
      $('a[href]').each((index, element) => {
        const href = $(element).attr('href');
        const text = $(element).text();
        
        if (href && (href.includes('http') || href.includes('www'))) {
          leads.push({
            website: href,
            company: text || 'Unknown',
            source: 'google',
            scrapedAt: new Date()
          });
        }
      });

      // Extract emails from found websites
      for (const lead of leads) {
        const emails = await this.extractEmailsFromWebsite(lead.website);
        if (emails.length > 0) {
          lead.email = emails[0];
          lead.emails = emails;
        }
      }

      return leads.filter(l => l.email);
    } catch (error) {
      console.error('[Google Search] Error:', error.message);
      return [];
    }
  }

  /**
   * Search business directories
   */
  async searchBusinessDirectories(query) {
    const leads = [];
    const directories = [
      'https://www.localsa.co.za',
      'https://www.superpages.co.za',
      'https://www.2findlocal.co.za',
      'https://www.yellowpages.co.za'
    ];

    for (const directory of directories) {
      try {
        const searchUrl = `${directory}/search?q=${encodeURIComponent(query)}`;
        const response = await axios.get(searchUrl, {
          headers: { 'User-Agent': config.scraper.userAgent },
          timeout: config.scraper.timeout
        });

        const $ = cheerio.load(response.data);
        
        // Parse business listings
        $('.business-listing, .company-card, [data-business]').each((index, element) => {
          const company = $(element).find('.business-name, .company-name, h2').text().trim();
          const email = $(element).find('.email, [data-email]').text().trim();
          const phone = $(element).find('.phone, [data-phone]').text().trim();
          const website = $(element).find('a[href*="http"]').attr('href');

          if (company && (email || phone)) {
            leads.push({
              company: company.substring(0, 100),
              email: email || null,
              phone: phone || null,
              website: website || null,
              source: 'business_directory',
              scrapedAt: new Date()
            });
          }
        });
      } catch (error) {
        console.log(`[Directory Scrape] Skipped ${directory}: ${error.message}`);
      }
    }

    return leads.filter(l => l.email && this.validateEmail(l.email));
  }

  /**
   * Search social media for business contacts
   */
  async searchSocialMedia(query) {
    const leads = [];
    
    try {
      // LinkedIn company search
      const linkedInQuery = `site:linkedin.com "${query}" company`;
      const response = await axios.get('https://www.google.com/search', {
        params: {
          q: linkedInQuery,
          num: 5
        },
        headers: { 'User-Agent': config.scraper.userAgent },
        timeout: config.scraper.timeout
      });

      const $ = cheerio.load(response.data);
      
      $('a[href*="linkedin.com/company"]').each((index, element) => {
        const href = $(element).attr('href');
        const text = $(element).text();
        
        leads.push({
          company: text,
          website: href,
          source: 'linkedin',
          scrapedAt: new Date()
        });
      });
    } catch (error) {
      console.log('[Social Media Scrape] Note:', error.message);
    }

    return leads;
  }

  /**
   * Extract emails from website
   */
  async extractEmailsFromWebsite(url) {
    const emails = [];
    
    try {
      if (!url.startsWith('http')) {
        url = 'https://' + url;
      }

      const response = await axios.get(url, {
        headers: { 'User-Agent': config.scraper.userAgent },
        timeout: config.scraper.timeout,
        maxRedirects: 3
      });

      const html = response.data;
      
      // Regex patterns for email extraction
      const emailPatterns = [
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi,
        /mailto:([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
      ];

      for (const pattern of emailPatterns) {
        let match;
        while ((match = pattern.exec(html)) !== null) {
          const email = match[1].toLowerCase();
          if (this.validateEmail(email) && !emails.includes(email)) {
            emails.push(email);
          }
        }
      }

      return emails.slice(0, 3); // Return top 3 emails
    } catch (error) {
      console.log(`[Email Extraction] Could not extract emails from ${url}`);
      return [];
    }
  }

  /**
   * Validate email format
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const blocklist = ['noreply@', 'no-reply@', 'donotreply@', 'mailer-daemon@'];
    
    if (!emailRegex.test(email)) return false;
    if (blocklist.some(blocked => email.includes(blocked))) return false;
    if (this.processedEmails.has(email)) return false;
    
    return true;
  }

  /**
   * Filter duplicate emails
   */
  async filterDuplicates(leads) {
    return leads.filter(lead => {
      if (!lead.email) return false;
      if (this.processedEmails.has(lead.email)) return false;
      return true;
    });
  }

  /**
   * Helper: delay execution
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = LeadScraper;