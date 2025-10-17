# Archetype Selection Feature

## Overview

The archetype selection feature allows players to choose from 25 predefined character archetypes during character creation. Each archetype provides recommended starting attributes, skills, talents, and equipment that match classic fantasy roles from the Nexus RPG quickstart characters guide.

## User Experience

### Character Creation Flow

1. **Open New Character Dialog**: Click "new character" button on the character sheet page
2. **Enter Character Name**: Provide a name for your character
3. **Select Archetype (Optional)**: Click "Select Archetype" button to browse available archetypes
4. **Browse Archetypes**: Search and filter through 25 archetypes by:
   - Name
   - Role (Striker, Tank, Support, Controller, Utility)
   - Description
   - Best use cases
5. **Select Archetype**: Click on an archetype to select it
6. **Review Selection**: See the archetype description in the dialog
7. **Optional Customization**: Optionally select Folk, Upbringing, and Background
8. **Create Character**: Click "Create Character" to generate your character

### What Gets Applied

When you select an archetype, the following character properties are automatically set:

#### Attributes
- **Strength (STR)**: Set to archetype's recommended value (d4-d12)
- **Agility (AGI)**: Set to archetype's recommended value (d4-d12)
- **Spirit (SPI)**: Set to archetype's recommended value (d4-d12)
- **Mind (MND)**: Set to archetype's recommended value (d4-d12)
- **HP**: Automatically calculated as 12 + Strength value

#### Skills
- **Suggested Skills**: Added to character's skill list (no duplicates)
- Combined with skills from Upbringing and Background if selected

#### Character Information
- **Description**: Includes archetype name and role
- **Notes**: Contains archetype information including:
  - Archetype name
  - Best use cases
  - Full description
  - Recommended talents list

#### Abilities
- **Recommended Talents**: Added as a note ability with all suggested talents listed
- Combined with Folk abilities if Folk is selected

## Available Archetypes

### 25 Character Archetypes

The system includes all archetypes from the quickstart guide:

| Category | Archetypes |
|----------|-----------|
| **Martial Warriors** | Barbarian, Brawler, Champion, Duelist, Fighter, Gladiator, Hoplite, Monk, Swashbuckler, Warlord |
| **Ranged Combatants** | Engineer, Ranger, Slinger, Apothecary |
| **Magic Users** | Bard, Druid, Magus, Oracle, Priest, Shaman, Sorcerer, Summoner, Warlock |
| **Hybrid/Support** | Tamer, Rogue |

### Archetype Details

Each archetype includes:

1. **Name**: Archetype identifier
2. **Role**: Primary and secondary tactical roles
3. **Description**: Playstyle overview
4. **Best For**: Key features and playstyle hooks
5. **Primary Skills**: Core skills for the archetype
6. **Attributes**: Recommended attribute distribution
7. **Suggested Skills**: Skills to add during character creation
8. **Recommended Talents**: Talents that synergize with the archetype
9. **Starting Equipment**: Suggested equipment purchases

## Technical Implementation

### Data Structure

Archetypes are stored in `src/utils/json/archetypes.json`:

```json
{
  "name": "Fighter",
  "role": "Tank / Striker",
  "description": "A reliable frontline combatant using shield and blade...",
  "bestFor": "Reliable frontline combat",
  "primarySkills": ["Fighting", "Athletics", "Fortitude"],
  "attributes": {
    "STR": 8,
    "AGI": 6,
    "SPI": 6,
    "MND": 4
  },
  "suggestedSkills": "Fighting, Athletics, Fortitude",
  "recommendedTalents": ["Shield Mastery", "Stand Your Ground", "Second Wind"],
  "startingEquipment": ["Longsword", "Light Shield", "Leather Armor"]
}
```

### Components

1. **ArchetypeSelectionDialog**: Selection dialog component
   - Uses `SingleSelectionDialog` pattern
   - Searchable and sortable table
   - Displays archetype name, role, description, and primary skills

2. **CharacterSheetHeader**: Main character creation dialog
   - Integrates archetype selection
   - Positioned before Folk/Upbringing/Background selections
   - Shows selected archetype description

3. **createInitialCharacter**: Character creation utility
   - Applies archetype data to new character
   - Combines archetype skills with other sources
   - Resolves skill conflicts (e.g., Arcana/Mysticism exclusivity)

### Type Definitions

```typescript
export type ArchetypeData = {
  name: string
  role: string
  description: string
  bestFor: string
  primarySkills: string[]
  attributes: {
    STR: number  // Valid die sizes: 4, 6, 8, 10, 12
    AGI: number
    SPI: number
    MND: number
  }
  suggestedSkills: string
  recommendedTalents: string[]
  startingEquipment: string[]
}
```

## Design Decisions

### Why Archetypes First?

Archetypes appear first in the character creation flow because they:
1. Provide the most comprehensive starting template
2. Set the foundation for attribute and skill choices
3. Help new players understand available playstyles
4. Reference the official quickstart guide

### Skill Conflict Resolution

When skills from archetype, upbringing, and background overlap:
- **Duplicates are removed**: Each skill appears only once
- **Arcana/Mysticism conflict**: Only one magic school can be selected
  - Currently defaults to Arcana if both are present
  - Future enhancement: Allow player choice

### Customization After Selection

All archetype recommendations are **suggestions, not restrictions**:
- Players can manually adjust attributes after creation
- Skills can be added or removed
- Equipment recommendations are noted but not automatically added
- Talents are suggested but must be selected when spending XP

## Testing

### Unit Tests

Comprehensive test suite in `tests/unit/archetypeSelection.test.ts` covers:
- JSON structure validation
- Attribute value validation (must be valid die sizes)
- Character creation with archetype data
- Skill combination and conflict resolution
- HP calculation based on archetype strength
- Notes and abilities generation
- Default behavior when no archetype selected

### Manual Testing

To manually test the feature:
1. Navigate to `/docs/tools/character-sheet`
2. Log in with Firebase authentication
3. Click "new character" button
4. Click "Select Archetype" button
5. Search for and select an archetype
6. Verify archetype description appears
7. Create the character
8. Verify attributes, skills, and notes match archetype

## Future Enhancements

Potential improvements for the archetype system:

1. **Equipment Auto-Population**: Automatically add recommended equipment to inventory
2. **Talent Suggestions**: Link talent names to talent definitions for easy selection
3. **Archetype Filtering**: Add role-based filters (Striker, Tank, Support, etc.)
4. **Customization Options**: Allow overriding individual archetype recommendations
5. **Archetype Comparison**: Side-by-side comparison of multiple archetypes
6. **Skill Conflict Resolution UI**: Interactive choice when Arcana/Mysticism conflict occurs
7. **Documentation Links**: Link to full archetype details in quickstart guide

## References

- **Design Guide**: `.github/instructions/archetypes.instructions.md`
- **Quickstart Characters**: `docs/01-basic-rules/03-quickstart-characters.md`
- **Component Implementation**: `src/features/CharacterSheet/components/ArchetypeSelectionDialog.tsx`
- **Character Creation Logic**: `src/features/CharacterSheet/utils/createInitialCharacter.ts`
- **Archetype Data**: `src/utils/json/archetypes.json`
