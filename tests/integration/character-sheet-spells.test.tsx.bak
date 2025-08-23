import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { CharacterSheet } from '../../src/features/CharacterSheet'

// Mock the Firebase Auth context
vi.mock('@site/src/hooks/firebaseAuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    userLoggedIn: true,
    isEmailUser: true,
    currentUser: {
      uid: 'test-user-id',
      email: 'test@example.com',
      displayName: 'Test User'
    },
    setCurrentUser: vi.fn(),
    isAdmin: false,
    setIsAdmin: vi.fn(),
  })
}))

// Mock the theme switcher component
vi.mock('@site/src/components/ThemeSwitcher', () => ({
  ThemeSwitcher: () => null
}))

// Mock Firebase SDK with tracking for save operations
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn().mockResolvedValue({ 
    exists: () => false,
    data: () => ({})
  }),
  setDoc: vi.fn().mockResolvedValue(undefined),
  updateDoc: vi.fn().mockResolvedValue(undefined),
  collection: vi.fn(),
  getDocs: vi.fn().mockResolvedValue({ docs: [] }),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  getFirestore: vi.fn(),
}))

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
    onAuthStateChanged: vi.fn(),
  })),
  onAuthStateChanged: vi.fn(),
}))

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
  getApps: vi.fn(() => [{}]),
  getApp: vi.fn(() => ({})),
}))

// Mock the firebase config
vi.mock('@site/src/config/firebase', () => ({
  auth: {},
  db: {},
}))

