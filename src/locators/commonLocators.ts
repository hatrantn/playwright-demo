/**
 * Common Locators - nopCommerce Demo Site
 * Centralized locator definitions to eliminate duplication across page objects
 */

export const CommonLocators = {
  // Form elements
  emailInput: '#Email',
  passwordInput: '#Password',
  confirmPasswordInput: '#ConfirmPassword',
  firstNameInput: '#FirstName',
  lastNameInput: '#LastName',
  companyInput: '#Company',
  
  // Buttons
  loginButton: 'button.login-button:has-text("Log in")',
  registerButton: 'button.register-button',
  
  // Checkboxes and Radio buttons
  rememberMeCheckbox: '#RememberMe',
  newsletterCheckbox: '#Newsletter',
  genderMaleRadio: '#gender-male',
  genderFemaleRadio: '#gender-female',
  
  // Links
  forgotPasswordLink: 'a[href="/passwordrecovery"]',
  
  // Messages
  successMessage: '.bar-notification.success, .notification.success, .message-success, .alert-success',
  errorMessage: '.message-error, .bar-notification.error, .notification.error, .alert-error',
  validationErrors: '.validation-summary-errors',
  fieldValidationErrors: '.field-validation-error',
  
  // Product actions
  addToCartButton: '#add-to-cart-button',
  addToWishlistButton: '#add-to-wishlist-button',
  addToCompareButton: '#add-to-compare-list-button',
  
  // Search elements
  searchBoxInput: '#small-searchterms',
  searchBoxButton: '.search-box-button',
  advancedSearchCheckbox: '#advs',
  searchInDescriptionsCheckbox: '#sid',
  
  // Product listing
  productItems: '.item-box',
  productGrid: '.product-grid',
  productItemGrid: '.product-grid .item-grid',
  productItemBox: '.product-grid .item-grid .item-box',
  
  // Category navigation
  categoryNavigationBlock: '.block-category-navigation',
  manufacturerNavigationBlock: '.block-manufacturer-navigation',
  categoryGrid: '.category-grid',
  categoryItemGrid: '.category-grid .item-grid',
  categoryItemBox: '.category-grid .item-grid .item-box',
  
  // Product selectors
  productSelectors: '.product-selectors',
  productViewMode: '.product-viewmode',
  productSorting: '.product-sorting',
  productPageSize: '.product-page-size',
  productsContainer: '.products-container',
  
  // Sorting and filtering
  productsOrderBy: '#products-orderby',
  productsPageSize: '#products-pagesize',
  gridViewButton: '.viewmode-icon.grid',
  listViewButton: '.viewmode-icon.list',
  priceRangeSlider: '#price-range-slider',
  
  // Manufacturer filters
  productManufacturerGroup: '.product-manufacturer-group',
  manufacturerFilter1: '#attribute-manufacturer-1',
  
  // Count elements
  cartCount: '.cart-qty, .cart-count, .shopping-cart-count, [class*="cart-count"], [class*="cart-qty"]',
  wishlistCount: '.wishlist-qty, .wishlist-count, .wishlist-items-count, [class*="wishlist-count"], [class*="wishlist-qty"]',
  
  // Account elements
  myAccountLink: 'a[href="/customer/info"]',
  loginLink: 'a[href="/login"]',
  registerLink: 'a[href="/register"]'
};
