# Integration Testing Strategy for Nexus RPG Tools

This document outlines the integration testing strategy for the Nexus RPG Character Sheet and other custom React tools using Vitest.

## Overview

We use [Vitest](https://vitest.dev/) with React Testing Library for comprehensive integration testing to ensure:
- Critical user flows work correctly
- Major refactors don't introduce regressions
- Character Sheet and tool functionality remains stable
- Component integration and user interactions function properly

## Key Benefits of Vitest Approach

- **Faster test execution** - No browser startup overhead
- **Better debugging experience** - Direct access to component state and props
- **User-centric testing** - Focus on actual user interactions with components
- **Easier maintenance** - Tests are more focused and less brittle than full E2E tests
- **Better CI performance** - Reduced infrastructure requirements

## Test Structure

### Test Organization

```
tests/integration/
├── character-sheet-basic.test.tsx      # Basic component rendering and functionality
├── character-sheet-editing.test.tsx    # Form interactions and user input
├── rpg-tools.test.tsx                  # Other RPG tools (spells, combat arts)
└── ...                                 # Additional integration tests
```

### Test Categories

1. **Basic Functionality** (`character-sheet-basic.test.tsx`)
   - Component rendering without errors
   - Development mode verification
   - Navigation and URL parameter handling
   - Responsive design behavior

2. **Editing and Form Interactions** (`character-sheet-editing.test.tsx`)
   - Form element detection and interaction
   - User input handling and validation
   - Tab navigation and component switching
   - Save functionality and autosave behavior

3. **RPG Tools Integration** (`rpg-tools.test.tsx`)
   - Combat Arts tool functionality
   - Arcane Spells filtering and search
   - Mystic Spells tradition organization
   - Cross-tool integration testing

5. **Error Handling** (`character-sheet-error-handling.spec.ts`)
   - Network errors and edge cases
   - Malformed inputs and URLs
   - Accessibility requirements

## Running Tests

### Local Development

```bash
# Run all integration tests
yarn test

# Run tests once (CI mode)
yarn test:run

# Run with UI (interactive mode)
yarn test:ui

# Run with coverage
yarn test:coverage
```

### Specific Test Patterns

```bash
# Run specific test file
yarn test character-sheet-basic

# Run specific test by pattern
yarn test --grep "should load character list"

# Run tests with specific configuration
yarn test --config vitest.config.ts
```

## Development Mode Testing

The Character Sheet E2E tests are designed to work with the application's development mode:

- **Mock Data**: Tests use predefined mock characters (`Kael Stormwind`, `Thara Ironforge`)
- **No Authentication**: Development mode bypasses login requirements
- **Autosave Simulation**: Mock save functionality simulates real behavior

### Mock Characters

- **Kael Stormwind**: Level 6 Akashic Scholar with magic abilities
- **Thara Ironforge**: Level 6 Vorthak Artisan with crafting focus

## Page Object Model Pattern

We use the Page Object Model (POM) pattern to:
- Encapsulate page interactions
- Improve test maintainability
- Reduce code duplication
- Provide clear abstractions

### Example Usage

```typescript
import { CharacterSheetPage } from '../page-objects/CharacterSheetPage'

test('should edit character resolve', async ({ page }) => {
  const characterSheet = new CharacterSheetPage(page)
  
  await characterSheet.navigateToCharacter('mock-character-id')
  await characterSheet.setResolveValue(3)
  
  expect(await characterSheet.getResolveValue()).toBe(3)
})
```

## Adding New Tests

### 1. Identify Test Scenarios

Consider these aspects when adding new tests:
- **User Workflows**: How do users actually use the feature?
- **Edge Cases**: What could go wrong?
- **Regression Points**: What breaks during refactors?
- **Cross-Platform**: Does it work on mobile/desktop?

### 2. Choose Appropriate Test Type

- **Basic Functionality**: Core feature works
- **User Interaction**: Complex user workflows
- **Responsive**: Different viewport behaviors
- **Error Handling**: Edge cases and failures

### 3. Follow Naming Conventions

```typescript
test.describe('Component Name - Test Category', () => {
  test('should perform specific action when condition', async () => {
    // Test implementation
  })
})
```

### 4. Use Page Objects

Always use Page Object Models for interacting with the UI:

```typescript
// Good
await characterSheet.setResolveValue(3)

// Avoid
await page.locator('input[aria-label="Resolve"]').fill('3')
```

### 5. Add Appropriate Assertions

```typescript
// Verify state changes
expect(await characterSheet.getResolveValue()).toBe(3)

// Verify UI elements
expect(await characterSheet.isCharacterSheetLoaded()).toBe(true)

// Verify behavior
expect(await characterSheet.isAutosaveWorking()).toBe(true)
```

## Testing New Custom Tools

When adding E2E tests for new custom React tools:

### 1. Create Page Object Model

```typescript
// tests/e2e/page-objects/NewToolPage.ts
import { BasePage } from './BasePage'

export class NewToolPage extends BasePage {
  // Tool-specific selectors and methods
}
```

### 2. Create Test Fixtures

```typescript
// Add to tests/e2e/fixtures/testData.ts
export const NEW_TOOL_DATA = {
  // Test data specific to the new tool
} as const
```

### 3. Create Test Suites

Follow the same pattern as Character Sheet tests:
- Basic functionality
- User interactions
- Responsive design
- Error handling

### 4. Update CI Configuration

Tests for new tools will automatically run with the existing CI setup.

## Best Practices

### Test Writing

1. **Independent Tests**: Each test should be able to run independently
2. **Clear Assertions**: Use descriptive expect statements
3. **Realistic Data**: Use data that resembles real user scenarios
4. **Error Tolerance**: Handle network delays and loading states
5. **Cross-Browser**: Test critical flows on multiple browsers

### Performance

1. **Selective Testing**: Don't test every minor UI change
2. **Parallel Execution**: Leverage Playwright's parallel capabilities
3. **Smart Waiting**: Use `waitForLoadState` instead of arbitrary timeouts
4. **Resource Cleanup**: Properly close contexts and pages

### Maintenance

1. **Regular Updates**: Keep tests updated with UI changes
2. **Flaky Test Handling**: Investigate and fix unstable tests promptly
3. **Documentation**: Keep this guide updated with new patterns
4. **Review Process**: Include E2E test updates in code reviews

## Continuous Integration

### GitHub Actions

E2E tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

### Test Reports

- **Playwright Report**: Detailed test results with screenshots/videos
- **Artifacts**: Uploaded for 30 days retention
- **JUnit XML**: For integration with other tools

### Failure Handling

When E2E tests fail in CI:
1. Check the Playwright report artifact
2. Review screenshots/videos of failures
3. Reproduce locally if needed
4. Fix the issue or update tests accordingly

## Troubleshooting

### Common Issues

1. **Test Timeouts**: Increase timeout for slow operations
2. **Element Not Found**: Check for timing issues or selector changes
3. **Network Errors**: Ensure proper offline/online state handling
4. **Browser Differences**: Test on multiple browsers locally

### Debugging Tips

1. **Use UI Mode**: `yarn test:ui` for interactive debugging
2. **Use Coverage**: `yarn test:coverage` to see test coverage reports
3. **Console Logs**: Check browser console for errors in jsdom environment
4. **Component State**: Debug component state and props directly in tests

## Future Enhancements

- **Visual Regression Testing**: Compare screenshots across builds
- **Accessibility Testing**: Automated a11y checks
- **Performance Testing**: Load time and interaction metrics
- **API Testing**: Integration with backend services
- **Cross-Device Testing**: Real device testing with cloud providers