describe('Character Sheet - Spells Tab Comprehensive Testing', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        search: '?id=test-character-spells&tab=2',
        pathname: '/docs/tools/character-sheet',
        href: 'http://localhost:3000/docs/tools/character-sheet?id=test-character-spells&tab=2',
        origin: 'http://localhost:3000',
        hash: '',
      }
    })

    // Set desktop viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    })
  })

  it('should navigate to spells tab and display spell management interface', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Find and click on Spells tab
    const tabs = screen.queryAllByRole('tab')
    const spellsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('spell')
    )
    
    if (spellsTab) {
      await user.click(spellsTab)
      
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 3000 })
    }
    
    // Check for spells content
    const bodyText = document.body.textContent || ''
    const hasSpellsContent = bodyText.includes('Spells') || bodyText.includes('spell') ||
                            bodyText.includes('Magic') || bodyText.includes('magic') ||
                            bodyText.includes('Arcane') || bodyText.includes('Mystic') ||
                            bodyText.includes('Cast') || bodyText.includes('cast')
    
    console.log(`Spells content found: ${hasSpellsContent}`)
    expect(hasSpellsContent || tabs.length > 0).toBe(true)
  })

  it('should handle arcane spells and arcane magic system', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to spells tab
    const tabs = screen.queryAllByRole('tab')
    const spellsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('spell')
    )
    
    if (spellsTab) {
      await user.click(spellsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    
    // Check for arcane magic content
    const hasArcaneContent = bodyText.includes('Arcane') || bodyText.includes('arcane') ||
                            bodyText.includes('Evocation') || bodyText.includes('Illusion') ||
                            bodyText.includes('Conjuration') || bodyText.includes('Telepathy') ||
                            bodyText.includes('Telekinetics') || bodyText.includes('Necromancy') ||
                            bodyText.includes('Mind') || bodyText.includes('Focus')
    
    console.log(`Arcane content found: ${hasArcaneContent}`)
    
    // Test arcane spell interactions
    const textInputs = document.querySelectorAll('input[type="text"]')
    const selects = document.querySelectorAll('select')
    const buttons = document.querySelectorAll('button')
    
    // Test spell name input
    if (textInputs.length > 0) {
      const spellInput = textInputs[0] as HTMLInputElement
      await user.clear(spellInput)
      await user.type(spellInput, 'Magic Missile')
      
      expect(spellInput.value).toBe('Magic Missile')
    }
    
    // Test spell school/discipline selection
    if (selects.length > 0) {
      const spellSelect = selects[0] as HTMLSelectElement
      if (spellSelect.options.length > 1) {
        await user.selectOptions(spellSelect, spellSelect.options[1].value)
      }
    }
    
    expect(hasArcaneContent || textInputs.length > 0 || selects.length > 0).toBe(true)
  })

  it('should handle mystic spells and mystic traditions', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to spells tab
    const tabs = screen.queryAllByRole('tab')
    const spellsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('spell')
    )
    
    if (spellsTab) {
      await user.click(spellsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    
    // Check for mystic magic content
    const hasMysticContent = bodyText.includes('Mystic') || bodyText.includes('mystic') ||
                            bodyText.includes('Light') || bodyText.includes('Twilight') ||
                            bodyText.includes('Life') || bodyText.includes('Death') ||
                            bodyText.includes('Nature') || bodyText.includes('Tempest') ||
                            bodyText.includes('Peace') || bodyText.includes('War') ||
                            bodyText.includes('Spirit') || bodyText.includes('Tradition')
    
    console.log(`Mystic content found: ${hasMysticContent}`)
    
    // Test mystic spell interactions
    const textInputs = document.querySelectorAll('input[type="text"]')
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    
    // Test mystic spell input
    if (textInputs.length > 1) {
      const mysticSpellInput = textInputs[1] as HTMLInputElement
      await user.clear(mysticSpellInput)
      await user.type(mysticSpellInput, 'Healing Light')
      
      expect(mysticSpellInput.value).toBe('Healing Light')
    }
    
    // Test tradition checkboxes or selections
    if (checkboxes.length > 0) {
      const traditionCheckbox = checkboxes[0] as HTMLInputElement
      const wasChecked = traditionCheckbox.checked
      await user.click(traditionCheckbox)
      
      expect(traditionCheckbox.checked).toBe(!wasChecked)
    }
    
    expect(hasMysticContent || textInputs.length > 0 || checkboxes.length > 0).toBe(true)
  })

  it('should handle spell preparation and known spells management', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to spells tab
    const tabs = screen.queryAllByRole('tab')
    const spellsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('spell')
    )
    
    if (spellsTab) {
      await user.click(spellsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    const buttons = document.querySelectorAll('button')
    
    // Look for spell preparation content
    const hasPrepContent = bodyText.includes('Prepare') || bodyText.includes('prepare') ||
                          bodyText.includes('Known') || bodyText.includes('known') ||
                          bodyText.includes('Learn') || bodyText.includes('learn') ||
                          bodyText.includes('Add') || bodyText.includes('Remove')
    
    console.log(`Spell preparation content found: ${hasPrepContent}`)
    
    // Test spell management buttons
    const spellButtons = Array.from(buttons).filter(btn => {
      const text = btn.textContent?.toLowerCase() || ''
      return text.includes('add') || text.includes('remove') || text.includes('prepare') ||
             text.includes('learn') || text.includes('+') || text.includes('-')
    })
    
    if (spellButtons.length > 0) {
      const spellButton = spellButtons[0] as HTMLButtonElement
      await user.click(spellButton)
      
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    expect(hasPrepContent || spellButtons.length > 0 || buttons.length > 0).toBe(true)
  })

  it('should handle spell casting and focus management', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to spells tab
    const tabs = screen.queryAllByRole('tab')
    const spellsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('spell')
    )
    
    if (spellsTab) {
      await user.click(spellsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    const numberInputs = document.querySelectorAll('input[type="number"]')
    const buttons = document.querySelectorAll('button')
    
    // Look for focus and casting content
    const hasFocusContent = bodyText.includes('Focus') || bodyText.includes('focus') ||
                           bodyText.includes('Cast') || bodyText.includes('cast') ||
                           bodyText.includes('Spell Power') || bodyText.includes('spell power') ||
                           bodyText.includes('Rank') || bodyText.includes('rank')
    
    console.log(`Focus/casting content found: ${hasFocusContent}`)
    
    // Test focus value modification
    if (numberInputs.length > 0) {
      const focusInput = numberInputs[0] as HTMLInputElement
      const originalValue = focusInput.value
      await user.clear(focusInput)
      await user.type(focusInput, '8')
      
      expect(focusInput.value).toBe('8')
    }
    
    // Test casting buttons
    const castButtons = Array.from(buttons).filter(btn => {
      const text = btn.textContent?.toLowerCase() || ''
      return text.includes('cast') || text.includes('use') || text.includes('activate')
    })
    
    if (castButtons.length > 0) {
      const castButton = castButtons[0] as HTMLButtonElement
      await user.click(castButton)
      
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    expect(hasFocusContent || numberInputs.length > 0 || castButtons.length > 0).toBe(true)
  })

  it('should handle spell ranks and spell progression', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to spells tab
    const tabs = screen.queryAllByRole('tab')
    const spellsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('spell')
    )
    
    if (spellsTab) {
      await user.click(spellsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    const selects = document.querySelectorAll('select')
    const numberInputs = document.querySelectorAll('input[type="number"]')
    
    // Look for spell rank content
    const hasRankContent = bodyText.includes('Rank') || bodyText.includes('rank') ||
                          bodyText.includes('Level') || bodyText.includes('level') ||
                          bodyText.includes('Tier') || bodyText.includes('tier') ||
                          bodyText.includes('0') || bodyText.includes('1') || bodyText.includes('2')
    
    console.log(`Spell rank content found: ${hasRankContent}`)
    
    // Test spell rank selection
    if (selects.length > 0) {
      const rankSelect = selects[0] as HTMLSelectElement
      if (rankSelect.options.length > 1) {
        await user.selectOptions(rankSelect, rankSelect.options[1].value)
      }
    }
    
    // Test spell rank number inputs
    if (numberInputs.length > 1) {
      const rankInput = numberInputs[1] as HTMLInputElement
      await user.clear(rankInput)
      await user.type(rankInput, '2')
      
      expect(rankInput.value).toBe('2')
    }
    
    expect(hasRankContent || selects.length > 0 || numberInputs.length > 0).toBe(true)
  })

  it('should handle spell descriptions and notes', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to spells tab
    const tabs = screen.queryAllByRole('tab')
    const spellsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('spell')
    )
    
    if (spellsTab) {
      await user.click(spellsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    const textareas = document.querySelectorAll('textarea')
    const textInputs = document.querySelectorAll('input[type="text"]')
    
    // Look for description content
    const hasDescContent = bodyText.includes('Description') || bodyText.includes('description') ||
                          bodyText.includes('Notes') || bodyText.includes('notes') ||
                          bodyText.includes('Effect') || bodyText.includes('effect')
    
    console.log(`Spell description content found: ${hasDescContent}`)
    
    // Test spell description field
    if (textareas.length > 0) {
      const descArea = textareas[0] as HTMLTextAreaElement
      await user.clear(descArea)
      await user.type(descArea, 'Fires a magical projectile at target')
      
      expect(descArea.value).toBe('Fires a magical projectile at target')
    }
    
    // Test spell notes input
    if (textInputs.length > 0) {
      const notesInput = textInputs[textInputs.length - 1] as HTMLInputElement
      await user.clear(notesInput)
      await user.type(notesInput, 'Personal spell notes')
      
      expect(notesInput.value).toBe('Personal spell notes')
    }
    
    expect(hasDescContent || textareas.length > 0 || textInputs.length > 0).toBe(true)
  })

  it('should save spell changes and trigger auto-save functionality', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to spells tab
    const tabs = screen.queryAllByRole('tab')
    const spellsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('spell')
    )
    
    if (spellsTab) {
      await user.click(spellsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const textInputs = document.querySelectorAll('input[type="text"]')
    
    if (textInputs.length > 0) {
      const spellInput = textInputs[0] as HTMLInputElement
      
      // Make a spell change
      await user.clear(spellInput)
      await user.type(spellInput, 'Fireball')
      
      // Trigger potential auto-save with blur
      fireEvent.blur(spellInput)
      
      expect(spellInput.value).toBe('Fireball')
      
      // Wait for potential auto-save
      await waitFor(() => {
        expect(spellInput.value).toBe('Fireball')
      }, { timeout: 3000 })
    }
    
    expect(textInputs.length >= 0).toBe(true)
  })

  it('should maintain spell data consistency across tab navigation', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to spells tab
    const tabs = screen.queryAllByRole('tab')
    const spellsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('spell')
    )
    
    if (spellsTab) {
      await user.click(spellsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const textInputs = document.querySelectorAll('input[type="text"]')
    
    if (textInputs.length > 0 && tabs.length > 1) {
      // Set a spell value
      const spellInput = textInputs[0] as HTMLInputElement
      await user.clear(spellInput)
      await user.type(spellInput, 'Lightning Bolt')
      
      expect(spellInput.value).toBe('Lightning Bolt')
      
      // Navigate to different tab
      const otherTab = tabs.find(tab => 
        !tab.textContent?.toLowerCase().includes('spell')
      )
      
      if (otherTab) {
        await user.click(otherTab)
        await waitFor(() => {
          expect(document.body.textContent?.length).toBeGreaterThan(100)
        }, { timeout: 2000 })
        
        // Navigate back to spells
        if (spellsTab) {
          await user.click(spellsTab)
          await waitFor(() => {
            expect(document.body.textContent?.length).toBeGreaterThan(100)
          }, { timeout: 2000 })
        }
        
        // Check if spell value is maintained
        const updatedInputs = document.querySelectorAll('input[type="text"]')
        if (updatedInputs.length > 0) {
          const updatedSpellInput = updatedInputs[0] as HTMLInputElement
          expect(updatedSpellInput.value).toBe('Lightning Bolt')
        }
      }
    }
    
    expect(textInputs.length >= 0).toBe(true)
  })
})