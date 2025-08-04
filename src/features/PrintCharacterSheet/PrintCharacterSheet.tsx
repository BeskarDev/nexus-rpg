import { Alert, Avatar, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, styled, TextField, Typography } from '@mui/material'
import { Character } from '@site/src/types/Character'
import React, { useMemo, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { emptyCharacter } from './assets/emptyCharacter'
import './printCharacterSheetStyles.css'
import { StatisticsSheet } from './sheets/1_Statistics'
import { EquipmentSheet } from './sheets/2_Equipment'
import { SpellsSheet } from './sheets/3_Spells'
import { PersonalSheet } from './sheets/4_Personal'

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
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>(emptyCharacter)
	const [helpDialogOpen, setHelpDialogOpen] = useState(false)

	const char: Character = useMemo(() => {
		try {
			return characterJsonString
				? (JSON.parse(characterJsonString) as Character)
				: undefined
		} catch (e) {
			console.error(e)
			return undefined
		}
	}, [characterJsonString])

	const componentRef = useRef()
	const handlePrint = useReactToPrint({
		documentTitle: char?.personal.name + '-character-sheet',
		content: () => componentRef.current,
	})

	return (
		<Box>
      <style type="text/css" media="print">{"\
        @page {\ size: 267mm 192mm;\ }\
      "}</style>
			<Alert variant="filled" severity="info" sx={{ mb: 2 }}>
				If you're having trouble seeing everything on the sheets, make sure to
				use light mode (the printed result isn't affected either way)!
			</Alert>
			<Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
				<Box sx={{ flex: 1 }}>
					<TextField
						multiline
						minRows={5}
						maxRows={5}
						fullWidth
						label="Import Character as JSON"
						value={characterJsonString}
						onChange={(event) => setCharacterJsonString(event.target.value)}
						sx={{ mb: 2 }}
					/>
				</Box>
				<IconButton
					onClick={() => setHelpDialogOpen(true)}
					sx={{ mt: 1 }}
					size="small"
				>
					?
				</IconButton>
			</Box>
			<Button variant="contained" size="large" onClick={handlePrint}>
				PRINT
			</Button>

			<Dialog open={helpDialogOpen} onClose={() => setHelpDialogOpen(false)} maxWidth="md">
				<DialogTitle>Print Character Sheet Help</DialogTitle>
				<DialogContent>
					<Typography variant="h6" gutterBottom>How to Use</Typography>
					<Typography variant="body2" paragraph>
						1. <strong>Import Character Data</strong>: Paste your character's JSON data into the text field<br/>
						2. <strong>Preview</strong>: The sheets will automatically update to show your character's information<br/>
						3. <strong>Print</strong>: Click the "PRINT" button to generate a printable version
					</Typography>

					<Typography variant="h6" gutterBottom>Features</Typography>
					<Typography variant="body2" paragraph>
						• <strong>Statistics Sheet</strong>: Character attributes, health, fatigue, skills, and abilities<br/>
						• <strong>Equipment Sheet</strong>: Weapons, armor, items, and encumbrance information<br/>
						• <strong>Spells Sheet</strong>: Magic skills, spells, focus, and spell damage calculations<br/>
						• <strong>Personal Sheet</strong>: Character background, description, relationships, and notes
					</Typography>

					<Typography variant="h6" gutterBottom>Character Data Format</Typography>
					<Typography variant="body2" paragraph>
						The tool expects character data in the current Nexus RPG character model format, which includes:<br/>
						• Personal information: Name, folk, background, physical details, relationships<br/>
						• Statistics: Health, fatigue, attributes, defensive values, status effects<br/>
						• Skills: Experience points, skill ranks, abilities and talents<br/>
						• Equipment: Weapons, items, encumbrance tracking<br/>
						• Spells: Magic skills, focus, spell lists with damage calculations<br/>
						• Companions: Animal companions or allied creatures
					</Typography>

					<Typography variant="h6" gutterBottom>Print Tips</Typography>
					<Typography variant="body2">
						• Use <strong>light mode</strong> for better visibility while editing (print output is unaffected)<br/>
						• Ensure your browser's print settings are configured for the correct paper size<br/>
						• The sheets are optimized for landscape printing
					</Typography>
				</DialogContent>
			</Dialog>

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
