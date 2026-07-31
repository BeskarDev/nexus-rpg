import { CharacterDocument, Damage } from '@site/src/types/Character'

/**
 * The rendered damage of a weapon or spell — `"6/9/12 physical"` (M13 S4b).
 *
 * ## Why this is a util
 *
 * This arithmetic existed **three times**: inside `DamageFields` (deleted in S5), again inside
 * `QuickRefSection`, and it was about to be written a fourth time for the weapon
 * row's summary, which no longer holds the editor that used to compute it. Three
 * copies of a damage formula is the same hazard the S1 log recorded for effective
 * max HP — "a third derivation is where the three drift apart" — and damage is a
 * rule, so a copy that drifts is a wrong number at the table rather than a
 * cosmetic bug.
 *
 * The spell catalyst only applies to spells; a weapon passes `type: 'weapon'`
 * and it drops out, which is the one branch that differs between the two.
 */
/**
 * The numeric half alone, without the damage type appended (M13 S4c).
 *
 * The sheet renders the type as a sigil beside the numbers now, so the two parts
 * are wanted separately; `calculateDamageDisplay` still returns the whole string
 * for the places that need one (Quick Ref's flat item list).
 */
export const calculateDamageValue = (
	damage: Damage,
	type: 'weapon' | 'spell',
	character: Pick<CharacterDocument, 'statistics' | 'spells'>,
): string => {
	const { strength, agility, spirit, mind } = character.statistics
	const catalyst = type === 'spell' ? character.spells.spellCatalystDamage : 0

	const base = (() => {
		switch (damage.base) {
			case 'STR':
				return strength.value / 2
			case 'AGI':
				return agility.value / 2
			case 'SPI':
				return spirit.value / 2
			case 'MND':
				return mind.value / 2
			case '':
				return 0
			default:
				return damage.base as number
		}
	})()

	if (damage.staticDamage) {
		return `${base + damage.weapon + catalyst + damage.other}`
	}

	const weak = base + damage.weapon + catalyst + damage.other + damage.otherWeak
	const strong =
		base + damage.weapon * 2 + catalyst * 2 + damage.other + damage.otherStrong
	const critical =
		base +
		damage.weapon * 3 +
		catalyst * 3 +
		damage.other +
		damage.otherCritical

	return `${weak}/${strong}/${critical}`
}

/** The full reading, numbers and type — for surfaces that render one string. */
export const calculateDamageDisplay = (
	damage: Damage,
	type: 'weapon' | 'spell',
	character: Pick<CharacterDocument, 'statistics' | 'spells'>,
): string => `${calculateDamageValue(damage, type, character)} ${damage.type}`
