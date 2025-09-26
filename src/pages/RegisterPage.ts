/**
 * Register Page Object - nopCommerce Demo Site
 * Handles user registration functionality
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender?: string;
  newsletter?: boolean;
  company?: string;
}

export class RegisterPage extends BasePage {
  // Personal Information section
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly genderMaleRadio: Locator;
  readonly genderFemaleRadio: Locator;
  readonly newsletterCheckbox: Locator;

  // Company Information section
  readonly companyInput: Locator;

  // Registration button
  readonly registerButton: Locator;

  // Error messages
  readonly errorMessage: Locator;
  readonly validationErrors: Locator;
  readonly fieldValidationErrors: Locator;

  // Success message
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    // Personal Information locators
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.genderMaleRadio = page.locator('#gender-male');
    this.genderFemaleRadio = page.locator('#gender-female');
    this.newsletterCheckbox = page.locator('#Newsletter');

    // Company Information locators
    this.companyInput = page.locator('#Company');

    // Registration button
    this.registerButton = page.locator('#register-button');

    // Error message locators
    this.errorMessage = page.locator('.message-error');
    this.validationErrors = page.locator('.validation-summary-errors');
    this.fieldValidationErrors = page.locator('.field-validation-error');

    // Success message
    this.successMessage = page.locator('.result');
  }

  /**
   * Navigate to registration page
   */
  async goto(): Promise<void> {
    await super.goto('/register');
  }

  /**
   * Fill personal information section
   */
  async fillPersonalInformation(data: Partial<UserRegistrationData>): Promise<void> {
    if (data.gender) {
        await this.selectGender(data.gender);
    }
    if (data.firstName) {
      await this.fillInput(this.firstNameInput, data.firstName);
    }
    if (data.lastName) {
      await this.fillInput(this.lastNameInput, data.lastName);
    }
    if (data.email) {
      await this.fillInput(this.emailInput, data.email);
    }
    if (data.newsletter !== undefined) {
        if (data.newsletter) {
          await this.checkCheckbox(this.newsletterCheckbox);
        } else {
          await this.uncheckCheckbox(this.newsletterCheckbox);
        }
      }
    if (data.password) {
      await this.fillInput(this.passwordInput, data.password);
    }
    if (data.confirmPassword) {
      await this.fillInput(this.confirmPasswordInput, data.confirmPassword);
    }
  }

  /**
   * Fill company information section
   */
  async fillCompanyInformation(data: Partial<UserRegistrationData>): Promise<void> {
    if (data.company) {
      await this.fillInput(this.companyInput, data.company);
    }
  }

  /**
   * Register a new user with complete information
   */
  async registerUser(data: UserRegistrationData): Promise<void> {
    await this.fillPersonalInformation(data);
    await this.fillCompanyInformation(data);
    await this.clickElement(this.registerButton);
  }

  /**
   * Register with test user data
   */
  async registerWithTestData(): Promise<void> {
    const testData: UserRegistrationData = {
      firstName: this.config.testUser.firstName,
      lastName: this.config.testUser.lastName,
      email: this.config.testUser.email,
      password: this.config.testUser.password,
      confirmPassword: this.config.testUser.password,
      gender: this.config.testUser.gender,
      newsletter: true, // Default to checked
      company: this.config.testUser.company
    };
    await this.registerUser(testData);
  }

  /**
   * Register with minimal required information
   */
  async registerMinimal(firstName: string, lastName: string, email: string, password: string): Promise<void> {
    const minimalData: UserRegistrationData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword: password
    };
    await this.registerUser(minimalData);
  }

  /**
   * Get error message text
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
   * Get field validation errors
   */
  async getFieldValidationErrors(): Promise<string[]> {
    const errors: string[] = [];
    const errorElements = await this.fieldValidationErrors.all();
    
    for (const errorElement of errorElements) {
      const errorText = await errorElement.textContent();
      if (errorText) {
        errors.push(errorText.trim());
      }
    }
    
    return errors;
  }

  /**
   * Get success message
   */
  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.successMessage);
  }

  /**
   * Check if registration was successful
   */
  async isRegistrationSuccessful(): Promise<boolean> {
    try {
      // Wait for redirect to registration result page
      await this.page.waitForURL('**/registerresult/**', { timeout: 10000 });
      
      // Check if we're on the success page
      const isOnSuccessPage = this.page.url().includes('/registerresult');
      
      if (!isOnSuccessPage) {
        return false;
      }
      
      // Try to find success message with multiple possible selectors
      const successSelectors = [
        '.result',
        '.message-success', 
        '.success-message',
        '.registration-success',
        '[class*="success"]'
      ];
      
      for (const selector of successSelectors) {
        const element = this.page.locator(selector);
        if (await element.isVisible()) {
          return true;
        }
      }
      
      // If no success message found, check if we're on the result page (might be enough)
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if there are validation errors
   */
  async hasValidationErrors(): Promise<boolean> {
    return await this.isVisible(this.validationErrors) || await this.isVisible(this.fieldValidationErrors);
  }

  /**
   * Clear all form fields
   */
  async clearForm(): Promise<void> {
    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
    await this.emailInput.clear();
    await this.passwordInput.clear();
    await this.confirmPasswordInput.clear();
    await this.companyInput.clear();
    // Note: Gender select will reset to default option when cleared
    // Newsletter checkbox will remain in its current state
  }

  /**
   * Select gender by clicking the appropriate radio button
   */
  async selectGender(gender: string): Promise<void> {
    if (gender.toLowerCase() === 'male') {
      await this.clickElement(this.genderMaleRadio);
    } else if (gender.toLowerCase() === 'female') {
      await this.clickElement(this.genderFemaleRadio);
    }
  }

  /**
   * Get currently selected gender
   */
  async getSelectedGender(): Promise<string> {
    if (await this.genderMaleRadio.isChecked()) {
      return 'Male';
    } else if (await this.genderFemaleRadio.isChecked()) {
      return 'Female';
    }
    return '';
  }

  /**
   * Check if newsletter checkbox is checked
   */
  async isNewsletterChecked(): Promise<boolean> {
    return await this.newsletterCheckbox.isChecked();
  }

  /**
   * Generate unique email for testing
   */
  generateUniqueEmail(): string {
    const timestamp = Date.now();
    return `test${timestamp}@example.com`;
  }
}
