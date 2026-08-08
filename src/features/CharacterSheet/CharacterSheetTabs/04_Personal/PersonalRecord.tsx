import React from 'react'
import { IconButton } from '@mui/material'
import {
	DetailField,
	RecordPlate,
	RecordRow,
} from '@site/src/features/CharacterSheet/components'
import SigilIcon from '@site/src/components/codex/SigilIcon'
import type { SheetSigilName } from '@site/src/components/codex/stat-sigils'

export type PersonalRecordField = {
	label: string
	sigil: SheetSigilName
	value: string
	onChange: (value: string) => void
	onBlur: () => void
	error?: string
	/** Opens a selection dialog — folk, upbringing, background. */
	onPick?: () => void
	/** Starts a new section of the plate above this row. */
	section?: boolean
}

export type PersonalRecordProps = {
	fields: PersonalRecordField[]
}

/**
 * A character's identity, as a record plate (M13 S6).
 *
 * ## What this replaced
 *
 * Nine `SheetField` cards, each with `frame` — the codex kit's cartouche keystone plus
 * four corner rails, the site's most ornate container — laid out in a wrapping grid. So
 * the tab opened with nine keystones, one apiece for name, height, weight and age.
 *
 * The owner's judgement was that the frame is a LARGE-container treatment, and it is.
 * An ornament that says "this is a carved plate" says nothing when the plate holds one
 * word, and nine of them in a grid is a wall of ornament competing with the values
 * inside it. The frame now appears once per tab, on `TabHeader`.
 *
 * ## Why a plate rather than nine plain tiles
 *
 * Because these are *facts about one subject*, which is exactly what `RecordPlate` is
 * for — it is the same shape the Items and Spells details panels use, and the same
 * argument: one label measure, one column edge, ruled courses, so "how tall, how old,
 * what folk" is one downward glance instead of nine separate readings. Dropping `frame`
 * alone would have left nine tiles in a grid, which is the dashboard the theme's
 * composition rules reject.
 *
 * The plate breaks into two sections: who they are (name, folk, upbringing, background,
 * motivation) and what they look like (height, weight, age). Same device as the Items
 * record, where the break separates the item from the copy of it.
 *
 * The three picker rows keep a real edit control rather than becoming a select: the
 * dialog behind it carries descriptions and rules text, and the field itself must stay
 * free text — a character can be a folk the rulebook has not published.
 */
export const PersonalRecord: React.FC<PersonalRecordProps> = ({ fields }) => (
	<RecordPlate label="Character">
		{fields.map((field) => (
			<RecordRow
				key={field.label}
				sigil={field.sigil}
				label={field.label}
				section={field.section}
			>
				<DetailField
					value={field.value}
					onChange={(event) => field.onChange(event.target.value)}
					onBlur={field.onBlur}
					error={!!field.error}
					width="100%"
					align="left"
					inputProps={{ 'aria-label': field.label }}
					sx={{ flex: '1 1 auto' }}
				/>
				{field.onPick && (
					// A SCROLL, not a pencil (S6, owner review). A pencil means "edit", and the
					// field beside this is already editable by typing in it — what this opens is
					// the rulebook's list of published folk, upbringings and backgrounds. The
					// scroll is the mark the character list and the sheet header already use for
					// "the book", so it costs nothing against the sigil budget.
					<IconButton
						size="small"
						onClick={field.onPick}
						title={`Choose ${field.label.toLowerCase()} from the rulebook`}
						aria-label={`Choose ${field.label.toLowerCase()} from the rulebook`}
					>
						<SigilIcon name="scroll" size={15} />
					</IconButton>
				)}
			</RecordRow>
		))}
	</RecordPlate>
)
