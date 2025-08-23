import React from 'react'
import {
	Box,
	IconButton,
	Menu,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	Typography,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { StatusEffectType } from '@site/src/types/Character'
import { useDialog } from '../../hooks/useDialog'

interface ConditionSelectorProps {
	onAddCondition: (type: StatusEffectType) => void
	availableConditions: StatusEffectType[]
}

const CONDITION_LABELS: Record<StatusEffectType, string> = {
	bleeding: 'Bleeding',
	blinded: 'Blinded',
	burning: 'Burning',
	charmed: 'Charmed',
	confused: 'Confused',
	dazed: 'Dazed',
	deafened: 'Deafened',
	despair: 'Despair',
	disoriented: 'Disoriented',
	frightened: 'Frightened',
	grappled: 'Grappled',
	hidden: 'Hidden',
	hindered: 'Hindered',
	incapacitated: 'Incapacitated',
	poisoned: 'Poisoned',
	prone: 'Prone',
	pushed: 'Pushed',
	restrained: 'Restrained',
	silenced: 'Silenced',
	slowed: 'Slowed',
	stunned: 'Stunned',
	blessed: 'Blessed',
	airborne: 'Airborne',
	unconscious: 'Unconscious',
}

export const ConditionSelector: React.FC<ConditionSelectorProps> = ({
	onAddCondition,
	availableConditions,
}) => {
	const addDialog = useDialog()

	const handleAddCondition = (type: StatusEffectType) => {
		onAddCondition(type)
		addDialog.close()
	}

	return (
		<Box display="flex" alignItems="center" gap={1}>
			<Typography variant="h6">Conditions</Typography>
			<IconButton
				color="primary"
				onClick={addDialog.open}
				size="small"
				disabled={availableConditions.length === 0}
			>
				<AddIcon />
			</IconButton>

			<Menu
				anchorEl={addDialog.isOpen ? document.body : null}
				open={addDialog.isOpen}
				onClose={addDialog.close}
			>
				{availableConditions.map((condition) => (
					<MenuItem
						key={condition}
						onClick={() => handleAddCondition(condition)}
					>
						{CONDITION_LABELS[condition]}
					</MenuItem>
				))}
				{availableConditions.length === 0 && (
					<MenuItem disabled>
						<Typography color="text.secondary">
							All conditions are already applied
						</Typography>
					</MenuItem>
				)}
			</Menu>
		</Box>
	)
}