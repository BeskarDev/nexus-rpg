# Character Sheet UX Design Specification

## Document Information
- **Status**: In Implementation (Phase 1 & 3 Complete)
- **Created**: December 21, 2024
- **Last Updated**: December 21, 2024
- **Purpose**: Define comprehensive UX design, unified component patterns, and migration plan for the Character Sheet overhaul

### Implementation Progress

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1: Foundation | ✅ Complete | CSS variables, layout constraints |
| Phase 2: Component Migration | ⏳ Pending | UnifiedListItem component |
| Phase 3: Layout Integration | ✅ Complete | Centered layout, removed scrollbars, reorder mode |
| Phase 4: Polish & QA | ⏳ Pending | Accessibility audit, documentation |

### Recent Changes (December 21, 2024)

**Phase 1 & 3 Implementation:**
- Added CSS custom properties for layout constraints (`--cs-max-width-sm/md/lg/xl/page`)
- Changed main container `justifyContent` from `flex-start` to `center` for proper centering
- Updated CategorizedAbilities max-width from `--cs-max-width-sm` to `--cs-max-width-lg`
- Updated SpellsTab max-width from `--cs-max-width-md` to `--cs-max-width-lg`
- Updated AbilityRow max-width from `--cs-max-width-sm` to `--cs-max-width-lg`
- Added reorder mode toggle button (SwapVert icon) to all list headers
- Updated DynamicListItem to support `showDragHandle` prop (hidden by default)
- Fixed AbilityRow detail section to use `flexWrap: 'wrap'` for proper content wrapping
- Removed internal scrollbars from AccordionDetails components
- All row components now expand on row click + icon click

