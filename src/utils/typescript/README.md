# TypeScript Utilities

Frontend utility functions and calculations used throughout the Nexus RPG web application.

## Structure

### `/companion/`
Companion and mount calculations:
- `companionCalculations.ts` - HP, AV, damage calculations for companions
- `companionFormatting.ts` - Display formatting for companion stats

### `/creature/`
Creature builder utilities:
- `creatureBuilderCalculations.ts` - Stat block generation and balance calculations
- `creatureBuilderFormatting.ts` - Creature stat block formatting

### `/cli/`
Command-line tools:
- `creatureBuilderCLI.ts` - Interactive creature builder CLI

### Root Level
General utilities:
- `equipment.ts` - Equipment and item helpers
- `getHpBarColor.ts` - Health bar color calculations
- `htmlSanitizer.ts` - HTML content sanitization
- `spellDamageParser.ts` - Parse and calculate spell damage expressions

## Usage

These TypeScript utilities are imported and used throughout the React components in `/src/components/` and pages in `/src/pages/`.

Example:
```typescript
import { calculateCompanionHP } from '@site/src/utils/typescript/companion/companionCalculations';
import { getHpBarColor } from '@site/src/utils/typescript/getHpBarColor';
```

## Testing

Tests for these utilities are located in `/src/utils/__tests__/`.
