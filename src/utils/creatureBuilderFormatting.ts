import { BuiltCreature } from '../types/CreatureBuilder'

/**
 * Generate markdown output for a creature
 */
export function generateCreatureMarkdown(creature: BuiltCreature): string {
	const lines: string[] = []

	// Header
	lines.push(`### **${creature.name}** (${creature.size} ${creature.type})`)
	lines.push('')
	lines.push(`**Tier:** ${creature.tier} (${creature.category})`)
	lines.push(`**Armor:** ${creature.armorType === 'heavy' ? 'Heavy' : 'Light'}`)
	lines.push('')

	// Stats table
	const armorCategory = creature.armorType === 'heavy' ? 'heavy' : 'light'
	const avDisplay = `${creature.av} (${armorCategory})`
	lines.push('| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |')
	lines.push('|----|----|----|----|----|-----|-------|-------|--------|')
	lines.push(
		`| ${creature.hp} | ${avDisplay} | ${creature.str} | ${creature.agi} | ${creature.spi} | ${creature.mnd} | ${creature.parry} | ${creature.dodge} | ${creature.resist} |`,
	)
	lines.push('')

	// Skills
	if (creature.skills && creature.skills.length > 0) {
		lines.push(`**Skills:** ${creature.skills.join(', ')}`)
		lines.push('')
	}

	// Immunities
	if (creature.immunities && creature.immunities.length > 0) {
		lines.push(`**Immunities:** ${creature.immunities.join(', ')}`)
		lines.push('')
	}

	// Resistances
	if (creature.resistances && creature.resistances.length > 0) {
		lines.push(`**Resistances:** ${creature.resistances.join(', ')}`)
		lines.push('')
	}

	// Weaknesses
	if (creature.weaknesses && creature.weaknesses.length > 0) {
		lines.push(`**Weaknesses:** ${creature.weaknesses.join(', ')}`)
		lines.push('')
	}

	// Attacks
	if (creature.attacks && creature.attacks.length > 0) {
		lines.push('**Attacks:**')
		lines.push('')
		creature.attacks.forEach((attack) => {
			const props =
				attack.properties.length > 0
					? `(*${attack.properties.join(', ')}*)`
					: ''
			const damageType =
				attack.damageType && attack.damageType !== 'physical'
					? `${attack.damageType} `
					: ''
			const desc = attack.description ? ` ${attack.description}` : ''
			lines.push(
				`- **${attack.name}** ${props}. ${attack.damage} ${damageType}damage.${desc}`,
			)
		})
		lines.push('')
	}

	// Abilities
	if (creature.abilities && creature.abilities.length > 0) {
		lines.push('**Abilities:**')
		lines.push('')
		creature.abilities.forEach((ability) => {
			const actionType = ability.actionType ? ` (${ability.actionType}` : ''
			const properties = ability.properties
				? `, ${ability.properties})`
				: actionType
					? ')'
					: ''
			lines.push(
				`- **${ability.name}${actionType}${properties}.** ${ability.description}`,
			)
		})
		lines.push('')
	}

	return lines.join('\n')
}

/**
 * Parse creature markdown back into a BuiltCreature object
 * This is useful for editing existing creatures
 */
export function parseCreatureMarkdown(
	markdown: string,
): Partial<BuiltCreature> | null {
	try {
		const lines = markdown.split('\n').map((l) => l.trim())
		const result: Partial<BuiltCreature> = {}

		// Parse header
		const headerMatch = lines[0]?.match(
			/###\s+\*\*(.+?)\*\*\s+\((\w+)\s+(.+?)\)/,
		)
		if (headerMatch) {
			result.name = headerMatch[1]
			result.size = headerMatch[2]
			result.type = headerMatch[3]
		}

		// Parse tier and category
		const tierMatch = lines
			.find((l) => l.startsWith('**Tier:**'))
			?.match(/\*\*Tier:\*\*\s+(\d+)\s+\((\w+)\)/)
		if (tierMatch) {
			result.tier = parseInt(tierMatch[1])
			result.category = tierMatch[2] as any
		}

		// Parse stats table
		const statsLine = lines.find(
			(l) => l.startsWith('|') && l.includes('HP') && !l.includes('---'),
		)
		if (statsLine) {
			const nextLine = lines[lines.indexOf(statsLine) + 2]
			if (nextLine) {
				const parts = nextLine
					.split('|')
					.map((p) => p.trim())
					.filter((p) => p)
				if (parts.length >= 9) {
					result.hp = parts[0]
					result.av = parts[1]
					result.str = parts[2]
					result.agi = parts[3]
					result.spi = parts[4]
					result.mnd = parts[5]
					result.parry = parseInt(parts[6])
					result.dodge = parseInt(parts[7])
					result.resist = parseInt(parts[8])
				}
			}
		}

		// Parse skills
		const skillsMatch = lines
			.find((l) => l.startsWith('**Skills:**'))
			?.match(/\*\*Skills:\*\*\s+(.+)/)
		if (skillsMatch) {
			result.skills = skillsMatch[1].split(',').map((s) => s.trim())
		}

		// Parse immunities
		const immunitiesMatch = lines
			.find((l) => l.startsWith('**Immunities:**'))
			?.match(/\*\*Immunities:\*\*\s+(.+)/)
		if (immunitiesMatch) {
			result.immunities = immunitiesMatch[1].split(',').map((s) => s.trim())
		}

		// Parse resistances
		const resistancesMatch = lines
			.find((l) => l.startsWith('**Resistances:**'))
			?.match(/\*\*Resistances:\*\*\s+(.+)/)
		if (resistancesMatch) {
			result.resistances = resistancesMatch[1].split(',').map((s) => s.trim())
		}

		// Parse weaknesses
		const weaknessesMatch = lines
			.find((l) => l.startsWith('**Weaknesses:**'))
			?.match(/\*\*Weaknesses:\*\*\s+(.+)/)
		if (weaknessesMatch) {
			result.weaknesses = weaknessesMatch[1].split(',').map((s) => s.trim())
		}

		return result
	} catch (error) {
		console.error('Error parsing creature markdown:', error)
		return null
	}
}
