import { Box, IconButton, TextField } from '@mui/material'
import React, { useMemo, useState } from 'react'

import { Delete } from '@mui/icons-material'
import { AttributeField } from '../../CharacterSheet'
import { Spell } from '../../types/Character'

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

	const spellCost = useMemo(() => {
		const newSpellCost = initialSpell.rank * 2
		if (newSpellCost !== initialSpell.cost) {
			updateSpell({ cost: newSpellCost })
		}
		return newSpellCost
	}, [initialSpell])

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				flexWrap: 'wrap',
				pb: 1,
				columnGap: 1,
			}}
		>
			<AttributeField
				size="small"
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
			<AttributeField
				disabled
				size="small"
				type="number"
				value={spellCost}
				label="Cost"
				sx={{ maxWidth: '5rem', flexGrow: 0 }}
			/>
			<TextField
				variant="standard"
				value={spell.name}
				onChange={(event) =>
					setSpell((s) => ({ ...s, name: event.target.value }))
				}
				onBlur={() => updateSpell({ name: spell.name })}
				label="Name"
				sx={{ maxWidth: { sm: '14rem', xs: '100%' }, flexGrow: 1 }}
			/>
			<TextField
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
				sx={{ maxWidth: { sm: '12rem', xs: '100%' }, flexGrow: 1 }}
				inputProps={{ sx: { fontSize: 12 } }}
			/>
			<AttributeField
				size="small"
				value={spell.target}
				onChange={(event) =>
					setSpell((s) => ({ ...s, target: event.target.value }))
				}
				onBlur={() => updateSpell({ target: spell.target })}
				label="Target"
				sx={{ maxWidth: '7rem', flexGrow: 0 }}
				inputProps={{ sx: { fontSize: 12 } }}
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
				inputProps={{ sx: { fontSize: 12 } }}
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
				sx={{ maxWidth: '51.5rem' }}
				inputProps={{ sx: { fontSize: 12 } }}
			/>
			<IconButton
				size="small"
				edge="end"
				aria-label="delete"
				onClick={deleteSpell}
			>
				<Delete />
			</IconButton>
		</Box>
	)
}
