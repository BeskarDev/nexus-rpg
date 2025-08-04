import { Avatar, Box, styled, TextField, Typography } from '@mui/material'
import { SheetLayout } from './SheetLayout'
import React from 'react'
import { Character, Wound } from '@site/src/types/Character'
import { RoundTextField } from '../../CharacterSheet/CharacterSheetTabs/00_Statistics/RoundTextField'
import { DiceGuide } from '../assets/DiceGuide'
import { WoundCheckbox } from '../../CharacterSheet/CharacterSheetTabs/00_Statistics/WoundCheckbox'
import {
	CharacterHeaderTextField,
	OutlinedTextfield,
	RankIndicator,
} from '../PrintCharacterSheet'
import { calculateCharacterLevel } from '../../CharacterSheet/utils/calculateCharacterLevel'

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

const WoundIndicator = styled(Avatar)({
	width: 24,
	height: 24,
	backgroundColor: 'transparent',
	color: 'black',
	border: '2px solid black',
})

export const StatisticsSheet: React.FC<{ char: Character }> = ({ char }) => {
	const getWoundedAttributes = () => {
		const woundedAttrs = []
		if (char.statistics.strength.wounded) woundedAttrs.push('STR')
		if (char.statistics.agility.wounded) woundedAttrs.push('AGI')
		if (char.statistics.spirit.wounded) woundedAttrs.push('SPI')
		if (char.statistics.mind.wounded) woundedAttrs.push('MND')
		return woundedAttrs
	}

	const displayWound = (woundIndex: number) => {
		const woundedAttrs = getWoundedAttributes()
		if (woundIndex < woundedAttrs.length) {
			return woundedAttrs[woundIndex]
		}
		// Show fatigue levels based on current fatigue
		const fatigueThresholds = [2, 4, 6] // Fatigue levels for each wound slot
		if (char.statistics.fatigue && char.statistics.fatigue.current > fatigueThresholds[woundIndex]) {
			const fatigueLevel = Math.min(2, Math.floor((char.statistics.fatigue.current - fatigueThresholds[woundIndex]) / 2) + 1)
			return fatigueLevel === 1 ? '/' : 'X'
		}
		return ' '
	}

	return (
		<SheetLayout>
			<Box sx={{ display: 'flex', gap: 1, mt: -0.5 }}>
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
			<Box sx={{ display: 'flex', gap: 1, height: '8rem' }}>
				<DiceGuide />
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<AttributeField
							value={
								char.statistics.strength.value
									? 'd' + char.statistics.strength.value
									: ' '
							}
							label="Strength"
							helperText={char.statistics.strength.wounded ? '( W )' : '(___)'}
							sx={{
								'& .MuiFormLabel-root.MuiInputLabel-root': {
									left: -12,
								},
							}}
						/>
						<AttributeField
							value={
								char.statistics.agility.value
									? 'd' + char.statistics.agility.value
									: ' '
							}
							label="Agility"
							helperText={char.statistics.agility.wounded ? '( W )' : '(___)'}
							sx={{
								'& .MuiFormLabel-root.MuiInputLabel-root': {
									left: -8,
								},
							}}
						/>
						<AttributeField
							value={
								char.statistics.spirit.value
									? 'd' + char.statistics.spirit.value
									: ' '
							}
							label="Spirit"
							helperText={char.statistics.spirit.wounded ? '( W )' : '(___)'}
							sx={{
								'& .MuiFormLabel-root.MuiInputLabel-root': {
									left: -6,
								},
							}}
						/>
						<AttributeField
							value={
								char.statistics.mind.value
									? 'd' + char.statistics.mind.value
									: ' '
							}
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
									borderRadius: '0.5rem',
									'& .MuiOutlinedInput-notchedOutline': {
										border: '2px dotted black',
										borderTopColor: 'transparent',
									},
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
									'& input': {
										pt: 1,
										pb: 5.2,
									},
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
						<Box sx={{ display: 'flex', gap: 1 }}>
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
							{char.statistics.fatigue && (
								<Box sx={{ display: 'flex', flexDirection: 'column' }}>
									<OutlinedTextfield
										size="small"
										value={char.statistics.fatigue.current}
										label="Fatigue"
										sx={{
											maxWidth: '3rem',
											'& .MuiInputBase-input.MuiOutlinedInput-input': {
												py: 0.75,
											},
										}}
									/>
									<OutlinedTextfield
										size="small"
										value={char.statistics.fatigue.max}
										label="Max"
										sx={{
											maxWidth: '3rem',
											'& .MuiInputBase-input.MuiOutlinedInput-input': {
												py: 0.75,
											},
										}}
									/>
								</Box>
							)}
						</Box>
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
									{displayWound(0)}
								</WoundIndicator>
								<WoundIndicator>
									{displayWound(1)}
								</WoundIndicator>
								<WoundIndicator>
									{displayWound(2)}
								</WoundIndicator>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', height: '100%' }}>
				<Box sx={{ width: '50%' }}>
					<Box sx={{ display: 'flex', mt: 6, alignItems: "center" }}>
						<RoundTextField
							value={(typeof char.skills.xp.spend == 'number') ? calculateCharacterLevel(char.skills.xp.spend) : ' '}
							label="Level"
							sx={{
								ml: 5,
                mr: 1,
								'& .MuiFormLabel-root.MuiInputLabel-root': {
                  top: 1,
									left: -2,
                  fontSize: '12px',
								},
							}}
						/>
						<OutlinedTextfield
							size="small"
							value={char.skills.xp.spend}
							label="Spend XP"
							sx={{
								maxWidth: '4.5rem',
								'& .MuiOutlinedInput-root': {
									borderRadius: '8px 0px 0px 8px',
									'& input': {
										py: 1.5,
									},
								},
							}}
						/>
						<OutlinedTextfield
							size="small"
							value={char.skills.xp.total}
							label="Total XP"
							sx={{
								maxWidth: '4.5rem',
								'& .MuiOutlinedInput-root': {
									borderRadius: '0px 8px 8px 0px',
								},
								'& input': {
									py: 1.5,
								},
							}}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							mt: -0.5,
						}}
					>
						{char.skills.skills.map((skill, index) => (
							<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										mt: 0.75,
									}}
								>
									{index == 0 && (
										<Typography
											color="text.secondary"
											variant="caption"
											sx={{ fontSize: '9px' }}
										>
											Rank
										</Typography>
									)}
									<RankIndicator>{skill.rank}</RankIndicator>
								</Box>
								<TextField
									size="small"
									variant="standard"
									value={skill.name}
									label={index == 0 ? 'Skill' : ''}
									sx={{ '& input': { p: 0 } }}
								/>
								<TextField
									size="small"
									variant="standard"
									value={skill.xp}
									label={index == 0 ? 'XP' : ''}
									sx={{
										maxWidth: '2rem',
										'& input': {
											p: 0,
											textAlign: 'center',
										},
									}}
								/>
							</Box>
						))}
					</Box>
				</Box>
				<Box
					sx={{
						width: '50%',
						ml: 0.5,
						border: '1px dotted black',
						borderRadius: '0.5rem',
					}}
				>
					<Typography
						color="text.secondary"
						variant="caption"
						sx={{ ml: 1, mb: 0.5 }}
					>
						Abilities
					</Typography>
					<Box component="ul" sx={{ pl: 3 }}>
						{char.skills.abilities.map((ability) => (
							<Typography
								component="li"
								variant="body2"
								sx={{ fontSize: '9px' }}
							>
								{ability.title}
							</Typography>
						))}
					</Box>
				</Box>
			</Box>
		</SheetLayout>
	)
}
