import { Settings } from '@mui/icons-material'
import {
	Box,
	IconButton,
	Menu,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material'
import {
	BaseDamageType,
	baseDamageTypeArray,
	Damage,
	DamageType,
	damageTypeArray,
} from '@site/src/types/Character'
import React, { useMemo } from 'react'
import { AttributeField, SectionHeader } from '../CharacterSheet'
import { useAppSelector } from '../hooks/useAppSelector'

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
	const { strength, agility, spirit, mind } = useAppSelector(
		(state) => state.characterSheet.activeCharacter.statistics,
	)

	const baseDamage: number = useMemo(() => {
		switch (damage.base) {
			case 'STR':
				return strength.value / 2
			case 'AGI':
				return agility.value / 2
			case 'SPI':
				return spirit.value / 2
			case 'MND':
				return mind.value / 2
			case '':
				return 0
			default:
				return damage.base
		}
	}, [damage.base, strength, agility, spirit, mind])

	const weakDamage = useMemo(
		() => baseDamage + damage.weapon + damage.other + damage.otherWeak,
		[damage, baseDamage],
	)
	const strongDamage = useMemo(
		() => baseDamage + damage.weapon * 2 + damage.other + damage.otherStrong,
		[damage, baseDamage],
	)
	const criticalDamage = useMemo(
		() => baseDamage + damage.weapon * 3 + damage.other + damage.otherCritical,
		[damage, baseDamage],
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
					value={`${weakDamage}/${strongDamage}/${criticalDamage} ${damage.type}`}
					label="Damage"
					sx={{
						maxWidth: { sm: '7rem', xs: '5.25rem' },
					}}
				/>
				<IconButton size="small" onClick={handleClick} sx={{ ml: -0.5 }}>
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
				<Typography variant="subtitle2">
					Set the individual components for calculation your damage. The result
					will display as "X/Y/Z", where X = weak hit, Y = strong hit, and Z =
					critical hit.
				</Typography>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
					<AttributeField
						select
						size="small"
						type="number"
						value={damage.base}
						onChange={(event) =>
							updateDamage({ base: event.target.value as BaseDamageType })
						}
						label="Base"
						sx={{ maxWidth: '5.5rem' }}
					>
						{baseDamageTypeArray.map((attribute) => (
							<MenuItem key={attribute} value={attribute}>
								{attribute}
							</MenuItem>
						))}
					</AttributeField>
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
						value={damage.other}
						onChange={(event) =>
							updateDamage({ other: Number(event.target.value) })
						}
						label="Other"
						sx={{ maxWidth: '5.5rem' }}
					/>
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
