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
} from '@mui/material'
import { ArcaneSpell } from '@site/src/types/ArcaneSpell'
import { MysticSpell } from '@site/src/types/MysticSpell'
import { Character, CharacterDocument } from '@site/src/types/Character'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import arcaneSpellData from '../../utils/data/json/arcane-spells.json'
import mysticSpellData from '../../utils/data/json/mystic-spells.json'
import './spellsStyles.css'
import { SpellCard } from './SpellCard'
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

type SpellType = 'all' | 'arcane' | 'mystic'

type UnifiedSpell = {
	name: string
	type: 'arcane' | 'mystic'
	category: string // discipline or tradition
} & (ArcaneSpell | MysticSpell)

type SpellSelection = {
	name: string
	characterName?: string
}

export const Spells: React.FC = () => {
	const muiTheme = useTheme()
	const [selectedSpells, setSelectedSpells] = React.useState<string[]>([])
	const [selectedSpellsList, setSelectedSpellsList] = React.useState<
		SpellSelection[]
	>([])
	const [spellTypeFilter, setSpellTypeFilter] = React.useState<SpellType>('all')
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>('')
	const [_selectedCharacter, setSelectedCharacter] =
		React.useState<CharacterDocument | null>(null)

	// Combine both spell lists with type information
	const allSpells: UnifiedSpell[] = useMemo(() => {
		const arcane: UnifiedSpell[] = (arcaneSpellData as ArcaneSpell[]).map(
			(spell) => ({
				...spell,
				type: 'arcane' as const,
				category: spell.discipline,
			}),
		)
		const mystic: UnifiedSpell[] = (mysticSpellData as MysticSpell[]).map(
			(spell) => ({
				...spell,
				type: 'mystic' as const,
				category: spell.tradition,
			}),
		)
		return [...arcane, ...mystic].sort((a, b) => a.name.localeCompare(b.name))
	}, [])

	const availableSpells = useMemo(() => {
		if (spellTypeFilter === 'all') return allSpells
		return allSpells.filter((spell) => spell.type === spellTypeFilter)
	}, [allSpells, spellTypeFilter])

	const handleChange = (event: SelectChangeEvent<typeof selectedSpells>) => {
		const {
			target: { value },
		} = event
		const spells = typeof value === 'string' ? value.split(',') : value
		setSelectedSpells(spells)
		// Update the list to match manual selections (no character attribution)
		setSelectedSpellsList((prev) => {
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

	const handleSpellTypeFilterChange = (
		event: SelectChangeEvent<SpellType>,
	) => {
		setSpellTypeFilter(event.target.value as SpellType)
	}

	const handleCharacterSelect = (character: CharacterDocument | null) => {
		setSelectedCharacter(character)
		if (character) {
			const characterName = character.personal.name
			const characterSpellNames =
				character.spells?.spells?.map((spell) => spell.name) || []
			// Add character's spells to the list with character attribution
			setSelectedSpellsList((prev) => [
				...prev,
				...characterSpellNames.map((name) => ({ name, characterName })),
			])
			// Also update the selected spells for the dropdown
			setSelectedSpells((prev) => {
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
				setSelectedSpellsList((prev) => [
					...prev,
					...characterSpellNames.map((name) => ({ name, characterName })),
				])
				// Also update the selected spells for the dropdown
				setSelectedSpells((prev) => {
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

	const filteredSpells = useMemo(() => {
		return selectedSpellsList
			.map((selection) => {
				const spell = availableSpells.find((s) => s.name === selection.name)
				if (!spell) return null
				return { ...spell, characterName: selection.characterName }
			})
			.filter((s) => s !== null) as Array<
			UnifiedSpell & { characterName?: string }
		>
	}, [availableSpells, selectedSpellsList])

	const selectAll = () => {
		setSelectedSpells(availableSpells.map((spell) => spell.name))
		// Add all spells as manual selections (no character attribution)
		setSelectedSpellsList((prev) => {
			const characterSelections = prev.filter((s) => s.characterName)
			const allSpells = availableSpells.map((spell) => ({ name: spell.name }))
			return [...characterSelections, ...allSpells]
		})
	}
	const deselectAll = () => {
		setSelectedSpells([])
		setSelectedSpellsList([])
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
					Spell Card Printing
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Select a character from your account or manually choose spells to
					print. Cards will be formatted for easy printing and cutting.
				</Typography>

				<Divider sx={{ my: 1 }} />

				<CharacterSelector
					onCharacterSelect={handleCharacterSelect}
					label="Load Character's Spells"
					helperText="Selecting a character will automatically add their spells to the print list below."
				/>

				<Divider sx={{ my: 1 }} />

				<Stack flexDirection="row" gap={1} alignItems="center" flexWrap="wrap">
					<Button variant="contained" size="large" onClick={handlePrint}>
						PRINT
					</Button>
					<FormControl sx={{ m: 1, width: 150 }}>
						<InputLabel>Spell Type</InputLabel>
						<Select
							value={spellTypeFilter}
							onChange={handleSpellTypeFilterChange}
							input={<OutlinedInput label="Spell Type" />}
							sx={{
								backgroundColor:
									muiTheme.palette.mode === 'dark' ? '#2a2a2a' : 'white',
							}}
						>
							<MenuItem value="all">All Spells</MenuItem>
							<MenuItem value="arcane">Arcane Only</MenuItem>
							<MenuItem value="mystic">Mystic Only</MenuItem>
						</Select>
					</FormControl>
					<FormControl sx={{ m: 1, width: 300 }}>
						<InputLabel>Spells</InputLabel>
						<Select
							multiple
							value={selectedSpells}
							onChange={handleChange}
							input={<OutlinedInput label="Spells" />}
							renderValue={(selected) => selected.join(', ')}
							MenuProps={MenuProps}
							sx={{
								backgroundColor:
									muiTheme.palette.mode === 'dark' ? '#2a2a2a' : 'white',
							}}
						>
							{availableSpells.map(({ name, type }) => (
								<MenuItem key={name} value={name}>
									<Checkbox checked={selectedSpells.indexOf(name) > -1} />
									<ListItemText
										primary={name}
										secondary={type === 'arcane' ? 'Arcane' : 'Mystic'}
									/>
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
				{filteredSpells.length} Spell{filteredSpells.length !== 1 ? 's' : ''}{' '}
				will be printed
				{selectedSpellsList.some((s) => s.characterName) && (
					<>
						{' '}
						(including duplicates for specific characters - hover over cards to
						see which character they belong to)
					</>
				)}
				:
			</Typography>
			<div className="spell--container" ref={componentRef}>
				{filteredSpells.map((spell, index) => (
					<>
						<div
							key={`${spell.name}-${spell.characterName || 'manual'}-${index}`}
							title={
								spell.characterName
									? `For character: ${spell.characterName}`
									: undefined
							}
						>
							<SpellCard {...spell} />
						</div>
						{Boolean(index % 9 === 8) && <div className="page-break" />}
					</>
				))}
				{!filteredSpells.length && (
					<Typography variant="body2">
						Select some spells above to include them for printing.
					</Typography>
				)}
			</div>
		</>
	)
}
