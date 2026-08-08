import { Menu } from '@mui/material'
import StatSigil from '@site/src/components/codex/StatSigil'
import React from 'react'
import { CardContent, CardHeader, CharacterSheetCard } from '../Card'
import { SheetFieldLabelContext } from './labelContext'
import { SHEET_FIELD_SIZE, SheetFieldProps } from './types'

/**
 * The one base component for every data field in the character sheet tool
 * (M9 S11).
 *
 * ## What a data field is
 *
 * Across all 28 card call sites there is exactly one recurring shape: a **sigil +
 * small-caps label**, a **value**, and optionally a **way to change it**. HP, a
 * weapon name, the Fatigue pips and the attribute die are that same shape with a
 * different value kind. So this is one base plus a value slot, not a family of
 * sibling components.
 *
 * ## What it owns that call sites used to
 *
 * - **The editor popover, entirely.** Anchor, open state, close. See `editor`.
 * - **Named widths** instead of 12 ad-hoc `minWidth` strings. See `SheetFieldSize`.
 * - **Derived accessible names.** `editLabel` and `infoLabel` default from
 *   `label`, so the a11y bug PR F found — a trigger whose name is computed from
 *   the card's whole contents, announcing "button, HP 25 / 28 minus plus" — is
 *   not reachable by forgetting a prop.
 *
 * ## What it delegates
 *
 * Presentation stays in {@link CharacterSheetCard}: the keyline and wash per
 * weight, the rivets, the cartouche keystone, the tap-to-edit hit-testing and the
 * focus ring. That component is the tuned primitive; this is the ergonomic API
 * over it, the way MUI's `TextField` composes `InputLabel` + `Input`. Splitting
 * them keeps PR D's and PR F's visual work in one place instead of copied into a
 * second card implementation.
 */
export const SheetField: React.FC<SheetFieldProps> = ({
	sigil,
	label,
	tone,
	size,
	weight,
	minWidth,
	maxWidth,
	borderColor,
	frame,
	sx,
	info,
	infoLabel,
	value,
	children,
	footer,
	editor,
	editorWidth = '17rem',
	editLabel,
	onEditOpen,
	onEditClose,
	'data-testid': testId,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	const named = size ? SHEET_FIELD_SIZE[size] : undefined
	const resolvedMinWidth = minWidth ?? named?.minWidth
	const resolvedMaxWidth = maxWidth ?? named?.maxWidth

	const close = React.useCallback(() => {
		setAnchorEl(null)
		onEditClose?.()
	}, [onEditClose])

	// A field is a trigger if it can do anything on activation — open an editor,
	// or run a side effect like the defence cards' first-click migration.
	const isEditable = Boolean(editor) || Boolean(onEditOpen)

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		onEditOpen?.()
		if (editor) setAnchorEl(event.currentTarget)
	}

	return (
		<CharacterSheetCard
			data-testid={testId}
			weight={weight}
			frame={frame}
			borderColor={borderColor}
			minWidth={resolvedMinWidth}
			maxWidth={resolvedMaxWidth}
			sx={sx}
			header={
				<CardHeader
					icon={sigil ? <StatSigil name={sigil} size="1.15em" /> : undefined}
					label={label}
					color={tone}
				/>
			}
			info={info}
			infoLabel={infoLabel ?? (info ? `About ${label}` : undefined)}
			footer={footer}
			{...(isEditable && {
				editLabel: editLabel ?? `Edit ${label}`,
				onConfigClick: handleOpen,
			})}
			configMenu={
				editor ? (
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={close}
						// M13 S1: the popover is portaled to document.body, outside
						// `.character-sheet-page`, so every `--cs-*` token an editor's
						// contents reference resolved to nothing. See the note on
						// `.cs-tokens` in characterSheet.css.
						slotProps={{ paper: { className: 'cs-tokens' } }}
						// `width` with a viewport cap, not `maxWidth` alone: a `maxWidth` lets the
						// list collapse to its content, which is how the HP and Focus editors ended
						// up narrow enough to wrap their steppers (M13 S5, owner review).
						MenuListProps={{
							sx: { p: 2, width: editorWidth, maxWidth: '92vw' },
						}}
					>
						{typeof editor === 'function' ? editor(close) : editor}
					</Menu>
				) : undefined
			}
		>
			<SheetFieldLabelContext.Provider value={label}>
				{children ?? <CardContent value={value} />}
			</SheetFieldLabelContext.Provider>
		</CharacterSheetCard>
	)
}
