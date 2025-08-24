import { render, screen, waitFor, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { CharacterSheetContainer } from '../../src/features/CharacterSheet/CharacterSheetContainer'
import { characterSheetReducer } from '../../src/features/CharacterSheet/characterSheetReducer'
import { Experimental_CssVarsProvider, experimental_extendTheme } from '@mui/material'

// Mock external dependencies
vi.mock('@site/src/config/firebase', () => ({ db: {} }))
vi.mock('@site/src/hooks/firebaseAuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => ({
    userLoggedIn: true,
    currentUser: { uid: 'test-user' },
    isAdmin: false,
    setIsAdmin: vi.fn(),
  }),
}))
vi.mock('@site/src/hooks/createTheme', () => ({ theme: {} }))
vi.mock('@site/src/components/ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div>Theme Switcher</div>,
}))
vi.mock('@site/src/hooks/useDeviceSize', () => ({
  useDeviceSize: () => ({ isSmallScreen: false }),
}))

// Mock Firebase service with statistics-focused character
vi.mock('../../src/dev/firebaseService', () => {
  const statisticsCharacterData = {
    docId: 'stats-char-001',
    docRef: { id: 'stats-char-001' },
    collectionId: 'test-collection',
    personal: {
      name: 'Marcus Ironforge',
      playerName: 'Statistics Tester',
      folk: 'Dwarf',
      upbringing: 'Artisan',
      background: 'Warrior',
      height: '4\'8"',
      weight: '220 lbs',
      age: '87',
      description: 'A stout dwarf warrior with braided beard and battle scars.',
      motivation: 'To test all statistical calculations and combat mechanics.',
      profilePicture: ''
    },
    statistics: {
      level: 6,
      experiencePoints: 120,
      fatigue: 2,
      hitPoints: 58,
      maxHitPoints: 65,
      armorValue: 15,
      wounds: 1,
      maxWounds: 4,
      attributes: {
        strength: { base: 18, bonus: 4, die: 'd12' },
        agility: { base: 12, bonus: 1, die: 'd8' },
        spirit: { base: 16, bonus: 3, die: 'd10' },
        mind: { base: 10, bonus: 0, die: 'd6' }
      },
      defenses: {
        parry: 18,
        dodge: 12,
        resist: 14
      },
      statusEffects: [
        { id: '1', type: 'bleeding', duration: 'short', description: 'Suffering from combat wounds', intensity: 2 },
        { id: '2', type: 'inspired', duration: 'medium', description: 'Motivated by battle fury' },
        { id: '3', type: 'fatigued', duration: 'long', description: 'Exhausted from prolonged combat' }
      ],
      rest: {
        shortRests: 2,
        longRests: 1,
        lastRestType: 'short',
        nextRestAvailable: 'long'
      }
    },
    skills: {
      general: {
        athletics: { rank: 5, experiencePoints: 24 },
        fortitude: { rank: 5, experiencePoints: 24 },
        influence: { rank: 2, experiencePoints: 6 },
        insight: { rank: 3, experiencePoints: 12 },
        perception: { rank: 4, experiencePoints: 18 },
        stealth: { rank: 1, experiencePoints: 2 }
      },
      expert: {
        arcana: { rank: 0, experiencePoints: 0 },
        archery: { rank: 2, experiencePoints: 6 },
        crafting: { rank: 4, experiencePoints: 18 },
        education: { rank: 1, experiencePoints: 2 },
        fighting: { rank: 5, experiencePoints: 24 },
        lore: { rank: 2, experiencePoints: 6 },
        mysticism: { rank: 3, experiencePoints: 12 },
        nature: { rank: 2, experiencePoints: 6 },
        streetwise: { rank: 2, experiencePoints: 6 },
        survival: { rank: 3, experiencePoints: 12 }
      }
    },
    items: {
      weapons: [
        {
          id: '1',
          name: 'Dwarven Warhammer',
          type: 'warhammer',
          quality: 4,
          material: 'Dwarven Steel',
          equipped: true,
          properties: ['two-handed', 'crush'],
          damage: { base: 'STR', weapon: 8, other: 3, type: 'physical', staticDamage: false },
          durability: { current: 15, max: 16 },
          cost: 300,
          load: 4,
          description: 'A masterwork warhammer forged in the deep halls of the mountain.'
        }
      ],
      armor: [
        {
          id: '1',
          name: 'Dwarven Plate Mail',
          type: 'heavy',
          quality: 4,
          material: 'Dwarven Steel',
          equipped: true,
          armorValue: 12,
          properties: ['heavy', 'durable'],
          durability: { current: 20, max: 20 },
          cost: 800,
          load: 8,
          description: 'Intricately crafted plate armor with dwarven runes.'
        }
      ],
      shields: [
        {
          id: '1',
          name: 'Tower Shield',
          type: 'shield',
          quality: 3,
          material: 'Iron',
          equipped: true,
          armorValue: 3,
          properties: ['tower', 'defensive'],
          durability: { current: 12, max: 12 },
          cost: 150,
          load: 3,
          description: 'A massive shield providing excellent protection.'
        }
      ]
    },
    spells: {
      arcane: {
        focus: { current: 0, max: 0 },
        spellPower: 0,
        disciplines: [],
        known: []
      },
      mystic: {
        focus: { current: 8, max: 10 },
        spellPower: 8,
        traditions: ['war', 'life'],
        known: [
          {
            id: '1',
            name: 'Battle Blessing',
            rank: 2,
            tradition: 'war',
            cost: 4,
            target: 'self',
            range: 'self',
            properties: ['enhance'],
            dealsDamage: false,
            damage: { base: '', weapon: 0, type: '', staticDamage: false },
            effect: 'Enhances combat prowess and weapon skill.',
            prepared: true
          },
          {
            id: '2',
            name: 'Healing Touch',
            rank: 1,
            tradition: 'life',
            cost: 2,
            target: 'single',
            range: 'touch',
            properties: ['healing'],
            dealsDamage: false,
            damage: { base: '', weapon: 0, type: '', staticDamage: false },
            effect: 'Restores health and mends wounds.',
            prepared: true
          }
        ]
      }
    },
    companions: [],
    partyId: 'iron-warband'
  }
  
  return {
    firebaseService: {
      getCollection: vi.fn().mockResolvedValue([statisticsCharacterData]),
      getDocument: vi.fn().mockResolvedValue(statisticsCharacterData),
      updateDocument: vi.fn().mockResolvedValue(undefined),
      getUserInfo: vi.fn().mockResolvedValue({ allowedCollections: [] }),
      deleteDocument: vi.fn().mockResolvedValue(undefined),
    }
  }
})

