/**
 * Test Fixtures - nopCommerce Demo Site
 * Provides reusable test fixtures and setup/teardown functionality
 */

import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { getConfig } from '../../config/environment';
import { TestDataUtils, UserData } from '../data/testData';

export interface TestFixtures {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  forgotPasswordPage: ForgotPasswordPage;
  searchPage: SearchPage;
  productPage: ProductPage;
  config: ReturnType<typeof getConfig>;
  registeredUser: UserData;
}

export const test = base.extend<TestFixtures>({
  // Page objects
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },

  forgotPasswordPage: async ({ page }, use) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);
    await use(forgotPasswordPage);
  },

  searchPage: async ({ page }, use) => {
    const searchPage = new SearchPage(page);
    await use(searchPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  // Configuration
  config: async ({}, use) => {
    const config = getConfig();
    await use(config);
  },

  // Registered user for login tests
  registeredUser: async ({ registerPage }, use) => {
    // Generate a unique user for this test
    const userData = TestDataUtils.generateRandomUser();
    const registrationData = TestDataUtils.convertToRegistrationData(userData);
    
    // Register the user
    await registerPage.goto();
    await registerPage.registerUser(registrationData);
    
    // Verify registration was successful
    const isRegistered = await registerPage.isRegistrationSuccessful();
    if (!isRegistered) {
      throw new Error(`Failed to register user: ${userData.email}`);
    }
    
    // Provide the user data to the test
    await use(userData);
  }
});

export { expect } from '@playwright/test';
