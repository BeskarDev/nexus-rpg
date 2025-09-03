import React from 'react'
/// <reference types="vitest" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { MagicItemBuilderDialog } from '../MagicItemBuilderDialog'
import { CharacterDocument } from '../../../../../../types/Character'

// Mock character data
const mockCharacter: CharacterDocument = {
  docRef: {} as any,
  docId: 'test-char',
  collectionId: 'characters',
  personal: {
    name: 'Test Character',
    playerName: 'Test Player',
    folk: 'Human',
    upbringing: 'City',
    background: 'Scholar',
    height: '6ft',
    weight: '180lbs',
    age: '25',
    description: 'A test character',
    motivation: 'Testing',
    allies: [],
    contacts: [],
    rivals: [],
    npcRelationships: [],
    notes: '',
  },
  statistics: {} as any,
  skills: {} as any,
  items: {
    coins: 1000,
    encumbrance: {
      encumberedAt: 10,
      overencumberedAt: 20,
      carryModifier: 0,
      currentLoad: 0,
      mountMaxLoad: 0,
      storageMaxLoad: 0,
    },
    weapons: [],
    items: [],
  },
  spells: {} as any,
  companions: [],
}

describe('MagicItemBuilderDialog', () => {
  const mockOnClose = vi.fn()
  const mockOnCreateItem = vi.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
    mockOnCreateItem.mockClear()
  })

  const renderDialog = (open = true) => {
    return render(
      <MagicItemBuilderDialog
        open={open}
        onClose={mockOnClose}
        onCreateItem={mockOnCreateItem}
        character={mockCharacter}
      />
    )
  }

  it('should render the stepper and initial step', () => {
    renderDialog()
    
    expect(screen.getByText('Magic Item Builder')).toBeInTheDocument()
    expect(screen.getByText('Select Base Item')).toBeInTheDocument()
    expect(screen.getByText('Select Item Category and Base Item')).toBeInTheDocument()
  })

  it('should not render when closed', () => {
    renderDialog(false)
    
    expect(screen.queryByText('Magic Item Builder')).not.toBeInTheDocument()
  })

  it('should navigate through the stepper workflow', async () => {
    const user = userEvent.setup()
    renderDialog()

    // Step 1: Select category and base item
    await user.click(screen.getByRole('combobox', { name: /category/i }))
    await user.click(screen.getByText('One-Handed Weapons'))
    
    await waitFor(() => {
      expect(screen.getByText('Shortsword')).toBeInTheDocument()
    })
    
    await user.click(screen.getByText('Shortsword'))
    
    // Next button should be enabled now
    const nextButton = screen.getByRole('button', { name: /next/i })
    expect(nextButton).toBeEnabled()
    await user.click(nextButton)

    // Step 2: Choose quality
    expect(screen.getByText('Choose Quality Tier')).toBeInTheDocument()
    await user.click(screen.getByText('Q4 (Lesser Magic)'))
    
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Step 3: Special Material (optional)
    expect(screen.getByText('Select Special Material (Optional)')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Step 4: Enchantment (optional)
    expect(screen.getByText('Select Enchantment (Optional)')).toBeInTheDocument()
    
    // Select an enchantment
    await user.click(screen.getByText('Flaming'))
    
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Step 5: Review & Create
    expect(screen.getByText('Review & Create Magic Item')).toBeInTheDocument()
    expect(screen.getByText('Flaming Shortsword')).toBeInTheDocument()
  })

  it('should require at least material or enchantment to create item', async () => {
    const user = userEvent.setup()
    renderDialog()

    // Navigate to final step without selecting material or enchantment
    // Step 1: Select base item
    await user.click(screen.getByRole('combobox', { name: /category/i }))
    await user.click(screen.getByText('One-Handed Weapons'))
    await user.click(screen.getByText('Shortsword'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Step 2: Choose quality
    await user.click(screen.getByText('Q4 (Lesser Magic)'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Step 3: Skip material
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Step 4: Skip enchantment
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Should show warning and disable create button
    expect(screen.getByText(/must select at least one special material or enchantment/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create item/i })).toBeDisabled()
  })

  it('should create a weapon with correct properties', async () => {
    const user = userEvent.setup()
    renderDialog()

    // Create a flaming shortsword
    await user.click(screen.getByRole('combobox', { name: /category/i }))
    await user.click(screen.getByText('One-Handed Weapons'))
    await user.click(screen.getByText('Shortsword'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    await user.click(screen.getByText('Q4 (Lesser Magic)'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Skip material
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Select flaming enchantment
    await user.click(screen.getByText('Flaming'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Create the item
    await user.click(screen.getByRole('button', { name: /create item/i }))

    expect(mockOnCreateItem).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Flaming Shortsword',
        cost: 1050, // 50 base + 1000 Q4 enhancement
        damage: expect.objectContaining({
          weapon: 4, // 2 base + 2 quality bonus (Q2->Q4 = +2)
          type: 'physical',
        }),
        properties: expect.stringContaining('+2 weapon damage'), // Updated format
        location: 'carried',
      })
    )
  })

  it('should create a wearable item with correct properties', async () => {
    const user = userEvent.setup()
    renderDialog()

    // Create an amulet of might
    await user.click(screen.getByRole('combobox', { name: /category/i }))
    await user.click(screen.getByText('Wearable Items'))
    await user.click(screen.getByText('Amulet'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    await user.click(screen.getByText('Q4 (Lesser Magic)'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Skip material
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Select of Strength enchantment
    await user.click(screen.getByText('of Strength'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Create the item
    await user.click(screen.getByRole('button', { name: /create item/i }))

    expect(mockOnCreateItem).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Amulet of Strength',
        cost: 800, // 50 base + 750 Q4 wearable enhancement
        slot: 'neck',
        container: 'worn',
        location: 'carried',
      })
    )
  })

  it('should calculate double cost for both material and enchantment', async () => {
    const user = userEvent.setup()
    renderDialog()

    // Create an iron flaming shortsword
    await user.click(screen.getByRole('combobox', { name: /category/i }))
    await user.click(screen.getByText('One-Handed Weapons'))
    await user.click(screen.getByText('Shortsword'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    await user.click(screen.getByText('Q4 (Lesser Magic)'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Select silver material (available for weapons at Q4)
    await user.click(screen.getByText('Silver'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Select flaming enchantment
    await user.click(screen.getByText('Flaming'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Should show double cost: 50 + 2 * 1000 = 2050
    expect(screen.getByText('2050 coins')).toBeInTheDocument() // 50 + 2 * 1000

    await user.click(screen.getByRole('button', { name: /create item/i }))

    expect(mockOnCreateItem).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Flaming Silver Shortsword',
        cost: 2050,
      })
    )
  })

  it('should allow resetting the form', async () => {
    const user = userEvent.setup()
    renderDialog()

    // Make some selections
    await user.click(screen.getByRole('combobox', { name: /category/i }))
    await user.click(screen.getByText('One-Handed Weapons'))
    await user.click(screen.getByText('Shortsword'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Reset should go back to step 1
    await user.click(screen.getByRole('button', { name: /reset/i }))

    expect(screen.getByText('Select Item Category and Base Item')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeDisabled()
  })

  it('should handle back navigation correctly', async () => {
    const user = userEvent.setup()
    renderDialog()

    // Navigate forward
    await user.click(screen.getByRole('combobox', { name: /category/i }))
    await user.click(screen.getByText('One-Handed Weapons'))
    await user.click(screen.getByText('Shortsword'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    expect(screen.getByText('Choose Quality Tier')).toBeInTheDocument()

    // Navigate back
    await user.click(screen.getByRole('button', { name: /back/i }))

    expect(screen.getByText('Select Item Category and Base Item')).toBeInTheDocument()
  })

  it('should filter materials and enchantments by category and quality', async () => {
    const user = userEvent.setup()
    renderDialog()

    // Select wearable category
    await user.click(screen.getByRole('combobox', { name: /category/i }))
    await user.click(screen.getByText('Wearable Items'))
    await user.click(screen.getByText('Amulet'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    await user.click(screen.getByText('Q4 (Lesser Magic)'))
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Materials step - shadowsilk should be available for wearables at Q4
    expect(screen.getByText('Shadowsilk')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /next/i }))

    // Enchantments step - should only show suffix enchantments for wearables
    expect(screen.getByText('of Protection')).toBeInTheDocument()
    expect(screen.getByText('of Strength')).toBeInTheDocument()
    expect(screen.queryByText('Flaming')).not.toBeInTheDocument() // weapon enchantment
  })
})
