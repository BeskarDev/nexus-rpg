import { Box, Checkbox, FormGroup, Typography } from '@mui/material'
import React from 'react'

export type UsesDisplayProps = {
	/** Current number of uses consumed */
	uses: number
	/** Callback when uses change */
	onUsesChange: (newUses: number) => void
	/** Maximum uses (default 3) */
	maxUses?: number
	/** Label text */
	label?: string
	/** Whether to show damage warning when all uses consumed */
	showDamageWarning?: boolean
	/** Custom damage warning text */
	damageWarningText?: string
}

/**
 * UsesDisplay - A reusable component for tracking item uses with checkboxes.
 */
export const UsesDisplay: React.FC<UsesDisplayProps> = ({
	uses,
	onUsesChange,
	maxUses = 3,
	label = 'Uses',
	showDamageWarning = true,
	damageWarningText = 'Item is damaged',
}) => {
	const usesArray = Array.from({ length: maxUses }, (_, i) => i + 1)

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, p: 0.5 }}>
			<Typography variant="caption">{label}</Typography>
			<FormGroup row sx={{ gap: 0.25 }}>
				{usesArray.map((useNumber) => (
					<Checkbox
						key={useNumber}
						size="small"
						checked={uses >= useNumber}
						onChange={(event) => {
							const newUses = event.target.checked ? useNumber : useNumber - 1
							onUsesChange(newUses)
						}}
						sx={{ p: 0.25 }}
					/>
				))}
			</FormGroup>
			{showDamageWarning && uses >= maxUses && (
				<Typography variant="caption" color="error">
					{damageWarningText}
				</Typography>
			)}
		</Box>
	)
}
