import { Box, TextField, Typography } from '@mui/material'
import { SheetLayout } from './SheetLayout'
import {
	BaseDamageType,
	Character,
	Damage,
	Weapon,
} from '@site/src/types/Character'
import { OutlinedTextfield } from '../PrintCharacterSheet'

export const EquipmentSheet: React.FC<{ char: Character }> = ({ char }) => {
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

		return `${weakDamage}/${strongDamage}/${criticalDamage} (${weapon})`
	}

	// Sort items: worn first, then carried
	const sortedItems = [...char.items.items].sort((a, b) => {
		// Worn items first
		if (a.location === 'worn' && b.location !== 'worn') return -1
		if (b.location === 'worn' && a.location !== 'worn') return 1
		// Then sort alphabetically within each group
		return a.name.localeCompare(b.name)
	})

	return (
		<SheetLayout>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<OutlinedTextfield
					value={char.items.coins}
					label="Coins"
					sx={{
						maxWidth: '10rem',
						'& input': {
							py: 1,
						},
					}}
				/>
				<OutlinedTextfield
					value={char.items.encumbrance.currentLoad}
					label="Current Load"
					sx={{
						maxWidth: '6rem',
						'& input': {
							py: 1,
						},
					}}
				/>
				<OutlinedTextfield
					size="small"
					value={char.items.encumbrance.encumberedAt}
					label="Carry Cap"
					sx={{
						maxWidth: '5rem',
						'& input': {
							py: 0.5,
						},
					}}
				/>
				<OutlinedTextfield
					size="small"
					value={char.items.encumbrance.overencumberedAt}
					label="Max Cap"
					sx={{
						maxWidth: '6rem',
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
					height: '32%',
					overflowY: 'hidden',
				}}
			>
				<Typography color="text.secondary" variant="caption">
					Weapons
				</Typography>
				<Box sx={{ mt: -0.5 }}>
					{char.items.weapons.filter(w => w.location === 'worn').map((weapon, index) => (
						<Box key={weapon.id} sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
							<TextField
								size="small"
								variant="standard"
								value={weapon.name}
								label={index == 0 ? 'Name' : ''}
								sx={{
									maxWidth: '8rem',
									mt: 0.5,
									'& input': { p: 0, fontSize: '10px' },
								}}
							/>
							<TextField
								size="small"
								variant="standard"
								value={weapon.damage ? printDamageField({ ...weapon.damage }): ' '}
								label={index == 0 ? 'Damage' : ''}
								sx={{
									maxWidth: '4rem',
									mt: 0.5,
									'& input': { p: 0, fontSize: '10px' },
								}}
							/>
							<TextField
								size="small"
								variant="standard"
								value={weapon.properties}
								label={index == 0 ? 'Properties' : ''}
								sx={{
									maxWidth: '11rem',
									mt: 0.5,
									'& input': {
										p: 0,
										fontSize: '10px',
									},
								}}
							/>
							<TextField
								size="small"
								variant="standard"
								value={weapon.cost}
								label={index == 0 ? 'Cost' : ''}
								sx={{
									maxWidth: '2.5rem',
									mt: 0.5,
									'& input': {
										fontSize: '10px',
										py: 0,
										textAlign: 'right',
									},
								}}
							/>
							<TextField
								size="small"
								variant="standard"
								value={weapon.load}
								label={index == 0 ? 'Load' : ''}
								sx={{
									maxWidth: '1.5rem',
									mt: 0.5,
									'& input': {
										fontSize: '10px',
										py: 0,
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
					border: '1px dotted black',
					borderRadius: '0.5rem',
					px: 1,
					height: '100%',
					overflowY: 'hidden',
				}}
			>
				<Typography color="text.secondary" variant="caption">
					Equipment & Items
				</Typography>
				<Box sx={{ display: 'flex' }}>
					<Typography
						color="text.secondary"
						variant="caption"
						sx={{ fontSize: '9px', mr: 9 }}
					>
						Name
					</Typography>
					<Typography
						color="text.secondary"
						variant="caption"
						sx={{ fontSize: '9px', mr: 1 }}
					>
						Location/Slot
					</Typography>
					<Typography
						color="text.secondary"
						variant="caption"
						sx={{ fontSize: '9px', mr: 1 }}
					>
						Cost
					</Typography>
					<Typography
						color="text.secondary"
						variant="caption"
						sx={{ fontSize: '9px' }}
					>
						Load
					</Typography>
				</Box>
				<Box
					sx={{ display: 'flex', rowGap: 0, columnGap: 2, flexWrap: 'wrap' }}
				>
					{sortedItems.filter(i => i.location === 'worn' || i.location === 'carried').map((item, index) => (
						<Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
							<TextField
								size="small"
								variant="standard"
								value={`${item.name} ${item.amount > 1 ? 'x' + item.amount : ''}`}
								sx={{
									width: '6.5rem',
									mt: 0.5,
									'& .MuiInputBase-root': {
										pb: 0.5,
									},
									'& input': { p: 0, fontSize: '9px' },
								}}
							/>
							<TextField
								size="small"
								variant="standard"
								value={item.location === 'worn' && item.slot ? item.slot : item.location}
								sx={{
									maxWidth: '2.5rem',
									mt: 0.5,
									'& input': {
										p: 0,
										fontSize: '8px',
										textOverflow: 'ellipsis',
									},
								}}
							/>
							<TextField
								size="small"
								variant="standard"
								value={item.cost}
								sx={{
									maxWidth: '2rem',
									mt: 0.5,
									'& input': {
										p: 0,
										fontSize: '8px',
										textAlign: 'right',
									},
								}}
							/>
							<TextField
								size="small"
								variant="standard"
								value={item.load}
								sx={{
									maxWidth: '1.5rem',
									mt: 0.5,
									'& input': {
										p: 0,
										fontSize: '8px',
										textAlign: 'center',
									},
								}}
							/>
						</Box>
					))}
				</Box>
			</Box>
		</SheetLayout>
	)
}
