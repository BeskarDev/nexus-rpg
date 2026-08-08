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
- Lists are built from the ledger primitives in `components/` (M13 S2): `UnifiedListItem` for a row (omit `detailsContent` for the non-expanding variant; add `onSelectedChange` to that variant for a list the reader chooses FROM, as the search dialogs do), `ListSection` / `ListSectionHeader` for a grouping header, `DynamicList` / `DynamicListItem` for drag-and-drop. All live in `components/DynamicList/` and `components/ListSection/` — they moved out of `/src/components/` in M13 S2 because every consumer is inside the sheet and the print sheet forks freely.
- Dialogs (M13 S8): `SearchDialog` in `components/SearchDialog/` is the one list-in-a-dialog — pass `selectionMode: 'single'` for a pick-one picker (`SingleSelectionDialog` is a thin adapter over it). `ConfirmDialog` is the one confirmation shape.
- Deletes (2026-08-02): **every content entity confirms, and the gate is inside `DeleteButton`** — pass `entityKind` and `entityName` so the dialog can say what is going; pass `confirm={false}` only where the caller already has its own dialog. Never hand-roll a confirmation around a delete. What still goes on the spot is what a player removes several times a session: a status effect, a language, a profession chip, a quick-ref pin.
- `CharacterSheetCard` is a **tile** container, not a section container: it centres its children in a flex row and pads for content that never reaches the frame. Use `ListSection` for anything full-width.
- Local-state + `onBlur` dispatch pattern for text fields (avoids dispatch-per-keystroke).
- Test a live character with URL pattern `?id=test-character-1`.
