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

/**
 * Process tier-based calculations in text, converting patterns like:
 * - "inflicts burning (equal to 2 x Tier)" → "inflicts burning (4)" (for tier 2)
 * - "suffers bleeding (2 x Tier)" → "suffers bleeding (4)" (for tier 2)
 * - "suffers it's Tier x 2 fire damage" → "suffers 4 fire damage" (for tier 2)
 * - "Tier x 2" → "4" (for tier 2)
 * - "2 x Tier" → "4" (for tier 2)
 */
export const processTierCalculations = (text: string, tier: number): string => {
	if (!text) return text

	let processedText = text

	// Pattern 1: "inflicts/suffers [word] (equal to X x Tier)" → "inflicts/suffers [word] (calculated value)"
	// This handles cases like "inflicts burning (equal to 2 x Tier)" → "inflicts burning (4)"
	processedText = processedText.replace(
		/(inflicts|suffers)\s+(\w+)\s+\(equal to\s+(\d+)\s*x\s*Tier\)/gi,
		(match, verb, word, multiplier) => {
			return `${verb} ${word} (${parseInt(multiplier) * tier})`
		},
	)
	processedText = processedText.replace(
		/(inflicts|suffers)\s+(\w+)\s+\(equal to\s+Tier\s*x\s*(\d+)\)/gi,
		(match, verb, word, multiplier) => {
			return `${verb} ${word} (${tier * parseInt(multiplier)})`
		},
	)

	// Pattern 2: "inflicts/suffers [word] (X x Tier)" → "inflicts/suffers [word] (calculated value)"
	// This handles cases without "equal to", like "suffers bleeding (2 x Tier)" → "suffers bleeding (4)"
	processedText = processedText.replace(
		/(inflicts|suffers)\s+(\w+)\s+\((\d+)\s*x\s*Tier\)/gi,
		(match, verb, word, multiplier) => {
			return `${verb} ${word} (${parseInt(multiplier) * tier})`
		},
	)
	processedText = processedText.replace(
		/(inflicts|suffers)\s+(\w+)\s+\(Tier\s*x\s*(\d+)\)/gi,
		(match, verb, word, multiplier) => {
			return `${verb} ${word} (${tier * parseInt(multiplier)})`
		},
	)

	// Pattern 2b: "takes [lasting] [damage-type] damage (X x Tier)" → "takes [lasting] [damage-type] damage (calculated value)"
	// This handles cases like "takes lasting poison damage (2 x Tier)" → "takes lasting poison damage (4)"
	processedText = processedText.replace(
		/takes\s+(lasting\s+)?(\w+)\s+damage\s+\((\d+)\s*x\s*Tier\)/gi,
		(match, lasting, damageType, multiplier) => {
			return `takes ${lasting || ''}${damageType} damage (${parseInt(multiplier) * tier})`
		},
	)
	processedText = processedText.replace(
		/takes\s+(lasting\s+)?(\w+)\s+damage\s+\(Tier\s*x\s*(\d+)\)/gi,
		(match, lasting, damageType, multiplier) => {
			return `takes ${lasting || ''}${damageType} damage (${tier * parseInt(multiplier)})`
		},
	)

	// Pattern 3: "(equal to X x Tier)" or "(equal to Tier x X)" → just the number in parentheses (fallback)
	processedText = processedText.replace(
		/\(equal to\s+(\d+)\s*x\s*Tier\)/gi,
		(match, multiplier) => {
			return `(${parseInt(multiplier) * tier})`
		},
	)
	processedText = processedText.replace(
		/\(equal to\s+Tier\s*x\s*(\d+)\)/gi,
		(match, multiplier) => {
			return `(${tier * parseInt(multiplier)})`
		},
	)

	// Pattern 4: "equal to X x Tier" or "equal to Tier x X" (without parentheses) → just the number
	processedText = processedText.replace(
		/equal to\s+(\d+)\s*x\s*Tier/gi,
		(match, multiplier) => {
			return String(parseInt(multiplier) * tier)
		},
	)
	processedText = processedText.replace(
		/equal to\s+Tier\s*x\s*(\d+)/gi,
		(match, multiplier) => {
			return String(tier * parseInt(multiplier))
		},
	)

	// Pattern 5: "suffers it's Tier x X [damage-type] damage" → "suffers [calculated] [damage-type] damage"
	// This handles cases like "suffers it's Tier x 2 fire damage" → "suffers 4 fire damage"
	processedText = processedText.replace(
		/suffers\s+it's\s+Tier\s*x\s*(\d+)\s+([\w\s]+)\s+damage/gi,
		(match, multiplier, damageType) => {
			return `suffers ${tier * parseInt(multiplier)} ${damageType.trim()} damage`
		},
	)

	// Pattern 6: "it's Tier x X" → just the number (fallback)
	processedText = processedText.replace(
		/it's\s+Tier\s*x\s*(\d+)/gi,
		(match, multiplier) => {
			return String(tier * parseInt(multiplier))
		},
	)

	// Pattern 7: "Tier x X" (standalone, not part of "it's Tier")
	processedText = processedText.replace(
		/\bTier\s*x\s*(\d+)\b/gi,
		(match, multiplier) => {
			return String(tier * parseInt(multiplier))
		},
	)

	// Pattern 8: "X x Tier" (reverse order)
	// This handles cases like "2 x Tier" → "4"
	processedText = processedText.replace(
		/(\d+)\s*x\s*Tier\b/gi,
		(match, multiplier) => {
			return String(parseInt(multiplier) * tier)
		},
	)

	return processedText
}

