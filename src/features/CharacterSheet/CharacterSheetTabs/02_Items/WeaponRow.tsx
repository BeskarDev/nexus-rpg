import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	TextField,
} from '@mui/material'
import React, { useState } from 'react'

import { Delete, ExpandMore } from '@mui/icons-material'
import { Weapon } from '../../../../types/Character'
import { AttributeField } from '../../CharacterSheet'
import { DamageFields } from '../DamageFields'

export type WeaponRowProps = {
	weapon: Weapon
	updateWeapon: (update: Partial<Weapon>) => void
	deleteWeapon: () => void
}

export const WeaponRow: React.FC<WeaponRowProps> = ({
	weapon: initialWeapon,
	updateWeapon,
	deleteWeapon,
}) => {
	const [weapon, setWeapon] = useState<Weapon>(initialWeapon)
	const [expanded, setExpanded] = useState(false)

	return (
		<Accordion
			expanded={expanded}
			disableGutters
			sx={{ flexGrow: 1, maxWidth: '47rem', mt: 0 }}
		>
			<AccordionSummary
				expandIcon={<ExpandMore onClick={() => setExpanded(!expanded)} />}
				sx={{
					gap: 1,
					pt: 0,
          px: 0,
					flexDirection: 'row-reverse',
					'& .MuiAccordionSummary-content': {
						display: 'block',
					},
				}}
			>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
						columnGap: 1,
					}}
				>
					<TextField
						size="small"
						variant="standard"
						value={weapon.name}
						onChange={(event) =>
							setWeapon((w) => ({ ...w, name: event.target.value }))
						}
						onBlur={() => updateWeapon({ name: weapon.name })}
						label="Name"
						sx={{
							maxWidth: { sm: '12rem', xs: '7.5rem' },
						}}
					/>
					<DamageFields
						type="weapon"
						damage={initialWeapon.damage}
						updateDamage={(update) =>
							updateWeapon({ damage: { ...initialWeapon.damage, ...update } })
						}
					/>
					<TextField
						size="small"
						variant="standard"
						value={weapon.properties}
						onChange={(event) =>
							setWeapon((w) => ({ ...w, properties: event.target.value }))
						}
						onBlur={() => updateWeapon({ properties: weapon.properties })}
						label="Properties"
						sx={{ maxWidth: '18rem' }}
					/>
				</Box>
			</AccordionSummary>
			<AccordionDetails>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
						columnGap: 1,
					}}
				>
					<TextField
						size="small"
						multiline
						minRows={1}
						maxRows={5}
						value={weapon.description}
						onChange={(event) =>
							setWeapon((w) => ({ ...w, description: event.target.value }))
						}
						onBlur={() => updateWeapon({ description: weapon.description })}
						label="Description"
					/>
					<AttributeField
						type="number"
						size="small"
						value={initialWeapon.cost}
						onChange={(event) =>
							updateWeapon({ cost: Number(event.target.value) })
						}
						label="Cost"
						sx={{ maxWidth: '6rem', flexGrow: 0 }}
						inputProps={{
							sx: {
								textAlign: 'right',
							},
						}}
					/>
					<AttributeField
						type="number"
						size="small"
						value={initialWeapon.load}
						onChange={(event) =>
							updateWeapon({ load: Number(event.target.value) })
						}
						label="Load"
						sx={{ maxWidth: '4rem', flexGrow: 0 }}
					/>
					<IconButton
						size="small"
						edge="end"
						aria-label="delete"
						onClick={deleteWeapon}
						sx={{ my: 'auto' }}
					>
						<Delete />
					</IconButton>
				</Box>
			</AccordionDetails>
		</Accordion>
	)
}
