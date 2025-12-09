# Nexus RPG Architecture Reference

Detailed technical documentation for the Nexus RPG project architecture.

## Tech Stack

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management with Immer for immutability
- **Material-UI 5** - Component library and theming
- **TypeScript** - Type safety across the codebase

### Backend/Services
- **Firebase 10+** - Authentication, Firestore database, hosting
- **Docusaurus 3.7+** - Static site generation for documentation

### Build Tools
- **Babel** - JavaScript transpilation
- **Webpack** (via Docusaurus) - Module bundling
- **Python 3.x** - Content processing scripts

---

## Project Structure

```
nexus-rpg/
├── docs/                          # Game rules documentation
│   ├── 01-basic-rules/
│   ├── 02-adventurers/
│   ├── 03-statistics/
│   ├── 04-equipment/
│   ├── 05-combat/
│   ├── 06-scenes/
│   ├── 07-magic/
│   ├── 08-creatures/
│   ├── 10-gm-tools/
│   └── 11-character-sheet/
├── src/
│   ├── components/                # Reusable React components
│   ├── features/
│   │   └── CharacterSheet/        # Character management app
│   │       ├── CharacterSheetTabs/
│   │       ├── components/
│   │       ├── store/             # Redux slice
│   │       └── utils/             # Character-specific utilities
│   ├── config/                    # Firebase and app config
│   ├── hooks/                     # Custom React hooks
│   ├── types/                     # TypeScript type definitions
│   └── utils/                     # Utility functions and scripts
│       ├── scripts/               # Content processing
│       │   ├── notion-import/     # Notion automation
│       │   ├── converters/        # Format converters
│       │   └── transformers/      # Data transformers
│       ├── data/                  # Generated data files
│       └── typescript/            # TS utility functions
├── spec/                          # Feature specifications
└── .github/instructions/          # Development guidelines
```

---

## Documentation System (Docusaurus)

### Page Structure
- **Markdown files** in `/docs/` with YAML frontmatter
- **Sidebar position** controlled by `sidebar_position` in frontmatter
- **MDX support** for React components in markdown

### Custom Components
Used throughout documentation for interactive elements:
- `<RollableTable>` - Roll dice on tables
- `<CompanionBuilderWrapper>` - Interactive companion creator
- `<CreatureBuilder>` - Creature stat block generator
- `<BrowserOnly>` - Client-side only rendering

### Build Process
1. Markdown → React components (via MDX)
2. Static HTML generation
3. Client-side hydration
4. Firebase hosting deployment

### Custom Plugins
- **Remark plugins** for markdown processing
- **Keyword conversion** with blacklist system
- **Chip system** for game term highlighting

---

## Character Sheet Application

### Data Flow

```
URL (?id=userId-characterId)
    ↓
Firebase Document Fetch
    ↓
Migration (if needed)
    ↓
Redux Store
    ↓
React Components
    ↓
User Interaction
    ↓
Redux Actions
    ↓
Optimistic UI Update
    ↓
Firebase Sync (debounced)
```

### Character Document Structure

```typescript
CharacterDocument {
  docId: string                    // Unique document ID
  docRef: DocumentReference        // Firebase reference
  
  personal: {
    name: string
    folk: string
    upbringing: string
    background: string
    allies: Ally[]
    contacts: Contact[]
    rivals: Rival[]
  }
  
  skills: {
    xp: number
    skills: Skill[]                // Skill ranks and talents
    abilities: Ability[]           // Combat arts, spells, etc.
    abilityCategoryVisibility: {}  // UI state
  }
  
  statistics: {
    attributes: Attributes         // Strength, Agility, Spirit, Mind
    health: {
      hp: number
      maxHp: number
      wounds: number
    }
    statusEffects: StatusEffect[]
  }
  
  items: {
    weapons: Weapon[]
    items: Item[]
    coins: number
    encumbrance: {
      current: number
      max: number
    }
  }
  
  spells: {
    focus: number
    maxFocus: number
    spells: Spell[]
  }
  
  companions: Companion[]
}
```

### Redux Architecture

**Store Location**: `/src/features/CharacterSheet/store/characterSheetSlice.ts`

**Action Pattern**: `characterSheetActions.verbNoun`

**Key Actions**:
- `updateCharacter(update)` - Deep partial update
- `addWeapon(weapon)` - Add new weapon
- `updateWeapon(id, update)` - Update existing weapon
- `deleteWeapon(id)` - Remove weapon
- `reorderWeapons(ids)` - Drag-and-drop reordering

**State Management**:
- **Immer** for immutable updates
- **Deep merging** via `mergeDeep` utility
- **Optimistic updates** - UI updates immediately
- **Debounced sync** - Firebase writes after 2s delay

### Component Architecture

**Tab Structure**: Feature-based organization with numbered folders
```
CharacterSheetTabs/
├── 00_Statistics/        # Attributes, HP, defenses
├── 01_Skills/            # Skills and talents
├── 02_Equipment/         # Weapons, armor, items
├── 03_Abilities/         # Combat arts and spells
├── 04_Background/        # Personal info and relationships
└── 05_Companions/        # Animal companions
```

**Reusable Components**:
- `AttributeField` - Dice notation input
- `SectionHeader` - Collapsible sections
- `DynamicList` - Drag-and-drop lists with CRUD
- `StatusEffects` - Condition tracking

**Form Pattern**:
```typescript
const [localValue, setLocalValue] = useState(initialValue)

const handleBlur = () => {
  dispatch(characterSheetActions.updateField(localValue))
}

<TextField
  value={localValue}
  onChange={(e) => setLocalValue(e.target.value)}
  onBlur={handleBlur}
/>
```

---

## Firebase Integration

### Authentication
**Hook**: `/src/hooks/firebaseAuthContext.tsx`
- Google OAuth
- Email/password
- Anonymous auth for demo

