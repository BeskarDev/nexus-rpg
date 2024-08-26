import { Avatar, Box, Button, IconButton, TextField } from '@mui/material'
import React, { useMemo, useState } from 'react'

import { Delete } from '@mui/icons-material'
import { Spell } from '../../../../types/Character'
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
		<Box
			sx={{
				display: 'flex',
				alignItems: 'baseline',
				flexWrap: 'wrap',
				pb: 1,
				columnGap: 1,
				maxWidth: '47rem',
			}}
		>
			<AttributeField
				type="number"
				value={initialSpell.rank}
				onChange={(event) => updateSpell({ rank: Number(event.target.value) })}
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
			<Avatar
				onClick={castSpell}
				sx={{
					bgcolor: (theme) => 'transparent',
					border: (theme) => `1px solid ${theme.palette.text.primary}`,
					color: (theme) => theme.palette.text.primary,
					height: 32,
					width: 32,
					fontSize: '1rem',
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
			<TextField
				variant="standard"
				value={spell.name}
				onChange={(event) =>
					setSpell((s) => ({ ...s, name: event.target.value }))
				}
				onBlur={() => updateSpell({ name: spell.name })}
				label="Name"
				sx={{ maxWidth: { sm: '16rem', xs: '100%' }, flexGrow: 1 }}
			/>
			<TextField
				size="small"
				variant="standard"
				multiline
				minRows={1}
				maxRows={1}
				value={spell.properties}
				onChange={(event) =>
					setSpell((s) => ({ ...s, properties: event.target.value }))
				}
				onBlur={() => updateSpell({ properties: spell.properties })}
				label="Properties"
				sx={{ maxWidth: { sm: '14rem', xs: '100%' }, flexGrow: 1 }}
			/>
			<Box sx={{ width: '100%', flexGrow: 1 }} />
			<AttributeField
				size="small"
				value={spell.target}
				onChange={(event) =>
					setSpell((s) => ({ ...s, target: event.target.value }))
				}
				onBlur={() => updateSpell({ target: spell.target })}
				label="Target"
				sx={{ maxWidth: '7rem', flexGrow: 0 }}
			/>
			<AttributeField
				size="small"
				value={spell.range}
				onChange={(event) =>
					setSpell((s) => ({ ...s, range: event.target.value }))
				}
				onBlur={() => updateSpell({ range: spell.range })}
				label="Range"
				sx={{ maxWidth: '7rem', flexGrow: 0 }}
			/>
			<DamageFields
				type="spell"
				damage={initialSpell.damage}
				updateDamage={(update) =>
					updateSpell({ damage: { ...initialSpell.damage, ...update } })
				}
			/>
			<TextField
				size="small"
				multiline
				minRows={1}
				maxRows={5}
				value={spell.effect}
				onChange={(event) =>
					setSpell((s) => ({ ...s, effect: event.target.value }))
				}
				onBlur={() => updateSpell({ effect: spell.effect })}
				label="Effect"
				sx={{ maxWidth: '40rem' }}
			/>
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
	)
}
