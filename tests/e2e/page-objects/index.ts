/**
 * Character Sheet E2E Test Page Objects
 * 
 * This module exports all page object models for character sheet testing.
 * Page objects provide a clean interface for interacting with UI components
 * and abstract away implementation details for maintainable tests.
 */

export { BasePage } from './BasePage'
export { StatisticsPage } from './StatisticsPage'
export { SkillsPage } from './SkillsPage'
export { ItemsPage } from './ItemsPage'
export { PersonalPage } from './PersonalPage'

// Re-export commonly used types for convenience
export type { Page, Locator } from '@playwright/test'