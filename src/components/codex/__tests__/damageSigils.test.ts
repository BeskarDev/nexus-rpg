import { describe, expect, it } from 'vitest'
import { DAMAGE_SIGIL, DAMAGE_TONE } from '../damage-sigils'
import { SIGIL_INNER } from '../sigil-paths'
import { damageTypeArray } from '@site/src/types/Character'

/**
 * The damage-sigil table against the damage types it claims to cover.
 *
 * `src/components/` is shared with the docs site and must not import the
 * character sheet's types, so `DAMAGE_SIGIL` is keyed by plain string. That is
 * the right call for the dependency direction and the wrong one for safety: a
 * damage type added to `damageTypeArray` would render as nothing at all, and a
 * missing mark looks exactly like a type that has no mark. Pinned here in both
 * directions, which is the same guard the condition table needed after
 * `invisible` shipped documented-but-unselectable.
 */
describe('DAMAGE_SIGIL', () => {
	it('covers every damage type', () => {
		const missing = damageTypeArray.filter((type) => !DAMAGE_SIGIL[type])
		expect(missing).toEqual([])
	})

	it('has no entry for a type that does not exist', () => {
		const extra = Object.keys(DAMAGE_SIGIL).filter(
			(type) => !(damageTypeArray as readonly string[]).includes(type),
		)
		// `force` is a published damage type in the rules and the chip system but
		// is not yet in the app's array — see docs/05-combat/02-attacking.md.
		expect(extra).toEqual(['force'])
	})

	it('only names marks that exist', () => {
		const unknown = Object.entries(DAMAGE_SIGIL).filter(
			([, mark]) => !(mark in SIGIL_INNER),
		)
		expect(unknown).toEqual([])
	})

	it('gives every type a tone', () => {
		const missing = damageTypeArray.filter((type) => !DAMAGE_TONE[type])
		expect(missing).toEqual([])
	})
})
