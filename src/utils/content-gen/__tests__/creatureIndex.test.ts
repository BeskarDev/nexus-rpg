import { describe, it, expect } from 'vitest'
import creatureIndexJson from '@site/src/utils/data/generated/creature-index.json'
import creaturesJson from '@site/src/utils/data/json/creatures.json'
import environmentsJson from '@site/src/utils/data/json/creature-environments.json'
import type { CreatureIndex } from '@site/src/types/CreatureIndex'

/**
 * The index is generated and byte-gated by `content:gen --check`, so staleness
 * is already CI's problem. What these tests guard is what the gate cannot see:
 * that the SHAPE of the payload is still the one the bestiary browser was built
 * against, and that regenerating it never starts shipping lore prose.
 */
const index = creatureIndexJson as CreatureIndex
const roster = creaturesJson as { name: string; tier: number }[]
const VOCABULARY = new Set(
	environmentsJson.environments.map((e: { name: string }) => e.name),
)

describe('creature index', () => {
	it('carries every creature in the roster', () => {
		expect(index.creatures).toHaveLength(roster.length)
		expect(new Set(index.creatures.map((c) => c.name))).toEqual(
			new Set(roster.map((c) => c.name)),
		)
	})

	it('gives every creature a unique id', () => {
		const ids = index.creatures.map((c) => c.id)
		expect(new Set(ids).size).toBe(ids.length)
	})

	it('uses the same id scheme as the Creature Cards print tool', () => {
		// `catalogue:<roster index>:<name>`, built the same way in both places so
		// one row means one thing. It is a within-session identity: anything that
		// outlives a page load (a saved encounter, a shared link, the print
		// hand-off) keys on name and tier instead, because the index moves.
		for (const entry of index.creatures) {
			const [source, position, ...rest] = entry.id.split(':')
			expect(source).toBe('catalogue')
			expect(roster[Number(position)].name).toBe(entry.name)
			expect(rest.join(':')).toBe(entry.name)
		}
	})

	it('links each creature to its own tier page heading', () => {
		for (const entry of index.creatures) {
			expect(entry.href).toBe(
				`/docs/creatures/creatures/tier-${entry.tier}#${entry.name
					.toLowerCase()
					.replace(/[^\w\s-]/g, '')
					.replace(/[\s_]+/g, '-')}`,
			)
		}
	})

	it('ships no lore prose', () => {
		// The whole reason the index exists. A new lore field must not reach the
		// browser bundle just because someone added it to the roster.
		const payload = JSON.stringify(index.creatures)
		for (const key of [
			'narrative',
			'ecology',
			'tactics',
			'physiology',
			'treasure',
			'lore',
		]) {
			expect(payload).not.toContain(`"${key}"`)
		}
	})

	it('carries the two lore fields that are filters', () => {
		// Environment drives the primary filter and organization drives the
		// encounter builder's group presets, so both are lifted to the top level.
		for (const entry of index.creatures) {
			expect(entry.environment.length).toBeGreaterThan(0)
			expect(entry.organization.length).toBeGreaterThan(0)
		}
	})

	it('only uses environment terms a filter can render', () => {
		for (const entry of index.creatures) {
			for (const term of entry.environment) {
				expect(VOCABULARY).toContain(term)
			}
		}
	})

	it('is ordered by tier then name', () => {
		const ordered = [...index.creatures].sort(
			(a, b) => a.tier - b.tier || a.name.localeCompare(b.name),
		)
		expect(index.creatures.map((c) => c.id)).toEqual(ordered.map((c) => c.id))
	})
})
