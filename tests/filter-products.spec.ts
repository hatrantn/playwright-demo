/**
 * Filter Products Tests - nopCommerce Demo Site
 * Tests for product filtering and sorting functionality
 */

import { test, expect } from '../src/fixtures/testFixtures';
import { categories, manufacturers, priceRanges, sortOptions, TestDataUtils } from '../src/data/testData';

test.describe('Product Filtering and Sorting', () => {
test.beforeEach(async ({ productPage }) => {
  // Navigate to Computers category via top menu before each test
  await productPage.goto('Computers');
});

  test.describe('Category Filtering', () => {
    test('should explore products by Electronics category using category navigation', async ({ productPage, searchPage }) => {
      // Navigate to Electronics category using category navigation block
      await productPage.navigateToCategory('Electronics');
      
      // Verify we're on the Electronics category page
      expect(searchPage.getCurrentUrl()).toContain('/electronics');
      
      // Verify category navigation block is visible
      expect(await productPage.isCategoryNavigationVisible()).toBe(true);
      
      // Verify category grid structure is visible (.category-grid > .item-grid > .item-box)
      expect(await productPage.isCategoryGridVisible()).toBe(true);
      expect(await productPage.isCategoryItemGridVisible()).toBe(true);
      
      // Verify products are displayed using category grid structure
      expect(await productPage.getCategoryProductCount()).toBeGreaterThan(0);
    });

    test('should explore products by Jewelry category using category navigation', async ({ productPage, searchPage }) => {
      // Navigate to Jewelry category using category navigation block
      await productPage.navigateToCategory('Jewelry');
      
      // Verify we're on the Jewelry category page
      expect(searchPage.getCurrentUrl()).toContain('/jewelry');
      
      // Verify category navigation block is visible
      expect(await productPage.isCategoryNavigationVisible()).toBe(true);
      
      // Verify category grid structure is visible (.product-grid > .item-grid > .item-box)
      expect(await productPage.isProductGridVisible()).toBe(true);
      expect(await productPage.isProductItemGridVisible()).toBe(true);
      
      // Verify products are displayed using product grid structure
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);
    });
  });

  test.describe('Subcategory Navigation', () => {
    test('should navigate to Electronics subcategory and see filters on the left', async ({ productPage, searchPage }) => {
      // Navigate to Electronics > Cell phones subcategory
      await productPage.navigateToSubcategory('Electronics', 'Cell phones');
      
      // Verify we're on the Cell phones subcategory page
      expect(searchPage.getCurrentUrl()).toContain('/cell-phones');
      
      // Verify category navigation block is visible (shows filters on the left)
      expect(await productPage.isCategoryNavigationVisible()).toBe(true);
      
      // Verify product selectors are visible (for subcategories)
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductViewModeVisible()).toBe(true);
      expect(await productPage.isProductSortingVisible()).toBe(true);
      expect(await productPage.isProductPageSizeVisible()).toBe(true);
      
      // Verify products container is visible (for subcategories)
      expect(await productPage.isProductsContainerVisible()).toBe(true);
      expect(await productPage.isProductGridVisible()).toBe(true);
      expect(await productPage.isProductItemGridVisible()).toBe(true);
      
      // Verify products are displayed using product grid structure
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);
    });

    test('should navigate to Apparel subcategory and see filters on the left', async ({ productPage, searchPage }) => {
      // Navigate to Apparel > Shoes subcategory
      await productPage.navigateToSubcategory('Apparel', 'Shoes');
      
      // Verify we're on the Shoes subcategory page
      expect(searchPage.getCurrentUrl()).toContain('/shoes');
      
      // Verify category navigation block is visible (shows filters on the left)
      expect(await productPage.isCategoryNavigationVisible()).toBe(true);
      
      // Verify product selectors are visible (for subcategories)
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductViewModeVisible()).toBe(true);
      expect(await productPage.isProductSortingVisible()).toBe(true);
      expect(await productPage.isProductPageSizeVisible()).toBe(true);
      
      // Verify products container is visible (for subcategories)
      expect(await productPage.isProductsContainerVisible()).toBe(true);
      expect(await productPage.isProductGridVisible()).toBe(true);
      expect(await productPage.isProductItemGridVisible()).toBe(true);
      
      // Verify products are displayed using product grid structure
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);
    });
  });

  test.describe('Manufacturer Filtering', () => {
    test('should explore products by Apple manufacturer using manufacturer navigation', async ({ productPage, searchPage }) => {
      // Navigate to Apple manufacturer using manufacturer navigation block
      await productPage.navigateToManufacturer('Apple');
      
      // Verify we're on the Apple manufacturer page
      expect(searchPage.getCurrentUrl()).toContain('/apple');
      
      // Verify manufacturer navigation block is visible
      expect(await productPage.isManufacturerNavigationVisible()).toBe(true);

      // Verify product listing structure for manufacturer pages (same as subcategory)
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductViewModeVisible()).toBe(true);
      expect(await productPage.isProductSortingVisible()).toBe(true);
      expect(await productPage.isProductPageSizeVisible()).toBe(true);

      // Verify products container and grid are visible
      expect(await productPage.isProductsContainerVisible()).toBe(true);
      expect(await productPage.isProductGridVisible()).toBe(true);
      expect(await productPage.isProductItemGridVisible()).toBe(true);

      // Verify products are displayed using product grid structure
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);
    });

    test('should explore products by HP manufacturer using manufacturer navigation', async ({ productPage, searchPage }) => {
      // Navigate to HP manufacturer using manufacturer navigation block
      await productPage.navigateToManufacturer('HP');
      
      // Verify we're on the HP manufacturer page
      expect(searchPage.getCurrentUrl()).toContain('/hp');
      
      // Verify manufacturer navigation block is visible
      expect(await productPage.isManufacturerNavigationVisible()).toBe(true);

      // Verify product listing structure for manufacturer pages (same as subcategory)
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductViewModeVisible()).toBe(true);
      expect(await productPage.isProductSortingVisible()).toBe(true);
      expect(await productPage.isProductPageSizeVisible()).toBe(true);

      // Verify products container and grid are visible
      expect(await productPage.isProductsContainerVisible()).toBe(true);
      expect(await productPage.isProductGridVisible()).toBe(true);
      expect(await productPage.isProductItemGridVisible()).toBe(true);

      // Verify products are displayed using product grid structure
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);
    });
  });

  test.describe('Price Range Filtering', () => {
    test('should filter products by price range 0-100 within a subcategory', async ({ productPage }) => {
      const priceRange = priceRanges[0]; // 0-100

      // Navigate to a subcategory first (listing page)
      await productPage.navigateToSubcategory('Computers', 'Desktops');

      // Ensure listing structure exists
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductsContainerVisible()).toBe(true);

      const initialCount = await productPage.getProductGridCount();

      // Adjust slider
      await productPage.setPriceRange(priceRange.from, priceRange.to);

      const updatedCount = await productPage.getProductGridCount();
      expect(updatedCount).toBeGreaterThan(0);
    });

    test('should filter products by price range 100-500 within a subcategory', async ({ productPage, searchPage }) => {
      const priceRange = priceRanges[1]; // 100-500

      await productPage.navigateToCategory('Jewelry');
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductsContainerVisible()).toBe(true);

      const initialCount = await productPage.getProductGridCount();
      await productPage.setPriceRange(priceRange.from, priceRange.to);
      const updatedCount = await productPage.getProductGridCount();
      expect(updatedCount).toBeGreaterThan(0);
    });

    test('should filter products by price range 500-1000 within a subcategory', async ({ productPage, searchPage }) => {
      const priceRange = priceRanges[2]; // 500-1000

      await productPage.navigateToSubcategory('Apparel', 'Shoes');
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductsContainerVisible()).toBe(true);

      const initialCount = await productPage.getProductGridCount();
      await productPage.setPriceRange(priceRange.from, priceRange.to);
      const updatedCount = await productPage.getProductGridCount();
      expect(updatedCount).toBeGreaterThan(0);
    });

    test('should filter products by price range 1000-2000 within a manufacturer', async ({ productPage }) => {
      const priceRange = priceRanges[3]; // 1000-2000
      
      await productPage.navigateToManufacturer('Apple');
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductsContainerVisible()).toBe(true);
      
      const initialCount = await productPage.getProductGridCount();
      await productPage.setPriceRange(priceRange.from, priceRange.to);
      const updatedCount = await productPage.getProductGridCount();
      expect(updatedCount).toBeGreaterThan(0);
    });

    test('should filter products by minimum price only within a subcategory', async ({ productPage }) => {
      const minPrice = '500';
      
      await productPage.navigateToSubcategory('Electronics', 'Camera & photo');
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductsContainerVisible()).toBe(true);
      
      const initialCount = await productPage.getProductGridCount();
      await productPage.setPriceRange(minPrice);
      const updatedCount = await productPage.getProductGridCount();
      expect(updatedCount).toBeGreaterThan(0);
    });

    test('should filter products by maximum price only within a subcategory', async ({ productPage }) => {
      const maxPrice = '1000';
      
      await productPage.navigateToSubcategory('Electronics', 'Camera & photo');
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductsContainerVisible()).toBe(true);
      
      const initialCount = await productPage.getProductGridCount();
      await productPage.setPriceRange(undefined, maxPrice);
      const updatedCount = await productPage.getProductGridCount();
      expect(updatedCount).toBeGreaterThan(0);
    });
  });

  test.describe('Combined Filtering', () => {
    test('should filter products by category and manufacturer', async ({ productPage, searchPage }) => {
      
      // Navigate to subcategory to access manufacturer filter
      await productPage.navigateToSubcategory('Electronics', 'Camera & photo');
      
      // Verify manufacturer group filter is visible
      expect(await productPage.isManufacturerGroupVisible()).toBe(true);
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductsContainerVisible()).toBe(true);
      
      // Apply manufacturer filter (first item in the list)
      await productPage.applyManufacturerFilter();
      
      // Verify manufacturer filter is applied
      expect(await productPage.isManufacturerFilterApplied()).toBe(true);
      
      // Verify results are filtered by both category and manufacturer
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);
    });

    test('should filter products by category and price range', async ({ productPage, searchPage }) => {
      const priceRange = priceRanges[2]; // 500-1000
      
      // Then navigate to subcategory and apply price filter
      await productPage.navigateToSubcategory('Electronics', 'Camera & photo');
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductsContainerVisible()).toBe(true);
      
      await productPage.setPriceRange(priceRange.from, priceRange.to);
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);
    });

    test('should filter products by manufacturer and price range', async ({ productPage, searchPage }) => {
      const priceRange = priceRanges[2]; // 500-1000
      
      // Then navigate to manufacturer page and apply price filter
      await productPage.navigateToManufacturer('Apple');
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductsContainerVisible()).toBe(true);
      
      await productPage.setPriceRange(priceRange.from, priceRange.to);
      // Verify no results message is displayed
      expect(await productPage.hasNoResults()).toBe(true);
      expect(await productPage.getNoResultsMessage()).toContain('No products were found');
    });

    test('should filter products by all filters combined', async ({ productPage, searchPage }) => {
      const priceRange = priceRanges[3]; // 1000-2000
      
      // Then navigate to subcategory and apply price filter
      await productPage.navigateToSubcategory('Electronics', 'Camera & photo');
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductsContainerVisible()).toBe(true);

      // Apply manufacturer filter (first item in the list)
      await productPage.applyManufacturerFilter();
      
      await productPage.setPriceRange(priceRange.from, priceRange.to);
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);
    });
  });

  test.describe('Sorting', () => {
    test('should sort products by price low to high', async ({ productPage }) => {
      await productPage.navigateToSubcategory('Electronics', 'Cell phones');
      
      // Sort products by price
      await productPage.sortBy('Price: Low to High');

      // Verify sort is applied
      const currentSort = await productPage.getCurrentSortOption();
      expect(currentSort).toContain('Price');
      
      // Verify results are sorted
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);

      // Get prices and verify they are sorted
      const prices = await productPage.getProductPrices();
      expect(prices.length).toBeGreaterThan(0);
      
      // Convert price strings to numbers for comparison
      const numericPrices = prices.map(price => {
        // Remove currency symbols and convert to number
        const cleanPrice = price.replace(/[^\d.,]/g, '').replace(',', '');
        return parseFloat(cleanPrice);
      }).filter(price => !isNaN(price));
      
      // Ensure we have valid prices to compare
      expect(numericPrices.length).toBeGreaterThan(1);
      
      // Check that prices are in ascending order (low to high)
      for (let i = 1; i < numericPrices.length; i++) {
        expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i - 1]);
      }
    });

    test('should sort products by price high to low', async ({ productPage }) => {
      await productPage.navigateToSubcategory('Electronics', 'Cell phones');
      
      // Sort products by price
      await productPage.sortBy('Price: High to Low');

      // Verify sort is applied
      const currentSort = await productPage.getCurrentSortOption();
      expect(currentSort).toContain('Price');
      
      // Verify results are sorted
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);

      // Get prices and verify they are sorted
      const prices = await productPage.getProductPrices();
      expect(prices.length).toBeGreaterThan(0);
      
      // Convert price strings to numbers for comparison
      const numericPrices = prices.map(price => {
        // Remove currency symbols and convert to number
        const cleanPrice = price.replace(/[^\d.,]/g, '').replace(',', '');
        return parseFloat(cleanPrice);
      }).filter(price => !isNaN(price));
      
      // Ensure we have valid prices to compare
      expect(numericPrices.length).toBeGreaterThan(1);
      
      // Check that prices are in descending order (high to low)
      for (let i = 1; i < numericPrices.length; i++) {
        expect(numericPrices[i]).toBeLessThanOrEqual(numericPrices[i - 1]);
      }
    });


    test('should sort products by name on product listing page', async ({ productPage }) => {
      // Navigate to a subcategory to access sort functionality
      await productPage.navigateToSubcategory('Electronics', 'Camera & photo');
      
      // Verify sort by dropdown is visible
      expect(await productPage.isSortByVisible()).toBe(true);
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      
      // Sort by name
      await productPage.sortBy('Name: A to Z');
      
      // Verify current sort option
      const currentSort = await productPage.getCurrentSortOption();
      expect(currentSort).toContain('Name');
      
      // Verify products are displayed
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);
    });
  });

  test.describe('Page Size and View Options', () => {
    test('should change page size to 3 products', async ({ productPage }) => {
      await productPage.navigateToSubcategory('Electronics', 'Cell phones');
      
      // Verify page size dropdown is visible
      expect(await productPage.isPageSizeVisible()).toBe(true);
      
      // Change page size to 3 products
      await productPage.changePageSize('3');
      
      // Verify current page size
      const currentPageSize = await productPage.getCurrentPageSize();
      expect(currentPageSize).toBe('3');
      
      // Verify products are displayed
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);
    });

    test('should change page size to 9 products', async ({ productPage }) => {
      await productPage.navigateToSubcategory('Electronics', 'Cell phones');
      
      // Verify page size dropdown is visible
      expect(await productPage.isPageSizeVisible()).toBe(true);
      
      // Change page size to 9 products
      await productPage.changePageSize('9');
      
      // Verify current page size
      const currentPageSize = await productPage.getCurrentPageSize();
      expect(currentPageSize).toBe('9');
      
      // Verify products are displayed
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);
    });

    test('should switch to grid view', async ({ productPage }) => {
      await productPage.navigateToSubcategory('Electronics', 'Cell phones');
      
      // Verify view mode buttons are visible
      expect(await productPage.isViewModeVisible()).toBe(true);
      
      // Switch to grid view
      await productPage.switchToGridView();
      
      // Verify grid view is active
      expect(await productPage.isGridViewActive()).toBe(true);
      
      // Verify products are displayed
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);
    });

    test('should switch to list view', async ({ productPage }) => {
      await productPage.navigateToSubcategory('Electronics', 'Cell phones');
      
      // Verify view mode buttons are visible
      expect(await productPage.isViewModeVisible()).toBe(true);
      
      // Switch to list view
      await productPage.switchToListView();
      
      // Verify list view is active
      expect(await productPage.isListViewActive()).toBe(true);
      
      // Verify products are displayed
      expect(await productPage.getProductGridCount()).toBeGreaterThan(0);
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle invalid price range', async ({ productPage }) => {
      const priceFrom = '1000';
      const priceTo = '500'; // Invalid: from > to
      
      await productPage.navigateToSubcategory('Computers', 'Desktops');
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductsContainerVisible()).toBe(true);
      
      // Should handle invalid range gracefully
      await productPage.setPriceRange(priceFrom, priceTo);
      const count = await productPage.getProductGridCount();
      expect(count >= 0).toBe(true); // Should not crash, may return 0 or some results
    });

    test('should handle very large price values', async ({ productPage }) => {
      const priceFrom = '999999';
      const priceTo = '9999999';
      
      await productPage.navigateToSubcategory('Electronics', 'Camera & photo');
      expect(await productPage.isProductSelectorsVisible()).toBe(true);
      expect(await productPage.isProductsContainerVisible()).toBe(true);
      
      // Should handle large values gracefully
      await productPage.setPriceRange(priceFrom, priceTo);
      const count = await productPage.getProductGridCount();
      expect(count >= 0).toBe(true); // Should not crash, may return 0 or some results
    });
  });
});

