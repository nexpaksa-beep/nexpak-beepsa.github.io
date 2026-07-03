// ===== EMAIL SENDER WITH RATE LIMITING =====

const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const config = require('../config');
const Database = require('../db/database');

class EmailSender {
  constructor() {
    this.db = new Database();
    this.emailQueue = [];
    this.isSending = false;
    this.lastEmailTime = 0;
    
    // Initialize SendGrid
    if (config.email.apiKey) {
      sgMail.setApiKey(config.email.apiKey);
    }
  }

  /**
   * Schedule email sending for specific time
   */
  async scheduleEmailSending() {
    const schedule = require('node-schedule');
    const CronTime = require('cron').CronTime;

    // Schedule for 8 AM Monday-Friday
    const cronExpression = '0 8 * * 1-5'; // 8 AM, Mon-Fri

    const job = schedule.scheduleJob(cronExpression, async () => {
      console.log(`[${new Date().toISOString()}] Email sending job triggered`);
      await this.sendScheduledEmails();
    });

    console.log('[EmailScheduler] Scheduled email sending at 8 AM Monday-Friday');
    return job;
  }

  /**
   * Send all scheduled emails
   */
  async sendScheduledEmails() {
    try {
      const emailsToSend = await this.db.getEmailsToSend();
      console.log(`[EmailSender] Found ${emailsToSend.length} emails to send`);

      for (const emailConfig of emailsToSend) {
        // Respect 25-second delay between emails
        await this.delay(config.email.delayBetweenEmails);
        
        try {
          await this.sendEmail(emailConfig);
          await this.db.updateEmailStatus(emailConfig.id, 'sent');
          console.log(`[EmailSender] ✓ Sent to ${emailConfig.to}`);
        } catch (error) {
          console.error(`[EmailSender] ✗ Failed to send to ${emailConfig.to}: ${error.message}`);
          await this.db.updateEmailStatus(emailConfig.id, 'failed');
        }
      }
    } catch (error) {
      console.error('[EmailSender] Error in scheduled sending:', error.message);
    }
  }

  /**
   * Send individual email
   */
  async sendEmail(emailConfig) {
    try {
      const mailOptions = {
        from: `${config.email.senderName} <${config.email.sender}>`,
        to: emailConfig.to,
        subject: emailConfig.subject,
        text: emailConfig.body,
        html: emailConfig.htmlBody,
        replyTo: config.email.sender,
        headers: {
          'X-Priority': '3',
          'X-Mailer': 'NeXPak Lead Generation System',
          'List-Unsubscribe': `<${config.email.sender}>`
        }
      };

      // Send via SendGrid or Nodemailer
      if (config.email.apiKey) {
        await sgMail.send(mailOptions);
      } else {
        // Fallback to SMTP
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });
        await transporter.sendMail(mailOptions);
      }

      return true;
    } catch (error) {
      console.error('[EmailSender] Send error:', error.message);
      throw error;
    }
  }

  /**
   * Queue email for sending
   */
  async queueEmail(emailConfig, delayHours = 0) {
    try {
      const sendTime = new Date(Date.now() + delayHours * 3600000);
      
      await this.db.queueEmail({
        to: emailConfig.to,
        toName: emailConfig.toName,
        subject: emailConfig.subject,
        body: emailConfig.body,
        htmlBody: emailConfig.htmlBody,
        sequence: emailConfig.sequence,
        leadId: emailConfig.lead.id,
        sendTime: sendTime,
        status: 'pending'
      });

      console.log(`[EmailQueue] Queued email for ${emailConfig.to} at ${sendTime}`);
    } catch (error) {
      console.error('[EmailQueue] Error queueing email:', error.message);
      throw error;
    }
  }

  /**
   * Generate email campaign sequence for new lead
   */
  async generateEmailSequence(lead) {
    try {
      const EmailDrafter = require('./email-drafter');
      const drafter = new EmailDrafter();

      for (const emailConfig of config.emailCampaign.emails) {
        const draftedEmail = await drafter.draftEmail(lead, emailConfig.sequence);
        await this.queueEmail(draftedEmail, emailConfig.delayHours);
      }

      console.log(`[EmailSequence] Generated 4-email campaign for ${lead.email}`);
    } catch (error) {
      console.error('[EmailSequence] Error:', error.message);
    }
  }

  /**
   * Monitor and send queued emails
   */
  async startEmailMonitor() {
    const schedule = require('node-schedule');
    
    // Check every 5 minutes for emails to send
    const job = schedule.scheduleJob('*/5 * * * *', async () => {
      try {
        const duePendingEmails = await this.db.getDuePendingEmails();
        
        if (duePendingEmails.length > 0) {
          console.log(`[Monitor] Found ${duePendingEmails.length} due emails`);
          
          for (const emailConfig of duePendingEmails) {
            await this.delay(config.email.delayBetweenEmails);
            
            try {
              await this.sendEmail(emailConfig);
              await this.db.updateEmailStatus(emailConfig.id, 'sent');
            } catch (error) {
              console.error(`[Monitor] Failed: ${error.message}`);
              await this.db.updateEmailStatus(emailConfig.id, 'failed');
            }
          }
        }
      } catch (error) {
        console.error('[Monitor] Error:', error.message);
      }
    });

    console.log('[Monitor] Email monitor started - checking every 5 minutes');
    return job;
  }

  /**
   * Helper: delay execution
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get email statistics
   */
  async getStatistics() {
    try {
      const stats = await this.db.getEmailStatistics();
      return stats;
    } catch (error) {
      console.error('[Stats] Error:', error.message);
    }
  }
}

module.exports = EmailSender;