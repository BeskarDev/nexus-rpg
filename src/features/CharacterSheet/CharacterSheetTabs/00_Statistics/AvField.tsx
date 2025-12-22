import { useMemo } from 'react'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Settings, Shield } from '@mui/icons-material'
import { Box, IconButton, Menu, Tooltip, Typography, alpha } from '@mui/material'
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
			<Tooltip title="Click gear to configure AV sources">
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						minWidth: '4rem',
						maxWidth: '5rem',
						borderRadius: 1,
						border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
						bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
						p: 0.5,
						position: 'relative',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
						<Shield sx={{ fontSize: '0.7rem', color: '#78909c' }} />
						<Typography
							variant="caption"
							sx={{
								fontWeight: 700,
								fontSize: '0.65rem',
								color: '#78909c',
								textTransform: 'uppercase',
							}}
						>
							AV
						</Typography>
					</Box>
					<Typography
						sx={{
							fontWeight: 'bold',
							fontSize: '0.95rem',
							lineHeight: 1.2,
							textAlign: 'center',
              mt: 0.25,
						}}
					>
						{totalAV}
					</Typography>
					<IconButton
						size="small"
						onClick={handleClick}
						sx={{
							position: 'absolute',
							top: 0,
							right: 0,
							p: 0.25,
							opacity: 0.6,
							'&:hover': { opacity: 1 },
						}}
					>
						<Settings sx={{ fontSize: '0.65rem' }} />
					</IconButton>
				</Box>
			</Tooltip>
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
