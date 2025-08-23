# Comprehensive E2E Test Suite for Character Sheet Tool

This directory contains a comprehensive end-to-end test suite for the Nexus RPG Character Sheet tool, providing complete coverage of all tabs and individual components to detect functional changes and regressions during refactoring.

## Quick Start

```bash
# Install dependencies (if not already done)
npm ci --legacy-peer-deps

# Install Playwright browsers
npx playwright install

# Start development server (required for tests)
npm start

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

## Comprehensive Test Coverage

### New Detailed Component Tests
- ✅ **Statistics Tab Components** - Attributes, HP, Defenses, Fatigue, Resting
- ✅ **Skills Tab Components** - XP, Skills, Abilities, Combat Arts, Talents, Search
- ✅ **Items Tab Components** - Inventory, Weapons, Equipment, Load, Search
- ✅ **Personal Tab Components** - Character details, Allies, Contacts, Rivals, Notes
- ✅ **Spells Tab Components** - Spell management, Focus tracking
- ✅ **Companions Tab Components** - Companion management
- ✅ **Party Tab Components** - Party management, Shared notes

### Navigation and Integration Tests
- ✅ **Tab Navigation** - Comprehensive tab switching, URL state, keyboard navigation
- ✅ **Cross-Tab Integration** - Data consistency, calculated values, autosave
- ✅ **Responsive Design** - All tabs tested across Desktop/Tablet/Mobile viewports

### Error Handling and Edge Cases
- ✅ **Input Validation** - Extreme values, XSS attempts, Unicode characters
- ✅ **Network Conditions** - Slow networks, interruptions, offline scenarios
- ✅ **User Interactions** - Rapid clicking, concurrent changes, memory pressure
- ✅ **Browser Compatibility** - Feature detection, accessibility compliance

### Enhanced Test Files

#### Component-Level Tests
- `character-sheet-statistics-detailed.spec.ts` - Complete Statistics tab testing
- `character-sheet-skills-detailed.spec.ts` - Complete Skills tab testing
- `character-sheet-items-detailed.spec.ts` - Complete Items tab testing
- `character-sheet-personal-detailed.spec.ts` - Complete Personal tab testing

#### Integration Tests
- `character-sheet-navigation-comprehensive.spec.ts` - Tab navigation and state
- `character-sheet-integration-comprehensive.spec.ts` - Cross-tab data consistency
- `character-sheet-remaining-tabs.spec.ts` - Spells, Companions, Party tabs
- `character-sheet-error-comprehensive.spec.ts` - Error handling and edge cases

#### Legacy Tests (Updated)
- `character-sheet-basic.spec.ts` - Core functionality
- `character-sheet-tabs.spec.ts` - Basic tab navigation
- `character-sheet-editing.spec.ts` - Form interactions and saving
- `character-sheet-responsive.spec.ts` - Multi-device testing
- `character-sheet-error-handling.spec.ts` - Basic edge cases
- `character-sheet-quick.spec.ts` - Quick verification tests

## Key Features Tested

✅ **All Character Sheet Tabs**
- Statistics: Attributes, HP, AV, Defenses, Fatigue, Status Effects
- Skills: XP, Skill ranks, Abilities, Combat Arts, Talents, Search dialogs
- Items: Inventory, Weapons, Equipment, Load management, Search functionality
- Spells: Spell lists, Focus tracking, Magic school organization
- Personal: Character details, Allies/Contacts/Rivals, Personal notes
- Companions: Animal companion tracking and management
- Party: Party member management, Shared notes

✅ **Individual Component Testing**
- Input field validation and interaction
- Button functionality and workflows
- Dialog opening, interaction, and closing
- Drag and drop functionality
- Search functionality across tabs
- Add/Edit/Delete operations
- Data persistence and autosave

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