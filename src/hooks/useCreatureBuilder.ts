import { useState, useMemo } from 'react'
import {
	CreatureCategory,
	CreatureBuilderState,
	BuiltCreature,
	CreatureAttack,
	CreatureAbility,
} from '../types/CreatureBuilder'
import { buildCreature } from '../utils/typescript/creature/creatureBuilderCalculations'

export function useCreatureBuilder() {
	const [state, setState] = useState<CreatureBuilderState>({
		tier: null,
		category: 'Basic',
		size: 'Medium',
		type: 'Humanoid',
		archetype: 'Standard',
		name: '',
		customHP: null,
		customAV: null,
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
	})

	const builtCreature = useMemo<BuiltCreature | null>(() => {
		if (state.tier === null) return null
		return buildCreature(state)
	}, [state])

	const handleTierChange = (tier: number) => {
		setState((prev) => ({ ...prev, tier }))
	}

	const handleCategoryChange = (category: CreatureCategory) => {
		setState((prev) => ({ ...prev, category }))
	}

	const handleSizeChange = (size: string) => {
		setState((prev) => ({ ...prev, size }))
	}

	const handleTypeChange = (type: string) => {
		setState((prev) => ({ ...prev, type }))
	}

	const handleArchetypeChange = (archetype: string) => {
		setState((prev) => ({ ...prev, archetype }))
	}

	const handleNameChange = (name: string) => {
		setState((prev) => ({ ...prev, name }))
	}

	// Custom stat handlers
	const handleCustomHP = (hp: number | null) => {
		setState((prev) => ({ ...prev, customHP: hp }))
	}

	const handleCustomAV = (av: number | null) => {
		setState((prev) => ({ ...prev, customAV: av }))
	}

	const handleCustomAttribute = (
		attr: 'str' | 'agi' | 'spi' | 'mnd',
		value: string | null,
	) => {
		const key =
			`custom${attr.charAt(0).toUpperCase() + attr.slice(1)}` as keyof CreatureBuilderState
		setState((prev) => ({ ...prev, [key]: value }))
	}

	const handleCustomDefense = (
		defense: 'parry' | 'dodge' | 'resist',
		value: number | null,
	) => {
		const key =
			`custom${defense.charAt(0).toUpperCase() + defense.slice(1)}` as keyof CreatureBuilderState
		setState((prev) => ({ ...prev, [key]: value }))
	}

	// Array handlers
	const handleSkillsChange = (skills: string[]) => {
		setState((prev) => ({ ...prev, skills }))
	}

	const handleImmunitiesChange = (immunities: string[]) => {
		setState((prev) => ({ ...prev, immunities }))
	}

	const handleResistancesChange = (resistances: string[]) => {
		setState((prev) => ({ ...prev, resistances }))
	}

	const handleWeaknessesChange = (weaknesses: string[]) => {
		setState((prev) => ({ ...prev, weaknesses }))
	}

	const handleAttacksChange = (attacks: CreatureAttack[]) => {
		setState((prev) => ({ ...prev, attacks }))
	}

	const handleAbilitiesChange = (abilities: CreatureAbility[]) => {
		setState((prev) => ({ ...prev, abilities }))
	}

	const resetBuilder = () => {
		setState({
			tier: null,
			category: 'Basic',
			size: 'Medium',
			type: 'Humanoid',
			archetype: 'Standard',
			name: '',
			customHP: null,
			customAV: null,
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
		})
	}

	return {
		state,
		builtCreature,
		handleTierChange,
		handleCategoryChange,
		handleSizeChange,
		handleTypeChange,
		handleArchetypeChange,
		handleNameChange,
		handleCustomHP,
		handleCustomAV,
		handleCustomAttribute,
		handleCustomDefense,
		handleSkillsChange,
		handleImmunitiesChange,
		handleResistancesChange,
		handleWeaknessesChange,
		handleAttacksChange,
		handleAbilitiesChange,
		resetBuilder,
	}
}
