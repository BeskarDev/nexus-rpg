import { useColorMode } from '@docusaurus/theme-common'
import { Box, styled, TextField } from '@mui/material'
import { Character } from '@site/src/types/Character'
import React, { useEffect, useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { SectionHeader } from '../CharacterSheet/CharacterSheet'
import './printCharacterSheetStyles.css'
import { sampleImport } from './sampleImport'

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

	const character: Character = useMemo(() => {
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
			</Box>

			{Boolean(character) && (
				<Box>
					<SectionHeader>Attributes</SectionHeader>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<AttributeField
							label="Strength"
							value={`d${character.statistics.strength.value}`}
							sx={{ fontWeight: 'bold' }}
						/>
						<AttributeField
							label="Agility"
							value={`d${character.statistics.agility.value}`}
							sx={{ fontWeight: 'bold' }}
						/>
						<AttributeField
							label="Spirit"
							value={`d${character.statistics.spirit.value}`}
							sx={{ fontWeight: 'bold' }}
						/>
						<AttributeField
							label="Mind"
							value={`d${character.statistics.mind.value}`}
							sx={{ fontWeight: 'bold' }}
						/>
					</Box>
				</Box>
			)}
		</Box>
	)
}
