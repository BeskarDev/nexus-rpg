# Unified Character Sheet Card Component Specification

## Overview

This specification defines a unified, flexible card component system for standardizing input fields across the Nexus RPG character sheet. The current implementation has inconsistent card-like components across different tabs, particularly in the Statistics tab. This refactoring will create a composable, maintainable component that preserves the game-like visual design while enabling reuse across all character sheet tabs.

## Design Goals

1. **Visual Consistency**: Maintain the current game-like aesthetic with bordered cards, icon headers, and themed colors
2. **Maximum Flexibility**: Support both simple text displays and complex interactive components
3. **Composability**: Enable easy composition for varied use cases without losing functionality
4. **Type Safety**: Full TypeScript support with clear prop interfaces
5. **Accessibility**: Proper ARIA labels, tooltips, and semantic HTML
6. **Maintainability**: Single source of truth for card styling and structure

## Current Pattern Analysis

### Existing Card Components

The Statistics tab contains several card-like components that establish the visual pattern:

#### HpField Pattern
```tsx
<Box sx={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 1,
  border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
  p: 0.5,
  position: 'relative',
  minWidth: '7rem',
}}>
  {/* Header: Icon + Label */}
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
    <Favorite sx={{ fontSize: '0.7rem', color: hpColor }} />
    <Typography variant="caption" sx={{
      fontWeight: 700,
      fontSize: '0.65rem',
      color: hpColor,
      textTransform: 'uppercase',
    }}>
      HP
    </Typography>
  </Box>

  {/* Main Content */}
  <Typography sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
    {health.current}/{effectiveMaxHp}
  </Typography>

  {/* Footer Component */}
  <LinearProgress ... />

  {/* Config Button */}
  <IconButton sx={{ position: 'absolute', top: 0, right: 0 }}>
    <Settings sx={{ fontSize: '0.65rem' }} />
  </IconButton>
</Box>
```

**Key Elements:**
- Semi-transparent bordered container
- Icon + label header with color theming
- Main content area (flexible)
- Optional footer content
- Optional config menu button

#### AttributeColumn Pattern
```tsx
<Box sx={{ /* similar container styles */ }}>
  {/* Icon + Label Header */}
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
    <PanTool sx={{ fontSize: '0.7rem', color }} />
    <Typography variant="caption" sx={{ /* label styles */ }}>
      STR
    </Typography>
  </Box>

  {/* Interactive Content */}
  <AttributeField select value={...}>
    {/* Dropdown options */}
  </AttributeField>

  {/* Footer Component */}
  <Checkbox ... />
</Box>
```

**Key Elements:**
- Similar structure to HpField
- Interactive dropdown in content area
- Checkbox component in footer

### Common Styling Patterns

```tsx
// Container
{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 1,
  border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
  p: 0.5,
  position: 'relative',
  minWidth: '4rem' // varies by use case
}

// Header Icon
{
  fontSize: '0.7rem',
  color: themeColor
}

// Header Label
{
  fontWeight: 700,
  fontSize: '0.65rem',
  color: themeColor,
  textTransform: 'uppercase'
}

// Content Typography
{
  fontWeight: 'bold',
  fontSize: '0.95rem',
  lineHeight: 1.2,
  textAlign: 'center'
}

// Config Button
{
  position: 'absolute',
  top: 0,
  right: 0,
  p: 0.25,
  opacity: 0.6,
  '&:hover': { opacity: 1 }
}
```

## Component Architecture

### Core Component: `CharacterSheetCard`

The base card component that provides the container and structure for all use cases.

