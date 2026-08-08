import React from 'react'
import { Typography } from '@mui/material'
import { DerivedPart, FieldGroupLabel, SheetField } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'

export type LoadCardProps = {
	currentLoad: number
	carryCapacity: number
	maxCapacity: number
	carryModifier: number
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

const getLoadColor = (
	currentLoad: number,
	carryCapacity: number,
	maxCapacity: number,
) => {
	if (currentLoad >= maxCapacity) {
		return UI_COLORS.danger
	} else if (currentLoad >= carryCapacity) {
		return UI_COLORS.warning
	}
	return UI_COLORS.greyBlue
}

export const LoadCard: React.FC<LoadCardProps> = ({
	currentLoad,
	carryCapacity,
	maxCapacity,
	carryModifier,
	updateCharacter,
}) => {
	const loadColor = getLoadColor(currentLoad, carryCapacity, maxCapacity)

	const tooltipText =
		currentLoad >= carryCapacity
			? "Encumbered: +1 bane on STR/AGI movement, can't Dash/Evade, +1 Fatigue during travel"
			: 'Load: Current encumbrance vs carrying capacity (max is 2× capacity)'

	// M13 S4: on `SheetField`. Besides the anchor/open/close triple this deletes,
	// it fixes the portal defect S1 flagged for this file — the editor is rendered
	// at `document.body`, outside `.character-sheet-page`, so any `--cs-*` token in
	// it resolved to nothing. `SheetField` puts `.cs-tokens` on the popover paper.
	return (
		<SheetField
			sigil="load"
			label="Load"
			tone={loadColor}
			editLabel="Edit carrying capacity"
			info={tooltipText}
			minWidth="5.5rem"
			editorWidth="14rem"
			borderColor={currentLoad >= carryCapacity ? loadColor : undefined}
			footer={
				<Typography
					variant="caption"
					sx={{ fontSize: 'var(--nexus-text-2xs)', color: 'text.secondary' }}
				>
					max {maxCapacity}
				</Typography>
			}
			editor={
				<>
					<FieldGroupLabel>Carry Modifier</FieldGroupLabel>
					<Typography
						variant="caption"
						color="text.secondary"
						sx={{ display: 'block', mb: 1 }}
					>
						Base: ½ STR + 8
					</Typography>
					<DerivedPart
						value={carryModifier}
						onChange={(value) =>
							updateCharacter({
								items: { encumbrance: { carryModifier: value } },
							})
						}
						label="Modifier"
						fullWidth
					/>
				</>
			}
		>
			<Typography
				sx={{
					fontWeight: 'bold',
					fontSize: 'var(--nexus-text-lg)',
					lineHeight: 1.2,
					textAlign: 'center',
					color: 'text.primary',
				}}
			>
				{currentLoad}/{carryCapacity}
			</Typography>
		</SheetField>
	)
}
