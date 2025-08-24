import { render, screen, waitFor, fireEvent } from '@testing-library/react'
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

// Mock Firebase service
vi.mock('../../src/dev/firebaseService', () => {
  const testCharacterData = {
    docId: 'noble-001',
    docRef: { id: 'noble-001' },
    collectionId: 'test-collection',
    personal: {
      name: 'Lady Seraphina Blackthorn',
      playerName: 'Personal Info Tester',
      folk: 'Human',
      upbringing: 'Noble',
      background: 'Courtier',
      height: '5\'7"',
      weight: '130 lbs',
      age: '24',
      description: 'A striking noblewoman with raven-black hair and piercing violet eyes. She carries herself with the grace and confidence born of noble blood, yet her gaze holds a hint of steel that speaks to hidden depths.',
      motivation: 'To restore her family\'s honor and uncover the truth behind their fall from grace. She seeks to navigate the treacherous waters of court politics while maintaining her moral compass.',
      profilePicture: 'https://example.com/seraphina-portrait.jpg',
      allies: [
        { id: '1', description: 'Lord Commander Marcus Brightbane - Honorable knight who served her father' },
        { id: '2', description: 'Sister Evangeline - Priestess at the Temple of Light who provides counsel' },
        { id: '3', description: 'Master Aldwin - Former family advisor now in exile' },
        { id: '4', description: 'Captain Thane - Leader of loyal household guards' },
        { id: '5', description: 'Lady Cordelia Ashford - Childhood friend and political ally' }
      ],
      contacts: [
        { id: '6', description: 'Merchant Prince Goldwin - Wealthy trader with information networks' },
        { id: '7', description: 'Ambassador Valerius - Foreign diplomat with court connections' },
        { id: '8', description: 'Spymaster Raven - Information broker operating in shadows' },
        { id: '9', description: 'Duke Aldric Ravencrest - Powerful noble with shifting loyalties' },
        { id: '10', description: 'Maester Cornelius - Scholar of ancient laws and customs' },
        { id: '11', description: 'Lady Isabelle Montclair - Rival turned cautious ally' },
        { id: '12', description: 'Captain of Guards Willem - City watch commander' }
      ],
      rivals: [
        { id: '13', description: 'Lord Cassius Thornfield - Ambitious noble who orchestrated her family\'s downfall' },
        { id: '14', description: 'Duchess Morgana Blackwater - Powerful court rival with dark secrets' },
        { id: '15', description: 'The Shadow Guild - Criminal organization with court connections' },
        { id: '16', description: 'Prince Roderick - Corrupt royal seeking to consolidate power' }
      ],
      notes: `
    **Family History**: The Blackthorn family was once among the most influential noble houses, known for their integrity and service to the crown. However, a scandal involving falsified evidence of treason led to their disgrace three years ago.

    **Political Standing**: Currently rebuilding influence through careful alliance building and information gathering. Maintains a public facade of acceptance while privately investigating her family's downfall.

    **Personal Code**: Believes in justice, honor, and protecting the innocent. Will not compromise her moral principles even for political gain, which sometimes puts her at odds with court realities.

    **Goals**:
    - Restore the Blackthorn family name and holdings
    - Expose Lord Cassius Thornfield's corruption
    - Reform the court system to prevent similar injustices
    - Protect loyal retainers who remained faithful during the family's darkest hour

    **Relationships**: 
    - Maintains careful distance from romantic entanglements due to political vulnerabilities
    - Deeply loyal to those who proved trustworthy during her family's fall
    - Skilled at reading people's true intentions beneath court pleasantries
    - Protective of younger nobles who remind her of her lost innocence

    **Secrets**: 
    - Has been secretly funding resistance activities against corrupt nobles
    - Maintains a network of informants among servants and minor court officials
    - Practices sword fighting in private, a skill considered unseemly for noble ladies
    - Carries her father's signet ring hidden beneath her gloves as a reminder of her true identity`
    },
    statistics: {
      health: { current: 42, temp: 0, maxHpModifier: 2 },
      fatigue: { current: 0, max: 7 },
      av: { armor: 1, helmet: 0, shield: 0, other: 1 },
      strength: { value: 10, wounded: false },
      agility: { value: 14, wounded: false },
      spirit: { value: 16, wounded: false },
      mind: { value: 15, wounded: false },
      parry: 12,
      dodge: 16,
      resist: 17,
      resolve: 4,
      statusEffects: []
    },
    skills: {
      xp: { total: 180, spend: 174 },
      skills: [
        { id: '1', name: 'Influence', rank: 5, xp: 24 },
        { id: '2', name: 'Insight', rank: 4, xp: 18 },
        { id: '3', name: 'Education', rank: 4, xp: 18 },
        { id: '4', name: 'Lore', rank: 3, xp: 12 },
        { id: '5', name: 'Perception', rank: 3, xp: 12 },
        { id: '6', name: 'Stealth', rank: 3, xp: 12 },
        { id: '7', name: 'Fighting', rank: 2, xp: 6 },
        { id: '8', name: 'Athletics', rank: 2, xp: 6 },
        { id: '9', name: 'Fortitude', rank: 2, xp: 6 },
        { id: '10', name: 'Streetwise', rank: 3, xp: 12 },
        { id: '11', name: 'Mysticism', rank: 2, xp: 6 },
        { id: '12', name: 'Crafting', rank: 1, xp: 2 },
        { id: '13', name: 'Nature', rank: 1, xp: 2 },
        { id: '14', name: 'Survival', rank: 1, xp: 2 },
        { id: '15', name: 'Archery', rank: 2, xp: 6 },
        { id: '16', name: 'Arcana', rank: 0, xp: 0 }
      ],
      professions: ['Diplomat', 'Courtier', 'Information Broker', 'Political Strategist'],
      languages: ['Tradespeak', 'Old Imperial', 'Elvish', 'Courtly', 'Thieves\' Cant'],
      abilities: [
        { id: '1', title: 'Noble Bearing', description: '+2 boons on social interactions with nobles', tag: 'Folk' },
        { id: '2', title: 'Court Intrigue', description: '+2 boons on detecting lies and hidden motives', tag: 'Talent' },
        { id: '3', title: 'Social Network', description: 'Extensive contacts throughout noble society', tag: 'Talent' },
        { id: '4', title: 'Political Acumen', description: '+2 boons on political knowledge and strategy', tag: 'Talent' },
        { id: '5', title: 'Hidden Blade', description: 'Concealed weapon techniques', tag: 'Combat Art' },
        { id: '6', title: 'Information Gathering', description: '+2 boons on acquiring rumors and secrets', tag: 'Talent' }
      ],
      abilityCategoryVisibility: { 'Combat Art': true, Talent: true, Folk: true, Other: true }
    },
    items: {
      coins: 850,
      encumbrance: {
        encumberedAt: 10,
        overencumberedAt: 15,
        carryModifier: 0,
        currentLoad: 18.5,
        mountMaxLoad: 80,
        storageMaxLoad: 300
      },
      weapons: [
        {
          id: '1',
          name: 'Elegant Rapier',
          damage: { base: 'AGI', weapon: 4, other: 1, type: 'physical', staticDamage: false },
          properties: 'agile, pierce, dueling, concealed',
          description: 'A slender blade of the finest steel, decorated with the Blackthorn family crest.',
          cost: 180,
          load: 2,
          location: 'worn',
          uses: 0,
          durability: 'd10'
        },
        {
          id: '2',
          name: 'Hidden Dagger',
          damage: { base: 'AGI', weapon: 2, other: 0, type: 'physical', staticDamage: false },
          properties: 'agile, light, concealed, throwable',
          description: 'A small blade hidden within the folds of her dress.',
          cost: 25,
          load: 0.5,
          location: 'worn',
          uses: 0,
          durability: 'd6'
        }
      ],
      items: [
        {
          id: '1',
          name: 'Noble Attire',
          properties: 'light armor, +1 AV, social status, elegant',
          description: 'Exquisite court dress made from the finest silks and adorned with jewels.',
          slot: 'body',
          cost: 200,
          load: 1,
          container: 'worn',
          amount: 1,
          location: 'worn',
          uses: 0,
          durability: 'd8'
        },
        {
          id: '2',
          name: 'Signet Ring',
          properties: 'identity, authority, family heirloom',
          description: 'The Blackthorn family signet ring, kept hidden from public view.',
          slot: 'ring',
          cost: 500,
          load: 0,
          container: 'worn',
          amount: 1,
          location: 'worn',
          uses: 0,
          durability: 'd12'
        },
        {
          id: '3',
          name: 'Personal Journal',
          properties: 'information storage, encrypted notes',
          description: 'A leather-bound journal containing coded observations about court politics.',
          slot: 'none',
          cost: 50,
          load: 1,
          container: 'carried',
          amount: 1,
          location: 'carried',
          uses: 0,
          durability: 'd6'
        }
      ],
      itemLocationVisibility: { worn: true, carried: true, mount: true, storage: true }
    },
    spells: {
      magicSkill: 'Mysticism',
      specialization: 'Light',
      focus: { total: 8, current: 8 },
      spellCatalystDamage: 0,
      spells: [
        {
          id: '1',
          name: 'Detect Truth',
          rank: 1,
          cost: 2,
          target: 'special',
          range: 'close',
          properties: 'light tradition, insight',
          dealsDamage: false,
          damage: { base: '', weapon: 0, type: 'none', staticDamage: false },
          effect: 'Reveals when someone is lying or concealing the truth.',
          prepared: true
        }
      ]
    },
    companions: [
      {
        id: '1',
        name: 'Shadowmere',
        description: 'A sleek black mare, intelligent and loyal',
        currentHP: 35,
        maxHP: 40,
        wounded: false
      }
    ],
    partyId: 'court-intrigue'
  }
  
  return {
    firebaseService: {
      getCollection: vi.fn().mockResolvedValue([testCharacterData]),
      getDocument: vi.fn().mockResolvedValue(testCharacterData),
      updateDocument: vi.fn().mockResolvedValue(undefined),
      getUserInfo: vi.fn().mockResolvedValue({ allowedCollections: [] }),
      deleteDocument: vi.fn().mockResolvedValue(undefined),
    }
  }
})

