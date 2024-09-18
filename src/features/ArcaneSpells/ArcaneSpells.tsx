import {
	Button,
	Checkbox,
	Experimental_CssVarsProvider,
	experimental_extendTheme,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	Stack,
	ThemeProvider,
	Typography,
} from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import { ArcaneSpell } from '@site/src/types/ArcaneSpell'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import arcaneSpellData from '../../utils/json/arcane-spells.json'
import './arcaneSpellsStyles.css'
import { ArcaneSpellCard } from './ArcaneSpellCard'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

export const ArcaneSpells: React.FC = () => {
	const customTheme = experimental_extendTheme()
	const [selectedArcaneSpells, setSelectedArcaneSpells] = React.useState<
		string[]
	>([])

	const handleChange = (
		event: SelectChangeEvent<typeof selectedArcaneSpells>,
	) => {
		const {
			target: { value },
		} = event
		setSelectedArcaneSpells(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		)
	}

	const componentRef = useRef()
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	})
	const arcaneSpells: ArcaneSpell[] = arcaneSpellData

	const filteredArcaneSpells = useMemo(
		() => arcaneSpells.filter((ca) => selectedArcaneSpells.includes(ca.name)),
		[arcaneSpells, selectedArcaneSpells],
	)

	const selectAll = () =>
		setSelectedArcaneSpells(arcaneSpells.map((ca) => ca.name))
	const deselectAll = () => setSelectedArcaneSpells([])

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<Stack
				flexDirection="row"
				gap={1}
				alignItems="center"
				sx={{
					mb: 2,
					py: 2,
					px: 3,
					backgroundColor: 'white',
					borderRadius: '8px',
				}}
			>
				<Button variant="contained" size="large" onClick={handlePrint}>
					PRINT
				</Button>
				<FormControl sx={{ m: 1, width: 300 }}>
					<InputLabel>Arcane Spells</InputLabel>
					<Select
						multiple
						value={selectedArcaneSpells}
						onChange={handleChange}
						input={<OutlinedInput label="Arcane Spells" />}
						renderValue={(selected) => selected.join(', ')}
						MenuProps={MenuProps}
						sx={{ backgroundColor: 'white' }}
					>
						{arcaneSpells.map(({ name }) => (
							<MenuItem key={name} value={name}>
								<Checkbox checked={selectedArcaneSpells.indexOf(name) > -1} />
								<ListItemText primary={name} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button variant="outlined" size="small" onClick={selectAll}>
					Select all
				</Button>
				<Button variant="outlined" size="small" onClick={deselectAll}>
					Deselect all
				</Button>
			</Stack>
			<Typography variant="subtitle1">
				{filteredArcaneSpells.length} Arcane Spells will be printed:
			</Typography>
			<div className="arcane-spell--container" ref={componentRef}>
				{filteredArcaneSpells.map((arcaneSpell, index) => (
					<>
						<ArcaneSpellCard key={arcaneSpell.name} {...arcaneSpell} />
						{Boolean(index % 9 === 8) && <div className="page-break" />}
					</>
				))}
				{!filteredArcaneSpells.length && (
					<Typography variant="body2">
						Select some Arcane Spells above to include them for printing.
					</Typography>
				)}
			</div>
		</Experimental_CssVarsProvider>
	)
}