### Docusaurus Context
The Character Sheet is a single page/view within the Docusaurus app. All Character Sheet components live within the container with CSS class `character-sheet-page`. Layout changes must work within the existing Docusaurus theme and may be affected by outer container styles. Where possible, use MUI theme and `sx` prop for styling; resort to plain CSS only when necessary.

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Current State Analysis](#2-current-state-analysis)
3. [Design Goals](#3-design-goals)
4. [Layout System Design](#4-layout-system-design)
5. [Unified List Component Design](#5-unified-list-component-design)
6. [Tab-Specific Designs](#6-tab-specific-designs)
7. [Responsive Behavior](#7-responsive-behavior)
8. [Visual Design Guidelines](#8-visual-design-guidelines)
9. [Interaction Patterns](#9-interaction-patterns)
10. [Migration Plan](#10-migration-plan)
11. [Test Scenarios](#11-test-scenarios)

---

## 1. Executive Summary

### Problem Statement
The current Character Sheet implementation suffers from:
- Inconsistent max-width constraints causing layout shifts
- Internal scrollbars appearing within collapsible sections
- Disparate list component implementations across different data types (abilities, weapons, items, spells, companions)
- Varying interaction patterns for similar operations (expand, edit, delete, drag)

### Proposed Solution
A unified design system featuring:
- Centralized layout constraints using CSS custom properties
- A single, reusable `UnifiedListItem` component pattern
- Consistent interaction paradigms across all list types
- Responsive behavior that gracefully transitions between desktop split-view and mobile tab navigation

---

## 2. Current State Analysis

### 2.1 Existing Layout Structure

```
Desktop View (>768px):
┌────────────────────────────────────────────────────────────────┐
│ Header (CharacterSheetHeader)                                  │
├───────────────────────┬────────────────────────────────────────┤
│ Statistics Panel      │ Tab Bar (Skills, Items, Spells, etc.) │
│ (fixed, 25rem max)    ├────────────────────────────────────────┤
│                       │ Tab Content (variable max-width)       │
│                       │ - Skills: 25rem                        │
│                       │ - Items: 65rem                         │
│                       │ - Spells: 38rem                        │
│                       │ - Personal: 47rem                      │
│                       │ - Companions: 47rem                    │
│                       │ - Party: 47rem                         │
└───────────────────────┴────────────────────────────────────────┘

Mobile View (≤768px):
┌────────────────────────────────────────────────────────────────┐
│ Header (CharacterSheetHeader)                                  │
├────────────────────────────────────────────────────────────────┤
│ Tab Bar (sticky, scrollable)                                   │
├────────────────────────────────────────────────────────────────┤
│ Tab Content (full width)                                       │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 2.2 Current List Component Inventory

| Data Type | File(s) | Component Pattern | Max Width | Scrollable |
|-----------|---------|-------------------|-----------|------------|
| Abilities | `AbilityRow.tsx` | Accordion + DynamicList | 24rem | Yes (30rem) |
| Weapons | `WeaponRow.tsx` | Accordion + DynamicList | 47rem | Yes (30rem) |
| Items | `ItemRow.tsx` | Accordion + DynamicList | 47rem | Yes (30rem) |
| Spells | `SpellRow.tsx` | Accordion + DynamicList | 47rem | Yes (60vh) |
| Companions | `CompanionAccordion.tsx` | Accordion + DynamicList | 47rem | No |
| NPCs | `NpcRow.tsx` | Accordion + DynamicList | - | No |
| Quick Ref | `QuickRefSection.tsx` | Nested Accordions | - | No |
| Skills | `SkillsTab.tsx` | Chip list (non-accordion) | 25rem | No |

### 2.3 Key Issues Identified

#### Layout Issues
1. **Inconsistent max-width values**: Each component defines its own max-width (24rem, 47rem, 65rem), causing visual inconsistency
2. **Hard-coded scroll containers**: `overflowY: 'auto'` with `maxHeight: '30rem'` creates internal scrollbars
3. **No global max-width constraint**: Content can stretch indefinitely on wide screens—on ultra-wide screens the layout should center with empty space on sides

#### Component Issues
1. **Duplicate accordion implementations**: Each row type reimplements the expand/collapse pattern
2. **Inconsistent field layouts**: Summary and details content arrangement varies by type
3. **Mixed edit patterns**: Some use local state + onBlur, others dispatch immediately
4. **Varying delete UX**: Some have confirmation dialogs, others delete immediately

#### Interaction Issues
1. **Drag handle inconsistency**: Drag handles should only be visible during an active reorder mode (toggled via header button)
2. **Quick Ref bookmark placement**: Sometimes in summary, sometimes in details
3. **Expand trigger preference**: Row click + icon click should both trigger expand (preferred behavior)

---

## 3. Design Goals

### 3.1 Primary Goals

| Goal | Metric | Target |
|------|--------|--------|
| Visual Consistency | Component variations | Single unified pattern |
| Responsive Scaling | Layout breakage | Zero internal scrollbars |
| Code Maintainability | Component count | 50% reduction in row types |
| User Experience | Learning curve | Same interactions everywhere |

### 3.2 Constraints

- **Preserve existing data structures**: No changes to Redux store shape or Firebase schema
- **Incremental migration**: Must support gradual rollout without breaking existing functionality
- **Accessibility**: Maintain keyboard navigation and screen reader support
- **Performance**: No regression in render times or bundle size

---

## 4. Layout System Design

### 4.1 Styling Approach

**Primary**: Use MUI's `sx` prop and theme system for styling. Access theme tokens via `theme.spacing()`, `theme.palette`, etc.

**Secondary**: Use CSS custom properties only for layout tokens that need to be shared across non-MUI contexts (e.g., Docusaurus containers).

**Last Resort**: Plain CSS in `custom.css` only when theme/sx cannot achieve the result.

### 4.2 CSS Custom Properties

Add to `src/css/custom.css` (layout tokens only):

```css
:root {
  /* Character Sheet Layout System */
  --cs-max-width-sm: 25rem;      /* Statistics panel, Skills lists */
  --cs-max-width-md: 38rem;      /* Spells tab */
  --cs-max-width-lg: 47rem;      /* Items, Personal, Companions */
  --cs-max-width-xl: 65rem;      /* Full-width content */
  --cs-max-width-page: 100rem;   /* Global max-width for entire sheet on ultra-wide screens */
  
  /* Panel Layout */
  --cs-panel-gap: 1.5rem;        /* Gap between panels */
  --cs-section-gap: 1rem;        /* Gap between sections within panels */
}
```

### 4.3 Main Container Layout

```
┌──────────────────────────────────────────────────────────────────┐
│                    CharacterSheet Container                       │
│  max-width: var(--cs-max-width-page)  /* 100rem for ultra-wide */│
│  margin: 0 auto                                                   │
│  padding: theme.spacing(2)                                        │
├─────────────────────────┬────────────────────────────────────────┤
│                         │                                        │
│   Statistics Panel      │           Tab Content Panel            │
│   (fixed width)         │           (flexible width)             │
│                         │                                        │
│   width: var(           │   flex: 1                              │
│     --cs-max-width-sm)  │   max-width: var(--cs-max-width-lg)    │
│                         │                                        │
│   position: sticky      │   overflow: visible                    │
│   top: 116px (header)   │   (no internal scroll)                 │
│                         │                                        │
│   ┌───────────────────┐ │   ┌──────────────────────────────────┐ │
│   │ Attributes        │ │   │ Tab Bar                          │ │
│   │ HP/AV/Defenses    │ │   ├──────────────────────────────────┤ │
│   │ Status Effects    │ │   │ Tab Content                      │ │
│   │ Fatigue           │ │   │                                  │ │
│   └───────────────────┘ │   │ - Scrolls with page              │ │
│                         │   │ - No internal overflow           │ │
│                         │   │                                  │ │
│                         │   └──────────────────────────────────┘ │
└─────────────────────────┴────────────────────────────────────────┘
```

### 4.4 Responsive Behavior

```
Desktop (>992px):
- Split-view with Statistics panel on left
- Tab content on right with contextual max-width
- Gap: var(--cs-panel-gap)

Tablet (769px - 992px):
- Statistics panel collapses to summary bar
- Tab content expands to full width
- Same tab navigation as desktop

Mobile (≤768px):
- Statistics becomes first tab
- Tab bar becomes sticky horizontal scroll
- Content is full-width with padding
```

---

## 5. Unified List Component Design

### 5.1 Component Architecture

```
UnifiedList
├── UnifiedListHeader
│   ├── Title
│   ├── Add Button
│   ├── Search Button (optional)
│   └── Settings Menu (optional)
│
└── UnifiedListBody (DragDropContext + Droppable)
    └── UnifiedListItem[] (Draggable)
        ├── DragHandle
        ├── ExpandToggle
        ├── SummaryContent (configurable fields)
        └── DetailsPanel (collapsed by default)
            ├── DetailFields (configurable)
            ├── QuickRefToggle
            └── DeleteButton
```

### 5.2 UnifiedListItem Prop Interface

```typescript
interface UnifiedListItemProps<T extends BaseItem> {
  // Required
  item: T;
  itemId: string;
  index: number;
  
  // Configuration
  summaryFields: SummaryFieldConfig[];
  detailFields: DetailFieldConfig[];
  
  // Callbacks
  onUpdate: (update: Partial<T>) => void;
  onDelete: () => void;
  
  // Optional features
  dragEnabled?: boolean;
  expandable?: boolean;
  quickRefEnabled?: boolean;
  isInQuickRef?: boolean;
  onToggleQuickRef?: (id: string) => void;
  
  // Validation
  validateField?: (field: string, value: any) => string | null;
}

interface SummaryFieldConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'chip' | 'damage' | 'static';
  width?: string;
  options?: SelectOption[];
  disabled?: boolean;
  render?: (item: any) => React.ReactNode;
}

interface DetailFieldConfig extends SummaryFieldConfig {
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
}

interface BaseItem {
  id: string;
  [key: string]: any;
}
```

### 5.3 Visual Structure

#### Summary Row (Collapsed)
```
┌─────────────────────────────────────────────────────────────────┐
│ ≡  ▶  [Primary Field]  [Field2]  [Field3]  [Field4]  [Field5]  │
└─────────────────────────────────────────────────────────────────┘
  │   │        │
  │   │        └── Configured summary fields (flex-wrap)
  │   └── Expand toggle
  └── Drag handle (optional)
```

#### Details Panel (Expanded)
```
┌─────────────────────────────────────────────────────────────────┐
│ ≡  ▼  [Primary Field]  [Field2]  [Field3]  [Field4]  [Field5]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Description/Notes]                                            │
│  _______________________________________________________________│
│                                                                 │
│  [Additional Field 1]  [Additional Field 2]  [Field 3]         │
│                                                                 │
│  [Checkboxes]  [Select Fields]                                  │
│                                                                 │
│                                    [☆ Quick Ref]  [🗑 Delete]   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.4 Field Type Configurations by Item Type

#### Weapons

**Summary Fields:**
| Field | Type | Width | Notes |
|-------|------|-------|-------|
| Name | text | 10rem | Primary identifier |
| Damage | damage | auto | W/S/C display |
| Properties | text | 14rem | Comma-separated |
| Uses | static | 2.5rem | X/3 display |

**Detail Fields:**
| Field | Type | Width | Notes |
|-------|------|-------|-------|
| Description | text (multiline) | full | 1-5 rows |
| Cost | number | 6rem | Right-aligned |
| Load | number | 4rem | |
| Amount | number | 4rem | |
| Quality | select | 3rem | Q1-Q8 options |
| Location | select | 4.25rem | worn/carried/mount/storage |
| Uses (checkboxes) | checkbox | - | 3 checkboxes |
| Durability | select | 4.25rem | Die options |

#### Items

**Summary Fields:**
| Field | Type | Width | Notes |
|-------|------|-------|-------|
| Name | text | 10rem | Primary identifier |
| Properties | text | 10rem | |
| Location/Slot | static | 4.25rem | Computed display |
| Cost | number | 2.5rem | |
| Load | number | 1.5rem | |
| Amount | number | 2.5rem | |
| Uses | static | 2.5rem | X/3 display |

**Detail Fields:**
| Field | Type | Width | Notes |
|-------|------|-------|-------|
| Description | text (multiline) | full | 1-5 rows |
| Quality | select | 3rem | Q1-Q8 |
| Location | select | 4.25rem | |
| Slot | select | 4.25rem | Enabled when worn |
| Uses (checkboxes) | checkbox | - | 3 checkboxes |
| Durability | select | 4.25rem | |

#### Abilities

**Summary Fields:**
| Field | Type | Width | Notes |
|-------|------|-------|-------|
| Title | text | 12.5rem | With action type icon prefix |
| Rank Badge | static | - | Circled numbers ①-⑤ |
| Skill Chip | chip | - | Color-coded by skill |

**Detail Fields:**
| Field | Type | Width | Notes |
|-------|------|-------|-------|
| Description | text (multiline) | 20rem | 1-10 rows |
| Action Type | select | 9.5rem | With icon |
| Rank | select | 4rem | 1-5 (Talents only) |
| Skill | select | 10rem | OFFICIAL_SKILLS (Talents only) |

#### Spells

**Summary Fields:**
| Field | Type | Width | Notes |
|-------|------|-------|-------|
| Cost Avatar | render | 4rem | Clickable, animated |
| Rank | number | 1.5rem | |
| Name | text | 9rem | |
| Target | static | 3rem | |
| Range | static | 4rem | |
| Damage/Props | damage/text | 10rem | Conditional |

**Detail Fields:**
| Field | Type | Width | Notes |
|-------|------|-------|-------|
| Properties | text | full | |
| Effect | text (multiline) | 40rem | 1-10 rows |
| Show Damage | checkbox | - | |
| Target | select | 6rem | |
| Range | select | 7rem | |

#### Companions

**Summary Fields:**
| Field | Type | Width | Notes |
|-------|------|-------|-------|
| Name | text | 15rem | |
| HP Display | render | 8rem | Current/Max with controls |
| Wounded | checkbox | - | |

**Detail Fields:**
| Field | Type | Width | Notes |
|-------|------|-------|-------|
| Name (editing) | text | full | |
| Markdown | text (multiline) | full | Large editor |
| Rendered Preview | render | full | Markdown preview |

---

## 6. Tab-Specific Designs

### 6.1 Statistics Tab (Mobile Only)

No list components. Keep current implementation with minor layout adjustments:
- Use `var(--cs-max-width-sm)` for container
- Remove hard-coded pixel values

### 6.2 Skills Tab

```
┌──────────────────────────────────────────────────────────────────┐
│                         Skills Tab                                │
│  max-width: var(--cs-max-width-lg)                               │
├─────────────────────────────────┬────────────────────────────────┤
│                                 │                                │
│   XP Section                    │   Abilities Section            │
│   max-width: var(--cs-max-      │   max-width: var(--cs-max-     │
│     width-sm)                   │     width-sm)                  │
│                                 │                                │
│   ┌───────────────────────┐     │   ┌──────────────────────────┐ │
│   │ Total XP  │ Spent XP  │     │   │ Quick Ref               │ │
│   └───────────────────────┘     │   │ (grouped by action type)│ │
│                                 │   └──────────────────────────┘ │
│   Skills Section (chips)        │                                │
│   ┌───────────────────────┐     │   ┌──────────────────────────┐ │
│   │ + Add Skill           │     │   │ Abilities (categorized) │ │
│   │ ┌─────────┬─────────┐ │     │   │ ├── Combat Art         │ │
│   │ │ Skill   │ XP      │ │     │   │ │   └── [Items]        │ │
│   │ │ (Rank)  │ [input] │ │     │   │ ├── Talent             │ │
│   │ └─────────┴─────────┘ │     │   │ │   └── [Items]        │ │
│   └───────────────────────┘     │   │ ├── Folk               │ │
│                                 │   │ │   └── [Items]        │ │
│   Professions (if Crafting)     │   │ └── Other              │ │
│   Languages                     │   │     └── [Items]        │ │
│                                 │   └──────────────────────────┘ │
│                                 │                                │
└─────────────────────────────────┴────────────────────────────────┘
```

### 6.3 Items Tab

```
┌──────────────────────────────────────────────────────────────────┐
│                          Items Tab                                │
│  max-width: var(--cs-max-width-xl)                               │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Header: Coins │ Current Load │ Max Load │ Carry Mod            │
│                                                                  │
│   Settings Menu (toggle visibility of sections)                   │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌────────────────────────────────────────────────────────────┐ │
│   │ Weapons Section                        [+] [🔍]            │ │
│   │ ──────────────────────────────────────────────────────────│ │
│   │ └── [UnifiedListItem: Weapon]                              │ │
│   │ └── [UnifiedListItem: Weapon]                              │ │
│   │ └── ...                                                    │ │
│   └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│   ┌────────────────────────────────────────────────────────────┐ │
│   │ Equipment Section                      [+] [🔍]            │ │
│   │ ──────────────────────────────────────────────────────────│ │
│   │ └── [UnifiedListItem: Item]                                │ │
│   │ └── ...                                                    │ │
│   └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│   ┌────────────────────────────────────────────────────────────┐ │
│   │ Inventory Section                      [+] [🔍]            │ │
│   │ ──────────────────────────────────────────────────────────│ │
│   │ └── [UnifiedListItem: Item]                                │ │
│   │ └── ...                                                    │ │
│   └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│   ┌────────────────────────────────────────────────────────────┐ │
│   │ On Mount (Load: X/Y)                   [+] [🔍]            │ │
│   │ ──────────────────────────────────────────────────────────│ │
│   │ └── ...                                                    │ │
│   └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│   ┌────────────────────────────────────────────────────────────┐ │
│   │ In Storage (Load: X/Y)                 [+] [🔍]            │ │
│   │ ──────────────────────────────────────────────────────────│ │
│   │ └── ...                                                    │ │
│   └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 6.4 Spells Tab

```
┌──────────────────────────────────────────────────────────────────┐
│                          Spells Tab                               │
│  max-width: var(--cs-max-width-md)                               │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Header Row                                                      │
│   ┌──────────────┬──────────────┬──────────────┬───────────────┐ │
│   │ Magic Skill  │ Specializ.   │ Spell Cat.   │ Focus         │ │
│   │ [disabled]   │ [text]       │ [number]     │ [current/max] │ │
│   └──────────────┴──────────────┴──────────────┴───────────────┘ │
│                                                                  │
│   ┌────────────────────────────────────────────────────────────┐ │
│   │ Spells                                    [+] [🔍]          │ │
│   │ ──────────────────────────────────────────────────────────│ │
│   │ └── [UnifiedListItem: Spell]                               │ │
│   │ └── [UnifiedListItem: Spell]                               │ │
│   │ └── ...                                                    │ │
│   └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 6.5 Personal Tab

```
┌──────────────────────────────────────────────────────────────────┐
│                         Personal Tab                              │
│  max-width: var(--cs-max-width-lg)                               │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Character Info Row                                              │
│   ┌────────────────────────────────────────────┬───────────────┐ │
│   │ Name │ Folk [✎] │ Upbringing [✎] │        │ Profile       │ │
│   │ Background [✎] │ Motivation                │ Picture       │ │
│   │ Height │ Weight │ Age │ Description         │ [Upload]      │ │
│   └────────────────────────────────────────────┴───────────────┘ │
│                                                                  │
│   ┌────────────────────────────────────────────────────────────┐ │
│   │ NPC Relationships                          [+]              │ │
│   │ ──────────────────────────────────────────────────────────│ │
│   │ └── [UnifiedListItem: NPC]                                 │ │
│   │ └── ...                                                    │ │
│   └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│   ┌────────────────────────────────────────────────────────────┐ │
│   │ Personal Notes                                              │ │
│   │ [multiline text field]                                      │ │
│   └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 6.6 Companions Tab

```
┌──────────────────────────────────────────────────────────────────┐
│                        Companions Tab                             │
│  max-width: var(--cs-max-width-lg)                               │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Header                                                          │
│   ┌────────────────────────────────────────────────────────────┐ │
│   │ Companions [?]                  [Builder] [Add Companion]  │ │
│   └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│   ┌────────────────────────────────────────────────────────────┐ │
│   │ └── [UnifiedListItem: Companion]                           │ │
│   │ └── [UnifiedListItem: Companion]                           │ │
│   │ └── ...                                                    │ │
│   └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│   Empty State                                                     │
│   "No companions added yet..."                                    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 6.7 Party Tab

No list components (shared notes + party management). Keep current implementation with:
- `max-width: var(--cs-max-width-lg)` for container
- Sticky header on mobile

---

## 7. Responsive Behavior

### 7.1 Breakpoint Definitions

| Breakpoint | Width | Layout Mode |
|------------|-------|-------------|
| Mobile | ≤768px | Single column, tabbed navigation |
| Tablet | 769px - 992px | Single column, expanded tabs |
| Desktop | 993px - 1199px | Split view, compressed fields |
| Large Desktop | ≥1200px | Split view, full fields |

### 7.2 Component Adaptations

#### UnifiedListItem Field Responsiveness

```css
/* Mobile: Stack fields vertically */
@media (max-width: 768px) {
  .unified-list-item-summary {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .unified-list-item-summary .field {
    width: 100%;
    max-width: none;
  }
}

/* Tablet: 2-column grid */
@media (min-width: 769px) and (max-width: 992px) {
  .unified-list-item-summary {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--cs-list-item-gap);
  }
}

/* Desktop: Flex row with configured widths */
@media (min-width: 993px) {
  .unified-list-item-summary {
    display: flex;
    flex-wrap: wrap;
    gap: var(--cs-list-item-gap);
  }
}
```

### 7.3 Scroll Behavior

**Critical Rule: No Internal Scrollbars**

Instead of:
```jsx
// ❌ Current approach - creates internal scrollbar
<AccordionDetails sx={{ overflowY: 'auto', maxHeight: '30rem' }}>
```

Use:
```jsx
// ✅ New approach - content flows with page
<AccordionDetails sx={{ overflow: 'visible' }}>
```

The page itself handles scrolling. List sections expand fully within their container.

### 7.4 Mobile Tab Navigation

```
┌────────────────────────────────────────────────────────────────┐
│ [Stats] [Skills] [Items] [Spells] [Personal] [Companions] [Party]
│ ◄ ─────────────────── horizontal scroll ─────────────────── ►  │
└────────────────────────────────────────────────────────────────┘
```

- Horizontal scroll with `scrollButtons={false}`
- Sticky positioning below header
- Active tab indicator visible

---

## 8. Visual Design Guidelines

### 8.1 Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--cs-spacing-xs` | 0.25rem | Tight inline spacing |
| `--cs-spacing-sm` | 0.5rem | List item gap |
| `--cs-spacing-md` | 1rem | Section padding |
| `--cs-spacing-lg` | 1.5rem | Panel gap |
| `--cs-spacing-xl` | 2rem | Major section separation |

### 8.2 Color Tokens

Leverage existing CSS variables from `custom.css`:
- Primary: `var(--ifm-color-primary)`
- Background: `var(--ifm-background-color)`
- Border: `var(--ifm-toc-border-color)`
- Quality tiers: `var(--ifm-color-quality-1)` through `var(--ifm-color-quality-8)`

### 8.3 Typography

| Element | Size | Weight | Font |
|---------|------|--------|------|
| Section Header | 1rem | Bold | Exo 2 |
| List Item Title | 0.875rem | Bold | Exo 2 |
| Field Label | 0.75rem | Normal | Exo 2 |
| Field Value | 0.875rem | Normal | Exo 2 |
| Caption | 0.75rem | Normal | Exo 2 |

### 8.4 Component Styling

#### Accordion Styling (Unified)

```css
.unified-list-section {
  border: 1px solid var(--ifm-toc-border-color);
  border-radius: 4px;
  margin-bottom: var(--cs-spacing-md);
}

.unified-list-section .MuiAccordionSummary-root {
  padding: var(--cs-spacing-sm) var(--cs-spacing-md);
  min-height: 48px;
}

.unified-list-section .MuiAccordionDetails-root {
  padding: var(--cs-spacing-sm) var(--cs-spacing-md);
  padding-top: 0;
}
```

#### List Item Styling

```css
.unified-list-item {
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: border-color 0.2s ease;
}

.unified-list-item:hover {
  border-color: var(--ifm-color-primary-light);
}

.unified-list-item.expanded {
  border-color: var(--ifm-color-primary);
  background: var(--ifm-background-color);
}
```

---

## 9. Interaction Patterns

### 9.1 Expand/Collapse

| Trigger | Action |
|---------|--------|
| Click expand icon | Toggle this item |
| Click row (outside fields) | Toggle this item |
| Keyboard Enter/Space on row | Toggle this item |
| Escape while expanded | Collapse this item |

**Note**: Both row click and icon click should expand the item for consistency.

### 9.2 Drag and Drop

| Trigger | Action |
|---------|--------|
| Toggle reorder mode (button in list header) | Show/hide drag handles |
| Drag handle mousedown | Start drag |
| Drop on valid target | Reorder and persist |
| Drop outside list | Cancel drag |
| Keyboard ↑/↓ while dragging | Move item |

**Note**: Drag handles are hidden by default and only shown when reorder mode is active to save space.

### 9.3 Editing

| Pattern | Implementation |
|---------|----------------|
| Text fields | Local state + onBlur save |
| Select fields | Immediate save on change |
| Checkboxes | Immediate save on change |
| Number fields | Local state + onBlur save |

### 9.4 Delete

| Step | UI Element |
|------|------------|
| 1. Click delete | Show confirmation dialog |
| 2. Confirm | Execute deletion |
| 3. Cancel | Close dialog, no action |

Exception: For simple items (NPC relationships, languages, professions), allow immediate deletion without confirmation.

### 9.5 Quick Reference

| Trigger | Action |
|---------|--------|
| Click bookmark icon (unfilled) | Add to Quick Ref |
| Click bookmark icon (filled) | Remove from Quick Ref |
| Bookmark icon location | Always in details panel, right-aligned |

### 9.6 Keyboard Navigation

| Key | Context | Action |
|-----|---------|--------|
| Tab | Form fields | Navigate between fields |
| Enter | Text field | Move to next field / save |
| Escape | Expanded item | Collapse item |
| Space | Checkbox | Toggle |
| ↑/↓ | Select field | Navigate options |
| Enter | Select field | Select option |

---

## 10. Migration Plan

### 10.1 Phase Overview

```
Phase 1: Foundation (Week 1)
├── CSS custom properties
├── UnifiedListItem component shell
└── Unit tests for new components

Phase 2: Component Migration (Weeks 2-3)
├── Weapons → UnifiedListItem
├── Items → UnifiedListItem
├── Abilities → UnifiedListItem
├── Spells → UnifiedListItem
└── Companions → UnifiedListItem

Phase 3: Layout Integration (Week 4)
├── Main layout refactor
├── Remove internal scroll containers
└── Responsive testing

Phase 4: Polish & QA (Week 5)
├── Visual consistency pass
├── Accessibility audit
├── Performance testing
└── Documentation
```

### 10.2 Phase 1: Foundation

**Tasks:**

1. **Add CSS custom properties** to `src/css/custom.css`
   - Layout max-widths
   - Spacing tokens
   - Breakpoint references

2. **Create UnifiedListItem component**
   - Location: `src/components/UnifiedList/`
   - Files:
     - `UnifiedList.tsx`
     - `UnifiedListItem.tsx`
     - `UnifiedListHeader.tsx`
     - `types.ts`
     - `fieldRenderers.tsx`
     - `index.ts`

3. **Create unit tests**
   - Location: `src/components/UnifiedList/__tests__/`
   - Cover: rendering, expansion, field updates, drag-drop

**Deliverables:**
- [ ] CSS variables added
- [ ] UnifiedListItem component working in isolation
- [ ] Tests passing

### 10.3 Phase 2: Component Migration

**Order:** Weapons → Items → Abilities → Spells → Companions

For each migration:

1. **Create field configurations** for the item type
2. **Update container component** to use UnifiedListItem
3. **Verify functionality** matches current behavior
4. **Run regression tests**
5. **Remove old row component** (or mark deprecated)

**Weapons Migration Example:**

```tsx
// Before (ItemsTab.tsx)
<WeaponRow
  weapon={weapon}
  updateWeapon={(update) => updateWeapon(update, index)}
  deleteWeapon={() => deleteWeapon(weapon)}
  isInQuickRef={weaponsInQuickRef.includes(weapon.id)}
  onToggleQuickRef={handleToggleWeaponQuickRef}
/>

// After (ItemsTab.tsx)
<UnifiedListItem
  item={weapon}
  itemId={weapon.id}
  index={index}
  summaryFields={WEAPON_SUMMARY_FIELDS}
  detailFields={WEAPON_DETAIL_FIELDS}
  onUpdate={(update) => updateWeapon(update, index)}
  onDelete={() => deleteWeapon(weapon)}
  quickRefEnabled
  isInQuickRef={weaponsInQuickRef.includes(weapon.id)}
  onToggleQuickRef={handleToggleWeaponQuickRef}
/>
```

**Deliverables per item type:**
- [ ] Field configurations defined
- [ ] Container updated
- [ ] Manual testing passed
- [ ] Regression tests passed

### 10.4 Phase 3: Layout Integration

**Tasks:**

1. **Update CharacterSheet.tsx**
   - Apply CSS variable max-widths
   - Remove hard-coded maxWidth values
   - Ensure proper flex/grid layout

2. **Remove internal scroll containers**
   - Change `overflowY: 'auto'` to `overflow: 'visible'`
   - Remove `maxHeight` constraints
   - Test with large data sets

3. **Verify responsive breakpoints**
   - Test at 768px, 992px, 1200px
   - Ensure smooth transitions
   - Fix any layout breaks

**Deliverables:**
- [ ] CharacterSheet.tsx updated
- [ ] All tabs using consistent max-widths
- [ ] No internal scrollbars
- [ ] Responsive behavior verified

### 10.5 Phase 4: Polish & QA

**Tasks:**

1. **Visual consistency audit**
   - Compare all list types side-by-side
   - Verify spacing, alignment, typography
   - Check dark mode appearance

2. **Accessibility audit**
   - Keyboard navigation testing
   - Screen reader testing
   - Color contrast verification

3. **Performance testing**
   - Render time benchmarks
   - Bundle size comparison
   - Memory usage check

4. **Documentation**
   - Update component storybook/docs
   - Add migration notes to this spec
   - Update README if needed

**Deliverables:**
- [ ] All visual issues resolved
- [ ] Accessibility compliance confirmed
- [ ] Performance benchmarks met
- [ ] Documentation complete

### 10.6 Risk Mitigation

| Risk | Mitigation | Rollback Trigger |
|------|------------|------------------|
| Breaking existing functionality | Feature flag for gradual rollout | Any critical bug in production affecting >5% of users |
| Performance regression | Benchmark before/after each phase | Render time increase >20% or bundle size increase >15% |
| Complex merge conflicts | Small, focused PRs per phase | Unable to resolve conflicts within 2 business days |
| Scope creep | Strict adherence to spec, change requests deferred | Timeline extends beyond 150% of estimated duration |

**Success Criteria per Phase:**

| Phase | Success Criteria | Failure Threshold |
|-------|------------------|-------------------|
| Phase 1 | All unit tests pass, CSS variables working | Any test failure, variable conflicts |
| Phase 2 | All migrated components functionally identical to originals | Any regression in existing functionality |
| Phase 3 | Zero internal scrollbars, proper responsive behavior | Any layout break at target breakpoints |
| Phase 4 | WCAG AA compliance, no visual regressions | Accessibility violations, customer complaints |

### 10.7 Rollback Plan

Each phase can be independently reverted:

1. **Phase 1**: Remove CSS variables (no functional impact)
2. **Phase 2**: Revert to old row components (parallel implementations during migration)
3. **Phase 3**: Restore old maxWidth values and scroll containers
4. **Phase 4**: N/A (cosmetic only)

---

## 11. Test Scenarios

### 11.1 Functional Tests

#### UnifiedListItem Component

| Test | Input | Expected Output |
|------|-------|-----------------|
| Render collapsed | Item data | Summary fields visible, details hidden |
| Expand item | Click expand | Details panel visible |
| Collapse item | Click expand (expanded) | Details panel hidden |
| Update text field | Type + blur | onUpdate called with new value |
| Update select field | Change selection | onUpdate called immediately |
| Update checkbox | Click checkbox | onUpdate called immediately |
| Delete item | Click delete + confirm | onDelete called |
| Drag item | Drag to new position | onDragEnd called with indices |
| Toggle quick ref | Click bookmark | onToggleQuickRef called |

#### Layout Tests

| Test | Viewport | Expected |
|------|----------|----------|
| Mobile layout | 375px | Single column, full width |
| Tablet layout | 800px | Single column, centered |
| Desktop layout | 1200px | Split view, proper max-widths |
| No horizontal scroll | All | No horizontal scrollbar |
| No internal scroll | All | No scrollbar within sections |

### 11.2 Visual Regression Tests

| Page State | Capture Points |
|------------|----------------|
| Skills tab | Empty, 5 abilities, 20 abilities |
| Items tab | Empty, mixed items, all expanded |
| Spells tab | Empty, 10 spells |
| Personal tab | With/without NPCs |
| Companions tab | Empty, 3 companions |

### 11.3 Viewport Resize Tests

| Scenario | Steps | Expected |
|----------|-------|----------|
| Desktop to mobile | Resize from 1200px to 375px | Layout adapts, no breaks |
| Mobile to desktop | Resize from 375px to 1200px | Layout adapts, no breaks |
| Rapid resize | Quickly resize multiple times | No layout thrashing |
| Content during resize | Resize with expanded items | Items stay expanded |

### 11.4 Data Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Empty list | Show empty state message |
| Single item | Render properly, drag disabled |
| 100+ items | Smooth scroll, no lag |
| Long text in name/title fields | Truncate with ellipsis after field width (text-overflow: ellipsis) |
| Long text in description fields | Wrap to multiple lines, max 5 lines collapsed, expandable to full content |
| Maximum character limits | Name: 100 chars, Description: 2000 chars, Properties: 500 chars |
| Special characters | Render correctly, no XSS |
| Missing optional fields | Show placeholder text in italic or hide field entirely based on type |

### 11.5 Accessibility Tests

| Requirement | Test Method |
|-------------|-------------|
| Keyboard navigation | Tab through all interactive elements |
| Screen reader | VoiceOver/NVDA announces changes |
| Focus management | Focus visible, logical order |
| Color contrast | WCAG AA compliance (4.5:1 text, 3:1 UI) |

---

## Appendix A: Component File Structure

```
src/
├── components/
│   ├── UnifiedList/
│   │   ├── __tests__/
│   │   │   ├── UnifiedList.test.tsx
│   │   │   ├── UnifiedListItem.test.tsx
│   │   │   └── fieldRenderers.test.tsx
│   │   ├── UnifiedList.tsx
│   │   ├── UnifiedListItem.tsx
│   │   ├── UnifiedListHeader.tsx
│   │   ├── fieldRenderers.tsx
│   │   ├── types.ts
│   │   ├── styles.css
│   │   └── index.ts
│   └── DynamicList/              # Keep for backwards compatibility
│
├── features/
│   └── CharacterSheet/
│       ├── CharacterSheetTabs/
│       │   ├── configs/           # NEW: Field configurations
│       │   │   ├── weaponFields.ts
│       │   │   ├── itemFields.ts
│       │   │   ├── abilityFields.ts
│       │   │   ├── spellFields.ts
│       │   │   ├── companionFields.ts
│       │   │   └── index.ts
│       │   └── ...
│       └── ...
│
└── css/
    └── custom.css               # Updated with CSS variables
```

---

## Appendix B: Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| Dec 2024 | Use CSS custom properties for layout | Enables theming, easy to override, single source of truth |
| Dec 2024 | Single UnifiedListItem component | Reduces code duplication, ensures consistency |
| Dec 2024 | Remove internal scroll containers | Prevents layout issues, better UX |
| Dec 2024 | Field configuration approach | Declarative, easy to modify, type-safe |
| Dec 2024 | Phased migration | Lower risk, easier to validate each step |

---

## Appendix C: Glossary

| Term | Definition |
|------|------------|
| **UnifiedListItem** | The new reusable component for all list row types |
| **Summary Fields** | Fields shown in the collapsed row view |
| **Detail Fields** | Fields shown when the row is expanded |
| **Quick Ref** | Feature to bookmark items for quick access |
| **DynamicList** | Existing drag-and-drop list wrapper component |
| **CSS Custom Properties** | CSS variables (--var-name) for theming |
| **Split View** | Desktop layout with Statistics on left, tabs on right |

---

**Document Status: DRAFT - AWAITING REVIEW**

*This specification must be reviewed and approved before any implementation work begins.*
