import { describe, it, expect } from 'vitest'
import { buildCreature } from '../creatureBuilderCalculations'
import { generateCreatureMarkdown } from '../creatureBuilderFormatting'
import type { CreatureBuilderState } from '../../../../features/CreatureBuilder/creatureBuilderReducer'

/**
 * The creature builder's OUTPUT CONTRACT (M15 S0).
 *
 * ## Why this exists before any of the redesign
 *
 * `creatures.json` is JSON-canonical and its docs pages are generated from it, and
 * `generateCreatureMarkdown` is shared by the builder dialog and by
 * `bun run creature:build`. So the markdown this tool emits is not an output, it
 * is an INTERFACE — to the CLI, to the Creature Cards printing tool that parses
 * it back, and to every stat block anyone has already pasted somewhere.
 *
 * M15 rewrites 3,600 lines of presentation around that function. This test is what
 * makes "the markdown must not change" a guarantee rather than an intention: the
 * expected strings below are the output as it stood on 2026-08-02, before the
 * first line of the redesign, written out in full rather than snapshotted so a
 * diff shows exactly which character moved.
 *
 * If a change here is deliberate, the docs pages, the CLI and the card parser all
 * have to move with it, and that is the conversation this test forces.
 */
const BASE: CreatureBuilderState = {
	tier: 2,
	category: 'Basic',
	size: 'Medium',
	type: 'Humanoid',
	subtype: '',
	archetype: 'Ambusher',
	name: 'Reed Stalker',
	customHP: null,
	customAV: null,
	customArmorType: null,
	customStr: null,
	customAgi: null,
	customSpi: null,
	customMnd: null,
	customParry: null,
	customDodge: null,
	customResist: null,
	skills: [],
	immunities: [],
	resistances: [],
	weaknesses: [],
	attacks: [],
	abilities: [],
}

/** Every optional course filled, plus a custom HP and a forced armour type. */
const FULL = {
	...BASE,
	tier: 4,
	category: 'Elite',
	size: 'Large',
	type: 'Beast',
	subtype: 'Serpent',
	archetype: 'Bruiser',
	name: 'Marsh Tyrant',
	customHP: 60,
	customArmorType: 'heavy',
	skills: [{ name: 'Perception', rank: 2 }],
	immunities: ['poison'],
	resistances: ['frost'],
	weaknesses: ['fire'],
	attacks: [
		{
			name: 'Bite',
			damage: '8/12/16',
			properties: ['reach'],
			description: 'A crushing bite.',
		},
	],
	abilities: [
		{
			name: 'Death Roll',
			actionType: 'Quick Action',
			description: 'Drags a grabbed target under.',
		},
	],
} as unknown as CreatureBuilderState

const MINIMAL_MARKDOWN = `### **Reed Stalker** (Medium Humanoid)

**Tier:** 2 (Basic)
**Armor:** Light

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| 20 | 2 (light) | d4 | d8 | d6 | d6 | 7 | 9 | 8 |
`

const FULL_MARKDOWN = `### **Marsh Tyrant** (Large Beast (Serpent))

**Tier:** 4 (Elite)
**Armor:** Heavy

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| 2×60 | 9 (heavy) | d10 | d6 | d8 | d8 | 12 | 8 | 10 |

**Skills:** Perception (2)

**Immunities:** poison

**Resistances:** frost

**Weaknesses:** fire

**Attacks:**

- **Bite** (*reach*). 8/12/16 damage. A crushing bite.

**Abilities:**

- **Death Roll (Quick Action).** Drags a grabbed target under.
`

describe('creature markdown contract', () => {
	it('emits the minimal stat block unchanged', () => {
		const built = buildCreature(BASE)
		expect(built).not.toBeNull()
		expect(generateCreatureMarkdown(built!)).toBe(MINIMAL_MARKDOWN)
	})

	it('emits every optional course unchanged', () => {
		const built = buildCreature(FULL)
		expect(built).not.toBeNull()
		expect(generateCreatureMarkdown(built!)).toBe(FULL_MARKDOWN)
	})

	it('keeps an Elite’s doubled life pool in the HP cell', () => {
		// `2×60` is not decoration: an Elite has two pools, and the card and the
		// card parser both read that multiplier out of this cell.
		const built = buildCreature(FULL)
		expect(generateCreatureMarkdown(built!)).toContain('| 2×60 |')
	})

	it('writes an attack with no properties without a stray space', () => {
		/*
			The one deliberate change to this contract (M15 S6), found by taking a
			built creature to the Creature Cards tool rather than by reading either
			side alone.

			An attack with no properties used to emit `- **Bite** . 5/8/11 damage.`
			— a space before the period, because the empty properties group still
			carried its separator. That is 30 of the 317 attacks in `creatures.json`,
			and the card parser required the parentheses, so every one of them was
			dropped silently on the way back in.
		*/
		const built = buildCreature({
			...BASE,
			attacks: [
				{
					name: 'Bite',
					damage: '5/8/11',
					properties: [],
					description: 'On a hit, attempts to grapple the target.',
				},
			],
		} as unknown as CreatureBuilderState)
		expect(generateCreatureMarkdown(built!)).toContain(
			'- **Bite**. 5/8/11 damage. On a hit, attempts to grapple the target.',
		)
	})

	it('omits a course entirely when it is empty, rather than printing a header', () => {
		// The minimal creature has no skills, immunities, attacks or abilities, and
		// the block must not carry their headings.
		const markdown = generateCreatureMarkdown(buildCreature(BASE)!)
		for (const heading of [
			'**Skills:**',
			'**Immunities:**',
			'**Resistances:**',
			'**Weaknesses:**',
			'**Attacks:**',
			'**Abilities:**',
		]) {
			expect(markdown).not.toContain(heading)
		}
	})
})
