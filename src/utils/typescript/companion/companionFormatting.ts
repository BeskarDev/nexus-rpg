import { CompanionStats } from '../../../types/companion'
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
			/*
				`<br/>` becomes a REAL line break (M13 S8, owner review).

				It used to be swallowed by the tag-strip below and then by the whitespace
				collapse, which is what ran the Floating Eye's four numbered eye-ray options
				together into one paragraph: `…apply the effects:1. Dazing Ray. Compare…`.
				The break is the only structure that markup carried, and it was the one
				thing being discarded.
			*/
			.replace(/<br\s*\/?>/gi, '\n')
			// Remove any remaining HTML tags (fallback)
			.replace(/<[^>]*>/g, '')
			// Collapse runs of HORIZONTAL whitespace only — `\s` matches newlines, so the
			// old `\s+` undid the line breaks the rule above just created.
			.replace(/[^\S\n]+/g, ' ')
			// Tidy the seams around each break.
			.replace(/[^\S\n]*\n[^\S\n]*/g, '\n')
			.trim()
	)
}

/**
 * The stat block a built companion is stored and shared as.
 *
 * **Diet was removed (M13 S8).** The line was `**Diet:** ${trait.diet}` and
 * `companion-traits.json` has no `diet` key on any of its thirty-four entries, so
 * every block this ever generated carried the literal text `**Diet:** undefined`
 * into the character document. `parseCompanionMarkdown` already had to special-case
 * the string `undefined` to keep it off the sheet; the fix belongs here, at the
 * source that writes it.
 */
export const generateMarkdown = (companion: CompanionStats): string => {
	const { trait, calculatedStats } = companion
	const tierName = TIER_NAMES[companion.tier]

	/**
	 * One list item per entry, with any internal line breaks kept as an INDENTED
	 * continuation (M13 S8).
	 *
	 * An entry that carries sub-options — the Floating Eye's four numbered eye rays —
	 * now arrives here as several lines. Emitting them flat would end the list item
	 * and start new top-level ones; indenting by two spaces makes them a nested list
	 * under their entry, which is both valid markdown and what
	 * `parseCompanionMarkdown` reads back.
	 */
	const listItem = (html: string) =>
		convertHtmlToMarkdown(html)
			.split('\n')
			.map((line, index) => (index === 0 ? `- ${line}` : `  ${line}`))
			.join('\n')

	const markdownAttacks = calculatedStats.attacks.map(listItem).join('\n')
	const markdownAbilities = calculatedStats.abilities.map(listItem).join('\n')

	return `#### **${trait.name}** (${companion.size} ${trait.type})

**Tier:** ${companion.tier} (${tierName})

| HP | AV | STR | AGI | SPI | MND | Parry | Dodge | Resist |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ${calculatedStats.hp} | ${calculatedStats.av} | ${calculatedStats.attributes.str} | ${calculatedStats.attributes.agi} | ${calculatedStats.attributes.spi} | ${calculatedStats.attributes.mnd} | ${calculatedStats.defenses.parry} | ${calculatedStats.defenses.dodge} | ${calculatedStats.defenses.resist} |

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
