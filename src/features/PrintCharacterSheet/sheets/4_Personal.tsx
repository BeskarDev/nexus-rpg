import { Box, TextField, Typography } from '@mui/material'
import { SheetLayout } from './SheetLayout'
import { Character } from '@site/src/types/Character'
import { CharacterHeaderTextField } from '../PrintCharacterSheet'
import parse from 'html-react-parser'

export const PersonalSheet: React.FC<{ char: Character }> = ({ char }) => {
	return (
		<SheetLayout>
			<Box sx={{ display: 'flex', gap: 1, mt: -0.5 }}>
				<CharacterHeaderTextField
					value={char.personal.motivation}
					label="Motivation"
				/>
				<CharacterHeaderTextField
					size="small"
					value={char.personal.height}
					label="Height"
				/>
				<CharacterHeaderTextField
					size="small"
					value={char.personal.weight}
					label="Weight"
				/>
				<CharacterHeaderTextField
					size="small"
					value={char.personal.age}
					label="Age"
				/>
			</Box>
			<TextField
				size="small"
				multiline
				rows={3}
				value={char.personal.description}
				label="Physical Description"
			/>
			<Box sx={{ display: 'flex', gap: 1, height: '80%', overflowY: 'hidden' }}>
				<Box
					sx={{
						border: '1px dotted black',
						borderRadius: '0.5rem',
						px: 1,
						height: '100%',
						width: '50%',
						overflowY: 'hidden',
					}}
				>
					<Typography color="text.secondary" variant="caption">
						Allies
					</Typography>
					<Box component="ul" sx={{ pl: 3, mb: 1, '& li + li': { mt: 1 } }}>
						{char.personal.allies.map((ally) => (
							<Typography
								component="li"
								variant="body2"
								sx={{ fontSize: '10px' }}
							>
								{ally.description}
							</Typography>
						))}
					</Box>
					<Typography color="text.secondary" variant="caption">
						Contacts
					</Typography>
					<Box component="ul" sx={{ pl: 3, mb: 1, '& li + li': { mt: 1 } }}>
						{char.personal.contacts.map((contact) => (
							<Typography
								component="li"
								variant="body2"
								sx={{ fontSize: '10px' }}
							>
								{contact.description}
							</Typography>
						))}
					</Box>
					<Typography color="text.secondary" variant="caption">
						Rivals
					</Typography>
					<Box component="ul" sx={{ pl: 3, mb: 1, '& li + li': { mt: 1 } }}>
						{char.personal.rivals.map((rival) => (
							<Typography
								component="li"
								variant="body2"
								sx={{ fontSize: '10px' }}
							>
								{rival.description}
							</Typography>
						))}
					</Box>
				</Box>
				<Box
					sx={{
						border: '1px dotted black',
						borderRadius: '0.5rem',
						px: 1,
						width: '50%',
						height: '100%',
					}}
				>
					<Typography color="text.secondary" variant="caption">
						Personal Notes
					</Typography>
					<Box
						sx={{
							height: '95%',
							fontSize: '10px',
						}}
					>
						{parse(char.personal.notes)}
					</Box>
				</Box>
			</Box>
		</SheetLayout>
	)
}
