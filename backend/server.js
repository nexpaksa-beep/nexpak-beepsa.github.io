const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');

// Load environment variables
dotenv.config();

// Import routes
const subscriptionRoutes = require('./routes/subscriptions');
const campaignRoutes = require('./routes/campaigns');
const analyticsRoutes = require('./routes/analytics');

// Import services
const campaignService = require('./services/campaignService');
const { initializeDatabase } = require('./services/database');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API Routes
app.use('/api/subscribe', subscriptionRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/analytics', analyticsRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        error: true,
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Initialize scheduled campaigns
const initializeScheduledCampaigns = () => {
    // Daily campaign at 09:00 (Johannesburg time)
    cron.schedule('0 9 * * *', async () => {
        try {
            console.log('Running daily campaign at 09:00...');
            await campaignService.initializeCampaigns();
        } catch (error) {
            console.error('Error running scheduled campaign:', error);
        }
    });
    
    // Weekly campaign on Monday at 08:00
    cron.schedule('0 8 * * 1', async () => {
        try {
            console.log('Running Monday deals campaign...');
            await campaignService.createMonthDealsCampaign();
        } catch (error) {
            console.error('Error running Monday campaign:', error);
        }
    });
    
    console.log('Scheduled campaigns initialized');
};

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Initialize database
        await initializeDatabase();
        console.log('Database connected');
        
        // Start Express server
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV}`);
        });
        
        // Initialize scheduled campaigns
        initializeScheduledCampaigns();
        
        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('SIGTERM received, shutting down gracefully');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });
        
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Start the server
if (require.main === module) {
    startServer();
}

module.exports = app;
