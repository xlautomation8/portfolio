# Playwright Automated Test Suite

This directory contains automated tests for the Utkarsh Sinha portfolio website using Playwright.

## Setup

### 1. Install Dependencies

```bash
npm install
```

This will install Playwright and all required dependencies.

### 2. Installation (First Time)

```bash
npx playwright install
```

This downloads the necessary browser binaries (Chromium, Firefox, WebKit).

## Running Tests

### Run All Tests
```bash
npm test
```

Runs all tests across all configured browsers (Chromium, Firefox, WebKit).

### Run Tests in UI Mode (Interactive)
```bash
npm run test:ui
```

Opens the Playwright Inspector with an interactive UI where you can:
- Watch tests run step-by-step
- Pause and inspect elements
- See test reports in real-time

### Run Tests in Debug Mode
```bash
npm run test:debug
```

Runs tests with the debugger attached, allowing you to:
- Step through test code
- Inspect variables
- Set breakpoints

### Run Tests for Specific Browser

```bash
npm run test:chromium     # Chromium only
npm run test:firefox      # Firefox only
npm run test:webkit       # WebKit/Safari only
npm run test:mobile       # Mobile browsers only
```

### View Test Report

After running tests, view the HTML report:

```bash
npm run test:report
```

This opens the interactive Playwright report showing:
- Test results
- Screenshots (on failure)
- Video recordings (if enabled)
- Trace information

## Test Structure

### Test File: `portfolio.spec.ts`

Contains 8 automated test cases covering:

1. **Home page and hero content** - Verify hero section displays correct name, role, and metrics
2. **Top navigation anchor behavior** - Verify all navigation links scroll to correct sections
3. **Hero CTAs routing** - Verify call-to-action buttons navigate correctly
4. **Certificates page link** - Verify certificates page loads without errors
5. **Resume PDF download** - Verify resume PDF link is accessible
6. **Email contact link** - Verify email link uses mailto protocol
7. **Phone contact link** - Verify phone link uses tel protocol
8. **LinkedIn profile link** - Verify LinkedIn link is accessible

## Configuration

### Playwright Config: `playwright.config.ts`

Settings:
- **Base URL:** https://utkarsh.site
- **Browsers:** Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Reporters:** HTML, JSON, JUnit XML
- **Screenshots:** Only on failure
- **Timeout:** 30 seconds per test

## Output

Test results are saved to `tests/output/`:

- `playwright-report/` - Interactive HTML report
- `playwright-results.json` - Machine-readable JSON results
- `junit-results.xml` - JUnit format for CI/CD integration

## CI/CD Integration

To use in CI/CD pipelines:

```bash
CI=true npm test
```

This enables:
- Retry on failures (2 retries)
- Parallel test execution (1 worker)
- Full trace collection on failures

## Troubleshooting

### Tests timeout
Increase timeout in `playwright.config.ts`:
```typescript
timeout: 60 * 1000, // 60 seconds
```

### Browser crashes
Try running with a specific browser:
```bash
npm run test:chromium
```

### Need to update selectors
Run tests in debug mode and inspect elements:
```bash
npm run test:debug
```

## Test Maintenance

To update selectors after website changes:

1. Run tests in UI mode: `npm run test:ui`
2. Use the Inspector to identify new selectors
3. Update selectors in `portfolio.spec.ts`
4. Re-run tests to verify

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Selectors](https://playwright.dev/docs/selectors)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## Contact

For test-related questions or improvements, contact the QA team.
