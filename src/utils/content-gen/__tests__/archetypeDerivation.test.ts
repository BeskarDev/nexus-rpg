import { describe, it, expect } from 'vitest'
import archetypesJson from '@site/src/utils/data/json/archetypes.json'
import {
	derive,
	deriveAll,
	deriveCombatArts,
	deriveEquipment,
	deriveFocusPool,
	deriveSkills,
	deriveSpellsKnown,
	requiredCombatArts,
	validateCompanions,
	validateTalents,
	validateSpells,
	validateAttributes,
	deriveCompanionCost,
	COMPANION_COST,
	FAMILIAR_RITUAL_COST,
	STANDARD_GEAR_LOAD,
	STARTING_COINS,
	type ArchetypeRecord,
} from '../archetype-derivation'

const records = archetypesJson as unknown as ArchetypeRecord[]

function record(name: string): ArchetypeRecord {
	const found = records.find((a) => a.name === name)
	if (!found) throw new Error(`no archetype named ${name}`)
	return JSON.parse(JSON.stringify(found)) as ArchetypeRecord
}

describe('archetype derivation', () => {
	it('derives all 25 archetypes without a failure', () => {
		const all = deriveAll()
		expect(all).toHaveLength(25)
		// alphabetical: the order the sidebar and the overview table both use
		const names = all.map((a) => a.record.name)
		expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)))
	})

	it('leaves every archetype with exactly 3 rank 1 and 4 rank 0 skills', () => {
		for (const a of deriveAll()) {
			expect(a.skills.rank1, a.record.name).toHaveLength(3)
			expect(a.skills.rank0, a.record.name).toHaveLength(4)
		}
	})

	it('keeps every kit inside the coin budget and the carry capacity', () => {
		for (const a of deriveAll()) {
			expect(a.equipment.coinsRemaining, a.record.name).toBeGreaterThanOrEqual(
				0,
			)
			expect(a.equipment.coinsSpent, a.record.name).toBeLessThanOrEqual(
				STARTING_COINS,
			)
			expect(a.equipment.totalLoad, a.record.name).toBe(
				a.equipment.equipmentLoad + STANDARD_GEAR_LOAD,
			)
			// Carrying capacity is a SOFT limit (owner ruling, 2026-08-08): a kit may
			// sit over it and take the encumbered penalties. Twice capacity is the
			// hard one.
			expect(a.equipment.totalLoad, a.record.name).toBeLessThanOrEqual(
				2 * a.equipment.carryCapacity,
			)
		}
	})

	it('grants one free unit of ammunition to a weapon that needs it', () => {
		// Ranger's longbow (M22 F12): arrows cost 15 and are granted, so the
		// stated 85 coins only works if the rule is applied.
		const ranger = deriveEquipment(record('Ranger'))
		const arrows = ranger.items.find((i) => i.name === 'Arrows (d6)')
		expect(arrows?.free).toBe(true)
		expect(arrows?.cost).toBe(0)
		expect(ranger.coinsRemaining).toBe(85)

		// Nothing free without an `ammo` weapon in the kit.
		const fighter = deriveEquipment(record('Fighter'))
		expect(fighter.items.every((i) => !i.free)).toBe(true)
	})

	it('counts combat arts from the weapon skills, rank 0 included', () => {
		// 02-character-creation.md: two per weapon skill at rank 1, one at rank 0.
		expect(requiredCombatArts(record('Ranger'))).toBe(3) // Archery 1 + Fighting 0
		expect(requiredCombatArts(record('Gladiator'))).toBe(2) // Fighting 1 only
		expect(requiredCombatArts(record('Sorcerer'))).toBe(0) // no weapon skill
	})

	it('matches every recommended art to a weapon the archetype carries', () => {
		for (const a of deriveAll())
			expect(a.combatArts.arts, a.record.name).toHaveLength(
				a.combatArts.required,
			)
		// The Monk fights unarmed, which only counts because of Pugilist.
		const monk = deriveCombatArts(record('Monk'))
		expect(monk.arts.map((x) => x.name)).toContain('Knockout')
	})

	it('sizes an Arcana focus pool off Mind and a Mysticism pool off Spirit', () => {
		expect(deriveFocusPool(record('Sorcerer'))).toEqual({
			attribute: 'MND',
			value: 8,
			total: 8,
		})
		expect(deriveFocusPool(record('Druid'))).toEqual({
			attribute: 'SPI',
			value: 8,
			total: 8,
		})
		expect(deriveFocusPool(record('Fighter'))).toBeNull()
	})

	it('counts spells known per choice mode', () => {
		// devotion takes ONE option's set; balance draws across both
		expect(record('Champion').spellData?.mode).toBe('devotion')
		expect(deriveSpellsKnown(record('Champion'))).toBe(6)
		expect(record('Druid').spellData?.mode).toBe('balance')
		expect(deriveSpellsKnown(record('Druid'))).toBe(4)
		expect(deriveSpellsKnown(record('Fighter'))).toBeNull()
	})

	it('marks a skill the upbringing and background did not suggest', () => {
		// The rule applies at BOTH ranks. The hand-written pages did not: the
		// Apothecary marked its rank 1 Archery, the Druid left its rank 1
		// Survival unmarked, and neither upbringing nor background grants it.
		const druid = deriveSkills(record('Druid'))
		expect([...druid.customised].sort()).toEqual([
			'Athletics',
			'Perception',
			'Survival',
		])
		expect(druid.background.startingItem).toBe('Living seed necklace')
	})
})

