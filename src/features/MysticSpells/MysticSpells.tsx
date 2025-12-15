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
	ThemeProvider,
	Typography,
	useTheme,
	experimental_extendTheme,
} from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import { MysticSpell } from '@site/src/types/MysticSpell'
import { Character, CharacterDocument } from '@site/src/types/Character'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import mysticSpellData from '../../utils/data/json/mystic-spells.json';
import './mysticSpellsStyles.css'
import { MysticSpellCard } from './MysticSpellCard'
import { CharacterSelector } from '../PrintingTools'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'

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

export const MysticSpells: React.FC = () => {
	const customTheme = experimental_extendTheme()
	const muiTheme = useTheme()
	const [selectedMysticSpells, setSelectedMysticSpells] = React.useState<
		string[]
	>([])
	const [selectedMysticSpellsList, setSelectedMysticSpellsList] =
		React.useState<SpellSelection[]>([])
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>('')
	const [selectedCharacter, setSelectedCharacter] =
		React.useState<CharacterDocument | null>(null)

	const handleChange = (
		event: SelectChangeEvent<typeof selectedMysticSpells>,
	) => {
		const {
			target: { value },
		} = event
		const spells = typeof value === 'string' ? value.split(',') : value
		setSelectedMysticSpells(spells)
		// Update the list to match manual selections (no character attribution)
		setSelectedMysticSpellsList((prev) => {
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
			setSelectedMysticSpellsList((prev) => [
				...prev,
				...characterSpellNames.map((name) => ({ name, characterName })),
			])
			// Also update the selected spells for the dropdown
			setSelectedMysticSpells((prev) => {
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
				setSelectedMysticSpellsList((prev) => [
					...prev,
					...characterSpellNames.map((name) => ({ name, characterName })),
				])
				// Also update the selected spells for the dropdown
				setSelectedMysticSpells((prev) => {
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
	const mysticSpells: MysticSpell[] = mysticSpellData

	const filteredMysticSpells = useMemo(() => {
		return selectedMysticSpellsList
			.map((selection) => {
				const spell = mysticSpells.find((s) => s.name === selection.name)
				if (!spell) return null
				return { ...spell, characterName: selection.characterName }
			})
			.filter((s) => s !== null) as Array<
			MysticSpell & { characterName?: string }
		>
	}, [mysticSpells, selectedMysticSpellsList])

	const selectAll = () => {
		setSelectedMysticSpells(mysticSpells.map((ca) => ca.name))
		// Add all spells as manual selections (no character attribution)
		setSelectedMysticSpellsList((prev) => {
			const characterSelections = prev.filter((s) => s.characterName)
			const allSpells = mysticSpells.map((spell) => ({ name: spell.name }))
			return [...characterSelections, ...allSpells]
		})
	}
	const deselectAll = () => {
		setSelectedMysticSpells([])
		setSelectedMysticSpellsList([])
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
					Mystic Spell Card Printing
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Select a character from your account or manually choose mystic spells
					to print. Cards will be formatted for easy printing and cutting.
				</Typography>

				<Divider sx={{ my: 1 }} />

				<CharacterSelector
					onCharacterSelect={handleCharacterSelect}
					label="Load Character's Mystic Spells"
					helperText="Selecting a character will automatically add their mystic spells to the print list below."
				/>

				<Divider sx={{ my: 1 }} />

				<Stack flexDirection="row" gap={1} alignItems="center" flexWrap="wrap">
					<Button variant="contained" size="large" onClick={handlePrint}>
						PRINT
					</Button>
					<FormControl sx={{ m: 1, width: 300 }}>
						<InputLabel>Mystic Spells</InputLabel>
						<Select
							multiple
							value={selectedMysticSpells}
							onChange={handleChange}
							input={<OutlinedInput label="Mystic Spells" />}
							renderValue={(selected) => selected.join(', ')}
							MenuProps={MenuProps}
							sx={{
								backgroundColor:
									muiTheme.palette.mode === 'dark' ? '#2a2a2a' : 'white',
							}}
						>
							{mysticSpells.map(({ name }) => (
								<MenuItem key={name} value={name}>
									<Checkbox checked={selectedMysticSpells.indexOf(name) > -1} />
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
				{filteredMysticSpells.length} Mystic Spell
				{filteredMysticSpells.length !== 1 ? 's' : ''} will be printed
				{selectedMysticSpellsList.some((s) => s.characterName) && (
					<>
						{' '}
						(including duplicates for specific characters - hover over cards to
						see which character they belong to)
					</>
				)}
				:
			</Typography>
			<div className="mystic-spell--container" ref={componentRef}>
				{filteredMysticSpells.map((mysticSpell, index) => (
					<>
						<div
							key={`${mysticSpell.name}-${mysticSpell.characterName || 'manual'}-${index}`}
							title={
								mysticSpell.characterName
									? `For character: ${mysticSpell.characterName}`
									: undefined
							}
						>
							<MysticSpellCard {...mysticSpell} />
						</div>
						{Boolean(index % 9 === 8) && <div className="page-break" />}
					</>
				))}
				{!filteredMysticSpells.length && (
					<Typography variant="body2">
						Select some Mystic Spells above to include them for printing.
					</Typography>
				)}
			</div>
		</>
	)
}
