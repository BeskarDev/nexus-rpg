import { describe, it, expect } from 'vitest'
import { createInitialCharacter } from '../createInitialCharacter'
import type { UpbringingData, BackgroundData } from '../../components'

describe('createInitialCharacter skill conflict resolution', () => {
	const mysticUpbringing: UpbringingData = {
		name: 'Mystic Apprentice',
		description: 'Raised in mystic traditions',
		'suggested skills': 'Mysticism, Insight, Survival'
	}

	const arcaneBackground: BackgroundData = {
		name: 'Academy Scholar',
		description: 'Studied at magical academy',
		'suggested skills': 'Arcana, Education, Language',
		'starting item': 'spell focus'
	}

	const bothSkillsUpbringing: UpbringingData = {
		name: 'Conflicted Apprentice',
		description: 'Studied both traditions',
		'suggested skills': 'Arcana, Mysticism, Insight'
	}

	it('resolves Arcana vs Mysticism conflict by keeping Arcana (from separate sources)', () => {
		const character = createInitialCharacter('Test Character', 'Test Player', {
			upbringing: mysticUpbringing,  // Has Mysticism
			background: arcaneBackground   // Has Arcana
		})

		const skillNames = character.skills.skills.map(s => s.name)
		
		expect(skillNames).toContain('Arcana')
		expect(skillNames).not.toContain('Mysticism')
		expect(skillNames).toContain('Insight')    // From upbringing
		expect(skillNames).toContain('Survival')   // From upbringing
		expect(skillNames).toContain('Education')  // From background
		expect(skillNames).toContain('Language')   // From background
	})

	it('resolves Arcana vs Mysticism conflict by keeping Arcana (from same source)', () => {
		const character = createInitialCharacter('Test Character', 'Test Player', {
			upbringing: bothSkillsUpbringing  // Has both Arcana and Mysticism
		})

		const skillNames = character.skills.skills.map(s => s.name)
		
		expect(skillNames).toContain('Arcana')
		expect(skillNames).not.toContain('Mysticism')
		expect(skillNames).toContain('Insight')    // Should still be present
	})

	it('handles Mysticism alone without issues', () => {
		const character = createInitialCharacter('Test Character', 'Test Player', {
			upbringing: mysticUpbringing  // Has only Mysticism
		})

		const skillNames = character.skills.skills.map(s => s.name)
		
		expect(skillNames).toContain('Mysticism')  // Should be present when no Arcana
		expect(skillNames).not.toContain('Arcana')
		expect(skillNames).toContain('Insight')
		expect(skillNames).toContain('Survival')
	})

	it('handles Arcana alone without issues', () => {
		const character = createInitialCharacter('Test Character', 'Test Player', {
			background: arcaneBackground  // Has only Arcana
		})

		const skillNames = character.skills.skills.map(s => s.name)
		
		expect(skillNames).toContain('Arcana')     // Should be present when no Mysticism
		expect(skillNames).not.toContain('Mysticism')
		expect(skillNames).toContain('Education')
		expect(skillNames).toContain('Language')
	})
})
