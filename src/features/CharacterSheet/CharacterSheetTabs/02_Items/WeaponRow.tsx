import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Checkbox,
	Divider,
	FormGroup,
	IconButton,
	MenuItem,
	TextField,
	Typography,
	Tooltip,
} from '@mui/material'
import React, { useState } from 'react'

import {
	Delete,
	ExpandMore,
	BookmarkBorder,
	Bookmark,
} from '@mui/icons-material'
import {
	DurabilityDie,
	durabilityDieArray,
	Weapon,
} from '../../../../types/Character'
import { ItemLocation, ITEM_LOCATIONS } from '../../../../types/ItemLocation'
import { AttributeField } from '../../CharacterSheet'
import { DamageFields } from '../DamageFields'
import { QualityTier, qualityTierLabels } from './utils/magicItemsConfig'

export type WeaponRowProps = {
	weapon: Weapon
	updateWeapon: (update: Partial<Weapon>) => void
	deleteWeapon: () => void
	isInQuickRef?: boolean
	onToggleQuickRef?: (weaponId: string) => void
}

export const WeaponRow: React.FC<WeaponRowProps> = ({
	weapon: initialWeapon,
	updateWeapon,
	deleteWeapon,
	isInQuickRef = false,
	onToggleQuickRef,
}) => {
	const [weapon, setWeapon] = useState<Weapon>(initialWeapon)
	const [expanded, setExpanded] = useState(false)

	return (
		<Accordion
			expanded={expanded}
			onChange={(_, isExpanded) => setExpanded(isExpanded)}
			disableGutters
			sx={{ flexGrow: 1, maxWidth: 'var(--cs-max-width-lg)', mt: 0 }}
		>
			<AccordionSummary
				expandIcon={<ExpandMore />}
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
							maxWidth: { sm: '10rem', xs: '7.5rem' },
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
						sx={{ maxWidth: '14rem' }}
					/>
					<AttributeField
						disabled
						size="small"
						variant="standard"
						value={`${3 - (initialWeapon.uses || 0)}/3`}
						label="Uses"
						sx={{
							maxWidth: '2.5rem',
						}}
						InputProps={{
							sx: {
								color:
									(initialWeapon.uses || 0) === 3
										? 'error.main'
										: (initialWeapon.uses || 0) === 2
											? 'warning.main'
											: 'text.primary',
							},
						}}
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
					<AttributeField
						type="number"
						size="small"
						value={initialWeapon.amount || 1}
						onChange={(event) =>
							updateWeapon({ amount: Number(event.target.value) })
						}
						label="Amount"
						sx={{ maxWidth: '4rem', flexGrow: 0 }}
					/>
					{/* Quality field for all weapons */}
					<AttributeField
						select
						size="small"
						variant="standard"
						value={initialWeapon.quality || ''}
						onChange={(event) => {
							const value = event.target.value
							const newQuality =
								value === '' ? undefined : (Number(value) as QualityTier)
							updateWeapon({ quality: newQuality })
						}}
						label="Quality"
						sx={{ maxWidth: '3rem' }}
					>
						<MenuItem value="">-</MenuItem>
						{(Object.keys(qualityTierLabels) as unknown as QualityTier[]).map(
							(quality) => (
								<MenuItem key={quality} value={quality}>
									Q{quality}
								</MenuItem>
							),
						)}
					</AttributeField>
					<AttributeField
						select
						size="small"
						variant="standard"
						value={initialWeapon.location || 'worn'}
						onChange={(event) =>
							updateWeapon({ location: event.target.value as ItemLocation })
						}
						label="Location"
						sx={{ maxWidth: '4.25rem' }}
					>
						{ITEM_LOCATIONS.map((location) => (
							<MenuItem key={location} value={location}>
								{location}
							</MenuItem>
						))}
					</AttributeField>
					{(initialWeapon.location === 'mount' ||
						initialWeapon.location === 'storage') && (
						<TextField
							size="small"
							variant="standard"
							value={
								initialWeapon.location === 'mount'
									? initialWeapon.mountInfo || ''
									: initialWeapon.storageInfo || ''
							}
							onChange={(event) => {
								if (initialWeapon.location === 'mount') {
									updateWeapon({ mountInfo: event.target.value })
								} else {
									updateWeapon({ storageInfo: event.target.value })
								}
							}}
							label={
								initialWeapon.location === 'mount'
									? 'Mount'
									: 'Storage Location'
							}
							sx={{ maxWidth: '8rem' }}
						/>
					)}
					<Box
						sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, p: 0.5 }}
					>
						<Typography variant="caption">Uses</Typography>
						<FormGroup row sx={{ gap: 0.25 }}>
							{[1, 2, 3].map((useNumber) => (
								<Checkbox
									key={useNumber}
									size="small"
									checked={(initialWeapon.uses || 0) >= useNumber}
									onChange={(event) => {
										const newUses = event.target.checked
											? useNumber
											: useNumber - 1
										updateWeapon({ uses: newUses })
									}}
									sx={{ p: 0.25 }}
								/>
							))}
						</FormGroup>
						{(initialWeapon.uses || 0) >= 3 && (
							<Typography variant="caption" color="error">
								Weapon is damaged
							</Typography>
						)}
					</Box>
					<AttributeField
						select
						size="small"
						variant="standard"
						value={initialWeapon.durability || ''}
						onChange={(event) =>
							updateWeapon({ durability: event.target.value as DurabilityDie })
						}
						label="Durability"
						sx={{ maxWidth: '4.25rem' }}
					>
						{durabilityDieArray.map((die) => (
							<MenuItem key={die} value={die}>
								{die || 'None'}
							</MenuItem>
						))}
					</AttributeField>
					{onToggleQuickRef && (
						<Tooltip
							title={
								isInQuickRef ? 'Remove from Quick Ref' : 'Add to Quick Ref'
							}
						>
							<IconButton
								size="small"
								onClick={() => onToggleQuickRef(initialWeapon.id)}
								sx={{
									my: 'auto',
									color: isInQuickRef ? 'primary.main' : 'action.disabled',
								}}
							>
								{isInQuickRef ? <Bookmark /> : <BookmarkBorder />}
							</IconButton>
						</Tooltip>
					)}
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
