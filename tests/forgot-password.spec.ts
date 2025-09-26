/**
 * Forgot Password Tests - nopCommerce Demo Site
 * Tests for password recovery functionality
 */

import { test, expect } from '../src/fixtures/testFixtures';

test.describe('Forgot Password', () => {
  test.beforeEach(async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.goto();
  });

  test('should request password recovery for valid email', async ({ forgotPasswordPage, registeredUser }) => {
    const userEmail = registeredUser.email;
    
    // Navigate to forgot password page and request recovery
    await forgotPasswordPage.goto();
    await forgotPasswordPage.requestPasswordRecovery(userEmail);
    
    // Verify success message is displayed
    expect(await forgotPasswordPage.isRecoveryRequestSuccessful()).toBe(true);
    expect(await forgotPasswordPage.getSuccessMessage()).toContain('Email with instructions has been sent');
  });

  test('should show validation error for empty email', async ({ forgotPasswordPage }) => {
    await forgotPasswordPage.clickElement(forgotPasswordPage.recoverButton);
    
    // Verify validation error is shown
    expect(await forgotPasswordPage.hasValidationErrors()).toBe(true);
  });

  test('should show validation error for invalid email format', async ({ forgotPasswordPage }) => {
    const invalidEmail = 'invalid-email';
    
    await forgotPasswordPage.requestPasswordRecovery(invalidEmail);
    
    // Verify validation error is shown
    expect(await forgotPasswordPage.hasValidationErrors()).toBe(true);
  });

  test('should show validation error for non-existent email', async ({ forgotPasswordPage }) => {
    const nonExistentEmail = 'nonexistent@example.com';
    
    await forgotPasswordPage.requestPasswordRecovery(nonExistentEmail);
    
    // Verify error message is shown
    const errorMessage = await forgotPasswordPage.getErrorMessage();
    expect(errorMessage).toContain('Email not found');
  });

  test('should clear email input', async ({ forgotPasswordPage }) => {
    const testEmail = 'test@example.com';
    
    // Fill email input
    await forgotPasswordPage.fillInput(forgotPasswordPage.emailInput, testEmail);
    expect(await forgotPasswordPage.getEmailValue()).toBe(testEmail);
    
    // Clear email input
    await forgotPasswordPage.clearEmail();
    expect(await forgotPasswordPage.isEmailInputEmpty()).toBe(true);
  });

  test('should handle multiple password recovery requests', async ({ forgotPasswordPage, registeredUser }) => {
    const userEmail = registeredUser.email;
    
    // First request
    await forgotPasswordPage.goto();
    await forgotPasswordPage.requestPasswordRecovery(userEmail);
    expect(await forgotPasswordPage.isRecoveryRequestSuccessful()).toBe(true);
    
    // Navigate back to forgot password page
    await forgotPasswordPage.goto();
    
    // Second request
    await forgotPasswordPage.requestPasswordRecovery(userEmail);
    expect(await forgotPasswordPage.isRecoveryRequestSuccessful()).toBe(true);
  });

  test('should handle password recovery with special characters in email', async ({ forgotPasswordPage }) => {
    const specialEmail = 'test+special@example.com';
    
    await forgotPasswordPage.requestPasswordRecovery(specialEmail);
    
    // Should show error for non-existent email, but not validation error
    const errorMessage = await forgotPasswordPage.getErrorMessage();
    expect(errorMessage).toContain('Email not found');
  });

  test('should maintain email input value after failed request', async ({ forgotPasswordPage }) => {
    const testEmail = 'test@example.com';
    
    await forgotPasswordPage.fillInput(forgotPasswordPage.emailInput, testEmail);
    await forgotPasswordPage.requestPasswordRecovery(testEmail);
    
    // Email should still be in input field
    expect(await forgotPasswordPage.getEmailValue()).toBe(testEmail);
  });

  test('should handle very long email address', async ({ forgotPasswordPage }) => {
    const longEmail = 'a'.repeat(50) + '@example.com';
    
    await forgotPasswordPage.requestPasswordRecovery(longEmail);
    
    // Should show error for non-existent email
    const errorMessage = await forgotPasswordPage.getErrorMessage();
    expect(errorMessage).toContain('Email not found');
  });

  test('should handle email with multiple @ symbols', async ({ forgotPasswordPage }) => {
    const invalidEmail = 'test@@example.com';
    
    await forgotPasswordPage.requestPasswordRecovery(invalidEmail);
    
    // Verify validation error is shown
    expect(await forgotPasswordPage.hasValidationErrors()).toBe(true);
  });

  test.fixme('should handle case sensitivity in email @bugFP01-noCheckingCaseSensitiveEmailWhenRegister', async ({ forgotPasswordPage, registeredUser }) => {
    const userEmail = registeredUser.email;
    const upperCaseEmail = userEmail.toUpperCase();
    
    await forgotPasswordPage.requestPasswordRecovery(upperCaseEmail);
    
    // Should show error for non-existent email (case sensitive)
    const errorMessage = await forgotPasswordPage.getErrorMessage();
    expect(errorMessage).toContain('Email not found');
  });

  test.fixme('should retrieve reset email and verify reset link leads to correct reset form @bugFP02-SendMailNotWorking', async ({ forgotPasswordPage, registeredUser }) => {
    const userEmail = registeredUser.email;
    
    // Step 1: Request password recovery
    await forgotPasswordPage.requestPasswordRecovery(userEmail);
    
    // Verify success message is displayed
    expect(await forgotPasswordPage.isRecoveryRequestSuccessful()).toBe(true);
    expect(await forgotPasswordPage.getSuccessMessage()).toContain('Email with instructions has been sent');
    
    // Step 2: Simulate email retrieval and extract reset link
    // Note: we'll simulate a valid reset token for demo purposes only
    const simulatedResetToken = 'valid-reset-token-12345';
    
    // TODO: Step 3: Navigate to the reset link
    // await passwordResetPage.gotoWithEmailAndToken(userEmail, simulatedResetToken);
    
    // TODO: Step 4: Verify we're on the correct reset form
    // expect(passwordResetPage.getCurrentUrl()).toContain('/passwordrecovery/reset');
    // expect(passwordResetPage.getCurrentUrl()).toContain(`email=${encodeURIComponent(userEmail)}`);
    // expect(passwordResetPage.getCurrentUrl()).toContain(`token=${simulatedResetToken}`);
    
    // TODO: Step 5: Verify reset form elements are visible and functional
  });
});
