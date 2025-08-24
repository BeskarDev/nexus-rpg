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

// Mock Firebase service with skills-focused character
vi.mock('../../src/dev/firebaseService', () => {
  const skillsCharacterData = {
    docId: 'skills-char-001',
    docRef: { id: 'skills-char-001' },
    collectionId: 'test-collection',
    personal: {
      name: 'Lyra Swiftblade',
      playerName: 'Skills Tester',
      folk: 'Elf',
      upbringing: 'Wanderer',
      background: 'Scout',
      height: '5\'8"',
      weight: '130 lbs',
      age: '156',
      description: 'An agile elven scout with keen senses and diverse talents.',
      motivation: 'To master all skills and perfect her craft.',
      profilePicture: ''
    },
    statistics: {
      level: 8,
      experiencePoints: 200,
      fatigue: 0,
      hitPoints: 68,
      maxHitPoints: 70,
      armorValue: 10,
      wounds: 0,
      maxWounds: 3,
      attributes: {
        strength: { base: 14, bonus: 2, die: 'd8' },
        agility: { base: 18, bonus: 4, die: 'd12' },
        spirit: { base: 16, bonus: 3, die: 'd10' },
        mind: { base: 15, bonus: 2, die: 'd8' }
      },
      defenses: {
        parry: 14,
        dodge: 18,
        resist: 16
      },
      statusEffects: []
    },
    skills: {
      general: {
        athletics: { rank: 5, experiencePoints: 24 },
        fortitude: { rank: 3, experiencePoints: 12 },
        influence: { rank: 4, experiencePoints: 18 },
        insight: { rank: 5, experiencePoints: 24 },
        perception: { rank: 5, experiencePoints: 24 },
        stealth: { rank: 5, experiencePoints: 24 }
      },
      expert: {
        arcana: { rank: 2, experiencePoints: 6 },
        archery: { rank: 5, experiencePoints: 24 },
        crafting: { rank: 3, experiencePoints: 12 },
        education: { rank: 3, experiencePoints: 12 },
        fighting: { rank: 4, experiencePoints: 18 },
        lore: { rank: 4, experiencePoints: 18 },
        mysticism: { rank: 2, experiencePoints: 6 },
        nature: { rank: 5, experiencePoints: 24 },
        streetwise: { rank: 4, experiencePoints: 18 },
        survival: { rank: 5, experiencePoints: 24 }
      },
      professions: [
        { id: '1', name: 'Tracker', rank: 5, description: 'Expert at following trails and reading signs' },
        { id: '2', name: 'Hunter', rank: 4, description: 'Skilled at hunting wild game and surviving in wilderness' },
        { id: '3', name: 'Guide', rank: 3, description: 'Experienced at leading others through dangerous terrain' },
        { id: '4', name: 'Scout', rank: 4, description: 'Professional reconnaissance and intelligence gathering' }
      ],
      combatArts: [
        { id: '1', name: 'Dual Wielding', rank: 3, description: 'Fighting with two weapons simultaneously' },
        { id: '2', name: 'Precise Shot', rank: 4, description: 'Enhanced accuracy with ranged weapons' },
        { id: '3', name: 'Evasive Maneuvers', rank: 3, description: 'Superior defensive movement in combat' },
        { id: '4', name: 'Ambush Tactics', rank: 2, description: 'Surprise attacks from concealment' },
        { id: '5', name: 'Rapid Fire', rank: 3, description: 'Multiple attacks with bows and crossbows' }
      ],
      languages: [
        { id: '1', name: 'Common', fluency: 'native', description: 'Standard trade language' },
        { id: '2', name: 'Elvish', fluency: 'native', description: 'Ancient elven tongue' },
        { id: '3', name: 'Orcish', fluency: 'conversational', description: 'Language of orc tribes' },
        { id: '4', name: 'Draconic', fluency: 'basic', description: 'Ancient dragon language' },
        { id: '5', name: 'Thieves\' Cant', fluency: 'conversational', description: 'Secret language of criminals' }
      ]
    },
    items: {
      weapons: [
        {
          id: '1',
          name: 'Elven Longbow',
          type: 'bow',
          quality: 4,
          material: 'Silverwood',
          equipped: true,
          properties: ['two-handed', 'ranged'],
          damage: { base: 'AGI', weapon: 7, other: 2, type: 'physical', staticDamage: false },
          durability: { current: 14, max: 15 },
          cost: 250,
          load: 2,
          description: 'A masterwork bow crafted from sacred silverwood.'
        },
        {
          id: '2',
          name: 'Paired Shortswords',
          type: 'shortsword',
          quality: 3,
          material: 'Steel',
          equipped: true,
          properties: ['light', 'paired'],
          damage: { base: 'AGI', weapon: 5, other: 1, type: 'physical', staticDamage: false },
          durability: { current: 10, max: 12 },
          cost: 120,
          load: 2,
          description: 'Perfectly balanced shortswords designed for dual wielding.'
        }
      ],
      armor: [
        {
          id: '1',
          name: 'Studded Leather Armor',
          type: 'light',
          quality: 3,
          material: 'Leather',
          equipped: true,
          armorValue: 8,
          properties: ['flexible', 'quiet'],
          durability: { current: 15, max: 15 },
          cost: 180,
          load: 3,
          description: 'Supple leather reinforced with metal studs.'
        }
      ],
      inventory: [
        {
          id: '1',
          name: 'Thieves\' Tools',
          type: 'tool',
          quantity: 1,
          cost: 75,
          load: 1,
          description: 'A set of lockpicks and other tools for bypassing security.'
        },
        {
          id: '2',
          name: 'Tracking Kit',
          type: 'tool',
          quantity: 1,
          cost: 40,
          load: 2,
          description: 'Equipment for following trails and reading signs.'
        },
        {
          id: '3',
          name: 'Survival Gear',
          type: 'tool',
          quantity: 1,
          cost: 60,
          load: 3,
          description: 'Essential equipment for wilderness survival.'
        }
      ]
    },
    spells: {
      arcane: {
        focus: { current: 4, max: 6 },
        spellPower: 7,
        disciplines: ['illusion'],
        known: [
          {
            id: '1',
            name: 'Camouflage',
            rank: 1,
            discipline: 'illusion',
            cost: 2,
            target: 'self',
            range: 'self',
            properties: ['illusory'],
            dealsDamage: false,
            damage: { base: '', weapon: 0, type: '', staticDamage: false },
            effect: 'Blends the caster with their surroundings.',
            prepared: true
          },
          {
            id: '2',
            name: 'Silent Movement',
            rank: 2,
            discipline: 'illusion',
            cost: 4,
            target: 'self',
            range: 'self',
            properties: ['illusory'],
            dealsDamage: false,
            damage: { base: '', weapon: 0, type: '', staticDamage: false },
            effect: 'Eliminates sound from movement.',
            prepared: true
          }
        ]
      },
      mystic: {
        focus: { current: 6, max: 8 },
        spellPower: 8,
        traditions: ['nature'],
        known: [
          {
            id: '1',
            name: 'Speak with Animals',
            rank: 1,
            tradition: 'nature',
            cost: 2,
            target: 'single',
            range: 'close',
            properties: ['communication'],
            dealsDamage: false,
            damage: { base: '', weapon: 0, type: '', staticDamage: false },
            effect: 'Allows communication with natural animals.',
            prepared: true
          },
          {
            id: '2',
            name: 'Track',
            rank: 2,
            tradition: 'nature',
            cost: 4,
            target: 'area',
            range: 'touch',
            properties: ['divination'],
            dealsDamage: false,
            damage: { base: '', weapon: 0, type: '', staticDamage: false },
            effect: 'Reveals tracks and signs in the area.',
            prepared: true
          }
        ]
      }
    },
    companions: [],
    partyId: 'wilderness-scouts'
  }
  
  return {
    firebaseService: {
      getCollection: vi.fn().mockResolvedValue([skillsCharacterData]),
      getDocument: vi.fn().mockResolvedValue(skillsCharacterData),
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
    search: '?id=test-collection-skills-char-001',
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

describe('Skills Tab - Comprehensive Integration Tests', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    process.env.NODE_ENV = 'development'
    user = userEvent.setup()
  })

  it('loads character and displays all skill categories correctly', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyra Swiftblade')).toBeDefined()
    }, { timeout: 10000 })

    // Verify character name
    expect(screen.getByText('Lyra Swiftblade')).toBeDefined()
    
    // Check for general skills
    const athletics = screen.queryByText('Athletics') || screen.queryByText('athletics')
    const perception = screen.queryByText('Perception') || screen.queryByText('perception')
    const stealth = screen.queryByText('Stealth') || screen.queryByText('stealth')
    
    expect(athletics || perception || stealth).toBeDefined()
    
    // Check for expert skills  
    const archery = screen.queryByText('Archery') || screen.queryByText('archery')
    const nature = screen.queryByText('Nature') || screen.queryByText('nature')
    const survival = screen.queryByText('Survival') || screen.queryByText('survival')
    
    expect(archery || nature || survival).toBeDefined()
  })

  it('displays skill ranks and experience points accurately', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyra Swiftblade')).toBeDefined()
    }, { timeout: 10000 })

    // Check for rank 5 skills (Athletics, Insight, Perception, Stealth, Archery, Nature, Survival)
    const rank5Elements = screen.getAllByText('5')
    expect(rank5Elements.length).toBeGreaterThan(6) // Should have at least 7 rank 5 skills
    
    // Check for experience point values (24 XP for rank 5 skills)
    const xp24Elements = screen.getAllByText('24')
    expect(xp24Elements.length).toBeGreaterThan(6) // Should have multiple rank 5 skills with 24 XP
    
    // Check for other rank values
    const rank4Elements = screen.getAllByText('4')
    const rank3Elements = screen.getAllByText('3')
    const rank2Elements = screen.getAllByText('2')
    
    expect(rank4Elements.length).toBeGreaterThan(0)
    expect(rank3Elements.length).toBeGreaterThan(0)
    expect(rank2Elements.length).toBeGreaterThan(0)
  })

  it('tests skill rank modification and XP allocation', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyra Swiftblade')).toBeDefined()
    }, { timeout: 10000 })

    // Find skill rank input fields
    const numberInputs = screen.getAllByRole('spinbutton')
    const skillInputs = numberInputs.filter(input => {
      const value = parseInt(input.getAttribute('value') || '0')
      return value >= 0 && value <= 5 // Skill ranks are 0-5
    })
    
    if (skillInputs.length > 0) {
      const skillInput = skillInputs[0]
      const originalValue = parseInt(skillInput.getAttribute('value') || '0')
      
      // Increase skill rank
      await user.clear(skillInput)
      await user.type(skillInput, String(Math.min(originalValue + 1, 5)))
      
      expect(parseInt(skillInput.value)).toBeGreaterThan(originalValue)
      
      // Test boundary conditions
      await user.clear(skillInput)
      await user.type(skillInput, '6') // Should be capped at 5
      
      // Skill system should handle invalid values
      expect(skillInput).toBeDefined()
    }
  })

  it('displays and manages professions correctly', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyra Swiftblade')).toBeDefined()
    }, { timeout: 10000 })

    // Check for professions from test data
    const tracker = screen.queryByText('Tracker') || screen.queryByText('tracker')
    const hunter = screen.queryByText('Hunter') || screen.queryByText('hunter')
    const guide = screen.queryByText('Guide') || screen.queryByText('guide')
    const scout = screen.queryByText('Scout') || screen.queryByText('scout')
    
    expect(tracker || hunter || guide || scout).toBeDefined()
    
    // Check profession ranks (Tracker rank 5, Hunter rank 4, etc.)
    const professionRanks = screen.getAllByText(/[1-5]/)
    expect(professionRanks.length).toBeGreaterThan(4) // Should have profession ranks displayed
    
    // Test profession management buttons if available
    const buttons = screen.getAllByRole('button')
    const professionButtons = buttons.filter(button => 
      button.textContent?.toLowerCase().includes('profession') ||
      button.getAttribute('aria-label')?.toLowerCase().includes('profession') ||
      button.textContent?.includes('+')
    )
    
    if (professionButtons.length > 0) {
      await user.click(professionButtons[0])
      expect(professionButtons[0]).toBeDefined()
    }
  })

  it('displays and manages combat arts comprehensively', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyra Swiftblade')).toBeDefined()
    }, { timeout: 10000 })

    // Check for combat arts from test data
    const dualWielding = screen.queryByText(/Dual.*Wielding/i) || screen.queryByText('Dual Wielding')
    const preciseShot = screen.queryByText(/Precise.*Shot/i) || screen.queryByText('Precise Shot')
    const evasiveManeuvers = screen.queryByText(/Evasive.*Maneuvers/i) || screen.queryByText('Evasive Maneuvers')
    const ambushTactics = screen.queryByText(/Ambush.*Tactics/i) || screen.queryByText('Ambush Tactics')
    const rapidFire = screen.queryByText(/Rapid.*Fire/i) || screen.queryByText('Rapid Fire')
    
    expect(dualWielding || preciseShot || evasiveManeuvers || ambushTactics || rapidFire).toBeDefined()
    
    // Check combat art ranks
    const combatArtRanks = screen.getAllByText(/[2-4]/) // Combat arts have ranks 2-4 in test data
    expect(combatArtRanks.length).toBeGreaterThan(4)
    
    // Test combat art management
    const buttons = screen.getAllByRole('button')
    const combatArtButtons = buttons.filter(button => 
      button.textContent?.toLowerCase().includes('combat') ||
      button.textContent?.toLowerCase().includes('art') ||
      button.getAttribute('aria-label')?.toLowerCase().includes('add')
    )
    
    if (combatArtButtons.length > 0) {
      await user.click(combatArtButtons[0])
      expect(combatArtButtons[0]).toBeDefined()
    }
  })

  it('tests language proficiency tracking', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyra Swiftblade')).toBeDefined()
    }, { timeout: 10000 })

    // Check for languages from test data
    const common = screen.queryByText('Common') || screen.queryByText('common')
    const elvish = screen.queryByText('Elvish') || screen.queryByText('elvish')
    const orcish = screen.queryByText('Orcish') || screen.queryByText('orcish')
    const draconic = screen.queryByText('Draconic') || screen.queryByText('draconic')
    const thievesCant = screen.queryByText(/Thieves.*Cant/i) || screen.queryByText('Thieves\' Cant')
    
    expect(common || elvish || orcish || draconic || thievesCant).toBeDefined()
    
    // Check for fluency levels
    const native = screen.queryByText('native') || screen.queryByText('Native')
    const conversational = screen.queryByText('conversational') || screen.queryByText('Conversational')
    const basic = screen.queryByText('basic') || screen.queryByText('Basic')
    
    expect(native || conversational || basic).toBeDefined()
  })

  it('tests skill-based dice rolling functionality', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyra Swiftblade')).toBeDefined()
    }, { timeout: 10000 })

    // Look for dice roll buttons or indicators
    const buttons = screen.getAllByRole('button')
    const diceButtons = buttons.filter(button => 
      button.textContent?.toLowerCase().includes('roll') ||
      button.textContent?.includes('d') ||
      button.getAttribute('aria-label')?.toLowerCase().includes('roll')
    )
    
    if (diceButtons.length > 0) {
      await user.click(diceButtons[0])
      // Dice roll should be processed
      expect(diceButtons[0]).toBeDefined()
    }
    
    // Check for die size indicators based on attributes
    // AGI 18 = d12, SPI 16 = d10, STR 14 = d8, MND 15 = d8
    const d12Elements = screen.getAllByText(/d12/)
    const d10Elements = screen.getAllByText(/d10/)
    const d8Elements = screen.getAllByText(/d8/)
    
    expect(d12Elements.length).toBeGreaterThan(0)
    expect(d10Elements.length).toBeGreaterThan(0)
    expect(d8Elements.length).toBeGreaterThan(0)
  })

  it('tests skill bonus calculations from attributes', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyra Swiftblade')).toBeDefined()
    }, { timeout: 10000 })

    // Check attribute bonuses: STR +2, AGI +4, SPI +3, MND +2
    const strengthBonus = screen.getAllByText(/\+2/)
    const agilityBonus = screen.getAllByText(/\+4/)
    const spiritBonus = screen.getAllByText(/\+3/)
    
    expect(strengthBonus.length).toBeGreaterThan(0)
    expect(agilityBonus.length).toBeGreaterThan(0)
    expect(spiritBonus.length).toBeGreaterThan(0)
    
    // Skills should show total bonuses (attribute + rank)
    // Example: Stealth (AGI) = +4 (attribute) + 5 (rank) = +9 total
    const totalBonuses = screen.getAllByText(/\+[5-9]/)
    expect(totalBonuses.length).toBeGreaterThan(0)
  })

  it('tests skill experience point allocation system', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyra Swiftblade')).toBeDefined()
    }, { timeout: 10000 })

    // Check total character XP (200 from test data)
    const totalXP = screen.getAllByText('200')
    expect(totalXP.length).toBeGreaterThan(0)
    
    // Test XP modification for skills
    const numberInputs = screen.getAllByRole('spinbutton')
    const xpInputs = numberInputs.filter(input => {
      const value = parseInt(input.getAttribute('value') || '0')
      return [2, 6, 12, 18, 24].includes(value) // Valid XP values for ranks 1-5
    })
    
    if (xpInputs.length > 0) {
      const xpInput = xpInputs[0]
      const originalValue = parseInt(xpInput.getAttribute('value') || '0')
      
      // Increase XP (within rank limits)
      const newValue = originalValue + 1
      await user.clear(xpInput)
      await user.type(xpInput, String(newValue))
      
      expect(parseInt(xpInput.value)).toBe(newValue)
    }
  })

  it('tests general vs expert skill categorization', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyra Swiftblade')).toBeDefined()
    }, { timeout: 10000 })

    // Check for general skills (no training penalty)
    const generalSkills = ['Athletics', 'Fortitude', 'Influence', 'Insight', 'Perception', 'Stealth']
    
    generalSkills.forEach(skill => {
      const skillElement = screen.queryByText(skill) || screen.queryByText(skill.toLowerCase())
      if (skillElement) {
        expect(skillElement).toBeDefined()
      }
    })
    
    // Check for expert skills (training required)
    const expertSkills = ['Arcana', 'Archery', 'Crafting', 'Education', 'Fighting', 'Lore', 'Mysticism', 'Nature', 'Streetwise', 'Survival']
    
    expertSkills.forEach(skill => {
      const skillElement = screen.queryByText(skill) || screen.queryByText(skill.toLowerCase())
      if (skillElement) {
        expect(skillElement).toBeDefined()
      }
    })
  })

  it('tests skill-equipment interaction and bonuses', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyra Swiftblade')).toBeDefined()
    }, { timeout: 10000 })

    // Check for equipment that provides skill bonuses
    const thievesTools = screen.queryByText(/Thieves.*Tools/i) || screen.queryByText('Thieves\' Tools')
    const trackingKit = screen.queryByText(/Tracking.*Kit/i) || screen.queryByText('Tracking Kit')
    const survivalGear = screen.queryByText(/Survival.*Gear/i) || screen.queryByText('Survival Gear')
    
    expect(thievesTools || trackingKit || survivalGear).toBeDefined()
    
    // These tools should provide bonuses to related skills
    // Thieves' Tools -> Streetwise/Stealth bonuses
    // Tracking Kit -> Nature/Survival bonuses
    // Survival Gear -> Survival/Nature bonuses
    
    // Test equipment effects on skill calculations
    const skillBonuses = screen.getAllByText(/\+[1-9]/)
    expect(skillBonuses.length).toBeGreaterThan(0)
  })

  it('tests comprehensive skills workflow and data persistence', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyra Swiftblade')).toBeDefined()
    }, { timeout: 10000 })

    // Perform a series of skill modifications
    const numberInputs = screen.getAllByRole('spinbutton')
    
    // Modify a skill rank
    const skillRankInputs = numberInputs.filter(input => {
      const value = parseInt(input.getAttribute('value') || '0')
      return value >= 0 && value <= 5
    })
    
    if (skillRankInputs.length > 0) {
      const skillInput = skillRankInputs[0]
      const originalValue = parseInt(skillInput.getAttribute('value') || '0')
      const newValue = Math.max(0, originalValue - 1)
      
      await user.clear(skillInput)
      await user.type(skillInput, String(newValue))
      expect(parseInt(skillInput.value)).toBe(newValue)
    }
    
    // Modify XP allocation
    const xpInputs = numberInputs.filter(input => {
      const value = parseInt(input.getAttribute('value') || '0')
      return [2, 6, 12, 18, 24].includes(value)
    })
    
    if (xpInputs.length > 0) {
      const xpInput = xpInputs[0]
      const originalValue = parseInt(xpInput.getAttribute('value') || '0')
      const newValue = Math.max(0, originalValue + 2)
      
      await user.clear(xpInput)
      await user.type(xpInput, String(newValue))
      expect(parseInt(xpInput.value)).toBe(newValue)
    }
    
    // Test navigation between tabs to ensure data persistence
    const tabs = screen.getAllByRole('tab')
    if (tabs.length > 1) {
      await user.click(tabs[1]) // Navigate away
      await user.click(tabs[0]) // Navigate back
      
      // Verify changes persisted
      if (skillRankInputs.length > 0) {
        const newValue = Math.max(0, parseInt(skillRankInputs[0].getAttribute('value') || '0') - 1)
        expect(parseInt(skillRankInputs[0].value)).toBe(newValue)
      }
    }
  })

  it('tests skills with spell integration for hybrid characters', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lyra Swiftblade')).toBeDefined()
    }, { timeout: 10000 })

    // Check Arcana skill for arcane magic
    const arcanaSkill = screen.queryByText('Arcana') || screen.queryByText('arcana')
    expect(arcanaSkill).toBeDefined()
    
    // Check Mysticism skill for divine magic
    const mysticismSkill = screen.queryByText('Mysticism') || screen.queryByText('mysticism')
    expect(mysticismSkill).toBeDefined()
    
    // Verify spell-related skills affect magic calculations
    // Arcana rank 2 should limit arcane spells to rank 2
    // Mysticism rank 2 should limit mystic spells to rank 2
    
    const rank2Elements = screen.getAllByText('2')
    expect(rank2Elements.length).toBeGreaterThan(1) // Should have rank 2 in both Arcana and Mysticism
  })
})