import { 
	Box, 
	IconButton, 
	TextField, 
	TextFieldProps, 
	MenuItem,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Chip
} from '@mui/material'
import React, { useState } from 'react'

import { Delete, ExpandMore } from '@mui/icons-material'
import { NpcRelationship, npcRoleArray, npcDispositionArray, NpcRole, NpcDisposition } from '@site/src/types/Character'

export type NpcRowProps = {
	npcRelationship: NpcRelationship
	updateNpc: (update: Partial<NpcRelationship>) => void
	deleteNpc: () => void
	dragDisabled?: boolean
} & Omit<TextFieldProps, 'value' | 'onChange'>

const getDispositionColor = (disposition: NpcDisposition): 'success' | 'default' | 'error' => {
	if (disposition >= 1) return 'success'
	if (disposition === 0) return 'default' 
	return 'error'
}

const getDispositionLabel = (disposition: NpcDisposition): string => {
	const item = npcDispositionArray.find(d => d.value === disposition)
	return item ? `${item.label} (${disposition >= 0 ? '+' : ''}${disposition})` : 'Unknown'
}

export const NpcRow: React.FC<NpcRowProps> = ({
	npcRelationship,
	updateNpc,
	deleteNpc,
	dragDisabled,
	...props
}) => {
	const [localData, setLocalData] = useState(npcRelationship)
	const [expanded, setExpanded] = useState(false)

	const handleFieldUpdate = (field: keyof NpcRelationship, value: any) => {
		const updatedData = { ...localData, [field]: value }
		setLocalData(updatedData)
		updateNpc({ [field]: value })
	}

	const handleDescriptionBlur = () => {
		updateNpc({ description: localData.description })
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Accordion 
				expanded={expanded} 
				onChange={(_, isExpanded) => setExpanded(isExpanded)}
				sx={{ 
					boxShadow: 'none',
					border: '1px solid',
					borderColor: 'divider',
					'&:before': { display: 'none' },
					borderRadius: 1
				}}
			>
				<AccordionSummary 
					expandIcon={<ExpandMore />}
					sx={{ 
						minHeight: 'auto',
						'& .MuiAccordionSummary-content': { 
							my: 0.5,
							alignItems: 'center' 
						} 
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexGrow: 1, mr: 0.5 }}>
						<Typography variant="body2" sx={{ fontWeight: 'medium', minWidth: '8rem' }}>
							{localData.name || 'Unnamed NPC'}
						</Typography>
						<Chip 
							size="small" 
							label={localData.role}
							variant="outlined"
							sx={{ minWidth: '4rem' }}
						/>
						<Chip 
							size="small"
							label={getDispositionLabel(localData.disposition)}
							color={getDispositionColor(localData.disposition)}
							variant="outlined"
						/>
						{!dragDisabled && (
							<IconButton
								size="small"
								edge="end"
								aria-label="delete"
								onClick={(e) => {
									e.stopPropagation()
									deleteNpc()
								}}
								sx={{ ml: 'auto' }}
							>
								<Delete />
							</IconButton>
						)}
					</Box>
				</AccordionSummary>
				<AccordionDetails sx={{ pt: 0, pb: 1 }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
						<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
							<TextField
								label="Name"
								value={localData.name}
								onChange={(e) => handleFieldUpdate('name', e.target.value)}
								sx={{ minWidth: '12rem', flexGrow: 1 }}
								size="small"
							/>
							<TextField
								select
								label="Role"
								value={localData.role}
								onChange={(e) => handleFieldUpdate('role', e.target.value as NpcRole)}
								sx={{ minWidth: '8rem' }}
								size="small"
							>
								{npcRoleArray.map((role) => (
									<MenuItem key={role} value={role}>
										{role}
									</MenuItem>
								))}
							</TextField>
							<TextField
								select
								label="Disposition"
								value={localData.disposition}
								onChange={(e) => handleFieldUpdate('disposition', parseInt(e.target.value) as NpcDisposition)}
								sx={{ minWidth: '10rem' }}
								size="small"
							>
								{npcDispositionArray.map((disp) => (
									<MenuItem key={disp.value} value={disp.value}>
										{disp.label} ({disp.value >= 0 ? '+' : ''}{disp.value})
									</MenuItem>
								))}
							</TextField>
						</Box>
						<TextField
							multiline
							minRows={2}
							maxRows={6}
							label="Description"
							value={localData.description}
							onChange={(e) => setLocalData(prev => ({ ...prev, description: e.target.value }))}
							onBlur={handleDescriptionBlur}
							placeholder="Describe this NPC and your relationship with them..."
							sx={{ width: '100%' }}
							size="small"
						/>
					</Box>
				</AccordionDetails>
			</Accordion>
		</Box>
	)
}
