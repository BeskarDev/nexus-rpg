import { Creature, Attack, Ability } from '@site/src/types/Creature'
import {
	parseEntryHead,
	toAbility,
	toAttack,
	type ParsedEntryHead,
} from './creatureEntryText'

export const parseCreatureMarkdown = (markdown: string): Creature[] => {
	const creatures: Creature[] = []

	// Split by creature headers (### **Name** (Type))
	const creatureBlocks = markdown.split(/(?=### \*\*[^*]+\*\* \([^)]+\))/)

	for (const block of creatureBlocks) {
		if (!block.trim()) continue

		const headerMatch = block.match(/### \*\*([^*]+)\*\* \(([^)]+)\)/)
		if (!headerMatch) continue

		const name = headerMatch[1]
		const type = headerMatch[2]

		try {
			const creature = parseCreatureContent(name, type, block)
			creatures.push(creature)
		} catch (error) {
			console.warn(`Failed to parse creature ${name}:`, error)
		}
	}

	return creatures
}

const parseCreatureContent = (
	name: string,
	type: string,
	content: string,
): Creature => {
	// Parse tier and category
	const tierMatch = content.match(/\*\*Tier:\*\* (\d+) \(([^)]+)\)/)
	const tier = tierMatch ? parseInt(tierMatch[1]) : 1
	const category = tierMatch ? tierMatch[2] : 'Basic'

	// Parse stats table - look for the data row after the header and separator
	// We'll look for any line with 9 pipe-separated values after the table header
	const tableLines = content.split('\n').filter((line) => line.includes('|'))
	let statsLine = ''

	// Find the stats line (should be after the header and separator lines)
	for (let i = 0; i < tableLines.length; i++) {
		const line = tableLines[i]
		if (line.includes('HP') && line.includes('AV') && line.includes('STR')) {
			// This is the header line, check the next non-separator line
			for (let j = i + 1; j < tableLines.length; j++) {
				const nextLine = tableLines[j]
				if (!nextLine.includes('---') && nextLine.split('|').length >= 10) {
					statsLine = nextLine
					break
				}
			}
			break
		}
	}

	if (!statsLine) {
		console.error('Failed to find stats line for creature:', name)
		console.error('Available table lines:', tableLines)
		throw new Error('Could not parse stats table')
	}

	// Extract values from the stats line
	const statsParts = statsLine
		.split('|')
		.map((s) => s.trim())
		.filter((s) => s.length > 0)
	if (statsParts.length < 9) {
		console.error('Not enough stats parts:', statsParts)
		throw new Error('Could not parse stats table - insufficient columns')
	}

	const [hp, av, str, agi, spi, mnd, parry, dodge, resist] = statsParts

	// Parse skills
	const skillsMatch = content.match(/\*\*Skills:\*\* ([^\n]+)/)
	const skills = skillsMatch ? parseCommaSeparatedList(skillsMatch[1]) : []

	// Parse immunities, resistances, weaknesses
	const immunitiesMatch = content.match(/\*\*Immunities:\*\* ([^\n]+)/)
	const immunities = immunitiesMatch
		? parseCommaSeparatedList(immunitiesMatch[1])
		: []

	const resistancesMatch = content.match(/\*\*Resistances:\*\* ([^\n]+)/)
	const resistances = resistancesMatch
		? parseCommaSeparatedList(resistancesMatch[1])
		: []

	const weaknessesMatch = content.match(/\*\*Weaknesses:\*\* ([^\n]+)/)
	const weaknesses = weaknessesMatch
		? parseCommaSeparatedList(weaknessesMatch[1])
		: []

	// Parse armor category. Present on every published stat block; it was being
	// dropped entirely, so printed cards never showed a creature's armor.
	const armorMatch = content.match(/\*\*Armor:\*\* ([^\n]+)/)
	const armor = armorMatch ? armorMatch[1].trim() : ''

	// Parse attacks
	const attacksSection = content.match(
		/\*\*Attacks:\*\*([\s\S]*?)(?=\*\*Abilities:\*\*|\*\*Quick Actions:\*\*|$)/,
	)
	const attacks = attacksSection ? parseAttacks(attacksSection[1]) : []

	// Parse abilities. Must stop at Quick Actions: this section used to run to the
	// end of the block, so every quick action was parsed as an ability and printed
	// unlabeled among the passives.
	const abilitiesSection = content.match(
		/\*\*Abilities:\*\*([\s\S]*?)(?=\*\*Quick Actions:\*\*|$)/,
	)
	const abilities = abilitiesSection ? parseAbilities(abilitiesSection[1]) : []

	// Parse quick actions — same line format as abilities, its own block.
	const quickActionsSection = content.match(/\*\*Quick Actions:\*\*([\s\S]*)/)
	const quickActions = quickActionsSection
		? parseAbilities(quickActionsSection[1])
		: []

	return {
		name,
		tier,
		category,
		type,
		armor,
		hp: hp.trim(), // Keep as string to preserve patterns like "2×50"
		av,
		str,
		agi,
		spi,
		mnd,
		parry: parseInt(parry),
		dodge: parseInt(dodge),
		resist: parseInt(resist),
		skills,
		immunities,
		resistances,
		weaknesses,
		attacks,
		abilities,
		quickActions,
	}
}

const parseCommaSeparatedList = (text: string): string[] => {
	if (text.trim() === '-') return []
	return text
		.split(',')
		.map((item) => item.trim())
		.filter((item) => item.length > 0)
}

/**
 * The entries of one section, with their indented sub-lines kept.
 *
 * Rewritten in M21 (owner review): the old pair of parsers demanded a period
 * AFTER the closing `**` of a name, so the Floating Eye companion's
 * `- **Eye Rays.** Roll once per eye ray…` matched nothing and the whole attack
 * was dropped with no warning — and its four numbered rays with it. They also
 * put the entry's whole first sentence in `Attack.damage`, which is why that
 * companion's bite printed as a broken ladder reading `12 / 17 / 22 damage.`
 *
 * Both faults were one fault: this file had its own idea of an entry's shape.
 * The shape lives in `creatureEntryText` now and the JSON adapter builds the
 * same one, so a card renders one contract rather than guessing between two.
 */
const parseEntries = (
	text: string,
): { head: ParsedEntryHead; details: string[] }[] => {
	const entries: { head: ParsedEntryHead; details: string[] }[] = []
	for (const line of text.split('\n')) {
		if (!line.trim()) continue
		const indented = /^\s{2,}/.test(line)
		const trimmed = line.trim()

		// An indented line — `  1. **Dazing Ray.** …`, `  - *Fireball*` — belongs to
		// the entry above it. The builder writes multi-outcome attacks and spell
		// lists that way, and the old loop treated the first one as the end of the
		// section, so everything after it was lost (M13 S8 fixed that for the sheet;
		// the print tool kept its own copy of the bug).
		if (indented && entries.length > 0) {
			// A bullet marker needs its SPACE to be one. `^[-*]\s*` ate the first
			// asterisk of `**1. Dazing Ray.**`, so the companion's eye rays printed
			// as `*1. Dazing Ray.*` — italic, with the orphaned closing `*` still
			// visible on the card (owner, 2026-08-07). A numbered marker is kept:
			// the ray's number is part of what the entry says.
			entries[entries.length - 1].details.push(
				trimmed.replace(/^[-*+][^\S\n]+/, ''),
			)
			continue
		}
		if (!trimmed.startsWith('- ')) continue
		const head = parseEntryHead(trimmed)
		if (head) entries.push({ head, details: [] })
		else console.warn('Unparsed creature entry line:', trimmed)
	}
	return entries
}

const parseAttacks = (attacksText: string): Attack[] =>
	parseEntries(attacksText).map(({ head, details }) => toAttack(head, details))

const parseAbilities = (abilitiesText: string): Ability[] =>
	parseEntries(abilitiesText).map(({ head, details }) => toAbility(head, details))
