/**
 * Build script to bundle Speed Insights for static HTML deployment
 */
import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';

console.log('Building Speed Insights bundle...');

try {
  await esbuild.build({
    entryPoints: ['speed-insights.js'],
    bundle: true,
    minify: true,
    format: 'iife',
    outfile: 'dist/speed-insights.min.js',
    platform: 'browser',
  });

  console.log('✅ Speed Insights bundle created successfully!');
  console.log('📦 Output: dist/speed-insights.min.js');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
