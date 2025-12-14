import {
	Button,
	Checkbox,
	CssBaseline,
	Divider,
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
	TextField,
	ThemeProvider,
	Typography,
	useTheme,
} from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import { CombatArt } from '@site/src/types/CombatArt'
import { Character, CharacterDocument } from '@site/src/types/Character'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import combatArtsData from '../../utils/json/combat-arts.json'
import { CombatArtCard } from './CombatArtCard'
import './combatArtStyles.css'
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

type CombatArtSelection = {
	name: string
	characterName?: string
}

export const CombatArts: React.FC = () => {
	const muiTheme = useTheme()
	const [selectedCombatArts, setSelectedCombatArts] = React.useState<string[]>(
		[],
	)
	const [selectedCombatArtsList, setSelectedCombatArtsList] = React.useState<
		CombatArtSelection[]
	>([])
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>('')
	const [selectedCharacter, setSelectedCharacter] =
		React.useState<CharacterDocument | null>(null)

	const handleChange = (
		event: SelectChangeEvent<typeof selectedCombatArts>,
	) => {
		const {
			target: { value },
		} = event
		const arts = typeof value === 'string' ? value.split(',') : value
		setSelectedCombatArts(arts)
		// Update the list to match manual selections (no character attribution)
		setSelectedCombatArtsList((prev) => {
			// Keep character-attributed selections
			const characterSelections = prev.filter((s) => s.characterName)
			// Add manual selections without duplicates in the manual category
			const manualSelections = arts
				.filter(
					(name) =>
						!prev.some((s) => s.name === name && !s.characterName),
				)
				.map((name) => ({ name }))
			// Remove manual selections that are no longer in the selected list
			const filteredManual = prev
				.filter((s) => !s.characterName)
				.filter((s) => arts.includes(s.name))
			return [...characterSelections, ...filteredManual, ...manualSelections]
		})
	}

	const handleCharacterSelect = (character: CharacterDocument | null) => {
		setSelectedCharacter(character)
		if (character) {
			const characterName = character.personal.name
			const characterAbilityNames =
				character.skills?.abilities?.map((ability) => ability.title) || []
			// Filter to only include abilities that exist in the combat arts data
			const validCombatArts = characterAbilityNames.filter((name) =>
				combatArts.some((ca) => ca.name === name)
			)
			// Add character's combat arts to the list with character attribution
			setSelectedCombatArtsList((prev) => [
				...prev,
				...validCombatArts.map((name) => ({ name, characterName })),
			])
			// Also update the selected arts for the dropdown
			setSelectedCombatArts((prev) => {
				const existingArts = new Set(prev)
				validCombatArts.forEach((name) => existingArts.add(name))
				return Array.from(existingArts)
			})
		}
	}

	const handleCharacterUpload = (jsonString: string) => {
		setCharacterJsonString(jsonString)
		try {
			if (jsonString.trim()) {
				const character: Character = JSON.parse(jsonString)
				const characterName = character.personal?.name || 'Uploaded Character'
				const characterAbilityNames =
					character.skills?.abilities?.map((ability) => ability.title) || []
				// Filter to only include abilities that exist in the combat arts data
				const validCombatArts = characterAbilityNames.filter((name) =>
					combatArts.some((ca) => ca.name === name)
				)
				// Add character's combat arts to the list with character attribution
				setSelectedCombatArtsList((prev) => [
					...prev,
					...validCombatArts.map((name) => ({ name, characterName })),
				])
				// Also update the selected arts for the dropdown
				setSelectedCombatArts((prev) => {
					const existingArts = new Set(prev)
					validCombatArts.forEach((name) => existingArts.add(name))
					return Array.from(existingArts)
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
	const combatArts: CombatArt[] = combatArtsData

	const filteredCombatArts = useMemo(() => {
		return selectedCombatArtsList
			.map((selection) => {
				const combatArt = combatArts.find((ca) => ca.name === selection.name)
				if (!combatArt) return null
				return { ...combatArt, characterName: selection.characterName }
			})
			.filter((ca) => ca !== null) as Array<
			CombatArt & { characterName?: string }
		>
	}, [combatArts, selectedCombatArtsList])

	const selectAll = () => {
		setSelectedCombatArts(combatArts.map((ca) => ca.name))
		// Add all combat arts as manual selections (no character attribution)
		setSelectedCombatArtsList((prev) => {
			const characterSelections = prev.filter((s) => s.characterName)
			const allArts = combatArts.map((ca) => ({ name: ca.name }))
			return [...characterSelections, ...allArts]
		})
	}
	const deselectAll = () => {
		setSelectedCombatArts([])
		setSelectedCombatArtsList([])
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
					Combat Art Card Printing
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Select a character from your account or manually choose combat arts to
					print. Cards will be formatted for easy printing and cutting.
				</Typography>

				<Divider sx={{ my: 1 }} />

				<CharacterSelector
					onCharacterSelect={handleCharacterSelect}
					label="Load Character's Combat Arts"
					helperText="Selecting a character will automatically add their combat arts to the print list below."
				/>

				<Divider sx={{ my: 1 }} />

				<Stack flexDirection="row" gap={1} alignItems="center" flexWrap="wrap">
					<Button variant="contained" size="large" onClick={handlePrint}>
						PRINT
					</Button>
					<FormControl sx={{ m: 1, width: 300 }}>
						<InputLabel>Combat Arts</InputLabel>
						<Select
							multiple
							value={selectedCombatArts}
							onChange={handleChange}
							input={<OutlinedInput label="Combat Arts" />}
							renderValue={(selected) => selected.join(', ')}
							MenuProps={MenuProps}
							sx={{
								backgroundColor:
									muiTheme.palette.mode === 'dark' ? '#2a2a2a' : 'white',
							}}
						>
							{combatArts.map(({ name }) => (
								<MenuItem key={name} value={name}>
									<Checkbox checked={selectedCombatArts.indexOf(name) > -1} />
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
					placeholder="Paste character JSON here to automatically select matching abilities..."
					helperText="You can also paste a character's exported JSON data here as an alternative to selecting a character above."
				/>
			</Stack>
			<Typography variant="subtitle1" sx={{ mb: 2 }}>
				{filteredCombatArts.length} Combat Art
				{filteredCombatArts.length !== 1 ? 's' : ''} will be printed
				{selectedCombatArtsList.some((s) => s.characterName) && (
					<>
						{' '}
						(including duplicates for specific characters - hover over cards to
						see which character they belong to)
					</>
				)}
				:
			</Typography>
			<div className="combat-art--container" ref={componentRef}>
				{filteredCombatArts.map((combatArt, index) => (
					<>
						<div
							key={`${combatArt.name}-${combatArt.characterName || 'manual'}-${index}`}
							title={
								combatArt.characterName
									? `For character: ${combatArt.characterName}`
									: undefined
							}
						>
							<CombatArtCard {...combatArt} />
						</div>
						{Boolean(index % 9 === 8) && <div className="page-break" />}
					</>
				))}
				{!filteredCombatArts.length && (
					<Typography variant="body2">
						Select some Combat Arts above to include them for printing.
					</Typography>
				)}
			</div>
		</>
	)
}