```tsx
import React from 'react'
import { Box, IconButton, Tooltip, alpha, SxProps, Theme } from '@mui/material'
import { Settings } from '@mui/icons-material'

export interface CharacterSheetCardProps {
  /** Content for the header section (typically icon + label) */
  header?: React.ReactNode
  
  /** Main content area - can be any React component */
  children: React.ReactNode
  
  /** Optional footer content below main area */
  footer?: React.ReactNode
  
  /** Optional tooltip text for the entire card */
  tooltip?: string
  
  /** Optional config menu element (typically a Menu component) */
  configMenu?: React.ReactNode
  
  /** Callback when config button is clicked */
  onConfigClick?: (event: React.MouseEvent<HTMLElement>) => void
  
  /** Whether to show the config button */
  showConfigButton?: boolean
  
  /** Minimum width of the card */
  minWidth?: string | number
  
  /** Maximum width of the card */
  maxWidth?: string | number
  
  /** Additional sx props for the container */
  sx?: SxProps<Theme>
  
  /** Custom border color (when highlighted, errored, etc.) */
  borderColor?: string
  
  /** Test ID for testing purposes */
  'data-testid'?: string
}

export const CharacterSheetCard: React.FC<CharacterSheetCardProps> = ({
  header,
  children,
  footer,
  tooltip,
  configMenu,
  onConfigClick,
  showConfigButton = false,
  minWidth,
  maxWidth,
  sx,
  borderColor,
  'data-testid': testId,
}) => {
  const cardContent = (
    <Box
      data-testid={testId}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 1,
        border: (theme) => borderColor 
          ? `1px solid ${borderColor}`
          : `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
        p: 0.5,
        position: 'relative',
        minWidth: minWidth || '4rem',
        ...(maxWidth && { maxWidth }),
        ...sx,
      }}
    >
      {/* Header */}
      {header && header}

      {/* Main Content */}
      {children}

      {/* Footer */}
      {footer && footer}

      {/* Config Button */}
      {showConfigButton && onConfigClick && (
        <IconButton
          size="small"
          onClick={onConfigClick}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            p: 0.25,
            opacity: 0.6,
            '&:hover': { opacity: 1 },
          }}
          data-testid={testId ? `${testId}-config-button` : undefined}
        >
          <Settings sx={{ fontSize: '0.65rem' }} />
        </IconButton>
      )}

      {/* Config Menu (rendered as sibling) */}
      {configMenu}
    </Box>
  )

  // Wrap in tooltip if provided
  if (tooltip) {
    return <Tooltip title={tooltip}>{cardContent}</Tooltip>
  }

  return cardContent
}
```

### Helper Component: `CardHeader`

Pre-built header component for icon + label pattern.

```tsx
import React from 'react'
import { Box, Typography, SxProps, Theme } from '@mui/material'

export interface CardHeaderProps {
  /** Icon element (MUI icon component) */
  icon?: React.ReactNode
  
  /** Label text */
  label: string
  
  /** Theme color for icon and label */
  color?: string
  
  /** Additional sx props */
  sx?: SxProps<Theme>
  
  /** Test ID */
  'data-testid'?: string
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  icon,
  label,
  color = '#9e9e9e',
  sx,
  'data-testid': testId,
}) => {
  return (
    <Box 
      sx={{ display: 'flex', alignItems: 'center', gap: 0.25, ...sx }}
      data-testid={testId}
    >
      {icon && (
        <Box sx={{ fontSize: '0.7rem', color, display: 'flex' }}>
          {icon}
        </Box>
      )}
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          fontSize: '0.65rem',
          color,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {label}
      </Typography>
    </Box>
  )
}
```

### Helper Component: `CardContent`

Pre-styled typography for simple value displays.

```tsx
import React from 'react'
import { Typography, SxProps, Theme } from '@mui/material'

export interface CardContentProps {
  /** Display value */
  value: string | number | React.ReactNode
  
  /** Additional sx props */
  sx?: SxProps<Theme>
  
  /** Text color (for status indicators) */
  color?: string
  
  /** Test ID */
  'data-testid'?: string
}

export const CardContent: React.FC<CardContentProps> = ({
  value,
  sx,
  color,
  'data-testid': testId,
}) => {
  return (
    <Typography
      data-testid={testId}
      sx={{
        fontWeight: 'bold',
        fontSize: '0.95rem',
        lineHeight: 1.2,
        textAlign: 'center',
        mt: 0.25,
        ...(color && { color }),
        ...sx,
      }}
    >
      {value}
    </Typography>
  )
}
```

## Usage Patterns

### Pattern 1: Simple Display Card

**Use Case:** Display a calculated value with tooltip (e.g., AV total, Defense values)

```tsx
import { CharacterSheetCard, CardHeader, CardContent } from './components'
import { Shield } from '@mui/icons-material'

