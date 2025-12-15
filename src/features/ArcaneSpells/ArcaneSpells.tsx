import {
	Button,
	Checkbox,
	Divider,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
	useTheme,
	experimental_extendTheme,
} from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import { ArcaneSpell } from '@site/src/types/ArcaneSpell'
import { Character, CharacterDocument } from '@site/src/types/Character'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import arcaneSpellData from '../../utils/data/json/arcane-spells.json';
import './arcaneSpellsStyles.css'
import { ArcaneSpellCard } from './ArcaneSpellCard'
import { CharacterSelector } from '../PrintingTools'

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

type SpellSelection = {
	name: string
	characterName?: string
}

export const ArcaneSpells: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)
	const muiTheme = useTheme()
	const [selectedArcaneSpells, setSelectedArcaneSpells] = React.useState<
		string[]
	>([])
	const [selectedArcaneSpellsList, setSelectedArcaneSpellsList] =
		React.useState<SpellSelection[]>([])
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>('')
	const [selectedCharacter, setSelectedCharacter] =
		React.useState<CharacterDocument | null>(null)

	const handleChange = (
		event: SelectChangeEvent<typeof selectedArcaneSpells>,
	) => {
		const {
			target: { value },
		} = event
		const spells = typeof value === 'string' ? value.split(',') : value
		setSelectedArcaneSpells(spells)
		// Update the list to match manual selections (no character attribution)
		setSelectedArcaneSpellsList((prev) => {
			// Keep character-attributed selections
			const characterSelections = prev.filter((s) => s.characterName)
			// Add manual selections without duplicates in the manual category
			const manualSelections = spells
				.filter(
					(name) => !prev.some((s) => s.name === name && !s.characterName),
				)
				.map((name) => ({ name }))
			// Remove manual selections that are no longer in the selected list
			const filteredManual = prev
				.filter((s) => !s.characterName)
				.filter((s) => spells.includes(s.name))
			return [...characterSelections, ...filteredManual, ...manualSelections]
		})
	}

	const handleCharacterSelect = (character: CharacterDocument | null) => {
		setSelectedCharacter(character)
		if (character) {
			const characterName = character.personal.name
			const characterSpellNames =
				character.spells?.spells?.map((spell) => spell.name) || []
			// Add character's spells to the list with character attribution
			setSelectedArcaneSpellsList((prev) => [
				...prev,
				...characterSpellNames.map((name) => ({ name, characterName })),
			])
			// Also update the selected spells for the dropdown
			setSelectedArcaneSpells((prev) => {
				const existingSpells = new Set(prev)
				characterSpellNames.forEach((name) => existingSpells.add(name))
				return Array.from(existingSpells)
			})
		}
	}

	const handleCharacterUpload = (jsonString: string) => {
		setCharacterJsonString(jsonString)
		try {
			if (jsonString.trim()) {
				const character: Character = JSON.parse(jsonString)
				const characterName = character.personal?.name || 'Uploaded Character'
				const characterSpellNames =
					character.spells?.spells?.map((spell) => spell.name) || []
				// Add character's spells to the list with character attribution
				setSelectedArcaneSpellsList((prev) => [
					...prev,
					...characterSpellNames.map((name) => ({ name, characterName })),
				])
				// Also update the selected spells for the dropdown
				setSelectedArcaneSpells((prev) => {
					const existingSpells = new Set(prev)
					characterSpellNames.forEach((name) => existingSpells.add(name))
					return Array.from(existingSpells)
				})
			}
		} catch (error) {
			console.error('Failed to parse character JSON:', error)
		}
	}

	const componentRef = useRef()
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	})
	const arcaneSpells: ArcaneSpell[] = arcaneSpellData

	const filteredArcaneSpells = useMemo(() => {
		return selectedArcaneSpellsList
			.map((selection) => {
				const spell = arcaneSpells.find((s) => s.name === selection.name)
				if (!spell) return null
				return { ...spell, characterName: selection.characterName }
			})
			.filter((s) => s !== null) as Array<
			ArcaneSpell & { characterName?: string }
		>
	}, [arcaneSpells, selectedArcaneSpellsList])

	const selectAll = () => {
		setSelectedArcaneSpells(arcaneSpells.map((ca) => ca.name))
		// Add all spells as manual selections (no character attribution)
		setSelectedArcaneSpellsList((prev) => {
			const characterSelections = prev.filter((s) => s.characterName)
			const allSpells = arcaneSpells.map((spell) => ({ name: spell.name }))
			return [...characterSelections, ...allSpells]
		})
	}
	const deselectAll = () => {
		setSelectedArcaneSpells([])
		setSelectedArcaneSpellsList([])
	}

	return (
		<>
			<style type="text/css" media="print">
				{
					'\
        @page { size: 192mm 267mm; }\
      '
				}
			</style>
			<Stack
				flexDirection="column"
				gap={2}
				sx={{
					mb: 2,
					py: 2,
					px: 3,
					backgroundColor:
						muiTheme.palette.mode === 'dark' ? '#1e1e1e' : 'white',
					borderRadius: '8px',
				}}
			>
				<Typography variant="h6" component="h2">
					Arcane Spell Card Printing
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Select a character from your account or manually choose arcane spells
					to print. Cards will be formatted for easy printing and cutting.
				</Typography>

				<Divider sx={{ my: 1 }} />

				<CharacterSelector
					onCharacterSelect={handleCharacterSelect}
					label="Load Character's Arcane Spells"
					helperText="Selecting a character will automatically add their arcane spells to the print list below."
				/>

				<Divider sx={{ my: 1 }} />

				<Stack flexDirection="row" gap={1} alignItems="center" flexWrap="wrap">
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
							sx={{
								backgroundColor:
									muiTheme.palette.mode === 'dark' ? '#2a2a2a' : 'white',
							}}
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

				<Divider sx={{ my: 1 }} />

				<TextField
					multiline
					minRows={3}
					maxRows={5}
					fullWidth
					label="Alternative: Import Character as JSON"
					value={characterJsonString}
					onChange={(event) => handleCharacterUpload(event.target.value)}
					placeholder="Paste character JSON here to automatically select their spells..."
					helperText="You can also paste a character's exported JSON data here as an alternative to selecting a character above."
				/>
			</Stack>
			<Typography variant="subtitle1" sx={{ mb: 2 }}>
				{filteredArcaneSpells.length} Arcane Spell
				{filteredArcaneSpells.length !== 1 ? 's' : ''} will be printed
				{selectedArcaneSpellsList.some((s) => s.characterName) && (
					<>
						{' '}
						(including duplicates for specific characters - hover over cards to
						see which character they belong to)
					</>
				)}
				:
			</Typography>
			<div className="arcane-spell--container" ref={componentRef}>
				{filteredArcaneSpells.map((arcaneSpell, index) => (
					<>
						<div
							key={`${arcaneSpell.name}-${arcaneSpell.characterName || 'manual'}-${index}`}
							title={
								arcaneSpell.characterName
									? `For character: ${arcaneSpell.characterName}`
									: undefined
							}
						>
							<ArcaneSpellCard {...arcaneSpell} />
						</div>
						{Boolean(index % 9 === 8) && <div className="page-break" />}
					</>
				))}
				{!filteredArcaneSpells.length && (
					<Typography variant="body2">
						Select some Arcane Spells above to include them for printing.
					</Typography>
				)}
			</div>
		</>
	)
}
