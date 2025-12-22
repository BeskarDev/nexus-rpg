import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import React from 'react'
import { Companion } from '../../../../../types/Character'
import { CompanionHeaderControls } from './CompanionHeaderControls'
import { CompanionActionButtons } from './CompanionActionButtons'
import { CompanionContent } from './CompanionContent'

interface CompanionAccordionProps {
	companion: Companion
	isExpanded: boolean
	editingId: string | null
	editName: string
	editMarkdown: string
	onToggle: (companionId: string) => void
	onEditNameChange: (name: string) => void
	onEditMarkdownChange: (markdown: string) => void
	onCurrentHPChange: (companionId: string, value: string) => void
	onMaxHPChange: (companionId: string, value: string) => void
	onWoundedChange: (companionId: string, wounded: boolean) => void
	onStartEditing: (companion: Companion) => void
	onSaveEditing: () => void
	onCancelEditing: () => void
	onDeleteClick: (companion: Companion) => void
}

export const CompanionAccordion: React.FC<CompanionAccordionProps> = ({
	companion,
	isExpanded,
	editingId,
	editName,
	editMarkdown,
	onToggle,
	onEditNameChange,
	onEditMarkdownChange,
	onCurrentHPChange,
	onMaxHPChange,
	onWoundedChange,
	onStartEditing,
	onSaveEditing,
	onCancelEditing,
	onDeleteClick,
}) => {
	return (
		<Accordion
			expanded={isExpanded}
			onChange={() => onToggle(companion.id)}
			sx={{ minWidth: '30rem' }}
		>
			<AccordionSummary expandIcon={<ExpandMore />} sx={{ pb: 1 }}>
				<CompanionHeaderControls
					companion={companion}
					editingId={editingId}
					editName={editName}
					onEditNameChange={onEditNameChange}
					onCurrentHPChange={onCurrentHPChange}
					onMaxHPChange={onMaxHPChange}
					onWoundedChange={onWoundedChange}
				/>
				<CompanionActionButtons
					companion={companion}
					editingId={editingId}
					onStartEditing={onStartEditing}
					onSaveEditing={onSaveEditing}
					onCancelEditing={onCancelEditing}
					onDeleteClick={onDeleteClick}
				/>
			</AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<CompanionContent
					editingId={editingId}
					companionId={companion.id}
					markdown={companion.markdown}
					editMarkdown={editMarkdown}
					onEditMarkdownChange={onEditMarkdownChange}
				/>
			</AccordionDetails>
		</Accordion>
	)
}
