import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
	CULTURAL_VARIANTS,
	VARIANT_REGIONS,
	getCulturalVariants,
	hasCulturalVariants,
	type VariantRegion,
} from '../culturalVariants'
import { baseItems } from '../magicItemsConfig'

/**
 * The cultural-appearance table has TWO copies, and neither is generated from the
 * other: `culturalVariants.ts` for the Magic Item Builder, and the "of the Regions"
 * sections in the equipment chapter for a reader at the table.
 *
 * Equipment is not one of the five JSON-canonical content types, so there is no
 * generator to make them agree by construction. This test is what stands in for
 * one: edit either surface alone and it fails naming the entry that drifted.
 */
const DOCS = resolve(__dirname, '../../../../../../../docs/04-equipment')

const REGION_HEADINGS: Record<string, VariantRegion> = {
	'The Eternal Desert': 'Eternal Desert',
	'The Frozen North': 'Frozen North',
	'The Eastern Mist Realms': 'Eastern Mist Realms',
	'The Western Island Realms': 'Western Island Realms',
	'The Southern Jungle': 'Southern Jungle',
	'Common to Every Land': 'Common',
}

/**
 * Read a regional armory section into `name → { base, region }`.
 *
 * The section is a run of `### <region>` headings, each over a two-column table of
 * appearance and the item it counts as. Parsing stops at the next `## `, so nothing
 * else in the chapter can be mistaken for one.
 */
const parseSection = (file: string, heading: string) => {
	const text = readFileSync(resolve(DOCS, file), 'utf8')
	const start = text.indexOf(heading)
	expect(start, `${heading} missing from ${file}`).toBeGreaterThan(-1)
	const after = text.slice(start + heading.length)
	const end = after.indexOf('\n## ')
	const body = end === -1 ? after : after.slice(0, end)

	const parsed: Record<string, { base: string; region: VariantRegion }> = {}
	let region: VariantRegion | null = null
	for (const line of body.split('\n')) {
		const headingMatch = line.match(/^### (.+?)\s*$/)
		if (headingMatch) {
			region = REGION_HEADINGS[headingMatch[1]] ?? null
			expect(
				region,
				`unknown region heading "${headingMatch[1]}"`,
			).not.toBeNull()
			continue
		}
		const rowMatch = line.match(/^\|\s*(.+?)\s*\|\s*(.+?)\s*\|$/)
		if (!rowMatch || rowMatch[1] === 'Name' || rowMatch[1].startsWith('---')) {
			continue
		}
		parsed[rowMatch[1]] = { base: rowMatch[2], region: region! }
	}
	return parsed
}

describe('cultural variants', () => {
	const documented = {
		...parseSection('03-weapons.md', '## Arms of the Regions'),
		...parseSection('04-armor.md', '## Armor of the Regions'),
	}

	/** Every appearance in code, flattened to the shape the docs print. */
	const inCode = Object.entries(CULTURAL_VARIANTS).flatMap(([base, variants]) =>
		variants.map((variant) => ({
			name: variant.name,
			base,
			region: variant.region,
		})),
	)

	it('prints every appearance the builder offers, and no others', () => {
		expect(Object.keys(documented).sort()).toEqual(
			inCode.map((variant) => variant.name).sort(),
		)
	})

	it('agrees with the chapter on what each appearance counts as, and where', () => {
		for (const variant of inCode) {
			expect(
				documented[variant.name],
				`${variant.name} in the chapter`,
			).toEqual({ base: variant.base, region: variant.region })
		}
	})

	it('is keyed by base items the builder can actually offer', () => {
		const known = new Set(
			Object.values(baseItems).flatMap((items) =>
				items.map((item) => item.name),
			),
		)
		for (const base of Object.keys(CULTURAL_VARIANTS)) {
			expect(known.has(base), `${base} is not a base item`).toBe(true)
		}
	})

	it('gives every appearance a known region, and uses all of them', () => {
		const used = new Set(inCode.map((variant) => variant.region))
		for (const region of used) {
			expect(VARIANT_REGIONS).toContain(region)
		}
		// A region nobody forges anything in is a region that should not be listed.
		for (const region of VARIANT_REGIONS) {
			expect(used.has(region), `nothing is common to ${region}`).toBe(true)
		}
	})

	it('never repeats a name across the whole table', () => {
		const names = inCode.map((variant) => variant.name)
		expect(new Set(names).size).toBe(names.length)
		// …including the base item's own name, which heads its own list.
		for (const base of Object.keys(CULTURAL_VARIANTS)) {
			const all = getCulturalVariants(base).map((variant) => variant.name)
			expect(new Set(all).size, `${base} has a duplicate appearance`).toBe(
				all.length,
			)
		}
	})

	it('puts the standard name first, and reports items with no variants', () => {
		const longsword = getCulturalVariants('Longsword')
		expect(longsword[0].name).toBe('Longsword')
		expect(longsword.map((variant) => variant.name)).toContain('Bastard Sword')
		expect(hasCulturalVariants('Longsword')).toBe(true)

		// A Buckler has no entry, so it is its own only appearance.
		expect(getCulturalVariants('Buckler')).toEqual([
			{ name: 'Buckler', region: 'Common' },
		])
		expect(hasCulturalVariants('Buckler')).toBe(false)
	})

	it('names no real-world period or place in the published rules', () => {
		/*
			The first draft of these sections shipped intro text reading "the Bronze Age
			and the ages either side of it" and "every corner of the ancient world"
			(owner review). A rulebook does not have a real world to refer to. The source
			comment in `culturalVariants.ts` may say it plainly; the docs may not.
		*/
		const forbidden = [
			'Bronze Age',
			'ancient world',
			'real-world',
			'real world',
			'Iron Age',
			'antiquity',
		]
		for (const file of ['03-weapons.md', '04-armor.md']) {
			const text = readFileSync(resolve(DOCS, file), 'utf8')
			for (const phrase of forbidden) {
				expect(text.toLowerCase(), `${phrase} in ${file}`).not.toContain(
					phrase.toLowerCase(),
				)
			}
		}
	})
})
