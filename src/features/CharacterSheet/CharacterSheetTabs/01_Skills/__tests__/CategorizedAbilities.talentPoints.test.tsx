import { describe, it, expect } from 'vitest'
import { getTalentPointSummaries } from '../../../utils/calculateTalentPoints'

describe('Talent point calculation helpers', () => {
	it('calculates missing and overspent points', () => {
		const skills = [
			{ id: 's1', name: 'Fighting', rank: 1, xp: 4 },
			{ id: 's2', name: 'Arcana', rank: 1, xp: 2 },
		]

		const abilities = [
			{ id: 'a1', title: 'Parry', description: '', tag: 'Talent', rank: 1, skill: 'Fighting' },
			{ id: 'a2', title: 'Riposte', description: '', tag: 'Talent', rank: 2, skill: 'Fighting' },
			{ id: 'a3', title: 'Spell Shield', description: '', tag: 'Talent', rank: 1, skill: 'Arcana' },
		]

		const { summaries } = getTalentPointSummaries(skills as any, abilities as any)

		expect(summaries.find((s) => s.skill === 'Fighting')).toMatchObject({
			available: 2,
			spent: 3,
			overspent: 1,
			missing: 0,
		})

		expect(summaries.find((s) => s.skill === 'Arcana')).toMatchObject({
			available: 1,
			spent: 1,
			overspent: 0,
			missing: 0,
		})
	})
})