const SimpleDisplayCard = () => {
  return (
    <CharacterSheetCard
      header={
        <CardHeader
          icon={<Shield />}
          label="AV"
          color="#78909c"
        />
      }
      tooltip="Click gear to configure AV sources"
      minWidth="4rem"
      maxWidth="5rem"
    >
      <CardContent value={totalAV} />
    </CharacterSheetCard>
  )
}
```

### Pattern 2: Editable Value with Config Menu

**Use Case:** Editable field with configuration options (e.g., AV breakdown, HP settings)

```tsx
import { useState } from 'react'
import { CharacterSheetCard, CardHeader, CardContent } from './components'
import { Shield } from '@mui/icons-material'
import { Menu } from '@mui/material'

const EditableCardWithMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <CharacterSheetCard
      header={<CardHeader icon={<Shield />} label="AV" color="#78909c" />}
      tooltip="Click gear to configure AV sources"
      showConfigButton
      onConfigClick={(e) => setAnchorEl(e.currentTarget)}
      minWidth="4rem"
      maxWidth="5rem"
      configMenu={
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {/* Menu content */}
        </Menu>
      }
    >
      <CardContent value={totalAV} />
    </CharacterSheetCard>
  )
}
```

### Pattern 3: Interactive Input Card

**Use Case:** Card with interactive elements like dropdowns or inputs (e.g., Attributes, Specialization)

```tsx
import { CharacterSheetCard, CardHeader } from './components'
import { PanTool } from '@mui/icons-material'
import { MenuItem, TextField } from '@mui/material'

const InteractiveInputCard = () => {
  return (
    <CharacterSheetCard
      header={
        <CardHeader
          icon={<PanTool />}
          label="STR"
          color="#e57373"
        />
      }
      minWidth="4rem"
      maxWidth="5rem"
    >
      <TextField
        select
        value={attribute.value}
        onChange={handleChange}
        variant="standard"
        InputProps={{ disableUnderline: true }}
        sx={{ maxWidth: '3.5rem' }}
      >
        {attributeTypeArray.map((at) => (
          <MenuItem key={at} value={at}>
            d{at}
          </MenuItem>
        ))}
      </TextField>
    </CharacterSheetCard>
  )
}
```

### Pattern 4: Complex Content with Footer

**Use Case:** Multi-part card with progress indicators or additional components (e.g., HP bar, Fatigue tracker)

```tsx
import { CharacterSheetCard, CardHeader, CardContent } from './components'
import { Favorite } from '@mui/icons-material'
import { LinearProgress, Box } from '@mui/material'

const ComplexCardWithFooter = () => {
  return (
    <CharacterSheetCard
      header={
        <CardHeader
          icon={<Favorite />}
          label="HP"
          color={hpColor}
        />
      }
      showConfigButton
      onConfigClick={handleConfigClick}
      minWidth="7rem"
      footer={
        <Box sx={{ width: '100%', maxWidth: '5.5rem', mt: 0.25 }}>
          <LinearProgress
            variant="determinate"
            value={hpPercentage}
            color={getHpColorVariant()}
            sx={{ height: '4px', borderRadius: '2px' }}
          />
        </Box>
      }
    >
      <CardContent value={`${current}/${max}`} />
    </CharacterSheetCard>
  )
}
```

### Pattern 5: Grid Layout Card

**Use Case:** Card with grid-based interactive elements (e.g., Fatigue checkboxes)

```tsx
import { CharacterSheetCard, CardHeader } from './components'
import { WaterDrop, WaterDropOutlined } from '@mui/icons-material'
import { Box, Checkbox, Typography } from '@mui/material'

const GridLayoutCard = () => {
  return (
    <CharacterSheetCard
      header={
        <CardHeader
          icon={<WaterDrop />}
          label="Fatigue"
          color="#ffb74d"
        />
      }
      minWidth="5rem"
      footer={
        <Typography
          variant="caption"
          color="warning.main"
          sx={{ fontSize: '0.6rem' }}
        >
          {penalty > 0 ? `-${penalty} HP` : '\u00A0'}
        </Typography>
      }
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {Array.from({ length: max }).map((_, index) => (
          <Checkbox
            key={index}
            size="small"
            icon={<WaterDropOutlined sx={{ fontSize: '0.85rem' }} />}
            checkedIcon={<WaterDrop color="warning" sx={{ fontSize: '0.85rem' }} />}
            checked={index < current}
            onChange={() => handleChange(index)}
            sx={{ p: 0.25 }}
          />
        ))}
      </Box>
    </CharacterSheetCard>
  )
}
```

### Pattern 6: Highlighted/Error State Card

**Use Case:** Card with conditional styling (e.g., Load when encumbered)

```tsx
import { CharacterSheetCard, CardHeader, CardContent } from './components'
import { FitnessCenter } from '@mui/icons-material'

