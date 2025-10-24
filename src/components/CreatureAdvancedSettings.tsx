import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	Box,
	Paper,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	TextField,
	Grid,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Button,
	IconButton,
	Chip,
	Autocomplete,
	Tooltip,
} from '@mui/material'
import {
	ExpandMore,
	Add,
	Delete,
	Settings,
	Tune as TuneIcon,
	Edit,
	Shield,
} from '@mui/icons-material'
import { CreatureAttack, CreatureAbility, CreatureSkill } from '../types/CreatureBuilder'
import { creatureBuilderActions } from '../features/CreatureBuilder/creatureBuilderReducer'
import { useCreatureBuilderState } from '../hooks/useCreatureBuilderState'
import { OFFICIAL_SKILLS, getSkillChipColor } from '../constants/skills'
import { getSkillRanks, calculateDefense, getTierData, getArchetypeData, calculateBaseDamage, formatDamageString, getWeaponDamage } from '../utils/creatureBuilderCalculations'
import { ActionType, ACTION_TYPES, getActionTypeIcon } from '../types/ActionType'

const ATTRIBUTE_DICE = ['d4-2', 'd4-1', 'd4', 'd6', 'd8', 'd10', 'd12', 'd12+1', 'd12+2']

const HP_VALUES = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
const AV_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20]

// Helper to get tier for HP value
const getHPTier = (hp: number): string => {
	const tierMap: Record<number, number> = { 5: 0, 10: 1, 20: 2, 30: 3, 40: 4, 50: 5, 60: 6, 70: 7, 80: 8, 90: 9, 100: 10 }
	return tierMap[hp] !== undefined ? ` (T${tierMap[hp]})` : ''
}

// Helper to get tier for AV value (light/heavy)
const getAVTier = (av: number, isHeavy: boolean): string => {
	const lightMap: Record<number, number> = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10 }
	const heavyMap: Record<number, number> = { 1: 0, 2: 1, 4: 2, 6: 3, 8: 4, 10: 5, 12: 6, 14: 7, 16: 8, 18: 9, 20: 10 }
	const tierMap = isHeavy ? heavyMap : lightMap
	return tierMap[av] !== undefined ? ` (T${tierMap[av]})` : ''
}

// Get valid HP values for tier (within 2 tiers)
const getValidHPValues = (tier: number): number[] => {
	const minTier = Math.max(0, tier - 2)
	const maxTier = Math.min(10, tier + 2)
	const minHP = getTierData(minTier)?.hp || 0
	const maxHP = getTierData(maxTier)?.hp || 100
	
	return HP_VALUES.filter(hp => hp >= minHP && hp <= maxHP)
}

// Get valid AV values for armor type and tier (within 2 tiers)
const getValidAVValues = (isHeavy: boolean, tier: number): number[] => {
	const minTier = Math.max(0, tier - 2)
	const maxTier = Math.min(10, tier + 2)
	const minAV = isHeavy ? (getTierData(minTier)?.avHeavy || 1) : (getTierData(minTier)?.avLight || 0)
	const maxAV = isHeavy ? (getTierData(maxTier)?.avHeavy || 20) : (getTierData(maxTier)?.avLight || 10)
	
	const allValues = isHeavy 
		? [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
		: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	
	return allValues.filter(av => av >= minAV && av <= maxAV)
}

// Get tier from AV value for specific armor type
const getTierFromAV = (av: number, isHeavy: boolean): number | null => {
	const lightMap: Record<number, number> = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10 }
	const heavyMap: Record<number, number> = { 1: 0, 2: 1, 4: 2, 6: 3, 8: 4, 10: 5, 12: 6, 14: 7, 16: 8, 18: 9, 20: 10 }
	const tierMap = isHeavy ? heavyMap : lightMap
	return tierMap[av] ?? null
}

// Convert AV from one armor type to another (preserving tier)
const convertAVBetweenArmorTypes = (av: number, fromHeavy: boolean, toHeavy: boolean): number | null => {
	if (fromHeavy === toHeavy) return av
	
	const tier = getTierFromAV(av, fromHeavy)
	if (tier === null) return null
	
	const lightValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	const heavyValues = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
	const targetValues = toHeavy ? heavyValues : lightValues
	
	return targetValues[tier] ?? null
}

const WEAPON_PROPERTIES = [
	'agile',
	'crush',
	'pierce',
	'slash',
	'reach',
	'light',
	'two-handed',
	'blast',
	'line',
	'cone',
]

const COMMON_CONDITIONS = [
	'bleeding',
	'blinded',
	'charmed',
	'confused',
	'deafened',
	'exhausted',
	'frightened',
	'grappled',
	'incapacitated',
	'invisible',
	'paralyzed',
	'petrified',
	'poisoned',
	'prone',
	'restrained',
	'stunned',
	'unconscious',
]

const DAMAGE_TYPES = [
	'physical',
	'fire',
	'frost',
	'lightning',
	'acid',
	'poison',
	'necrotic',
	'radiant',
	'psychic',
]

