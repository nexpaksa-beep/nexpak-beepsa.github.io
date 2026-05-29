/**
 * Vercel Speed Insights Integration
 * 
 * This script initializes Vercel Speed Insights for tracking
 * Core Web Vitals and performance metrics.
 * 
 * Documentation: https://vercel.com/docs/speed-insights/quickstart
 */

import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Speed Insights with default configuration
injectSpeedInsights({
  debug: false, // Set to true to enable debug logging in development
  sampleRate: 1, // Track 100% of page views (adjust if needed)
});