const getLoadColor = (current: number, capacity: number, max: number) => {
  if (current >= max) return '#f44336' // error red
  if (current >= capacity) return '#ff9800' // warning orange
  return '#78909c' // default gray-blue
}

const HighlightedCard = () => {
  const loadColor = getLoadColor(currentLoad, carryCapacity, maxCapacity)
  const isOverCapacity = currentLoad >= carryCapacity

  return (
    <CharacterSheetCard
      header={
        <CardHeader
          icon={<FitnessCenter />}
          label="Load"
          color={loadColor}
        />
      }
      borderColor={isOverCapacity ? loadColor : undefined}
      tooltip="Encumbered tooltip..."
      showConfigButton
      onConfigClick={handleConfigClick}
      minWidth="5.5rem"
      footer={
        <Typography variant="caption" sx={{ fontSize: '0.55rem', color: 'text.secondary' }}>
          max {maxCapacity}
        </Typography>
      }
    >
      <CardContent
        value={`${currentLoad}/${carryCapacity}`}
        color={loadColor}
      />
    </CharacterSheetCard>
  )
}
```

## Component File Structure

```
src/features/CharacterSheet/components/
├── Card/
│   ├── index.ts                    # Barrel exports
│   ├── CharacterSheetCard.tsx      # Base card component
│   ├── CardHeader.tsx              # Header helper component
│   ├── CardContent.tsx             # Content helper component
│   ├── __tests__/
│   │   ├── CharacterSheetCard.test.tsx
│   │   ├── CardHeader.test.tsx
│   │   └── CardContent.test.tsx
│   └── types.ts                    # Shared TypeScript interfaces
```

## Migration Strategy

The migration should be done incrementally, tab by tab, to minimize risk and allow for testing at each stage.

### Phase 1: Component Creation (Week 1)

1. **Create base components**
   - Implement `CharacterSheetCard` component
   - Implement `CardHeader` helper
   - Implement `CardContent` helper
   - Add comprehensive unit tests
   - Add Storybook stories (if using Storybook)

2. **Validate design**
   - Create sample implementations of all 6 patterns
   - Get design approval
   - Document any edge cases

### Phase 2: Statistics Tab Migration (Week 1-2)

**Priority: High** - This tab already has the card pattern established

Migrate in this order:
1. **Simple fields first**
   - Resolve → Simple input card
   - Parry, Dodge, Resist → Display cards with optional config

2. **Moderate complexity**
   - AV → Display card with config menu (keep existing AV logic)
   - Attributes (STR, AGI, SPI, MND) → Interactive dropdown cards

3. **Complex fields**
   - HP → Complex card with progress bar footer
   - Fatigue → Grid layout card with checkboxes

**Validation:**
- Visual regression testing
- Functional testing (all interactions work)
- Performance check (no rendering slowdowns)

### Phase 3: Skills Tab Migration (Week 2)

**Priority: Medium**

Migrate:
1. Total XP / Spend XP → Create combined display card showing both values
   - Consider two separate cards or single card with both values
   - Include config menu for editing Total XP

**Implementation considerations:**
- Current implementation uses two separate `AttributeField` components
- Could combine into single card with dual display

### Phase 4: Items Tab Migration (Week 2-3)

**Priority: Medium**

Migrate:
1. Coins → Simple display card with config menu
2. Load → Highlighted state card with config menu
3. Location headers (On Mount, In Storage)
   - Create specialized card variant for section headers
   - Include Name input + Load display

**Implementation considerations:**
- LocationLoadDisplay component needs refactoring
- Ensure name editing works correctly
- Maintain all existing load calculation logic

### Phase 5: Spells Tab Migration (Week 3)

**Priority: Medium**

Migrate:
1. Magic Skill → Simple display card (auto-detected)
2. Specialization → Interactive input card (text input)
3. Spell Catalyst Bonus → Interactive input card (number input)
4. Focus → Reuse existing FocusField or create card version

**Implementation considerations:**
- Focus field may need special handling
- Preserve auto-detection logic for Magic Skill

### Phase 6: Personal Tab Migration (Week 3-4)

**Priority: Low** - Fields are simpler, less benefit from cards

Migrate "Your Character" section:
1. Name → Standard TextField (keep as-is or wrap in card)
2. Folk → TextField with edit button (potential card wrapper)
3. Upbringing → TextField with edit button
4. Background → TextField with edit button
5. Motivation → TextField
6. Height, Weight, Age → Small text fields (group in single card?)
7. Description → Multiline TextField

**Implementation considerations:**
- Evaluate if card pattern adds value here
- These fields may be better as traditional form fields
- Consider grouping related fields in single cards

### Phase 7: Companions Tab Migration (Week 4)

**Priority: Low**

Migrate:
1. HP per companion → Reuse HP card from Statistics tab
   - May need companion-specific variant
   - Ensure wound tracking works per companion

**Implementation considerations:**
- Each companion accordion could have its own HP card
- Preserve all companion HP logic

### Phase 8: Party Tab Migration (Week 4)

**Priority: Low**

Migrate:
1. Party Name → Simple display card with edit functionality
   - Icon for party/group
   - Show/edit mode toggle

**Implementation considerations:**
- Current implementation uses edit mode toggle
- Card should support both display and edit states

## TypeScript Interfaces

### Core Types

```typescript
// types.ts
export interface CardHeaderProps {
  icon?: React.ReactNode
  label: string
  color?: string
  sx?: SxProps<Theme>
  'data-testid'?: string
}

