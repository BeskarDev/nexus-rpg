import React from 'react'
import { Box, Typography } from '@mui/material'
import { DerivedPart, FieldGroupLabel, SheetField } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { characterSheetActions } from '../../characterSheetReducer'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'

export type XpCardProps = {
	total: number
	spent: number
}

/**
 * Experience — spent, total, and what is left to spend (M13 S3).
 *
 * On `SheetField` rather than a hand-built `CharacterSheetCard` + `Menu`. That
 * removes the local anchor/open/close triple and the hand-written `editLabel`,
 * and it fixes a real defect for free: the editor is portaled to
 * `document.body`, so before this its contents were outside
 * `.character-sheet-page` and any `--cs-*` token in them resolved to nothing.
 * `SheetField` puts `.cs-tokens` on the popover paper (M13 S1).
 */
export const XpCard: React.FC<XpCardProps> = ({ total, spent }) => {
	const dispatch = useAppDispatch()

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const remaining = total - spent

	return (
		<SheetField
			sigil="xp"
			label="Experience"
			tone={UI_COLORS.amber}
			minWidth="8rem"
			info="Your spent and total XP."
			sx={{ alignSelf: 'flex-start' }}
			editorWidth="14rem"
			editor={
				<>
					<FieldGroupLabel sx={{ mb: 1 }}>Total XP</FieldGroupLabel>
					<DerivedPart
						value={total}
						onChange={(value) =>
							updateCharacter({ skills: { xp: { total: value } } })
						}
						label="Total XP"
						fullWidth
					/>
				</>
			}
		>
			<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'baseline' }}>
				<Typography
					sx={{
						fontWeight: 'bold',
						fontSize: 'var(--nexus-text-lg)',
						lineHeight: 1.2,
					}}
				>
					{spent}
				</Typography>
				<Typography
					sx={{ fontSize: 'var(--nexus-text-xs)', color: 'text.secondary' }}
				>
					/ {total}
				</Typography>
				<Typography
					sx={{
						fontSize: 'var(--nexus-text-xs)',
						ml: 0.5,
						color: remaining >= 0 ? UI_COLORS.success : UI_COLORS.danger,
					}}
				>
					({remaining >= 0 ? '+' : ''}
					{remaining})
				</Typography>
			</Box>
		</SheetField>
	)
}