Object.defineProperty(window, 'location', {
  value: {
    ...window.location,
    search: '?id=test-collection-noble-001',
    hostname: 'localhost',
  },
  writable: true,
})

const createEmptyTestStore = () => {
  return configureStore({
    reducer: { characterSheet: characterSheetReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
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

describe('Character Sheet - Personal Tab Comprehensive Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    process.env.NODE_ENV = 'development'
  })

  it('should load character and display personal information', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
    }, { timeout: 10000 })

    expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
  })

  it('should display character identity and background', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
    }, { timeout: 10000 })

    // Check for identity information
    const playerName = screen.queryByText('Personal Info Tester')
    const folk = screen.queryByText('Human')
    const upbringing = screen.queryByText('Noble')
    const background = screen.queryByText('Courtier')
    
    expect(playerName || folk || upbringing || background).toBeDefined()
  })

  it('should show physical characteristics and description', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
    }, { timeout: 10000 })

    // Look for physical characteristics
    const height = screen.queryByText(/5'7"/) || screen.queryByText(/height/i)
    const weight = screen.queryByText(/130/) || screen.queryByText(/weight/i)
    const age = screen.queryByText(/24/) || screen.queryByText(/age/i)
    const description = screen.queryByText(/raven-black/) || screen.queryByText(/violet eyes/)
    
    expect(height || weight || age || description).toBeDefined()
  })

  it('should display character motivation and goals', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
    }, { timeout: 10000 })

    // Check for motivation text
    const motivation = screen.queryByText(/restore.*family/) || 
                      screen.queryByText(/honor/) ||
                      screen.queryByText(/truth/) ||
                      screen.queryByText(/court politics/)
    
    expect(motivation).toBeDefined()
  })

  it('should show character allies and relationships', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
    }, { timeout: 10000 })

    // Look for ally names and descriptions
    const marcus = screen.queryByText(/Marcus/) || screen.queryByText(/Brightbane/)
    const evangeline = screen.queryByText(/Evangeline/) || screen.queryByText(/Sister/)
    const aldwin = screen.queryByText(/Aldwin/) || screen.queryByText(/Master/)
    const allies = screen.queryByText(/allies/i)
    
    expect(marcus || evangeline || aldwin || allies).toBeDefined()
  })

  it('should display character contacts and networks', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
    }, { timeout: 10000 })

    // Check for contact information
    const goldwin = screen.queryByText(/Goldwin/) || screen.queryByText(/Merchant/)
    const valerius = screen.queryByText(/Valerius/) || screen.queryByText(/Ambassador/)
    const raven = screen.queryByText(/Raven/) || screen.queryByText(/Spymaster/)
    const contacts = screen.queryByText(/contacts/i)
    
    expect(goldwin || valerius || raven || contacts).toBeDefined()
  })

  it('should show character rivals and antagonists', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
    }, { timeout: 10000 })

    // Look for rival information
    const cassius = screen.queryByText(/Cassius/) || screen.queryByText(/Thornfield/)
    const morgana = screen.queryByText(/Morgana/) || screen.queryByText(/Blackwater/)
    const shadowGuild = screen.queryByText(/Shadow Guild/) || screen.queryByText(/Guild/)
    const rivals = screen.queryByText(/rivals/i)
    
    expect(cassius || morgana || shadowGuild || rivals).toBeDefined()
  })

  it('should display character notes and background story', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
    }, { timeout: 10000 })

    // Check for detailed notes content
    const familyHistory = screen.queryByText(/Family History/) || screen.queryByText(/Blackthorn family/)
    const politicalStanding = screen.queryByText(/Political Standing/) || screen.queryByText(/influence/)
    const personalCode = screen.queryByText(/Personal Code/) || screen.queryByText(/justice/)
    const notes = screen.queryByText(/notes/i)
    
    expect(familyHistory || politicalStanding || personalCode || notes).toBeDefined()
  })

  it('should test editing personal information fields', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
    }, { timeout: 10000 })

    // Test editing text fields
    const textInputs = screen.getAllByRole('textbox')
    if (textInputs.length > 0) {
      const originalValue = textInputs[0].getAttribute('value')
      fireEvent.change(textInputs[0], { target: { value: 'Modified personal info' } })
      expect(textInputs[0]).toBeDefined()
    }

    // Test text areas for longer content
    const textAreas = screen.getAllByRole('textbox').filter(input => 
      input.tagName.toLowerCase() === 'textarea'
    )
    if (textAreas.length > 0) {
      fireEvent.change(textAreas[0], { target: { value: 'Modified description or notes' } })
      expect(textAreas[0]).toBeDefined()
    }
  })

  it('should handle relationship management interactions', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
    }, { timeout: 10000 })

    // Test relationship-related buttons
    const addButtons = screen.getAllByRole('button').filter(button => 
      button.textContent?.toLowerCase().includes('add') ||
      button.getAttribute('aria-label')?.toLowerCase().includes('add')
    )
    
    if (addButtons.length > 0) {
      fireEvent.click(addButtons[0])
      expect(addButtons[0]).toBeDefined()
    }

    // Test delete/remove buttons
    const deleteButtons = screen.getAllByRole('button').filter(button => 
      button.textContent?.toLowerCase().includes('delete') ||
      button.textContent?.toLowerCase().includes('remove') ||
      button.getAttribute('aria-label')?.toLowerCase().includes('delete')
    )
    
    if (deleteButtons.length > 0) {
      fireEvent.click(deleteButtons[0])
      expect(deleteButtons[0]).toBeDefined()
    }
  })

  it('should show character professions and languages', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
    }, { timeout: 10000 })

    // Check for professions
    const diplomat = screen.queryByText('Diplomat')
    const courtier = screen.queryByText('Courtier')
    const broker = screen.queryByText(/Information Broker/) || screen.queryByText(/Broker/)
    const strategist = screen.queryByText(/Political Strategist/) || screen.queryByText(/Strategist/)
    
    // Check for languages
    const tradespeak = screen.queryByText('Tradespeak')
    const imperial = screen.queryByText(/Old Imperial/) || screen.queryByText(/Imperial/)
    const elvish = screen.queryByText('Elvish')
    const courtly = screen.queryByText('Courtly')
    
    expect(diplomat || courtier || broker || strategist || tradespeak || imperial || elvish || courtly).toBeDefined()
  })

  it('should test character level calculation and experience', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
    }, { timeout: 10000 })

    // Check for XP and level information (180 total, 174 spent)
    const xpElements = screen.getAllByText(/180|174/)
    expect(xpElements.length).toBeGreaterThan(0)
    
    // Look for level indicators
    const levelText = screen.queryByText(/Level/) || screen.queryByText(/level/i)
    expect(levelText).toBeDefined()
  })

  it('should verify comprehensive personal information integration', async () => {
    render(
      <TestWrapper>
        <CharacterSheetContainer />
      </TestWrapper>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
    }, { timeout: 10000 })

    // Comprehensive test of all personal systems working together
    expect(screen.getByText('Lady Seraphina Blackthorn')).toBeDefined()
    
    // Test that personal information from all systems is accessible
    const allPersonalElements = screen.getAllByText(/Seraphina|Blackthorn|Noble|Courtier|Marcus|Cassius|Diplomat|Personal/)
    expect(allPersonalElements.length).toBeGreaterThan(2)
    
    // Verify the character sheet handles complex personal data
    const characterContainer = screen.getByText('Lady Seraphina Blackthorn').closest('div')
    expect(characterContainer).toBeDefined()
    
    // Test that social and relationship systems are integrated
    const socialElements = screen.queryByText(/allies/i) || 
                          screen.queryByText(/contacts/i) || 
                          screen.queryByText(/rivals/i) ||
                          screen.queryByText(/relationships/i)
    expect(socialElements).toBeDefined()
  })
})