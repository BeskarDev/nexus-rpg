import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
	parseTalentDescription,
	validateTalentRecord,
	type TalentRecord,
} from '@site/src/utils/content-gen/talent-description-parser'

const JSON_FILE = path.resolve(__dirname, '../../src/utils/data/json/talents.json')

const talents: TalentRecord[] = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'))

const label = (rank: number) => `<strong>(Rank ${rank})</strong>`

describe('talents content generation', () => {
	it('has a well-formed record for every talent', () => {
		expect(talents.length).toBeGreaterThan(0)
		talents.forEach((t, i) => {
			expect(() => validateTalentRecord(t, `talents.json[${i}]`)).not.toThrow()
		})
	})

	it('parses every talent description without throwing (fail-loud corpus guard)', () => {
		for (const t of talents) {
			const parsed = parseTalentDescription(t.description, t.name)
			expect(parsed.ranks.length).toBeGreaterThan(0)
			for (const section of parsed.ranks) {
				expect(section.nodes.length).toBeGreaterThan(0)
			}
		}
	})

	it('every rank ladder ascends and stays within 1-5', () => {
		for (const t of talents) {
			const ranks = parseTalentDescription(t.description, t.name).ranks.map((r) => r.rank)
			expect(ranks).toEqual([...ranks].sort((a, b) => a - b))
			expect(new Set(ranks).size).toBe(ranks.length)
			expect(Math.min(...ranks)).toBeGreaterThanOrEqual(1)
			expect(Math.max(...ranks)).toBeLessThanOrEqual(5)
		}
	})

	it('splits preamble prose from the rank ladder', () => {
		const parsed = parseTalentDescription(
			`You can take higher ranks out of order.<br/><br/>${label(1)} +2 Focus.` +
				`<br/><br/>${label(2)} +4 Focus.`,
			'Arcane Spell Knowledge',
		)
		expect(parsed.preamble).toEqual([
			{ kind: 'prose', text: 'You can take higher ranks out of order.' },
		])
		expect(parsed.ranks.map((r) => r.rank)).toEqual([1, 2])
		expect(parsed.ranks[0].nodes).toEqual([{ kind: 'prose', text: '+2 Focus.' }])
	})

	it('leaves the preamble empty when the description opens on a rank', () => {
		const parsed = parseTalentDescription(`${label(1)} Do a thing.`, 'Battle Mage')
		expect(parsed.preamble).toEqual([])
		expect(parsed.ranks).toHaveLength(1)
	})

	it('accepts a capstone ladder that opens at rank 4', () => {
		// Supernatural Mobility / Master Artisan style: a rank-4 skill prerequisite
		// in the preamble, then only ranks 4 and 5.
		const parsed = parseTalentDescription(
			`<em>Requires Athletics at rank 4.</em><br/><br/>${label(4)} Run walls.` +
				`<br/><br/>${label(5)} Run air.`,
			'Supernatural Mobility',
		)
		expect(parsed.preamble).toEqual([{ kind: 'prose', text: '*Requires Athletics at rank 4.*' }])
		expect(parsed.ranks.map((r) => r.rank)).toEqual([4, 5])
	})

	it('tolerates the trailing space the corpus carries inside the label', () => {
		const parsed = parseTalentDescription('<strong>(Rank 1) </strong>+2 Focus.', 'Spellweaver')
		expect(parsed.ranks[0].nodes).toEqual([{ kind: 'prose', text: '+2 Focus.' }])
	})

	it('carries Weak/Strong/Critical runs through into the rank they belong to', () => {
		const parsed = parseTalentDescription(
			`${label(1)} Roll Spirit + Mysticism.<br/><strong>Weak.</strong> 1 Favor.` +
				`<br/><strong>Strong.</strong> 2 Favor.<br/><strong>Critical.</strong> 3 Favor.`,
			'Divine Favor',
		)
		expect(parsed.ranks[0].nodes).toEqual([
			{ kind: 'prose', text: 'Roll Spirit + Mysticism.' },
			{ kind: 'success', level: 'weak', text: '1 Favor.' },
			{ kind: 'success', level: 'strong', text: '2 Favor.' },
			{ kind: 'success', level: 'critical', text: '3 Favor.' },
		])
	})

	it('requires the full weak-strong-critical trio inside a rank', () => {
		// Unlike combat arts, no talent uses a partial run, so a gap is lost data.
		expect(() =>
			parseTalentDescription(
				`${label(1)} Roll.<br/><strong>Strong.</strong> Good.` +
					`<br/><strong>Critical.</strong> Better.`,
				'Partial',
			),
		).toThrow(/weak→strong→critical/)
	})

	it('throws on a description with no rank sections', () => {
		expect(() => parseTalentDescription('You gain a thing.', 'No Ranks')).toThrow(
			/no <strong>\(Rank N\)<\/strong> sections/,
		)
	})

	it('throws on an empty description', () => {
		expect(() => parseTalentDescription('   ', 'Blank')).toThrow(/description is empty/)
	})

	it('throws on a rank section with no rule text', () => {
		expect(() =>
			parseTalentDescription(`${label(1)} Fine.<br/><br/>${label(2)}`, 'Hollow'),
		).toThrow(/\(Rank 2\) has no rule text/)
	})

	it('throws on a non-ascending or repeated rank ladder', () => {
		expect(() =>
			parseTalentDescription(`${label(3)} c<br/><br/>${label(2)} b`, 'Backwards'),
		).toThrow(/must ascend/)
		expect(() =>
			parseTalentDescription(`${label(2)} a<br/><br/>${label(2)} b`, 'Repeat'),
		).toThrow(/must ascend/)
	})

	it('throws on every way the Notion export used to break a rank label', () => {
		// Each of these silently swallowed a whole rank section before the guard.
		const corruptions: [string, string][] = [
			['paren outside the tag', '(<strong>Rank 1) </strong>Do a thing.'],
			['<br/> swallowed inside the tag', '<strong><br/>(Rank 1)</strong> Do a thing.'],
			['stray + inside the tag', '<strong>(Rank 1) +</strong>2 Focus.'],
			['no emphasis at all', 'Prose.<br/><br/>(Rank 1) Do a thing.'],
		]
		for (const [why, description] of corruptions) {
			expect(
				() => parseTalentDescription(description, why),
				`should reject: ${why}`,
			).toThrow(/malformed/)
		}
	})

	it('rejects the "-" placeholder of an empty Notion row', () => {
		expect(() =>
			validateTalentRecord(
				{ name: 'Untitled', 'skill requirement': '-', description: '-' },
				'talents.json[148]',
			),
		).toThrow(/"-" placeholder/)
	})

	it('rejects a record with a missing field', () => {
		expect(() => validateTalentRecord({ name: 'X', description: 'y' }, 'ctx')).toThrow(
			/"skill requirement" must be a string/,
		)
	})
})
