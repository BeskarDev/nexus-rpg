import { Box, TextField, Tooltip, Chip } from '@mui/material'
import React from 'react'
import { ActionType, getActionTypeIcon } from '@site/src/types/ActionType'
import { AbilityTag } from '@site/src/types/AbilityTag'
import { getSkillChipColor } from '@site/src/constants/skills'
import { getSkillAbbreviation } from '@site/src/constants/skillAbbreviations'

export type AbilitySummaryProps = {
	title: string
	actionType: ActionType
	tag?: AbilityTag
	rank?: number
	skill?: string
	onTitleChange: (title: string) => void
	onTitleBlur: () => void
}

/**
 * AbilitySummary - The collapsed summary view for an ability row.
 */
export const AbilitySummary: React.FC<AbilitySummaryProps> = ({
	title,
	actionType,
	tag,
	rank = 1,
	skill,
	onTitleChange,
	onTitleBlur,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				gap: 1,
				alignItems: 'center',
				flexGrow: 1,
				width: '100%',
			}}
		>
			{/* M13 S3: a row TITLE is not a slot until you reach for it.

				Every other input on the sheet is an inscribed slot (createTheme.ts),
				and that is right for a value in a field — but the title is the row's
				name, read constantly and edited rarely, and a permanent box around it
				turns a list of things into a list of form controls. So the slot is
				revealed on hover and on focus and is absent at rest, which also keeps
				the collapsed row down to one horizontal line: its own engraved rule.

				This is the same judgement M9 made for `CharacterSheetCard`'s
				tap-to-edit — the affordance appears where the user is already
				looking — rather than an exception to the field system. */}
			<TextField
				fullWidth
				variant="standard"
				value={title}
				onChange={(event) => onTitleChange(event.target.value)}
				onBlur={onTitleBlur}
				sx={{
					maxWidth: '15rem',
					'& .MuiInputBase-root': {
						backgroundColor: 'transparent',
						borderColor: 'transparent',
						fontFamily: 'inherit',
						fontSize: 'var(--nexus-text-dense)',
					},
					'&:hover .MuiInputBase-root:not(.Mui-disabled)': {
						backgroundColor:
							'color-mix(in srgb, var(--nexus-bronze) 7%, transparent)',
						borderColor:
							'color-mix(in srgb, var(--nexus-bronze) 45%, transparent)',
					},
				}}
				InputProps={{
					startAdornment: (
						<Box
							component="span"
							sx={{ display: 'flex', alignItems: 'center', mr: 1 }}
						>
							{getActionTypeIcon(actionType)}
						</Box>
					),
					endAdornment:
						tag === 'Talent' && rank >= 1 && rank <= 5 ? (
							<Box
								component="span"
								sx={{ color: 'text.secondary', mx: 1, fontSize: '1.15em' }}
							>
								{['①', '②', '③', '④', '⑤'][rank - 1]}
							</Box>
						) : undefined,
				}}
			/>
			{tag === 'Talent' && skill && (
				<Tooltip title={skill}>
					<Chip
						size="small"
						label={getSkillAbbreviation(skill) || skill}
						variant="outlined"
						sx={{
							borderColor: getSkillChipColor(skill),
							color: getSkillChipColor(skill),
							fontWeight: 600,
						}}
					/>
				</Tooltip>
			)}
		</Box>
	)
}
