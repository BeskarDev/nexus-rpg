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
		// Was `['force']` — a published type the app's array did not carry, which meant
		// a force spell could not be authored on the sheet. Closed in S5, and the
		// assertion is now exact parity so it cannot reopen.
		expect(extra).toEqual([])
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
