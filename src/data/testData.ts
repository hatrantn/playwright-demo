/**
 * Test Data - nopCommerce Demo Site
 * Centralized test data management for different test scenarios
 */

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender?: string;
  newsletter?: boolean;
  company?: string;
}

export interface SearchData {
  searchTerm: string;
  category?: string;
  manufacturer?: string;
  priceFrom?: string;
  priceTo?: string;
  expectedResults?: number;
}


// Test users data - consolidated to reduce redundancy
export const testUsers: UserData[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'Test123!',
    gender: 'Male',
    newsletter: true,
    company: 'Test Company'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    password: 'Test456!',
    gender: 'Female',
    newsletter: false,
    company: 'Another Company'
  }
];

// Search test data
export const searchTestData: SearchData[] = [
  {
    searchTerm: 'computer',
    expectedResults: 10
  },
  {
    searchTerm: 'laptop',
    category: 'Computers',
    expectedResults: 5
  },
  {
    searchTerm: 'phone',
    category: 'Electronics',
    manufacturer: 'Apple',
    expectedResults: 3
  },
  {
    searchTerm: 'book',
    category: 'Books',
    priceFrom: '10',
    priceTo: '50',
    expectedResults: 8
  },
  {
    searchTerm: 'jewelry',
    category: 'Jewelry',
    expectedResults: 6
  },
  {
    searchTerm: 'nonexistentproduct',
    expectedResults: 0
  }
];

// Category data
export const categories = [
  'Computers',
  'Electronics',
  'Apparel',
  'Digital downloads',
  'Books',
  'Jewelry',
  'Gift Cards'
];

// Manufacturer data
export const manufacturers = [
  'Apple',
  'HP',
  'Nike'
];

// Price ranges for testing
export const priceRanges = [
  { from: '0', to: '100' },
  { from: '100', to: '500' },
  { from: '500', to: '1000' },
  { from: '1000', to: '2000' },
  { from: '2000', to: '5000' }
];

// Sort options
export const sortOptions = [
  { value: '0', text: 'Position' },
  { value: '5', text: 'Name: A to Z' },
  { value: '6', text: 'Name: Z to A' },
  { value: '10', text: 'Price: Low to High' },
  { value: '11', text: 'Price: High to Low' },
  { value: '15', text: 'Created on' }
];

// Page sizes
export const pageSizes = [
  { value: '3', text: '3' },
  { value: '6', text: '6' },
  { value: '9', text: '9' }
];

// Gender options
export const genderOptions = [
  'Male',
  'Female'
];

// Invalid test data - consolidated to reduce redundancy
export const invalidTestData = {
  invalidEmails: [
    'invalid-email',
    'test@',
    '@example.com',
    'test..test@example.com'
  ],
  invalidPasswords: [
    '123', // too short
    'password', // no uppercase
    'PASSWORD', // no lowercase
    'Password', // no numbers
    'Password123' // no special characters
  ]
};

// Utility functions for test data
export class TestDataUtils {
  /**
   * Generate unique email for testing
   */
  static generateUniqueEmail(prefix: string = 'test'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}${timestamp}${random}@example.com`;
  }

  /**
   * Generate random user data
   */
  static generateRandomUser(): UserData {
    const timestamp = Date.now();
    return {
      firstName: `Test${timestamp}`,
      lastName: `User${timestamp}`,
      email: this.generateUniqueEmail(),
      password: 'Test123!',
      gender: this.getRandomGender(),
      newsletter: true, // Default to checked
      company: `Company${timestamp}`
    };
  }

  /**
   * Get random search term
   */
  static getRandomSearchTerm(): string {
    const searchTerms = ['computer', 'laptop', 'phone', 'book', 'jewelry', 'gift card'];
    return searchTerms[Math.floor(Math.random() * searchTerms.length)];
  }

  /**
   * Get random category
   */
  static getRandomCategory(): string {
    return categories[Math.floor(Math.random() * categories.length)];
  }

  /**
   * Get random manufacturer
   */
  static getRandomManufacturer(): string {
    return manufacturers[Math.floor(Math.random() * manufacturers.length)];
  }

  /**
   * Get random price range
   */
  static getRandomPriceRange(): { from: string; to: string } {
    return priceRanges[Math.floor(Math.random() * priceRanges.length)];
  }

  /**
   * Get random gender
   */
  static getRandomGender(): string {
    return genderOptions[Math.floor(Math.random() * genderOptions.length)];
  }

  /**
   * Convert UserData to UserRegistrationData
   */
  static convertToRegistrationData(userData: UserData): any {
    return {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.password,
      gender: userData.gender,
      newsletter: userData.newsletter,
      company: userData.company
    };
  }
}
