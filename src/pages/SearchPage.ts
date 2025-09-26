/**
 * Search Page Object - nopCommerce Demo Site
 * Handles product search functionality and results
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface SearchFilters {
  category?: string;
  manufacturer?: string;
  searchInSubcategories?: boolean;
  searchInDescriptions?: boolean;
}

export interface SortOptions {
  position: string;
  name: string;
  price: string;
  createdOn: string;
}

export class SearchPage extends BasePage {
  // Search form elements
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchBoxInput: Locator;
  readonly searchBoxButton: Locator;
  readonly categorySelect: Locator;
  readonly manufacturerSelect: Locator;
  readonly searchInSubcategoriesCheckbox: Locator;
  readonly advancedSearchCheckbox: Locator;
  readonly searchInDescriptionsCheckbox: Locator;

  // Sort and display options
  readonly sortBySelect: Locator;
  readonly pageSizeSelect: Locator;
  readonly viewModeGrid: Locator;
  readonly viewModeList: Locator;

  // Search results
  readonly searchResults: Locator;
  readonly productItems: Locator;
  readonly productTitles: Locator;
  readonly productPrices: Locator;
  readonly productImages: Locator;
  readonly addToCartButtons: Locator;
  readonly addToWishlistButtons: Locator;
  readonly addToCompareButtons: Locator;

  // Pagination
  readonly pagination: Locator;
  readonly nextPageButton: Locator;
  readonly previousPageButton: Locator;
  readonly pageNumbers: Locator;

  // Messages
  readonly noResultsMessage: Locator;
  readonly searchResultsCount: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  // Cart
  readonly cartCount: Locator;

  // Wishlist
  readonly wishlistCount: Locator;

  constructor(page: Page) {
    super(page);
    
    // Search form locators
    this.searchInput = page.locator('#q');
    this.searchButton = page.locator('.search-button');
    this.searchBoxInput = page.locator('#small-searchterms');
    this.searchBoxButton = page.locator('.search-box-button');
    this.categorySelect = page.locator('#cid');
    this.manufacturerSelect = page.locator('#mid');
    this.searchInSubcategoriesCheckbox = page.locator('#isc');
    this.advancedSearchCheckbox = page.locator('#advs');
    // Note: On nopCommerce, "Search in product descriptions" uses id '#sid'
    this.searchInDescriptionsCheckbox = page.locator('#sid');

    // Sort and display locators
    this.sortBySelect = page.locator('#products-orderby');
    this.pageSizeSelect = page.locator('#products-pagesize');
    this.viewModeGrid = page.locator('.viewmode-icon.grid');
    this.viewModeList = page.locator('.viewmode-icon.list');

    // Search results locators
    this.searchResults = page.locator('.search-results');
    this.productItems = page.locator('.search-results .item-box');
    this.productTitles = page.locator('.search-results .product-title a');
    this.productPrices = page.locator('.search-results .actual-price');
    this.productImages = page.locator('.search-results .item-box img');
    this.addToCartButtons = page.locator('.search-results .product-box-add-to-cart-button');
    this.addToWishlistButtons = page.locator('.search-results .add-to-wishlist-button');
    this.addToCompareButtons = page.locator('.search-results .add-to-compare-list-button');

    // Pagination locators
    this.pagination = page.locator('.pager');
    this.nextPageButton = page.locator('.next-page');
    this.previousPageButton = page.locator('.previous-page');
    this.pageNumbers = page.locator('.pager .individual-page');

    // Message locators
    this.noResultsMessage = page.locator('.no-result');
    this.searchResultsCount = this.productItems;
    this.successMessage = page.locator('.bar-notification.success, .notification.success, .message-success, .alert-success').first();
    this.errorMessage = page.locator('.warning');

    // Cart locators
    this.cartCount = page.locator('.cart-qty, .cart-count, .shopping-cart-count, [class*="cart-count"], [class*="cart-qty"]').first();

    // Wishlist locators
    this.wishlistCount = page.locator('.wishlist-qty, .wishlist-count, .wishlist-items-count, [class*="wishlist-count"], [class*="wishlist-qty"]').first();
  }

  /**
   * Navigate to search page
   */
  async goto(): Promise<void> {
    await super.goto('/search');
  }

  /**
   * Perform basic search
   */
  async search(searchTerm: string): Promise<void> {
    await this.fillInput(this.searchInput, searchTerm);
    await this.clickElement(this.searchButton);
  }

  /**
   * Perform search using header search box
   */
  async searchFromHeader(searchTerm: string): Promise<void> {
    await this.fillInput(this.searchBoxInput, searchTerm);
    await this.clickElement(this.searchBoxButton);
  }

  /**
   * Perform advanced search with filters
   */
  async advancedSearch(searchTerm: string, filters: SearchFilters = {}): Promise<void> {
    await this.fillInput(this.searchInput, searchTerm);
    await this.enableAdvancedSearch();
    
    if (filters.category) {
      await this.selectOption(this.categorySelect, filters.category);
    }
    
    if (filters.manufacturer) {
      await this.selectOption(this.manufacturerSelect, filters.manufacturer);
    }
    
    if (filters.searchInSubcategories) {
      await this.checkCheckbox(this.searchInSubcategoriesCheckbox);
    }
    if (filters.searchInDescriptions) {
      await this.checkCheckbox(this.searchInDescriptionsCheckbox);
    }
    
    await this.clickElement(this.searchButton);

    // Note: Price range filtering is now handled by ProductPage on product listing pages
  }

  /**
   * Sort search results
   */
  async sortBy(sortOption: string): Promise<void> {
    await this.selectOption(this.sortBySelect, sortOption);
  }

  /**
   * Sort by price (low to high)
   */
  async sortByPriceAscending(): Promise<void> {
    await this.sortBy('10'); // Price: Low to High
  }

  /**
   * Sort by price (high to low)
   */
  async sortByPriceDescending(): Promise<void> {
    await this.sortBy('11'); // Price: High to Low
  }

  /**
   * Sort by name (A to Z)
   */
  async sortByNameAscending(): Promise<void> {
    await this.sortBy('5'); // Name: A to Z
  }

  /**
   * Sort by name (Z to A)
   */
  async sortByNameDescending(): Promise<void> {
    await this.sortBy('6'); // Name: Z to A
  }

  /**
   * Change page size
   */
  async changePageSize(size: string): Promise<void> {
    await this.selectOption(this.pageSizeSelect, size);
  }

  /**
   * Switch to grid view
   */
  async switchToGridView(): Promise<void> {
    await this.clickElement(this.viewModeGrid);
  }

  /**
   * Switch to list view
   */
  async switchToListView(): Promise<void> {
    await this.clickElement(this.viewModeList);
  }

  /**
   * Get number of search results
   */
  async getSearchResultsCount(): Promise<number> {
    try {
      const elements = await this.searchResultsCount.all();
      return elements.length;
    } catch {
      return 0;
    }
  }

  /**
   * Get all product titles
   */
  async getProductTitles(): Promise<string[]> {
    const titles: string[] = [];
    const titleElements = await this.productTitles.all();
    
    for (const titleElement of titleElements) {
      const title = await titleElement.textContent();
      if (title) {
        titles.push(title.trim());
      }
    }
    
    return titles;
  }

  /**
   * Get all product prices
   */
  async getProductPrices(): Promise<string[]> {
    const prices: string[] = [];
    const priceElements = await this.productPrices.all();
    
    for (const priceElement of priceElements) {
      const price = await priceElement.textContent();
      if (price) {
        prices.push(price.trim());
      }
    }
    
    return prices;
  }

  /**
   * Click on a product by index
   */
  async clickProduct(index: number): Promise<void> {
    const product = this.productItems.nth(index);
    await this.clickElement(product);
  }

  /**
   * Click on a product by title
   */
  async clickProductByTitle(title: string): Promise<void> {
    const productLink = this.productTitles.filter({ hasText: title }).first();
    await this.clickElement(productLink);
  }

  /**
   * Add product to cart by index
   */
  async addToCart(index: number): Promise<void> {
    const addToCartButton = this.addToCartButtons.nth(index);
    // Click the add to cart button
    await addToCartButton.click();
  }

  /**
   * Add product to wishlist by index
   */
  async addToWishlist(index: number): Promise<void> {
    const addToWishlistButton = this.addToWishlistButtons.nth(index);
    
    // Wait for element to be visible and scroll into view
    await this.waitForElementAndScroll(addToWishlistButton, 10000);
    
    // Additional wait to ensure element is fully loaded
    await addToWishlistButton.waitFor({ state: 'visible', timeout: 5000 });
    
    // Click the add to wishlist button
    await addToWishlistButton.click();
  }

  /**
   * Add product to compare by index
   */
  async addToCompare(index: number): Promise<void> {
    const addToCompareButton = this.addToCompareButtons.nth(index);
    
    // Wait for element to be visible and scroll into view
    await this.waitForElementAndScroll(addToCompareButton, 10000);
    
    // Additional wait to ensure element is fully loaded
    await addToCompareButton.waitFor({ state: 'visible', timeout: 5000 });
    
    // Click the add to compare button
    await addToCompareButton.click();
  }

  /**
   * Check if no results message is displayed
   */
  async hasNoResults(): Promise<boolean> {
    return await this.isVisible(this.noResultsMessage);
  }

  /**
   * Get no results message
   */
  async getNoResultsMessage(): Promise<string> {
    return await this.getText(this.noResultsMessage);
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string> {
    return await this.getText(this.successMessage);
  }

  /**
   * Check if success message is visible
   */
  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.successMessage);
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  /**
   * Get current cart count
   */
  async getCartCount(): Promise<number> {
    try {
      const countText = await this.getText(this.cartCount);
      // Extract number from text (e.g., "3 items" -> 3)
      const match = countText.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    } catch {
      return 0;
    }
  }

  /**
   * Check if cart count increased by expected amount
   */
  async hasCartCountIncreasedBy(expectedIncrease: number, initialCount: number): Promise<boolean> {
    const currentCount = await this.getCartCount();
    return currentCount === initialCount + expectedIncrease;
  }

  /**
   * Get current wishlist count
   */
  async getWishlistCount(): Promise<number> {
    try {
      const countText = await this.getText(this.wishlistCount);
      // Extract number from text (e.g., "3 items" -> 3)
      const match = countText.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    } catch {
      return 0;
    }
  }

  /**
   * Check if wishlist count increased by expected amount
   */
  async hasWishlistCountIncreasedBy(expectedIncrease: number, initialCount: number): Promise<boolean> {
    const currentCount = await this.getWishlistCount();
    return currentCount === initialCount + expectedIncrease;
  }

  /**
   * Go to next page
   */
  async goToNextPage(): Promise<void> {
    await this.clickElement(this.nextPageButton);
  }

  /**
   * Go to previous page
   */
  async goToPreviousPage(): Promise<void> {
    await this.clickElement(this.previousPageButton);
  }

  /**
   * Go to specific page number
   */
  async goToPage(pageNumber: number): Promise<void> {
    const pageLink = this.pageNumbers.filter({ hasText: pageNumber.toString() });
    await this.clickElement(pageLink);
  }

  /**
   * Check if pagination is available
   */
  async hasPagination(): Promise<boolean> {
    return await this.isVisible(this.pagination);
  }

  /**
   * Clear search form
   */
  async clearSearchForm(): Promise<void> {
    await this.searchInput.clear();
    // Note: Price slider reset is now handled by ProductPage
    if (await this.searchInSubcategoriesCheckbox.isChecked()) {
      await this.uncheckCheckbox(this.searchInSubcategoriesCheckbox);
    }
    if (await this.advancedSearchCheckbox.isChecked()) {
      await this.uncheckCheckbox(this.advancedSearchCheckbox);
    }
    if (await this.searchInDescriptionsCheckbox.isChecked()) {
      await this.uncheckCheckbox(this.searchInDescriptionsCheckbox);
    }
  }

  /**
   * Enable advanced search
   */
  async enableAdvancedSearch(): Promise<void> {
    await this.checkCheckbox(this.advancedSearchCheckbox);
  }

  /**
   * Disable advanced search
   */
  async disableAdvancedSearch(): Promise<void> {
    await this.uncheckCheckbox(this.advancedSearchCheckbox);
  }

  /**
   * Check if advanced search is enabled
   */
  async isAdvancedSearchEnabled(): Promise<boolean> {
    return await this.advancedSearchCheckbox.isChecked();
  }

  /**
   * Enable search in product descriptions
   */
  async enableSearchInDescriptions(): Promise<void> {
    await this.checkCheckbox(this.searchInDescriptionsCheckbox);
  }

  /**
   * Disable search in product descriptions
   */
  async disableSearchInDescriptions(): Promise<void> {
    await this.uncheckCheckbox(this.searchInDescriptionsCheckbox);
  }

  /**
   * Check if search in product descriptions is enabled
   */
  async isSearchInDescriptionsEnabled(): Promise<boolean> {
    return await this.searchInDescriptionsCheckbox.isChecked();
  }

}
