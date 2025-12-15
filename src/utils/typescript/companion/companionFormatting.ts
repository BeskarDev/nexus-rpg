import { CompanionStats } from '../../types/companion'
import { TIER_NAMES } from './companionCalculations'

export const convertHtmlToMarkdown = (text: string): string => {
	if (!text) return text

	return (
		text
			// Convert <strong> tags to **bold** and trim whitespace, ensure space after
			.replace(
				/<strong>(.*?)<\/strong>/g,
				(match, content) => `**${content.trim()}** `,
			)
			// Convert <em> tags to *italic* and trim whitespace
			.replace(/<em>(.*?)<\/em>/g, (match, content) => `*${content.trim()}*`)
			// Remove any remaining HTML tags (fallback)
			.replace(/<[^>]*>/g, '')
			// Clean up any double spaces that might have been created
			.replace(/\s+/g, ' ')
			.trim()
	)
}

export const generateMarkdown = (companion: CompanionStats): string => {
	const { trait, calculatedStats } = companion
	const tierName = TIER_NAMES[companion.tier]

	// Convert attacks and abilities to markdown format
	const markdownAttacks = calculatedStats.attacks
		.map((attack) => `- ${convertHtmlToMarkdown(attack)}`)
		.join('\n')
	const markdownAbilities = calculatedStats.abilities
		.map((ability) => `- ${convertHtmlToMarkdown(ability)}`)
		.join('\n')

	return `#### **${trait.name}** (${companion.size} ${trait.type})

**Tier:** ${companion.tier} (${tierName})

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ${calculatedStats.hp} | ${calculatedStats.av} | ${calculatedStats.attributes.str} | ${calculatedStats.attributes.agi} | ${calculatedStats.attributes.spi} | ${calculatedStats.attributes.mnd} | ${calculatedStats.defenses.parry} | ${calculatedStats.defenses.dodge} | ${calculatedStats.defenses.resist} |

**Diet:** ${trait.diet}

**Skills:** ${calculatedStats.skills}

**Movement:** ${calculatedStats.movement}

**Immunities:** ${calculatedStats.immunities}
**Resistances:** ${calculatedStats.resistances}
**Weaknesses:** ${calculatedStats.weaknesses}

**Attacks:**
${markdownAttacks}

**Abilities:**
${markdownAbilities}`
}

export const generateJSON = (companion: CompanionStats): string => {
	return JSON.stringify(
		{
			name: companion.trait.name,
			type: companion.trait.type,
			tier: companion.tier,
			tierName: TIER_NAMES[companion.tier],
			size: companion.size,
			hp: companion.calculatedStats.hp,
			av: companion.calculatedStats.av,
			attributes: companion.calculatedStats.attributes,
			defenses: companion.calculatedStats.defenses,
			skills: companion.calculatedStats.skills,
			diet: companion.trait.diet,
			movement: companion.calculatedStats.movement,
			immunities: companion.calculatedStats.immunities,
			resistances: companion.calculatedStats.resistances,
			weaknesses: companion.calculatedStats.weaknesses,
			attacks: companion.calculatedStats.attacks,
			abilities: companion.calculatedStats.abilities,
			attackDamage: companion.calculatedStats.attackDamage,
		},
		null,
		2,
	)
}
