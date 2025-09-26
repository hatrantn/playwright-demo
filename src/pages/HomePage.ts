/**
 * Home Page Object - nopCommerce Demo Site
 * Handles interactions with the main homepage
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Header elements
  readonly headerLogo: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly cartButton: Locator;
  readonly wishlistButton: Locator;
  readonly accountButton: Locator;
  readonly loginLink: Locator;
  readonly registerLink: Locator;

  // Navigation elements
  readonly computersMenu: Locator;
  readonly electronicsMenu: Locator;
  readonly apparelMenu: Locator;
  readonly digitalDownloadsMenu: Locator;
  readonly booksMenu: Locator;
  readonly jewelryMenu: Locator;
  readonly giftCardsMenu: Locator;


  // Footer elements
  readonly footer: Locator;
  readonly newsletterEmail: Locator;
  readonly newsletterSubscribeButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Header locators
    this.headerLogo = page.locator('.header-logo');
    this.searchBox = page.locator('#small-searchterms');
    this.searchButton = page.locator('.search-box-button');
    this.cartButton = page.locator('.cart-qty');
    this.wishlistButton = page.locator('.wishlist-qty');
    this.accountButton = page.locator('.account');
    this.loginLink = page.locator(this.locators.loginLink);
    this.registerLink = page.locator(this.locators.registerLink);

    // Navigation menu locators
    this.computersMenu = page.locator('a[href="/computers"]').first();
    this.electronicsMenu = page.locator('a[href="/electronics"]').first();
    this.apparelMenu = page.locator('a[href="/apparel"]').first();
    this.digitalDownloadsMenu = page.locator('a[href="/digital-downloads"]').first();
    this.booksMenu = page.locator('a[href="/books"]').first();
    this.jewelryMenu = page.locator('a[href="/jewelry"]').first();
    this.giftCardsMenu = page.locator('a[href="/gift-cards"]').first();


    // Footer locators
    this.footer = page.locator('.footer');
    this.newsletterEmail = page.locator('#newsletter-email');
    this.newsletterSubscribeButton = page.locator('#newsletter-subscribe-button');
  }

  /**
   * Navigate to homepage
   */
  async goto(): Promise<void> {
    await super.goto('/');
  }

  /**
   * Search for a product
   */
  async searchProduct(searchTerm: string): Promise<void> {
    await this.fillInput(this.searchBox, searchTerm);
    await this.clickElement(this.searchButton);
  }

  /**
   * Navigate to login page
   */
  async goToLogin(): Promise<void> {
    await this.clickElement(this.loginLink);
  }

  /**
   * Navigate to registration page
   */
  async goToRegister(): Promise<void> {
    await this.clickElement(this.registerLink);
  }

  /**
   * Navigate to Computers category
   */
  async goToComputers(): Promise<void> {
    await this.clickElement(this.computersMenu);
  }

  /**
   * Navigate to Electronics category
   */
  async goToElectronics(): Promise<void> {
    await this.clickElement(this.electronicsMenu);
  }

  /**
   * Navigate to Apparel category
   */
  async goToApparel(): Promise<void> {
    await this.clickElement(this.apparelMenu);
  }

  /**
   * Navigate to Books category
   */
  async goToBooks(): Promise<void> {
    await this.clickElement(this.booksMenu);
  }

  /**
   * Navigate to Jewelry category
   */
  async goToJewelry(): Promise<void> {
    await this.clickElement(this.jewelryMenu);
  }

  /**
   * Navigate to Gift Cards category
   */
  async goToGiftCards(): Promise<void> {
    await this.clickElement(this.giftCardsMenu);
  }

  /**
   * Subscribe to newsletter
   */
  async subscribeToNewsletter(email: string): Promise<void> {
    await this.fillInput(this.newsletterEmail, email);
    await this.clickElement(this.newsletterSubscribeButton);
  }

  /**
   * Get cart quantity
   */
  async getCartQuantity(): Promise<string> {
    return await this.getText(this.cartButton);
  }

  /**
   * Get wishlist quantity
   */
  async getWishlistQuantity(): Promise<string> {
    return await this.getText(this.wishlistButton);
  }

  /**
   * Check if user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.isVisible(this.accountButton);
  }

  /**
   * Get account button text
   */
  async getAccountButtonText(): Promise<string> {
    return await this.getText(this.accountButton);
  }

}