export interface CardContentProps {
  value: string | number | React.ReactNode
  sx?: SxProps<Theme>
  color?: string
  'data-testid'?: string
}

export interface CharacterSheetCardProps {
  header?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  tooltip?: string
  configMenu?: React.ReactNode
  onConfigClick?: (event: React.MouseEvent<HTMLElement>) => void
  showConfigButton?: boolean
  minWidth?: string | number
  maxWidth?: string | number
  sx?: SxProps<Theme>
  borderColor?: string
  'data-testid'?: string
}
```

## Styling Considerations

### Theme Integration

All cards should respect the Material-UI theme:

```tsx
// Use theme-aware colors
border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.2)}`
bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3)

// Support dark mode
color: (theme) => theme.palette.text.primary
```

### Responsive Behavior

Cards should adapt to different screen sizes:

```tsx
<CharacterSheetCard
  sx={{
    minWidth: { xs: '100%', sm: '4rem' },
    maxWidth: { xs: '100%', sm: '10rem' }
  }}
>
  {/* content */}
</CharacterSheetCard>
```

### Animation Support

Preserve existing animations (HP damage/heal, etc.):

```tsx
<CardContent
  value={currentHp}
  sx={{
    transition: 'all 0.3s ease-in-out',
    ...(animationState === 'damage' && {
      animation: 'shake 0.5s ease-in-out',
      color: '#f44336',
    })
  }}
/>
```

## Testing Strategy

### Unit Tests

```typescript
describe('CharacterSheetCard', () => {
  it('renders children correctly', () => {
    // Test basic rendering
  })

  it('displays header when provided', () => {
    // Test header rendering
  })

  it('displays footer when provided', () => {
    // Test footer rendering
  })

  it('shows config button when showConfigButton is true', () => {
    // Test config button visibility
  })

  it('calls onConfigClick when config button clicked', () => {
    // Test callback invocation
  })

  it('wraps in tooltip when tooltip prop provided', () => {
    // Test tooltip rendering
  })

  it('applies custom border color', () => {
    // Test styling overrides
  })

  it('applies custom sx props', () => {
    // Test sx merging
  })
})

describe('CardHeader', () => {
  it('renders label correctly', () => {
    // Test label rendering
  })

  it('renders icon when provided', () => {
    // Test icon rendering
  })

  it('applies color to icon and label', () => {
    // Test color theming
  })
})

describe('CardContent', () => {
  it('renders string value', () => {
    // Test string rendering
  })

  it('renders number value', () => {
    // Test number rendering
  })

  it('renders ReactNode value', () => {
    // Test component rendering
  })

  it('applies custom color', () => {
    // Test color override
  })
})
```

