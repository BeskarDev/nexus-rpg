import { Box, TextField, Typography } from '@mui/material'
import { SheetLayout } from './SheetLayout'
import { Character } from '@site/src/types/Character'
import { OutlinedTextfield } from '../PrintCharacterSheet'

export const EquipmentSheet: React.FC<{ char: Character }> = ({ char }) => {
	return (
		<SheetLayout>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<OutlinedTextfield
					value={char.items.coins}
					label="Coins"
					sx={{
						maxWidth: '10rem',
					}}
				/>
				<OutlinedTextfield
					value={char.items.encumbrance.currentLoad}
					label="Current Load"
					sx={{
						maxWidth: '6rem',
					}}
				/>
				<OutlinedTextfield
					size="small"
					value={char.items.encumbrance.encumberedAt}
					label="Encumbered"
					sx={{
						maxWidth: '5rem',
					}}
				/>
				<OutlinedTextfield
					size="small"
					value={char.items.encumbrance.overencumberedAt}
					label="Overencumbered"
					sx={{
						maxWidth: '6rem',
					}}
				/>
			</Box>
			<Box
				sx={{
					border: '1px dotted black',
					borderRadius: '0.5rem',
					px: 1,
					height: '28%',
					overflowY: 'hidden',
				}}
			>
				<Typography color="text.secondary" variant="caption">
					Weapons
				</Typography>
				<Box sx={{ mt: -0.5 }}>
					{char.items.weapons.map((weapon, index) => (
						<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
							<TextField
								size="small"
								variant="standard"
								value={weapon.name}
								label={index == 0 ? 'Name' : ''}
								sx={{
									maxWidth: '7rem',
									mt: 0.5,
									'& input': { p: 0 },
								}}
							/>
							<TextField
								size="small"
								variant="standard"
								value={`+${weapon.damage.weapon}/${weapon.damage.weapon * 2}/${weapon.damage.weapon * 3}`}
								label={index == 0 ? 'Damage' : ''}
								sx={{
									maxWidth: '4rem',
									mt: 0.5,
									'& input': { p: 0 },
								}}
							/>
							<TextField
								size="small"
								variant="standard"
								value={weapon.properties}
								label={index == 0 ? 'Properties' : ''}
								sx={{
									maxWidth: '12rem',
									mt: 0.5,
									'& input': {
										p: 0,
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
										py: 0.2,
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
										py: 0.2,
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
						sx={{ fontSize: '9px', mr: 11 }}
					>
						Name
					</Typography>
					<Typography
						color="text.secondary"
						variant="caption"
						sx={{ fontSize: '9px', mr: 1 }}
					>
						Container/Slot
					</Typography>
					<Typography
						color="text.secondary"
						variant="caption"
						sx={{ fontSize: '9px', mr: 0.5 }}
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
					sx={{ display: 'flex', rowGap: 0, columnGap: 1, flexWrap: 'wrap' }}
				>
					{char.items.items.map((item, index) => (
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<TextField
								size="small"
								variant="standard"
								value={item.name}
								sx={{
									maxWidth: '7.25rem',
									mt: 0.5,
									'& input': { p: 0 },
								}}
							/>
							<TextField
								size="small"
								variant="standard"
								value={item.container == 'worn' ? item.slot : item.container}
								sx={{
									maxWidth: '2.5rem',
									mt: 0.5,
									'& input': {
										fontSize: '8px',
										py: 0.35,
										textOverflow: 'ellipsis',
									},
								}}
							/>
							<TextField
								size="small"
								variant="standard"
								value={item.cost}
								sx={{
									maxWidth: '2.5rem',
									mt: 0.5,
									'& input': {
										fontSize: '10px',
										py: 0.175,
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
										fontSize: '10px',
										py: 0.175,
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
