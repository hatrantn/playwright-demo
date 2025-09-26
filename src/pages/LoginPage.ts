/**
 * Login Page Object - nopCommerce Demo Site
 * Handles user authentication and login functionality
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Login form elements
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly registerButton: Locator;
  
  // Account elements for login success verification
  readonly myAccountLink: Locator;

  constructor(page: Page) {
    super(page);
    
    // Login form locators using common locators
    this.emailInput = page.locator(this.locators.emailInput);
    this.passwordInput = page.locator(this.locators.passwordInput);
    this.loginButton = page.locator(this.locators.loginButton);
    this.rememberMeCheckbox = page.locator(this.locators.rememberMeCheckbox);
    this.forgotPasswordLink = page.locator(this.locators.forgotPasswordLink);
    this.registerButton = page.locator(this.locators.registerButton);
    
    // Account elements
    this.myAccountLink = page.locator(this.locators.myAccountLink);
  }

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    await super.goto('/login');
  }

  /**
   * Login with email and password
   */
  async login(email: string, password: string, rememberMe: boolean = false): Promise<void> {
    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.passwordInput, password);
    
    if (rememberMe) {
      await this.checkCheckbox(this.rememberMeCheckbox);
    }
    
    await this.clickElement(this.loginButton);
  }

  /**
   * Login with test user credentials
   */
  async loginWithTestUser(): Promise<void> {
    await this.login(this.config.testUser.email, this.config.testUser.password);
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.clickElement(this.forgotPasswordLink);
  }

  /**
   * Click register button
   */
  async clickRegister(): Promise<void> {
    await this.clickElement(this.registerButton);
  }


  /**
   * Check if login was successful by verifying "My account" link is visible
   */
  async isLoginSuccessful(): Promise<boolean> {
    // Navigate to homepage to check for login success indicators
    await super.goto('/');
    
    // Wait for the page to load
    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    
    // Check if "My account" link is visible in the top bar menu (using .first() to avoid strict mode violations)
    const isMyAccountVisible = await this.myAccountLink.first().isVisible({ timeout: 5000 });
    
    return isMyAccountVisible;
  }

  async clearForm(): Promise<void> {
    await this.emailInput.clear();
    await this.passwordInput.clear();
    if (await this.rememberMeCheckbox.isChecked()) {
      await this.uncheckCheckbox(this.rememberMeCheckbox);
    }
  }

  /**
   * Check if remember me is checked
   */
  async isRememberMeChecked(): Promise<boolean> {
    return await this.rememberMeCheckbox.isChecked();
  }

  /**
   * Get email input value
   */
  async getEmailValue(): Promise<string> {
    return await this.emailInput.inputValue();
  }

  /**
   * Get password input value
   */
  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }
}

