import React from 'react'
import { FIT_BLOCK_ATTRIBUTE } from '@site/src/components/autofit'
import StatSigil from '@site/src/components/codex/StatSigil'
import type { StatSigilName } from '@site/src/components/codex/stat-sigils'
import { Creature } from '@site/src/types/Creature'

/**
 * One splittable piece of a creature card's body (M18 D3).
 *
 * `section` is the heading the block sits under. A continuation card that
 * starts inside a section redraws its heading, so a reader never meets a bare
 * list of abilities with no idea what they are.
 */
export interface CreatureBlock {
	key: string
	section?: string
	node: React.ReactNode
}

/** Simplify armor value descriptions to initials: "2 (light)" → "2 (L)". */
const simplifyArmorValue = (av: string): string =>
	av.replace(/\(([^)]+)\)/, (_match, content: string) => {
		const simplified = content
			.split(/\s+/)
			.map((word) => word.charAt(0).toUpperCase())
			.join('')
		return `(${simplified})`
	})

/**
 * One stat: its sigil, then its value (M18 S4, F4, D6).
 *
 * **The mark comes from the project's own stat sigils**, resolved through
 * `StatSigil` exactly as the screen's creature stat block resolves it — the
 * canopic jar for HP, the bull's head for Strength, the footprints for Dodge.
 * Same vocabulary on both surfaces, which is what M16 constraint 2 asks for,
 * and nothing new was drawn (D6).
 *
 * What F4 objected to was never "an icon": it was nine MUI icons in hardcoded
 * hue, off the theme's vocabulary, printing as nine identical greys. A sigil is
 * a solid `currentColor` silhouette, so it inks with the rest of the card and
 * is told apart by SHAPE, never by colour (constraint 3).
 *
 * The label rides beside it, as it does on screen: the mark is never the sole
 * carrier of meaning, and a GM who has not learned the set still reads the card.
 */
const Stat: React.FC<{
	label: string
	glyph: StatSigilName
	value: React.ReactNode
}> = ({ label, glyph, value }) => (
	<span className="pc-stat-cell">
		<StatSigil name={glyph} size="0.85em" className="pc-stat-cell__sigil" />
		<span className="pc-stat-cell__label">{label}</span> {value}
	</span>
)

/**
 * A creature's card body, as the blocks a continuation card can cut at.
 *
 * **This replaces the tool's 1 / 2 / 3-card layout strategy.** That decided how
 * many cards a creature needed by adding up the lengths of its skills, attacks
 * and abilities against thresholds of 700 and 400 characters — the same
 * mistake as the type ladder, one level up: character count was no more a proxy
 * for "how many cards" than it was for "what size type" (M18 F1, D3). The
 * creature is one card's worth of blocks now, and the measured spill decides
 * where it stops fitting.
 */
export function creatureBlocks(creature: Creature): CreatureBlock[] {
	const blocks: CreatureBlock[] = []
	const push = (key: string, node: React.ReactNode, section?: string) =>
		blocks.push({ key, node, section })

	push(
		'vitals',
		<div className="pc-stat-row">
			<Stat label="HP" glyph="hp" value={creature.hp} />
			<Stat label="AV" glyph="av" value={simplifyArmorValue(creature.av)} />
		</div>,
	)
	push(
		'attributes',
		<div className="pc-stat-row pc-stat-row--quad">
			<Stat label="STR" glyph="strength" value={creature.str} />
			<Stat label="AGI" glyph="agility" value={creature.agi} />
			<Stat label="SPI" glyph="spirit" value={creature.spi} />
			<Stat label="MND" glyph="mind" value={creature.mnd} />
		</div>,
	)
	push(
		'defenses',
		<div className="pc-stat-row pc-stat-row--triple">
			<Stat label="Parry" glyph="parry" value={creature.parry} />
			<Stat label="Dodge" glyph="dodge" value={creature.dodge} />
			<Stat label="Resist" glyph="resist" value={creature.resist} />
		</div>,
	)

	if (creature.skills.length > 0) {
		push(
			'skills',
			<>
				<strong>Skills:</strong> {creature.skills.join(', ')}
			</>,
		)
	}
	const defensive: Array<[string, string[]]> = [
		['Immune', creature.immunities],
		['Resist', creature.resistances],
		['Weak', creature.weaknesses],
	]
	defensive.forEach(([label, values]) => {
		if (values.length > 0) {
			push(
				label.toLowerCase(),
				<>
					<strong>{label}:</strong> {values.join(', ')}
				</>,
			)
		}
	})

	creature.attacks.forEach((attack, index) => {
		push(
			`attack-${index}`,
			<>
				<strong>{attack.name}</strong>
				{attack.properties.length > 0 && (
					<em> ({attack.properties.join(', ')})</em>
				)}
				: {attack.damage}
				{attack.description ? ` ${attack.description}` : ''}
			</>,
			'Attacks',
		)
	})

	creature.abilities.forEach((ability, index) => {
		push(
			`ability-${index}`,
			<>
				<strong>{ability.name}</strong>: {ability.description}
			</>,
			'Special Abilities',
		)
	})

	// Quick actions are off-turn options and print as their own section: they
	// used to be swallowed into `abilities` by a greedy section regex, so a GM
	// could not tell which options were off-turn.
	;(creature.quickActions ?? []).forEach((quickAction, index) => {
		push(
			`quick-${index}`,
			<>
				<strong>{quickAction.name}</strong>: {quickAction.description}
			</>,
			'Quick Actions',
		)
	})

	return blocks
}

/**
 * Render a slice of a creature's blocks, redrawing the heading of any section
 * the slice opens inside.
 */
export const CreatureBlocks: React.FC<{
	blocks: CreatureBlock[]
	start?: number
	end?: number
}> = ({ blocks, start = 0, end }) => {
	const shown = blocks.slice(start, end)
	return (
		<>
			{shown.map((block, index) => {
				// A continuation card redraws the heading of the section it opens
				// inside, always — a card that starts with three unlabelled
				// paragraphs does not say whether they are abilities or attacks.
				const opensSection =
					block.section !== undefined &&
					(index === 0 || shown[index - 1].section !== block.section)
				return (
					<React.Fragment key={block.key}>
						{opensSection && (
							<div className="pc-card__section">{block.section}</div>
						)}
						<div className="pc-fit" {...{ [FIT_BLOCK_ATTRIBUTE]: '' }}>
							{block.node}
						</div>
					</React.Fragment>
				)
			})}
		</>
	)
}