const PRESET_ATTACKS = [
	{ name: 'Bite', properties: ['crush'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit vs equal/smaller Size, target is grappled. While grappled, can\'t attack other targets.' },
	{ name: 'Bite', properties: ['pierce'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit, target suffers bleeding (2 x Tier).' },
	{ name: 'Bite', properties: ['agile', 'pierce'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit, target takes lasting poison damage (2 x Tier) and is poisoned for short duration.' },
	{ name: 'Claw', properties: ['light', 'slash'], damageType: 'physical', baseAttribute: '', weaponDamage: -1, damage: '', description: 'On strong/critical hit vs equal/smaller Size, target is knocked prone.' },
	{ name: 'Claw', properties: ['slash'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit, target suffers bleeding (2 x Tier).' },
	{ name: 'Slam', properties: ['crush'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit, target is pushed close.' },
	{ name: 'Slam', properties: ['crush'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit, target falls prone.' },
	{ name: 'Beak', properties: ['agile', 'pierce'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit, target suffers bleeding (2 x Tier).' },
	{ name: 'Talons', properties: ['agile', 'light', 'slash'], damageType: 'physical', baseAttribute: '', weaponDamage: -1, damage: '', description: 'On strong/critical hit, target suffers bleeding (1 x Tier).' },
	{ name: 'Horn', properties: ['pierce'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit, target is either knocked prone or pushed close (your choice).' },
	{ name: 'Antlers', properties: ['pierce'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit, target is either knocked prone or pushed close (your choice).' },
	{ name: 'Tail Swipe', properties: ['crush', 'reach'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit, target is pushed close.' },
	{ name: 'Tusks', properties: ['crush'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: '' },
	{ name: 'Pincer', properties: ['crush'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit vs equal/smaller Size, target is grappled. While grappled, can\'t attack other targets with same pincer.' },
	{ name: 'Mandibles', properties: ['crush'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit vs equal/smaller Size, target is grappled. While grappled, can\'t attack other targets.' },
	{ name: 'Constrict', properties: ['crush'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit vs equal/smaller Size, target is grappled and restrained. While constricted, can\'t attack other targets.' },
	{ name: 'Fist', properties: ['light'], damageType: 'physical', baseAttribute: '', weaponDamage: -1, damage: '', description: '' },
	{ name: 'Kick', properties: ['crush'], damageType: 'physical', baseAttribute: '', weaponDamage: 1, damage: '', description: 'Can only be used if skips all Movement this turn (before and after attack).' },
	{ name: 'Tongue', properties: ['agile', 'reach'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'Deals no damage. On hit, target is grappled and pulled close. While grappled, can\'t attack other targets.' },
	{ name: 'Death Roll', properties: ['crush'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'Only usable against target grappled by this creature. Gains +1 boon on roll. On hit, target is knocked prone.' },
	{ name: 'Web', properties: ['thrown (close/short)'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'Deals no damage. On hit, target is restrained. Web has 10 HP per Tier (min. 1), 0 AV, 8 Defense. Target can escape as Action (Strength + Agility vs Parry).' },
	{ name: 'Rock Throw', properties: ['ammo', 'crush', 'thrown (close/short)'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: '' },
	{ name: 'Screech', properties: ['blast'], damageType: 'blast', baseAttribute: '', weaponDamage: -1, damage: '', description: 'Cone in short range vs all creatures (Agility + Perception vs Resist). Ignores 1/2 AV. Once per scene.' },
	{ name: 'Lightning Strike', properties: ['thrown (medium)'], damageType: 'lightning', baseAttribute: '', weaponDamage: -1, damage: '', description: 'On strong/critical hit, target is briefly staggered.' },
	{ name: 'Fire Touch', properties: ['agile'], damageType: 'fire', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit, inflicts burning (2 x Tier) for short duration.' },
	{ name: 'Flame Bolt', properties: ['thrown (short/medium)'], damageType: 'fire', baseAttribute: '', weaponDamage: -1, damage: '', description: 'On strong/critical hit, inflicts burning (2 x Tier) for short duration.' },
	{ name: 'Tentacles', properties: ['pierce'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'On strong/critical hit, target is grappled and poisoned for short duration.' },
	{ name: 'Whelm', properties: ['crush'], damageType: 'physical', baseAttribute: '', weaponDamage: 0, damage: '', description: 'Engulfs targets of equal/smaller Size. On hit, targets are grappled, restrained, and suffocating.' },
]


const PRESET_ABILITIES = [
	// Movement & Mobility
	{ name: 'Flying (Wings)', actionType: 'Passive', properties: '', description: 'Can fly with +1 Movement per turn. If on ground, can\'t use more than 1 Movement per turn.' },
	{ name: 'Flying (Hover)', actionType: 'Passive', properties: '', description: 'Can fly freely by hovering with +1 Movement per turn.' },
	{ name: 'Fast Movement', actionType: 'Passive', properties: '', description: '+1 Movement and can cover twice normal distance during travel.' },
	{ name: 'Slow Movement', actionType: 'Passive', properties: '', description: 'Can\'t spend more than 1 Movement per turn.' },
	{ name: 'Natural Climber', actionType: 'Passive', properties: '', description: 'Can climb without treating it as difficult terrain.' },
	{ name: 'Wall Climb', actionType: 'Passive', properties: '', description: 'Can climb on any vertical surface without rolling.' },
	{ name: 'Spider Climb', actionType: 'Passive', properties: '', description: 'Can climb on any surface, even upside down, without rolling.' },
	{ name: 'Burrow', actionType: 'Passive', properties: '', description: 'Can move freely through loose earth, treating it as difficult terrain.' },
	{ name: 'Earth Glide', actionType: 'Passive', properties: '', description: 'Can burrow through natural earth and stone as normal Movement.' },
	{ name: 'Strong Leap', actionType: 'Passive', properties: '', description: 'Can jump up to short distance without rolling, even without moving before.' },
	
	// Aquatic Abilities
	{ name: 'Aquatic', actionType: 'Passive', properties: '', description: 'Immune to drowning. Can swim with normal Movement.' },
	{ name: 'Aquatic (Fast)', actionType: 'Passive', properties: '', description: 'Immune to drowning. Can swim with +2 Movement per turn.' },
	{ name: 'Amphibious', actionType: 'Passive', properties: '', description: 'Can hold breath underwater for medium duration. Can swim with normal Movement.' },
	{ name: 'Deep Breath', actionType: 'Passive', properties: '', description: 'Can hold breath underwater for short duration. Can swim with normal Movement.' },
	
	// Senses
	{ name: 'Keen Scent', actionType: 'Passive', properties: '', description: 'Gains +1 boon on Perception rolls based on smell.' },
	{ name: 'Keen Eyes', actionType: 'Passive', properties: '', description: 'Gains +1 boon on Perception rolls based on sight.' },
	{ name: 'Night Vision', actionType: 'Passive', properties: '', description: 'Can see one range category further from sources of bright and dim light.' },
	{ name: 'Darkvision', actionType: 'Passive', properties: 'medium/long', description: 'Can see at medium range in absolute darkness as bright light and up to long distance as dim light.' },
	{ name: 'Blindsight', actionType: 'Passive', properties: 'close', description: 'Can perceive location of creatures and objects within range that aren\'t behind full cover.' },
	{ name: 'Echolocation', actionType: 'Passive', properties: 'medium', description: 'Can perceive surroundings without relying on sight within range, even around corners or behind cover.' },
	{ name: 'Tremorsense', actionType: 'Passive', properties: 'medium', description: 'Can perceive location of moving creatures and objects on connected surfaces in medium range.' },
	{ name: 'Magic Sense', actionType: 'Passive', properties: 'long', description: 'Can intuitively sense sources of magic within long range.' },
	
	// Combat Abilities
	{ name: 'Pack Tactics', actionType: 'Passive', properties: '', description: 'Gains +1 boon on attacks against enemy in melee range if has more allies in melee range than enemies.' },
	{ name: 'Multiattack', actionType: 'Passive', properties: '', description: 'Can make two attacks as Combat Action.' },
	{ name: 'Pounce', actionType: 'Passive', properties: '', description: 'If spends Movement towards target during turn, gains +1 boon on attack. On strong/critical hit vs equal/smaller Size, target is knocked prone.' },
	{ name: 'Gore Attack', actionType: 'Passive', properties: '', description: 'After moving at least short distance in straight line, gains +1 boon on next attack. On hit, increase SL by one step (max. critical).' },
	{ name: 'Dive Attack', actionType: 'Passive', properties: '', description: 'After flying at least short distance downwards, gains +1 boon on next attack. On hit, increase SL by one step (max. critical).' },
	{ name: 'Ambush Predator', actionType: 'Passive', properties: '', description: 'When hits unaware enemy with attack for first time during scene, increase SL by one step (max. critical).' },
	{ name: 'Frightful Presence', actionType: 'Action', properties: 'Recharge 5-6', description: 'All enemies within close distance must resist or become frightened.' },
	{ name: 'Intimidating Roar', actionType: 'Action', properties: 'Once per combat', description: 'Creatures within short range must resist (Strength + Fortitude vs Resist) or become frightened. Can resist at start of turn.' },
	
	// Defensive Abilities
	{ name: 'Magic Resistance', actionType: 'Passive', properties: '', description: 'Gains +1 boon on saving throws against spells and magical effects.' },
	{ name: 'Spell Reflection', actionType: 'Triggered', properties: 'Once per scene', description: 'When targeted by spell, can reflect it back at caster.' },
	{ name: 'Regeneration', actionType: 'Passive', properties: '', description: 'Regains 5 HP at start of turn if has at least 1 HP.' },
	{ name: 'Relentless', actionType: 'Triggered', properties: 'Once per day', description: 'When would suffer Wound, can choose to ignore it.' },
	{ name: 'Hard Shell', actionType: 'Quick Action', properties: '', description: 'Can use Guard Quick Action treating shell as shield.' },
	{ name: 'Shell Defense', actionType: 'Quick Action', properties: '', description: 'Can withdraw into shell, gaining Guard effects and +2 AV but unable to move or attack until emerges.' },
	
	// Special Forms
	{ name: 'Air Form', actionType: 'Passive', properties: '', description: 'Can move through any space as narrow as one centimetre.' },
	{ name: 'Water Form', actionType: 'Passive', properties: '', description: 'Can move through any space as narrow as one centimetre. If suffers frost damage, is briefly slowed.' },
	{ name: 'Fire Form', actionType: 'Passive', properties: '', description: 'Can move through any space as narrow as keyhole. Illuminates short distance in bright light. Attackers at melee range suffer fire damage.' },
	{ name: 'Undead Nature', actionType: 'Passive', properties: '', description: 'Doesn\'t need to breathe, eat, drink, or sleep.' },
	
	// Utility
	{ name: 'Powerful Build', actionType: 'Passive', properties: '', description: 'Add +2 to encumbrance and over-encumbrance limits.' },
	{ name: 'Beast of Burden', actionType: 'Passive', properties: '', description: 'Can be of large Size even for Tier that normally doesn\'t allow that Size.' },
	{ name: 'Track Scent', actionType: 'Passive', properties: '', description: 'Can track scent trail for up to day after made, unless foreign force influenced scent (heavy rain, etc).' },
	{ name: 'Tool Usage', actionType: 'Passive', properties: '', description: 'Can use simple tools and weapons (only Quality 1) after being trained with them for at least medium duration.' },
	{ name: 'Web Walker', actionType: 'Passive', properties: '', description: 'Can move on webs normally. Knows exact location of any creature touching web while standing on it.' },
	{ name: 'Swallow', actionType: 'Passive', properties: '', description: 'Can swallow one smaller creature. Target becomes blinded, restrained, takes lasting acid damage. Released when takes Wound or dies (spit out prone).' },
	{ name: 'Invisibility', actionType: 'Action', properties: 'Once per scene', description: 'Becomes invisible until attacks or scene ends.' },
]

const CONDITIONS = [
	'bleeding',
	'blinded',
	'burning',
	'charmed',
	'deafened',
	'encumbered',
	'exhausted',
	'fatigued',
	'frightened',
	'grappled',
	'incapacitated',
	'invisible',
	'paralyzed',
	'petrified',
	'poisoned',
	'prone',
	'restrained',
	'stunned',
	'unconscious',
]

const getDamageTypeColor = (type: string): string => {
	const colorMap: Record<string, string> = {
		physical: '#64748b',
		fire: '#dc2626',
		frost: '#0891b2',
		lightning: '#eab308',
		acid: '#84cc16',
		poison: '#01752b',
		necrotic: '#7c3aed',
		radiant: '#d97706',
		psychic: '#ec4899',
	}
	return colorMap[type] || '#9A9A9A'
}

const getConditionColor = (condition: string): string => {
	const colorMap: Record<string, string> = {
		bleeding: '#dc2626',
		blinded: '#64748b',
		charmed: '#ec4899',
		confused: '#a855f7',
		deafened: '#78716c',
		exhausted: '#57534e',
		frightened: '#7c2d12',
		grappled: '#a16207',
		incapacitated: '#71717a',
		invisible: '#cbd5e1',
		paralyzed: '#0891b2',
		petrified: '#78716c',
		poisoned: '#15803d',
		prone: '#a16207',
		restrained: '#92400e',
		stunned: '#eab308',
		unconscious: '#3f3f46',
	}
	return colorMap[condition] || '#9A9A9A'
}

export const CreatureAdvancedSettings: React.FC = () => {
	const dispatch = useDispatch()
	const { state, builtCreature } = useCreatureBuilderState()
	const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(null)
	const [editingSkillRank, setEditingSkillRank] = useState<number>(1)
	const [showCustomAttackForm, setShowCustomAttackForm] = useState(false)
	const [showCustomAbilityForm, setShowCustomAbilityForm] = useState(false)
	const [editingAttackIndex, setEditingAttackIndex] = useState<number | null>(null)
	const [editingAbilityIndex, setEditingAbilityIndex] = useState<number | null>(null)
	const [attackSearchInput, setAttackSearchInput] = useState('')
	const [abilitySearchInput, setAbilitySearchInput] = useState('')
	
	if (!builtCreature) return null
	
	const {
		customHP,
		customAV,
		customArmorType,
		customStr,
		customAgi,
		customSpi,
		customMnd,
		customParry,
		customDodge,
		customResist,
		skills,
		immunities,
		resistances,
		weaknesses,
		attacks,
		abilities,
	} = state
	
	const {
		baseHp: baseHP,
		av: baseAV,
		str: baseStr,
		agi: baseAgi,
		spi: baseSpi,
		mnd: baseMnd,
		parry: baseParry,
		dodge: baseDodge,
		resist: baseResist,
	} = builtCreature
	
	// Determine current armor type (custom or from archetype)
	const archetypeData = getArchetypeData(state.archetype)
	const currentArmorType = customArmorType ?? archetypeData?.armorType ?? 'light'
	
	// Calculate base AV for the current armor type
	const tierData = getTierData(state.tier)
	const baseAVLight = tierData?.avLight ?? 0
	const baseAVHeavy = tierData?.avHeavy ?? 0
	const baseAVForCurrentType = currentArmorType === 'heavy' ? baseAVHeavy : baseAVLight
	
	// Calculate true base defenses (without custom overrides) for display in caption
	const trueBaseParry = calculateDefense(state.tier, state.archetype, state.size, 'parry', null)
	const trueBaseDodge = calculateDefense(state.tier, state.archetype, state.size, 'dodge', null)
	const trueBaseResist = calculateDefense(state.tier, state.archetype, state.size, 'resist', null)
	
	const [newAttack, setNewAttack] = useState<CreatureAttack>({
		name: '',
		properties: [],
		damage: '',
		weaponDamage: getWeaponDamage(state.tier || 0, state.archetype),
		damageType: 'physical',
		baseAttribute: baseStr,
		description: '',
	})

	const [newAbility, setNewAbility] = useState<CreatureAbility>({
		name: '',
		description: '',
		actionType: 'Passive',
		properties: '',
	})

	const handleAddAttack = () => {
		if (newAttack.name) {
			// Calculate damage using weaponDamage field
			const finalAttack = { ...newAttack }
			if (finalAttack.baseAttribute && finalAttack.weaponDamage !== undefined) {
				const baseDamage = calculateBaseDamage(finalAttack.baseAttribute)
				finalAttack.damage = formatDamageString(baseDamage, finalAttack.weaponDamage)
			}
			
			dispatch(creatureBuilderActions.setAttacks([...attacks, finalAttack]))
			setNewAttack({ name: '', properties: [], damage: '', weaponDamage: getWeaponDamage(state.tier || 0, state.archetype), damageType: 'physical', baseAttribute: baseStr, description: '' })
		}
	}

	const handleDeleteAttack = (index: number) => {
		if (editingAttackIndex === index) {
			setEditingAttackIndex(null)
		} else if (editingAttackIndex !== null && editingAttackIndex > index) {
			setEditingAttackIndex(editingAttackIndex - 1)
		}
		dispatch(creatureBuilderActions.setAttacks(attacks.filter((_, i) => i !== index)))
	}

	const handleUpdateAttack = (index: number, updatedAttack: CreatureAttack) => {
		// Calculate damage using weaponDamage field
		const finalAttack = { ...updatedAttack }
		if (finalAttack.baseAttribute && finalAttack.weaponDamage !== undefined) {
			const baseDamage = calculateBaseDamage(finalAttack.baseAttribute)
			finalAttack.damage = formatDamageString(baseDamage, finalAttack.weaponDamage)
		}
		
		const updatedAttacks = [...attacks]
		updatedAttacks[index] = finalAttack
		dispatch(creatureBuilderActions.setAttacks(updatedAttacks))
	}

	const handleCancelEditAttack = () => {
		setEditingAttackIndex(null)
	}

	const handleAddAbility = () => {
		if (newAbility.name) {
			dispatch(creatureBuilderActions.setAbilities([...abilities, newAbility]))
			setNewAbility({ name: '', description: '', actionType: 'Passive', properties: '' })
		}
	}

	const handleDeleteAbility = (index: number) => {
		if (editingAbilityIndex === index) {
			setEditingAbilityIndex(null)
		} else if (editingAbilityIndex !== null && editingAbilityIndex > index) {
			setEditingAbilityIndex(editingAbilityIndex - 1)
		}
		dispatch(creatureBuilderActions.setAbilities(abilities.filter((_, i) => i !== index)))
	}

	const handleUpdateAbility = (index: number, updatedAbility: CreatureAbility) => {
		const updatedAbilities = [...abilities]
		updatedAbilities[index] = updatedAbility
		dispatch(creatureBuilderActions.setAbilities(updatedAbilities))
	}

	const handleCancelEditAbility = () => {
		setEditingAbilityIndex(null)
	}

	return (
		<Paper elevation={0} sx={{ mt: 1.5, border: 1, borderColor: 'divider' }}>
			<Box sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1, borderBottom: 1, borderColor: 'divider' }}>
				<TuneIcon fontSize="small" />
				<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
					Advanced Settings
				</Typography>
			</Box>

			{/* Custom Stats Accordion */}
			<Accordion sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}>
				<AccordionSummary 
					expandIcon={<ExpandMore />}
					sx={{ minHeight: 40, '& .MuiAccordionSummary-content': { my: 0.5 } }}
				>
					<Typography variant="body2">Custom Stats Override</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ pt: 0 }}>
					<Grid container spacing={2}>
					{/* HP and AV */}
					<Grid item xs={6}>
						<FormControl fullWidth size="small">
							<InputLabel>HP</InputLabel>
							<Select
								value={customHP ?? ''}
								label="HP"
								onChange={(e) =>
									dispatch(creatureBuilderActions.setCustomHP(
										e.target.value ? parseInt(e.target.value as string) : null))
								}
							>
								<MenuItem value="">
									<em>Base ({baseHP})</em>
								</MenuItem>
								{getValidHPValues(state.tier).map((hp) => (
									<MenuItem key={hp} value={hp}>
										{hp}{getHPTier(hp)}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'flex-start' }}>
							<FormControl fullWidth size="small">
								<InputLabel>AV</InputLabel>
								<Select
									value={customAV ?? ''}
									label="AV"
									onChange={(e) =>
										dispatch(creatureBuilderActions.setCustomAV(
											e.target.value ? parseInt(e.target.value as string) : null))
									}
								>
									<MenuItem value="">
										<em>Base ({baseAVForCurrentType})</em>
									</MenuItem>
									{getValidAVValues(currentArmorType === 'heavy', state.tier).map((av) => (
										<MenuItem key={av} value={av}>
											{av}{getAVTier(av, currentArmorType === 'heavy')}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<Tooltip title={currentArmorType === 'heavy' ? 'Switch to Light Armor' : 'Switch to Heavy Armor'} arrow>
								<IconButton
									size="small"
									onClick={() => {
										const newType = currentArmorType === 'heavy' ? 'light' : 'heavy'
										// Only set custom if different from archetype default
										const archetypeDefault = archetypeData?.armorType ?? 'light'
										dispatch(creatureBuilderActions.setCustomArmorType(
											newType === archetypeDefault ? null : newType
										))
										
										// Convert current AV to equivalent tier in new armor type
										if (customAV !== null && customAV !== undefined) {
											const convertedAV = convertAVBetweenArmorTypes(
												customAV,
												currentArmorType === 'heavy',
												newType === 'heavy'
											)
											if (convertedAV !== null) {
												dispatch(creatureBuilderActions.setCustomAV(convertedAV))
											}
										} else {
											// If using base value, convert it too
											const currentBaseAV = parseInt(baseAV)
											const convertedBaseAV = convertAVBetweenArmorTypes(
												currentBaseAV,
												currentArmorType === 'heavy',
												newType === 'heavy'
											)
											if (convertedBaseAV !== null) {
												dispatch(creatureBuilderActions.setCustomAV(convertedBaseAV))
											}
										}
									}}
									sx={{
										mt: 0.5,
										border: 1,
										borderColor: currentArmorType === 'heavy' ? 'primary.main' : 'divider',
										bgcolor: currentArmorType === 'heavy' ? 'action.selected' : 'transparent',
										color: currentArmorType === 'heavy' ? 'primary.main' : 'text.secondary',
									}}
								>
									<Shield fontSize="small" />
								</IconButton>
							</Tooltip>
						</Box>
					</Grid>					{/* Attributes */}
					<Grid item xs={12}>
						<Typography variant="caption" sx={{ display: 'block', mt: 1, mb: 0.5, fontWeight: 600, color: 'text.secondary' }}>
							Attributes (Base: STR {baseStr}, AGI {baseAgi}, SPI {baseSpi}, MND {baseMnd})
						</Typography>
					</Grid>
					<Grid item xs={6} md={3}>
						<FormControl fullWidth size="small">
							<InputLabel>STR</InputLabel>
							<Select
								value={customStr ?? ''}
								label="STR"
								onChange={(e) =>
									dispatch(creatureBuilderActions.setCustomAttribute({
										attr: 'str', value:
										e.target.value || null })
									)
								}
							>
								<MenuItem value="">
									<em>Base ({baseStr})</em>
								</MenuItem>
								{ATTRIBUTE_DICE.map((die) => (
									<MenuItem key={die} value={die}>
										{die}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} md={3}>
						<FormControl fullWidth size="small">
							<InputLabel>AGI</InputLabel>
							<Select
								value={customAgi ?? ''}
								label="AGI"
								onChange={(e) =>
									dispatch(creatureBuilderActions.setCustomAttribute({
										attr: 'agi', value:
										e.target.value || null })
									)
								}
							>
								<MenuItem value="">
									<em>Base ({baseAgi})</em>
								</MenuItem>
								{ATTRIBUTE_DICE.map((die) => (
									<MenuItem key={die} value={die}>
										{die}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} md={3}>
						<FormControl fullWidth size="small">
							<InputLabel>SPI</InputLabel>
							<Select
								value={customSpi ?? ''}
								label="SPI"
								onChange={(e) =>
									dispatch(creatureBuilderActions.setCustomAttribute({
										attr: 'spi', value:
										e.target.value || null })
									)
								}
							>
								<MenuItem value="">
									<em>Base ({baseSpi})</em>
								</MenuItem>
								{ATTRIBUTE_DICE.map((die) => (
									<MenuItem key={die} value={die}>
										{die}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={6} md={3}>
						<FormControl fullWidth size="small">
							<InputLabel>MND</InputLabel>
							<Select
								value={customMnd ?? ''}
								label="MND"
								onChange={(e) =>
									dispatch(creatureBuilderActions.setCustomAttribute({
										attr: 'mnd', value:
										e.target.value || null })
									)
								}
							>
								<MenuItem value="">
									<em>Base ({baseMnd})</em>
								</MenuItem>
								{ATTRIBUTE_DICE.map((die) => (
									<MenuItem key={die} value={die}>
										{die}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>					{/* Defenses */}
					<Grid item xs={12}>
						<Typography variant="caption" sx={{ display: 'block', mt: 1, mb: 0.5, fontWeight: 600, color: 'text.secondary' }}>
							Defenses (Base: Parry {trueBaseParry}, Dodge {trueBaseDodge}, Resist {trueBaseResist})
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<TextField
							size="small"
							fullWidth
							label="Parry"
							type="number"
							value={customParry ?? ''}
							onChange={(e) =>
								dispatch(creatureBuilderActions.setCustomDefense({
								defense: 'parry',
								value: e.target.value ? parseInt(e.target.value) : null
							}))
						}
						placeholder={trueBaseParry?.toString()}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							size="small"
							fullWidth
							label="Dodge"
							type="number"
							value={customDodge ?? ''}
							onChange={(e) =>
								dispatch(creatureBuilderActions.setCustomDefense({
								defense: 'dodge',
								value: e.target.value ? parseInt(e.target.value) : null
							}))
						}
						placeholder={trueBaseDodge?.toString()}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							size="small"
							fullWidth
							label="Resist"
							type="number"
							value={customResist ?? ''}
							onChange={(e) =>
								dispatch(creatureBuilderActions.setCustomDefense({
								defense: 'resist',
								value: e.target.value ? parseInt(e.target.value) : null
							}))
						}
						placeholder={trueBaseResist?.toString()}
						/>
					</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>

		{/* Skills & Traits Accordion */}
		<Accordion sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}>
			<AccordionSummary 
				expandIcon={<ExpandMore />}
				sx={{ minHeight: 40, '& .MuiAccordionSummary-content': { my: 0.5 } }}
			>
				<Typography variant="body2">Skills & Traits</Typography>
			</AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Grid container spacing={1.5}>
					<Grid item xs={12}>
						{/* Skill Selection and Display */}
						<Autocomplete
							size="small"
							options={OFFICIAL_SKILLS.filter(skill => !skills.find(s => s.name === skill))}
							onChange={(_, newValue) => {
								if (newValue) {
									const skillRanks = getSkillRanks(state.tier)
									const newSkill: CreatureSkill = {
										name: newValue,
										rank: skillRanks.secondary, // Default to secondary rank
									}
									dispatch(creatureBuilderActions.setSkills([...skills, newSkill]))
								}
							}}
							value={null}
							inputValue=""
							renderOption={(props, option) => (
								<Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Box
										sx={{
											width: 12,
											height: 12,
											borderRadius: '50%',
											bgcolor: getSkillChipColor(option),
										}}
									/>
									{option}
								</Box>
							)}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Add Skill"
									placeholder="Select from list"
								/>
							)}
						/>
					</Grid>
					{skills.length > 0 && (
						<Grid item xs={12}>
							<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
								{skills.map((skill, index) => (
									<Box key={index} sx={{ position: 'relative' }}>
										{editingSkillIndex === index ? (
											<Box
												sx={{
													display: 'inline-flex',
													alignItems: 'center',
													gap: 0.5,
													px: 1.5,
													py: 0.5,
													borderRadius: '16px',
													bgcolor: `${getSkillChipColor(skill.name)}15`,
													border: `2px solid ${getSkillChipColor(skill.name)}`,
												}}
											>
												<Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
													{skill.name}
												</Typography>
												<TextField
													size="small"
													type="number"
													value={editingSkillRank}
													onChange={(e) => {
														const val = parseInt(e.target.value)
														if (!isNaN(val) && val >= 0 && val <= 5) {
															setEditingSkillRank(val)
														} else if (e.target.value === '') {
															setEditingSkillRank(0)
														}
													}}
													onBlur={() => {
														const clampedRank = Math.max(0, Math.min(5, editingSkillRank))
														const updatedSkills = [...skills]
														updatedSkills[index] = { ...skill, rank: clampedRank }
														dispatch(creatureBuilderActions.setSkills(updatedSkills))
														setEditingSkillIndex(null)
													}}
													onKeyDown={(e) => {
														if (e.key === 'Enter') {
															const clampedRank = Math.max(0, Math.min(5, editingSkillRank))
															const updatedSkills = [...skills]
															updatedSkills[index] = { ...skill, rank: clampedRank }
															dispatch(creatureBuilderActions.setSkills(updatedSkills))
															setEditingSkillIndex(null)
														}
													}}
													inputProps={{
														min: 0,
														max: 5,
													}}
													sx={{
														width: 45,
														'& .MuiOutlinedInput-root': {
															height: 24,
															'& input': {
																p: 0.5,
																textAlign: 'center',
																fontSize: '0.8125rem',
															},
														},
													}}
													autoFocus
												/>
											</Box>
										) : (
											<Chip
												label={`${skill.name} (${skill.rank})`}
												onDelete={() => {
													dispatch(creatureBuilderActions.setSkills(skills.filter((_, i) => i !== index)))
												}}
												onClick={() => {
													setEditingSkillIndex(index)
													setEditingSkillRank(skill.rank)
												}}
												icon={
													<Box
														sx={{
															width: 8,
															height: 8,
															borderRadius: '50%',
															bgcolor: getSkillChipColor(skill.name),
															ml: 1,
														}}
													/>
												}
												sx={{
													bgcolor: `${getSkillChipColor(skill.name)}15`,
													border: `1px solid ${getSkillChipColor(skill.name)}`,
													'& .MuiChip-label': { 
														cursor: 'pointer',
														fontSize: '0.8125rem',
													},
													'& .MuiChip-icon': {
														ml: 0.5,
													},
												}}
											/>
										)}
									</Box>
								))}
							</Box>
						</Grid>
					)}
					<Grid item xs={12}>
						<Typography variant="caption" color="text.secondary">
							Click a skill chip to edit its rank. Tier {state.tier} default ranks: Primary {getSkillRanks(state.tier).primary}, Secondary {getSkillRanks(state.tier).secondary}
						</Typography>
					</Grid>
					<Grid item xs={12} md={4}>
						<Autocomplete
							size="small"
							multiple
							freeSolo
							options={COMMON_CONDITIONS}
							value={immunities}
							onChange={(_, newValue) => dispatch(creatureBuilderActions.setImmunities(newValue))}
							sx={{
								'& .MuiAutocomplete-inputRoot': {
									alignContent: 'flex-start',
								},
								'& .MuiAutocomplete-input': {
									minWidth: '100% !important',
								},
							}}
							renderOption={(props, option) => (
								<Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Box
										sx={{
											width: 12,
											height: 12,
											borderRadius: '50%',
											bgcolor: getConditionColor(option),
										}}
									/>
									{option}
								</Box>
							)}
							renderTags={(value, getTagProps) =>
								value.map((option, index) => (
									<Chip
										{...getTagProps({ index })}
										label={option}
										size="small"
										icon={
											<Box
												sx={{
													width: 8,
													height: 8,
													borderRadius: '50%',
													bgcolor: getConditionColor(option),
													ml: 1,
												}}
											/>
										}
										sx={{
											bgcolor: `${getConditionColor(option)}15`,
											border: `1px solid ${getConditionColor(option)}`,
											'& .MuiChip-icon': {
												ml: 0.5,
											},
										}}
									/>
								))
							}
							renderInput={(params) => (
								<TextField {...params} label="Immunities" placeholder="Add conditions" />
							)}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<Autocomplete
							size="small"
							multiple
							freeSolo
							options={DAMAGE_TYPES}
							value={resistances}
							onChange={(_, newValue) => dispatch(creatureBuilderActions.setResistances(newValue))}
							sx={{
								'& .MuiAutocomplete-inputRoot': {
									alignContent: 'flex-start',
								},
								'& .MuiAutocomplete-input': {
									minWidth: '100% !important',
								},
							}}
							renderOption={(props, option) => (
								<Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Box
										sx={{
											width: 12,
											height: 12,
											borderRadius: '50%',
											bgcolor: getDamageTypeColor(option),
										}}
									/>
									{option}
								</Box>
							)}
							renderTags={(value, getTagProps) =>
								value.map((option, index) => (
									<Chip
										{...getTagProps({ index })}
										label={option}
										size="small"
										icon={
											<Box
												sx={{
													width: 8,
													height: 8,
													borderRadius: '50%',
													bgcolor: getDamageTypeColor(option),
													ml: 1,
												}}
											/>
										}
										sx={{
											bgcolor: `${getDamageTypeColor(option)}15`,
											border: `1px solid ${getDamageTypeColor(option)}`,
											'& .MuiChip-icon': {
												ml: 0.5,
											},
										}}
									/>
								))
							}
							renderInput={(params) => (
								<TextField {...params} label="Resistances" placeholder="Add damage types" />
							)}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<Autocomplete
							size="small"
							multiple
							freeSolo
							options={DAMAGE_TYPES}
							value={weaknesses}
							onChange={(_, newValue) => dispatch(creatureBuilderActions.setWeaknesses(newValue))}
							sx={{
								'& .MuiAutocomplete-inputRoot': {
									alignContent: 'flex-start',
								},
								'& .MuiAutocomplete-input': {
									minWidth: '100% !important',
								},
							}}
							renderOption={(props, option) => (
								<Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Box
										sx={{
											width: 12,
											height: 12,
											borderRadius: '50%',
											bgcolor: getDamageTypeColor(option),
										}}
									/>
									{option}
								</Box>
							)}
							renderTags={(value, getTagProps) =>
								value.map((option, index) => (
									<Chip
										{...getTagProps({ index })}
										label={option}
										size="small"
										icon={
											<Box
												sx={{
													width: 8,
													height: 8,
													borderRadius: '50%',
													bgcolor: getDamageTypeColor(option),
													ml: 1,
												}}
											/>
										}
										sx={{
											bgcolor: `${getDamageTypeColor(option)}15`,
											border: `1px solid ${getDamageTypeColor(option)}`,
											'& .MuiChip-icon': {
												ml: 0.5,
											},
										}}
									/>
								))
							}
							renderInput={(params) => (
								<TextField {...params} label="Weaknesses" placeholder="Add damage types" />
							)}
						/>
					</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>

		{/* Attacks Accordion */}
		<Accordion sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}>
			<AccordionSummary 
				expandIcon={<ExpandMore />}
				sx={{ minHeight: 40, '& .MuiAccordionSummary-content': { my: 0.5 } }}
			>
				<Typography variant="body2">Attacks ({attacks.length})</Typography>
			</AccordionSummary>
				<AccordionDetails sx={{ pt: 0 }}>
					<Box>
						{/* Existing Attacks */}
				{attacks.map((attack, index) => (
					<Box
						key={index}
						sx={{
							mb: 1.5,
							p: 1.5,
							border: '1px solid',
							borderColor: editingAttackIndex === index ? 'primary.main' : 'divider',
							borderRadius: 1,
							bgcolor: editingAttackIndex === index ? 'action.hover' : 'transparent',
						}}
					>
						{editingAttackIndex === index ? (
							// Inline Edit Form
							<Grid container spacing={1.5}>
								<Grid item xs={12}>
									<TextField
										size="small"
										fullWidth
										label="Name"
										value={attack.name}
										onChange={(e) =>
											handleUpdateAttack(index, { ...attack, name: e.target.value })
										}
										placeholder="Claw, Bite, Slam..."
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormControl size="small" fullWidth>
										<InputLabel>Base Attribute</InputLabel>
										<Select
											value={attack.baseAttribute || baseStr}
											onChange={(e) => {
												handleUpdateAttack(index, { ...attack, baseAttribute: e.target.value })
											}}
											label="Base Attribute"
										>
											<MenuItem value={baseStr}>STR ({baseStr})</MenuItem>
											<MenuItem value={baseAgi}>AGI ({baseAgi})</MenuItem>
											<MenuItem value={baseSpi}>SPI ({baseSpi})</MenuItem>
											<MenuItem value={baseMnd}>MND ({baseMnd})</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormControl size="small" fullWidth>
										<InputLabel>Damage Type</InputLabel>
										<Select
											value={attack.damageType || 'physical'}
											onChange={(e) =>
												handleUpdateAttack(index, { ...attack, damageType: e.target.value })
											}
											label="Damage Type"
										>
											{DAMAGE_TYPES.map((type) => (
												<MenuItem key={type} value={type}>
													<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
														<Box
															component="span"
															sx={{
																width: 12,
																height: 12,
																borderRadius: '50%',
																bgcolor: getDamageTypeColor(type),
															}}
														/>
														{type}
													</Box>
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										size="small"
										fullWidth
										type="number"
										label="Weapon Damage"
										value={attack.weaponDamage ?? getWeaponDamage(state.tier || 0, state.archetype)}
										onChange={(e) =>
											handleUpdateAttack(index, { ...attack, weaponDamage: parseInt(e.target.value) || 0 })
										}
										helperText={`Tier ${state.tier || 0} default: ${getWeaponDamage(state.tier || 0, state.archetype)}`}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Box>
										<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
											Calculated Damage
										</Typography>
										<Typography variant="body2" sx={{ fontWeight: 600 }}>
											{attack.damage}
										</Typography>
										<Typography variant="caption" color="text.secondary">
											weak/strong/critical
										</Typography>
									</Box>
								</Grid>
								<Grid item xs={12}>
									<Autocomplete
										size="small"
										multiple
										options={WEAPON_PROPERTIES}
										value={attack.properties}
										onChange={(_, newValue) =>
											handleUpdateAttack(index, { ...attack, properties: newValue })
										}
										renderInput={(params) => (
											<TextField {...params} label="Properties" placeholder="agile, reach, pierce..." />
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										size="small"
										fullWidth
										label="Description"
										value={attack.description || ''}
										onChange={(e) =>
											handleUpdateAttack(index, {
												...attack,
												description: e.target.value,
											})
										}
										placeholder="Optional effect description"
									/>
								</Grid>
								<Grid item xs={12}>
									<Box sx={{ display: 'flex', gap: 1 }}>
										<Button
											size="small"
											variant="contained"
											onClick={() => handleCancelEditAttack()}
										>
											Done
										</Button>
										<Button
											size="small"
											color="error"
											onClick={() => handleDeleteAttack(index)}
											startIcon={<Delete />}
										>
											Delete
										</Button>
									</Box>
								</Grid>
							</Grid>
						) : (
							// Display Mode
							<>
								<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
									<Box>
										<Typography variant="subtitle2">
											<strong>{attack.name}</strong>{' '}
											{attack.properties.length > 0 && (
												<em>({attack.properties.join(', ')})</em>
											)}
										</Typography>
										{attack.damageType && (
											<Chip
												label={attack.damageType}
												size="small"
												icon={
													<Box
														component="span"
														sx={{
															width: 12,
															height: 12,
															borderRadius: '50%',
															bgcolor: getDamageTypeColor(attack.damageType),
														}}
													/>
												}
												sx={{
													mt: 0.5,
													bgcolor: `${getDamageTypeColor(attack.damageType)}15`,
													border: `1px solid ${getDamageTypeColor(attack.damageType)}`,
													'& .MuiChip-icon': {
														ml: 0.5,
													},
												}}
											/>
										)}
									</Box>
									<Box>
										<IconButton
											size="small"
											onClick={() => setEditingAttackIndex(index)}
										>
											<Edit />
										</IconButton>
										<IconButton
											size="small"
											onClick={() => handleDeleteAttack(index)}
										>
											<Delete />
										</IconButton>
									</Box>
								</Box>
								<Typography variant="body2">
									{attack.damage} {attack.damageType && attack.damageType !== 'physical' ? attack.damageType + ' ' : ''}damage
								</Typography>
								{attack.description && (
									<Typography variant="body2" color="text.secondary">
										{attack.description}
									</Typography>
								)}
							</>
						)}
					</Box>
				))}						{/* Add New Attack */}
						<Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
														<Typography variant="caption" sx={{ display: 'block', mb: 1.5, fontWeight: 600, color: 'text.secondary' }}>
								Add Attack
							</Typography>
							
							{!showCustomAttackForm ? (
								<Box>
									<Autocomplete
										size="small"
										options={PRESET_ATTACKS}
										getOptionLabel={(option) => option.name}
										renderOption={(props, option) => (
											<Box component="li" {...props}>
												<Box>
													<Typography variant="body2" fontWeight={600}>{option.name}</Typography>
													<Typography variant="caption" color="text.secondary">
														{option.properties.join(', ') || 'No properties'} • {option.damageType}
													</Typography>
												</Box>
											</Box>
										)}
										onChange={(_, value) => {
											if (value) {
												const weaponDamage = getWeaponDamage(state.tier || 0, state.archetype)
												const presetWithDamage = {
													...value,
													baseAttribute: baseStr,
													weaponDamage,
												}
												const baseDamage = calculateBaseDamage(baseStr)
												presetWithDamage.damage = formatDamageString(baseDamage, weaponDamage)
												dispatch(creatureBuilderActions.setAttacks([...attacks, presetWithDamage]))
								setAttackSearchInput('')
											}
										}}
										renderInput={(params) => (
											<TextField {...params} label="Select Preset Attack" placeholder="Choose an attack..." />
										)}
										value={null}
										inputValue={attackSearchInput}
							onInputChange={(_, newInputValue) => setAttackSearchInput(newInputValue)}
									/>
									<Button
										size="small"
										startIcon={<Add />}
										onClick={() => setShowCustomAttackForm(true)}
										sx={{ mt: 1.5 }}
									>
										Create Custom Attack
									</Button>
								</Box>
							) : (
								<Box>
									<Grid container spacing={1.5}>
								<Grid item xs={12}>
									<TextField
										size="small"
										fullWidth
										label="Name"
										value={newAttack.name}
										onChange={(e) =>
											setNewAttack({ ...newAttack, name: e.target.value })
										}
										placeholder="Claw, Bite, Slam..."
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormControl size="small" fullWidth>
										<InputLabel>Base Attribute</InputLabel>
										<Select
											value={newAttack.baseAttribute || baseStr}
											onChange={(e) => {
												setNewAttack({ ...newAttack, baseAttribute: e.target.value })
											}}
											label="Base Attribute"
										>
											<MenuItem value={baseStr}>STR ({baseStr})</MenuItem>
											<MenuItem value={baseAgi}>AGI ({baseAgi})</MenuItem>
											<MenuItem value={baseSpi}>SPI ({baseSpi})</MenuItem>
											<MenuItem value={baseMnd}>MND ({baseMnd})</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormControl size="small" fullWidth>
										<InputLabel>Damage Type</InputLabel>
										<Select
											value={newAttack.damageType || 'physical'}
											onChange={(e) =>
												setNewAttack({ ...newAttack, damageType: e.target.value })
											}
											label="Damage Type"
										>
											{DAMAGE_TYPES.map((type) => (
												<MenuItem key={type} value={type}>
													<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
														<Box
															component="span"
															sx={{
																width: 12,
																height: 12,
																borderRadius: '50%',
																bgcolor: getDamageTypeColor(type),
															}}
														/>
														{type}
													</Box>
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										size="small"
										fullWidth
										type="number"
										label="Weapon Damage"
										value={newAttack.weaponDamage ?? getWeaponDamage(state.tier || 0, state.archetype)}
										onChange={(e) =>
											setNewAttack({ ...newAttack, weaponDamage: parseInt(e.target.value) || 0 })
										}
										helperText={`Tier ${state.tier || 0} default: ${getWeaponDamage(state.tier || 0, state.archetype)}`}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Box sx={{ pt: 1 }}>
										<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
											Calculated Damage
										</Typography>
										<Typography variant="body2" sx={{ fontWeight: 600 }}>
											{newAttack.baseAttribute && newAttack.weaponDamage !== undefined
												? formatDamageString(
														calculateBaseDamage(newAttack.baseAttribute),
														newAttack.weaponDamage
													)
												: '—'}
										</Typography>
										<Typography variant="caption" color="text.secondary">
											weak/strong/critical
										</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Autocomplete
										size="small"
										multiple
										options={WEAPON_PROPERTIES}
										value={newAttack.properties}
										onChange={(_, newValue) =>
											setNewAttack({ ...newAttack, properties: newValue })
										}
										renderInput={(params) => (
											<TextField {...params} label="Properties" placeholder="agile, reach, pierce..." />
										)}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										size="small"
										fullWidth
										label="Description"
										value={newAttack.description}
										onChange={(e) =>
											setNewAttack({
												...newAttack,
												description: e.target.value,
											})
										}
										placeholder="Optional effect description"
									/>
								</Grid>
									<Grid item xs={12}>
										<Box sx={{ display: 'flex', gap: 1 }}>
											<Button
												variant="outlined"
												startIcon={<Add />}
												onClick={() => {
													handleAddAttack()
													setShowCustomAttackForm(false)
												}}
												disabled={!newAttack.name}
											>
												Add Attack
											</Button>
											<Button
												size="small"
												onClick={() => {
													setShowCustomAttackForm(false)
													setNewAttack({ name: '', properties: [], damage: '', weaponDamage: getWeaponDamage(state.tier || 0, state.archetype), damageType: 'physical', baseAttribute: baseStr, description: '' })
												}}
											>
												Cancel
											</Button>
										</Box>
									</Grid>
								</Grid>
							</Box>
						)}
					</Box>
				</Box>
				</AccordionDetails>
			</Accordion>

		{/* Abilities Accordion */}
		<Accordion sx={{ mb: 2, boxShadow: 'none', '&:before': { display: 'none' } }}>
			<AccordionSummary 
				expandIcon={<ExpandMore />}
				sx={{ minHeight: 40, '& .MuiAccordionSummary-content': { my: 0.5 } }}
			>
				<Typography variant="body2">Abilities ({abilities.length})</Typography>
			</AccordionSummary>
				<AccordionDetails sx={{ pt: 0 }}>
					<Box>
						{/* Existing Abilities */}
						{abilities.map((ability, index) => (
							<Box
								key={index}
								sx={{
									mb: 1.5,
									p: 1.5,
									border: '1px solid',
									borderColor: editingAbilityIndex === index ? 'primary.main' : 'divider',
									borderRadius: 1,
									bgcolor: editingAbilityIndex === index ? 'action.hover' : 'transparent',
								}}
							>
								{editingAbilityIndex === index ? (
									// Inline Edit Form
									<Grid container spacing={1.5}>
										<Grid item xs={12} sm={6}>
											<TextField
												size="small"
												fullWidth
												label="Name"
												value={ability.name}
												onChange={(e) =>
													handleUpdateAbility(index, { ...ability, name: e.target.value })
												}
												placeholder="Ability name"
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<FormControl size="small" fullWidth>
												<InputLabel>Action Type</InputLabel>
												<Select
													value={ability.actionType || 'Passive'}
													onChange={(e) =>
														handleUpdateAbility(index, { ...ability, actionType: e.target.value })
													}
													label="Action Type"
												>
													{ACTION_TYPES.map((type) => (
														<MenuItem key={type} value={type}>
															<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
																{getActionTypeIcon(type)}
																{type}
															</Box>
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												size="small"
												fullWidth
												label="Properties"
												value={ability.properties || ''}
												onChange={(e) =>
													handleUpdateAbility(index, {
														...ability,
														properties: e.target.value,
													})
												}
												placeholder="Once per scene, Recharge 5-6"
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												size="small"
												fullWidth
												multiline
												rows={2}
												label="Description"
												value={ability.description}
												onChange={(e) =>
													handleUpdateAbility(index, {
														...ability,
														description: e.target.value,
													})
												}
												placeholder="Describe the ability effect"
											/>
										</Grid>
										<Grid item xs={12}>
											<Box sx={{ display: 'flex', gap: 1 }}>
												<Button
													size="small"
													variant="contained"
													onClick={() => handleCancelEditAbility()}
												>
													Done
												</Button>
												<Button
													size="small"
													color="error"
													onClick={() => handleDeleteAbility(index)}
													startIcon={<Delete />}
												>
													Delete
												</Button>
											</Box>
										</Grid>
									</Grid>
								) : (
									// Display Mode
									<>
										<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
											<Box>
												<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
													{ability.actionType && getActionTypeIcon(ability.actionType as ActionType)}
													<Typography variant="subtitle2">
														<strong>{ability.name}</strong>
														{ability.properties && ` (${ability.properties})`}
													</Typography>
												</Box>
												{ability.actionType && (
													<Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
														{ability.actionType}
													</Typography>
												)}
											</Box>
											<Box>
												<IconButton
													size="small"
													onClick={() => setEditingAbilityIndex(index)}
												>
													<Edit />
												</IconButton>
												<IconButton
													size="small"
													onClick={() => handleDeleteAbility(index)}
												>
													<Delete />
												</IconButton>
											</Box>
										</Box>
										<Typography variant="body2" color="text.secondary">
											{ability.description}
										</Typography>
									</>
								)}
							</Box>
						))}

						{/* Add New Ability */}
						<Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
														<Typography variant="caption" sx={{ display: 'block', mb: 1.5, fontWeight: 600, color: 'text.secondary' }}>
								Add Ability
							</Typography>
							
							{!showCustomAbilityForm ? (
								<Box>
									<Autocomplete
										size="small"
										options={PRESET_ABILITIES}
										getOptionLabel={(option) => option.name}
										renderOption={(props, option) => (
											<Box component="li" {...props}>
												<Box>
													<Typography variant="body2" fontWeight={600}>{option.name}</Typography>
													<Typography variant="caption" color="text.secondary" sx={{ display: 'block', maxWidth: 400 }}>
														{option.description.length > 80 ? option.description.substring(0, 80) + '...' : option.description}
													</Typography>
												</Box>
											</Box>
										)}
										onChange={(_, value) => {
											if (value) {
												dispatch(creatureBuilderActions.setAbilities([...abilities, value]))
								setAbilitySearchInput('')
											}
										}}
										inputValue={abilitySearchInput}
							onInputChange={(_, newInputValue) => setAbilitySearchInput(newInputValue)}
										renderInput={(params) => (
											<TextField {...params} label="Select Preset Ability" placeholder="Choose an ability..." />
										)}
										value={null}
									/>
									<Button
										size="small"
										startIcon={<Add />}
										onClick={() => setShowCustomAbilityForm(true)}
										sx={{ mt: 1.5 }}
									>
										Create Custom Ability
									</Button>
								</Box>
							) : (
								<Box>
									<Grid container spacing={1.5}>
								<Grid item xs={12} sm={6}>
									<TextField
										size="small"
										fullWidth
										label="Name"
										value={newAbility.name}
										onChange={(e) =>
											setNewAbility({ ...newAbility, name: e.target.value })
										}
										placeholder="Ability name"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormControl size="small" fullWidth>
										<InputLabel>Action Type</InputLabel>
										<Select
											value={newAbility.actionType || 'Passive'}
											onChange={(e) =>
												setNewAbility({ ...newAbility, actionType: e.target.value })
											}
											label="Action Type"
										>
											{ACTION_TYPES.map((type) => (
												<MenuItem key={type} value={type}>
													<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
														{getActionTypeIcon(type)}
														{type}
													</Box>
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										size="small"
										fullWidth
										label="Properties"
										value={newAbility.properties}
										onChange={(e) =>
											setNewAbility({
												...newAbility,
												properties: e.target.value,
											})
										}
										placeholder="Once per scene, Recharge 5-6"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										size="small"
										fullWidth
										multiline
										rows={2}
										label="Description"
										value={newAbility.description}
										onChange={(e) =>
											setNewAbility({
												...newAbility,
												description: e.target.value,
											})
										}
										placeholder="Describe the ability effect"
									/>
								</Grid>
																	<Grid item xs={12}>
										<Box sx={{ display: 'flex', gap: 1 }}>
											<Button
												variant="outlined"
												startIcon={<Add />}
												onClick={() => {
													handleAddAbility()
													setShowCustomAbilityForm(false)
												}}
												disabled={!newAbility.name}
											>
												Add Ability
											</Button>
											<Button
												size="small"
												onClick={() => {
													setShowCustomAbilityForm(false)
													setNewAbility({ name: '', description: '', actionType: 'Passive', properties: '' })
												}}
											>
												Cancel
											</Button>
										</Box>
									</Grid>
								</Grid>
								</Box>
							)}
							</Box>
				</Box>
			</AccordionDetails>
		</Accordion>
		</Paper>
	)
}
