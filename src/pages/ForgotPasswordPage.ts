/**
 * Forgot Password Page Object - nopCommerce Demo Site
 * Handles password recovery functionality
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForgotPasswordPage extends BasePage {
  // Form elements
  readonly emailInput: Locator;
  readonly recoverButton: Locator;

  // Messages
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly validationErrors: Locator;

  constructor(page: Page) {
    super(page);
    
    // Form locators
    this.emailInput = page.locator('#Email');
    this.recoverButton = page.locator('.password-recovery-button');

    // Message locators
    this.successMessage = page.locator('.success');
    this.errorMessage = page.locator('.error');
    this.validationErrors = page.locator('.field-validation-error');
  }

  /**
   * Navigate to forgot password page
   */
  async goto(): Promise<void> {
    await super.goto('/passwordrecovery');
  }

  /**
   * Request password recovery for email
   */
  async requestPasswordRecovery(email: string): Promise<void> {
    await this.fillInput(this.emailInput, email);
    await this.clickElement(this.recoverButton);
  }

  /**
   * Request password recovery for test user
   */
  async requestPasswordRecoveryForTestUser(): Promise<void> {
    await this.requestPasswordRecovery(this.config.testUser.email);
  }

  /**
   * Go back to login page using browser back button
   */
  async goBackToLogin(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * Get success message
   */
  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.successMessage);
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    if (await this.isVisible(this.errorMessage)) {
      return await this.getText(this.errorMessage);
    }
    if (await this.isVisible(this.validationErrors)) {
      return await this.getText(this.validationErrors);
    }
    return '';
  }

  /**
   * Check if password recovery request was successful
   */
  async isRecoveryRequestSuccessful(): Promise<boolean> {
    return await this.isVisible(this.successMessage);
  }

  /**
   * Check if there are validation errors
   */
  async hasValidationErrors(): Promise<boolean> {
    return await this.isVisible(this.validationErrors);
  }

  /**
   * Clear email input
   */
  async clearEmail(): Promise<void> {
    await this.emailInput.clear();
  }

  /**
   * Get email input value
   */
  async getEmailValue(): Promise<string> {
    return await this.emailInput.inputValue();
  }

  /**
   * Check if email input is empty
   */
  async isEmailInputEmpty(): Promise<boolean> {
    const value = await this.getEmailValue();
    return value === '';
  }
}
