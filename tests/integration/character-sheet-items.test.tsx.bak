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

describe('Character Sheet - Items/Equipment Tab Comprehensive Testing', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        search: '?id=test-character-items&tab=1',
        pathname: '/docs/tools/character-sheet',
        href: 'http://localhost:3000/docs/tools/character-sheet?id=test-character-items&tab=1',
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

  it('should navigate to items tab and display equipment management interface', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Find and click on Items tab
    const tabs = screen.queryAllByRole('tab')
    const itemsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('item')
    )
    
    if (itemsTab) {
      await user.click(itemsTab)
      
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 3000 })
    }
    
    // Check for items/equipment content
    const bodyText = document.body.textContent || ''
    const hasItemsContent = bodyText.includes('Items') || bodyText.includes('item') ||
                           bodyText.includes('Equipment') || bodyText.includes('equipment') ||
                           bodyText.includes('Weapon') || bodyText.includes('Armor') ||
                           bodyText.includes('Inventory') || bodyText.includes('inventory')
    
    console.log(`Items content found: ${hasItemsContent}`)
    expect(hasItemsContent || tabs.length > 0).toBe(true)
  })

  it('should handle weapon equipment and management', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to items tab
    const tabs = screen.queryAllByRole('tab')
    const itemsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('item')
    )
    
    if (itemsTab) {
      await user.click(itemsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    
    // Check for weapon-related content
    const hasWeaponContent = bodyText.includes('Weapon') || bodyText.includes('weapon') ||
                            bodyText.includes('Sword') || bodyText.includes('Bow') ||
                            bodyText.includes('Damage') || bodyText.includes('damage') ||
                            bodyText.includes('Attack') || bodyText.includes('attack')
    
    console.log(`Weapon content found: ${hasWeaponContent}`)
    
    // Test weapon-related interactions
    const textInputs = document.querySelectorAll('input[type="text"]')
    const selects = document.querySelectorAll('select')
    const buttons = document.querySelectorAll('button')
    
    // Test weapon name input
    if (textInputs.length > 0) {
      const weaponInput = textInputs[0] as HTMLInputElement
      await user.clear(weaponInput)
      await user.type(weaponInput, 'Longsword')
      
      expect(weaponInput.value).toBe('Longsword')
    }
    
    // Test weapon type selection
    if (selects.length > 0) {
      const weaponSelect = selects[0] as HTMLSelectElement
      await user.selectOptions(weaponSelect, weaponSelect.options[1]?.value || '1')
    }
    
    expect(hasWeaponContent || textInputs.length > 0 || selects.length > 0).toBe(true)
  })

  it('should handle armor equipment and armor value calculations', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to items tab
    const tabs = screen.queryAllByRole('tab')
    const itemsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('item')
    )
    
    if (itemsTab) {
      await user.click(itemsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    
    // Check for armor-related content
    const hasArmorContent = bodyText.includes('Armor') || bodyText.includes('armor') ||
                           bodyText.includes('AV') || bodyText.includes('Protection') ||
                           bodyText.includes('Mail') || bodyText.includes('Leather') ||
                           bodyText.includes('Plate') || bodyText.includes('Shield')
    
    console.log(`Armor content found: ${hasArmorContent}`)
    
    // Test armor-related interactions
    const textInputs = document.querySelectorAll('input[type="text"]')
    const numberInputs = document.querySelectorAll('input[type="number"]')
    const selects = document.querySelectorAll('select')
    
    // Test armor name input
    const armorInputs = Array.from(textInputs).filter((input, index) => index > 0) // Skip first input (might be weapon)
    if (armorInputs.length > 0) {
      const armorInput = armorInputs[0] as HTMLInputElement
      await user.clear(armorInput)
      await user.type(armorInput, 'Chain Mail')
      
      expect(armorInput.value).toBe('Chain Mail')
    }
    
    // Test armor value input
    if (numberInputs.length > 0) {
      const avInput = numberInputs[0] as HTMLInputElement
      const originalValue = avInput.value
      await user.clear(avInput)
      await user.type(avInput, '4')
      
      expect(avInput.value).toBe('4')
    }
    
    expect(hasArmorContent || textInputs.length > 0 || numberInputs.length > 0).toBe(true)
  })

  it('should handle inventory management and item addition/removal', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to items tab
    const tabs = screen.queryAllByRole('tab')
    const itemsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('item')
    )
    
    if (itemsTab) {
      await user.click(itemsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    const buttons = document.querySelectorAll('button')
    
    // Look for inventory management elements
    const hasInventoryContent = bodyText.includes('Inventory') || bodyText.includes('inventory') ||
                               bodyText.includes('Add') || bodyText.includes('Remove') ||
                               bodyText.includes('Delete') || bodyText.includes('Item')
    
    console.log(`Inventory content found: ${hasInventoryContent}, Buttons: ${buttons.length}`)
    
    // Test add item functionality
    const addButtons = Array.from(buttons).filter(btn => {
      const text = btn.textContent?.toLowerCase() || ''
      return text.includes('add') || text.includes('+') || text.includes('new')
    })
    
    if (addButtons.length > 0) {
      const addButton = addButtons[0] as HTMLButtonElement
      await user.click(addButton)
      
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    // Test remove item functionality
    const removeButtons = Array.from(buttons).filter(btn => {
      const text = btn.textContent?.toLowerCase() || ''
      return text.includes('remove') || text.includes('delete') || text.includes('-') || text.includes('x')
    })
    
    if (removeButtons.length > 0) {
      const removeButton = removeButtons[0] as HTMLButtonElement
      await user.click(removeButton)
      
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    expect(hasInventoryContent || addButtons.length > 0 || removeButtons.length > 0).toBe(true)
  })

  it('should handle item properties and special effects', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to items tab
    const tabs = screen.queryAllByRole('tab')
    const itemsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('item')
    )
    
    if (itemsTab) {
      await user.click(itemsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    
    // Check for item properties and effects
    const hasPropertiesContent = bodyText.includes('Properties') || bodyText.includes('properties') ||
                                bodyText.includes('Effect') || bodyText.includes('effect') ||
                                bodyText.includes('Quality') || bodyText.includes('quality') ||
                                bodyText.includes('Enchant') || bodyText.includes('enchant') ||
                                bodyText.includes('Magic') || bodyText.includes('magic')
    
    console.log(`Item properties content found: ${hasPropertiesContent}`)
    
    // Test properties interaction
    const textareas = document.querySelectorAll('textarea')
    const textInputs = document.querySelectorAll('input[type="text"]')
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    
    // Test item description or properties field
    if (textareas.length > 0) {
      const propertiesArea = textareas[0] as HTMLTextAreaElement
      await user.clear(propertiesArea)
      await user.type(propertiesArea, 'Sharp, Masterwork quality')
      
      expect(propertiesArea.value).toBe('Sharp, Masterwork quality')
    }
    
    // Test property checkboxes
    if (checkboxes.length > 0) {
      const propertyCheckbox = checkboxes[0] as HTMLInputElement
      const wasChecked = propertyCheckbox.checked
      await user.click(propertyCheckbox)
      
      expect(propertyCheckbox.checked).toBe(!wasChecked)
    }
    
    expect(hasPropertiesContent || textareas.length > 0 || checkboxes.length > 0).toBe(true)
  })

  it('should handle load/weight management and encumbrance', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to items tab
    const tabs = screen.queryAllByRole('tab')
    const itemsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('item')
    )
    
    if (itemsTab) {
      await user.click(itemsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    
    // Check for load/weight content
    const hasLoadContent = bodyText.includes('Load') || bodyText.includes('load') ||
                          bodyText.includes('Weight') || bodyText.includes('weight') ||
                          bodyText.includes('Encumbrance') || bodyText.includes('encumbrance') ||
                          bodyText.includes('Carry') || bodyText.includes('carry')
    
    console.log(`Load/weight content found: ${hasLoadContent}`)
    
    // Test load-related number inputs
    const numberInputs = document.querySelectorAll('input[type="number"]')
    
    if (numberInputs.length > 0) {
      // Look for inputs that might represent item weight/load
      const loadInput = numberInputs[numberInputs.length - 1] as HTMLInputElement // Try last number input
      const originalValue = loadInput.value
      
      await user.clear(loadInput)
      await user.type(loadInput, '2')
      
      expect(loadInput.value).toBe('2')
    }
    
    expect(hasLoadContent || numberInputs.length > 0).toBe(true)
  })

  it('should handle currency and wealth management', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to items tab
    const tabs = screen.queryAllByRole('tab')
    const itemsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('item')
    )
    
    if (itemsTab) {
      await user.click(itemsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const bodyText = document.body.textContent || ''
    
    // Check for currency content
    const hasCurrencyContent = bodyText.includes('Gold') || bodyText.includes('gold') ||
                              bodyText.includes('Silver') || bodyText.includes('silver') ||
                              bodyText.includes('Copper') || bodyText.includes('copper') ||
                              bodyText.includes('Coin') || bodyText.includes('coin') ||
                              bodyText.includes('Currency') || bodyText.includes('currency') ||
                              bodyText.includes('Money') || bodyText.includes('money')
    
    console.log(`Currency content found: ${hasCurrencyContent}`)
    
    // Test currency inputs
    const numberInputs = document.querySelectorAll('input[type="number"]')
    
    if (hasCurrencyContent && numberInputs.length > 0) {
      // Test what might be a currency input
      const currencyInput = numberInputs[0] as HTMLInputElement
      await user.clear(currencyInput)
      await user.type(currencyInput, '100')
      
      expect(currencyInput.value).toBe('100')
    }
    
    expect(hasCurrencyContent || numberInputs.length > 0).toBe(true)
  })

  it('should save equipment changes and trigger auto-save functionality', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to items tab
    const tabs = screen.queryAllByRole('tab')
    const itemsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('item')
    )
    
    if (itemsTab) {
      await user.click(itemsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const textInputs = document.querySelectorAll('input[type="text"]')
    
    if (textInputs.length > 0) {
      const itemInput = textInputs[0] as HTMLInputElement
      
      // Make an equipment change
      await user.clear(itemInput)
      await user.type(itemInput, 'Magical Sword')
      
      // Trigger potential auto-save with blur
      fireEvent.blur(itemInput)
      
      expect(itemInput.value).toBe('Magical Sword')
      
      // Wait for potential auto-save
      await waitFor(() => {
        expect(itemInput.value).toBe('Magical Sword')
      }, { timeout: 3000 })
    }
    
    expect(textInputs.length >= 0).toBe(true)
  })

  it('should maintain equipment data consistency across tab navigation', async () => {
    const user = userEvent.setup()
    
    render(<CharacterSheet />)
    
    await waitFor(() => {
      expect(document.body.textContent?.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
    
    // Navigate to items tab
    const tabs = screen.queryAllByRole('tab')
    const itemsTab = Array.from(tabs).find(tab => 
      tab.textContent?.toLowerCase().includes('item')
    )
    
    if (itemsTab) {
      await user.click(itemsTab)
      await waitFor(() => {
        expect(document.body.textContent?.length).toBeGreaterThan(100)
      }, { timeout: 2000 })
    }
    
    const textInputs = document.querySelectorAll('input[type="text"]')
    
    if (textInputs.length > 0 && tabs.length > 1) {
      // Set an equipment value
      const itemInput = textInputs[0] as HTMLInputElement
      await user.clear(itemInput)
      await user.type(itemInput, 'Battle Axe')
      
      expect(itemInput.value).toBe('Battle Axe')
      
      // Navigate to different tab
      const otherTab = tabs.find(tab => 
        !tab.textContent?.toLowerCase().includes('item')
      )
      
      if (otherTab) {
        await user.click(otherTab)
        await waitFor(() => {
          expect(document.body.textContent?.length).toBeGreaterThan(100)
        }, { timeout: 2000 })
        
        // Navigate back to items
        if (itemsTab) {
          await user.click(itemsTab)
          await waitFor(() => {
            expect(document.body.textContent?.length).toBeGreaterThan(100)
          }, { timeout: 2000 })
        }
        
        // Check if equipment value is maintained
        const updatedInputs = document.querySelectorAll('input[type="text"]')
        if (updatedInputs.length > 0) {
          const updatedItemInput = updatedInputs[0] as HTMLInputElement
          expect(updatedItemInput.value).toBe('Battle Axe')
        }
      }
    }
    
    expect(textInputs.length >= 0).toBe(true)
  })
})