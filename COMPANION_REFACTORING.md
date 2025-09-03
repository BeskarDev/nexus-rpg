# CompanionBuilder Refactoring

This document describes the refactoring of the CompanionBuilder component to improve maintainability and organization.

## Overview

The original CompanionBuilder component was a single file with ~950 lines of code, making it difficult to maintain and understand. It has been refactored into smaller, focused components and utility functions.

## Refactored Structure

### Types
- `src/types/companion.ts` - Contains all TypeScript interfaces for companion data

### Utility Functions
- `src/utils/companionCalculations.ts` - All calculation logic (stats, modifiers, damage, etc.)
- `src/utils/companionFormatting.ts` - Text formatting and output generation (Markdown, JSON)

### Custom Hook
- `src/hooks/useCompanionBuilder.ts` - State management and business logic for the companion builder

### UI Components
- `src/components/CompanionBuilder.tsx` - Main container component (significantly reduced)
- `src/components/CompanionForm.tsx` - Form inputs for tier, size, and trait selection
- `src/components/CompanionStatBlock.tsx` - Display component for the calculated stats
- `src/components/CompanionOutputPanel.tsx` - Reusable component for Markdown/JSON output
- `src/components/TabPanel.tsx` - Generic tab panel component

## Benefits of the Refactoring

1. **Separation of Concerns**: Each file has a single responsibility
2. **Reusability**: Components and utilities can be reused elsewhere
3. **Testability**: Individual functions and components can be easily unit tested
4. **Maintainability**: Easier to locate and modify specific functionality
5. **Readability**: Smaller files are easier to understand and navigate

## Component Responsibilities

### CompanionBuilder (Main)
- Dialog management
- Tab state management
- Integration of all sub-components

### CompanionForm
- User input handling
- Validation of form selections
- Reset functionality

### CompanionStatBlock
- Presentation of calculated companion statistics
- Responsive layout for stats display

### CompanionOutputPanel
- Output generation and display
- Clipboard functionality
- Import to character functionality

### useCompanionBuilder Hook
- State management for selections
- Auto-calculation triggers
- Business logic coordination

### Utility Functions
- **companionCalculations.ts**: Pure functions for all stat calculations
- **companionFormatting.ts**: Text transformation and output generation

## File Size Reduction

- **Before**: 1 file, ~950 lines
- **After**: 8 files, distributed as follows:
  - CompanionBuilder.tsx: ~80 lines
  - CompanionForm.tsx: ~100 lines  
  - CompanionStatBlock.tsx: ~150 lines
  - CompanionOutputPanel.tsx: ~70 lines
  - TabPanel.tsx: ~20 lines
  - useCompanionBuilder.ts: ~80 lines
  - companionCalculations.ts: ~300 lines
  - companionFormatting.ts: ~100 lines

Each file is now focused and manageable in size.
