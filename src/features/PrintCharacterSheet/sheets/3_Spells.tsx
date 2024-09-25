import { Box, TextField, Typography } from '@mui/material'
import { SheetLayout } from './SheetLayout'
import { BaseDamageType, Character, Damage } from '@site/src/types/Character'
import {
	CharacterHeaderTextField,
	OutlinedTextfield,
	RankIndicator,
} from '../PrintCharacterSheet'

export const SpellsSheet: React.FC<{ char: Character }> = ({ char }) => {
	const calculateBaseDamage = (base: BaseDamageType) => {
		switch (base) {
			case 'STR':
				return char.statistics.strength.value / 2
			case 'AGI':
				return char.statistics.agility.value / 2
			case 'SPI':
				return char.statistics.spirit.value / 2
			case 'MND':
				return char.statistics.mind.value / 2
			default:
				return 0
		}
	}

	const printDamageField = ({
		base,
		weapon,
		other,
		otherWeak,
		otherStrong,
		otherCritical,
	}: Damage) => {
		const baseDamage = calculateBaseDamage(base)
		const weakDamage = baseDamage + weapon + other + otherWeak
		const strongDamage = baseDamage + weapon * 2 + other + otherStrong
		const criticalDamage = baseDamage + weapon * 3 + other + otherCritical

		return `${weakDamage}/${strongDamage}/${criticalDamage}`
	}
	return (
		<SheetLayout>
			<Box
				sx={{ display: 'flex', gap: 1, mt: -0.5, mb: -1, alignItems: 'top' }}
			>
				<CharacterHeaderTextField
					value={char.spells.magicSkill}
					label="Magic Skill"
					sx={{
						maxWidth: '5rem',
						'& input': {
							fontSize: '10px',
						},
					}}
				/>
				<CharacterHeaderTextField
					size="small"
					value={char.spells.specialization}
					label="Disciplines or Traditions"
					sx={{
						'& input': {
							fontSize: '10px',
						},
					}}
				/>
				<OutlinedTextfield
					value={char.spells.focus.current}
					label="Current Focus"
					sx={{
						maxWidth: '6rem',
						'& input': {
							py: 1,
						},
					}}
				/>
				<OutlinedTextfield
					size="small"
					value={char.spells.focus.total}
					label="Max. Focus"
					sx={{
						maxWidth: '5rem',
						'& input': {
							py: 0.5,
						},
					}}
				/>
			</Box>
			<Box
				sx={{
					border: '1px dotted black',
					borderRadius: '0.5rem',
					px: 1,
					height: '100%',
					overflowY: 'hidden',
				}}
			>
				<Typography color="text.secondary" variant="caption">
					Learned Spells
				</Typography>
				<Box sx={{ mt: -0.5 }}>
					{char.spells.spells.map((spell, index) => (
						<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								{index == 0 && (
									<Typography
										color="text.secondary"
										variant="caption"
										sx={{ fontSize: '9px', mt: 0.5, mb: 0.5 }}
									>
										Cost
									</Typography>
								)}
								<RankIndicator
									sx={{
										width: 20,
										height: 20,
										fontSize: '11px',
										mt: index == 0 ? -1 : 0,
									}}
								>
									{spell.cost}
								</RankIndicator>
							</Box>
							<TextField
								size="small"
								variant="standard"
								value={spell.rank}
								label={index == 0 ? 'Rank' : ''}
								sx={{
									maxWidth: '1.5rem',
									'& .MuiInputBase-root': {
										pb: 0.5,
									},
									'& input': { p: 0, fontSize: '9px', textAlign: 'center' },
								}}
							/>
							<TextField
								size="small"
								variant="standard"
								value={spell.name}
								label={index == 0 ? 'Name' : ''}
								sx={{
									'& .MuiInputBase-root': {
										pb: 0.5,
									},
									'& input': { p: 0, fontSize: '9px' },
								}}
							/>
							{Boolean(spell.damage.base) && (
								<TextField
									size="small"
									variant="standard"
									value={printDamageField({ ...spell.damage })}
									label={index == 0 ? 'Damage' : ''}
									sx={{
										maxWidth: '2.5rem',
										mt: 1,
										'& .MuiInputBase-root': {
											pt: 0.2,
											pb: 0.5,
										},
										'& input': { p: 0, fontSize: '8px', textAlign: 'center' },
									}}
								/>
							)}
							<TextField
								size="small"
								variant="standard"
								value={spell.target}
								label={index == 0 ? 'Target' : ''}
								sx={{
									maxWidth: '2rem',
									'& .MuiInputBase-root': {
										pb: 0.5,
									},
									'& input': { p: 0, fontSize: '9px' },
								}}
							/>
							<TextField
								size="small"
								variant="standard"
								value={spell.range}
								label={index == 0 ? 'Range' : ''}
								sx={{
									maxWidth: '2.25rem',
									'& .MuiInputBase-root': {
										pb: 0.5,
									},
									'& input': { p: 0, fontSize: '9px' },
								}}
							/>
							<TextField
								size="small"
								variant="standard"
								value={spell.properties}
								label={index == 0 ? 'Properties' : ''}
								sx={{
									maxWidth: '8rem',
									mt: 1,
									'& .MuiInputBase-root': {
										pt: 0.2,
										pb: 0.5,
									},
									'& input': { p: 0, fontSize: '8px' },
								}}
							/>
						</Box>
					))}
				</Box>
			</Box>
		</SheetLayout>
	)
}
