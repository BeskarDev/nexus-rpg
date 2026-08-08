import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CreatureBuilderRootState } from '../features/CreatureBuilder/store'
import {
	calculateHP,
	calculateAV,
	calculateDefense,
	calculateAttributes,
	getWeaponDamage,
	getArchetypeData,
	calculateBaseDamage,
	formatDamageString,
} from '../utils/typescript/creature/creatureBuilderCalculations'
import { BuiltCreature } from '../types/CreatureBuilder'

export const useCreatureBuilderState = () => {
	const state = useSelector(
		(state: CreatureBuilderRootState) => state.creatureBuilder,
	)

	const builtCreature: BuiltCreature | null = useMemo(() => {
		if (state.tier === null || state.tier === undefined) {
			return null
		}

		// Calculate attributes
		const attributes = calculateAttributes(
			state.tier,
			state.archetype,
			state.type,
			state.customStr,
			state.customAgi,
			state.customSpi,
			state.customMnd,
		)

		// Calculate defenses
		const parry = calculateDefense(
			state.tier,
			state.archetype,
			state.size,
			'parry',
			state.customParry,
		)
		const dodge = calculateDefense(
			state.tier,
			state.archetype,
			state.size,
			'dodge',
			state.customDodge,
		)
		const resist = calculateDefense(
			state.tier,
			state.archetype,
			state.size,
			'resist',
			state.customResist,
		)

		// Calculate HP and AV
		const baseHp = calculateHP(
			state.tier,
			state.archetype,
			state.category,
			state.customHP,
		)
		const av = calculateAV(
			state.tier,
			state.archetype,
			state.size,
			state.customAV,
			state.customArmorType,
		)

		// Determine final armor type
		const archetypeData = getArchetypeData(state.archetype)
		const armorType =
			state.customArmorType ?? archetypeData?.armorType ?? 'light'

		// Get weapon damage
		const weaponDamage = getWeaponDamage(state.tier, state.archetype)

		/**
		 * Attack damage is DERIVED from the tier unless the author overrode it.
		 *
		 * This mirrors `creatureBuilderCLI.ts` exactly, which has always worked this
		 * way: an attack stores a `weaponDamage` MODIFIER, not a damage figure, and
		 * the figure is computed at render time. The React builder computed
		 * `weaponDamage` above and then discarded it, passing `state.attacks`
		 * through untouched — so an attack added at tier 3 still read as tier 3
		 * after the tier was changed to 7, which is the bug this fixes.
		 *
		 * `damage` is the override channel, the same shape as `customHP` / `customAV`
		 * elsewhere in the builder: set it and it is used verbatim, leave it empty
		 * and the tier decides.
		 */
		const attributeDice: Record<string, string> = {
			STR: attributes.str,
			AGI: attributes.agi,
			SPI: attributes.spi,
			MND: attributes.mnd,
		}
		const resolvedAttacks = state.attacks.map((attack) => {
			if (attack.damage && attack.damage.trim()) return attack
			const die = attributeDice[(attack.baseAttribute ?? '').toUpperCase()]
			// No attribute means the attack is pure weapon damage, base 0 — the
			// CLI's third branch.
			const base = die ? calculateBaseDamage(die) : 0
			return {
				...attack,
				damage: formatDamageString(
					base,
					weaponDamage + (attack.weaponDamage ?? 0),
				),
			}
		})

		// Format skills as strings with ranks
		const formattedSkills = state.skills.map(
			(skill) => `${skill.name} (${skill.rank})`,
		)

		return {
			name: state.name || `Tier ${state.tier} ${state.category} ${state.type}`,
			tier: state.tier,
			category: state.category,
			size: state.size,
			type: state.type,
			subtype: state.subtype,
			archetype: state.archetype,
			baseHp: baseHp.base,
			baseTier: state.tier,
			hp: baseHp.display,
			av,
			armorType,
			str: attributes.str,
			agi: attributes.agi,
			spi: attributes.spi,
			mnd: attributes.mnd,
			parry,
			dodge,
			resist,
			skills: formattedSkills,
			immunities: state.immunities,
			resistances: state.resistances,
			weaknesses: state.weaknesses,
			attacks: resolvedAttacks,
			abilities: state.abilities,
		}
	}, [
		state.tier,
		state.category,
		state.size,
		state.type,
		state.subtype,
		state.archetype,
		state.name,
		state.customHP,
		state.customAV,
		state.customArmorType,
		state.customStr,
		state.customAgi,
		state.customSpi,
		state.customMnd,
		state.customParry,
		state.customDodge,
		state.customResist,
		state.skills,
		state.immunities,
		state.resistances,
		state.weaknesses,
		state.attacks,
		state.abilities,
	])

	return { state, builtCreature }
}
