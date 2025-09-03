import { CompanionTrait } from '../types/companion'

// Base companion statistics by tier
export const BASE_STATS: Record<number, any> = {
	0: {
		maxSize: 'Tiny',
		hp: 5,
		av: 1,
		attributes: { str: 'd4', agi: 'd6', spi: 'd4', mnd: 'd4-2' },
		defenses: { parry: 7, dodge: 7, resist: 7 },
		skillRank: 0,
		attackDamage: { weak: 3, normal: 4, strong: 5 },
	},
	1: {
		maxSize: 'Small',
		hp: 10,
		av: 2,
		attributes: { str: 'd6', agi: 'd6', spi: 'd6', mnd: 'd4-2' },
		defenses: { parry: 8, dodge: 8, resist: 8 },
		skillRank: 1,
		attackDamage: { weak: 5, normal: 7, strong: 9 },
	},
	2: {
		maxSize: 'Medium',
		hp: 20,
		av: 3,
		attributes: { str: 'd8', agi: 'd8', spi: 'd6', mnd: 'd4-1' },
		defenses: { parry: 9, dodge: 9, resist: 9 },
		skillRank: 2,
		attackDamage: { weak: 7, normal: 10, strong: 13 },
	},
	3: {
		maxSize: 'Large',
		hp: 30,
		av: 4,
		attributes: { str: 'd10', agi: 'd10', spi: 'd8', mnd: 'd4-1' },
		defenses: { parry: 10, dodge: 10, resist: 10 },
		skillRank: 3,
		attackDamage: { weak: 9, normal: 13, strong: 17 },
	},
	4: {
		maxSize: 'Large',
		hp: 40,
		av: 5,
		attributes: { str: 'd12', agi: 'd10', spi: 'd8', mnd: 'd4' },
		defenses: { parry: 11, dodge: 11, resist: 11 },
		skillRank: 4,
		attackDamage: { weak: 11, normal: 16, strong: 21 },
	},
	5: {
		maxSize: 'Huge',
		hp: 50,
		av: 6,
		attributes: { str: 'd12+1', agi: 'd12', spi: 'd8', mnd: 'd6' },
		defenses: { parry: 12, dodge: 12, resist: 12 },
		skillRank: 5,
		attackDamage: { weak: 13, normal: 19, strong: 25 },
	},
}

export const SIZE_MODIFIERS: Record<
	string,
	{ parry: number; dodge: number; movement: number }
> = {
	Tiny: { parry: -2, dodge: 2, movement: 1 },
	Small: { parry: -1, dodge: 1, movement: 1 },
	Medium: { parry: 0, dodge: 0, movement: 1 },
	Large: { parry: 1, dodge: -1, movement: 2 },
	Huge: { parry: 2, dodge: -2, movement: 3 },
}

export const TIER_NAMES: Record<number, string> = {
	0: 'Harmless',
	1: 'Capable',
	2: 'Dangerous',
	3: 'Ferocious',
	4: 'Monstrous',
	5: 'Primeval',
}

export const getAvailableSizes = (tier: number): string[] => {
	const maxSize = BASE_STATS[tier].maxSize
	const sizes = ['Tiny', 'Small', 'Medium', 'Large', 'Huge']
	const maxIndex = sizes.indexOf(maxSize)
	return sizes.slice(0, maxIndex + 1)
}

export const modifyDie = (baseDie: string, modifier: string): string => {
	if (modifier === '-') return baseDie

	const diceOrder = [
		'd4-2',
		'd4-1',
		'd4',
		'd6',
		'd8',
		'd10',
		'd12',
		'd12+1',
		'd12+2',
	]
	const baseIndex = diceOrder.indexOf(baseDie)
	const modValue = parseInt(modifier)

	if (isNaN(modValue)) return baseDie

	const newIndex = Math.max(
		0,
		Math.min(diceOrder.length - 1, baseIndex + modValue),
	)
	return diceOrder[newIndex]
}

export const applyModifier = (base: number, modifier: string): number => {
	if (modifier === '-') return base
	const modValue = parseInt(modifier)
	return isNaN(modValue) ? base : base + modValue
}

