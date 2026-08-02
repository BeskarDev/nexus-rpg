import React from 'react'
import { Box } from '@mui/material'
import StatSigil from '@site/src/components/codex/StatSigil'
import { CharacterDocument } from '@site/src/types/Character'
import { ReadCell } from '../components'
import { calculateCharacterLevel } from '../utils/calculateCharacterLevel'
import { DeleteButton } from './DeleteButton'
import { CHARACTER_TEMPLATE } from './characterColumns'

export type CharacterRowProps = {
	character: CharacterDocument
	onDelete: () => void
}

/**
 * One character, as a ledger line (M13 S12).
 *
 * ## Why this is an anchor and not `UnifiedListItem`
 *
 * The primitive has two variants and neither is this one: a DISCLOSURE (a summary
 * that opens a panel) and a CHOICE (a row the reader picks from, as the search
 * dialogs do). A character row is a **link** — it navigates to another page — and
 * wrapping a link in a button, or a button in a link, is the markup that makes
 * keyboard and middle-click behaviour wrong in both directions.
 *
 * So it borrows the ledger's LOOK rather than its component: the same
 * `cs-ledger-row` rule, the same grid classes, the same `ReadCell`s, so a reader
 * who has read the Items tab reads this without learning anything new. What it
 * does not borrow is a disclosure it does not have.
 *
 * ## The gutter
 *
 * The portrait when there is one, and `figure` — the mark for a person, the same
 * one the Folk field carries on the Personal tab — when there is not. Not the
 * `scroll` sigil the old list used for every row: `scroll` means "a character
 * sheet" in the header and the breadcrumb, so a column of them said the same
 * thing four times and identified nobody.
 */
export const CharacterRow: React.FC<CharacterRowProps> = ({
	character,
	onDelete,
}) => {
	const level = calculateCharacterLevel(character.skills.xp.spend)
	const href = `${window.location.href.split('?')[0]}?id=${character.collectionId}-${character.docId}`

	return (
		<Box className="cs-character-line">
			<Box
				component="a"
				href={href}
				className="cs-ledger-row cs-ledger-row-grid cs-character-row"
				sx={{ gridTemplateColumns: CHARACTER_TEMPLATE }}
			>
				<Box className="cs-character-row__mark" aria-hidden="true">
					{character.personal.profilePicture ? (
						<Box
							component="img"
							src={character.personal.profilePicture}
							alt=""
							className="cs-character-row__portrait"
						/>
					) : (
						<StatSigil name="folk" size={15} />
					)}
				</Box>
				<ReadCell label="Name" strong className="cs-character-row__name">
					{character.personal.name || 'Unnamed'}
				</ReadCell>
				<ReadCell label="Folk">{character.personal.folk}</ReadCell>
				<ReadCell label="Background">{character.personal.background}</ReadCell>
				<ReadCell label="Level" align="center">
					{level}
				</ReadCell>
				<span />
			</Box>
			{/* Outside the anchor: a button cannot live inside a link.
				`cs-section-actions` is what makes it a peer of every other control
				strip on the sheet — the stamped plate, and the danger ink on hover
				only. Without it the bin inherits MUI's default ink and is the
				brightest thing on a page of quiet rows. */}
			<Box className="cs-character-line__actions cs-section-actions">
				<DeleteButton
					handleDeleteCharacter={onDelete}
					characterName={character.personal.name}
				/>
			</Box>
		</Box>
	)
}
