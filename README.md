# nopCommerce Demo Site Automation Framework

A Playwright automation framework for testing the nopCommerce demo site (https://demo.nopcommerce.com) using Page Object Model pattern.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd playwright-demo
   npm install
   ```

2. **Install browsers**
   ```bash
   npx playwright install
   ```

## 🏃‍♂️ Running Tests

### Basic Commands
```bash
# Run all tests
npm test

# Run with browser visible
npm run test:headed

# Run with Playwright UI
npm run test:ui

# Debug mode
npm run test:debug
```

### Run Specific Test Suites
```bash
# Registration tests
npm run test:register

# Login tests  
npm run test:login

# Search tests
npm run test:search

# Filter tests
npm run test:filter

# Forgot password tests
npm run test:forgot-password
```

### Run by Browser
```bash
# Chrome only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# Safari only
npx playwright test --project=webkit
```

### View Reports
```bash
# Open HTML report
npm run test:report

# Show last report
npx playwright show-report
```

### 📊 Test Reports & Demo

**Interactive Test Report:**
[![Test Report](docs/index.html)](docs/index.html) - Click to view detailed test results

**Demo Video:**
[![Demo Video](docs/demo.mov)](docs/demo.mov) - Click to watch automation in action

**Report Features:**
- 📸 Screenshots of test failures
- 🎥 Video recordings of test execution
- 📊 Detailed test results and timing
- 🔍 Step-by-step test execution logs
- 📈 Test performance metrics

## ⚙️ Configuration

### Environment Variables (Optional)
Create `.env` file to override defaults:
```env
BASE_URL=https://demo.nopcommerce.com
HEADLESS=false
TIMEOUT=30000
```

### Test Data
- Test data is managed in `src/data/testData.ts`
- Users are automatically generated for each test run
- No manual test data setup required

## 📁 Project Structure
```
playwright-demo/
├── src/
│   ├── pages/          # Page Object Model classes
│   ├── fixtures/       # Test fixtures
│   ├── data/          # Test data
│   └── utils/         # Test utilities
├── tests/             # Test files
├── config/            # Environment config
└── playwright.config.ts
```

## 🐛 Troubleshooting

### Common Issues
1. **Browser not found**: Run `npx playwright install`
2. **Permission errors**: Run `chmod +x node_modules/.bin/playwright`
3. **Network issues**: Check internet connection and base URL

### Debug Tips
- Use `npm run test:debug` to step through tests
- Check HTML reports for screenshots and videos
- Run individual tests with `--grep` flag

## 📊 Test Coverage
- ✅ User Registration & Login
- ✅ Password Recovery
- ✅ Product Search & Filtering
- ✅ Category Navigation
- ✅ Cross-browser Testing

---

**Ready to test! 🎉**