export const parseAV = (avValue: string): { value: number; type: string } => {
	if (avValue === '-') return { value: 0, type: 'light' }

	const match = avValue.match(/^(\+?)(\d+)\s*\((\w+)\)/)
	if (match) {
		return { value: parseInt(match[2]), type: match[3] }
	}

	const numMatch = avValue.match(/^(\+?)(\d+)/)
	if (numMatch) {
		return { value: parseInt(numMatch[2]), type: 'light' }
	}

	return { value: 0, type: 'light' }
}

export const parseAttackDamage = (
	attackText: string,
	baseAttackDamage: { weak: number; normal: number; strong: number },
	tier: number,
): string => {
	if (!attackText || attackText === '-') return ''

	// Parse damage modifiers
	let weaponDamageModifier = 0 // 0 = normal, -1 = reduced, +1 = increased
	let useDamageCalculation = true

	if (attackText.includes('Deals normal weapon damage')) {
		weaponDamageModifier = 0
	} else if (attackText.includes('Deals -1 weapon damage')) {
		weaponDamageModifier = -1
	} else if (attackText.includes('Deals +1 weapon damage')) {
		weaponDamageModifier = 1
	} else if (attackText.includes('Deals no damage')) {
		useDamageCalculation = false
	} else {
		useDamageCalculation = false // Don't calculate if no clear damage pattern
	}

	let processedText = attackText

	if (useDamageCalculation) {
		// Calculate damage values
		const weaponDamage = baseAttackDamage.normal - baseAttackDamage.weak
		const baseDamage = baseAttackDamage.weak - weaponDamage
		const modifiedWeaponDamage = Math.max(
			1,
			weaponDamage + weaponDamageModifier,
		)

		const weakDamage = Math.max(1, baseDamage + modifiedWeaponDamage)
		const strongDamage = Math.max(1, baseDamage + 2 * modifiedWeaponDamage)
		const criticalDamage = Math.max(1, baseDamage + 3 * modifiedWeaponDamage)

		// Extract damage type and additional info from the original text
		let damageType = ''
		let additionalInfo = ''
		
		// Look for damage type like "as blast damage"
		const damageTypeMatch = processedText.match(/as (\w+) damage/i)
		if (damageTypeMatch) {
			damageType = ` ${damageTypeMatch[1].toLowerCase()}`
		}
		
		// Look for additional damage modifiers like "(ignoring 1/2 AV)"
		const additionalInfoMatch = processedText.match(/\(ignoring [^)]+\)/i)
		if (additionalInfoMatch) {
			additionalInfo = ` ${additionalInfoMatch[0]}`
		}

		// Remove the entire damage sentence more comprehensively
		// This covers various damage sentence patterns
		processedText = processedText
			.replace(/Deals [^.]*?damage[^.]*?\./i, '') // Main damage sentence
			.replace(/Deals [^.]*?damage[^.]*?$/i, '') // Damage sentence without ending period
			.trim()

		// Additional cleanup for any remaining fragments that might include damage info
		// Remove any remaining "(min. X)" patterns and related fragments
		processedText = processedText
			.replace(/\s*\(min\.\s*\d+\)[^.]*?\./gi, '') // "(min. X)..." patterns
			.replace(/\s*\d+\)\s*\([^)]*\)\s*as\s+\w+\s+damage\./gi, '') // "X) (...) as damage." patterns
			.replace(/\s*\d+\)\s*as\s+\w+\s+damage\./gi, '') // "X) as damage." patterns
			.replace(/\s*\d+\)\./gi, '') // Simple "X)." patterns left from (min. X)
			.replace(/\.\s*\./g, '.') // Fix double periods
			.trim()

		// Construct the new damage text (without leading period since we'll handle that separately)
		const damageText = `${weakDamage}/${strongDamage}/${criticalDamage}${damageType} damage (${baseDamage} base + ${modifiedWeaponDamage} weapon)${additionalInfo}.`

		// Insert damage text after the attack name and properties
		const propertiesMatch = processedText.match(
			/(<strong>.*?<\/strong>)\s*(\(<em>.*?<\/em>\))/,
		)
		if (propertiesMatch) {
			processedText = processedText.replace(
				/(<strong>.*?<\/strong>)\s*(\(<em>.*?<\/em>\))/,
				`$1 $2. ${damageText}`,
			)
		} else {
			// Check if the strong tag already ends with a period
			const strongMatch = processedText.match(/(<strong>.*?<\/strong>)/)
			if (strongMatch) {
				const strongContent = strongMatch[1]
				if (strongContent.endsWith('.</strong>')) {
					// Keep the period and add damage after it
					processedText = processedText.replace(
						/(<strong>.*?<\/strong>)/,
						`$1 ${damageText}`,
					)
				} else {
					// Add period and damage
					processedText = processedText.replace(
						/(<strong>.*?<\/strong>)/,
						`$1. ${damageText}`,
					)
				}
			}
		}
	}

	// Evaluate "x Tier" expressions
	processedText = processedText.replace(
		/(\d+)\s*x\s*Tier/gi,
		(match, multiplier) => {
			return String(parseInt(multiplier) * tier)
		},
	)

	// Clean up extra periods and spaces
	processedText = processedText.replace(/\.\s*\./g, '.')
	processedText = processedText.replace(/\s+/g, ' ')
	processedText = processedText.trim()

	return processedText
}

