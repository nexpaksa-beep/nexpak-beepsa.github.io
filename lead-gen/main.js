// ===== MAIN LEAD GENERATION ORCHESTRATOR =====

const LeadScraper = require('./services/lead-scraper');
const EmailSender = require('./services/email-sender');
const Database = require('./db/database');
const config = require('./config');

class LeadGenerationSystem {
  constructor() {
    this.scraper = new LeadScraper();
    this.emailSender = new EmailSender();
    this.db = new Database();
  }

  /**
   * Start the complete lead generation system
   */
  async start() {
    console.log('\n');
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║     NeXPak Solutions Lead Generation System                 ║');
    console.log('║     AI-Powered B2B Lead Scraper & Email Automation         ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('\n');

    try {
      // Step 1: Generate daily leads
      console.log('[System] Starting lead generation...');
      const leads = await this.scraper.generateDailyLeads();
      console.log(`[System] ✓ Generated ${leads.length} new leads`);

      // Step 2: Start email campaign for new leads
      console.log('[System] Starting email campaign setup...');
      for (const lead of leads) {
        try {
          await this.emailSender.generateEmailSequence(lead);
        } catch (error) {
          console.error(`[System] Error generating sequence for ${lead.email}: ${error.message}`);
        }
      }
      console.log(`[System] ✓ Email campaigns queued for ${leads.length} leads`);

      // Step 3: Schedule email sending
      console.log('[System] Scheduling email sending...');
      await this.emailSender.scheduleEmailSending();
      await this.emailSender.startEmailMonitor();
      console.log('[System] ✓ Email scheduler and monitor active');

      // Step 4: Display statistics
      console.log('[System] Getting system statistics...');
      const stats = await this.emailSender.getStatistics();
      console.log('\n[System Statistics]');
      console.log(`  Total Leads: ${stats?.total_emails || 0}`);
      console.log(`  Emails Sent: ${stats?.sent || 0}`);
      console.log(`  Open Rate: ${stats?.open_rate || 0}%`);
      console.log(`  Click Rate: ${stats?.click_rate || 0}%`);
      console.log('\n');

      console.log('[System] ✓ Lead Generation System is running!');
      console.log('[System] Waiting for 8 AM (Mon-Fri) to send emails...');
      console.log('[System] Press Ctrl+C to stop');
      console.log('\n');

    } catch (error) {
      console.error('[System] Fatal error:', error.message);
      console.error(error);
      process.exit(1);
    }
  }

  /**
   * Stop the system gracefully
   */
  async stop() {
    console.log('\n[System] Shutting down...');
    try {
      await this.db.close();
      console.log('[System] ✓ Shutdown complete');
      process.exit(0);
    } catch (error) {
      console.error('[System] Shutdown error:', error.message);
      process.exit(1);
    }
  }
}

// Initialize and start
if (require.main === module) {
  const system = new LeadGenerationSystem();
  
  // Start the system
  system.start();

  // Graceful shutdown
  process.on('SIGINT', () => system.stop());
  process.on('SIGTERM', () => system.stop());
}

module.exports = LeadGenerationSystem;