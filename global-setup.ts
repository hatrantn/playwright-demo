/**
 * Global Setup - nopCommerce Demo Site
 * Maximizes browser window for better element visibility
 */

import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('Setting up global configuration...');
  
  try {
    // Launch browser with maximized window
    const browser = await chromium.launch({ 
      headless: true, // Use headless for faster setup
      args: ['--start-maximized']
    });
    
    const context = await browser.newContext({
      viewport: null
    });
    
    const page = await context.newPage();
    
    // Navigate to the base URL to ensure it's accessible
    const baseUrl = config.projects[0]?.use?.baseURL || 'https://demo.nopcommerce.com';
    console.log(`Checking accessibility of: ${baseUrl}`);
    
    // Use a more reliable approach with timeout
    await page.goto(baseUrl, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    // Wait for basic page load with shorter timeout
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    
    console.log('Global setup completed successfully');
    
    await browser.close();
  } catch (error) {
    console.error('Global setup failed:', error);
    // Don't throw error to allow tests to continue
    console.log('Continuing with tests despite setup warning...');
  }
}

export default globalSetup;

