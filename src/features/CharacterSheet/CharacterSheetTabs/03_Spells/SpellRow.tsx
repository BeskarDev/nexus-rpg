import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Box,
	Button,
	IconButton,
	MenuItem,
	TextField,
} from '@mui/material'
import React, { useMemo, useState } from 'react'

import { Delete, ExpandMore } from '@mui/icons-material'
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
}

export const SpellRow: React.FC<SpellRowProps> = ({
	spell: initialSpell,
	updateSpell,
	deleteSpell,
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
		dispatch(
			characterSheetActions.updateCharacter({
				spells: {
					focus: { current: activeCharacter.spells.focus.current - spell.cost },
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
						columnGap: 1,
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
						}}
					>
						{spellCost}
					</Avatar>
					<AttributeField
						disabled
						size="small"
						variant="standard"
						value={initialSpell.rank}
						label="Rank"
						sx={{
							maxWidth: '2rem',
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
						sx={{ maxWidth: '10rem', flexGrow: 1 }}
					/>

					<AttributeField
						disabled
						size="small"
						variant="standard"
						value={spell.target}
						label="Target"
						sx={{ maxWidth: '3rem', flexGrow: 0 }}
					/>
					<AttributeField
						disabled
						size="small"
						variant="standard"
						value={spell.range}
						label="Range"
						sx={{ maxWidth: '4rem', flexGrow: 0 }}
					/>
					<TextField
						size="small"
						variant="standard"
						value={spell.properties}
						onChange={(event) =>
							setSpell((s) => ({ ...s, properties: event.target.value }))
						}
						onBlur={() => updateSpell({ properties: spell.properties })}
						label="Properties"
						sx={{ maxWidth: { sm: '10rem', xs: '7rem' } }}
					/>
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
					<DamageFields
						type="spell"
						damage={initialSpell.damage}
						updateDamage={(update) =>
							updateSpell({ damage: { ...initialSpell.damage, ...update } })
						}
					/>
					<AttributeField
						type="number"
						size="small"
						value={initialSpell.rank}
						onChange={(event) =>
							updateSpell({ rank: Number(event.target.value) })
						}
						label="Rank"
						sx={{
							maxWidth: '4rem',
							flexGrow: 0,
							'& .MuiOutlinedInput-root': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderWidth: '2px',
								},
							},
						}}
					/>
					<AttributeField
						select
						size="small"
						value={spell.target}
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
						value={spell.range}
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
