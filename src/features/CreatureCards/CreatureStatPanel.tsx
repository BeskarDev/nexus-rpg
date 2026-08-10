import React from 'react'
import DieToken from '@site/src/components/codex/DieToken'
import StatSigil from '@site/src/components/codex/StatSigil'
import type { StatSigilName } from '@site/src/components/codex/stat-sigils'
import {
	armorAbbr,
	splitAv,
	splitHp,
} from '@site/src/components/codex/creatureStats'
import type { Creature } from '@site/src/types/Creature'

/**
 * The creature's nine numbers, in the docs stat block's reading order and at the
 * card's own density (M21 D2, F3, revised after the owner's review 2026-08-07).
 *
 * `CreatureStatBlock`'s own doc records the order and the reason, and both
 * transfer to paper unchanged:
 *
 * 1. **Defenses** — "what do I roll against?" First, and set largest.
 * 2. **Vitals** — "how long does it last?" HP with life-pool pips, AV split into
 *    a numeral and a two-letter armor tag.
 * 3. **Attributes** — "what does it roll?" Four `DieToken`s, whose polygon side
 *    count encodes the die.
 *
 * **The groups are FENCED, and that is not decoration.** The first revision ran
 * all nine together on two flat rows and a reader could not see where the
 * defenses ended and the vitals began — precisely the fault the docs block had
 * already fixed, with the same device: a keyline between two groups. That is the
 * one place a rule earns its keep in this theme, because it is a boundary
 * between panels rather than a bar dropped in to bind related items together.
 *
 * **The visible label is gone from all nine** (owner, Q1) — the printed-card
 * pattern file's own rule, written for the spell card's target and range: a mark
 * REPLACES the label at these sizes. The word stays as `srOnly` text, so the
 * mark is never the only carrier of meaning.
 *
 * **The dice are sized so the NUMBER can be read**, not so the polygon fits. At
 * 3mm the shapes were legible and the numerals inside them were not, which
 * inverts the whole point of the token — a reader who has not learned the shape
 * language is supposed to lose nothing. `--die-token-numeral` on the panel
 * raises the numeral's share of the box for exactly this surface.
 *
 * The panel lives in `PlayingCard`'s HEADER slot, outside the fitted region, so
 * every row must be free to wrap between its cells rather than overflow (layout
 * laws 2 and 3). Flex, never a fixed-column grid.
 */

/** One figure: its mark and its value, and nothing else visible. */
const Figure: React.FC<{
	label: string
	glyph: StatSigilName
	value: React.ReactNode
	children?: React.ReactNode
}> = ({ label, glyph, value, children }) => (
	<span className="pc-figure">
		<StatSigil name={glyph} size="1.05em" className="pc-figure__mark" />
		<span className="pc-figure__value">{value}</span>
		{children}
		<span className="pc-cell__name">{label}</span>
	</span>
)

export const CreatureStatPanel: React.FC<{ creature: Creature }> = ({
	creature,
}) => {
	const armor = splitAv(creature.av)
	const vitality = splitHp(creature.hp)

	return (
		<div className="pc-statpanel">
			<div className="pc-statpanel__row">
				<div className="pc-statpanel__group pc-statpanel__group--defenses">
					<Figure label="Parry" glyph="parry" value={creature.parry} />
					<Figure label="Dodge" glyph="dodge" value={creature.dodge} />
					<Figure label="Resist" glyph="resist" value={creature.resist} />
				</div>
				<div className="pc-statpanel__group pc-statpanel__group--vitals">
					<Figure label="Hit Points" glyph="hp" value={vitality.value}>
						{/* Elite and Lord creatures fight through several pools in
						    sequence, so the count is a structural fact about the fight
						    rather than a multiplier — the card printed `2×50` as one
						    literal number before this (D3).

						    A COUNT, not pips (owner, 2026-08-07). Three drawn squares
						    cost more of the line than `×3` does and have to be counted
						    rather than read; the numeral is denser and says the same
						    thing, which is the panel's whole argument applied to itself. */}
						{vitality.pools > 1 && (
							<span className="pc-figure__pools">
								{`×${vitality.pools}`}
								<span className="pc-cell__name">
									{` ${vitality.pools} life pools`}
								</span>
							</span>
						)}
					</Figure>
					<Figure label="Armor Value" glyph="av" value={armor.value}>
						{armor.note && (
							<span className="pc-figure__armor">
								{armorAbbr(armor.note)}
								<span className="pc-cell__name">{` (${armor.note})`}</span>
							</span>
						)}
					</Figure>
				</div>
			</div>
			{/* The attributes take a ROW of their own rather than a third fenced
			    group on the first one. As a wrapping group its keyline fence came
			    with it onto the next line and read as a stray bar floating to the
			    left of the dice — a row boundary already separates them, and a rule
			    that only sometimes means something means nothing. */}
			<div className="pc-statpanel__row">
				<div className="pc-statpanel__group pc-statpanel__group--dice">
					{(
						[
							['Strength', 'strength', creature.str],
							['Agility', 'agility', creature.agi],
							['Spirit', 'spirit', creature.spi],
							['Mind', 'mind', creature.mnd],
						] as const
					).map(([label, glyph, value]) => (
						<span className="pc-figure pc-figure--die" key={label}>
							{/* The attribute's own sigil, as the five figures above carry
							    theirs (owner, 2026-08-07). The polygon says which DIE to
							    pick up; it does not say which attribute — without a mark
							    the row was four shapes in an order a reader had to know. */}
							<StatSigil
								name={glyph}
								size="1.05em"
								className="pc-figure__mark"
							/>
							<DieToken value={value} />
							<span className="pc-cell__name">{label}</span>
						</span>
					))}
				</div>
			</div>
		</div>
	)
}
