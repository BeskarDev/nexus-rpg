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
			attacks: state.attacks,
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