// Helper function to parse multi-option attacks like Eye Rays
const parseMultiOptionAttack = (
	attackText: string,
	baseAttackDamage: { weak: number; normal: number; strong: number },
	tier: number,
): string => {
	let processedText = attackText
	
	// Calculate damage values for options that deal damage
	const weaponDamageBase = baseAttackDamage.normal - baseAttackDamage.weak
	const baseDamage = baseAttackDamage.weak - weaponDamageBase
	
	// Process Frost Ray option (Deals +1 weapon damage as frost damage)
	if (processedText.includes('Frost Ray')) {
		const weaponDamage = Math.max(1, weaponDamageBase + 1)
		const weakDamage = Math.max(1, baseDamage + weaponDamage)
		const strongDamage = Math.max(1, baseDamage + 2 * weaponDamage)
		const criticalDamage = Math.max(1, baseDamage + 3 * weaponDamage)
		const damageText = `Treat the roll as a range attack vs. Dodge. ${weakDamage}/${strongDamage}/${criticalDamage} frost damage (${baseDamage} base + ${weaponDamage} weapon).`
		
		// Replace the Frost Ray option's damage sentence
		// Pattern matches: <strong>3. Frost Ray. </strong>Treat the roll as a range attack vs. Dodge. Deals +1 weapon damage as frost damage.
		processedText = processedText.replace(
			/(<strong>3\.\s+Frost Ray\.\s*)<\/strong>\s*Treat the roll as a range attack vs\. Dodge\.\s*Deals \+1 weapon damage as frost damage\./i,
			`$1</strong> ${damageText}`
		)
	}
	
	// Process tier calculations for any remaining tier-based formulas
	processedText = processTierCalculations(processedText, tier)
	
	return processedText
}

export const parseAttackDamage = (
	attackText: string,
	baseAttackDamage: { weak: number; normal: number; strong: number },
	tier: number,
): string => {
	if (!attackText || attackText === '-') return ''

	// Check if this is a multi-option attack (like Eye Rays)
	// These have numbered sub-options and should process each option separately
	const hasNumberedOptions = /\d+\.\s+\w+\s+Ray\./i.test(attackText)
	
	if (hasNumberedOptions) {
		return parseMultiOptionAttack(attackText, baseAttackDamage, tier)
	}

	// Parse damage modifiers
	let weaponDamageModifier = 0 // 0 = normal, -1 = reduced, +1 = increased
	let useDamageCalculation = true

	if (attackText.includes('Deals normal weapon damage')) {
		weaponDamageModifier = 0
	} else if (attackText.includes('Deals -1 weapon damage') || attackText.includes('with -1 weapon damage')) {
		weaponDamageModifier = -1
	} else if (attackText.includes('Deals +1 weapon damage') || attackText.includes('with +1 weapon damage')) {
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
		
		// Look for damage type in various patterns:
		// 1. "as [type] damage"
		// 2. "Deals [type] damage"
		const damageTypeMatch = processedText.match(/(?:as|Deals)\s+(\w+)\s+damage/i)
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

	// Process tier-based calculations
	processedText = processTierCalculations(processedText, tier)

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
		]
			.filter((ability) => ability && ability !== '-')
			.map((ability) => processTierCalculations(ability, tier)),
	}
}
