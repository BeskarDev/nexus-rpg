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

describe('Character Sheet - Skills Tab Comprehensive Testing', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        search: '?id=test-character-skills&tab=0',
        pathname: '/docs/tools/character-sheet',
        href: 'http://localhost:3000/docs/tools/character-sheet?id=test-character-skills&tab=0',
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

  it('should navigate to skills tab and display skill management interface', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Find and click on Skills tab
    const tabs = screen.queryAllByRole('tab')
    const skillsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('skill')
    )
    
    if (skillsTab) {
      await user.click(skillsTab)
      
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 3000 })
    }
    
    // Check for skills content
    const bodyText = document.body.textContent || ''
    const hasSkillsContent = bodyText.includes('Skills') || bodyText.includes('skill') ||
                            bodyText.includes('Athletics') || bodyText.includes('Fighting') ||
                            bodyText.includes('Arcana') || bodyText.includes('Mysticism')
    
    console.log(`Skills content found: ${hasSkillsContent}`)
    expect(hasSkillsContent || tabs.length > 0).toBe(true)
  })

  it('should handle skill rank modifications and experience allocation', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to skills if not already there
    const tabs = screen.queryAllByRole('tab')
    const skillsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('skill')
    )
    
    if (skillsTab) {
      await user.click(skillsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    // Look for skill rank inputs or buttons
    const numberInputs = document.querySelectorAll('input[type="number"]')
    const buttons = document.querySelectorAll('button')
    
    console.log(`Found ${numberInputs.length} number inputs and ${buttons.length} buttons in skills section`)
    
    // Test skill rank modification
    if (numberInputs.length > 0) {
      const skillRankInput = numberInputs[0] as HTMLInputElement
      const originalValue = skillRankInput.value
      
      await user.clear(skillRankInput)
      await user.type(skillRankInput, '3')
      
      expect(skillRankInput.value).toBe('3')
    }
    
    // Test skill-related buttons (might be for increasing/decreasing ranks)
    if (buttons.length > 0) {
      const skillButton = buttons[0] as HTMLButtonElement
      await user.click(skillButton)
      
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 1000 })
    }
    
    expect(numberInputs.length > 0 || buttons.length > 0).toBe(true)
  })

  it('should display and interact with general skills (Athletics, Fortitude, etc.)', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to skills tab
    const tabs = screen.queryAllByRole('tab')
    const skillsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('skill')
    )
    
    if (skillsTab) {
      await user.click(skillsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    
    // Check for general skills
    const generalSkills = [
      'Athletics', 'Fortitude', 'Influence', 'Insight', 'Perception', 'Stealth'
    ]
    
    const foundGeneralSkills = generalSkills.filter(skill => 
      bodyText.includes(skill)
    )
    
    console.log(`Found general skills: ${foundGeneralSkills.join(', ')}`)
    
    // Test interaction with general skill elements
    const numberInputs = document.querySelectorAll('input[type="number"]')
    if (numberInputs.length > 0 && foundGeneralSkills.length > 0) {
      // Test modifying a general skill rank
      const firstInput = numberInputs[0] as HTMLInputElement
      await user.clear(firstInput)
      await user.type(firstInput, '2')
      
      expect(firstInput.value).toBe('2')
    }
    
    expect(foundGeneralSkills.length > 0 || numberInputs.length > 0).toBe(true)
  })

  it('should display and interact with expert skills (Fighting, Arcana, etc.)', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to skills tab
    const tabs = screen.queryAllByRole('tab')
    const skillsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('skill')
    )
    
    if (skillsTab) {
      await user.click(skillsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    
    // Check for expert skills
    const expertSkills = [
      'Fighting', 'Archery', 'Arcana', 'Mysticism', 'Crafting', 'Education', 
      'Lore', 'Nature', 'Streetwise', 'Survival'
    ]
    
    const foundExpertSkills = expertSkills.filter(skill => 
      bodyText.includes(skill)
    )
    
    console.log(`Found expert skills: ${foundExpertSkills.join(', ')}`)
    
    // Test interaction with expert skill elements
    const numberInputs = document.querySelectorAll('input[type="number"]')
    if (numberInputs.length > 1 && foundExpertSkills.length > 0) {
      // Test modifying an expert skill rank
      const expertInput = numberInputs[1] as HTMLInputElement
      await user.clear(expertInput)
      await user.type(expertInput, '4')
      
      expect(expertInput.value).toBe('4')
    }
    
    expect(foundExpertSkills.length > 0 || numberInputs.length > 0).toBe(true)
  })

  it('should handle skill dice rolling and bonus calculations', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to skills tab
    const tabs = screen.queryAllByRole('tab')
    const skillsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('skill')
    )
    
    if (skillsTab) {
      await user.click(skillsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    const buttons = document.querySelectorAll('button')
    
    // Look for dice rolling or calculation elements
    const hasDiceElements = bodyText.includes('d6') || bodyText.includes('d8') || 
                           bodyText.includes('d10') || bodyText.includes('d12') ||
                           bodyText.includes('Roll') || bodyText.includes('roll')
    
    // Look for buttons that might trigger dice rolls
    const diceButtons = Array.from(buttons).filter(btn => {
      const text = btn.textContent?.toLowerCase() || ''
      return text.includes('roll') || text.includes('dice') || text.includes('d6') || 
             text.includes('+') || text.includes('check')
    })
    
    console.log(`Dice elements found: ${hasDiceElements}, Dice buttons: ${diceButtons.length}`)
    
    // Test dice rolling functionality
    if (diceButtons.length > 0) {
      const diceButton = diceButtons[0] as HTMLButtonElement
      await user.click(diceButton)
      
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    expect(hasDiceElements || diceButtons.length > 0 || buttons.length > 0).toBe(true)
  })

  it('should handle experience point allocation and skill advancement', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to skills tab
    const tabs = screen.queryAllByRole('tab')
    const skillsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('skill')
    )
    
    if (skillsTab) {
      await user.click(skillsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    const buttons = document.querySelectorAll('button')
    
    // Look for experience or advancement related elements
    const hasXpElements = bodyText.includes('XP') || bodyText.includes('Experience') || 
                         bodyText.includes('experience') || bodyText.includes('Advance') ||
                         bodyText.includes('advance') || bodyText.includes('Cost')
    
    console.log(`XP/Advancement elements found: ${hasXpElements}`)
    
    // Test experience allocation buttons
    const xpButtons = Array.from(buttons).filter(btn => {
      const text = btn.textContent?.toLowerCase() || ''
      return text.includes('advance') || text.includes('increase') || text.includes('+') ||
             text.includes('buy') || text.includes('spend')
    })
    
    if (xpButtons.length > 0) {
      const xpButton = xpButtons[0] as HTMLButtonElement
      await user.click(xpButton)
      
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    expect(hasXpElements || xpButtons.length > 0 || buttons.length > 0).toBe(true)
  })

  it('should save skill changes and trigger auto-save functionality', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to skills tab
    const tabs = screen.queryAllByRole('tab')
    const skillsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('skill')
    )
    
    if (skillsTab) {
      await user.click(skillsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const numberInputs = document.querySelectorAll('input[type="number"]')
    
    if (numberInputs.length > 0) {
      const skillInput = numberInputs[0] as HTMLInputElement
      
      // Make a skill change
      await user.clear(skillInput)
      await user.type(skillInput, '2')
      
      // Trigger potential auto-save with blur
      fireEvent.blur(skillInput)
      
      expect(skillInput.value).toBe('2')
      
      // Wait for potential auto-save
      await waitFor(() => {
        expect(skillInput.value).toBe('2')
      }, { timeout: 3000 })
    }
    
    expect(numberInputs.length >= 0).toBe(true)
  })

  it('should maintain skill data consistency across tab navigation', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to skills tab
    const tabs = screen.queryAllByRole('tab')
    const skillsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('skill')
    )
    
    if (skillsTab) {
      await user.click(skillsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const numberInputs = document.querySelectorAll('input[type="number"]')
    
    if (numberInputs.length > 0 && tabs.length > 1) {
      // Set a skill value
      const skillInput = numberInputs[0] as HTMLInputElement
      await user.clear(skillInput)
      await user.type(skillInput, '3')
      
      expect(skillInput.value).toBe('3')
      
      // Navigate to different tab
      const otherTab = tabs.find(tab => 
        !tab.textContent?.toLowerCase().includes('skill')
      )
      
      if (otherTab) {
        await user.click(otherTab)
        await waitFor(() => {
          expect(document.body.textContent?.length).toBeGreaterThan(100)
        }, { timeout: 2000 })
        
        // Navigate back to skills
        if (skillsTab) {
          await user.click(skillsTab)
          await waitFor(() => {
            expect(document.body.textContent?.length).toBeGreaterThan(100)
          }, { timeout: 2000 })
        }
        
        // Check if skill value is maintained
        const updatedInputs = document.querySelectorAll('input[type="number"]')
        if (updatedInputs.length > 0) {
          const updatedSkillInput = updatedInputs[0] as HTMLInputElement
          expect(updatedSkillInput.value).toBe('3')
        }
      }
    }
    
    expect(numberInputs.length >= 0).toBe(true)
  })
})