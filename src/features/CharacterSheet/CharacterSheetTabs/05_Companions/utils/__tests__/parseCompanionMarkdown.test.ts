import { describe, expect, it } from 'vitest'
import { parseCompanionMarkdown } from '@site/src/features/CharacterSheet/CharacterSheetTabs/05_Companions/utils/parseCompanionMarkdown'
import { getMockCharacters } from '@site/src/dev/mockData'

describe('parseCompanionMarkdown', () => {
	it('parses the builder shape the dev fixture carries', () => {
		const kael = getMockCharacters()[0]
		const block = parseCompanionMarkdown(kael.companions[0].markdown)
		expect(block).not.toBeNull()
		expect(block!.name).toBe('Ashfoot')
		expect(block!.type).toBe('Medium Beast')
		expect(block!.tier).toBe(2)
		expect(block!.category).toBe('Veteran')
		expect(block!.hp).toBe('18')
		expect(block!.agi).toBe('d10')
		expect(block!.resist).toBe('7')
		expect(block!.traits.map((t) => t.label)).toContain('Movement')
		expect(block!.sections.map((s) => s.label)).toEqual(['Attacks', 'Abilities'])
		expect(block!.sections[0].items).toHaveLength(2)
	})

	it('drops trait lines that say nothing', () => {
		// The builder emits every label whether the companion has a value or not, so an
		// unedited block carries the literal string `undefined` and three blanks.
		const block = parseCompanionMarkdown(
			[
				'#### **Badger** (Tiny Animal)',
				'',
				'**Tier:** 0 (Harmless)',
				'',
				'| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |',
				'| --- | --- | --- | --- | --- | --- | --- | --- | --- |',
				'| 5 | 1 | d4 | d6 | d4 | d4-2 | 5 | 9 | 7 |',
				'',
				'**Diet:** undefined',
				'**Skills:** Fighting (0), Perception (0)',
				'**Movement:** 1',
				'**Immunities:** ',
				'**Resistances:** —',
				'**Weaknesses:** none',
			].join('\n'),
		)
		expect(block!.traits.map((t) => t.label)).toEqual(['Skills', 'Movement'])
	})

	it('returns null for prose, so the caller can fall back', () => {
		expect(parseCompanionMarkdown('Just a note about my mule.')).toBeNull()
		expect(parseCompanionMarkdown('')).toBeNull()
	})
})
