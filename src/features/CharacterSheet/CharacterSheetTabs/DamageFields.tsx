import { Settings } from '@mui/icons-material'
import { SheetInput } from '../components'
import {
	Box,
	IconButton,
	Menu,
	MenuItem,
	TextField,
	Typography,
	Checkbox,
	Tooltip,
} from '@mui/material'
import {
	BaseDamageType,
	baseDamageTypeArray,
	Damage,
	DamageType,
	damageTypeArray,
} from '@site/src/types/Character'
import React, { useMemo } from 'react'
import { SectionHeader } from '../CharacterSheet'
import DamageSigil from '@site/src/components/codex/DamageSigil'
import { useAppSelector } from '../hooks/useAppSelector'

export type DamageFieldsProps = {
	type: 'weapon' | 'spell'
	damage: Damage
	updateDamage: (update: Partial<Damage>) => void
	/**
	 * Render the calculator's parts directly instead of behind a gear popover
	 * (M13 S4b).
	 *
	 * The gear existed because this component used to sit in a weapon's SUMMARY
	 * row, where a full calculator has no room — which made it a second, nested
	 * disclosure inside a row that already expands, the only one of its kind on
	 * the sheet. Inside the details panel there is room, and a popover over a
	 * popover-less panel is a step for nothing.
	 */
	inline?: boolean
}

export const DamageFields: React.FC<DamageFieldsProps> = ({
	type,
	damage,
	updateDamage,
	inline = false,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const {
		statistics: { strength, agility, spirit, mind },
		spells: { spellCatalystDamage },
	} = useAppSelector((state) => state.characterSheet.activeCharacter)

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

	const weakDamage = useMemo(() => {
		if (damage.staticDamage) {
			return (
				baseDamage +
				damage.weapon +
				(type == 'spell' ? spellCatalystDamage : 0) +
				damage.other
			)
		}
		return (
			baseDamage +
			damage.weapon +
			(type == 'spell' ? spellCatalystDamage : 0) +
			damage.other +
			damage.otherWeak
		)
	}, [damage, baseDamage, type, spellCatalystDamage])

	const strongDamage = useMemo(() => {
		if (damage.staticDamage) {
			return (
				baseDamage +
				damage.weapon +
				(type == 'spell' ? spellCatalystDamage : 0) +
				damage.other
			)
		}
		return (
			baseDamage +
			damage.weapon * 2 +
			(type == 'spell' ? spellCatalystDamage * 2 : 0) +
			damage.other +
			damage.otherStrong
		)
	}, [damage, baseDamage, type, spellCatalystDamage])

	const criticalDamage = useMemo(() => {
		if (damage.staticDamage) {
			return (
				baseDamage +
				damage.weapon +
				(type == 'spell' ? spellCatalystDamage : 0) +
				damage.other
			)
		}
		return (
			baseDamage +
			damage.weapon * 3 +
			(type == 'spell' ? spellCatalystDamage * 3 : 0) +
			damage.other +
			damage.otherCritical
		)
	}, [damage, baseDamage, type, spellCatalystDamage])

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const parts = (
		<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
					<SheetInput
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
					</SheetInput>
					<SheetInput
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
					<SheetInput
						size="small"
						type="number"
						value={damage.other}
						onChange={(event) =>
							updateDamage({ other: Number(event.target.value) })
						}
						label="Other"
						sx={{ maxWidth: '5.5rem' }}
					/>
					<SheetInput
						size="small"
						type="number"
						value={damage.otherWeak}
						onChange={(event) =>
							updateDamage({ otherWeak: Number(event.target.value) })
						}
						label="Other (Weak)"
						sx={{ maxWidth: '5.5rem' }}
						disabled={damage.staticDamage}
					/>
					<SheetInput
						size="small"
						type="number"
						value={damage.otherStrong}
						onChange={(event) =>
							updateDamage({ otherStrong: Number(event.target.value) })
						}
						label="Other (Strong)"
						sx={{ maxWidth: '5.5rem' }}
						disabled={damage.staticDamage}
					/>
					<SheetInput
						size="small"
						type="number"
						value={damage.otherCritical}
						onChange={(event) =>
							updateDamage({ otherCritical: Number(event.target.value) })
						}
						label="Other (Critical)"
						sx={{ maxWidth: '5.5rem' }}
						disabled={damage.staticDamage}
					/>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Tooltip title="Static damage uses fixed values instead of scaling">
							<Checkbox
								checked={damage.staticDamage || false}
								onChange={(event) =>
									updateDamage({ staticDamage: event.target.checked })
								}
								size="small"
							/>
						</Tooltip>
						<Typography variant="caption">static</Typography>
					</Box>
					<Box sx={{ width: '100%', flexGrow: 1 }} />
					{/* M13 S4c: each option carries its mark, inked in its identity hue.
						MUI renders the selected option's children as the closed value, so
						one change gives the mark to both the list and the field — and the
						field then matches the weapon row, where the same type is a mark
						rather than a word. The word stays here: a dropdown is where you
						LEARN which mark is which, so this is the one place both belong. */}
					<TextField
						size="small"
						select
						value={damage.type}
						onChange={(event) =>
							updateDamage({ type: event.target.value as DamageType })
						}
						label="Type"
						sx={{ width: '10rem' }}
					>
						{damageTypeArray.map((dt) => (
							<MenuItem key={dt} value={dt}>
								<Box
									sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}
								>
									<DamageSigil type={dt} size={15} />
									{dt}
								</Box>
							</MenuItem>
						))}
					</TextField>
				</Box>
	)

	if (inline) return parts

	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center', columnGap: 0.5 }}>
				<TextField
					disabled
					size="small"
					variant="standard"
					value={
						damage.staticDamage
							? `${weakDamage} ${damage.type}`
							: `${weakDamage}/${strongDamage}/${criticalDamage} ${damage.type}`
					}
					label="Damage"
					sx={{ maxWidth: '6.5rem' }}
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
				{parts}
			</Menu>
		</>
	)
}
