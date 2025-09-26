/**
 * Register Account Tests - nopCommerce Demo Site
 * Tests for user registration functionality
 */

import { test, expect } from '../src/fixtures/testFixtures';
import { testUsers, TestDataUtils } from '../src/data/testData';
import { TestHelpers } from '../src/utils/testHelpers';

test.describe('User Registration', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.goto();
  });

  test('should register a new user with complete information', async ({ registerPage }) => {
    // Check if newsletter checkbox is checked by default
    expect(await registerPage.isNewsletterChecked()).toBe(true);

    const userData = testUsers[0];
    userData.email = TestDataUtils.generateUniqueEmail();
    
    // Use TestHelpers for registration flow
    await TestHelpers.performRegistrationFlow(registerPage, userData);
    
    // Verify registration was successful using TestHelpers assertion
    await TestHelpers.assertRegistrationSuccess(registerPage);
    expect(await registerPage.getSuccessMessage()).toContain('Your registration completed');
  });

  test('should register a user with minimal required information', async ({ registerPage }) => {
    const userData = {
      firstName: 'Minimal',
      lastName: 'User',
      email: TestDataUtils.generateUniqueEmail(),
      password: 'Test123!',
      confirmPassword: 'Test123!'
    };
    
    await registerPage.registerMinimal(userData.firstName, userData.lastName, userData.email, userData.password);
    
    // Verify registration was successful using TestHelpers assertion
    await TestHelpers.assertRegistrationSuccess(registerPage);
  });

  test('should show validation error for empty required fields', async ({ registerPage }) => {
    await registerPage.clickElement(registerPage.registerButton);
    
    const errors = await registerPage.getFieldValidationErrors();
    expect(errors.length).toBeGreaterThan(0);
    
    // Verify error messages contain "is required" text
    const hasRequiredError = errors.some(error => 
      error.toLowerCase().includes('is required')
    );
    expect(hasRequiredError).toBe(true);
  });

  test('should show validation error for invalid email format', async ({ registerPage }) => {
    const userData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'invalid-email',
      password: 'Test123!',
      confirmPassword: 'Test123!'
    };
    
    await registerPage.registerMinimal(userData.firstName, userData.lastName, userData.email, userData.password);
    
    // Verify validation error is shown
    expect(await registerPage.hasValidationErrors()).toBe(true);
    const fieldErrors = await registerPage.getFieldValidationErrors();
    expect(fieldErrors.length).toBeGreaterThan(0);
    expect(fieldErrors[0].toLowerCase()).toMatch(/valid email address/);
  });

  test('should show validation error for password mismatch', async ({ registerPage }) => {
    const userData = {
      firstName: 'Test',
      lastName: 'User',
      email: TestDataUtils.generateUniqueEmail(),
      password: 'Test123!',
      confirmPassword: 'Different123!'
    };
    
    await registerPage.fillPersonalInformation(userData);
    await registerPage.fillInput(registerPage.confirmPasswordInput, userData.confirmPassword);
    await registerPage.clickElement(registerPage.registerButton);
    
    // Verify validation error is shown
    expect(await registerPage.hasValidationErrors()).toBe(true);
    // Verify field error message contains pasword do not match text
    const fieldErrors = await registerPage.getFieldValidationErrors();
    expect(fieldErrors.length).toBeGreaterThan(0);
    expect(fieldErrors[0].toLowerCase()).toMatch(/do not match/);
  });

  test('should show validation error for weak password', async ({ registerPage }) => {
    const userData = {
      firstName: 'Test',
      lastName: 'User',
      email: TestDataUtils.generateUniqueEmail(),
      password: '123',
      confirmPassword: '123'
    };
    
    await registerPage.registerMinimal(userData.firstName, userData.lastName, userData.email, userData.password);
    
    // Verify validation error is shown
    expect(await registerPage.hasValidationErrors()).toBe(true);

    // Verify field error message contains pasword rules-related text
    const fieldErrors = await registerPage.getFieldValidationErrors();
    expect(fieldErrors.length).toBeGreaterThan(0);
    expect(fieldErrors[0].toLowerCase()).toMatch(/at least 6 characters|not greater than 64 characters/);
  });

  test('should clear form fields when page refresh', async ({ registerPage }) => {
    const userData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'john.doe@example.com',
      password: 'Test123!',
      confirmPassword: 'Test123!',
      company: 'Test Company',
      newsletter: true,
      gender: 'Female'
    };
    
    // Fill form with data
    await registerPage.fillPersonalInformation(userData);
    await registerPage.fillCompanyInformation(userData);
    
    // Verify fields are filled
    expect(await registerPage.getSelectedGender()).toBe(userData.gender);
    expect(await registerPage.firstNameInput.inputValue()).toBe(userData.firstName);
    expect(await registerPage.lastNameInput.inputValue()).toBe(userData.lastName);
    expect(await registerPage.emailInput.inputValue()).toBe(userData.email);
    expect(await registerPage.companyInput.inputValue()).toBe(userData.company);
    expect(await registerPage.isNewsletterChecked()).toBe(userData.newsletter);
    expect(await registerPage.passwordInput.inputValue()).toBe(userData.password);
    expect(await registerPage.confirmPasswordInput.inputValue()).toBe(userData.password);
    
    // Refresh the page
    await registerPage.refresh();

    expect(await registerPage.getSelectedGender()).toBe('');
    // Verify fields are cleared after refresh
    expect(await registerPage.firstNameInput.inputValue()).toBe('');
    expect(await registerPage.lastNameInput.inputValue()).toBe('');
    expect(await registerPage.emailInput.inputValue()).toBe('');
    expect(await registerPage.companyInput.inputValue()).toBe('');
    expect(await registerPage.isNewsletterChecked()).toBe(true);
    expect(await registerPage.passwordInput.inputValue()).toBe('');
    expect(await registerPage.confirmPasswordInput.inputValue()).toBe('');
  });

  test('should handle registration with special characters in name', async ({ registerPage }) => {
    const userData = {
      firstName: 'José',
      lastName: 'García-López',
      email: TestDataUtils.generateUniqueEmail(),
      password: 'Test123!',
      confirmPassword: 'Test123!'
    };
    
    await registerPage.registerMinimal(userData.firstName, userData.lastName, userData.email, userData.password);
    
    // Verify registration was successful
    expect(await registerPage.isRegistrationSuccessful()).toBe(true);
  });

  test('should register user with company information', async ({ registerPage }) => {
    const userData = {
      firstName: 'Business',
      lastName: 'User',
      email: TestDataUtils.generateUniqueEmail(),
      password: 'Test123!',
      confirmPassword: 'Test123!',
      company: 'Test Company Inc.'
    };
    
    await registerPage.registerUser(userData);
    
    // Verify registration was successful
    expect(await registerPage.isRegistrationSuccessful()).toBe(true);
  });

  test('should register users with different gender options', async ({ registerPage }) => {
    const maleUser = {
      firstName: 'Male',
      lastName: 'User',
      email: TestDataUtils.generateUniqueEmail(),
      password: 'Test123!',
      confirmPassword: 'Test123!',
      gender: 'Male'
    };

    const femaleUser = {
      firstName: 'Female',
      lastName: 'User',
      email: TestDataUtils.generateUniqueEmail(),
      password: 'Test123!',
      confirmPassword: 'Test123!',
      gender: 'Female'
    };
    
    // Test Male gender registration
    await registerPage.registerUser(maleUser);
    expect(await registerPage.isRegistrationSuccessful()).toBe(true);
    
    // Navigate back to registration page for next user
    await registerPage.goto();
    
    // Test Female gender registration
    await registerPage.registerUser(femaleUser);
    expect(await registerPage.isRegistrationSuccessful()).toBe(true);
  });

  test('should register user without newsletter subscription', async ({ registerPage }) => {
    const userData = {
      firstName: 'No',
      lastName: 'Newsletter',
      email: TestDataUtils.generateUniqueEmail(),
      password: 'Test123!',
      confirmPassword: 'Test123!',
      newsletter: false
    };
    
    await registerPage.registerUser(userData);
    
    // Verify registration was successful
    expect(await registerPage.isRegistrationSuccessful()).toBe(true);
  });

  test('should not allow duplicate user registration with same email', async ({ registerPage }) => {
    const duplicateEmail = TestDataUtils.generateUniqueEmail();
    
    // First registration - should succeed
    const firstUser = {
      firstName: 'First',
      lastName: 'User',
      email: duplicateEmail,
      password: 'Test123!',
      confirmPassword: 'Test123!',
      gender: 'Male',
      newsletter: true,
      company: 'First Company'
    };
    
    await registerPage.registerUser(firstUser);
    expect(await registerPage.isRegistrationSuccessful()).toBe(true);
    
    // Navigate back to registration page for second attempt
    await registerPage.goto();
    
    // Second registration with same email - should fail
    const secondUser = {
      firstName: 'Second',
      lastName: 'User',
      email: duplicateEmail, // Same email as first user
      password: 'Test456!',
      confirmPassword: 'Test456!',
      gender: 'Female',
      newsletter: false,
      company: 'Second Company'
    };
    
    await registerPage.registerUser(secondUser);
    
    // Verify registration failed due to duplicate email
    expect(await registerPage.isRegistrationSuccessful()).toBe(false);
    expect(await registerPage.hasValidationErrors()).toBe(true);
    
    // Verify error message contains duplicate email text
    const errorMessage = await registerPage.getErrorMessage();
    expect(errorMessage.toLowerCase()).toMatch(/email|already|exists|duplicate|registered/);
  });
});
