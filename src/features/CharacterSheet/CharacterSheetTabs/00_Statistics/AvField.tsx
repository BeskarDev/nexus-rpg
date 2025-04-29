import { useMemo } from 'react'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Settings } from '@mui/icons-material'
import {
	Box,
	IconButton,
	Menu,
	MenuItem,
	TextField,
	TextFieldProps,
	Typography,
} from '@mui/material'
import React from 'react'
import {
	avType,
	avTypeArray,
	CharacterDocument,
	Companion,
	Statistics,
} from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'

export const AvField: React.FC<
	{
		av: Statistics['av']
		updateFn: (
			update: DeepPartial<CharacterDocument | Companion>,
		) => void
	} & TextFieldProps
> = ({ av, updateFn, ...props }) => {
	if (!av) {
		return undefined
	}

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const totalAV: number = useMemo(
		() => av.armor + av.helmet + av.shield + av.other,
		[av.armor + av.helmet + av.shield + av.other],
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
					...props.sx,
				}}
			>
				<AttributeField
					{...props}
					disabled
					value={av.type ? `${totalAV} (${av.type})` : `${totalAV}`}
					label="AV"
					sx={{
						mr: 1,
						maxWidth: '6rem',
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
				MenuListProps={{ sx: { p: 2, maxWidth: '17rem' } }}
			>
				<SectionHeader>AV Calculator</SectionHeader>
				<Typography variant="subtitle2">
					Set the individual sources of AV.
				</Typography>
				<Box
					sx={{
						display: 'flex',
						flexWrap: 'wrap',
						alignItems: 'center',
						columnGap: 1,
					}}
				>
					<AttributeField
						type="number"
						size="small"
						value={av.armor}
						onChange={(event) =>
							updateFn(
								{
									statistics: { av: { armor: Number(event.target.value) } },
								},
							)
						}
						label="Armor"
						sx={{ maxWidth: '4rem' }}
					/>
					<AttributeField
						type="number"
						size="small"
						value={av.helmet}
						onChange={(event) =>
							updateFn(
								{
									statistics: { av: { helmet: Number(event.target.value) } },
								},
							)
						}
						label="Helmet"
						sx={{ maxWidth: '4rem' }}
					/>
					<AttributeField
						type="number"
						size="small"
						value={av.shield}
						onChange={(event) =>
							updateFn(
								{
									statistics: { av: { shield: Number(event.target.value) } },
								},
							)
						}
						label="Shield"
						sx={{ maxWidth: '4rem' }}
					/>
					<AttributeField
						type="number"
						size="small"
						value={av.other}
						onChange={(event) =>
							updateFn(
								{
									statistics: { av: { other: Number(event.target.value) } },
								},
							)
						}
						label="Other"
						sx={{ maxWidth: '4rem' }}
					/>
					<TextField
						select
						size="small"
						variant="standard"
						value={av.type}
						onChange={(event) =>
							updateFn(
								{
									statistics: { av: { type: event.target.value as avType } },
								},
							)
						}
						label="Type"
						sx={{ maxWidth: '4rem', mt: 0.5 }}
					>
						{avTypeArray.map((type) => (
							<MenuItem key={type} value={type}>
								{type}
							</MenuItem>
						))}
					</TextField>
				</Box>
			</Menu>
		</>
	)
}
