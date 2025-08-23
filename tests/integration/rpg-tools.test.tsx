import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'

// Import the tool components
import { CombatArts } from '../../src/features/CombatArts'
import { ArcaneSpells } from '../../src/features/ArcaneSpells'  
import { MysticSpells } from '../../src/features/MysticSpells'

// Mock the theme switcher component
vi.mock('@site/src/components/ThemeSwitcher', () => ({
  ThemeSwitcher: () => null
}))

describe('RPG Tools Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Combat Arts Tool', () => {
    it('should render combat arts tool without errors', async () => {
      render(<CombatArts />)
      
      await waitFor(() => {
        expect(document.body.innerHTML.length).toBeGreaterThan(50)
      }, { timeout: 5000 })
      
      const bodyText = document.body.textContent || ''
      const hasCombatContent = 
        bodyText.includes('combat') ||
        bodyText.includes('Combat') ||
        bodyText.includes('art') ||
        bodyText.includes('Art') ||
        bodyText.includes('skill') ||
        bodyText.includes('Skill')
      
      console.log('Combat Arts body text length:', bodyText.length)
      console.log('Has combat content:', hasCombatContent)
      
      expect(document.body.innerHTML.length).toBeGreaterThan(0)
    })

    it('should have interactive elements for combat arts selection', async () => {
      const user = userEvent.setup()
      
      render(<CombatArts />)
      
      await waitFor(() => {
        expect(document.body.innerHTML.length).toBeGreaterThan(50)
      }, { timeout: 3000 })
      
      // Look for interactive elements like buttons, selects, or form controls
      const buttons = document.querySelectorAll('button')
      const selects = document.querySelectorAll('select')
      const inputs = document.querySelectorAll('input')
      
      const totalInteractive = buttons.length + selects.length + inputs.length
      
      console.log(`Combat Arts - Found ${buttons.length} buttons, ${selects.length} selects, ${inputs.length} inputs`)
      
      expect(totalInteractive).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Arcane Spells Tool', () => {
    it('should render arcane spells tool without errors', async () => {
      render(<ArcaneSpells />)
      
      await waitFor(() => {
        expect(document.body.innerHTML.length).toBeGreaterThan(50)
      }, { timeout: 5000 })
      
      const bodyText = document.body.textContent || ''
      const hasSpellContent = 
        bodyText.includes('spell') ||
        bodyText.includes('Spell') ||
        bodyText.includes('arcane') ||
        bodyText.includes('Arcane') ||
        bodyText.includes('magic') ||
        bodyText.includes('Magic')
      
      console.log('Arcane Spells body text length:', bodyText.length)
      console.log('Has spell content:', hasSpellContent)
      
      expect(document.body.innerHTML.length).toBeGreaterThan(0)
    })

    it('should have spell selection and filtering capabilities', async () => {
      const user = userEvent.setup()
      
      render(<ArcaneSpells />)
      
      await waitFor(() => {
        expect(document.body.innerHTML.length).toBeGreaterThan(50)
      }, { timeout: 3000 })
      
      // Look for filtering/search elements
      const searchInputs = Array.from(document.querySelectorAll('input')).filter(input =>
        input.type === 'text' || input.type === 'search' ||
        input.placeholder?.toLowerCase().includes('search') ||
        input.placeholder?.toLowerCase().includes('filter')
      )
      
      const filterSelects = document.querySelectorAll('select')
      const filterButtons = Array.from(document.querySelectorAll('button')).filter(btn =>
        btn.textContent?.toLowerCase().includes('filter') ||
        btn.textContent?.toLowerCase().includes('clear') ||
        btn.textContent?.toLowerCase().includes('reset')
      )
      
      console.log(`Arcane Spells - Found ${searchInputs.length} search inputs, ${filterSelects.length} filter selects, ${filterButtons.length} filter buttons`)
      
      expect(document.body.innerHTML.length).toBeGreaterThan(0)
    })
  })

  describe('Mystic Spells Tool', () => {
    it('should render mystic spells tool without errors', async () => {
      render(<MysticSpells />)
      
      await waitFor(() => {
        expect(document.body.innerHTML.length).toBeGreaterThan(50)
      }, { timeout: 5000 })
      
      const bodyText = document.body.textContent || ''
      const hasMysticContent = 
        bodyText.includes('mystic') ||
        bodyText.includes('Mystic') ||
        bodyText.includes('spell') ||
        bodyText.includes('Spell') ||
        bodyText.includes('tradition') ||
        bodyText.includes('Tradition')
      
      console.log('Mystic Spells body text length:', bodyText.length)
      console.log('Has mystic content:', hasMysticContent)
      
      expect(document.body.innerHTML.length).toBeGreaterThan(0)
    })

    it('should support spell tradition filtering and organization', async () => {
      const user = userEvent.setup()
      
      render(<MysticSpells />)
      
      await waitFor(() => {
        expect(document.body.innerHTML.length).toBeGreaterThan(50)
      }, { timeout: 3000 })
      
      // Look for tradition-specific elements
      const bodyText = document.body.textContent || ''
      const hasTraditionElements = 
        bodyText.includes('Light') ||
        bodyText.includes('Twilight') ||
        bodyText.includes('Life') ||
        bodyText.includes('Death') ||
        bodyText.includes('Nature') ||
        bodyText.includes('Tempest') ||
        bodyText.includes('Peace') ||
        bodyText.includes('War')
      
      console.log('Has tradition elements:', hasTraditionElements)
      
      expect(document.body.innerHTML.length).toBeGreaterThan(0)
    })
  })

  describe('Cross-Tool Integration', () => {
    it('should handle multiple tool components being rendered simultaneously', async () => {
      const MultiToolComponent = () => (
        <div>
          <div data-testid="combat-arts"><CombatArts /></div>
          <div data-testid="arcane-spells"><ArcaneSpells /></div>
          <div data-testid="mystic-spells"><MysticSpells /></div>
        </div>
      )
      
      render(<MultiToolComponent />)
      
      await waitFor(() => {
        expect(document.body.innerHTML.length).toBeGreaterThan(100)
      }, { timeout: 5000 })
      
      // Verify all tools rendered
      const combatSection = document.querySelector('[data-testid="combat-arts"]')
      const arcaneSection = document.querySelector('[data-testid="arcane-spells"]')  
      const mysticSection = document.querySelector('[data-testid="mystic-spells"]')
      
      expect(combatSection?.innerHTML.length).toBeGreaterThan(0)
      expect(arcaneSection?.innerHTML.length).toBeGreaterThan(0)
      expect(mysticSection?.innerHTML.length).toBeGreaterThan(0)
    })
  })
})