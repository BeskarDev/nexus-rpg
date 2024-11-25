import { Alert, Avatar, Box, Button, styled, TextField } from '@mui/material'
import { Character } from '@site/src/types/Character'
import React, { useMemo, useRef } from 'react'
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
			<Box>
				<TextField
					multiline
					minRows={5}
					maxRows={5}
					label="Import Character as JSON"
					value={characterJsonString}
					onChange={(event) => setCharacterJsonString(event.target.value)}
					sx={{ mb: 2 }}
				/>
				<Button variant="contained" size="large" onClick={handlePrint}>
					PRINT
				</Button>
			</Box>

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
