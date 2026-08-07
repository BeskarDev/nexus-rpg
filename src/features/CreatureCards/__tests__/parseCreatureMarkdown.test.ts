import { describe, it, expect } from 'vitest'
import { parseCreatureMarkdown } from '../parseCreatureMarkdown'

/**
 * The other half of the creature markdown contract (M15 S6).
 *
 * `generateCreatureMarkdown` writes it; this reads it back to print cards. The two
 * were never exercised together, and a round trip through the running app is what
 * found the gap: **an attack with no properties was dropped silently.**
 *
 * The parser's pattern required a parenthesised properties group, so
 * `- **Bite**. 5/8/11 damage.` matched nothing and fell through the loop — no
 * card, no warning, the creature simply printed without its attack. That is 30 of
 * the 317 attacks in `creatures.json`, the Dog's bite among them.
 *
 * A unit test on either side alone could not have found it. These pin the seam.
 */
const CREATURE = `### **Reed Stalker** (Medium Humanoid)

**Tier:** 2 (Basic)
**Armor:** Light

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
|----|----|----|----|----|-----|-------|-------|--------|
| 20 | 2 (light) | d4 | d8 | d6 | d6 | 7 | 9 | 8 |

**Attacks:**

- **Bite**. 5/8/11 damage. On a hit, attempts to grapple the target.
- **Claws** (*light, slash*). 6/10/14 damage. Two attacks per turn.

**Abilities:**

- **Ambush (Quick Action).** Strikes from concealment.
`

describe('parseCreatureMarkdown', () => {
	const [creature] = parseCreatureMarkdown(CREATURE)

	it('reads a creature back out of its own markdown', () => {
		expect(creature).toBeDefined()
		expect(creature.name).toBe('Reed Stalker')
	})

	it('keeps an attack that has NO properties', () => {
		// The regression this file exists for.
		const names = creature.attacks.map((attack) => attack.name)
		expect(names).toContain('Bite')
		expect(names).toContain('Claws')
	})

	it('still reads the properties of an attack that has them', () => {
		const claws = creature.attacks.find((attack) => attack.name === 'Claws')
		expect(claws?.properties).toEqual(['light', 'slash'])
	})

	it('leaves a property-less attack with an empty property list', () => {
		const bite = creature.attacks.find((attack) => attack.name === 'Bite')
		expect(bite?.properties).toEqual([])
		expect(bite?.damage).toContain('5/8/11')
	})

	it('splits an ability’s timing out of its name', () => {
		/*
			This test used to pin the OPPOSITE, and said so: the parser kept the
			action type inside the name (`Ambush (Quick Action)`), and the comment
			noted that this was the reason a creature's timing could not be styled
			separately on a card. M21 made the timing a card device — a qualifier
			slab — so the split is now part of the contract rather than a wish.
		*/
		const ambush = creature.abilities.find(
			(ability) => ability.name === 'Ambush',
		)
		expect(ambush).toBeDefined()
		expect(ambush?.qualifier).toBe('Quick Action')
	})
})
