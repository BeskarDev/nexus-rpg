import { useColorMode } from '@docusaurus/theme-common'
import { Alert, Box, Button, styled, TextField } from '@mui/material'
import { Character } from '@site/src/types/Character'
import React, { useEffect, useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { SectionHeader } from '../CharacterSheet/CharacterSheet'
import './printCharacterSheetStyles.css'
import { sampleImport } from './sampleImport'
import { StatisticsTab } from '../CharacterSheet/CharacterSheetTabs/00_Statistics/StatisticsTab'
import { StatisticsSheet } from './sheets/0_Statistics'
import { SkillsSheet } from './sheets/1_Skills'
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

export const PrintCharacterSheet: React.FC = () => {
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>(sampleImport)

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
		content: () => componentRef.current,
	})

	return (
		<Box>
			<Alert variant="filled" severity="info" sx={{ mb: 2 }}>
				If you're having trouble with not seeing everything on the sheets, make
				sure to use light mode!
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
					<SkillsSheet />
					<EquipmentSheet />
					<SpellsSheet />
					<PersonalSheet />
				</Box>
			)}
		</Box>
	)
}
