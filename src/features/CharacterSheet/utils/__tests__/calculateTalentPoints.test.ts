import { getTalentPointSummaries } from '../calculateTalentPoints'

describe('getTalentPointSummaries', () => {
	it('calculates available, spent, and missing talent points per skill', () => {
		const skills = [
			{ id: '1', name: 'Fighting', rank: 1, xp: 4 },
			{ id: '2', name: 'Arcana', rank: 1, xp: 2 },
		]

		const abilities = [
			{ id: 'a', title: 'Talent A1', description: '', tag: 'Talent', rank: 1, skill: 'Fighting' },
			{ id: 'b', title: 'Talent A2', description: '', tag: 'Talent', rank: 2, skill: 'Fighting' },
			{ id: 'c', title: 'Talent B1', description: '', tag: 'Talent', rank: 1, skill: 'Arcana' },
			{ id: 'd', title: 'Talent Unassigned', description: '', tag: 'Talent', rank: 1 },
		]

		const { summaries, unassignedSpent } = getTalentPointSummaries(
			skills as any,
			abilities as any,
		)

		const fightingSummary = summaries.find((s) => s.skill === 'Fighting')
		const arcanaSummary = summaries.find((s) => s.skill === 'Arcana')

		expect(fightingSummary).toMatchObject({
			available: 2, // 4 XP / 2
			spent: 3, // rank 1 + rank 2
			overspent: 1,
			missing: 0,
		})

		expect(arcanaSummary).toMatchObject({
			available: 1,
			spent: 1,
			overspent: 0,
			missing: 0,
		})

		expect(unassignedSpent).toBe(1)
	})
})
