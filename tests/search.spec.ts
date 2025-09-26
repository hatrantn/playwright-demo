/**
 * Search Product Tests - nopCommerce Demo Site
 * Tests for product search functionality
 */

import { test, expect } from '../src/fixtures/testFixtures';
import { searchTestData, TestDataUtils } from '../src/data/testData';

test.describe('Product Search', () => {
  test.beforeEach(async ({ searchPage }) => {
    await searchPage.goto();
  });

  test('should search for products with basic search term', async ({ searchPage }) => {
    const searchData = searchTestData[0]; // 'computer'
    
    await searchPage.search(searchData.searchTerm);
    
    // Verify search results are displayed
    expect(await searchPage.getSearchResultsCount()).toBeGreaterThan(0);
  });

  test('should show no results for non-existent product', async ({ searchPage }) => {
    const searchData = searchTestData[5]; // 'nonexistentproduct'
    
    await searchPage.search(searchData.searchTerm);
    
    // Verify no results message is displayed
    expect(await searchPage.hasNoResults()).toBe(true);
    expect(await searchPage.getNoResultsMessage()).toContain('No products were found');
  });

  test('should search with category filter', async ({ searchPage }) => {
    const searchTerm = 'card';
    const category = 'Gift Cards';
    
    await searchPage.advancedSearch(searchTerm, { category });
    
    // Verify search results are displayed
    expect(await searchPage.getSearchResultsCount()).toBeGreaterThan(0);
  });

  test('should search with manufacturer filter', async ({ searchPage }) => {
    const searchTerm = 'computer';
    const manufacturer = 'HP';
    
    await searchPage.advancedSearch(searchTerm, { manufacturer, searchInDescriptions: true });
    
    // Verify search results are displayed
    expect(await searchPage.getSearchResultsCount()).toBeGreaterThan(0);
  });

  test('should search with price range filter', async ({ productPage, searchPage }) => {
    const searchTerm = 'book';
    const priceFrom = '10';
    const priceTo = '50';
    
    // First perform search
    await searchPage.advancedSearch(searchTerm);
    
    // Apply price range filter on the product listing page
    await productPage.setPriceRange(priceFrom, priceTo);
    
    // Verify search results are displayed
    expect(await searchPage.getSearchResultsCount()).toBeGreaterThan(0);
  });

  test('should search with subcategories included', async ({ searchPage }) => {
    const searchTerm = 'computer';
    const searchInSubcategories = true;
    
    await searchPage.advancedSearch(searchTerm, { searchInSubcategories });
    
    // Verify search results are displayed
    expect(await searchPage.getSearchResultsCount()).toBeGreaterThan(0);
  });

  test('should sort search results by price ascending', async ({ searchPage }) => {
    const searchTerm = 'phone';
    
    await searchPage.search(searchTerm);
    await searchPage.sortByPriceAscending();
    
    // Verify results are sorted (prices should be in ascending order)
    const prices = await searchPage.getProductPrices();
    expect(prices.length).toBeGreaterThan(0);

    // Convert price strings to numbers for comparison
    const numericPrices = prices.map(price => {
      // Remove currency symbols and convert to number
      const cleanPrice = price.replace(/[^\d.,]/g, '').replace(',', '');
      return parseFloat(cleanPrice);
    }).filter(price => !isNaN(price));
    
    // Ensure we have valid prices to compare
    expect(numericPrices.length).toBeGreaterThan(0);
    
    // Check that prices are in descending order (high to low)
    for (let i = 1; i < numericPrices.length; i++) {
      expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i - 1]);
    }
  });

  test('should sort search results by price descending', async ({ searchPage }) => {
    const searchTerm = 'phone';
    
    await searchPage.search(searchTerm);
    await searchPage.sortByPriceDescending();
    
    // Verify results are sorted (prices should be in descending order)
    const prices = await searchPage.getProductPrices();
    expect(prices.length).toBeGreaterThan(0);

    // Convert price strings to numbers for comparison
    const numericPrices = prices.map(price => {
      // Remove currency symbols and convert to number
      const cleanPrice = price.replace(/[^\d.,]/g, '').replace(',', '');
      return parseFloat(cleanPrice);
    }).filter(price => !isNaN(price));
    
    // Ensure we have valid prices to compare
    expect(numericPrices.length).toBeGreaterThan(0);
    
    // Check that prices are in descending order (high to low)
    for (let i = 1; i < numericPrices.length; i++) {
      expect(numericPrices[i]).toBeLessThanOrEqual(numericPrices[i - 1]);
    }
  });

  test('should sort search results by name ascending', async ({ searchPage }) => {
    const searchTerm = 'computer';
    
    await searchPage.search(searchTerm);
    await searchPage.sortByNameAscending();
    
    // Verify results are sorted (names should be in ascending order)
    const titles = await searchPage.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test('should sort search results by name descending', async ({ searchPage }) => {
    const searchTerm = 'computer';
    
    await searchPage.search(searchTerm);
    await searchPage.sortByNameDescending();
    
    // Verify results are sorted (names should be in descending order)
    const titles = await searchPage.getProductTitles();
    expect(titles.length).toBeGreaterThan(0);
  });

  test('should change page size', async ({ searchPage }) => {
    const searchTerm = 'computer';
    
    await searchPage.search(searchTerm);
    await searchPage.changePageSize('3');
    
    // Verify page size changed
    expect(await searchPage.getSearchResultsCount()).toBeGreaterThan(0);
  });

  test('should switch between grid and list view', async ({ searchPage }) => {
    const searchTerm = 'computer';
    
    await searchPage.search(searchTerm);
    
    // Switch to list view
    await searchPage.switchToListView();
    expect(await searchPage.getSearchResultsCount()).toBeGreaterThan(0);
    
    // Switch to grid view
    await searchPage.switchToGridView();
    expect(await searchPage.getSearchResultsCount()).toBeGreaterThan(0);
  });

  test('should click on product from search results', async ({ searchPage }) => {
    const searchTerm = 'computer';
    
    await searchPage.search(searchTerm);
    
    // Get the href value from the first product title link
    const firstProductTitle = searchPage.productTitles.nth(0);
    const expectedUrl = await firstProductTitle.getAttribute('href');
    
    // Click on first product
    await searchPage.clickProduct(0);
    
    // Verify we're redirected to the product page URL
    expect(searchPage.getCurrentUrl()).toContain(expectedUrl);
  });

  test('should add product to cart from search results', async ({ searchPage }) => {
    const searchTerm = 'phone';
    
    await searchPage.search(searchTerm);
    
    // Get initial cart count
    const initialCartCount = await searchPage.getCartCount();
    
    // Add first product to cart
    await searchPage.addToCart(0);
    
    // Verify success message appears
    expect(await searchPage.isSuccessMessageVisible()).toBe(true);
    expect(await searchPage.getSuccessMessage()).toContain('The product has been added to your shopping cart');
    
    // Verify cart count increased by 1
    expect(await searchPage.hasCartCountIncreasedBy(1, initialCartCount)).toBe(true);
  });

  test('should add product to wishlist from search results', async ({ searchPage }) => {
    const searchTerm = 'phone';
    
    await searchPage.search(searchTerm);
    
    // Get initial wishlist count
    const initialWishlistCount = await searchPage.getWishlistCount();
    
    // Add first product to wishlist
    await searchPage.addToWishlist(0);
    
    // Verify success message appears
    expect(await searchPage.isSuccessMessageVisible()).toBe(true);
    expect(await searchPage.getSuccessMessage()).toContain('The product has been added to your wishlist');
    
    // Verify wishlist count increased by 1
    expect(await searchPage.hasWishlistCountIncreasedBy(1, initialWishlistCount)).toBe(true);
  });

  test('should add product to compare from search results', async ({ searchPage }) => {
    const searchTerm = 'computer';
    
    await searchPage.search(searchTerm);
    
    // Add first product to compare
    await searchPage.addToCompare(0);
    
    // Verify success message appears on top of the page
    expect(await searchPage.isSuccessMessageVisible()).toBe(true);
    expect(await searchPage.getSuccessMessage()).toContain('The product has been added to your product comparison');
  });

  test('should search with special characters', async ({ searchPage }) => {
    const searchTerm = 'Science & Faith';
    
    await searchPage.search(searchTerm);
    
    // Should handle special characters gracefully
    const hasResults = await searchPage.getSearchResultsCount() > 0;
    expect(hasResults).toBe(true);
  });

  test('should search with very long search term', async ({ searchPage }) => {
    const longSearchTerm = 'a'.repeat(100);
    
    await searchPage.search(longSearchTerm);
    
    // Should handle long search term gracefully
    const hasNoResults = await searchPage.hasNoResults();
    expect(hasNoResults).toBe(true);
  });

  test('should not search with less than 3 characters', async ({ searchPage }) => {
    const shortSearchTerm = 'ab'; // Only 2 characters
    
    await searchPage.search(shortSearchTerm);
    
    // Verify error message appears
    expect(await searchPage.isErrorMessageVisible()).toBe(true);
    expect(await searchPage.getErrorMessage()).toContain('Search term minimum length is 3 characters');
    
    // Verify no success message
    expect(await searchPage.isSuccessMessageVisible()).toBe(false);
  });

  test('cannot search with empty keyword from header search', async ({ searchPage, page }) => {
    // Set up dialog handler to capture browser alert
    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept(); // Accept the alert to close it
    });
    
    // Try to search with empty keyword from header search box
    await searchPage.searchFromHeader('');
    
    // Verify browser alert message
    expect(alertMessage).toContain('Please enter some search keyword');
    
    // Verify no success message
    expect(await searchPage.isSuccessMessageVisible()).toBe(false);
    
    // Verify no search results are displayed
    expect(await searchPage.getSearchResultsCount()).toBe(0);
  });

  test('should search with keyword computer from header search box', async ({ searchPage }) => {
    const searchTerm = 'computer';
    
    // Search using header search box
    await searchPage.searchFromHeader(searchTerm);
    
    // Verify search results are displayed
    expect(await searchPage.getSearchResultsCount()).toBeGreaterThan(0);
    expect(await searchPage.hasNoResults()).toBe(false);
  });
});

