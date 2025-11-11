import React from 'react'
import {
	PlayArrow,
	Bolt,
	CircleOutlined,
	FlashOn,
	AllInclusive,
} from '@mui/icons-material'

export type ActionType =
	| 'Action'
	| 'Quick Action'
	| 'Passive'
	| 'Triggered'
	| 'Free'
	| 'Other'

export const ACTION_TYPES: ActionType[] = [
	'Action',
	'Quick Action',
	'Passive',
	'Triggered',
	'Free',
	'Other',
]

// Centralized function to get action type icon
export const getActionTypeIcon = (type: ActionType): React.ReactNode => {
	switch (type) {
		case 'Action':
			return <PlayArrow fontSize="small" />
		case 'Quick Action':
			return <Bolt fontSize="small" />
		case 'Passive':
			return <CircleOutlined fontSize="small" />
		case 'Triggered':
			return <FlashOn fontSize="small" />
		case 'Free':
			return <AllInclusive fontSize="small" />
		default:
			return <CircleOutlined fontSize="small" />
	}
}
