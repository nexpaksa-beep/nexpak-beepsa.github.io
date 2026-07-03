// ===== DATABASE MANAGER =====

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const config = require('../config');

class Database {
  constructor() {
    this.dbPath = path.resolve(config.database.path);
    this.db = new sqlite3.Database(this.dbPath, (err) => {
      if (err) {
        console.error('[Database] Connection error:', err.message);
      } else {
        console.log('[Database] Connected');
        this.initializeTables();
      }
    });
  }

  /**
   * Initialize database tables
   */
  initializeTables() {
    const tables = [
      // Leads table
      `CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company TEXT NOT NULL,
        contact_name TEXT,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        website TEXT,
        area TEXT,
        business_type TEXT,
        industry_keywords TEXT,
        source TEXT,
        scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        added_to_campaign BOOLEAN DEFAULT 0,
        campaign_started_at DATETIME,
        last_contact_at DATETIME,
        status TEXT DEFAULT 'new'
      )`,

      // Email queue table
      `CREATE TABLE IF NOT EXISTS email_queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lead_id INTEGER NOT NULL,
        to_email TEXT NOT NULL,
        to_name TEXT,
        subject TEXT NOT NULL,
        body TEXT NOT NULL,
        html_body TEXT,
        sequence INTEGER NOT NULL,
        email_type TEXT,
        send_time DATETIME NOT NULL,
        status TEXT DEFAULT 'pending',
        sent_at DATETIME,
        opened BOOLEAN DEFAULT 0,
        opened_at DATETIME,
        clicked BOOLEAN DEFAULT 0,
        clicked_at DATETIME,
        bounced BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(lead_id) REFERENCES leads(id)
      )`,

      // Email responses table
      `CREATE TABLE IF NOT EXISTS responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lead_id INTEGER NOT NULL,
        email_id INTEGER NOT NULL,
        response_type TEXT,
        response_text TEXT,
        received_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(lead_id) REFERENCES leads(id),
        FOREIGN KEY(email_id) REFERENCES email_queue(id)
      )`,

      // Daily statistics
      `CREATE TABLE IF NOT EXISTS daily_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE UNIQUE NOT NULL,
        leads_generated INTEGER DEFAULT 0,
        emails_sent INTEGER DEFAULT 0,
        emails_opened INTEGER DEFAULT 0,
        emails_clicked INTEGER DEFAULT 0,
        responses_received INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    ];

    tables.forEach(table => {
      this.db.run(table, (err) => {
        if (err) {
          console.error('[Database] Table creation error:', err.message);
        }
      });
    });

    // Create indexes
    this.createIndexes();
  }

  /**
   * Create database indexes
   */
  createIndexes() {
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email)',
      'CREATE INDEX IF NOT EXISTS idx_leads_area ON leads(area)',
      'CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status)',
      'CREATE INDEX IF NOT EXISTS idx_email_queue_send_time ON email_queue(send_time)',
      'CREATE INDEX IF NOT EXISTS idx_responses_lead ON responses(lead_id)'
    ];

    indexes.forEach(index => {
      this.db.run(index, (err) => {
        if (err) console.log('[Database] Index creation note:', err.message);
      });
    });
  }

  /**
   * Save lead to database
   */
  saveLead(lead) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO leads (company, contact_name, email, phone, website, area, business_type, industry_keywords, source)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        lead.company || 'Unknown',
        lead.contact_name || null,
        lead.email,
        lead.phone || null,
        lead.website || null,
        lead.area || 'Johannesburg',
        lead.business_type || null,
        JSON.stringify(lead.industry_keywords || []),
        lead.source || 'manual'
      ];

      this.db.run(query, params, function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            console.log(`[Database] Lead already exists: ${lead.email}`);
          }
          reject(err);
        } else {
          console.log(`[Database] Lead saved: ID ${this.lastID}`);
          resolve(this.lastID);
        }
      });
    });
  }

  /**
   * Get all existing emails
   */
  getAllEmails() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT DISTINCT email FROM leads';
      this.db.all(query, (err, rows) => {
        if (err) reject(err);
        else resolve(rows.map(r => r.email));
      });
    });
  }

  /**
   * Queue email for sending
   */
  queueEmail(emailConfig) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO email_queue (lead_id, to_email, to_name, subject, body, html_body, sequence, send_time, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        emailConfig.leadId,
        emailConfig.to,
        emailConfig.toName,
        emailConfig.subject,
        emailConfig.body,
        emailConfig.htmlBody,
        emailConfig.sequence,
        emailConfig.sendTime,
        emailConfig.status
      ];

      this.db.run(query, params, function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  /**
   * Get emails to send at scheduled time
   */
  getEmailsToSend() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM email_queue 
        WHERE status = 'pending' 
        AND send_time <= datetime('now')
        ORDER BY send_time ASC
        LIMIT 50
      `;
      this.db.all(query, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  /**
   * Get due pending emails
   */
  getDuePendingEmails() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT eq.*, l.email as lead_email FROM email_queue eq
        JOIN leads l ON eq.lead_id = l.id
        WHERE eq.status = 'pending' 
        AND eq.send_time <= datetime('now')
        ORDER BY eq.send_time ASC
        LIMIT 100
      `;
      this.db.all(query, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  /**
   * Update email status
   */
  updateEmailStatus(emailId, status) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE email_queue SET status = ?, sent_at = CURRENT_TIMESTAMP WHERE id = ?';
      this.db.run(query, [status, emailId], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  /**
   * Record email as opened
   */
  recordEmailOpened(emailId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE email_queue SET opened = 1, opened_at = CURRENT_TIMESTAMP WHERE id = ?';
      this.db.run(query, [emailId], (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  /**
   * Get email statistics
   */
  getEmailStatistics() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          COUNT(*) as total_emails,
          SUM(CASE WHEN status = 'sent' THEN 1 ELSE 0 END) as sent,
          SUM(CASE WHEN opened = 1 THEN 1 ELSE 0 END) as opened,
          SUM(CASE WHEN clicked = 1 THEN 1 ELSE 0 END) as clicked,
          ROUND(100.0 * SUM(CASE WHEN opened = 1 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 2) as open_rate,
          ROUND(100.0 * SUM(CASE WHEN clicked = 1 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 2) as click_rate
        FROM email_queue
      `;
      this.db.get(query, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  /**
   * Close database connection
   */
  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else {
          console.log('[Database] Connection closed');
          resolve(true);
        }
      });
    });
  }
}

module.exports = Database;