import { expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

/**
 * Test helper functions for spell tools testing
 * Provides utilities for component testing and common assertions
 */

/**
 * Mock the print functionality for testing
 */
export const mockPrintFunctionality = () => {
  const mockPrint = vi.fn()
  
  // Mock useReactToPrint hook
  vi.mock('react-to-print', () => ({
    useReactToPrint: vi.fn(() => mockPrint)
  }))
  
  return mockPrint
}

/**
 * Mock Material-UI theme provider for testing
 */
export const mockMuiTheme = () => {
  vi.mock('@mui/material', async () => {
    const actual = await vi.importActual('@mui/material')
    return {
      ...actual,
      Experimental_CssVarsProvider: ({ children }: { children: React.ReactNode }) => React.createElement('div', { 'data-testid': 'theme-provider' }, children),
      experimental_extendTheme: vi.fn(() => ({}))
    }
  })
}

/**
 * Helper to simulate file upload for testing
 */
export const simulateFileUpload = async (input: HTMLElement, fileContent: string, fileName = 'test.md') => {
  const file = new File([fileContent], fileName, { type: 'text/markdown' })
  await userEvent.upload(input, file)
}

/**
 * Helper to simulate text input change
 */
export const simulateTextInput = async (input: HTMLElement, value: string) => {
  await userEvent.clear(input)
  await userEvent.type(input, value)
}

/**
 * Helper to simulate select dropdown interaction
 */
export const simulateSelectChange = async (selectElement: HTMLElement, value: string | string[]) => {
  fireEvent.mouseDown(selectElement)
  
  if (Array.isArray(value)) {
    for (const val of value) {
      const option = await screen.findByText(val)
      fireEvent.click(option)
    }
  } else {
    const option = await screen.findByText(value)
    fireEvent.click(option)
  }
}

/**
 * Helper to wait for element to appear with timeout
 */
export const waitForElement = async (testId: string, timeout = 5000) => {
  return await waitFor(() => screen.getByTestId(testId), { timeout })
}

/**
 * Helper to check if element contains specific text
 */
export const expectElementToContainText = (element: HTMLElement, text: string) => {
  expect(element).toBeInTheDocument()
  expect(element.textContent).toContain(text)
}

/**
 * Helper to check if multiple elements are rendered
 */
export const expectElementsToBeRendered = (testIds: string[]) => {
  testIds.forEach(testId => {
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })
}

/**
 * Helper to check spell card content
 */
export const expectSpellCardContent = (spellName: string, expectedRank?: number, expectedDescription?: string) => {
  const spellElement = screen.getByText(spellName)
  expect(spellElement).toBeInTheDocument()
  
  if (expectedRank !== undefined) {
    expect(screen.getByText(`Rank ${expectedRank}`)).toBeInTheDocument()
  }
  
  if (expectedDescription) {
    expect(screen.getByText(expectedDescription, { exact: false })).toBeInTheDocument()
  }
}

/**
 * Helper to verify print button functionality
 */
export const expectPrintButtonToWork = async (mockPrint: ReturnType<typeof vi.fn>) => {
  const printButton = screen.getByText('PRINT')
  expect(printButton).toBeInTheDocument()
  
  await userEvent.click(printButton)
  expect(mockPrint).toHaveBeenCalled()
}

/**
 * Helper to test select all/deselect all functionality
 */
export const testSelectAllDeselectAll = async () => {
  const selectAllButton = screen.getByText('Select all')
  const deselectAllButton = screen.getByText('Deselect all')
  
  expect(selectAllButton).toBeInTheDocument()
  expect(deselectAllButton).toBeInTheDocument()
  
  await userEvent.click(selectAllButton)
  await userEvent.click(deselectAllButton)
}

/**
 * Helper to verify error display
 */
export const expectErrorMessage = (errorText: string) => {
  const errorElement = screen.getByText(errorText, { exact: false })
  expect(errorElement).toBeInTheDocument()
}

/**
 * Helper to count rendered spell cards
 */
export const countSpellCards = (): number => {
  const spellCards = screen.getAllByTestId(/spell-card-/i)
  return spellCards.length
}

/**
 * Helper for async component testing
 */
export const renderWithAsyncSetup = async (component: React.ReactElement) => {
  const result = render(component)
  
  // Wait for any async setup to complete
  await waitFor(() => {}, { timeout: 1000 })
  
  return result
}

/**
 * Helper to verify JSON import functionality
 */
export const testJsonImport = async (textareaSelector: string, jsonString: string) => {
  const textarea = screen.getByLabelText(/import character as json/i)
  expect(textarea).toBeInTheDocument()
  
  await simulateTextInput(textarea, jsonString)
}

/**
 * Helper to verify component responsiveness
 */
export const testResponsiveRendering = async (component: React.ReactElement) => {
  const { rerender } = render(component)
  
  // Test different viewport sizes
  const viewports = [
    { width: 320, height: 568 }, // Mobile
    { width: 768, height: 1024 }, // Tablet
    { width: 1920, height: 1080 } // Desktop
  ]
  
  for (const viewport of viewports) {
    Object.defineProperty(window, 'innerWidth', { value: viewport.width, writable: true })
    Object.defineProperty(window, 'innerHeight', { value: viewport.height, writable: true })
    
    rerender(component)
    await waitFor(() => {}, { timeout: 500 })
  }
}

/**
 * Helper to mock JSON data imports
 */
export const mockJsonImports = () => {
  vi.mock('@site/src/utils/json/arcane-spells.json', () => ({
    default: [
      {
        name: 'Test Arcane Spell',
        rank: 1,
        discipline: 'Evocation',
        castTime: '1 Action',
        range: 'Medium',
        duration: 'Briefly',
        focus: 2,
        description: 'A test spell',
        effect: 'Test effect'
      }
    ]
  }))
  
  vi.mock('@site/src/utils/json/mystic-spells.json', () => ({
    default: [
      {
        name: 'Test Mystic Spell',
        rank: 1,
        tradition: 'Life',
        castTime: '1 Action',
        range: 'Touch',
        duration: 'Briefly',
        focus: 2,
        description: 'A test mystic spell',
        effect: 'Test effect'
      }
    ]
  }))
  
  vi.mock('@site/src/utils/json/combat-arts.json', () => ({
    default: [
      {
        name: 'Test Combat Art',
        skill: 'Fighting',
        weaponTypes: ['Sword'],
        description: 'A test combat art',
        effect: 'Test effect'
      }
    ]
  }))
}

/**
 * Setup function for spell tool tests
 */
export const setupSpellToolTests = () => {
  const mockPrint = mockPrintFunctionality()
  mockMuiTheme()
  mockJsonImports()
  
  return { mockPrint }
}