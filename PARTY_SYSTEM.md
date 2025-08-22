# Adventuring Party System

## Overview

The Nexus RPG character sheet now includes a comprehensive adventuring party system that replaces the manual shared notes functionality. This system allows players to create and manage parties directly from their character sheets without requiring manual database edits.

## Key Features

### Character ID Display
- Shows the character's unique ID in the Shared Notes tab
- One-click copy functionality for easy sharing
- Format: `{userId}-{characterId}`

### Party Creation
- Simple form to create a named adventuring party
- Automatically adds the creator as the first member
- Each character can only belong to one party at a time

### Member Management
- Invite members by entering their character ID
- Visual display of all party members with:
  - Character name, folk, background, and level
  - Player name
  - Avatar image
- Leave party or remove members with confirmation dialogs

### Real-time Shared Notes
- Live updating shared notes area
- All party members see changes instantly
- No more manual save/load - changes sync automatically
- Conflict prevention through real-time synchronization

### Automatic Migration
- Seamlessly converts existing shared notes to the new party system
- Preserves all existing notes content
- Automatically creates parties from manual database entries
- No data loss during transition

## Technical Implementation

### New Data Structures
- `Party`: Core party information with members list and shared notes
- `PartyMember`: Character information for display
- `Character.partyId`: Reference field linking characters to their party

### Services
- `PartyService`: Core party management operations
- `MigrationService`: Handles conversion from legacy shared notes

### Real-time Updates
- Firestore listeners for live party updates
- Automatic UI updates when party membership changes
- Real-time notes synchronization across all members

### UI Components
- `PartyManagement`: Main party control interface
- `PartyMemberItem`: Individual member display with actions
- Integrated into existing SharedNotes tab

## User Experience

### For New Users
1. Navigate to character sheet's "Shared Notes & Party" tab
2. See character ID with copy button
3. Create a party by entering a name
4. Invite friends by sharing character IDs
5. Share notes that update live for all members

### For Existing Users
- Existing shared notes automatically migrate to party system
- All notes content preserved
- Characters previously added manually become party members
- Seamless transition with no manual intervention required

## Benefits

- ✅ No more manual Firebase database edits
- ✅ User-friendly party management interface
- ✅ Real-time collaboration on shared notes
- ✅ Automatic conflict prevention
- ✅ Complete preservation of existing data
- ✅ Intuitive character invitation system
- ✅ Comprehensive error handling and user feedback