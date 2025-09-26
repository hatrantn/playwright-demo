/**
 * Product Page Object - nopCommerce Demo Site
 * Handles product browsing, category navigation, and manufacturer filtering
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  // Category and Manufacturer Navigation Blocks
  readonly categoryNavigationBlock: Locator;
  readonly manufacturerNavigationBlock: Locator;

  // Category Grid Structure (for main categories)
  readonly categoryGrid: Locator;
  readonly categoryItemGrid: Locator;
  readonly categoryItemBox: Locator;

  // Product Selectors (for subcategories)
  readonly productSelectors: Locator;
  readonly productViewMode: Locator;
  readonly productSorting: Locator;
  readonly productPageSize: Locator;

  // Products Container (for subcategories)
  readonly noResultsMessage: Locator;
  readonly productsContainer: Locator;
  readonly productGrid: Locator;
  readonly productItemGrid: Locator;
  readonly productItemBox: Locator;
  readonly productPrices: Locator;
  
  // Price slider (for subcategory filtering)
  readonly priceRangeSlider: Locator;

  // Manufacturer group filter
  readonly productManufacturerGroup: Locator;
  readonly manufacturerFilter1: Locator;

  // Sort by dropdown
  readonly productsOrderBy: Locator;

  // Page size dropdown
  readonly productsPageSize: Locator;

  // View mode buttons
  readonly gridViewButton: Locator;
  readonly listViewButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Category and Manufacturer Navigation Block locators
    this.categoryNavigationBlock = page.locator('.block-category-navigation');
    this.manufacturerNavigationBlock = page.locator('.block-manufacturer-navigation');

    // Category Grid Structure locators (for main categories)
    this.categoryGrid = page.locator('.category-grid');
    this.categoryItemGrid = page.locator('.category-grid .item-grid');
    this.categoryItemBox = page.locator('.category-grid .item-grid .item-box');

    // Product Selectors locators (for subcategories)
    this.noResultsMessage = page.locator('.no-result');
    this.productSelectors = page.locator('.product-selectors');
    this.productViewMode = page.locator('.product-viewmode');
    this.productSorting = page.locator('.product-sorting');
    this.productPageSize = page.locator('.product-page-size');

    // Products Container locators (for subcategories)
    this.productsContainer = page.locator('.products-container');
    this.productGrid = page.locator('.product-grid');
    this.productItemGrid = page.locator('.product-grid .item-grid');
    this.productItemBox = page.locator('.product-grid .item-grid .item-box');
    this.productPrices = page.locator('.product-grid .actual-price');

    // Price slider
    this.priceRangeSlider = page.locator('#price-range-slider');

    // Manufacturer group filter
    this.productManufacturerGroup = page.locator('.product-manufacturer-group');
    this.manufacturerFilter1 = page.locator('#attribute-manufacturer-1');

    // Sort by dropdown
    this.productsOrderBy = page.locator('#products-orderby');

    // Page size dropdown
    this.productsPageSize = page.locator('#products-pagesize');

    // View mode buttons
    this.gridViewButton = page.locator('.viewmode-icon.grid');
    this.listViewButton = page.locator('.viewmode-icon.list');
  }

  /**
   * Navigate to product page
   */
  async goto(name: string): Promise<void> {
    await super.goto(`/${name}`);
  }

  /**
   * Navigate to a category using category navigation block
   */
  async navigateToCategory(categoryName: string): Promise<void> {
    const categoryLink = this.categoryNavigationBlock.locator(`a:has-text("${categoryName}")`);
    await this.clickElement(categoryLink);
  }

  /**
   * Navigate to a subcategory using category navigation block
   */
  async navigateToSubcategory(categoryName: string, subcategoryName: string): Promise<void> {
    // First navigate to the main category
    await this.navigateToCategory(categoryName);
    
    // Then navigate to the subcategory
    const subcategoryLink = this.categoryNavigationBlock.locator(`a:has-text("${subcategoryName}")`);
    await this.clickElement(subcategoryLink);
  }

  /**
   * Navigate to a manufacturer using manufacturer navigation block
   */
  async navigateToManufacturer(manufacturerName: string): Promise<void> {
    const manufacturerLink = this.manufacturerNavigationBlock.locator(`a:has-text("${manufacturerName}")`);
    await this.clickElement(manufacturerLink);
  }

  /**
   * Check if category navigation block is visible
   */
  async isCategoryNavigationVisible(): Promise<boolean> {
    return await this.isVisible(this.categoryNavigationBlock);
  }

  /**
   * Check if manufacturer navigation block is visible
   */
  async isManufacturerNavigationVisible(): Promise<boolean> {
    return await this.isVisible(this.manufacturerNavigationBlock);
  }

  /**
   * Get count of products in category grid
   */
  async getCategoryProductCount(): Promise<number> {
    try {
      const elements = await this.categoryItemBox.all();
      return elements.length;
    } catch {
      return 0;
    }
  }

  /**
   * Check if category grid is visible
   */
  async isCategoryGridVisible(): Promise<boolean> {
    return await this.isVisible(this.categoryGrid);
  }

  /**
   * Check if category item grid is visible
   */
  async isCategoryItemGridVisible(): Promise<boolean> {
    return await this.isVisible(this.categoryItemGrid);
  }

  /**
   * Check if product selectors are visible (for subcategories)
   */
  async isProductSelectorsVisible(): Promise<boolean> {
    return await this.isVisible(this.productSelectors);
  }

  /**
   * Check if product view mode selector is visible
   */
  async isProductViewModeVisible(): Promise<boolean> {
    return await this.isVisible(this.productViewMode);
  }

  /**
   * Check if product sorting selector is visible
   */
  async isProductSortingVisible(): Promise<boolean> {
    return await this.isVisible(this.productSorting);
  }

  /**
   * Check if product page size selector is visible
   */
  async isProductPageSizeVisible(): Promise<boolean> {
    return await this.isVisible(this.productPageSize);
  }

  /**
   * Check if products container is visible (for subcategories)
   */
  async isProductsContainerVisible(): Promise<boolean> {
    return await this.isVisible(this.productsContainer);
  }

  /**
   * Check if product grid is visible (for subcategories)
   */
  async isProductGridVisible(): Promise<boolean> {
    return await this.isVisible(this.productGrid);
  }

  /**
   * Check if product item grid is visible (for subcategories)
   */
  async isProductItemGridVisible(): Promise<boolean> {
    return await this.isVisible(this.productItemGrid);
  }

  /**
   * Get count of products in product grid (for subcategories)
   */
  async getProductGridCount(): Promise<number> {
    try {
      const elements = await this.productItemBox.all();
      return elements.length;
    } catch {
      return 0;
    }
  }

  /**
   * Set price range using slider widget (subcategory/manufacturer listing pages)
   */
  async setPriceRange(priceFrom?: string, priceTo?: string): Promise<void> {
    if (!priceFrom && !priceTo) {
      return;
    }

    await this.waitForElementAndScroll(this.priceRangeSlider, 5000);
    const sliderBox = await this.priceRangeSlider.boundingBox();
    if (!sliderBox) {
      throw new Error('Price range slider not found or not visible');
    }

    const sliderWidth = sliderBox.width;
    const sliderLeft = sliderBox.x;
    const sliderY = sliderBox.y + sliderBox.height / 2;

    if (priceFrom) {
      const minPrice = parseFloat(priceFrom);
      const minPosition = (minPrice / 1000) * sliderWidth; // adjust divisor if site max != 1000
      await this.page.mouse.click(sliderLeft + minPosition, sliderY);
      await this.page.waitForTimeout(100);
    }

    if (priceTo) {
      const maxPrice = parseFloat(priceTo);
      const maxPosition = (maxPrice / 1000) * sliderWidth;
      await this.page.mouse.click(sliderLeft + maxPosition, sliderY);
      await this.page.waitForTimeout(100);
    }
  }

  /** Reset price slider to defaults */
  async resetPriceSlider(): Promise<void> {
    const sliderBox = await this.priceRangeSlider.boundingBox();
    if (sliderBox) {
      await this.page.mouse.click(sliderBox.x, sliderBox.y + sliderBox.height / 2);
      await this.page.waitForTimeout(100);
    }
  }

  /** Check price slider visibility */
  async isPriceSliderVisible(): Promise<boolean> {
    return await this.isVisible(this.priceRangeSlider);
  }

  /**
   * Check if manufacturer group filter is visible
   */
  async isManufacturerGroupVisible(): Promise<boolean> {
    return await this.isVisible(this.productManufacturerGroup);
  }

  /**
   * Apply manufacturer filter by clicking the first manufacturer option
   */
  async applyManufacturerFilter(): Promise<void> {
    await this.waitForElementAndScroll(this.manufacturerFilter1, 5000);
    await this.clickElement(this.manufacturerFilter1);
  }

  /**
   * Check if manufacturer filter is applied (checked)
   */
  async isManufacturerFilterApplied(): Promise<boolean> {
    return await this.manufacturerFilter1.isChecked();
  }

  /**
   * Sort products by the specified option
   */
  async sortBy(sortOption: string): Promise<void> {
    await this.selectOption(this.productsOrderBy, sortOption);
  }

  /**
   * Get the currently selected sort option text
   */
  async getCurrentSortOption(): Promise<string> {
    const selectedOption = await this.productsOrderBy.locator('option:checked').first();
    const text = await selectedOption.textContent();
    return text || '';
  }

  /**
   * Check if sort by dropdown is visible
   */
  async isSortByVisible(): Promise<boolean> {
    return await this.isVisible(this.productsOrderBy);
  }

  /**
   * Get all available sort options
   */
  async getSortOptions(): Promise<string[]> {
    const options = await this.productsOrderBy.locator('option').all();
    return Promise.all(options.map(async option => {
      const text = await option.textContent();
      return text || '';
    }));
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
   * Change page size for product listing
   */
  async changePageSize(pageSize: string): Promise<void> {
    await this.selectOption(this.productsPageSize, pageSize);
  }

  /**
   * Get the currently selected page size text
   */
  async getCurrentPageSize(): Promise<string> {
    const selectedOption = await this.productsPageSize.locator('option:checked').first();
    const text = await selectedOption.textContent();
    return text || '';
  }

  /**
   * Check if page size dropdown is visible
   */
  async isPageSizeVisible(): Promise<boolean> {
    return await this.isVisible(this.productsPageSize);
  }

  /**
   * Get all available page size options
   */
  async getPageSizeOptions(): Promise<string[]> {
    const options = await this.productsPageSize.locator('option').all();
    return Promise.all(options.map(async option => {
      const text = await option.textContent();
      return text || '';
    }));
  }

  /**
   * Switch to grid view
   */
  async switchToGridView(): Promise<void> {
    await this.waitForElementAndScroll(this.gridViewButton, 5000);
    await this.clickElement(this.gridViewButton);
  }

  /**
   * Switch to list view
   */
  async switchToListView(): Promise<void> {
    await this.waitForElementAndScroll(this.listViewButton, 5000);
    await this.clickElement(this.listViewButton);
  }

  /**
   * Check if grid view is currently active
   */
  async isGridViewActive(): Promise<boolean> {
    const classAttr = await this.gridViewButton.getAttribute('class');
    return classAttr?.includes('selected') || false;
  }

  /**
   * Check if list view is currently active
   */
  async isListViewActive(): Promise<boolean> {
    const classAttr = await this.listViewButton.getAttribute('class');
    return classAttr?.includes('selected') || false;
  }

  /**
   * Check if view mode buttons are visible
   */
  async isViewModeVisible(): Promise<boolean> {
    return await this.isVisible(this.gridViewButton) && await this.isVisible(this.listViewButton);
  }

  /**
   * Check if there are no search results displayed
   */
  async hasNoResults(): Promise<boolean> {
    return await this.isVisible(this.noResultsMessage);
  }

  /**
   * Get the "no results" message text
   */
  async getNoResultsMessage(): Promise<string> {
    return await this.getText(this.noResultsMessage);
  }
}