import React from 'react'
import StatSigil from '@site/src/components/codex/StatSigil'
import { TextField } from '@mui/material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

interface NameCardProps {
	name: string
	onChange: (value: string) => void
	onBlur: () => void
	error?: string
}

export const NameCard: React.FC<NameCardProps> = ({
	name,
	onChange,
	onBlur,
	error,
}) => {
	return (
		<CharacterSheetCard
			header={
				<CardHeader icon={<StatSigil name="name" size="1.15em" />} label="Name" color={UI_COLORS.greyBlue} />
			}
			minWidth="10rem"
			maxWidth="15rem"
			frame
		>
			<TextField
				value={name}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
				error={!!error}
				placeholder="your name"
				variant="standard"
				sx={{
					'& .MuiInput-root': {
						'&:before, &:after': { display: 'none' },
					},
					'& input': {
						textAlign: 'center',
					},
				}}
			/>
		</CharacterSheetCard>
	)
}
