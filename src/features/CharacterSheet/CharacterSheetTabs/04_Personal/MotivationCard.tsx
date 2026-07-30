import React from 'react'
import StatSigil from '@site/src/components/codex/StatSigil'
import { TextField } from '@mui/material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

interface MotivationCardProps {
	motivation: string
	onChange: (value: string) => void
	onBlur: () => void
	error?: string
}

export const MotivationCard: React.FC<MotivationCardProps> = ({
	motivation,
	onChange,
	onBlur,
	error,
}) => {
	return (
		<CharacterSheetCard
			header={<CardHeader icon={<StatSigil name="motivation" size="1.15em" />} label="Motivation" color={UI_COLORS.greyBlue} />}
			minWidth="8rem"
			maxWidth="12rem"
			frame
		>
			<TextField
				value={motivation}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
				error={!!error}
				placeholder="your motivation"
				variant="standard"
				sx={{
					'& .MuiInput-root': {
						'&:before, &:after': { display: 'none' },
					},
					'& input': {
						textAlign: 'center',
					},
					width: '100%',
				}}
			/>
		</CharacterSheetCard>
	)
}
