import { Avatar, Box, styled, TextField, Typography } from '@mui/material'
import { SheetLayout } from './SheetLayout'
import React from 'react'
import { Character, Wound } from '@site/src/types/Character'
import { RoundTextField } from '../../CharacterSheet/CharacterSheetTabs/00_Statistics/RoundTextField'
import { DiceGuide } from '../assets/DiceGuide'
import { WoundCheckbox } from '../../CharacterSheet/CharacterSheetTabs/00_Statistics/WoundCheckbox'

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
	marginBottom: 0,
	'& .MuiOutlinedInput-root': {
		fontWeight: 'bold',
		'& .MuiOutlinedInput-notchedOutline': {
			borderWidth: '3px',
		},
	},
	'& .MuiFormHelperText-root': {
		marginTop: 0,
	},
})

const OutlinedTextfield = styled(TextField)({
	'& .MuiOutlinedInput-root': {
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: 'black',
		},
		'& .MuiInputBase-input.MuiOutlinedInput-input': {
			textAlign: 'right',
		},
	},
})

const WoundIndicator = styled(Avatar)({
	width: 24,
	height: 24,
	backgroundColor: 'transparent',
	color: 'black',
	border: '2px solid black',
})

export const StatisticsSheet: React.FC<{ char: Character }> = ({ char }) => {
	const displayWound = (wound: Wound) => {
		if (wound.injury) {
			return 'I'
		}
		if (wound.fatigueOne && !wound.fatigueTwo) {
			return '/'
		}
		if (wound.fatigueOne && wound.fatigueTwo) {
			return 'X'
		}
		return ' '
	}

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
							helperText={char.statistics.strength.wounded ? '( W )' : '(___)'}
							sx={{
								'& .MuiFormLabel-root.MuiInputLabel-root': {
									left: -12,
								},
							}}
						/>
						<AttributeField
							value={'d' + char.statistics.agility.value}
							label="Agility"
							helperText={char.statistics.agility.wounded ? '( W )' : '(___)'}
							sx={{
								'& .MuiFormLabel-root.MuiInputLabel-root': {
									left: -8,
								},
							}}
						/>
						<AttributeField
							value={'d' + char.statistics.spirit.value}
							label="Spirit"
							helperText={char.statistics.spirit.wounded ? '( W )' : '(___)'}
							sx={{
								'& .MuiFormLabel-root.MuiInputLabel-root': {
									left: -6,
								},
							}}
						/>
						<AttributeField
							value={'d' + char.statistics.mind.value}
							label="Mind"
							helperText={char.statistics.mind.wounded ? '( W )' : '(___)'}
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
						<AttributeField
							value={char.statistics.resolve}
							label="Resolve"
							sx={{
								'& .MuiFormLabel-root.MuiInputLabel-root': {
									left: -10,
								},
								'& .MuiOutlinedInput-root': {
									borderRadius: '1rem',
								},
							}}
						/>
					</Box>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Box sx={{ display: 'flex', gap: 1, mt: -0.5 }}>
						<OutlinedTextfield
							value={char.statistics.health.current}
							label="Current HP"
							sx={{
								maxWidth: '8rem',
								'& .MuiOutlinedInput-root': {
									pb: 2,
									'& .MuiOutlinedInput-notchedOutline': {
										borderWidth: '2px',
									},
								},
							}}
						/>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<OutlinedTextfield
								size="small"
								value={char.statistics.health.temp}
								label="Temp. HP"
								sx={{
									maxWidth: '4rem',
									'& .MuiInputBase-input.MuiOutlinedInput-input': {
										py: 0.75,
									},
								}}
							/>
							<OutlinedTextfield
								size="small"
								value={char.statistics.health.total}
								label="Max. HP"
								sx={{
									maxWidth: '4rem',
									'& .MuiInputBase-input.MuiOutlinedInput-input': {
										py: 0.75,
									},
								}}
							/>
						</Box>
					</Box>
					<Box
						sx={{
							display: 'flex',
							gap: 1,
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<OutlinedTextfield
							value={
								char.statistics.av.armor +
								char.statistics.av.helmet +
								char.statistics.av.shield +
								char.statistics.av.other
							}
							label="AV"
							sx={{
								maxWidth: '5rem',
								'& .MuiInputBase-input.MuiOutlinedInput-input': {
									py: 1,
								},
							}}
						/>
						<Box sx={{ mt: -2 }}>
							<Typography color="text.secondary" variant="caption">
								Wounds
							</Typography>
							<Box
								sx={{
									display: 'flex',
									gap: 1,
								}}
							>
								<WoundIndicator>
									{displayWound(char.statistics.health.woundOne)}
								</WoundIndicator>
								<WoundIndicator>
									{displayWound(char.statistics.health.woundTwo)}
								</WoundIndicator>
								<WoundIndicator>
									{displayWound(char.statistics.health.woundThree)}
								</WoundIndicator>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</SheetLayout>
	)
}
