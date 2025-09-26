/**
 * Base Page Class - Foundation for all page objects
 * Implements common functionality and utilities for page interactions
 */

import { Page, Locator, expect } from '@playwright/test';
import { getConfig } from '../../config/environment';
import { CommonLocators } from '../locators/commonLocators';
import { CommonMessages } from '../locators/commonMessages';

export class BasePage {
  protected page: Page;
  protected config = getConfig();
  protected locators = CommonLocators;
  protected messages = CommonMessages;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url: string = ''): Promise<void> {
    const fullUrl = url.startsWith('http') ? url : `${this.config.baseUrl}${url}`;
    try {
      await this.page.goto(fullUrl, { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
      });
      await this.waitForPageLoad();
    } catch (error) {
      console.warn(`Navigation to ${fullUrl} timed out, retrying...`);
      // Retry once with shorter timeout
      await this.page.goto(fullUrl, { 
        waitUntil: 'domcontentloaded',
        timeout: 15000 
      });
      await this.waitForPageLoad();
    }
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    try {
      // Wait for DOM content to be loaded first (faster)
      await this.page.waitForLoadState('domcontentloaded', { timeout: 15000 });
      // Then wait for network to be idle (with shorter timeout)
      await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    } catch (error) {
      console.warn('Page load timeout, continuing with DOM content loaded state');
      // Fallback to just DOM content loaded if network idle times out
      await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 });
    }
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator, timeout: number = this.config.browser.timeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be visible and scroll into view
   */
  async waitForElementAndScroll(locator: Locator, timeout: number = this.config.browser.timeout): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await this.scrollIntoView(locator);
    // Wait a bit more after scrolling to ensure element is fully visible
    await this.page.waitForTimeout(500);
  }

  /**
   * Wait for element to be hidden
   */
  async waitForElementHidden(locator: Locator, timeout: number = this.config.browser.timeout): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Click element with retry mechanism
   */
  async clickElement(locator: Locator, timeout: number = this.config.browser.timeout): Promise<void> {
    await this.waitForElementAndScroll(locator, timeout);
    await locator.click();
  }

  /**
   * Fill input field with text
   */
  async fillInput(locator: Locator, text: string, timeout: number = this.config.browser.timeout): Promise<void> {
    await this.waitForElementAndScroll(locator, timeout);
    await locator.clear();
    await locator.fill(text);
  }

  /**
   * Select option from dropdown
   */
  async selectOption(locator: Locator, value: string, timeout: number = this.config.browser.timeout): Promise<void> {
    await this.waitForElement(locator, timeout);
    await locator.selectOption(value);
  }

  /**
   * Check checkbox
   */
  async checkCheckbox(locator: Locator, timeout: number = this.config.browser.timeout): Promise<void> {
    await this.waitForElement(locator, timeout);
    await locator.check();
  }

  /**
   * Uncheck checkbox
   */
  async uncheckCheckbox(locator: Locator, timeout: number = this.config.browser.timeout): Promise<void> {
    await this.waitForElement(locator, timeout);
    await locator.uncheck();
  }

  /**
   * Get text content from element
   */
  async getText(locator: Locator, timeout: number = this.config.browser.timeout): Promise<string> {
    await this.waitForElement(locator, timeout);
    return await locator.textContent() || '';
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if element exists
   */
  async exists(locator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'attached', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}-${Date.now()}.png` });
  }

  /**
   * Wait for URL to contain specific text
   */
  async waitForUrl(url: string, timeout: number = this.config.browser.timeout): Promise<void> {
    await this.page.waitForURL(`**${url}**`, { timeout });
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Refresh page
   */
  async refresh(): Promise<void> {
    await this.page.reload();
    await this.waitForPageLoad();
  }

  /**
   * Go back in browser history
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
    await this.waitForPageLoad();
  }

  /**
   * Wait for network requests to complete
   */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Handle alert dialogs
   */
  async handleAlert(accept: boolean = true): Promise<void> {
    this.page.on('dialog', async dialog => {
      if (accept) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }

  /**
   * Common message handling methods
   */
  async getSuccessMessage(): Promise<string> {
    const successLocator = this.page.locator(this.locators.successMessage);
    if (await this.isVisible(successLocator)) {
      return await this.getText(successLocator);
    }
    return '';
  }

  async getErrorMessage(): Promise<string> {
    const errorLocator = this.page.locator(this.locators.errorMessage);
    if (await this.isVisible(errorLocator)) {
      return await this.getText(errorLocator);
    }
    return '';
  }

  async getValidationErrors(): Promise<string[]> {
    const errors: string[] = [];
    const errorElements = await this.page.locator(this.locators.validationErrors).all();
    
    for (const errorElement of errorElements) {
      const errorText = await errorElement.textContent();
      if (errorText) {
        errors.push(errorText.trim());
      }
    }
    
    return errors;
  }

  async getFieldValidationErrors(): Promise<string[]> {
    const errors: string[] = [];
    const errorElements = await this.page.locator(this.locators.fieldValidationErrors).all();
    
    for (const errorElement of errorElements) {
      const errorText = await errorElement.textContent();
      if (errorText) {
        errors.push(errorText.trim());
      }
    }
    
    return errors;
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.page.locator(this.locators.successMessage));
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.page.locator(this.locators.errorMessage));
  }

  async hasValidationErrors(): Promise<boolean> {
    const validationErrors = await this.page.locator(this.locators.validationErrors);
    const fieldErrors = await this.page.locator(this.locators.fieldValidationErrors);
    
    return await this.isVisible(validationErrors) || await this.isVisible(fieldErrors);
  }
}
