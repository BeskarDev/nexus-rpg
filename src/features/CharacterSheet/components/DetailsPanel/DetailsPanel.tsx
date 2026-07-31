import { Box } from '@mui/material'
import React from 'react'
import { FieldGroupLabel } from '../SheetField/FieldGroupLabel'
import { SheetInput, SheetInputProps } from '../SheetField/SheetInput'

/**
 * The frame every expanded row opens into — items, spells, and whatever S7 adds
 * (M13 S4b, generalized in S5).
 *
 * It lived under `02_Items/components/` while the Items tab was its only consumer.
 * The S4d log's standing instruction was to MOVE it rather than copy it when a
 * second tab needed it, because copy-then-diverge is what produced the two meta
 * bands drifting apart in that slice. This is that move.
 *
 * Before this the details panel was a flat run of fields in source order —
 * description, quality, location, slot, uses, durability, then two buttons —
 * with no statement of what belonged with what. Twelve controls in one line-wrap
 * is a form, and a form is what a player has to read every time they open a row
 * to change one thing.
 *
 * Grouped by what a field IS: identity, numbers, placement, condition. Under
 * `FieldGroupLabel`, which is the S1 device — a named group says what the group
 * is, where a rule only cuts the panel into strips and says nothing. The
 * destructive and quick-ref controls sit apart at the end, so the thing that
 * deletes an item is never adjacent to the thing that renames it.
 */

/**
 * A field in a details panel.
 *
 * `SheetInput` centres its value, which is right for a stat tile and wrong for a
 * name or a list of properties — prose reads flush left. It also caps at 5rem, so
 * every call site was overriding `maxWidth` just to hold a word. This sets both
 * once and takes a plain `width`.
 */
export const DetailField: React.FC<
	SheetInputProps & { width?: string; align?: 'left' | 'center' }
> = ({ width = '4.5rem', align = 'left', sx, ...props }) => (
	<SheetInput
		{...props}
		inputProps={{ ...props.inputProps, sx: { textAlign: align } }}
		sx={{ width, maxWidth: 'none', m: 0, ...sx }}
	/>
)

/**
 * The prose register: name, properties, description as INSCRIPTIONS.
 *
 * Three boxes stacked in a framed group was the first attempt, and the framing was
 * the problem — a name is not a form field being filled in, it is the line that
 * says what this thing is. Bare on the panel, with its small-caps caption above and
 * the slot appearing under the pointer, which is the same judgement the row titles
 * and the meta band already make about read-mostly values.
 *
 * The description keeps a keyline even at rest, because a multi-line block with no
 * edge and no content is indistinguishable from empty space; it is the one field
 * here whose emptiness needs to be visible.
 */
export const Inscription: React.FC<
	SheetInputProps & { grow?: number; block?: boolean; subject?: boolean }
> = ({ grow = 1, block, subject, sx, ...props }) => (
	<SheetInput
		{...props}
		className={[
			'cs-inscription',
			block ? 'cs-inscription--block' : '',
			subject ? 'cs-inscription--name' : '',
		]
			.filter(Boolean)
			.join(' ')}
		sx={{
			flex: `${grow} 1 12rem`,
			width: 'auto',
			maxWidth: 'none',
			m: 0,
			...sx,
		}}
	/>
)

export interface DetailsGroupProps {
	label: string
	/** The group's mark — see `FieldGroupLabel`. */
	sigil?: React.ComponentProps<typeof FieldGroupLabel>['sigil']
	/** A live preview of what the group's fields produce (the damage ladder). */
	trailing?: React.ReactNode
	children: React.ReactNode
}

/**
 * A named register of the panel: a heading with its mark, then its content.
 *
 * S4b named the groups. S4d's first pass washed and marked them, which helped
 * navigation and left them as five bordered pens of identical boxes. The wash is
 * gone from the group itself now — the CONTENT carries its own shape (the record
 * plate is a plate, the equation is an equation, the inscriptions are bare), so a
 * second frame around it was the box-inside-a-box this theme keeps removing.
 * Spacing plus a marked heading is the whole separation.
 */
export const DetailsGroup: React.FC<DetailsGroupProps> = ({
	label,
	sigil,
	trailing,
	children,
}) => (
	<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, minWidth: 0 }}>
		<FieldGroupLabel sigil={sigil} trailing={trailing}>
			{label}
		</FieldGroupLabel>
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				alignItems: 'flex-start',
				gap: 1,
				// Every child that wants the register's whole measure says so with a
				// `flex` of its own; the equation and the description both do.
				'& > .cs-equation': { flex: '1 1 100%' },
			}}
		>
			{children}
		</Box>
	</Box>
)

export interface DetailsPanelProps {
	/** The prose and the rules — name, description, the damage equation. */
	children: React.ReactNode
	/**
	 * The record plate: the item's numeric facts, as a ledger down the side — and
	 * the record's own controls, in its caption line.
	 *
	 * The panel had a trailing strip for quick-ref and delete. That is where a FORM
	 * puts its submit button, and it left two controls floating in a corner attached
	 * to nothing; they belong with the heading of the thing they act on, which is the
	 * record (S4d, owner review). So the panel no longer has an actions slot at all.
	 */
	aside?: React.ReactNode
	/**
	 * The aside column's preferred width.
	 *
	 * 17rem suits a plate of short figures (an item's cost and load). A panel whose aside
	 * carries PROSE as well — the NPC record, where the rules text for a role and a
	 * disposition sits under the selects that set them — needs more, or the column becomes
	 * a two-word-per-line gutter (M13 S6, owner review).
	 */
	asideWidth?: string
}

/**
 * Two registers, side by side (M13 S4d).
 *
 * A single wrapping flow of groups meant the panel's shape changed with its
 * content: the same item read as three rows or five depending on the window, and
 * nothing had a fixed home. Now the panel has a fixed anatomy — **what this thing
 * is** on the left (identity, damage), **what it is worth and where it is** on the
 * right (the record plate) — so a player learns one layout, and the field they want
 * is in the same place on every item.
 *
 * The plate is the narrower column and the prose the wider, which is the ratio the
 * content asks for: seven short figures against three lines of text. Below the
 * ledger breakpoint the two stack, plate last, because at that width the identity
 * is what you opened the row to see.
 */
export const DetailsPanel: React.FC<DetailsPanelProps> = ({
	children,
	aside,
	asideWidth = '17rem',
}) => (
	<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				// `stretch`, so the plate can run to the bottom of the taller column
				// instead of ending wherever its last row happens to fall.
				alignItems: 'stretch',
				gap: 1.5,
			}}
		>
			<Box
				sx={{
					flex: '1 1 22rem',
					minWidth: 0,
					display: 'flex',
					flexDirection: 'column',
					gap: 1.25,
				}}
			>
				{children}
			</Box>
			{aside && (
				<Box
					sx={{
						flex: `0 1 ${asideWidth}`,
						minWidth: 0,
						display: 'flex',
						flexDirection: 'column',
						gap: 1.25,
					}}
				>
					{aside}
				</Box>
			)}
		</Box>
	</Box>
)