### Database Structure
```
Firestore
├── {userId}/                    # User's collection
│   ├── character-{id}/          # Individual characters
│   │   ├── personal: {}
│   │   ├── skills: {}
│   │   └── ...
│   └── metadata/
└── shared-notes/                # Shared across users
    └── note-{id}/
        ├── content: string
        └── allowedCharacters: string[]
```

### Data Migration
**File**: `/src/features/CharacterSheet/utils/migrateDoc.ts`

When character structure changes:
1. Update TypeScript types
2. Add migration function in `migrateDoc.ts`
3. Increment version number
4. Migration runs on document load

**Example**:
```typescript
export function migrateDoc(doc: any): CharacterDocument {
  let version = doc.version || 0
  
  if (version < 2) {
    // Add new field
    doc.statistics.defenses = calculateDefenses(doc.statistics.attributes)
    version = 2
  }
  
  doc.version = version
  return doc as CharacterDocument
}
```

### Auto-Save System
1. User makes change
2. Redux action dispatched
3. `unsavedChanges` flag set to `true`
4. 2-second debounce timer starts
5. Timer expires → Firebase write
6. `unsavedChanges` set to `false`
7. UI indicator updates

---

## Content Processing Pipeline

### Notion → Docs Workflow
**Location**: `/src/utils/scripts/notion-import/`

**Process**:
1. Export Notion space as HTML ZIP
2. Run `./import-from-notion.sh export.zip`
3. Script extracts, converts, and maps content
4. Docs files updated automatically

**Details**: See `/src/utils/scripts/notion-import/README.md`

### HTML → Markdown → JSON
**Scripts**: `/src/utils/scripts/converters/`

**Pipeline**:
```bash
# Convert HTML tables to markdown
python html-to-md.py data/input/

# Split tables by section
python split-tables.py

# Transform to JSON
python markdown-to-json.py
```

**Output**: JSON files in `/src/utils/data/json/` used by interactive tools

---

## Material-UI Theming

### Theme Configuration
**File**: `/src/hooks/createTheme.ts`

**Features**:
- Dark/light mode toggle
- Custom color palette (fantasy-inspired)
- Responsive breakpoints
- Component default overrides

### Styling Approach
```typescript
// Use sx prop for component styling
<Box sx={{
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  gap: 2,
  p: 3
}}>
  {children}
</Box>

// Responsive breakpoints: xs, sm, md, lg, xl
```

---

## TypeScript Types

### Central Location
**File**: `/src/types/Character.ts`

Contains all type definitions:
- Character document structure
- Skills, talents, spells
- Items, weapons, armor
- Status effects, conditions
- Companions

### Type Naming Conventions
```typescript
// Interfaces for data structures
interface CharacterDocument { ... }
interface Weapon { ... }

// Component props
interface AttributeFieldProps { ... }

// Enums for constants
enum AttributeType {
  Strength = 'strength',
  Agility = 'agility',
  Spirit = 'spirit',
  Mind = 'mind'
}
```

---

## Common Patterns

### UUID Generation
```typescript
// Always use crypto.randomUUID()
const newWeapon: Weapon = {
  id: crypto.randomUUID(),
  name: 'Longsword',
  // ...
}
```

### Deep Partial Updates
```typescript
// Use mergeDeep utility for nested updates
const update: DeepPartial<CharacterDocument> = {
  statistics: {
    health: {
      hp: 25
    }
  }
}

dispatch(characterSheetActions.updateCharacter(update))
```

### Drag-and-Drop Lists
```typescript
// Use DynamicList component
<DynamicList
  items={weapons}
  onReorder={(ids) => dispatch(characterSheetActions.reorderWeapons(ids))}
  onAdd={() => dispatch(characterSheetActions.addWeapon(newWeapon))}
  onDelete={(id) => dispatch(characterSheetActions.deleteWeapon(id))}
  renderItem={(weapon) => <WeaponCard weapon={weapon} />}
/>
```

---

## Debugging

### Redux DevTools
Monitor state changes and action history:
- Time-travel debugging
- Action payload inspection
- State diff visualization

### Firebase Console
Check database structure and permissions:
- Firestore data browser
- Authentication users
- Storage files

### Character Migration Logs
Console logs show migration process:
```
Character loaded: character-abc123
Migration: v1 → v2
Migration: v2 → v3
Migration complete: v3
```

### Auto-Save Indicators
Watch for UI feedback:
- "Unsaved changes" indicator
- Debounce timer in Redux state
- Firebase write success/failure

---

## Performance Considerations

### Code Splitting
- Lazy load character sheet tabs
- Dynamic imports for heavy components
- Route-based splitting via Docusaurus

### Firebase Optimization
- Debounced writes (avoid excessive updates)
- Optimistic updates (responsive UI)
- Indexed queries for performance
- Pagination for large lists

### Bundle Size
- Tree-shaking unused MUI components
- Lazy load Python scripts (not in bundle)
- Minimize third-party dependencies

---

## Deployment

### Development
```bash
yarn start              # Dev server on localhost:3000
yarn build              # Production build to /build
```

### Production
```bash
yarn deploy             # Build + Firebase deploy
```

**Requirements**:
- `.env` file with Firebase config
- Firebase CLI authenticated
- Hosting configured in `firebase.json`

### Environment Variables
```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

---

## Testing Strategy

### Manual Testing
- Character creation workflow
- Auto-save functionality
- Multi-device sync
- Migration testing with old data

### Test Characters
Use URL pattern: `?id=test-character-1`

### Validation
- TypeScript compile-time checks
- Redux state validation
- Firebase security rules testing

---

For implementation details, see:
- `/spec/` - Feature specifications
- Component-level documentation
- Inline code comments

