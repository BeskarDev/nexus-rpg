import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { characterSheetReducer, characterSheetActions } from '@site/src/features/CharacterSheet/characterSheetReducer'
import { 
  createTestStore, 
  createInitialState, 
  createStateWithCharacter,
  expectUnsavedChanges,
  expectArrayLength,
  expectCharacterMigrated,
  expectCompanionMigrated,
  expectReorderCorrect,
  mockCrypto,
  mockDateNow,
  calculateExpectedSkillRank
} from '../utils/character-test-helpers'
import {
  createCharacterDocument,
  createBasicCharacter,
  createLegacyCharacter,
  createTestSkill,
  createTestWeapon,
  createTestItem,
  createTestSpell,
  createTestCompanion,
  createTestAbility
} from '../utils/character-test-fixtures'

describe('Character Sheet Reducer', () => {
  let resetCrypto: () => void
  let resetDate: () => void

  beforeEach(() => {
    resetCrypto = mockCrypto()
    resetDate = mockDateNow()
  })

  afterEach(() => {
    resetCrypto()
    resetDate()
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = characterSheetReducer(undefined, { type: '@@INIT' })
      
      expect(state.activeCharacter).toBeUndefined()
      expect(state.unsavedChanges).toBe(false)
      expect(state.saveTimeout).toBe(false)
      expect(state.autosave).toBe(false)
      expect(state.loadingSave).toBe(false)
    })
  })

  describe('Basic State Management Actions', () => {
    describe('setUnsavedChanges', () => {
      it('should set unsavedChanges to true', () => {
        const state = characterSheetReducer(
          createInitialState(),
          characterSheetActions.setUnsavedChanges(true)
        )
        
        expect(state.unsavedChanges).toBe(true)
      })

      it('should set unsavedChanges to false', () => {
        const initialState = createInitialState({ unsavedChanges: true })
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.setUnsavedChanges(false)
        )
        
        expect(state.unsavedChanges).toBe(false)
      })
    })

    describe('setSaveTimeout', () => {
      it('should set saveTimeout flag', () => {
        const state = characterSheetReducer(
          createInitialState(),
          characterSheetActions.setSaveTimeout(true)
        )
        
        expect(state.saveTimeout).toBe(true)
      })
    })

    describe('setAutosave', () => {
      it('should set autosave flag', () => {
        const state = characterSheetReducer(
          createInitialState(),
          characterSheetActions.setAutosave(true)
        )
        
        expect(state.autosave).toBe(true)
      })
    })

    describe('setLoadingSave', () => {
      it('should set loadingSave flag', () => {
        const state = characterSheetReducer(
          createInitialState(),
          characterSheetActions.setLoadingSave(true)
        )
        
        expect(state.loadingSave).toBe(true)
      })
    })
  })

  describe('Character CRUD Operations', () => {
    describe('setCharacter', () => {
      it('should set a basic character', () => {
        const character = createCharacterDocument()
        const state = characterSheetReducer(
          createInitialState(),
          characterSheetActions.setCharacter(character)
        )
        
        expect(state.activeCharacter).toEqual(character)
        expectCharacterMigrated(state.activeCharacter!)
      })

      it('should migrate legacy character without companions', () => {
        const legacyCharacter = createLegacyCharacter() as any
        legacyCharacter.docId = 'legacy-test'
        legacyCharacter.docRef = { id: 'legacy-test' }
        legacyCharacter.collectionId = 'test'
        
        const state = characterSheetReducer(
          createInitialState(),
          characterSheetActions.setCharacter(legacyCharacter)
        )
        
        expectCharacterMigrated(state.activeCharacter!)
        expectArrayLength(state.activeCharacter!.companions, 0, 'Companions')
      })

      it('should migrate character with missing statusEffects', () => {
        const character = createCharacterDocument()
        delete (character.statistics as any).statusEffects
        
        const state = characterSheetReducer(
          createInitialState(),
          characterSheetActions.setCharacter(character)
        )
        
        expect(state.activeCharacter!.statistics.statusEffects).toBeDefined()
        expectArrayLength(state.activeCharacter!.statistics.statusEffects, 0, 'Status Effects')
      })

      it('should fix non-array statusEffects', () => {
        const character = createCharacterDocument()
        ;(character.statistics as any).statusEffects = 'invalid'
        
        const state = characterSheetReducer(
          createInitialState(),
          characterSheetActions.setCharacter(character)
        )
        
        expect(Array.isArray(state.activeCharacter!.statistics.statusEffects)).toBe(true)
        expectArrayLength(state.activeCharacter!.statistics.statusEffects, 0, 'Status Effects')
      })

      it('should migrate companions without HP fields', () => {
        const character = createCharacterDocument()
        character.companions = [
          { id: '1', name: 'Old Companion', markdown: 'Description' } as any
        ]
        
        const state = characterSheetReducer(
          createInitialState(),
          characterSheetActions.setCharacter(character)
        )
        
        expectCompanionMigrated(state.activeCharacter!.companions)
        expect(state.activeCharacter!.companions[0].currentHP).toBe(0)
        expect(state.activeCharacter!.companions[0].maxHP).toBe(0)
        expect(state.activeCharacter!.companions[0].wounded).toBe(false)
      })

      it('should recalculate skill ranks from XP', () => {
        const character = createCharacterDocument()
        character.skills.skills = [
          { id: '1', name: 'Fighting', rank: 1, xp: 15 }, // Should be rank 3
          { id: '2', name: 'Athletics', rank: 3, xp: 3 }   // Should be rank 1
        ]
        
        const state = characterSheetReducer(
          createInitialState(),
          characterSheetActions.setCharacter(character)
        )
        
        expect(state.activeCharacter!.skills.skills[0].rank).toBe(3)
        expect(state.activeCharacter!.skills.skills[1].rank).toBe(1)
      })

      it('should add missing Tradespeak language', () => {
        const character = createCharacterDocument()
        character.skills.languages = ['Common']
        
        const state = characterSheetReducer(
          createInitialState(),
          characterSheetActions.setCharacter(character)
        )
        
        expect(state.activeCharacter!.skills.languages).toContain('Tradespeak')
        expect(state.activeCharacter!.skills.languages[0]).toBe('Tradespeak') // Should be first
      })

      it('should migrate missing storageMaxLoad', () => {
        const character = createCharacterDocument()
        delete (character.items.encumbrance as any).storageMaxLoad
        
        const state = characterSheetReducer(
          createInitialState(),
          characterSheetActions.setCharacter(character)
        )
        
        expect(state.activeCharacter!.items.encumbrance.storageMaxLoad).toBe(0)
      })
    })

    describe('updateCharacter', () => {
      it('should update character with deep merge', () => {
        const character = createCharacterDocument()
        const initialState = createStateWithCharacter(character)
        
        const update = {
          personal: {
            name: 'Updated Name'
          },
          statistics: {
            resolve: 5
          }
        }
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.updateCharacter(update)
        )
        
        expect(state.activeCharacter!.personal.name).toBe('Updated Name')
        expect(state.activeCharacter!.statistics.resolve).toBe(5)
        // Other fields should remain unchanged
        expect(state.activeCharacter!.personal.playerName).toBe(character.personal.playerName)
        expect(state.activeCharacter!.statistics.health).toEqual(character.statistics.health)
        expectUnsavedChanges(state)
      })

      it('should use deep copy to prevent mutation', () => {
        const character = createCharacterDocument()
        const initialState = createStateWithCharacter(character)
        
        const update = {
          personal: {
            allies: [{ id: '1', description: 'New ally' }]
          }
        }
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.updateCharacter(update)
        )
        
        // Verify the update was copied, not referenced
        expect(state.activeCharacter!.personal.allies).not.toBe(update.personal.allies)
        expect(state.activeCharacter!.personal.allies).toEqual(update.personal.allies)
      })

      it('should preserve docRef during update', () => {
        const character = createCharacterDocument()
        const initialState = createStateWithCharacter(character)
        const originalDocRef = character.docRef
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.updateCharacter({ personal: { name: 'New Name' } })
        )
        
        expect(state.activeCharacter!.docRef).toBe(originalDocRef)
      })
    })
  })

  describe('Skills Management', () => {
    let characterWithSkills: any

    beforeEach(() => {
      characterWithSkills = createCharacterDocument()
      characterWithSkills.skills.skills = [
        createTestSkill({ id: '1', name: 'Fighting', rank: 2, xp: 8 }),
        createTestSkill({ id: '2', name: 'Athletics', rank: 1, xp: 3 })
      ]
    })

    describe('addNewSkill', () => {
      it('should add new skill at beginning of array', () => {
        resetCrypto() // Reset counter before test
        const initialState = createStateWithCharacter(characterWithSkills)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.addNewSkill()
        )
        
        expectArrayLength(state.activeCharacter!.skills.skills, 3, 'Skills')
        expect(state.activeCharacter!.skills.skills[0].name).toBe('')
        expect(state.activeCharacter!.skills.skills[0].rank).toBe(0)
        expect(state.activeCharacter!.skills.skills[0].xp).toBe(0)
        expect(state.activeCharacter!.skills.skills[0].id).toBe('mock-uuid-1')
        expectUnsavedChanges(state)
      })
    })

    describe('updateSkill', () => {
      it('should update skill at specific index', () => {
        const initialState = createStateWithCharacter(characterWithSkills)
        
        const update = { name: 'Updated Skill', xp: 12 }
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.updateSkill({ update, index: 0 })
        )
        
        expect(state.activeCharacter!.skills.skills[0].name).toBe('Updated Skill')
        expect(state.activeCharacter!.skills.skills[0].xp).toBe(12)
        // Other fields should remain
        expect(state.activeCharacter!.skills.skills[0].id).toBe('1')
        expectUnsavedChanges(state)
      })

      it('should not affect other skills', () => {
        const initialState = createStateWithCharacter(characterWithSkills)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.updateSkill({ update: { name: 'Updated' }, index: 0 })
        )
        
        expect(state.activeCharacter!.skills.skills[1]).toEqual(characterWithSkills.skills.skills[1])
      })
    })

    describe('addSkill', () => {
      it('should add skill by name at end of array', () => {
        const initialState = createStateWithCharacter(characterWithSkills)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.addSkill('Stealth')
        )
        
        expectArrayLength(state.activeCharacter!.skills.skills, 3, 'Skills')
        expect(state.activeCharacter!.skills.skills[2].name).toBe('Stealth')
        expect(state.activeCharacter!.skills.skills[2].rank).toBe(0)
        expect(state.activeCharacter!.skills.skills[2].xp).toBe(0)
        expectUnsavedChanges(state)
      })
    })

    describe('removeSkill', () => {
      it('should remove skill by name', () => {
        const initialState = createStateWithCharacter(characterWithSkills)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.removeSkill('Fighting')
        )
        
        expectArrayLength(state.activeCharacter!.skills.skills, 1, 'Skills')
        expect(state.activeCharacter!.skills.skills[0].name).toBe('Athletics')
        expectUnsavedChanges(state)
      })
    })

    describe('deleteSkill', () => {
      it('should delete skill by object reference', () => {
        const initialState = createStateWithCharacter(characterWithSkills)
        const skillToDelete = characterWithSkills.skills.skills[0]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.deleteSkill(skillToDelete)
        )
        
        expectArrayLength(state.activeCharacter!.skills.skills, 1, 'Skills')
        expect(state.activeCharacter!.skills.skills[0].id).toBe('2')
        expectUnsavedChanges(state)
      })
    })

    describe('reorderSkill', () => {
      it('should reorder skills correctly', () => {
        const initialState = createStateWithCharacter(characterWithSkills)
        const originalSkills = [...characterWithSkills.skills.skills]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.reorderSkill({ source: 0, destination: 1 })
        )
        
        expectReorderCorrect(originalSkills, state.activeCharacter!.skills.skills, 0, 1)
        expectUnsavedChanges(state)
      })
    })

    describe('Professions Management', () => {
      it('should add profession', () => {
        const initialState = createStateWithCharacter(characterWithSkills)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.addProfession('Blacksmith')
        )
        
        expect(state.activeCharacter!.skills.professions).toContain('Blacksmith')
        expectUnsavedChanges(state)
      })

      it('should remove profession', () => {
        characterWithSkills.skills.professions = ['Soldier', 'Blacksmith']
        const initialState = createStateWithCharacter(characterWithSkills)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.removeProfession('Soldier')
        )
        
        expect(state.activeCharacter!.skills.professions).not.toContain('Soldier')
        expect(state.activeCharacter!.skills.professions).toContain('Blacksmith')
        expectUnsavedChanges(state)
      })
    })

    describe('Languages Management', () => {
      it('should add language', () => {
        const initialState = createStateWithCharacter(characterWithSkills)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.addLanguage('Elvish')
        )
        
        expect(state.activeCharacter!.skills.languages).toContain('Elvish')
        expectUnsavedChanges(state)
      })

      it('should remove language', () => {
        characterWithSkills.skills.languages = ['Tradespeak', 'Common', 'Elvish']
        const initialState = createStateWithCharacter(characterWithSkills)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.removeLanguage('Common')
        )
        
        expect(state.activeCharacter!.skills.languages).not.toContain('Common')
        expect(state.activeCharacter!.skills.languages).toContain('Tradespeak')
        expect(state.activeCharacter!.skills.languages).toContain('Elvish')
        expectUnsavedChanges(state)
      })
    })
  })

  describe('Abilities Management', () => {
    let characterWithAbilities: any

    beforeEach(() => {
      characterWithAbilities = createCharacterDocument()
      characterWithAbilities.skills.abilities = [
        createTestAbility({ id: '1', title: 'First Ability' }),
        createTestAbility({ id: '2', title: 'Second Ability' })
      ]
    })

    describe('addNewAbility', () => {
      it('should add new ability without tag', () => {
        const initialState = createStateWithCharacter(characterWithAbilities)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.addNewAbility(undefined)
        )
        
        expectArrayLength(state.activeCharacter!.skills.abilities, 3, 'Abilities')
        expect(state.activeCharacter!.skills.abilities[0].title).toBe('')
        expect(state.activeCharacter!.skills.abilities[0].tag).toBe('Other')
        expectUnsavedChanges(state)
      })

      it('should add new ability with specific tag', () => {
        const initialState = createStateWithCharacter(characterWithAbilities)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.addNewAbility({ tag: 'Folk' })
        )
        
        expect(state.activeCharacter!.skills.abilities[0].tag).toBe('Folk')
      })
    })

    describe('importAbilities', () => {
      it('should import multiple abilities', () => {
        const initialState = createStateWithCharacter(characterWithAbilities)
        const newAbilities = [
          { title: 'Imported 1', description: 'First import' },
          { title: 'Imported 2', description: 'Second import' }
        ]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.importAbilities(newAbilities)
        )
        
        expectArrayLength(state.activeCharacter!.skills.abilities, 4, 'Abilities')
        expect(state.activeCharacter!.skills.abilities[0].title).toBe('Imported 1')
        expect(state.activeCharacter!.skills.abilities[1].title).toBe('Imported 2')
        expectUnsavedChanges(state)
      })
    })

    describe('updateAbility', () => {
      it('should update ability at index', () => {
        const initialState = createStateWithCharacter(characterWithAbilities)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.updateAbility({ 
            update: { title: 'Updated Title' }, 
            index: 0 
          })
        )
        
        expect(state.activeCharacter!.skills.abilities[0].title).toBe('Updated Title')
        expectUnsavedChanges(state)
      })
    })

    describe('deleteAbility', () => {
      it('should delete ability by reference', () => {
        const initialState = createStateWithCharacter(characterWithAbilities)
        const abilityToDelete = characterWithAbilities.skills.abilities[0]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.deleteAbility(abilityToDelete)
        )
        
        expectArrayLength(state.activeCharacter!.skills.abilities, 1, 'Abilities')
        expect(state.activeCharacter!.skills.abilities[0].id).toBe('2')
        expectUnsavedChanges(state)
      })
    })

    describe('reorderAbility', () => {
      it('should reorder abilities correctly', () => {
        const initialState = createStateWithCharacter(characterWithAbilities)
        const originalAbilities = [...characterWithAbilities.skills.abilities]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.reorderAbility({ source: 0, destination: 1 })
        )
        
        expectReorderCorrect(originalAbilities, state.activeCharacter!.skills.abilities, 0, 1)
        expectUnsavedChanges(state)
      })
    })
  })

  describe('Weapons Management', () => {
    let characterWithWeapons: any

    beforeEach(() => {
      characterWithWeapons = createCharacterDocument()
      characterWithWeapons.items.weapons = [
        createTestWeapon({ id: '1', name: 'Sword', cost: 50 }),
        createTestWeapon({ id: '2', name: 'Bow', cost: 30 })
      ]
    })

    describe('addNewWeapon', () => {
      it('should add new weapon at beginning of array', () => {
        resetCrypto()
        const initialState = createStateWithCharacter(characterWithWeapons)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.addNewWeapon()
        )
        
        expectArrayLength(state.activeCharacter!.items.weapons, 3, 'Weapons')
        expect(state.activeCharacter!.items.weapons[0].name).toBe('')
        expect(state.activeCharacter!.items.weapons[0].id).toBe('mock-uuid-1')
        expectUnsavedChanges(state)
      })
    })

    describe('addNewWeaponToLocation', () => {
      it('should add new weapon at specific location', () => {
        resetCrypto()
        const initialState = createStateWithCharacter(characterWithWeapons)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.addNewWeaponToLocation('carried')
        )
        
        expectArrayLength(state.activeCharacter!.items.weapons, 3, 'Weapons')
        expect(state.activeCharacter!.items.weapons[0].location).toBe('carried')
        expect(state.activeCharacter!.items.weapons[0].id).toBe('mock-uuid-1')
        expectUnsavedChanges(state)
      })
    })

    describe('importWeapons', () => {
      it('should import multiple weapons', () => {
        const initialState = createStateWithCharacter(characterWithWeapons)
        const newWeapons = [
          { name: 'Imported Sword', cost: 60 },
          { name: 'Imported Axe', cost: 40 }
        ]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.importWeapons(newWeapons)
        )
        
        expectArrayLength(state.activeCharacter!.items.weapons, 4, 'Weapons')
        expect(state.activeCharacter!.items.weapons[0].name).toBe('Imported Sword')
        expect(state.activeCharacter!.items.weapons[1].name).toBe('Imported Axe')
        expectUnsavedChanges(state)
      })
    })

    describe('updateWeapon', () => {
      it('should update weapon at index', () => {
        const initialState = createStateWithCharacter(characterWithWeapons)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.updateWeapon({ 
            update: { name: 'Updated Sword', cost: 75 }, 
            index: 0 
          })
        )
        
        expect(state.activeCharacter!.items.weapons[0].name).toBe('Updated Sword')
        expect(state.activeCharacter!.items.weapons[0].cost).toBe(75)
        expectUnsavedChanges(state)
      })
    })

    describe('deleteWeapon', () => {
      it('should delete weapon by reference', () => {
        const initialState = createStateWithCharacter(characterWithWeapons)
        const weaponToDelete = characterWithWeapons.items.weapons[0]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.deleteWeapon(weaponToDelete)
        )
        
        expectArrayLength(state.activeCharacter!.items.weapons, 1, 'Weapons')
        expect(state.activeCharacter!.items.weapons[0].id).toBe('2')
        expectUnsavedChanges(state)
      })
    })

    describe('reorderWeapon', () => {
      it('should reorder weapons correctly', () => {
        const initialState = createStateWithCharacter(characterWithWeapons)
        const originalWeapons = [...characterWithWeapons.items.weapons]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.reorderWeapon({ source: 0, destination: 1 })
        )
        
        expectReorderCorrect(originalWeapons, state.activeCharacter!.items.weapons, 0, 1)
        expectUnsavedChanges(state)
      })
    })
  })

  describe('Items Management', () => {
    let characterWithItems: any

    beforeEach(() => {
      characterWithItems = createCharacterDocument()
      characterWithItems.items.items = [
        createTestItem({ id: '1', name: 'Rope', cost: 5 }),
        createTestItem({ id: '2', name: 'Torch', cost: 2 })
      ]
    })

    describe('addNewItem', () => {
      it('should add new item at beginning of array', () => {
        resetCrypto()
        const initialState = createStateWithCharacter(characterWithItems)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.addNewItem()
        )
        
        expectArrayLength(state.activeCharacter!.items.items, 3, 'Items')
        expect(state.activeCharacter!.items.items[0].name).toBe('')
        expect(state.activeCharacter!.items.items[0].id).toBe('mock-uuid-1')
        expectUnsavedChanges(state)
      })
    })

    describe('addNewItemToLocation', () => {
      it('should add new item at specific location', () => {
        resetCrypto()
        const initialState = createStateWithCharacter(characterWithItems)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.addNewItemToLocation('storage')
        )
        
        expectArrayLength(state.activeCharacter!.items.items, 3, 'Items')
        expect(state.activeCharacter!.items.items[0].location).toBe('storage')
        expect(state.activeCharacter!.items.items[0].id).toBe('mock-uuid-1')
        expectUnsavedChanges(state)
      })
    })

    describe('importItems', () => {
      it('should import multiple items', () => {
        const initialState = createStateWithCharacter(characterWithItems)
        const newItems = [
          { name: 'Imported Item 1', cost: 10 },
          { name: 'Imported Item 2', cost: 15 }
        ]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.importItems(newItems)
        )
        
        expectArrayLength(state.activeCharacter!.items.items, 4, 'Items')
        expect(state.activeCharacter!.items.items[0].name).toBe('Imported Item 1')
        expect(state.activeCharacter!.items.items[1].name).toBe('Imported Item 2')
        expectUnsavedChanges(state)
      })
    })

    describe('updateItem', () => {
      it('should update item at index', () => {
        const initialState = createStateWithCharacter(characterWithItems)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.updateItem({ 
            update: { name: 'Updated Rope', cost: 8 }, 
            index: 0 
          })
        )
        
        expect(state.activeCharacter!.items.items[0].name).toBe('Updated Rope')
        expect(state.activeCharacter!.items.items[0].cost).toBe(8)
        expectUnsavedChanges(state)
      })
    })

    describe('deleteItem', () => {
      it('should delete item by reference', () => {
        const initialState = createStateWithCharacter(characterWithItems)
        const itemToDelete = characterWithItems.items.items[0]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.deleteItem(itemToDelete)
        )
        
        expectArrayLength(state.activeCharacter!.items.items, 1, 'Items')
        expect(state.activeCharacter!.items.items[0].id).toBe('2')
        expectUnsavedChanges(state)
      })
    })

    describe('reorderItem', () => {
      it('should reorder items correctly', () => {
        const initialState = createStateWithCharacter(characterWithItems)
        const originalItems = [...characterWithItems.items.items]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.reorderItem({ source: 0, destination: 1 })
        )
        
        expectReorderCorrect(originalItems, state.activeCharacter!.items.items, 0, 1)
        expectUnsavedChanges(state)
      })
    })
  })

  describe('Spells Management', () => {
    let characterWithSpells: any

    beforeEach(() => {
      characterWithSpells = createCharacterDocument()
      characterWithSpells.spells.spells = [
        createTestSpell({ id: '1', name: 'Fireball', rank: 2 }),
        createTestSpell({ id: '2', name: 'Heal', rank: 1 })
      ]
    })

    describe('addNewSpell', () => {
      it('should add new spell at beginning of array', () => {
        resetCrypto()
        const initialState = createStateWithCharacter(characterWithSpells)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.addNewSpell()
        )
        
        expectArrayLength(state.activeCharacter!.spells.spells, 3, 'Spells')
        expect(state.activeCharacter!.spells.spells[0].name).toBe('')
        expect(state.activeCharacter!.spells.spells[0].id).toBe('mock-uuid-1')
        expectUnsavedChanges(state)
      })
    })

    describe('updateSpell', () => {
      it('should update spell at index', () => {
        const initialState = createStateWithCharacter(characterWithSpells)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.updateSpell({ 
            update: { name: 'Updated Fireball', rank: 3 }, 
            index: 0 
          })
        )
        
        expect(state.activeCharacter!.spells.spells[0].name).toBe('Updated Fireball')
        expect(state.activeCharacter!.spells.spells[0].rank).toBe(3)
        expectUnsavedChanges(state)
      })
    })

    describe('deleteSpell', () => {
      it('should delete spell by reference', () => {
        const initialState = createStateWithCharacter(characterWithSpells)
        const spellToDelete = characterWithSpells.spells.spells[0]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.deleteSpell(spellToDelete)
        )
        
        expectArrayLength(state.activeCharacter!.spells.spells, 1, 'Spells')
        expect(state.activeCharacter!.spells.spells[0].id).toBe('2')
        expectUnsavedChanges(state)
      })
    })

    describe('reorderSpell', () => {
      it('should reorder spells correctly', () => {
        const initialState = createStateWithCharacter(characterWithSpells)
        const originalSpells = [...characterWithSpells.spells.spells]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.reorderSpell({ source: 0, destination: 1 })
        )
        
        expectReorderCorrect(originalSpells, state.activeCharacter!.spells.spells, 0, 1)
        expectUnsavedChanges(state)
      })
    })

    describe('importSpells', () => {
      it('should import multiple spells', () => {
        const initialState = createStateWithCharacter(characterWithSpells)
        const newSpells = [
          { name: 'Imported Spell 1', rank: 1 },
          { name: 'Imported Spell 2', rank: 2 }
        ]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.importSpells(newSpells)
        )
        
        expectArrayLength(state.activeCharacter!.spells.spells, 4, 'Spells')
        expect(state.activeCharacter!.spells.spells[0].name).toBe('Imported Spell 1')
        expect(state.activeCharacter!.spells.spells[1].name).toBe('Imported Spell 2')
        expectUnsavedChanges(state)
      })
    })
  })

  describe('Companions Management', () => {
    let characterWithCompanions: any

    beforeEach(() => {
      characterWithCompanions = createCharacterDocument()
      characterWithCompanions.companions = [
        createTestCompanion({ id: '1', name: 'Wolf', maxHP: 15 }),
        createTestCompanion({ id: '2', name: 'Eagle', maxHP: 8 })
      ]
    })

    describe('addNewCompanion', () => {
      it('should add new companion at beginning of array', () => {
        const initialState = createStateWithCharacter(characterWithCompanions)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.addNewCompanion()
        )
        
        expectArrayLength(state.activeCharacter!.companions, 3, 'Companions')
        expect(state.activeCharacter!.companions[0].name).toBe('New Companion')
        expect(state.activeCharacter!.companions[0].id).toBeDefined()
        expect(state.activeCharacter!.companions[0].currentHP).toBe(0)
        expect(state.activeCharacter!.companions[0].maxHP).toBe(0)
        expectUnsavedChanges(state)
      })
    })

    describe('updateCompanion', () => {
      it('should update companion by ID', () => {
        const initialState = createStateWithCharacter(characterWithCompanions)
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.updateCompanion({ 
            id: '1', 
            updates: { name: 'Updated Wolf', currentHP: 10 } 
          })
        )
        
        expect(state.activeCharacter!.companions[0].name).toBe('Updated Wolf')
        expect(state.activeCharacter!.companions[0].currentHP).toBe(10)
        expectUnsavedChanges(state)
      })

      it('should not update if companion ID not found', () => {
        const initialState = createStateWithCharacter(characterWithCompanions)
        const originalCompanions = [...characterWithCompanions.companions]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.updateCompanion({ 
            id: 'non-existent', 
            updates: { name: 'Should not update' } 
          })
        )
        
        expect(state.activeCharacter!.companions).toEqual(originalCompanions)
        expectUnsavedChanges(state, false) // Should NOT set unsaved changes if no update occurred
      })
    })

    describe('deleteCompanion', () => {
      it('should delete companion by reference', () => {
        const initialState = createStateWithCharacter(characterWithCompanions)
        const companionToDelete = characterWithCompanions.companions[0]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.deleteCompanion(companionToDelete)
        )
        
        expectArrayLength(state.activeCharacter!.companions, 1, 'Companions')
        expect(state.activeCharacter!.companions[0].id).toBe('2')
        expectUnsavedChanges(state)
      })
    })

    describe('reorderCompanion', () => {
      it('should reorder companions correctly', () => {
        const initialState = createStateWithCharacter(characterWithCompanions)
        const originalCompanions = [...characterWithCompanions.companions]
        
        const state = characterSheetReducer(
          initialState,
          characterSheetActions.reorderCompanion({ source: 0, destination: 1 })
        )
        
        expectReorderCorrect(originalCompanions, state.activeCharacter!.companions, 0, 1)
        expectUnsavedChanges(state)
      })
    })
  })

  // Continue with more test suites...
  // This is a substantial start - we'll continue with more areas
})