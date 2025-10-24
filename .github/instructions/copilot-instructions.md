# Copilot Instructions for Nexus RPG

## Project Overview
**Nexus RPG** is a sword & sorcery tabletop RPG built as a Docusaurus documentation site with an interactive character sheet application. The project combines static markdown documentation with a complex React/Redux character management system using Firebase for persistence.

## Core Architecture

### Documentation (Docusaurus)
- **Base**: Docusaurus 3.7+ with TypeScript configuration
- **Structure**: `/docs/` contains game rules organized by sidebar categories (basic-rules, adventurers, statistics, equipment, combat, scenes, magic, creatures, tools)
- **Custom Components**: MDX files extensively use custom React components like `<RollableTable>`, `<CompanionBuilderWrapper>`, etc.
- **Build Commands**: `yarn start` (dev), `yarn build` (production), `yarn deploy` (Firebase)

### Character Sheet Application
- **State Management**: Redux Toolkit with persistent Firebase storage
- **Location**: All character sheet code in `/src/features/CharacterSheet/`
- **Entry Point**: `CharacterSheetWrapper.tsx` → `CharacterSheetContainer.tsx` → `CharacterSheet.tsx`
- **Data Flow**: URL params (`?id=collectionId-characterId`) → Firebase document → Redux store → UI components

### Firebase Integration
- **Config**: `/src/config/firebase.ts` with environment variables
- **Auth**: `/src/hooks/firebaseAuthContext.tsx` for user management
- **Storage**: User collections store character documents, shared notes in separate collection
- **Migration**: `/src/features/CharacterSheet/utils/migrateDoc.ts` handles data structure updates

## Key Development Patterns

### Character Data Structure
```typescript
// Main character document structure
CharacterDocument {
  docId: string
  docRef: DocumentReference
  personal: { name, folk, upbringing, background, allies[], contacts[], rivals[] }
  skills: { xp, skills[], abilities[], abilityCategoryVisibility }
  statistics: { attributes, health, statusEffects[] }
  items: { weapons[], items[], coins, encumbrance }
  spells: { focus, spells[] }
  companions: Companion[]
}
```

### Redux Actions Pattern
- **Naming**: `characterSheetActions.updateCharacter(update)` for deep partial updates
- **CRUD Operations**: Each data type has add/update/delete/reorder actions
- **Auto-save**: Changes trigger `unsavedChanges` flag → timeout → Firebase sync
- **Optimistic Updates**: UI updates immediately, Firebase syncs in background

### Component Architecture
- **Tab Structure**: `CharacterSheetTabs/` with numbered directories (00_Statistics, 01_Skills, etc.)
- **Reusable Components**: `AttributeField`, `SectionHeader`, `DynamicList` for drag-and-drop lists
- **Form Pattern**: Local state for inputs, `onBlur` triggers Redux updates

### Material-UI Integration
- **Theme**: Custom theme in `/src/hooks/createTheme.ts` with dark/light mode
- **Styling**: `sx` prop for component styling, responsive breakpoints
- **Components**: Extensive use of MUI components (TextField, IconButton, Accordion, etc.)

## Development Workflows

### Content Updates
1. **Game Rules**: Edit markdown files in `/docs/`, automatic rebuild
2. **Tables from Notion**: 
   - Export as HTML → `/src/utils/input/`
   - Run `python html-to-md.py` → `python split-table.py` 
   - Copy results to appropriate docs pages
3. **JSON Data**: Run `python markdown-to-json.py` to update tool references

### Character Sheet Development
1. **New Features**: Add reducer actions, update TypeScript types, create UI components
2. **Data Migration**: Update `migrateDoc.ts` when changing character structure
3. **Testing**: Use `?id=userId-characterId` URL pattern for testing specific characters

### Firebase Deployment
- **Commands**: `yarn build && yarn firebase:deploy`
- **Environment**: Requires `.env` with Firebase config variables
- **Permissions**: Admin users can access multiple character collections

## Project-Specific Conventions

### File Organization
- **Components**: Feature-based folders under `/src/features/`
- **Types**: Centralized in `/src/types/Character.ts` with comprehensive interfaces
- **Utils**: Helper functions in `/src/utils/` including table conversion scripts

### Naming Patterns
- **Reducers**: `characterSheetActions.verbNoun` (e.g., `updateAlly`, `addNewSpell`)
- **Components**: PascalCase with descriptive names (`StatusEffects`, `RestingButtonGroup`)
- **Props**: `ComponentNameProps` interface for each component

### State Management
- **Immutable Updates**: Using Immer through Redux Toolkit
- **Deep Merging**: `mergeDeep` utility for nested updates
- **UUID Generation**: `crypto.randomUUID()` for all new entities

### Firebase Patterns
- **Document Structure**: User UID as collection name, character documents as docs
- **Shared Data**: Separate `shared-notes` collection with `allowedCharacters` array
- **Error Handling**: Try-catch with user-friendly error states

## Critical Dependencies
- **Core**: React 18, Redux Toolkit, Material-UI 5, Firebase 10+
- **Docusaurus**: Custom remark plugins, MDX components, search integration
- **Build**: Babel, TypeScript, custom Python scripts for content processing

## Common Debugging Areas
- **Firebase Permissions**: Check user authentication and collection access
- **Redux DevTools**: Monitor state changes and action dispatching
- **Character Migration**: Console logs show migration processes
- **Auto-save**: Watch for `unsavedChanges` flag and timeout behavior

## Important Guidelines
- **DO NOT** create standalone markdown documentation files (e.g., FEATURE_NAME.md, SUMMARY.md) in the project root or elsewhere to document implemented features or changes
- **DO NOT** leave temporary test scripts (e.g., test-*.js, debug-*.js) in the repository after completing work - use them during development but always clean them up
- Document changes only through code comments, commit messages, or when explicitly requested by the user
- Keep the repository clean of temporary documentation artifacts and test files
