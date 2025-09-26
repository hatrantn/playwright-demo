/**
 * Environment Configuration for nopCommerce Demo Site
 * Centralized configuration management for different test environments
 */

export interface TestConfig {
  baseUrl: string;
  testUser: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
    newsletter: boolean;
    company: string;
  };
  browser: {
    headless: boolean;
    timeout: number;
  };
}

// Default configuration values - consolidated to reduce redundancy
const defaultConfig: TestConfig = {
  baseUrl: 'https://demo.nopcommerce.com',
  testUser: {
    email: 'test@example.com',
    password: 'Test123!',
    firstName: 'Test',
    lastName: 'User',
    gender: 'Male',
    newsletter: true,
    company: 'Test Company'
  },
  browser: {
    headless: true,
    timeout: 60000
  }
};

export function getConfig(): TestConfig {
  return {
    baseUrl: process.env.BASE_URL || defaultConfig.baseUrl,
    testUser: {
      email: process.env.TEST_USER_EMAIL || defaultConfig.testUser.email,
      password: process.env.TEST_USER_PASSWORD || defaultConfig.testUser.password,
      firstName: process.env.TEST_FIRST_NAME || defaultConfig.testUser.firstName,
      lastName: process.env.TEST_LAST_NAME || defaultConfig.testUser.lastName,
      gender: process.env.TEST_GENDER || defaultConfig.testUser.gender,
      newsletter: process.env.TEST_NEWSLETTER === 'false' ? false : defaultConfig.testUser.newsletter,
      company: process.env.TEST_COMPANY || defaultConfig.testUser.company
    },
    browser: {
      headless: process.env.HEADLESS !== 'false' && defaultConfig.browser.headless, // Default to true unless explicitly set to false
      timeout: parseInt(process.env.TIMEOUT || '60000')
    }
  };
}
