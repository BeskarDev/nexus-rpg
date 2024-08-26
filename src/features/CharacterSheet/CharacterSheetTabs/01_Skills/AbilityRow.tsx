import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	TextField,
	TextFieldProps,
} from '@mui/material'
import React, { useState } from 'react'

import { AddCircle, Delete, ExpandMore } from '@mui/icons-material'
import { Ability } from '@site/src/types/Character'
import { DynamicList } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { SectionHeader } from '../../CharacterSheet'

export type AbilityRowProps = {
	title: string
	description: string
	updateAbility: (update: Partial<Ability>) => void
	deleteAbility: () => void
}

export const AbilityRow: React.FC<AbilityRowProps> = ({
	title: initialTitle,
	description: initialDescription,
	updateAbility,
	deleteAbility,
}) => {
	const [title, setTitle] = useState(initialTitle)
	const [description, setDescription] = useState(initialDescription)
	const [expanded, setExpanded] = useState(false)

	return (
		<Accordion
			expanded={expanded}
			disableGutters
			sx={{ flexGrow: 1, maxWidth: '30rem', mt: 0 }}
		>
			<AccordionSummary
				expandIcon={<ExpandMore onClick={() => setExpanded(!expanded)} />}
				sx={{
					gap: 1,
					pt: 0,
					flexDirection: 'row-reverse',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						gap: 1,
						alignItems: 'center',
						flexGrow: 1,
					}}
				>
					<TextField
						variant="standard"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						onBlur={() => updateAbility({ title })}
						sx={{ maxWidth: '25rem' }}
					/>
					<IconButton
						size="small"
						edge="end"
						aria-label="delete"
						onClick={deleteAbility}
					>
						<Delete />
					</IconButton>
				</Box>
			</AccordionSummary>
			<AccordionDetails>
				<TextField
					label="Description"
					size="small"
					multiline
					minRows={1}
					maxRows={30}
					value={description}
					onChange={(event) => setDescription(event.target.value)}
					onBlur={() => updateAbility({ description })}
					sx={{ mt: 0, maxWidth: '25rem' }}
				/>
			</AccordionDetails>
		</Accordion>
	)
}