### Integration Tests

```typescript
describe('Character Sheet Card Integration', () => {
  it('HP card displays and updates correctly', () => {
    // Test HP card with all features
  })

  it('Attribute card dropdown works', () => {
    // Test interactive dropdown
  })

  it('AV config menu opens and closes', () => {
    // Test config menu interaction
  })

  it('Fatigue checkboxes update state', () => {
    // Test grid interaction
  })
})
```

### Visual Regression Tests

Use screenshot comparison for:
- Each card pattern
- Dark/light mode variants
- Hover states
- Error/highlighted states

## Accessibility Guidelines

### ARIA Labels

```tsx
<CharacterSheetCard
  aria-label="Hit Points"
  aria-describedby="hp-tooltip"
>
  {/* content */}
</CharacterSheetCard>
```

### Keyboard Navigation

- Config buttons should be keyboard accessible
- Tooltips should appear on focus
- Interactive elements should have visible focus indicators

### Screen Reader Support

- Label text should be screen-reader friendly
- Important status changes should be announced
- Use semantic HTML where possible

## Performance Considerations

### Memoization

For frequently updated cards:

```tsx
const MemoizedCard = React.memo(CharacterSheetCard)
```

### Lazy Loading

For tabs with many cards:

```tsx
const HpField = React.lazy(() => import('./HpCard'))
```

### Render Optimization

- Avoid inline function creation in props
- Use stable references for callbacks
- Minimize re-renders with proper dependency arrays

## Future Enhancements

### Possible Extensions

1. **Card Variants**: Pre-configured cards for common use cases
   ```tsx
   <StatCard label="HP" value={hp} icon={<Favorite />} />
   <EditableStatCard label="AV" value={av} onEdit={...} />
   ```

2. **Card Groups**: Wrapper for arranging multiple cards
   ```tsx
   <CardGroup spacing={0.75} direction="row">
     <HpCard />
     <AvCard />
     <FatigueCard />
   </CardGroup>
   ```

3. **Drag & Drop**: Allow users to customize card layout
   - Save preferences to character data
   - Mobile-friendly drag handles

4. **Card Themes**: Allow color scheme customization
   - User-defined color palettes
   - Preset themes (dark, light, colorful)

5. **Card Animations**: Enhanced micro-interactions
   - Entrance/exit animations
   - State change transitions
   - Loading states

## Migration Checklist Template

For each migrated field, verify:

- [ ] Visual appearance matches original
- [ ] All interactions work correctly
- [ ] Tooltips display properly
- [ ] Config menus open/close correctly
- [ ] State updates propagate correctly
- [ ] TypeScript types are correct
- [ ] Unit tests pass
- [ ] No console errors or warnings
- [ ] Accessibility features maintained
- [ ] Performance is acceptable
- [ ] Dark mode works correctly
- [ ] Responsive layout works
- [ ] Original component can be deleted

## Documentation

### Developer Documentation

Create docs for:
1. **Component API**: Full prop documentation with examples
2. **Pattern Library**: All 6 usage patterns with code
3. **Migration Guide**: Step-by-step refactoring instructions
4. **Troubleshooting**: Common issues and solutions

### User Documentation

No user-facing changes needed - this is a refactoring.

## Conclusion

This specification provides a comprehensive blueprint for creating a unified character sheet card component system. The phased migration approach minimizes risk while delivering incremental value. The component architecture balances flexibility with ease of use, enabling both simple and complex use cases.

### Success Criteria

1. **All specified fields migrated** to use new card component
2. **No functionality lost** during migration
3. **Visual consistency** across all tabs
4. **Improved maintainability** (single source of truth for card styling)
5. **Type-safe** implementation with full TypeScript support
6. **Well-tested** with comprehensive unit and integration tests
7. **Documented** with clear usage examples

### Timeline Estimate

- **Week 1**: Component creation + Statistics tab
- **Week 2**: Skills + Items tabs
- **Week 3**: Spells + Personal tabs
- **Week 4**: Companions + Party tabs + documentation

**Total**: ~4 weeks for complete migration

### Risk Mitigation

- Incremental migration reduces blast radius
- Comprehensive testing catches regressions early
- Original components remain until migration complete
- Rollback plan: keep old components in git history
