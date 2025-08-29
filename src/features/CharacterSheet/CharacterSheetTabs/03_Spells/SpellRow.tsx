import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	IconButton,
	MenuItem,
	TextField,
	Tooltip,
} from '@mui/material'
import React, { useMemo, useState } from 'react'

import { Delete, ExpandMore, BookmarkBorder } from '@mui/icons-material'
import {
	RangeType,
	rangeTypeArray,
	Spell,
	TargetType,
	targetTypeArray,
} from '../../../../types/Character'
import { AttributeField } from '../../CharacterSheet'
import { DamageFields } from '../DamageFields'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { UserAvatar } from '../../UserAvatar'

export type SpellRowProps = {
	spell: Spell
	updateSpell: (update: Partial<Spell>) => void
	deleteSpell: () => void
	isInQuickRef?: boolean
	onToggleQuickRef?: (spellId: string) => void
}

export const SpellRow: React.FC<SpellRowProps> = ({
	spell: initialSpell,
	updateSpell,
	deleteSpell,
	isInQuickRef = false,
	onToggleQuickRef,
}) => {
	const [spell, setSpell] = useState<Spell>(initialSpell)
	const [expanded, setExpanded] = useState(false)
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)

	const spellCost = useMemo(() => {
		const newSpellCost = initialSpell.rank * 2
		if (newSpellCost !== initialSpell.cost) {
			updateSpell({ cost: newSpellCost })
		}
		return newSpellCost
	}, [initialSpell])

	const castSpell = () => {
		const newFocusValue = Math.max(
			0,
			activeCharacter.spells.focus.current - spell.cost,
		)
		dispatch(
			characterSheetActions.updateCharacter({
				spells: {
					focus: { current: newFocusValue },
				},
			}),
		)
	}

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
						display: 'flex',
						alignItems: 'baseline',
						flexWrap: 'wrap',
						columnGap: 0.5,
						maxWidth: '47rem',
					}}
				>
					<Avatar
						onClick={castSpell}
						sx={{
							bgcolor: (theme) => 'transparent',
							border: (theme) => `2px solid ${theme.palette.text.primary}`,
							color: (theme) => theme.palette.text.primary,
							height: 32,
							width: 32,
							fontSize: 14,
							fontWeight: 'bold',
							cursor: 'pointer',
							transition: 'opacity 200ms ease-in-out',
							'&:hover': {
								opacity: 0.7,
							},
							maxWidth: '4rem',
							flexGrow: 0,
							animation: 'focusShine 5s ease-in-out infinite',
							'@keyframes focusShine': {
								'0%, 90%, 100%': {
									boxShadow: 'none',
									transform: 'scale(1)',
								},
								'95%': {
									boxShadow: '0 0 8px 2px rgba(33, 150, 243, 0.6)',
									transform: 'scale(1.05)',
								},
							},
						}}
					>
						{spellCost}
					</Avatar>
					<AttributeField
						size="small"
						variant="standard"
						value={initialSpell.rank}
						onChange={(event) =>
							updateSpell({ rank: Number(event.target.value) })
						}
						label="Rank"
						sx={{
							maxWidth: '1.5rem',
							flexGrow: 0,
							'& .MuiOutlinedInput-root': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderWidth: '2px',
								},
							},
						}}
					/>
					<TextField
						size="small"
						variant="standard"
						value={spell.name}
						onChange={(event) =>
							setSpell((s) => ({ ...s, name: event.target.value }))
						}
						onBlur={() => updateSpell({ name: spell.name })}
						label="Name"
						sx={{ maxWidth: '9rem', flexGrow: 1 }}
					/>

					<AttributeField
						disabled
						size="small"
						variant="standard"
						value={initialSpell.target}
						label="Target"
						sx={{ maxWidth: '3rem', flexGrow: 0 }}
					/>
					<AttributeField
						disabled
						size="small"
						variant="standard"
						value={initialSpell.range}
						label="Range"
						sx={{ maxWidth: '4rem', flexGrow: 0 }}
					/>
					{initialSpell.dealsDamage ? (
						<DamageFields
							type="spell"
							damage={initialSpell.damage}
							updateDamage={(update) =>
								updateSpell({ damage: { ...initialSpell.damage, ...update } })
							}
						/>
					) : (
						<TextField
							size="small"
							variant="standard"
							value={spell.properties}
							onChange={(event) =>
								setSpell((s) => ({ ...s, properties: event.target.value }))
							}
							onBlur={() => updateSpell({ properties: spell.properties })}
							label="Properties"
							sx={{ maxWidth: '10rem' }}
						/>
					)}
				</Box>
			</AccordionSummary>
			<AccordionDetails>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'baseline',
						flexWrap: 'wrap',
						columnGap: 1,
						maxWidth: '47rem',
					}}
				>
					{initialSpell.dealsDamage && (
						<TextField
							size="small"
							variant="standard"
							value={spell.properties}
							fullWidth
							onChange={(event) =>
								setSpell((s) => ({ ...s, properties: event.target.value }))
							}
							onBlur={() => updateSpell({ properties: spell.properties })}
							label="Properties"
						/>
					)}
					<TextField
						size="small"
						multiline
						minRows={1}
						maxRows={10}
						value={spell.effect}
						onChange={(event) =>
							setSpell((s) => ({ ...s, effect: event.target.value }))
						}
						onBlur={() => updateSpell({ effect: spell.effect })}
						label="Effect"
						sx={{ maxWidth: '40rem' }}
					/>
					<Box sx={{ width: '100%', flexGrow: 1 }} />
					<FormControlLabel
						control={
							<Checkbox
								checked={initialSpell.dealsDamage}
								onChange={() =>
									updateSpell({ dealsDamage: !initialSpell.dealsDamage })
								}
							/>
						}
						label="show damage"
						sx={{
							'& .MuiFormControlLabel-label': {
								fontSize: '10px',
							},
						}}
					/>
					<AttributeField
						select
						size="small"
						value={initialSpell.target}
						onChange={(event) =>
							updateSpell({ target: event.target.value as TargetType })
						}
						label="Target"
						sx={{ maxWidth: '6rem', flexGrow: 0 }}
					>
						{targetTypeArray.map((target) => (
							<MenuItem key={target} value={target}>
								{target}
							</MenuItem>
						))}
					</AttributeField>
					<AttributeField
						select
						size="small"
						value={initialSpell.range}
						onChange={(event) =>
							updateSpell({ range: event.target.value as RangeType })
						}
						label="Range"
						sx={{ maxWidth: '7rem', flexGrow: 0 }}
					>
						{rangeTypeArray.map((range) => (
							<MenuItem key={range} value={range}>
								{range}
							</MenuItem>
						))}
					</AttributeField>
					{onToggleQuickRef && (
						<Tooltip title={isInQuickRef ? "Remove from Quick Ref" : "Add to Quick Ref"}>
							<IconButton
								size="small"
								onClick={() => onToggleQuickRef(initialSpell.id)}
								sx={{ 
									my: 'auto',
									color: isInQuickRef ? 'primary.main' : 'action.disabled'
								}}
							>
								<BookmarkBorder />
							</IconButton>
						</Tooltip>
					)}
					<IconButton
						size="small"
						edge="end"
						aria-label="delete"
						onClick={deleteSpell}
						sx={{ my: 'auto' }}
					>
						<Delete />
					</IconButton>
				</Box>
			</AccordionDetails>
		</Accordion>
	)
}
