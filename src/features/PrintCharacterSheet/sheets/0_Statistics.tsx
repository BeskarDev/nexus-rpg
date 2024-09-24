import { Box, styled, TextField, Typography } from '@mui/material'
import { SheetLayout } from './SheetLayout'
import React from 'react'
import { Character } from '@site/src/types/Character'
import { RoundTextField } from '../../CharacterSheet/CharacterSheetTabs/00_Statistics/RoundTextField'
import { DiceGuide } from '../assets/DiceGuide'

const CharacterHeaderTextField = styled(TextField)({
	marginTop: 0,
	'& .MuiInputBase-input.MuiInput-input': {
		paddingBottom: 0,
	},
})
CharacterHeaderTextField.defaultProps = {
	size: 'small',
	variant: 'standard',
}

const AttributeField = styled(RoundTextField)({
	'& .MuiOutlinedInput-root': {
		fontWeight: 'bold',
		'& .MuiOutlinedInput-notchedOutline': {
			borderWidth: '3px',
		},
	},
})

export const StatisticsSheet: React.FC<{ char: Character }> = ({ char }) => {
	return (
		<SheetLayout>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<CharacterHeaderTextField value={char.personal.name} label="Name" />
				<CharacterHeaderTextField value={char.personal.folk} label="Folk" />
				<CharacterHeaderTextField
					value={char.personal.upbringing}
					label="Upbringing"
				/>
				<CharacterHeaderTextField
					value={char.personal.background}
					label="Background"
				/>
			</Box>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<DiceGuide />
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<AttributeField
							value={'d' + char.statistics.strength.value}
							label="Strength"
							sx={{
								'& .MuiFormLabel-root.MuiInputLabel-root': {
									left: -12,
								},
							}}
						/>
						<AttributeField
							value={'d' + char.statistics.agility.value}
							label="Agility"
							sx={{
								'& .MuiFormLabel-root.MuiInputLabel-root': {
									left: -8,
								},
							}}
						/>
						<AttributeField
							value={'d' + char.statistics.spirit.value}
							label="Spirit"
							sx={{
								'& .MuiFormLabel-root.MuiInputLabel-root': {
									left: -6,
								},
							}}
						/>
						<AttributeField
							value={'d' + char.statistics.mind.value}
							label="Mind"
							sx={{
								'& .MuiFormLabel-root.MuiInputLabel-root': {
									left: -4,
								},
							}}
						/>
					</Box>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<RoundTextField
							value={char.statistics.parry}
							label="Parry"
							sx={{
								'& .MuiFormLabel-root.MuiInputLabel-root': {
									left: -4,
								},
							}}
						/>
						<RoundTextField
							value={char.statistics.dodge}
							label="Dodge"
							sx={{
								'& .MuiFormLabel-root.MuiInputLabel-root': {
									left: -4,
								},
							}}
						/>
						<RoundTextField
							value={char.statistics.resist}
							label="Resist"
							sx={{
								'& .MuiFormLabel-root.MuiInputLabel-root': {
									left: -4,
								},
							}}
						/>
					</Box>
				</Box>
			</Box>
		</SheetLayout>
	)
}
