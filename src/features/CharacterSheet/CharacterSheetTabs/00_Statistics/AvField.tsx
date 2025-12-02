import { useMemo } from 'react'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Settings } from '@mui/icons-material'
import { Box, IconButton, Menu, Typography } from '@mui/material'
import React from 'react'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'

export const AvField = () => {
	const dispatch = useAppDispatch()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const { av } = useAppSelector(
		(state) => state.characterSheet.activeCharacter.statistics,
	)

	const totalAV: number = useMemo(
		() => av.armor + av.helmet + av.shield + (av.auto || 0) + av.other,
		[av.armor, av.helmet, av.shield, av.auto, av.other],
	)

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

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
				<AttributeField
					disabled
					value={totalAV}
					label="AV"
					sx={{
						mr: 1,
						'& .MuiOutlinedInput-root': {
							'& .MuiOutlinedInput-notchedOutline': {
								borderWidth: '2px',
							},
						},
					}}
				/>
				<IconButton size="small" onClick={handleClick} sx={{ ml: -1.5 }}>
					<Settings fontSize="small" />
				</IconButton>
			</Box>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{ sx: { p: 2, maxWidth: '17.5rem' } }}
			>
				<SectionHeader>AV Calculator</SectionHeader>
				<Typography variant="subtitle2">
					Set the individual sources of AV.
				</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <AttributeField
            type="number"
            size="small"
            value={av.armor}
            onChange={(event) =>
              updateCharacter({
                statistics: { av: { armor: Number(event.target.value) } },
              })
            }
            label="Armor"
          />
          <AttributeField
            type="number"
            size="small"
            value={av.helmet}
            onChange={(event) =>
              updateCharacter({
                statistics: { av: { helmet: Number(event.target.value) } },
              })
            }
            label="Helmet"
          />
          <AttributeField
            type="number"
            size="small"
            value={av.shield}
            onChange={(event) =>
              updateCharacter({
                statistics: { av: { shield: Number(event.target.value) } },
              })
            }
            label="Shield"
          />
          <AttributeField
            type="number"
            size="small"
            value={av.other}
            onChange={(event) =>
              updateCharacter({
                statistics: { av: { other: Number(event.target.value) } },
              })
            }
            label="Other"
          />
          <AttributeField
            disabled
            type="number"
            size="small"
            value={av.auto || 0}
            label="Auto"
            sx={{ width: '4rem' }}
          />
        </Box>
			</Menu>
		</>
	)
}
