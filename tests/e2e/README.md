# E2E Testing for Nexus RPG

This directory contains end-to-end tests for the Nexus RPG Character Sheet and other custom React tools using [Playwright](https://playwright.dev/).

## Quick Start

```bash
# Install dependencies (if not already done)
npm ci --legacy-peer-deps

# Run all E2E tests
npm run test:e2e

# Run with UI (interactive mode)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug mode (step through tests)
npm run test:e2e:debug

# View test report
npm run test:e2e:report
```

## Test Coverage

### Character Sheet Tests
- ✅ Basic functionality (loading, navigation, mock data)
- ✅ Tab navigation and URL state persistence
- ✅ Character editing and autosave functionality
- ✅ Responsive design (desktop, mobile, tablet)
- ✅ Error handling and edge cases

### Test Files
- `character-sheet-basic.spec.ts` - Core functionality
- `character-sheet-tabs.spec.ts` - Tab navigation
- `character-sheet-editing.spec.ts` - Form interactions and saving
- `character-sheet-responsive.spec.ts` - Multi-device testing
- `character-sheet-error-handling.spec.ts` - Edge cases and errors
- `character-sheet-quick.spec.ts` - Quick verification tests

## Features Tested

✅ **Character List**
- Load character list in development mode
- Display mock characters (Kael Stormwind, Thara Ironforge)
- Navigate to individual characters

✅ **Character Sheet Loading**
- Direct URL navigation with character ID
- Character name and level display
- Development mode notices

✅ **Tab Navigation**
- All 6 tabs (Skills, Items, Spells, Personal, Companions, Party)
- URL parameter persistence (`?tab=1`)
- Content verification per tab

✅ **Character Editing**
- Resolve value editing
- Fatigue level management
- XP and skill modifications
- Autosave functionality

✅ **Responsive Design**
- Desktop (1920x1080)
- Mobile (375x667) 
- Tablet (iPad Pro)
- Touch interactions
- Layout adaptability

✅ **Error Handling**
- Network errors
- Invalid character IDs
- Malformed URLs
- JavaScript errors
- Concurrent operations

## Development Mode

Tests are designed to work with the application's development mode:
- **Mock Data**: Uses predefined characters for consistent testing
- **No Authentication**: Bypasses login requirements
- **Autosave Simulation**: Mock save functionality

## CI/CD Integration

Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

See `.github/workflows/e2e-tests.yml` for CI configuration.

## Adding New Tests

1. **Identify Scenarios**: What user workflows need testing?
2. **Use Page Objects**: Leverage existing page object models
3. **Follow Patterns**: Use established test patterns and naming
4. **Document Changes**: Update this README with new coverage

## Architecture

### Page Object Models
- `BasePage.ts` - Common functionality
- `CharacterListPage.ts` - Character selection logic
- `CharacterSheetPage.ts` - Character sheet interactions

### Test Fixtures
- `testData.ts` - Mock characters and test constants
- Predefined URLs and expected states
- Utility functions for common operations

### Configuration
- `playwright.config.ts` - Test runner configuration
- Multi-browser support (Chromium, Mobile)
- Screenshot and video capture on failures

## Troubleshooting

**Tests failing locally?**
1. Ensure dev server is running (`npm start`)
2. Check browser installation (`npx playwright install`)
3. Run in headed mode to see what's happening

**Need to debug a test?**
1. Use `npm run test:e2e:debug`
2. Add `await page.pause()` to pause execution
3. Take screenshots with `await page.screenshot()`

**Tests working locally but failing in CI?**
1. Check the Playwright report artifact
2. Review screenshots/videos of failures
3. Ensure proper timing for async operations

For detailed documentation, see `docs/testing/e2e-testing-guide.md`.