export const formatSkillsWithRanks = (
	skillsText: string,
	baseSkillRank: number,
): string => {
	if (!skillsText || skillsText === '-') return skillsText

	// Split skills by comma and process each one
	const skills = skillsText.split(',').map((skill) => {
		let trimmedSkill = skill.trim()
		let skillRank = baseSkillRank

		// Check for (-1) modifier and apply it
		if (trimmedSkill.includes('(-1)')) {
			skillRank = Math.max(0, baseSkillRank - 1)
			trimmedSkill = trimmedSkill.replace(/\s*\(-1\)/g, '')
		}

		// Add the skill rank in parentheses
		return `${trimmedSkill} (${skillRank})`
	})

	return skills.join(', ')
}

export const calculateStats = (
	tier: number,
	size: string,
	trait: CompanionTrait,
) => {
	const baseStats = BASE_STATS[tier]
	const sizeModifier = SIZE_MODIFIERS[size]

	// Calculate HP
	let hp = baseStats.hp
	if (trait.hp !== '-') {
		hp += parseInt(trait.hp) || 0
	}

	// Calculate AV
	let av = baseStats.av
	let avType = 'natural light'
	if (trait.av !== '-') {
		const traitAV = parseAV(trait.av)
		av += traitAV.value
		avType = `natural ${traitAV.type}`
	}

	// Calculate Attributes
	const attributes = {
		str: modifyDie(baseStats.attributes.str, trait.strength),
		agi: modifyDie(baseStats.attributes.agi, trait.agility),
		spi: modifyDie(baseStats.attributes.spi, trait.spirit),
		mnd: modifyDie(baseStats.attributes.mnd, trait.mind),
	}

	// Calculate Defenses
	const defenses = {
		parry:
			baseStats.defenses.parry +
			sizeModifier.parry +
			applyModifier(0, trait.parry),
		dodge:
			baseStats.defenses.dodge +
			sizeModifier.dodge +
			applyModifier(0, trait.dodge),
		resist: baseStats.defenses.resist + applyModifier(0, trait.resist),
	}

	return {
		hp,
		av: `${av} (${avType})`,
		attributes,
		defenses,
		attackDamage: baseStats.attackDamage,
		movement: sizeModifier.movement,
		skills: formatSkillsWithRanks(trait.skills, baseStats.skillRank),
		immunities: trait.immunities,
		resistances: trait.resistances,
		weaknesses: trait.weaknesses,
		attacks: [trait['attack 1'], trait['attack 2']]
			.filter((attack) => attack && attack !== '-')
			.map((attack) =>
				parseAttackDamage(attack, baseStats.attackDamage, tier),
			),
		abilities: [
			trait['ability 1'],
			trait['ability 2'],
			trait['ability 3'],
		].filter((ability) => ability && ability !== '-'),
	}
}
