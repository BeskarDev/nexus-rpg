import React from 'react'
import { ActionType } from '@site/src/types/ActionType'
import { AbilityTag } from '@site/src/types/AbilityTag'
import { getSkillChipColor } from '@site/src/constants/skills'
import {
	ReadCell,
	SheetChip,
} from '@site/src/features/CharacterSheet/components'
import { ActionMark } from './ActionMark'
import { isTalentShape } from './abilityColumns'

export type AbilitySummaryProps = {
	title: string
	actionType: ActionType
	tag?: AbilityTag
	rank?: number
	skill?: string
}

/**
 * The collapsed view of an ability — a ledger line, read only (M13 S8c).
 *
 * ## What it was
 *
 * A `TextField` for the title with a hover-revealed slot, a Material action-type
 * icon as its start adornment, a circled-numeral rank glyph (`①`) as its end
 * adornment, and an outlined MUI `Chip` for the skill with its colours written
 * straight onto `sx`. Three faults the Items and Spells rows had already fixed:
 *
 * - **The row was a form.** The name was edited here while everything else about
 *   the ability was edited in the panel below, so one entity had two editors and
 *   neither held all of it. D5 settles this: a summary SHOWS, and edits only what
 *   changes mid-fight. Nothing about an ability does.
 * - **The rank was a Unicode circled numeral.** `①` is a font-dependent glyph
 *   masquerading as a designed mark; it renders differently on every platform and
 *   it is not in the sheet's type scale at all.
 * - **The skill chip was a Material pill** with `borderColor`/`color` set inline,
 *   which is the construction `SheetChip` exists to replace — identity in the ink,
 *   in the same stamp the Skills tab, the talent-point plate and the search
 *   dialogs all show for the same skill.
 *
 * ## What it is
 *
 * Read cells, and no controls at all. An ability has nothing a player adjusts
 * mid-fight — no uses to spend, no focus to pay — so unlike the item row (wear
 * pips) and the spell row (the cast plate) this one is pure record.
 *
 * ## What the second cut removed (owner review)
 *
 * The name is the fact the row exists to carry, and it was the only one that could
 * not be read: `Cle…`, `Rip…`, `Adr…`. Two things were eating it.
 *
 * - **The action type, written out.** 4.75rem to say `Quick Action` on every row
 *   of a column whose values repeat endlessly. It is a mark now.
 * - **The description.** A 2fr track spent on `While …` — a lead so clipped it
 *   said nothing, for a fact that is the entire reason to open the row. Gone from
 *   the summary; the panel has it in full.
 */
export const AbilitySummary: React.FC<AbilitySummaryProps> = ({
	title,
	actionType,
	tag,
	rank = 1,
	skill,
}) => (
	<>
		<ActionMark actionType={actionType} />
		<ReadCell label="Name" strong>
			{title}
		</ReadCell>
		{/* Skill and rank are the Talent shape's own tracks. The other three
			categories do not reserve them: they are separate `ListSection`s behind
			their own headers, so there is no alignment across the break to protect
			and two empty columns read as holes rather than as a grid. */}
		{isTalentShape(tag) && (
			<>
				<ReadCell label="Skill">
					{skill ? (
						<SheetChip tone={getSkillChipColor(skill)}>{skill}</SheetChip>
					) : (
						''
					)}
				</ReadCell>
				<ReadCell label="Rank" align="center">
					{rank}
				</ReadCell>
			</>
		)}
	</>
)