describe('archetype derivation fails loud', () => {
	it('rejects an equipment name the catalogues do not carry', () => {
		const bad = record('Fighter')
		bad.startingEquipment = [{ item: 'Leather Armor' }] // catalogue says "Leather"
		expect(() => deriveEquipment(bad)).toThrow(/matches no entry/)
	})

	it('rejects an unknown upbringing', () => {
		const bad = record('Apothecary')
		bad.upbringing = 'Apprenticed' // the name M22 F6 found and corrected
		expect(() => deriveSkills(bad)).toThrow(/not in upbringings.json/)
	})

	it('rejects a kit that costs more than the budget', () => {
		const bad = record('Fighter')
		bad.startingEquipment = [{ item: 'Plate Harness' }]
		expect(() => deriveEquipment(bad)).toThrow(/matches no entry|against a 350/)
	})

	it('rejects the wrong number of combat arts', () => {
		const bad = record('Ranger')
		bad.recommendedCombatArts = bad.recommendedCombatArts!.slice(0, 2)
		expect(() => deriveCombatArts(bad)).toThrow(/grant 3/)
	})

	it('rejects an art the kit carries no weapon for', () => {
		const bad = record('Sorcerer')
		bad.recommendedCombatArts = [{ name: 'Cleave', gloss: 'x' }]
		expect(() => deriveCombatArts(bad)).toThrow(/weapon skills grant 0/)
	})

	it('rejects rank 0 skills that do not come to four', () => {
		const bad = record('Fighter')
		bad.suggestedSkills = 'Fighting, Athletics, Fortitude, Perception'
		expect(() => deriveSkills(bad)).toThrow(/rank 0 skills, not 4/)
	})

	it('rejects a talent with no gloss', () => {
		const bad = record('Fighter')
		bad.recommendedTalents[0] = { name: 'Shield Mastery', gloss: '' }
		expect(() => derive(bad)).toThrow(/has no gloss/)
	})

	it('rejects devotion options a player could not fairly choose between', () => {
		const bad = record('Champion')
		bad.spellData!.options[1].spells = bad.spellData!.options[1].spells.slice(
			0,
			2,
		)
		expect(() => deriveSpellsKnown(bad)).toThrow(/differ in size/)
	})

	// A companion has to be paid for: the `Animal Companion` talent (Nature) or the
	// `Conjure Familiar` spell. Bard shipped with a block and neither, because its
	// pre-generation page hedged with "If you choose Animal Companion…".
	it('fails an animal companion with no Animal Companion talent', () => {
		const a = record('Druid')
		a.recommendedTalents = a.recommendedTalents.filter(
			(t) => t.name !== 'Animal Companion',
		)
		expect(() => validateCompanions(a)).toThrow(
			/Druid.*Animal Companion.*talent/s,
		)
	})

	it('fails a familiar with no Conjure Familiar spell', () => {
		const a = record('Summoner')
		for (const option of a.spellData!.options)
			option.spells = option.spells.filter((s) => s.name !== 'Conjure Familiar')
		expect(() => validateCompanions(a)).toThrow(/Summoner.*Conjure Familiar/s)
	})

	it('accepts the three companion archetypes and the one familiar archetype', () => {
		for (const name of ['Druid', 'Ranger', 'Tamer', 'Summoner'])
			expect(() => validateCompanions(record(name)), name).not.toThrow()
	})

	// Owner ruling 2026-08-08: a starting character may pay for the companion out
	// of the 350 coins, so every companion archetype must be able to afford it.
	it('prices every companion and familiar out of the starting coins', () => {
		for (const a of deriveAll()) {
			const cost = a.companionCost
			if (!a.record.recommendedCompanions && !a.record.recommendedFamiliars) {
				expect(cost, a.record.name).toBeNull()
				continue
			}
			expect(cost, a.record.name).not.toBeNull()
			expect(cost!.cost).toBe(
				a.record.recommendedCompanions ? COMPANION_COST : FAMILIAR_RITUAL_COST,
			)
			expect(cost!.left, a.record.name).toBeGreaterThanOrEqual(0)
			expect(cost!.left).toBe(a.equipment.coinsRemaining - cost!.cost)
		}
	})

	it('fails a companion the kit cannot afford', () => {
		const a = record('Tamer')
		expect(() => deriveCompanionCost(a, COMPANION_COST - 1)).toThrow(
			/Tamer.*cannot pay the 75 coins/s,
		)
	})

	// Owner ruling 2026-08-08: carrying capacity is a soft limit. Being over it is
	// a priced trade; twice capacity is the hard limit and fails the build.
	it('allows a kit over carrying capacity and reports by how much', () => {
		// Synthetic rather than a published archetype: after the backpack retrofit
		// none of the 25 is encumbered, and this tests the mechanic, not the set.
		const a = record('Apothecary') // d4 Strength: capacity 10, standard gear 5
		const e = deriveEquipment({
			...a,
			startingEquipment: [{ item: 'Blowpipe', quantity: 7 }],
		})
		expect(e.totalLoad).toBe(12)
		expect(e.carryCapacity).toBe(10)
		expect(e.encumberedBy).toBe(2)
	})

	it('reports no encumbrance for a kit inside capacity', () => {
		for (const a of deriveAll()) {
			if (a.equipment.totalLoad <= a.equipment.carryCapacity)
				expect(a.equipment.encumberedBy, a.record.name).toBe(0)
		}
	})

	it('fails a kit above twice carrying capacity', () => {
		const a = record('Apothecary')
		// d4 Strength: capacity 10, hard limit 20, standard gear 5.
		// 20 load of darts (100 coins, so the budget gate does not fire first) plus
		// 5 of standard gear is 25, against a hard limit of 20.
		a.startingEquipment = [{ item: 'Blowdarts (d8)', quantity: 20 }]
		expect(() => deriveEquipment(a)).toThrow(/Apothecary.*hard limit of 20/s)
	})

	// The Champion shipped recommending Heavy Armor Mastery, a Fortitude talent,
	// with no Fortitude at rank 1 — a talent it was not allowed to take.
	it('fails a talent whose skill the archetype only has at rank 0', () => {
		const a = record('Champion')
		a.recommendedTalents = [
			{ name: 'Heavy Armor Mastery', gloss: 'x' },
			...a.recommendedTalents.slice(1),
		]
		expect(() => validateTalents(a)).toThrow(
			/Champion.*Fortitude.*not one of its rank 1 skills/s,
		)
	})

	it('fails a talent that is not in talents.json', () => {
		const a = record('Champion')
		// Keep the count at three, or the arity check fires first.
		a.recommendedTalents[0] = { name: 'Not A Talent', gloss: 'x' }
		expect(() => validateTalents(a)).toThrow(/Champion.*not in talents.json/s)
	})

	it('accepts every published archetype talent', () => {
		for (const a of deriveAll())
			expect(() => validateTalents(a.record), a.record.name).not.toThrow()
	})

	// The Champion listed Protect from Influence at rank 1 (the catalogue has it at
	// rank 2); the Oracle listed Whisper of Dreams, which is not a spell at all.
	it('fails a spell the catalogue does not carry', () => {
		const a = record('Champion')
		a.spellData!.options[0].spells[0] = { name: 'Whisper of Dreams', rank: 1 }
		expect(() => validateSpells(a)).toThrow(
			/Champion.*not in the Mysticism catalogue/s,
		)
	})

	it('fails a spell listed at the wrong rank', () => {
		const a = record('Champion')
		a.spellData!.options[0].spells[0] = { name: 'Radiant Burst', rank: 0 }
		expect(() => validateSpells(a)).toThrow(
			/Champion.*listed at rank 0.*catalogue has it at rank 1/s,
		)
	})

	it('fails a spell above rank 1', () => {
		const a = record('Champion')
		a.spellData!.options[0].spells[0] = {
			name: 'Protect from Influence',
			rank: 2,
		}
		expect(() => validateSpells(a)).toThrow(
			/Champion.*rank 2, which a rank 1 caster cannot learn/s,
		)
	})

	it('fails a spell listed under the wrong tradition', () => {
		const a = record('Champion')
		a.spellData!.options[0].spells[0] = { name: 'Battle Surge', rank: 0 }
		expect(() => validateSpells(a)).toThrow(
			/Champion.*War tradition.*listed under Light/s,
		)
	})

	it('accepts every published archetype spell list', () => {
		for (const a of deriveAll())
			expect(() => validateSpells(a.record), a.record.name).not.toThrow()
	})

	// The generator prints talent i beside rank 1 skill i, so order is a contract.
	// The Warlock shipped with two Arcana talents and none for Lore, which rendered a
	// Lore skill beside an Arcana talent.
	it('fails talents listed out of primarySkills order', () => {
		const a = record('Priest')
		a.recommendedTalents = [
			a.recommendedTalents[0],
			a.recommendedTalents[2],
			a.recommendedTalents[1],
		]
		expect(() => validateTalents(a)).toThrow(/must follow primarySkills order/s)
	})

	it('fails when a skill has no talent and another has two', () => {
		const a = record('Warlock')
		a.recommendedTalents[1] = { name: 'Arcane Spell Knowledge', gloss: 'x' }
		expect(() => validateTalents(a)).toThrow(/Warlock/s)
	})

	it('pairs every archetype talent with the rank 1 skill printed beside it', () => {
		for (const a of deriveAll()) {
			a.record.recommendedTalents.forEach((t, i) => {
				expect(() => validateTalents(a.record), a.record.name).not.toThrow()
				expect(a.skills.rank1[i], `${a.record.name} slot ${i}`).toBeTruthy()
			})
		}
	})

	// Capacity is a PURCHASE, not a formula buff (owner ruling, 2026-08-08): a bought
	// backpack replaces the free one, so it costs no load and raises the limit.
	it("adds a bought backpack's capacity and charges it no load", () => {
		const a = record('Slinger')
		const plain = deriveEquipment({
			...a,
			startingEquipment: [{ item: 'Sling' }],
		})
		const packed = deriveEquipment({
			...a,
			startingEquipment: [
				{ item: 'Sling' },
				{ item: 'Traveler\u2019s Backpack' },
			],
		})
		expect(plain.capacityBonus).toBe(0)
		expect(packed.capacityBonus).toBe(2)
		expect(packed.carryCapacity).toBe(plain.carryCapacity + 2)
		// The backpack replaces the standard one, so it adds nothing to load.
		expect(packed.equipmentLoad).toBe(plain.equipmentLoad)
		expect(packed.coinsRemaining).toBe(plain.coinsRemaining - 50)
	})

	it('reads the bonus off the catalogue text, so the ladder scales', () => {
		const a = record('Slinger')
		for (const [name, bonus] of [
			['Backpack', 0],
			['Traveler\u2019s Backpack', 2],
			['Explorer\u2019s Backpack', 4],
		] as const) {
			const e = deriveEquipment({ ...a, startingEquipment: [{ item: name }] })
			expect(e.capacityBonus, name).toBe(bonus)
			expect(e.equipmentLoad, name).toBe(0)
		}
	})

	it('leaves no archetype encumbered after the backpack retrofit', () => {
		for (const a of deriveAll())
			expect(a.equipment.encumberedBy, a.record.name).toBe(0)
	})

	// A character may only ever learn one magic skill, at any rank. The Summoner
	// shipped with Arcana at rank 1 and Mysticism among its rank 0 skills.
	it('fails an archetype that records both magic skills', () => {
		const a = record('Summoner')
		a.suggestedSkills = a.suggestedSkills.replace('Streetwise', 'Mysticism')
		expect(() => deriveSkills(a)).toThrow(
			/Summoner.*only ever learn one magic skill/s,
		)
	})

	it('leaves every published archetype with at most one magic skill', () => {
		for (const a of deriveAll()) {
			const skills = [...a.skills.rank1, ...a.skills.rank0]
			const magic = skills.filter((s) => s === 'Arcana' || s === 'Mysticism')
			expect(magic.length, a.record.name).toBeLessThanOrEqual(1)
		}
	})

	// The array is one d8, one d4 and two d6 — the Tamer shipped with two d4s.
	it('fails an attribute array the rules cannot produce', () => {
		const a = record('Tamer')
		a.attributes = { STR: 6, AGI: 8, SPI: 4, MND: 4 }
		expect(() => validateAttributes(a)).toThrow(/Tamer.*array cannot produce/s)
	})

	it('accepts the all-d6 array and the standard spread', () => {
		const a = record('Tamer')
		for (const attributes of [
			{ STR: 6, AGI: 8, SPI: 6, MND: 4 },
			{ STR: 6, AGI: 6, SPI: 6, MND: 6 },
		])
			expect(() => validateAttributes({ ...a, attributes })).not.toThrow()
	})

	it('gives every published archetype a legal array', () => {
		for (const a of deriveAll())
			expect(() => validateAttributes(a.record), a.record.name).not.toThrow()
	})

	// Art of Fighting rank 1: "You learn two more Combat Arts for any melee
	// weapons." The count is not a pure function of weapon-skill ranks.
	it('adds the two Combat Arts a talent grants to the required count', () => {
		const a = record('Fighter')
		const withTalent = requiredCombatArts(a)
		const withoutTalent = requiredCombatArts({
			...a,
			recommendedTalents: a.recommendedTalents.filter(
				(t) => t.name !== 'Art of Fighting',
			),
		})
		expect(withTalent - withoutTalent).toBe(2)
		expect(withTalent).toBe(5)
	})

	// The Fighter's card read capacity 12 while its own talent list said "+2
	// carrying capacity" two lines above it.
	it('counts a talent carrying-capacity bonus, not only a backpack', () => {
		const a = record('Fighter')
		expect(deriveEquipment(a).talentCapacity).toBe(2)
		expect(deriveEquipment(a).carryCapacity).toBe(
			Math.floor(a.attributes.STR / 2) + 8 + 2,
		)
		const stripped = {
			...a,
			recommendedTalents: a.recommendedTalents.filter(
				(t) => t.name !== 'Bulky',
			),
		}
		expect(deriveEquipment(stripped).talentCapacity).toBe(0)
	})
})
