import { Delete } from '@mui/icons-material'
import {
	Box,
	Chip,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material'
import React, { useMemo } from 'react'
import { useDropdownSelection } from '../../hooks/useDropdownSelection'
import { ALL_LANGUAGES, DEFAULT_LANGUAGE } from '../../../../constants/languages'

interface LanguageManagementProps {
	languages: string[]
	onAddLanguage: (languageName: string) => void
	onRemoveLanguage: (languageName: string) => void
}

export const LanguageManagement: React.FC<LanguageManagementProps> = ({
	languages,
	onAddLanguage,
	onRemoveLanguage,
}) => {
	const availableLanguages = useMemo(
		() => ALL_LANGUAGES.filter((language) => !languages.includes(language)),
		[languages],
	)

	const dropdown = useDropdownSelection({
		availableItems: availableLanguages,
		selectedItems: languages,
		onAdd: onAddLanguage,
		onRemove: onRemoveLanguage,
	})

	const canAddLanguages = availableLanguages.length > 0
	const canRemoveLanguage = (language: string) => language !== DEFAULT_LANGUAGE

	return (
		<Box mb={2}>
			<Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
				<Typography variant="h6">Languages</Typography>
				{canAddLanguages && (
					<FormControl variant="outlined" size="small">
						<InputLabel>Add Language</InputLabel>
						<Select
							value=""
							label="Add Language"
							open={dropdown.isOpen}
							onOpen={dropdown.open}
							onClose={dropdown.close}
						>
							{availableLanguages.map((language) => (
								<MenuItem
									key={language}
									value={language}
									onClick={() => dropdown.handleAdd(language)}
								>
									{language}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}
			</Box>

			<Box display="flex" flexWrap="wrap" gap={1}>
				{languages.map((language) => (
					<Chip
						key={language}
						label={language}
						onDelete={
							canRemoveLanguage(language)
								? () => dropdown.handleRemove(language)
								: undefined
						}
						deleteIcon={canRemoveLanguage(language) ? <Delete /> : undefined}
					/>
				))}
			</Box>
		</Box>
	)
}