import { Settings } from '@mui/icons-material'
import { Box, IconButton, Menu, MenuItem, TextField } from '@mui/material'
import { Damage, DamageType, damageTypeArray } from '@site/src/types/Character'
import React, { useMemo } from 'react'
import { AttributeField, SectionHeader } from '../CharacterSheet'

export type DamageFieldsProps = {
	type: 'weapon' | 'spell'
	damage: Damage
	updateDamage: (update: Partial<Damage>) => void
}

export const DamageFields: React.FC<DamageFieldsProps> = ({
	type,
	damage,
	updateDamage,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const weakDamage = useMemo(
		() => damage.base + damage.weapon + damage.otherWeak,
		[damage],
	)
	const strongDamage = useMemo(
		() => damage.base + damage.weapon * 2 + damage.otherStrong,
		[damage],
	)
	const criticalDamage = useMemo(
		() => damage.base + damage.weapon * 3 + damage.otherCritical,
		[damage],
	)

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					columnGap: 0.5,
				}}
			>
				<TextField
					disabled
					size="small"
					variant="standard"
					value={`${weakDamage}/${strongDamage}/${criticalDamage}`}
					label="W/S/C"
					sx={{
						maxWidth: '6rem',
					}}
				/>
				<TextField
					disabled
					size="small"
					variant="standard"
					value={damage.type}
					label="Type"
					sx={{
						maxWidth: '4.5rem',
					}}
				/>
				<IconButton size="small" onClick={handleClick}>
					<Settings fontSize="small" />
				</IconButton>
			</Box>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{ sx: { p: 2, maxWidth: '20rem' } }}
			>
				<SectionHeader>Damage Calculator</SectionHeader>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
					<AttributeField
						size="small"
						type="number"
						value={damage.base}
						onChange={(event) =>
							updateDamage({ base: Number(event.target.value) })
						}
						label="Base"
						sx={{ maxWidth: '5.5rem' }}
					/>
					<AttributeField
						size="small"
						type="number"
						value={damage.weapon}
						onChange={(event) =>
							updateDamage({ weapon: Number(event.target.value) })
						}
						label={type === 'weapon' ? 'Weapon' : 'Spell'}
						sx={{ maxWidth: '5.5rem' }}
					/>
					<Box sx={{ width: '100%', flexGrow: 1 }} />
					<AttributeField
						size="small"
						type="number"
						value={damage.otherWeak}
						onChange={(event) =>
							updateDamage({ otherWeak: Number(event.target.value) })
						}
						label="Other (Weak)"
						sx={{ maxWidth: '5.5rem' }}
					/>
					<AttributeField
						size="small"
						type="number"
						value={damage.otherStrong}
						onChange={(event) =>
							updateDamage({ otherStrong: Number(event.target.value) })
						}
						label="Other (Strong)"
						sx={{ maxWidth: '5.5rem' }}
					/>
					<AttributeField
						size="small"
						type="number"
						value={damage.otherCritical}
						onChange={(event) =>
							updateDamage({ otherCritical: Number(event.target.value) })
						}
						label="Other (Critical)"
						sx={{ maxWidth: '5.5rem' }}
					/>
					<Box sx={{ width: '100%', flexGrow: 1 }} />
					<TextField
						size="small"
						select
						value={damage.type}
						onChange={(event) =>
							updateDamage({ type: event.target.value as DamageType })
						}
						label="Type"
					>
						{damageTypeArray.map((dt) => (
							<MenuItem key={dt} value={dt}>
								{dt}
							</MenuItem>
						))}
					</TextField>
				</Box>
			</Menu>
		</>
	)
}
