# Component Refactoring Plan

## Overview
This plan addresses the feedback to refactor components-as-const constructs into separate component files, and to generalize the UnifiedListItem component to be more configurable via props.

## Current Issues
1. **Components-as-const**: Row components (AbilityRow, WeaponRow, ItemRow, SpellRow) define `summaryContent` and `detailsContent` as const JSX blocks inside the main component
2. **Lack of generalization**: UnifiedListItem receives large HTML chunks instead of being configurable via props
3. **Code duplication**: Similar patterns repeated across row components (quick ref buttons, delete buttons, common fields)

## Refactoring Tasks

### Phase 1: Extract Common UI Components ✅ COMPLETE
- [x] Create `QuickRefButton` component - reusable bookmark toggle button
- [x] Create `DeleteButton` component - reusable delete icon button with tooltip
- [x] Create `UsesDisplay` component - reusable uses checkboxes with damage indicator
- [x] Export all from `src/features/CharacterSheet/components/index.ts`

### Phase 2: Extract Row-Specific Summary Components ✅ COMPLETE
- [x] Create `AbilitySummary` component from AbilityRow summaryContent
- [x] Create `WeaponSummary` component from WeaponRow summaryContent
- [x] Create `ItemSummary` component from ItemRow summaryContent
- [x] Create `SpellSummary` component from SpellRow summaryContent

### Phase 3: Extract Row-Specific Details Components ✅ COMPLETE
- [x] Create `AbilityDetails` component from AbilityRow detailsContent
- [x] Create `WeaponDetails` component from WeaponRow detailsContent
- [x] Create `ItemDetails` component from ItemRow detailsContent
- [x] Create `SpellDetails` component from SpellRow detailsContent

### Phase 4: Update Row Components ✅ COMPLETE
- [x] Update AbilityRow to use AbilitySummary and AbilityDetails
- [x] Update WeaponRow to use WeaponSummary and WeaponDetails
- [x] Update ItemRow to use ItemSummary and ItemDetails
- [x] Update SpellRow to use SpellSummary and SpellDetails

### Phase 5: Clean Up and Test ✅ COMPLETE
- [x] All 359 tests pass
- [x] All row components now use extracted sub-components
- [x] No more components-as-const patterns in row files

## File Structure (Final)

```
src/features/CharacterSheet/
├── components/
│   ├── QuickRefButton.tsx (shared)
│   ├── DeleteButton.tsx (shared)
│   ├── UsesDisplay.tsx (shared)
│   ├── StatCard.tsx (shared)
│   └── index.ts (exports all)
│
├── CharacterSheetTabs/
│   ├── 01_Skills/
│   │   ├── AbilityRow.tsx (refactored - uses sub-components)
│   │   └── components/
│   │       ├── AbilitySummary.tsx
│   │       ├── AbilityDetails.tsx
│   │       └── index.ts
│   │
│   ├── 02_Items/
│   │   ├── WeaponRow.tsx (refactored - uses sub-components)
│   │   ├── ItemRow.tsx (refactored - uses sub-components)
│   │   └── components/
│   │       ├── WeaponSummary.tsx
│   │       ├── WeaponDetails.tsx
│   │       ├── ItemSummary.tsx
│   │       ├── ItemDetails.tsx
│   │       └── index.ts
│   │
│   └── 03_Spells/
│       ├── SpellRow.tsx (refactored - uses sub-components)
│       └── components/
│           ├── SpellSummary.tsx
│           ├── SpellDetails.tsx
│           └── index.ts

src/components/DynamicList/
├── UnifiedListItem.tsx (enhanced)
├── DynamicListItem.tsx
└── index.ts
```

## Benefits Achieved
1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Common UI patterns (QuickRefButton, DeleteButton, UsesDisplay) are shared
3. **Maintainability**: Changes to summary/details views can be made in isolated files
4. **Testability**: Smaller components are easier to unit test
5. **Clean Code**: No more large JSX blocks defined as constants inside parent components

## Progress Tracking
- Started: 2025-12-21
- Phase 1: ✅ Complete
- Phase 2: ✅ Complete
- Phase 3: ✅ Complete
- Phase 4: ✅ Complete
- Phase 5: ✅ Complete
- **REFACTORING COMPLETE**