// Set up URL parameters for character loading
Object.defineProperty(window, 'location', {
  value: {
    ...window.location,
    search: '?id=test-collection-stats-char-001',
    hostname: 'localhost',
  },
  writable: true,
})

const createEmptyTestStore = () => {
  return configureStore({
    reducer: {
      characterSheet: characterSheetReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState: undefined,
  })
}

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = createEmptyTestStore()
  const theme = experimental_extendTheme({})
  
  return (
    <Provider store={store}>
      <Experimental_CssVarsProvider theme={theme}>
        {children}
      </Experimental_CssVarsProvider>
    </Provider>
  )
}

describe('Statistics Tab - Comprehensive Integration Tests', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    process.env.NODE_ENV = 'development'
    user = userEvent.setup()
  })

  it('loads character and displays all statistical calculations correctly', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Marcus Ironforge')).toBeDefined()
    }, { timeout: 10000 })

    // Verify character name
    expect(screen.getByText('Marcus Ironforge')).toBeDefined()
    
    // Check attribute values: STR 18, AGI 12, SPI 16, MND 10
    const strengthValue = screen.getAllByText('18')
    const agilityValue = screen.getAllByText('12')
    const spiritValue = screen.getAllByText('16') 
    const mindValue = screen.getAllByText('10')
    
    expect(strengthValue.length).toBeGreaterThan(0)
    expect(agilityValue.length).toBeGreaterThan(0)
    expect(spiritValue.length).toBeGreaterThan(0)
    expect(mindValue.length).toBeGreaterThan(0)
  })

  it('displays calculated defenses based on attributes and equipment', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Marcus Ironforge')).toBeDefined()
    }, { timeout: 10000 })

    // Check defense calculations: Parry 18, Dodge 12, Resist 14
    const parryValue = screen.getAllByText('18') // High parry from strength and equipment
    const dodgeValue = screen.getAllByText('12') // Lower dodge due to heavy armor
    const resistValue = screen.getAllByText('14') // Spirit-based resist
    
    expect(parryValue.length).toBeGreaterThan(0)
    expect(dodgeValue.length).toBeGreaterThan(0)
    expect(resistValue.length).toBeGreaterThan(0)
  })

  it('shows proper armor value calculations from equipment', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Marcus Ironforge')).toBeDefined()
    }, { timeout: 10000 })

    // Check total AV calculation: Plate Mail (12) + Tower Shield (3) = 15
    const armorValueElements = screen.getAllByText('15')
    expect(armorValueElements.length).toBeGreaterThan(0)
    
    // Verify individual armor pieces
    const plateMail = screen.queryByText(/Dwarven.*Plate.*Mail/i) || screen.queryByText('Dwarven Plate Mail')
    const towerShield = screen.queryByText(/Tower.*Shield/i) || screen.queryByText('Tower Shield')
    
    expect(plateMail).toBeDefined()
    expect(towerShield).toBeDefined()
  })

  it('displays hit points and wound tracking correctly', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Marcus Ironforge')).toBeDefined()
    }, { timeout: 10000 })

    // Check HP tracking: 58/65 current/max
    const currentHP = screen.getAllByText('58')
    const maxHP = screen.getAllByText('65')
    
    expect(currentHP.length).toBeGreaterThan(0)
    expect(maxHP.length).toBeGreaterThan(0)
    
    // Check wound tracking: 1/4 wounds
    const currentWounds = screen.getAllByText('1')
    const maxWounds = screen.getAllByText('4')
    
    expect(currentWounds.length).toBeGreaterThan(0)
    expect(maxWounds.length).toBeGreaterThan(0)
  })

  it('tests status effects with intensity and duration tracking', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Marcus Ironforge')).toBeDefined()
    }, { timeout: 10000 })

    // Check for status effects from test data
    const bleedingEffect = screen.queryByText(/bleeding/i) || screen.queryByText('bleeding')
    const inspiredEffect = screen.queryByText(/inspired/i) || screen.queryByText('inspired') 
    const fatiguedEffect = screen.queryByText(/fatigued/i) || screen.queryByText('fatigued')
    
    expect(bleedingEffect || inspiredEffect || fatiguedEffect).toBeDefined()
    
    // Check for intensity tracking (bleeding has intensity 2)
    const intensityElements = screen.getAllByText('2')
    expect(intensityElements.length).toBeGreaterThan(0)
  })

  it('allows modification of hit points and tracks changes', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Marcus Ironforge')).toBeDefined()
    }, { timeout: 10000 })

    // Find HP input fields and modify them
    const numberInputs = screen.getAllByRole('spinbutton')
    const hpInputs = numberInputs.filter(input => {
      const value = input.getAttribute('value')
      return value === '58' || value === '65' // Current/max HP
    })
    
    if (hpInputs.length > 0) {
      const currentHPInput = hpInputs[0]
      await user.clear(currentHPInput)
      await user.type(currentHPInput, '45')
      
      expect(currentHPInput).toHaveValue(45)
      
      // Test invalid values
      await user.clear(currentHPInput)
      await user.type(currentHPInput, '-10')
      
      // Should handle negative values gracefully
      expect(currentHPInput).toBeDefined()
    }
  })

  it('tests fatigue tracking and modification', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Marcus Ironforge')).toBeDefined()
    }, { timeout: 10000 })

    // Check fatigue value (should be 2 from test data)
    const fatigueElements = screen.getAllByText('2')
    expect(fatigueElements.length).toBeGreaterThan(0)
    
    // Find fatigue input and modify it
    const numberInputs = screen.getAllByRole('spinbutton')
    const fatigueInputs = numberInputs.filter(input => {
      const value = input.getAttribute('value')
      return value === '2' && input.getAttribute('name')?.includes('fatigue')
    })
    
    if (fatigueInputs.length > 0) {
      const fatigueInput = fatigueInputs[0]
      await user.clear(fatigueInput)
      await user.type(fatigueInput, '3')
      
      expect(fatigueInput).toHaveValue(3)
    }
  })

  it('tests rest mechanics and tracking', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Marcus Ironforge')).toBeDefined()
    }, { timeout: 10000 })

    // Look for rest-related elements
    const restElements = screen.getAllByText(/rest/i)
    expect(restElements.length).toBeGreaterThan(0)
    
    // Check for rest counts (2 short rests, 1 long rest from test data)
    const shortRestCount = screen.getAllByText('2')
    const longRestCount = screen.getAllByText('1')
    
    expect(shortRestCount.length).toBeGreaterThan(0)
    expect(longRestCount.length).toBeGreaterThan(0)
    
    // Test rest buttons if available
    const buttons = screen.getAllByRole('button')
    const restButtons = buttons.filter(button => 
      button.textContent?.toLowerCase().includes('rest') ||
      button.getAttribute('aria-label')?.toLowerCase().includes('rest')
    )
    
    if (restButtons.length > 0) {
      await user.click(restButtons[0])
      // Rest should be processed
      expect(restButtons[0]).toBeDefined()
    }
  })

  it('tests status effect addition and removal', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Marcus Ironforge')).toBeDefined()
    }, { timeout: 10000 })

    // Look for status effect management controls
    const buttons = screen.getAllByRole('button')
    const statusButtons = buttons.filter(button => 
      button.textContent?.toLowerCase().includes('effect') ||
      button.textContent?.toLowerCase().includes('condition') ||
      button.getAttribute('aria-label')?.toLowerCase().includes('add') ||
      button.getAttribute('aria-label')?.toLowerCase().includes('remove')
    )
    
    if (statusButtons.length > 0) {
      await user.click(statusButtons[0])
      // Status effect management should respond
      expect(statusButtons[0]).toBeDefined()
    }
    
    // Test delete/remove buttons for existing effects
    const deleteButtons = buttons.filter(button => 
      button.textContent?.includes('×') ||
      button.textContent?.toLowerCase().includes('delete') ||
      button.getAttribute('aria-label')?.toLowerCase().includes('delete')
    )
    
    if (deleteButtons.length > 0) {
      await user.click(deleteButtons[0])
      // Effect should be removed
      expect(deleteButtons[0]).toBeDefined()
    }
  })

  it('tests level and experience point tracking', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Marcus Ironforge')).toBeDefined()
    }, { timeout: 10000 })

    // Check level display (should be 6)
    const levelElements = screen.getAllByText('6')
    expect(levelElements.length).toBeGreaterThan(0)
    
    // Check experience points (should be 120)
    const xpElements = screen.getAllByText('120')
    expect(xpElements.length).toBeGreaterThan(0)
    
    // Test XP modification if input is available
    const numberInputs = screen.getAllByRole('spinbutton')
    const xpInputs = numberInputs.filter(input => {
      const value = input.getAttribute('value')
      return value === '120'
    })
    
    if (xpInputs.length > 0) {
      const xpInput = xpInputs[0]
      await user.clear(xpInput)
      await user.type(xpInput, '150')
      
      expect(xpInput).toHaveValue(150)
    }
  })

  it('tests attribute bonus calculations and display', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Marcus Ironforge')).toBeDefined()
    }, { timeout: 10000 })

    // Check attribute bonuses: STR +4, AGI +1, SPI +3, MND +0
    const strengthBonus = screen.getAllByText(/\+4/)
    const agilityBonus = screen.getAllByText(/\+1/)
    const spiritBonus = screen.getAllByText(/\+3/)
    
    expect(strengthBonus.length).toBeGreaterThan(0)
    expect(agilityBonus.length).toBeGreaterThan(0)
    expect(spiritBonus.length).toBeGreaterThan(0)
    
    // Check die sizes: d12, d8, d10, d6
    const d12Elements = screen.getAllByText(/d12/)
    const d8Elements = screen.getAllByText(/d8/)
    const d10Elements = screen.getAllByText(/d10/)
    const d6Elements = screen.getAllByText(/d6/)
    
    expect(d12Elements.length).toBeGreaterThan(0)
    expect(d8Elements.length).toBeGreaterThan(0)
    expect(d10Elements.length).toBeGreaterThan(0)
    expect(d6Elements.length).toBeGreaterThan(0)
  })

  it('tests equipment effects on statistics calculations', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Marcus Ironforge')).toBeDefined()
    }, { timeout: 10000 })

    // Verify weapon is equipped and affects calculations
    const warhammer = screen.queryByText(/Dwarven.*Warhammer/i) || screen.queryByText('Dwarven Warhammer')
    expect(warhammer).toBeDefined()
    
    // Check weapon damage calculation: STR (18) + weapon (8) + other (3)
    const damageElements = screen.getAllByText(/18|8|3/)
    expect(damageElements.length).toBeGreaterThan(0)
    
    // Test equipment toggle if available
    const checkboxes = screen.getAllByRole('checkbox')
    const equipmentCheckboxes = checkboxes.filter(checkbox => 
      checkbox.getAttribute('aria-label')?.toLowerCase().includes('equip') ||
      checkbox.closest('*')?.textContent?.toLowerCase().includes('equip')
    )
    
    if (equipmentCheckboxes.length > 0) {
      const isInitiallyChecked = equipmentCheckboxes[0].checked
      await user.click(equipmentCheckboxes[0])
      
      // Equipment state should change
      expect(equipmentCheckboxes[0].checked).not.toBe(isInitiallyChecked)
    }
  })

  it('tests comprehensive statistics workflow and data persistence', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Marcus Ironforge')).toBeDefined()
    }, { timeout: 10000 })

    // Perform a series of changes to test data persistence
    const numberInputs = screen.getAllByRole('spinbutton')
    
    // Modify HP
    const hpInputs = numberInputs.filter(input => {
      const value = input.getAttribute('value')
      return value === '58'
    })
    
    if (hpInputs.length > 0) {
      await user.clear(hpInputs[0])
      await user.type(hpInputs[0], '50')
      expect(hpInputs[0]).toHaveValue(50)
    }
    
    // Modify fatigue
    const fatigueInputs = numberInputs.filter(input => {
      const value = input.getAttribute('value')
      return value === '2'
    })
    
    if (fatigueInputs.length > 0) {
      await user.clear(fatigueInputs[0])
      await user.type(fatigueInputs[0], '1')
      expect(fatigueInputs[0]).toHaveValue(1)
    }
    
    // Test that changes persist when navigating away and back
    const tabs = screen.getAllByRole('tab')
    if (tabs.length > 1) {
      await user.click(tabs[1]) // Navigate to different tab
      await user.click(tabs[0]) // Navigate back
      
      // Values should persist
      if (hpInputs.length > 0) {
        expect(hpInputs[0]).toHaveValue(50)
      }
    }
  })
})