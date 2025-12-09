# Copilot Instructions for Nexus RPG

## 🚨 MANDATORY WORKFLOW

**Before starting ANY work:**
1. **Check `/spec/` folder first** - Read relevant feature spec completely
2. **Investigate current state** - Verify what's implemented vs documented
3. **Make changes** - Follow spec architecture and patterns
4. **Update the spec** - Mark progress, document findings (MANDATORY)
5. **Report results** - Summarize work, blockers, next steps

**📖 Full workflow details**: [`/spec/README.md`](../../spec/README.md)

---

## Project Overview

**Nexus RPG** is a sword & sorcery tabletop RPG built as a Docusaurus documentation site with an interactive character sheet application.

## Architecture

**Tech Stack**: Docusaurus 3.7+, React 18, Redux Toolkit, Material-UI 5, Firebase 10+, TypeScript

**Structure**:
- `/docs/` - Game rules as markdown (Docusaurus)
- `/src/features/CharacterSheet/` - Character management app (React/Redux)
- `/src/utils/` - Content processing scripts (Python)
- `/src/components/` - Reusable React components

**Key Patterns**:
- Redux: `characterSheetActions.verbNoun` pattern
- Firebase: User UID as collection name
- Components: Feature-based organization
- MDX: Custom components like `<RollableTable>`

**📖 Full architecture details**: See inline code documentation and `/src/README.md`

---

## Development Quick Reference

### Commands
```bash
yarn start          # Dev server
yarn build          # Production build
yarn deploy         # Deploy to Firebase
```

### Content Updates
1. **Notion → Docs**: See `/src/utils/scripts/notion-import/README.md`
2. **Markdown → JSON**: Run scripts in `/src/utils/scripts/converters/`

### Character Sheet
- **Entry**: `CharacterSheetWrapper.tsx` → `CharacterSheetContainer.tsx`
- **URL Pattern**: `?id=userId-characterId`
- **Migration**: Update `/src/features/CharacterSheet/utils/migrateDoc.ts`

**📖 Full development guides**: See component-level README files

---

## Critical Guidelines

### Workflow (MANDATORY)
1. **Always check** `/spec/` folder before starting work
2. **Always update** spec files after completing tasks
3. **Never** create standalone summary/feature docs in project root
4. **Never** commit temporary test scripts

**📖 Complete workflow**: [`/spec/README.md`](../../spec/README.md)

### Spec Management
- **Format**: `issue-XXX-feature-name-spec.md`
- **Status**: Use ✅ ⚠️ ❌ emojis
- **Updates**: Dated sections with findings
- **Template**: See `issue-160-notion-import-feature-spec.md`

**📖 Spec guidelines**: [`/spec/README.md`](../../spec/README.md)

### Code Conventions
- **Components**: PascalCase, feature-based folders
- **Types**: Centralized in `/src/types/`
- **State**: Immutable updates via Immer
- **IDs**: `crypto.randomUUID()` for all entities

**📖 Game system rules**: See `.github/instructions/*.instructions.md` files

---

## Quick Reference

### Where to Find Information

| Topic | Location |
|-------|----------|
| **Mandatory workflow** | [`/spec/README.md`](../../spec/README.md) |
| **Feature specs** | `/spec/issue-XXX-*.md` |
| **Architecture details** | [`.github/instructions/ARCHITECTURE.md`](./ARCHITECTURE.md) |
| **Notion import** | `/src/utils/scripts/notion-import/README.md` |
| **Game rules (spells, talents, etc.)** | `.github/instructions/*.instructions.md` |
| **Component docs** | Inline in component files |
| **TypeScript types** | `/src/types/Character.ts` |
| **Redux actions** | `/src/features/CharacterSheet/store/` |

### First Steps for New Tasks

1. Check if issue has a spec: `ls /workspaces/nexus-rpg/spec/issue-{number}*`
2. If spec exists: Read it completely
3. If not: Create one (use `issue-160-notion-import-feature-spec.md` as template)
4. Make changes following spec guidance
5. Update spec with results

### Common Tasks

**Adding a new page mapping** → See `/spec/issue-160-notion-import-feature-spec.md`  
**Character sheet feature** → See [ARCHITECTURE.md](./ARCHITECTURE.md) Redux section  
**Content conversion** → See `/src/utils/scripts/*/README.md`  
**Deploying** → `yarn build && yarn deploy`

---

**Remember**: Always check `/spec/` first, always update it last. No exceptions.

