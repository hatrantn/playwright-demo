/**
 * Login Tests - nopCommerce Demo Site
 * Tests for user authentication functionality
 */

import { test, expect } from '../src/fixtures/testFixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { TestHelpers } from '../src/utils/testHelpers';

test.describe('User Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should login with valid credentials', async ({ loginPage, registeredUser }) => {
    // Test login with the pre-registered user using TestHelpers
    await TestHelpers.performLoginFlow(loginPage, registeredUser.email, registeredUser.password);
    
    // Verify login was successful using TestHelpers assertion
    await TestHelpers.assertLoginSuccess(loginPage);
  });

  test('should login with remember me checked', async ({ loginPage, registeredUser }) => {
    // Test login with remember me checked using TestHelpers
    await TestHelpers.performLoginFlow(loginPage, registeredUser.email, registeredUser.password, true);
    
    // Verify login was successful using TestHelpers assertion
    await TestHelpers.assertLoginSuccess(loginPage);
  });

  test('should show validation errors for invalid inputs', async ({ loginPage }) => {
    // Test multiple validation scenarios using TestHelpers
    const validationTestCases = TestHelpers.getValidationTestCases();
    
    for (const testCase of validationTestCases) {
      await loginPage.goto();
      await loginPage.login(testCase.email, testCase.password);
      
      // Verify validation error is shown using TestHelpers assertion
      await TestHelpers.assertValidationErrors(loginPage);
    }
  });

  test('should show error for non-existent user', async ({ loginPage }) => {
    await loginPage.login('nonexistent@example.com', 'password');
    
    // Verify error message is shown
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Login was unsuccessful');
  });

  test('should show error for wrong password', async ({ loginPage, registeredUser }) => {
    // Test login with wrong password using pre-registered user
    await loginPage.goto();
    await loginPage.login(registeredUser.email, 'wrongpassword');
    
    // Verify error message is shown
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Login was unsuccessful');
  });

  test('should navigate to forgot password page', async ({ loginPage }) => {
    await loginPage.clickForgotPassword();
    
    // Verify we're on forgot password page
    expect(loginPage.getCurrentUrl()).toContain('/passwordrecovery');
  });

  test('should navigate to registration page', async ({ loginPage }) => {
    await loginPage.clickRegister();
    
    // Verify we're on registration page
    expect(loginPage.getCurrentUrl()).toContain('/register');
  });

  test('should maintain remember me state', async ({ loginPage, registeredUser, page }) => {
    // Login with remember me using pre-registered user
    await loginPage.goto();
    await loginPage.login(registeredUser.email, registeredUser.password, true);
    
    // Verify login was successful
    expect(await loginPage.isLoginSuccessful()).toBe(true);
    
    // Open a new browser tab
    const newPage = await page.context().newPage();
    const newLoginPage = new LoginPage(newPage);
    
    // Navigate to homepage in new tab
    await newPage.goto('/');
    
    // Verify "My account" link exists in new tab without needing to relogin
    const isMyAccountVisible = await newLoginPage.myAccountLink.first().isVisible({ timeout: 5000 });
    expect(isMyAccountVisible).toBe(true);
    
    // Clean up the new page
    await newPage.close();
  });

  test('should handle invalid login attempts @bugLogin01-noCheckingCaseSensitiveEmailWhenLogin', async ({ loginPage, registeredUser }) => {
    // Test multiple invalid login scenarios using TestHelpers
    const testCases = TestHelpers.getInvalidLoginTestCases(registeredUser);
    
    for (const testCase of testCases) {
      await loginPage.goto();
      await loginPage.login(testCase.email, testCase.password);
      
      // Should show error for invalid login using TestHelpers assertion
      await TestHelpers.assertErrorMessage(loginPage, 'Login was unsuccessful');
    }
  });
});

