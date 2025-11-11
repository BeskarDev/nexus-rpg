import {
	Alert,
	Avatar,
	Box,
	Button,
	Divider,
	Stack,
	styled,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import { Character, CharacterDocument } from '@site/src/types/Character'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { emptyCharacter } from './assets/emptyCharacter'
import './printCharacterSheetStyles.css'
import { StatisticsSheet } from './sheets/1_Statistics'
import { EquipmentSheet } from './sheets/2_Equipment'
import { SpellsSheet } from './sheets/3_Spells'
import { PersonalSheet } from './sheets/4_Personal'
import { CharacterSelector } from '../PrintingTools'

const AttributeField = styled(TextField)({
	maxWidth: '4.5rem',
})
AttributeField.defaultProps = {
	disabled: true,
	variant: 'outlined',
	inputProps: {
		style: {
			textAlign: 'center',
			fontWeight: 'bold',
			paddingInline: 'auto',
		},
	},
}

export const OutlinedTextfield = styled(TextField)({
	'& .MuiOutlinedInput-root': {
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: 'black',
		},
		'& .MuiInputBase-input.MuiOutlinedInput-input': {
			textAlign: 'right',
		},
	},
})

export const CharacterHeaderTextField = styled(TextField)({
	marginTop: 0,
	'& .MuiInputBase-input.MuiInput-input': {
		paddingBottom: 0,
	},
})
CharacterHeaderTextField.defaultProps = {
	size: 'small',
	variant: 'standard',
}

export const RankIndicator = styled(Avatar)({
	width: 24,
	height: 24,
	backgroundColor: 'transparent',
	color: 'black',
	border: '1px solid black',
	fontSize: '14px',
})

export const PrintCharacterSheet: React.FC = () => {
	const muiTheme = useTheme()
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>(emptyCharacter)
	const [selectedCharacter, setSelectedCharacter] =
		React.useState<CharacterDocument | null>(null)

	const char: Character = useMemo(() => {
		try {
			// Prioritize selected character from Firebase
			if (selectedCharacter) {
				return selectedCharacter as Character
			}
			// Fall back to JSON string
			return characterJsonString
				? (JSON.parse(characterJsonString) as Character)
				: undefined
		} catch (e) {
			console.error(e)
			return undefined
		}
	}, [characterJsonString, selectedCharacter])

	const handleCharacterSelect = (character: CharacterDocument | null) => {
		setSelectedCharacter(character)
	}

	const handleCharacterUpload = (jsonString: string) => {
		setCharacterJsonString(jsonString)
		// Clear selected character when JSON is pasted
		if (jsonString.trim() && jsonString !== emptyCharacter) {
			setSelectedCharacter(null)
		}
	}

	const componentRef = useRef()
	const handlePrint = useReactToPrint({
		documentTitle: char?.personal.name + '-character-sheet',
		content: () => componentRef.current,
	})

	return (
		<Box>
			<style type="text/css" media="print">
				{
					'\
        @page { size: 267mm 192mm; }\
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
					Character Sheet Printing
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Select a character from your account or paste character JSON data to
					print a complete character sheet with all statistics, equipment,
					spells, and personal information.
				</Typography>

				{muiTheme.palette.mode === 'dark' && (
					<Alert variant="filled" severity="info">
						If you're having trouble seeing everything on the sheets, try
						switching to light mode using the theme toggle above (the printed
						result isn't affected either way)!
					</Alert>
				)}

				<Divider sx={{ my: 1 }} />

				<CharacterSelector
					onCharacterSelect={handleCharacterSelect}
					label="Select Character to Print"
					helperText="Choose a character from your account to automatically load all their data for printing."
				/>

				<Divider sx={{ my: 1 }} />

				<TextField
					multiline
					minRows={3}
					maxRows={5}
					fullWidth
					label="Alternative: Import Character as JSON"
					value={characterJsonString}
					onChange={(event) => handleCharacterUpload(event.target.value)}
					placeholder="Paste character JSON here to load character data..."
					helperText="You can also paste a character's exported JSON data here as an alternative to selecting a character above."
				/>

				<Divider sx={{ my: 1 }} />

				<Button
					variant="contained"
					size="large"
					onClick={handlePrint}
					disabled={!char}
				>
					PRINT CHARACTER SHEET
				</Button>
			</Stack>

			{Boolean(char) && (
				<Box sx={{ display: 'flex', flexWrap: 'wrap' }} ref={componentRef}>
					<StatisticsSheet char={char} />
					<EquipmentSheet char={char} />
					<SpellsSheet char={char} />
					<PersonalSheet char={char} />
				</Box>
			)}
		</Box>
	)
}
