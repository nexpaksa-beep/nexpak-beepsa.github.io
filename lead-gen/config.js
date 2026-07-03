// ===== LEAD GENERATION SYSTEM CONFIG =====

module.exports = {
  // Email Configuration
  email: {
    sender: 'info@nexpaksolutions.co.za',
    senderName: 'NeXPak Solutions',
    apiKey: process.env.EMAIL_API_KEY, // SendGrid or similar
    delayBetweenEmails: 25000, // 25 seconds to avoid blocking
  },

  // Lead Generation Settings
  leadGeneration: {
    dailyLeadTarget: 200,
    keywords: [
      'pallet wrap',
      'bubble wrap',
      'packaging',
      'protective wrap',
      'shipping supplies',
      'warehouse',
      'logistics',
      'safety equipment',
      'PPE',
      'safety wear',
      'corrugated boxes',
      'pallet strapping',
      'tape',
      'packaging materials'
    ],
    businessTypes: [
      'warehouse',
      'logistics',
      'distribution',
      'manufacturing',
      'retail',
      'construction',
      'e-commerce',
      'freight',
      'import/export'
    ],
  },

  // Geographic Areas (Johannesburg Region)
  targetAreas: [
    'Benoni',
    'Boksburg',
    'Brakpan',
    'Kempton Park',
    'Jetpark',
    'Germiston',
    'Johannesburg',
    'Alberton',
    'Springs',
    'Daveyton',
    'Nigel',
    'Edenvale',
    'Birchleigh',
    'Terawatt'
  ],

  // Email Scheduling
  emailScheduling: {
    startTime: '08:00', // 8 AM
    endTime: '17:00', // 5 PM
    workDaysOnly: true, // Monday to Friday
    timezone: 'Africa/Johannesburg',
  },

  // Email Campaign Sequence
  emailCampaign: {
    emails: [
      {
        sequence: 1,
        delayHours: 0,
        type: 'initial',
        subject: 'NeXPak Solutions - Premium Packaging & Safety Solutions for {company}'
      },
      {
        sequence: 2,
        delayHours: 48,
        type: 'followup',
        subject: 'Follow Up: Packaging Solutions That Save {company} Money'
      },
      {
        sequence: 3,
        delayHours: 96, // 48 hours after 2nd
        type: 'followup',
        subject: 'Exclusive: NeXPak Bulk Discounts - Limited Time'
      },
      {
        sequence: 4,
        delayHours: 144, // 48 hours after 3rd
        type: 'final',
        subject: 'Last Chance: Premium Packaging Supplies for {company}'
      }
    ]
  },

  // Database settings
  database: {
    type: 'sqlite',
    path: './lead-gen/db/leads.db',
    backupPath: './lead-gen/db/backups'
  },

  // Scraper settings
  scraper: {
    maxConcurrentRequests: 5,
    timeout: 10000,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    proxy: process.env.PROXY_URL || null
  },

  // Products from shop-data.js
  productCategories: [
    'wrap',      // Bubble wrap, pallet wrap
    'tape',      // Various tapes
    'boxes',     // Corrugated boxes
    'ppe',       // PPE safety wear
    'void'       // Void fill materials
  ]
};