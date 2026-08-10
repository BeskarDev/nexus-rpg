import React from 'react'
import SigilIcon from '@site/src/components/codex/SigilIcon'
import { CREATURE_TRAIT_SIGIL } from '@site/src/components/codex/creature-trait-sigils'

/**
 * A creature's trait rows on a printed card — skills, immunities, resistances,
 * weaknesses (owner review, 2026-08-07).
 *
 * The card printed these as `**Skills:** Fighting (0), Perception (1)` — a bold
 * run-in and a comma sentence. The docs stat block answered the same question
 * years ago and answered it better: a labelled row whose VALUES are chips, so a
 * GM scans the list instead of reading it. The two surfaces now say the same
 * thing in the same shapes; what changes is the medium.
 *
 * **Ink, not colour.** On screen a skill chip carries a hue and a wash. On paper
 * nothing has a hue to spend, so each chip is a keyline: an ink silhouette with
 * the paper inset a hairline over it, which is the construction `CardTag` and
 * the site's plugin chips already use, and the only way a clipped shape can
 * carry an outline at all.
 *
 * **The silhouettes are the theme's own, and they stay distinct** — the pattern
 * file's rule that two devices are only different on paper if their OUTLINES
 * differ:
 *
 * | Row | Shape | Why |
 * |---|---|---|
 * | Skills | banner, pointed both ends | a named proficiency — the theme's skill chip |
 * | Immune / Resist / Weak | cut-corner tessera | an inlaid stone chip, the damage family |
 *
 * The label keeps its sigil, as the docs' `Cartouche` does, so the row is
 * identifiable before it is read.
 */

/** `Fighting (0)` — the rank absorbed into the tag, as the chips plugin does. */
const SKILL_RANK = /^(.*?)\s*\((\d+)\)\s*$/

const SkillTag: React.FC<{ value: string }> = ({ value }) => {
	const match = value.match(SKILL_RANK)
	const name = match ? match[1] : value
	const rank = match?.[2]
	return (
		<span
			className={`pc-chip pc-chip--skill${
				name.length > WIDE_VALUE ? ' pc-chip--wide' : ''
			}`}
		>
			<span className="pc-chip__face" aria-hidden="true" />
			<span className="pc-chip__label">
				{name}
				{rank !== undefined && <span className="pc-chip__rank">{rank}</span>}
			</span>
		</span>
	)
}

/**
 * A value long enough to need two lines gives up the fixed height (see
 * `.pc-chip--wide`). `physical damage (from non-magical weapons)` is the case:
 * 41 characters against a 53mm measure.
 */
const WIDE_VALUE = 22

const TraitTessera: React.FC<{ value: string }> = ({ value }) => (
	<span
		className={`pc-chip pc-chip--trait${
			value.length > WIDE_VALUE ? ' pc-chip--wide' : ''
		}`}
	>
		<span className="pc-chip__face" aria-hidden="true" />
		<span className="pc-chip__label">{value}</span>
	</span>
)

export type TraitRowKind =
	'Skills' | 'Immunities' | 'Resistances' | 'Weaknesses'

/**
 * One labelled trait row.
 *
 * The label uses the docs' own wording — `Immunities`, not the card's old
 * `Immune` — so a GM reading a card and a GM reading the bestiary are reading
 * the same row.
 */
export const TraitRow: React.FC<{ label: TraitRowKind; values: string[] }> = ({
	label,
	values,
}) => {
	const glyph = CREATURE_TRAIT_SIGIL[label]
	return (
		<div className="pc-trait">
			<span className="pc-trait__label">
				{glyph && (
					<SigilIcon name={glyph} size="0.95em" className="pc-trait__glyph" />
				)}
				{label}
			</span>{' '}
			<span className="pc-trait__values">
				{values.map((value) =>
					label === 'Skills' ? (
						<SkillTag key={value} value={value} />
					) : (
						<TraitTessera key={value} value={dropDamageWord(value)} />
					),
				)}
			</span>
		</div>
	)
}

/**
 * Under a row already labelled "Weaknesses", `fire damage` says damage twice.
 * The docs generator drops the word for the same reason.
 */
function dropDamageWord(item: string): string {
	return item
		.replace(/\bdamage\b/g, '')
		.replace(/\s{2,}/g, ' ')
		.trim()
}
