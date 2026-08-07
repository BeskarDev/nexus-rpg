import { describe, expect, it } from 'vitest'
import { parseCreatureMarkdown } from '../parseCreatureMarkdown'

/**
 * The Floating Eye companion, as the companion builder writes it (owner review,
 * 2026-08-07).
 *
 * Both of its faults were the same fault — this file having its own idea of what
 * an entry looks like:
 *
 * - **Its Eye Rays attack was not on the card at all.** The old pattern demanded
 *   a period AFTER the closing `**`, and the builder writes `**Eye Rays.**` with
 *   the period inside. No match, no warning, no attack.
 * - **Its bite printed as a broken ladder.** The old parser put the whole first
 *   sentence in `Attack.damage`, so `DamageLadder` split `12/17/22 damage.` into
 *   three cells reading `12`, `17` and `22 damage.`
 */
const FLOATING_EYE = [
	'#### **Floating Eye** (Tiny Aberration)',
	'',
	'**Tier:** 5 (Primeval)',
	'',
	'**Skills:** Perception (3), Arcana (2)',
	'',
	'| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |',
	'| --- | --- | --- | --- | --- | --- | --- | --- | --- |',
	'| 50 | 8 | d12 | d12 | d8 | d6 | 10 | 14 | 12 |',
	'',
	'**Attacks:**',
	'- **Bite** (*crush*). 12/17/22 damage',
	'- **Eye Rays.** Roll once per eye ray and apply the effects:',
	// EXACTLY as `generateMarkdown` writes them: the ray's number is inside the
	// bold run, because `companion-traits.json` marks up `<strong>1. Dazing
	// Ray.</strong>`. That leading `**` is what the old bullet strip mistook for
	// a list marker.
	'  **1. Dazing Ray.** Compare the result vs. Resist.',
	'  **2. Fear Ray.** The target is briefly frightened.',
	'',
	'**Abilities:**',
	'- **Flying (hover).** This creature can hover in place.',
].join('\n')

describe('parseCreatureMarkdown — companion stat blocks', () => {
	const [creature] = parseCreatureMarkdown(FLOATING_EYE)

	it('reads the identity and the stat table', () => {
		expect(creature.name).toBe('Floating Eye')
		expect(creature.type).toBe('Tiny Aberration')
		expect(creature.tier).toBe(5)
		expect(creature.hp).toBe('50')
		expect(creature.mnd).toBe('d6')
		expect(creature.dodge).toBe(14)
		expect(creature.skills).toEqual(['Perception (3)', 'Arcana (2)'])
	})

	it('gives the bite a BARE damage triple, never the whole sentence', () => {
		expect(creature.attacks[0]).toEqual({
			name: 'Bite',
			properties: ['crush'],
			damage: '12/17/22',
		})
	})

	it('keeps the Eye Rays attack, and its numbered rays with it', () => {
		expect(creature.attacks).toHaveLength(2)
		const rays = creature.attacks[1]
		expect(rays.name).toBe('Eye Rays')
		expect(rays.damage).toBe('')
		expect(rays.description).toBe(
			'Roll once per eye ray and apply the effects:',
		)
		// The bold run survives INTACT — no leading asterisk eaten as a bullet.
		// Stripped, `**1. Dazing Ray.**` became `*1. Dazing Ray.*`, which printed
		// the ray's name in italic with an orphaned `*` after it.
		expect(rays.details).toEqual([
			'**1. Dazing Ray.** Compare the result vs. Resist.',
			'**2. Fear Ray.** The target is briefly frightened.',
		])
	})

	it('strips a real bullet marker, which needs its space', () => {
		const spells = parseCreatureMarkdown(
			[
				'#### **Adept** (Medium Human)',
				'',
				'**Tier:** 2 (Skilled)',
				'',
				'| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |',
				'| --- | --- | --- | --- | --- | --- | --- | --- | --- |',
				'| 20 | 2 | d6 | d6 | d8 | d8 | 8 | 8 | 10 |',
				'',
				'**Abilities:**',
				'- **Spellcasting.** This creature knows:',
				'  - *Fireball*',
				'  - *Mend*',
			].join('\n'),
		)[0]
		expect(spells.abilities[0].description).toBe(
			'This creature knows: *Fireball* *Mend*',
		)
	})

	it('reads a qualifier written inside the bold name', () => {
		expect(creature.abilities[0]).toEqual({
			name: 'Flying',
			description: 'This creature can hover in place.',
			qualifier: 'hover',
		})
	})
})
