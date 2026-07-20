# Character Sheet App

React/Redux character management app embedded in the Docusaurus site. Effectively an app inside the main app — this file covers its internals; see the root CLAUDE.md for repo-wide conventions.

## Entry & Data Flow

```
URL ?id={userId}-{characterId}
  → CharacterSheetWrapper.tsx → CharacterSheetContainer.tsx
  → Firebase fetch → migrateDoc() → Redux store
  → user edits → characterSheetActions.* → optimistic update, unsavedChanges = true
  → debounced autosave → Firestore write
```

## State Management

- **Single slice**: `characterSheetReducer.ts` (~1000 lines) holds the entire slice — all actions are defined inline there, pattern `characterSheetActions.verbNoun` (e.g. `updateCharacter`, `addNewWeapon`, `reorderSpells`).
- ⚠️ The `reducers/` folder (`itemsActions.ts`, `skillsActions.ts`, …) is an **unfinished refactor and is not imported anywhere** — don't add actions there, don't mistake it for the live code. See `spec/refactoring-plan.md`.
- Store setup in `store.ts` (`setupStore()`, `serializableCheck: false` because the character doc carries a Firestore `DocumentReference`).
- `updateCharacter` takes a `DeepPartial<Character>` and applies it via the local `mergeDeep` — nested partial updates are the norm.
- Slice state flags: `unsavedChanges`, `saveTimeout`, `autosave`, `loadingSave` — the autosave loop in `CharacterSheetContainer.tsx` watches these.
- Typed hooks in `hooks/`: `useAppDispatch`, `useAppSelector`, `useDebounce`.

## Tabs

`CharacterSheetTabs/` numbered folders (names differ from old docs — this is current):

```
00_Statistics   01_Skills   02_Items   03_Spells
04_Personal     05_Companions   06_SharedNotes
```

Tab config in `utils/tabsConfig.ts`.

## Types

All character types central in `/src/types/Character.ts` (`CharacterDocument`, `Weapon`, `Spell`, `Skill`, …). Supporting enums in `/src/types/` (`AbilityTag`, `ActionType`, `ItemLocation`). New entities get `id: crypto.randomUUID()`.

## Data Migration (two layers)

1. `utils/migrateDoc.ts` — async, runs on Firestore document fetch, normalizes legacy top-level structure.
2. `utils/characterMigration.ts` (`migrateCharacterData`) — sync, runs inside the `setCharacter` action, fills missing fields (e.g. companions arrays).

When changing the character schema: update `/src/types/Character.ts`, then add the fix-up in the appropriate layer. Old documents in production must keep loading.

## Firebase

- Firestore layout: collection per user (**user UID is the collection name**), documents per character; `shared-notes` collection is cross-user.
- Auth context: `/src/hooks/firebaseAuthContext.tsx`.
- Writes are debounced; UI updates are optimistic.

## Validation

Forms use react-hook-form + Yup via helper functions (no wrapper components) — schemas and helpers in `utils/validation.ts`, full explanation in `utils/VALIDATION_README.md`.

## Derived Values

Pure calculation functions in `utils/` (`calculateHp`, `calculateDefenses`, `calculateFocus`, `calculateCharacterLevel`, `calculateTalentPoints`, …) with Vitest tests in `utils/__tests__/`. Add tests there when touching derivation logic (`bun run test`).

## Conventions

- MUI styling via `sx` prop; theme in `/src/hooks/createTheme.ts` (dark/light).
- Drag-and-drop lists use the shared `DynamicList` component (`/src/components/DynamicList/`).
- Local-state + `onBlur` dispatch pattern for text fields (avoids dispatch-per-keystroke).
- Test a live character with URL pattern `?id=test-character-1`.
