/**
 * Test Helpers - nopCommerce Demo Site
 * Common utility functions to eliminate duplication across tests
 */

import { TestDataUtils, UserData } from '../data/testData';

export class TestHelpers {

  /**
   * Common assertion helpers
   */
  static async assertLoginSuccess(loginPage: any): Promise<void> {
    const isSuccessful = await loginPage.isLoginSuccessful();
    if (!isSuccessful) {
      throw new Error('Login was not successful');
    }
  }

  static async assertRegistrationSuccess(registerPage: any): Promise<void> {
    const isSuccessful = await registerPage.isRegistrationSuccessful();
    if (!isSuccessful) {
      throw new Error('Registration was not successful');
    }
  }

  static async assertValidationErrors(page: any): Promise<void> {
    const hasErrors = await page.hasValidationErrors();
    if (!hasErrors) {
      throw new Error('Expected validation errors but none were found');
    }
  }

  static async assertErrorMessage(page: any, expectedMessage: string): Promise<void> {
    const errorMessage = await page.getErrorMessage();
    if (!errorMessage.includes(expectedMessage)) {
      throw new Error(`Expected error message to contain "${expectedMessage}" but got "${errorMessage}"`);
    }
  }

  /**
   * Common test scenarios
   */
  static async performLoginFlow(loginPage: any, email: string, password: string, rememberMe: boolean = false): Promise<void> {
    await loginPage.goto();
    await loginPage.login(email, password, rememberMe);
  }

  static async performRegistrationFlow(registerPage: any, userData: UserData): Promise<void> {
    const registrationData = TestDataUtils.convertToRegistrationData(userData);
    await registerPage.goto();
    await registerPage.registerUser(registrationData);
  }

  /**
   * Common validation test cases
   */
  static getValidationTestCases() {
    return [
      {
        description: 'empty email',
        email: '',
        password: 'password'
      },
      {
        description: 'empty password',
        email: 'test@example.com',
        password: ''
      },
      {
        description: 'invalid email format',
        email: 'invalid-email',
        password: 'password'
      }
    ];
  }

  static getInvalidLoginTestCases(registeredUser: UserData) {
    return [
      // {
      //   description: 'case sensitivity in email',
      //   email: registeredUser.email.toUpperCase(),
      //   password: registeredUser.password
      // },
      {
        description: 'special characters in password',
        email: registeredUser.email,
        password: 'Test@123#'
      },
      {
        description: 'very long password',
        email: registeredUser.email,
        password: 'a'.repeat(100)
      },
      {
        description: 'very long email',
        email: 'a'.repeat(50) + '@example.com',
        password: 'password'
      }
    ];
  }

  /**
   * Common wait helpers
   */
  static async waitForPageLoad(page: any): Promise<void> {
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
  }

  static async waitForElement(locator: any, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }
}